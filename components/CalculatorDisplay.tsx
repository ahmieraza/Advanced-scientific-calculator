
interface CalculatorDisplayProps {
  input: string;
  result: string;
}

export function CalculatorDisplay({ input, result }: CalculatorDisplayProps) {
  return (
    <div className="bg-slate-100 rounded-lg p-2 sm:p-3 mb-2 min-h-16 sm:min-h-20 flex flex-col justify-end border-2 border-slate-300">
      <div className="text-slate-600 text-right text-[10px] sm:text-xs h-4 sm:h-5 overflow-x-auto overflow-y-hidden whitespace-nowrap scrollbar-thin">
        {input || '\u00A0'}
      </div>
      <div className="text-slate-900 text-right text-xl sm:text-2xl font-semibold truncate mt-0.5">
        {result || '0'}
      </div>
    </div>
  );
}