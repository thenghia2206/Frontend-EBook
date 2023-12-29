import React, { useEffect, useState } from 'react'
import './purchased-successfully.styles.scss'
import { Button, notification } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useDispatchRoot, useSelectorRoot } from '../../redux/store'
import { VnpayResponseCode } from '../../constants/purchase.constants'

const PurchaseSuccessfully = () => {
    const {
        userRole
      } = useSelectorRoot((state) => state.login);
    const navigate = useNavigate()
    // const dispatch = useDispatchRoot()
    const searchParams = new URLSearchParams(document.location.search);
    const [purchaseStatus, setPurchaseStatus] = useState('');

    const [isNotFoundPage, setIsNotFoundPage] = useState<boolean>(true);
    useEffect(() => {
        console.log(window.location.pathname);
        if (window.location.pathname.includes("/purchased-successfully"))
            setIsNotFoundPage(false);
    }, [window.location.pathname])

    useEffect(()=>{
        const status = searchParams.get('status');
        const code = searchParams.get('code');
    
        if(status && code){
            const response = VnpayResponseCode.find(item => item.code === code)
            setPurchaseStatus(response?.content || 'Giao dịch thất bại');
        }

        setTimeout(() => {
            navigate("/")
        },3000)


        
    },[isNotFoundPage])

    const handleConfirmPurchased = () => {
        if(userRole === "user") navigate('/buyer/purchased-sketchs')
        else if(userRole === "seller") 	navigate('/seller/purchased-sketchs')
        else navigate('/')
    }

    return (
        <div
            className='main-container'
        >
            <div className='content-area'>
                <div className='container'>

                    <div className='title'>{purchaseStatus}</div>
                    {/* <div className='button'>
                        <Button
                            onClick={()=>{
                                handleConfirmPurchased()
                            }}
                        >
                            Quay lại trang sản phẩm đã mua của bạn
                        </Button>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default PurchaseSuccessfully