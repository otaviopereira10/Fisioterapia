document.addEventListener("DOMContentLoaded", async function () {
    const form = document.getElementById("add-form");
    const dropdownBtn = document.getElementById("dropdown-btn");
    const dropdownContent = document.getElementById("dropdown-content");

    let clinicaIdsSelecionadas = [];

    // 🔄 Buscar Clínicas da API e preencher o dropdown
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
                        clinicaIdsSelecionadas.push(id);
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

    // 🔄 Atualizar texto do botão do dropdown com clínicas selecionadas
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

    // ✅ Cadastrar paciente com clínicas associadas
    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const idade = document.getElementById("idade").value.trim();
        const telefone = document.getElementById("telefone").value.trim();
        const endereco = document.getElementById("endereco").value.trim();

        // ✅ Convertendo `idade` para número e garantindo que não seja `NaN`
        const idadeNum = idade !== "" ? parseInt(idade) : NaN;

        // 🚨 Verificação reforçada
        if (!nome || isNaN(idadeNum) || !telefone || !endereco || clinicaIdsSelecionadas.length === 0) {
            alert("⚠️ Preencha todos os campos corretamente e selecione ao menos uma clínica!");
            return;
        }

        // 📡 Paciente com array de IDs correto
        const paciente = { 
            nome, 
            idade: idadeNum, 
            telefone, 
            endereco, 
            clinicaIds: clinicaIdsSelecionadas
        };

        try {
            const response = await fetch("https://spectacular-jerrilee-otavio-a8263f63.koyeb.app/api/pacientes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(paciente)
            });

            // 🛑 Verificar se o backend retornou erro
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Erro no servidor: ${errorText}`);
            }

            alert("✅ Paciente cadastrado com sucesso!");
            window.location.href = "Sub-pages/Consultar-paciente.html";
            form.reset();
            clinicaIdsSelecionadas = [];
            atualizarTextoDropdown();
            document.querySelectorAll(".clinica-checkbox:checked").forEach(checkbox => checkbox.checked = false);
        } catch (error) {
            console.error("❌ Erro ao cadastrar paciente:", error);
            alert(`Erro ao cadastrar paciente. Detalhes: ${error.message}`);
        }
    });

    // 🔄 Carregar clínicas ao iniciar
    await carregarClinicas();
});
