# SW---Microsservices-Node.js
Trabalho desenvolvido para a cadeira de Serviços Web do IFSul - Campus Passo Fundo.

Este projeto é composto por uma API Gateway e dois microsserviços, sendo um de gêneros e outro de livros. Além de possuir autenticação via token JWT.

## Requisitos

Fazer o clone e rodar os comandos abaixo em cada serviço (API Gateway e microsserviços).

```bash
npm install
```

## Testes

Para testar os serviços basta dar o start utilizando o comando `npm start`.

## Serviço para pegar o token

**GET**

Para utilizar esse serviço você deve utilizar o endpoint `/login`
ex: url/login

## Serviço de listagem de gêneros

**GET**

Para utilizar esse serviço você deve utilizar o endpoint `/generos`
ex: url/generos

## Serviço de busca/listagem de um gênero específico

**GET**

Para utilizar esse serviço você deve utilizar o endpoint `/genero/:id`
ex: url/genero/1

## Serviço para cadastro/inserção de um gênero específico

**POST**

Para utilizar esse serviço você deve estar autenticado e utilizar o endpoint
`/generos`
ex: url/generos

**body**
`
{
    "nome": "novo gênero"
}
`

## Serviço para alteração de um gênero específico

**PUT**

Para utilizar esse serviço você deve estar autenticado e utilizar o endpoint
`/generos/:id`
ex: url/generos/1

**body**
`
{
    "nome": "gênero alterado"
}
`
## Serviço para deletar um gênero específico

**DELETE**

Para utilizar esse serviço você deve utilizar o endpoint `/generos/:id`
ex: url/generos/1

## Serviço de listagem de livros

**GET**

Para utilizar esse serviço você deve utilizar o endpoint `/livros`
ex: url/livros

## Serviço de busca/listagem de um livro específico

**GET**

Para utilizar esse serviço você deve utilizar o endpoint `/livro/:id`
ex: url/livro/1

## Serviço para cadastro/inserção de um livro específico

**POST**

Para utilizar esse serviço você deve estar autenticado e utilizar o endpoint
`/livros`
ex: url/livros

**body**
`
{
    "nome": "novo livro",
    "genero": 2
}
`

## Serviço para alteração de um livro específico

**PUT**

Para utilizar esse serviço você deve estar autenticado e utilizar o endpoint
`/livros/:id`
ex: url/livros/1

**body**
`
{
    "nome": "livro alterado",
    "genero": 2
}
`

## Serviço para deletar um livro específico

**DELETE**

Para utilizar esse serviço você deve utilizar o endpoint `/livros/:id`
ex: url/livros/1





