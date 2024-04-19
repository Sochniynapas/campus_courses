import swal from 'sweetalert'
const handleCreateNewGroup = async (createGroup, dispatch, navigate, name, token, handleClose, setIsRequired, setName) => {
    const response = await createGroup({ token: token, name: name })
    if (response.error) {
        SwalsForCreateGroupActions(response.error.status, dispatch, navigate, setIsRequired, handleClose)
    }
    else {
        setName('')
        SwalsForCreateGroupActions(200, dispatch, navigate, setIsRequired, handleClose)
    }
}
function SwalsForCreateGroupActions(statusCode, dispatch, navigate, setIsRequired, handleClose) {

    switch (statusCode) {
        case 200:
            handleClose()
            setIsRequired(false)
            swal({
                title: "Успешно",
                text: "Вы успешно создали группу",
                icon: "success",
                button: "Продолжить",
            })
            break
        case 400:
            setIsRequired(true)
            swal({
                title: "Ошибка",
                text: "Проверьте введенные поля",
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
                text: "У вас нет прав для создания группы",
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

export default handleCreateNewGroup