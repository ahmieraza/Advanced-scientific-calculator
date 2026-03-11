export type ButtonValue = 
  | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
  | '+' | '-' | '×' | '÷' | '='
  | 'C' | 'AC' | '⌫' | '.'
  | 'sin' | 'cos' | 'tan' | 'log' | 'ln' | '√' | 'x²' | 'xʸ' | '(' | ')' | 'π' | 'e'
  | 'SHIFT' | 'ALPHA' | 'MODE' | '2nd' | 'DEG' | 'hyp'
  | 'CALC' | '∫dx' | 'x⁻¹' | 'Logₓy' | 'FACT' | 'nPr' | 'nCr'
  | 'x/y' | 'mod' | '10ˣ' | 'eˣ' | 'sin⁻¹' | 'cos⁻¹' | 'tan⁻¹'
  | '(-)' | 'RCL' | 'ENG' | 'S⇔D' | 'M+' | 'CONST' | 'CONV' | 'SI' | 'Ans' | 'Exp';

export interface CalcState {
  input: string;
  result: string;
  waitingForOperand: boolean;
  isScientificMode: boolean;
  isDegreeMode: boolean;
  isInverseMode: boolean;
  isShiftMode: boolean;
  isAlphaMode: boolean;
  isHypMode: boolean;
  memory: number;
}