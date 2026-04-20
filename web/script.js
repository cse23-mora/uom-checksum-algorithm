const indexInput = document.getElementById('indexInput');
const resultArea = document.getElementById('result');
const statusIcon = document.getElementById('statusIcon');
const resultMessage = document.getElementById('resultMessage');
const resultSuggestion = document.getElementById('resultSuggestion');

const mapping = {
    0: 'H', 1: 'J', 2: 'K', 3: 'L', 4: 'M', 5: 'N', 6: 'P', 
    7: 'R', 8: 'T', 9: 'U', 10: 'V', 11: 'X', 12: 'A', 
    13: 'B', 14: 'C', 15: 'D', 16: 'E', 17: 'F', 18: 'G'
};

const weights = [8, 7, 6, 5, 4, 3];

function calculateExpectedLetter(digits) {
    let sum = 0;
    for (let i = 0; i < 6; i++) {
        sum += parseInt(digits[i]) * weights[i];
    }
    return mapping[sum % 19];
}

indexInput.addEventListener('input', (e) => {
    let val = e.target.value.trim().toUpperCase();
    
    // Clear results if input is too short
    if (val.length < 6) {
        resultArea.classList.add('hidden');
        return;
    }

    const digits = val.substring(0, 6);
    const actualLetter = val.substring(6);

    // Validate digits prefix
    if (!/^\d{6}$/.test(digits)) {
        showResult('incorrect', '❌ Invalid Format', 'The first 6 characters must be digits.');
        return;
    }

    const expectedLetter = calculateExpectedLetter(digits);

    if (actualLetter === "") {
        // Suggestion mode
        showResult('suggestion-mode', '💡 Check Letter: ' + expectedLetter, `Complete Index: ${digits}${expectedLetter}`);
    } else if (actualLetter === expectedLetter) {
        // Correct mode
        showResult('correct', '✅ Valid Index', `${digits}${actualLetter} is a correct UOM index.`);
    } else {
        // Error mode
        showResult('incorrect', '❌ Invalid Letter', `Expected '${expectedLetter}', but got '${actualLetter}'.`);
    }
});

function showResult(type, message, suggestion) {
    resultArea.className = 'result-area ' + type;
    resultMessage.textContent = message;
    resultSuggestion.textContent = suggestion;
    
    // Set icon based on type
    if (type === 'correct') statusIcon.textContent = '✔️';
    else if (type === 'incorrect') statusIcon.textContent = '❌';
    else statusIcon.textContent = '🔍';

    resultArea.classList.remove('hidden');
}
