const searchBox = document.getElementById("search-box");
const micButton = document.getElementById("mic-button");
const resultsDiv = document.getElementById("results");


const componentsDir = "./components";


function getSvgFiles() {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", componentsDir);
      xhr.onload = function() {
        if (xhr.status === 200) {
          const files = xhr.responseText.split("\n");
          const svgFiles = files.filter(file => file.endsWith(".svg"));
          resolve(svgFiles);
        } else {
          reject(xhr.statusText);
        }
      };
      xhr.onerror = function() {
        reject(xhr.statusText);
      };
      xhr.send();
    });
  }

micButton.addEventListener("click", () => {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
  
    recognition.onresult = async function(event) {
      const spokenText = event.results[0][0].transcript.toLowerCase();
      searchBox.value = spokenText;
      const svgFiles = await getSvgFiles();
      let matchedFiles = svgFiles.filter(file => {
        return file.includes(spokenText);
      });
      displayResults(matchedFiles);
    };

	recognition.onerror = function(event) {
		console.log('Speech recognition error: ' + event.error);
	};

	recognition.onaudiostart = function(event) {
		console.log('Microphone is starting');
	}

	recognition.onaudioend = function(event) {
		console.log('Microphone is not listening');
	}

	recognition.start();
});


searchBox.addEventListener("keyup", async () => {
    const searchTerm = searchBox.value.toLowerCase();
    const svgFiles = await getSvgFiles();
    let matchedFiles = svgFiles.filter(file => {
      return file.includes(searchTerm);
    });
    displayResults(matchedFiles);
  });

function displayResults(files) {
	let html = "";
	files.forEach(file => {
		html += `<div class="result"><img src="${file.url}" alt="${file.name}"></div>`;
	});
	resultsDiv.innerHTML = html;
}
