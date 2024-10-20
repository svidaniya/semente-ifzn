<template>
    <div id="programacao">
        <div class="scroller">
            <section class="vh-100" id="programacao-main">
                <navbar :highlight='4' :fixed='true'></navbar>
                <evento v-if="eventos.length > 0" 
                :dia="eventos[0].dia"
                :mes="eventos[0].mes_texto"
                :hora="eventos[0].horario_inicio"
                :organizador="eventos[0].organizador"
                :local="eventos[0].local"
                :horario="[eventos[0].horario_inicio, eventos[0].horario_termino]"
                :titulo="eventos[0].titulo"
                :subtitulo="eventos[0].subtitulo"
                :informacoes="eventos[0].informacoes_adicionais ? eventos[0].informacoes_adicionais : ''"
                :pontuacao="eventos[0].pontuacao"

                
                />
            </section>
            <section v-if="eventos.length > 1" v-for="(event, index) in eventos.slice(1)" class="vh-100">
                <evento
                :dia="event.dia"
                :mes="event.mes_texto"
                :hora="event.horario_inicio"
                :organizador="event.organizador"
                :local="event.local"
                :horario="[event.horario_inicio, event.horario_termino]"
                :titulo="event.titulo"
                :subtitulo="event.subtitulo"
                :informacoes="event.informacoes_adicionais ? event.informacoes_adicionais : ''"
                :invertido="index % 2 == 0"
                :pontuacao="event.pontuacao"
                />
            </section>
            
        </div>

    </div>
</template>

<style>
    #programacao{
        width: 100%;
        #programacao-main{
            width: 100%;
            display: flex;
            flex-direction: column; 
            align-items: center;
        }
    }
</style>

<script> 
import navbar from '../components/navbar.vue'
import evento from '../components/evento.vue'
import { inject } from 'vue';
import Evento from '../components/evento.vue';
export default {
    name: 'programacao',
    components: {
        navbar,
        evento
    },
    data() {
        return {
            sevidor : inject('servidor'),
            eventos : []
        }
    }
    ,mounted() {
       
        this.fetchEventos();
    }
    ,methods: {
       
        async fetchEventos() {
            const eventos = await fetch(this.sevidor + '/eventos').then(response => response.json());
            console.log(eventos.eventos);
            this.eventos = eventos.eventos;
        }
    }
}
</script>