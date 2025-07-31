import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from '../../services/api'
import './filmes.css'
import { toast } from "react-toastify";

function Filmes(){
    const {id} = useParams();
    const navigate = useNavigate();
   
    const [loading, setLoading] = useState(true);
    const [filme, setFilme] = useState({});


    useEffect(()=>{
        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params:{
                    api_key:'2036df264b59354ad360c8e877a0294f',
                    language:'pt-BR',
                }
            })
            .then((response)=>{
                console.log(response.data)
                setFilme(response.data);
                setLoading(false);
            })
            .catch(()=>{
                console.log('filme nao encontrado')
                navigate("/",{replace: true})
            })
        }
        loadFilme();

        return () => {
            console.log("desmonta o componente ao ir para outra pagina")
        }
    }, [id, navigate]);

   function salvarFilme(){
    const minhaLista = localStorage.getItem("@FilmesSearch");
    let filmesSalvos = JSON.parse(minhaLista) || [];

    const temFilme = filmesSalvos.some((filmesSalvo)=> filmesSalvo.id === filme.id)
    if(temFilme){
        toast.warning('Filme já está na lista!')
        //alert('Filme ja está na lista')
        return;
    }
    filmesSalvos.push(filme);
    localStorage.setItem("@FilmesSearch", JSON.stringify(filmesSalvos));
    toast.success('Filme salvo com sucesso!')
   }

    if(loading){
        return(
            <div className="carregamento-info">
                <h1>Carregando informações...</h1>
            </div>
        )
    }
    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original${filme.backdrop_path}`} alt={filme.title}/>
            <h3>Sinopse:</h3>
            <span>{filme.overview}</span>
            <div className="min-note">
                <strong>Duração {filme.runtime} min.</strong>
                <strong>Avaliação:{filme.vote_average}/10</strong>
            </div>
            <div className="btn-area">
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="blank" rel="external" href={`https://www.youtube.com/results?search_query=${filme.title} trailer`}>Trailer</a>
                </button>
            </div>
        </div>
    );
}

export default Filmes;