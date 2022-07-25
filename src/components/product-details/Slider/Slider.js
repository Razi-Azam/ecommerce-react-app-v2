import React, {useEffect, useState} from 'react';
import SliderButtons from './SliderButtons';

export default function Slider(props) {

    const [slideIndex, setSlideIndex] = useState(1);

    const sliderImages = [
        {
            id: 1,
            productImageUrl: props.imageSrc,
        },
        {
            id: 2,
            productImageUrl: props.imageSrc,
        },
        {
            id: 3,
            productImageUrl: props.imageSrc,
        },
        {
            id: 4,
            productImageUrl: props.imageSrc,
        },
        {
            id: 5,
            productImageUrl: props.imageSrc,
        },
    ];

    const nextSlide = () => {
        if(slideIndex !== sliderImages.length){
            setSlideIndex(slideIndex + 1)
        } 
        else if (slideIndex === sliderImages.length){
            setSlideIndex(1)
        }
    }

    const prevSlide = () => {
        if(slideIndex !== 1){
            setSlideIndex(slideIndex - 1)
        }
        else if (slideIndex === 1){
            setSlideIndex(sliderImages.length)
        }
    }

    const moveDot = index => {
        setSlideIndex(index)
    }

    return (
        <div className="container-slider">
            {sliderImages.map((imageObj, index) => {
                if(slideIndex === (index + 1)){
                return (
                    <div
                        key={imageObj.id}
                        className={slideIndex === index + 1 ? "slide active-anim" : "slide"}
                    >
                        <img className='slider-image'
                            src={imageObj.productImageUrl} 
                            alt='product'
                        />
                    </div>
                )}
            })}

            <SliderButtons moveSlide={nextSlide} direction={"next"} />
            <SliderButtons moveSlide={prevSlide} direction={"prev"}/>

            <div className="container-dots">
                {Array.from({length: 5}).map((item, index) => (
                    <div 
                        key={index}
                        onClick={() => moveDot(index + 1)}
                        className={slideIndex === index + 1 ? "dot active" : "dot"}
                    ></div>
                ))}
            </div>
        </div>
    )
}
