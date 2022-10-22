import './css/index.css';
import './imask';

document.getElementById('add-card').addEventListener('click', () => {
	alert('Cartão Adicionado!');
});

document.querySelector('form').addEventListener('submit', (event) => {
	event.preventDefault();
});