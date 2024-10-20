<template>
    <div id="pontuacao">
        <div class="scroller">
            <section class="vh-100" id="pontuacao-main">
                <navbar :highlight='3' :fixed='true'></navbar>
                <div id="pontuacao-main-conteudo">
                    <introducao titulo='Pontuação' conteudo='Aqui Você poderá acompanhar a sua pontuação e como está indo na gamificação!' imagem='logo2.svg'></introducao>
                </div>
            </section>
            <section v-if="this.usuario.dados" class="vh-100" id="pontuacao-jogador">
                <h1>Perfil do jogador</h1>
                <div id="pontuacao-jogador-dados">
                    <p><b>Nome:</b> {{this.usuario.dados.nome}}</p>
                    <p><b>Matricula:</b> {{this.usuario.dados.matricula}}</p>
                    <p><b>Pontuação:</b> {{this.usuario.dados.pontuacao}}</p>
                    <p><b>Desafios resolvidos:</b> {{this.usuario.dados.desafio - 1}}</p>
                    <p><b>Eventos participados:</b> {{this.usuario.dados.participou}}</p>


                </div>
            </section>
            <section id="pontuacao-placar">
                <img id="trofeu" src="../assets/trofeu.svg">
                <h2 class="pontuacao-placar-titulo">Ranking</h2>
                <table id="pontuacao-jogador-pontuacao">
                    <thead>
                        <tr>
                            <th><h2>Jogador</h2></th>
                            <th><h2>Pontuação</h2></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr :style="{backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#247474'}" v-for="(_usuario, index) in usuarios" :key="_usuario">
                            <td>
                                <p :class="{ 'heartbeat': _usuario.matricula === usuario.dados.matricula }" :style="{ color: index % 2 === 0 ? '#247474' : '#FFFFFF'}">{{_usuario.matricula}}  <br> {{_usuario.nome}}</p>
                            </td>
                            <td>
                                <div :class="{ 'heartbeat': _usuario.matricula === usuario.dados.matricula }" style="display: flex; flex-direction: row ; align-items: center; justify-content: center">
                                    <p  :style="{ color: index % 2 === 0 ? '#247474' : '#FFFFFF'}">{{ _usuario.pontuacao }}</p>
                                    <img class="jogador-medalha" v-if="index === 0" src="../assets/ouro.svg">
                                    <img class="jogador-medalha" v-else-if="index === 1" src="../assets/prata.svg">
                                    <img class="jogador-medalha" v-else-if="index === 2" src="../assets/bronze.svg">
                                </div>
                              
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
    </div>
</template>

<style scoped>
    #pontuacao{
        width: 100%;
        #pontuacao-main{
            width: 100%;
            display: flex;
            flex-direction: column; 
            align-items: center;
            #pontuacao-main-conteudo{
                width: 80% !important;
            }
        }
        #pontuacao-jogador{
            font-family: 'Lato';
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: white;
            h1{
                margin-bottom: 50px;
                border-bottom: #FAED7E solid 3px;
                padding-bottom: 10px;
            }
            #pontuacao-jogador-dados{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                p{
                    width: 350px;
                    border-bottom: white solid 1px;
                    padding-bottom: 5px;
                    margin: 0;
                    margin-top: 10px;
                    margin-bottom: 10px;
                }
            }
        }
        #pontuacao-placar{
            background-color: #30B493;
            font-family: 'Lato';
            width: 100%;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            #trofeu{
                width: 70px;
                margin-top: 100px;
                margin-bottom: 35px;
            }
            .pontuacao-placar-titulo{
                color: white;
                border-bottom: 3px solid #1B6666;
                padding-bottom: 15px;
                width: 150px;
                text-align: center
            }
            #pontuacao-jogador-pontuacao {
                width: 80%;
                margin-top: 50px;
                border-collapse: collapse;
                text-align: center;
                border-collapse: separate;
                border-spacing: 0 15px; /* Adiciona 15px de espaço vertical entre as linhas */
                p{
                    margin: 0;
                }
                .highlighted-row {
                    scale: 1;
                }
                .jogador-medalha{
                    width: 25px;
                }
            }

            #pontuacao-jogador-pontuacao tr td:first-child {
                border-top-left-radius: 40px;
                border-bottom-left-radius: 40px;
                overflow: hidden; /* Garante que o conteúdo não ultrapasse as bordas */
            }
            
            /* Células da última coluna (Pontuação) com borda arredondada à direita */
            #pontuacao-jogador-pontuacao tr td:last-child {
                border-top-right-radius: 40px;
                border-bottom-right-radius: 40px;
                overflow: hidden;
            }
            #pontuacao-jogador-pontuacao th, 
            #pontuacao-jogador-pontuacao td {
                padding: 15px;
                
            }
            
            #pontuacao-jogador-pontuacao th {
                color: #FAED7E;
            }
            
            #pontuacao-jogador-pontuacao td {
                color: #247474;
            }
            #pontuacao-jogadores{
                margin-top: 50px;
                width: 80%;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
            }
        }
    }
</style>

<script>
import navbar from '../components/navbar.vue'
import introducao from '@/components/introducao.vue';
import jogador from '@/components/jogador.vue';
import { inject } from 'vue';
export default {
    name: 'pontuacao',
    components: {
        navbar,
        introducao,
        jogador
    },
    data () {
        return {
            servidor: inject('servidor'),
            usuario : inject('usuario'),
            atualizarUsuario: inject('atualizarUsuario'),
            usuarios: []
        }
    },
    methods: {
        async carregar_usuarios() {

            const response = await fetch(this.servidor + '/usuarios').then(response => response.json());
            this.usuarios = response.usuarios


        },
        async _atualizarUsuario() {
            this.atualizarUsuario()
        }
    },
    mounted() {
        this.carregar_usuarios()
        if(this.usuario.dados){
            this._atualizarUsuario()
        }

        
    }
}
</script>