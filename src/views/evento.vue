<template>
    <div id="evento" @click="handleClick"> <!-- Adicione o evento de clique aqui -->
        <div class="scroller">
            <section class="vh-100 d-flex flex-column align-items-center justify-content-center" id="evento-main">
                <div v-if="resposta" id="evento-content" @click="playAudio">
                    <div class="overlay" :style="{ opacity: overlayOpacity, display: showInstruction ? 'block' : 'none' }"></div>
                    <img id="certificado-selo" src="../assets/logo2.svg" alt="Selo de Certificado" />
                    <h1>🎉 Parabéns, {{ usuario.dados.nome }}!</h1>
                    <h2>Você ganhou <i>{{ resposta.evento.pontuacao }}</i> pontos por participar do evento:</h2>
                    <div class="heartbeat" id="evento-titulo">{{ resposta.evento.titulo }}</div>
                    <p id="evento-descricao">{{ resposta.evento.descricao }}</p>
                    <p><strong>Data do Evento:</strong> {{ resposta.evento.data }}</p>
                    <div v-if="resposta.desafio" id="evento-desafio">
                        <h2>Esse evento possui um desafio extra, gostaria de tentar?</h2>
                        <a type="button" role="button" class="btn btn-dark" :href="'/desafio/' + resposta.desafio.numero">Ir para o desafio</a>
                    </div>
                </div>
                <!-- Mensagem de instrução -->
                <p class="click-instruction" v-if="showInstruction">Você ganhou um certificado, clique na tela!👆</p> <!-- Adicione v-if para controlar a visibilidade -->
            </section>
        </div>
    </div>
</template>

<style scoped>

.click-instruction {
    z-index: 5;
    position: absolute; /* Para posicionar a instrução */
    top: 20px; /* Distância do topo da tela */
    font-size: 20px; /* Tamanho do texto */
    color: #FFFFFF; /* Cor do texto para melhor contraste */
    background-color: rgba(0, 0, 0, 0.7); /* Fundo semitransparente */
    padding: 10px; /* Espaçamento ao redor do texto */
    border-radius: 5px; /* Borda arredondada */
    animation: pulse 1.5s infinite; /* Animação pulsante */
}

@keyframes pulse {
    0% {
        transform: scale(1);
        opacity: 1;
    }
    50% {
        transform: scale(1.05);
        opacity: 0.8;
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}

#evento {
    width: 100%;
    padding: 20px;
    background-color: #1B6666; /* Cor de fundo suave */
}

#evento-main {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

#evento-content {
    text-align: center;
    background-color: #FFFFFF; /* Cor de fundo do conteúdo */
    padding: 50px;
    border-radius: 10px;
    border: 5px solid #3DBB99; /* Borda para destacar o conteúdo */
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s, box-shadow 0.3s; /* Animação ao passar o mouse */
    width: 80%; /* Largura máxima do conteúdo */
    max-height: 90vh;
    position: relative; /* Para posicionar o selo se necessário */
    transition: 200ms linear;
    overflow-y: auto;
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    filter: brightness(0.9);
    transition: opacity 0.5s ease; /* Transição suave para a opacidade */
    opacity: 1; /* Começa visível */
    z-index: 1; 
}

#evento-content:hover {
    scale: 1.05;
    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.3);
    transition: 200ms linear;
}

#certificado-selo {
    width: 100px; /* Ajuste o tamanho conforme necessário */
    margin-bottom: 20px; /* Espaçamento abaixo do selo */
}

h1 {
    font-size: 38px; /* Tamanho do título */
    font-weight: bold;
    color: #1B6666; /* Cor principal */
    margin-bottom: 20px; /* Espaçamento abaixo do título */
}

#evento-titulo {
    font-size: 36px; /* Tamanho do título do evento */
    font-weight: bold;
    letter-spacing: 2px;
    color: #3DBB99; /* Cor do título do evento */
    margin: 20px 0; /* Margens ao redor do título */
}

#evento-descricao {
    font-size: 18px; /* Tamanho da descrição */
    color: #555;
    margin: 20px 0; /* Margens ao redor da descrição */
}

h2 {
    margin: 20px 0; /* Margens ao redor do h2 */
    color: #1B6666; /* Título em destaque */
    font-weight: bold;
    font-size: 24px; /* Tamanho reduzido do h2 */
}

i {
    color: #3DBB99;
    text-decoration: none;
}

.btn {
    display: inline-block;
    padding: 10px 20px;
    font-size: 18px;
    color: #FFFFFF;
    background-color: #3DBB99;
    border: none;
    border-radius: 5px;
    text-decoration: none;
    transition: background-color 0.3s, transform 0.3s;
}

.btn:hover {
    cursor: pointer;
    background-color: #2CAFAF;
    transform: scale(1.05); /* Aumenta o botão ao passar o mouse */
}

p {
    font-size: 16px;
    color: #1B6666; /* Texto padrão */
    margin: 10px 0; /* Margens reduzidas para parágrafos */
}

#evento-desafio {
    margin-top: 30px; /* Margem acima do desafio */
}
</style>

<script>
import axios from 'axios';
import { inject } from 'vue';
import sound from "../assets/levelup.mp3";

export default {
    name: 'evento',
    props: {
        codigo: {
            type: String,
            default: '-1',
        },
    },
    data() {
        return {
            resposta: undefined,
            servidor: inject('servidor'),
            usuario: inject('usuario'),
            audio: null,
            overlayOpacity: 1, // Inicialmente, o overlay é totalmente visível
            showInstruction: true, // Adiciona propriedade para controle da instrução,
            checkUsuario: inject('checkUsuario'),
            checkToken: inject('checkToken'),
            usuario : inject('usuario'),
        };
    },
    mounted() {
        this.audio = new Audio(sound);
        this.audio.onerror = (e) => {
            console.error("Erro ao carregar o áudio:", e);
        };
        if(this.checkToken() && this.checkUsuario()){
            axios.post(this.servidor + '/presente', { 
            'matricula': this.usuario.dados.matricula,
            'token': this.usuario.token,
            'codigo': this.codigo
            }).then((response) => {
                console.log(response.data)
                if(response.data.status == "ERRO" || response.data.status == "ERROR"){
                    setInterval(() => {
                        this.$notify({ type: "error", "title" :  "error" });
                        window.location.href = '/'
                    }, 4000)
                }else{
                    this.resposta = response.data;
                }
            }); 
        }else{
            window.location.href = '/cadastro';
        }

    },
    methods: {
        checkUsuario() {
            this.checkUsuario();
        },
        checkToken() {
            this.checkToken();
        },
        playAudio() {
            if (!this.audio.paused) return; 
            this.audio.play();

            // Inicie uma transição suave para diminuir a opacidade
            this.overlayOpacity = 0; // Diminui a opacidade para 0 ao clicar
        },
        handleClick() {
            this.showInstruction = false; // Oculta a instrução ao clicar
        }
    }
};
</script>