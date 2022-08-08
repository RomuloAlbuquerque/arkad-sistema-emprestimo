import Extrato from "./extrato.js"

class Emprestimo{

    constructor(valor, quantParcelas, cpf){
        this.valor = valor;
        this.quantParcelas = quantParcelas;
        this.cpf = cpf;
        this.extrato = new Extrato(valor, quantParcelas, cpf);
    }


}

export default Emprestimo;