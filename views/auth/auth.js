// FRONTEND JS FOR LOGIN.HTML AND REGISTER.HTML


// Auth API
const AUTH_URL = AUTH_API_URL;

async function register(){

    const username = document.getElementById("reg-username").value.trim();
    const email = document.getElementById("reg-email").value.trim();
    const password = document.getElementById("reg-password").value.trim();

    if(!username || !email || !password){
        alert("Please fill all fields");
        return;
    }

    try{
        const response = await fetch(`${AUTH_URL}/register`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username, email, password})
        });

        const data = await response.json();

        if(response.ok){
            localStorage.setItem("token", data.token);
            alert("Registration successful");
            window.location.href = "./login.html";
        }else{
            alert(data.message || "Registration failed");
        }

    }catch(err){
        console.error(err);
        alert("Error connecting to server");
    }
}


async function login(){

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();

    if(!email || !password){
        alert("Please fill all fields");
        return;
    }

    try{
        const response = await fetch(`${AUTH_URL}/login`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if(response.ok){
            localStorage.setItem("token", data.token);
            alert("Login successful!");
            window.location.href = "../notes/index.html";
        }else{
            alert(data.message || "Invalid Credentials");
        }

    }catch(err){
        console.error(err);
        alert("Error connecting server");
    }
}