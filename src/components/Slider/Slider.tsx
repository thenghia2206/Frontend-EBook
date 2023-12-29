import { useEffect, useState } from 'react';
import { useDispatchRoot, useSelectorRoot } from '../../redux/store';
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import './style.slider.scss';
const Slider = () => {
    const dispatch = useDispatchRoot();



    useEffect(() => {

    },);
    return (
        <div className='main-slider'>
            <div className='slider-category'>
                <div className='slider-category-title'>
                    <HiOutlineSquares2X2 />
                    <span>Tất cả danh mục sản phẩm</span>
                </div>
            </div>
        </div>
    )
}

export default Slider