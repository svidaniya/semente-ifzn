<template>
    <div id="desafio">
        <navbar :highlight='1' :fixed='false'></navbar>
        <div id="desafio-conteudo">
            <div id="desafio-numero">
                <h1 id="desafio-numero-texto">Desafio {{numero}}</h1>
                <img id="desafio-numero-selo" src="../assets/desafioselo.svg">
            </div>

            <img v-if="imagem" id="desafio-conteudo-imagem" :src="'src/assets/' + imagem">

            <div id="desafio-conteudo-texto">
                <p>{{texto}}</p>
            </div>

            <h1 id="desafio-conteudo-descricao">Descrição</h1>

            <div id="desafio-conteudo-descricao-texto">
                <p>{{descricao}}</p>
            </div>

            <form>
                <div id="desafio-conteudo-form" class="form-group">
                    <label for="desafio-conteudo-resposta">Resposta: </label>
                    <div id="desafio-conteudo-form-input">
                        <input type="text" class="form-control" id="desafio-conteudo-resposta">
                        <button type="submit" class="btn btn-dark">Enviar</button>
                    </div>
                </div>
            </form>


        </div>
    </div>
</template>

<style>
    #desafio{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #30B493;
        min-height: 100vh;
        #desafio-conteudo{
            
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            #desafio-numero{
                margin: 50px;
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
                align-items: center;
                justify-content: center;
                color: #1B6666;
                #desafio-numero-texto{
                    font-size: 30px;
                    padding: 0;
                    margin: 0;
                    margin-bottom: 20px;
                    z-index: 1;
                }
                #desafio-numero-selo{
                    width: 350px;
                    position: absolute;
                    z-index: 0;
                }
                margin-bottom: 75px;
            }

            #desafio-conteudo-texto{
                background-color: #1B6666;
                color: white;
                width: 60%;
                border-radius: 40px;

                p{
                    font-family: 'Lato';
                    margin: 50px;
                    text-align: justify;
                    font-size: 20px;
                }
            }
            #desafio-conteudo-descricao{
                color: white;
                font-size: 30px;
                margin-top: 50px;
                margin-bottom: 20px;
                border-bottom: #1B6666 3px solid;
                padding-bottom: 10px;
                width: 250px;
                text-align: center;
                margin-bottom: 75px;
            }

            #desafio-conteudo-descricao-texto{
                background-color: white;
                color: #1B6666;
                width: 60%;
                border-radius: 40px;
                p{
                    font-family: 'Lato';
                    margin: 50px;
                    text-align: justify;
                    font-size: 20px;
                }
                margin-bottom: 75px;
            }

            #desafio-conteudo-imagem{
                width: 60%;
                margin-bottom: 75px;
            }
            #desafio-conteudo-form{
                width: 60vw;
                margin-bottom: 75px;
                label{
                    color: white;
                    font-size: 20px;
                    margin-bottom: 25px;
                }
            }
            #desafio-conteudo-form-input{
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                width: 100%;
            }
        }
    }
</style>

<script>
import navbar from '../components/navbar.vue'

export default {
    name: 'desafio',
    components: {
        navbar
    },
    props: {
        ['numero']: {String, default: '-1'},
        texto : {String, default: 'Texto'},
        imagem : {String, default: undefined},
        descricao : {String, default: 'Descricão'},
    }
}
</script>