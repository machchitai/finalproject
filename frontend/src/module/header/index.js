import React from 'react';
import {
    Link,
} from 'react-router-dom';
const header = () => {
    return (
        <>  
            
            <nav className="navbar navbar-expand-lg header">
                <div className="collapse navbar-collapse" id="navbarContent">
                    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 link-logo">

                            <Link to="/">
                                <div className=".link-logo">
                                    <div class="col-sm-4 link-img">
                                        <img src="./images/logo.png"  alt="Image" width="80"/>
                                    </div>

                                    <div class="col-sm-8 text-link">
                                        <h4>Vereinfachen</h4>
                                    </div>
                                </div>
                            </Link>

                    </div>
                
                    <div class=" col-sm-8 list-item-menu">
                        <ul className="navbar-nav mr-auto ">
                            
                            <div class="col-sm-3 item-menu">
                                <li className="nav-item active ">
                                    <a className="nav-link" href="#">HOME</a>
                                </li>
                            </div>

                            <div class=" col-sm-3 item-menu">
                                
                                <li className="nav-item all-item-menu">
                                    <a className="nav-link" href="#">
                                        ALL ITEMS
                                        <div className="i-rotate-up">
                                            <i class="bi bi-chevron-compact-down" />
                                        </div>
                                        
                                    </a>
                                    
                                </li>
                                
                            </div>
                            
                            <div class="col-sm-3 item-menu">
                                <li className="nav-item">
                                    <a className="nav-link" href="#">SALES</a>
                                </li>
                            </div>

                            <div class="col-sm-3 item-menu">
                                <li className="nav-item ">
                                    <a className="nav-link" href="#">CONTACT US <span className="sr-only">(current)</span></a>
                                </li>
                            </div>

                        </ul>
                   </div>
                   <div className="col-sm-2 list-icon-menu">
                        <div class="action-search">
                            <Link>
                                <i class="bi bi-search" />
                            </Link>
                            <div className="search-box-hidden">
                                <button type="button" class="btn btn-secondary">
                                    <i class="bi bi-search" />
                                </button>
                                <input type='text'/>
                            </div>
                        </div>
                        <div class="action-buy">
                            <Link >
                                <i class="bi bi-bag" />
                            </Link>
                        </div>
                        <div class="action-save">
                            <Link >
                                <i class="bi bi-heart" />
                            </Link>
                        </div>
                        <div class="action-acc">
                            <Link >
                                <i class="bi bi-person" />
                            </Link>
                        </div>
                   </div>
                </div>
            </nav>
        </>
    );
};

export default header;