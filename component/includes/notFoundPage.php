<!DOCTYPE html>
<html lang="ru">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Страница не найдена</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                text-align: center;
                padding: 50px;
            }
            h1 {
                color: #dc3545;
                font-size: 48px;
            }
            p {
                font-size: 24px;
                margin: 20px 0;
            }
        </style>
    </head>
    <body>
        <h1>404</h1>
        <p>Страница не найдена</p>
        <p>Страница "<?= htmlspecialchars($page) ?>" не существует</p>
        <div class="actions">
            <button onclick="window.history.back()" class="btn">Вернуться назад</button>
        </div>
    </body>
</html>