import { useEffect, useState } from 'react'
import { AiOutlineLock, AiOutlineQuestionCircle, AiOutlineSetting } from 'react-icons/ai'
import { BsShop } from 'react-icons/bs'

import { Outlet, useNavigate } from 'react-router-dom'
import './style.profile.scss'
import { BiGridAlt } from 'react-icons/bi'
import { BookOutlined } from '@ant-design/icons'
import { resetCurrentSearchValueRequest } from '../../redux/controller'
import { useDispatchRoot } from '../../redux/store'
const Profile = () => {
    const [active, setActive] = useState<number>(0)
    const navigate = useNavigate();
    const dispatch = useDispatchRoot();
    useEffect(() => {
        if (window.location.pathname === "/user") setActive(1);
        if (window.location.pathname === "/user/purchased-book") setActive(2);
        if (window.location.pathname === "/user/change-password") setActive(3);
        dispatch(resetCurrentSearchValueRequest())
    }, []);

    useEffect(() => {
        document.body.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, [navigate]);

    return (
        <div className="main-profile">
            <div className='profile-navbar'>
                <div className={'profile-navbar-item' + (active === 1 ? ' active' : '')} onClick={() => {
                    setActive(1)
                    navigate('/user')
                }
                }>
                    <BiGridAlt className='profile-navbar-item-icon' />
                    <span className='profile-navbar-item-text'>Thông tin cá nhân</span>
                </div>
                <div className={'profile-navbar-item' + (active === 2 ? ' active' : '')} onClick={() => {
                    setActive(2)
                    navigate('/user/purchased-book')
                }
                }>
                    <BookOutlined  className='profile-navbar-item-icon' />
                    <span className='profile-navbar-item-text'>Sách đã mua</span>
                </div>
                <div className={'profile-navbar-item' + (active === 3 ? ' active' : '')}
                    onClick={() => {
                        setActive(3)
                        navigate('/user/change-password')
                    }}

                >
                    <AiOutlineLock className='profile-navbar-item-icon' />
                    <span className='profile-navbar-item-text'>Thay đổi mật khẩu</span>
                </div>
            </div>
            <div className='profile-content'>
                <Outlet />
            </div>
        </div>
    )
}

export default Profile