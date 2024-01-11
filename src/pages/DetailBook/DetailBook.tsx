import { ArrowLeftOutlined, ArrowRightOutlined, MenuOutlined, ShoppingCartOutlined, SolutionOutlined, TeamOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Col, Rate, Row, notification } from "antd";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useNavigate, useParams } from "react-router";
import "./styles.detailBook.scss";
import IconDetail1 from "../../images/detail/icon-detail-1.png";
import Avatar from '../../images/detail/avatar.png'
import { useDispatchRoot, useSelectorRoot } from "../../redux/store";
import Utils from "../../common/utils";
import { addBookToCartRequest, advancedSearchingRequest, getCodeBookRequests, getDetailBookRequests, getFileBookRequests, getProfileRequest, getRatesRequest, getRecommendByDetailBookRequest, resetCurrentSearchValueRequest } from "../../redux/controller";
import { IAuthor, IBook, ICategory, IImage, IPublisher } from "../../common/book.interface";
import { API_URL } from "../../enum/api.enum";
import { Link } from "react-router-dom";
import CComment from "../../components/Comment/CComment";
import CPagination from "../../components/Pagination/CPagination";
import { QUERY_PARAM, QUERY_PARAM_FILTER } from "../../constants/get-api.constants";
import CBookCard from "../../components/BookCard/CBookCard";

const DetailBook = () => {
    const navigate = useNavigate();
    const {
        detailBook, listRate , totalRate1, totalRate2, totalRate3, totalRate4, totalRate5,totalRate,fileBook, listBookRecommendByDetailBook,codeBook,
    } = useSelectorRoot((state) => state.book); 
    const { tokenLogin, accesstokenExpỉred } = useSelectorRoot((state) => state.login);

    const dispatch = useDispatchRoot();
    const { bookId } = useParams(); // Lấy ra id của book từ url

    const [spanCol, setSpanCol] = useState<number>(6);
    const [numberOfCardShow, setNumberOfCardShow] = useState<number>(4);
    const [numberOfCardNext, setNumberOfCardNext] = useState<number>(4);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [info, setInfo] = useState<IBook>();
    const [images, setImages] = useState<IImage[]>([]);
    const [author,setAuthor] = useState<IAuthor[]>([])
    const [publisher,setPublisher] = useState<IPublisher>()
    const [categories,setCategories] = useState<ICategory[]>([])
    const [rate , setRate] = useState<number>()
 
    const [isShowAddToCart, setIsShowAddToCart] = useState<boolean>(true);
    const [isShowDownload, setIsShowDownload] = useState<boolean>(false);
    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);

    const [currentSearchValue, setCurrentSearchValue] =
            useState<any>({
            size: QUERY_PARAM.size,
            offset: 0,
            bookId : bookId,
    });
    const [currentPage, setCurrentPage] = useState(1);
    const onChangePagination = (event: any) => {
        currentSearchValue.offset = (event - 1) * QUERY_PARAM.size;
        setCurrentSearchValue(currentSearchValue);
        const number = Number(currentSearchValue.offset / QUERY_PARAM.size) + 1
        setCurrentPage(number)
        dispatch(getRatesRequest(currentSearchValue))
      };

    useEffect(() => {
        document.body.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, [navigate]);

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener("resize", handleWindowResize);
        if (window.innerWidth > 900) {
            setSpanCol(6);
            setNumberOfCardShow(4);
            setNumberOfCardNext(4);
        }
        if (window.innerWidth <= 900) {
            setSpanCol(8);
            setNumberOfCardShow(3);
            setNumberOfCardNext(5);
        }
        if (window.innerWidth <= 600) {
            setSpanCol(12);
            setNumberOfCardShow(2);
            setNumberOfCardNext(6);
        }
        if (window.innerWidth <= 400) {
            setSpanCol(24);
            setNumberOfCardShow(1);
            setNumberOfCardNext(7);
        }
        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    });

    const [activeButton, setActiveButton] = useState<number>(1);

    const handleButtonClick = (buttonNumber: number,star : number) => {
        setActiveButton(buttonNumber);
        if(star >= 1 && star <=5){
            const bodyRequestRate = {
                size : 5,
                offset : 0,
                bookId : bookId,
                type : star,
            }
            dispatch(getRatesRequest(bodyRequestRate))
        }else{
            const bodyRequestRate = {
                size : 5,
                offset : 0,
                bookId : bookId,
            }
            dispatch(getRatesRequest(bodyRequestRate))  
        }
    };

    const [currentIndexRecommend, setCurrentIndexRecommend] = useState(0);

    const handleNextCardRecommend = () => {
        setCurrentIndexRecommend(currentIndexRecommend + 1);
    };
    const handlePrevCardRecommend = () => {
        setCurrentIndexRecommend(currentIndexRecommend - 1);
    };

    useEffect(() => {
        if (bookId) {
            const bodyRequest = {
                id : bookId
            }
            const bodyRequestRate = {
                size : 5,
                offset : 0,
                bookId : bookId,
            }
            dispatch(getDetailBookRequests(bodyRequest))
            dispatch(getRatesRequest(bodyRequestRate))
            dispatch(resetCurrentSearchValueRequest())
            dispatch(getRecommendByDetailBookRequest(bodyRequest))
        }
    }, [bookId]);



    useEffect(() => {
        if(detailBook){
            setRate(detailBook.rate)
            setImages(detailBook.image)
            setAuthor(detailBook.authors)
            setPublisher(detailBook.publisher)
            setCategories(detailBook.categories)
        }
    }, [detailBook]);

    useEffect(() => {
        if (fileBook) {
            setIsShowAddToCart(false)
            setIsShowDownload(true);
        }
        else {
            setIsShowAddToCart(true)
            setIsShowDownload(false);
        }
    }, [fileBook]);

    const handleNextCard = () => {
        setCurrentIndex(currentIndex + 1);
    };

    const handlePrevCard = () => {
        setCurrentIndex(currentIndex - 1);
    };

    const handleAddToCart = (bookId: string) => {
        if(accesstokenExpỉred === false){

            const req = {
                bookId : bookId,
                additionalProp1: {},
            };
            dispatch(addBookToCartRequest(req));
        }else{
            notification.open({
                message: "Bạn chưa đăng nhập",
                description: "Vui lòng đăng nhập để thêm sản phẩm vào giỏ!",

                onClick: () => {
                    console.log("Vui lòng đăng nhập để thêm sản phẩm vào giỏ!");
                },
                style: {
                    marginTop: 50,
                    paddingTop: 40,
                },
            });
        }
    };

    const handleBuyNow = (bookId: string) => {
        if(accesstokenExpỉred === false){

            const req = {
                bookId : bookId,
                additionalProp1: {},
            };
            dispatch(addBookToCartRequest(req));
            navigate("/cart")
        }else{
            notification.open({
                message: "Bạn chưa đăng nhập",
                description: "Vui lòng đăng nhập để thêm sản phẩm vào giỏ!",

                onClick: () => {
                    console.log("Vui lòng đăng nhập để thêm sản phẩm vào giỏ!");
                },
                style: {
                    marginTop: 50,
                    paddingTop: 40,
                },
            });
        }
    };

    const handleClickAuthor = (authorId : string) => {
        const bodyrequest: any = {
            size : QUERY_PARAM_FILTER.size,
            offset : 0,
            search: "",
            categoryId: "",
            authorId: authorId,
            publisherId: "",
            sortBy : "",
            sortOrder : ""
        };
        dispatch(advancedSearchingRequest(bodyrequest))
        navigate("/searching");
    }
    const handleClickCategory = (categoryId : string) => {
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
    const handleClickPublisher = (publisherId : string) => {
        const bodyrequest: any = {
            size : QUERY_PARAM_FILTER.size,
            offset : 0,
            search: "",
            categoryId: "",
            authorId: "",
            publisherId: publisherId,
            sortBy : "",
            sortOrder : ""
        };
        dispatch(advancedSearchingRequest(bodyrequest))
        navigate("/searching");
    }

    const handleClickCard = (bookId: string) => {
        const bodyRequest = {
            id : bookId
        }
        if(!accesstokenExpỉred){
            dispatch(getFileBookRequests(bodyRequest))
        }
        navigate(`/detail-book/${bookId}`);
    };

    const handleClickReadBook = () => {
        const bodyRequest = {
            id : bookId
        }
        dispatch(getProfileRequest());
        const token = Utils.getValueLocalStorage("token")
        if(token && bookId ){
            window.open(`${API_URL.HOST}/${API_URL.FILE_BOOK}/getCodePDF/by-params?bookId=${bookId}&token=${token}`)
        }
    };


    return (
        <div className="main-page-detail">
            <div className="main-detail">
                <div className="breadcrumb">
                    <Breadcrumb>
                        <Breadcrumb.Item onClick={() => navigate("/")}>
                            Trang chủ
                        </Breadcrumb.Item>

                        <Breadcrumb.Item className="current-link">
                            Chi tiết sách
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="detail-sketch">
                    <div className="image-carousel">
                        <Carousel>
                            {images &&
                                images.slice(0, 4).map((image, index) => (
                                    <div key={index}>
                                        <img alt="" src={`${API_URL.HOST}/${API_URL.IMAGE}/${image.image}`} style={{width : "60%"}}/>
                                    </div>
                                ))}
                        </Carousel>
                    </div>
                    <div className="content">
                        { detailBook && author && categories &&
                            ( 
                                <>
                                    <div className="title">{detailBook.title}</div>
                                    <div className="price">
                                        {Utils.formatMoney(detailBook.price)} VNĐ
                                    </div>
                                    <div className="rate-and-sold" style={{ display: 'flex', alignItems: 'center' }}>
                                        <div className="rate" style={{ marginRight: '15px' }}>
                                            { detailBook.rate && detailBook ? (
                                                <Rate
                                                    value={detailBook.rate}
                                                    disabled
                                                    allowHalf
                                                    count={5}
                                                />
                                            ) : (
                                                <Rate
                                                    value={0}
                                                    disabled
                                                    count={5}
                                                />
                                            )}
                                        </div>
                                        <div></div>
                                        <div className="separator" style={{ marginRight: '15px' }}>|</div>
                                        <div className="sold" >Đã bán : {detailBook.sold}</div>
                                    </div>
                                    <div className="property">
                                        <div className="content">
                                            <img src={IconDetail1} alt="" />
                                            <div className="text">
                                                Ngày đăng:{" "}
                                                {new Date(
                                                    detailBook.createdAt
                                                ).toLocaleDateString("en-GB")}
                                            </div>
                                        </div>
                                        <div className="content">
                                            <TeamOutlined />
                                            <div className="text">
                                                <span>Tác giả :</span>
                                                {author.map(( x, index) =>
                                                    (
                                                    <React.Fragment key={index}>
                                                        {index > 0 && ", "}
                                                        <Link to={`/searching`} onClick={() => handleClickAuthor(x.id)} style={{color : "black", fontWeight : "bold"}}>
                                                            {x.fullName}
                                                        </Link>
                                                    </React.Fragment>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                        <div className="content">
                                            <MenuOutlined />
                                            <div className="text">
                                                Thể loại :
                                                {categories.map((category, index) =>
                                                      (
                                                        <React.Fragment key={index}>
                                                            {index > 0 && ", "}
                                                            <Link to={`/searching`} onClick={() => handleClickCategory(category.id)} style={{color : "black", fontWeight : "bold"}}>
                                                                {category.name}
                                                            </Link>
                                                        </React.Fragment>
                                                        )
                                                )}
                                            </div>
                                        </div>
                                        <div className="content">
                                            <SolutionOutlined />
                                            <div className="text">
                                                Nhà xuất bản :
                                                <Link to={`/searching`} onClick={() => handleClickPublisher(detailBook.publisher.id)} style={{color : "black", fontWeight : "bold"}}>
                                                    {detailBook.publisher.name}
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="description">
                                        <div className="des-title">Mô tả</div>
                                        <div className="des-text">
                                            {detailBook.description}
                                        </div>
                                    </div>
                                    <div className="action">
                                        {isShowAddToCart &&
                                            (
                                                <div className="button-add-and-buy" style={{display : "flex",alignItems : "center"}} > 
                                                    <motion.div
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.95 }}
                                                        >
                                                            <Button
                                                                className="add-to-card"
                                                                onClick={() =>
                                                                    handleAddToCart(detailBook.id)
                                                                }
                                                                style={{color : "black",background : "white"}}
                                                            >
                                                                <ShoppingCartOutlined />
                                                                Thêm vào giỏ hàng
                                                            </Button> 
                                                    </motion.div>
                                                    <motion.div
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.95 }}
                                                        >
                                                            <Button
                                                                className="add-to-card"
                                                                onClick={() =>
                                                                    handleBuyNow(detailBook.id)
                                                                }
                                                                style={{marginLeft : "15px",background : "red", color : "white", borderColor : "red"}}
                                                            >
                                                                Mua ngay
                                                            </Button> 
                                                    </motion.div>
                                                </div>
                                            )
                                        }
                                        {isShowDownload &&
                                            <motion.div
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <Button className="download-now"
                                                onClick={handleClickReadBook}>
                                                    {fileBook ? (
                                                        <a>
                                                            Đọc sách
                                                        </a>
                                                    ) : (
                                                        <a>Đọc sách</a>
                                                    )}
                                                </Button>
                                            </motion.div>
                                        }
                                    </div>
                                </>
                            )}
                    </div>
                </div>
            </div>
            <div className="recommend">
            <div className="title">
                    <div>Sản phẩm cùng mua</div>
            </div>
            <div className="list-book-recommend">
            <Col>
                    <Button
                            icon={<ArrowLeftOutlined />}
                            className="btn-icon"
                            onClick={handlePrevCardRecommend}
                            disabled={currentIndexRecommend === 0 && true}
                        />
                    </Col>
                    <Row gutter={[16, 16]}>
                        {listBookRecommendByDetailBook
                            .slice(
                                currentIndexRecommend,
                                currentIndexRecommend + numberOfCardShow
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
                            onClick={handleNextCardRecommend}
                            disabled={
                                currentIndexRecommend >= listBookRecommendByDetailBook.length - numberOfCardShow && true
                            }
                        />
            </Col>
            </div>
            </div>
            <div className="comment">
                <div className="title">ĐÁNH GIÁ SÁCH</div>
                <div className="rating-overview">
                    <div className='total-rate'>
                        <div className="rate">
                            <span className="rate-score">{detailBook?.rate} </span>
                            <span className="rate-score-out-of">trên 5</span>
                        </div>
                        <Rate
                            allowHalf
                            value={detailBook?.rate}
                            count={5}
                            disabled
                        />
                    </div>
                    <div className='btn-group-and-total-rate'>
                        <Button.Group>
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}>
                                <Button
                                    type={activeButton === 1 ? 'primary' : 'default'}
                                    onClick={() => handleButtonClick(1,0)}
                                >
                                    Tất cả ({detailBook?.totalReview})
                                </Button>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}>
                                <Button
                                    type={activeButton === 2 ? 'primary' : 'default'}
                                    onClick={() => handleButtonClick(2,5)}
                                >
                                    5 sao ({totalRate5})
                                </Button>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}>
                                <Button
                                    type={activeButton === 3 ? 'primary' : 'default'}
                                    onClick={() => handleButtonClick(3,4)}
                                >
                                    4 sao ({totalRate4})
                                </Button>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}>
                                <Button
                                    type={activeButton === 4 ? 'primary' : 'default'}
                                    onClick={() => handleButtonClick(4,3)}
                                >
                                    3 sao ({totalRate3})
                                </Button>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}>
                                <Button
                                    type={activeButton === 5 ? 'primary' : 'default'}
                                    onClick={() => handleButtonClick(5,2)}
                                >
                                    2 sao ({totalRate2})
                                </Button>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}>
                                <Button
                                    type={activeButton === 6 ? 'primary' : 'default'}
                                    onClick={() => handleButtonClick(6,1)}
                                >
                                    1 sao ({totalRate1})
                                </Button>
                            </motion.div>
                        </Button.Group>
                    </div>
                </div>
                <div className='list-rate' >
                {
                    (listRate && listRate.length > 0)
                        ?
                        listRate.map((item : any) => (
                            <div className='rate'>
                                <div className='avatar'>
                                    <img src={Avatar} />
                                </div>
                                <div className='content-rate'>
                                    <div className='name-rate'>{item.nameUser}</div>
                                    <div>
                                        <Rate
                                            allowHalf
                                            value={item.star}
                                            count={5}
                                            disabled
                                        />
                                    </div>
                                    <div className='time-rate'>{new Date(item.createdAt).toLocaleDateString('en-GB')}</div>
                                    <div className='rate-content'>{item.description}</div>
                                </div>
                            </div>
                        ))
                        :
                        <div className='rate'>
                            Chưa có đánh giá
                        </div>
                }
                </div>
                <div className="pagination">
                    <CPagination
                        pageSize={5}
                        total={totalRate}
                        onChange={onChangePagination}
                        currentPage={currentPage}
                    />
                </div>
            </div>
        </div>


    );
};

export default DetailBook;
