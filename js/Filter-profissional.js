// Dados iniciais
const profissionais = [
    { nome: "João da Silva", especialidade: "Ortopedia", crm: "123456", telefone: "(11) 98765-4321" },
    { nome: "Maria Oliveira", especialidade: "Fisioterapia", crm: "654321", telefone: "(21) 97654-3210" },
    { nome: "Carlos Santos", especialidade: "Neurologia", crm: "112233", telefone: "(31) 98765-4321" },
    { nome: "Ana Souza", especialidade: "Pediatria", crm: "445566", telefone: "(41) 96587-4321" }
];

// Função para renderizar a tabela
function renderTable(data) {
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = ""; // Limpa a tabela antes de renderizar

    data.forEach(profissional => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${profissional.nome}</td>
            <td>${profissional.especialidade}</td>
            <td>${profissional.crm}</td>
            <td>${profissional.telefone}</td>
            <td>
                <button>Editar</button>
                <button>Excluir</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Renderiza a tabela inicial
renderTable(profissionais);

// Filtro de pesquisa
document.getElementById("filter-button").addEventListener("click", function () {
    const filterValue = document.getElementById("filter-input").value.toLowerCase();
    const filteredData = profissionais.filter(profissional =>
        profissional.nome.toLowerCase().includes(filterValue)
    );
    renderTable(filteredData);
});

// Adiciona um novo profissional
document.getElementById("add-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const nome = document.getElementById("nome").value;
    const especialidade = document.getElementById("especialidade").value;
    const crm = document.getElementById("crm").value;
    const telefone = document.getElementById("telefone").value;

    profissionais.push({ nome, especialidade, crm, telefone });
    renderTable(profissionais);

    // Limpa os campos do formulário
    e.target.reset();
});
