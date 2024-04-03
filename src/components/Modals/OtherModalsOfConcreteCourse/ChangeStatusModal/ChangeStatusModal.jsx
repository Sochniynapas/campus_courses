import { Button, FormCheck, FormLabel, Modal } from "react-bootstrap"
import { useEditCoursesStatusMutation } from "../../../../api/coursesApi"
import { useState } from "react"
import { SwalStatusContent } from "./ChangeStatusModal"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { selectToken } from "../../../../store/slice/authSlice"



const ChangeStatus = ({show, handleClose}) => {
    const [editStatus] = useEditCoursesStatusMutation()
    const [status, setStatus] = useState("")
    const [required, setRequired] = useState(false)

    const {id} = useParams()
    const token = useSelector(selectToken)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleEditStatus = async()=>{
        const response = await editStatus({token: token, body: {status}, id: id})
        if(response.error){
            if(response.error.status === 400){
                setRequired(true)
            }
            SwalStatusContent(response.error.status, "", handleClose, dispatch, navigate)
        }
        else{
            setRequired(false)
            setStatus("")
            SwalStatusContent(200, "Вы успешно изменили статус курса!", handleClose, dispatch, navigate)
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
                <Modal.Title>Изменение статуса курса</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex flex-lg-row flex-column">
                    <FormCheck
                        inline
                        label="Открыт для записи"
                        name="group1"
                        type={'radio'}
                        id={`inline-${'radio'}-1`}
                        onChange={() => {
                            setStatus("OpenForAssigning")
                        }}

                    />
                    <FormCheck
                        inline
                        label="В процессе"
                        name="group1"
                        type={'radio'}
                        id={`inline-${'radio'}-2`}
                        onChange={() => {
                            setStatus("Started")
                        }}
                    />
                    <FormCheck
                        inline
                        label="Завершён"
                        name="group1"
                        type={'radio'}
                        id={`inline-${'radio'}-3`}
                        onChange={() => {
                            setStatus("Finished")
                        }}
                    />
                </div>
                {required &&
                    <FormLabel className="text-danger">Вы должны выбрать вариант, не являющийся предыдущим</FormLabel>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose} variant="secondary">
                    Отмена
                </Button>
                <Button variant="primary" onClick={handleEditStatus}>Сохранить</Button>
            </Modal.Footer>
        </Modal>
    )
}
export default ChangeStatus