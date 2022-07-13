import React, { Component } from 'react';
import { message, Form, DatePicker, Button, Modal } from 'antd';
import { bookStay } from '../../utils';

class BookStayButton extends Component {
    state = {
        loading: false,
        modalVisible: false,
    };

    handleCancel = () => {
        this.setState({
            modalVisible: false,
        });
    };

    handleBookStay = () => {
        this.setState({
            modalVisible: true,
        });
    };

    handleSubmit = async (values) => {
        const { stay } = this.props;
        this.setState({
            loading: true,
        });

        try {
            await bookStay({
                checkin_date: values.checkin_date.format("YYYY-MM-DD"),
                checkout_date: values.checkout_date.format("YYYY-MM-DD"),
                stay: {
                    id: stay.id,
                },
            });
            message.success(`Successfully book stay: ${stay.name}`);
        } catch (error) {
            message.error(error.message);
        } finally {
            this.setState({
                loading: false,
            });
            this.handleCancel();
        }
    };

    render() {
        const { stay } = this.props;
        return (
            <>
                <Button onClick={this.handleBookStay} shape="round" type="primary">
                    Book
                </Button>
                <Modal
                    bodyStyle={{ width: '360px' }}
                    destroyOnClose={true}
                    title={stay.name}
                    visible={this.state.modalVisible}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <Form
                        preserve={false}
                        labelCol={{ span: 10 }}
                        wrapperCol={{ span: 14 }}
                        style={{ margin: 'auto' }}
                        onFinish={this.handleSubmit}
                    >
                        <Form.Item
                            label="Checkin Date"
                            name="checkin_date"
                            rules={[{ required: true }]}
                        >
                            <DatePicker />
                        </Form.Item>
                        <Form.Item
                            label="Checkout Date"
                            name="checkout_date"
                            rules={[{ required: true }]}
                        >
                            <DatePicker />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 9, span: 15 }}>
                            <Button
                                loading={this.state.loading}
                                type="primary"
                                htmlType="submit"
                            >
                                Book
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </>
        );
    }
}

export default BookStayButton;