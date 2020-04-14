<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src="./backend/img/logo.png" width="300px" />
</h1>

<h3 align="center">
  Fastfeet API :package:
</h3>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/rocketseat/bootcamp-gostack-desafio-02?color=%2304D361">

  <a href="https://rocketseat.com.br">
    <img alt="Made by Rocketseat" src="https://img.shields.io/badge/made%20by-Rocketseat-%2304D361">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">

  <a href="https://github.com/kaiorr/gostack-fastfeet/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/kaiorr/gostack-fastfeet?style=social">
  </a>
</p>

<p align="center">
  <a href="#rocket-sobre-o-desafio">Sobre o desafio</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#iniciando-o-servidor-backend">Backend</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#computer-iniciando-o-frontend">Frontend</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#iphone-mobile">Mobile</a>
</p>

## :rocket: Sobre o desafio

A aplicação conciste em um sistema de transportadora fictícia chamada FastFeet. Ela é uma aplicação completa envolvendo back-end, front-end e mobile, e que faz parte do desafio de certificação do bootcamp Gostack da **[rocketseat](https://rocketseat.com.br/gostack)**.


## :whale: Docker

No projeito foi utlizado a ferramenta docker para a criação do banco de dados. Acesse a [documentação](https://docs.docker.com/get-docker/), para instalar a versão de acordo com o seu sistema operaciona.  onde é demonstrado o passo a passo para utilização do docker com user da máquina.


  Criar e subir uma base de dados (Postgres):
 
      docker run --name fastfeet -e POSTGRES_PASSWORD=fastfeet -p 5432:5432 -d postgres
      docker start fastfeet

  Criar e subir uma base de dados Redis:

      docker run --name redisfastfeet -p 6379:6379 -d -t postgres
      docker start redisfastfeet


  Instalando o PostBird, para utilização da base de dados de forma visual;

      Você pode acessar a documentação:(https://www.electronjs.org/apps/postbird) para a instalação de acordo com o seu sistema operacional.

  Acessando o postbird, preencha os dados de acesso, host, port, username e password de acordo com a database criada via docker.

      Feito isso, dentro do postbird, crie um banco com nome fastfeet
      
      
 ## Backend

    git clone https://github.com/the-one-who-knoccks/FastFeet-Master.git

  Acessando o diretório:

      cd FastFeet-Master/backend

  Instalando as dependências

      rode o comando yarn ou yarn-install para instalar as dependências.


   Migrations e seed

    Rode o comando  yarn sequelize db:migrate para criar as migrations e yarn sequelize db:seed:all para criar os seeds.

## Iniciando o servidor

    Para iniciar o servidor, rode o comando yarn dev

## Servidor de email

    Para rodar o servidor de email, rode o comando yarn queue
    
## .env

  Alterar o arquivo .env.example para .env e informar todos parâmetros.

# Frontend

  Instalando as dependências

      Rode o comando yarn ou yarn install
 
# Iniciando o servidor da aplicação web

      Para inciar o servidor da aplicação, rode o comando yarn start


# Mobile

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.

