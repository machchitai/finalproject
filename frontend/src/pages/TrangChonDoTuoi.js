import React, { useEffect } from 'react';
import Link from '@material-ui/core/Link';

const TrangChonDoTuoi = () => {
    useEffect(() => {
        localStorage.clear('person');
    },[])

    const handleChangeAge = (event) =>{
        localStorage.setItem('person', event.target.name);
    }
    const handleAutoChangeAge = () =>{
        localStorage.setItem('person','adults');
    }
    return (
        <>
            <div className="chon-do-tuoi">
                <div className="header-chon-do-tuoi">
                    
                    <div class="col-sm-4 col-md-4 col-lg-4">
                        <div className="logo">   
                            <Link href="/trang-chu" onClick={handleAutoChangeAge} >    
                                <img src="./images/logo.png" class="img-responsive" alt="Image" />    
                                Vereinfachen      
                            </Link>
                        </div>
                    </div>
                    
                    
                    <div class="col-sm-4 col-md-4 col-lg-4">
                        <div className="title">
                            Hãy chọn độ tuổi mà bạn quan tâm đến
                        </div>
                    </div>
               
                </div>
                
                <div className="list-image-chon-do-tuoi">
                    <Link href="/trang-chu" onClick={handleChangeAge}>
                        <img src="./images/model-011.jpg" name="adults"  class="img-responsive" alt="Image" />
                    </Link>  

                    <Link href="/trang-chu" onClick={handleChangeAge}>
                        <img src="./images/model-kid-011.jpg" name="children" class="img-responsive" alt="Image" />
                    </Link> 
                </div>
                
            </div>
            
        </>
    );
};

export default TrangChonDoTuoi;