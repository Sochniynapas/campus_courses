import swal from 'sweetalert'
export default function SwalMarkContent(statusCode, handleClose, dispatch, navigate) {

    switch (statusCode) {
        case 200:
            handleClose()
            swal({
                title: "Успешно!",
                text: "Вы успешно изменили оценку по аттестации студента!",
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
            localStorage.clear()
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
            navigate("/")
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

const hanadleEditMark = async(token, markData, editMark, id, studentId, setIsRequired, handleClose, dispatch, navigate, setMarkData,) =>{
    const response = await editMark({token: token, body: markData, courseId: id, studentId: studentId, })
    if(response.error){
        if(response.error.status === 400){
            setIsRequired(true)
        }
        SwalMarkContent(response.error.status, handleClose, dispatch, navigate)
    }
    else{
        setIsRequired(false)
        setMarkData({})
        SwalMarkContent(200, handleClose, dispatch, navigate)
    }
}
const handleChooseMark=(value, type, setMarkData)=>{
    if(type === "Промежуточной аттестации"){
        setMarkData({markType: "Midterm", mark: value})
    }
    else{
        setMarkData({markType: "Final", mark: value})
    }
}
const handleDefaultChecked = (value, markData)=>{
    if(value === markData.mark){
        return true
    }
}

export {hanadleEditMark, handleChooseMark, handleDefaultChecked}