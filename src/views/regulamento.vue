<template>
    <div id="regulamento">
        <div class="scroller">
            <section class="vh-100" id="regulamento-main">
                <navbar :highlight='2' :fixed='true'></navbar>
                <div id="regulamento-main-conteudo">
                    <introducao titulo='Regulamento' conteudo='Aqui Você pode tirar as suas dúvidas sobre a gamificação que acontece durante o evendo da semente. '></introducao>
                </div>
            </section>
            <section v-for="regulamento in regulamentos" class="vh-100">
                <topico

                :titulo="regulamento.titulo"
                :conteudo="regulamento.texto"
                :imagem="regulamento.imagem_url ? regulamento.imagem_url : undefined"

                />

            </section>
           
            <section id="regulamento-premios">
                <h1>Quais são as premiações?</h1>
                <div id="regulamento-premios-cards">
                    <premio v-for="premio in premios" :pontos="premio.pontos" :premios="premio.premios"/>
                </div>

            </section>
            <section class="vh-100">
                <topico 
                imagem="logo2.svg"
                titulo="Regulamento completo"
                conteudo="Para ter acesso ao regulamento completo acesse esse link"
               :botao="{ texto: 'regulamento.pdf', href: 'https://drive.google.com/file/d/1wE1i8J7oGfXKuWj0nX8H2fY5v7T7jI0U/view?usp=sharing',nova_janela: true }"
                />
               
                

            </section>
        </div>

    </div>
</template>

<style>
    #regulamento{
        width: 100%;
        #regulamento-main{
            width: 100%;
            display: flex;
            flex-direction: column; 
            align-items: center;
            #regulamento-main-conteudo{
                width: 80% !important;
            }
        }
        #regulamento-premios{
            background-color: #3DBB99;
            color : white;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-evenly;
            h1{
                margin-top: 100px;
                margin-bottom: 50px;
            }
            #regulamento-premios-cards{
                display: flex;
                flex-direction: row;
                justify-content: space-evenly;
                max-width: 80%;
                flex-wrap: wrap;
                margin-bottom: 150px;

            }
            
        }
        
    }
</style>

<script>
    import introducao from '../components/introducao.vue'
    import navbar from '../components/navbar.vue'
    import topico from '../components/topico.vue'
    import premio from '../components/premio.vue'
    import { inject } from 'vue'

    export default {

        name: 'regulamento',
        components: {
            navbar,
            introducao,
            topico,
            premio
        },
        data() {
            return {
                servidor: inject('servidor'),
                premios: [],
                regulamentos : []
            }
        },
        methods: {
            async fetchpremios() {
                const premios_data = await fetch(this.servidor + '/premios').then(response => response.json());
                console.log(premios_data.premios);
                this.premios = premios_data.premios;
            },
            async fetchRegulamentos() {
                const regulamentos_data = await fetch(this.servidor + '/regulamentos').then(response => response.json());
                console.log(regulamentos_data.regulamentos);
                this.regulamentos = regulamentos_data.regulamentos;
            }
        },
        mounted() {
            this.fetchpremios();
            this.fetchRegulamentos();
        }

    }
</script>