// Dados iniciais
const pacientes = [
    { nome: "João da Silva", idade: 45, telefone: "(11) 98765-4321", endereco: "Rua Exemplo, 123" },
    { nome: "Maria Oliveira", idade: 32, telefone: "(21) 97654-3210", endereco: "Av. Brasil, 456" },
    { nome: "Carlos Santos", idade: 29, telefone: "(31) 98765-4321", endereco: "Rua Minas, 789" },
    { nome: "Ana Souza", idade: 52, telefone: "(41) 96587-4321", endereco: "Rua Paraná, 987" }
];

// Função para renderizar a tabela
function renderTable(data) {
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = ""; // Limpa a tabela antes de renderizar

    data.forEach(paciente => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${paciente.nome}</td>
            <td>${paciente.idade}</td>
            <td>${paciente.telefone}</td>
            <td>${paciente.endereco}</td>
            <td>
                <button>Editar</button>
                <button>Excluir</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Renderiza a tabela inicial
renderTable(pacientes);

// Filtro de pesquisa
document.getElementById("filter-button").addEventListener("click", function () {
    const filterValue = document.getElementById("filter-input").value.toLowerCase();
    const filteredData = pacientes.filter(paciente =>
        paciente.nome.toLowerCase().includes(filterValue)
    );
    renderTable(filteredData);
});

// Adiciona um novo paciente
document.getElementById("add-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const nome = document.getElementById("nome").value;
    const idade = parseInt(document.getElementById("idade").value, 10);
    const telefone = document.getElementById("telefone").value;
    const endereco = document.getElementById("endereco").value;

    pacientes.push({ nome, idade, telefone, endereco });
    renderTable(pacientes);

    // Limpa os campos do formulário
    e.target.reset();
});
