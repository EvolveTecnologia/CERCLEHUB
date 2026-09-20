<?php
/**
 * Script de envio de e-mail para Educaflix
 * Utiliza PHPMailer para envio via SMTP (Titan)
 */

// Habilitar CORS para permitir requisições do React
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Tratar requisições OPTIONS (Preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Importar classes do PHPMailer
// Certifique-se de que a pasta 'phpmailer' existe com os arquivos da biblioteca
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

// Capturar dados do formulário (JSON)
$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (!$data) {
    echo json_encode(["status" => "error", "message" => "Dados inválidos."]);
    exit;
}

$nome = filter_var($data['name'], FILTER_SANITIZE_STRING);
$email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
$telefone = filter_var($data['phone'], FILTER_SANITIZE_STRING);
$empresa = filter_var($data['company'], FILTER_SANITIZE_STRING);
$interesse = filter_var($data['interest'], FILTER_SANITIZE_STRING);
$mensagem = filter_var($data['message'], FILTER_SANITIZE_STRING);

if (empty($nome) || empty($email) || empty($mensagem)) {
    echo json_encode(["status" => "error", "message" => "Campos obrigatórios ausentes."]);
    exit;
}

$mail = new PHPMailer(true);

try {
    // Configurações do Servidor SMTP (Titan)
    $mail->isSMTP();
    $mail->Host       = 'mail.educaflix.app.br'; // Ou smtp.titan.email
    $mail->SMTPAuth   = true;
    $mail->Username   = 'contato@educaflix.app.br';
    $mail->Password   = 'S@nb4f6e';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Porta 587
    $mail->Port       = 587;
    $mail->CharSet    = 'UTF-8';

    // Destinatários
    $mail->setFrom('contato@educaflix.app.br', 'Site Educaflix');
    $mail->addAddress('contato@educaflix.app.br'); // Onde você receberá o e-mail
    $mail->addReplyTo($email, $nome);

    // Conteúdo do E-mail
    $mail->isHTML(true);
    $mail->Subject = "Novo Contato: $interesse - $nome";
    
    $mailBody = "
    <h2>Novo contato recebido via site</h2>
    <p><strong>Nome:</strong> $nome</p>
    <p><strong>E-mail:</strong> $email</p>
    <p><strong>Telefone:</strong> $telefone</p>
    <p><strong>Empresa:</strong> $empresa</p>
    <p><strong>Interesse:</strong> $interesse</p>
    <br>
    <p><strong>Mensagem:</strong></p>
    <p>" . nl2br($mensagem) . "</p>
    <hr>
    <p>Enviado em: " . date('d/m/Y H:i:s') . "</p>
    ";

    $mail->Body = $mailBody;
    $mail->AltBody = strip_tags(str_replace('<br>', "\n", $mailBody));

    $mail->send();
    echo json_encode(["status" => "success", "message" => "Mensagem enviada com sucesso!"]);

} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => "Erro ao enviar: {$mail->ErrorInfo}"]);
}
