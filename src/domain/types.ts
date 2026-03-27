export type VariableName = 
  | 'pH' 
  | 'pulpLevel' 
  | 'airFlow' 
  | 'particleSize' 
  | 'reagentDosage' 
  | 'metallurgicalRecovery' 
  | 'concentrateGrade' 
  | 'frothStability';

export interface Measurement {
  timestamp: number;
  value: number;
  unit: string;
  variable: VariableName;
  isAnomaly: boolean;
}

export interface SensorConfig {
  id: string;
  name: string;
  variable: VariableName;
  minRange: number;
  maxRange: number;
  unit: string;
  noiseLevel: number; // 0 to 1
  frequency: number; // ms
}

export interface FlotationState {
  pH: number;
  pulpLevel: number;
  airFlow: number;
  particleSize: number;
  reagentDosage: number;
  metallurgicalRecovery: number;
  concentrateGrade: number;
  frothStability: number;
}
