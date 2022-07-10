import React, { Component } from 'react'
import { message, Tabs, List, Card, Image, Carousel, Button, Popconfirm } from "antd";
import { LeftCircleFilled, RightCircleFilled, DeleteOutlined } from "@ant-design/icons";
import Text from "antd/lib/typography/Text";
import StayDetailInfoButton from './StayDetailInfoButton';
import { getStaysByHost, deleteStay } from "../utils"


const { TabPane } = Tabs;
// const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
// const CustomSpinner = () => <Spin indicator={antIcon}/> 

class RemoveStayButton extends Component {
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
                        <Card
                            key={item.id}
                            title={
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <Text ellipsis={true} style={{ maxWidth: 150 }}>
                                        {item.name}
                                    </Text>
                                    <StayDetailInfoButton stay={item} />
                                </div>
                            }
                            actions={[]}
                            hoverable
                            extra={<RemoveStayButton stay={item} onRemoveSuccess={this.loadData} />}
                            style={{ width: "300px", height: "300px", margin:'auto' }}
                        >
                            {
                                <Carousel
                                    dots={false}
                                    arrows={true}
                                    prevArrow={<LeftCircleFilled />}
                                    nextArrow={<RightCircleFilled />}
                                >
                                    {item.images.map((image, index) => (
                                        <div key={index}>
                                            <Image src={image.url} width="250px" height="170px" />
                                        </div>
                                    ))}
                                </Carousel>
                            }
                        </Card>
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