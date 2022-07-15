import React, { Component } from 'react'
import { message, Tabs, List, Form, Input, InputNumber, Button } from "antd";
import { getStaysByHost, uploadStay } from "../utils"
import StayCard from './StayCard';
import FormItem from 'antd/lib/form/FormItem';

const { TabPane } = Tabs;
const layout = {
    layout: 'vertical',
    wrapperCol: { span: 16 },
};

class MyStays extends Component {
    state = {
        loading: false,
        data: [],
    };

    componentDidMount() {
        this.loadData();
    }

    loadData = async () => {
        this.setState({
            loading: true,
        });

        try {
            const resp = await getStaysByHost();
            this.setState({
                data: resp,
            });
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
            <List
                // loading={this.state.loading && CustomSpinner}
                loading={this.state.loading}
                grid={{
                    gutter: 8,
                    xs: 1,
                    sm: 1,
                    md: 2,
                    lg: 2,
                    xl: 3,
                    xxl: 4,
                }}
                dataSource={this.state.data}
                renderItem={(item) => (
                    <List.Item>
                        <StayCard item={item} loadData={this.loadData} />
                    </List.Item>
                )}
            />
        );
    }

}

class UploadStay extends Component {
    state = {
        loading: false,
    }
    fileInputRef = React.createRef();

    handleSubmit = async (values) => {
        const formData = new FormData();
        const { files } = this.fileInputRef.current;

        if (files.length > 5) {
            message.error("You can at most upload 5 pictures.");
            return;
        }

        for (let i = 0; i < files.length; i++) {
            formData.append("images", files[i]);
        }

        formData.append("name", values.name);
        formData.append("address", values.address);
        formData.append("description", values.description);
        formData.append("guest_number", values.guest_number);

        this.setState({
            loading: true,
        });
        try {
            await uploadStay(formData);
            message.success("upload successfully");
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
            <Form
                {...layout}
                onFinish={this.handleSubmit}
                style={{ maxWidth: 500, margin: "auto" }}
            >
                <FormItem name="name" label="Name" rules={[{ required: true }]}>
                    <Input />
                </FormItem>
                <FormItem name="address" label="Address" rules={[{ required: true }]}>
                    <Input />
                </FormItem>
                <FormItem name="description" label="Description" rules={[{ required: true }]}>
                    <Input.TextArea autoSize={{ minRows: 2, maxRows: 6 }} />
                </FormItem>
                <FormItem name="guest_number" label="Guest Number" rules={[{ required: true, type: "number", min: 1 }]}>
                    <InputNumber />
                </FormItem>
                <Form.Item name="pictures" label="Pictures" rules={[{ required: true }]}>
                    <input
                        type="file"
                        accept="image/png, image/jpeg"
                        ref={this.fileInputRef}
                        multiple={true}
                    />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit" loading={this.state.loading}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}

class HostHomePage extends Component {

    render() {
        return (
            <div style={{ margin: '20px' }}>
                <Tabs defaultActiveKey="1" destroyInactiveTabPane={true} centered>
                    <TabPane tab="My Stays" key="1">
                        <MyStays />
                    </TabPane>
                    <TabPane tab="Upload Stay" key="2">
                        <UploadStay />
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export default HostHomePage;