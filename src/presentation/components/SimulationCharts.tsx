'use client';

import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useSimulationStore } from '@/presentation/state/useSimulationStore';

export const SimulationCharts: React.FC = () => {
  const { measurements } = useSimulationStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[400px]"><div className="bg-slate-900/50 border border-slate-800 rounded-2xl animate-pulse" /><div className="bg-slate-900/50 border border-slate-800 rounded-2xl animate-pulse" /></div>;

  const data = measurements.metallurgicalRecovery.map((m, i) => ({
    time: new Date(m.timestamp).toLocaleTimeString([], { hour12: false, minute: '2-digit', second: '2-digit' }),
    recovery: m.value,
    grade: measurements.concentrateGrade[i]?.value || 0,
    pH: measurements.pH[i]?.value || 0,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl h-[400px]">
        <h3 className="text-slate-200 font-semibold mb-4 flex items-center gap-2">
          Trend: Recuperación Metalúrgica (%)
        </h3>
        <ResponsiveContainer width="100%" height="85%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorRec" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 10 }} />
            <YAxis domain={[70, 100]} stroke="#64748b" tick={{ fontSize: 10 }} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
              itemStyle={{ color: '#10b981' }}
            />
            <Area type="monotone" dataKey="recovery" stroke="#10b981" fillOpacity={1} fill="url(#colorRec)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl h-[400px]">
        <h3 className="text-slate-200 font-semibold mb-4 flex items-center gap-2">
          Trend: Ley de Concentrado (%)
        </h3>
        <ResponsiveContainer width="100%" height="85%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorGrade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 10 }} />
            <YAxis domain={[0, 40]} stroke="#64748b" tick={{ fontSize: 10 }} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
              itemStyle={{ color: '#3b82f6' }}
            />
            <Area type="monotone" dataKey="grade" stroke="#3b82f6" fillOpacity={1} fill="url(#colorGrade)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
