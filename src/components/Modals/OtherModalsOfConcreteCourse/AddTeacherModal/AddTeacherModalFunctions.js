
import { clearToken } from "../../../../store/slice/authSlice";

export default function SwalAddTeacherContent(statusCode, handleClose, dispatch, navigate) {

    switch (statusCode) {
        case 200:
            handleClose()
            swal({
                title: "Успешно!",
                text: "Вы добавили нового преподавателя!",
                icon: "success",
                button: "Продолжить"
            })
            break
        case 400:
            swal({
                title: "Ошибка",
                text: "Проверьте, корректен ли ваш выбор",
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
        case 404:
            handleClose()
            swal({
                title: "Ошибка",
                text: "Не удалось ничего найти по данному запросу",
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

const handleAddTeacher = async (addTeacher, token, teacher, id, setIsSelect, handleClose, dispatch, navigate, setTeacher) => {
    const response = await addTeacher({ token: token, body: teacher, id: id })
    if (response.error) {
        if (response.error.status === 400) {
            setIsSelect(true)
        }
        SwalAddTeacherContent(response.error.status, handleClose, dispatch, navigate)
    }
    else {
        setIsSelect(false)
        handleClose()
        setTeacher({})
        SwalAddTeacherContent(200, handleClose, dispatch, navigate)
    }
}

const handleClearOption = (setTeacher, handleClose) => {
    setTeacher({})
    handleClose()
}

export {handleAddTeacher, handleClearOption}