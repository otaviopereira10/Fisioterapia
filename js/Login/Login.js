document.getElementById("login-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("https://spectacular-jerrilee-otavio-a8263f63.koyeb.app/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ user: username, senha: password })
    });

    const data = await response.text();

    if (response.ok) {
        alert("Login realizado com sucesso!");
        window.location.href = "pages/TelaInicial.html"; // Redireciona para a tela inicial
    } else {
        alert("Erro: " + data);
    }
});
