# Unifaat :: Devweb :: Aula 15 - Filas

## Instalação e Execução

### Siga os passos abaixo para rodar o projeto via Docker:

1. Clonar o repositório:

   ```sh
   git clone https://github.com/luan-tavares/unifaat-devweb-aula15-filas
   ```

2. Entrar na pasta do projeto:

   ```sh
   cd unifaat-devweb-aula15-filas
   ```

3. Criar o arquivo `.env` na raiz do projeto copiando o `.env.example`:

   > No Windows:

   ```sh
   copy .env.example .env
   ```

   > No Linux:

   ```sh
   cp .env.example .env
   ```

4. Abrir o arquivo `.env` recém criado e preencher os campos abaixo:

   ```env
   POSTGRES_USER=meu_usuario
   POSTGRES_PASSWORD=minha_senha
   RABBITMQ_USER=usuario_rabbit
   RABBITMQ_PASSWORD=senha_rabbit
   JWT_SECRET=super_secreta
   ```

5. Subir a aplicação com Docker Compose:

   > Docker Compose tradicional:

   ```sh
   docker-compose up --build
   ```

   > Docker Compose moderno:

   ```sh
   docker compose up --build
   ```

6. Executar as migrations utilizando UM desses comandos:

   > Container (Docker Compose tradicional):

   ```sh
   docker-compose run --rm nodecli-container migrate
   ```

   > Container (Docker Compose moderno):

   ```sh
   docker compose run --rm nodecli-container migrate
   ```

   > Host:

   ```sh
   node command migrate
   ```

7. Executar as seeds utilizando UM desses comandos:

   > Container (Docker Compose tradicional):

   ```sh
   docker-compose run --rm nodecli-container seed
   ```

   > Container (Docker Compose moderno):

   ```sh
   docker compose run --rm nodecli-container seed
   ```

   > Host:

   ```sh
   node command seed
   ```

---

## Subindo um Worker (Consumer)

Após rodar migrations e seeds, você pode subir um **worker/consumer** para escutar uma fila específica e processar os jobs associados.

### ✅ Via Host (fora do container)

```sh
node worker --queue=minha-fila
```

Substitua `"minha-fila"` pelo nome da fila desejada, como `emails`, `relatorios`, `webhooks`, etc.

### ✅ Via Docker (container efêmero)

> Docker Compose tradicional:

```sh
docker-compose run --rm nodeworker-container --queue=minha-fila
```

> Docker Compose moderno:

```sh
docker compose run --rm nodeworker-container --queue=minha-fila
```

⚠️ O parâmetro `--queue` será interpretado pelo `worker.js`.  
Certifique-se de que ele lê `process.argv` e passa corretamente para `worker.listen(queue)`.

---

## Acesse

- Servidor: [http://localhost:8080](http://localhost:8080)
- Documentação da API: [http://localhost:8080/docs](http://localhost:8080/docs)

**Importante:** O arquivo `./Insomnia.yml` DEVE ser utilizado no Insomnia para testar as rotas.

---

## 📦 Bibliotecas Utilizadas

| Biblioteca            | Finalidade                                                                 |
|-----------------------|----------------------------------------------------------------------------|
| `express`             | Framework web para Node.js usado para criar APIs e servidores HTTP.        |
| `chalk`               | Biblioteca para estilizar saídas no terminal com cores e ênfases.          |
| `dotenv`              | Carrega variáveis de ambiente de um arquivo `.env` para `process.env`.     |
| `pg`                  | Cliente PostgreSQL para Node.js, usado para conexão e execução de queries. |
| `sequelize`           | ORM (Object-Relational Mapping) para trabalhar com bancos relacionais.     |
| `jsonwebtoken`        | Geração e verificação de tokens JWT para autenticação.                     |
| `bcrypt`              | Criptografia e comparação de senhas com hash seguro.                       |
| `swagger-jsdoc`       | Gera especificações Swagger a partir de JSDoc nos comentários do código.   |
| `swagger-ui-express`  | Middleware que serve a UI do Swagger para documentar e testar APIs.        |
| `express-fileupload`  | Middleware para lidar com upload de arquivos via `multipart/form-data`.    |
| `minimist`            | Faz o parsing de argumentos de linha de comando.                           |
| `cli-table3`          | Cria tabelas formatadas para exibição no terminal.                         |
| `axios`               | Cliente HTTP para fazer requisições a APIs externas.                       |
| `amqplib`             | Biblioteca cliente para comunicação com RabbitMQ via protocolo AMQP.       |
| `nodemon`             | Ferramenta que reinicia automaticamente a aplicação ao detectar mudanças.  |

---

## 📁 Estrutura de Diretórios (raiz)

| Caminho / Pasta             | Descrição                                                                                                 |
|-----------------------------|-----------------------------------------------------------------------------------------------------------|
| `app/`                      | Lógica principal da aplicação organizada por domínio.                                                     |
| `app/Commands/`             | Comandos CLI como `migrate`, `seed`, `dispatch`, executados com `node command <comando>`.                |
| `app/Http/`                 | Código relacionado as requisições HTTP.                                                                            |
| `app/Http/Controllers/`     | Controllers que lidam com requisições e respostas das rotas.                                              |
| `app/Http/Middlewares/`     | Middlewares como autenticação, validação e logger HTTP.                                                   |
| `app/Jobs/`                 | Jobs consumidos pelos workers. Cada arquivo representa uma tarefa isolada e assíncrona.                   |
| `app/Models/`               | Models Sequelize que representam e manipulam tabelas do banco de dados.                                  |
| `bootstrap/`                | Inicializações específicas do projeto, como setup global de helpers, constantes e variáveis de ambiente.                        |
| `config/`                   | Arquivos de configuração para serviços como RabbitMQ, Postgres, JWT, Sequelize,  swagger, etc.                                 |
| `Core/`                     | Núcleo do sistema, como se fosse uma lib interna criada por nós mesmos. Carrega bastante complexidade.    |
| `Core/WorkerCore/`          | Lógica de workers: registro, execução, escuta de filas.                                                   |
| `Core/CommandCore/`         | Execução e estrutura dos comandos CLI.                                                                   |
| `Core/MigrationCore/`       | Lógica por trás das migrations via CLI.                                                                  |
| `Core/SeedCore/`            | Lógica por trás das seeds via CLI.                                                                       |
| `Core/RoutesCore/`          | Registro e estrutura das rotas carregadas dinamicamente.                                                  |
| `database/migrations/`      | Scripts de criação/modificação de tabelas versionados.                                                    |
| `database/seeds/`           | Scripts para popular dados iniciais no banco.                                                             |
| `docker/`                   | Dockerfiles específicos para cada serviço da aplicação.                                                   |
| `docs/`                     | (Opcional) Documentação de apis swagger em json.                                               |
| `node_modules/`             | Pacotes npm instalados automaticamente.                                                                   |
| `public/`                   | Arquivos públicos (como `index.html`) servidos diretamente por HTTP.                                      |
| `routes/`                   | Arquivos de definição de rotas, geralmente organizados por entidade.                                      |
| `storage/`                  | Uploads, arquivos temporários ou pastas auxiliares da aplicação.                                          |
| `.env`                      | Variáveis de ambiente sensíveis carregadas em tempo de execução.                                          |
| `.env.example`              | Template de `.env` para novos devs copiarem e configurarem.                                               |
| `.gitignore`                | Lista de arquivos e pastas que o Git deve ignorar.                                                        |
| `command`                   | Entry point dos comandos CLI (`node command ...`).                                                        |
| `docker-compose.yml`        | Arquivo de orquestração dos containers (web, worker, postgres, rabbit, etc).                             |
| `Insomnia.yaml`             | Export das rotas da API para importar no Insomnia.                                                        |
| `package.json`              | Lista de dependências, scripts npm e metadados do projeto.                                                |
| `package-lock.json`         | Trava exata das versões das dependências instaladas.                                                      |
| `readme.md`                 | Documentação principal do projeto (este arquivo).                                                         |
| `server.js`                 | Entry point HTTP da aplicação. Sobe o Express e inicializa a API.                                         |
| `worker`                    | Entrypoint dos workers/consumers. Sobe escutando filas específicas do RabbitMQ.                          |
