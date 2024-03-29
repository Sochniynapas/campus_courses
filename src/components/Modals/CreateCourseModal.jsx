import { Button, FormCheck, FormControl, FormGroup, FormLabel, FormSelect, Modal } from "react-bootstrap"
import CourseTextEditor from "../TextEditors/CourseTextEditor"

function CreateCourse({show, handleClose, setRequirements, setAnnotations}) {
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
                        <FormControl></FormControl>
                    </FormGroup>
                    <FormGroup className="pb-4">
                        <FormLabel>Год начала курса</FormLabel>
                        <FormControl></FormControl>
                    </FormGroup>
                    <FormGroup className="pb-4">
                        <FormLabel>Общее количество мест</FormLabel>
                        <FormControl></FormControl>
                    </FormGroup>
                    <FormLabel>Семестр</FormLabel>
                    <FormGroup className="pb-4">
                        <FormCheck
                            inline
                            label="Осенний"
                            name="group1"
                            type={'radio'}
                            id={`inline-${'radio'}-1`}
                        />
                        <FormCheck
                            inline
                            label="Весенний"
                            name="group1"
                            type={'radio'}
                            id={`inline-${'radio'}-2`}
                        />
                    </FormGroup>
                    <FormGroup className="pb-4">
                        <FormLabel>Требования</FormLabel>
                        <CourseTextEditor setValue={setRequirements} />
                    </FormGroup>
                    <FormGroup className="pb-4">
                        <FormLabel>Аннотации</FormLabel>
                        <CourseTextEditor setValue={setAnnotations} />
                    </FormGroup>
                    <FormSelect className="mb-4">

                    </FormSelect>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Отмена
                    </Button>
                    <Button variant="primary" >Сохранить</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CreateCourse