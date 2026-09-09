import { Router } from "express";
import bcrypt from 'bcryptjs';
import { buscarUsuario } from './dadosUsuario.js';
//sempre que for importar um modulo, colocar a extensão do arquivo (.js) no final."

const rota = Router();

//  recebe os dados do front
rota.post('/entrar', async (req, res) =>{
    const {nomeUsuario, senha} = req.body ?? {};

    // confere se são textos
    if (typeof nomeUsuario !== 'string' || typeof senha !== 'string'){
        return res.status(400).json({
            Mensagem: 'Informe o seu usuario e senha.'
        });
    }


    //da erro se deixcar os campos de resposta vazio
    if (!nomeUsuario.trim() || !senha || senha.length > 72){
        return res.status(400).json({
            Mensagem: 'Preencha os campos corretamente'
        });
    }


    // busca as informações dentro do dadosUsuarios
    const usuarioEncontrado = await buscarUsuario(nomeUsuario);

    //apos a comparação do nomeUsuario do front com o nomeUsuarido do banco
    // caso senha um nomeUsuario errado ele roda este if
    if(!usuarioEncontrado){
        return res.status(401).json({
            Mensagem: 'Usuario ou senha incorretos'
        });
    }


    // vai comparar a senha digitada em hash para ver se esta correta
    // bcrypt.compare é uma função dentro da biblioteca do bcrypt que compara
    const senhaCorreta = await bcrypt.compare(
        senha,
        usuarioEncontrado.senha
    );

    if(!senhaCorreta){
        return res.status(400).json({
            Mensagem: 'Usuario ou senha incorretos, tente novamente!'
        });
    }


    return res.json({
        Mensagem:'Login realizado com sucesso',

        usuario: {
            id: usuarioEncontrado.id,
            nome: usuarioEncontrado.nome,
            nomeUsuario: usuarioEncontrado.nomeUsuario,
            email: usuarioEncontrado.email,
            materias: usuarioEncontrado.materias
        }
    });
});

export default rota;