const fs = require('fs');

try {
  const content = fs.readFileSync('src/pages/Settings.tsx', 'utf8');
  
  // Verificar se há problemas básicos de sintaxe
  const lines = content.split('\n');
  
  // Verificar parênteses e chaves balanceados
  let braces = 0;
  let parens = 0;
  let brackets = 0;
  
  lines.forEach((line, index) => {
    for (let char of line) {
      if (char === '{') braces++;
      if (char === '}') braces--;
      if (char === '(') parens++;
      if (char === ')') parens--;
      if (char === '[') brackets++;
      if (char === ']') brackets--;
    }
    
    // Verificar se a linha tem problemas óbvios
    if (line.includes('import') && line.includes('Input') && !line.includes('from')) {
      console.log(`Possível problema na linha ${index + 1}: ${line.trim()}`);
    }
  });
  
  console.log(`Chaves: ${braces}, Parênteses: ${parens}, Colchetes: ${brackets}`);
  
  if (braces !== 0 || parens !== 0 || brackets !== 0) {
    console.log('ERRO: Símbolos não balanceados!');
  } else {
    console.log('Símbolos balanceados OK');
  }
  
  // Verificar duplicações de Input especificamente
  const inputMatches = content.match(/\bInput\b/g);
  if (inputMatches) {
    console.log(`'Input' aparece ${inputMatches.length} vezes no arquivo`);
  }
  
} catch (error) {
  console.error('Erro ao ler o arquivo:', error.message);
}