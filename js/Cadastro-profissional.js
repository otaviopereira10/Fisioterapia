// Inicializa os dados no localStorage, caso não existam
if (!localStorage.getItem("profissionais")) {
    const profissionaisIniciais = [
        { nome: "João da Silva", especialidade: "Ortopedia", crm: "123456", telefone: "(11) 98765-4321" },
        { nome: "Maria Oliveira", especialidade: "Fisioterapia", crm: "654321", telefone: "(21) 97654-3210" },
        { nome: "Carlos Santos", especialidade: "Neurologia", crm: "112233", telefone: "(31) 98765-4321" },
        { nome: "Ana Souza", especialidade: "Pediatria", crm: "445566", telefone: "(41) 96587-4321" }
    ];
    localStorage.setItem("profissionais", JSON.stringify(profissionaisIniciais));
}

// Carrega os dados do localStorage
function carregarProfissionais() {
    return JSON.parse(localStorage.getItem("profissionais")) || [];
}

// Salva os dados no localStorage
function salvarProfissionais(profissionais) {
    localStorage.setItem("profissionais", JSON.stringify(profissionais));
}

// Função para adicionar um novo profissional
document.getElementById("add-form")?.addEventListener("submit", function (e) {
    e.preventDefault();

    // Captura os valores do formulário
    const nome = document.getElementById("nome").value;
    const especialidade = document.getElementById("especialidade").value;
    const crm = document.getElementById("crm").value;
    const telefone = document.getElementById("telefone").value;

    // Carrega os dados existentes no localStorage
    const profissionais = carregarProfissionais();

    // Adiciona o novo profissional à lista
    profissionais.push({ nome, especialidade, crm, telefone });

    // Salva os dados atualizados no localStorage
    salvarProfissionais(profissionais);

    // Exibe uma mensagem de sucesso e redireciona para a página de consulta
    alert("Profissional adicionado com sucesso!");
    window.location.href = "../pages/Sub-pages/Consultar-profissional.html"; // Redireciona para Consultar Profissionais
});

// Renderiza a tabela com os profissionais na página de consulta (caso necessário nesta página)
function renderTable() {
    const profissionais = carregarProfissionais();
    const tableBody = document.getElementById("table-body");
    if (!tableBody) return; // Verifica se o elemento existe (somente para consulta)

    tableBody.innerHTML = ""; // Limpa a tabela antes de renderizar

    profissionais.forEach((profissional, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${profissional.nome}</td>
            <td>${profissional.especialidade}</td>
            <td>${profissional.crm}</td>
            <td>${profissional.telefone}</td>
            <td>
                <button onclick="editarProfissional(${index})">Editar</button>
                <button onclick="excluirProfissional(${index})">Excluir</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Função para editar um profissional (reaproveitada na consulta)
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

// Função para excluir um profissional (reaproveitada na consulta)
function excluirProfissional(index) {
    if (confirm("Tem certeza de que deseja excluir este profissional?")) {
        const profissionais = carregarProfissionais();
        profissionais.splice(index, 1);
        salvarProfissionais(profissionais);
        renderTable();
    }
}

// Renderiza a tabela ao carregar a página (somente na consulta)
renderTable();
