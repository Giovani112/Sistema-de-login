import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
//Rota para o login
import rota from './routes/entrarRoute.js'; 

// sempre declarar a variavel com o () no final do Express
const api = express();

// configuração necessária para usar caminhos de pastas com 'import'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// serve tipo como uma permissão para aparecer (Libera acesso de outras origens/frontends)
api.use(cors());

// libera a pasta 'public' para o navegador carregar o CSS e JS
api.use(express.static(path.join(__dirname, 'public')));

// cria a rota visual que vai entregar o arquivo HTML no navegador
api.get('/entrar', (req, res) => {
    // Procura o arquivo login.html dentro de src/views/ e envia para a tela
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

// Rota para a página de Cadastro
api.get('/cadastro', (req, res) => {
    // Procura o arquivo cadastro.html dentro de src/views/ e envia
    res.sendFile(path.join(__dirname, 'views', 'cadastro.html'));
});

// fala para o navegador não salvar os dados no cache e no historico
api.use((req, res, next) =>{
    res.set('cache-control', 'no-store');
    next();
});

// o express.json traduz oque foi recebido pelo req.body e
// renvia para o mesmo facilitar na execução do codigo 
// com um limite de 10kb, caso passe disso ele envia direto para o erro
api.use(express.json({limit: '10kb'}));

// A variavel rota recebeu o Router exportado pelo arquivo.
// aqui conecta o router ao servidor Express.
api.use(rota);

// CORREÇÃO: Um middleware de erro no Express PRECISA ter esses 4 parâmetros exatos
api.use((erro, req, res, next) =>{
    if(erro.status === 400 || erro.status === 413) {
        return res.status(erro.status).json({
            mensagem: 'JSON inválido ou grande demais.'
        });
    }

    res.status(500).json({
        mensagem: 'Erro no Servidor'
    });
});

api.listen(3000, ()=>{
    console.log('Servidor rodando na porta 3000');
});