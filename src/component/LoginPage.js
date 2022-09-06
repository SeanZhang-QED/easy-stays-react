import React from 'react';
import { Form, Button, Input, Space, Divider, message, Radio } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { login, register } from "../utils"
import Modal from 'antd/lib/modal/Modal';

class LoginPage extends React.Component {

    formRef = React.createRef(); // Create a ref for Form to store data

    state = {
        asHost: false,
        loading: false,
        displayModal: false,
    }

    handleBtnOnClick = () => {
        this.setState({
            displayModal: true
        })
    }
    handleBtnOnCancle = () => {
        this.setState({
            displayModal: false
        })
    }

    handleRadioOnChange = (e) => {
        // console.log('radio checked', e.target.value);
        this.setState({
            asHost: e.target.value === "host",
        });
    };

    handleLogin = async () => {
        const formInstance = this.formRef.current; // Retrive current form data
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
            const { asHost } = this.state;
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

    handleRegister = async () => {
        const formInstance = this.formRef.current;

        try {
            await formInstance.validateFields();
        } catch (error) {
            return;
        }

        this.setState({
            loading: true,
        });

        try {
            await register(formInstance.getFieldsValue(true), this.state.asHost);
            message.success("Signup Successfully");
        } catch (error) {
            message.error(error.message);
        } finally {
            this.setState({
                loading: false,
            });
        }
    };


    render() {
        return (
            <div>
                <Button
                    icon={<UserOutlined />}
                    type='primary'
                    onClick={this.handleBtnOnClick}
                    style={{marginRight:'-30px'}}
                >
                </Button>
                <Modal
                    wrapClassName="login-modal"
                    visible={this.state.displayModal}
                    onCancel={this.handleBtnOnCancle}
                    footer={null}
                >
                    <div className='divider-wrapper'>
                        <Divider><span style={{
                            fontSize: 26, fontWeight: 600, color: "#FF385C"
                        }}>
                            WELCOME
                        </span></Divider>
                    </div>
                    <Form ref={this.formRef}>
                        <Form.Item
                            name="username"
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
                            rules={[{ required: true, message: "Please input your Password!", },]}
                        >
                            <Input.Password
                                disabled={this.state.loading}
                                placeholder="Password"
                            />
                        </Form.Item>
                    </Form>
                    <Space direction="vertical" size={30}>
                        <Radio.Group
                            defaultValue={"guest"}
                            disabled={this.state.loading}
                            onChange={this.handleRadioOnChange}
                            style={{ display: "flex", justifyContent: "center" }}
                        >
                            <Radio value={"guest"}>Guest</Radio>
                            <Radio value={"host"}>Host</Radio>
                        </Radio.Group>
                        <Space size={140}>
                            <Button
                                onClick={this.handleLogin}
                                disabled={this.state.loading}
                                shape="round"
                                type="primary"
                            >
                                Log in
                            </Button>
                            <Button
                                onClick={this.handleRegister}
                                disabled={this.state.loading}
                                shape="round"
                                type="primary"
                            >
                                Register
                            </Button>
                        </Space>
                    </Space>
                </Modal>
            </div>
        )
    }
}

export default LoginPage;