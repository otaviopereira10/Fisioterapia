document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("add-form");

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        // 🔍 Captura os valores do formulário
        const nome = document.getElementById("nome").value;
        const idade = parseInt(document.getElementById("idade").value);
        const telefone = document.getElementById("telefone").value;
        const endereco = document.getElementById("endereco").value;

        // ❌ Validação básica
        if (!nome || !idade || !telefone || !endereco) {
            alert("Preencha todos os campos!");
            return;
        }

        const paciente = { nome, idade, telefone, endereco };

        try {
            // 📡 Enviar para o back-end (POST)
            const response = await fetch("https://spectacular-jerrilee-otavio-a8263f63.koyeb.app/api/pacientes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(paciente)
            });

            if (!response.ok) {
                throw new Error("Erro ao cadastrar paciente");
            }

            alert("Paciente cadastrado com sucesso!");
            form.reset(); // 🧹 Limpa o formulário após o cadastro
        } catch (error) {
            console.error("Erro ao cadastrar paciente:", error);
            alert("Erro ao cadastrar paciente. Tente novamente.");
        }
    });
});
