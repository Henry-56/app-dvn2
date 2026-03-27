'use client';

import React from 'react';
import { KPISection } from '@/presentation/components/KPISection';
import { SimulationCharts } from '@/presentation/components/SimulationCharts';
import { ControlPanel } from '@/presentation/components/ControlPanel';
import { DigitalTwinView } from '@/presentation/components/DigitalTwinView';
import { Recommendations } from '@/presentation/components/Recommendations';
import { Alerts } from '@/presentation/components/Alerts';
import { SimulationController } from '@/presentation/components/SimulationController';
import { PersistenceAdapter } from '@/infrastructure/adapters/persistence-adapter';
import { LayoutDashboard, Settings, Info, Cpu } from 'lucide-react';

export default function DashboardPage() {
  React.useEffect(() => {
    PersistenceAdapter.init();
  }, []);

  return (
    <main className="p-6 max-w-[1600px] mx-auto space-y-6">
      <SimulationController />
      
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="bg-emerald-500 p-1.5 rounded-lg shadow-lg shadow-emerald-500/20">
              <Cpu className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">FlotSim AI</h1>
            <span className="px-2 py-0.5 rounded-full border border-slate-700 bg-slate-900 text-[10px] text-slate-400 font-bold uppercase tracking-wider">v1.2 Prototype</span>
          </div>
          <p className="text-slate-400 text-sm">Plataforma inteligente de optimización multivariable - Proceso de Flotación</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-medium transition-all">
            <Settings className="w-4 h-4" />
            Escenarios
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-600/20 transition-all">
            Exportar Históricos
          </button>
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* Left Column: Metrics & Analytics */}
        <div className="col-span-12 lg:col-span-9 space-y-6">
          <KPISection />
          <SimulationCharts />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[400px]">
             <DigitalTwinView />
             <Recommendations />
          </div>
        </div>

        {/* Right Column: Controls & Alerts */}
        <div className="col-span-12 lg:col-span-3 space-y-6">
          <ControlPanel />
          <Alerts />
          
          {/* Quick Info */}
          <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl">
             <div className="flex items-center gap-2 text-blue-400 mb-2 font-bold text-xs uppercase italic">
                <Info className="w-3 h-3" />
                Nota de Operación
             </div>
             <p className="text-[11px] text-blue-200 leading-relaxed">
                El sistema utiliza una lógica de <b>Gemelo Digital</b> basada en balances de masa y heurísticas metalúrgicas para simular la recuperación en tiempo real bajo variaciones de pH y aire.
             </p>
          </div>
        </div>

      </div>

      <footer className="pt-8 text-center text-slate-600 text-[10px] uppercase tracking-[0.2em] italic">
        Smart Mining Systems &copy; 2026 - Digital Twin Simulation Module
      </footer>
    </main>
  );
}
