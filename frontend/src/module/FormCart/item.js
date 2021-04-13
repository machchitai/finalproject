import React from 'react';

const item = (props) => {
    const cart = props.cart;

    const handleButtonClick = (string_loai) => {
        console.log(string_loai);
        if(string_loai == '-'){
            if(cart.amount - 1 > 0){
                props.handleChangeAmount(cart.id, cart.amount - 1);
            } else {
                props.handleChangeAmount(cart.id, 1);
                var key = window.confirm('Bạn có muốn xóa sản phẩm ' + cart.name + ' khỏi giỏ hàng không?');
                //console.log(key);
                if(key == true){
                    props.handleRemoveItemCart(cart.id);
                }
            }
        }
        else{
            props.handleChangeAmount(cart.id, cart.amount + 1);
        }
    }

    const handleButtonRemoveItemCart = () => {
        var key = window.confirm('Bạn có chắc chắn muốn xóa sản phẩm ' + cart.name + ' khỏi giỏ hàng không?');
        //console.log(key);
        if(key == true){
            props.handleRemoveItemCart(cart.id);
        }
    }
    return (
        <>
            <tr>
                <th scope="row">{props.no + 1}</th>
                <td colspan="2" className="detail-item-cart">
                    <div className="img-item-cart">
                        <img src={"./images/product/" + cart.avatar} class="img-responsive" alt="Image" /> 
                    </div>
                    <div className="infor-item-cart">
                        <div className="producer">
                            {cart.producer}
                        </div>
                        <div className="name">
                            {cart.name}
                        </div>
                        <div className="size">
                            Size: {(cart.size == '1')? 'O/S' : cart.size}
                        </div>
                        <div className="gia">
                            <span>Giá:</span> {parseInt(cart.gia).toLocaleString() + '.000 đ'}
                        </div>
                        <div>
                            Số lượng: 
                            <div className="control-quality">
                                <button type="button" onClick={() => {handleButtonClick('-')}}><i id="minus"  className="bi bi-dash" /></button>
                                <input type="number" id="input" className="form-control" value={cart.amount} min="0" step="" required="required" title="" disabled/>
                                <button type="button" onClick={() => {handleButtonClick('+')}}><i id="plus" className="bi bi-plus" /></button>
                            </div>
                        </div>
                        <div className="btn-delete">
                            <button className="btn btn-danger" onClick={handleButtonRemoveItemCart}>xóa</button>
                        </div>
                    </div>
                </td>
                <td>
                    {parseInt(cart.gia * cart.amount).toLocaleString() + '.000 đ'}
                </td>
            </tr>
        </>
    );
};

export default item;
