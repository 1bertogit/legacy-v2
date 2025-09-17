const fs = require('fs');

const content = fs.readFileSync('src/pages/Settings.tsx', 'utf8');
const lines = content.split('\n');

const identifiers = {};
const duplicates = [];

lines.forEach((line, index) => {
  const match = line.match(/^  ([A-Z][a-zA-Z]*),\s*$/);
  if (match) {
    const identifier = match[1];
    const lineNumber = index + 1;
    
    if (identifiers[identifier]) {
      duplicates.push({
        identifier,
        firstLine: identifiers[identifier],
        duplicateLine: lineNumber
      });
    } else {
      identifiers[identifier] = lineNumber;
    }
  }
});

if (duplicates.length > 0) {
  console.log('Duplicações encontradas:');
  duplicates.forEach(dup => {
    console.log(`${dup.identifier}: linha ${dup.firstLine} e linha ${dup.duplicateLine}`);
  });
} else {
  console.log('Nenhuma duplicação encontrada.');
}