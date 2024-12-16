document.addEventListener('DOMContentLoaded', () => {
    const options = document.querySelectorAll('.option');
    const submitBtn = document.querySelector('.submit-btn');
    const result = document.querySelector('.result');

    const correctAnswers = ['C', 'B', 'B', 'A', 'B', 'A', 'A', 'B', 'C', 'C', 'A', 'A', 'D'];

    if (!options.length || !submitBtn || !result) {
        console.error('One or more DOM elements are missing. Ensure all elements exist in the HTML.');
        return;
    }

    options.forEach(option => {
        option.addEventListener('click', () => {
            const siblings = option.parentElement.querySelectorAll('.option');
            siblings.forEach(sibling => sibling.classList.remove('selected'));
            option.classList.add('selected');
        });
    });

    submitBtn.addEventListener('click', () => {
        let score = 0;
        const selectedAnswers = document.querySelectorAll('.option.selected');

        if (selectedAnswers.length < correctAnswers.length) {
            result.style.display = 'block';
            result.innerHTML = 'Please answer all questions before submitting.';
            return;
        }

        // Reset styles for all options
        options.forEach(option => {
            option.classList.remove('correct');
            option.classList.remove('incorrect');
        });

        selectedAnswers.forEach((selected, index) => {
            const selectedText = selected.textContent.trim();
            const selectedLetter = selectedText.charAt(0).toUpperCase();
            const parent = selected.parentElement;
            
            if (selectedLetter === correctAnswers[index]) {
                score++;
                selected.classList.add('correct'); 
            } else {
                selected.classList.add('incorrect'); 
                const correctOption = Array.from(parent.children).find(option => {
                    return option.textContent.trim().charAt(0).toUpperCase() === correctAnswers[index];
                });
                if (correctOption) correctOption.classList.add('correct');
            }
        });

        result.style.display = 'block';
        result.innerHTML = `Your score: ${score} out of ${correctAnswers.length}<br>
            ${score === correctAnswers.length ? 'Perfect! You\'re a League of Legends expert!' :
             score >= 9 ? 'Great job! You know a lot about LoL esports!' :
             score >= 5 ? 'Good effort! Keep learning about LoL esports!' :
             'Don\'t give up! Study more and try again!'}`;
    });
});