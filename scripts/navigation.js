
const menuToggle = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');


menuToggle.addEventListener('click', () => {
  
  navLinks.classList.toggle('active');
});
