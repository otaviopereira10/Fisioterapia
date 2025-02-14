document.addEventListener("DOMContentLoaded", async function () {
    const tableBody = document.getElementById("table-body");
    const filterInput = document.getElementById("filter-input");
    const filterButton = document.getElementById("filter-button");

    await carregarConsultas();

    async function carregarConsultas() {
        try {
            const response = await fetch("https://spectacular-jerrilee-otavio-a8263f63.koyeb.app/api/consultas");
            if (!response.ok) throw new Error("Erro ao buscar consultas");

            const consultas = await response.json();
            atualizarTabela(consultas);
        } catch (error) {
            console.error("Erro ao carregar consultas:", error);
        }
    }

    function atualizarTabela(consultas) {
        tableBody.innerHTML = "";
        consultas.forEach((consulta) => {
            const row = document.createElement("tr");

            const dataFormatada = formatarData(consulta.data);
            const horaFormatada = formatarHora(consulta.hora);

            row.innerHTML = `
                <td>${consulta.paciente ? consulta.paciente.nome : "Desconhecido"}</td>
                <td>${consulta.profissional ? consulta.profissional.nome : "Desconhecido"}</td>
                <td>${consulta.clinica ? consulta.clinica.nome : "Não informada"}</td>
                <td>${dataFormatada}</td>
                <td>${horaFormatada}</td>
                <td>
                    <button class="edit-button" data-id="${consulta.id}">Editar</button>
                    <button class="delete-button" data-id="${consulta.id}">Excluir</button>
                </td>
            `;

            tableBody.appendChild(row);
        });

        document.querySelectorAll(".edit-button").forEach((button) => {
            button.addEventListener("click", function () {
                editarConsulta(this.getAttribute("data-id"));
            });
        });

        document.querySelectorAll(".delete-button").forEach((button) => {
            button.addEventListener("click", function () {
                deletarConsulta(this.getAttribute("data-id"));
            });
        });
    }

    function formatarData(dataISO) {
        const partes = dataISO.split("-");
        return `${partes[2]}/${partes[1]}/${partes[0]}`;
    }

    function formatarHora(horaISO) {
        return horaISO.substring(0, 5);
    }

    async function editarConsulta(id) {
        const novaData = prompt("Nova Data (DD/MM/AAAA):");
        const novaHora = prompt("Nova Hora (HH:MM):");

        if (!novaData || !novaHora) {
            alert("Todos os campos são obrigatórios!");
            return;
        }

        const novaDataISO = novaData.split("/").reverse().join("-");

        try {
            const response = await fetch(`https://spectacular-jerrilee-otavio-a8263f63.koyeb.app/api/consultas/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ data: novaDataISO, hora: novaHora }),
            });

            if (!response.ok) throw new Error("Erro ao atualizar consulta");

            alert("Consulta atualizada com sucesso!");
            carregarConsultas();
        } catch (error) {
            console.error("Erro ao atualizar consulta:", error);
        }
    }

    async function deletarConsulta(id) {
        if (confirm("Tem certeza que deseja excluir esta consulta?")) {
            try {
                await fetch(`https://spectacular-jerrilee-otavio-a8263f63.koyeb.app/api/consultas/${id}`, { method: "DELETE" });
                alert("Consulta excluída com sucesso!");
                carregarConsultas();
            } catch (error) {
                console.error("Erro ao excluir consulta:", error);
            }
        }
    }
});
