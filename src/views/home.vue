  <template>

    <div id="home">
        <div class="scroller">
          <section class="vh-100" id="home-main">
       
            <navbar :fixed="false"></navbar>
            <div id="home-main-conteudo">
              <div id="conteudo">
                
                <h1><b>Semente</b> e sua trajetória</h1>
                <p>{{ anosDeExistencia }}</p>
                <button disabled id="btn-login" type="button" class="btn btn-success">Saiba mais</button>
              </div>
            </div>
          </section>
          <section class="vh-100">
            <topico :inverse="true" :titulo="'Gameficação'" :imagem="'controle.png'" :conteudo="'A gamificação consiste na aplicação de mecanismos e dinâmicas dos jogos no ambito do campus para motivar e fazer um aprendizado de forma mais lúdica de acordo com o tema anual da SEMENTE. Após a gamificação, os alunos inscritos receberão premios e brindes gamificados de acordo com suas pontuações.'"></topico>
          </section>
          <section class="vh-100">
            <topico :inverse="false" :titulo="'Palestras'" :imagem="'microfone.png'" :conteudo="'Durante os dias de evento “SEMENTE”, sempre ocorrem as palestras de aprendizado. Os palestrantes levam assuntos importantes para discutir com o público de alunos e normalmente os tópicos das palestras são de acordo com a temática anual da semente para ter conectividade juntamente com as palestras voltadas para o meio ambiente.'"></topico>
          </section>
          <section class="vh-100">
            <topico
            :inverse="true"
            :titulo="'Semente com uma cara nova'"
            :conteudo="'A Semente agora apresenta um visual otimizado, desenvolvido com as tecnologias Vue e Python. Esta nova versão proporciona uma experiência mais fluida e intuitiva, facilitando a navegação e tornando a interação ainda mais agradável para os usuários.'"
            :imagem="'vuelogo.png'"
        ></topico>
          </section>
        </div>
        
    </div>


  </template>
  
  <style>
    #home{
      width: 100%;
    }
    #home-main{
      background-image: url("../assets/capa.png");
      background-repeat: no-repeat;
      background-size: cover;
      width: 100%;
      display: flex;
      flex-direction: column; 
      align-items: center;
      #home-main-conteudo{
        font-family: 'Lato';
        padding-top: 8%;
        width: 80% !important;
        font-weight: 300;
        #conteudo{
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
          button{
            width: 35%;
          }
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          color: white;
          background-color: transparent !important;
          width: 40%;
          max-height: 50vh;
        }
      }
    }
  </style>

  <script>
  import navbar from '../components/navbar.vue';
  import topico from '../components/topico.vue';

  export default {
    name: 'home',
    components: {
      navbar,
      topico,
    },
    data() {
      return {
        anoCriacao: 2008,  // Ano de criação da Semente
      };
    },
    computed: {
      anosDeExistencia() {
        const anoAtual = new Date().getFullYear();
        const anos = anoAtual - this.anoCriacao;

        // Verificar se é múltiplo de 5
        if (anos % 5 === 0) {
          return `A semente está completando ${anos} anos de puras questões ambientais discutidas pela comunidade interna e externa ao campus Natal - Zona Norte!`;
        } else {
          return `A Semente vem desde 2008 abordando questões ambientais discutidas pela comunidade interna e externa ao campus Natal - Zona Norte!`;
        }
      }
    }
  };
</script>