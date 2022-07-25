import React from "react";
import arrowLeftCircle from '../../../assets/images/arrow-left-circle.svg';
import arrowRightCircle from '../../../assets/images/arrow-right-circle.svg';

export default function SliderButtons({ direction, moveSlide }) {
  return (
    <button
      onClick={moveSlide}
      className={direction === "next" ? "btn-slide next" : "btn-slide prev"}
    >
      <img 
        className="btn-slider-image"
        src={direction === "next" ? arrowRightCircle : arrowLeftCircle} />
    </button>
  );
}
