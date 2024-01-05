import React from "react";
import {
    Variants,
    motion,
    useTransform,
    useViewportScroll,
} from "framer-motion";
import { Card } from "antd";
import Meta from "antd/lib/card/Meta";
import { EyeOutlined } from "@ant-design/icons";
import BietThu from "../../images/homepage/bietthu1.png";
import { useNavigate } from "react-router-dom";
import "./styles.bookcard.scss";
import Utils from "../../common/utils";
import { API_URL } from "../../enum/api.enum";
interface props {
    image?: string;
    title: string;
    view: number;
    price: number;
    sold: number;
}

const CBookCard = (props: props) => {
    const navigate = useNavigate();

    return (
        <Card
            className="card"
            style={{width : "230px" ,height : "400px"}}
            hoverable
            cover={<img className="image-card" alt="example" src={`${API_URL.HOST}/${API_URL.IMAGE}/${props.image}`} style={{width : "230px" , height : "280px", objectFit: "contain", objectPosition: "center"}}/>}
        >
            <div className="title-and-price">
                <Meta
                    title={
                        <div className="home-card-title">
                            <div className="h-c-t-title">{props.title}</div>
                            <div className="h-c-t-view-point">
                                <EyeOutlined />
                                <div className="number-of-view">
                                    {props.view / 2}
                                </div>
                            </div>
                        </div>
                    }
                />
            </div>
            <div className="home-card-price">
                <div className="price">{Utils.formatMoney(props.price)} VNĐ</div>
                <div className="sold">Đã bán {props.sold}</div>
            </div>
            
        </Card>
    );
};

export default CBookCard;
