import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useGetUserCoursesQuery, useGetUserTeachingCoursesQuery } from "../../../api/userApi";
import { useSelector } from "react-redux";
import { selectToken } from "../../../store/slice/authSlice";

function Header() {
    const token = useSelector(selectToken)
    const { data: userCourses } = useGetUserCoursesQuery(token);
    const { data: userCoursesTeaching } = useGetUserTeachingCoursesQuery(token);

    return (
        <>
            <Nav><Link className='nav-link text-white ' to='/groups'>Группы курсов</Link></Nav>
            {(userCourses && userCourses.length !== 0) &&
                (

                    <Nav><Link className='nav-link text-white ' to='/courses/my'>Мои курсы</Link></Nav>

                )
            }
            {(userCoursesTeaching && userCoursesTeaching.length !== 0) &&
                (

                    <Nav><Link className='nav-link text-white ' to='/courses/teaching'>Преподаваемые курсы</Link></Nav>

                )
            }
        </>
    )
}

export default Header;