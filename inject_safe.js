const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'index.html' && !f.includes('book') && !f.includes('summary'));

files.forEach(f => {
    let code = fs.readFileSync(f, 'utf8');

    // 1. Inject settings.js
    if (!code.includes('settings.js')) {
        code = code.replace('</head>', '<script src="settings.js"></script>\n</head>');
    }

    // 2. Replace the JS Timer Logic
    const startIdx = code.indexOf('    function checkStatus() {');
    const endIdx = code.indexOf('    function getCurrentComboData() {');
    
    if (startIdx !== -1 && endIdx !== -1) {
        let isPoster = (f === 'poster-design.html') ? "AppConfig.Badges.PosterNormalText" : "AppConfig.Badges.NormalText";
        
        const newJs = `    function checkStatus() {
        if(!window.getFestivalState) return;
        const state = window.getFestivalState();
        const labelEl = document.getElementById('dynamicLabel');
        const badgeEl = document.getElementById('topBadge');
        const timerBox = document.getElementById('timerBox');
        const timerStatus = document.getElementById('timerStatus');

        if (state) {
            isFestMode = true;
            if(timerBox) timerBox.style.display = 'flex'; 
            if(badgeEl) { badgeEl.innerText = AppConfig.Badges.OfferText; badgeEl.className = "status-badge " + AppConfig.Badges.OfferBg; }
            if(labelEl) labelEl.innerHTML = state.labelHTML;
            if(timerStatus) timerStatus.innerText = (state.type === "Active") ? "OFFER ENDS IN" : "OFFER STARTS IN";
            if(state.targetTime) {
                const diffMs = state.targetTime - window.getRealIST();
                if (diffMs <= 0) { setTimeout(checkStatus, 1000); }
                else {
                    const el = document.getElementById('timerClock');
                    if(el) el.innerText = window.formatTimerDiff(diffMs);
                }
            }
        } else {
            isFestMode = false;
            if(timerBox) timerBox.style.display = 'none'; 
            if(badgeEl) { badgeEl.innerText = ${isPoster}; badgeEl.className = "status-badge " + AppConfig.Badges.NormalBg; }
            if(labelEl) labelEl.innerText = "Select Your Combo";
        }
        renderButtons();
    }

`;
        code = code.substring(0, startIdx) + newJs + code.substring(endIdx);
        
        // Remove the old FESTIVAL_DB
        code = code.replace(/const FESTIVAL_DB = \[\s*\{[\s\S]*?\}\s*\];/s, '');
    }
    
    fs.writeFileSync(f, code, 'utf8');
});
console.log('Timer connection injected successfully into original design!');
