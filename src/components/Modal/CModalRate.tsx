import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Modal, Rate } from "antd";
import { useEffect, useState } from "react";
import { loginRequest } from "../../redux/controller/login.slice";
import { useDispatchRoot, useSelectorRoot } from "../../redux/store";
import { Rule } from "antd/lib/form";
import { motion } from "framer-motion";
import { createRateRequest, getDetailBookRequests, getPuchasedBooksRequest } from "../../redux/controller";
import { API_URL } from "../../enum/api.enum";
import "./CModalRate.styles.scss"
import TextArea from "antd/lib/input/TextArea";
import { TEXT_FIELD } from "../../enum/common.enum";
interface MyProps {
    isOpenModal: boolean;
    toggleRateModal: () => void;
    data? : any;
}


const CRateModal = (props: MyProps) => {

    const dispatch = useDispatchRoot();

    const [selectDescription, setSelectDescription] = useState<string>("");
    const [star, setStar] = useState<number>(0)

    const handleCancelModal = () => {
        props.toggleRateModal()
        setStar(0)
        setSelectDescription("")
    }

    const handleChangeStar = ( value : any) => {
        setStar(value)
    }

    const onRate = () => {
        let bodyRequest : any
        if(selectDescription.length <= 0){
            bodyRequest = {
                bookId : props.data.id,
                star : star,
            }   
        }
        if(selectDescription.length > 0){
            bodyRequest = {
                bookId : props.data.id,
                star : star,
                description : selectDescription,
            } 
        }
        dispatch(createRateRequest(bodyRequest))
        setSelectDescription("")
        setStar(0)
        props.toggleRateModal()
    }


    return (
        <>
            <Modal
                title="Đánh giá sách"
                open={props.isOpenModal}
                onCancel={handleCancelModal}
                footer={false}
            >
                <div className="form-rate">   
                    <div className="book-info">
                        <div className="image-book">
                            <img src={`${API_URL.HOST}/${API_URL.IMAGE}/${props.data?.image}`} style={{ width: "100%"}}/>
                        </div>
                        <div className="title">
                            {props.data?.title}
                        </div>
                    </div>
                    <div className="rate-value">
                        <div className="title-rate">Chất lượng sách</div>
                        <div className="star-rate">
                            <Rate
                                value={star}
                                count={5}
                                onChange={(e) => handleChangeStar(e)}
                            />
                        </div>
                    </div>
                    <div className="description-rate">
                            <Form.Item>
                                    <div className="title-input" style={{fontSize : "16px"}}>
                                        Mô tả chi tiết 
                                    </div>
                                    <div className={`header-content-input`}>
                                        <TextArea
                                            rows={4}
                                            placeholder="Nhập mô tả"
                                            onChange={(e) =>
                                                setSelectDescription(e.target.value)
                                            }
                                            value={selectDescription}
                                            maxLength={TEXT_FIELD.MAX_LENGTH}
                                        />
                                    </div>
                            </Form.Item>  
                    </div>
                    <motion.div className="btn-submit-rate" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            className="btn-back"
                            style={{ borderRadius : "1em"}}
                            onClick={handleCancelModal}
                        >
                            Trở Lại
                        </Button>
                        {
                            star > 0 ? (
                                    <Button
                                        style={{marginLeft : "10px", borderRadius : "1em"}}
                                        onClick={onRate}
                                    >
                                        Hoàn Thành
                                    </Button>
                                ) : (
                                    <Button
                                        style={{marginLeft : "10px", borderRadius : "1em"}}
                                        disabled
                                    >
                                        Hoàn Thành
                                    </Button>
                                )}
                    </motion.div>
                </div>

            </Modal>
        </>
    );
};

export default CRateModal;
