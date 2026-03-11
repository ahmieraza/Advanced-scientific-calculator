import { ButtonValue } from "../src/types";

interface CalculatorButtonsProps {
  onButtonClick: (value: ButtonValue) => void;
  isDegreeMode?: boolean;
  isShiftMode?: boolean;
  isAlphaMode?: boolean;
  isHypMode?: boolean;
}

const buttonLayout: Array<Array<{ value: ButtonValue; display: string; shift?: string; alpha?: string; type: 'function' | 'constant' | 'operator' | 'number' | 'action' | 'equals' | 'mode' | 'special' }>> = [
  // Row 1 - Top menu icons (simplified)
  [
    { value: 'SHIFT', display: 'SHIFT', type: 'mode' },
    { value: 'ALPHA', display: 'ALPHA', type: 'mode' },
    { value: 'MODE', display: '◄', type: 'mode' },
    { value: 'MODE', display: '►', type: 'mode' },
    { value: 'MODE', display: 'MODE', type: 'mode' },
    { value: '2nd', display: '2nd', type: 'mode' },
  ],
  
  // Row 2
  [
    { value: 'CALC', display: 'CALC', shift: 'SOLVE', type: 'function' },
    { value: '∫dx', display: '∫dx', shift: 'd/dx', type: 'function' },
    { value: 'MODE', display: '▲', type: 'mode' },
    { value: 'MODE', display: '▼', type: 'mode' },
    { value: 'x⁻¹', display: 'x⁻¹', shift: 'x!', type: 'function' },
    { value: 'Logₓy', display: 'Logₓy', shift: '||', type: 'function' },
  ],
  
  // Row 3
  [
    { value: 'x/y', display: 'x/y', alpha: 'x', type: 'function' },
    { value: '√', display: '√x', shift: 'ⁿ√', type: 'function' },
    { value: 'x²', display: 'x²', shift: 'xⁿ', type: 'function' },
    { value: 'xʸ', display: 'xʸ', type: 'function' },
    { value: 'log', display: 'Log', type: 'function' },
    { value: 'ln', display: 'Ln', type: 'function' },
  ],
  
  // Row 4
  [
    { value: 'FACT', display: 'FACT', alpha: 'a', type: 'function' },
    { value: 'nPr', display: 'nPr', alpha: 'b', type: 'function' },
    { value: 'nCr', display: 'nCr', alpha: 'c', type: 'function' },
    { value: 'sin', display: 'Sin', shift: 'sin⁻¹', alpha: 'd', type: 'function' },
    { value: 'cos', display: 'Cos', shift: 'cos⁻¹', alpha: 'e', type: 'function' },
    { value: 'tan', display: 'Tan', shift: 'tan⁻¹', alpha: 'f', type: 'function' },
  ],
  
  // Row 5
  [
    { value: '(-)', display: '(-)', type: 'operator' },
    { value: 'mod', display: '°\'"', shift: 'mod', type: 'function' },
    { value: 'hyp', display: 'hyp', type: 'mode' },
    { value: 'sin', display: 'Sin', type: 'function' },
    { value: 'cos', display: 'Cos', type: 'function' },
    { value: 'tan', display: 'Tan', type: 'function' },
  ],
  
  // Row 6
  [
    { value: 'RCL', display: 'RCL', type: 'function' },
    { value: 'ENG', display: 'ENG', type: 'function' },
    { value: '(', display: '(', type: 'operator' },
    { value: ')', display: ')', type: 'operator' },
    { value: 'S⇔D', display: 'S⇔D', type: 'function' },
    { value: 'M+', display: 'M+', type: 'function' },
  ],
  
  // Row 7
  [
    { value: '7', display: '7', type: 'number' },
    { value: '8', display: '8', type: 'number' },
    { value: '9', display: '9', type: 'number' },
    { value: '⌫', display: '⌫', type: 'action' },
    { value: 'AC', display: 'AC', type: 'action' },
  ],
  
  // Row 8
  [
    { value: '4', display: '4', type: 'number' },
    { value: '5', display: '5', type: 'number' },
    { value: '6', display: '6', type: 'number' },
    { value: '×', display: '×', type: 'operator' },
    { value: '÷', display: '÷', type: 'operator' },
  ],
  
  // Row 9
  [
    { value: '1', display: '1', type: 'number' },
    { value: '2', display: '2', type: 'number' },
    { value: '3', display: '3', type: 'number' },
    { value: '+', display: '+', type: 'operator' },
    { value: '-', display: '-', type: 'operator' },
  ],
  
  // Row 10
  [
    { value: '0', display: '0', type: 'number' },
    { value: '.', display: '.', type: 'number' },
    { value: 'Exp', display: 'Exp', type: 'function' },
    { value: 'Ans', display: 'Ans', type: 'function' },
    { value: '=', display: '=', type: 'equals' },
  ],
];

export function CalculatorButtons({ 
  onButtonClick, 
  isDegreeMode = true, 
  isShiftMode = false,
  isAlphaMode = false,
  isHypMode = false
}: CalculatorButtonsProps) {
  
  const getButtonClasses = (type: string, value: ButtonValue, rowIndex: number): string => {
    const baseClasses = "h-8 sm:h-10 text-[10px] sm:text-xs font-medium transition-all active:scale-95 active:brightness-90 rounded-md touch-manipulation select-none relative";
    
    // Highlight active mode buttons
    const isActive = 
      (value === 'DEG' && isDegreeMode) || 
      (value === 'SHIFT' && isShiftMode) ||
      (value === 'ALPHA' && isAlphaMode) ||
      (value === 'hyp' && isHypMode);
    
    // Top row special styling
    if (rowIndex === 0) {
      if (value === 'SHIFT') {
        return `${baseClasses} ${isActive ? 'bg-orange-600' : 'bg-orange-500'} hover:bg-orange-600 text-white font-bold`;
      }
      if (value === 'ALPHA') {
        return `${baseClasses} ${isActive ? 'bg-blue-600' : 'bg-blue-500'} hover:bg-blue-600 text-white font-bold`;
      }
      return `${baseClasses} bg-slate-600 hover:bg-slate-500 text-white`;
    }
    
    switch (type) {
      case 'number':
        return `${baseClasses} bg-slate-200 hover:bg-slate-300 text-slate-900 text-base sm:text-lg font-semibold`;
      case 'operator':
        if (value === '×' || value === '÷') {
          return `${baseClasses} bg-slate-700 hover:bg-slate-600 text-white font-bold text-base sm:text-lg`;
        }
        if (value === '+' || value === '-') {
          return `${baseClasses} bg-slate-700 hover:bg-slate-600 text-white font-bold text-lg sm:text-xl`;
        }
        return `${baseClasses} bg-slate-600 hover:bg-slate-500 text-white`;
      case 'equals':
        return `${baseClasses} bg-slate-700 hover:bg-slate-600 text-white font-bold text-base sm:text-lg`;
      case 'action':
        if (value === 'AC') {
          return `${baseClasses} bg-red-600 hover:bg-red-500 text-white font-bold`;
        }
        return `${baseClasses} bg-pink-600 hover:bg-pink-500 text-white font-bold`;
      case 'function':
        return `${baseClasses} bg-slate-100 hover:bg-slate-200 text-slate-800 text-[9px] sm:text-[10px]`;
      case 'constant':
        return `${baseClasses} bg-purple-600 hover:bg-purple-500 text-white`;
      case 'mode':
        if (value === 'hyp') {
          return `${baseClasses} ${isActive ? 'bg-yellow-600' : 'bg-slate-100'} hover:bg-slate-200 text-slate-800`;
        }
        return `${baseClasses} bg-slate-100 hover:bg-slate-200 text-slate-800`;
      case 'special':
        return `${baseClasses} bg-slate-600 hover:bg-slate-500 text-white`;
      default:
        return baseClasses;
    }
  };

  const getDisplayText = (button: typeof buttonLayout[0][0]): string => {
    if (isShiftMode && button.shift) {
      return button.shift;
    }
    if (isAlphaMode && button.alpha) {
      return button.alpha;
    }
    return button.display;
  };

  const getSecondaryText = (button: typeof buttonLayout[0][0]): JSX.Element | null => {
    if (!button.shift && !button.alpha) return null;
    
    return (
      <div className="absolute top-0 left-0 right-0 flex justify-between px-0.5 text-[7px] leading-none pt-0.5">
        {button.shift && <span className="text-orange-600 font-semibold">{button.shift}</span>}
        {button.alpha && <span className="text-blue-600 font-semibold ml-auto">{button.alpha}</span>}
      </div>
    );
  };

  const getColSpan = (value: ButtonValue, rowIndex: number): string => {
    // Make numbers row buttons equal width
    if (rowIndex >= 6) {
      if (rowIndex === 9 && value === '0') return 'col-span-1';
      return '';
    }
    return '';
  };

  return (
    <div className="space-y-1">
      {buttonLayout.map((row, rowIndex) => (
        <div key={rowIndex} className={`grid gap-1 ${rowIndex === 0 ? 'grid-cols-6' : rowIndex >= 6 ? 'grid-cols-5' : 'grid-cols-6'}`}>
          {row.map((button, btnIndex) => (
            <button
              key={`${rowIndex}-${btnIndex}`}
              onClick={() => onButtonClick(button.value)}
              className={`${getButtonClasses(button.type, button.value, rowIndex)} ${getColSpan(button.value, rowIndex)}`}
            >
              {getSecondaryText(button)}
              <span className={button.shift || button.alpha ? 'mt-2 block' : ''}>
                {getDisplayText(button)}
              </span>
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
