document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.getElementById("table-body");
    const filterInput = document.getElementById("filter-input");
    const filterButton = document.getElementById("filter-button");

    // 🔍 Carregar pacientes ao iniciar a página
    carregarPacientes();

    // 🔄 Função para buscar e exibir os pacientes cadastrados
    async function carregarPacientes() {
        try {
            const response = await fetch("https://spectacular-jerrilee-otavio-a8263f63.koyeb.app/api/pacientes");
            if (!response.ok) {
                throw new Error("Erro ao buscar pacientes");
            }
            const pacientes = await response.json();
            atualizarTabela(pacientes);
        } catch (error) {
            console.error("Erro ao carregar pacientes:", error);
            alert("Erro ao carregar pacientes. Tente novamente.");
        }
    }

    // 🏷️ Atualizar a tabela com os pacientes
    function atualizarTabela(pacientes) {
        tableBody.innerHTML = ""; // Limpa a tabela antes de atualizar
        pacientes.forEach((paciente) => {
            const row = document.createElement("tr");
            row.setAttribute("data-id", paciente.id); // Define o ID do paciente na linha

            row.innerHTML = `
                <td>${paciente.nome}</td>
                <td>${paciente.idade}</td>
                <td>${paciente.telefone}</td>
                <td>${paciente.endereco}</td>
                <td>
                    <button class="edit-button" data-id="${paciente.id}">Editar</button>
                    <button class="delete-button" data-id="${paciente.id}">Excluir</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        // Adiciona os eventos de clique para os botões de edição e exclusão
        document.querySelectorAll(".edit-button").forEach((button) => {
            button.addEventListener("click", function () {
                editarPaciente(this.getAttribute("data-id"));
            });
        });

        document.querySelectorAll(".delete-button").forEach((button) => {
            button.addEventListener("click", function () {
                deletarPaciente(this.getAttribute("data-id"));
            });
        });
    }

    // 📝 Função para editar um paciente
    function editarPaciente(id) {
        const linhaPaciente = document.querySelector(`tr[data-id='${id}']`);
        const nomeAtual = linhaPaciente.cells[0].textContent;
        const idadeAtual = linhaPaciente.cells[1].textContent;
        const telefoneAtual = linhaPaciente.cells[2].textContent;
        const enderecoAtual = linhaPaciente.cells[3].textContent;

        const novoNome = prompt("Novo nome:", nomeAtual);
        const novaIdade = prompt("Nova idade:", idadeAtual);
        const novoTelefone = prompt("Novo telefone:", telefoneAtual);
        const novoEndereco = prompt("Novo endereço:", enderecoAtual);

        if (novoNome && novaIdade && novoTelefone && novoEndereco) {
            const pacienteAtualizado = {
                nome: novoNome,
                idade: parseInt(novaIdade),
                telefone: novoTelefone,
                endereco: novoEndereco
            };

            fetch(`https://spectacular-jerrilee-otavio-a8263f63.koyeb.app/api/pacientes/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(pacienteAtualizado)
            })
                .then(response => {
                    if (!response.ok) throw new Error("Erro ao atualizar paciente");
                    alert("Paciente atualizado com sucesso!");
                    carregarPacientes();
                })
                .catch(error => {
                    console.error("Erro ao atualizar paciente:", error);
                    alert("Erro ao atualizar paciente. Tente novamente.");
                });
        }
    }

    // ❌ Função para deletar um paciente
    function deletarPaciente(id) {
        if (confirm("Tem certeza que deseja excluir este paciente?")) {
            fetch(`https://spectacular-jerrilee-otavio-a8263f63.koyeb.app/api/pacientes/${id}`, { method: "DELETE" })
                .then(response => {
                    if (!response.ok) throw new Error("Erro ao excluir paciente");
                    alert("Paciente excluído com sucesso!");
                    carregarPacientes();
                })
                .catch(error => {
                    console.error("Erro ao excluir paciente:", error);
                    alert("Erro ao excluir paciente. Tente novamente.");
                });
        }
    }

    // 🔍 Filtro de pesquisa por nome
    filterButton.addEventListener("click", function () {
        const termoBusca = filterInput.value.toLowerCase();
        const linhas = tableBody.getElementsByTagName("tr");

        for (let linha of linhas) {
            const nomePaciente = linha.getElementsByTagName("td")[0].textContent.toLowerCase();
            linha.style.display = nomePaciente.includes(termoBusca) ? "" : "none";
        }
    });
});
