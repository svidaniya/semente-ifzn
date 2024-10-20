<template>
    <div id="storytelling">
        <div class="scroller">
            <section class="vh-100" id="storytelling-main">
                <navbar :highlight='1' :fixed='true'></navbar>
                <div id="storytelling-main-conteudo">
                    <introducao titulo='Storytelling' conteudo='Aqui você terá acesso ao storytelling que acontece durante o evendo da semente.'></introducao>
                </div>
            </section>
            <section id="storytelling-capitulos">
                <div id="storytelling-capitulos-conteudo">
                    <h3>As desventuras afortunadas de Trevo pelos biomas do Brasil</h3>
                    <div id="storytelling-capitulos-conteudo-capitulos">
                        <button   v-for="capitulo in capitulos_data" @click="irParaCapitulo(capitulo.numero)" :disabled="!capitulo.possui" class="styorytelling-capitulo btn"><img class="styorytelling-capitulo-logo" :src="'src/assets/' + capitulo.icone_valor">Capitulo {{capitulo.numero}}</button>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<style>
    #storytelling {
        background-color: #1F6363;
        width: 100%;
        #storytelling-main{
            width: 100%;
            display: flex;
            flex-direction: column; 
            align-items: center;
            #storytelling-main-conteudo{
                width: 80% !important;
                

            }
        }

        #storytelling-capitulos{
            width: 100%;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: #30B493;
            #storytelling-capitulos-conteudo{
                width: 80% !important;
                color: white;
                display: flex;
                flex-direction: column;
                align-items: center;
                h3{
                    margin-top: 150px;
                    text-align: center;
                    max-width: 50%;
                }

                #storytelling-capitulos-conteudo-capitulos{
                    margin-top: 50px;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    .styorytelling-capitulo{
                        font-size: 20px;
                        font-weight: bold;
                        font-family: 'Lato';
                        width: 200px;
                        height: 50px;
                        margin: 15px;
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        justify-content: center;
                        text-align: center;
                        background-color: white;
                        color: #1F6363;
                        transition: 200ms linear;
                        .styorytelling-capitulo-logo{
                            width: 25px;
                            margin-right: 25px;
                            
                        }
                    }
                    .styorytelling-capitulo:hover{
                        scale: 1.1;
                        transition: 200ms linear;
                        cursor: pointer;
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
    export default {
        name: 'storytelling',
        components: {
            navbar,
            introducao
        },
        props: {
        },
        data() {
            return {
                servidor: inject('servidor'),
                capitulos_data: {},
                usuario : inject('usuario'),
                atualizarUsuario: inject('atualizarUsuario'),
                ativo : false
            }
        },
        methods: {
            irParaCapitulo(capitulo) {
                location.href = '/storytelling/capitulo/' + capitulo
            },
            async get_capitulos() {
                var usuario = inject('usuario')
                var servidor = inject('servidor')
                const response = await fetch(servidor + '/capitulos_disponiveis', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                    matricula: usuario.dados.matricula,
                    token: usuario.token
                    })
                }).then(response => response.json())
                const _data = response
                if(_data.status == 'OK') {
                    console.log(_data.capitulos)
                    this.capitulos_data = _data.capitulos
                    this.ativo = true
                }else{
                    this.$notify({ type: "error", title: "Calma lá!", text: _data.mensagem });
                }
            }
        },
        mounted() {
            this.atualizarUsuario()
            this.get_capitulos()
        }
    }
</script>