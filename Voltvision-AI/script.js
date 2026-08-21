document.addEventListener("DOMContentLoaded", () => {

    // Smooth scrolling
    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", function (e) {
            const target = document.querySelector(this.getAttribute("href"));

            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });

    // Button animation
    const buttons = document.querySelectorAll(".btn");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            button.style.transform = "scale(0.95)";

            setTimeout(() => {
                button.style.transform = "scale(1)";
            }, 150);
        });
    });

    // Card animation
    const cards = document.querySelectorAll(".card");

    cards.forEach((card, index) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";

        setTimeout(() => {
            card.style.transition = "0.6s ease";
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }, index * 200);
    });

});