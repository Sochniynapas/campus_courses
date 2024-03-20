import { FormLabel } from "react-bootstrap"

export function ProfileValidation(prop) {
    const regexPassword = /^(?=.*\d).{6,}$/
    const regexName = /^.{1,}$/
    const regexEmail = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/

    switch (prop.type) {
        case 'name':
            return (
                <>
                    {!regexName.test(prop.input) ? (
                        <FormLabel className="text-danger">
                            ФИО должно состоять минимум из 1 символа
                        </FormLabel>
                    ) : (
                        null
                    )}
                </>
            )
        case 'password':
            return (
                <>
                    {!regexPassword.test(prop.input) ? (
                        <FormLabel className="text-danger">
                            Пароль должен быть длиной минимум 6 символов и содержать 1 цифру
                        </FormLabel>
                    ) : (
                        null
                    )}
                </>
            )
        case 'email':
            return (
                <>
                    {!regexEmail.test(prop.input) ? (
                        <FormLabel className="text-danger">
                            Почта должна иметь вид user@example.com
                        </FormLabel>
                    ) : (
                        null
                    )}
                </>
            )
        case 'date':
            return (
                <>
                    {!prop.input ? (
                        <FormLabel className="text-danger">
                            Выберите дату рождения
                        </FormLabel>
                    ) : new Date(prop.input) >= new Date() ? (
                        (
                            <FormLabel className="text-danger">
                                Дата должна быть меньше сегодняшей
                            </FormLabel>
                        )
                    ) : null
                    }
                </>
            )
    }
}