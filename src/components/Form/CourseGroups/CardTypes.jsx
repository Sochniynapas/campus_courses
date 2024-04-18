
import { Button, Card, Form, FormControl, FormGroup, FormLabel, Modal } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { useDeleteGroupMutation, usePutGroupNameMutation } from "../../../api/groupApi";
import { useState } from "react";
import { handleChangeNameOfGroup, handleDeleteGroup } from "./CourseGroupsFunctions/CardTypesFunctions";
import DeleteGroupModal from "../../Modals/OtherModalsOfConcreteCourse/ModalForDeleteGroup";

function CardType(prop) {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = localStorage.getItem("token")

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showDelete, setDeleteShow] = useState(false);
    const handleCloseDelete = () => setDeleteShow(false);
    const handleShowDelete = () => setDeleteShow(true);

    const [isRequired, setIsRequired] = useState('false')
    const [name, setName] = useState(prop.groupName)

    const [editGroupName] = usePutGroupNameMutation()

    const handleSetNewValue = (value) => {
        setName(value);
    }



    const [deleteGroup] = useDeleteGroupMutation()


    return (
        <Card key={prop.id} className="p-3">
            <Form className="d-flex justify-content-between flex-lg-row flex-column">
                {prop.isAdmin ? (
                    <>
                        <Link className={prop.groupName.length > 45 ? "col-6 d-flex align-items-center justify-content-start overflow-auto "
                            : "col-4 d-flex align-items-center justify-content-start"
                        } to={`/groups/${prop.id}`}>{prop.groupName}</Link>
                        <FormGroup className="col-6 d-flex justify-content-lg-end flex-lg-row flex-column align-content-center ">
                            <Button variant="warning" className="me-3 border-0 text-black text-uppercase" onClick={handleShow}>
                                Редактировать
                            </Button>
                            <Modal
                                show={show}
                                onHide={handleClose}
                                backdrop="static"
                                keyboard={false}
                                key={prop.id}
                                size="xl"
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>Редактирование группы</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <FormLabel>Название группы</FormLabel>
                                    <FormControl type='text' value={name} onChange={(e) => handleSetNewValue(e.target.value)} />
                                    {isRequired === true && (
                                        <FormLabel className="text-danger ">Название группы не должно быть пустым</FormLabel>
                                    )}
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Отмена
                                    </Button>
                                    <Button variant="primary" onClick={() => handleChangeNameOfGroup(editGroupName, dispatch, navigate, setIsRequired, name, token, prop, handleClose)}>
                                        Сохранить
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                            <Button variant="danger" className="border-0 text-uppercase" onClick={handleShowDelete}>
                                Удалить
                            </Button>
                            <DeleteGroupModal show={showDelete} handleClose={handleCloseDelete} deleteGroup={deleteGroup} navigate={navigate} token={token} prop={prop}/>
                        </FormGroup>
                    </>
                ) : (
                    <Link className="nav-link text-black p-1 d-flex align-items-center justify-content-start" to={`/groups/${prop.id}`}>{prop.groupName}</Link>
                )}
            </Form>
        </Card>
    );
}

export default CardType;