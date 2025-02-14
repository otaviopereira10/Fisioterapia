document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("add-form");

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value;
        const endereco = document.getElementById("endereco").value;

        const clinicaData = { nome, endereco };

        try {
            const response = await fetch("https://spectacular-jerrilee-otavio-a8263f63.koyeb.app/api/clinicas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(clinicaData)
            });

            if (response.ok) {
                alert("Clínica cadastrada com sucesso!");
                window.location.href = "Sub-pages/Consultar-clinicas.html";
            } else {
                alert("Erro ao cadastrar clínica!");
            }
        } catch (error) {
            console.error("Erro ao cadastrar clínica:", error);
            alert("Erro de conexão com o servidor.");
        }
    });
});
