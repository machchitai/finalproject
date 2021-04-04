import React from 'react';
import {
    Link,
} from 'react-router-dom';
const index = () => {

    return (
        <div className = "buttons">
            <Link herf='facebook.com'>
                <div className = 'all_buton_contact button_facebook'>   
                    <i class="fa fa-facebook-square"></i>
                </div>
            </Link>

            <Link to = "#">
                <div className = 'all_buton_contact button_messenger'>   
                    <img src="./images/icon/messenger.png" class="img-responsive" alt="Image" />
                </div>
            </Link>

            <Link herf="twitter.com">
                <div className = 'all_buton_contact button_twiter'>   
                    <i class="fa fa-twitter" aria-hidden="true"></i>
                </div>
            </Link>
            <div className="button-scroll-top animate__backInRight animate__backOutRight">
                <i class="bi bi-chevron-double-up" />
                UP
            </div>
        </div>  
    );
};

export default index;