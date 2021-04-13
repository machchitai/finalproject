import React , {useEffect, useState} from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChangeColorHidden from './ChangeColorHidden';
import $ from 'jquery';

const ProductDetail = (props) => {
    const [amout,setAmout] = useState(1);
    const [addCart , setAddCard] = useState([]);
    const [outOfStock, setOutOfStock] = useState();
    const [productDetail] = useState(props.product);
    const [sizePro,setSizePro] = useState();

    useEffect(() => {
        var addCartTemp = localStorage.getItem('cart');

        if(typeof addCartTemp != 'undefined' && addCartTemp != null){
            var temp = JSON.parse(addCartTemp);
            console.log(temp);
            setAddCard(addCartTemp);
        }
    })
    useEffect(() => {
        if(productDetail.size !== '1') {
            var temp = productDetail.stock.split(',');
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
        setSizePro(checkNextSize());
    },[outOfStock])
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
    const handleClickAdd = () => {
        var mang_gio_hang_temp = addCart
        console.log(mang_gio_hang_temp);
        if(mang_gio_hang_temp.length > 0){
            mang_gio_hang_temp = JSON.parse(addCart)
            var flag_co_trong_gio_hang_hay_khong = false;
            for(var i = 0; i< mang_gio_hang_temp.length; i++){
                if(mang_gio_hang_temp[i].id == productDetail.id){
                    /* console.log(mang_gio_hang_temp[i].amount) */
                    mang_gio_hang_temp[i].amount += amout;
                    flag_co_trong_gio_hang_hay_khong = true;
                    break;
                }
            }
            if(flag_co_trong_gio_hang_hay_khong === false){
                var item_temp = {
                    'avatar': productDetail.avatar,
                    'gia':productDetail.gia,
                    'id':productDetail.id,
                    'name':productDetail.name,
                    'producer':productDetail.producer,
                    'size':sizePro,
                    'amount':amout
                };
                mang_gio_hang_temp.push(item_temp);
            }
        } else {
            var item_temp = {
                'avatar': productDetail.avatar,
                'gia':productDetail.gia,
                'id':productDetail.id,
                'name':productDetail.name,
                'producer':productDetail.producer,
                'size':sizePro,
                'amount':amout,
            };
            mang_gio_hang_temp.push(item_temp);            
        }
        //console.log(mang_gio_hang_temp);
        localStorage.setItem('cart', JSON.stringify(mang_gio_hang_temp));
    }

    const checkDetail = () => {
        if(productDetail.detail != 1){
            return true
        } else {
            return false
        }
    }
    const checkNextSize = () => {
        if(productDetail.size == '1') {
            return 'o/s';
        } else {
            const arr = productDetail.size.split(',');
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
        if ( amout <= 1) {
            //console.log(cal);
            setAmout(1);
        } else {
            //console.log(cal);
            var temp = amout - 1;
            setAmout(temp);
        };
    }
    const handleOpenBox = () => {
        $('.color-box-hidden').css('display','block');
        $('.color-box-blur').css('display','block');
        $('.color-box-blur').click(function(){
            $('.color-box-hidden').css('display','none');
            $('.color-box-blur').css('display','none');
        });
    }
    const handleButtonBuy = () => {
        //console.log(productDetail.stock);
        const arr = productDetail.stock.split(',');
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
    const checkProductDetail = () => {
        if (productDetail != null && typeof productDetail != 'undefined') {
            return true
        } else {
            return false
        }
    }
    const getColor = () => {
        if (checkProductDetail()) {
            if(productDetail.otherColor == 0) {
                return <input type="button" className="upper-case" value={productDetail.mau} onClick={handleOpenBox} required="required" disabled/>
            } else {
                return <input type="button" className="upper-case" value={productDetail.mau} onClick={handleOpenBox} required="required" title="" />
            }
        } else {
            return ''
        } 
    }
    const getButtonBuy = () => {
        if (productDetail != null && typeof productDetail != 'undefined') {
            return ( <div className="size-box-hidden width-60">
                <div className="row">
                    {productDetail.size.split(',').map((item,index) => {
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
        <div className="infor-product" id="infor-product">
            <div className="name-producer">
                {productDetail.producer}
            </div>
            <div className="name-product">
                {productDetail.name}
            </div>
            <div className="price-product">
                {parseInt(productDetail.gia).toLocaleString() + '.000 đ'}
            </div>
            <div className="size-and-color">
                <div className="color">
                    MORE COLOR
                    {
                        getColor()
                    }
                </div>
                <div className="size">
                    MORE SIZE
                    <input 
                        type="button" 
                        className="upper-case" 
                        value={sizePro}
                    />
                    {(productDetail.size == '1')? '' : 
                        getButtonBuy()
                    }
                </div>
            </div>
            <div className="control-quality">
                <button type="button" onClick={handleChangeAmoutMinus}><i id="minus"  className="bi bi-dash" /></button>
                <input type="number" id="input" className="form-control" value={amout} min="0" step="" required="required" title="" disabled/>
                <button type="button" onClick={handleChangeAmoutPlus}><i id="plus" className="bi bi-plus" /></button>
            </div>
            {(handleButtonBuy())? 
                <button type="button" className="out-of-stock" disabled>
                    Sold Out
                </button>
                :
                <button type="button" className="stocking" onClick={() => {handleClickAdd()}}>
                    THÊM VÀO GIỎ HÀNG
                </button>
            }
            <div className="content-product">
                {productDetail.content}
            </div>
            <div className="more-content">
                {checkDetail()? <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography>Detail</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        <ul>
                            {productDetail.detail.split(',').map(item => {
                                return <li>{item}</li>
                            })}
                        </ul>
                    </Typography>
                    </AccordionDetails>
                </Accordion> : ''}
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    >
                    <Typography>Share</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        <a href="https://www.facebook.com" color="inherit"><i className="bi bi-facebook" /></a>
                        <a href="https://www.twitter.com" color="inherit"><i className="bi bi-twitter" /></a>
                    </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
            <ChangeColorHidden inforColor={productDetail}/>
        </div>
    );
};

export default ProductDetail;