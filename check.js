const fs = require('fs');
const content = fs.readFileSync('style.css', 'utf-8');

// Also removing comments to not match } inside them
const nocom = content.replace(/\/\*[\s\S]*?\*\//g, '');

const lines = nocom.split('\n');
let stack = [];
for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
        let c = lines[i][j];
        if (c === '{') stack.push({line: i + 1, col: j+1});
        else if (c === '}') {
            if (stack.length > 0) stack.pop();
            else console.log('Extra } at line:', i+1);
        }
    }
}
console.log('Unclosed brackets:', stack);
