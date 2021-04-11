import React from 'react';

const ButtonContact = () => {
    return (
        <div className = "buttons">
            <a href='https://www.facebook.com/'>
                <div className = 'all_buton_contact button_facebook'>   
                    <i className="fa fa-facebook-square"></i>
                </div>
            </a>

            <a href = "https://www.messenger.com/">
                <div className = 'all_buton_contact button_messenger'>   
                    <img src="./images/icon/messenger.png" className="img-responsive" alt="Image" />
                </div>
            </a>

            <a href="https://www.twitter.com/">
                <div className = 'all_buton_contact button_twiter'>   
                    <i className="fa fa-twitter" aria-hidden="true"></i>
                </div>
            </a>
            <div className="button-scroll-top">
                <i className="bi bi-chevron-double-up" />
                UP
            </div>
        </div>  
    );
};

export default ButtonContact;