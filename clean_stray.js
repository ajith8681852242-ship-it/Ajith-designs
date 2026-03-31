const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'index.html' && !f.includes('book') && !f.includes('summary'));

files.forEach(f => {
    let code = fs.readFileSync(f, 'utf8');
    
    // The exact lines left from the half-deleted startCountdown function:
    // const diff = target - now;
    // if (diff <= 0) { checkStatus(); return; }
    // const d = Math.floor(diff / 864e5), h = Math.floor(diff % 864e5 / 36e5), m = Math.floor(diff % 36e5 / 6e4), s = Math.floor(diff % 6e4 / 1e3);
    // const el = document.getElementById('timerClock');
    // if(el) el.innerText = d + "d " + h + "h " + m + "m " + s + "s";
    // }
    
    const badCodeRegex = /\s*const diff = target - now;[\s\S]*?if\s*\(diff <= 0\).*?checkStatus\(\);\s*return;\s*\}[\s\S]*?const d = Math\.floor[^;]+;[\s\S]*?const el = document\.getElementById\('timerClock'\);[\s\S]*?if\(el\) el\.innerText = [^;]+;[\s]*\}/g;
    
    code = code.replace(badCodeRegex, '');
    fs.writeFileSync(f, code);
});
console.log('Cleanup Done!');
