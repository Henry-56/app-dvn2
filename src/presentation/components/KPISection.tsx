'use client';

import React from 'react';
import { useSimulationStore } from '@/presentation/state/useSimulationStore';
import { Activity, Beaker, Droplets, Wind, Zap, Target, BarChart3, Waves } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  unit: string;
  icon: React.ReactNode;
  color: string;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, unit, icon, color }) => (
  <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl backdrop-blur-sm">
    <div className="flex justify-between items-start mb-2">
      <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">{title}</span>
      <div className={`${color} p-2 rounded-lg bg-opacity-10`}>{icon}</div>
    </div>
    <div className="flex items-baseline gap-1">
      <span className="text-2xl font-bold tracking-tight">{value}</span>
      <span className="text-slate-500 text-sm">{unit}</span>
    </div>
  </div>
);

export const KPISection: React.FC = () => {
  const { currentState } = useSimulationStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <KPICard 
        title="Recuperación" 
        value={currentState.metallurgicalRecovery.toFixed(2)} 
        unit="%" 
        icon={<Target className="w-5 h-5 text-emerald-400" />} 
        color="bg-emerald-400"
      />
      <KPICard 
        title="Ley Concentrado" 
        value={currentState.concentrateGrade.toFixed(2)} 
        unit="%" 
        icon={<BarChart3 className="w-5 h-5 text-blue-400" />} 
        color="bg-blue-400"
      />
      <KPICard 
        title="pH" 
        value={currentState.pH.toFixed(2)} 
        unit="pH" 
        icon={<Beaker className="w-5 h-5 text-purple-400" />} 
        color="bg-purple-400"
      />
      <KPICard 
        title="Estabilidad" 
        value={currentState.frothStability.toFixed(1)} 
        unit="/10" 
        icon={<Waves className="w-5 h-5 text-cyan-400" />} 
        color="bg-cyan-400"
      />
      <KPICard 
        title="Flujo Aire" 
        value={currentState.airFlow.toFixed(2)} 
        unit="m3/s" 
        icon={<Wind className="w-5 h-5 text-sky-400" />} 
        color="bg-sky-400"
      />
      <KPICard 
        title="Nivel Pulpa" 
        value={currentState.pulpLevel.toFixed(1)} 
        unit="cm" 
        icon={<Droplets className="w-5 h-5 text-indigo-400" />} 
        color="bg-indigo-400"
      />
      <KPICard 
        title="Dosificación" 
        value={currentState.reagentDosage.toFixed(3)} 
        unit="kg/t" 
        icon={<Zap className="w-5 h-5 text-yellow-400" />} 
        color="bg-yellow-400"
      />
      <KPICard 
        title="Tamaño Partícula" 
        value={currentState.particleSize.toFixed(0)} 
        unit="um" 
        icon={<Activity className="w-5 h-5 text-rose-400" />} 
        color="bg-rose-400"
      />
    </div>
  );
};
