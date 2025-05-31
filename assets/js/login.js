document.addEventListener("DOMContentLoaded", function () {
    let header = document.querySelector(".header-bar");
    let form = document.querySelector(".login-container");

    if (header && form) {
        let headerHeight = header.offsetHeight; // Получаем высоту шапки
        form.style.marginTop = headerHeight + "px"; // Устанавливаем отступ сверху
    }
});