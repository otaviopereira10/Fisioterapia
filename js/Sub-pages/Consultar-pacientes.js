// Inicializa os dados no localStorage, caso não existam
if (!localStorage.getItem("pacientes")) {
    const pacientesIniciais = [
        { nome: "Carlos Almeida", idade: 35, telefone: "(11) 98765-4321", endereco: "Rua A, 123" },
        { nome: "Ana Souza", idade: 28, telefone: "(21) 97654-3210", endereco: "Rua B, 456" }
    ];
    localStorage.setItem("pacientes", JSON.stringify(pacientesIniciais));
}

// Carrega os dados do localStorage
function carregarPacientes() {
    return JSON.parse(localStorage.getItem("pacientes")) || [];
}

// Salva os dados no localStorage
function salvarPacientes(pacientes) {
    localStorage.setItem("pacientes", JSON.stringify(pacientes));
}

// Renderiza a tabela com os pacientes
function renderTable(pacientes = carregarPacientes()) {
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = "";

    pacientes.forEach((paciente, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${paciente.nome}</td>
            <td>${paciente.idade}</td>
            <td>${paciente.telefone}</td>
            <td>${paciente.endereco}</td>
            <td>
                <button class="edit-button" onclick="editarPaciente(${index})">Editar</button>
                <button class="delete-button" onclick="excluirPaciente(${index})">Excluir</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Função para editar um paciente
function editarPaciente(index) {
    const pacientes = carregarPacientes();
    const paciente = pacientes[index];

    const nome = prompt("Atualize o nome:", paciente.nome);
    const idade = prompt("Atualize a idade:", paciente.idade);
    const telefone = prompt("Atualize o telefone:", paciente.telefone);
    const endereco = prompt("Atualize o endereço:", paciente.endereco);

    if (nome && idade && telefone && endereco) {
        pacientes[index] = { nome, idade, telefone, endereco };
        salvarPacientes(pacientes);
        renderTable();
    }
}

// Função para excluir um paciente
function excluirPaciente(index) {
    if (confirm("Tem certeza de que deseja excluir este paciente?")) {
        const pacientes = carregarPacientes();
        pacientes.splice(index, 1);
        salvarPacientes(pacientes);
        renderTable();
    }
}

// Função para filtrar os pacientes pelo nome
function filtrarPacientes() {
    const filterValue = document.getElementById("filter-input").value.toLowerCase();
    const pacientes = carregarPacientes();
    const filteredData = pacientes.filter(paciente =>
        paciente.nome.toLowerCase().includes(filterValue)
    );
    renderTable(filteredData);
}

// Adiciona evento ao botão de pesquisa
document.getElementById("filter-button").addEventListener("click", filtrarPacientes);

// Renderiza a tabela ao carregar a página
renderTable();
