var express = require('express');
var router = express.Router();

/*requires do JWT*/
var jwt = require('jsonwebtoken'); //para usar a API
const SECRET = 'senha';
/*ATENÇAO!!! A senha usada aqui como uma var é somente para simplificar! NUNCA DEVE SER UTILIZADA ASSIM!!!! Salve como uma variável de ambiente e use o pacote dotenv-safe para recuperá-la, ou carregue-a de um arquivo do servidor com as permissões adequadas!!! */

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*carrega modulo do express-http-proxy*/
var httpProxy = require('express-http-proxy');

//inicializa o proxy para a URL base do microsserviço*
var microserviceProxy = httpProxy('http://localhost:4000');
var microserviceProxy2 = httpProxy('http://localhost:5000');

/*requisicao via proxy:
  Mapear o método (get,post,...) e a rota original do gateway com a rota do microsserviço para onde a
  requisição deve ser direcionada*/
router.get( '/generos',  (req,res, next)=>{
  req.originalUrl = '/api' + req.originalUrl;
  req.url = '/api' + req.url;
    microserviceProxy( req, res, next );
});

router.get( '/genero/:id',  (req,res, next)=>{
  req.originalUrl = '/api' + req.originalUrl;
  req.url = '/api' + req.url;
    microserviceProxy( req, res, next );
});

router.post( '/generos', verificaToken,  (req,res, next)=>{
  req.originalUrl = '/api' + req.originalUrl;
  req.url = '/api' + req.url;
    microserviceProxy( req, res, next );
});

router.put( '/generos/:id', verificaToken,  (req,res, next)=>{
  req.originalUrl = '/api' + req.originalUrl;
  req.url = '/api' + req.url;
    microserviceProxy( req, res, next );
});

router.delete( '/generos/:id', verificaToken, (req,res, next)=>{
  req.originalUrl = '/api' + req.originalUrl;
  req.url = '/api' + req.url;
    microserviceProxy( req, res, next );
});


// livros

router.get( '/livros',  (req,res, next)=>{
  req.originalUrl = '/api' + req.originalUrl;
  req.url = '/api' + req.url;
    microserviceProxy2( req, res, next );
});

router.get( '/livro/:id',  (req,res, next)=>{
  req.originalUrl = '/api' + req.originalUrl;
  req.url = '/api' + req.url;
    microserviceProxy2( req, res, next );
});

router.post( '/livros', verificaToken,  (req,res, next)=>{
  req.originalUrl = '/api' + req.originalUrl;
  req.url = '/api' + req.url;
    microserviceProxy2( req, res, next );
});

router.put( '/livros/:id', verificaToken, (req,res, next)=>{
  req.originalUrl = '/api' + req.originalUrl;
  req.url = '/api' + req.url;
    microserviceProxy2( req, res, next );
});

router.delete( '/livros/:id', verificaToken,  (req,res, next)=>{
  req.originalUrl = '/api' + req.originalUrl;
  req.url = '/api' + req.url;
    microserviceProxy2( req, res, next );
});



/*criação do endpoint(rota) para login*/
router.post('/login', function (req, res) {
  console.log('login...');
  //verifica se o login está válido
  if (req.body.user === 'aluno' && req.body.pass === 'ifsul') {
    /* o primeiro argumento é o payload. O payload é um objeto que deve conter
    tudo o que se quer manter armazenado dentro do token. A ideia é que tenha tudo
    que for necessário para identificar o usuário*/
    var payload = {
      user: req.body.user,
      role: 'admin', // estes dados viriam do banco
      id: 1
    };
    /* Segundo argumento é a senha, que deve ser secreta no server.
    terceiro argumento são as opções do token. Aqui definimos a duração
    de validade do token em 3m*/

    //assinatura do token
    var token = jwt.sign(payload, SECRET, { expiresIn: '3m' });

    res.status(200).send({ token: token });
  }else
    res.status(401).send({ user: 'user', pass: 'pass' });//envia erro NONAUTHORIZED
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

/*endpoint para testar um jwt qualquer*/
router.get('/session', verificaToken, function (req, res) {
  var data = req.userData;
    
  res.statusCode = 200;
  res.send('Token OK');
});


module.exports = router;
