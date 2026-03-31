
// Simple Admin-Only Login Logic

function handleLogin() {
    const user = document.getElementById('login-user').value;
    const pass = document.getElementById('login-pass').value;

    // Master Admin Credentials
    if (user === "ajith" && pass === "0000") {
        localStorage.setItem("isAdminLoggedIn", "true");
        localStorage.setItem("currentUser", "Ajith (Admin)");
        alert("Welcome, Admin!");
        window.location.href = "index.html"; // Redirect to Homepage
    } else {
        alert("Invalid Admin Credentials!");
    }
}

// Redirect if already logged in (optional)
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('isAdminLoggedIn') === 'true' && window.location.pathname.includes('login.html')) {
        window.location.href = "index.html";
    }
});
