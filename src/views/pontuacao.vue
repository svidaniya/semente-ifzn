<template>
    <div id="pontuacao">
        <div class="scroller">
            <section class="vh-100" id="pontuacao-main">
                <navbar :highlight='3' :fixed='true'></navbar>
                <div id="pontuacao-main-conteudo">
                    <introducao titulo='Pontuação' conteudo='Aqui Você poderá acompanhar a sua pontuação e como está indo na gamificação!' imagem='logo2.svg'></introducao>
                </div>
            </section>
            <section class="vh-100" id="pontuacao-jogador">
                <h1>Perfil do jogador</h1>
                <div id="pontuacao-jogador-dados">
                    <p>Jogador: </p>
                    <p>Matricula: </p>
                    <p>Pontuação: </p>
                </div>
            </section>
            <section id="pontuacao-placar">
                <img id="trofeu" src="../assets/trofeu.svg">
                <h2>Ranking</h2>
                <div id="pontuacao-jogador-pontuacao">
                    <h4>Jogador</h4>
                    <h4>Pontuação</h4>
                </div>
                <div id="pontuacao-jogadores">
                    <jogador nome='Jogador 1' :pontos='450' :lugar="1"></jogador>
                    <jogador nome='Jogador 1' :pontos='450' :lugar="2" invertido eu></jogador>
                </div>
            </section>
        </div>
    </div>
</template>

<style>
    #pontuacao{
        width: 100%;
        #pontuacao-main{
            width: 100%;
            display: flex;
            flex-direction: column; 
            align-items: center;
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
            h2{
                color: white;
                border-bottom: 3px solid #1B6666;
                padding-bottom: 15px;
                width: 150px;
                text-align: center
            }
            #pontuacao-jogador-pontuacao{
                margin-top: 50px;
                align-items: center;
                width: 80%;
                display: flex;
                flex-direction: row;
                justify-content: space-evenly;
                h4{
                    color: #FAED7E;
                    border-bottom: white solid 5px;
                    padding-bottom: 10px;
                    width: 150px;
                    text-align: center;
                }
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
export default {
    name: 'pontuacao',
    components: {
        navbar,
        introducao,
        jogador
    }
}
</script>