import React , {useState} from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const ProductDetail = (props) => {
    const [amout,setAmout] = useState(0);

    const checkDetail = () => {
        if(props.detail != 1){
            return true
        } else {
            return false
        }
    }

    const checkSize = () => {
        if(props.size != 1){
            return true
        } else {
            return false
        }
    }
    /* const handleChangeAmout = (e) => {
        e.stopPropagation();
        var cal = e.target.id;
        if (cal == 'plus') {
            //console.log(cal);
            setAmout(amout + 1);
        } 
        if (cal == 'minus') {
            if ( amout <= 0) {
                //console.log(cal);
                setAmout(0);
            } else {
                //console.log(cal);
                var temp = amout - 1;
                setAmout(temp);
            };
        };
        //console.log(amout);
    } */
    const handleChangeAmoutPlus = () => {
        setAmout(amout + 1);
    }
    const handleChangeAmoutMinus = () => {
        if ( amout <= 0) {
            //console.log(cal);
            setAmout(0);
        } else {
            //console.log(cal);
            var temp = amout - 1;
            setAmout(temp);
        };
    }
    return (
        <div className="infor-product" id="infor-product">
            <div className="name-producer">
                {props.producer}
            </div>
            <div className="name-product">
                {props.name}
            </div>
            <div className="price-product">
                {parseInt(props.price).toLocaleString() + '.000 đ'}
            </div>
            <div className="size-and-color">
                <div className="color">
                    MORE COLOR
                    <input type="button" name="" id="input" className="upper-case" value={props.color} required="required" title="" />
                </div>
                <div className="size">
                    MORE SIZE
                    <input type="button" name="" id="input" className="upper-case" value={checkSize()? props.size : 'o/s'} required="required" title="" />
                    
                </div>
            </div>
            <div className="control-quality">
                <button type="button" onClick={handleChangeAmoutMinus}><i id="minus"  className="bi bi-dash" /></button>
                <input type="number" id="input" className="form-control" value={amout} min="0" step="" required="required" title="" disabled/>
                <button type="button" onClick={handleChangeAmoutPlus}><i id="plus" className="bi bi-plus" /></button>
            </div>

            <button type="button" className="btn-buy">THÊM VÀO GIỎ HÀNG</button>
            <div className="content-product">
                {props.content}
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
                            {props.detail.split(',').map(item => {
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
        </div>
    );
};

export default ProductDetail;