<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $mail = filter_var($_POST['mail'], FILTER_SANITIZE_EMAIL);
    $phone = htmlspecialchars($_POST['phone']);
    $car = htmlspecialchars($_POST['car']);
    $comments = htmlspecialchars($_POST['comments']);
    $cartData = json_decode($_POST['cart-data'], true); // Decode JSON cart data
    $total = 0;

    if (!empty($name) && !empty($phone) && !empty($car) && !empty($mail) && filter_var($mail, FILTER_VALIDATE_EMAIL)) {
        $to = "jesper@stoico.dk"; // Replace with your email address
        $subject = "Bestilling via mrtuning.dk";

        // calculatiing total price
        foreach ($cartData as $item) {
            $total += $item['price'];
        }

        // Format cart data
        $message = "
        <html>
        <head>
            <title>Bestilling via mrtuning.dk</title>
        </head>
        <body>
            <p><strong>Navn:</strong> $name</p>
            <p><strong>Email:</strong> $mail</p>
            <p><strong>Telefonnummer:</strong> $phone</p>
            <p><strong>Bilmodel:</strong> $car</p>
            <p><strong>Produkter:</strong></p>
            <ul>";
        foreach ($cartData as $item) {
            $extraInfo = $item['withTuning'] ? "" : " + (uden tuning.)";
            $message .= "<li>{$item['name']}{$extraInfo}: {$item['quantity']} x {$item['price']} kr.</li>";
        }
        $message .= "<li>Total pris: {$total}</li>";
        $message .= "</ul>
            <p><strong>Kommentarer:</strong> $comments</p>
        </body>
        </html>";

        // Headers setup
        $headers = "From: MR Tuning <no-reply@mrtuning.dk>\r\n";
        $headers .= "Reply-To: $mail\r\n"; // Allow replies to the user's email
        $headers .= "Content-Type: text/html; charset=UTF-8\r\n"; // Ensure the email is sent as HTML
        $headers .= "X-Mailer: PHP/" . phpversion();

        // Send email
        if (mail($to, $subject, $message, $headers)) {
            echo "Mange tak for din bestilling! Vi vender tilbage til dig indenfor 1-2 dage.";
        } else {
            echo "Beklager, noget gik galt i vores ende. Kan du prøve en gang mere?";
        }
    } else {
        echo "Husk og udfyld alle felterne korrekt, inklusive en gyldig email.";
    }
}
?>
