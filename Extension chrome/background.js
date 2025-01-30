var consoleTest = "Hello from background.js";
const url = 'https://script.google.com/macros/s/AKfycbzSqJzoFHJxXHM38CkAY3gVzYwbS0qORyMmLGyF2M0uhTZ6pPZ_9421dRlBMbh9tYLyBA/exec';
const data = 'Hello from background.js';

console.log("i am alive!");
console.log(consoleTest);

let appbody = {
    "fruit_name": "Orange",
    "qty": "210"
  };
  let optionsin = {
    "method": "POST",
    "body": JSON.stringify(appbody)
  };
  
  function samplefunc() {
    try {
      console.log("About to call fetch");
      fetch(url, optionsin)
        .then(response => { return response.json() })
        .then(result => {
          console.log(' result from  api call', result);
        });
    } catch (error) {
      console.log('Error in triggering fetch', error.message);
    }
  }
  
  samplefunc();


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function sendDataToAppScript(url, data) {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json' // Ensure you request JSON back.
        },
        body: JSON.stringify({ text: data })
    })
    .then(response => {
        if (response.ok) {
            const contentType = response.headers.get("Content-Type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                return response.json();
            } else {
                 return response.text().then(text => { throw new Error(`Expected JSON but received: ${contentType} - ${text}`); });
            }
        } else {
            throw new Error(`Network response was not ok. Status: ${response.status} - ${response.statusText}`);
        }
    })
    .then(data => {
        console.log('Success:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

// background.js (or service_worker.js)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'buttonClicked') {
        console.log('Données reçues:', request.data);
        sendResponse({ status: 'Données affichées dans la console' });

        // Example: Make sure 'url' is correctly defined
        const appScriptUrl = 'https://script.google.com/macros/s/AKfycbzSqJzoFHJxXHM38CkAY3gVzYwbS0qORyMmLGyF2M0uhTZ6pPZ_9421dRlBMbh9tYLyBA/exec'; // Replace with the actual URL
        sendDataToAppScript(appScriptUrl, "Hello from background.js");
    }
    return true; // To keep the message channel open.
});