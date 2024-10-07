<template>
    <div class="animate__animated animate__fadeIn" id="introducao">
        <div  id="introducao-text">
            <h1>{{titulo}}</h1>
            <p>{{conteudo}}</p>
        </div>
        <img class="" id="introducao-image" :src="imagem ? 'src/assets/' + imagem : 'src/assets/logo2.svg'">

    </div>
</template>

<style>
    #introducao{
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-top: 20%;
        color: white;
        font-family: 'Lato';
        font-weight: 300;
        #introducao-text{
            h1{
                font-size: 50px;
                font-weight: 300;
                b{
                  font-weight: 500;
                } 
              }
            p{
            word-spacing: 4px;
            font-size: 20px;
            margin-bottom: 25px;
            }
            display: flex;
            flex-direction: column;
            max-width: 45%;
        }
        #introducao-image{
            max-width: 25%;
        }
    }
</style>

<script>
    export default {
        name: 'introducao',
        props: {
            titulo: String,
            conteudo: String,
            imagem: String
        }
    }
</script>