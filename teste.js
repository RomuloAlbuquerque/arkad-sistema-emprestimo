// function f(g, h) {
//     setTimeout(() => {
//         if (10 > 0) {
//             g("P");
//         }
//         else {
//             h("Q");
//         }            
//     }, 3000);
//   }
  
//   const minhaPromise = new Promise(f);
  
//   minhaPromise
//     .then(valor => {
//         console.log("Resolveu com o valor " + valor);
//     })
//     .catch(valor => {
//         console.log("Rejeitada com o valor " + valor);
//     });
  
//   console.log(minhaPromise);

class Parcelamento{
    constructor(cpf, valorParcela, dataEmprestimo, dataVencimento, numeroParcela, quantParcelas){
        this.cpf = cpf;
        this.valorParcela = valorParcela;
        this.dataEmprestimo = dataEmprestimo;
        this.dataVencimento = dataVencimento; 
        this.numeroParcela = numeroParcela;
        this.quantParcelas = quantParcelas;
    }
}

const gerarParcela = (cpf, valorParcela, dataEmprestimo, quantParcelas)=>{
    const parcelas = [quantParcelas];
    let dataVencimento = dataEmprestimo;
    for(let i=1; i<quantParcelas; i++){
        dataVencimento += 30;
        const numeroParcela=i;
        parcelas[i] = new Parcelamento(cpf, valorParcela, dataEmprestimo, dataVencimento, numeroParcela, quantParcelas);
    }
    return parcelas;
}

const parcelamento = gerarParcela('00364483202', 1000, 1, 10);
console.log(parcelamento);

/*
Ao fazer um empréstimo o usuário informa o o valor a ser emprestado e a quantidade de parcelas.
a função emprestar gera um extrato informando o valor de cada parcela.

A classe Parcela deve receber, dentro da execução do método emprestar, o valor da parcela
e a quantidade de parcelas.
Então gerar um novo objeto Parcela contendo a data de vencimento e o número da parcela.
Criando um array do tamanho do número de parcelas
Para cada indice do array Cria um objeto parcela 
dataVencimento = Calculando o número do indice do array vezes 30 dias.
numeroParcela = será o número do índice do array.
*/