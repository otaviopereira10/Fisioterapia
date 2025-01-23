// Dados iniciais
const consultas = [
    { paciente: "João da Silva", profissional: "Dr. Maria", data: "2025-01-15", hora: "10:00" },
    { paciente: "Ana Souza", profissional: "Dr. Carlos", data: "2025-01-20", hora: "14:30" },
    { paciente: "Pedro Alves", profissional: "Dr. Maria", data: "2025-01-25", hora: "09:00" },
    { paciente: "Luiza Santos", profissional: "Dr. João", data: "2025-01-30", hora: "11:15" }
];

// Função para renderizar a tabela
function renderTable(data) {
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = ""; // Limpa a tabela antes de renderizar

    data.forEach(consulta => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${consulta.paciente}</td>
            <td>${consulta.profissional}</td>
            <td>${consulta.data}</td>
            <td>${consulta.hora}</td>
            <td>
                <button>Editar</button>
                <button>Excluir</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Renderiza a tabela inicial
renderTable(consultas);

// Preenche as opções de pacientes e profissionais
function populateSelectOptions() {
    const pacienteSelect = document.getElementById("paciente");
    const profissionalSelect = document.getElementById("profissional");

    // Lista de exemplo para pacientes e profissionais
    const pacientes = ["João da Silva", "Ana Souza", "Pedro Alves", "Luiza Santos"];
    const profissionais = ["Dr. Maria", "Dr. Carlos", "Dr. João"];

    // Adiciona pacientes
    pacientes.forEach(paciente => {
        const option = document.createElement("option");
        option.value = paciente;
        option.textContent = paciente;
        pacienteSelect.appendChild(option);
    });

    // Adiciona profissionais
    profissionais.forEach(profissional => {
        const option = document.createElement("option");
        option.value = profissional;
        option.textContent = profissional;
        profissionalSelect.appendChild(option);
    });
}
populateSelectOptions();

// Filtro de pesquisa
document.getElementById("filter-button").addEventListener("click", function () {
    const filterValue = document.getElementById("filter-input").value.toLowerCase();
    const filteredData = consultas.filter(consulta =>
        consulta.paciente.toLowerCase().includes(filterValue)
    );
    renderTable(filteredData);
});

// Adiciona uma nova consulta
document.getElementById("add-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const paciente = document.getElementById("paciente").value;
    const profissional = document.getElementById("profissional").value;
    const data = document.getElementById("data").value;
    const hora = document.getElementById("hora").value;

    consultas.push({ paciente, profissional, data, hora });
    renderTable(consultas);

    // Limpa os campos do formulário
    e.target.reset();
});
