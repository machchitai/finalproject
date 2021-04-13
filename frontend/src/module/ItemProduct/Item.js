import React from 'react';
import {
    Link,
} from 'react-router-dom';
import $ from 'jquery';
const ItemProduct = (props) => {
    const handleCheckStock = () =>{
        const arr = props.stock.split(',');
        //console.log(arr)
        var count = 0;
        for (var i=0 ; i < arr.length ; i++) {
            if(arr[i] == '0') {
                count += 1;
            }
        }
        if(count == arr.length){
            return true;
        } else {
            return false;
        }
    }
    return (
        <>
            <div className="col-sm-3">
                <div className="item-product">
                    <Link to={'/'+props.ma}>
                        <div className="img-product">
                            <img src={"./images/product/" + props.image} className="img-responsive img-product" alt="Image" />
                            {(handleCheckStock())?
                                <div className="sold-out">
                                    <img src="./images/sold-out1.png" alt="Image" />
                                </div>
                                :
                                ''
                            }
                            
                        </div>

                        <div className="infor-produce">
                            <div className="producer">
                                {props.producer}
                            </div>
                            <div className="name-product">
                                {props.name}
                            </div>
                            <div className="price-product">
                                {parseInt(props.price).toLocaleString() + '.000 đ'}
                            </div>
                        </div>
                    </Link>
                    <div className="button-control-product">
                        <button 
                            type="button" 
                            disabled={(handleCheckStock())?
                                'disabled'
                                :
                                ''
                            }
                            className="btn-circle btn-buy-now" 
                            onClick={() => {
                                props.handleChangeBuyNow(props.ma);
                                $('.buy-now-hidden-box').css('display','block');
                                $('.box-blur').css('display','block');
                                $('.box-blur').click(function() {
                                    $('.buy-now-hidden-box').css('display','none');
                                    $('.box-blur').css('display','none');
                                })
                            }}
                        >
                            <i className="bi bi-bag-plus-fill" />
                        </button>
                        <button type="button" className="btn-circle"><i className="bi bi-heart" /></button>
                        <Link className="btn-circle" to={'/' + props.ma}><i className="bi bi-info" /></Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ItemProduct;