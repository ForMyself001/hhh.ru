<?php
header('Content-Type: application/json');
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "dbjob";

try {
    $conn = new mysqli($servername, $username, $password, $dbname);
    
    // Проверяем соединение
    if ($conn->connect_error) {
        throw new Exception("Ошибка подключения: " . $conn->connect_error);
    }

} catch (Exception $e) {
    die(json_encode([
        "success" => false,
        "message" => "Ошибка подключения к базе данных: " . $e->getMessage()
    ]));
}

if (isset($_GET['action']) && $_GET['action'] == "login") {
    login($conn);
}
if (isset($_GET['action']) && $_GET['action'] == "register") {
    register($conn);
}
if (isset($_GET['action']) && $_GET['action'] == "get_list") {
    get_list($conn);
}
if (isset($_GET['action']) && $_GET['action'] == "addVacancy") {
    addVacancy($conn);
}

function login($conn) {
    if ($_SERVER["REQUEST_METHOD"] == "POST") {

        $email = mysqli_real_escape_string($conn, $_POST['email']);
        $password = mysqli_real_escape_string($conn, $_POST['password']);

        if (!empty($email) && !empty($password)) {
            $sql = "SELECT email, name, keyemployee, password FROM users WHERE email = ?";
            $stmt = mysqli_prepare($conn, $sql);
            mysqli_stmt_bind_param($stmt, "s", $email);
            mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);

            if ($row = mysqli_fetch_assoc($result)) {
                if ($password === $row['password']) {
                    session_start();
                    $_SESSION['user'] = $email;
                    $_SESSION['name'] = $row['name'];
                    $_SESSION['keyemployee'] = $row['keyemployee'];
                    if (!empty($row['keyemployee'])) {
                        echo json_encode(["success" => true, "message" => "Добро пожаловать", "redirect" => "index.php?page=home_employee"]);
                    } else {
                        echo json_encode(["success" => true, "message" => "Добро пожаловать", "redirect" => "index.php?page=home_guest"]);
                    }
                    
                } else {
                    echo json_encode(["success" => false, "message" => "Неверный пароль"]);
                }
            } else {
                echo json_encode(["success" => false, "message" => "Пользователь не найден"]);
            }
        } else {
            echo json_encode(["success" => false, "message" => "Заполните все поля"]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Неверный метод запроса"]);
    }
}

function register ($conn) {

    header('Content-Type: application/json');

    if ($_SERVER["REQUEST_METHOD"] == "POST") {

        // Получаем данные из формы
        $name = trim($_POST["name"]);
        $email = trim($_POST["email"]);
        $phone = trim($_POST["phone"]);
        $keyEmployee = trim($_POST["keyEmployee"]);
        $password = trim($_POST["password"]);
        $comments = trim($_POST["comments"]);

        // Валидация: проверяем, что email уникален
        $stmt = $conn->prepare("SELECT email FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->store_result();
        if ($stmt->num_rows > 0) {
            echo json_encode(["success" => false, "message" => "Этот email уже зарегистрирован."]);
            exit;
        }
        $stmt->close();

        if ($keyEmployee) {
            $stmt = $conn->prepare("SELECT keyemployee FROM employers WHERE keyemployee = ?");
            $stmt->bind_param("s", $keyEmployee);
            $stmt->execute();
            $stmt->store_result();
            if ($stmt->num_rows == 0) {
                echo json_encode(["success" => false, "message" => "Код сотрудника не существует."]);
                exit;
            }
            $stmt->close();
        }
        
        // SQL-запрос для вставки пользователя в базу
        $stmt = $conn->prepare("INSERT INTO users (name, email, phone, keyEmployee, password, comments) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssss", $name, $email, $phone, $keyEmployee, $password, $comments);

        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Регистрация успешна!", "redirect" => "index.php?page=login"]);
        } else {
            echo json_encode(["success" => false, "message" => "Ошибка при регистрации. Попробуйте снова."]);
        }

        $stmt->close();
    } else {
        echo json_encode(["success" => true, "message" => "Страница регистрации", "redirect" => "index.php?page=register"]);
    } 
}

function get_list ($conn) {
    try {
        $stmt = $conn->query("SELECT id, src, organization, position, text FROM vacancys"); 
        $jobs = $stmt->fetch_all(MYSQLI_ASSOC); // Получаем данные в виде массива
        echo json_encode($jobs, JSON_UNESCAPED_UNICODE); // Кодируем в JSON и сохраняем кириллицу
    } catch (Exception $e) {
        echo json_encode(["error" => "Ошибка : " . $e->getMessage()]);
    }
}

function addVacancy ($conn) {

    session_start();
    //$_SESSION['keyemployee'] = "666";

    // Получаем keyemployee из сессии
    if (!isset($_SESSION['keyemployee'])) {
        echo json_encode([
            "success" => false,
            "message" => "Пользователь не авторизован"
        ]);
        return;
    }

    $keyemployee = $conn->real_escape_string($_SESSION['keyemployee']);

    // Получаем данные из запроса
    $title = isset($_GET['title']) ? trim($_GET['title']) : '';
    $description = isset($_GET['description']) ? trim($_GET['description']) : '';

    if (empty($title) || empty($description)) {
        echo json_encode([
            "success" => false,
            "message" => "Заполните все поля"
        ]);
        return;
    }

    // Получаем данные из таблицы employers
    $sql = "SELECT employer, src FROM employers WHERE keyemployee = '$keyemployee' LIMIT 1";
    $result = $conn->query($sql);

    if (!$result || $result->num_rows === 0) {
        echo json_encode([
            "success" => false,
            "message" => "Работодатель не найден"
        ]);
        return;
    }

    $employer = $result->fetch_assoc();
    $organization = $conn->real_escape_string($employer['employer']);
    $src = $conn->real_escape_string($employer['src']);
    $position = $conn->real_escape_string($title);
    $text = $conn->real_escape_string($description);

    // Вставляем вакансию
    $insertSql = "
        INSERT INTO vacancys (organization, src, position, text)
        VALUES ('$organization', '$src', '$position', '$text')
    ";

    if ($conn->query($insertSql) === TRUE) {
        echo json_encode([
            "success" => true,
            "message" => "Вакансия успешно добавлена",
            "redirect" => "index.php?page=home_employee"
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Ошибка при добавлении вакансии: " . $conn->error
        ]);
    }
}
?>