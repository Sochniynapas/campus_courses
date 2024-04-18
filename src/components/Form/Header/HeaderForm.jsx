import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { selectRoles, setLogin, setRoles } from "../../../store/slice/authSlice";
import { useGetUserProfileQuery, useGetUserRolesQuery } from "../../../api/userApi";
import { useEffect } from "react";

function Header() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const roles = useSelector(selectRoles)
    const token = localStorage.getItem("token")

    const { data: userRoles } = useGetUserRolesQuery(token)
    const { data: userData } = useGetUserProfileQuery(token)

    useEffect(() => {
        if (token && userRoles && userData) {
            dispatch(setLogin(userData.email))
            dispatch(setRoles(userRoles))
        }
    }, [token, userRoles]);


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