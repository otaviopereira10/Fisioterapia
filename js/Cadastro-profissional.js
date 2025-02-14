document.addEventListener("DOMContentLoaded", async function () {
    const dropdownBtn = document.getElementById("dropdown-btn");
    const dropdownContent = document.getElementById("dropdown-content");
    const form = document.getElementById("add-form");

    let clinicaIdsSelecionadas = [];

    // 🔄 Buscar Clínicas da API
    async function carregarClinicas() {
        try {
            const response = await fetch("https://spectacular-jerrilee-otavio-a8263f63.koyeb.app/api/clinicas");
            if (!response.ok) throw new Error("Erro ao buscar clínicas");

            const clinicas = await response.json();
            dropdownContent.innerHTML = ""; // Limpa antes de preencher

            clinicas.forEach(clinica => {
                const label = document.createElement("label");
                label.innerHTML = `
                    <input type="checkbox" value="${clinica.id}" class="clinica-checkbox">
                    ${clinica.nome}
                `;
                dropdownContent.appendChild(label);
            });

            document.querySelectorAll(".clinica-checkbox").forEach(checkbox => {
                checkbox.addEventListener("change", function () {
                    const id = parseInt(this.value);
                    if (this.checked) {
                        if (!clinicaIdsSelecionadas.includes(id)) {
                            clinicaIdsSelecionadas.push(id);
                        }
                    } else {
                        clinicaIdsSelecionadas = clinicaIdsSelecionadas.filter(c => c !== id);
                    }
                    atualizarTextoDropdown();
                });
            });

        } catch (error) {
            console.error("Erro ao carregar clínicas:", error);
        }
    }

    // 🔄 Atualizar texto do botão com clínicas selecionadas
    function atualizarTextoDropdown() {
        if (clinicaIdsSelecionadas.length === 0) {
            dropdownBtn.textContent = "Selecione as clínicas";
        } else {
            dropdownBtn.textContent = `Selecionadas: ${clinicaIdsSelecionadas.length}`;
        }
    }

    // 🎯 Abrir ou fechar dropdown ao clicar
    dropdownBtn.addEventListener("click", function () {
        this.parentElement.classList.toggle("active");
    });

    // 🔄 Enviar dados ao backend via POST
    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value;
        const especialidade = document.getElementById("especialidade").value;
        const registro = document.getElementById("registro").value;
        const telefone = document.getElementById("telefone").value;

        if (clinicaIdsSelecionadas.length === 0) {
            alert("Erro: Selecione pelo menos uma clínica!");
            return;
        }

        const profissional = {
            nome,
            especialidade,
            registro,
            telefone,
            clinicaIds: clinicaIdsSelecionadas
        };

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
            console.error("Erro ao cadastrar profissional:", error);
            alert("Erro ao cadastrar profissional. Tente novamente.");
        }
    });

    // 🔄 Carregar clínicas ao iniciar
    carregarClinicas();
});
