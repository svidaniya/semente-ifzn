<template>
    <div id="login">
        <div class="scroller">
            <section id="login-main" class="vh-100">
                <navbar :highlight='0' :fixed='true' :login="false"></navbar>
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
  import { inject } from 'vue';
  import Cookies from 'js-cookie';

  export default {
    name: 'login',
    components: {
      navbar,
      introducao,
      topico,
    },
    data() {
      return {

        servidor: inject('servidor'),// Variável para armazenar a instância do cliente SUAP
      };
    },
    mounted() {

    },
    methods: {
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
            const response = await fetch(this.servidor + '/login', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(dados),
            }).then((response) => {
                return response.json();
            });

            console.log(response);
            if(response.status == "OK"){
                Cookies.set('semente_token', JSON.stringify(response.token),{ expires: 3});
                Cookies.set('usuario', JSON.stringify(response.usuario),{ expires: 3});
                window.location = '/';
            }else{
              this.$notify({ type: "error", title: "Usuário ou senha inválidos" });
            }
        }catch (error) {
            console.error(error);
        }

      },
    },
  };
  </script>
  