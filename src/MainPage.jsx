import {Container, Row, Col } from 'react-bootstrap'
import styles from './MainPage.module.css';

function MainPage (){
  return (
    <Container className={styles.layout}>
      <Row style={{color: 'black'}}>
        <Col md='2'>Logo</Col>
        <Col md='10'>Prev</Col>
      </Row>
    </Container>
  )
}
export default MainPage
