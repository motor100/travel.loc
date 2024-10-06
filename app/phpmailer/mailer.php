<?php

use PHPMailer\PHPMailer\PHPMailer;


if (isset($_POST["name"]) && isset($_POST["phone"]) && isset($_POST["checkbox"])) {

    $name = htmlspecialchars($_POST["name"]);
    $phone = htmlspecialchars($_POST["phone"]);
    $messenger = htmlspecialchars($_POST["messenger"]);
    $quantity = htmlspecialchars($_POST["quantity"]);
    $checkbox = $_POST["checkbox"];

    require 'PHPMailer.php';
    require 'SMTP.php';
    require 'config.php';

    $mail = new PHPMailer();
    $mail->CharSet = 'UTF-8';

    // Настройки SMTP
    $mail->isSMTP();
    $mail->SMTPAuth = true;
    $mail->SMTPDebug = 0;

    $mail->Host = $Host ;
    $mail->Port = 465;
    $mail->Username = $Username;
    $mail->Password = $Password;

    // От кого
    $mail->From = $From;
    $mail->FromName = 'admin';

    // Кому
    $mail->addAddress($To, 'admin');

    // Тема письма
    $mail->Subject = 'Заявка с сайта Туры на внедорожниках';

    $mail->isHTML(true);

    if (strlen($name) >= 3 &&
      strlen($name) <= 50 &&
      strlen($phone) == 18 && 
      $checkbox) {

        // Тело письма
        $mail->Body = "Имя: $name<br> Телефон: $phone<br> Messenger: $messenger<br> Количество людей: $quantity<br>";
        $mail->AltBody = "Имя: $name\r\n Телефон: $phone\r\n Messenger: $messenger\r\n Количество людей: $quantity\r\n";

        $mail->send();
    }

    $mail->smtpClose();

} else {
    header("Location: /");
    exit;
}

?>