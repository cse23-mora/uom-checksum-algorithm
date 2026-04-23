const indexInput = document.getElementById('indexInput');
const resultArea = document.getElementById('result');
const statusIcon = document.getElementById('statusIcon');
const resultMessage = document.getElementById('resultMessage');
const resultSuggestion = document.getElementById('resultSuggestion');

const newMapping = [
    'H', 'J', 'K', 'L', 'M', 'N', 'P', 'R', 'T',
    'U', 'V', 'X', 'A', 'B', 'C', 'D', 'E', 'F', 'G'
];

const legacyMapping = [
    'P', 'R', 'T', 'U', 'V', 'X', 'A', 'B', 'C',
    'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N'
];

const originalMapping = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J',
    'K', 'L', 'M', 'N', 'P', 'R', 'T', 'U', 'V', 'X'
];

const weights = [8, 7, 6, 5, 4, 3];

function calculateExpectedLetter(digits) {
    let sum = 0;
    for (let i = 0; i < 6; i++) {
        sum += parseInt(digits[i]) * weights[i];
    }

    const batchYear = parseInt(digits.substring(0, 2), 10);
    let selectedMapping;
    if (batchYear >= 20) {
        selectedMapping = newMapping;
    } else if (batchYear >= 10) {
        selectedMapping = legacyMapping;
    } else {
        selectedMapping = originalMapping;
    }

    return selectedMapping[sum % 19];
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
        showResult('suggestion-mode', '💡 Check Letter: ' + expectedLetter, `The complete index number is: ${digits}${expectedLetter}`);
    } else if (actualLetter === expectedLetter) {
        // Correct mode
        showResult('correct', '✅ Correct', `'${digits}${actualLetter}' is a valid index number.`);
    } else {
        // Error mode
        showResult('incorrect', `❌ Incorrect. The letter '${actualLetter}' is wrong.`, `The correct index number should be: ${digits}${expectedLetter}`);
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
