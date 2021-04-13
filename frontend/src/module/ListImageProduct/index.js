import React, { useEffect, useState } from 'react';
import $ from 'jquery';

const ListImageProduct = (props) => {
    const [Zoom, setZoom] = useState(false);
    const [Image,setImage] = useState('');
    const [outOfStock, setOutOfStock] = useState();
    const [sizePro,setSizePro] = useState();
    const [amout,setAmout] = useState(0);

    useEffect(() => {
        if(props.size !== '1' && typeof(props.stock) != 'undefined') {
            var temp = props.stock.split(',');
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
        //console.log(props.stock)
        var topSize = $('.input-in-zoom').height() *2;
        var heightInput = $('.input-in-zoom').outerHeight() *2;
        $('.size-in-zoom').css('top',- topSize);
        $('.size-in-zoom').css('height',heightInput);
        setSizePro(checkNextSize());
    },[outOfStock,props.stock])
    const checkNextSize = () => {
        if(props.size == '1') {
            return 'o/s';
        } else {
            const arr = props.size.split(',');
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
    const handleImages = (src) => {
        //console.log(typeof(src));
        if(typeof(src) != 'undefined' && src != ''){
            var temp = src.split('/');
            temp = temp[temp.length - 1]
            //console.log(temp)
            setImage(temp);
        }
        console.log(Image)
    }
    const handleZoomImage = (e) => {
        //console.log(e.target.src);
        const src = e.target.src;
        handleImages(src);
        setZoom(!Zoom);

        if(Zoom == true){
            $(".zoom-img").css("display","block");
        } else {
            $(".zoom-img").css("display","none");
        }
    }
    const checkSize = () => {
        if(props.size != 1){
            return true
        } else {
            return false
        }
    }
    const getImages = () => {
        return props.images.split(',').map(item => {
            //console.log(item)
            return <img src={"./images/product/" + item} className="img-responsive" alt="Image" onClick={handleZoomImage}/>
        })
    }
    const getSize = () => {
        if (props.size != null && typeof props.size != 'undefined') {
        return (<div className="size-box-hidden .box-size size-in-zoom width-100">
                <div className="row">
                    {props.size.split(',').map((item,index) => {
                        if(handleCompareSize(index)){
                            return <div className="col-sm-3"><button className="default" disabled>{item}</button> </div>
                        } else {
                            return <div className="col-sm-3"><button className="normal" onClick={() => {setSizePro(item)}} >{item}</button> </div>
                        }
                    })}
                </div>
            </div>)
        } else {
            return ''
        }
    }
    return (
        <>
            <div className="list-img">
                {
                    (props.images != null && typeof props.images!= 'undefined')?
                    getImages()
                    :
                    ''
                }
                {/* <img src="./images/product/A8_SOCKS_GREY_0182.png" className="img-responsive" alt="Image" onClick={handleZoomImage}/>
                <img src="./images/product/A8_SOCKS_GREY_0182_2UP.png" className="img-responsive" alt="Image" onClick={handleZoomImage}/>
                <img src="./images/product/A8_SOCKS_GREY_0183.png" className="img-responsive" alt="Image" onClick={handleZoomImage}/> */}
  
            </div>
            <div className="zoom-img">
                <img src={"./images/product/" + Image} className="img-responsive" alt="Image" onClick={handleZoomImage}/>
                <button type="button" onClick={handleZoomImage}><i className="bi bi-x" /></button>
                <div className="buy-product">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="name-producer">
                                    {props.producer}
                                </div>
                                <div className="name-product">
                                    {props.name}
                                </div>
                                <div className="price-product">
                                    {parseInt(props.price).toLocaleString() + '.000 đ'}
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="size-and-color">
                                    <div className="color">
                                        MORE COLOR
                                        <input type="button" name="" id="input" className="upper-case" value={props.color} required="required" title="" />
                                    </div>
                                    <div className="size">
                                        MORE SIZE
                                        <input 
                                            type="button" 
                                            className="upper-case input-in-zoom" 
                                            value={sizePro}
                                        />
                                        {(props.size == '1')? '' : 
                                            getSize()
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-3 btn-buy">
                                <button type="button">THÊM VÀO GIỎ HÀNG</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ListImageProduct;