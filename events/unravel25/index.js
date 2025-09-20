
const hamburger = document.getElementById("hamburger");
const cartoonMenu = document.getElementById("cartoonMenu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    cartoonMenu.classList.toggle("show");
});

document.querySelectorAll(".cartoon-menu a").forEach(link => {
    link.addEventListener("click", () => {
        document.querySelectorAll(".cartoon-menu a").forEach(l => l.classList.remove("active"));
        link.classList.add("active");
        hamburger.classList.remove("active");
        cartoonMenu.classList.remove("show");
    });
});
// Close menu when clicking outside
document.addEventListener("click", (e) => {
    if (!cartoonMenu.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove("active");
        cartoonMenu.classList.remove("show");
    }
});
