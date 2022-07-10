import { React, Component } from 'react'
import { Button, Tooltip, Space, Modal, } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import Text from "antd/lib/typography/Text";
import { } from "../utils";

export default class StayDetailInfoButton extends Component {
    state = {
        modalVisible: false
    }

    openModal = () => {
        this.setState({
            modalVisible: true
        })
    }

    handleCancel = () => {
        this.setState({
            modalVisible: false
        })
    }

    render() {
        const { stay } = this.props;
        const { name, description, address, guest_number } = stay;
        const { modalVisible } = this.state;
        return (
            <>
                <Tooltip title="View Stay Details">
                    <Button
                        onClick={this.openModal}
                        style={{ border: "none" }}
                        size="large"
                        icon={<InfoCircleOutlined />}
                    />
                </Tooltip>
                {modalVisible && (
                    <Modal
                        title={name}
                        centered={true}
                        visible={modalVisible}
                        closable={false}
                        footer={null}
                        onCancel={this.handleCancel}
                    >
                        <Space direction="vertical">
                            <Text strong={true}>Description</Text>
                            <Text type="secondary">{description}</Text>
                            <Text strong={true}>Address</Text>
                            <Text type="secondary">{address}</Text>
                            <Text strong={true}>Guest Number</Text>
                            <Text type="secondary">{guest_number}</Text>
                        </Space>
                    </Modal>
                )}
            </>
        );
    }
}