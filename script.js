document.addEventListener('DOMContentLoaded', function() {
    // 1. Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }


document.getElementById('rc-top-value').innerText = dominantStar + ".0";
            document.getElementById('rc-top-stars-display').innerText = "★".repeat(dominantStar);
            document.getElementById('rc-top-status').innerText = statusMap[dominantStar].t;
        }

        function openReviewPopup() {
            document.getElementById('rc-form-overlay').style.display = 'flex';
        }

        function closeReviewPopup() {
            document.getElementById('rc-form-overlay').style.display = 'none';
        }

        function setReviewStars(n) {
            currentStars = n;
            const stars = document.querySelectorAll('#rc-star-trigger span');
            stars.forEach((s, i) => s.classList.toggle('selected', i < n));
            document.getElementById('rc-form-type-text').innerText = statusMap[n].t;
            document.getElementById('rc-form-type-text').style.color = statusMap[n].c;
        }

        function submitFinalReview() {
            const name = document.getElementById('rc-user-name').value;
            const msg = document.getElementById('userMsg').value;
            if(!name || currentStars === 0) return alert("Please fill all details!");

            allReviews.unshift({ name, msg, rate: currentStars, time: Date.now() });
            localStorage.setItem(STORAGE_KEY, JSON.stringify(allReviews));
            closeReviewPopup();
            refreshUI();
        }

        refreshUI();




//Top Banner Time and festivel setting

function updateStatusLine() {
    const now = new Date();
    
    // Time
    document.getElementById('live-time').innerText = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true 
    });

    // Day & Month
    document.getElementById('live-day').innerText = now.toLocaleDateString('en-US', { weekday: 'short' });
    document.getElementById('live-month').innerText = now.toLocaleDateString('en-US', { month: 'short' });

    // Date - Year
    const date = now.getDate().toString().padStart(2, '0');
    document.getElementById('live-date-year').innerText = `${date} - ${now.getFullYear()}`;

    // Festival Logic
    const m = now.getMonth() + 1;
    const d = now.getDate();
    const md = `${m}-${d}`;
    const wish = document.getElementById('festival-wish');

    const festivals = {
        "1-1": "Happy New Year! ✨",
        "1-14": "Happy Pongal! 🌾",
        "10-20": "Happy Diwali! 🪔"
    };

    wish.innerText = festivals[md] || "Welcome";
}

setInterval(updateStatusLine, 1000);
updateStatusLine();












function sync() {
    for (let i = 1; i <= 3; i++) {
        const off = localStorage.getItem(`b${i}_off`);
        const tit = localStorage.getItem(`b${i}_tit`);
        const siz = localStorage.getItem(`b${i}_siz`);
        const pri = localStorage.getItem(`b${i}_pri`);
        const img = localStorage.getItem(`b${i}_img`);

        // எலிமெண்ட் இருக்கிறதா என்று சரிபார்த்து பிறகு அப்டேட் செய்யவும்
        if (off && document.getElementById(`v_off${i}`)) 
            document.getElementById(`v_off${i}`).innerText = off;
        
        if (tit && document.getElementById(`v_tit${i}`)) 
            document.getElementById(`v_tit${i}`).innerHTML = tit + " <span>Design</span>";
        
        if (siz && document.getElementById(`v_siz${i}`)) 
            document.getElementById(`v_siz${i}`).innerText = siz;
        
        if (pri && document.getElementById(`v_pri${i}`)) 
            document.getElementById(`v_pri${i}`).innerText = pri;
        
        if (img && document.getElementById(`v_img${i}`)) 
            document.getElementById(`v_img${i}`).src = img;
    }
}
window.onload = sync;
window.addEventListener('storage', sync);









document.addEventListener("DOMContentLoaded", function() {
    const observerOptions = {
        threshold: 0.15 // ஐட்டம் 15% தெரிந்தவுடன் அனிமேஷன் தொடங்கும்
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // reveal கிளாஸ் உள்ள அனைத்தையும் கவனிக்கச் சொல்கிறோம்
    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
});


























// Zoom effect on tap
document.querySelectorAll('.rev-card').forEach(card => {
    card.addEventListener('click', () => {
        card.style.transform = 'scale(1.05)';
        setTimeout(() => {
            card.style.transform = 'scale(1)';
        }, 200);
    });
});










   // Review code coment box







  const STORAGE_KEY = 'clint_realtime_reviews_v2';
        let currentStars = 0;
        let activeIdx = -1;
        let allReviews = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

        const statusMap = {
            1: { t: "Very Poor", c: "#e74c3c" }, 2: { t: "Average", c: "#e67e22" },
            3: { t: "OK", c: "#3498db" }, 4: { t: "Good", c: "#2ecc71" }, 5: { t: "Excellent", c: "#1b5e20" }
        };

        // Real-time calculation function
        function timeAgo(timestamp) {
            const now = new Date();
            const past = new Date(timestamp);
            const diffInSeconds = Math.floor((now - past) / 1000);

            if (diffInSeconds < 60) return "Just now";
            const minutes = Math.floor(diffInSeconds / 60);
            if (minutes < 60) return minutes + " min ago";
            const hours = Math.floor(minutes / 60);
            if (hours < 24) return hours + " hours ago";
            const days = Math.floor(hours / 24);
            return days + " days ago";
        }

        document.addEventListener('DOMContentLoaded', refreshUI);

        function openReviewPopup() { activeIdx = -1; document.getElementById('rc-form-overlay').style.display = 'flex'; }
        function closeReviewPopup() { document.getElementById('rc-form-overlay').style.display = 'none'; resetForm(); }
        function resetForm() { document.getElementById('rc-user-name').value = ""; document.getElementById('rc-user-msg').value = ""; setReviewStars(0); }

        function setReviewStars(n) {
            currentStars = n;
            document.querySelectorAll('#rc-star-trigger span').forEach((s, i) => s.classList.toggle('selected', i < n));
            const lbl = document.getElementById('rc-status-hint');
            if(n>0) { lbl.innerText = statusMap[n].t; lbl.style.color = statusMap[n].c; }
            else { lbl.innerText = "Select Rating"; lbl.style.color = "#eee"; }
        }

        function submitFinalReview() {
            const name = document.getElementById('rc-user-name').value;
            if (!name || currentStars === 0) return alert("Please fill Name and Stars");
            
            const reviewObj = { 
                name, 
                msg: document.getElementById('rc-user-msg').value, 
                rate: currentStars, 
                time: new Date().getTime() // Saves exact time
            };
            
            if (activeIdx > -1) {
                reviewObj.time = allReviews[activeIdx].time; // Keep original time on edit
                allReviews[activeIdx] = reviewObj;
            } else {
                allReviews.unshift(reviewObj);
            }
            
            saveAndRefresh();
            closeReviewPopup();
        }

        function deleteReview() {
            allReviews.splice(activeIdx, 1);
            saveAndRefresh();
            document.getElementById('rc-secret-menu').style.display = 'none';
        }

        function editReview() {
            const rev = allReviews[activeIdx];
            document.getElementById('rc-user-name').value = rev.name;
            document.getElementById('rc-user-msg').value = rev.msg;
            setReviewStars(rev.rate);
            document.getElementById('rc-secret-menu').style.display = 'none';
            document.getElementById('rc-form-overlay').style.display = 'flex';
        }

        function saveAndRefresh() {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(allReviews));
            refreshUI();
        }

        function refreshUI() {
            const list = document.getElementById('rc-feed');
            list.innerHTML = '';
            let counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

            allReviews.forEach((rev, i) => {
                counts[rev.rate]++;
                list.innerHTML += `<div class="rc-card" onclick="if(event.detail===3){ activeIdx=${i}; document.getElementById('rc-secret-menu').style.display='flex'; }">
                    <span class="rc-user">${rev.name}</span>
                    <span class="rc-date">${timeAgo(rev.time)}</span>
                    <div class="rc-rating-line">
                        <span class="rc-stars">${"★".repeat(rev.rate)}${"☆".repeat(5-rev.rate)}</span>
                        <span class="rc-label" style="color:${statusMap[rev.rate].c}">${statusMap[rev.rate].t}</span>
                    </div>
                    <p class="rc-para">${rev.msg}</p>
                </div>`;
            });

            for(let i=1; i<=5; i++) {
                document.getElementById('rc-p-' + i).style.width = Math.min(100, counts[i] * 5) + "%";
            }

            if(allReviews.length > 0) {
                const latest = allReviews[0];
                document.getElementById('rc-avg-num').innerText = latest.rate + ".0";
                document.getElementById('rc-avg-txt').innerText = statusMap[latest.rate].t;
                document.getElementById('rc-avg-txt').style.color = statusMap[latest.rate].c;
                document.getElementById('rc-top-star-icons').innerText = "★".repeat(latest.rate) + "☆".repeat(5-latest.rate);
            }
        }
        
        // Auto update every 30 seconds to keep time fresh
        setInterval(refreshUI, 30000);





