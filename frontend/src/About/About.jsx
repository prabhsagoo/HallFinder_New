import React from 'react'
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import myImage from './hall.jpg';
import myImage1 from './Med.jpg';
import myImage2 from './IMG_686.jpg';
import myImage3 from './dom.jpg';
import myImage4 from './pooja.jpg';
import "./About.css"

const About = () => {
  return (
    <>
    <div>
      <div className="heading">
        <h1>Hall Finder</h1>
        <p>Welcome to Hall Finder, your go-to online platform for finding the perfect event venue! Our mission is to
          make the process of finding and booking event halls as easy and stress-free as possible.</p>
      </div>
      <div className="container7">
        <section className="about">
          <div className="about-image">
          <img src={myImage} alt="Alt Text" style={{width:"700px", height:"400px"}} />

          </div>
          <div className="about-content">
            <h2>About Us</h2>
            <p>At Hall Finder, we understand that finding the right venue can be one of the most important decisions
              in event planning. That's why we've created a user-friendly platform that allows you to easily
              search and compare different event halls based on your specific needs and preferences.
              Our platform features a wide variety of event halls, including wedding venues, conference centers,
              banquet halls, and more. Each venue has its own detailed profile that includes photos, pricing
              information, and reviews from other users, so you can make an informed decision when selecting a
              venue.
              Whether you're planning a wedding, a corporate event, or a birthday party, Hall Finder has you
              covered. Our platform is designed to save you time and hassle, so you can focus on creating the
              perfect event.
              Thank you for choosing Hall Finder for all your event venue needs. We look forward to helping you
              find the perfect venue for your next event!</p>
            <a href="#" className="read-more">Read More</a>
          </div>
        </section>
      </div>
      <section className="team">
        <div className="container-1">
          <h1>OUR TEAM</h1>
          <div className="row">
            <div className="col-md-3 profile text-center">
              <div className="img-box">
                <img src={myImage1} className="img-responsive" alt="" style={{width:"300px", height:"298px"}} />
                <ul>
                  <a href="#">
                    <li><i className="fa-brands fa-facebook-f" /></li>
                  </a>
                  <a href="#">
                    <li><i className="fa-brands fa-linkedin" /></li>
                  </a>
                </ul>
              </div>
              <h2>Medara Kapcsos</h2>
              <h3>Full Stack Developer</h3>
              <p>Coding is my passion, and every line <br /> of code is a step towards my dreams.</p>
            </div>
            <div className="col-md-3 profile text-center">
              <div className="img-box">
                <img src={myImage2} className="img-responsive" alt="" style={{width:"226px", height:"298px"}} />
                <ul>
                  <a href="#">
                    <li><i className="fa-brands fa-facebook-f" /></li>
                  </a>
                  <a href="#">
                    <li><i className="fa-brands fa-linkedin" /></li>
                  </a>
                </ul>
              </div>
              <h2>Prabh Sagoo</h2>
              <h3>Full Stack Developer</h3>
              <p>Every line of code is a step towards achieving my dreams - Passionate Coding Learner.</p>
            </div>
            <div className="col-md-3 profile text-center">
              <div className="img-box">
                <img src={myImage3}className="img-responsive" alt="" style={{width:"226px", height:"298px"}} />
                <ul>
                  <a href="#">
                    <li><i className="fa-brands fa-facebook-f" /></li>
                  </a>
                  <a href="#">
                    <li><i className="fa-brands fa-linkedin" /></li>
                  </a>
                </ul>
              </div>
              <h2>Dominic Anyanga</h2>
              <h3>Full Stack Developer</h3>
              <p>Coding isn't just my hobby, it's my passion - Always learning, always coding.</p>
            </div>
            <div className="col-md-3 profile text-center">
              <div className="img-box">
                <img src={myImage4} className="img-responsive" alt="" style={{width:"226px", height:"298px"}}/>
                <ul>
                  <a href="#">
                    <li><i className="fa-brands fa-facebook-f" /></li>
                  </a>
                  <a href="#">
                    <li><i className="fa-brands fa-linkedin" /></li>
                  </a>
                </ul>
              </div>
              <h2>Pooja Malviya</h2>
              <h3>Full Stack Developer</h3>
              <p>Coding isn't just my hobby, it's my passion - Let's bring ideas to life through code.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  )
}

export default About