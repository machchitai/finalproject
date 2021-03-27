import React, { useEffect } from 'react';
import VideoIntro from '../module/VideoIntro';
import ButtonContact from '../module/buttonContact'
import MiniSlider from '../module/MiniBanner';
import PromoProduct from '../module/PromoProduct';
import HotProduct from '../module/HotProduct';
import Collection from '../module/Catelogy';
import NewItem from '../module/NewItem';
import GetNotification from '../module/GetNotification';

const TrangChu = () => {
    return (
        <>

            <VideoIntro />
            <ButtonContact />
            <MiniSlider />
            <div className="container-fluid box-60">
                <PromoProduct />
                <HotProduct />
            </div>
            <Collection />
            <div className="container-fluid">
            <NewItem />
            </div>
            <GetNotification />
        
        </>
    );
};

export default TrangChu;