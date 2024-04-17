
import { clearToken } from "../../../../store/slice/authSlice";

export default function SwalCreateNotificationContent(statusCode, handleClose, dispatch, navigate) {

    switch (statusCode) {
        case 200:
            handleClose()
            swal({
                title: "Успешно!",
                text: "Вы успешно создали уведомление!",
                icon: "success",
                button: "Продолжить"
            })
            break
        case 400:
            swal({
                title: "Ошибка",
                text: "Поле должно быть заполнено",
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

const handleCreateNotification = async(createNotification, token, notificationData, id, setIsRequired, handleClose, dispatch, navigate, setNotificationData) => {
    const response = await createNotification({token: token, body: {text: notificationData.text, isImportant: notificationData.isImportant}, id: id})
    if(response.error){
        if(response.error.status === 400){
            setIsRequired(true)
        }
        SwalCreateNotificationContent(response.error.status, handleClose, dispatch, navigate)
    }
    else{
        SwalCreateNotificationContent(200, handleClose, dispatch, navigate)
        setNotificationData({})
        setIsRequired(false)
    }
}

const handleChangeData = (type, value, setNotificationData) =>{
    setNotificationData((prevFields)=>({
        ...prevFields,
        [type]: value
    }))
}

const handleChangeImportant = (notificationData) =>{
    if(notificationData.isImportant){
        return false
    }
    else{
        return true
    }
}

export {handleCreateNotification, handleChangeData, handleChangeImportant}