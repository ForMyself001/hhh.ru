<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Настройки
$uploadDir = 'uploads/'; // Директория для сохранения файлов
$maxFileSize = 5 * 1024 * 1024; // 5MB
$allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

if (isset($_GET['action']) && $_GET['action'] == "upload") {
    upload($uploadDir, $maxFileSize, $allowedTypes);
}
if (isset($_GET['action']) && $_GET['action'] == "download") {
    download();
}


function download(){

    $directoryPath = __DIR__ . "/uploads"; // Укажи правильный путь к папке
    $files = [];

    if (is_dir($directoryPath)) {
        foreach (scandir($directoryPath) as $file) {
            if ($file !== "." && $file !== "..") {
                $files[] = $file;
            }
        }
    }

    echo json_encode($files);
}

function upload($uploadDir, $maxFileSize, $allowedTypes){
    
    session_start();
    

    try {

        // Проверка метода запроса
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            throw new Exception('Invalid request method');
        }
    
        // Проверка наличия файла
        if (!isset($_FILES['resume'])) {
            throw new Exception('No file uploaded');
        }
    
        $file = $_FILES['resume'];
    
        // Проверка ошибок загрузки
        if ($file['error'] !== UPLOAD_ERR_OK) {
            throw new Exception('Upload error: ' . $file['error']);
        }
    
        // Проверка размера файла
        if ($file['size'] > $maxFileSize) {
            throw new Exception('File size exceeds 5MB limit');
        }
    
        // Проверка типа файла
        $finfo = new finfo(FILEINFO_MIME_TYPE);
        $mime = $finfo->file($file['tmp_name']);
        if (!in_array($mime, $allowedTypes)) {
            throw new Exception('Invalid file type. Allowed: PDF, DOC, DOCX');
        }
        
        
        // // Генерация безопасного имени файла
        $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
        // $safeName = uniqid('resume_', true) . '.' . $extension;
        // $targetPath = $uploadDir . $safeName;

        // Делаем имя безопасным (заменяем пробелы и специальные символы)
        $userName = preg_replace("/[^a-zA-Z0-9_\-а-яА-ЯёЁ]/u", "_", $_SESSION['name']);

        // Формируем безопасное имя файла
        $safeName = $userName . "_" . uniqid('resume_', true) . '.' . $extension;
        $targetPath = $uploadDir . $safeName;
    
        // Перемещение файла
        if (!move_uploaded_file($file['tmp_name'], $targetPath)) {
            throw new Exception('Failed to save file');
        }
    
        // Успешный ответ
        echo json_encode([
            'success' => true,
            'message' => 'File uploaded successfully',
            'path' => $targetPath
        ]);
    
    } catch (Exception $e) {
        // Обработка ошибок
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => $e->getMessage()
        ]);
    }
}



?>