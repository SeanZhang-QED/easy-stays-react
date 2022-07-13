import React from "react";
import { Button, message } from 'antd';
import { cancelReservation } from '../../utils';

class CancelReservationButton extends React.Component {
    state = {
        loading: false,
    };

    handleCancelReservation = async () => {
        const { reservationId, onCancelSuccess } = this.props;
        this.setState({
            loading: true,
        });

        try {
            await cancelReservation(reservationId);
        } catch (error) {
            message.error(error.message);
        } finally {
            this.setState({
                loading: false,
            });
        }

        onCancelSuccess();
    };

    render() {
        return (
            <Button
                loading={this.state.loading}
                onClick={this.handleCancelReservation}
                danger={true}
                shape="round"
                type="primary"
            >
                Cancel Reservation
            </Button>
        );
    }
}

export default CancelReservationButton;