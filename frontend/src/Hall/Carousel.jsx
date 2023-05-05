import React from 'react'
import "./Carousel.css";



const Carousel = (props) => {
  let state = props.state;
  return (
    <div className="images1">
      <img src="src/images/halls/CH3.jpeg" className="one1 image1" />
      <img src="src/images/halls/marda3.jpg" className="two1 image1" />
      <img src="src/images/halls/marda4.jpeg" className="three1 image1" />
      <div id="text">
        <span id="textMain">{state.properties.name}<br style={{margin:"20px 0"}} /></span>
      </div>
    </div>
  )
}

export default Carousel