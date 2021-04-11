import React from 'react';
import {
    Link,
} from 'react-router-dom';

const PromoProduct = () => {
    return (
        <div className="banner-promo space-top">
            
            <div className="title-all-banner">
                Khuyến mãi
            </div>

            <div className="promo-list">
                <div className="row">
                <div className="col-sm-4">
                    <div className="banner-promo-item">
                        <Link to="/">
                            <img src="./images/promo/promo1.png" className="img-responsive" alt="Image" />
                        </Link>
                    </div>
                </div>
                
                <div className="col-sm-4">
                    <div className="banner-promo-item">
                        <Link to="/">
                            <img src="./images/promo/promo2.png" className="img-responsive" alt="Image" />
                        </Link>
                    </div>
                </div>

                <div className="col-sm-4">
                    <div className="banner-promo-item">
                        <Link to="/">
                            <img src="./images/promo/promo3.png" className="img-responsive" alt="Image" />
                        </Link>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
};

export default PromoProduct;