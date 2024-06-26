
import { Button, Card, Container, Form, FormGroup, FormLabel, Tab, TabContent, Tabs } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import { useDeleteCourseMutation, useGetCoursePageQuery, useSignUpForACourseMutation } from "../../../api/coursesApi"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectLogin, selectRoles } from "../../../store/slice/authSlice"
import Status from "../../Status/StatusComponent"
import Semester from "../../Semester/SemesterComponent"
import CustomNotification from "./AtributesOfCourse.jsx/Notification"
import Teacher from "./AtributesOfCourse.jsx/Teacher"
import User from "./AtributesOfCourse.jsx/User"
import CreateUpdateCourse from "../../Modals/СreateCourseModal/CreateCourseModal"
import AddTeacher from "../../Modals/OtherModalsOfConcreteCourse/AddTeacherModal/AddTeacherModal"
import CreateNotification from "../../Modals/OtherModalsOfConcreteCourse/CreateNotificationModal/CreateNotificationModal"
import ChangeStatus from "../../Modals/OtherModalsOfConcreteCourse/ChangeStatusModal/ChangeStatusModal"
import SwalGetCourseDataContent from "./AtributesOfCourse.jsx/SwalsOfACourse/SwalForGetCourseData"
import { handleCloseSimple, handleDeleteCourse, handleShowSimple, handleSignUp, setCourseFields } from "./AtributesOfCourse.jsx/ConcreteCourseFunctions/CourseFunctions"
import DeleteModal from "../../Modals/OtherModalsOfConcreteCourse/ModalForConfirmDelete"

function ConcreteCourse() {

    const { id } = useParams()
    const token = localStorage.getItem("token")
    const role = useSelector(selectRoles)
    const emailOfUser = useSelector(selectLogin)

    const [isTeacherOfCourse, setIsTeacherOfCourse] = useState({})
    const [signUpToACourse] = useSignUpForACourseMutation()
    const [deleteCourse] = useDeleteCourseMutation()
    const { data: courseData, error: getCourseError, isLoading } = useGetCoursePageQuery({ token, id })

    const [fields, setFields] = useState({
        name: '',
        startYear: '',
        maximumStudentsCount: '',
        semester: '',
        requirements: '',
        annotations: '',
        mainTeacherId: ''
    });
    const [showSimpleModal, setShowSimpleModal] = useState({
        addTeacher: false,
        changeMiddleResult: false,
        changeFinalResult: false,
        changeStatus: false,
        createNotification: false,
        deleteCourseModal: false
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true);



    useEffect(() => {
        if (getCourseError) {
            SwalGetCourseDataContent(getCourseError.status, dispatch, navigate)
        }
        else {
            if (courseData) {
                console.log(courseData)
                setCourseFields(setIsTeacherOfCourse, setFields, courseData, emailOfUser, role)
            }

        }
    }, [courseData, getCourseError])

    return (
        <Container>
            {courseData &&
                <Form>
                    <FormLabel className="h1 pb-4 pt-4 text-break ">{courseData.name}</FormLabel>
                    <FormGroup className="d-flex justify-content-between  flex-lg-row flex-column pb-1">
                        <FormLabel className="h3">Основные данный курса</FormLabel>
                        {(isTeacherOfCourse !== undefined || role.isAdmin) &&
                            <div>
                                <Button variant="warning" className="text-uppercase text-black border-0 me-2" onClick={handleShow}>
                                    Редактировать
                                </Button>
                                <Button variant="danger" className="text-uppercase text-white border-0" onClick={() => handleShowSimple("deleteCourseModal", setShowSimpleModal)}>
                                    Удалить
                                </Button>
                            </div>
                        }
                        <DeleteModal
                            show={showSimpleModal.deleteCourseModal}
                            handleClose={() => handleCloseSimple("deleteCourseModal", setShowSimpleModal)}
                            deleteCourse={deleteCourse}
                            navigate={navigate}
                            token={token}
                            id={id}
                        />
                        <CreateUpdateCourse show={show} handleClose={handleClose} fields={fields} setFields={setFields} isAdmin={role.isAdmin} />
                    </FormGroup>
                    <Card>
                        <FormGroup className="d-flex justify-content-between  flex-lg-row flex-column pt-1 pb-1 ps-3 pe-3 border-bottom">
                            <div className="d-flex flex-column">
                                <FormLabel className="fw-bold">Статус курса</FormLabel>
                                <Status status={courseData.status} />
                            </div>
                            {(isTeacherOfCourse !== undefined || role.isAdmin) ?
                                (
                                    <>
                                        <Button variant="warning" onClick={() => handleShowSimple("changeStatus", setShowSimpleModal)} className="text-uppercase text-black border-0 mt-2 mb-2">
                                            Изменить
                                        </Button>
                                        <ChangeStatus
                                            show={showSimpleModal.changeStatus}
                                            handleClose={() => handleCloseSimple("changeStatus", setShowSimpleModal)}
                                        />
                                    </>
                                ) : (!courseData.students.find(student => student.email === emailOfUser) && courseData.status === "OpenForAssigning") ? (
                                    <Button variant="success" className="text-uppercase text-white border-0 mt-2 mb-2" onClick={() => handleSignUp(signUpToACourse, dispatch, navigate, token, id)}>
                                        записаться на курс
                                    </Button>
                                ) : null

                            }
                        </FormGroup>
                        <FormGroup className="d-flex justify-content-between  flex-lg-row flex-column pt-1 pb-1 ps-3 pe-3 border-bottom">
                            <div className="d-flex flex-column col-6">
                                <FormLabel className="fw-bold">Учебный год</FormLabel>
                                <FormLabel >{courseData.startYear}-{courseData.startYear + 1}</FormLabel>
                            </div>
                            <div className="d-flex flex-column col-6">
                                <FormLabel className="fw-bold">Семестр</FormLabel>
                                <Semester semester={courseData.semester} />
                            </div>
                        </FormGroup>
                        <FormGroup className="d-flex justify-content-between  flex-lg-row flex-column pt-1 pb-1 ps-3 pe-3 border-bottom">
                            <div className="d-flex flex-column col-6">
                                <FormLabel className="fw-bold">Всего мест</FormLabel>
                                <FormLabel >{courseData.maximumStudentsCount}</FormLabel>
                            </div>
                            <div className="d-flex flex-column col-6">
                                <FormLabel className="fw-bold">Студентов зачислено</FormLabel>
                                <FormLabel >{courseData.studentsEnrolledCount}</FormLabel>
                            </div>
                        </FormGroup>
                        <FormGroup className="d-flex justify-content-between  flex-lg-row flex-column pt-1 pb-1 ps-3 pe-3">
                            <div className="d-flex flex-column">
                                <FormLabel className="fw-bold">Заявок на рассмотрении</FormLabel>
                                <FormLabel >{courseData.studentsInQueueCount}</FormLabel>
                            </div>
                        </FormGroup>
                    </Card>
                    <FormGroup className="pt-5">
                        <Tabs
                            defaultActiveKey="data"
                            id="justify-tab-example "
                            justify
                        >
                            <Tab eventKey="requirements" title="Требования к курсу" className="p-3 border-end border-start border-bottom">
                                <div className="text-break" dangerouslySetInnerHTML={{ __html: `${courseData.requirements}` }} />
                            </Tab>
                            <Tab eventKey="annotations" title="Аннотации" className="p-3 border-end border-start border-bottom">
                                <div className="text-break" dangerouslySetInnerHTML={{ __html: `${courseData.annotations}` }} />
                            </Tab>
                            <Tab eventKey="notifications" title={<>{`Уведомления `}<span className=" rounded-4 text-bg-danger ps-2 pe-2">{courseData.notifications.length}+</span></>} className="p-3 border-end border-start border-bottom">
                                <TabContent key={id} className="d-flex flex-column">
                                    {(role.isAdmin || isTeacherOfCourse) &&
                                        <div className="pb-4">
                                            <Button onClick={() => handleShowSimple("createNotification", setShowSimpleModal)}>
                                                Создать уведомление
                                            </Button>
                                            <CreateNotification
                                                show={showSimpleModal.createNotification}
                                                handleClose={() => handleCloseSimple("createNotification", setShowSimpleModal)}
                                            />
                                        </div>
                                    }

                                    {courseData.notifications.map((notification, index) => (
                                        <CustomNotification
                                            key={index}
                                            isImportant={notification.isImportant}
                                            last={index === courseData.notifications.length - 1}
                                            text={notification.text}
                                        />
                                    ))}
                                </TabContent>
                            </Tab>
                        </Tabs>
                    </FormGroup>
                    <FormGroup className="pt-5">
                        <Tabs
                            defaultActiveKey="data"
                            id="justify-tab-example "
                            justify
                        >
                            <Tab eventKey="annotations" title="Преподаватели" className="p-3 border-end border-start border-bottom">
                                <TabContent>
                                    {(role.isAdmin || courseData.teachers.find(teacher => teacher.email === emailOfUser)) &&
                                        <>
                                            <Button className="mb-4" onClick={() => handleShowSimple("addTeacher", setShowSimpleModal)}>Добавить преподавателя</Button>
                                            <AddTeacher
                                                show={showSimpleModal.addTeacher}
                                                handleClose={() => handleCloseSimple("addTeacher", setShowSimpleModal)}
                                            />
                                        </>
                                    }
                                    {courseData.teachers.map((teacher, index) => (
                                        <Teacher
                                            key={index}
                                            name={teacher.name}
                                            email={teacher.email}
                                            isMain={teacher.isMain}
                                            last={index === courseData.teachers.length - 1}
                                        />
                                    ))}
                                </TabContent>
                            </Tab>
                            <Tab eventKey="requirements" title="Студенты" className="p-3 d-flex flex-column border-end border-start border-bottom">

                                <TabContent className="d-flex flex-column">
                                    {courseData.students.map((student, index) => (
                                        <User
                                            key={student.email}
                                            student={student}
                                            last={index === courseData.students.length - 1}
                                            isTeacher={isTeacherOfCourse !== undefined}
                                            isAdmin={role.isAdmin}
                                            currentUserEmail={emailOfUser}
                                        />
                                    ))}
                                </TabContent>

                            </Tab>
                        </Tabs>
                    </FormGroup>
                </Form>
            }
        </Container >
    )
}
export default ConcreteCourse