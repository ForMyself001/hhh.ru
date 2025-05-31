<?php

$page = isset($_GET['page']) ? $_GET['page']:'login';
//$page = isset($_GET['page']) ? $_GET['page']:'add_vacancy';


include 'component/includes/header.php';

$allowed_pages = 
[
    'home_guest',
    'home_employee',
    'login',
    'register',
    'register_org',
    'add_vacancy'
];

// include "pages/register.php";
// include "pages/home_guest/home_guest.php";
if (in_array($page, $allowed_pages)){

    include "pages/$page/$page.php";

} else {
    // Отправляем HTTP-заголовок 404
    header('HTTP/1.0 404 Not Found');
    include 'component/includes/notFoundPage.php';
    // Останавливаем выполнение скрипта
    exit();
}

include 'component/includes/footer.php';

?>