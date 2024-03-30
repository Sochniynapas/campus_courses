import { Button, FormCheck, FormControl, FormGroup, FormLabel, Modal } from "react-bootstrap"
import CourseTextEditor from "../TextEditors/CourseTextEditor"
import Select from "react-select"
import { useGetAllUsersQuery } from "../../api/userApi"
import { useDispatch, useSelector } from "react-redux"
import { clearToken, selectToken } from "../../store/slice/authSlice"
import { useEffect, useState } from "react"
import { useCreateCourseMutation } from "../../api/coursesApi"
import { useNavigate, useParams } from "react-router-dom"
import swal from "sweetalert"


function CreateCourse({ show, handleClose, fields, setFields }) {

    const token = useSelector(selectToken)
    const { data: users, error: usersError } = useGetAllUsersQuery(token)
    const [transformedUsers, setTransformedUsers] = useState([])
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [createCourse] = useCreateCourseMutation()

    const dateValid = /^(200\d|201\d|202[0-5])$/
    const countValid = /^(\d|[1-9]\d|1\d\d|200)$/

    const handleFieldChange = (fieldName, value) => {
        setFields(prevFields => ({
            ...prevFields,
            [fieldName]: value
        }))
        console.log(fields)

    }

    const handleCreateCourse = async () => {
        const response = await createCourse({ token: token, body: fields, id: id })
        if (response.data) {
            swal({
                title: "Успешно!",
                text: "Вы зарегистрировали новую группу!",
                icon: "success",
                button: "Продолжить"
            })
            handleClose()
        }
        else {
            if (response.error.status === 400) {
                swal({
                    title: "Ошибка",
                    text: "Проверьте введённые поля",
                    icon: "error",
                    button: "Продолжить",
                });
            }
            else if (response.error.status === 401) {
                handleClose()
                dispatch(clearToken())
                navigate("/")
                swal({
                    title: "Ошибка",
                    text: "Вам следует авторизоваться",
                    icon: "error",
                    button: "Продолжить",
                });
            }
            else if (response.error.status === 493) {
                handleClose()
                navigate("/")
                swal({
                    title: "Ошибка",
                    text: "У вас нет прав на создание курсов",
                    icon: "error",
                    button: "Продолжить",
                });
            }
            else {
                handleClose()
                swal({
                    title: "Ошибка",
                    text: "Произошла непредвиденная ошибка",
                    icon: "error",
                    button: "Продолжить",
                });
            }
        }
    }

    useEffect(() => {
        if (users) {
            console.log(users)
            const transformedUsers = users.map(user => ({
                value: user.id,
                label: user.fullName
            }))
            setTransformedUsers(transformedUsers)
        }
    }, [users, usersError])

    console.log(parseInt(fields.startYear))


    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="xl"
                enforceFocus={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Создание курса</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup className="pb-4">
                        <FormLabel>Название курса</FormLabel>
                        <FormControl type={'text'} onChange={(e) => (handleFieldChange('name', e.target.value))}></FormControl>
                        {!fields.name &&
                            <FormLabel className="text-danger">Поле названия не должно быть пустым</FormLabel>
                        }
                    </FormGroup>
                    <FormGroup className="pb-4">
                        <FormLabel>Год начала курса</FormLabel>
                        <FormControl type={'text'} onChange={(e) => (handleFieldChange('startYear', e.target.value))}></FormControl>
                        {!dateValid.test(fields.startYear) &&
                            <FormLabel className="text-danger">Значение поля не должно быть пустым, и год находится между 2000 и 2029 включительно</FormLabel>
                        }
                    </FormGroup>
                    <FormGroup className="pb-4">
                        <FormLabel>Общее количество мест</FormLabel>
                        <FormControl type={'text'} onChange={(e) => (handleFieldChange('maximumStudentsCount', e.target.value))}></FormControl>
                        {!countValid.test(fields.maximumStudentsCount) &&
                            <FormLabel className="text-danger">Значение поля не должно быть пустым, и максимальное количество мест находится между 1 и 200</FormLabel>
                        }
                    </FormGroup>
                    <FormLabel>Семестр</FormLabel>
                    <FormGroup>
                        <FormCheck
                            inline
                            label="Осенний"
                            name="group1"
                            type={'radio'}
                            id={`inline-${'radio'}-1`}
                            onChange={() => {
                                handleFieldChange('semester', 'Autumn')
                            }}

                        />
                        <FormCheck
                            inline
                            label="Весенний"
                            name="group1"
                            type={'radio'}
                            id={`inline-${'radio'}-2`}
                            onChange={() => {
                                handleFieldChange('semester', 'Spring')
                            }}
                        />
                    </FormGroup>
                    {!fields.semester ?
                        (<FormLabel className="text-danger pb-4">Выберите семестр</FormLabel>
                        ) : (
                            <br className="pb-4"></br>
                        )
                    }
                    <FormGroup className="pb-4">
                        <FormLabel>Требования</FormLabel>
                        <CourseTextEditor setValue={handleFieldChange} type={"requirements"} />
                        {!fields.requirements &&
                            <FormLabel className="text-danger">Поле не должно оставаться нетронутым</FormLabel>
                        }
                    </FormGroup>
                    <FormGroup className="pb-4">
                        <FormLabel>Аннотации</FormLabel>
                        <CourseTextEditor setValue={handleFieldChange} type={"annotations"} />
                        {!fields.annotations &&
                            <FormLabel className="text-danger">Поле не должно оставаться нетронутым</FormLabel>
                        }
                    </FormGroup>
                    <FormLabel>Оснвной преподаватель курса</FormLabel>
                    {users && <Select options={transformedUsers} onChange={(selectedOption) => handleFieldChange('mainTeacherId', selectedOption.value)}></Select>}
                    {!fields.mainTeacherId &&
                        <FormLabel className="text-danger">Выберите основного преподавателя</FormLabel>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Отмена
                    </Button>
                    <Button variant="primary" onClick={handleCreateCourse}>Сохранить</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CreateCourse