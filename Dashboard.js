/* --- AJITH STUDIO CONTROL ROOM LOGIC --- */

const ANALYTICS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby0hv7Vry05YM6F2avPUTzo4uE5iGEldOqyAqA-RKF_buiSewvyh1XlAS7Ig5tfpDhyFg/exec';

// Toast Notification System
function showToast(msg, type='success') {
    const toast = document.getElementById('toast');
    
    if (type === 'error') {
        toast.style.background = '#d93025';
        toast.innerHTML = `<i class="fas fa-exclamation-circle"></i> <span id="toast-msg">${msg}</span>`;
    } else if (type === 'loading') {
        toast.style.background = '#f39c12';
        toast.innerHTML = `<i class="fas fa-circle-notch fa-spin"></i> <span id="toast-msg">${msg}</span>`;
    } else {
        toast.style.background = '#1a1f36';
        toast.innerHTML = `<i class="fas fa-check-circle"></i> <span id="toast-msg">${msg}</span>`;
    }

    toast.style.display = 'block';
    
    if (type !== 'loading') {
        setTimeout(() => { toast.style.display = 'none'; }, 3000);
    }
}

function hideToast() {
    document.getElementById('toast').style.display = 'none';
}

// 1. Save Data (Box Editor)
function saveData(id) {
    localStorage.setItem(`b${id}_tit`, document.getElementById(`i_tit${id}`).value);
    localStorage.setItem(`b${id}_siz`, document.getElementById(`i_siz${id}`).value);
    localStorage.setItem(`b${id}_pri`, document.getElementById(`i_pri${id}`).value);
    localStorage.setItem(`b${id}_off`, document.getElementById(`i_off${id}`).value);
}

// 2. Save Image (Box Editor)
function saveImg(input, id) {
    if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = function(e) {
            localStorage.setItem(`b${id}_img`, e.target.result);
            document.getElementById(`p_img${id}`).src = e.target.result;
            showToast('Image uploaded successfully!');
        };
        reader.readAsDataURL(input.files[0]);
    }
}

// 3. Delete Data (Box Editor)
function clearData(id) {
    if(confirm(`Are you sure you want to clear the contents of Box ${id}?`)) {
        localStorage.removeItem(`b${id}_tit`);
        localStorage.removeItem(`b${id}_siz`);
        localStorage.removeItem(`b${id}_pri`);
        localStorage.removeItem(`b${id}_off`);
        localStorage.removeItem(`b${id}_img`);
        location.reload(); 
    }
}

// 4. Admin Logout
function logout() {
    if(confirm("Are you sure you want to log out?")) {
        localStorage.removeItem('isAdminLoggedIn');
        window.location.href = "login.html";
    }
}

// 5. Load Data on Initialization
window.addEventListener('DOMContentLoaded', () => {
    // Load Editor Data
    for(let i=1; i<=3; i++) {
        const tit = document.getElementById(`i_tit${i}`);
        const siz = document.getElementById(`i_siz${i}`);
        const pri = document.getElementById(`i_pri${i}`);
        const off = document.getElementById(`i_off${i}`);
        const img = document.getElementById(`p_img${i}`);

        if(tit) tit.value = localStorage.getItem(`b${i}_tit`) || "";
        if(siz) siz.value = localStorage.getItem(`b${i}_siz`) || "";
        if(pri) pri.value = localStorage.getItem(`b${i}_pri`) || "";
        if(off) off.value = localStorage.getItem(`b${i}_off`) || "";
        
        // Show placeholders instead of broken images if none stored
        if(img) {
            img.src = localStorage.getItem(`b${i}_img`) || `https://via.placeholder.com/150?text=Upload+Image`;
        }
    }
    
    // Load Analytics
    loadAnalytics();
});

// 6. Fetch & Display Analytics
function loadAnalytics() {
    fetch(ANALYTICS_SCRIPT_URL + "?action=counts&t=" + new Date().getTime())
    .then(res => res.json())
    .then(data => {
        const grid = document.getElementById('analytics-grid');
        if(!grid) return;
        
        grid.innerHTML = '';
        
        let keys = Object.keys(data);
        if (keys.length === 0) {
            grid.innerHTML = '<p style="color:#697386; font-size: 13px;">No view data found yet.</p>';
            return;
        }

        // Sort: Main first, then alphabetically
        keys = keys.sort((a,b) => {
            if(a === 'Website Main') return -1;
            if(b === 'Website Main') return 1;
            return a.localeCompare(b);
        });
        
        const sparks = [
            { c1: "#00dbde", c2: "#fc00ff", y1: 25, y2: 5, y3: 15, dy: 30, cy: 15 },
            { c1: "#4facfe", c2: "#00f2fe", y1: 10, y2: 30, y3: 25, dy: 5, cy: 25 },
            { c1: "#43e97b", c2: "#38f9d7", y1: 20, y2: 10, y3: 20, dy: 10, cy: 20 },
            { c1: "#fa709a", c2: "#fee140", y1: 15, y2: 35, y3: 10, dy: 25, cy: 10 },
            { c1: "#b224ef", c2: "#7579ff", y1: 30, y2: 15, y3: 25, dy: 5, cy: 25 },
            { c1: "#ff0844", c2: "#ffb199", y1: 5,  y2: 25, y3: 15, dy: 30, cy: 15 }
        ];

        keys.forEach((key, index) => {
            const sc = sparks[index % sparks.length];
            const glowFilter = `glow_${index}`;
            const gradId = `grad_${index}`;

            grid.innerHTML += `
               <div style="background: #27293d; border-radius: 16px; padding: 22px 20px; box-shadow: 0 10px 20px rgba(0,0,0,0.06); position: relative; overflow: hidden; height: 135px; display: flex; flex-direction: column;">
                   <div style="font-size: 24px; font-weight: 800; color: #ffffff; line-height: 1; letter-spacing: 0.5px;">${data[key]}</div>
                   <div style="font-size: 11px; color: #8a8d9d; margin-top: 6px; font-weight: 500; text-transform: capitalize;">${key}</div>
                   
                   <div style="position: absolute; bottom: -5px; left: 0; width: 100%; height: 65px;">
                       <svg viewBox="0 0 100 40" preserveAspectRatio="none" style="width: 100%; height: 100%; display: block; overflow: visible;">
                           <defs>
                               <linearGradient id="${gradId}" x1="0%" y1="0%" x2="100%" y2="0%">
                                   <stop offset="0%" style="stop-color:${sc.c1}; stop-opacity:1" />
                                   <stop offset="100%" style="stop-color:${sc.c2}; stop-opacity:1" />
                               </linearGradient>
                               <filter id="${glowFilter}" x="-20%" y="-20%" width="140%" height="140%">
                                   <feGaussianBlur stdDeviation="2" result="blur" />
                                   <feComposite in="SourceGraphic" in2="blur" operator="over" />
                               </filter>
                           </defs>
                           <path d="M -5,${sc.y1} Q 15,${sc.y2} 35,${sc.y1} T 70,${sc.cy} T 110,${sc.dy}" fill="none" stroke="url(#${gradId})" stroke-width="2.5" stroke-linecap="round" filter="url(#${glowFilter})"/>
                           <circle cx="70" cy="${sc.cy}" r="3" fill="#ffffff" filter="url(#${glowFilter})"/>
                       </svg>
                   </div>
               </div>
            `;
        });
    })
    .catch(err => {
        const grid = document.getElementById('analytics-grid');
        if(grid) grid.innerHTML = '<p style="color:#d93025; font-size: 13px;"><i class="fas fa-exclamation-triangle"></i> Failed to connect to Google Sheet.</p>';
    });
}

// 7. Clear Google Sheet Analytics (DANGER ZONE)
function clearGoogleSheetAnalytics() {
    let conf1 = confirm("⚠️ DANGER ZONE ⚠️\n\nYou are about to DELETE all logged Visitor Sessions (Client Details) from your Google Sheet.\n\nYour View Counts will remain safe.\n\nDo you want to proceed?");
    if (!conf1) return;

    let conf2 = confirm("FINAL CONFIRMATION:\nAre you absolutely sure you want to clear the Analytics Sheet? This cannot be undone.");
    if (!conf2) return;

    let btn = document.getElementById('clearAnalyticsBtn');
    if (btn) btn.disabled = true;
    showToast("Clearing Data safely...", "loading");

    let formData = new URLSearchParams();
    formData.append("action", "clear_analytics");

    fetch(ANALYTICS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: formData
    }).then(() => {
        hideToast();
        showToast("Success! Old visitor sessions cleared.", "success");
        if (btn) btn.disabled = false;
    }).catch(err => {
        hideToast();
        showToast("Connection Error. Check your internet.", "error");
        if (btn) btn.disabled = false;
    });
}
