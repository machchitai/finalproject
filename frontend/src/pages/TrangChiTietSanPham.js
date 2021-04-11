import React , {useEffect, useState} from 'react';
import ProductDetail from '../module/ProductDetail';
import ListImageProduct from '../module/ListImageProduct'
import Data from '../module/Data';
import { Redirect, useLocation } from 'react-router-dom';
import Alias from '../module/Alias';

const TrangChiTietSanPham = () => {
    const [DataProduct] = useState(Data);
    const location = useLocation();
    const [product, setProduct] = useState({
        'img':'',
        'producer':'',
        'name':'',
        'gia':'',
        'mau':'',
        'size':'',
        'content':'',
        'detail':''
    });
    const [redirect,setRedirect] = useState(false);
    
    useEffect(() => {
        const temp = DataProduct.find(item => item.id == location.pathname.substr(1))
        console.log(temp)
        if(typeof(temp) != 'undefined' && temp != ''){
            setProduct(temp);
        } else {
            setRedirect(true);
        }
    },[product])
    return (
        <> 
            <Alias alias={[{'name':'Trang Chủ','link':'/'},{'name':'Sản Phẩm','link':'/san-pham'},{'name':product.name,'link':'/' + product.mau}]}/>
            {redirect? <Redirect to="/404" /> : ''}
            <div className="container-fluid detail-infor-box">
                <div className="row">
                    <div className="col-sm-6">
                        {/* <ListImageProduct 
                            images={DataProduct.find(item => item.id == location.pathname.substr(1)).img}
                            producer={DataProduct.find(item => item.id == location.pathname.substr(1)).producer} 
                            name={DataProduct.find(item => item.id == location.pathname.substr(1)).name} 
                            price={DataProduct.find(item => item.id == location.pathname.substr(1)).gia}
                            color={DataProduct.find(item => item.id == location.pathname.substr(1)).mau}
                            size={DataProduct.find(item => item.id == location.pathname.substr(1)).size} 
                        /> */}
                        <ListImageProduct 
                            images={product.img}
                            producer={product.producer} 
                            name={product.name} 
                            price={product.gia}
                            color={product.mau}
                            size={product.size} 
                        />
                        
                    </div>
                    <div className="col-sm-6">
                        {/* <ProductDetail 
                            producer={DataProduct.find(item => item.id == location.pathname.substr(1)).producer} 
                            name={DataProduct.find(item => item.id == location.pathname.substr(1)).name} 
                            price={DataProduct.find(item => item.id == location.pathname.substr(1)).gia} 
                            color={DataProduct.find(item => item.id == location.pathname.substr(1)).mau} 
                            size={DataProduct.find(item => item.id == location.pathname.substr(1)).size}
                            content={DataProduct.find(item => item.id == location.pathname.substr(1)).content}
                            detail={DataProduct.find(item => item.id == location.pathname.substr(1)).detail}
                        /> */}
                        <ProductDetail 
                            producer={product.producer} 
                            name={product.name} 
                            price={product.gia} 
                            color={product.mau} 
                            size={product.size}
                            content={product.content}
                            detail={product.detail} 
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default TrangChiTietSanPham;