/* =========================================
   RIPPLE BUTTON EFFECT
========================================= */

const rippleButtons = document.querySelectorAll(".ripple");

rippleButtons.forEach(button => {

    button.addEventListener("click", function (event) {

        const circle = document.createElement("span");

        circle.classList.add("ripple-effect");

        const diameter = Math.max(
            button.clientWidth,
            button.clientHeight
        );

        const radius = diameter / 2;

        circle.style.width = `${diameter}px`;
        circle.style.height = `${diameter}px`;

        circle.style.left =
            `${event.clientX - button.getBoundingClientRect().left - radius}px`;

        circle.style.top =
            `${event.clientY - button.getBoundingClientRect().top - radius}px`;

        button.appendChild(circle);

        setTimeout(() => {
            circle.remove();
        }, 600);

    });

});


/* =========================================
   DARK MODE
========================================= */

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeBtn.textContent = "☀️";
    } else {
        themeBtn.textContent = "🌙";
    }

});


/* =========================================
   CONTACT BUTTON
========================================= */

const contactBtn = document.getElementById("contactBtn");

contactBtn.addEventListener("click", () => {

    alert(
        "Thank you for your interest! You can contact me at myportfolio@example.com"
    );

});


/* =========================================
   PROJECT BUTTONS
========================================= */

const projectButtons =
    document.querySelectorAll(".card-btn");

projectButtons.forEach(button => {

    button.addEventListener("click", () => {

        alert("Project details coming soon!");

    });

});