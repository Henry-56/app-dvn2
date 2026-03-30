import { FlotationState, Measurement, SensorConfig, VariableName } from "../types";
import { FlotationLogic } from "../logic/flotation-logic";

export class IoTManager {
  private static sensors: Record<VariableName, SensorConfig> = {
    pH: { id: 's1', name: 'pH Sensor', variable: 'pH', minRange: 0, maxRange: 14, unit: 'pH', noiseLevel: 0.01, frequency: 1000 },
    pulpLevel: { id: 's2', name: 'Level Sensor', variable: 'pulpLevel', minRange: 0, maxRange: 100, unit: 'cm', noiseLevel: 0.05, frequency: 1000 },
    airFlow: { id: 's3', name: 'Air Flow Sensor', variable: 'airFlow', minRange: 0, maxRange: 10, unit: 'm3/s', noiseLevel: 0.02, frequency: 1000 },
    particleSize: { id: 's4', name: 'Particle Size Sensor', variable: 'particleSize', minRange: 10, maxRange: 200, unit: 'um', noiseLevel: 0.2, frequency: 2000 },
    reagentDosage: { id: 's5', name: 'Reagent Dosage Sensor', variable: 'reagentDosage', minRange: 0.1, maxRange: 2.0, unit: 'kg/t', noiseLevel: 0.005, frequency: 5000 },
    metallurgicalRecovery: { id: 's6', name: 'Recovery Analyzer', variable: 'metallurgicalRecovery', minRange: 0, maxRange: 100, unit: '%', noiseLevel: 0.05, frequency: 10000 },
    concentrateGrade: { id: 's7', name: 'Grade Analyzer', variable: 'concentrateGrade', minRange: 0, maxRange: 50, unit: '%', noiseLevel: 0.04, frequency: 10000 },
    frothStability: { id: 's8', name: 'Stability Sensor', variable: 'frothStability', minRange: 0, maxRange: 10, unit: 'Scale', noiseLevel: 0.02, frequency: 1000 },

  };

  private static previousNoise: Partial<Record<VariableName, number>> = {};

  static generateMeasurement(variable: VariableName, value: number): Measurement {
    const config = this.sensors[variable];
    
    // Autoregressive AR(1) smooth noise (Random Walk with mean reversion)
    const whiteNoise = (Math.random() - 0.5) * 2 * config.noiseLevel;
    const prevNoise = this.previousNoise[variable] || 0;
    // Maximum persistence: Keep 98% of previous curve, add 2% new noise
    const currentNoise = (prevNoise * 0.98) + (whiteNoise * 0.02);

    this.previousNoise[variable] = currentNoise;

    const finalValue = Math.min(config.maxRange, Math.max(config.minRange, value + currentNoise));
    
    // Simulate anomaly (0.0% chance - disabled)
    const isAnomaly = false;
    const anomalousValue = finalValue;




    return {
      timestamp: Date.now(),
      variable,
      value: anomalousValue,
      unit: config.unit,
      isAnomaly
    };
  }

  static getConfigs() {
    return this.sensors;
  }
}
