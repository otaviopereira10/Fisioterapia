document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("add-form");

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value;
        const especialidade = document.getElementById("especialidade").value;
        const registro = document.getElementById("registro").value; // Alterado de CRM para Registro
        const telefone = document.getElementById("telefone").value;

        const profissional = { nome, especialidade, registro, telefone };

        try {
            const response = await fetch("https://spectacular-jerrilee-otavio-a8263f63.koyeb.app/api/profissionais", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(profissional)
            });

            if (!response.ok) throw new Error("Erro ao cadastrar profissional");

            alert("Profissional cadastrado com sucesso!");
            window.location.href = "Sub-pages/Consultar-profissional.html";
        } catch (error) {
            console.error("Erro:", error);
            alert("Erro ao cadastrar profissional.");
        }
    });
});
