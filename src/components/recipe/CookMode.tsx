import React, { useState } from 'react';

interface InstructionStep {
  stepNumber: number;
  heading?: string;
  instruction: string;
  durationMinutes?: number;
  panHeat?: string;
  sensoryCue?: string;
  safetyNote?: string;
}

interface Props {
  recipeTitle: string;
  steps: InstructionStep[];
}

export default function CookMode({ recipeTitle, steps }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-sm rounded shadow transition flex items-center gap-2 no-print"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        <span>Enter Cook Mode</span>
      </button>
    );
  }

  const step = steps[currentStepIndex];

  return (
    <div className="fixed inset-0 bg-stone-950/95 text-stone-100 z-50 p-6 sm:p-12 flex flex-col justify-between overflow-y-auto no-print">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-stone-800 pb-4">
        <div>
          <span className="text-xs uppercase font-semibold text-amber-500 tracking-widest">COOK MODE • STEP {currentStepIndex + 1} OF {steps.length}</span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-100">{recipeTitle}</h2>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded text-sm font-semibold"
        >
          Exit Cook Mode
        </button>
      </div>

      {/* Main Step Instruction */}
      <div className="my-auto max-w-4xl mx-auto space-y-6 py-8">
        {step.heading && (
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-amber-400">{step.heading}</h3>
        )}
        <p className="text-xl sm:text-3xl leading-relaxed text-stone-100 font-medium">
          {step.instruction}
        </p>

        {step.sensoryCue && (
          <div className="p-4 bg-amber-950/40 border border-amber-800/60 rounded-lg text-amber-200 text-sm">
            <strong>Sensory Cue:</strong> {step.sensoryCue}
          </div>
        )}

        {step.safetyNote && (
          <div className="p-4 bg-red-950/40 border border-red-800/60 rounded-lg text-red-200 text-sm">
            <strong>Food Safety:</strong> {step.safetyNote}
          </div>
        )}
      </div>

      {/* Footer Navigation Controls */}
      <div className="flex items-center justify-between border-t border-stone-800 pt-6 max-w-4xl mx-auto w-full">
        <button
          disabled={currentStepIndex === 0}
          onClick={() => setCurrentStepIndex(prev => prev - 1)}
          className="px-6 py-3 bg-stone-800 hover:bg-stone-700 disabled:opacity-30 text-stone-200 font-bold rounded-lg transition"
        >
          Previous Step
        </button>

        <span className="text-sm font-mono text-stone-400">
          {currentStepIndex + 1} / {steps.length}
        </span>

        <button
          disabled={currentStepIndex === steps.length - 1}
          onClick={() => setCurrentStepIndex(prev => prev + 1)}
          className="px-6 py-3 bg-amber-600 hover:bg-amber-500 disabled:opacity-30 text-stone-950 font-bold rounded-lg transition"
        >
          Next Step
        </button>
      </div>
    </div>
  );
}
