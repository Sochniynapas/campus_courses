
import { Button, Card, Form, FormControl, FormGroup, FormLabel, Modal } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { clearToken, selectToken } from "../../../store/slice/authSlice";
import { useDeleteGroupMutation, usePutGroupNameMutation } from "../../../api/groupApi";
import { useState } from "react";

function CardType(prop) {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = useSelector(selectToken)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [isRequired, setIsRequired] = useState('false')
    const [name, setName] = useState(prop.groupName)

    const [editGroupName] = usePutGroupNameMutation()

    const handleSetNewValue = (value) => {
        setName(value);
    }


    const handleChangeNameOfGroup = async () => {
        const response = await editGroupName({ body: { name: name }, token: token, id: prop.id })
        if (response.error) {
            if (response.error.status === 401) {
                dispatch(clearToken())
                navigate("/")
                swal({
                    title: "Ошибка",
                    text: "Вам следует авторизоваться",
                    icon: "error",
                    button: "Продолжить",
                  });
            }
            else if (response.error.status === 400) {
                setIsRequired(true)
            }
        }
        else {
            handleClose()
            setIsRequired(false)
            swal({
                title: "Успешно!",
                text: "Вы отредактировали группу!",
                icon: "success",
                button: "Продолжить",
              });
        }
    }
    const [deleteGroup] = useDeleteGroupMutation()
    const handleDeleteGroup = async () => {
        const response = await deleteGroup({ token: token, id: prop.id })
        if (!response.data) {
            console.log(response)
            if (response.error.status === 401) {
                dispatch(clearToken())
            }
            navigate("/")
        }
    }

    return (
        <Card key={prop.id} className="p-3">
            <Form className="d-flex justify-content-between flex-lg-row flex-column">
                {prop.isAdmin ? (
                    <>
                        <Link className="col-4 d-flex align-items-center justify-content-start" to={`/groups/${prop.id}`}>{prop.groupName}</Link>
                        <FormGroup className="col-8 d-flex justify-content-lg-end flex-lg-row flex-column align-content-center ">
                            <Button className="me-3 border-0 bg-warning text-black text-uppercase" onClick={handleShow}>
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
                                    <Button variant="primary" onClick={handleChangeNameOfGroup}>Сохранить</Button>
                                </Modal.Footer>
                            </Modal>
                            <Button className="bg-danger border-0 text-uppercase" onClick={handleDeleteGroup}>
                                Удалить
                            </Button>
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