import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import { AnimatePresence } from "framer-motion";
import ActiveAccount from "../pages/ActiveAccount/ActiveAccount";
import ChangePassword from "./ChangePassword/ChangePassword";
import DetailBook from "../pages/DetailBook/DetailBook";
import PrivateUserRoutes from "./PrivateUserRoutes";
import Cart from "../pages/Cart/Cart";
import PurchaseSuccessfully from "../pages/purchased-successfully/purchased-successfully";
import Profile from "../pages/Profile/Profile";
import ProfileResume from "../pages/Profile/profile-resume/ProfileResume";
import ResetPassword from "./resetPassword/resetPassword";
import ResetPasswordSuccess from "./resetPassword/resetPasswordSuccess";
import PurchasedBooks from "../pages/purchased-books/purchasedBooks";
import AdvancedSeaching from "../pages/AdvancedSearching/AdvancedSeaching";
import BestSeller from "../pages/BestSeller/BestSeller";
import MostView from "../pages/MostView/MostView";

// Dùng để set animation cho các router với nhau
const AnimationRouter = () => {
    const location = useLocation();
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route element={<PrivateUserRoutes />}>
                    <Route path="/cart" element={<Cart/>}></Route>
                    <Route path="/user" element={<Profile/>}>
                        <Route path="/user" element={<ProfileResume />}></Route>
                        <Route path="/user/change-password" element={<ChangePassword />}></Route>
                        <Route path="/user/purchased-book" element={<PurchasedBooks />}></Route>
                    </Route>
                </Route>
                {/* Public route */}
                <Route path="/" element={<Home />}></Route>
                <Route path="*" element={<ActiveAccount />} />
                <Route path="/searching" element={<AdvancedSeaching />}></Route>
                <Route path="/best-seller" element={<BestSeller />}></Route>
                <Route path="/most-view" element={<MostView />}></Route>
                <Route
                    path="/detail-book/:bookId"
                    element={<DetailBook />}
                ></Route>

                <Route path="/purchased-successfully" element={<PurchaseSuccessfully />}></Route>
                <Route element={<ResetPassword />} path="/forgot-password"/>
                <Route element={<ResetPasswordSuccess />} path="/forgot-password/newpass"/>
            </Routes>
        </AnimatePresence>
    );
};

export default AnimationRouter;