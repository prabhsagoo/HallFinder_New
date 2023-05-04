import React, { useRef, useEffect, useState, useContext } from "react";
import "./App.css";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import Geolocation from "@mapbox/mapbox-gl-geocoder/lib/geolocation";
import { dataGeo } from "./data.js";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import * as turf from "@turf/turf";
import { AuthContext } from "./components/auth";
import Slideshow from "./slideshow/Slideshow";
import Button from "@mui/material/Button";
import BookingForm from "./Hall/BookingForm";
import { useNavigate } from "react-router-dom";

mapboxgl.accessToken = import.meta.env.VITE_PUBLIC_KEY;

const Map = () => {
  const navigate = useNavigate();
  const mapContainer = useRef(null);
  let map = useRef(null);
  let loc = useRef(null);
  const [userLng, setUserLng] = useState("");
  const [userLat, setUserLat] = useState("");
  const [lng, setLng] = useState(-114.0571411);
  const [lat, setLat] = useState(51.0453809);
  const [zoom, setZoom] = useState(10);
  const [data, setData] = useState(dataGeo.features);
  const [filterData, setFilterData] = useState(data);
  const [fly, setFly] = useState([]);
  let currentUserData = [];
  const { currentUser, setCurrentUser, image, setImage } =
    useContext(AuthContext);
  const geoCoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    marker: {
      color: "orange",
    },
    placeholder: "Enter your location",
    bbox: [-140.99778, 41.6751050889, -52.6480987209, 83.23324],
  });

  useEffect(() => {
    const item = localStorage.getItem("user");
    console.log(item);
    if (localStorage.getItem("user") != "undefined" || null) {
      currentUserData = JSON.parse(localStorage.getItem("user"));
      // console.log("abc"+currentUserData.uid);
      setCurrentUser(currentUserData);
      setImage(localStorage.getItem("imageUrl"));
    }
  }, []);

  useEffect(() => {
    geoCoder.on("result", function (results) {
      console.log(results.result.place_name);
      setUserLng(results.result.center[0]);
      setUserLat(results.result.center[1]);
      setFilterData(
        filterData.map((b) =>
          Object.assign(b, {
            distance: turf.distance(
              [results.result.center[0], results.result.center[1]],
              b.geometry.coordinates,
              { units: "kilometers" }
            ),
          })
        )
      );
      setFilterData(filterData.sort((a, b) => a.distance - b.distance));

      //   setZoom(13);
    });

    // if (map.current) return; // initialize map only once
    map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
    //Geocoder
    // map
    map.addControl(geoCoder, "top-left");
    loc = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      // When active the map will receive updates to the device's location as it changes.
      trackUserLocation: true,
      // Draw an arrow next to the location dot to indicate which direction the device is heading.
      showUserHeading: true,
      showUserLocation: true,
    });

    loc.on("geolocate", function (a) {
      console.log(a);
      setUserLat(a.coords.latitude);
      setUserLng(a.coords.longitude);
      setFilterData(
        filterData.map((b) =>
          Object.assign(b, {
            distance: turf.distance(
              [a.coords.longitude, a.coords.latitude],
              b.geometry.coordinates,
              { units: "kilometers" }
            ),
          })
        )
      );
      setFilterData(filterData.sort((a, b) => a.distance - b.distance));
      console.log(filterData);
    });

    map.addControl(loc, "top-left");
    map.addControl(new mapboxgl.NavigationControl());

    //Array data.map
    data.map((a) => {
      const el = document.createElement("div");
      el.className = "marker";
      new mapboxgl.Marker(el)
        .setLngLat([a.geometry.coordinates[0], a.geometry.coordinates[1]])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(`<H3>${a.properties.name}</h3>`)
        )
        .addTo(map);
      // console.log(dataGeo.features[i].geometry.coordinates);
    });

    console.log("useEffect");
    async function getAllData() {
      return await (await fetch("/api")).json();

      // setData2(newData);
    }
    getAllData();
  }, [data]);

  function flyToStore(currentFeature) {
    console.log("Second Hook");
    // map.flyTo({
    //   center: currentFeature.geometry.coordinates,
    //   zoom: 15,
    // });

    // let popup = new mapboxgl.Popup({ closeOnClick: false, closeButton: false }) // add popups
    //       .setHTML(
    //         `<h3>Address:</h3><h4>Name: ${currentFeature.properties.name}</h4>`
    //       )
    // let marker1 = new mapboxgl.Marker({
    //   color: "brown",
    //   scale: 2,
    // })
    //   .setLngLat(currentFeature.geometry.coordinates)

    //   .setPopup(popup);
    //   if (popup.isOpen()) {

    //     popup.remove();

    // } else {

    //     marker1.addTo(map).togglePopup();

    // }

    console.log(currentFeature.geometry.coordinates);

    var distance = turf.distance(
      [userLng, userLat],
      currentFeature.geometry.coordinates,
      { units: "kilometers" }
    );
    console.log("Distance is " + Math.round(distance) + " KM");
  }
  return (
    <div className="data" id="data">
      <Slideshow />

      <div className="list">
        <ul id="listData" key={Math.random()}>
          {filterData.map((b, index) => {
            return (
              <Card
                key={Math.random()}
                sx={{ Width: 345 }}
                className="card"
                onClick={() => {
                  flyToStore(b);
                }}
              >
                <CardActionArea className="card1">
                  <CardMedia>
                    <img src={b.properties.img} height="200px" width="100%" />
                  </CardMedia>
                  <CardContent>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <div>
                        <Typography gutterBottom variant="h5" component="div">
                          {b.properties.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {b.properties.address}
                          <br />
                          <span style={{ fontSize: "18px", color: "black" }}>
                            {" "}
                            {userLng ? Math.round(b.distance) + " Km Away" : ""}
                          </span>
                        </Typography>
                      </div>
                      <div>
                        {" "}
                        <Button
                          variant="outlined"
                          style={{
                            width: "130px",
                            height: "40px",
                            color: "#112d32",
                            borderColor: "#112d32",
                          }}
                          onClick={() => {
                            navigate("/viewhall",{state: b});
                          }}
                        >
                          Book
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </CardActionArea>
              </Card>
              //   <li
              //     value={index}
              //     id="data1"
              //     onClick={() => {
              //       console.log(
              //         //   b.geometry.coordinates[0] + ", " + b.geometry.coordinates[1]
              //         MapBoxDirections
              //       );
              //     }}
              //   >
              //     {b.geometry.coordinates[0]}, {b.geometry.coordinates[1]}
              //     <button
              //       id="btn"
              //       onClick={() => {
              //         flyToStore(b);
              //       }}
              //     >
              //       Select
              //     </button>
              //   </li>
            );
          })}
        </ul>
      </div>
      {/* {" "}
      <h4>
        {title} <br></br>(Lng: {lng}, Lat:{lat})
      </h4> */}
      <div ref={mapContainer} className="map-container" />
    </div>
  );
};

export default Map;
