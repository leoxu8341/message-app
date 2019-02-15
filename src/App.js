import React, {Component} from 'react';
import Cookies from 'universal-cookie';
import {connect} from 'react-redux';
import {
    Col,
    Row,
    message,
    Modal,
    Input,
    Table,
    Button,
    Tooltip,
    Tabs
} from 'antd';
import moment from 'moment';
import messageAction from './redux/app/actions';
import authAction from './redux/auth/actions';

const {logoutRequest} = authAction;
const TabPane = Tabs.TabPane;

const {
    myMessageListRequest,
    messageListRequest,
    messagePostRequest,
    resetMessagestate,
    messageDeleteRequest
} = messageAction;

const cookies = new Cookies();
const { TextArea } = Input;

const tableinfos = [{
    title: 'All Messages',
    value: 'all',
  },
  {
    title: 'My Messages',
    value: 'my',
  }
];

const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 200
}, {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    width: 200
}, {
    title: 'Message',
    dataIndex: 'message_body',
    key: 'message_body',
    width: 400
}, {
    title: 'Date',
    dataIndex: 'created_at',
    key: 'created_at',
    width: 200
},
{
  title: 'Action',
  dataIndex: 'action',
  key: 'action',
  width: 100
}];

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            confirmLoading: false,
            messageBody: '',
            iconLoading: false
        }
    }

    getAction = (id, userId) => {
        if (this.props.user !== null && this.props.user.id === userId) {
          return <Button type="danger" onClick={() => this.deleteMessage(id)}>Delete</Button>
        }
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
      const {messageBody} = this.state;
      this.setState({
        confirmLoading: true,
      });

      //validation
      if (messageBody === '') {
        this.setState({
          confirmLoading: false,
        });

        message.error('Message can not be blank!');
      } else {
        this.props.messagePostRequest(messageBody);

        setTimeout(() => {
          this.setState({
            visible: false,
            confirmLoading: false,
            messageBody: ''
          });

          message.success('New Message Has Been Added!');
          this.props.messageListRequest(this.props.params);
        }, 3000);
      }
    };

    handleLogout = () => {
      this.setState({ iconLoading: true });
      cookies.remove('message_token', {'path': '/'});
      cookies.remove('message_user', {'path': '/'});
      
      setTimeout(() => {
        this.setState({ iconLoading: false });
        
        message.success('You have been logged out');
        this.props.logoutRequest();
        this.props.history.push('/login');
      }, 3000);
    }

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
                    action: this.getAction(item.id, item.user.id),
                    message_body: <Tooltip title={item.message_body} placement="topLeft">
                            {item.message_body.length < 51 ? item.message_body : item.message_body.slice(0, 50).concat('...')}
                        </Tooltip>,
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
                <h1 style={{width: '100%', textAlign: 'center'}}>Welcome To Message Board</h1>
                <Row>
                    <Col span={8}>
                      <Button
                        style={{width: '50%', borderRadius: 4, textAlign: 'center', marginLeft: 40}}
                        onClick={this.showModal}
                        type="primary"
                      >
                        New Message
                      </Button>
                    </Col>
                    <Col span={16}>
                      <Button 
                        style={{width: '25%', borderRadius: 4, textAlign: 'center', marginRight: 40, float: 'right'}}
                        onClick={this.handleLogout}
                        type="primary" 
                        icon="poweroff" 
                        loading={this.state.iconLoading} 
                      >
                        Logout
                      </Button>
                    </Col>
                    <Modal title="Create Message"
                      visible={visible}
                      onOk={this.handleOk}
                      confirmLoading={confirmLoading}
                      onCancel={this.handleCancel}
                      width={500}
                      centered
                    >
                      <Row justify="start">
                        <Col span={24}>
                          <label>Message: </label>
                          <TextArea 
                            placeholder="Enter your message" 
                            autosize={{ minRows: 6, maxRows: 10 }} 
                            onChange={e => this.setState({messageBody: e.target.value.trim()})}
                          />
                        </Col>
                      </Row>   
                    </Modal>
                </Row>
                <Row>
                  <Col span={24}>
                    <Tabs defaultActiveKey="all"
                      style = {{
                        'margin': 40,
                      }}
                      onChange={
                          key => this.props.messageListRequest({
                              ...params,
                              'pageIndex': 1,
                              show: key
                          })
                      }>
                    {
                      tableinfos.map(tableInfo => (
                        <TabPane tab={<span><strong>{tableInfo.title}</strong></span>}
                                key={tableInfo.value}>
                            <Table
                              style = {{
                                'padding': 10,
                                'textAlign': 'center',
                                'verticalAlign': 'middle'
                              }}
                              columns={columns}
                              dataSource={data}
                              bordered
                              loading={this.props.loading}
                              pagination={options}
                              size = "small"
                              footer={() => (<strong>Total: {options.total}</strong>)}
                          />
                        </TabPane>
                      ))}
                </Tabs>
                  
                  </Col>
                </Row>  
            </div>
        );
    }
}

export default connect(
    state => ({
        messages: state.message.get('messages'),
        loading: state.message.get('loading'),
        params: state.message.get('params').toJS(),
        user: state.auth.get('user') 
    }),
    {
        messageListRequest,
        messagePostRequest,
        resetMessagestate,
        messageDeleteRequest,
        logoutRequest,
        myMessageListRequest
    }
)(App);
