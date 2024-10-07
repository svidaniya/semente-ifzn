<template>
    <div :style="{backgroundColor: invertido ? '#247474' : '#FFFFFF', borderColor: eu ? '#FAED7E' : 'transparent'}" class="jogador-placar">
        <p :style="{color: invertido ? '#FFFFFF' : '#247474'}" class="jogador-placar-nome">{{nome}}</p>
        <div class="jogador-placar-pontuacao">
            <p :style="{color: invertido ? '#FFFFFF' : '#247474'}" class="jogador-placar-pontos">{{pontos}}</p>
            <img class="jogador-medalha" v-if="lugar === 1" src="../assets/ouro.svg">
            <img class="jogador-medalha" v-else-if="lugar === 2" src="../assets/prata.svg">
            <img class="jogador-medalha" v-else-if="lugar === 3" src="../assets/bronze.svg">
        </div>

    </div>
</template>

<style scoped>
    .jogador-placar{
        border: 2px ridge     ;
        margin-bottom: 25px;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        border-radius: 40px;
        text-align: center;
        p{
            margin: 0;
            margin-top: 15px;
            margin-bottom: 15px;
            width: 150px;
        }
        .jogador-placar-pontuacao{
            display: flex;
            flex-direction: row;
            align-items: center;
            .jogador-medalha{
                margin: 0;
                width: 55px;
            }
            
        }

    }
</style>

<script>
export default {
    name: 'jogador',
    props: {
        nome: {
            type: String,
            default: 'Jogador'
        },
        pontos: {
            type: Number,
            default: 0
        },
        invertido: {
            type: Boolean,
            default: false
        },
        lugar : {
            type: Number,
            default: 0
        },
        eu : {
            type: Boolean,
            default: false
        }
    }
}
</script>