import {useState, useEffect} from 'react'
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './home.css';


function Home(){

    const [filmes, setFilmes] = useState([])
    const [carregar, setCarregar] = useState(true)
    const [page, setPage] = useState(1)

    useEffect(()=>{

        async function carregarFilmes(){
            const resposta = await api.get("movie/now_playing",{
                params:{
                    api_key: import.meta.env.VITE_TMDB_API_KEY,
                    language:'pt-BR',
                    page: page,
                }
            })
            //console.log(resposta.data.results)
            setFilmes(resposta.data.results)
            setCarregar(false)
        }

        carregarFilmes()

    }, [page])

    function handleNextPage(){
        setPage(page + 1)
    }

    function handlePrevPage(){
        if(page > 1){
            setPage(page - 1)
        }
    }

    if(carregar){
        return(
            <div className='carregamento'>
                <h2>Carregando lista de filmes...</h2>
            </div>
        )
    }
    return(
        <div className='container'>
            <div className='lista-filmes'>
                {filmes.map((filme)=>{
                    return(
                        <article key={filme.id}>
                            <strong>{filme.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original${filme.poster_path}`} alt={filme.title} />
                            <Link to={`/filme/${filme.id}`}>Acessar</Link>
                        </article>
                    )
                })}
            </div>
            <div className='pagination'>
                <button onClick={handlePrevPage} disabled={page === 1}>Anterior</button>
                <span>Página {page}</span>
                <button onClick={handleNextPage}>Próxima</button>
            </div>
        </div>
    );
}

export default Home;