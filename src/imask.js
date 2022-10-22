import IMask from 'imask';
// Alternative to getElementById: document.querySelector('#Id');

// IMask: Security Code
const securityCode = document.getElementById('security-code');
const securityCodePattern = { mask: '0000' }
const securityCodeMasked = IMask(securityCode, securityCodePattern);

securityCodeMasked.on('accept', () => {
	const ccSecurity = document.querySelector('.cc-security .value');
	return ccSecurity.innerText = securityCodeMasked.value.length === 0 ? '123' : securityCodeMasked.value;
});

// IMask: Expiration Date
const expirationDate = document.getElementById('expiration-date');
const expirationDatePattern = {
	mask: 'MM{/}YY',
	blocks: {
		MM: {
			mask: IMask.MaskedRange,
			from: 1,
			to: 12
		},
		YY: {
			mask: IMask.MaskedRange,
			from: String(new Date().getFullYear()).slice(2),
			to: String(new Date().getFullYear() + 10).slice(2)
		}
	}
}
const expirationDateMasked = IMask(expirationDate, expirationDatePattern);

expirationDateMasked.on('accept', () => {
	const ccExpiration = document.querySelector('.cc-expiration .value');
	return ccExpiration.innerText = expirationDateMasked.value.length === 0 ? '02/32' : expirationDateMasked.value;
});

// IMask: Card Number
const cardNumber = document.getElementById('card-number');
const cardNumberPattern = {
	mask: [
		{
			mask: '0000 0000 0000 0000',
			regex: /^4\d{0,15}/,
			cardType: 'visa'
		},
		{
			mask: '0000 0000 0000 0000',
			regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
			cardType: 'mastercard'
		},
		{
			mask: '0000 0000 0000 0000',
			cardType: 'default'
		}
	],
	dispatch: (appended, dynamicMasked) => {
		const number = (dynamicMasked.value + appended).replace(/\D/g, '');

		return dynamicMasked.compiledMasks.find(({ regex }) => {
			return number.match(regex);
		});
	}
}
const cardNumberMasked = IMask(cardNumber, cardNumberPattern);

// CardNumber: Card Type
const ccBgColorPrimary = document.querySelector('.cc-bg svg > g g:nth-child(1) path');
const ccBgColorSecundary = document.querySelector('.cc-bg svg > g g:nth-child(2) path');
const ccLogo = document.querySelector('.cc-logo span:nth-child(2) img');

function setCardType(type) {
	const colors = {
		visa: ['#436D99', '#2D57F2'],
		mastercard: ['#DF6F29', '#C69347'],
		default: ['black', 'gray']
	}

	ccBgColorPrimary.setAttribute('fill', colors[type][0]);
	ccBgColorSecundary.setAttribute('fill', colors[type][1]);
	ccLogo.setAttribute('src', `cc-${type}.svg`);
}
// window || globalThis.setCardType = setCardType;

cardNumberMasked.on('accept', () => {
	setCardType(cardNumberMasked.masked.currentMask.cardType);

	const ccNumber = document.querySelector('.cc-number');
	return ccNumber.innerText = cardNumberMasked.value.length === 0 ? '1234 5678 9012 3456' : cardNumberMasked.value;
});

// IMask: Card Holder
const cardHolder = document.getElementById('card-holder');
const cardHolderPattern = { mask: /^[A-Za-z ]*$/ }
const cardHolderMasked = IMask(cardHolder, cardHolderPattern);

// document.getElementById('card-holder').addEventListener('input', () => { });
cardHolderMasked.on('accept', () => {
	const ccHolder = document.querySelector('.cc-holder .value');
	ccHolder.innerText = cardHolder.value.length === 0 ? 'EXPLORER LAB' : cardHolder.value.slice(0, 37);
});
