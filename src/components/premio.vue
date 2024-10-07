<template>
    <div class="card ">
        <img class="card-img-top" :src="imagem ? 'src/assets/' + imagem : 'src/assets/box.svg'" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">{{pontos}} Pontos</h5>
            <ul>
                <li v-for="premio in premios" :key="premio.nome">({{premio.unidades}}) {{premio.nome}}</li>
            </ul>
        </div>
    </div>
    
    
</template>

<style scoped>
    .card {
        margin: 50px 50px;
        width: 15rem;
        height: 25rem;
        border-radius: 15px;
        background-color: #1F6363;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        overflow: hidden;
        text-align: center;
        transition: 200ms linear;
        filter: blur(1px) grayscale(1) brightness(0.5);
    }
    .card:hover {
        cursor: pointer;
        scale: 1.1;
        filter: blur(0px);
    }


    .card-img-top {
        width: 50%;
        height: 10rem;
        object-fit: contain;
        align-self: center;
        border-bottom: 2px solid #FBEE8A;
    }

    .card-body {
        padding: 15px;
    }

    h5.card-title {
        color: #FBEE8A;
        margin-bottom: 1rem;
        font-size: 1.5rem;
    }

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    li {
        color: white;
        padding: 5px 0;
        font-size: 1rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }

    li:last-child {
        border-bottom: none;
    }

    /* Scroll for large lists */
    .card-body {
        max-height: 200px;
        overflow-y: auto;
    }

    /* Scrollbar styling */
    .card-body::-webkit-scrollbar {
        width: 8px;
    }

    .card-body::-webkit-scrollbar-thumb {
        background-color: #FBEE8A;
        border-radius: 4px;
    }

    .card-body::-webkit-scrollbar-track {
        background-color: #1F6363;
    }
</style>

<script>
    export default {
        name: 'premio',
        props: {
            imagem: String,
            pontos: Number,
            premios: Array
        }
    }
</script>