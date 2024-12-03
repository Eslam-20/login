let users = JSON.parse(localStorage.getItem('users')) || [];

function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
}

function signup() {
    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    if (!validateEmail(email)) {
        document.getElementById("signupError").innerHTML = "Invalid email format!";
        return;
    }

    if (users.some(user => user.email === email)) {
        document.getElementById("signupError").innerHTML = "Email already exists. Please choose another.";
        return;
    }

    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));  
    showLogin();
    alert("Registration successful! Please log in.");
}

function login() {
    const email = document.getElementById("signinE").value;
    const password = document.getElementById("signinP").value;

    const user = users.find(user => user.email == email);

    if (!user) {
        document.getElementById("incorrect").innerHTML = "User not found. Please register.";
        return;
    }

    if (user.password !== password) {
        document.getElementById("incorrect").innerHTML = "Incorrect password!";
        return;
    }

    localStorage.setItem("loggedInUser", email);
    window.location.href = "home.html"; 
}

function showSignup() {
    document.getElementById("login-form").classList.add("d-none");
    document.getElementById("signup-form").classList.remove("d-none");
    document.getElementById("signupError").innerHTML = "";
    document.getElementById("incorrect").innerHTML = "";
}

function showLogin() {
    document.getElementById("signup-form").classList.add("d-none");
    document.getElementById("login-form").classList.remove("d-none");
    document.getElementById("signupError").innerHTML = "";
    document.getElementById("incorrect").innerHTML = "";
}

function checkLogin() {
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (!loggedInUser) {
        window.location.href = "login.html"; 
    } else {
        const user = users.find(user => user.email === loggedInUser);
        if (user) {
            document.getElementById("welcome").innerHTML = `Welcome to the Home Page, ${user.name}!`; 
        }
    }
}

function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html"; 
}
