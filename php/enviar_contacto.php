<?php
/**
 * Boutique La Paz - CONTACT FORM HANDLER
 * Processes contact form submissions and sends emails via PHPMailer
 */

// ===== HEADERS & ERROR HANDLING (MUST BE FIRST) =====
header('Content-Type: application/json; charset=utf-8');
ini_set('display_errors', 0);
error_reporting(E_ALL);

// Define helper function before anything else
function sendResponse($success, $message) {
    echo json_encode([
        'success' => $success,
        'message' => $message
    ]);
    exit;
}

// Set error handler
set_error_handler(function($errno, $errstr) {
    sendResponse(false, 'Error del servidor: ' . $errstr);
});

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Incluimos las clases necesarias (carpeta src subida al hosting)
require __DIR__ . '/../phpmailer/src/PHPMailer.php';
require __DIR__ . '/../phpmailer/src/SMTP.php';
require __DIR__ . '/../phpmailer/src/Exception.php';

// ===== CONFIG =====
define('CONTACT_EMAIL', 'ferreira.nicolas.et21.21@gmail.com'); // Cambiar al email real
define('SUBJECT_PREFIX', '[Boutique La Paz] ');
define('MAX_FILE_SIZE', 5242880); // 5MB en bytes

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(false, 'Método no permitido.');
}

@session_start();
if (!checkRateLimit()) {
    sendResponse(false, 'Demasiadas solicitudes. Por favor, intenta más tarde.');
}

// ===== SANITIZE & VALIDATE =====
function sanitizeInput($data) {
    return htmlspecialchars(trim($data), ENT_QUOTES, 'UTF-8');
}
function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

$nombre   = isset($_POST['nombre'])   ? sanitizeInput($_POST['nombre'])   : '';
$email    = isset($_POST['email'])    ? sanitizeInput($_POST['email'])    : '';
$telefono = isset($_POST['telefono']) ? sanitizeInput($_POST['telefono']) : '';
$mensaje  = isset($_POST['mensaje'])  ? sanitizeInput($_POST['mensaje'])  : '';

$errors = [];
if (empty($nombre) || strlen($nombre) < 2) {
    $errors[] = 'El nombre es requerido y debe tener al menos 2 caracteres.';
}
if (empty($email) || !validateEmail($email)) {
    $errors[] = 'Por favor, ingresa un email válido.';
}
if (empty($mensaje) || strlen($mensaje) < 10) {
    $errors[] = 'El mensaje debe tener al menos 10 caracteres.';
}
if (!empty($errors)) {
    sendResponse(false, implode(' ', $errors));
}

// ===== EMAIL =====
$subject = SUBJECT_PREFIX . 'Nuevo mensaje de contacto';

// Email body (HTML)
$emailBody = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #8B0000; color: white; padding: 20px; text-align: center; }
        .content { background: #f5f5f5; padding: 20px; }
        .field { margin-bottom: 15px; }
        .field strong { color: #8B0000; }
        .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>Boutique La Paz</h2>
            <p>Nuevo Mensaje de Contacto</p>
        </div>
        <div class='content'>
            <div class='field'><strong>Nombre:</strong><br>$nombre</div>
            <div class='field'><strong>Email:</strong><br><a href='mailto:$email'>$email</a></div>"
            . (!empty($telefono) ? "<div class='field'><strong>Teléfono:</strong><br>$telefono</div>" : "") . "
            <div class='field'><strong>Mensaje:</strong><br>" . nl2br($mensaje) . "</div>
        </div>
        <div class='footer'>
            <p>Este mensaje fue enviado desde el formulario de contacto de lapaz.com.ar</p>
            <p>Fecha: " . date('d/m/Y H:i:s') . "</p>
        </div>
    </div>
</body>
</html>
";

$emailBodyPlain = "Nombre: $nombre\nEmail: $email\n" 
    . (!empty($telefono) ? "Teléfono: $telefono\n" : "") 
    . "\nMensaje:\n$mensaje\n\nFecha: " . date('d/m/Y H:i:s');

// ===== SEND EMAIL WITH PHPMailer =====
$mail = new PHPMailer(true);

try {
    // IMPORTANTE: Cambiar estos valores por variables de entorno o archivo .env en producción
    // NEVER hardcode credentials in production code!
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'ferreira.nicolas.et21.21@gmail.com';  // TODO: Usar variable de entorno
    $mail->Password   = 'oqqm qugt lkkv pleh';                 // TODO: Usar variable de entorno
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;
    $mail->CharSet    = 'UTF-8';

    // Remitente y destinatario
    $mail->setFrom('ferreira.nicolas.et21.21@gmail.com', $nombre);
    $mail->addAddress(CONTACT_EMAIL);
    $mail->addReplyTo($email, $nombre);

    // Contenido
    $mail->isHTML(true);
    $mail->Subject = $subject;
    $mail->Body    = $emailBody;
    $mail->AltBody = $emailBodyPlain;

    if (!$mail->send()) {
        throw new Exception('No se pudo enviar el email: ' . $mail->ErrorInfo);
    }
    
    logSubmission($nombre, $email, true);
    sendResponse(true, '¡Mensaje enviado con éxito!');
} catch (Exception $e) {
    $errorMsg = $e->getMessage();
    logSubmission($nombre, $email, false, $errorMsg);
    sendResponse(false, 'Error al enviar el email. Por favor, intenta más tarde.');
}

// ===== HELPERS =====
function checkRateLimit() {
    if (!isset($_SESSION['form_submissions'])) {
        $_SESSION['form_submissions'] = [];
    }
    $ip = $_SERVER['REMOTE_ADDR'];
    $currentTime = time();
    $oneHourAgo = $currentTime - 3600;

    // Limpiar envíos antiguos
    $_SESSION['form_submissions'] = array_filter(
        $_SESSION['form_submissions'],
        function($timestamp) use ($oneHourAgo) {
            return $timestamp > $oneHourAgo;
        }
    );

    // Contar envíos del IP actual
    $ipSubmissions = array_filter(
        $_SESSION['form_submissions'],
        function($key) use ($ip) {
            return strpos($key, $ip) === 0;
        },
        ARRAY_FILTER_USE_KEY
    );

    if (count($ipSubmissions) >= 3) {
        return false;
    }
    
    $_SESSION['form_submissions'][$ip . '_' . uniqid()] = $currentTime;
    return true;
}

function logSubmission($nombre, $email, $success, $error = '') {
    $logFile = __DIR__ . '/../logs/contact_submissions.log';
    $logDir  = dirname($logFile);
    if (!file_exists($logDir)) {
        mkdir($logDir, 0755, true);
    }
    $logEntry = sprintf(
        "[%s] %s - Name: %s, Email: %s, IP: %s%s\n",
        date('Y-m-d H:i:s'),
        $success ? 'SUCCESS' : 'ERROR',
        $nombre,
        $email,
        $_SERVER['REMOTE_ADDR'],
        $error ? ", Error: $error" : ''
    );
    file_put_contents($logFile, $logEntry, FILE_APPEND | LOCK_EX);
}
?>
