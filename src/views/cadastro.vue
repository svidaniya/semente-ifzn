<template>
    <div id="cadastro">
        <div class="scroller">
            <section id="cadastro-main" class="vh-100">
                <navbar :highlight='0' :fixed='true' :cadastrar="false"></navbar>
                <topico
                titulo="Automatize seu cadastro com o SUAP"
                conteudo="
                  Agora, a Semente está integrada com a API do SUAP, permitindo que os alunos simplifiquem o processo de inscrição. Com essa integração, tudo se torna mais rápido e seguro, economizando tempo e esforço.
              
                  Para aqueles que preferem fazer o registro manualmente, basta rolar para baixo...
                "
                :botao="{texto:'Utilizar', imagem: 'suaplogo.svg', callback : cadastroSUAP, estilo: 'btn-dark'}"
              />  
            </section>
            <section id="cadastro-conteudo">
                <form @submit.prevent="cadastroManual">
                    <img id="cadastro-logo" src="../assets/logo2.svg">
                    <h1>Criando sua conta</h1>
                    <label for="cadastro_matricula">Matricula: </label>
                    <input required type="text" class="form-control" id="cadastro_matricula"  placeholder="Digite sua matricula">
                    <label for="cadastro_nome">Nome completo: </label>
                    <input required type="text" class="form-control" id="cadastro_nome"  placeholder="Digite seu nome">
                    <label for="cadastro_email">Email: </label>
                    <input required type="email" class="form-control" id="cadastro_email"  placeholder="Digite seu email">
                    <label for="cadastro_senha">Senha: </label>
                    <input required type="password" class="form-control" id="cadastro_senha"  placeholder="Digite sua senha">
                    <label for="cadastro_confirmar_senha">Confirme sua senha: </label>
                    <input required type="password" class="form-control" id="cadastro_confirmar_senha"  placeholder="Confirme sua senha">
                    <button id="btn-cadastro" type="submit" class="btn btn-dark">Cadastrar</button>
                </form>
            </section>
        </div>

        
    </div>
  </template>
  
  <style scoped>
  #cadastro {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    #cadastro-main{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    #cadastro-conteudo{
        min-height: 100vh;
        color: white;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        #cadastro-logo{
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
            #btn-cadastro{
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
  import { inject } from 'vue';
  
  export default {
    name: 'cadastro',
    components: {
      navbar,
      introducao,
      topico,
    },
    data() {
      return {
        suap: null,
        servidor: inject('servidor'),
        site: inject('site'),
      };
    },
    mounted() {
      // Inicializa o cliente SUAP
      this.suap = new SuapClient(
        "https://suap.ifrn.edu.br",
        'SECRET_KEY_HERE',
        this.site + '/cadastro/suap',
        'identificacao email'
      );
      this.suap.init();
    },
    methods: {
      cadastroSUAP() {
        // Lógica para autenticação do usuário
        const cadastroURL = this.suap.getLoginURL();
        console.log('URL de cadastro do SUAP:', cadastroURL);
        window.location.href = cadastroURL; // Redireciona para a página de cadastro do SUAP
      },
      async cadastroManual() {
        // Lógica para o cadastro manual do usuário
        console.log('Cadastrando manualmente');
        let matricula = document.getElementById('cadastro_matricula').value;
        let nome = document.getElementById('cadastro_nome').value;
        let email = document.getElementById('cadastro_email').value;
        let senha = document.getElementById('cadastro_senha').value;
        let confirmar_senha = document.getElementById('cadastro_confirmar_senha').value;

        if (matricula == '' || nome == '' || email == '' || senha == '' || confirmar_senha == '') {
          alert('Preencha todos os campos!');
          return;
        }
        if (senha != confirmar_senha) {
          alert('As senhas precisam ser iguais!');
          return;
        }
        const dados = {
          matricula: matricula,
          nome: nome,
          email: email,
          senha: senha,
        };
        try{
            const cadastrando = await fetch(this.servidor + '/cadastro/usuario', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(dados),
            }).then((response) => {
                return response.json();
            });
            if (cadastrando.status == "OK") {
                    this.$notify({ type: "success", title: "Usuário cadastrado com sucesso" });
                    setTimeout(() => {
                        window.location.href = "login";
                    },2000)
            }else{
                this.$notify({ type: "error", title: "Erro ao cadastrar o usuário" });
            }

        }catch{

        }

      },
    },
  };
  </script>
  