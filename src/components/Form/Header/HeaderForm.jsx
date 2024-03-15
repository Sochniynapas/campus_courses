import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function Header(prop){
    console.log(prop)
    return (
        <>
            {prop.num === 1 ? (
                <Nav><Link className='nav-link text-white ' to='/ab'>Группы курсов</Link></Nav>
            ) : prop.num === 2 ? (
                <>
                    <Nav><Link className='nav-link text-white ' to='/ab'>Группы курсов</Link></Nav>
                    <Nav><Link className='nav-link text-white ' to='/ab'>Мои курсы</Link></Nav>
                </>
            ): prop.num === 3 ? (
                <>
                    <Nav><Link className='nav-link text-white ' to='/ab'>Группы курсов</Link></Nav>
                    <Nav><Link className='nav-link text-white ' to='/ab'>Преподаваемые курсы курсы</Link></Nav>
                </>
            ): prop.num === 4 ? (
                <>
                    <Nav><Link className='nav-link text-white ' to='/ab'>Группы курсов</Link></Nav>
                    <Nav><Link className='nav-link text-white ' to='/ab'>Мои курсы</Link></Nav>
                    <Nav><Link className='nav-link text-white ' to='/ab'>Преподаваемые курсы курсы</Link></Nav>
                </>
            ) : null}
        </>
    )
}

export default Header;