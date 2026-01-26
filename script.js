document.addEventListener('DOMContentLoaded', function() {
    // 1. Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // 2. WhatsApp Popup
    const chatBtn = document.getElementById('chatBtn');
    const formOverlay = document.getElementById('formOverlay');
    const closeForm = document.getElementById('closeForm');

    if (chatBtn) {
        chatBtn.addEventListener('click', function() {
            formOverlay.style.display = 'flex';
        });
    }

    if (closeForm) {
        closeForm.addEventListener('click', function() {
            formOverlay.style.display = 'none';
        });
    }

    // 3. WhatsApp Send Function
    const submitBtn = document.getElementById('submitToWA');
    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            const name = document.getElementById('userName').value;
            const service = document.getElementById('userService').value;
            const msg = document.getElementById('userMsg').value;
            const phone = "917845188347";

            if (name.trim() === "") {
                alert("Please enter your name");
                return;
            }

            const text = `*New Inquiry*%0A*Name:* ${name}%0A*Service:* ${service}%0A*Message:* ${msg}`;
            window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
        });
    }
});






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
























