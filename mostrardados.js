mostrarDados() {
    // Verifica se o usuário está autenticado e mostra os dados
    if (this.suap.isAuthenticated()) {
      const scope = this.suap.getToken().getScope();
      this.suap.getResource(scope, (response) => {
        if (response) {
          alert(JSON.stringify(response, null, 4));
        } else {
          alert("Nenhum dado encontrado.");
        }
      });
    } else {
      alert("Você precisa estar autenticado para ver os dados.");
    }
  },