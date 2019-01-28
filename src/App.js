import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as EmailValidator from 'email-validator';
import {
    Col,
    Row,
    message,
    Modal,
    Input,
    Table,
    Button
} from 'antd';
import moment from 'moment';
import messageAction from './redux/app/actions';

const {
    messageListRequest,
    messagePostRequest,
    resetMessagestate,
    messageDeleteRequest
} = messageAction;

const { TextArea } = Input;

const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
}, {
    title: 'Email',
    dataIndex: 'email',
    key: 'email'
}, {
    title: 'Message',
    dataIndex: 'message_body',
    key: 'message_body'
}, {
    title: 'Date',
    dataIndex: 'created_at',
    key: 'created_at'
},
{
  title: 'Action',
  dataIndex: 'action',
  key: 'action'
}];

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            confirmLoading: false,
            name: null,
            email: null,
            messageBody: null
        }
    }

    getAction = (id) => {
        return <Button type="danger" onClick={() => this.deleteMessage(id)}>Delete</Button>
    }

    componentDidMount = () => {
        this.props.messageListRequest(this.props.params);
    };

    deleteMessage = (id) => {
      this.props.messageDeleteRequest(id);

      setTimeout(() => {
        this.props.messageListRequest(this.props.params);
        message.success('Message Has Been Deleted!');
      }, 3000);
    };

    componentWillUnmount = () => {
      this.props.resetMessagestate();
    };

    handleCancel = () => this.setState({visible: false})

    showModal = () => {
        this.setState({visible: true});
    };

    handleOk = () => {
      const {name, email, messageBody} = this.state;
      this.setState({
        confirmLoading: true,
      });

      //validation
      if (name === '') {
        this.setState({
          confirmLoading: false,
        });
        
        message.error('Name can not be blank!');
      } else if (email === '') {
        this.setState({
          confirmLoading: false,
        });

        message.error('Email can not be blank!');
      } else if (messageBody === '') {
        this.setState({
          confirmLoading: false,
        });

        message.error('Message can not be blank!');
      } else if (!EmailValidator.validate(email)) {
        this.setState({
          confirmLoading: false,
        });

        message.error(`${email} is not a valid email!`);
      } else {
        this.props.messagePostRequest(name, email, messageBody);

        setTimeout(() => {
          this.setState({
            visible: false,
            confirmLoading: false
          });

          message.success('New Message Has Been Added!');
          this.props.messageListRequest(this.props.params);
        }, 3000);
      }
    };

    render() {
        const {visible, confirmLoading} = this.state;
        const {messages, params} = {...this.props};

        let data = [];
        let options = {};

        if (messages){
            data = messages.items.map((item, i) => {
                return {
                    ...item,
                    key: item.id,
                    created_at: item.created_at ? moment.parseZone(item.created_at).format('MM-DD-YYYY HH:MM:SS') : '',
                    name: item.user.username,
                    email: item.user.email,
                    action: this.getAction(item.id)
                }
            });

            let currentPage = parseInt(messages.current_page_number, 10);

            options = {
              total: messages.total_count,
              current: currentPage,
              showSizeChanger: false,
              pageSize: messages.num_items_per_page,
              onChange: pageIndex => {
                this.props.messageListRequest({ ...params,
                  pageIndex
                })
              }
            };
        }

        return (
            <div>
                <Row>
                    <Button
                            style={{width: '50%', borderRadius: 4, textAlign: 'center', marginLeft: 0}}
                            onClick={this.showModal}
                            type="primary"
                        >
                            New Message
                    </Button>
                    <Modal title="Create Message"
                            visible={visible}
                            onOk={this.handleOk}
                            confirmLoading={confirmLoading}
                            onCancel={this.handleCancel}
                            width={700}
                            centered
                    >
                        <Row justify="start">
                            <Col span={4}>
                                <label>Name: </label>
                                <Input
                                    onChange={e => this.setState({name: e.target.value})}/>
                            </Col>
                        </Row>
                        <br/>
                        <Row justify="start">
                            <Col span={4}>
                                <label>Email: </label>
                                <Input
                                    onChange={e => this.setState({email: e.target.value})}/>
                            </Col>
                        </Row>
                        <br/>
                        <Row justify="start">
                            <Col span={12}>
                                <label>Message: </label>
                                <TextArea 
                                    placeholder="Enter your message" 
                                    autosize={{ minRows: 2, maxRows: 6 }} 
                                    onChange={e => this.setState({messageBody: e.target.value})}
                                />
                            </Col>
                        </Row>
                            
                    </Modal>
                </Row>
                <Table
                    columns={columns}
                    dataSource={data}
                    bordered
                    loading={this.props.loading}
                    pagination={options}
                    size = "middle"
                    footer={() => (<strong>Total: {options.total}</strong>)}
                />
            </div>
        );
    }
}

export default connect(
    state => ({
        messages: state.message.get('messages'),
        loading: state.message.get('loading'),
        params: state.message.get('params').toJS(),
    }),
    {
        messageListRequest,
        messagePostRequest,
        resetMessagestate,
        messageDeleteRequest
    }
)(App);
