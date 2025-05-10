// Seleciona o botão hambúrguer e o menu de navegação
const menuToggle = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Adiciona um evento de clique no botão hambúrguer
menuToggle.addEventListener('click', () => {
  // Adiciona ou remove a classe 'active' no menu de navegação para mostrar ou ocultar
  navLinks.classList.toggle('active');
});
