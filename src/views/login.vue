<template>
    <div id="login">
        <div class="scroller">
            <section id="login-main" class="vh-100">
                <navbar :highlight='0' :fixed='true' :login="false"></navbar>
                <topico
                titulo="Automatize seu login com o SUAP"
                conteudo="
                    Agora, a Semente está integrada com a API do SUAP, permitindo que alunos automatizem o processo de login. Essa integração torna o login mais rápido e seguro, economizando tempo e esforço.
                    
                    Para quem prefere realizar o login manualmente, é só scrollar para baixo ...
                "
                :botao="{texto:'login com', imagem: 'suaplogo.svg', callback : loginSUAP,estilo: 'btn-dark'}"
            />
            </section>
            <section id="login-conteudo">
                <form @submit.prevent="loginManual">
                    <img id="login-logo" src="../assets/logo2.svg">
                    <h1>Logando na sua conta</h1>
                    <label for="login_matricula">Matricula: </label>
                    <input required type="text" class="form-control" id="login_matricula"  placeholder="Digite sua matricula">
                    <label for="login_senha">Senha: </label>
                    <input required type="password" class="form-control" id="login_senha"  placeholder="Digite sua senha">
                    <button id="btn-login" type="submit" class="btn btn-dark">login</button>
                </form>
            </section>
        </div>

        
    </div>
  </template>
  
  <style scoped>
  #login {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    #login-main{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    #login-conteudo{
        min-height: 100vh;
        color: white;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        #login-logo{
            width: 100px;
            align-self: center;
            margin: 0;
            margin-top: 80px;
            margin-bottom: 15px;
        }
        form{
            display: flex;
            flex-direction: column;
            width: 80%;
            h1{
                text-align: center;

            }
            label, input{
                margin-bottom: 15px;
            }
            #btn-login{
                margin-top: 25px;
                margin-bottom: 50px;
            }
        }

    }

  }
  
  </style>
  
  <script>
  import introducao from '../components/introducao.vue';
  import navbar from '../components/navbar.vue';
  import topico from '../components/topico.vue';
  import Cookies from '../assets/suap/js.cookie';
  import SuapClient from '../assets/suap/client.js';
  
  export default {
    name: 'login',
    components: {
      navbar,
      introducao,
      topico,
    },
    data() {
      return {
        suap: null, // Variável para armazenar a instância do cliente SUAP
      };
    },
    mounted() {
      // Inicializa o cliente SUAP
      this.suap = new SuapClient(
        "https://suap.ifrn.edu.br",
        'sOcB9UZvCic313AFax4plVphNTmVQTdVER9H4QG5',
        'http://localhost:5173/login',
        'identificacao email'
      );
      this.suap.init();
    },
    methods: {
      loginSUAP() {
        // Lógica para autenticação do usuário
        const loginURL = this.suap.getLoginURL();
        console.log('URL de login do SUAP:', loginURL);
        window.location.href = loginURL; // Redireciona para a página de login do SUAP
      },
      async loginManual() {
        let matricula = document.getElementById('login_matricula').value;
        let senha = document.getElementById('login_senha').value;


        if (matricula == '' || senha == '') {
          alert('Preencha todos os campos!');
          return;
        }
        const dados = {
          matricula: matricula,
          senha: senha
        };
        try{
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(dados),
            });
        }catch{

        }

      },
    },
  };
  </script>
  