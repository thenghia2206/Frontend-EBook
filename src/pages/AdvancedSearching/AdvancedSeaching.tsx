import { Button, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CArrangeBar from "../../components/ArrangeBar/CArrangeBar";
import CFilter from "../../components/Filter/CFilter";
import CPagination from "../../components/Pagination/CPagination";
import { useDispatchRoot, useSelectorRoot } from "../../redux/store";
import "./styles.advancedsearching.scss";
import { IFilterBook } from "../../common/book.interface";
import CBookCard from "../../components/BookCard/CBookCard";
import { Variants, motion } from "framer-motion";
import { advancedSearchingRequest, getFileBookRequests } from "../../redux/controller";
import { QUERY_PARAM_FILTER } from "../../constants/get-api.constants";

const AdvancedSeaching = () => {
    const navigate = useNavigate();
    const dispatch = useDispatchRoot();
    const [spanCol, setSpanCol] = useState<number>(6);
    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);
    const [isShowButtonFilter, setIsShowButtonFilter] =
        useState<boolean>(false);

    const {
        listFilterBook, totalFilterBook, currentSearchValue
    } = useSelectorRoot((state) => state.book);
    const {
        tokenLogin,accesstokenExpỉred
    } = useSelectorRoot((state) => state.login);

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState<number>(12);
    const [newfilteredBooks, setNewFilteredBooks] = useState<IFilterBook[]>();

    useEffect(() => {
        document.body.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, [navigate]);

    const [numberOfCardShow, setNumberOfCardShow] = useState<number>(4);

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener("resize", handleWindowResize);
        if (window.innerWidth > 900) {
            setSpanCol(6);
            setIsShowButtonFilter(false);
        }
        if (window.innerWidth <= 900) {
            setSpanCol(8);
            setIsShowButtonFilter(true);
        }
        if (window.innerWidth <= 600) {
            setSpanCol(12);
        }
        if (window.innerWidth <= 400) {
            setSpanCol(24);
        }
        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, [window.innerWidth]);

    const handleClickCard = (id: string) => {
        const bodyRequest = {
            id : id
        }
        if(!accesstokenExpỉred){
            dispatch(getFileBookRequests(bodyRequest))
        }
        navigate(`/detail-book/${id}`);
    };

    const onChangePage = (event: any) => {
        const offset = (event - 1) * QUERY_PARAM_FILTER.size;
        const number = Number(currentSearchValue.offset / QUERY_PARAM_FILTER.size) + 1
        setCurrentPage(number)
        const bodyrequest: any = {
            size : QUERY_PARAM_FILTER.size,
            offset : offset,
            search: currentSearchValue.search,
            categoryId: currentSearchValue.categoryId,
            authorId: currentSearchValue.authorId,
            publisherId: currentSearchValue.publisherId,
            sortBy : currentSearchValue.sortBy,
            sortOrder : currentSearchValue.sortOrder
        };
        dispatch(advancedSearchingRequest(bodyrequest));
        document.body.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    return (
        <div className="main" style={{marginLeft : "-3em"}}>
            <div className="options-category">
                <CFilter></CFilter>
            </div>
            <div className="filter">
            <motion.div
                    className="main-home"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}
                    style={{background : "#f0f2f5"}}
                    >
                        <div className="recommend" style={{width : "100%" , marginTop : "-4em" }}>
                            <div className="lst-tool" style={{marginTop : "1em"}}>
                            <ul style={{ listStyleType: 'none', padding: 0, display: 'grid', gridTemplateColumns : "repeat(4, 1fr)", gridGap : "8px" }}>
                                {listFilterBook.map((card) => (
                                    <li
                                    onClick={() => {
                                        handleClickCard(card.id);
                                    }}
                                    key={card.id}
                                    style={{ flex: '0 1 calc(21% - 16px)', marginBottom: '16px', marginRight: '5px' }}
                                    >
                                    <CBookCard 
                                        image={card.image}
                                        title={card.title}
                                        view={card.view}
                                        price={card.price}
                                        sold={card.sold}
                                    />
                                    </li>
                                ))}
                            </ul>
                            <Row style={{display : "flex",justifyContent : "center" , marginTop : "2em", borderRadius : "2em"}}>
                                <div className="pagination">
                                    <CPagination
                                        pageSize={QUERY_PARAM_FILTER.size}
                                        total={totalFilterBook}
                                        onChange={onChangePage}
                                        currentPage={currentPage}
                                    />
                                </div>
                            </Row>
                            <br></br>
                            </div>
                        </div>
                    </motion.div>
            </div>
        </div>

    );
};

export default AdvancedSeaching;
