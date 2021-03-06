import React from 'react';

const Video = ({ url }) => (
  <div>
    <video className="msg-video img-thumbnail" controls>
      <source src={url} type="video/mp4" />
    </video>
  </div>
);

export default Video;
