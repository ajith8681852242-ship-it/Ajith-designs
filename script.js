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








