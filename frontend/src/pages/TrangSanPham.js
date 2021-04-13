import {React ,useEffect,useState} from 'react';
import ToolOption from '../module/ToolOption';
import ItemProduct from '../module/ItemProduct';
import BuyNowHidden from '../module/BuyNowHidden';
import Data from '../module/Data';
import Alias from '../module/Alias';

const TrangSanPham = () => {
    /* const [buyNowBox,setBuyNowBox] = useState(false); */
    const [inforToBuyNow , setInforToBuyNow] = useState({
        'img':'',
        'producer':'',
        'name':'',
        'price':'',
        'color': '',
        'size' : ''
    });
    const DataProduct = Data;
    
    useEffect(() => {
        handleChangeBuyNow();
    },[inforToBuyNow])
    const handleChangeBuyNow = (id) => {
        if( id != '' && typeof(id) != 'undefined') {
            const infor = DataProduct.find(item => item.id == id)
            
            setInforToBuyNow({
                'img' : infor.avatar,
                'producer':infor.producer,
                'name':infor.name,
                'price':infor.gia,
                'color': infor.mau,
                'size' : infor.size,
                'stock': infor.stock
            });
        }
    };
    return (
        <>
            <Alias alias={[{'name':'Trang Chủ','link':'/'},{'name':'Sản Phẩm','link':'/san-pham'}]}/>
            <div className="container-fluid product-page">
                <div className = "row">
                    <div className="col-sm-2 list-search">
                        <ToolOption />
                    </div>
                    <div className="col-sm-10 list-product">
                        <ItemProduct handleChangeBuyNow={handleChangeBuyNow} />
                    </div>
                </div>
            </div>
            <BuyNowHidden inforToBuyNow={inforToBuyNow} />
        </>
    );
};

export default TrangSanPham;