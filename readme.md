# Unifaat :: Devweb :: Aula 15 - Filas <a name="unifaat-devweb-aula-15---filas"></a>

## 📑 Sumário

- [Instalação e Execução](#instalacao-e-execucao)
- [🚀 Como Criar Elementos](#como-criar-elementos)
  - [🧩 Criar uma Rota](#criar-uma-rota)
  - [📦 Criar um Controller](#criar-um-controller)
  - [⛓️ Criar um Middleware](#criar-um-middleware)
  - [🧵 Criar um Job](#criar-um-job)
  - [💻 Criar um Command](#criar-um-command)
- [🧵 Subindo um Worker (Consumer)](#subindo-um-worker-consumer)
- [Acesse](#acesse)
- [📦 Bibliotecas Utilizadas](#bibliotecas-utilizadas)
- [📁 Estrutura de Diretórios (raiz)](#estrutura-de-diretorios-raiz)
- [🐳 Containers e Imagens Docker](#containers-e-imagens-docker)

## Instalação e Execução <a name="instalacao-e-execucao"></a>

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

5. Instalar as dependências:

   ```sh
   npm install
   ```

6. Subir a aplicação com Docker Compose:

   > Docker Compose tradicional:

   ```sh
   docker-compose up --build
   ```

   > Docker Compose moderno:

   ```sh
   docker compose up --build
   ```

7. Executar as migrations utilizando UM desses comandos:

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

8. Executar as seeds utilizando UM desses comandos:

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

## 🚀 Como Criar Elementos <a name="como-criar-elementos"></a>

### 🧩 Criar uma Rota <a name="criar-uma-rota"></a>

1. Defina o path da rota em `routes/web.js` ou `routes/api.js`
2. Associe um controller da `app/Http/Controllers/`

Exemplo (`routes/api.js`):
```js
router.get('/exemplo', MeuController);
```

### 📦 Criar um Controller <a name="criar-um-controller"></a>

1. Crie um novo arquivo em `app/Http/Controllers/...`

```js
export default async function(request, response) {
  ...
  # Minha Lógica
  ...
  response.status(200).json({"success": "Minha resposta"});
}
```

### ⛓️ Criar um Middleware <a name="criar-um-middleware"></a>

Adicione em `app/Http/Middlewares/`, por exemplo:

```js
export default async function (request, response, next) {
  console.log(`[${request.method}] ${request.url}`);
  next();
}
```

Depois registre na rota.

### 🧵 Criar um Job <a name="criar-um-job"></a>

1. Crie um arquivo em `app/Jobs/` (Exemplo ./app/Jobs/MeuJob.js):

```js
import createJob from '../../Core/QueueCore/createJob.js';

export default createJob({
    name: "FirstJob",
    handle: async (payload) => {
       ...
       # Miha lógica
       ...
    }
});
```

2. Despache usando o método `dispatch`:

```js
await MeuJob.dispatch(
  {...},
  "minha-fila"
);
```

### 💻 Criar um Command <a name="criar-um-command"></a>

1. Crie um arquivo em `app/Commands/NomeDoCommand.js`:

```js
export default {
    name: 'nome-comando',
    description: 'minha descrição',
    arguments: {
        ...
    },

    handle: async function ({ argument1 }) {
        console.log(argument1);
        ...
        # Minha lógica
        ...
    }
}
```

2. Execute via terminal:

```sh
node command meu-comando
```

## 🧵 Subindo um Worker (Consumer) <a name="subindo-um-worker-consumer"></a>

Após rodar migrations e seeds, você pode subir um worker (consumer) para escutar uma fila específica e processar os jobs associados.

✅ Via Host (fora do container):
```bash
node worker --queue=minha-fila --concurrency=1
```

✅ Via Docker (container efêmero):

Docker Compose tradicional:
```bash
docker-compose run --rm nodeworker-container --queue=minha-fila --concurrency=1
```

Docker Compose moderno:
```bash
docker compose run --rm nodeworker-container --queue=minha-fila --concurrency=1
```

⚙️ Argumentos CLI:

**--queue (opcional)**
Substitua `minha-fila` pelo nome da fila desejada, como `emails`, `relatorios`, `webhooks`, etc.  
Se não for informado, usará a fila `default`.

**--concurrency (opcional)**  
Define quantos jobs podem ser processados ao mesmo tempo por esse worker.  
Se não for informado, o padrão é `1`.

## Acesse <a name="acesse"></a>

- Servidor: [http://localhost:8080](http://localhost:8080)
- Documentação da API: [http://localhost:8080/docs](http://localhost:8080/docs)

**Importante:** O arquivo `./Insomnia.yml` DEVE ser utilizado no Insomnia para testar as rotas.

## 📦 Bibliotecas Utilizadas <a name="bibliotecas-utilizadas"></a>

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

## 📁 Estrutura de Diretórios (raiz) <a name="estrutura-de-diretorios-raiz"></a>

| Caminho / Pasta             | Descrição                                                                                                 |
|-----------------------------|-----------------------------------------------------------------------------------------------------------|
| `app/`                      | Lógica principal da aplicação organizada por domínio.                                                     |
| `app/Commands/`             | Comandos CLI como `migrate`, `seed`, `dispatch`, executados com `node command <comando>`.                |
| `app/Http/`                 | Código relacionado as requisições HTTP.                                                                   |
| `app/Http/Controllers/`     | Controllers que lidam com requisições e respostas das rotas.                                              |
| `app/Http/Middlewares/`     | Middlewares como autenticação, validação e logger HTTP.                                                   |
| `app/Jobs/`                 | Jobs consumidos pelos workers. Cada arquivo representa uma tarefa isolada e assíncrona.                   |
| `app/Models/`               | Models Sequelize que representam e manipulam tabelas do banco de dados.                                  |
| `bootstrap/`                | Inicializações específicas do projeto, como setup global de helpers, constantes e variáveis de ambiente.  |
| `config/`                   | Arquivos de configuração para serviços como RabbitMQ, Postgres, JWT, Sequelize, Swagger, etc.             |
| `Core/`                     | Núcleo do sistema, como se fosse uma lib interna criada por nós mesmos.                                   |
| `Core/QueueCore/`           | Lógica de workers: registro, execução, escuta de filas.                                                   |
| `Core/CommandCore/`         | Execução e estrutura dos comandos CLI.                                                                    |
| `Core/MigrationCore/`       | Lógica por trás das migrations via CLI.                                                                   |
| `Core/SeedCore/`            | Lógica por trás das seeds via CLI.                                                                        |
| `Core/RoutesCore/`          | Registro e estrutura das rotas carregadas dinamicamente.                                                  |
| `database/migrations/`      | Scripts de criação/modificação de tabelas versionados.                                                    |
| `database/seeds/`           | Scripts para popular dados iniciais no banco.                                                             |
| `docker/`                   | Dockerfiles específicos para cada serviço da aplicação.                                                   |
| `docs/`                     | (Opcional) Documentação de APIs Swagger em JSON.                                                          |
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
| `worker`                    | Entrypoint dos workers/consumers. Sobe escutando filas específicas do RabbitMQ.                           |

## 🐳 Containers e Imagens Docker <a name="containers-e-imagens-docker"></a>

Este projeto utiliza uma arquitetura baseada em múltiplos containers Docker, orquestrados via Docker Compose. Abaixo está a descrição de cada serviço, imagem, volume e porta exposta.

### 🔧 Containers da Aplicação

| Container               | Dockerfile                             | Função                                                                 |
|-------------------------|-----------------------------------------|------------------------------------------------------------------------|
| `nodeweb-container`     | `docker/node-web/Dockerfile.dev`        | API HTTP principal (`server.js`). Exposto na porta **3000** (interna). |
| `nodecli-container`     | `docker/node-cli/Dockerfile`            | Executa comandos como `migrate`, `seed`, `dispatch`. Container efêmero. |
| `nodeworker-container`  | `docker/node-worker/Dockerfile`         | Worker que consome jobs da fila RabbitMQ.                              |

### 🗄️ Containers de Infraestrutura

| Container              | Imagem Base               | Função                                                                 | Porta Interna |
|------------------------|---------------------------|------------------------------------------------------------------------|---------------|
| `postgres-container`   | `postgres:15`             | Banco de dados PostgreSQL usado pela aplicação.                        | **5432**      |
| `rabbitmq-container`   | `rabbitmq:3-management`   | Broker de mensagens AMQP (com UI Web em `/`).                          | **5672**, **15672** |
| `nginx-container`      | `nginx:1.25-alpine`       | Proxy reverso que expõe a API HTTP para fora.                          | **8080**      |

### 💾 Volumes Persistentes

| Volume                         | Utilizado por                      | Finalidade                                          |
|--------------------------------|------------------------------------|-----------------------------------------------------|
| `node-modules-aula-15-volume` | `nodeweb`, `nodecli`, `nodeworker`  | Evita reinstalação de dependências a cada build     |
| `postgres-data-aula-15-volume`| `postgres-container`                | Persistência dos dados do banco PostgreSQL          |
| `rabbitmq-data-aula-15-volume`| `rabbitmq-container`                | Persistência das filas e mensagens RabbitMQ         |

### 🌐 Redes

Todos os containers estão conectados à rede Docker personalizada:

```
project-network
```

Isso permite comunicação interna entre os serviços via `nome-do-container`.

### 🌍 Portas Expostas Externamente

| Serviço     | Porta Interna | Porta Externa | Acesso Externo                      |
|-------------|----------------|----------------|-------------------------------------|
| NGINX       | 80             | **8080**       | http://localhost:8080               |
| PostgreSQL  | 5432           | **6789**       | usado por clients/ORM               |
| RabbitMQ    | 5672, 15672    | **2765**, **15672** | AMQP e painel web http://localhost:15672 |

---

Essas definições estão configuradas em `docker-compose.yml` e os arquivos de build estão em `./docker/`.
