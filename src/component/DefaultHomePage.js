import React from 'react';
import { Space, Form, Input, Button, message, Divider, Modal } from 'antd';
import { UserOutlined } from "@ant-design/icons";
import { login } from "../utils"

const wrapperStyle = {
  height: '400px',
  width: '80%',
  margin: 'auto',
  borderRadius: '16px',
  position: 'relative'
}

const innerLeftStyle = {
  left: 0,
  zIndex: '1',
  height: '100%',
  position: 'absolute',
}

const innerRightStyle = {
  height: '100%',
  right: 0,
  width: '70%',
  position: 'absolute',
}

class Login extends React.Component {
  loginformRef = React.createRef(); // Create a ref for Form to store data

  state = {
    loading: false,
  }

  handleLogin = async () => {
    const formInstance = this.loginformRef.current; // Retrive current form data
    // Step 1: validate the data
    try {
      // syntax suger - for promise
      // await must be used with async 
      await formInstance.validateFields();
    } catch (error) {
      return
    }

    // Step 2: setting loading
    this.setState({
      loading: true
    })

    // Step 3: retrive data
    try {
      const { asHost } = false;
      const resp = await login(formInstance.getFieldsValue(true), asHost);
      this.props.handleLoginSuccess(resp.token, asHost);
    } catch (error) {
      message.error(error.message);
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    return (
      <div className='login-page'>
        <div className='divider-wrapper'>
          <h1 style={{ fontSize: 20, fontWeight: 700 }}>
            Find Premium Stays In here
          </h1>
          <p>Enjoy your next adventure with unique stays, and more. Plan your trip today.</p>
        </div>
        <Form ref={this.loginformRef} layout='vertical' style={{ width: '80%', margin: 'auto' }}>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please input your Username!", },]}
          >
            <Input
              disabled={this.state.loading}
              suffix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            label='Password'
            rules={[{ required: true, message: "Please input your Password!", },]}
          >
            <Input.Password
              disabled={this.state.loading}
              placeholder="Password"
            />
          </Form.Item>
        </Form>
        <div className='divider-wrapper'>
          <Divider>
            Welcome Back
          </Divider>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={this.handleLogin}
            disabled={this.state.loading}
            shape="round"
            type="primary"
            style={{ width: "80%" }}
          >
            <b>Log in</b>
          </Button>
        </div>
      </div>
    )
  }
}

const renderHostInfo = (props) => {
  const info = () => {
    Modal.success({
      title: 'Thank you for your interest!',
      content: (
        <p>Please click the button on top-right corner to Registe and Login as Host. </p>
      ),
      onOk() { },
    });
  };

  return (
    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Space direction="vertical" align='center' size={24} style={{ height: '50%', width: '75%' }}>
        <h1 style={{ fontSize: '25px', color: 'white' }}><b>Start Hosting!</b></h1>
        <p style={{ color: 'white' }}>Offer Your Space and Host Guests from Across the World.</p>
        <Button onClick={info} style={{ width: '200px' }}><b>Learn More</b></Button>
      </Space>
    </div>
  )
}

function DefaultHomePage(props) {
  return (
    <Space direction="vertical" size={64} style={{ display: 'flex', marginTop: '30px' }}>
      <div style={{ ...wrapperStyle, height: '520px' }} >
        <div
          style={{
            ...innerLeftStyle,
            width: '45%',
            borderRadius: '8px 0 0 8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Login handleLoginSuccess={props.handleLoginSuccess} />
        </div>
        <div
          style={{
            ...innerRightStyle
          }}
        >
          <img
            src='https://storage.googleapis.com/stays-bucket/bg-guest.jpg'
            alt='Explore the Premium Vacation Rentals now'
            style={{
              height: '100%',
              width: '100%',
              objectFit: 'cover',
              borderRadius: '8px',
            }}
          ></img>
        </div>
      </div>
      <div style={{ ...wrapperStyle, }} >
        <div
          style={{
            ...innerLeftStyle,
            width: '35%',
            background: 'linear-gradient(to right, orange, 75%, #ffca69)',
            borderRadius: '16px 0 0 16px',
          }}
        >
          {renderHostInfo()}
        </div>
        <div
          style={{
            ...innerRightStyle
          }}
        >
          <img
            src='https://storage.googleapis.com/stays-bucket/bg-host.jpg'
            alt='Join and share the stays.'
            style={{
              height: '100%',
              width: '100%',
              objectFit: 'cover',
              borderRadius: '0 16px 16px 0',
            }}
          ></img>
        </div>
      </div>
    </Space>
  )
}

export default DefaultHomePage;
