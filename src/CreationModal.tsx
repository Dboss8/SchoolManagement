import axios from "axios";
import React from "react";
import { Component } from "react";
import {
    Button,
    Col,
    Form,
    Modal,
    ModalBody,
    ModalHeader,
    Row,
} from "reactstrap";


type MyProps= {
    isOpen : boolean
    toggle 
}

export class CreationModal extends Component<MyProps>{

    handleSubmit = (event) => {

        event.preventDefault()
        const data = new FormData(event.target)

        const student = {
            firstName : data.get("firstName"),
            lastName : data.get("lastName"),
            age : data.get("age"),
            teacher : data.get("teacher"),
        }

        axios.post("http://18.221.78.132:7060/create", student)
        this.props.toggle();
    }

    render(){

        return (
            <Modal isOpen= {this.props.isOpen} toggle= {this.props.toggle}>
                <ModalHeader toggle= {this.props.toggle}>
                    Adding new wise student
                </ModalHeader>

                <ModalBody>
                    <Form onSubmit={this.handleSubmit}>
                        <Row>
                            <Col>
                                <label>Firstname</label>
                            </Col>
                            <Col>
                                <input id="firstName" name="firstName" type="text"/>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <label>Lastname</label>
                            </Col>
                            <Col>
                                <input id="lastName" name="lastName" type="text"/>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <label>Age</label>
                            </Col>
                            <Col>
                                <input id="age" name="age" type="number"/>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <label>Teacher</label>
                            </Col>
                            <Col>
                                <input id="teacher" name="teacher" type="text"/>
                            </Col>
                        </Row>

                        <Button color="primary">
                            Create New Student
                        </Button>
                    </Form>

                </ModalBody>
            </Modal>
        )
    
    }
}