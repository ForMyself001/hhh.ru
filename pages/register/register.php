<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Данные пользователя</title>
    
    <link rel="stylesheet" href="assets/css/register.css">
</head>
<body>
<!-- <script src="assets/js/userData.js"></script> -->

<div class="register-container">
  <form id= "register-form" action="" method="">
      <!-- Имя -->
      <label for="name">Имя:</label>
      <input type="text" id="name" name="name" placeholder="Иван" required><br><br>

      <!-- Email -->
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" placeholder="example@example.com" required><br><br>

      <!-- Телефон -->
      <label for="phone">Телефон:</label>
      <input type="tel" id="phone" name="phone" placeholder="123-456-7890" required><br><br>

      <!-- Код сотрудника -->
      <label for="keyEmployee">Код сотрудника:</label>
      <input type="password" id="keyEmployee" name="keyEmployee"><br><br>

      <!-- Пароль -->
      <label for="password">Пароль:</label>
      <input type="password" id="password" name="password" required><br><br>

      <!-- Комментарий -->
      <label for="comments">Комментарий:</label><br>
      <textarea id="comments" name="comments" rows="4" cols="50" placeholder="Немного о себе ..."></textarea><br><br>

      <!-- Согласие с условиями -->
        <div>
          <input type="checkbox" id="terms" name="terms" required>
        <label for="terms">Я согласен на <a href="#" title="передачу третьим, четвертым ... десятым лицам.">обработку персональных данных</a></label><br><br>
        </div>
      

      <!-- Отправка формы -->
      <input type="submit" value="Отправить">
      <!-- Кнопка отмены возвращает пользователя назад -->
      <input type="button" value="Отмена" onclick="window.history.back();">
  </form>
</div>
<script>
  document.getElementById("register-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Отмена стандартной отправки формы

    let formData = new FormData(this);
    console.log("Ну нажал ты )))");

    fetch("controllerUserData.php?action=register", {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("Успешная реистраци!");
                    window.location.href = data.redirect; // Перенаправление
                } else {
                    // Показываем сообщение об ошибке
                    alert("❌ Ошибка: " + data.message);
                }
            })
            .catch(error => console.error("Ошибка:", error));
  });
</script>
</body>
</html>
