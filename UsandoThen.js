var consultaCEP = fetch("https://viacep.com.br/ws/35711137/json/")
  .then((response) => {
    if (!response.ok) {
      throw new Error(500); //Erro no servidor
    } else return response.json();
  })
  .then((data) => {
    if (data.erro) {
      throw new Error(404); //para quando o CEP for válido mas não existir
    } else console.log(data); //para quando o CEP for válido e existir
  })
  .catch((erro) => {
    erro = erro.toString().replace("ERRO: ", "");
    switch (erro) {
      case "404":
        console.log("CEP não encontrado");
        break;
      case "500":
        console.log("Erro no servidor");
        break;
      default:
        console.log("CEP inválido"); //para quando o CEP for inválido
        break;
    }
  })
  .finally((mensagem) => console.log("Processamento concluido!"));
