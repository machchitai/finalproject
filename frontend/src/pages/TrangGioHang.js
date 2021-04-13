import React, { useEffect,useState } from 'react';
import Alias from '../module/Alias';
import FormCart from '../module/FormCart';
import NoItem from '../module/FormCart/NoItem';

const TrangGioHang = () => {
    const [cartInLocal,setCartInLocal] = useState()

    useEffect(() => {
        var temp = localStorage.getItem('cart');
        setCartInLocal(temp)
    },[cartInLocal])
    return (
        <> 
            <Alias alias={[{'name':'Trang Chủ','link':'/'},{'name':'Giỏ Hàng','link':'/gio-hang'}]}/> 
            {
                (typeof cartInLocal != 'undefined' && cartInLocal != null)? 
                    <FormCart />
                    :
                    <NoItem />
            }
           
        </>
    );
};

export default TrangGioHang;