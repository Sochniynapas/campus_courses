import { useState } from "react";
import { Button, Card, Form, FormControl, FormGroup, FormLabel, Modal, Nav } from "react-bootstrap"
import { Link } from "react-router-dom"

function CardType(prop) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [name, setName] = useState(prop.groupName);
    
    const handleSetNewValue = (value) => {
        setName(value);
    };

    const handleChangeNameOfGroup = async () => {
        console.log(name);
        handleClose();
    };

    return (
        <Card key={prop.id} className="p-3">
            <Form className="d-flex justify-content-between">
                {!prop.isAdmin ? (
                    <>
                        <Link className="col-4 d-flex align-items-center justify-content-start">{prop.groupName}</Link>
                        <FormGroup className="col-6 d-flex justify-content-end">
                            <Button className="me-3 border-0 bg-warning text-black" onClick={handleShow}>
                                Редактировать
                            </Button>
                            <Modal
                                show={show}
                                onHide={handleClose}
                                backdrop="static"
                                keyboard={false}
                                key={prop.id}
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>Редактирование группы</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <FormLabel>Название группы</FormLabel>
                                    <FormControl type='text' value={name} onChange={(e) => handleSetNewValue(e.target.value)} />
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Отмена
                                    </Button>
                                    <Button variant="primary" onClick={handleChangeNameOfGroup}>Сохранить</Button>
                                </Modal.Footer>
                            </Modal>
                            <Button className="bg-danger border-0">
                                Удалить
                            </Button>
                        </FormGroup>
                    </>
                ) : (
                    <Link className="nav-link text-black p-1 d-flex align-items-center justify-content-start">{prop.groupName}</Link>
                )}
            </Form>
        </Card>
    );
}

export default CardType;