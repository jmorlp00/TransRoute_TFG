const fondo = document.querySelector('.fondo');
const registrarLink = document.querySelector(".registrar-link");
const loginLink = document.querySelector('.login-link');

registrarLink.addEventListener('click', ()=>{

	fondo.classList.add('active');
});

loginLink.addEventListener('click', ()=>{

	fondo.classList.remove('active');
});