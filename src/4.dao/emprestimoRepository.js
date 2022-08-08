import CarteiraRepository from "./carteiraRepository.js"
import ConfigBanco from "../1.config/configBanco.js";
import { QueryTypes } from "sequelize";
import Extrato from "../2.entity/extrato.js";

const configBanco = new ConfigBanco();
const carteiraRepository = new CarteiraRepository();

class EmprestimoRepository{

    async emprestar(valor, quantParcelas, cpf){
        const emprestimo = new Extrato(valor, quantParcelas, cpf);
        await configBanco.banco.query(`
        insert into emprestimo(emprestimo_cpf, emprestimo_valor, emprestimo_quant_parcelas) values($1, $2, $3) returning *`,
        {bind: [valor, quantParcelas, cpf], type: QueryTypes.INSERT});
        await configBanco.banco.query(`
        insert into extrato(extrato_cpf, extrato_total_pagar, extrato_quant_parcelas, extrato_valor_parcela, extrato_valor_emprestado, extrato_total_juros, extrato_taxa_juros_mensal) values($1, $2, $3, $4, $5, $6, $7)`,
        {bind: [emprestimo.cpf, emprestimo.totalPagar, emprestimo.quantParcelas, emprestimo.valorParcela, emprestimo.valorEmprestado, emprestimo.totalJuros, emprestimo.taxaJurosMensal], 
        type: QueryTypes.INSERT})
        await carteiraRepository.depositar(valor, cpf);
        await configBanco.banco.query(
            `insert into parcela(parcela_cpf, valor_parcela, data_emprestimo, data_vencimento, numero_parcela, quant_parcela) values($1, $2, $3, $4, $5, $6)`,
            {bind: [emprestimo.parcelas.cpf, emprestimo.parcelas.valorEmprestado, emprestimo.dataEmprestimo, emprestimo.parcelas.dataVencimento, emprestimo.parcelas.numeroParcela, emprestimo.parcelas.quantParcelas], type: QueryTypes.INSERT})
        return emprestimo; 
    }

    async listarEmprestimos(cpf){
        const extratos = await configBanco.banco.query(`select * from extrato where extrato_cpf = $1`,
        {bind: [cpf], type: QueryTypes.SELECT});
        return extratos;
    }
}
export default EmprestimoRepository;