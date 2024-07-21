import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const navigateToNotFound = (pageNumber: string | undefined, totalPages: number) => {
    const navigate = useNavigate();
    
    useEffect(() => {
        if(pageNumber !== undefined) {
            if(Number(pageNumber) > totalPages || Number(pageNumber) <= 0 || !Number(pageNumber)) {
                navigate('not-found');
            }
        }
    }, [pageNumber, totalPages, navigate]);
}

export default navigateToNotFound