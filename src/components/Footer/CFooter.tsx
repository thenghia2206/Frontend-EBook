import { motion } from "framer-motion";
import "./styles.footer.scss";
import Image1 from "../../images/footer/image1.png"
import Image2 from "../../images/footer/image2.png"
import Logo from "../../images/header/logo.png";
import { FacebookOutlined, InstagramOutlined, SkypeOutlined, TwitterOutlined, WhatsAppOutlined, YoutubeOutlined } from "@ant-design/icons";
const hoverVariants = {
    hover: {
        scale: 1.1,
        opacity: 0.8,
        fontWeight: "bold",
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 2
        },

    },
    tap: {
        scale: 0.8
    },
};
// Phần footer của trang web
export default function CFooter() {
    return (
        <footer className="footer">
            <div className="row-1">
                <div className="column-1">
                    <img src={Image1} alt="" width={150} />
                    <img src={Image2} alt="" width={150} />
                    <div>
                        <FacebookOutlined />
                        <InstagramOutlined />
                        <YoutubeOutlined />
                        <TwitterOutlined />
                        <WhatsAppOutlined />
                        <SkypeOutlined />
                    </div>
                </div>
                <div className="column-2">
                    <div className="title-content">Về Chúng tôi</div>
                    <div className="content">Tư vấn mua hàng</div>
                    <div className="content">Giới thiệu về E-Book</div>
                    <div className="content">Điều kiện & Điều khoản</div>
                    <div className="content">Kinh doanh online từ E-Book</div>
                    <div className="content">Quy chế hoạt động</div>
                </div>
                <div className="column-3">
                    <div className="title-content">Chăm sóc khách hàng</div>
                    <div className="content">Quy trình thanh toán</div>
                    <div className="content">Chính sách bảo mật</div>
                    <div className="content">Giải quyết tranh chấp</div>
                </div>
                <div className="column-4">
                    <div className="title-content">Mua hàng trên E-Book</div>
                    <div className="content">Tất cả danh mục</div>
                    <div className="content">Yêu cầu báo giá</div>
                    <div className="content">Hỗ trợ người mua</div>
                    <div className="content">Thanh toán an toàn</div>
                    <div className="content">Đảm bảo giao dịch</div>
                </div>
            </div>
        </footer>
    );
}