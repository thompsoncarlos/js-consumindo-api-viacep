async function buscaEndereco(cep) {
  var mensagemErro = document.getElementById('erro');
  mensagemErro.innerHTML = "";
  try {
    var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    var consultaCEPConvertida = await consultaCEP.json();
    if (consultaCEPConvertida.erro) {
      throw Error('CEP não existente!');
    }
    var logradouro = document.getElementById('endereco');
    var numero = document.getElementById('numero');
    var complemento = document.getElementById('complemento');
    var bairro = document.getElementById('bairro');
    var cidade = document.getElementById('cidade');
    var uf = document.getElementById('estado');
    
    logradouro.value = consultaCEPConvertida.logradouro;
    numero.value = consultaCEPConvertida.numero;
    complemento.value = consultaCEPConvertida.complemento;
    bairro.value = consultaCEPConvertida.bairro;
    cidade.value = consultaCEPConvertida.localidade;
    uf.value = consultaCEPConvertida.uf;

    console.log(consultaCEPConvertida);
    return consultaCEPConvertida;
  } catch (erro) {
    mensagemErro.innerHTML = `<p style="color: red">CEP inválido. Tente novamente!</p>`
    console.log(erro);
  }
}

var cep = document.getElementById('cep');
cep.addEventListener("focusout", () => buscaEndereco(cep.value));
