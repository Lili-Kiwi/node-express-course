let token;

async function login() {
    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;

    const res = await fetch("http://localhost:3000/api/v1/logon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password }),
    });

    const data = await res.json();
    token = data.token;
    document.getElementById("msg").textContent = token
        ? "Logged in!"
        : "Failed";
}

async function hello() {
    const res = await fetch("http://localhost:3000/api/v1/hello", {
        headers: { Authorization: "Bearer " + token },
    });

    const data = await res.json();
    document.getElementById("result").textContent = data.message;
}
