import { Button, Card, Nav } from "react-bootstrap"
import { Link } from "react-router-dom"

function CardType(prop) {
    console.log(prop)
    return (
        <Card key={prop.id} className="p-3">
            <Nav className="d-flex justify-content-between  ">
                {prop.isAdmin ? (
                    <>
                        <Link className="col-2 d-flex align-items-center justify-content-start">{prop.groupName}</Link>
                        <Nav className="col-6 d-flex justify-content-end  ">
                            <Button className="me-3 border-0 bg-warning text-black ">
                                Редактировать
                            </Button>
                            <Button className="bg-danger border-0">
                                Удалить
                            </Button>
                        </Nav>
                    </>
                ) : (
                    <Link className="nav-link text-black p-1 d-flex align-items-center justify-content-start">{prop.groupName}</Link>
                )}
            </Nav>
        </Card>
    )
}
export default CardType