import { Outlet, Navigate, useNavigate } from 'react-router-dom'
import { useSelectorRoot } from '../redux/store';
import { useEffect } from 'react';
import { notification } from 'antd';

type Props = {
    children?: React.ReactNode
};

const PrivateUserRoutes = ({children}: Props) => {
    const {
        tokenLogin
    } = useSelectorRoot((state) => state.login);
    const navigate = useNavigate();


    useEffect(()=>{
        if(tokenLogin){
            notification.open({
                message: "Bạn phải không phải người mua hàng",
                onClick: () => {
                    console.log("Notification Clicked!");
                },
                style: {
                    marginTop: 50,
                    paddingTop: 40,
                },
            });
            // navigate('/')
        }
    },[tokenLogin])

    return(
        (!tokenLogin) ? <Outlet/> : <Navigate to="/"/>
    )
}

export default PrivateUserRoutes