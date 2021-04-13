import React, { useState,useEffect } from 'react';
import $ from 'jquery';

const BuyNowHidden = (props) => {
    const [outOfStock, setOutOfStock] = useState();
    const [sizePro,setSizePro] = useState();
    const [amout,setAmout] = useState(0);

    useEffect(() => {
        if(props.inforToBuyNow.size !== '1' && typeof(props.inforToBuyNow.stock) != 'undefined') {
            var temp = props.inforToBuyNow.stock.split(',');
            //console.log(temp);
            var stockPro = ''
            for(var i = 0; i < temp.length ; i ++) {
                if( temp[i] == 0){
                    var a = i + ',';
                    stockPro += a;
                }
            }
            setOutOfStock(stockPro);
        }
        console.log(props.inforToBuyNow.stock)
        setSizePro(checkNextSize());
    },[outOfStock,props.inforToBuyNow.stock])
    const checkNextSize = () => {
        if(props.inforToBuyNow.size == '1') {
            return 'o/s';
        } else {
            const arr = props.inforToBuyNow.size.split(',');
            //console.log(arr)
            var point = 0
            for( var i=0 ; i < arr.length ; i++){
                
                if(handleCompareSize(i) === false){
                    point = i;
                    break;
                } else {
                    point += 1;
                }
            }
            return arr[point];
        }
    }
    const handleChangeAmoutPlus = () => {
        setAmout(amout + 1);
    }
    const handleChangeAmoutMinus = () => {
        if (amout <= 0) {
            //console.log(cal);
            setAmout(0);
        } else {
            //console.log(cal);
            var temp = amout - 1;
            setAmout(temp);
        };
    }
    const handleClose =() => {
        $('.buy-now-hidden-box').css('display','none');
        $('.box-blur').css('display','none');
    }
    const handleCompareSize = (number) => {
        if (typeof(outOfStock) != 'undefined' && outOfStock != '') {
            const arr =  outOfStock.split(',');
            for (var i=0 ; i < arr.length - 1; i++){
               // console.log(arr[i]);
                if (arr[i] == number) {
                    return true;
                }
            }
            return false;
        } else {
            return false;
        }
    };
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
                                    <input type="button" name="" id="input" className="upper-case" value={sizePro} required="required" title="" />
                                    {(props.inforToBuyNow.size == '1')? '' : 
                                        <div className="size-box-hidden width-100">
                                            <div className="row">
                                                {props.inforToBuyNow.size.split(',').map((item,index) => {
                                                    if(handleCompareSize(index)){
                                                        return <div className="col-sm-3"><button className="defauls" disabled>{item}</button> </div>
                                                    } else {
                                                        return <div className="col-sm-3"><button className="normal" onClick={() => {setSizePro(item)}} >{item}</button> </div>
                                                    }
                                                })}
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="control-quality">
                                <button type="button" onClick={handleChangeAmoutMinus}><i id="minus"  className="bi bi-dash" /></button>
                                <input type="number" id="input" className="form-control" value={amout} min="0" step="" required="required" title="" disabled/>
                                <button type="button" onClick={handleChangeAmoutPlus}><i id="plus" className="bi bi-plus" /></button>
                            </div>
                            <div className="btn-buy-now">
                                <button type="button " className="btn-buy stocking">MUA NGAY</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="out-buy-now">
                    <button type="button" className="btn-close-buy-now" onClick={handleClose}><i className="bi bi-x" /></button>
                </div>
            </div>
            <div className="box-blur"></div>
        </>
    );
};

export default BuyNowHidden;