import React, {Component} from 'react';
import { message, Popconfirm, Button} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteStay } from "../../utils"

export default class StayRemoveButton extends Component {
    state = {
        loading: false,
    };

    handleRemoveStay = async () => {
        const { stay, onRemoveSuccess } = this.props;
        this.setState({
            loading: true,
        });

        try {
            await deleteStay(stay.id);
            onRemoveSuccess();
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
            <Popconfirm
                title="Are you sure to delete this stay?"
                onConfirm={this.handleRemoveStay}
                okText="Yes"
                cancelText="No"
            >
                <Button
                    danger={true}
                    disabled={this.state.loading}
                    shape="circle"
                    icon={<DeleteOutlined />}
                    type="primary"
                >
                </Button>
            </Popconfirm>
        );
    }
}