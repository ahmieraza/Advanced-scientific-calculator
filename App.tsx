import { useState } from "react";
import { CalculatorDisplay } from "./components/CalculatorDisplay";
import { CalculatorButtons } from "./components/CalculatorButtons";
import { ButtonValue, CalcState } from "./src/types";
import { 
  evaluateExpression, 
  isValidExpression, 
  formatNumber, 
  canAddDecimal, 
  shouldReplaceOperator
} from "./utils/calculator";

export default function App() {
  const [state, setState] = useState<CalcState>({
    input: '',
    result: '0',
    waitingForOperand: false,
    isScientificMode: true,
    isDegreeMode: true,
    isInverseMode: false,
    isShiftMode: false,
    isAlphaMode: false,
    isHypMode: false,
    memory: 0,
  });

  const [lastAnswer, setLastAnswer] = useState<number>(0);

  const handleButtonClick = (value: ButtonValue) => {
    setState((prev) => {
      switch (value) {
        case 'AC':
          return {
            ...prev,
            input: '',
            result: '0',
            waitingForOperand: false,
            isShiftMode: false,
            isAlphaMode: false,
          };

        case '⌫':
          if (prev.waitingForOperand) {
            return {
              ...prev,
              input: '',
              result: '0',
              waitingForOperand: false,
            };
          }
          return {
            ...prev,
            input: prev.input.slice(0, -1),
            result: prev.input.slice(0, -1) || '0',
          };

        case 'SHIFT':
          return {
            ...prev,
            isShiftMode: !prev.isShiftMode,
            isAlphaMode: false,
          };

        case 'ALPHA':
          return {
            ...prev,
            isAlphaMode: !prev.isAlphaMode,
            isShiftMode: false,
          };

        case 'DEG':
          return {
            ...prev,
            isDegreeMode: !prev.isDegreeMode,
          };

        case 'hyp':
          return {
            ...prev,
            isHypMode: !prev.isHypMode,
          };

        case '=':
          if (!prev.input) {
            return prev;
          }
          // Allow evaluation even with incomplete expressions
          const result = evaluateExpression(prev.input, prev.isDegreeMode);
          if (result !== null) {
            setLastAnswer(result);
            return {
              ...prev,
              input: '',
              result: formatNumber(result),
              waitingForOperand: true,
              isShiftMode: false,
              isAlphaMode: false,
            };
          }
          return prev;

        case 'Ans':
          if (prev.waitingForOperand) {
            return {
              ...prev,
              input: String(lastAnswer),
              result: String(lastAnswer),
              waitingForOperand: false,
            };
          }
          return {
            ...prev,
            input: prev.input + String(lastAnswer),
            result: prev.input + String(lastAnswer),
          };

        case 'sin':
        case 'cos':
        case 'tan':
          const func = prev.isShiftMode 
            ? (value === 'sin' ? 'asin' : value === 'cos' ? 'acos' : 'atan')
            : value;
          
          if (prev.waitingForOperand) {
            return {
              ...prev,
              input: func + '(',
              result: func + '(',
              waitingForOperand: false,
              isShiftMode: false,
            };
          }
          return {
            ...prev,
            input: prev.input + func + '(',
            result: prev.input + func + '(',
            isShiftMode: false,
          };

        case 'log':
          if (prev.isShiftMode) {
            if (prev.waitingForOperand) {
              return {
                ...prev,
                input: '10^',
                result: '10^',
                waitingForOperand: false,
                isShiftMode: false,
              };
            }
            return {
              ...prev,
              input: prev.input + '10^',
              result: prev.input + '10^',
              isShiftMode: false,
            };
          }
          if (prev.waitingForOperand) {
            return {
              ...prev,
              input: 'log(',
              result: 'log(',
              waitingForOperand: false,
            };
          }
          return {
            ...prev,
            input: prev.input + 'log(',
            result: prev.input + 'log(',
          };

        case 'ln':
          if (prev.isShiftMode) {
            if (prev.waitingForOperand) {
              return {
                ...prev,
                input: 'e^',
                result: 'e^',
                waitingForOperand: false,
                isShiftMode: false,
              };
            }
            return {
              ...prev,
              input: prev.input + 'e^',
              result: prev.input + 'e^',
              isShiftMode: false,
            };
          }
          if (prev.waitingForOperand) {
            return {
              ...prev,
              input: 'ln(',
              result: 'ln(',
              waitingForOperand: false,
            };
          }
          return {
            ...prev,
            input: prev.input + 'ln(',
            result: prev.input + 'ln(',
          };

        case '√':
          if (prev.isShiftMode) {
            // nth root
            return {
              ...prev,
              input: prev.input + '^(1/',
              result: prev.input + '^(1/',
              isShiftMode: false,
            };
          }
          if (prev.waitingForOperand) {
            return {
              ...prev,
              input: '√(',
              result: '√(',
              waitingForOperand: false,
            };
          }
          return {
            ...prev,
            input: prev.input + '√(',
            result: prev.input + '√(',
          };

        case 'x⁻¹':
          if (prev.isShiftMode) {
            // Factorial
            if (prev.waitingForOperand) {
              return {
                ...prev,
                input: prev.result + '!',
                result: prev.result + '!',
                waitingForOperand: false,
                isShiftMode: false,
              };
            }
            return {
              ...prev,
              input: prev.input + '!',
              result: prev.input + '!',
              isShiftMode: false,
            };
          }
          // 1/x
          if (prev.waitingForOperand) {
            const val = parseFloat(prev.result);
            if (val !== 0) {
              return {
                ...prev,
                input: '',
                result: formatNumber(1 / val),
                waitingForOperand: true,
              };
            }
          }
          return {
            ...prev,
            input: prev.input + '1/(',
            result: prev.input + '1/(',
          };

        case 'x²':
          if (prev.isShiftMode) {
            // x^n
            return {
              ...prev,
              input: prev.input + '^',
              result: prev.input + '^',
              isShiftMode: false,
            };
          }
          if (prev.waitingForOperand) {
            return {
              ...prev,
              input: prev.result + '²',
              result: prev.result + '²',
              waitingForOperand: false,
            };
          }
          return {
            ...prev,
            input: prev.input + '²',
            result: prev.input + '²',
          };

        case 'xʸ':
          if (prev.waitingForOperand) {
            return {
              ...prev,
              input: prev.result + '^',
              result: prev.result + '^',
              waitingForOperand: false,
            };
          }
          return {
            ...prev,
            input: prev.input + '^',
            result: prev.input + '^',
          };

        case 'Exp':
          if (prev.waitingForOperand) {
            return {
              ...prev,
              input: prev.result + 'E',
              result: prev.result + 'E',
              waitingForOperand: false,
            };
          }
          return {
            ...prev,
            input: prev.input + 'E',
            result: prev.input + 'E',
          };

        case 'π':
        case 'e':
          if (prev.waitingForOperand) {
            return {
              ...prev,
              input: value,
              result: value,
              waitingForOperand: false,
            };
          }
          return {
            ...prev,
            input: prev.input + value,
            result: prev.input + value,
          };

        case '(':
        case ')':
          if (prev.waitingForOperand && value === '(') {
            return {
              ...prev,
              input: value,
              result: value,
              waitingForOperand: false,
            };
          }
          return {
            ...prev,
            input: prev.input + value,
            result: prev.input + value,
          };

        case '(-)':
          if (prev.waitingForOperand) {
            return {
              ...prev,
              input: '(-',
              result: '(-',
              waitingForOperand: false,
            };
          }
          return {
            ...prev,
            input: prev.input + '(-',
            result: prev.input + '(-',
          };

        case 'M+':
          const currentVal = parseFloat(prev.result);
          if (!isNaN(currentVal)) {
            return {
              ...prev,
              memory: prev.memory + currentVal,
            };
          }
          return prev;

        case 'RCL':
          if (prev.waitingForOperand) {
            return {
              ...prev,
              input: String(prev.memory),
              result: String(prev.memory),
              waitingForOperand: false,
            };
          }
          return {
            ...prev,
            input: prev.input + String(prev.memory),
            result: prev.input + String(prev.memory),
          };

        case '+':
        case '-':
        case '×':
        case '÷':
          if (prev.waitingForOperand) {
            return {
              ...prev,
              input: prev.result + value,
              result: prev.result,
              waitingForOperand: false,
            };
          }
          if (shouldReplaceOperator(prev.input, value)) {
            return {
              ...prev,
              input: prev.input.slice(0, -1) + value,
            };
          }
          return {
            ...prev,
            input: prev.input + value,
            result: prev.input + value,
          };

        case '.':
          if (prev.waitingForOperand) {
            return {
              ...prev,
              input: '0.',
              result: '0.',
              waitingForOperand: false,
            };
          }
          if (canAddDecimal(prev.input || '0')) {
            return {
              ...prev,
              input: (prev.input || '0') + '.',
              result: (prev.input || '0') + '.',
            };
          }
          return prev;

        // Handle other functions with default behavior
        case 'CALC':
        case '∫dx':
        case 'Logₓy':
        case 'x/y':
        case 'mod':
        case 'FACT':
        case 'nPr':
        case 'nCr':
        case 'ENG':
        case 'S⇔D':
        case 'CONST':
        case 'CONV':
        case 'SI':
        case 'MODE':
        case '2nd':
          // These would need more complex implementations
          return prev;

        default:
          // Number buttons (0-9)
          if (prev.waitingForOperand) {
            return {
              ...prev,
              input: value,
              result: value,
              waitingForOperand: false,
            };
          }
          const newInput = prev.input + value;
          return {
            ...prev,
            input: newInput,
            result: newInput,
          };
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 flex items-center justify-center p-1 sm:p-2">
      <div className="w-full max-w-xl bg-slate-300 rounded-2xl shadow-2xl p-2 sm:p-3 border-4 border-slate-400">
        {/* Top status bar */}
        <div className="bg-slate-200 rounded-lg px-2 py-0.5 mb-1.5 flex justify-between items-center text-[10px]">
          <div className="flex gap-3 text-slate-700">
            <span className={state.isDegreeMode ? 'font-bold' : ''}>DEG</span>
            <span className={state.isShiftMode ? 'font-bold text-orange-600' : ''}>SHIFT</span>
            <span className={state.isAlphaMode ? 'font-bold text-blue-600' : ''}>ALPHA</span>
            {state.memory !== 0 && <span className="font-bold">M</span>}
          </div>
          <div className="text-slate-600">HiPER Calc</div>
        </div>
        
        <CalculatorDisplay input={state.input} result={state.result} />
        <CalculatorButtons 
          onButtonClick={handleButtonClick} 
          isDegreeMode={state.isDegreeMode}
          isShiftMode={state.isShiftMode}
          isAlphaMode={state.isAlphaMode}
          isHypMode={state.isHypMode}
        />
      </div>
    </div>
  );
}
