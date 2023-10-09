document.addEventListener("DOMContentLoaded", function () {
    // Seleciona o formulário e o botão de envio
    const presenceForm = document.getElementById("presenceForm");

    // Adiciona um ouvinte de evento ao formulário
    presenceForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Evita o envio padrão do formulário

        // Obtenha os valores dos campos de entrada
        const firstNameInput = document.getElementById("firstName");
        const lastNameInput = document.getElementById("lastName");
        const emailInput = document.getElementById("email");

        // Capitalize a primeira letra do nome e sobrenome
        const capitalizeFirstLetter = (string) => {
            return string.charAt(0).toUpperCase() + string.slice(1);
        };

        const firstName = capitalizeFirstLetter(firstNameInput.value);
        const lastName = capitalizeFirstLetter(lastNameInput.value);
        const email = emailInput.value;

        // Crie um objeto com os dados a serem enviados para o servidor
        const data = {
            firstName: firstName,
            lastName: lastName,
            email: email
        };

        // Envie os dados para o servidor usando uma solicitação AJAX (você pode usar axios, fetch ou outra biblioteca)
        fetch("/api/insertData", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                alert("Dados enviados com sucesso!");
                // Redirecione o usuário ou faça outra ação desejada
                window.location.href = "/";
            } else {
                alert("Erro ao enviar dados.");
            }
        })
        .catch(error => {
            console.error("Erro ao enviar dados:", error);
        });
    });
});
