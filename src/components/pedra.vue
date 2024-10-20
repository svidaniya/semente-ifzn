<template>
    <div class="pedra">
        <a :style="{marginTop : numero === 1 ? '250px' : '0', marginBottom : numero === 25 ? '250px' : '0'}" :class="'pedra-' + lado" :href="pedra_imagem !== 0 ? '/desafio/' + numero : ''">
            <div class="pedra-content">
                <h1 v-if="pedra_imagem !== 0" class="pedra-level">{{numero}}</h1>
                <div style="display: flex; flex-direction: row">
                    <img :src="'src/assets/pedra' + pedra_imagem + '.svg'" />
                </div>


            </div>
        </a>
    </div>
</template>

<style scoped>
    .pedra {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        text-align: center;
        margin-bottom: 8px;
    }
    .pedra-content {
        display: flex;
        flex-direction: column;
        justify-content: center; /* Centraliza verticalmente */
        align-items: center; /* Centraliza horizontalmente */
    }
    img {
        position: relative;
        width: 150px;
    }
    .pedra-level {
        font-family: 'Lemon' !important;
        position: absolute;
        z-index: 1;
        color: #3C3C3C;
        font-size: 50px;
        font-weight: bold;
        margin: 0; /* Remover margens */
    }
    .pedra-esquerda {
        margin-right: 300px;
    }
    .pedra-centro {
    }
    .pedra-direita {
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
        lado: {
            type: String,
            default: 'esquerda'
        }
    }
}
</script>
