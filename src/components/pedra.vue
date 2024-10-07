<template>
    <div class="pedra">
        <a :href="pedra_imagem !== 0 ? '/desafio/' + numero : ''">
            <img :class="'pedra-' + lado" :style="{marginTop : numero === 1 ? '250px' : '0', marginBottom : numero === 25 ? '250px' : '0'}" :src="'src/assets/pedra' + pedra_imagem + '.svg'">

        </a>
        <h1 v-if="pedra_imagem !== 0" :class="'pedra-' + lado" class="pedra-level" :style="{marginTop : numero === 1 ? '250px' : '0', marginBottom : numero === 25 ? '250px' : '0'}">{{numero}}</h1>
    </div>
</template>

<style>
    .pedra{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
            width: 150px;
        }
        h1{
            font-family: 'Lemon';
            color: #3C3C3C;
            position: absolute;
            text-align: center;
            font-size: 50px;
            font-weight: bold;
        }
    }
    .pedra-esquerda{

        margin-right: 300px;

    }
    .pedra-centro{

    }

    .pedra-direita{
        margin-left: 300px;
    }
</style>
<script>
    export default {
        name: 'pedra',
        props: {
            numero: {
                type: Number,
                default: 1
            },
            pedra_imagem: {
                type: Number,
                default: 0
            },
            lado:{
                type: String,
                default: 'esquerda'
            }
        }
    }
</script>