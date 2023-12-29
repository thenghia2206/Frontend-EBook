import { Button, Checkbox, Col, Form, Radio, Row, Select } from "antd";
import { Option } from "antd/lib/mentions";
import "./styles.filter.scss";
import React, { useEffect, useState } from "react";
import {
    FormatPainterOutlined,
    HomeOutlined,
    ToolOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import { useDispatchRoot, useSelectorRoot } from "../../redux/store";
import { advancedSearchingRequest, getCategoriesRequest } from "../../redux/controller";
import { QUERY_PARAM_FILTER } from "../../constants/get-api.constants";
import { useNavigate } from "react-router-dom";

interface DATA_TRANFER {
    target: string;
    value: string;
}

const CFilter = () => {
    const dispatch = useDispatchRoot();
    const [form] = Form.useForm();

    const { listCategory , currentSearchValue} = useSelectorRoot(
        (state) => state.book
    );

    useEffect(()=>{
        const bodyRequest = {
            size : 50,
            offset : 0
        }
        dispatch(getCategoriesRequest(bodyRequest))
    },[])

    const [visibleCategories, setVisibleCategories] = useState(7);

    const handleViewMore = () => {
      setVisibleCategories(listCategory.length);
    };

    const navigate = useNavigate();

    const onClickCategory = (categoryId : string) => {
        const bodyrequest: any = {
            size : QUERY_PARAM_FILTER.size,
            offset : 0,
            search: "",
            categoryId: categoryId,
            authorId: "",
            publisherId: "",
            sortBy : "",
            sortOrder : ""
        };
        dispatch(advancedSearchingRequest(bodyrequest))
        navigate("/searching");
    }

    return (
        <motion.div
            className="main-filter"
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Form form={form}>
                <Form.Item className="form-item" name="category">
                    <div className="title">
                        <div className="icon">
                            <HomeOutlined />
                        </div>
                        <div className="text">Thể Loại</div>
                    </div>
                    <Radio.Group defaultValue={currentSearchValue.categoryId}>
                        {listCategory.slice(0, visibleCategories).map(category => (
                            <Radio key={category.id} value={category.name}
                            onClick={() => onClickCategory(category.id)}
                            >
                            {category.name}
                            </Radio>
                        ))}
                    </Radio.Group>
                    {listCategory.length > visibleCategories && (
                            <button 
                            onClick={handleViewMore}
                            style={{color : "black", background : "white",marginTop : "1em",marginLeft : "2em"}}
                            >Xem Thêm</button>
                        )}
                </Form.Item>
            </Form>
        </motion.div>
    );
};

export default CFilter;
