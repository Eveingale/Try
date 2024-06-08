document.addEventListener('DOMContentLoaded', function () {
    const quizData = [
        {
            question: "Which sentence is grammatically correct?",
            a: "I goes to the store.",
            b: "She go to the store.",
            c: "He went to the store.",
            d: "They goes to the store.",
            correct: "c"
        },
        {
            question: "Which of these is a synonym for 'happy'?",
            a: "Sad",
            b: "Joyful",
            c: "Angry",
            d: "Tired",
            correct: "b"
        },
        {
            question: "Which word is spelled correctly?",
            a: "Definately",
            b: "Definitley",
            c: "Definitely",
            d: "Definately",
            correct: "c"
        }
    ];

    const quizContainer = document.getElementById('quiz-container');
    const submitBtn = document.getElementById('submit-btn');
    const resultContainer = document.getElementById('result');
    const startQuizBtn = document.getElementById('start-quiz-btn');
    const learnSection = document.getElementById('learn');
    const quizSection = document.getElementById('quiz');
    const footer = document.querySelector('footer');

    let lastScrollTop = 0;

    window.addEventListener('scroll', function () {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            // Scroll down
            footer.style.display = 'none';
        } else {
            // Scroll up
            footer.style.display = 'block';
        }
        lastScrollTop = scrollTop;
    });

    function loadQuiz() {
        quizContainer.innerHTML = '';
        quizData.forEach((quizItem, index) => {
            const quizElement = document.createElement('div');
            quizElement.classList.add('question');

            const questionTitle = document.createElement('h3');
            questionTitle.innerText = quizItem.question;
            quizElement.appendChild(questionTitle);

            const optionsList = document.createElement('ul');
            optionsList.classList.add('options');

            ['a', 'b', 'c', 'd'].forEach(option => {
                const optionElement = document.createElement('li');

                const optionRadio = document.createElement('input');
                optionRadio.type = 'radio';
                optionRadio.name = `question${index}`;
                optionRadio.value = option;

                const optionLabel = document.createElement('label');
                optionLabel.innerText = quizItem[option];

                optionElement.appendChild(optionRadio);
                optionElement.appendChild(optionLabel);

                optionsList.appendChild(optionElement);
            });

            quizElement.appendChild(optionsList);
            quizContainer.appendChild(quizElement);
        });
    }

    function getSelectedAnswers() {
        const answers = [];
        quizData.forEach((_, index) => {
            const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
            if (selectedOption) {
                answers.push(selectedOption.value);
            } else {
                answers.push(null);
            }
        });
        return answers;
    }

    function calculateScore(answers) {
        let score = 0;
        answers.forEach((answer, index) => {
            if (answer === quizData[index].correct) {
                score++;
            }
        });
        return score;
    }

    startQuizBtn.addEventListener('click', () => {
        learnSection.style.display = 'none';
        quizSection.style.display = 'block';
        loadQuiz();
    });

    submitBtn.addEventListener('click', () => {
        const answers = getSelectedAnswers();
        const score = calculateScore(answers);
        resultContainer.innerText = `You scored ${score} out of ${quizData.length}`;
        console.log(`Answers: ${answers}, Score: ${score}`); // Debug log
    });

    // Hide the quiz section initially
    quizSection.style.display = 'none';
});
