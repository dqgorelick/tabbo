const port = chrome.extension.connect({name: 'popup'});

document.querySelector('#keybinds').addEventListener('click', () => {
	port.postMessage('keybinds');
});

document.querySelector('#instructions').addEventListener('click', () => {
	port.postMessage('instructions');
});

document.querySelector('#pop').addEventListener('click', () => {
	port.postMessage('pop');
});

document.querySelector('#send').addEventListener('click', () => {
	port.postMessage('send');
});

document.querySelector('#send').addEventListener('click', () => {
	port.postMessage('send');
});

let bonusClicked = 0;
const bonusElem = document.querySelector('#bonus');

document.querySelector('#bonus').addEventListener('click', () => {
	bonusClicked += 1;

	if (bonusClicked === 1) {
		bonusElem.innerHTML('stop it');
	} else if (bonusClicked === 2) {
		bonusElem.innerHTML('I\'m warning you');
	} else if (bonusClicked === 3) {
		bonusElem.innerHTML('last warning...');
	}

	if (bonusClicked > 3) {
		bonusElem.innerHTML('explode!!');
		port.postMessage('explode');
	}
});
