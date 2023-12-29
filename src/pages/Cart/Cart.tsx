import React, { useEffect, useState } from "react";
import "./styles.cart.scss";
import IconDetail1 from "../../images/detail/icon-detail-1.png";
import IconDetail2 from "../../images/detail/icon-detail-2.png";
import IconDetail3 from "../../images/detail/icon-detail-3.png";
import IconDetail4 from "../../images/detail/icon-detail-4.png";
import IconDetail5 from "../../images/detail/icon-detail-5.png";
import IconDetail6 from "../../images/detail/icon-detail-6.png";
import CartImage1 from "../../images/cart/cart-image-1.png";
import CartImage2 from "../../images/cart/cart-image-2.png";
import CartImage3 from "../../images/cart/cart-image-3.png";
import {
    Button,
    Modal,
    Radio,
    Space,
    Table,
    notification,
} from "antd";
import {
    EditOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
import { useDispatchRoot, useSelectorRoot } from "../../redux/store";
import { API_URL } from "../../enum/api.enum";
import { clearCartRequest, deleteBookInCartRequest, getCartRequest, paymentRequest } from "../../redux/controller";
import { useNavigate } from "react-router-dom";

const paymentMethodList = [
    {
        label: "Thanh toán bằng Internet Banking / Ví điện tử VNPAY",
        value: "VNPAYQR",
    },
    {
        label: "Thanh toán bằng thẻ ATM - Nội địa",
        value: "VNBANK",
    },
    {
        label: "Thanh toán bằng thẻ quốc tế Visa, MasterCard, JCB",
        value: "INTCARD",
    },
];

const Cart = () => {
    const { cart, cartQuantity, vnpayLink } =
        useSelectorRoot((state) => state.book);

    const dispatch = useDispatchRoot();

    const [paymentMethod, setPaymentMethod] = useState("");

    const columns = [
        Table.SELECTION_COLUMN,
        {
            title: `Tất cả (${cartQuantity} sản phẩm)`,
            key: "title",
            render: (record: any) => (
                <div className="sketch-cart-info">
                    <div className="sketch-cart-info-img" >
                        <img style={{ width: "115px" , height : "150px" }} src={`${API_URL.HOST}/${API_URL.IMAGE}/${record.image}`} alt=""  />
                    </div>
                    <div className="sketch-cart-content">
                        <div className="sketch-cart-content-title">
                            {record.title && record.title}
                        </div>

                    </div>
                </div>
            ),
        },
        {
            key: "5",
            title: (
                <div className="sketch-cart-action-title" onClick={() => clearCart()}>
                    <DeleteOutlined/> Xóa tất cả
                </div>
            ),
            render: (record: any) => {
                return (
                    <>
                        <div className="sketch-cart-action">
                            <div className={"sketch-cart-action-new-price"}>
                                {record.price.toLocaleString().replace(/,/g, '.') + 'đ'}
                            </div>
                            <div
                                className="sketch-cart-action-delete"
                                onClick={() => {
                                    onDeleteBookInCart(record);
                                }}
                            >
                                <DeleteOutlined />
                                Xóa
                            </div>
                        </div>
                    </>
                );
            },
        },
    ];

    useEffect(() =>{
        dispatch(getCartRequest())
    },[])

    useEffect(() => {
        if (vnpayLink) {
            window.location.replace(`${vnpayLink}`);
        }
    }, [vnpayLink]);

    useEffect(() => {
        
    }, []);


    const infoUser = [
        {
            key: "1",
            label: "Họ và tên",
            value: `${cart?.user.fullName}`,
        },
        {
            key: "2",
            label: "Email",
            value: `${cart?.user.email}`,
        },
        {
            key: "3",
            label: "Số điện thoại",
            value: `${cart?.user.phoneNumber}`,
        },
    ];

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: any) => {
            console.log(
                `selectedRowKeys: ${selectedRowKeys}`,
                "selectedRows: ",
                selectedRows
            );
        },
    };
    const onDeleteBookInCart = (record: any) => {
        Modal.confirm({
            title: "Bạn có muốn xóa sản phẩm này trong giỏ hàng?",
            okText: "Có",
            okType: "danger",
            cancelText : "Hủy",
            onOk: () => {
                const bodyRequest = {
                    id : record.id
                }
                dispatch(deleteBookInCartRequest(bodyRequest))
            },
        });
    };


    const clearCart = () => {
        Modal.confirm({
            title: "Bạn có muốn xóa toàn bộ sản phẩm này trong giỏ hàng?",
            okText: "Có",
            okType: "danger",
            cancelText : "Hủy",
            onOk: () => {
                dispatch(clearCartRequest())
            },
        });
    };

    const handleChangePaymentMethod = (e: any) => {
        setPaymentMethod(e.target.value);
    };

    const paymentHandle = () => {
        if (!paymentMethod) {
            notification.open({
                message: "Vui lòng chọn phương thức thanh toán",
                onClick: () => {
                    console.log("Notification Clicked!");
                },
                style: {
                    marginTop: 50,
                    paddingTop: 40,
                },
            });
        } else {
            const bodyrequest: any = {
                bankCodeIn: paymentMethod,
                additionalProp1: {},
            };
            dispatch(paymentRequest(bodyrequest));
        }
    };

    const navigate = useNavigate();

    useEffect(() => {
        document.body.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, [navigate]);

    return (
        <div className="main-cart">
            <div className="title">Giỏ hàng</div>
            <div className="content-cart">
                <div className="left-content-cart">
                    <Table
                        className="table-source"
                        columns={columns}
                        rowSelection={{ ...rowSelection }}
                        dataSource={cart?.books}
                        pagination={false}
                    />
                </div>
                <div className="right-content-cart">
                    <div className="right-content-cart-info-user">
                        <div className="title">
                            <div className="title-text">
                                Thông tin khách hàng
                            </div>
                            <div className="title-edit">
                                <EditOutlined />
                                Chỉnh sửa
                            </div>
                        </div>
                        {infoUser &&
                            infoUser.map((item : any, index : any) => (
                                <div key={index} className="info-user">
                                    <div className="label-info-user">
                                        {item.label}
                                    </div>
                                    <div className="value-info-user" style={{fontWeight : "bold"}}>
                                        {item.value.toLocaleString().replace(/,/g, '.')}
                                    </div>
                                </div>
                            ))}
                    </div>

                    <div className="right-content-cart-info-cart">
                        <div className="title">
                            <div className="title-text">
                                Phương thức thanh toán
                            </div>
                        </div>
                        <Radio.Group onChange={handleChangePaymentMethod}>
                            <Space direction="vertical">
                                {paymentMethodList.map((item) => (
                                    <Radio value={item.value}>
                                        {item.label}
                                    </Radio>
                                ))}
                            </Space>
                        </Radio.Group>

                        <div className="total-price">
                            <div className="total-price-title">Tổng tiền</div>
                            <div className="total-price-value">
                                {cart?.totalPrice.toLocaleString().replace(/,/g, '.') + ' VND'}
                            </div>
                        </div>
                    </div>

                    <Button className="to-payment" onClick={paymentHandle}>
                        Đi tới thanh toán
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
