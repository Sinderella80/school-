<?php require 'config.php';header('Content-Type: application/json');$a=$_GET['a']??'';
$q=['news'=>'SELECT * FROM news ORDER BY id DESC','events'=>'SELECT * FROM events ORDER BY id','staff'=>'SELECT * FROM staff ORDER BY name','gallery'=>'SELECT * FROM gallery'];
if($_SERVER['REQUEST_METHOD']==='POST'){$d=array_map(fn($v)=>trim(strip_tags($v)),$_POST);
 if(!filter_var($d['email']??'',FILTER_VALIDATE_EMAIL)){http_response_code(422);exit('{"ok":false}');}
 if($a==='contact')$pdo->prepare('INSERT INTO messages(name,email,subject,message)VALUES(?,?,?,?)')->execute([$d['name'],$d['email'],$d['subject']??'',$d['message']]);
 elseif($a==='register')$pdo->prepare('INSERT INTO registrations(parent,email,student,grade)VALUES(?,?,?,?)')->execute([$d['parent'],$d['email'],$d['student'],$d['grade']]);
 exit('{"ok":true}');}
echo json_encode(isset($q[$a])?$pdo->query($q[$a])->fetchAll():[]);
