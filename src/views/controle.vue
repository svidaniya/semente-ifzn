<template>
    <div id="controle" :class="tema">
        <div class="scroller">

            <section id="controle-main" class="vh-100">
                <navbar :highlight='0' :fixed='false'></navbar>
                <div id="controle-main-conteudo">
                    <introducao
                     :titulo='"Bem-vindo(a), " + this.usuario.dados.nome + "!"'
                     conteudo='Aqui você pode gerenciar todas as operações do evento SEMENTE, incluindo a criação e a exclusão de itens essenciais.'
                     imagem='logo2.svg'></introducao>   
                </div>
            </section>

            <section class="vh-100">
                <topico
                titulo="Gerenciamento de Eventos"
                conteudo="Nesta seção, você poderá visualizar, criar e excluir eventos que serão apresentados no site. Mantenha a programação atualizada para todos os participantes!"
                />
            </section>

            <section class="vh-100 tela-controle">
                <button v-if="this.controlando != 'eventos'" class="btn btn-warning tela-controle-btn" @click="this.controlando = 'eventos'">Gerenciar Eventos</button>
                <controle_eventos v-if="this.controlando == 'eventos'"></controle_eventos>
            </section>

            <section class="vh-100">
                <topico
                titulo="Gerenciamento de Prêmios"
                conteudo="Nesta seção, você pode adicionar novos prêmios, editar os existentes ou excluí-los. Mantenha os prêmios atraentes para incentivar a participação!"
                />
            </section>

            <section class="vh-100 tela-controle">
                <button v-if="this.controlando != 'premios'" class="btn btn-warning tela-controle-btn" @click="this.controlando = 'premios'">Gerenciar Prêmios</button>
                <controle_premios v-if="this.controlando == 'premios'"></controle_premios>
            </section>

            <section class="vh-100">
                <topico
                titulo="Gerenciamento de Desafios"
                conteudo="Aqui você pode visualizar e criar novos desafios, bem como remover aqueles que não estão mais em uso. Desafios interessantes são fundamentais para o engajamento!"
                />
            </section>

            <section class="vh-100 tela-controle">
                <button v-if="this.controlando != 'desafios'" class="btn btn-warning tela-controle-btn" @click="this.controlando = 'desafios'">Gerenciar Desafios</button>
                <controle_desafio v-if="this.controlando == 'desafios'"></controle_desafio>
            </section>

            <section class="vh-100">
                <topico
                titulo="Gerenciamento de Regulamentos"
                conteudo="Nesta seção, você pode criar e editar regulamentos que guiarão a participação no evento. Certifique-se de que todas as regras estejam claras e acessíveis!"
                />
            </section>

            <section class="vh-100 tela-controle">
                <button v-if="this.controlando != 'regulamentos'" class="btn btn-warning tela-controle-btn" @click="this.controlando = 'regulamentos'">Gerenciar Regulamentos</button>
                <controle_regulamentos v-if="this.controlando == 'regulamentos'"></controle_regulamentos>
            </section>

            <section class="vh-100">
                <topico
                titulo="Gerenciamento de Imagens"
                conteudo="Nesta seção, você pode adicionar novas imagens, editar os existentes ou excluí-los. Mantenha as imagens atualizadas para todos os participantes!"
                />
            </section>

            <section class="vh-100 tela-controle">
                <button v-if="this.controlando != 'imagens'" class="btn btn-warning tela-controle-btn" @click="this.controlando = 'imagens'">Gerenciar Imagens</button>
                <controle_imagens v-if="this.controlando == 'imagens'"></controle_imagens>
            </section>

            <section class="vh-100">
                <topico
                titulo="Gerenciamento de Capitulos"
                conteudo="Nesta seção, você pode adicionar novos capitulos, editar os existentes ou excluí-los. Mantenha os capitulos atualizados para todos os participantes!"
                />
            </section>

            <section class="vh-100 tela-controle">
                <button v-if="this.controlando != 'capitulos'" class="btn btn-warning tela-controle-btn" @click="this.controlando = 'capitulos'">Gerenciar Capitulos</button>
                <controle_capitulos v-if="this.controlando == 'capitulos'"></controle_capitulos>
            </section>

            <section id="controle-tema" class="vh-100">
                <h1>Experimente um Tema Diferente!</h1>
                <div id="controle-tema-buttons">
                    <button style="background-color: white; color: #3DBB99;" class="btn" @click="setTema('semente')">Semente</button>
                    <button style="background-color: black; color: lawngreen;" class="btn" @click="setTema('hacker')">Hacker</button>
                    <button style="background-color: #282a36; color: #50fa7b;" class="btn" @click="setTema('dracula')">Dracula</button>
                    <button style="background-color: #4c4c4c; color: white;" class="btn" @click="setTema('classic')">Classic</button>
                    <button style="background-color: white; color: black;" class="btn" @click="setTema('wii')">Wii</button>
                </div>
            </section>
            
        </div>

    </div>
</template>


<style scoped>
    #controle{
        width: 100%;
        #controle-main{
            width: 100%;
            display: flex;
            flex-direction: column; 
            align-items: center;
            #controle-main-conteudo{
                width: 80% !important;
            }
        }
        .tela-controle{
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        #controle-tema{
            color: white;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            button{
                margin: 25px;
                width: 100px;
            }
        }

}
</style>

<script>
import navbar from '../components/navbar.vue'
import introducao from '@/components/introducao.vue';
import evento from '@/components/evento.vue';
import controle_eventos from '@/components/controle/controle_eventos.vue';
import topico from '@/components/topico.vue';
import controle_premios from '@/components/controle/controle_premios.vue';
import controle_desafio from '@/components/controle/controle_desafio.vue';
import controle_regulamentos from '@/components/controle/controle_regulamentos.vue';
import controle_imagens from '@/components/controle/controle_imagens.vue';
import controle_capitulos from '@/components/controle/controle_capitulos.vue';
import { inject } from 'vue';
export default {
  name: 'Controle',
  components: {controle_capitulos, navbar, introducao, evento, controle_eventos, topico, controle_premios, controle_desafio, controle_regulamentos, controle_imagens },
  data() {
    return {
        tema: 'classic',
        controlando: 'eventos',
        usuario: inject('usuario'),
        atualizarUsuario: inject('atualizarUsuario')
    }
  },
  methods: {
        setTema(novoTema) {
            this.tema = novoTema; 
            this.$notify({text: "Tema alterado com sucesso!", type: "success"});
        },
        setControle(novoControle) {
            this.controlando = novoControle;
        },
        _atualizarUsuario() {
            this.atualizarUsuario();
        }
    },
    mounted() {
        if(this.usuario.dados){ 
            this._atualizarUsuario();
            if(this.usuario.dados.nivel_acesso < 2){
                window.location.href = '/';
            } 
        }else{
            window.location.href = '/login';
        }

    }
  
};
  

</script>