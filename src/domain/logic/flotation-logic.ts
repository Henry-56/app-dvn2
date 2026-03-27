import { FlotationState, VariableName } from "../types";

export class FlotationLogic {
  /**
   * Calculates the theoretical metallurgical recovery based on process variables.
   * This is a heuristic model for simulation purposes.
   */
  static calculateRecovery(state: FlotationState): number {
    const { pH, airFlow, pulpLevel, reagentDosage, particleSize } = state;

    // Normalizing and applying heuristic formulas
    // Optimal pH 9.5
    const pHFactor = Math.max(0, 1 - 0.1 * Math.pow(pH - 9.5, 2));
    
    // Optimal airFlow around 5-7
    const airFactor = Math.max(0, 1 - 0.05 * Math.pow(airFlow - 6, 2));
    
    // Optimal pulpLevel around 20
    const pulpFactor = Math.max(0, 1 - 0.02 * Math.pow(pulpLevel - 20, 2));
    
    // reagentDosage impact (linear positive up to a point)
    const reagentFactor = Math.min(1.2, 0.5 + 0.5 * reagentDosage);
    
    // particleSize (smaller is usually better for flotation, but too small is bad)
    const particleFactor = Math.max(0, 1 - 0.01 * Math.pow(particleSize - 75, 2));

    const baseRecovery = 85;
    const finalRecovery = baseRecovery * pHFactor * airFactor * pulpFactor * reagentFactor * particleFactor;

    return Math.min(99.9, Math.max(0, finalRecovery));
  }

  static calculateConcentrateGrade(state: FlotationState): number {
    const { pH, reagentDosage, frothStability } = state;
    // Grade usually has an inverse relationship with recovery (Selectivity)
    const recoveryEffect = 1 - (state.metallurgicalRecovery / 200);
    const pHGradeEffect = 1 - 0.05 * Math.abs(pH - 9.5);
    
    return Math.min(45, Math.max(5, 25 * recoveryEffect * pHGradeEffect * (frothStability / 5)));
  }

  static calculateFrothStability(state: FlotationState): number {
    const { airFlow, reagentDosage } = state;
    // Stability depends on air and frothers (part of reagents)
    return Math.min(10, Math.max(0, (airFlow * 0.8) + (reagentDosage * 2)));
  }
}
