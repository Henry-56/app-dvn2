'use client';

import React from 'react';
import { useSimulationStore } from '@/presentation/state/useSimulationStore';
import { Play, Square, RotateCcw, FastForward, Sliders } from 'lucide-react';

export const ControlPanel: React.FC = () => {
  const { isRunning, speed, currentState, start, stop, reset, setSpeed, updateVariable } = useSimulationStore();

  const handleSliderChange = (variable: any, value: string) => {
    updateVariable(variable, parseFloat(value));
  };

  return (
    <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-slate-200 font-semibold flex items-center gap-2">
          <Sliders className="w-4 h-4 text-slate-400" />
          Control de Proceso
        </h3>
        <div className="flex bg-slate-800 border-slate-700 p-1 rounded-lg">
          <button 
            onClick={isRunning ? stop : start}
            className={`p-2 rounded-md ${isRunning ? 'text-red-400 hover:bg-red-500/10' : 'text-emerald-400 hover:bg-emerald-500/10'}`}
          >
            {isRunning ? <Square className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
          </button>
          <button onClick={reset} className="p-2 text-slate-400 hover:bg-slate-700 rounded-md">
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {[
          { label: 'pH', var: 'pH', min: 0, max: 14, step: 0.1 },
          { label: 'Flujo Aire', var: 'airFlow', min: 0, max: 10, step: 0.1 },
          { label: 'Dosificación', var: 'reagentDosage', min: 0, max: 2, step: 0.01 },
          { label: 'Nivel Pulpa', var: 'pulpLevel', min: 0, max: 50, step: 1 },
        ].map((item) => (
          <div key={item.var} className="space-y-2">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-slate-400 uppercase tracking-wider">{item.label}</span>
              <span className="text-slate-200">{(currentState as any)[item.var].toFixed(2)}</span>
            </div>
            <input 
              type="range"
              min={item.min}
              max={item.max}
              step={item.step}
              value={(currentState as any)[item.var]}
              onChange={(e) => handleSliderChange(item.var, e.target.value)}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-slate-800">
        <label className="text-xs font-medium text-slate-400 uppercase tracking-wider block mb-2">Velocidad Simulación</label>
        <div className="flex gap-2">
          {[1, 2, 5, 10].map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className={`flex-1 py-1.5 text-xs font-bold rounded-md border transition-all ${
                speed === s ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
