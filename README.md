# Customer Rest API

Criação de uma Rest API utilizando o Framework NestJS para a construção, juntamente com o Jest para a criação dos testes da aplicação

## Endpoints

**Os endpoints necessitam de um token Bearer válido**

- GET `customers/${id}`

    <table border="1">
        <tr>
            <td>Header</td>
            <td>
                Content-Type: application/json
                <br>
                Authorization: Bearer token
            </td>
        </tr>
        <tr>
            <td>Request</td>
            <td>N/A</td>
        </tr>
    </table>
- POST `customers`
    <table border="1">
        <tr>
            <td>Header</td>
            <td>
                Content-Type: application/json
                <br>
                Authorization: Bearer token
            </td>
        </tr>
        <tr>
            <td>Request</td>
            <td>
                {<br>
                    "document": "&ltnumber&gt",<br>
                    "name": "&ltstring&gt"<br>
                }
            </td>
        </tr>
    </table>
- PUT `customers/${id}`
    <table border="1">
        <tr>
            <td>Header</td>
            <td>
                Content-Type: application/json
                <br>
                Authorization: Bearer token
            </td>
        </tr>
        <tr>
            <td>Request</td>
            <td>
                {<br>
                    "document": "&ltnumber&gt",<br>
                    "name": "&ltstring&gt"<br>
                }
            </td>
        </tr>
    </table>

## Pré-requisitos
- [Node.js](https://nodejs.org/en/) instalado;
- [Redis](https://redis.io/) instalado;

## Instalação do Redis no Docker

```bash
$ docker pull redis
$ docker run -d -p 6379:6379 redis
```

## Instalação

Faça um clone do repositório no diretório que você preferir

```bash
$ git clone https://github.com/gcostacoelho/customer_api_nestjs.git 
```

Após a conclusão da etapa anterior, entre no diretório criado pelo clone e instale os pacotes que são utilizados no programa

```bash
# Entra no diretório
$ cd ./customer_api_nestjs/

# Instala os pacotes usando a versão especificada no package.json
$ npm ci 
```

Usando o arquivo ```.env.example``` copie o seu conteúdo e crie um arquivo ```.env``` para colar o seu conteúdo.

Depois dos pacotes serem instalados e o arquivo ```.env``` ser criado a API já vai estar pronta para ser buildada e rodada localmente, para isso utilize os seguintes comandos:

> Lembre-se de deixar o Redis rodando na porta onde foi setado.

```bash
# Builda a aplicação para o uso
$ npm run build

# Inicia a aplicação localmente na porta 3000
$ npm run start:prod
```

## Utilizando Docker para rodar a aplicação

Para rodar a aplicação conteinerizada, será necessário utilizar o ```docker-compose```, que pode ser instalado [aqui](https://docs.docker.com/compose/install/).

Após a instalação rode o comando dentro do diretório onde está o projeto:

```bash
$ docker-compose up -d
```
Depois do comando terminar de criar a imagem e os containers, o projeto estará rodando no ```localhost:3000```

## Testes

Para rodar os testes da aplicação utilize o seguinte comando dentro do terminal do container:

> Deixe a API rodando juntamente com o Redis

```bash
$ npm run test:e2e
```