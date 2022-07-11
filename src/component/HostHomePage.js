import React, { Component } from 'react'
import { message, Tabs, List } from "antd";
import { getStaysByHost } from "../utils"
import StayCard from './card/StayCard';

const { TabPane } = Tabs;

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
                    gutter: 16, xs: 1, sm: 3, md: 3, lg: 3, xl: 4, xxl: 4,
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

class HostHomePage extends Component {

    render() {
        return (
            <div style={{margin: '20px'}}>
                <Tabs defaultActiveKey="1" destroyInactiveTabPane={true} centered>
                    <TabPane tab="My Stays" key="1">
                        <MyStays />
                    </TabPane>
                    <TabPane tab="Upload Stay" key="2">
                        <div>Upload Stays</div>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export default HostHomePage;