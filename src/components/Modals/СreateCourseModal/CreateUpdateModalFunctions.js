import { clearToken } from "../../../store/slice/authSlice";


export function SwalContent(statusCode, text, handleClose, dispatch, navigate) {
    switch (statusCode) {
        case 200:
            handleClose()
            swal({
                title: "Успешно!",
                text: text,
                icon: "success",
                button: "Продолжить"
            })
            break
        case 400:
            swal({
                title: "Ошибка",
                text: "Проверьте введённые поля",
                icon: "error",
                button: "Продолжить",
            });
            break
        case 401:
            handleClose()
            dispatch(clearToken())
            navigate("/")
            swal({
                title: "Ошибка",
                text: "Вам следует авторизоваться",
                icon: "error",
                button: "Продолжить",
            });
            break
        case 403:
            handleClose()
            navigate("/")
            swal({
                title: "Ошибка",
                text: "У вас нет прав на создание курсов",
                icon: "error",
                button: "Продолжить",
            });
            break
        default:
            handleClose()
            swal({
                title: "Ошибка",
                text: "Произошла непредвиденная ошибка",
                icon: "error",
                button: "Продолжить",
            });
            break
    }
}

const handleFieldChange = (fieldName, value, setFields) => {
    setFields(prevFields => ({
        ...prevFields,
        [fieldName]: value
    }))

}
const handleAutoPickSemester = (type, fields) => {
    if (fields.semester === type) {
        return true
    }
    else {
        return false
    }
}

const handleCUCourse = async (isCourseWindow, locate, isAdmin, updateCourse, updateReqAndAnnot, createCourse, handleClose, navigate, dispatch, token, id, fields, ) => {

    if (isCourseWindow.test(locate)) {
        if (isAdmin) {
            const response = await updateCourse({ token: token, body: fields, id: id })
            if (response.data) {
                console.log(response)
                SwalContent(200, "Вы успешно изменили курс!", handleClose, navigate)
            }
            else {
                SwalContent(response.error.status, handleClose, dispatch, navigate)
            }
        }
        else {
            const response = await updateReqAndAnnot({ token: token, id: id, data: { requirements: fields.requirements, annotations: fields.annotations } })
            if (response.data) {
                SwalContent(200, "Вы успешно изменили курс!", handleClose, navigate)
            }
            else {
                SwalContent(response.error.status, handleClose, dispatch, navigate)
            }
        }
    }
    else {
        const response = await createCourse({ token: token, body: fields, id: id })
        if (response.data) {
            SwalContent(200,"Вы успешно создали курс!", handleClose, navigate)
        }
        else {
            SwalContent(response.error.status, handleClose, dispatch, navigate)
        }
    }
}
export {handleCUCourse, handleAutoPickSemester, handleFieldChange}