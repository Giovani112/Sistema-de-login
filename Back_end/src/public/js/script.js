// Seleciona o formulário
const formLogin = document.getElementById('formLogin');

// Intercepta o evento de envio (submit)
formLogin.addEventListener('submit', async function(evento) {
    // Evita que a página recarregue ao clicar no botão
    evento.preventDefault();

    // Captura os valores digitados nos inputs
    const usuarioValue = document.getElementById('usuarioLogin').value;
    const senhaValue = document.getElementById('senhaLogin').value;

    // Cria o objeto que será transformado em JSON
    const dadosLogin = {
        nomeUsuario: usuarioValue,
        senha: senhaValue
    };

    try {
        // Faz a requisição para o backend
        const resposta = await fetch('http://localhost:3000/entrar', {
            method: 'POST', // Método de envio
            headers: {
                'Content-Type': 'application/json' // Avisa o backend que estamos enviando um JSON
            },
            body: JSON.stringify(dadosLogin) // Transforma o objeto JavaScript em uma string JSON
        });

        // Converte a resposta do backend para JSON
        const dadosResposta = await resposta.json();

        if (resposta.ok) {
            // Se o login der certo (Status 200-299)
            alert('Login realizado com sucesso!');
            
            // Exemplo: Salvar o token no localStorage e redirecionar o usuário
            // localStorage.setItem('token', dadosResposta.token);
            // window.location.href = '/dashboard.html';
            
        } else {
            // Se o backend recusar o login (ex: senha incorreta)
            alert('Erro ao fazer login: ' + dadosResposta.mensagem);
        }

    } catch (erro) {
        // Se houver erro de conexão (backend fora do ar, erro de rede, etc)
        console.error('Erro na requisição:', erro);
        alert('Não foi possível conectar ao servidor. Tente novamente mais tarde.');
    }
});