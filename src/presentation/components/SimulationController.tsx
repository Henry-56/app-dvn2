'use client';

import React, { useEffect, useRef } from 'react';
import { useSimulationStore } from '@/presentation/state/useSimulationStore';

export const SimulationController: React.FC = () => {
  const { isRunning, speed, tick } = useSimulationStore();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      const interval = 1000 / speed;
      timerRef.current = setInterval(() => {
        tick();
      }, interval);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, speed, tick]);

  return null; // This is a headless controller
};
