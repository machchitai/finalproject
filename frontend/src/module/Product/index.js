import React, { useState } from 'react';
import ItemProduct from './ItemProduct';

const Product = () => {
    const [dataProduct, setDataProduct] = useState([
        {
            'ten-san-pham':'váy hồng xinh xắn',
            'gia':'200',
            'catelogry':'Thời trang bé gái',
            'describe' : 'váy hồng cho bé gái 10 tuổi, chất lượng vải đẹp, màu sắc trang nhã',
            'images':''          
        },
        {
            'ten-san-pham':'váy hồng xinh xắn',
            'gia':'200',
            'catelogry':'Thời trang bé gái',
            'describe' : 'váy hồng cho bé gái 10 tuổi, chất lượng vải đẹp, màu sắc trang nhã',          
        },{
            'ten-san-pham':'váy hồng xinh xắn',
            'gia':'200',
            'catelogry':'Thời trang bé gái',
            'describe' : 'váy hồng cho bé gái 10 tuổi, chất lượng vải đẹp, màu sắc trang nhã',          
        },{
            'ten-san-pham':'váy hồng xinh xắn',
            'gia':'200',
            'catelogry':'Thời trang bé gái',
            'describe' : 'váy hồng cho bé gái 10 tuổi, chất lượng vải đẹp, màu sắc trang nhã',          
        }
    ]);
    return (
        <div>
            <ItemProduct />
        </div>
    );
};

export default Product;