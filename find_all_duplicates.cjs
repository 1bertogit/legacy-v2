const fs = require('fs');

const content = fs.readFileSync('src/pages/Settings.tsx', 'utf8');
const lines = content.split('\n');

const identifiers = {};
const duplicates = [];

lines.forEach((line, index) => {
  const lineNumber = index + 1;
  
  // Procura por identificadores em imports
  const importMatch = line.match(/import\s*{[^}]*}/);
  if (importMatch) {
    const importContent = importMatch[0];
    const identifierMatches = importContent.match(/\b[A-Z][a-zA-Z]*\b/g);
    if (identifierMatches) {
      identifierMatches.forEach(identifier => {
        if (identifiers[identifier]) {
          duplicates.push({
            identifier,
            firstLine: identifiers[identifier],
            duplicateLine: lineNumber,
            type: 'import'
          });
        } else {
          identifiers[identifier] = lineNumber;
        }
      });
    }
  }
  
  // Procura por identificadores na lista de ícones (formato: "  Identifier, ")
  const iconMatch = line.match(/^  ([A-Z][a-zA-Z]*),\s*$/);
  if (iconMatch) {
    const identifier = iconMatch[1];
    
    if (identifiers[identifier]) {
      duplicates.push({
        identifier,
        firstLine: identifiers[identifier],
        duplicateLine: lineNumber,
        type: 'icon'
      });
    } else {
      identifiers[identifier] = lineNumber;
    }
  }
});

if (duplicates.length > 0) {
  console.log('Duplicações encontradas:');
  duplicates.forEach(dup => {
    console.log(`${dup.identifier} (${dup.type}): linha ${dup.firstLine} e linha ${dup.duplicateLine}`);
  });
} else {
  console.log('Nenhuma duplicação encontrada.');
}