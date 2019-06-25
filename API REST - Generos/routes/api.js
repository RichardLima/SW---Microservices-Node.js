var express = require('express');
var router = express.Router();
var service = require('../service/service');

// Enviado um arquivo de coleção do postman com requisições para todos os endpoints disponiveis no trabalho.

/*requires do JWT*/
var jwt = require('jsonwebtoken'); //para usar a API
const SECRET = 'senha';
/*ATENÇAO!!! A senha usada aqui como uma var é somente para simplificar! NUNCA DEVE SER UTILIZADA ASSIM!!!! Salve como uma variável de ambiente e use o pacote dotenv-safe para recuperá-la, ou carregue-a de um arquivo do servidor com as permissões adequadas!!! */


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'API' });
});


router.get('/generos', async (req, res, next) => {
  let generos = await service.getAllGeneros();

  res.contentType = 'Application/json';
  return await res.status(200).send(generos);
});

router.get('/genero/:id', async (req, res, next) => {
  let genero = await service.getGenero(req.params.id);
  if (genero !== null) {

    await res.contentType('Application/json');
    await res.status(200).send(genero);
  } else {
    await res.status(404).send('NOT FOUND');
  }
});

router.post('/generos', verificaToken, async (req, res) => {
  let body = await req.body;

  if (body.nome != null) {
    let genero = {
      nome: body.nome
    };


    genero.id = service.sizeGeneros() - 1;
    service.addGenero(genero);
    await res.status(201).send(genero);
  } else {
    await res.status(300).send('Invalid Message.');
  }
});

router.put('/generos/:id', verificaToken, async (req, res) => {
  let dados = await req.body;
  let id = await parseInt(req.params.id) - 1;
  let acao = 'genero';
  if (dados != null && id != null) {
    await service.update(id, dados, acao);
    await res.status(200).send(dados);
  } else {
    await res.status(300).send('Mensagem inválida!');
  }
});

router.delete('/generos/:id', verificaToken, async (req, res) => {
  let id = await parseInt(req.params.id) - 1;
  const temp = await service.getGenero(id);
  let acao = 'genero';
  if (temp != null) {
    await service.remove(id, acao);
    await res.status(200).json(temp);
  } else {
    await res.status(404).send('Not Found');
  }
});



function verificaToken(req, res, next) {
  var token = req.headers.authorization;
  if (!token)
    return res.status(401).send({ message: 'No token provided.' });

  jwt.verify(token, SECRET, function (err, decoded) {
    if (err)
      return res.status(403).send({ auth: false, message: 'Failed to authenticate token.' });

    req.userData = decoded;
    next();
  });
}

module.exports = router;
