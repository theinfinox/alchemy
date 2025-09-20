function isMobile() {
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

document.querySelectorAll(".phone-link").forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const number = link.getAttribute("data-number");

        if (isMobile()) {
            // On mobile → open dialer
            window.location.href = "tel:" + number;
        } else {
            // On desktop → copy to clipboard
            navigator.clipboard.writeText(number).then(() => {
                alert("📋 " + number + " copied to clipboard!");
            });
        }
    });
});
