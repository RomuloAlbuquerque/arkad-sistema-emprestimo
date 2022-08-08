class Parcela{
    constructor(cpf, valorParcela, dataEmprestimo, dataVencimento, numeroParcela, quantParcelas){
        this.cpf = cpf;
        this.valorParcela = valorParcela;
        this.dataEmprestimo = dataEmprestimo;
        this.dataVencimento = dataVencimento; 
        this.numeroParcela = numeroParcela;
        this.quantParcelas = quantParcelas;
    }
}

export default Parcela;