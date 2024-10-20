<template>
  <div id="app">
    <notifications position="bottom right"/>
    <router-view></router-view>
  </div>
</template>

<script>
import Cookies from 'js-cookie';
import { reactive } from 'vue';
export default {
  name: 'App',
  data() {
    return {
      servidor: 'https://sementeifrnzn.com.br:3000',
      usuario: reactive({dados: undefined}),
      site: 'https://sementeifrnzn.com.br',
    };
  },
  provide() {
    return {
      servidor: this.servidor,
      site: this.site,
      checkUsuario: this.checkUsuario,
      usuario: this.usuario,
      checkToken: this.checkToken,
      atualizarUsuario: this.atualizarUsuario,
      clearCookies: this.clearCookies
    };
  },
  methods: {
    async checkUsuario() {
      if(Cookies.get('usuario')) {
        return true   
      }else{
        this.$router.push('/login');
        return false
      }
    },
    async atualizarUsuario() {
      if (Cookies.get('usuario')) {
        const response = await fetch(this.servidor + '/usuario/' + this.usuario.dados.matricula, {
          method: 'GET'
        }).then((response) => {
          return response.json();
        });

        if (response.status == "OK") {
          this.usuario.dados = response.usuario;
          Cookies.set('usuario', JSON.stringify(response.usuario), { expires: 3 });
          return true;
        } else {
          this.clearCookies();
          this.$router.push('/login');
          return false;
        }
      }
    },
    clearCookies() {
      const allCookies = Cookies.get(); // Obtém todos os cookies

      // Itera sobre cada cookie e o remove
      for (const cookieName in allCookies) {
        Cookies.remove(cookieName); // Remove o cookie pelo nome
      }
    },
    async checkToken() {
      if(Cookies.get('semente_token') && Cookies.get('usuario')) {
        const response = await fetch(this.servidor + '/token_check', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({token: JSON.parse(Cookies.get('semente_token')),matricula : JSON.parse(Cookies.get('usuario')).matricula}),
        }).then((response) => {
          return response.json();
        })

        if(response.status == "OK") {
          return true
        }else{
          this.clearCookies();
          window.location.href = "/login";
          return false
        }
      }else{
        this.clearCookies();
        window.location.href = "/login";
        return false
      }
    }
  },
  mounted() {
    if(Cookies.get('usuario')) {
      
      this.usuario.dados = JSON.parse(Cookies.get('usuario'));
      this.usuario.token = JSON.parse(Cookies.get('semente_token'));
    }
  }
};
</script>

<style>

</style>
