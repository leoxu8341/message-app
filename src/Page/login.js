import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {
  Form, Icon, Input, Button
} from 'antd';
import authActions from '../redux/auth/actions';

const {loginRequest, removeErrors} = authActions;

class Login extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.loginRequest(values.email.trim(), values.password.trim());
      }
    });
  }

  render() {
    const message = {pathname: '/message'};
    if (this.props.isLoggedIn === true) {
        return <Redirect to = {message} />;
    }

    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit = {this.handleSubmit}
        className = "login-form"
        style = {{
          'margin': '0 auto',
          'width': '100%',
          'textAlign': 'center',
          'verticalAlign': 'middle',
          'maxWidth': '400px',
          'height': '100%',
          'paddingTop': '200px'
        }}>
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [{
                  type: 'email',
                  message: 'The input is not valid E-mail!',
              }, {
                  required: true,
                  message: 'Please input your E-mail!',
                  whitespace: true
              }],
            })(
              <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!', whitespace: true }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}} loading={this.props.loading} >
              Log in
            </Button>
            Or <a href="/register">register now!</a>
          </Form.Item>
      </Form>
    );
  }
}

export default connect(
    state => ({
        isLoggedIn: state.auth.get('idToken') !== null,
        errors: state.auth.get('error'),
        loading: state.auth.get('loading')
    }),
    {loginRequest, removeErrors}
)(Form.create({ name: 'login' })(Login));