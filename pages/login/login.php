<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Вход в профиль</title>
    <link rel="stylesheet" href="assets/css/login.css">
</head>
<body>
    <div class="login-container">
        <h1>Вход на портал</h1>

        <form id="login-form" action=""  method="">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>

            <label for="password">Пароль:</label>
            <input type="password" id="password" name="password" required>

            <div>
            	<input type="submit" value="Войти">
                <a href="register" class="register-button">Зарегистрироваться</a>
            </div>
        </form>
    </div>


    <script>
        document.getElementById("login-form").addEventListener("submit", function(event) {
            event.preventDefault(); // Отмена стандартной отправки формы

            let formData = new FormData(this);

            fetch("controllerUserData.php?action=login", {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("Успешный вход!");
                    window.location.href = data.redirect; // Перенаправление
                } else {
                    // Показываем сообщение об ошибке
                    alert("❌ Ошибка: " + data.message);
                }
            })
            .catch(error => console.error("Ошибка:", error));
        });

        document.querySelector(".register-button").addEventListener("click", function(event) {
            event.preventDefault(); // Отмена стандартного перехода
            fetch("controllerUserData.php?action=register")
            .then(response => response.json())
            .then(data => {

                if (data.success) {
                    window.location.href = data.redirect; // Перенаправление
                } else {
                    
                }
            })
            .catch(error => console.error("Ошибка:", error));
        });
    </script>
</body>
</html>