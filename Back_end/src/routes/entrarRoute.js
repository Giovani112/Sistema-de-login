import { Router } from "express";
import bcrypt from 'bcryptjs';
import { buscarUsuario } from '../models/dadosUsuario.js'; //alteração para receber os dados do usuario

const rota = Router();

// recebe os dados do front
rota.post('/entrar', async (req, res) =>{
    const {nomeUsuario, senha} = req.body ?? {};

    // confere se são textos
    if (typeof nomeUsuario !== 'string' || typeof senha !== 'string'){
        return res.status(400).json({
            Mensagem: 'Informe o seu usuario e senha.'
        });
    }

    // dá erro se deixar os campos de resposta vazio
    if (!nomeUsuario.trim() || !senha || senha.length > 72){
        return res.status(400).json({
            Mensagem: 'Preencha os campos corretamente.'
        });
    }

    // busca as informações dentro do dadosUsuarios
    const usuarioEncontrado = await buscarUsuario(nomeUsuario);

    // caso não encontre o usuário
    if(!usuarioEncontrado){
        return res.status(401).json({
            Mensagem: 'Usuário ou senha incorretos.' // Mensagem genérica
        });
    }

    // compara a senha digitada em hash
    const senhaCorreta = await bcrypt.compare(senha, usuarioEncontrado.senha);

    if(!senhaCorreta){
        return res.status(401).json({ // Mudei para 401 aqui também
            Mensagem: 'Usuário ou senha incorretos.' // Mensagem IDÊNTICA a de cima
        });
    }

    // Sucesso
    return res.json({
        Mensagem: 'Login realizado com sucesso',
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