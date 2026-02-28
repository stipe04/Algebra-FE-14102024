<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // ---- VALIDACIJA POLJA ----
    if (
        empty($_POST["ime"]) ||
        empty($_POST["email"]) ||
        empty($_POST["poruka"])
    ) {
        die("Greška: sva polja su obavezna.");
    }

    // Sanitizacija
    $ime = htmlspecialchars(trim($_POST["ime"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $poruka = htmlspecialchars(trim($_POST["poruka"]));

    // Validacija emaila
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("Greška: Email adresa nije ispravna.");
    }

    // ---- SLANJE MAILA ----
    $to = "stipe.saric1985@gmail.com";  // OVDJE UPISUJEŠ SVOJU ADRESU
    $subject = "Nova poruka sa web stranice";

    $body = "Ime: $ime\nEmail: $email\n\nPoruka:\n$poruka";
    $headers = "From: $email\r\nReply-To: $email";

    if (mail($to, $subject, $body, $headers)) {
        header("Location: success.html");
        exit();
    } else {
        echo "Došlo je do greške prilikom slanja poruke.";
    }
}
?>
