<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src="./backend/img/logo.png" width="300px" />
</h1>      
     
<p align="center"> 
  <a href="https://rocketseat.com.br">   
    <img alt="Made by Rocketseat" src="https://img.shields.io/badge/made%20by-Rocketseat-%2304D361">  
  </a>
    
  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">  
              
            
<p align="center">      
  <a href="#rocket-sobre-o-desafio">Sobre o desafio</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; 
  <a href="#Backend">Backend</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#Frontend">Frontend</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;   
  <a href="#Mobile">Mobile</a> 
</p>    
     

## :rocket: Sobre o desafio

A aplicação consiste em um sistema de uma transportadora fictícia chamada FastFeet. Ela é uma aplicação completa envolvendo back-end, front-end e mobile, e que faz parte do desafio de certificação do bootcamp Gostack da **[rocketseat](https://rocketseat.com.br/gostack)**.

<img src="/prev/Prev01.png">
</br>
  
<img src="/prev/Prev02.png">
</br>

<img src="/prev/Prev03.png"> 
</br>
 

## Ferramentas  

:whale: Docker

    No projeto foi utlizado a ferramenta docker para a criação do banco de dados. 
    Acesse a documentação(https://docs.docker.com/get-docker/), para instalar a versão de acordo com o seu 
    sistema operacional.

  
  Criar e subir uma base de dados (Postgres):
 
     $ docker run --name fastfeet -e POSTGRES_PASSWORD=fastfeet -p 5432:5432 -d postgres
     $ docker start fastfeet

  Criar e subir uma base de dados Redis:

     $ docker run --name redisfastfeet -p 6379:6379 -d -t redis:alpine
     $ docker start redisfastfeet


  Instalando o PostBird, aplicativo para visualização das informações do banco de dados.

      Você pode acessar a documentação:(https://www.electronjs.org/apps/postbird) para a instalação de acordo com o seu sistema operacional.

  Acessando o postbird, preencha os dados de acesso, host, port, username e password de acordo com a database criada via docker.
 
      Feito isso, dentro do postbird, crie um banco com nome fastfeet.
      
      
 ## 💹 Backend

    $ git clone https://github.com/the-one-who-knoccks/FastFeet-Master.git

  Acessando o diretório:

    $ cd FastFeet-Master/backend

  Instalando as dependências.

      rode o comando yarn ou yarn-install para instalar as dependências.


   Migrations e seed.

    Rode o comando  yarn sequelize db:migrate para criar as migrations e yarn sequelize db:seed:all para criar os seeds.
    
   .env

     Altere o arquivo .env.example para .env e informae os parâmetros de acordo com seu ambiente de desenvolvimento.

 Iniciando o servidor.

    Para iniciar o servidor, rode o comando yarn dev.
    
  Servidor de email.

    Para rodar o servidor de email, rode o comando yarn queue.
    

## ⚛️  Frontend

  Instalando as dependências.

      Rode o comando yarn ou yarn install. 
 
 Iniciando o servidor da aplicação web.

      Para inciar o servidor da aplicação, rode o comando yarn start.


## ⚛️ Mobile

  Setando o localhost e ip no Reactotron

    Acesse a pasta mobile e navegue até a pasta src/services e no arquivo api.js, defina o url/localhost do seu         emulador. Depois vá até src/config/ReactotoronConfig e altere a parte ".configure({ host: 'ip da sua maquina aqui })"       Após isso, rode o comando abaixo para instalar as dependências:  
    
    yarn ou yarn install.


   Apos estar com o seu  emulador ou celular conectado, abra o terminal na pasta Mobile_Gobarber e rode o comando:
    
    $ react-native run-android ou run-ios.

   Em seguida apóis finalizar a instalação, rode: 

    $ react-native start ou yarn start no terminal.
    
# Observação 

    Aplicação testada apenas em Android.

    
