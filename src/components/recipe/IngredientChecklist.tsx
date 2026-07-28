import React, { useState } from 'react';

interface Ingredient {
  ingredient: string;
  amount: number;
  unit: string;
  displayAmount: string;
  allergenTags?: string[];
}

interface Group {
  name: string;
  ingredients: Ingredient[];
}

interface Props {
  groups: Group[];
}

export default function IngredientChecklist({ groups }: Props) {
  const [checked, setChecked] = useState<{ [key: string]: boolean }>({});

  const toggleCheck = (key: string) => {
    setChecked(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      {groups.map((group, idx) => (
        <div key={idx} className="space-y-3">
          <h4 className="font-serif font-bold text-stone-900 border-b border-stone-200 pb-1 text-base">{group.name}</h4>
          <ul className="space-y-2">
            {group.ingredients.map((item, iIndex) => {
              const key = `${idx}-${iIndex}`;
              const isChecked = checked[key];

              return (
                <li
                  key={key}
                  onClick={() => toggleCheck(key)}
                  className={`flex items-start gap-3 p-2 rounded cursor-pointer transition select-none ${
                    isChecked ? 'line-through text-stone-400 bg-stone-50' : 'text-stone-800 hover:bg-amber-50/50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={!!isChecked}
                    onChange={() => {}}
                    className="mt-1 h-4 w-4 rounded border-stone-300 text-amber-600 focus:ring-amber-500"
                  />
                  <div className="flex-1 text-sm">
                    <span className="font-semibold">{item.displayAmount}</span> <span>{item.ingredient}</span>
                    {item.allergenTags && item.allergenTags.length > 0 && (
                      <span className="ml-2 text-[10px] uppercase font-bold text-red-700 bg-red-100 px-1.5 py-0.5 rounded">
                        Contains: {item.allergenTags.join(', ')}
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
