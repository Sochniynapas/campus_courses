
export function SwalsForRegistration(statusCode, navigate, setBusy) {
    switch (statusCode) {
        case 200:
            navigate('/')
            swal({
                title: "Успешно!",
                text: "Вы успешно зарегистрировались!",
                icon: "success",
                button: "Продолжить",
            });
            setBusy(false)
            break
        case 400:
            swal({
                title: "Ошибка",
                text: "Проверьте введённые поля",
                icon: "error",
                button: "Продолжить",
            });
            break
        case 409:
            swal({
                title: "Ошибка",
                text: "Почта уже занята",
                icon: "error",
                button: "Продолжить",
            });
            setBusy(true)
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