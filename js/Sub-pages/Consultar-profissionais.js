// Carrega os dados do localStorage
function carregarProfissionais() {
    return JSON.parse(localStorage.getItem("profissionais")) || [];
}

// Salva os dados no localStorage
function salvarProfissionais(profissionais) {
    localStorage.setItem("profissionais", JSON.stringify(profissionais));
}

// Renderiza a tabela com os profissionais
function renderTable(profissionais = carregarProfissionais()) {
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = "";

    profissionais.forEach((profissional, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${profissional.nome}</td>
            <td>${profissional.especialidade}</td>
            <td>${profissional.crm}</td>
            <td>${profissional.telefone}</td>
            <td>
                <button class="edit-button" onclick="editarProfissional(${index})">Editar</button>
                <button class="delete-button" onclick="excluirProfissional(${index})">Excluir</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Função para editar um profissional
function editarProfissional(index) {
    const profissionais = carregarProfissionais();
    const profissional = profissionais[index];

    const nome = prompt("Atualize o nome:", profissional.nome);
    const especialidade = prompt("Atualize a especialidade:", profissional.especialidade);
    const crm = prompt("Atualize o registro profissional:", profissional.crm);
    const telefone = prompt("Atualize o telefone:", profissional.telefone);

    if (nome && especialidade && crm && telefone) {
        profissionais[index] = { nome, especialidade, crm, telefone };
        salvarProfissionais(profissionais);
        renderTable();
    }
}

// Função para excluir um profissional
function excluirProfissional(index) {
    if (confirm("Tem certeza de que deseja excluir este profissional?")) {
        const profissionais = carregarProfissionais();
        profissionais.splice(index, 1);
        salvarProfissionais(profissionais);
        renderTable();
    }
}

// Função para filtrar os profissionais pelo nome
function filtrarProfissionais() {
    const filterValue = document.getElementById("filter-input").value.toLowerCase();
    const profissionais = carregarProfissionais();
    const filteredData = profissionais.filter(profissional =>
        profissional.nome.toLowerCase().includes(filterValue)
    );
    renderTable(filteredData);
}

// Adiciona evento ao botão de pesquisa
document.getElementById("filter-button").addEventListener("click", filtrarProfissionais);

// Renderiza a tabela ao carregar a página
renderTable();
