import ExtratoEmprestimoDTO from "../3.dto/extratoEmprestimoDTO.js";
import CarteiraRepository from "../4.dao/carteiraRepository.js";
import UsuarioRepository from "../4.dao/usuarioRepository.js";
import EmprestimoRepository from "../4.dao/emprestimoRepository.js";

const emprestimoRepository = new EmprestimoRepository();
const usuarioRepository = new UsuarioRepository();
const carteiraRepository = new CarteiraRepository();

class EmprestimoService{

    async emprestar(valor, quantParcelas, cpf){
        const emprestimo = await emprestimoRepository.emprestar(Number(valor), Number(quantParcelas), cpf);
        const [{carteira_saldo}] = await carteiraRepository.buscarCarteira(cpf);
        const [{usuario_nome}] = await usuarioRepository.buscar(cpf);
        const emprestimoDTO = new ExtratoEmprestimoDTO(usuario_nome, emprestimo.cpf, emprestimo.valorEmprestado, emprestimo.quantParcelas, emprestimo.valorParcela, emprestimo.totalPagar, emprestimo.totalJuros, emprestimo.taxaJurosMensal, Number(carteira_saldo));
        return emprestimoDTO;
        try{

        }catch(e){
            return null;
        }
    }

    async listarEmprestimos(cpf){
        try{
            const usuario = await usuarioRepository.buscar(cpf);
            const extratos = await emprestimoRepository.listarEmprestimos(cpf);
            return {"Usuario": usuario, "Emprestimos": extratos};
        }catch(e){
            return null;
        }
    }
}

export default EmprestimoService;