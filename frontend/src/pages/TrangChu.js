import React, { useEffect }/* , { useEffect } */ from 'react';
import VideoIntro from '../module/VideoIntro';
import MiniSlider from '../module/MiniBanner';
import PromoProduct from '../module/PromoProduct';
import HotProduct from '../module/HotProduct';
import Collection from '../module/Category';
import NewItem from '../module/NewItem';
import GetNotification from '../module/GetNotification';
import ButtonContact from '../module/ButtonContact';
import $ from 'jquery';

const TrangChu = () => {
    useEffect(() => {
        $('.button-scroll-top').click(function(){
            $('html,body').animate({scrollTop: 0},1200);
        });
    },[])
    return (
        <>
            <ButtonContact />
            <VideoIntro />
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