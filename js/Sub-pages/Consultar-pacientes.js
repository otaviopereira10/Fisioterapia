document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.getElementById("table-body");
    const filterInput = document.getElementById("filter-input");
    const filterButton = document.getElementById("filter-button");

    carregarPacientes();

    // 🔄 Buscar e carregar pacientes na tabela
    async function carregarPacientes() {
        try {
            const response = await fetch("https://spectacular-jerrilee-otavio-a8263f63.koyeb.app/api/pacientes");
            if (!response.ok) throw new Error("Erro ao buscar pacientes");

            const pacientes = await response.json();
            console.log("📡 Pacientes recebidos:", pacientes);

            atualizarTabela(pacientes);
        } catch (error) {
            console.error("❌ Erro ao carregar pacientes:", error);
            alert("Erro ao carregar pacientes!");
        }
    }

    // 📌 Atualizar a tabela com os pacientes
    function atualizarTabela(pacientes) {
        tableBody.innerHTML = "";

        pacientes.forEach(paciente => {
            const row = document.createElement("tr");

            let clinicas = "Nenhuma";
            if (paciente.clinicas && Array.isArray(paciente.clinicas) && paciente.clinicas.length > 0) {
                clinicas = paciente.clinicas.map(c => c.nome).join(", ");
            }

            row.innerHTML = `
                <td>${paciente.nome}</td>
                <td>${paciente.idade}</td>
                <td>${paciente.telefone}</td>
                <td>${paciente.endereco}</td>
                <td>${clinicas}</td>
                <td>
                    <button class="edit-button" data-id="${paciente.id}">Editar</button>
                    <button class="delete-button" data-id="${paciente.id}">Excluir</button>
                </td>
            `;

            tableBody.appendChild(row);
        });

        // ✅ Eventos de clique para os botões após a tabela ser carregada
        document.querySelectorAll(".edit-button").forEach(button => {
            button.addEventListener("click", function () {
                editarPaciente(this.dataset.id);
            });
        });

        document.querySelectorAll(".delete-button").forEach(button => {
            button.addEventListener("click", function () {
                deletarPaciente(this.dataset.id);
            });
        });
    }

    // 🔍 Filtrar pacientes por nome
    filterButton.addEventListener("click", function () {
        const termo = filterInput.value.toLowerCase();
        const rows = tableBody.querySelectorAll("tr");

        rows.forEach(row => {
            const nome = row.cells[0].textContent.toLowerCase();
            row.style.display = nome.includes(termo) ? "" : "none";
        });
    });

    // ✏️ **Função para editar um paciente (Agora com edição de clínicas!)**
    window.editarPaciente = async function (id) {
        try {
            const response = await fetch(`https://spectacular-jerrilee-otavio-a8263f63.koyeb.app/api/pacientes/${id}`);
            if (!response.ok) throw new Error("Erro ao buscar paciente para edição");

            const paciente = await response.json();

            // 📌 Preencher os campos com os valores atuais
            const novoNome = prompt("Novo nome:", paciente.nome);
            const novaIdade = prompt("Nova idade:", paciente.idade);
            const novoTelefone = prompt("Novo telefone:", paciente.telefone);
            const novoEndereco = prompt("Novo endereço:", paciente.endereco);

            if (!novoNome || !novaIdade || !novoTelefone || !novoEndereco) {
                alert("⚠️ Todos os campos são obrigatórios!");
                return;
            }

            // 🔄 Buscar todas as clínicas disponíveis
            const clinicaResponse = await fetch("https://spectacular-jerrilee-otavio-a8263f63.koyeb.app/api/clinicas");
            if (!clinicaResponse.ok) throw new Error("Erro ao buscar clínicas");
            const todasClinicas = await clinicaResponse.json();

            // 🔍 Criar lista de checkboxes para selecionar as clínicas
            let clinicasSelecionadas = paciente.clinicas.map(c => c.id);

            let clinicaOpcoes = todasClinicas.map(clinica => {
                let checked = clinicasSelecionadas.includes(clinica.id) ? "checked" : "";
                return `<label><input type="checkbox" class="clinica-checkbox" value="${clinica.id}" ${checked}> ${clinica.nome}</label>`;
            }).join("\n");

            // Criar um **modal** para exibir as clínicas
            let modalHTML = `
                <div id="clinicaModal" class="modal">
                    <div class="modal-content">
                        <h3>Selecione as Clínicas</h3>
                        <div class="clinica-list">${clinicaOpcoes}</div>
                        <button id="confirmarClinicas">Confirmar</button>
                        <button id="cancelarClinicas">Cancelar</button>
                    </div>
                </div>
            `;

            // Adicionar ao corpo do HTML
            let modalContainer = document.createElement("div");
            modalContainer.innerHTML = modalHTML;
            document.body.appendChild(modalContainer);

            // Exibir o modal
            const modal = document.getElementById("clinicaModal");
            modal.style.display = "block";

            // Capturar os checkboxes selecionados após confirmação
            document.getElementById("confirmarClinicas").addEventListener("click", async function () {
                let clinicaIds = Array.from(document.querySelectorAll(".clinica-checkbox:checked")).map(c => parseInt(c.value));

                if (clinicaIds.length === 0) {
                    alert("⚠️ Selecione pelo menos uma clínica!");
                    return;
                }

                // 📌 Atualizar o paciente com as novas clínicas
                const pacienteAtualizado = {
                    nome: novoNome,
                    idade: parseInt(novaIdade),
                    telefone: novoTelefone,
                    endereco: novoEndereco,
                    clinicaIds // ✅ Agora o usuário pode editar as clínicas
                };

                const updateResponse = await fetch(`https://spectacular-jerrilee-otavio-a8263f63.koyeb.app/api/pacientes/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(pacienteAtualizado)
                });

                if (!updateResponse.ok) throw new Error("Erro ao atualizar paciente");

                alert("✅ Paciente atualizado com sucesso!");
                modal.style.display = "none";
                modalContainer.remove();
                carregarPacientes();
            });

            // Fechar modal ao cancelar
            document.getElementById("cancelarClinicas").addEventListener("click", function () {
                modal.style.display = "none";
                modalContainer.remove();
            });

        } catch (error) {
            console.error("❌ Erro ao atualizar paciente:", error);
            alert("Erro ao atualizar paciente.");
        }
    };

    // ❌ **Função para excluir um paciente**
    window.deletarPaciente = async function (id) {
        if (confirm("Tem certeza que deseja excluir este paciente?")) {
            try {
                const response = await fetch(`https://spectacular-jerrilee-otavio-a8263f63.koyeb.app/api/pacientes/${id}`, {
                    method: "DELETE"
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(errorText);
                }

                alert("✅ Paciente excluído com sucesso!");
                carregarPacientes();
            } catch (error) {
                console.error("❌ Erro ao excluir paciente:", error);
                alert(`Erro ao excluir paciente: ${error.message}`);
            }
        }
    };
});
