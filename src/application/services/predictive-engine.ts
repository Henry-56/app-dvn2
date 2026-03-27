import { FlotationState } from "@/domain/types";
import { FlotationLogic } from "@/domain/logic/flotation-logic";

export interface Recommendation {
  variable: keyof FlotationState;
  currentValue: number;
  suggestedValue: number;
  impact: string;
  reason: string;
}

export class PredictiveEngine {
  /**
   * Predicts future recovery based on current trends/state.
   */
  static predictRecovery(state: FlotationState): number {
    // In a real scenario, this would use a pre-trained ML model.
    // Here we use the same FlotationLogic but could add trend analysis.
    return FlotationLogic.calculateRecovery(state);
  }

  /**
   * Generates recommendations to reach the optimal state.
   */
  static getRecommendations(state: FlotationState): Recommendation[] {
    const recommendations: Recommendation[] = [];
    const optimalPH = 9.5;
    const optimalAir = 6.0;
    const optimalReagent = 1.0;

    if (Math.abs(state.pH - optimalPH) > 0.3) {
      recommendations.push({
        variable: 'pH',
        currentValue: state.pH,
        suggestedValue: optimalPH,
        impact: 'High',
        reason: state.pH < optimalPH ? 'El pH está muy bajo, la mezcla no va a salir bien.' : 'El pH está muy alto, el mineral no se va a pegar a las burbujas.'
      });
    }

    if (Math.abs(state.airFlow - optimalAir) > 0.5) {
      recommendations.push({
        variable: 'airFlow',
        currentValue: state.airFlow,
        suggestedValue: optimalAir,
        impact: 'Medium',
        reason: state.airFlow < optimalAir ? 'Oye, tienes muy poco aire, así no va a flotar el metal.' : 'Demasiado aire está rompiendo las burbujas, baja la intensidad.'
      });
    }

    if (state.reagentDosage < optimalReagent) {
      recommendations.push({
        variable: 'reagentDosage',
        currentValue: state.reagentDosage,
        suggestedValue: optimalReagent,
        impact: 'High',
        reason: 'Falta reactivo, el mineral se está quedando en el fondo del tanque.'
      });
    }

    return recommendations;
  }

  /**
   * Performs a 'What-If' simulation.
   */
  static performWhatIf(baseState: FlotationState, overrides: Partial<FlotationState>): FlotationState {
    const newState = { ...baseState, ...overrides };
    newState.metallurgicalRecovery = FlotationLogic.calculateRecovery(newState);
    newState.concentrateGrade = FlotationLogic.calculateConcentrateGrade(newState);
    newState.frothStability = FlotationLogic.calculateFrothStability(newState);
    return newState;
  }
}
