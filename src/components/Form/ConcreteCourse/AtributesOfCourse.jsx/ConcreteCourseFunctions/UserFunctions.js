import SwalChangeStudentStatusContent from "../SwalsOfACourse/SwalForChangeStudentStatus"

export async function  handleEditStudentStatus(editStudentStatus, token, studentStatus, id, student, dispatch, navigate, setStudentStatus){
    const response = await editStudentStatus({ token: token, body: { status: studentStatus }, courseId: id, studentId: student.id })
    console.log(response)
    if (response.error) {
        SwalChangeStudentStatusContent(response.error.status, "", dispatch, navigate)
        setStudentStatus("")
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
export function handleShow (type, setWhichResult) {
    setWhichResult(prevFields => ({
        ...prevFields,
        [type]: true
    }))
}

export function handleClose (type, setWhichResult) {
    setWhichResult(prevFields => ({
        ...prevFields,
        [type]: false
    }))
}
export function handleClick (status, setStudentStatus) {
    if (status === "Declined") {
        setStudentStatus("Declined")
    }
    else {
        setStudentStatus("Accepted")
    }
}