import { useState } from "react"
import { Button, FormLabel, Modal } from "react-bootstrap"
import Select from "react-select"
import { useGetTransformedUsers } from "../../../../hooks/useGetTransformedUsers"
import { useAddTeacherOnCourseMutation } from "../../../../api/coursesApi"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { handleAddTeacher, handleClearOption } from "./AddTeacherModalFunctions"



const AddTeacher = ({ show, handleClose }) => {

    const [addTeacher] = useAddTeacherOnCourseMutation()
    const transformedUsers = useGetTransformedUsers()
    const [teacher, setTeacher] = useState({
        userId: ""
    })
    const [isSelect, setIsSelect] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    const { id } = useParams()




    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="xl"
            enforceFocus={false}
        >
            <Modal.Header>
                <Modal.Title>Добавление преподавателя</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormLabel>Выберите преподавателя</FormLabel>
                <Select options={transformedUsers} onChange={(selectedOption) => setTeacher({ userId: selectedOption.value })}></Select>
                {isSelect &&
                    <FormLabel className="text-danger">Вам следует выбрать перподавателя, которого нет на данном курсе</FormLabel>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => handleClearOption(setTeacher, handleClose)} variant="secondary">
                    Отмена
                </Button>
                <Button variant="primary" onClick={() => handleAddTeacher(
                    addTeacher,
                    token,
                    teacher,
                    id,
                    setIsSelect,
                    handleClose,
                    dispatch,
                    navigate,
                    setTeacher
                )}>Сохранить</Button>
            </Modal.Footer>
        </Modal>
    )
}
export default AddTeacher