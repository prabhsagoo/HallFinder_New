import React from 'react'
import "./Slideshow.css";
import image1 from "../images/slideshow/2.png";
import image2 from "../images/slideshow/try-e1481029197357.jpg";
import image3 from "../images/slideshow/commhall.jpg";

const Slideshow = () => {
  return (
    <div className="images">
      <img src={image1} className="one image" />
      <img src={image2} className="two image" />
      <img src={image3} className="three image" />
      <div className="scroll-down"></div>
      <div id="text">
        <span id="textMain">Book community halls and build community bonds<br style={{margin:"20px 0"}} /></span>
      </div>
    </div>
  )
}

export default Slideshow