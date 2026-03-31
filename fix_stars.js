const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && !f.includes('index') && !f.includes('book') && !f.includes('summary'));

files.forEach(f => {
    let code = fs.readFileSync(f, 'utf8');

    // Fix static stars in HTML (they became ????? or â˜… due to powershell/node encoding bugs)
    code = code.replace(/<span class="stars-fill">.*?<\/span>/g, '<span class="stars-fill">&#9733;&#9733;&#9733;&#9733;&#9733;</span>');

    // Fix JS stars generator
    code = code.replace(/box\.querySelector\('\.stars-fill'\)\.innerText = .*?;/g, 
        'box.querySelector(\'.stars-fill\').innerHTML = "&#9733;".repeat(filled) + "&#9734;".repeat(5-filled);');

    fs.writeFileSync(f, code);
});
console.log('Fixed star encoding');
