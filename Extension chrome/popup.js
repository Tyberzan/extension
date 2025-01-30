
document.addEventListener('DOMContentLoaded', function(){
	

const scriptUrl = 'https://script.google.com/macros/s/AKfycbzSqJzoFHJxXHM38CkAY3gVzYwbS0qORyMmLGyF2M0uhTZ6pPZ_9421dRlBMbh9tYLyBA/exec';


	var myButton_1 = document.getElementById("sending");
	var nouveauTexte = document.getElementById('nouveauTexte');

	var valueText;
	var textChange = "Click";
	
	myButton_1.addEventListener('click',function(){
		console.log('Button clicked');
		this.textContent = textChange;
		valueText = nouveauTexte.value;
		console.log('Value text:', valueText);
		chrome.runtime.sendMessage({action: 'buttonClicked', data: valueText});

			
		
	});
});

