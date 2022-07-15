import React, { Component } from 'react';
import { Tabs, List, Typography, message, Form, InputNumber, DatePicker, Button, Input } from 'antd';
import { getReservations, searchStays } from '../utils';
import CancelReservationButton from './buttons/CancleReservationButton';
import StayCard from './StayCard';
import Geocode from "react-geocode";
import { GEO_API_KEY } from '../constants';

const { Text } = Typography;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

class SearchStays extends React.Component {
    state = {
        data: [],
        loading: false,
    };

    search = async (query) => {
        this.setState({
            loading: true,
        });

        try {
            Geocode.setApiKey(GEO_API_KEY);
            const resp = await Geocode.fromAddress(query.location);
            var { lat, lng } = resp.results[0].geometry.location;
        } catch (error) {
            message.error(error.message);
        }

        try {
            // console.log(lat, lng);
            const resp = await searchStays(query, lat, lng);
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
            <>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Form onFinish={this.search} layout="inline">
                        <Form.Item
                            label="Location"
                            name="location"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="United States" />
                        </Form.Item>
                        <Form.Item
                            label="Select Dates"
                            name="date_range"
                            rules={[{ required: true }]}
                        >
                            <RangePicker />
                        </Form.Item>
                        <Form.Item
                            label="Guest Number"
                            name="guest_number"
                            rules={[{ required: true }]}
                        >
                            <InputNumber min={1} />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                loading={this.state.loading}
                                type="primary"
                                htmlType="submit"
                            >
                                Search
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                {this.state.data.length !== 0 &&
                    <List
                        style={{ marginTop: 20 }}
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
                                <StayCard item={item} isGuest={true} />
                            </List.Item>
                        )}
                    />
                }
            </>
        );
    }
}

class MyReservations extends React.Component {
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
            const resp = await getReservations();
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
                style={{ width: 1000, margin: "auto" }}
                loading={this.state.loading}
                dataSource={this.state.data}
                renderItem={(item) => (
                    <List.Item actions={[
                        <CancelReservationButton
                            onCancelSuccess={this.loadData}
                            reservationId={item.id}
                        />
                    ]}>
                        <List.Item.Meta
                            title={<Text>{item.stay.name}</Text>}
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
        );
    }
}

class GuestHomePage extends Component {
    render() {
        return (
            <div style={{ margin: '20px' }}>
                <Tabs defaultActiveKey="1" destroyInactiveTabPane={true} centered>
                    <TabPane tab="Search Stays" key="1">
                        <SearchStays />
                    </TabPane>
                    <TabPane tab="My Reservations" key="2">
                        <MyReservations />
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export default GuestHomePage;
