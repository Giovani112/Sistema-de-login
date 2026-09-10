import bcrypt from 'bcryptjs';

// usuario teste e senha teste
const usuario = [
    {
        id: 1,
        nome: 'teste',
        nomeUsuario: 'TESTE',
        email: 'exemplo@gamil.com',

        materias: [
            {nome: 'Python', nota: 7.0}
        ],

        //transforma a senha em hash
        senha: await bcrypt.hash('SenhaTeste123', 10)
    }
];

//Busca usuario 
export async function buscarUsuario(acharUsuario) {
    return usuario.find ((usu) => usu.nomeUsuario === acharUsuario);
}