let namesData = null; // Variável para armazenar a lista de nomes

// Função para buscar nomes do servidor e armazená-los na variável namesData
function loadNamesFromServer() {
  fetch('/api/getNames')
    .then(response => response.json())
    .then(data => {
      if (data.success && Array.isArray(data.data)) {
        namesData = data.data;
      } else {
        console.error("Nenhum nome encontrado no servidor.");
      }
    })
    .catch(error => {
      console.error("Erro ao buscar nomes do servidor:", error);
    });
}

// Função para exibir nomes aleatórios da lista carregada
function displayRandomName() {
  const nameListElement = document.getElementById("nameList");
  nameListElement.innerHTML = ""; // Limpa o conteúdo atual da div

  if (namesData && namesData.length > 0) {
    // Escolha um índice aleatório do array de nomes
    const randomIndex = Math.floor(Math.random() * namesData.length);
    const randomName = namesData[randomIndex];

    const fullName = `${randomName.firstname} ${randomName.lastname}`;
    const nameElement = document.createElement("p");
    nameElement.textContent = fullName;
    nameElement.classList.add("animation"); // Adicione a classe "animation" aqui
    nameListElement.appendChild(nameElement);
  } else {
    console.error("Nenhum nome carregado.");
  }
}

// Carregue a lista de nomes do servidor uma vez
loadNamesFromServer();

// Configure um intervalo de tempo para exibir nomes aleatórios
setInterval(displayRandomName, 5000); // Altere o tempo conforme necessário
