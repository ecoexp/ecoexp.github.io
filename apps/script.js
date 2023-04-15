const searchBox = document.getElementById("search-box");
const micButton = document.getElementById("mic-button");
const resultsDiv = document.getElementById("results");
let html = "";


micButton.addEventListener("click", () => {
    html = "";
	const recognition = new webkitSpeechRecognition();
	recognition.continuous = false;
	recognition.interimResults = false;

	recognition.onresult = function(event) {
		const spokenText = event.results[0][0].transcript.toLowerCase();
		searchBox.value = spokenText;
		let matchedFiles = svgFiles.filter(file => {
			let match = false;
			file.keywords.forEach(keyword => {
				if (keyword.includes(spokenText)) {
					match = true;
				}
			});
			return match;
		});
		displayResults(matchedFiles);
	};

	recognition.onerror = function(event) {
		console.log('Speech recognition error: ' + event.error);
	};

	recognition.onaudiostart = function(event) {
		console.log('Microphone is starting');
		micButton.style.backgroundColor = '#dc3545';
		micButton.innerText = 'Listening...';
	}

	recognition.onaudioend = function(event) {
		console.log('Microphone is not listening');
		micButton.style.backgroundColor = '#007bff';
		micButton.innerText = 'Speak';
	}

	recognition.start();
});


searchBox.addEventListener("keyup", () => {
    html = "";
    const searchTerm = searchBox.value.toLowerCase();
    let matchedFiles = svgFiles.filter(file => {
      let match = false;
      file.keywords.forEach(keyword => {
        let words = keyword.toLowerCase().split(' ');
        words.forEach(word => {
          if (searchTerm.includes(word)) {
            match = true;
          }
        });
      });
      return match;
    });
    displayResults(matchedFiles);
  });
  
  
  

function displayResults(files) {
	
	files.forEach(file => {
		html += `<div class="result"><img src="${file.url}" alt="${file.name}"><p>${file.name}</p></div>`;
	});
	resultsDiv.innerHTML = html;
}
