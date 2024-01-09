/* eslint-disable jsx-a11y/iframe-has-title */
import {
    ArrowLeftOutlined,
    ArrowRightOutlined,
    RightOutlined
} from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Adsvertisement1 from '../../images/homepage/1.png';
import CarouselImage2 from '../../images/homepage/2.png';
import CarouselImage3 from '../../images/homepage/3.png';
import Adsvertisement2 from '../../images/homepage/4.png';
import CarouselImage from '../../images/homepage/5.png';
import CategoryIcon from '../../images/homepage/category_icon.png';
import Declare1 from '../../images/homepage/banner.png';
import { useDispatchRoot, useSelectorRoot } from "../../redux/store";
import "./styles.home.scss";
import { Carousel } from 'antd';
import CBookCard from "../../components/BookCard/CBookCard";
import CDeclare from "../../components/Declare/CDeclare";
import { QUERY_PARAM_FILTER } from "../../constants/get-api.constants";
import { advancedSearchingRequest, getBookBestSellerRequest, getBookMostViewRequest, getCategoriesRequest, getFileBookRequests, getRecommendRequest, resetCurrentSearchValueRequest } from "../../redux/controller";

// Phần trang chủ của trang web
const Home = () => {

    const { listBookBestSeller, listBookMostView , listBookRecommend, detailBook, listCategory} = useSelectorRoot(
        (state) => state.book
    );

    const { tokenLogin, accesstokenExpỉred } = useSelectorRoot(
        (state) => state.login
    );

    useEffect(() => {
        const bodyRequest = {
            size : 10,
            offset : 0,
            type : "bestSeller",
        }
        const bodyRequestCategory = {
            size : 7,
            offset : 0,
        }
        dispatch(getBookBestSellerRequest(bodyRequest));
        dispatch(getCategoriesRequest(bodyRequestCategory))
        dispatch(resetCurrentSearchValueRequest())
    }, []);

    const dispatch = useDispatchRoot();

    const navigate = useNavigate();
    const [spanCol, setSpanCol] = useState<number>(6);
    const [numberOfCardShow, setNumberOfCardShow] = useState<number>(10);
    const [numberOfCardNext, setNumberOfCardNext] = useState<number>(10);

    const [currentIndexMostViewed, setCurrentIndexMostViewed] = useState(0);
    const [currentIndexBestSeller, setCurrentIndexBestSeller] = useState(0);

    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener("resize", handleWindowResize);
        if (window.innerWidth > 1000) {
            setSpanCol(4.1);
            setNumberOfCardShow(5);
        }
        if (window.innerWidth <= 1000) {
            setSpanCol(8);
            setNumberOfCardShow(3);
            setNumberOfCardNext(5);
        }
        if (window.innerWidth <= 800) {
            setSpanCol(12);
            setNumberOfCardShow(2);
            setNumberOfCardNext(6);
        }
        if (window.innerWidth <= 600) {
            setSpanCol(24);
            setNumberOfCardShow(100);
            setNumberOfCardNext(7);
        }
        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    });

    useEffect(() => {
        const bodyRequest = {
            size : 10,
            offset : 0,
            type : "mostView"
        }
        dispatch(getBookMostViewRequest(bodyRequest))
    }, []);

    useEffect(() => {
        const bodyRequest = {
            size : 20,
            offset : 0,
        }
        dispatch(getRecommendRequest(bodyRequest))
    }, []);

    // Handle pagination most view sketch
    const handleNextCardMostViewed = () => {
        setCurrentIndexMostViewed(currentIndexMostViewed + 1);
    };
    const handlePrevCardMostViewed = () => {
        setCurrentIndexMostViewed(currentIndexMostViewed - 1);
    };

    // Handle pagination latest sketch
    const handleNextCardBestSeller = () => {
        setCurrentIndexBestSeller(currentIndexBestSeller + 1);
    };
    const handlePrevCardBestSeller = () => {
        setCurrentIndexBestSeller(currentIndexBestSeller - 1);
    };

    const handleClickCard = (bookId: string) => {
        const bodyRequest = {
            id : bookId
        }
        if(!accesstokenExpỉred){
            dispatch(getFileBookRequests(bodyRequest))
        }
        navigate(`/detail-book/${bookId}`);
    };

    const seeMoreBestSeller = () => {
        const bodyRequest = {
            size: QUERY_PARAM_FILTER.size,
            offset: 0,
            type : "bestSeller"
        }
        dispatch(getBookBestSellerRequest(bodyRequest))
        navigate("/best-seller")
    }

    const seeMoreMostView = () => {
        const bodyRequest = {
            size: QUERY_PARAM_FILTER.size,
            offset: 0,
            type : "mostView"
        }
        dispatch(getBookMostViewRequest(bodyRequest))
        navigate("/most-view")
    }

    const seeMoreCategories = () => {
        const bodyrequest: any = {
            size : QUERY_PARAM_FILTER.size,
            offset : 0,
            search: "",
            categoryId: "",
            authorId: "",
            publisherId: "",
            sortBy : "",
            sortOrder : ""
        };
        dispatch(advancedSearchingRequest(bodyrequest))
        navigate("/searching");
    }

    const onClickCategory = (categoryId : any) => {
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
            className="main-home"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}
        >
            <div className='header-homepage'>
                <div className='category-list'>
                    <div className="category-title">
                        <img className="category-icon" src={CategoryIcon} />
                        <div className="text">TẤT CẢ THỂ LOẠI SÁCH</div>
                    </div>
                    <div className="divider">
                    </div>
                    {
                        listCategory.map(item => {
                            return (
                                <div className="category-item" onClick={() => onClickCategory(item.id)}>
                                    <div className="cate-content">
                                        <div className="cate-item-text">
                                            {item.name}
                                        </div>
                                    </div>
                                    <div className="arrow-icon">
                                        <RightOutlined />
                                    </div>
                                </div>
                            )
                        })
                    }
                                     
                    <Button 
                        style={{marginLeft : "3em",marginTop : "1em", color : "black", background : "white", borderColor : "black"}}
                        onClick={seeMoreCategories}
                    >
                        Xem thêm
                    </Button>
                    
                </div>
                <div className="category-content">
                    <div className="carousel">
                        <Carousel autoplay>
                            <div>
                                <img
                                    className="image"
                                    src={CarouselImage}
                                    alt="main notification"
                                />
                            </div>
                            <div>
                                <img
                                    className="image"
                                    src={CarouselImage2}
                                    alt="main notification"
                                />
                            </div>
                            <div>
                                <img
                                    className="image"
                                    src={CarouselImage3}
                                    alt="main notification"
                                />
                            </div>

                        </Carousel>
                    </div>
                    <div className="advertisement">
                        <img className="ad-image" src={Adsvertisement1} alt="" />
                        <img className="ad-image" src={Adsvertisement2} alt="" />
                    </div>
                </div>
            </div>

            <div className="tool-of-web">
                <div className="title">
                    <div>Sách bán chạy</div>
                    <div className="sub-title" onClick={seeMoreBestSeller}>{"Xem thêm"}</div>
                </div>
                <div className="lst-tool">
                    <Col>
                        <Button
                            icon={<ArrowLeftOutlined />}
                            className="btn-icon"
                            onClick={handlePrevCardBestSeller}
                            disabled={currentIndexBestSeller === 0 && true}
                        />
                    </Col>
                    <Row gutter={[16, 16]}>
                        {listBookBestSeller
                            .slice(
                                currentIndexBestSeller,
                                currentIndexBestSeller + numberOfCardShow
                            )
                            .map((card) => (
                                <Col
                                    onClick={() => {
                                        handleClickCard(card.id);
                                    }}
                                    span={spanCol}
                                    key={card.id}
                                >
                                    <CBookCard
                                        image={card.image}
                                        title={card.title}
                                        view={card.view}
                                        price={card.price}
                                        sold={card.sold}
                                    />
                                </Col>
                            ))}
                    </Row>
                    <Col>
                        <Button
                            icon={<ArrowRightOutlined />}
                            className="btn-icon"
                            onClick={handleNextCardBestSeller}
                            disabled={
                                currentIndexBestSeller >= listBookBestSeller.length - numberOfCardShow && true
                            }
                        />
                    </Col>
                </div>
            </div>

            <div className="tool-of-web">
                <div className="title">
                    <div>Sách phổ biến</div>
                    <div className="sub-title" onClick={seeMoreMostView}>{"Xem thêm"}</div>
                </div>
                <div className="lst-tool">
                    <Col>
                        <Button
                            icon={<ArrowLeftOutlined />}
                            className="btn-icon"
                            onClick={handlePrevCardMostViewed}
                            disabled={currentIndexMostViewed === 0 && true}
                        />
                    </Col>
                    <Row gutter={[16, 16]}>
                        {listBookMostView
                            .slice(
                                currentIndexMostViewed,
                                currentIndexMostViewed + numberOfCardShow
                            )
                            .map((card) => (
                                <Col
                                    onClick={() => {
                                        handleClickCard(card.id);
                                    }}
                                    span={spanCol}
                                    key={card.id}
                                >
                                    <CBookCard
                                        image={card.image}
                                        title={card.title}
                                        view={card.view}
                                        price={card.price}
                                        sold={card.sold}
                                    />
                                </Col>
                            ))}
                    </Row>
                    <Col>
                        <Button
                            icon={<ArrowRightOutlined />}
                            className="btn-icon"
                            onClick={handleNextCardMostViewed}
                            disabled={
                                currentIndexMostViewed >= listBookMostView.length - numberOfCardShow && true
                            }
                        />
                    </Col>
                </div>
            </div>
            <CDeclare
                content=""
                imageUrl={Declare1}

            />
            <div className="recommend" style={{width : "90%"}} >
                <div className="title">
                    <div>Gợi ý cho bạn</div>
                </div>
                <div className="lst-tool">
                <Row gutter={[16, 16]} style={{justifyContent : "center"}}>
                    {Array.from({ length: 4 }, (_, rowIndex) => (
                        <Row gutter={[14, 14]} key={rowIndex}>
                            {listBookRecommend
                                .slice(
                                    rowIndex * numberOfCardShow,
                                    rowIndex * numberOfCardShow + numberOfCardShow
                                )
                                .map((card) => (
                                    <Col
                                        onClick={() => {
                                            handleClickCard(card.id);
                                        }}
                                        span={spanCol}
                                        key={card.id}
                                    >
                                        <CBookCard
                                            image={card.image}
                                            title={card.title}
                                            view={card.view}
                                            price={card.price}
                                            sold={card.sold}
                                        />
                                    </Col>
                                ))}
                        </Row>
                    ))}
                </Row>
                <br></br>
                {/* <Row style={{display : "flex",justifyContent : "center" , marginTop : "1em", borderRadius : "2em", marginBottom : "1em"}}>
                    <Button style={{borderRadius : "0.5em"}}>
                        Xem Thêm
                    </Button>
                </Row> */}
                </div>
            </div>
            
        </motion.div>
    );
};

export default Home;
