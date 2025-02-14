document.addEventListener("DOMContentLoaded", function () {
    carregarUsuarios();

    // Função para carregar usuários na tabela
    async function carregarUsuarios() {
        try {
            const response = await fetch("https://spectacular-jerrilee-otavio-a8263f63.koyeb.app/api/auth/usuarios");
            if (!response.ok) {
                throw new Error("Erro ao buscar usuários!");
            }
            const usuarios = await response.json();
            preencherTabela(usuarios);
        } catch (error) {
            console.error("Erro ao carregar usuários:", error);
        }
    }

    // Preenche a tabela com os usuários
    function preencherTabela(usuarios) {
        const tableBody = document.getElementById("table-body");
        tableBody.innerHTML = "";

        usuarios.forEach(usuario => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${usuario.nome}</td>
                <td>${usuario.user}</td>
                <td>${usuario.email}</td>
                <td>${usuario.role}</td>
                <td>${usuario.registro ? usuario.registro : "N/A"}</td>
                <td>
                    <button class="edit-button" onclick="editarUsuario(${usuario.id})">Editar</button>
                    <button class="delete-button" onclick="excluirUsuario(${usuario.id})">Excluir</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Função para editar um usuário
    window.editarUsuario = async function (id) {
        const novoNome = prompt("Novo nome:");
        const novoEmail = prompt("Novo e-mail:");
        const novoUser = prompt("Novo usuário:");
        const novaSenha = prompt("Nova senha (deixe em branco para não alterar):");
        const novoRegistro = prompt("Novo registro profissional (se aplicável):");

        if (!novoNome || !novoEmail || !novoUser) {
            alert("Todos os campos obrigatórios devem ser preenchidos!");
            return;
        }

        const dadosAtualizados = {
            nome: novoNome,
            email: novoEmail,
            user: novoUser,
            senha: novaSenha ? novaSenha : null, // Se estiver vazio, não altera
            registro: novoRegistro
        };

        try {
            const response = await fetch(`https://spectacular-jerrilee-otavio-a8263f63.koyeb.app/api/auth/usuarios/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dadosAtualizados)
            });

            if (!response.ok) {
                throw new Error("Erro ao salvar as alterações.");
            }

            alert("Usuário atualizado com sucesso!");
            carregarUsuarios();
        } catch (error) {
            alert("Erro ao atualizar usuário.");
            console.error("Erro:", error);
        }
    };

    // Função para excluir um usuário
    window.excluirUsuario = async function (id) {
        if (!confirm("Tem certeza que deseja excluir este usuário?")) {
            return;
        }

        try {
            const response = await fetch(`https://spectacular-jerrilee-otavio-a8263f63.koyeb.app/api/auth/usuarios/${id}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error("Erro ao excluir o usuário.");
            }

            alert("Usuário excluído com sucesso!");
            carregarUsuarios();
        } catch (error) {
            alert("Erro ao excluir usuário.");
            console.error("Erro:", error);
        }
    };
});
