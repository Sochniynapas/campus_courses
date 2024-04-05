import { useEffect, useState } from "react"
import { Button, FormCheck, FormLabel, Modal } from "react-bootstrap"
import { useEditStudentMarkMutation } from "../../../../api/coursesApi"
import { useNavigate, useParams } from "react-router-dom"
import SwalMarkContent from "./ChangeResultModalFucntions"
import { useDispatch, useSelector } from "react-redux"
import { selectToken } from "../../../../store/slice/authSlice"


const ChangeResult = ({ show, handleClose, type, name, studentId }) => {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = useSelector(selectToken)
    const {id} = useParams()
    
    const [editMark] = useEditStudentMarkMutation()
    const [isRequired, setIsRequired] = useState(false)
    const [markData, setMarkData] = useState({
        markType: "",
        mark: ""
    })

    const hanadleEditMark = async() =>{
        const response = await editMark({token: token, body: markData, courseId: id, studentId: studentId, })
        if(response.error){
            if(response.error.status === 400){
                setIsRequired(true)
            }
            SwalMarkContent(response.error.status, handleClose, dispatch, navigate)
        }
        else{
            setIsRequired(false)
            setMarkData({})
            SwalMarkContent(200, handleClose, dispatch, navigate)
        }
    }
    const handleChooseMark=(value)=>{
        if(type === "Промежуточной аттестации"){
            setMarkData({markType: "Midterm", mark: value})
        }
        else{
            setMarkData({markType: "Final", mark: value})
        }
    }
    const handleDefaultChecked = (value)=>{
        if(value === markData.mark){
            return true
        }
    }
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
                <Modal.Header>
                    <Modal.Title>Изменение отметки для "{type}"</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormLabel>Студент - {name}</FormLabel>
                    <div className="d-flex flex-lg-row flex-column">
                        <FormCheck
                            inline
                            label="Пройдено"
                            name="group1"
                            type={'radio'}
                            id={`inline-${'radio'}-1`}
                            defaultChecked={handleDefaultChecked("Passed")}
                            onChange={() => {
                                handleChooseMark("Passed")
                            }}

                        />
                        <FormCheck
                            inline
                            label="Зафейлено"
                            name="group1"
                            type={'radio'}
                            id={`inline-${'radio'}-2`}
                            defaultChecked={handleDefaultChecked("Failed")}
                            onChange={() => {
                                handleChooseMark("Failed")
                            }}
                        />
                    </div>
                    {isRequired &&
                        <FormLabel className="text-danger ">Вы должны выбрать вариант</FormLabel>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => {
                        if (type === "Промежуточной аттестации") {
                            handleClose("changeMiddleResult")
                        }
                        else {
                            handleClose("changeFinalResult")
                        }
                    }} variant="secondary">
                        Отмена
                    </Button>
                    <Button variant="primary" onClick={hanadleEditMark}>Сохранить</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ChangeResult