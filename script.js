function fetchDefinition() {
    const word = document.getElementById('wordInput').value.trim();
    if (!word) {
        alert('Please enter a word');
        return;
    }

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch definition');
            }
            return response.json();
        })
        .then(data => {
            displayDefinitions(data);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to fetch definition. Please try again later.');
        });
}

function displayDefinitions(data) {
    const definitionsDiv = document.getElementById('definitions');
    definitionsDiv.innerHTML = '';

    data.forEach(entry => {
        const word = entry.word;
        const meanings = entry.meanings;

        const wordHeading = document.createElement('h2');
        wordHeading.textContent = word;
        definitionsDiv.appendChild(wordHeading);

        meanings.forEach(meaning => {
            const partOfSpeech = meaning.partOfSpeech;
            const definitions = meaning.definitions;

            const partOfSpeechPara = document.createElement('p');
            partOfSpeechPara.textContent = `(${partOfSpeech})`;
            definitionsDiv.appendChild(partOfSpeechPara);

            definitions.forEach(definition => {
                const definitionPara = document.createElement('p');
                definitionPara.textContent = `- ${definition.definition}`;
                definitionsDiv.appendChild(definitionPara);
            });
        });
    });
}
