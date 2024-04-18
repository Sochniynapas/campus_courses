
import swal from 'sweetalert'
const handleChangeNameOfGroup = async (editGroupName, dispatch, navigate, setIsRequired, name, token, prop, handleClose) => {
    const response = await editGroupName({ body: { name: name }, token: token, id: prop.id })
    debugger
    if (response.error) {
        SwalsForGroupEdit(response.error.status, dispatch, navigate, handleClose, setIsRequired)
    }
    else {
        SwalsForGroupEdit(200, dispatch, navigate, handleClose, setIsRequired)
    }
}

const handleDeleteGroup = async (dispatch, navigate, deleteGroup, token, prop) => {
    const response = await deleteGroup({ token: token, id: prop.id })
    if (!response.data) {
        if(response.error){
            SwalsForGroupDelete(response.error.status, dispatch, navigate)
        }
    }
}

function SwalsForGroupEdit(status, dispatch, navigate, handleClose, setIsRequired) {
    switch (status) {
        case 200:
            handleClose()
            setIsRequired(false)
            swal({
                title: "Успешно",
                text: "Вы успешно изменили группу",
                icon: "success",
                button: "Продолжить"
            });
            break
        case 400:
            setIsRequired(true)
            swal({
                title: "Ошибка",
                text: "Проверьте введенные данные",
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
        case 403:
            handleClose()
            navigate('/')
            swal({
                title: "Ошибка",
                text: "У вас нет доступа к данной функции",
                icon: "error",
                button: "Продолжить",
            });
            break

        case 404:
            handleClose()
            navigate('/')
            swal({
                title: "Ошибка",
                text: "Данной группы не существует",
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
function SwalsForGroupDelete(status, dispatch, navigate) {
    switch (status) {
        case 200:
            swal({
                title: "Успешно",
                text: "Вы успешно изменили группу",
                icon: "success",
                button: "Продолжить"
            });
            break
        case 401:
            localStorage.clear()
            navigate("/")
            swal({
                title: "Ошибка",
                text: "Вам следует авторизоваться",
                icon: "error",
                button: "Продолжить",
            });
            break
        case 403:
            navigate('/')
            swal({
                title: "Ошибка",
                text: "У вас нет доступа к данной функции",
                icon: "error",
                button: "Продолжить",
            });
            break

        case 404:
            navigate('/')
            swal({
                title: "Ошибка",
                text: "Данной группы не существует",
                icon: "error",
                button: "Продолжить",
            });
            break
        default:
            swal({
                title: "Ошибка",
                text: "Произошла непредвиденная ошибка",
                icon: "error",
                button: "Продолжить",
            });
            break
    }
}

export { handleChangeNameOfGroup, handleDeleteGroup }