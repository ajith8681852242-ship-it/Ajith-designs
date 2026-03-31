const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && !f.includes('index') && !f.includes('book') && !f.includes('summary'));

files.forEach(f => {
    let code = fs.readFileSync(f, 'utf8');
    
    // Replace the fat combo-line with the classic one
    // We match from `<div class="combo-line"` until AFTER the `</div>` of the timer box
    // Because the combo-line has two direct children: dynamicLabel and timerBox, 
    // BUT the new layout has left-group containing dynamicLabel & product-stars, then timerBox.
    
    // So let's match the old combo block exactly:
    const regex = /<div class="combo-line" style="display:flex; justify-content:space-between; align-items:center;">[\s\S]*?<div class="timer-wrapper" id="timerBox"[^>]*>[\s\S]*?<span id="timerStatus"[^>]*>.*?<\/span>[\s\S]*?<span id="timerClock"[^>]*>.*?<\/span>[\s\S]*?<\/div>\s*<\/div>/g;
    
    code = code.replace(regex, `<div class="combo-line">
            <div id="dynamicLabel" class="combo-label">Select Your Combo</div>
            <div class="timer-wrapper" id="timerBox">
                <span id="timerStatus">OFFER ENDS IN</span>
                <span id="timerClock">00d 00h 00m 00s</span>
            </div>
        </div>`);

    fs.writeFileSync(f, code);
});
console.log('Combo lines stripped');
