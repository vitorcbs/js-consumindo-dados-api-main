async function buscaCEP(cep) {
  const $erro = document.querySelector("#erro");

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(500);
    } else if (data.erro) {
      throw new Error(404);
    } else {
      const $logradouro = document.querySelector("#endereco");
      const $bairro = document.querySelector("#bairro");
      const $localidade = document.querySelector("#cidade");
      const $uf = document.querySelector("#estado");

      $logradouro.value = data.logradouro;
      $bairro.value = data.bairro;
      $localidade.value = data.localidade;
      $uf.value = data.uf;

      $erro.innerHTML = "";
    }
  } catch (erro) {
    erro = erro.toString().replace("Error: ", "");
    switch (erro) {
      case "404":
        $erro.innerHTML = `CEP não encontrado`;
        console.log("CEP não encontrado");
        break;
      case "500":
        $erro.innerHTML = "Erro no servidor";
        console.log("Erro no servidor");
        break;
      default:
        $erro.innerHTML = "CEP invalido";
        console.log("CEP inválido");
        break;
    }
  }
}

const $cep = document.querySelector("#cep");

$cep.addEventListener("focusout", () => buscaCEP($cep.value));
