<?php

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: /");
    exit;
}

/*
|--------------------------------------------------------------------------
| Spam protection
|--------------------------------------------------------------------------
*/

if (!empty($_POST["website"])) {
    header("Location: /?sent=1#contact");
    exit;
}

/*
|--------------------------------------------------------------------------
| Get and clean form data
|--------------------------------------------------------------------------
*/

/*
 * Form fields must be strings. Passing an array (for example, name[]=...) to
 * trim() raises a TypeError on PHP 8 and turns a bad submission into an HTTP
 * 500 response.
 */
function postString(string $field): string
{
    $value = $_POST[$field] ?? "";

    return is_string($value) ? trim($value) : "";
}

$name = postString("name");
$email = postString("email");
$phone = postString("phone");
$message = postString("message");

/*
|--------------------------------------------------------------------------
| Validate required fields
|--------------------------------------------------------------------------
*/

if (
    $name === "" ||
    $email === "" ||
    $message === "" ||
    !filter_var($email, FILTER_VALIDATE_EMAIL)
) {
    header("Location: /?error=1#contact");
    exit;
}

/*
|--------------------------------------------------------------------------
| Prevent email-header injection
|--------------------------------------------------------------------------
*/

$name = str_replace(["\r", "\n"], "", $name);
$email = str_replace(["\r", "\n"], "", $email);
$phone = str_replace(["\r", "\n"], "", $phone);

/*
|--------------------------------------------------------------------------
| Email settings
|--------------------------------------------------------------------------
*/

$to = "info@backyardstudio.co.za";

$subject = "New Backyard Studio Website Enquiry";

$emailBody = "
New website enquiry

Name:
$name

Email:
$email

Phone / WhatsApp:
$phone

Message:
$message
";

/*
|--------------------------------------------------------------------------
| Email headers
|--------------------------------------------------------------------------
*/

$headers = [];
$headers[] = "From: Backyard Studio Website <info@backyardstudio.co.za>";
$headers[] = "Reply-To: " . $email;
$headers[] = "Content-Type: text/plain; charset=UTF-8";

$headersString = implode("\r\n", $headers);

/*
|--------------------------------------------------------------------------
| Send
|--------------------------------------------------------------------------
*/

$sent = false;

if (function_exists("mail")) {
    $sent = mail(
        $to,
        $subject,
        $emailBody,
        $headersString
    );
} else {
    error_log("Contact form email delivery is unavailable: PHP mail() is not enabled.");
}

if ($sent) {
    header("Location: /?sent=1#contact");
    exit;
}

header("Location: /?error=1#contact");
exit;
?>
