import { Button, Select } from 'antd';
import React, { useState } from 'react';
import './styles.arrangebar.scss';
import { motion } from 'framer-motion';
import {
    CaretDownOutlined,
} from '@ant-design/icons';

const { Option } = Select;

const CArrangeBar = () => {
    const [activeButton, setActiveButton] = useState<number>(1);

    const handleButtonClick = (buttonNumber: number) => {
        setActiveButton(buttonNumber);
    };
    return (
        <div className='main-arrange'>
            <div className='title'>Sắp xếp theo</div>
            <Button.Group>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}>
                    <Button
                        type={activeButton === 1 ? 'primary' : 'default'}
                        onClick={() => handleButtonClick(1)}
                    >
                        Mới nhất
                    </Button>
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}>
                    <Button
                        type={activeButton === 2 ? 'primary' : 'default'}
                        onClick={() => handleButtonClick(2)}
                    >
                        Thuê nhiều nhất
                    </Button>
                </motion.div>
            </Button.Group>
            <div className='select-box'>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}>
                    <Select
                        suffixIcon={<CaretDownOutlined />}
                        placeholder="Chọn cách sắp xếp"
                    >
                        <Option value='1'>Từ cao đến thấp</Option>
                        <Option value='2'>Từ thấp đến cao</Option>
                    </Select>

                </motion.div>
            </div>
        </div>
    )
}

export default CArrangeBar