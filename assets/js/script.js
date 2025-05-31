// Запуск при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", adjustFooter);
    window.addEventListener("load", adjustFooter);
    //adjustFooter(); // Запускаем при загрузке
    

// Настройки снегопада
const SNOW_CONFIG = {
    FLAKES_PER_SECOND: 5,
    MIN_FALL_TIME: 12,
    MAX_FALL_TIME: 20,
    MIN_SIZE: 2,
    MAX_SIZE: 5,
    WIND_EFFECT: 30,
    OPACITY: 0.6
};

let snowInterval;

function clearAllSnowflakes() {
    document.querySelectorAll('.snowflake').forEach(snow => snow.remove());
}

function initSnow() {
    // Очищаем предыдущие настройки
    clearInterval(snowInterval);
    clearAllSnowflakes();
    
    // Новый интервал
    snowInterval = setInterval(
        createSnowflake, 
        1000 / SNOW_CONFIG.FLAKES_PER_SECOND
    );
}
function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    
    // Начальная позиция
    const startX = Math.random() * window.innerWidth;
    
    // Случайные параметры
    const fallTime = Math.random() * 
        (SNOW_CONFIG.MAX_FALL_TIME - SNOW_CONFIG.MIN_FALL_TIME) + 
        SNOW_CONFIG.MIN_FALL_TIME;
        
    const size = Math.random() * 
        (SNOW_CONFIG.MAX_SIZE - SNOW_CONFIG.MIN_SIZE) + 
        SNOW_CONFIG.MIN_SIZE;
    
    // Применяем параметры
    snowflake.style.width = size + 'px';
    snowflake.style.height = size + 'px';
    snowflake.style.left = startX + 'px';
    snowflake.style.opacity = SNOW_CONFIG.OPACITY;
    snowflake.style.animationDuration = fallTime + 's';
    snowflake.style.setProperty('--wind', 
        (Math.random() - 0.5) * SNOW_CONFIG.WIND_EFFECT + 'px');

    document.body.appendChild(snowflake);
    
    // Удаление после анимации
    snowflake.addEventListener('animationend', () => {
        snowflake.remove();
    });
}

initSnow();

const header = document.querySelector("header");
let lastScrollY = window.scrollY;

function handleScroll() {
    if (window.scrollY > lastScrollY) {
        // Скроллим вниз — скрываем хедер
        header.style.transform = "translateY(-100%)";
    } else {
        // Скроллим вверх — показываем хедер
        header.style.transform = "translateY(0)";
    }
    lastScrollY = window.scrollY;
}

function adjustFooter() {
    const footer = document.querySelector(".footer");
    const body = document.body;
    const html = document.documentElement;

    let contentHeight = body.scrollHeight; // Полная высота контента
    let viewportHeight = window.innerHeight; // Высота окна браузера

    if (contentHeight > viewportHeight) {
        // Если контент больше экрана — делаем футер статичным
        footer.style.position = "static";
        footer.style.margin = "0 auto";
        footer.style.width = "90%"; // Снова задаем ширину, чтобы не сбросилось
    } else {
        // Если контент меньше экрана — фиксируем футер внизу
        footer.style.position = "fixed";
        footer.style.bottom = "0";
    }
}

});
