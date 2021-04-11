import React from 'react';

const VideoIntro = () => {
    return (
        <div className="banner-video-infor">
            <video  src="./videos/video_about.mp4" autoPlay  muted/>
            <div className = "video-circle-scroll">
            </div>
        </div>
    );
};

export default VideoIntro;