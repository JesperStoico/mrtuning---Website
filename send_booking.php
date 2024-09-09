<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $mail = htmlspecialchars($_POST['mail']);
    $phone = htmlspecialchars($_POST['phone']);
    $car = htmlspecialchars($_POST['car']);
    $tuning = htmlspecialchars($_POST['tuning']);
    $comments = htmlspecialchars($_POST['comments']);

    if (!empty($name) && !empty($phone) && !empty($car) && !empty($tuning) && !empty($mail)) {
        $to = "jesper@stoico.dk"; // Replace with your email address
        $subject = "New Car Tuning Booking";
        $message = "Name: $name\n Email:$mail \nPhone: $phone\nCar Model: $car\nTuning: $tuning\nComments: $comments";
        $headers = "From: no-reply@mrtuning.dk";

        // Send email
        if (mail($to, $subject, $message, $headers)) {
            echo "Mange tak for din bestilling! Vi vender tilbage til dig indenfor 1-2 dage.";
        } else {
            echo "Beklager, noget gik galt i vores ende. Kan du prøve en gang mere?";
        }
    } else {
        echo "Husk og udfyld alle felterne.";
    }
}
?>
