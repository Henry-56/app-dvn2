import { create } from 'zustand';
import { FlotationState, Measurement, VariableName } from '@/domain/types';
import { FlotationLogic } from '@/domain/logic/flotation-logic';
import { IoTManager } from '@/domain/services/iot-manager';
import { PersistenceAdapter } from '@/infrastructure/adapters/persistence-adapter';

interface SimulationState {
  isRunning: boolean;
  speed: number;
  currentState: FlotationState;
  measurements: Record<VariableName, Measurement[]>;
  history: FlotationState[];
  alerts: string[];
  
  // Actions
  start: () => void;
  stop: () => void;
  reset: () => void;
  setSpeed: (speed: number) => void;
  updateVariable: (variable: keyof FlotationState, value: number) => void;
  tick: () => void;
}

const INITIAL_STATE: FlotationState = {
  pH: 9.5,
  pulpLevel: 20,
  airFlow: 6,
  particleSize: 75,
  reagentDosage: 0.8,
  metallurgicalRecovery: 76.5,
  concentrateGrade: 19.76,
  frothStability: 6.4
};


export const useSimulationStore = create<SimulationState>((set, get) => ({
  isRunning: false,
  speed: 1,
  currentState: INITIAL_STATE,
  measurements: {
    pH: [], pulpLevel: [], airFlow: [], particleSize: [], 
    reagentDosage: [], metallurgicalRecovery: [], 
    concentrateGrade: [], frothStability: []
  },
  history: [],
  alerts: [],

  start: () => set({ isRunning: true }),
  stop: () => set({ isRunning: false }),
  reset: () => {
    PersistenceAdapter.clearAll();
    set({ currentState: INITIAL_STATE, history: [], alerts: [], measurements: {
      pH: [], pulpLevel: [], airFlow: [], particleSize: [], 
      reagentDosage: [], metallurgicalRecovery: [], 
      concentrateGrade: [], frothStability: []
    }});
  },
  setSpeed: (speed) => set({ speed }),

  updateVariable: (variable, value) => {
    set((state) => ({
      currentState: { ...state.currentState, [variable]: value }
    }));
  },

  tick: () => {
    const { currentState, isRunning, measurements } = get();
    if (!isRunning) return;

    // 1. Calculate TARGET theoretical dependent variables
    const targetRecovery = FlotationLogic.calculateRecovery(currentState);
    const targetGrade = FlotationLogic.calculateConcentrateGrade(currentState);
    const targetStability = FlotationLogic.calculateFrothStability(currentState);

    // Exponential Moving Average (EMA) to simulate process inertia
    // alpha determines how fast the process reacts (0.05 means 5% movement per tick towards target)
    const alpha = 0.05;
    
    // Smooth transition from current state to target state
    let newRecovery = currentState.metallurgicalRecovery + alpha * (targetRecovery - currentState.metallurgicalRecovery);
    let newGrade = currentState.concentrateGrade + alpha * (targetGrade - currentState.concentrateGrade);
    let newStability = currentState.frothStability + alpha * (targetStability - currentState.frothStability);

    // Snap to target if very close to ensure a perfectly flat line in steady state
    if (Math.abs(targetRecovery - newRecovery) < 0.001) newRecovery = targetRecovery;
    if (Math.abs(targetGrade - newGrade) < 0.001) newGrade = targetGrade;
    if (Math.abs(targetStability - newStability) < 0.001) newStability = targetStability;

    const newState = {
      ...currentState,
      metallurgicalRecovery: newRecovery,
      concentrateGrade: newGrade,
      frothStability: newStability
    };


    // 2. Generate IoT Measurements
    const newMeasurements = { ...measurements };
    const newAlerts: string[] = [];

    (Object.keys(newState) as VariableName[]).forEach((variable) => {
      const measurement = IoTManager.generateMeasurement(variable, newState[variable]);
      
      // Persist to IndexedDB
      PersistenceAdapter.saveMeasurement(measurement);

      // Keep last 50 measurements for charts
      newMeasurements[variable] = [...(newMeasurements[variable] || []).slice(-49), measurement];
      
      if (measurement.isAnomaly) {
        newAlerts.push(`¡Atención! El sensor de ${variable} está fallando: ${measurement.value.toFixed(2)} ${measurement.unit}`);
      }
    });

    set((state) => ({
      currentState: newState,
      measurements: newMeasurements,
      history: [...state.history.slice(-99), newState],
      alerts: [...newAlerts, ...state.alerts].slice(0, 10)
    }));
  }
}));
