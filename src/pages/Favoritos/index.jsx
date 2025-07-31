import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./favoritos.css"
import { toast } from "react-toastify";

function Favoritos(){
    const [filmes, setFilmes] = useState([])

    useEffect(()=>{
        const minhaLista = localStorage.getItem('@FilmesSearch');
        setFilmes(JSON.parse(minhaLista) || [])
    },[])

    function excluirFilme(id){
        let filtroFilmes = filmes.filter((item)=>{
            return(item.id != id)
        })
        setFilmes(filtroFilmes);
        localStorage.setItem('@FilmesSearch', JSON.stringify(filtroFilmes))
        toast.info('Filme removido.')
    }

    return(
        <>
            <div className="head-fav">
                <h1>Meus Filmes</h1>
                {filmes.length === 0 && <span>Você ainda não possui filmes salvos!</span>}
            </div>
        <div className="meus-filmes">
        
            <ul>
            {filmes.map((item)=>{
                return(
                <li key={item.id}>
                    <span>{item.title}</span>
                    <img src={`https://image.tmdb.org/t/p/original${item.poster_path}`} alt={item.title} />
                    <div className="btn-fav">
                        <Link to={`/filme/${item.id}`}>Detalhes</Link>
                        <button onClick={()=>excluirFilme(item.id)}>Excluir</button>
                    </div>
                    
                </li>)
            })}
            </ul>

    </div></>
        
    );
}

export default Favoritos;