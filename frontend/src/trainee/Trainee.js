import React, { Component } from 'react';
import './Trainee.css';
import { Radio, Form, Input, Button, Icon, Select, Col, Table, Popconfirm, message, notification, Row, DatePicker, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { getAvatarColor } from '../util/Colors';
import { getTraineeById, deleteItem } from '../util/APIUtils';
import { formatDate, formatDateTime } from '../util/Helpers';
import { withRouter } from 'react-router-dom';

const FormItem = Form.Item;

class Trainee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            pagination: false,
            columnsS : [
            {
                title: 'Label',
                dataIndex: 'key',
                sorter: true,
                key: 'key',
                render: (key, spec) => (
                      <span>{spec.specialty.name}</span>
                  )
            }],
            columnsT: [{
              title: 'AMA',
              dataIndex: 'trainee.ama',
              sorter: true,
              key: 'ama',
              render: (ama, record ) => (
                  <Link to={"/trainees/" + record.key}>{ama}</Link>
              )
            }, {
              title: 'Full Name',
              dataIndex: 'trainee',
              sorter: true,
              key: 'name',
              render: (trainee) => (
                  <Link to={"/trainee/" + trainee.key}>{trainee.surname} {trainee.name}</Link>
              )
            },{
              title: 'Contractor',
              dataIndex: 'contractor',
              sorter: true,
              key: 'contractor',
              render: (contractor) => (
                    <Link to={"/contractor/" + contractor.key}>{contractor.name}</Link>
                )
            },{
              title: 'Specialty',
              dataIndex: 'specialty.name',
              sorter: true,
              key: 'specialty',
            },{
              title: 'Grade',
              dataIndex: 'grade',
              key: 'grade',
            },{
              title: 'Passed',
              dataIndex: 'passed',
              key: 'passed',
            }], 
            isLoading: false,
            trainee: {},
            specialties: [],
            trainSpec: [],
            isEdit: false
        };
        this.getTrainee = this.getTrainee.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }


    confirm(trainee) {
        this.remove.bind(this, trainee);
        this.remove(trainee);
        message.success('Removed');
    }

    cancel(e) {
        message.error('Canceled remove');
    }

    remove(trainee){
        let promise;

        //promise = deleteItem(trainee);

        const trainees = this.state.trainees.filter(i => i.key !== trainee.key)
        this.setState({trainees})
    }

    getTrainee(){
        let promise;

        promise = getTraineeById(this.state.id);

        if(!promise) {
            return;
        }

        this.setState({
            isLoading: true
        });
        promise
            .then(response => {

                this.setState({
                    trainee: response,
                    specialties: response._embedded ? response._embedded.traineeSpecialties: [],
                    trainSpec: response._embedded ? response._embedded.traineeTrainees: [],
                    isLoading: false
                })
            }).catch(error => {
            this.setState({
                isLoading: false
            })
        });
    }

    handleEdit(){
        this.setState({
            isEdit: !this.state.isEdit
        })
    }

    componentWillMount() {
        this.getTrainee();
    }


    render() {
        let content;
        if (this.state.isEdit){
            content =(
                    <Form layout="inline" className="trainee-info">
                        <Row gutter={16}>
                            <Col span={12}>
                                <span label="amaTitle" className="trainee-tag">
                                    AMA: 
                                </span>
                            </Col>
                            <Col span={12}>
                                <FormItem>
                                    <Input defaultValue={this.state.trainee.ama} editable/>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <span label="surnameTitle" className="trainee-tag">
                                    Surname: 
                                </span>
                            </Col>
                            <Col span={12}>
                                <FormItem>
                                    <Input defaultValue={this.state.trainee.surname} editable/>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <span label="nameTitle" className="trainee-tag">
                                    Name: 
                                </span>
                            </Col>
                            <Col span={12}>
                                <FormItem>
                                    <Input defaultValue={this.state.trainee.name} editable/>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <span label="nationalityTitle" className="trainee-tag">
                                    Nationality: 
                                </span>
                            </Col>
                            <Col span={12}>
                                <FormItem>
                                    <Input defaultValue={this.state.trainee.nationality} editable/>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <span label="cardTypeTitle" className="trainee-tag">
                                    Card Type:
                                </span>
                            </Col>
                            <Col span={12}>
                                <FormItem>
                                    <Input defaultValue={this.state.trainee.cardType}/>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <span label="cardStatusTitle" className="trainee-tag">
                                    Card Status:
                                </span>
                            </Col>
                            <Col span={12}>
                                <FormItem>
                                    <Input defaultValue={this.state.trainee.cardStatus}/>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <span label="documentCodeTitle" className="trainee-tag">
                                    Document Code:
                                </span>
                            </Col>
                            <Col span={12}>
                                <FormItem>
                                    <Input defaultValue={this.state.trainee.documentCode}/>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <span label="createdTitle" className="trainee-tag">
                                    Created:
                                </span>
                            </Col>
                            <Col span={12}>
                                <span label="created" >
                                    {this.state.trainee.createdBy} at {formatDate(this.state.trainee.createdAt)}
                                </span>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <span label="updatedTitle" className="trainee-tag">
                                    Last edit:
                                </span>
                            </Col>
                            <Col span={12}>
                                <span label="updated" >
                                    {this.state.trainee.updatedBy} at {formatDate(this.state.trainee.updatedAt)}
                                </span>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}/>
                            <Col span={12}>
                                <FormItem>
                                     <Button type="Submit">
                                        Save
                                    </Button>
                                </FormItem>
                                <FormItem>
                                     <Button type="Submit" onClick={this.handleEdit}>
                                        Cancel
                                    </Button>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                )
        }else{
            content=(
                <div className="trainee-info">
                    <Row gutter={16}>
                        <Col span={12}>
                            <span label="amaTitle" className="trainee-tag">
                                AMA: 
                            </span>
                        </Col>
                        <Col span={12}>
                            <span label="ama">
                                {this.state.trainee.ama}
                            </span>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <span label="surnameTitle" className="trainee-tag">
                                Surname: 
                            </span>
                        </Col>
                        <Col span={12}>
                            <span label="surname">
                                {this.state.trainee.surname}
                            </span>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <span label="nameTitle" className="trainee-tag">
                                Name: 
                            </span>
                        </Col>
                        <Col span={12}>
                            <span label="name">
                                {this.state.trainee.name}
                            </span>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <span label="nationalityTitle" className="trainee-tag">
                                Nationality: 
                            </span>
                        </Col>
                        <Col span={12}>
                            <span label="nationality">
                                {this.state.trainee.nationality}
                            </span>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <span label="cardTypeTitle" className="trainee-tag">
                                Card Type:
                            </span>
                        </Col>
                        <Col span={12}>
                            <span label="cardType">
                                {this.state.trainee.cardType}
                            </span>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <span label="cardStatusTitle" className="trainee-tag">
                                Card Status:
                            </span>
                        </Col>
                        <Col span={12}>
                            <span label="cardStatus">
                                {this.state.trainee.cardStatus}
                            </span>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <span label="documentCodeTitle" className="trainee-tag">
                                Document Code:
                            </span>
                        </Col>
                        <Col span={12}>
                            <span label="documentCode">
                                {this.state.trainee.documentCode}
                            </span>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <span label="createdTitle" className="trainee-tag">
                                Created:
                            </span>
                        </Col>
                        <Col span={12}>
                            <span label="created" >
                                {this.state.trainee.createdBy} at {formatDate(this.state.trainee.createdAt)}
                            </span>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <span label="updatedTitle" className="trainee-tag">
                                Last edit:
                            </span>
                        </Col>
                        <Col span={12}>
                            <span label="updated" >
                                {this.state.trainee.updatedBy} at {formatDate(this.state.trainee.updatedAt)}
                            </span>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}/>
                        <Col span={12}>
                            <Button className="edit-trainee-button" type="Submit" onClick={this.handleEdit}>Edit</Button>
                        </Col>
                    </Row>
                    </div>
                )
        }
        return (
            <div className="trainee-container">
                <h1 className="page-title">Trainee {this.state.trainee.name}</h1>
                <div className="trainee-content">
                        {content}
                    
                    <div className="specialties-list">
                        <Table 
                            {...this.state}
                            title={() => {return ( 
                                <div className="table-header">
                                    <span className="table-title"> Contractors (?) </span>
                                </div> 
                                )}}
                            columns={this.state.columnsS} 
                            dataSource={this.state.specialties}
                        />
                    </div> 
                </div>
            </div>
        );
    }
}
export default withRouter(Trainee);

