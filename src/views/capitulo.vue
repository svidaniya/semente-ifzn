<template>
    <div id="capitulo">
        <div class="scroller">
            <section class="vh-100" id="capitulo-main">
                <navbar :highlight='1' :fixed='true'></navbar>
                <div id="capitulo-main-conteudo">
                    <img id="capitulo-icone":src="'/src/assets/' + capitulo_data.icone_valor" src="">
                    <h3 id="capitulo-titulo">{{capitulo_data.titulo}}</h3>
                    <div id="capitulo-conteudo" v-html="renderedMarkdown">

                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<style>
    #capitulo {
        background-color: #1B6666;
        width: 100%;
        #capitulo-main{
            width: 100%;
            min-height: max-content;
            display: flex;
            flex-direction: column; 
            align-items: center;
            #capitulo-main-conteudo{
                font-family: 'Lato';
                width: 80% !important;
                margin-top: 150px;
                color: white;
                display: flex;
                flex-direction: column;
                align-items: center;
                #capitulo-icone{
                    width: 150px;

                }
                #capitulo-titulo{
                    margin-top: 50px;
                    text-align: center;
                    font-weight: bold;
                    border-bottom: rgba(255, 255, 255, 0.418) solid 1px;
                    padding-bottom: 10px;
                    width: max-content;
                    font-size: 45px;
                }
                #capitulo-conteudo{
                    margin-top: 50px;
                    margin-bottom: 150px;
                    width: 80%;
                    text-align: justify;
                    p{
                        text-indent: 20px;
                    }
                    a{
                        color: #FBEE8A;
                        
                    }
                }
            }
        }

      

    } 
</style>
<script>
    import navbar from '../components/navbar.vue'
    import introducao from '@/components/introducao.vue';
    import { inject } from 'vue';
    import { marked } from 'marked';
    export default {
        name: 'capitulo',
        components: {
            navbar,
            introducao
        },
        props: {
            ['numero']: {String, default: '-1'},
        },
        data() {
            return {
                servidor: inject('servidor'),
                capitulo_data : {},
                checkUsuario: inject('checkUsuario'),
                checkToken: inject('checkToken'),
                usuario : inject('usuario'),
                atualizarUsuario: inject('atualizarUsuario')
            }
        },
        async mounted() {
            if(this.checkUsuario() && this.checkToken()) {
                this.atualizarUsuario();
                this.get_capitulo();
            }
        },
        computed: {
        renderedMarkdown() {
            // Verifica se o conteúdo está definido e não é nulo
            if (this.capitulo_data && this.capitulo_data.valor) {
            return marked(this.capitulo_data.valor);
            } else {
            return ''; // Retorna uma string vazia até o conteúdo ser carregado
            }
        }
        },
        methods: {
            checkUsuario() {
                this.checkUsuario();
            },
            checkToken() {
                this.checkToken();
            },
            atualizarUsuario() {
                this.atualizarUsuario();
            },

            async get_capitulo() {
                var usuario = inject('usuario')
                var servidor = inject('servidor')
                const response = await fetch(servidor + '/capitulo/', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                    capitulo: this.$props['numero'],
                    matricula: usuario.dados.matricula,
                    token: usuario.token
                    })
                }).then(response => response.json())
                const _data = response
                if(_data.status == 'OK') {
                    this.capitulo_data = _data.capitulo
                    console.log(this.capitulo_data)
                }else{
                    this.$notify({ type: "error", title: "Calma lá!", text: _data.mensagem });
                }
            }
        }
    }
</script>