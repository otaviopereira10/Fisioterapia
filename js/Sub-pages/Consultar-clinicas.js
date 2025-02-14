document.addEventListener("DOMContentLoaded", async function () {
    const tableBody = document.getElementById("table-body");
    const filterInput = document.getElementById("filter-input");
    const filterButton = document.getElementById("filter-button");

    await carregarClinicas();

    async function carregarClinicas() {
        try {
            console.log("📡 Buscando clínicas...");

            const response = await fetch("https://spectacular-jerrilee-otavio-a8263f63.koyeb.app/api/clinicas");

            if (!response.ok) {
                throw new Error(`Erro HTTP ${response.status}: ${await response.text()}`);
            }

            const clinicas = await response.json();
            console.log("✅ Clínicas carregadas com sucesso:", clinicas);

            atualizarTabela(clinicas);
        } catch (error) {
            console.error("❌ Erro ao carregar clínicas:", error);
            alert(`Erro ao carregar clínicas: ${error.message}`);
        }
    }

    function atualizarTabela(clinicas) {
        console.log("📋 Atualizando tabela com as clínicas:", clinicas);

        tableBody.innerHTML = ""; // Limpa a tabela antes de preencher

        if (!clinicas || clinicas.length === 0) {
            console.warn("⚠ Nenhuma clínica encontrada!");
            tableBody.innerHTML = `<tr><td colspan="3">Nenhuma clínica encontrada.</td></tr>`;
            return;
        }

        clinicas.forEach((clinica) => {
            console.log(`🆕 Adicionando clínica: ${clinica.nome} - ${clinica.endereco}`);

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${clinica.nome}</td>
                <td>${clinica.endereco}</td>
                <td>
                    <button class="edit-button" 
                        data-id="${clinica.id}" 
                        data-nome="${clinica.nome}" 
                        data-endereco="${clinica.endereco}">
                        Editar
                    </button>
                    <button class="delete-button" data-id="${clinica.id}">Excluir</button>
                </td>
            `;

            tableBody.appendChild(row);
        });

        // Adicionando eventos aos botões após criar a tabela
        document.querySelectorAll(".edit-button").forEach((button) => {
            button.addEventListener("click", function () {
                editarClinica(this);
            });
        });

        document.querySelectorAll(".delete-button").forEach((button) => {
            button.addEventListener("click", function () {
                excluirClinica(this.getAttribute("data-id"));
            });
        });
    }

    async function editarClinica(button) {
        const clinicaId = button.getAttribute("data-id");
        const nomeAtual = button.getAttribute("data-nome");
        const enderecoAtual = button.getAttribute("data-endereco");

        const novoNome = prompt("Novo nome da clínica:", nomeAtual);
        const novoEndereco = prompt("Novo endereço:", enderecoAtual);

        if (!novoNome || !novoEndereco) {
            alert("Todos os campos devem ser preenchidos!");
            return;
        }

        const clinicaAtualizada = {
            nome: novoNome,
            endereco: novoEndereco
        };

        try {
            const url = `https://spectacular-jerrilee-otavio-a8263f63.koyeb.app/api/clinicas/${clinicaId}`;
            const response = await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(clinicaAtualizada),
            });

            if (!response.ok) throw new Error("Erro ao atualizar clínica");

            alert("✅ Clínica atualizada com sucesso!");
            carregarClinicas(); // Atualiza a lista após editar
        } catch (error) {
            console.error("❌ Erro ao atualizar clínica:", error);
            alert("Erro ao atualizar clínica.");
        }
    }

    async function excluirClinica(id) {
        if (confirm("⚠ Tem certeza que deseja excluir esta clínica?")) {
            try {
                const response = await fetch(`https://spectacular-jerrilee-otavio-a8263f63.koyeb.app/api/clinicas/${id}`, {
                    method: "DELETE"
                });

                if (!response.ok) throw new Error("Erro ao excluir clínica");

                alert("✅ Clínica excluída com sucesso!");
                carregarClinicas(); // Atualiza a lista após excluir
            } catch (error) {
                console.error("❌ Erro ao excluir clínica:", error);
                alert("Erro ao excluir clínica.");
            }
        }
    }

    // Filtro de pesquisa
    filterButton.addEventListener("click", function () {
        const termo = filterInput.value.toLowerCase();
        const rows = tableBody.querySelectorAll("tr");

        rows.forEach(row => {
            const nome = row.cells[0].textContent.toLowerCase();
            row.style.display = nome.includes(termo) ? "" : "none";
        });
    });

    carregarClinicas(); // Carrega as clínicas ao iniciar a página
});