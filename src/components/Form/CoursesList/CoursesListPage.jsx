import { Button, Container, FormCheck, FormControl, FormGroup, FormLabel, FormSelect, Modal } from "react-bootstrap"
import CourseInList from "./CourseInList"
import { useGetListOfCoursesQuery } from "../../../api/coursesApi"
import { useDispatch, useSelector } from "react-redux"
import { clearToken, selectRoles, selectToken } from "../../../store/slice/authSlice"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { useGetGroupsQuery } from "../../../api/groupApi"
import swal from "sweetalert"
import CreateCourse from "../../Modals/CreateCourseModal"

function CoursesList() {
    const token = useSelector(selectToken)
    const role = useSelector(selectRoles)
    const { id } = useParams()
    const [groupName, setGroupName] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [fields, setFields] = useState({
        name: '',
        startYear: '',
        maximumStudentsCount: '',
        semester: '',
        requirements: '',
        annotations: '',
        mainTeacherId: ''
    });
    

    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false)
        setFields({reqirements:''})
        setFields({annotations:''})
    };
    const handleShow = () => setShow(true);

    const { data: courses, error: coursesError, isError: coursesErrorStatus } = useGetListOfCoursesQuery({ token: token, id: id })
    const { data: groups, error: groupsError, isError: groupsErrorStatus } = useGetGroupsQuery(token)

    useEffect(() => {
        if (courses) {
            console.log(courses)
        }
        else {
            if (coursesErrorStatus) {
                if (coursesError.status === 401) {
                    dispatch(clearToken())
                    navigate('/')
                    swal({
                        title: "Ошибка",
                        text: "Вам следует авторизоваться",
                        icon: "error",
                        button: "Продолжить",
                    });
                }
                else if (coursesError.status === 404) {
                    navigate('/')
                    swal({
                        title: "Ошибка",
                        text: "Данной группы не существует",
                        icon: "error",
                        button: "Продолжить",
                    });
                }
            }
        }
    }, [courses, coursesErrorStatus])

    useEffect(() => {
        if (groups) {
            const group = groups.find(obj => obj.id === id)
            setGroupName(group.name)
        }
        else {
            if (groupsErrorStatus) {
                if (groupsError.status === 401) {
                    dispatch(clearToken())
                    navigate('/')
                    swal({
                        title: "Ошибка",
                        text: "Вам следует авторизоваться",
                        icon: "error",
                        button: "Продолжить",
                    });
                }
                else {
                    swal({
                        title: "Ошибка",
                        text: "Произошла непредвиденная ошибка",
                        icon: "error",
                        button: "Продолжить",
                    });
                }
            }
        }
    }, [groups, groupsErrorStatus])

    return (
        <Container className="d-flex flex-column ">
            <FormLabel className="fw-bold display-5 h1 pt-3 pb-3" >
                {groupName}
            </FormLabel>
            {role.isAdmin && (
                <>

                    <Button className="col-1 mb-4 text-uppercase" onClick={handleShow}>Создать</Button>
                    <CreateCourse show={show} handleClose={handleClose} fields={fields} setFields={setFields}/>
                </>

            )}
            {courses && courses.map(course => (
                <CourseInList
                    key={course.id}
                    name={course.name}
                    id={course.id}
                    year={course.startYear}
                    maxStudents={course.maximumStudentsCount}
                    remainSlots={course.remainingSlotsCount}
                    semester={course.semester}
                    status={course.status} />
            ))}

        </Container>
    )
}

export default CoursesList