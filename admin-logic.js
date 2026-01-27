// 1. மெனு மற்றும் டிசைன் வேலைகள்
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
});

// 2. லாகின் கனெக்ஷன் (இது வெளியே இருக்க வேண்டும்)
const MY_PASS = "0000"; 

function handleLogin() {
    // HTML-ல் உள்ள Password பாக்ஸை எடுக்கிறது
    const passInput = document.getElementById('passKey');
    
    if (passInput.value === MY_PASS) {
        // லாகின் தகவலை பிரவுசரில் சேமிக்கிறது
        localStorage.setItem("isAdminLoggedIn", "true");
        
        // Dashboard பக்கத்திற்கு அழைத்துச் செல்கிறது
        window.location.href = "Dashboard.html"; 
    } else {
        alert("தவறான பாஸ்வேர்டு!");
    }
}



















