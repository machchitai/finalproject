import React from 'react';

const MiniBanner = () => {
    return (
        <div className="mini-slider">
            <ul>

                <li>
                    <div className="about-service">
                        <div className="icon-service">
                            <i className="bi bi-truck" />
                            </div>
                        <div className="content-mini-slider" >
                            <div className="title-mini-slider">
                                GIAO HÀNH NHANH
                            </div>

                            <div className="content-inside-deliver">
                                2 - 4 ngày kể từ khi xác nhận đơn hàng
                            </div>
                        </div>
                        
                    </div>
                </li>

                <li>
                    <div className="about-service">
                        <i className="bi bi-tools" />

                        <div className="content-mini-slider">
                            <div className="title-mini-slider">
                                HỖ TRỢ NHANH
                            </div>

                            <div className="content-inside-deliver">
                                Tại các kênh FB, Twitter và Hotline
                            </div>
                        </div>
                    </div>
                </li>

                <li>
                    <div className="about-service">
                        <i className="bi bi-gift" />

                        <div className="content-mini-slider">
                            <div className="title-mini-slider">
                                KHUYẾN MÃI LỚN
                            </div>

                            <div className="content-inside-deliver">
                                Nhiều mặt hàng với giá ưu hấp dẫn
                            </div>
                        </div>
                    </div>
                </li>

                <li>
                    <div className="about-service">
                        <i className="bi bi-check-circle" />

                        <div className="content-mini-slider">
                            <div className="title-mini-slider">
                                XÁC NHẬN ĐƠN HÀNG
                            </div>

                            <div className="content-inside-deliver">
                                1 - 2 ngày kể từ ngày đặt hàng
                            </div>
                        </div>
                    </div>
                </li>


            </ul>
            
        </div>
    );
};

export default MiniBanner;