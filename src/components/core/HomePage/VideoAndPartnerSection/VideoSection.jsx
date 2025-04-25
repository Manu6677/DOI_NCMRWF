import React from 'react';
import YouTube from 'react-youtube';
import ncmrwfBuilding from '../../../../assets/videos/ncmrwf-overview.mp4';

const VideoSection = () => {
  const videoOptions = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div className="flex w-full items-center justify-center p-4">
      {/* <YouTube
        videoId="jWJtpnYD584"
        opts={videoOptions}
        className="h-full w-full"
      /> */}
      <iframe
        id="ytplayer"
        className="h-[25rem] w-[50rem]"
        type="text/html"
        src={`https://www.youtube.com/embed/f8zY0-854sY?si=_5wS6qsg7vwVe4Sb&amp;start=6`}
        frameBorder="0"
      />

      {/* <iframe
        src="https://www.youtube.com/watch?v=jWJtpnYD584"
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
        title="video"
        className="h-full w-full"
      /> */}
      {/* <video
        src={ncmrwfBuilding}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="h-full w-full object-cover"
      /> */}
    </div>
  );
};

export default VideoSection;
