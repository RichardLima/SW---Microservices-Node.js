var data = require('../model/data');

var sizeGeneros = () => {
    return data.generos.length + 1;
}

var addGenero = (genero) => {
    if (genero.nome !== null)
        data.generos.push(genero);
};

var getGenero = (id) => {
    if (data.generos.length - 1 < id)
        return null;
    else
        return data.generos[id];
}

var getAllGeneros = () => {
    return data.generos;
}

var sizeLivros = () => {
    return data.livros.length + 1;
}

var addLivro = (livro) => {
    if (livro.nome !== null && livro.genero !== null)
        data.livros.push(livro);
};

var getLivro = (id) => {
    if (data.livros.length - 1 < id)
        return null;
    else
        return data.livros[id];
}

var getAllLivros = () => {
    return data.livros;
}


var update = (id, dados, acao) => {
    if (acao === 'genero') {
        data.generos[id] = dados;
    } else if (acao === 'livro') {
        data.livros[id] = dados;
    }

};

var remove = (id, acao) => {
    if (acao === 'genero') {
        data.generos.splice(id - 1, 1);
    } else if (acao === 'livro') {
        data.livros.splice(id - 1, 1);
    }
};


module.exports = {
    sizeGeneros, addGenero, getGenero, getAllGeneros, sizeLivros,
    addLivro, getLivro, getAllLivros, update, remove
};