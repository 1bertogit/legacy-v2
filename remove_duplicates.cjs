const fs = require('fs');

const content = fs.readFileSync('src/pages/Settings.tsx', 'utf8');
const lines = content.split('\n');

const identifiers = {};
const linesToRemove = [];

lines.forEach((line, index) => {
  const match = line.match(/^  ([A-Z][a-zA-Z]*),\s*$/);
  if (match) {
    const identifier = match[1];
    const lineNumber = index + 1;
    
    if (identifiers[identifier]) {
      linesToRemove.push(index);
      console.log(`Removendo duplicação de ${identifier} na linha ${lineNumber}`);
    } else {
      identifiers[identifier] = lineNumber;
    }
  }
});

// Remove as linhas duplicadas (de trás para frente para não afetar os índices)
linesToRemove.reverse().forEach(lineIndex => {
  lines.splice(lineIndex, 1);
});

const newContent = lines.join('\n');
fs.writeFileSync('src/pages/Settings.tsx', newContent);

console.log(`Removidas ${linesToRemove.length} duplicações.`);