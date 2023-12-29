import {
    BellOutlined,
    DownOutlined,
    MessageOutlined,
    SearchOutlined,
    ShoppingCartOutlined,
} from "@ant-design/icons";
import {
    Avatar,
    Button,
    Drawer,
    Dropdown,
    Input,
    Menu,
    MenuProps,
    Badge,
    notification,
} from "antd";
import { useEffect, useState } from "react";
import "./styles.header.scss";
import { Link, useNavigate } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import Utils from "../../common/utils";
import UserIcon from "../../images/user_icon.png";
import SearchIcon from "../../images/Search_Icon.png";
import { useDispatchRoot, useSelectorRoot } from "../../redux/store";
import Logo from "../../images/header/logo.png";
import Login from "../../pages/login/Login";
import Register from "../../pages/login/Register";
import HeaderIcon from "../../images/header/header-icon.png";
import { advancedSearchingRequest, getCartQuantityRequest, getCartRequest } from "../../redux/controller";
import ForgotPassword from "../../pages/login/ForgotPassword";
import { ICurrentSearchValue } from "../../common/book.interface";
import { QUERY_PARAM_FILTER } from "../../constants/get-api.constants";

// Phần header của trang web
export const CHeader = () => {
    const [visible, setVisible] = useState(false); // Biến thể hiện nút thu gọn menu có đang mở hay không
    const [current, setCurrent] = useState<string>("1"); // Biến thể hiện giá trị cho nút hiện tại
    const { tokenLogin, accesstokenExpỉred , userName,} = useSelectorRoot((state) => state.login);
    const {cartQuantity, currentSearchValue} = useSelectorRoot((state) => state.book )

    const [userEmail, setUserEmail] = useState<string>("")

    const navigate = useNavigate();
    const [isOpenLoginModal, setIsOpenLoginModal] = useState<boolean>(false); // Biến kiểm tra đang mở modal login hay chưa
    const [isOpenRegisterModal, setIsOpenRegisterModal] =
        useState<boolean>(false); // Biến kiểm tra đang mở modal registration hay chưa
    const [isOpenForgotPasswordModal, setIsOpenForgotPasswordModal] =
    useState<boolean>(false);
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const dispatch = useDispatchRoot();

    useEffect(() => {
        if (window.location.pathname === "/test") setCurrent("2");
        if (window.location.pathname === "/news") setCurrent("3");
        if (window.location.pathname === "/about_us") setCurrent("4");
        if (window.location.pathname === "/") setCurrent("1");
    }, []);


    useEffect(() => {
        if (accesstokenExpỉred === false) {
            dispatch(getCartQuantityRequest());
        }
    }, [accesstokenExpỉred])

    // Kiểm tra xem đường dẫn đang là gì để set thuộc tính đã click cho header

    // Hiển thị ra nút thu gọn menu
    const showDrawer = () => {
        setVisible(true);
    };

    // Đóng nút thu gọn menu
    const onClose = () => {
        setVisible(false);
    };

    // Gán giá trị cho biến nút hiện tại
    const handleClick = (e: { key: any }) => {
        setCurrent(e.key);
    };
    const onClickLogout = () => {
        Utils.removeItemLocalStorage("token");
        Utils.removeItemLocalStorage("userMail");
        Utils.removeItemLocalStorage("userName");
        Utils.removeItemLocalStorage("userPhone");
        Utils.removeItemLocalStorage("refresh_token");
        setIsLogin(!isLogin);
        navigate("/")
        window.location.reload();
    };
    const items: MenuProps["items"] = [
        {
            key: '1',
            label: (
                <div onClick={() => navigate("/user")} >
                    Thông tin
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <div onClick={() => navigate("user/purchased-book")}>
                    Đơn mua
                </div>
            ),
        },
        {
            key: '3',
            label: (
                <div onClick={() => navigate("user/change-password")} >
                    Đổi mật khẩu
                </div>
            ),
        },
        {
            key: "4",
            label: (
                <Link to="/" onClick={onClickLogout}>
                    Đăng xuất
                </Link>
            ),
        },
    ];

    const handleClickLogin = () => {
        // navigate('/login');
    };

    // Hàm chuyển đổi trạng thái đóng mở modal login
    const toggleLoginModal = () => {
        setIsOpenLoginModal(!isOpenLoginModal);
        setIsOpenRegisterModal(false);
        setIsOpenForgotPasswordModal(false)
    };
    // Hàm chuyển đổi trạng thái đóng mở modal registration
    const toggleRegisterModal = () => {
        setIsOpenLoginModal(false);
        setIsOpenRegisterModal(!isOpenRegisterModal);
    };

    const toggleForgotPasswordModal = () => {
        setIsOpenLoginModal(false);
        setIsOpenForgotPasswordModal(!isOpenForgotPasswordModal);
    };

    const handleOpenForgotPassword = (value : any) =>{
        setIsOpenForgotPasswordModal(value)
        setIsOpenLoginModal(!value)
    }

    const handleSearching = (event: any) => {
        const bodyrequest: ICurrentSearchValue = {
            size : QUERY_PARAM_FILTER.size,
            offset : 0,
            search: event.target.value,
            categoryId: currentSearchValue.categoryId,
            authorId: currentSearchValue.authorId,
            publisherId: currentSearchValue.publisherId,
            sortBy : currentSearchValue.sortBy,
            sortOrder : currentSearchValue.sortOrder
        };
        // if (window.location.pathname === '/') { 

        //     dispatch(resetCurrentSearchValueRequest(bodyrequest))
        // } else {
        //     dispatch(advancedSearchingRequest(bodyrequest));
        // }
        dispatch(advancedSearchingRequest(bodyrequest));
        navigate("/searching");
        onClose();
    };
    const checkIsLogin = (val: boolean) => {
        setIsLogin(val);
    };
    const handleClickCart = () => {
        navigate("/cart");
    };
    const handleClickLogo = () => {
        document.body.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        navigate("/")
    };
    
    return (
        <div className="main-header">
            <div className="header-left">
                <div className="header-logo">
                    <Link to={"/"} className="logo-text">
                        <img src={Logo} style={{width : "50px",height : "50px"}} onClick={handleClickLogo} />
                    </Link>
                </div>

                <div className={`header-content-input ${isLogin && "login"}`}>
                    <Input
                        className="search-input"
                        placeholder="Tìm kiếm sách"
                        onPressEnter={handleSearching}
                    />
                    <img src={SearchIcon} className="icon-search"></img>
                </div>
            </div>
            <div className="header-right">
                <div className="user-infor">
                    {accesstokenExpỉred === true ? (
                        <>
                            <motion.div
                                className="header-button login"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button
                                    onClick={() => setIsOpenLoginModal(true)}>
                                    Đăng nhập
                                </Button>
                            </motion.div>
                            <motion.div
                                className="header-button login"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button
                                    onClick={() => setIsOpenRegisterModal(true)}
                                    style={{background: "white", color : "black"}}
                                >
                                    Đăng ký
                                </Button>
                            </motion.div>
                        </>
                    ) : (
                        <>
                            <div className="icon-group">
                                <Badge
                                    count={cartQuantity}
                                    size="default"
                                >
                                    <ShoppingCartOutlined
                                        onClick={handleClickCart}
                                    />
                                </Badge>
                            </div>
                            <div className="user-info-content">
                                <Avatar className="avatar" src={UserIcon} />
                                <div className="name-and-balance">
                                    <div className="name">{userName}</div>
                                </div>
                                <Dropdown
                                    className="drop-down"
                                    menu={{ items }}
                                    placement="bottomLeft"
                                    arrow
                                >
                                    <DownOutlined />
                                </Dropdown>
                            </div>
                        </>
                    )}
                    <Login
                        checkIsLogin={checkIsLogin}
                        isOpenModal={isOpenLoginModal}
                        toggleLoginModal={toggleLoginModal}
                        toggleRegisterModal={toggleRegisterModal}
                        toggleForgotPasswordModal={handleOpenForgotPassword}
                    />
                    <Register
                        isOpenModal={isOpenRegisterModal}
                        toggleLoginModal={toggleLoginModal}
                        toggleRegisterModal={toggleRegisterModal}
                    />
                    <ForgotPassword 
                        isOpenModal={isOpenForgotPasswordModal}
                        toggleForgotPasswordModal={toggleForgotPasswordModal}
                        toggleLoginModal={toggleLoginModal}
                    />
                </div>
                <>
                    <Button
                        className={`menubtn + ${isLogin ? "login" : ""}`}
                        shape="circle"
                        icon={<MenuOutlined />}
                        onClick={showDrawer}
                    ></Button>
                    <Drawer
                        title={
                            <div className="header-logo">
                                <Link to={"/"} className="logo-text">
                                    E-Book
                                </Link>
                            </div>
                        }
                        placement="right"
                        onClose={onClose}
                        visible={visible}
                    >
                        <div
                            style={{ display: "flex", flexDirection: "column" }}
                        >
                            {!isLogin
                                && (

                                    <Button className="drawer-button notlogin"
                                        onClick={() => {
                                            setIsOpenLoginModal(true)
                                            onClose()
                                        }}>
                                        Đăng nhập
                                    </Button>
                                )}
                            {!isLogin
                                && (
                                    <Button className="drawer-button notlogin"
                                        onClick={() => {
                                            setIsOpenRegisterModal(true)
                                            onClose()
                                        }}
                                    >
                                        Đăng ký
                                    </Button>
                                )}
                            <div className={`header-content-input draw ${isLogin && "login"}`}>
                                <Input
                                    className="search-input"
                                    placeholder="Tìm kiếm sách"
                                    onPressEnter={handleSearching}
                                />
                                {/* <SearchOutlined className='icon-search' /> */}
                            </div>
                        </div>
                    </Drawer>
                </>
            </div>

            {/* } */}
        </div >
    );
};
