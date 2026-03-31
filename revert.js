const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'index.html' && !f.includes('book') && !f.includes('summary'));

files.forEach(f => {
    let code = fs.readFileSync(f, 'utf8');

    // 1. Extract data-product identity
    const starMatch = code.match(/<div class="product-stars" data-product="([^"]+)".*?<\/div>/s);
    if (!starMatch) return;
    const prodName = starMatch[1];
    
    const newStarsRaw = `
                <div class="product-stars" data-product="${prodName}">
                    <span class="stars-fill">★★★★★</span>
                    <span class="rating-num-box">4.9</span>
                </div>`;

    // 2. Add stars back to main-info header row
    const titleRegex = /(<h2 class="title">Package <span>Details<\/span><\/h2>)/;
    if(titleRegex.test(code) && !code.includes('class="product-stars" data-product="'+prodName+'"')) {
        // Technically the previous version stripped it out, but right now the stars might STILL be in the code inside the combo-line.
    }

    // 3. Revert the combo-line back to old standard
    // First, let's remove the combo-line block that contains the stars
    const leftGroupRegex = /<div class="left-group"[^>]*>[\s\S]*?<\/div>\s*<\/div>/;
    
    // Actually, just find the whole updated combo-line block:
    const comboBlockRegex = /<div class="combo-line" style="display:flex; justify-content:space-between; align-items:center;">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
    // Let's make it simpler:
    const startIdx = code.indexOf('<div class="combo-line" style="display:flex; justify-content:space-between; align-items:center;">');
    if (startIdx !== -1) {
        const endIdx = code.indexOf('</div>\n        </div>\n\n        <div class="bottom-selection">', startIdx);
        if (endIdx !== -1) {
            const oldCombo = `        <div class="combo-line">
            <div id="dynamicLabel" class="combo-label">Select Your Combo</div>
            <div class="timer-wrapper" id="timerBox">
                <span id="timerStatus">OFFER ENDS IN</span>
                <span id="timerClock">00d 00h 00m 00s</span>
            </div>
        </div>`;
            
            code = code.substring(0, startIdx) + oldCombo + code.substring(endIdx + 15);
        }
    }

    // Now securely insert the stars back under Package Details title:
    code = code.replace(/(<h2 class="title">Package <span>Details<\/span><\/h2>)\s*(<div class="qty-box" id="qtyWrapper">)/, `$1${newStarsRaw}\n            </div>\n            $2`);
    // Wait, the original structure was:
    // <div class="main-info">
    //    <h2 class="title">...</h2>
    //    <div class="product-stars"...>...</div>
    // </div>
    // <div class="qty-box"...>...</div>

    // Currently it's:
    // <div class="main-info">
    //    <h2 class="title">...</h2>
    // </div>
    // <div class="qty-box"...>...</div>

    code = code.replace(/(<h2 class="title">Package <span>Details<\/span><\/h2>\s*)<\/div>\s*<div class="qty-box" id="qtyWrapper">/, `$1${newStarsRaw}\n            </div>\n            <div class="qty-box" id="qtyWrapper">`);

    fs.writeFileSync(f, code);
});
console.log('Reverted to old design successfully!');
