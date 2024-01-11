import React, { useState, useEffect } from 'react';
import { Worker, Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import './readBook.styles.scss';
import { useDispatchRoot, useSelectorRoot } from '../../redux/store';
import { getCodeBookRequests, getProfileRequest } from '../../redux/controller';
import { API_URL } from '../../enum/api.enum';
import { useNavigate, useParams } from 'react-router-dom';

const ReadBook = () => {
    const { tokenLogin, accesstokenExpỉred } = useSelectorRoot(
        (state) => state.login
    );
    const {
        fileBook,codeBook
    } = useSelectorRoot((state) => state.book); 
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const [Url, setUrl] = useState<any>(); 
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatchRoot();
    useEffect(() => {
        if(fileBook){
            setIsLoggedIn(true)
        }
    }, [fileBook]); 
    const queryParameters = new URLSearchParams(window.location.search)
    const key = queryParameters.get("key")
    let testUrl : any  = `${API_URL.HOST}/${API_URL.FILE_BOOK}/filePDF/${key}`

    useEffect(() => {
        const fetchData = async () => {
            const bodyRequest = {
                id: queryParameters.get("bookId"),
            };
            await dispatch(getCodeBookRequests(bodyRequest));
            await dispatch(getProfileRequest());
            setLoading(false);
        };

        fetchData();
    },[])
    

    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    
    return (
        <div className="read-book">
        {!isLoggedIn? (
            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js`}>
                <Viewer
                    fileUrl={testUrl}
                    plugins={[defaultLayoutPluginInstance]}
                />
            </Worker>
        ) : (
            <div className="login-message">Vui lòng đăng nhập để xem nội dung.</div>
        )}
    </div>
    );
};

export default ReadBook;
