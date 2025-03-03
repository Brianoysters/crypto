document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll(".tab-button");
    const contents = document.querySelectorAll(".tab-content");

    function openTab(event, tabId) {
        tabs.forEach(tab => tab.classList.remove("active"));
        contents.forEach(content => content.classList.remove("active"));

        event.currentTarget.classList.add("active");
        document.getElementById(tabId).classList.add("active");
    }

    // Default open first tab
    if (tabs.length > 0) {
        tabs[0].classList.add("active");
        contents[0].classList.add("active");
    }

    tabs.forEach(tab => {
        tab.addEventListener("click", function (event) {
            openTab(event, tab.getAttribute("onclick").split("'")[1]);
        });
    });

    // Quiz Logic
    const quizForm = document.getElementById("quiz-form");
    const resultText = document.getElementById("result");
    let attempts = 5;
    const passMark = 70;

    quizForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (attempts <= 0) {
            resultText.innerText = "You have exhausted your 5 attempts. Try again in 24 hours.";
            return;
        }

        let score = 0;
        const answers = {
            q1: "a",
            q2: "b",
            q3: "b",
            q4: "b",
            q5: "b",
            q6: "b",
            q7: "b",
            q8: "c",
            q9: "a",
            q10: "b",
            q11: "a",
            q12: "b",
            q13: "a",
            q14: "b",
            q15: "a",
            q16: "b",
            q17: "b",
            q18: "c",
            q19: "a",
        };

        Object.keys(answers).forEach(q => {
            const selected = document.querySelector(`input[name="${q}"]:checked`);
            if (selected && selected.value === answers[q]) {
                score += 1;
            }
        });

        const percentage = (score / Object.keys(answers).length) * 100;

        if (percentage >= passMark) {
            resultText.innerText = `🎉 Congratulations! You passed with ${percentage}%.`;
            confettiEffect();
        } else {
            attempts--;
            resultText.innerText = `❌ You scored ${percentage}%. Attempts left: ${attempts}`;
        }
    });

    function confettiEffect() {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
});
