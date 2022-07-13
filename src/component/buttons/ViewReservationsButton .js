import React, { useEffect, useState } from "react";
import { Button, Modal, message, List } from "antd";
import Text from "antd/lib/typography/Text";
import { getReservationsByStay } from "../../utils";

function ReservationList(props) {
    const { stayId } = props;
    const [loading, setLoading] = useState(false);
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        setLoading(true);
        getReservationsByStay(stayId)
            .then((data) => {
                setReservations(data);
            })
            .catch((error) => {
                message.error(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [stayId])

    return (
        <List
            loading={loading}
            dataSource={reservations}
            renderItem={(item) => (
                <List.Item>
                    <List.Item.Meta
                        title={<Text>Guest Name: {item.guest.username}</Text>}
                        description={
                            <>
                                <Text>Checkin Date: {item.checkin_date}</Text>
                                <br />
                                <Text>Checkout Date: {item.checkout_date}</Text>
                            </>
                        }
                    />
                </List.Item>
            )}
        />
    )
}

class ViewReservationsButton extends React.Component {
    state = {
        modalVisible: false,
    };

    openModal = () => {
        this.setState({
            modalVisible: true,
        });
    };

    handleCancel = () => {
        this.setState({
            modalVisible: false,
        });
    };

    render() {
        const { stay } = this.props;
        const { modalVisible } = this.state;

        const modalTitle = `Reservations of ${stay.name}`;

        return (
            <>
                <Button onClick={this.openModal} shape="round">
                    View Reservations
                </Button>
                {modalVisible && (
                    <Modal
                        wrapClassName="info-modal"
                        title={modalTitle}
                        centered={true}
                        visible={modalVisible}
                        closable={false}
                        footer={null}
                        onCancel={this.handleCancel}
                        destroyOnClose={true}
                    >
                        <ReservationList stayId={stay.id} />
                    </Modal>
                )}
            </>
        )
    }
}

export default ViewReservationsButton;