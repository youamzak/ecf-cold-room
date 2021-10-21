import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SimpleSlider({list}) {
  let slidesToShow = 1;
  list.length <= 4 ? slidesToShow = list.length : slidesToShow = 4;
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 968,
        settings: {
          speed: 50,
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 760,
        settings: {
          speed: 50,
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      }
    ]
  };

  return (
    <Slider {...settings}>
      {
        list.map((el) => 
        <div key={el.toString()}>
          {el}
        </div>
        )
        
      }

      
    </Slider>
  );
}
