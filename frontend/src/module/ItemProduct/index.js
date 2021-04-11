import React, { useState,useEffect } from 'react';
import Data from './Data';
import Item from './Item';


const Product = (props) => {
    const data = useState(Data);
    const handleChangeBuyNow2 = (id) => {
        props.handleChangeBuyNow(id)
    }

    return (
        <>
            <div className="row">
                {
                    data[0].map(item => {
                        return <Item producer={item.producer} image={item.avatar} name={item.name} price={item.gia} ma={item.id} handleChangeBuyNow={handleChangeBuyNow2} />
                    })
                }
            </div>
        </>
    );
};

export default Product;