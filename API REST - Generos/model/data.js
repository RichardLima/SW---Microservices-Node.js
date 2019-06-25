var generos = [];

generos.push( { 
   id: 1,
   nome: 'genero1'
});

generos.push( { 
    id: 2,
    nome: 'genero2' 
});


 var livros = [];

 livros.push( { 
    id: 1,
    nome: 'livro1',
    genero: 1
 });
 
 livros.push( { 
     id: 2,
     nome: 'livro2',
     genero: 2 
 });

module.exports = {generos, livros};