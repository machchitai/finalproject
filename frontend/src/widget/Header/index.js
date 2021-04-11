import React, { useEffect, useState } from 'react';
import {
    Link,
} from 'react-router-dom';
import Data from './Data';

const Header = () => {
    const [getPerson,setPerson] = useState();
    const [allItem] = useState(Data);
    const [contentChild, setContentChild] = useState();

    useEffect(() => {
        const age = localStorage.getItem('person');
        if (age == 'adults'){
            setPerson('children')
        } else {
            setPerson('adults')
        }
        //console.log(allItem);
    },[getPerson])

    const showChild = (e) => {
        const temp = e.target.className;
        var mouseOver = '';
        //console.log(temp)
        if(temp != undefined){
            mouseOver = temp.split('-')[1];
            const child = allItem.filter((item) => {
                return item.title == mouseOver
            })
            if(child.length != 0){
                setContentChild(child)
            }
            //console.log(contentChild)
        }
    }
    return (
        <>  
            
            <nav className="navbar navbar-expand-lg header">
                <div className="collapse navbar-collapse" id="navbarContent">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 link-logo">
                        <Link to="/" >
                            <div className=".link-logo">
                                <div className="col-sm-4 link-img">
                                    <img src="./images/logo.png"  alt="Image" width="80"/>
                                </div>

                                <div className="col-sm-8 text-link">
                                    Vereinfachen
                                </div>
                            </div>
                        </Link>

                    </div>
                
                    <div className="col-sm-8 list-item-menu">
                        <ul className="navbar-nav mr-auto ">
                            <div className="col-sm-2 item-menu item-home active">
                                <li className="nav-item">
                                    <Link 
                                        className="nav-link" 
                                        to="/"
                                    >
                                        HOME
                                    </Link>
                                </li>
                            </div>

                            <div className=" col-sm-3 item-menu all-item-menu">
                                <li className="nav-item">
                                    <Link 
                                        className="nav-link" 
                                        to="san-pham"
                                    >
                                        ALL ITEMS
                                        <div className="i-rotate-up">
                                            <i className="bi bi-chevron-compact-down" />
                                        </div>
                                        
                                    </Link>
                                </li>
                                
                            </div>
                            
                            <div className="col-sm-2 item-menu item-sales">
                                <li className="nav-item">
                                    <Link 
                                        className="nav-link" 
                                        to="sales"
                                    >
                                        SALES
                                    </Link>
                                </li>
                            </div>

                            <div className="col-sm-3 item-menu">
                                <li className="nav-item ">
                                    <Link 
                                        className="nav-link" 
                                        to="contact-us"
                                    >
                                        CONTACT US 
                                        <span className="sr-only">(current)</span>
                                    </Link>
                                </li>
                            </div>
                            <div className="col-sm-2 change-adult">
                                <li className="nav-item upper-case">
                                    <Link to={getPerson}
                                        className="nav-link"
                                        href="#"
                                    >
                                        {getPerson}
                                    </Link>
                                </li>
                            </div>

                        </ul>
                   </div>
                   <div className="col-sm-2 list-icon-menu">
                        <div className="action-search" id="action-search">
                            <i className="bi bi-search" />
                            <div className="search-box-hidden" id="search-box-hidden">
                                <div className="div-space"></div>
                                <div className="tool-search">
                                    <input type='text' placeholder="tìm kiếm ..."/>
                                    <button type="button">
                                        <i className="bi bi-search"/>
                                    </button>
                                </div>
                                <div className="result-search">
                                    Chưa có tool
                                </div>
                            </div>
                        </div>
                        <div className="action-save" id="action-save">
                            <i className="bi bi-heart" />
                            <div className="save-box-hidden" id="save-box-hidden">
                                <div className="div-space"></div>
                                <div className="result-save">
                                    Chưa có tool
                                </div>
                            </div>
                        </div>
                        <div className="action-buy">
                            <Link to="gio-hang">
                                <i className="bi bi-bag" />
                            </Link>
                        </div>
                        <div className="action-acc">
                            <Link to="tai-khoan">
                                <i className="bi bi-person" />
                            </Link>
                        </div>
                    </div>
                    
                </div>
                <div className="all-item-hidden">
                    <div className="container-xxl">
                        <div className="row upper-case">
                            <div className="col-sm-3 border-right">
                                {
                                    allItem.map((item) => {
                                        return (<div 
                                                    className={"item-" + item.title} 
                                                    onMouseOver={showChild}
                                                >
                                            <Link to={item.link}>
                                                {item.title}
                                            </Link>
                                        </div>)
                                    })
                                }
                            </div>
                            <div className="col-sm-3 border-right">
                                {
                                    contentChild != undefined? contentChild[0].child.map((item) => {
                                        return <div 
                                                    className={item['name-child']}
                                                >
                                                    <Link to={item['link']}>
                                                        {item['name-child']}
                                                    </Link>
                                                </div>
                                    }) : ''
                                }
                            </div>
                            <div className="col-sm-6 border-right promotion-all-item">
                                <div className='row'>
                                    <div className="col-sm-5 cont-img">
                                        <Link 
                                            to="/promo"
                                            className=""
                                        >
                                            <img src="./images/promo/sale-50.jpg" className="img-responsive" alt="sale 50%" />
                                        </Link>
                                    </div>
                                    <div className="col-sm-5 cont-img">
                                        <Link 
                                            to="/promo"
                                            className=""
                                        >
                                            <img src="./images/promo/sale-balo.jpg" className="img-responsive" alt="sale balo 79k" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;