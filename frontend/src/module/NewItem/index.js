import React from 'react';

const NewItem = () => {
    return (
        <div className="new-items space-top">
             <div className="title-all-banner">
                Sản phẩm mới
            </div>

            <div className="row layout-new-item">
                 
                <div className=" col-sm-3 col-md-3 col-lg-3 big-new-item">
                    
                    <img src="./images/newItems/newItem.png" className="img-responsive" alt="Image" />
                    
                </div>
                    
                <div className="col-sm-6 col-md-6 col-lg-6 content-new-item">
                    
                    <div className="row content-new-item">
                        Item story: 
                        Urbas Corluray Pack đem đến lựa chọn “làm mới mình” với sự kết hợp 5 gam màu
                        mang sắc thu; phù hợp với những người trẻ năng động, mong muốn thể hiện cá 
                        tính riêng biệt khó trùng lặp.
                        <a href="#">Đọc thêm...</a> 
                    </div>
                        
                    <div className="row small-new-item">
                        <div className="col-sm-4 col-md-4 col-lg-4">
                            <img src="./images/newItems/newItem.png" className="img-responsive" alt="Image" />
                        </div>
                        <div className="col-sm-4 col-md-4 col-lg-4">
                            <img src="./images/newItems/newItem.png" className="img-responsive" alt="Image" />
                        </div>
                        <div className="col-sm-4 col-md-4 col-lg-4">
                            <img src="./images/newItems/newItem.png" className="img-responsive" alt="Image" />
                        </div>    
                    </div>  
                </div>
                    
                <div className=" col-sm-3 col-md-3 col-lg-3 big-new-item">
                    
                    <img src="./images/newItems/newItem.png" className="img-responsive" alt="Image" />
                    
                </div>
            </div>
        </div>
    );
};

export default NewItem;