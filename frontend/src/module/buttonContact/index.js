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
                    <i class="bi bi-chat-dots-fill"></i>
                </div>
            </Link>

            <Link herf="twitter.com">
                <div className = 'all_buton_contact button_twiter'>   
                    <i class="fa fa-twitter" aria-hidden="true"></i>
                </div>
            </Link>
        </div>  
    );
};

export default index;