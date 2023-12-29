import { useEffect, useState } from "react";
import "./App.css";
import "./App.scss";
import { Layout, Spin } from "antd";
import { Route, Router, Routes, useLocation } from "react-router-dom";
import { useDispatchRoot, useSelectorRoot } from "./redux/store";
import { getUserInfoRequest } from "./redux/controller";
import Home from "./pages/home/Home";
import { CHeader } from "./components/Header/CHeader";
import CFooter from "./components/Footer/CFooter";
import { AnimatePresence } from "framer-motion";
import AnimationRouter from "./components/AnimationRouter";
import Cart from "./pages/Cart/Cart";

function App() {
    const dispatch = useDispatchRoot();
    const { tokenLogin, accesstokenExpỉred } = useSelectorRoot((state) => state.login);

    const { loading } = useSelectorRoot((state) => state.book); 
    const location = useLocation();
    useEffect(() => {
        let checkLogin = localStorage.getItem("token")
            ? localStorage.getItem("token")
            : "";
        if (checkLogin) {
            checkLogin = checkLogin.slice(1);
            checkLogin = checkLogin.slice(0, checkLogin.length - 1);
            dispatch(getUserInfoRequest(checkLogin));
        }
    }, []);
    const isForgotPassWordPage = location.pathname === '/forgot-password';
    const isRessetPassWordPage = location.pathname === '/forgot-password/newpass';
    return (
        <Spin spinning={loading} delay={500} tip="Đang lấy dữ liệu..." size="large">
            <Layout>
                { !isForgotPassWordPage && !isRessetPassWordPage && <CHeader />}
                    <AnimationRouter />
                <CFooter />
            </Layout>
        </Spin>
    );
}

export default App;
