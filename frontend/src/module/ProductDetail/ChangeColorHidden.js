import React, { useEffect,useState } from 'react';
import {Link} from 'react-router-dom'
import Data from '../../module/Data';
import $ from 'jquery';

const ChangeColorHidden = (props) => {
    const [inforColor , setInforColor] = useState({});
    const data = Data;
    const [getColor , setGetColor] = useState();

    useEffect(() => {
        setInforColor(props.inforColor);
        /* console.log(inforColor.id) */
        if (typeof(inforColor.id) != 'undefined'){
            if(inforColor.otherColor != 0) {
                setGetColor(inforColor.otherColor.split(','))
            }
        }
    },[inforColor]);
    const handleSearch = (id) => {
        if(getColor) {
            for ( var i = 0; i < getColor.length ; i++){
                if(getColor[i] == id) {
                    return true;
                }
            }
            return false;
        }
    }
    const handleClose = () => {
        $('.color-box-hidden').css('display','none');
        $('.color-box-blur').css('display','none');
    }
    return (
        <>  
            <div className="color-box-hidden">
                <div className='row'>
                    {
                        data.map(item => {
                            if(handleSearch(item.id)){
                                return <div className="col-sm-3">
                                    <a 
                                        href={'/' + item.id}
                                        onClick = {handleClose}
                                    >
                                        <img src={"images/product/" + item.avatar} class="img-responsive" alt="Image" />
                                        <div className="title-color upper-case">
                                            {item.mau}
                                        </div>
                                    </a>
                                </div>
                            }
                        })
                    }
                        
                </div>
                <button><i class="bi bi-x" onClick={handleClose} /></button>
            </div>
            <div className='color-box-blur'></div>
        </>
    );
};

export default ChangeColorHidden;