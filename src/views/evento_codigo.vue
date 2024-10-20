<template>
    <div id="evento_codigo_inserir">
      <div class="scroller">
        <section class="vh-100 d-flex flex-column align-items-center justify-content-center" id="evento_codigo_inserir-main">
          <div id="evento_codigo_inserir-content">
            <h2>Insira o PIN do evento</h2>
            <div class="pin-container">
              <input 
                v-for="(digit, index) in 6" 
                :key="index" 
                type="text" 
                maxlength="1" 
                class="pin-input" 
                v-model="pin[index]" 
                @input="handleInput(index)" 
                @keydown="handleKeydown($event, index)" 
                ref="pinInputs"
              >
            </div>
            <button @click="acessarEvento" id="acessar-button">Acessar Evento</button>
          </div>
        </section>
      </div>
    </div>
  </template>
  
  <style scoped>
  #evento_codigo_inserir {
    width: 100%;
    padding: 20px;
  }
  
  #evento_codigo_inserir-main {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #1B6666; /* Fundo da seção principal */
  }
  
  #evento_codigo_inserir-content {
    text-align: center;
    background-color: #FFFFFF; /* Cor de fundo do conteúdo */
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    margin-bottom: 20px;
    color: #1B6666; /* Título em destaque */
    font-weight: bold;
  }
  
  .pin-container {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  
  .pin-input {
    width: 50px;
    height: 50px;
    font-size: 24px;
    text-align: center;
    border: 2px solid #1B6666;
    border-radius: 5px;
    margin: 0 5px;
    transition: border-color 0.3s;
  }
  
  .pin-input:focus {
    outline: none;
    border-color: #3DBB99;
  }
  
  #acessar-button {
    font-size: 18px;
    padding: 10px 20px;
    border: none;
    background-color: #1B6666;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  #acessar-button:hover {
    background-color: #3DBB99;
  }
  </style>
  
  <script>
  export default {
    name: 'evento_codigo_inserir',
    data() {
      return {
        pin: ['', '', '', '', '', ''], // Array para armazenar os 6 dígitos
      };
    },
    methods: {
      acessarEvento() {
        const pinCode = this.pin.join(''); // Concatena os dígitos em um único PIN
        if (pinCode.length === 6) {
          // Navegar para a página do evento
          window.location.href = `/evento/${pinCode}`;
        } else {
          alert('Por favor, insira um PIN de 6 dígitos');
        }
      },
      handleInput(index) {
        // Move o foco para o próximo campo se um dígito for inserido
        if (this.pin[index] && index < 5) {
          this.$refs.pinInputs[index + 1].focus(); // Atualiza a linha de código para acessar o ref correto
        }
      },
      handleKeydown(event, index) {
        // Move o foco para o campo anterior se a tecla 'Backspace' for pressionada
        if (event.key === 'Backspace' && index > 0 && !this.pin[index]) {
          this.$refs.pinInputs[index - 1].focus(); // Atualiza a linha de código para acessar o ref correto
        }
      },
    },
  };
  </script>