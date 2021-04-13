import React, { useState,useEffect } from 'react';
import Data from './Data';
import Item from './Item';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const Product = (props) => {
    const [page, setPage] = React.useState(1);

    const data = useState(Data);
    const handleChangeBuyNow2 = (id) => {
        props.handleChangeBuyNow(id)
    }
    const handleChange = (event, value) => {
        setPage(value);
    };
    const useStyles = makeStyles((theme) =>
        createStyles({
            root: {
                '& > * + *': {
                    marginTop: theme.spacing(2),
                },
            },
        }),
    );
    const classes = useStyles();
    return (
        <>
            <div className="row">
                {
                    data[0].map(item => {
                        return <Item producer={item.producer} stock={item.stock} image={item.avatar} name={item.name} price={item.gia} ma={item.id} handleChangeBuyNow={handleChangeBuyNow2} />
                    })
                }
            </div>
            <div className="row cont-pagination">
                <div className={classes.root} id="Pagination">
                    <Pagination count={10} page={page} onChange={handleChange} />
                </div>
            </div>
        </>
    );
};

export default Product;