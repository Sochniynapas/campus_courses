import { Button, Container, Form, FormCheck, FormControl, FormGroup, FormLabel, FormSelect, Modal } from "react-bootstrap"
import CourseInList from "./CourseInList"
import { useGetListOfCoursesQuery } from "../../../api/coursesApi"
import { useDispatch, useSelector } from "react-redux"
import { selectRoles } from "../../../store/slice/authSlice"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useGetGroupsQuery } from "../../../api/groupApi"
import CreateUpdateCourse from "../../Modals/СreateCourseModal/CreateCourseModal"
import { useGetUserCoursesQuery, useGetUserTeachingCoursesQuery } from "../../../api/coursesApi"
import SwalsForCoursesLoading from "./Swals/SwalsForCoursesLoading"

function CoursesList() {
    const token = localStorage.getItem("token")
    const role = useSelector(selectRoles)
    const { id } = useParams()
    const [groupName, setGroupName] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const path = window.location.pathname
    const checkTeaching = /courses\/teaching/
    const checkMy = /courses\/my/


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
        setFields({ reqirements: '' })
        setFields({ annotations: '' })
    };
    const handleShow = () => setShow(true);


    const { data: courses, error: coursesError, isError: coursesErrorStatus, isLoading } =
        checkTeaching.test(path) ? useGetUserTeachingCoursesQuery({ token: token })
            : checkMy.test(path) ? useGetUserCoursesQuery({ token: token })
                : useGetListOfCoursesQuery({ token: token, id: id })

    const { data: groups, error: groupsError, isError: groupsErrorStatus } = useGetGroupsQuery(token)

    useEffect(() => {
        console.log(isLoading)
        if (courses) {
        }
        else {
            if (coursesErrorStatus) {
                SwalsForCoursesLoading(coursesError.status, dispatch, navigate)
            }
        }
    }, [courses, coursesErrorStatus])

    useEffect(() => {
        if (groups && id) {
            const group = groups.find(obj => obj.id === id)
            setGroupName(group.name)
        }
        else {
            if (groupsErrorStatus && id) {
                SwalsForCoursesLoading(groupsError.status, dispatch, navigate)
            }
        }
    }, [groups, groupsErrorStatus])

    return (
        <Container className="d-flex flex-column ">
            <Form className="d-flex flex-column ">
                <FormLabel className="fw-bold display-5 h1 pt-3 pb-3" >
                    {groupName}
                </FormLabel>
                {(role.isAdmin && !checkMy.test(path) && !checkTeaching.test(path)) && (
                    <>
                        <div>
                            <Button className="mb-4 text-uppercase" onClick={handleShow}>Создать</Button>
                        </div>
                        <CreateUpdateCourse show={show} handleClose={handleClose} fields={fields} setFields={setFields} isAdmin={role.isAdmin} />
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
            </Form>
        </Container>
    )
}

export default CoursesList