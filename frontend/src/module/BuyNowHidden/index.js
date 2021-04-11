import React, { useState,useEffect } from 'react';

const BuyNowHidden = (props) => {
    const [amout,setAmout] = useState(0);

    const handleChangeAmoutPlus = () => {
        setAmout(amout + 1);
    }
    const handleChangeAmoutMinus = () => {
        if ( amout <= 0) {
            //console.log(cal);
            setAmout(0);
        } else {
            //console.log(cal);
            var temp = amout - 1;
            setAmout(temp);
        };
    }
    return (
        <>
            <div className="buy-now-hidden-box">
                <div className="container">
                    <div className="title">MUA NHANH</div>
                    <div className="row">
                        <div className="col-sm-6 images-buy-now">
                            <img src={"./images/product/" + props.inforToBuyNow.img} className="img-responsive" alt="Image" />
                        </div>
                        <div className="col-sm-6">
                            <div className="infor-produce">
                                <div className="producer">
                                    {props.inforToBuyNow.producer}
                                </div>
                                <div className="name-product">
                                    {props.inforToBuyNow.name}
                                </div>
                                <div className="price-product">
                                    {parseInt(props.inforToBuyNow.price).toLocaleString() + '.000 đ'}
                                </div>
                            </div>
                            <div className="size-and-color">
                                <div className="color">
                                    MORE COLOR
                                    <input type="button" name="" id="input" className="upper-case" value={props.inforToBuyNow.color}required="required" title="" />
                                </div>
                                <div className="size">
                                    MORE SIZE
                                    <input type="button" name="" id="input" className="upper-case" value={(props.inforToBuyNow.size == 1)? 'O/S' : props.inforToBuyNow.size} required="required" title="" />
                                </div>
                            </div>
                            <div className="control-quality">
                                <button type="button" onClick={handleChangeAmoutPlus}><i id="minus"  className="bi bi-dash" /></button>
                                <input type="number" id="input" className="form-control" value={amout} min="0" step="" required="required" title="" disabled/>
                                <button type="button" onClick={handleChangeAmoutMinus}><i id="plus" className="bi bi-plus" /></button>
                            </div>
                            <div className="btn-buy-now">
                                <button type="button" className="btn-buy">MUA NGAY</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="out-buy-now">
                    <button type="button" className="btn-close-buy-now"><i className="bi bi-x" /></button>
                </div>
                
            </div>
            <div className="box-blur"></div>
        </>
    );
};

export default BuyNowHidden;