import React from 'react';

const FormPaymentProduct = () => {
    return (
        <div className="form-payment">
            
            <form noValidate autoComplete="off" role="form">
                <legend>Form title</legend>
            
                <div class="form-group">
                    <label for="">label</label>
                    <input type="text" class="form-control" id="" placeholder="Input field" />
                </div>
            
                
            
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
            
        </div>
    );
};

export default FormPaymentProduct;