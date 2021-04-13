import React from 'react';
import {Link} from 'react-router-dom'

const NoItem = () => {
    return (
        <div className="container">
            <div className="no-item">
                <img src="images/sad-lady.png" class="img-responsive" alt="Image" />
                <div className="content-no-item">
                    Bạn chưa có sản phẩm trong giỏ hàng <br />
                    Hãy quay về trang sản phẩm và thêm sản phẩm yêu thích vào giỏ hàng 
                </div>
                <Link className="btn-continue" to="/san-pham">
                    TIẾP TỤC MUA HÀNG
                </Link>
            </div>
        </div>
    );
};

export default NoItem;