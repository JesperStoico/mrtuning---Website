<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $mail = htmlspecialchars($_POST['mail']);
    $phone = htmlspecialchars($_POST['phone']);
    $car = htmlspecialchars($_POST['car']);
    $comments = htmlspecialchars($_POST['comments']);
    $cartData = json_decode($_POST['cart-data'], true); // Decode JSON cart data

    if (!empty($name) && !empty($phone) && !empty($car) && !empty($mail)) {
        $to = "jesper@stoico.dk"; // Replace with your email address
        $subject = "Bestilling via mrtuning.dk";

        // Format cart data
        $cartMessage = "Products:\n";
        foreach ($cartData as $item) {
            $extraInfo = $item['withTuning'] ? "" : " + (uden tuning.)";
            $cartMessage .= "- {$item['name']}{$extraInfo}: {$item['quantity']} x {$item['price']} kr.\n";
        }

        // Construct the email message
        $message = "Name: $name\nEmail: $mail\nPhone: $phone\nCar Model: $car\n\n$cartMessage\nComments: $comments";
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
