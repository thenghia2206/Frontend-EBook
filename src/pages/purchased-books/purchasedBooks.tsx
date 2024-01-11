import { Tooltip, Space, Modal, Divider } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { motion } from 'framer-motion';
import React, { useCallback, useEffect, useState } from 'react'
import Utils from '../../common/utils';
import CTable from '../../components/CTable/CTable';
import { QUERY_PARAM } from '../../constants/get-api.constants';
import { useSelectorRoot, useDispatchRoot } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { IPuchasedBooks } from '../../common/puchasedBooks.interface';
import { API_URL } from '../../enum/api.enum';
import { getFileBookRequests, getPuchasedBooksRequest } from '../../redux/controller';
import { EditOutlined, EyeOutlined, FormOutlined } from '@ant-design/icons';
import CRateModal from '../../components/Modal/CModalRate';
import IconRate from "../../images/rate.jpg";

const PurchasedBooks = () => {
    const {
        listPuchasedBook,totalPuchasedBooks
    } = useSelectorRoot((state) => state.book);
    const [openModal, setOpenModal] = useState(false);
    const [textSearch, setTextSearch] = useState('');
    const [beginDate, setBeginDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [dataBillLst, setDataBillLst] = useState<any[]>([]);
    const [currentSearchValue, setCurrentSearchValue] = useState<any>({
         size: 10, 
         offset: 0 
        })

    const [isOpenModalRate, setIsOpenModalRate] = useState<boolean>(false)

    const toggleRateModal = () => {
        setIsOpenModalRate(!isOpenModalRate)
    }

    const navigate = useNavigate();
    const dispatch = useDispatchRoot();

    const firstGetData = useCallback(() => {
    }, [])


    useEffect(() => {
        dispatch(getPuchasedBooksRequest(currentSearchValue))
    }, [])



    const columns: ColumnType<IPuchasedBooks>[] = [
        {
            title: 'Số thứ tự',
            render: (_, __, rowIndex) => (
                <span className='span-table'>{rowIndex + 1}</span>
            )
        },
        {
            title: 'Tên sách',
            key: 'title',
            render: (_, record) => (
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    {record?.book.title}
                </div>
            )
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (_, record) => (
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'end' }}>
                    {Utils.formatMoney(record?.priceBook) + ' VND'}
                </div>
            )
        },
        {
            title: "Ngày mua",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (_, record) => (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ textAlign: "center" }} >{new Date(record.createdAt).toLocaleDateString("en-GB")}</div>
              </div>
            ),
          },
        {
            title: 'Ảnh',
            key: 'createdAt',
            render: (_, record) => (
                <div>
                    <img style={{ width: "90px" , height : "110px"}} src={`${API_URL.HOST}/${API_URL.IMAGE}/${record.book.image}`} />
                </div>
            )
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    { record.rated ? (
                        <Tooltip placement="top" title={"Xem chi tiết"} >
                            <EyeOutlined style={{marginLeft : "10px"}} onClick={() => handleDetail(record)} />
                        </Tooltip>
                    ) : (

                        <div>
                            <Tooltip placement="top" title={"Đánh giá"}>
                                <img src={IconRate} alt="" style={{height : '20px', width : '20px'}} onClick={() => handleRate(record)} />
                            </Tooltip>
                            <Tooltip placement="top" title={"Xem chi tiết"} >
                                <EyeOutlined style={{marginLeft : "10px"}} onClick={() => handleDetail(record)} />
                            </Tooltip>
                        </div>
                        )}
                </Space>
            ),
        },

    ];

    const handleDetail = (record: any) => {
        const bodyRequest = {
            id : record.book.id
        }
        dispatch(getFileBookRequests(bodyRequest))
        navigate(`/detail-book/${record?.book.id}`)
    }

    const onChangeInput = (event: any) => {
        setTextSearch(event.target.value);
    }

    const [bookRate, setBookRate] = useState<any>()
    const handleRate = (record : any) => {
        const data = {
            id : record.book.id,
            title : record.book.title,
            image : record.book.image,
            currentSearchValue : currentSearchValue,
        }
        setBookRate(data)
        setIsOpenModalRate(true)
    }


    const onSearch = () => {
        const body: any = {
            size: 10,
            offset: 0,
            search: textSearch,
        };
        const finalBody = Utils.getRidOfUnusedProperties(body)
        setCurrentSearchValue(finalBody);

    }

    const onChangePagination = (event: any) => {
        currentSearchValue.offset = (event - 1) * 10;
        setCurrentSearchValue(currentSearchValue);
        dispatch(getPuchasedBooksRequest(currentSearchValue))
        document.body.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    return (
        <motion.div className='sketch-main'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{width : '100%'}}
            >
            <div className='table-area' >
                <CTable
                    tableMainTitle='Danh sách sách đã mua'
                    allowDateRangeSearch={true}
                    allowTextSearch={true}
                    onChangeInput={onChangeInput}
                    onSearch={onSearch}
                    data={listPuchasedBook}
                    titleOfColumnList={columns}
                    totalRecord={totalPuchasedBooks}
                    onChangePagination={onChangePagination}
                    textSearch='Tên sách'
                />
                <CRateModal
                    isOpenModal={isOpenModalRate}
                    toggleRateModal={toggleRateModal}
                    data={bookRate}
                />
            </div>
        </motion.div>
    )
}

export default PurchasedBooks