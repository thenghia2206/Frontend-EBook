import { DownOutlined } from '@ant-design/icons'
import { Button, Rate } from 'antd'
import React, { useEffect, useState } from 'react'

import './styles.comment.scss'
import { motion } from 'framer-motion'
import { useSelectorRoot } from '../../redux/store'
import Avatar from '../../images/detail/avatar.png'

interface CCommentProps {
    data? : any
}

const CComment = (props : CCommentProps) => {
    const [activeButton, setActiveButton] = useState<number>(1);
    const { listRate, totalRate } = useSelectorRoot((state) => state.book); 

    const handleButtonClick = (buttonNumber: number) => {
        setActiveButton(buttonNumber);
    };

    return (
        <div className='main-comment'>
            <div className='title'>Đánh giá sách</div>
            <div className='btn-group-and-total-rate'>
                <Button.Group>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}>
                        <Button
                            type={activeButton === 1 ? 'primary' : 'default'}
                            onClick={() => handleButtonClick(1)}
                        >
                            Tất cả ({totalRate})
                        </Button>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}>
                        <Button
                            type={activeButton === 2 ? 'primary' : 'default'}
                            onClick={() => handleButtonClick(2)}
                        >
                            5 sao (0)
                        </Button>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}>
                        <Button
                            type={activeButton === 3 ? 'primary' : 'default'}
                            onClick={() => handleButtonClick(3)}
                        >
                            4 sao (0)
                        </Button>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}>
                        <Button
                            type={activeButton === 4 ? 'primary' : 'default'}
                            onClick={() => handleButtonClick(4)}
                        >
                            3 sao (0)
                        </Button>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}>
                        <Button
                            type={activeButton === 5 ? 'primary' : 'default'}
                            onClick={() => handleButtonClick(5)}
                        >
                            2 sao (56)
                        </Button>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}>
                        <Button
                            type={activeButton === 6 ? 'primary' : 'default'}
                            onClick={() => handleButtonClick(6)}
                        >
                            1 sao (32)
                        </Button>
                    </motion.div>
                </Button.Group>
                <div
                    className='total-rate'
                >
                    <Rate
                        allowHalf
                        defaultValue={(props.data?.totalRate / props.data?.totalReview)}
                        count={5}
                        disabled
                        style={{marginLeft : "15px"}}
                    />
                </div>
 
            </div>
            <div className='comment-list' >
                {
                    (listRate && listRate.length > 0)
                        ?
                        listRate.map((item : any) => (
                            <div className='comment' style={{width : "90%"}}>
                                <div className='avatar'>
                                    <img src={Avatar} />
                                </div>
                                <div className='content'>
                                    <div className='name'>{item.nameUser}</div>
                                    <div>
                                        <Rate
                                            allowHalf
                                            defaultValue={item.star}
                                            count={5}
                                            disabled
                                        />
                                    </div>
                                    <div className='comment-content'>{item.description}</div>
                                    <div className='time'>{new Date(item.createdAt).toLocaleDateString('en-GB')}</div>
                                </div>
                            </div>
                        ))
                        :
                        <div className='comment'>
                            Chưa có đánh giá
                        </div>
                }
            </div>
            <div className='more-comment'>
                <div className='text'>Xem thêm</div>
                <div className='icon'>
                    <DownOutlined />
                </div>
            </div>
        </div>
    )
}

export default CComment