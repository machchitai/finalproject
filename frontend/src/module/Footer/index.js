import React from 'react';

const Footer = () => {
    return (
        <div className="footer">
            <div className="container-footer">
                <div className="row container-fluid">

                    <div class="col-sm-2 col-md-2 col-lg-2 find-store">
                        
                        <img src="./images/store.png" class="img-responsive" alt="Vereinfachen store" />
                        <button type="button" class="btn btn-success">TÌM CỬA HÀNG</button>
                    </div>
                    
                    
                    <div class="col-sm-10 col-md-10 col-lg-10">
                        <div className="row">
                            
                            <div className="col-sm-4 col-md-4 col-lg-4">
                                <ul>
                                    <li className="font-header-normal mb-3 bolder font-color-white">SẢN PHẨM</li>
                                    <li className="option-footer">Quần</li>
                                    <li className="option-footer">Áo</li>
                                </ul>
                            </div>
            
                            <div className="col-sm-4 col-md-4 col-lg-4">
                                <ul>
                                    <li className="font-header-normal mb-3 bolder font-color-white">VỀ CÔNG TY</li>
                                    <li className="option-footer">Tuyển dụng</li>
                                    <li className="option-footer">Về Vereinfachen</li>
                                </ul>
                            </div>
                            
                            <div className="col-sm-4 col-md-4 col-lg-4">
                                <ul>
                                    <li className="font-header-normal mb-3 font-color-white">HỖ TRỢ</li>
                                    <li className="option-footer">FAQs</li>
                                    <li className="option-footer">Tra cứu đơn hàng</li>
                                    <li className="option-footer">Bảo mật thông tin</li>
                                    <li className="option-footer">Tra cứu đơn hàng</li>
                                </ul>
                            </div>
                            <div className="col-sm-4 col-md-4 col-lg-4">
                                <ul>
                                    <li className="font-header-normal mb-3 bolder font-color-white">LIÊN HỆ</li>
                                    <li className="option-footer">Email góp ý</li>
                                </ul>
                            </div>
                        </div>

                        <div className="row">
                            
                            <div class=" col-sm-4 col-md-4 col-lg-4">
                                <ul>
                                    <li className="font-header-normal mb-3 bolder font-color-white">Vereinfachen SOCIAL</li>
                                    <li className="option-footer"></li>
                                    <li className="option-footer"></li>
                                    <li className="option-footer"></li>
                                </ul>
                            </div>
                            <div class=" col-sm-4 col-md-4 col-lg-4 copyright">
                                Copyright © 2020 Vereinfachen. All rights reserved.
                            </div>
                            <div class=" col-sm-4 col-md-4 col-lg-4 footer-logo">
                                
                                <img src="../images/logo.png" class="img-responsive" alt="Image" />
                                Vereinfachen
                                
                            </div>
                            
                        </div>
                    </div>
                

                </div>
            </div>
        </div>
    );
};

export default Footer;