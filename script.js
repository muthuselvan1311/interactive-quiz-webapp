document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const welcomeScreen = document.getElementById('welcome-screen');
    const quizContainer = document.getElementById('quiz-container');
    const resultsContainer = document.getElementById('results-container');
    const startBtn = document.getElementById('start-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    const restartBtn = document.getElementById('restart-btn');
    const questionElement = document.getElementById('question');
    const answerButtons = document.getElementById('answer-buttons');
    const progressElement = document.getElementById('progress');
    const timerElement = document.getElementById('timer');
    const resultMessage = document.getElementById('result-message');
    const scoreText = document.getElementById('score-text');
    const timeTaken = document.getElementById('time-taken');
    const scoreBar = document.getElementById('score-bar');
    const usernameInput = document.getElementById('username');
    const confettiCanvas = document.getElementById('confetti-canvas');

    // Quiz variables
    let currentQuestionIndex = 0;
    let score = 0;
    let userAnswers = [];
    let quizStartedAt;
    let timerInterval;
    let username = '';

    // Quiz questions
    const questions = [
        {
            question: "What is the capital of France?",
            answers: [
                { text: "London", correct: false },
                { text: "Paris", correct: true },
                { text: "Berlin", correct: false },
                { text: "Madrid", correct: false }
            ]
        },
        {
            question: "Which planet is known as the Red Planet?",
            answers: [
                { text: "Venus", correct: false },
                { text: "Mars", correct: true },
                { text: "Jupiter", correct: false },
                { text: "Saturn", correct: false }
            ]
        },
        {
            question: "What is the largest mammal in the world?",
            answers: [
                { text: "Elephant", correct: false },
                { text: "Blue Whale", correct: true },
                { text: "Giraffe", correct: false },
                { text: "Polar Bear", correct: false }
            ]
        },
        {
            question: "Which language runs in a web browser?",
            answers: [
                { text: "Java", correct: false },
                { text: "C", correct: false },
                { text: "Python", correct: false },
                { text: "JavaScript", correct: true }
            ]
        },
        {
            question: "What year was JavaScript launched?",
            answers: [
                { text: "1996", correct: false },
                { text: "1995", correct: true },
                { text: "1994", correct: false },
                { text: "None of the above", correct: false }
            ]
        }
    ];

    // Start quiz
    startBtn.addEventListener('click', () => {
        username = usernameInput.value.trim();
        if (!username) {
            usernameInput.classList.add('is-invalid');
            return;
        }
        
        usernameInput.classList.remove('is-invalid');
        welcomeScreen.classList.add('animate__fadeOut');
        
        setTimeout(() => {
            welcomeScreen.classList.add('d-none');
            quizContainer.classList.remove('d-none');
            quizContainer.classList.add('animate__fadeIn');
            startTimer();
            showQuestion();
        }, 500);
    });

    // Restart quiz
    restartBtn.addEventListener('click', () => {
        resultsContainer.classList.remove('animate__zoomIn');
        resultsContainer.classList.add('animate__fadeOut');
        
        setTimeout(() => {
            resultsContainer.classList.add('d-none');
            welcomeScreen.classList.remove('d-none', 'animate__fadeOut');
            welcomeScreen.classList.add('animate__fadeIn');
            
            // Reset quiz state
            currentQuestionIndex = 0;
            score = 0;
            userAnswers = [];
            usernameInput.value = '';
        }, 500);
    });

    // Previous question
    prevBtn.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            animateQuestionChange('left');
        }
    });

    // Next question
    nextBtn.addEventListener('click', () => {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            animateQuestionChange('right');
        }
    });

    // Submit quiz
    submitBtn.addEventListener('click', showResults);

    // Timer function
    function startTimer() {
        quizStartedAt = new Date();
        updateTimer();
        timerInterval = setInterval(updateTimer, 1000);
    }

    function updateTimer() {
        const now = new Date();
        const elapsed = Math.floor((now - quizStartedAt) / 1000);
        const minutes = Math.floor(elapsed / 60).toString().padStart(2, '0');
        const seconds = (elapsed % 60).toString().padStart(2, '0');
        timerElement.textContent = `${minutes}:${seconds}`;
    }

    // Show question
    function showQuestion() {
        resetState();
        const question = questions[currentQuestionIndex];
        const questionNo = currentQuestionIndex + 1;
        
        questionElement.textContent = `${questionNo}. ${question.question}`;
        progressElement.textContent = `Question ${questionNo} of ${questions.length}`;
        
        question.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.classList.add('btn', 'btn-answer', 'btn-light', 'animate__animated', `animate-delay-${index}`);
            
            // Check if user has already answered this question
            if (userAnswers[currentQuestionIndex] !== undefined) {
                if (userAnswers[currentQuestionIndex] === index) {
                    button.classList.add(answer.correct ? 'correct' : 'incorrect');
                } else if (answer.correct) {
                    button.classList.add('correct');
                }
            }
            
            button.textContent = answer.text;
            button.addEventListener('click', () => selectAnswer(index));
            answerButtons.appendChild(button);
        });

        // Update button states
        prevBtn.disabled = currentQuestionIndex === 0;
        nextBtn.disabled = currentQuestionIndex === questions.length - 1;
        submitBtn.classList.toggle('d-none', currentQuestionIndex !== questions.length - 1);
    }

    function resetState() {
        // Clear answer buttons
        while (answerButtons.firstChild) {
            answerButtons.removeChild(answerButtons.firstChild);
        }
    }

    function selectAnswer(answerIndex) {
        // Check if already answered
        if (userAnswers[currentQuestionIndex] !== undefined) return;
        
        const question = questions[currentQuestionIndex];
        const isCorrect = question.answers[answerIndex].correct;
        
        // Store user answer
        userAnswers[currentQuestionIndex] = answerIndex;
        
        // Update score if correct
        if (isCorrect) {
            score++;
        }
        
        // Highlight selected answer
        const buttons = answerButtons.querySelectorAll('button');
        buttons.forEach((button, index) => {
            button.disabled = true;
            if (index === answerIndex) {
                button.classList.add(isCorrect ? 'correct' : 'incorrect');
            } else if (question.answers[index].correct) {
                button.classList.add('correct');
            }
        });
        
        // Auto-advance to next question after delay if not last question
        if (currentQuestionIndex < questions.length - 1) {
            setTimeout(() => {
                currentQuestionIndex++;
                animateQuestionChange('right');
            }, 1500);
        }
    }

    function animateQuestionChange(direction) {
        const questionCard = document.getElementById('question-container');
        questionCard.classList.remove('animate__fadeIn');
        questionCard.classList.add(`animate__fadeOut${direction === 'left' ? 'Left' : 'Right'}`);
        
        setTimeout(() => {
            questionCard.classList.remove(`animate__fadeOut${direction === 'left' ? 'Left' : 'Right'}`);
            showQuestion();
            questionCard.classList.add('animate__fadeIn');
        }, 300);
    }

    function showResults() {
        clearInterval(timerInterval);
        const endTime = new Date();
        const timeElapsed = Math.floor((endTime - quizStartedAt) / 1000);
        const minutes = Math.floor(timeElapsed / 60);
        const seconds = timeElapsed % 60;
        
        quizContainer.classList.remove('animate__fadeIn');
        quizContainer.classList.add('animate__fadeOut');
        
        setTimeout(() => {
            quizContainer.classList.add('d-none');
            resultsContainer.classList.remove('d-none');
            
            // Calculate percentage
            const percentage = Math.round((score / questions.length) * 100);
            
            // Set result message based on score
            if (percentage >= 80) {
                resultMessage.textContent = `Congratulations, ${username}! 🎉`;
                resultMessage.classList.add('text-success');
                startConfetti();
            } else if (percentage >= 50) {
                resultMessage.textContent = `Good job, ${username}! 👍`;
                resultMessage.classList.add('text-primary');
            } else {
                resultMessage.textContent = `Keep practicing, ${username}! 💪`;
                resultMessage.classList.add('text-warning');
            }
            
            // Update score elements
            scoreText.textContent = `You scored ${score} out of ${questions.length}`;
            timeTaken.textContent = `Time taken: ${minutes}m ${seconds}s`;
            
            // Animate progress bar
            setTimeout(() => {
                scoreBar.style.width = `${percentage}%`;
                scoreBar.textContent = `${percentage}%`;
            }, 100);
        }, 500);
    }

    // Confetti effect
    function startConfetti() {
        confettiCanvas.classList.remove('d-none');
        const canvas = confettiCanvas;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const confettiPieces = [];
        const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'];
        
        // Create confetti pieces
        for (let i = 0; i < 150; i++) {
            confettiPieces.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height - canvas.height,
                r: Math.random() * 4 + 1,
                d: Math.random() * 7 + 3,
                color: colors[Math.floor(Math.random() * colors.length)],
                tilt: Math.floor(Math.random() * 10) - 10,
                tiltAngle: Math.random() * 0.1,
                tiltAngleIncrement: Math.random() * 0.07
            });
        }
        
        function drawConfetti() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            confettiPieces.forEach((p, i) => {
                ctx.beginPath();
                ctx.lineWidth = p.r / 2;
                ctx.strokeStyle = p.color;
                ctx.moveTo(p.x + p.tilt + (p.r / 4), p.y);
                ctx.lineTo(p.x + p.tilt, p.y + p.tilt + (p.r / 4));
                ctx.stroke();
                
                p.tiltAngle += p.tiltAngleIncrement;
                p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
                p.tilt = Math.sin(p.tiltAngle) * 15;
                
                if (p.y > canvas.height) {
                    if (i % 5 > 0 || i % 2 === 0) {
                        confettiPieces[i] = {
                            x: Math.random() * canvas.width,
                            y: -10,
                            r: p.r,
                            d: p.d,
                            color: p.color,
                            tilt: Math.floor(Math.random() * 10) - 10,
                            tiltAngle: p.tiltAngle,
                            tiltAngleIncrement: p.tiltAngleIncrement
                        };
                    }
                }
            });
            
            requestAnimationFrame(drawConfetti);
        }
        
        drawConfetti();
        
        // Stop confetti after 5 seconds
        setTimeout(() => {
            confettiCanvas.classList.add('d-none');
        }, 5000);
    }
});