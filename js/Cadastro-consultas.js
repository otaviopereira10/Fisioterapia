document.addEventListener("DOMContentLoaded", async function () {
    const form = document.getElementById("add-form");
    const pacienteSelect = document.getElementById("paciente");
    const profissionalSelect = document.getElementById("profissional");
    const clinicaSelect = document.getElementById("clinica");

    await carregarPacientes();
    await carregarProfissionais();
    await carregarClinicas();

    async function carregarPacientes() {
        try {
            const response = await fetch("https://spectacular-jerrilee-otavio-a8263f63.koyeb.app/api/pacientes");
            if (!response.ok) throw new Error("Erro ao buscar pacientes");

            const pacientes = await response.json();
            pacientes.forEach(paciente => {
                const option = document.createElement("option");
                option.value = paciente.id;
                option.textContent = paciente.nome;
                pacienteSelect.appendChild(option);
            });
        } catch (error) {
            console.error("Erro ao carregar pacientes:", error);
        }
    }

    async function carregarProfissionais() {
        try {
            const response = await fetch("https://spectacular-jerrilee-otavio-a8263f63.koyeb.app/api/profissionais");
            if (!response.ok) throw new Error("Erro ao buscar profissionais");

            const profissionais = await response.json();
            profissionais.forEach(profissional => {
                const option = document.createElement("option");
                option.value = profissional.id;
                option.textContent = profissional.nome;
                profissionalSelect.appendChild(option);
            });
        } catch (error) {
            console.error("Erro ao carregar profissionais:", error);
        }
    }

    async function carregarClinicas() {
        try {
            const response = await fetch("https://spectacular-jerrilee-otavio-a8263f63.koyeb.app/api/clinicas");
            if (!response.ok) throw new Error("Erro ao buscar clínicas");

            const clinicas = await response.json();
            clinicas.forEach(clinica => {
                const option = document.createElement("option");
                option.value = clinica.id;
                option.textContent = clinica.nome;
                clinicaSelect.appendChild(option);
            });
        } catch (error) {
            console.error("Erro ao carregar clínicas:", error);
        }
    }

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const pacienteId = pacienteSelect.value;
        const profissionalId = profissionalSelect.value;
        const clinicaId = clinicaSelect.value;
        const data = document.getElementById("data").value;
        const hora = document.getElementById("hora").value;

        if (!pacienteId || !profissionalId || !clinicaId) {
            alert("Selecione um paciente, um profissional e uma clínica!");
            return;
        }

        const novaConsulta = { data, hora };

        try {
            const url = `https://spectacular-jerrilee-otavio-a8263f63.koyeb.app/api/consultas/${pacienteId}/${profissionalId}/${clinicaId}`;
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(novaConsulta),
            });

            if (!response.ok) throw new Error("Erro ao cadastrar consulta");

            alert("Consulta cadastrada com sucesso!");
            window.location.href = "Sub-pages/Consultar-consultas.html";
        } catch (error) {
            console.error("Erro ao cadastrar consulta:", error);
            alert("Erro ao cadastrar consulta.");
        }
    });
});
