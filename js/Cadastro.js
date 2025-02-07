document.addEventListener("DOMContentLoaded", function () {
    const roleSelect = document.getElementById("role");
    const registroField = document.getElementById("registro-field");

    // Função para mostrar ou ocultar o campo "Registro Profissional"
    roleSelect.addEventListener("change", function () {
        if (roleSelect.value === "especialista") {
            registroField.classList.remove("hidden");
            document.getElementById("registro").setAttribute("required", "required"); // Exigir preenchimento
        } else {
            registroField.classList.add("hidden");
            document.getElementById("registro").removeAttribute("required"); // Remover obrigatoriedade
        }
    });

    document.getElementById("cadastro-usuario-form").addEventListener("submit", async function (event) {
        event.preventDefault();

        const role = roleSelect.value;
        const registro = document.getElementById("registro") ? document.getElementById("registro").value : "";
        const nome = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const user = document.getElementById("username").value;
        const senha = document.getElementById("password").value;
        const confirmSenha = document.getElementById("confirm-password").value;

        if (senha !== confirmSenha) {
            alert("As senhas não coincidem!");
            return;
        }

        // Se o usuário for especialista, o registro deve ser obrigatório
        if (role === "especialista" && !registro) {
            alert("Especialistas devem fornecer um Registro Profissional!");
            return;
        }

        const usuario = {
            registro: role === "especialista" ? registro : null, // Envia `null` se não for especialista
            nome,
            email,
            user,
            senha,
            role
        };

        try {
            const response = await fetch("https://spectacular-jerrilee-otavio-a8263f63.koyeb.app/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(usuario)
            });

            const responseData = await response.text();

            if (!response.ok) {
                throw new Error("Erro na requisição: " + responseData);
            }

            alert("Cadastro realizado com sucesso!");
            window.location.href = "../index.html"; // Redireciona para login
        } catch (error) {
            alert("Erro ao cadastrar: " + error.message);
            console.error("Erro:", error);
        }
    });
});
