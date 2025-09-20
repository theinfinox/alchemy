const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalName = document.getElementById("modalName");
const modalRole = document.getElementById("modalRole");
const modalBio = document.getElementById("modalBio");
const modalSocials = document.getElementById("modalSocials");
const modalClose = document.getElementById("modalClose");

document.querySelectorAll(".speaker").forEach(card => {
    card.addEventListener("click", () => {
        modalImg.src = card.dataset.img;
        modalName.textContent = card.dataset.name;
        modalRole.textContent = card.dataset.role;
        modalBio.textContent = card.dataset.bio;

        // Insert socials
        modalSocials.innerHTML = "";
        const socials = JSON.parse(card.dataset.socials);
        socials.forEach(s => {
            const a = document.createElement("a");
            a.href = s.url;
            a.innerHTML = `<i class="${s.icon}"></i>`;
            a.target = "_blank";
            modalSocials.appendChild(a);
        });

        modal.classList.add("active");
    });
});

modalClose.addEventListener("click", () => {
    modal.classList.remove("active");
});

modal.addEventListener("click", e => {
    if (e.target === modal) modal.classList.remove("active");
});

