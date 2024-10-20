<template>
    <div :style="{position: fixed ? 'fixed' : 'relative',opacity: fixed ? 0.2 : 1,transition: fixed ? '200ms linear' : ''}" id="navbar">
        <a id="navbar-logo-link" href="/"><img id="navbar-logo" src="../assets/semente-logo.png"></a>
        <div id="navbar-links">
            <a class="navbar-link" v-for="(link, index) in links" :href="link[1]" :class="index == highlight ? 'highlight' : ''">{{link[0]}}</a>
        </div>
        <div v-if="this.usuario.dados == undefined" id="navbar-buttons">
            <a href="/login" role="button" v-if="login" id="btn-login" type="button" class="btn btn-success">Entrar</a>
            <a href="/cadastro" role="button" v-if="cadastrar" id="btn-register" type="button" class="btn btn-dark">Cadastrar</a>

        </div>
        <div v-if="this.usuario.dados != undefined" id="navbar-buttons">

            <button @click="logout" href="/cadastro" id="btn-logout" type="button" class="btn btn-dark">Logout</button>

        </div>
    </div>
</template>

<style>
    #navbar {
        align-self: center;
        width: 80%;
        height: 100px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        text-align: center;
        #navbar-logo-link{
            margin: 0;
            max-width: 20%;
            height: 65%;
            text-align: center;
            #navbar-logo{
                align-self: center;
                width: 100%;
                height: 100%;
            }
        }
        #navbar-buttons{
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            width: 20%;
            button{
                max-width: 45%;
            }
        }

        .navbar-link{
            color: white;
            font-size: 14px;
            margin: 5px;
        }
        .navbar-link:hover{
            border-bottom: 4px #FBEE8A solid;
            transition: 200ms linear;
            scale: 1.1;
        }
        .navbar-link, .navbar-link:hover, .navbar-link:active, .navbar-link:visited, .navbar-link:focus {
            text-decoration:none;
        }

        #navbar-links{
            font-size: 15px;
            width: 45%;
            font-family: 'Roboto', sans-serif;
            display: flex;
            flex-direction: row;
            justify-content: space-between;

        }

        .highlight{
            padding-bottom: 5px;
            border-bottom: 4px #FBEE8A solid;
        }
    }
    #navbar:hover{
        opacity: 1 !important;
    }


</style>

<script>
import { inject } from 'vue';

    export default {
        name: 'navbar',
        props: {
          highlight: Number,
          fixed: Boolean,
          login: {
            type: Boolean,
            default: true
          },
          cadastrar: {
            type: Boolean,
            default: true
          },
        },
        data() {
            return {
                links: [
    
                    ['Gamificação', '/gamificacao'], 
                    ['Storytelling', '/storytelling'], 
                    ['Regulamento', '/regulamento'], 
                    ['Pontuação', '/pontuacao'], 
                    ['Programação', '/programacao']
                    
                ],
                usuario : inject('usuario'),
                clearCookies: inject('clearCookies')
            }
        },
        methods: {
            logout() {
                this.clearCookies();
                window.location.href = "/";
            }
        }
    }
</script>