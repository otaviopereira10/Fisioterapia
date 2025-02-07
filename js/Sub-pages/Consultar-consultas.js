document.addEventListener("DOMContentLoaded", async function () {
    const tableBody = document.getElementById("table-body");

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

            row.innerHTML = `
                <td>${consulta.paciente ? consulta.paciente.nome : "Desconhecido"}</td>
                <td>${consulta.profissional ? consulta.profissional.nome : "Desconhecido"}</td>
                <td>${consulta.data}</td>
                <td>${consulta.hora}</td>
                <td>
                    <button class="edit-button" 
                        data-id="${consulta.id}" 
                        data-paciente="${consulta.paciente ? consulta.paciente.id : ''}" 
                        data-profissional="${consulta.profissional ? consulta.profissional.id : ''}" 
                        data-data="${consulta.data}" 
                        data-hora="${consulta.hora}">
                        Editar
                    </button>
                    <button class="delete-button" data-id="${consulta.id}">Excluir</button>
                </td>
            `;

            tableBody.appendChild(row);
        });

        document.querySelectorAll(".edit-button").forEach((button) => {
            button.addEventListener("click", function () {
                editarConsulta(this);
            });
        });

        document.querySelectorAll(".delete-button").forEach((button) => {
            button.addEventListener("click", function () {
                deletarConsulta(this.getAttribute("data-id"));
            });
        });
    }

    async function editarConsulta(button) {
        const consultaId = button.getAttribute("data-id");
        const pacienteIdAtual = button.getAttribute("data-paciente");
        const profissionalIdAtual = button.getAttribute("data-profissional");
        const dataAtual = button.getAttribute("data-data");
        const horaAtual = button.getAttribute("data-hora");

        const novoPacienteId = prompt("Novo ID do Paciente:", pacienteIdAtual);
        const novoProfissionalId = prompt("Novo ID do Profissional:", profissionalIdAtual);
        const novaData = prompt("Nova Data (AAAA-MM-DD):", dataAtual);
        const novaHora = prompt("Nova Hora (HH:MM):", horaAtual);

        if (!novoPacienteId || !novoProfissionalId || !novaData || !novaHora) {
            alert("Todos os campos devem ser preenchidos!");
            return;
        }

        const consultaAtualizada = {
            data: novaData,
            hora: novaHora
        };

        try {
            const url = `https://spectacular-jerrilee-otavio-a8263f63.koyeb.app/api/consultas/${consultaId}/${novoPacienteId}/${novoProfissionalId}`;
            const response = await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(consultaAtualizada),
            });

            if (!response.ok) throw new Error("Erro ao atualizar consulta");

            alert("Consulta atualizada com sucesso!");
            carregarConsultas();
        } catch (error) {
            console.error("Erro ao atualizar consulta:", error);
            alert("Erro ao atualizar consulta.");
        }
    }

    async function deletarConsulta(id) {
        if (confirm("Tem certeza que deseja excluir esta consulta?")) {
            try {
                const response = await fetch(`https://spectacular-jerrilee-otavio-a8263f63.koyeb.app/api/consultas/${id}`, {
                    method: "DELETE"
                });

                if (!response.ok) throw new Error("Erro ao excluir consulta");

                alert("Consulta excluída com sucesso!");
                carregarConsultas();
            } catch (error) {
                console.error("Erro ao excluir consulta:", error);
            }
        }
    }
});
