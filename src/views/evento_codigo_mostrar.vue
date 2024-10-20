  <template>
      <div id="evento_codigo_mostrar">
        <div class="scroller">
          <section class="vh-100 d-flex flex-column align-items-center justify-content-center" id="evento_codigo_mostrar-main">
            <div id="evento_codigo_mostrar-content">
              <h2>Acesse <a href="/evento">{{site}}/evento</a> e digite o PIN:</h2>
              <div id="pin-code">{{ codigo }}</div>
              <img id="qr_code" :src="qr_code" alt="QR Code">
              <p>Ou utilize o QR Code acima para registrar sua presença no evento.</p>
            </div>
          </section>
        </div>
      </div>
    </template>
    
    
    <style scoped>
    #evento_codigo_mostrar {
      width: 100%;
      padding: 20px;
    }
    
    #evento_codigo_mostrar-main {
      width: 100%;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: #1B6666; /* Fundo da seção principal */
    }
    
    #evento_codigo_mostrar-content {
      text-align: center;
      background-color: #FFFFFF; /* Cor de fundo do conteúdo */
      padding: 40px;
      border-radius: 20px;
      box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
      

    }
    
    #pin-code {
      font-size: 56px;
      font-weight: bold;
      letter-spacing: 8px;
      color: #1B6666; /* Destaque da cor principal */
      margin: 20px 0;
    }
    
    h2 {
      margin-bottom: 30px;
      color: #1B6666; /* Título em destaque */
      font-weight: bold;
    }
    
    a {
      color: #3DBB99;
      text-decoration: none;
    }
    
    a:hover {
      text-decoration: underline;
    }
    
    p {
      font-size: 16px;
      color: #1B6666;
      margin-top: 20px;
    }
    
    #qr_code {
      width: 200px;
      height: 200px;
      margin: 20px 0;
      border: 5px solid #FBEE8A;
      border-radius: 10px;
    }
    </style>
    
    <script>
    import QRCode from 'qrcode';
    import axios from 'axios';
    import { inject } from 'vue';
    export default {
      name: 'evento_codigo_mostrar',
      props: {
        codigo: {
          type: String,
          default: '-1',
        },
      },
      data() {
        return {
          site: undefined, // ou use o inject se necessário
          qr_code: undefined,
          servidor : inject('servidor'),
        };
      },
      mounted() {
        this.site = axios.get(this.servidor + '/site').then((response) => {
          return response.data.site;
        }).then((site) => {
          this.site = site;
          this.generateQRCode();
        })

      },
      methods: {
        generateQRCode() {
          const qrText = `${this.site}/evento/${this.codigo}`;
          QRCode.toDataURL(qrText, (err, url) => {
            if (err) console.error(err);
            this.qr_code = url; // Definindo o QR Code como uma URL base64
          });
        }
      }
    };
    </script>