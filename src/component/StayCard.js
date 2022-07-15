import React from 'react';
import { Card, Image, Carousel } from "antd";
import { LeftCircleFilled, RightCircleFilled } from "@ant-design/icons";
import Text from "antd/lib/typography/Text";
import StayDetailInfoButton from './buttons/StayDetailInfoButton';
import StayRemoveButton from './buttons/StayRemoveButton';
import ViewReservationsButton from './buttons/ViewReservationsButton ';
import BookStayButton from './buttons/BookStayButton';

function StayCard(props) {
    const { item, loadData, isGuest } = props;
    return (
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
            actions={[!isGuest && <ViewReservationsButton stay={item} key='view-reservation' />]}
            extra={
                !isGuest
                    ? <StayRemoveButton stay={item} onRemoveSuccess={loadData} />
                    : <BookStayButton stay={item} />
            }
            style={{ width: "330px", height: "360px", margin: 'auto' }}
            hoverable={true}
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
                            <Image src={image.url} width="330px" height="220px" />
                        </div>
                    ))}
                </Carousel>
            }
        </Card>
    )
}

export default StayCard
