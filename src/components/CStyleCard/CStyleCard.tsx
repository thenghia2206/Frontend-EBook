
import { Card } from "antd";
import Meta from "antd/lib/card/Meta";

import { useNavigate } from "react-router-dom";
import "./styles.stylecard.scss";
import Utils from "../../common/utils";
import ImageNotFound from "../../images/Image_not_available.png";
import { useDispatchRoot, useSelectorRoot } from "../../redux/store";
import { dispatch } from "rxjs/internal/observable/pairs";
import { useEffect } from "react";
interface props {
    imageUrl?: string;
    name?: string;
    id?: string
}

interface DATA_TRANFER {
    target: string;
    value: string;
}


const CStyleCard = (props: props) => {
    const navigate = useNavigate();
    const dispatch = useDispatchRoot();

    const handleClick = () => {
        navigate('/searching')
    };

    useEffect(() => {
        console.log(props);

    }, [props]);

    return (
        <div
            style={{ backgroundImage: props.imageUrl ? `url(${props.imageUrl})` : `url(${ImageNotFound})` }}
            onClick={() => { handleClick() }}
            className="style-card-main"
        >
            <div className="style-card-title">{props.name}</div>
        </div>
    );
};

export default CStyleCard;
