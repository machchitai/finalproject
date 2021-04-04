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
                <div class="col-sm-4">
                    <div className="banner-promo-item">
                        <Link to="#">
                            <img src="./images/promo/promo1.png" class="img-responsive" alt="Image" />
                        </Link>
                    </div>
                </div>
                
                <div class="col-sm-4">
                    <div className="banner-promo-item">
                        <Link to="#">
                            <img src="./images/promo/promo2.png" class="img-responsive" alt="Image" />
                        </Link>
                    </div>
                </div>

                <div class="col-sm-4">
                    <div className="banner-promo-item">
                        <Link to="#">
                            <img src="./images/promo/promo3.png" class="img-responsive" alt="Image" />
                        </Link>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
};

export default PromoProduct;