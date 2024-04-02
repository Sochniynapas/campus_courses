import { Button, FormCheck, FormControl, FormGroup, FormLabel, Modal } from "react-bootstrap"
import CourseTextEditor from "../../TextEditors/CourseTextEditor"
import Select from "react-select"
import { useGetAllUsersQuery } from "../../../api/userApi"
import { useDispatch, useSelector } from "react-redux"
import { selectToken } from "../../../store/slice/authSlice"
import { useEffect, useState } from "react"
import { useCreateCourseMutation } from "../../../api/coursesApi"
import { useNavigate, useParams } from "react-router-dom"
import { SwalContent } from "./CreateUpdateModalFunctions"


function CreateUpdateCourse({ show, handleClose, fields, setFields, isAdmin }) {

    const token = useSelector(selectToken)
    const { data: users, error: usersError } = useGetAllUsersQuery(token)
    const [transformedUsers, setTransformedUsers] = useState([])
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [createCourse] = useCreateCourseMutation()

    const dateValid = /^(200\d|201\d|202[0-5])$/
    const countValid = /^(\d|[1-9]\d|1\d\d|200)$/

    const locate = window.location.pathname
    const isCourseWindow = /courses/

    const handleFieldChange = (fieldName, value) => {
        setFields(prevFields => ({
            ...prevFields,
            [fieldName]: value
        }))

    }
    const handleAutoPickSemester = () => {
        if (fields.semester === "Autumn") {
            return true
        }
        else if (fields.semester === "Spring") {
            return true
        }
        else {
            return false
        }
    }
    const handleCUCourse = async () => {
        if (isCourseWindow) {

        }
        else {
            const response = await createCourse({ token: token, body: fields, id: id })
            if (response.data) {
                SwalContent(200, handleClose, navigate)
            }
            else {
                SwalContent(response.error.status, handleClose, dispatch, navigate)
            }
        }
    }

    useEffect(() => {
        if (users) {
            const transformedUsers = users.map(user => ({
                value: user.id,
                label: user.fullName
            }))
            setTransformedUsers(transformedUsers)
        }
    }, [users, usersError])


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
                    {isCourseWindow.test(locate) ? (
                        <Modal.Title>Редактирование курса</Modal.Title>
                    ) : (
                        <Modal.Title>Создание курса</Modal.Title>
                    )}
                </Modal.Header>
                <Modal.Body>
                    {isAdmin &&
                        <>
                            <FormGroup className="pb-4">
                                <FormLabel>Название курса</FormLabel>
                                <FormControl type={'text'} value={fields.name} onChange={(e) => (handleFieldChange('name', e.target.value))}></FormControl>
                                {!fields.name &&
                                    <FormLabel className="text-danger">Поле названия не должно быть пустым</FormLabel>
                                }
                            </FormGroup>
                            <FormGroup className="pb-4">
                                <FormLabel>Год начала курса</FormLabel>
                                <FormControl type={'text'} value={fields.startYear} onChange={(e) => (handleFieldChange('startYear', e.target.value))}></FormControl>
                                {!dateValid.test(fields.startYear) &&
                                    <FormLabel className="text-danger">Значение поля не должно быть пустым, и год находится между 2000 и 2029 включительно</FormLabel>
                                }
                            </FormGroup>
                            <FormGroup className="pb-4">
                                <FormLabel>Общее количество мест</FormLabel>
                                <FormControl type={'text'} value={fields.maximumStudentsCount} onChange={(e) => (handleFieldChange('maximumStudentsCount', e.target.value))}></FormControl>
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
                                    defaultChecked={handleAutoPickSemester()}
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
                                    defaultChecked={handleAutoPickSemester()}
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
                        </>
                    }
                    <FormGroup className="pb-4">
                        <FormLabel>Требования</FormLabel>
                        <CourseTextEditor defaultValue={fields.requirements} setValue={handleFieldChange} type={"requirements"} />
                        {!fields.requirements &&
                            <FormLabel className="text-danger">Поле не должно оставаться нетронутым</FormLabel>
                        }
                    </FormGroup>
                    <FormGroup className="pb-4">
                        <FormLabel>Аннотации</FormLabel>
                        <CourseTextEditor defaultValue={fields.annotations} setValue={handleFieldChange} type={"annotations"} />
                        {!fields.annotations &&
                            <FormLabel className="text-danger">Поле не должно оставаться нетронутым</FormLabel>
                        }
                    </FormGroup>
                    {isAdmin &&
                        <>
                            <FormLabel>Оснвной преподаватель курса</FormLabel>
                            {users &&
                                <Select options={transformedUsers} onChange={(selectedOption) => handleFieldChange('mainTeacherId', selectedOption.value)}></Select>
                            }
                            {!fields.mainTeacherId &&
                                <FormLabel className="text-danger">Выберите основного преподавателя</FormLabel>
                            }
                        </>
                    }


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Отмена
                    </Button>
                    <Button variant="primary" onClick={handleCUCourse}>Сохранить</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CreateUpdateCourse