import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectRoles } from "../../../store/slice/authSlice";

function Header() {
    const roles = useSelector(selectRoles)

    return (
        <>
            <Nav><Link className='nav-link text-white ' to='/groups'>Группы курсов</Link></Nav>
            {(roles.isStudent) &&
                (

                    <Nav><Link className='nav-link text-white ' to='/courses/my'>Мои курсы</Link></Nav>

                )
            }
            {(roles.isTeacher) &&
                (

                    <Nav><Link className='nav-link text-white ' to='/courses/teaching'>Преподаваемые курсы</Link></Nav>

                )
            }
        </>
    )
}

export default Header;