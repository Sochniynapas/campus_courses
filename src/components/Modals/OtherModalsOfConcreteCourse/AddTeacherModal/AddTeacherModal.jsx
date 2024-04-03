import { useState } from "react"
import { Button, FormLabel, Modal } from "react-bootstrap"
import Select from "react-select"
import { useGetTransformedUsers } from "../../../../hooks/useGetTransformedUsers"
import { useAddTeacherOnCourseMutation } from "../../../../api/coursesApi"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { selectToken } from "../../../../store/slice/authSlice"
import SwalAddTeacherContent from "./AddTeacherModalFunctions"



const AddTeacher = ({ show, handleClose }) => {

    const [addTeacher] = useAddTeacherOnCourseMutation()
    const transformedUsers = useGetTransformedUsers()
    const [teacher, setTeacher] = useState({})
    const [isSelect, setIsSelect] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = useSelector(selectToken)
    const { id } = useParams()


    const handleAddTeacher = async () => {
        console.log(teacher)
        const response = await addTeacher({ token: token, body: teacher, id: id })
        if (response.error) {
            if (response.error.status === 400) {
                setIsSelect(true)
            }
            SwalAddTeacherContent(response.error.status, handleClose, dispatch, navigate)
        }
        else {
            handleClose()
            setIsSelect(false)
            SwalAddTeacherContent(200, handleClose, dispatch, navigate)
        }
    }

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
                <Select options={transformedUsers} onChange={(selectedOption) => setTeacher({userId: selectedOption.value})}></Select>
                {isSelect &&
                    <FormLabel className="text-danger">Вам следует выбрать перподавателя, которого нет на данном курсе</FormLabel>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose} variant="secondary">
                    Отмена
                </Button>
                <Button variant="primary" onClick={handleAddTeacher}>Сохранить</Button>
            </Modal.Footer>
        </Modal>
    )
}
export default AddTeacher