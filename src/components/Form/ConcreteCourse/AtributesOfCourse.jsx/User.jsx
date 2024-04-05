import { Button, FormLabel } from "react-bootstrap"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import ChangeResult from "../../../Modals/OtherModalsOfConcreteCourse/ChangeResultModal/ChangeResultModal"
import { useChangeUserStatusMutation } from "../../../../api/coursesApi"
import SwalChangeStudentStatusContent from "./SwalsOfACourse/SwalForChangeStudentStatus"
import { useDispatch, useSelector } from "react-redux"
import { selectToken } from "../../../../store/slice/authSlice"


const User = (
    {
        student,
        last,
        isTeacher,
        isAdmin,
        currentUserEmail,
    }
) => {
    const [editStudentStatus] = useChangeUserStatusMutation()

    const { id } = useParams()
    const token = useSelector(selectToken)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [studentStatus, setStudentStatus] = useState("")
    const [whichResult, setWhichResult] = useState({
        middleResult: false,
        finalResult: false
    })
    const handleShow = (type) => {
        setWhichResult(prevFields => ({
            ...prevFields,
            [type]: true
        }))
    }

    const handleClose = (type) => {
        setWhichResult(prevFields => ({
            ...prevFields,
            [type]: false
        }))
    }

    const handleEditStudentStatus = async () => {
        const response = await editStudentStatus({ token: token, body: { status: studentStatus }, courseId: id, studentId: student.id })
        console.log(response)
        if (response.error) {
            SwalChangeStudentStatusContent(response.error.status, "", dispatch, navigate)
        }
        else {

            if (studentStatus === "Declined") {
                SwalChangeStudentStatusContent(200, "отклонили", dispatch, navigate)
                setStudentStatus("")
            }
            else {
                SwalChangeStudentStatusContent(200, "приняли", dispatch, navigate)
                setStudentStatus("")
            }
        }
    }

    useEffect(() => {
        if (studentStatus !== "") {
            handleEditStudentStatus()
        }
    }, [studentStatus])

    const handleClick = (status) => {
        if (status === "Declined") {
            setStudentStatus("Declined")
        }
        else {
            setStudentStatus("Accepted")
        }
    }
    return (
        <>

            <div className={last ? "d-flex flex-lg-row flex-column justify-content-lg-between col-12 p-3"
                : "d-flex flex-lg-row flex-column justify-content-lg-between border-bottom col-12 p-3"}>

                <div className="d-flex flex-column col-4">
                    <FormLabel className="m-0">Студент - {student.name}</FormLabel>
                    <FormLabel className="fw-light m-0">
                        Статус -
                        {student.status === "InQueue" && (isTeacher || isAdmin) ? (
                            <FormLabel className="text-primary m-0">в очереди</FormLabel>
                        ) : student.status === "Accepted" ? (
                            <FormLabel className="text-success m-0">принят в группу</FormLabel>
                        ) : student.status === "Declined" && (isTeacher || isAdmin) ? (
                            <FormLabel className="text-danger m-0">отклонён</FormLabel>
                        ) : null}
                    </FormLabel>
                    <FormLabel className="fw-light m-0">{student.email}</FormLabel>
                </div>
                {((isTeacher || isAdmin) || (currentUserEmail === student.email && student.status === "Accepted")) &&
                    <>
                        {student.status === "InQueue" ? (
                            <div className="col-lg-6 d-flex flex-row justify-content-lg-end  ">
                                <Button onClick={() => handleClick("Accepted")} className="me-3 col-lg-3">
                                    Принять
                                </Button>
                                <Button onClick={() => handleClick("Declined")} className="text-bg-danger border-0 col-lg-3">
                                    Отклонить заявку
                                </Button>
                            </div>
                        ) : (
                            <>
                                {student.status !== "Declined" &&
                                    <>
                                        <div className="col-4">
                                            <Link onClick={() => handleShow("middleResult")} className="m-0">Промежуточная аттестация </Link>
                                            <span> - </span>
                                            {student.midtermResult === "NotDefined" || student.midtermResult === null ? (
                                                <FormLabel className="text-bg-secondary p-1 rounded-3 m-0 text-lowercase ">отметки нет</FormLabel>
                                            ) : student.midtermResult === "Passed" ? (
                                                <FormLabel className="text-bg-success p-1 rounded-3 m-0 text-lowercase ">успешно пройдена</FormLabel>
                                            ) : student.midtermResult === "Failed" ? (
                                                <FormLabel className="text-bg-danger p-1 rounded-3 m-0 text-lowercase ">зафейлена</FormLabel>
                                            ) : null}

                                        </div>
                                        <div className="col-4">
                                            <Link onClick={() => handleShow("finalResult")} className="m-0">Промежуточная аттестация </Link>
                                            <span> - </span>
                                            {student.finalResult === "NotDefined" || student.finalResult === null ? (
                                                <FormLabel className="text-bg-secondary p-1 rounded-3 m-0 text-lowercase ">отметки нет</FormLabel>
                                            ) : student.finalResult === "Passed" ? (
                                                <FormLabel className="text-bg-success p-1 rounded-3 m-0 text-lowercase ">успешно пройдена</FormLabel>
                                            ) : student.finalResult === "Failed" ? (
                                                <FormLabel className="text-bg-danger p-1 rounded-3 m-0 text-lowercase ">зафейлена</FormLabel>
                                            ) : null}
                                        </div>
                                        <ChangeResult
                                            show={whichResult.middleResult}
                                            handleClose={() => handleClose("middleResult")}
                                            type={"Промежуточной аттестации"}
                                            name={student.name}
                                            studentId={student.id}
                                        />
                                        <ChangeResult
                                            show={whichResult.finalResult}
                                            handleClose={() => handleClose("finalResult")}
                                            type={"Финальной аттестации"}
                                            name={student.name}
                                            studentId={student.id}
                                        />
                                    </>
                                }
                            </>
                        )
                        }
                    </>
                }
            </div >

        </>
    )
}
export default User