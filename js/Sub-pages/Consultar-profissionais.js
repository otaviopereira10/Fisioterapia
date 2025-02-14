document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.getElementById("table-body");
    const filterInput = document.getElementById("filter-input");
    const filterButton = document.getElementById("filter-button");

    carregarProfissionais();

    async function carregarProfissionais() {
        try {
            const response = await fetch("https://spectacular-jerrilee-otavio-a8263f63.koyeb.app/api/profissionais");
            if (!response.ok) throw new Error("Erro ao buscar profissionais");

            const profissionais = await response.json();
            atualizarTabela(profissionais);
        } catch (error) {
            console.error("Erro ao carregar profissionais:", error);
            alert("Erro ao carregar profissionais.");
        }
    }

    function atualizarTabela(profissionais) {
        tableBody.innerHTML = "";

        profissionais.forEach(profissional => {
            const clinicas = profissional.clinicas.map(c => c.nome).join(", ") || "Não associada";

            const row = document.createElement("tr");
            row.setAttribute("data-id", profissional.id);

            row.innerHTML = `
                <td>${profissional.nome}</td>
                <td>${profissional.especialidade}</td>
                <td>${profissional.registro}</td>
                <td>${profissional.telefone}</td>
                <td>${clinicas}</td> <!-- ✅ Agora exibe a clínica onde trabalha -->
                <td>
                    <button class="edit-button" data-id="${profissional.id}">Editar</button>
                    <button class="delete-button" data-id="${profissional.id}">Excluir</button>
                </td>
            `;

            tableBody.appendChild(row);
        });

        document.querySelectorAll(".edit-button").forEach(button => {
            button.addEventListener("click", function () {
                editarProfissional(this.getAttribute("data-id"));
            });
        });

        document.querySelectorAll(".delete-button").forEach(button => {
            button.addEventListener("click", function () {
                deletarProfissional(this.getAttribute("data-id"));
            });
        });
    }

    function editarProfissional(id) {
        const linha = document.querySelector(`tr[data-id='${id}']`);
        const nomeAtual = linha.cells[0].textContent;
        const especialidadeAtual = linha.cells[1].textContent;
        const registroAtual = linha.cells[2].textContent;
        const telefoneAtual = linha.cells[3].textContent;

        const novoNome = prompt("Novo nome:", nomeAtual);
        const novaEspecialidade = prompt("Nova especialidade:", especialidadeAtual);
        const novoRegistro = prompt("Novo Registro Profissional:", registroAtual);
        const novoTelefone = prompt("Novo telefone:", telefoneAtual);

        if (novoNome && novaEspecialidade && novoRegistro && novoTelefone) {
            const profissionalAtualizado = { nome: novoNome, especialidade: novaEspecialidade, registro: novoRegistro, telefone: novoTelefone };

            fetch(`https://spectacular-jerrilee-otavio-a8263f63.koyeb.app/api/profissionais/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(profissionalAtualizado)
            })
                .then(response => {
                    if (!response.ok) throw new Error("Erro ao atualizar profissional");
                    alert("Profissional atualizado com sucesso!");
                    carregarProfissionais();
                })
                .catch(error => {
                    console.error("Erro ao atualizar profissional:", error);
                    alert("Erro ao atualizar profissional.");
                });
        }
    }

    function deletarProfissional(id) {
        if (confirm("Tem certeza que deseja excluir este profissional?")) {
            fetch(`https://spectacular-jerrilee-otavio-a8263f63.koyeb.app/api/profissionais/${id}`, { method: "DELETE" })
                .then(response => {
                    if (!response.ok) throw new Error("Erro ao excluir profissional");
                    alert("Profissional excluído com sucesso!");
                    carregarProfissionais();
                })
                .catch(error => {
                    console.error("Erro ao excluir profissional:", error);
                    alert("Erro ao excluir profissional.");
                });
        }
    }
});
