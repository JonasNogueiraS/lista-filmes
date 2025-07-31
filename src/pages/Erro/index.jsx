import { Link } from "react-router-dom";
import './erro.css'
function Erro(){
    return(
        <div className="not-found">
            <h1>Erro</h1><br/> 
            <h2>Página não encontrada.</h2>
            <Link to='/'>Página Inicial</Link>
        </div>
    );
}

export default Erro;