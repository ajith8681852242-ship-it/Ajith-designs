const fs = require('fs');

const dir = './';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let idxHtml = fs.readFileSync('index.html', 'utf8');

// Inject Settings
if(!idxHtml.includes('settings.js')) {
    idxHtml = idxHtml.replace('</head>', '<script src="settings.js"></script>\n</head>');
}

// Inject Like Button
if(!idxHtml.includes('nav-like-btn')) {
    idxHtml = idxHtml.replace('<!-- (A) ??? Black Minimalist View Counter -->', 
    `<!-- (A2) LIKE BUTTON -->
                <div class="navbar-like-btn" id="nav-like-btn" title="Like us" style="display: flex; flex-direction: row; align-items: center; gap: 6px; margin-right: 15px; cursor: pointer; color:#e74c3c;">
                    <i class="far fa-heart" id="like-icon" style="font-size:18px;"></i>
                    <span class="view-counter" id="like-count">12k</span>
                </div>
                <!-- (A) ??? Black Minimalist View Counter -->`);
}

// Inject missing global JS logic
const globalJs = `
    // GLOBAL BADGE & LIKE & PRELOADER SCRIPT
    document.addEventListener("DOMContentLoaded", function() {
        if (sessionStorage.getItem("my_session_active")) {
            const loader = document.getElementById("preloader");
            if (loader) loader.style.display = "none";
        } else {
            sessionStorage.setItem("my_session_active", "1");
        }

        const state = window.getFestivalState();
        for(let i=1; i<=10; i++) {
            let el = document.getElementById("v_off" + i);
            if(el) {
                if(state && (state.type === "Active" || state.type === "Upcoming")) {
                    el.innerText = AppConfig.Badges.OfferText;
                    el.className = "top-left-offer " + AppConfig.Badges.OfferBg;
                } else {
                    el.innerText = (i === 1) ? AppConfig.Badges.PosterNormalText : AppConfig.Badges.NormalText;
                    el.className = "top-left-offer " + AppConfig.Badges.NormalBg;
                }
            }
        }

        const likeBtn = document.getElementById("nav-like-btn");
        const likeIcon = document.getElementById("like-icon");
        const likeCount = document.getElementById("like-count");
        if(likeBtn) {
            let likes = parseInt(localStorage.getItem("global_likes_count")) || 12054;
            let hasLiked = localStorage.getItem("user_has_liked") === "true";
            
            if(hasLiked) likeIcon.className = "fas fa-heart";
            likeCount.innerText = (likes / 1000).toFixed(1) + "k";

            likeBtn.addEventListener("click", () => {
                hasLiked = !hasLiked;
                if(hasLiked) {
                    likeIcon.className = "fas fa-heart";
                    likes++;
                    localStorage.setItem("user_has_liked", "true");
                } else {
                    likeIcon.className = "far fa-heart";
                    likes--;
                    localStorage.setItem("user_has_liked", "false");
                }
                localStorage.setItem("global_likes_count", likes.toString());
                likeCount.innerText = (likes / 1000).toFixed(1) + "k";
            });
        }
    });
</script>`;

if(!idxHtml.includes('GLOBAL BADGE & LIKE')) {
    idxHtml = idxHtml.replace(/<\/script>\s*<\/body>(\s*<\/html>\s*)*$/, globalJs + '\n</body>\n</html>');
}

fs.writeFileSync('index.html', idxHtml);


// PRODUCT PAGES UPDATE
files.forEach(file => {
    if(file === 'index.html' || file === 'poster-book.html' || file === 'order-summary.html') return;
    
    let content = fs.readFileSync(file, 'utf8');

    // Add settings.js
    if(!content.includes('settings.js')) {
        content = content.replace('</head>', '<script src="settings.js"></script>\n</head>');
    }

    // Capture the product stars logic
    let starMatch = content.match(/<div class="product-stars" data-product="([^"]+)">(.*?<span class="stars-fill">.*?<\/span>.*?<span class="rating-num-box">.*?<\/span>.*?)<\/div>/s);
    if(starMatch) {
        const fullStarBlock = starMatch[0];
        const productName = starMatch[1];
        
        // Remove old stars container exactly
        content = content.replace(fullStarBlock, '');

        // Now replace combo-line with the new structure incorporating stars
        const comboRegex = /<div class="combo-line">.*?<div id="dynamicLabel" class="combo-label">.*?<\/div>.*?<div class="timer-wrapper" id="timerBox">.*?<span id="timerStatus">.*?<\/span>.*?<span id="timerClock">.*?<\/span>.*?<\/div>\s*<\/div>/s;
        
        const newCombo = `<div class="combo-line" style="display:flex; justify-content:space-between; align-items:center;">
            <div class="left-group" style="display:flex; flex-direction:column; align-items:flex-start; gap:4px;">
                <div id="dynamicLabel" class="combo-label">Select Your Combo</div>
                <div class="product-stars" data-product="${productName}" style="background:transparent; padding:0; margin:0; display:flex; align-items:center; gap:5px;">
                    <span class="stars-fill" style="color:#ffb700; font-size:11px;">★★★★★</span>
                    <span class="rating-num-box" style="font-size:10px; font-weight:600; color:#555; background:#f5f5f5; padding:1px 4px; border-radius:3px;">4.9</span>
                </div>
            </div>
            <div class="timer-wrapper" id="timerBox" style="text-align:right; display:flex; flex-direction:column; min-width:110px;">
                <span id="timerStatus" style="font-size:8px; font-weight:700; color:#6a3093; text-transform:uppercase;">OFFER ENDS IN</span>
                <span id="timerClock" style="font-size:10px; font-weight:700; color:#ff0000; display:block; min-height:16px;">00d 00h 00m 00s</span>
            </div>
        </div>`;
        
        if(!content.includes('left-group" style="display:flex')) {
            content = content.replace(comboRegex, newCombo);
        }
    }

    // Replace JS Timer Scripts
    const jsTimerMatch = /function checkStatus\(\)\s*\{[\s\S]*?(?=\}\s*function|\}\s*<\/script>|\}\s*function startCountdown)/;
    
    // We must be careful because JS regex can be tricky. Let's just find checkStatus function:
    const newTimerFunc = `function checkStatus() {
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
            if(badgeEl) { badgeEl.innerText = AppConfig.Badges.NormalText; badgeEl.className = "status-badge " + AppConfig.Badges.NormalBg; }
            if(labelEl) labelEl.innerText = "Select Your Combo";
        }
        renderButtons();
    }`;

    // Clean exact old functions
    content = content.replace(/function checkStatus\(\) \{[\s\S]*?renderButtons\(\);\s*\}/, newTimerFunc);
    // Remove Fest DB array
    content = content.replace(/const FESTIVAL_DB = \[[\s\S]*?\];/s, '');
    // Remove old helper functions
    content = content.replace(/function startCountdown\(target\) \{[\s\S]*?\}/, '');
    content = content.replace(/function getIST\(\) \{[\s\S]*?\}/, '');

    fs.writeFileSync(file, content);
});

console.log("BATCH DONE");
