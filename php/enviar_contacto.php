<?php
/**
 * Boutique La Paz - CONTACT FORM HANDLER
 * Processes contact form submissions and sends emails
 */

// Set JSON response header
header('Content-Type: application/json');

// Enable error reporting for debugging (disable in production)
// error_reporting(E_ALL);
// ini_set('display_errors', 1);

// ===== CONFIGURATION =====
define('CONTACT_EMAIL', 'info@boutiquelapaz.com'); // Change to your email
define('SUBJECT_PREFIX', '[Boutique La Paz] ');
define('MAX_FILE_SIZE', 5242880); // 5MB in bytes

// ===== SECURITY =====

// Check if request is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(false, 'Método no permitido.');
}

// Simple CSRF protection (implement token system in production)
session_start();

// Rate limiting (simple implementation)
if (!checkRateLimit()) {
    sendResponse(false, 'Demasiadas solicitudes. Por favor, intenta más tarde.');
}

// ===== SANITIZE AND VALIDATE INPUT =====
function sanitizeInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    return $data;
}

function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

// Get and sanitize form data
$nombre = isset($_POST['nombre']) ? sanitizeInput($_POST['nombre']) : '';
$email = isset($_POST['email']) ? sanitizeInput($_POST['email']) : '';
$telefono = isset($_POST['telefono']) ? sanitizeInput($_POST['telefono']) : '';
$mensaje = isset($_POST['mensaje']) ? sanitizeInput($_POST['mensaje']) : '';

// Validation
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

// If there are validation errors, return them
if (!empty($errors)) {
    sendResponse(false, implode(' ', $errors));
}

// ===== PREPARE EMAIL =====
$to = CONTACT_EMAIL;
$subject = SUBJECT_PREFIX . 'Nuevo mensaje de contacto';

// Email body (HTML format)
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
            <h2>PRIME CUTS</h2>
            <p>Nuevo Mensaje de Contacto</p>
        </div>
        <div class='content'>
            <div class='field'>
                <strong>Nombre:</strong><br>
                $nombre
            </div>
            <div class='field'>
                <strong>Email:</strong><br>
                <a href='mailto:$email'>$email</a>
            </div>
            " . (!empty($telefono) ? "
            <div class='field'>
                <strong>Teléfono:</strong><br>
                $telefono
            </div>
            " : "") . "
            <div class='field'>
                <strong>Mensaje:</strong><br>
                " . nl2br($mensaje) . "
            </div>
        </div>
        <div class='footer'>
            <p>Este mensaje fue enviado desde el formulario de contacto de primecuts.com</p>
            <p>Fecha: " . date('d/m/Y H:i:s') . "</p>
        </div>
    </div>
</body>
</html>
";

// Plain text version for email clients that don't support HTML
$emailBodyPlain = "
PRIME CUTS - Nuevo Mensaje de Contacto
---------------------------------------

Nombre: $nombre
Email: $email
" . (!empty($telefono) ? "Teléfono: $telefono\n" : "") . "

Mensaje:
$mensaje

---------------------------------------
Fecha: " . date('d/m/Y H:i:s') . "
";

// Email headers
$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'From: ' . $nombre . ' <noreply@primecuts.com>',
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion()
];

// ===== SEND EMAIL =====
try {
    $mailSent = mail($to, $subject, $emailBody, implode("\r\n", $headers));
    
    if ($mailSent) {
        // Log successful submission (optional)
        logSubmission($nombre, $email, true);
        
        sendResponse(true, '¡Mensaje enviado con éxito!');
    } else {
        throw new Exception('Error al enviar el email.');
    }
    
} catch (Exception $e) {
    // Log error (optional)
    logSubmission($nombre, $email, false, $e->getMessage());
    
    sendResponse(false, 'Hubo un error al enviar el mensaje. Por favor, intenta nuevamente o contáctanos directamente.');
}

// ===== HELPER FUNCTIONS =====

function sendResponse($success, $message) {
    echo json_encode([
        'success' => $success,
        'message' => $message
    ]);
    exit;
}

function checkRateLimit() {
    // Simple rate limiting: max 3 submissions per hour per IP
    if (!isset($_SESSION['form_submissions'])) {
        $_SESSION['form_submissions'] = [];
    }
    
    $ip = $_SERVER['REMOTE_ADDR'];
    $currentTime = time();
    $oneHourAgo = $currentTime - 3600;
    
    // Clean old submissions
    $_SESSION['form_submissions'] = array_filter(
        $_SESSION['form_submissions'],
        function($timestamp) use ($oneHourAgo) {
            return $timestamp > $oneHourAgo;
        }
    );
    
    // Count submissions from this IP in last hour
    $ipSubmissions = array_filter(
        $_SESSION['form_submissions'],
        function($timestamp, $submissionIp) use ($ip) {
            return $submissionIp === $ip;
        },
        ARRAY_FILTER_USE_BOTH
    );
    
    if (count($ipSubmissions) >= 3) {
        return false;
    }
    
    // Record this submission
    $_SESSION['form_submissions'][$ip] = $currentTime;
    
    return true;
}

function logSubmission($nombre, $email, $success, $error = '') {
    // Optional: Log submissions to a file for tracking
    $logFile = __DIR__ . '/../logs/contact_submissions.log';
    $logDir = dirname($logFile);
    
    // Create logs directory if it doesn't exist
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