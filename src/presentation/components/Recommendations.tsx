'use client';

import React, { useMemo } from 'react';
import { useSimulationStore } from '@/presentation/state/useSimulationStore';
import { PredictiveEngine } from '@/application/services/predictive-engine';
import { Sparkles, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const Recommendations: React.FC = () => {
  const { currentState } = useSimulationStore();
  
  const recommendations = useMemo(() => 
    PredictiveEngine.getRecommendations(currentState), 
    [currentState]
  );

  return (
    <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl h-full">
      <h3 className="text-slate-200 font-semibold mb-4 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-yellow-400 fill-current" />
        Analítica Predictiva y Sugerencias
      </h3>
      
      <div className="space-y-4">
        {recommendations.length === 0 ? (
          <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <div>
              <p className="text-sm font-semibold text-emerald-400">Proceso Optimizado</p>
              <p className="text-xs text-slate-400">Las variables se encuentran dentro de los rangos ideales.</p>
            </div>
          </div>
        ) : (
          recommendations.map((rec, i) => (
            <div key={i} className="p-4 bg-slate-800/50 border border-slate-700/50 rounded-xl space-y-2 border-l-4 border-l-yellow-500">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{rec.variable}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                  rec.impact === 'High' ? 'bg-rose-500/20 text-rose-400' : 'bg-blue-500/20 text-blue-400'
                }`}>
                  Impacto {rec.impact === 'High' ? 'Alto' : 'Medio'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm line-through text-slate-500">{rec.currentValue.toFixed(2)}</span>
                <ArrowUpRight className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-bold text-yellow-400">{rec.suggestedValue.toFixed(2)}</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-snug">{rec.reason}</p>
            </div>
          ))
        )}
      </div>

      <div className="mt-6 pt-6 border-t border-slate-800">
        <div className="flex justify-between text-xs mb-2">
          <span className="text-slate-400">Predicción: Recuperación Esperada</span>
          <span className="text-emerald-400 font-bold">{(currentState.metallurgicalRecovery + 0.5).toFixed(2)}%</span>
        </div>
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
           <div 
             className="h-full bg-emerald-500 transition-all duration-1000" 
             style={{ width: `${currentState.metallurgicalRecovery}%` }}
           />
        </div>
      </div>
    </div>
  );
};
