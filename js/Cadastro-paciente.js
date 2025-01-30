document.getElementById("add-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const idade = document.getElementById("idade").value;
    const telefone = document.getElementById("telefone").value;
    const endereco = document.getElementById("endereco").value;

    const pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];
    pacientes.push({ nome, idade, telefone, endereco });

    localStorage.setItem("pacientes", JSON.stringify(pacientes));

    alert("Paciente adicionado com sucesso!");
    window.location.href = "Sub-pages/Consultar-paciente.html";
});
