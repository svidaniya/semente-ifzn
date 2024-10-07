<template>
    <div id="regulamento">
        <div class="scroller">
            <section class="vh-100" id="regulamento-main">
                <navbar :highlight='2' :fixed='true'></navbar>
                <div id="regulamento-main-conteudo">
                    <introducao titulo='Regulamento' conteudo='Aqui Você pode tirar as suas dúvidas sobre a gamificação que acontece durante o evendo da semente. '></introducao>
                </div>
            </section>
            <section class="vh-100">
                <topico imagem='logo2.svg' titulo="Quem pode participar da gamificação?" conteudo="Art. 4o - A gamificação da SEMENTE é restrita à participação de alunos e servidores do IFRN Campus Natal – Zona Norte.
"></topico>
            </section>
            <section class="vh-100">
                <topico
                 imagem='logo2.svg'
                 titulo="Como  receber um certificado de participação? "
                 conteudo="Atenção! Os certificados são disponibilizados para aqueles que fizeram a inscrição e assistiram ao evento, o mesmo vale para a pontuação na gamificação.
                 É importante assinar a lista de presença durante o evento, pois é desse modo que verificamos sua participação.
                 
                 As inscrições para os eventos são disponibilizadas no Site SEMENTE na aba EVENTOS"
                 />
            </section>
            <section class="vh-100">
                <topico
                imagem="logo2.svg"
                titulo="Como funcionam os desafios da gamificação?"
                conteudo="Ao longo da SEMENTE serão lançados desafios, em forma de níveis, que os participantes terão que desvendar. Só assim poderão passar de fase e chegar ao final do percurso. Esse percurso será representado por um tabuleiro na aba de GAMIFICAÇÃO no site da SEMENTE (link do site - eventos). Cada desafio tem uma pontuação e o participante só poderá prosseguir para o próximo nível quando o anterior estiver devidamente completado.
            
                Os desafios poderão ser diversos, exemplo: desafios matemáticos, linguísticos, poéticos e lúdicos (Esses são feitos presencialmente no Campus)."
                />
            
            </section>
            <section class="vh-100">
                <topico
                imagem="logo2.svg"
                titulo="Como funciona o sistema de pontuação?"
                conteudo = "• Roda de conversa - 40 pontos
                • Mesa redonda - 30 pontos
                • Enigma (por dia) - 50 pontos
                • Enigma (organizadores) - 100 pontos
                • Troca na feira ecológica (uma única troca) - 50 pontos
                • Espaço de diálogo - 50 pontos 
                • Shows de Talentos - 20 pontos
                • Desafios - 15 pontos
                "
                />
            </section>
            <section id="regulamento-premios">
                <h1>Quais são as premiações?</h1>
                <div id="regulamento-premios-cards">
                    <premio :pontos="450" :premios="[{unidades:'1', nome:'Caneta'},{unidades:'1',nome:'Caderno'},{unidades:'1', nome:'Caneta'},{unidades:'1',nome:'Caderno'},{unidades:'1', nome:'Caneta'},{unidades:'1',nome:'Caderno'},{unidades:'1', nome:'Caneta'},{unidades:'1',nome:'Caderno'}]"></premio>
                    <premio imagem="logo2.svg" :pontos="450" :premios="[{unidades:'1', nome:'Caneta'},{unidades:'1',nome:'Caderno'}]"></premio>
                    <premio :pontos="150" :premios="[{unidades:'1', nome:'Caneta'},{unidades:'1',nome:'Ak-47'}]"></premio>
                    <premio :pontos="450" :premios="[{unidades:'1', nome:'Caneta'},{unidades:'1',nome:'Caderno'}]"></premio>
                    <premio :pontos="450" :premios="[{unidades:'1', nome:'Caneta'},{unidades:'1',nome:'Caderno'}]"></premio>
                    <premio :pontos="450" :premios="[{unidades:'1', nome:'Caneta'},{unidades:'1',nome:'Caderno'}]"></premio>
                    <premio :pontos="450" :premios="[{unidades:'1', nome:'Caneta'},{unidades:'1',nome:'Caderno'}]"></premio>
                    <premio :pontos="450" :premios="[{unidades:'1', nome:'Caneta'},{unidades:'1',nome:'Caderno'}]"></premio>
                    <premio :pontos="450" :premios="[{unidades:'1', nome:'Caneta'},{unidades:'1',nome:'Caderno'}]"></premio>
                </div>

            </section>
            <section class="vh-100">
                <topico 
                imagem="logo2.svg"
                titulo="Regulamento completo"
                conteudo="Para ter acesso ao regulamento completo acesse esse link"
               :botao="{ texto: 'regulamento.pdf', href: 'https://drive.google.com/file/d/1wE1i8J7oGfXKuWj0nX8H2fY5v7T7jI0U/view?usp=sharing',nova_janela: true }"
                />
               
                

            </section>
        </div>

    </div>
</template>

<style>
    #regulamento{
        width: 100%;
        #regulamento-main{
            width: 100%;
            display: flex;
            flex-direction: column; 
            align-items: center;
            #regulamento-main-conteudo{
                width: 80% !important;
            }
        }
        #regulamento-premios{
            background-color: #3DBB99;
            color : white;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-evenly;
            h1{
                margin-top: 100px;
                margin-bottom: 100px;
            }
            #regulamento-premios-cards{
                display: flex;
                flex-direction: row;
                justify-content: space-evenly;
                max-width: 80%;
                flex-wrap: wrap;

            }
            
        }
        
    }
</style>

<script>
    import introducao from '../components/introducao.vue'
    import navbar from '../components/navbar.vue'
    import topico from '../components/topico.vue'
    import premio from '../components/premio.vue'
    export default {

        name: 'regulamento',
        components: {
            navbar,
            introducao,
            topico,
            premio
        }
    }
</script>