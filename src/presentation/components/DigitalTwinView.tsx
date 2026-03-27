'use client';

import React, { useState, useEffect } from 'react';
import { useSimulationStore } from '@/presentation/state/useSimulationStore';
import { Waves, Wind, Droplets } from 'lucide-react';

export const DigitalTwinView: React.FC = () => {
  const { currentState } = useSimulationStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Dynamic styles based on state
  const frothHeight = Math.min(100, currentState.frothStability * 10);
  const pulpHeight = 100 - frothHeight;
  const bubbleScale = 0.5 + (currentState.airFlow / 10);
  const opacity = 0.3 + (currentState.reagentDosage / 2);

  return (
    <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl h-full flex flex-col">
      <h3 className="text-slate-200 font-semibold mb-6 flex items-center gap-2">
        <Waves className="w-4 h-4 text-cyan-400" />
        Gemelo Digital: Celda de Flotación
      </h3>
      
      <div className="flex-1 relative flex items-center justify-center min-h-[300px]">
        {/* Flotation Cell Vessel */}
        <div className="w-48 h-64 border-x-4 border-b-4 border-slate-700 relative overflow-hidden rounded-b-3xl">
          
          {/* Pulp Layer */}
          <div 
            className="absolute bottom-0 w-full transition-all duration-1000 bg-slate-800/80" 
            style={{ height: `${pulpHeight}%` }}
          >
            {/* Bubbles rising */}
            <div className="absolute inset-0 overflow-hidden">
              {isMounted && [...Array(12)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute bg-white/20 rounded-full animate-bubble"
                  style={{
                    left: `${Math.random() * 90}%`,
                    width: `${8 * bubbleScale}px`,
                    height: `${8 * bubbleScale}px`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${3 / (currentState.airFlow || 1)}s`
                  }}
                />
              ))}
            </div>
            {/* Impeller (Static Representation) */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-12 h-4 bg-slate-600 rounded-full" />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-1 h-32 bg-slate-600" />
          </div>

          {/* Froth Layer */}
          <div 
            className="absolute bottom-0 w-full transition-all duration-1000 overflow-hidden" 
            style={{ 
              height: '100%', 
              bottom: `${pulpHeight}%`,
              opacity: opacity,
              backgroundColor: '#CBD5E1' // Light gray for froth
            }}
          >
             <div className="absolute inset-0 flex flex-wrap gap-1 p-1">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="w-4 h-4 bg-white/40 rounded-full blur-[2px]" />
                ))}
             </div>
          </div>

          {/* Indicators */}
          <div className="absolute top-4 left-4 space-y-2 z-10">
            <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded border border-slate-700">
               <Wind className="w-3 h-3 text-sky-400" />
               <span className="text-[10px] font-bold text-slate-300">AIRE: {currentState.airFlow.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded border border-slate-700">
               <Droplets className="w-3 h-3 text-indigo-400" />
               <span className="text-[10px] font-bold text-slate-300">PULPA: {currentState.pulpLevel.toFixed(1)}</span>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="absolute right-0 bottom-0 text-[10px] text-slate-500 space-y-1 bg-slate-950/50 p-2 rounded">
          <div className="flex items-center gap-2"><div className="w-2 h-2 bg-slate-300 rounded-full" /> Espuma (Froth)</div>
          <div className="flex items-center gap-2"><div className="w-2 h-2 bg-slate-800 rounded-full" /> Pulpa (Mineral)</div>
          <div className="flex items-center gap-2"><div className="w-2 h-2 bg-slate-600 rounded-full border border-slate-400" /> Agitador</div>
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-400 text-center uppercase tracking-widest font-bold">Representación en tiempo real</p>
    </div>
  );
};
