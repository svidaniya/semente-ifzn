<template>
    <div :class="{'ativo' : ativo}" id="desafio">
        <navbar :highlight='0' :fixed='false'></navbar>
        <div id="desafio-conteudo">
            <div id="desafio-numero">
                <h1 id="desafio-numero-texto" v-if="desafio_data.numero != 0">Desafio {{desafio_data.numero}}</h1>
                <h1 id="desafio-numero-texto" v-if="desafio_data.numero == 0">Desafio extra!</h1>

                <img id="desafio-numero-selo" src="../assets/desafioselo.svg">
            </div>

            <img v-if="desafio_data.imagem != ''" id="desafio-conteudo-imagem" :src="desafio_data.imagem">

            <div id="desafio-conteudo-texto">
                <p>{{desafio_data.texto}}</p>
            </div>

            <h1 id="desafio-conteudo-descricao">Descrição</h1>

            <div id="desafio-conteudo-descricao-texto">
                <p>{{desafio_data.descricao}}</p>
            </div>

            <form>
                <div id="desafio-conteudo-form" class="form-group">
                    <label for="desafio-conteudo-resposta">Resposta: </label>
                    <form @submit.prevent="enviarResposta" id="desafio-conteudo-form-input">
                            <input required type="text" class="form-control" id="desafio-conteudo-resposta">
                            <button type="submit" class="btn btn-dark">Enviar</button>
                    </form>
                    <p  v-if="desafio_data.capitulo_recomendado != 0" style="color:white; margin-top: 25px; font-style: italic">Recomendamos a leitura do 
                        <a  :href="'/storytelling/capitulo/' + desafio_data.capitulo_recomendado">
                          Capítulo {{ desafio_data.capitulo_recomendado }}.
                        </a>
                      </p>
                </div>
            </form>


        </div>
    </div>
</template>

<style>
    .ativo{
        filter : blur(0px) grayscale(0) brightness(1) !important;
    }
    #desafio{
        filter : blur(1px) grayscale(1) brightness(0.5);
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
                    font-size: 15px;
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
                    font-size: 15px;
                }
                margin-bottom: 75px;
            }

            #desafio-conteudo-imagem{
                max-width: 35%;
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
import { inject } from 'vue';
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
    },
    data() {
        return {
            servidor: inject('servidor'),
            desafio_data: {},
            usuario : inject('usuario'),
            atualizarUsuario: inject('atualizarUsuario'),
            ativo : false
        }
    },
    methods: {
        async get_desafio() {
            var usuario = inject('usuario')
            var servidor = inject('servidor')
            const response = await fetch(servidor + '/desafio/' + this.$props['numero'], {
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
            console.log(_data)

            
            if(_data.status == 'OK') {
                this.desafio_data = _data.desafio
                this.ativo = true

                
            }else{
                this.$notify({ type: "error", title: "Calma lá", text: _data.mensagem });
                setInterval(() => {
                    window.location.href = '/gamificacao'
                }, 3000)
            }
        },
        async enviarResposta() {
            const resposta = document.getElementById('desafio-conteudo-resposta').value
            const res = await fetch(this.servidor + '/responder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'resposta': resposta,
                    'desafio_numero': this.$props['numero'],
                    'matricula' : this.usuario.dados.matricula
                })
            }).then(response => response.json())
            if(res.status == 'OK') {
                this.$notify({ type: "success", title: "Resposta correta, parabens!",text:"Você ganhou " + res.recompensa + " pontos!" });
                if(res.capitulo_desbloqueado){
                    this.$notify({ type: "success", title: "Parabens você desbloqueou um novo capítulo!"});
                    setInterval(() => {
                        window.location.href = '/storytelling/capitulo/' + res.capitulo_desbloqueado
                    }, 4000)    
                }else{
                    setInterval(() => {
                        window.location.href = '/gamificacao'
                    }, 3000)
                }

                
            }else{
                this.$notify({ type: "error", title: "Respota incorreta, tente novamente." });
            }
        }
    },
    mounted() {
        this.atualizarUsuario()
        if(this.usuario.dados.desafio < this.$props['numero'] && this.$props['numero'] < 1000){ 
            this.$notify({ type: "error", title: "Calma lá!", text: "Você não tem acesso a esse desafio!" });
            setInterval(() => {
                window.location.href = '/gamificacao'
            }, 3000)
        }else{
            this.get_desafio()
        }

    }
}
</script>