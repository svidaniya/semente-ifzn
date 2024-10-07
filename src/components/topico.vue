<template>
    <div  id="topico">
        <div id="topico-bordas-esquerda">
            <img class="tl" :src="inverse ? 'src/assets/borday.png' : 'src/assets/bordab.png'">
            <img class="bl" :src="inverse ? 'src/assets/bordab.png' : 'src/assets/borday.png'">
        </div>
        <div id="topico-conteudo">
            <img class="topico-imagem" :src="imagem ? 'src/assets/' + imagem : 'src/assets/logo2.svg'">
            <div id="topico-texto">
                <h1>{{titulo}}</h1>
                <p>{{conteudo}}</p>
                <a style="max-width: 50%; margin-top: 40px" v-if="botao && botao.href"  :target="botao.nova_janela ? '_blank' : ''" :style="{display: botao ? 'block' : 'none'}" :class="botao.estilo ? 'btn ' + botao.estilo : 'btn btn-success'" :href="botao.href" role="button">{{botao.texto}}<img v-if="botao.imagem" :src="botao.imagem ? 'src/assets/' + botao.imagem : ''"></a>
                <button  @click="botao.callback ? botao.callback() : ''"  v-if="botao && !botao.href" id="btn-login" type="button" :class="botao.estilo ? 'btn ' + botao.estilo : 'btn btn-success'">{{botao.texto}}<img v-if="botao.imagem" :src="botao.imagem ? 'src/assets/' + botao.imagem : ''"></button>
            </div>

        </div>
        <div id="bordas-direita">
            <img class="tr" :src="inverse ? 'src/assets/bordab.png' : 'src/assets/borday.png'">
            <img class="br" :src="inverse ? 'src/assets/borday.png' : 'src/assets/bordab.png'">
        </div>
    </div>
</template>

<style>
    #topico
    {
        padding: 5%;
        color: white;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        #topico-bordas-esquerda{
            width: 10%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .tl{
                transform: scaleX(-1);
            }   
            .bl{
                transform: scale(-1, -1);
            }  
        }
        #topico-conteudo{
            width: 80% !important;
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            align-items: center;
            .topico-imagem{
                max-width: 15%;
                height:fit-conteudo;
            }
            #topico-texto{
                max-width: 60%;
                h1{
                    margin-bottom: 25px;
                }
                p{
                    white-space: pre-line;
                    text-align: justify;
                }
                a{
                    img{
                        width: 50px;
                        margin-left: 10px;
                    }
                }
                button{
                    img{
                        width: 50px;
                        margin-left: 10px;
                    }
                }
            }
        }
        #bordas-direita{
            width: 10%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .br{
                transform: scale(1, -1);
            }

        }


    }
</style>

<script>
    export default {
        name: 'topico',
        props: {
            titulo: {
                type: String,
                default: 'Título'
            },
            conteudo: {
                type: String,
                default: 'Conteudo'
            },
            imagem: String,
            inverse: {
                type: Boolean,
                default: false
            },
            botao: {
                type: Object,
                default: null,
                Required: false},
        },

        data() {
            return {

            }
        }
    }
</script>