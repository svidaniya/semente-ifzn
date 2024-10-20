<template>
    <div id="gameficacao">
        <div class="scroller">
            <section class="vh-100" id="gameficacao-main">
                <navbar highlight='0' :fixed='true'></navbar>
                <div id="gameficacao-main-conteudo">
                    <introducao titulo='Gamificação' conteudo='Vamos aos jogos! Aqui você terá acesso aos desafios que serão lançados ao longo da SEMENTE.' imagem='logo2.svg'></introducao>   
                </div>
            </section>
            <section id="gameficacao-desafios">
                <img src="../assets/caminho.svg" id="gameficacao-background">
                
                <pedra v-for="level in leveis" :lado="level.lado" :numero="level.numero" :pedra_imagem="level.pedra_imagem"></pedra>
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
    import { inject } from 'vue';
    export default {
        name: 'gameficacao',
        components: {
            navbar,
            introducao,
            pedra
        },
        data() {
    return {
        leveis: [],
        checkUsuario: inject('checkUsuario'),
        checkToken: inject('checkToken'),
        usuario : inject('usuario'),
        atualizarUsuario: inject('atualizarUsuario')
    };
    },
    methods: {
        checkUsuario() {
            this.checkUsuario();
        },
        checkToken() {
            this.checkToken();
        },
        _atualizarUsuario() {
            this.atualizarUsuario();
        }
    },
    mounted() {
        if(this.checkUsuario() && this.checkToken()){
            this._atualizarUsuario();
            let lado = 0;
            let incrementando = true;
            for (let i = 0; i < 25; i++) {
                var numero = i + 1;
                var pedra_lado = "esquerda";
                var pedra_imagem = 0;
                if(lado == 0){
                    pedra_lado = "esquerda";
                    incrementando = true;
                }else if(lado == 1){
                    pedra_lado = "centro";
                }else if(lado == 2){
                    pedra_lado = "direita";
                    incrementando = false;
                }
                
                if(this.usuario.dados.desafio >= numero){
                    if(numero <= 9){
                        pedra_imagem = 1
                    }else if(numero <= 18){
                        pedra_imagem = 2
                    }else if(numero <= 25){
                        pedra_imagem = 3
                    }
                }

                if(incrementando){
                    lado++;
                }else{
                    lado--;
                }
                this.leveis.push({
                    lado: pedra_lado,
                    numero: numero,
                    pedra_imagem: pedra_imagem,
                });
            }
        }else{
            window.location.href = "/login";
        }
    
    }
}
</script>