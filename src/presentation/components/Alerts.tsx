'use client';

import React from 'react';
import { useSimulationStore } from '@/presentation/state/useSimulationStore';
import { AlertCircle, AlertTriangle } from 'lucide-react';

export const Alerts: React.FC = () => {
  const { alerts } = useSimulationStore();

  return (
    <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl h-full">
      <h3 className="text-slate-200 font-semibold mb-4 flex items-center gap-2">
        <AlertCircle className="w-4 h-4 text-rose-500" />
        Fallos y Eventos de Sensores
      </h3>
      <div className="space-y-3 overflow-y-auto max-h-[250px] pr-2 scrollbar-none">
        {alerts.length === 0 ? (
          <p className="text-slate-500 text-sm italic">No se detectan anomalías en el sistema.</p>
        ) : (
          alerts.map((alert, i) => (
            <div key={i} className="flex gap-3 p-3 bg-rose-500/5 border border-rose-500/20 rounded-lg animate-in fade-in slide-in-from-right-4 duration-300">
              <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <span className="text-xs text-rose-200 leading-relaxed font-medium">{alert}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
