// Carrega os dados do localStorage (Pacientes, Profissionais e Consultas)
function carregarPacientes() {
    return JSON.parse(localStorage.getItem("pacientes")) || [];
}

function carregarProfissionais() {
    return JSON.parse(localStorage.getItem("profissionais")) || [];
}

function carregarConsultas() {
    return JSON.parse(localStorage.getItem("consultas")) || [];
}

// Salva os dados no localStorage
function salvarConsultas(consultas) {
    localStorage.setItem("consultas", JSON.stringify(consultas));
}

// Preenche os selects com os pacientes e profissionais cadastrados
function preencherSelects() {
    const pacientes = carregarPacientes();
    const profissionais = carregarProfissionais();

    const selectPaciente = document.getElementById("paciente");
    const selectProfissional = document.getElementById("profissional");

    // Limpa os selects antes de adicionar novas opções
    selectPaciente.innerHTML = '<option value="">Selecione um paciente</option>';
    selectProfissional.innerHTML = '<option value="">Selecione um profissional</option>';

    // Adiciona os pacientes ao select
    pacientes.forEach(paciente => {
        const option = document.createElement("option");
        option.value = paciente.nome;
        option.textContent = paciente.nome;
        selectPaciente.appendChild(option);
    });

    // Adiciona os profissionais ao select
    profissionais.forEach(profissional => {
        const option = document.createElement("option");
        option.value = profissional.nome;
        option.textContent = profissional.nome;
        selectProfissional.appendChild(option);
    });
}

// Função para adicionar uma nova consulta
document.getElementById("add-form")?.addEventListener("submit", function (e) {
    e.preventDefault();

    // Captura os valores do formulário
    const paciente = document.getElementById("paciente").value;
    const profissional = document.getElementById("profissional").value;
    const data = document.getElementById("data").value;
    const hora = document.getElementById("hora").value;

    // Verifica se os campos foram preenchidos corretamente
    if (!paciente || !profissional || !data || !hora) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    // Carrega os dados existentes no localStorage
    const consultas = carregarConsultas();

    // Adiciona a nova consulta à lista
    consultas.push({ paciente, profissional, data, hora });

    // Salva os dados atualizados no localStorage
    salvarConsultas(consultas);

    // Exibe uma mensagem de sucesso e redireciona para a página de consulta
    alert("Consulta adicionada com sucesso!");
    window.location.href = "../pages/Sub-pages/Consultar-consultas.html"; // Redireciona para Consultar Consultas
});

// Chama a função para preencher os selects ao carregar a página
document.addEventListener("DOMContentLoaded", preencherSelects);
