import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Navbar,
    NavbarBrand,
    Container,
    Row,
    Col,
    Card,
    CardTitle,
    CardText,
    Button,
    CardBody,
    CardFooter
} from 'reactstrap';
import{
    IoSchoolOutline,
    IoMan,
    IoSettings,
  
} from "react-icons/io5";
import axios from "axios";
import { CreationModal } from "./CreationModal";

interface MyState{
    isOpen : boolean;
    students: [];
}


export class Dashboard extends Component<{}, MyState>{

    state: MyState = {
        isOpen : false,
        students: [],
    }

    componentDidMount(){
        axios.get("http://52.14.86.46:7060/list")
        .then(res =>{
            
            const students = res.data
            this.setState({students})
        })
        
        
    }

    toggle = () => {
        this.setState((prevState) => ({isOpen : !prevState.isOpen}))
    }

    render(){
        
        return(
            <div>

                <Navbar color= "dark" light mb-2>

                    <NavbarBrand className="text-white">

                        <IoSchoolOutline className="font-size-xxl"/>
                        <span className="font-size-l ml-3">School Management Application</span>

                    </NavbarBrand>

                </Navbar>

                <Container className="mt-3">

                    <Row>
                        <Col sm="4">
                            <Card body>
                                <CardTitle tag="h5">
                                    <IoMan className="font-size-xl"/>86 students
                                </CardTitle>

                                <CardText>
                                    with supporting text below is natural
                                </CardText>

                                <Button>Manage Students</Button>
                            </Card>    
                        </Col>

                        <Col sm="4">
                            <Card body>
                                <CardTitle tag="h5">
                                    <IoSchoolOutline className="font-size-xl"/>20 teacher
                                </CardTitle>

                                <CardText>
                                    with supporting text below is natural
                                </CardText>

                                <Button>Manage Teachers</Button>
                            </Card>   
                        </Col>

                        <Col sm="4">
                            <Card body>
                                <CardTitle tag="h5">
                                    <IoSettings className="font-size-xl"/>13 employees
                                </CardTitle>

                                <CardText>
                                    with supporting text below is natural
                                </CardText>

                                <Button>Manage Employees</Button>
                            </Card>       
                        </Col>
                    </Row>

                </Container>

                <CreationModal isOpen= {this.state.isOpen} toggle= {this.toggle}></CreationModal>

                <Container className="mt-4">
                    <Row>
                        <Col sm="12">
                            <Button block color="success" onClick={this.toggle}>
                                <span className="font-size-l">Add new student</span>
                            </Button>    
                        </Col>
                    </Row>
                </Container>

                <Container className="mt-4">
                    {this.state.students.map(student => renderStudent(student))}
                </Container>

            </div>
        );
    }



}

function renderStudent(st) {

        return (
            <Row>
                <Col sm="12">
                    <Card body>
                        <CardTitle tag="h5">
                            <IoMan className="font-size-xl"/>{st.firstName + " " + st.lastName}
                        </CardTitle>
    
                        <CardBody>
                            <Row>
                                <Col sm="4" className="text-center">
                                    <span className="font-weight-bold">Class</span>
                                    <span>Second Year</span>
                                </Col>
    
                                <Col sm="4" className="text-center">
                                    <span className="font-weight-bold">Age</span>
                                    <span>{st.age}</span>
                                </Col>
    
                                <Col sm="4" className="text-center">
                                    <span className="font-weight-bold">Teacher</span>
                                    <span>{st.teacher}</span>
                                </Col>
                            </Row>
                        </CardBody>
    
                        <CardFooter>
                            <Row>
                                <Col sm-6>
                                    <Button block outline color="primary">
                                        Edit
                                    </Button>
                                </Col>
    
                                <Col sm-6>
                                    <Button block outline color="danger" onClick={() => deleteStudent(st.id)}>
                                        Delete
                                    </Button>
                                </Col>
                            </Row>
                        </CardFooter>
                    </Card>    
                </Col>    
            </Row>
        )
    
}
function deleteStudent(id: any): void {
    axios.post(`http://52.14.86.46:7060/delete/${id}`)
}

