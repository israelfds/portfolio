document.addEventListener('DOMContentLoaded', function () {
    const clickMeButton = document.getElementById('clickMeButton');
    const modal = document.querySelector('.modal');
    const modalBackground = document.querySelector('.modal-background');
    const confirmButton = document.getElementById('confirmButton');
    const confirmationText = document.createElement('p');
    confirmationText.textContent = 'Você confirmou que visitou o site. Obrigado!';
    confirmationText.style.color = 'green';
  
    clickMeButton.addEventListener('click', () => {
      modal.style.display = 'block';
      modalBackground.style.display = 'block';
    });
  
    // Fechar o modal quando o fundo for clicado
    modalBackground.addEventListener('click', () => {
      modal.style.display = 'none';
      modalBackground.style.display = 'none';
    });
  
    confirmButton.addEventListener('click', () => {
      modal.style.display = 'none';
      modalBackground.style.display = 'none';
      modal.appendChild(confirmationText);
    });
  });
  