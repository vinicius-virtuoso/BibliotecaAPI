# BibliotecaAPI
## Aplicativo de gerenciamento de empréstimo de livros em uma biblioteca.

<p> 
Essa é um projeto feito para gerenciamento de bibliotecas, o intuito é ter o controle de todos os studantes cadastrados, alem de cadastrar novos livros e suas copias para empréstimos do mesmo,
emprétimos terão tempo fixo para serem devolvidos e caso contrário o studante não poderar pedir outros livros e caso ainda não devolvam após a data de devolução especificada, o estudante seŕa 
notificado atrávez do e-mail cadastrado. Além de e-mails de cobranças, studantes que seguem algum livro, mas por alguma razã não fizeram o pedido do mesmo, será notificados sobre a disponibilidade do livro para oder fazer o pedido.
</p>

<br>

## 🔗 Link da api: 
  ```json
    "url": "https://biblioteca-api-kofp.onrender.com"
  ```

<br>

<br>

## 📑 Documentação da api: <a href="https://documenter.getpostman.com/view/27562991/2s93m35PiL">Clique aqui!</a>

<br>

## 🚀 Tecnologias <a name = "tecnologias"></a>

- Node.JS
- TypeScript
- Express
- TypeORM
- PostgreSQL
- Postman
- zod
- nodemailer

<br>
<br>

## Como rodar localmente:

Requisitos:
- [x] precisa ter o Node.js(v-18.0+) instalado.
- [x] precisa ter o PostgreSQL instalado.
 
1.<span style="color: green;">Faça o clone do projeto:</span>

```bash
  git clone git@github.com:vinicius-virtuoso/BibliotecaAPI.git
```
2.<span style="color: green;">Instale as depedencias do projeto:</span>

com yarn:
```yarn
  yarn
```
com npm:
```npm
  npm install
```
3.<span style="color: green;">Configure as informações no arquivo .env:</span>

```env
  PORT='<your port application>'

  SECRET_KEY='<yuor secret key>'
  EXPIRES_IN='<yuor expires time>'

  DATABASE_URL="postgres://<username>:<password>@localhost:5432/<databasename>"

  SMTP_USER='<your email smtp>'
  SMTP_PASS='<your password smtp>'
```
4.<span style="color: green;">Para testar o envios de e-mails recomendo ver as documentações:</span>
  - nodemailer
  - node-cron
