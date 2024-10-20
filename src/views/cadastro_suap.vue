<template>
    <div id="cadastro_suap">
        <div class="scroller">
            <section id="cadastro-conteudo">
                <form @submit.prevent="cadastroSuap">
                    <img id="cadastro-logo" src="../assets/logo2.svg">
                    <h1>Olá {{this.dados.nome}}, Vamos escolher uma senha...</h1>
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
  #cadastro_suap {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
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
                font-size: 40px;
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
    name: 'cadastro_suap',
    components: {
      navbar,
      introducao,
      topico,
    },
    data() {
      return {
        suap: null,
        servidor: inject('servidor'),
        dados: {
            
        }
      };
    },
    mounted() {
      // Inicializa o cliente SUAP
      this.suap = new SuapClient(
        "https://suap.ifrn.edu.br",
        'sOcB9UZvCic313AFax4plVphNTmVQTdVER9H4QG5',
        'http://localhost:5173/cadastro/suap',
        'identificacao email'
      );
      this.suap.init();
      this.getDados();
    },
    methods: {
        getDados() {
            if (this.suap.isAuthenticated()) {
            const scope = this.suap.getToken().getScope();
            this.suap.getResource(scope, (response) => {
                if (response) {
                    this.dados = response;
                } else {
                    alert("Nenhum dado encontrado.");
                }
            });
            } else {
             alert("Você precisa estar autenticado para ver os dados.");
            }
        },
      async cadastroSuap() {
        // Lógica para o cadastro manual do usuário

        let matricula = this.dados.identificacao;
        let nome = this.dados.nome;
        let email = this.dados.email_academico;          ;
        let senha = document.getElementById('cadastro_senha').value;
        let confirmar_senha = document.getElementById('cadastro_confirmar_senha').value;
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
                        window.location.href = "/login";
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
  