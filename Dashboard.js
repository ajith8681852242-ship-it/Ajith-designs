document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
});

















<script>
// பக்கம் தயாரானதும் இந்த பங்க்ஷன் இயங்கும்
document.addEventListener("DOMContentLoaded", function() {
    
    // 1. மொபைல் மெனு பட்டன் வேலை செய்ய (Hamburger Toggle)
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle) {
        menuToggle.addEventListener("click", function() {
            navLinks.classList.toggle("active");
        });
    }

    // 2. லாகின் செய்திருந்தால் மட்டும் LOGOUT பட்டனை காட்டு (Identify)
    const status = localStorage.getItem("isLoggedIn");
    const btn = document.getElementById("logoutBtn");

    if (status === "true" && btn) {
        btn.style.display = "block";
    }
});

// 3. Logout பங்க்ஷன் (Erase Identity)
function logout() {
    localStorage.removeItem("isLoggedIn");
    alert("Logged Out!");
    window.location.href = "index.html"; 
}
</script>



// உங்கள் லாகின் பங்க்ஷனில் இதைப் போடவும்
if (passInput.value === "0000") {
    localStorage.setItem("isAdmin", "true"); // 'isAdmin' என்ற பெயரில் சேமிக்கிறோம்
    window.location.href = "index.html"; 
}





<script>
document.addEventListener("DOMContentLoaded", function() {
    // 1. சேமித்த படங்களை லோடு செய்தல் (Load Saved Images)
    for (let i = 1; i <= 3; i++) {
        const savedImg = localStorage.getItem("savedImg" + i);
        const imgElement = document.getElementById("img" + i);
        if (savedImg && imgElement) imgElement.src = savedImg;
    }

    // 2. View Count (யாராவது பக்கத்தைப் பார்த்தால் எண்ணிக்கை கூடும்)
    let views = localStorage.getItem("total_views") || 0;
    if (!sessionStorage.getItem("isViewed")) {
        views = parseInt(views) + 1;
        localStorage.setItem("total_views", views);
        sessionStorage.setItem("isViewed", "true");
    }

    // 3. Admin செக்: லாகின் செய்திருந்தால் மட்டும் Logout பட்டன் மற்றும் அப்லோட் வேலை செய்யும்
    const isAdmin = localStorage.getItem("isAdminLoggedIn") === "true";
    const logoutBtn = document.getElementById("logoutBtn");
    
    if (isAdmin && logoutBtn) {
        logoutBtn.style.display = "block";
    }

    // 4. மொபைல் அப்லோட்: Admin படத்தைக் கிளிக் செய்தால் கேலரி திறக்கும்
    window.triggerUpload = function(id) {
        if (isAdmin) {
            document.getElementById('f' + id).click();
        } else {
            console.log("மாற்றம் செய்ய உங்களுக்கு அனுமதி இல்லை.");
        }
    };
});

// Image Save: தேர்ந்தெடுக்கும் படத்தை நிரந்தரமாகச் சேமிக்கும்
function preview(event, imgId, storageKey) {
    const reader = new FileReader();
    reader.onload = function() {
        document.getElementById(imgId).src = reader.result;
        localStorage.setItem(storageKey, reader.result); // பிரவுசரில் சேமிக்கும்
        alert("படம் மாற்றப்பட்டது!");
    };
    reader.readAsDataURL(event.target.files[0]);
}

// Logout Function
function logout() {
    localStorage.removeItem("isAdminLoggedIn");
    window.location.href = "login.html";
}

// Secret View Count: 5 முறை கிளிக் செய்தால் மட்டும் தெரியும்
let clickCount = 0;
let clickTimer;
function handleSecretClick() {
    clickCount++;
    clearTimeout(clickTimer);
    clickTimer = setTimeout(() => { clickCount = 0; }, 2000);

    if (clickCount === 5) {
        const total = localStorage.getItem("total_views");
        alert("மொத்தப் பார்வையாளர்கள்: " + total);
        window.location.href = "login.html";
    }
}



function clearBox(id) {
    if(confirm("நிச்சயமாக இந்த பெட்டியை காலியாக்க வேண்டுமா?")) {
        localStorage.removeItem(`b${id}_off`);
        localStorage.removeItem(`b${id}_tit`);
        localStorage.removeItem(`b${id}_siz`);
        localStorage.removeItem(`b${id}_pri`);
        localStorage.removeItem(`b${id}_img`);
        location.reload(); // பக்கத்தை புதுப்பிக்க
    }
}













