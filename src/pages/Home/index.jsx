import {useState, useEffect} from 'react'
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './home.css';
// URL API: /movie/now_playing?api_key=2036df264b59354ad360c8e877a0294f&language=pt-BR

function Home(){

    const [filmes, setFilmes] = useState([])
    const [carregar, setCarregar] = useState(true)

    useEffect(()=>{

        async function carregarFilmes(){
            const resposta = await api.get("movie/now_playing",{
                params:{
                    api_key:'2036df264b59354ad360c8e877a0294f',
                    language:'pt-BR',
                    page: 1,
                }
            })
            //console.log(resposta.data.results)
            setFilmes(resposta.data.results.slice(0,10))
            setCarregar(false)
        }

        carregarFilmes()

    }, [])

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
        </div>
    );
}

export default Home;