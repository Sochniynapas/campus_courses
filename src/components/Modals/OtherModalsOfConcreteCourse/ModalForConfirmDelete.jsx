import { Button, FormLabel, Modal } from "react-bootstrap"
import { handleDeleteCourse } from "../../Form/ConcreteCourse/AtributesOfCourse.jsx/ConcreteCourseFunctions/CourseFunctions"

function DeleteModal({show, handleClose, deleteCourse, navigate, token, id}){
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
                <FormLabel>Вы действительно хотите удалить курс?</FormLabel>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose} variant="secondary">
                    Нет
                </Button>
                <Button variant="primary" onClick={()=>handleDeleteCourse(deleteCourse, navigate, token, id)}>Да</Button>
            </Modal.Footer>
        </Modal>
    )
}
export default DeleteModal