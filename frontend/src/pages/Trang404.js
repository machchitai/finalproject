import React from 'react';
import {Link} from 'react-router-dom';

const Trang404 = () => {
    return (
        <div className="p-404">
            
            <div className="contain">
                <img src="./images/404.jpg" class="img-responsive" alt="Image" />
                
                <Link 
                    type="button"
                    to="/"
                >
                    QUAY VỀ TRANG CHỦ
                </Link>
            </div>
        </div>
    );
};

export default Trang404;