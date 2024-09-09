<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $mail = htmlspecialchars($_POST['mail']);
    $phone = htmlspecialchars($_POST['phone']);
    $comments = htmlspecialchars($_POST['comments']);

    if (!empty($name) && !empty($phone) && !empty($mail)) {
        $to = "jesper@stoico.dk";
        $subject = "Kontakt os mail";
        $message = "Name: $name\n Email:$mail \nPhone: $phone\nComments: $comments";
        $headers = "From: no-reply@mrtuning.dk";

        // Send email
        if (mail($to, $subject, $message, $headers)) {
            echo "Mange tak for din henvendelse! Vi vender tilbage til dig indenfor 1-2 dage.";
        } else {
            echo "Beklager, noget gik galt i vores ende. Kan du prøve en gang mere?";
        }
    } else {
        echo "Husk og udfyld alle felterne.";
    }
}
?>