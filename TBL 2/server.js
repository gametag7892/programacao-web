const http = require('http');
const pool = require('./db');

const produtos = [
    { 'id': 1, 'nome': 'Celular', 'preco': 1099},
    { 'id': 2, 'nome': 'Notebook', 'preco': 2800},
    { 'id': 3, 'nome': 'Headset', 'preco': 99},
    { 'id': 4, 'nome': 'Mouse', 'preco': 100},
    { 'id': 5, 'nome': 'Teclado Gamer', 'preco': 200}
]

let contador = 0;

const servidor = http.createServer(async (req, res)=>{
    if (req.url === '/contador'){
        return res.end(JSON.stringify(contador += 1));
    }   
    else if (req.url === '/api/produtos'){
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify(produtos));
    }
    else if (req.url.startsWith('/api/produtos/')){
        const id = req.url.split('/')[3];
        const result = produtos.find((p) => p.id === Number(id));

        return res.end(JSON.stringify(result));
    }
    else if (req.url === '/teste'){
        return req.method === 'GET'? res.end('Essa rota e um teste') : res.end('Nao permitido!')
    }
    else if (req.url === '/usuarios'){
        try {
            const resultado = await pool.query('SELECT * FROM usuarios');
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(resultado.rows));
        } catch (err) {
            res.statusCode = 500;
            res.end('Erro ao buscar dados: ' + err);
        }
    }
    else if (req.url.startsWith('/usuarios/')){
        try {
            const id = req.url.split('/')[2];

            const resultado = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
            
            res.setHeader('Content-Type', 'application/json');

            if (resultado.rows.length > 0) {
                res.end(JSON.stringify(resultado.rows[0]));
            } else {
                res.statusCode = 404;
                res.end(JSON.stringify({erro: 'Usuário não encontrado'}));
            }

        } catch (err) {
            res.statusCode = 500;
            res.end('Erro ao buscar dados');
        }
    }
    else {
        res.statusCode = 404;
        res.end('Rota inválida');
    }
});

servidor.listen(3000, () => {
    console.log('Servidor rodando na porta http://localhost:3000');
});