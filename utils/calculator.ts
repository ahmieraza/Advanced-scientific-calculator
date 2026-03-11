export function evaluateExpression(str: string, isDegreeMode: boolean = true): number | null {
  try {
    // Auto-close unclosed parentheses
    let expression = str;
    const openParens = (expression.match(/\(/g) || []).length;
    const closeParens = (expression.match(/\)/g) || []).length;
    if (openParens > closeParens) {
      expression += ')'.repeat(openParens - closeParens);
    }

    // Replace display symbols with JavaScript operators and functions
    let sanitized = expression
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/π/g, String(Math.PI))
      .replace(/e(?![0-9])/g, String(Math.E))
      .replace(/Exp/g, 'E');

    // Handle factorial
    sanitized = sanitized.replace(/(\d+\.?\d*)!/g, (_match, num) => {
      return String(factorial(parseFloat(num)));
    });

    // Handle percentage
    sanitized = sanitized.replace(/(\d+\.?\d*)%/g, (_match, num) => {
      return String(parseFloat(num) / 100);
    });

    // Handle 1/x
    sanitized = sanitized.replace(/1\/\(([^)]+)\)/g, (_match, num) => {
      return `(1/${num})`;
    });

    // Convert trig functions based on degree/radian mode
    if (isDegreeMode) {
      sanitized = sanitized.replace(/sin\(([^)]+)\)/g, (_match, angle) => {
        return `Math.sin((${angle})*Math.PI/180)`;
      });
      sanitized = sanitized.replace(/cos\(([^)]+)\)/g, (_match, angle) => {
        return `Math.cos((${angle})*Math.PI/180)`;
      });
      sanitized = sanitized.replace(/tan\(([^)]+)\)/g, (_match, angle) => {
        return `Math.tan((${angle})*Math.PI/180)`;
      });
      sanitized = sanitized.replace(/asin\(([^)]+)\)/g, (_match, val) => {
        return `(Math.asin(${val})*180/Math.PI)`;
      });
      sanitized = sanitized.replace(/acos\(([^)]+)\)/g, (_match, val) => {
        return `(Math.acos(${val})*180/Math.PI)`;
      });
      sanitized = sanitized.replace(/atan\(([^)]+)\)/g, (_match, val) => {
        return `(Math.atan(${val})*180/Math.PI)`;
      });
    } else {
      sanitized = sanitized.replace(/sin\(/g, 'Math.sin(');
      sanitized = sanitized.replace(/cos\(/g, 'Math.cos(');
      sanitized = sanitized.replace(/tan\(/g, 'Math.tan(');
      sanitized = sanitized.replace(/asin\(/g, 'Math.asin(');
      sanitized = sanitized.replace(/acos\(/g, 'Math.acos(');
      sanitized = sanitized.replace(/atan\(/g, 'Math.atan(');
    }

    sanitized = sanitized
      .replace(/log\(/g, 'Math.log10(')
      .replace(/ln\(/g, 'Math.log(')
      .replace(/√\(/g, 'Math.sqrt(')
      .replace(/(\d+\.?\d*)²/g, 'Math.pow($1,2)');

    // Handle power operator
    sanitized = sanitized.replace(/(\d+\.?\d*)\^(\d+\.?\d*)/g, 'Math.pow($1,$2)');

    if (!sanitized) {
      return null;
    }

    // Use Function constructor for safe evaluation
    const result = new Function(`return ${sanitized}`)();
    
    if (!isFinite(result) || isNaN(result)) {
      return null;
    }

    return result;
  } catch {
    return null;
  }
}

export function factorial(n: number): number {
  if (n < 0 || !Number.isInteger(n)) return NaN;
  if (n === 0 || n === 1) return 1;
  if (n > 170) return Infinity; // Prevent overflow
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

export function isValidExpression(str: string): boolean {
  // Allow scientific functions and constants
  const sanitized = str
    .replace(/sin|cos|tan|log|ln|√|asin|acos|atan/g, '')
    .replace(/π|e|Exp/g, '3')
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/\^/g, '*')
    .replace(/!|%/g, '');

  // Check for consecutive operators (but allow negative numbers)
  if (/[+*/]{2,}/.test(sanitized)) {
    return false;
  }

  // Check for trailing operator (but allow trailing parenthesis)
  const lastChar = str.slice(-1);
  if (['+', '×', '÷'].includes(lastChar)) {
    return false;
  }

  return true;
}

export function formatNumber(num: number): string {
  if (Number.isInteger(num)) {
    return num.toString();
  }
  // Handle floating point precision issues
  const rounded = Math.round(num * 1000000000) / 1000000000;
  return rounded.toString();
}

export function canAddDecimal(input: string): boolean {
  const parts = input.split(/[+\-×÷]/);
  const currentNumber = parts[parts.length - 1];
  return !currentNumber.includes('.');
}

export function shouldReplaceOperator(input: string, _newOperator: string): boolean {
  const lastChar = input.slice(-1);
  return ['+', '-', '×', '÷'].includes(lastChar);
}
