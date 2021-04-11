import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

const Alias = (props) => {
    const aliasPage = props.alias;
    return (
        <div className="alias-page">
            
            <Breadcrumbs aria-label="breadcrumb">
                {
                    aliasPage.map((item,index) => {
                        if(index == aliasPage.length - 1){
                            return <Typography color="textPrimary">{item.name}</Typography>
                        } else {
                            return <Link color="inherit" href={item.link}> {item.name} </Link>
                        }
                    })
                }
            </Breadcrumbs>
        </div>
    );
};

export default Alias;