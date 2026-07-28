import React, { useState } from 'react';

interface Props {
  initialServings: number;
}

export default function Scaler({ initialServings }: Props) {
  const [servings, setServings] = useState(initialServings);

  const updateServings = (newVal: number) => {
    if (newVal < 1) return;
    setServings(newVal);
    // Dispatch custom event for quantity recalculation in DOM
    const event = new CustomEvent('servingsChange', { detail: { multiplier: newVal / initialServings, servings: newVal } });
    window.dispatchEvent(event);
  };

  return (
    <div className="flex items-center gap-3 bg-stone-100 p-2 rounded-lg border border-stone-200 text-sm no-print">
      <span className="font-semibold text-stone-700">Servings:</span>
      <div className="flex items-center border border-stone-300 rounded bg-white overflow-hidden">
        <button
          onClick={() => updateServings(servings - 1)}
          className="px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold border-r border-stone-300"
        >
          -
        </button>
        <span className="px-4 py-1 font-mono font-bold text-stone-900">{servings}</span>
        <button
          onClick={() => updateServings(servings + 1)}
          className="px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold border-l border-stone-300"
        >
          +
        </button>
      </div>
    </div>
  );
}
