<template>
    <div id="gameficacao">
        <div class="scroller">
            <section class="vh-100" id="gameficacao-main">
                <navbar highlight='1' :fixed='true'></navbar>
                <div id="gameficacao-main-conteudo">
                    <introducao titulo='Gameficação' conteudo='Vamos aos jogos! Aqui você terá acesso aos desafios que serão lançados ao longo da SEMENTE.' imagem='logo2.svg'></introducao>   
                </div>
            </section>
            <section id="gameficacao-desafios">
                <img src="../assets/caminho.svg" id="gameficacao-background">
                
                <pedra v-for="level in leveis" :lado="level.lado" :numero="level.numero"></pedra>
            </section>
        </div>
    </div>
</template>

<style>
    #gameficacao{
        width: 100%;
        #gameficacao-main{
            width: 100%;
            display: flex;
            flex-direction: column; 
            align-items: center;
            #gameficacao-main-conteudo{
                width: 80% !important;
            }
        }

        #gameficacao-desafios{
            position: relative; /* Adicione esta linha */
            width: 100%;
            height: min-content;
            display: flex;
            flex-direction: column;
            
            #gameficacao-background {
                background: linear-gradient(180deg, rgba(10,43,43,1) 0%, rgba(27,102,102,1) 45%, rgba(0,241,154,1) 71%, rgba(0,255,56,1) 100%);
                position: absolute;
                width: 1000px;
                z-index: -1;
                align-self: center;

            }
        }
    }
</style>

<script>    
    import navbar from '../components/navbar.vue';
    import introducao from '@/components/introducao.vue';
    import pedra from '@/components/pedra.vue';
    export default {
        name: 'gameficacao',
        components: {
            navbar,
            introducao,
            pedra
        },
        data() {
    return {
        leveis: []
    };
    },
    mounted() {
        let lado = 0;
        let incrementando = true;
        for (let i = 0; i < 25; i++) {
            var numero = i + 1;
            var link = "";
            var pedra_lado = "esquerda";
            if(lado == 0){
                pedra_lado = "esquerda";
                incrementando = true;
            }else if(lado == 1){
                pedra_lado = "centro";
            }else if(lado == 2){
                pedra_lado = "direita";
                incrementando = false;

            }
            
            if(incrementando){
                lado++;
            }else{
                lado--;
            }
            this.leveis.push({
                lado: pedra_lado,
                numero: numero
            });
        }
    }
}
</script>