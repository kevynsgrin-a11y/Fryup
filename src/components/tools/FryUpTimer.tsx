import React, { useState, useEffect } from 'react';

interface ActiveTimer {
  id: string;
  name: string;
  durationSeconds: number;
  remainingSeconds: number;
  isRunning: boolean;
}

export default function FryUpTimer() {
  const [timers, setTimers] = useState<ActiveTimer[]>([
    { id: 'sausages', name: 'Sausages (Pan Sear)', durationSeconds: 18 * 60, remainingSeconds: 18 * 60, isRunning: false },
    { id: 'hashbrowns', name: 'Hash Browns', durationSeconds: 12 * 60, remainingSeconds: 12 * 60, isRunning: false },
    { id: 'blackpudding', name: 'Black Pudding Slices', durationSeconds: 6 * 60, remainingSeconds: 6 * 60, isRunning: false },
    { id: 'bacon', name: 'Back Bacon Rashers', durationSeconds: 5 * 60, remainingSeconds: 5 * 60, isRunning: false },
    { id: 'eggs', name: 'Fried Eggs (Runny Yolk)', durationSeconds: 3 * 60, remainingSeconds: 3 * 60, isRunning: false }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(prev =>
        prev.map(t => {
          if (t.isRunning && t.remainingSeconds > 0) {
            return { ...t, remainingSeconds: t.remainingSeconds - 1 };
          }
          return t;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const toggleTimer = (id: string) => {
    setTimers(prev =>
      prev.map(t => (t.id === id ? { ...t, isRunning: !t.isRunning } : t))
    );
  };

  const resetTimer = (id: string) => {
    setTimers(prev =>
      prev.map(t => (t.id === id ? { ...t, remainingSeconds: t.durationSeconds, isRunning: false } : t))
    );
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-stone-900 text-stone-100 p-6 sm:p-8 rounded-xl border border-stone-800 my-8 shadow-xl">
      <div className="flex items-center justify-between border-b border-stone-800 pb-4 mb-6">
        <div>
          <span className="text-xs uppercase font-semibold text-amber-500 tracking-wider">Multi-Item Cooking Timer</span>
          <h2 className="text-2xl font-serif font-bold text-stone-100">Synchronized Fry-Up Multi-Timer</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {timers.map(timer => (
          <div key={timer.id} className="bg-stone-950 p-4 rounded-lg border border-stone-800 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs text-stone-400 font-semibold uppercase">{timer.name}</span>
              <div className="text-4xl font-mono font-bold text-amber-400 mt-2">
                {formatTime(timer.remainingSeconds)}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleTimer(timer.id)}
                className={`flex-1 py-2 rounded text-xs font-bold transition ${
                  timer.isRunning ? 'bg-red-700 hover:bg-red-800 text-white' : 'bg-amber-600 hover:bg-amber-500 text-stone-950'
                }`}
              >
                {timer.isRunning ? 'Pause' : 'Start'}
              </button>
              <button
                onClick={() => resetTimer(timer.id)}
                className="px-3 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded text-xs font-semibold"
              >
                Reset
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
