import React from 'react';

const GetNotification = () => {
    return (
        <div className="get-notification space-top">
            
            <div className="content-get-notification">
                <p className=" bolder font-header gradient-text-1">
                    JOIN OUR COMMUNITY
                </p>
                <p>
                    Enter your email to get notification
                </p>
                <input type="text" className="form-control" id="" placeholder="Nhập email của bạn" />
                <button type="button" className="btn btn-default">Gửi</button>
            </div>
        </div>
    );
};

export default GetNotification;