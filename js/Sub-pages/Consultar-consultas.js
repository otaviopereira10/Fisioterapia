// Carrega os dados do localStorage
function carregarConsultas() {
    return JSON.parse(localStorage.getItem("consultas")) || [];
}

// Salva os dados no localStorage
function salvarConsultas(consultas) {
    localStorage.setItem("consultas", JSON.stringify(consultas));
}

// Formata a data no formato brasileiro (DD/MM/YYYY)
function formatarData(dataISO) {
    const [ano, mes, dia] = dataISO.split("-");
    return `${dia}/${mes}/${ano}`;
}

// Renderiza a tabela com as consultas
function renderTable(consultas = carregarConsultas()) {
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = ""; // Limpa a tabela antes de renderizar

    consultas.forEach((consulta, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${consulta.paciente}</td>
            <td>${consulta.profissional}</td>
            <td>${formatarData(consulta.data)}</td>
            <td>${consulta.hora}</td>
            <td>
                <button class="edit-button" onclick="editarConsulta(${index})">Editar</button>
                <button class="delete-button" onclick="excluirConsulta(${index})">Excluir</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Função para editar uma consulta
function editarConsulta(index) {
    const consultas = carregarConsultas();
    const consulta = consultas[index];

    const paciente = prompt("Atualize o paciente:", consulta.paciente);
    const profissional = prompt("Atualize o profissional:", consulta.profissional);
    const data = prompt("Atualize a data (DD/MM/YYYY):", formatarData(consulta.data));
    const hora = prompt("Atualize a hora:", consulta.hora);

    if (paciente && profissional && data && hora) {
        // Convertendo a data para formato ISO antes de salvar
        const [dia, mes, ano] = data.split("/");
        consultas[index] = { paciente, profissional, data: `${ano}-${mes}-${dia}`, hora };
        salvarConsultas(consultas);
        renderTable();
    }
}

// Função para excluir uma consulta
function excluirConsulta(index) {
    if (confirm("Tem certeza de que deseja excluir esta consulta?")) {
        const consultas = carregarConsultas();
        consultas.splice(index, 1);
        salvarConsultas(consultas);
        renderTable();
    }
}

// Função para filtrar as consultas pelo nome do paciente
function filtrarConsultas() {
    const filterValue = document.getElementById("filter-input").value.toLowerCase();
    const consultas = carregarConsultas();
    const filteredData = consultas.filter(consulta =>
        consulta.paciente.toLowerCase().includes(filterValue)
    );
    renderTable(filteredData);
}

// Adiciona evento ao botão de pesquisa
document.getElementById("filter-button").addEventListener("click", filtrarConsultas);

// Renderiza a tabela ao carregar a página
renderTable();
