import express from 'express';
import cors from 'cors';
import rota from './login/login.js';


// sempre declarar a variavel com o () no final do Express
const api = express();

// A variavel rota recebeu o Router exportado pelo arquivo login.js.
// aqui conecta o router ao servidor Express assim chamando o login para o servidor.js.
api.use((rota));

//serve tipo como uma permissão para aparecer
api.use(cors());


// fala para o navegador não salvar os dados no cache e no historico
api.use((req, res, next) =>{
    res.set('cache-control', 'no-store');
    next();
});

// o express.json traduz oque foi recebido pelo req.body e
// renvia para o mesmo facilitar na execução do codigo 
// com um limmite de 10kb caso passe disso ele envia direto para o erro
api.use(express.json({limit: '10kb'}))



api.use((erro, res) =>{
    if(erro.status === 400 || erro.status === 413) {
        return res.status(erro.status).json({
            mensagem: 'json invalido ou grande demais.'
        });
        }

        res.status(500).json({
            mensagem: 'Erro no Servido'
        });
});

api.listen(3000, '127.0.0.1', ()=>{
    console.log('O seu API esta funcinando em http://127.0.0.1:3000');
    
})