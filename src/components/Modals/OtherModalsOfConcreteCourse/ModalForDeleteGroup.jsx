import { Button, FormLabel, Modal } from "react-bootstrap"
import { handleDeleteGroup } from "../../Form/CourseGroups/CourseGroupsFunctions/CardTypesFunctions"
import { useDispatch } from "react-redux";

function DeleteGroupModal({show, handleClose, deleteGroup, navigate, token, prop}){
    const disptach = useDispatch()

    return(
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="xl"
            enforceFocus={false}
        >
            <Modal.Header>
                <Modal.Title>Подтверждение удаления</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormLabel>Вы действительно хотите удалить группу?</FormLabel>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose} variant="secondary">
                    Нет
                </Button>
                <Button variant="primary" onClick={()=>handleDeleteGroup(disptach, navigate, deleteGroup, token, prop)}>Да</Button>
            </Modal.Footer>
        </Modal>
    )
}
export default DeleteGroupModal