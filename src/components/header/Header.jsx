import {Link} from 'react-router-dom'
import './header.css'
function Header(){
    return(
        <header>
            <Link className='logo' to='/'> Filmes Search</Link>
            <Link className='favoritos' to='/meusfilmes'> Meus Filmes</Link>
        </header>
    );
}

export default Header