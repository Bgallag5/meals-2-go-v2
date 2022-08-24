import React, { useState, useRef, useEffect, useCallback } from "react";
import SliderItem from "./SliderItem";

export default function Deals() {
  const [sliderIndex, setSliderIndex] = useState(0);
  const sliderRef = useRef();
  const sliderBtnRight = useRef();
  const sliderBtnLeft = useRef();
  const [btsnDisabled, setBtnsDisabled] = useState(false);

  //click on slider nav Btns
  const handleSliderBtnClick = useCallback((e) => {
    e.preventDefault();
    if (e.target.dataset.direction === "right") {
      setSliderIndex(sliderIndex - 1);
    } else if (e.target.dataset.direction === "left") {
      setSliderIndex((prev) => prev + 1);
    }
  }, [sliderIndex]) 

  //timer + useEffect - disable buttons for 750ms after click
  useEffect(() => {
    setBtnsDisabled(true);
    setTimeout(() => {
      return setBtnsDisabled(false);
    }, 750);

    // clearTimeout(timer);
  }, [sliderIndex]);

  useEffect(() => {
    //when sliderIndex changes - translateX the slider
    sliderRef.current.style.transform = `translateX(calc(${
      sliderIndex * 100
    }%))`;

    //if at start of slider, disable left nav
    if (sliderIndex === 0) {
      sliderBtnLeft.current.disabled = true;
    } else if (sliderIndex < 0) {
      sliderBtnLeft.current.disabled = false;
    }
    sliderBtnRight.current.onclick = (e) => handleSliderBtnClick(e);
  }, [handleSliderBtnClick, sliderIndex]);

  //intersection observer
  useEffect(() => {
    let slides = sliderRef.current.childNodes;

    //observer callback - if last slider element isIntersecting, btnRight returns to first index
    const handleObserve = (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        //if entry is not the last slide - return
        if (
          entry.target !==
          sliderRef.current.childNodes[sliderRef.current.childNodes.length - 1]
        ) {
          return;
        }
        //if the last slide is intersecting, right nav goes back to start
        if (entry?.isIntersecting) {
          sliderBtnRight.current.onclick = () => setSliderIndex(0);
        }
      });
    };
    //declare intersection observer
    const Observer = new IntersectionObserver(handleObserve, {
      rootMargin: "0px",
      threshold: 0.5,
    });

    //observe each slide
    slides.forEach((slide) => {
      Observer.observe(slide);
    });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <h1 className="text-center text-3xl text-primary">This Week&apos;s Deals!</h1>
      <div className="w-full flex flex-row gap-2 items-center justify-center">
        <span
          onClick={() => setSliderIndex(0)}
          className={`${
            sliderIndex === 0 ? "slider-dot--active" : ""
          } slider-dot`}
        ></span>
        <span
          onClick={() => setSliderIndex(-1)}
          className={`${
            sliderIndex === -1 ? "slider-dot--active" : ""
          } slider-dot`}
        ></span>
        <span
          onClick={() => setSliderIndex(-2)}
          className={`${
            sliderIndex === -2 ? "slider-dot--active" : ""
          } slider-dot`}
        ></span>
        <span
          onClick={() => setSliderIndex(-3)}
          className={`${
            sliderIndex === -3 ? "slider-dot--active" : ""
          } slider-dot`}
        ></span>
      </div>
      <div className="container">
        <div ref={sliderRef} className="slider">
          <SliderItem
            title={"Feta and Arugala Pizza"}
            discountStr={"50% off"}
            subtext={"with purchase of a Large Soda (coming soon)"}
            discount={50}
            itemId={5}
            discountType={"item"}
          />
          <SliderItem
            title={" Entire Order"}
            discountStr={"10% off"}
            discount={10}
            itemId={null}
            discountType={"order"}
          />
          <SliderItem
            title={"Any Burger"}
            discountStr={"25% off "}
            subtext={"Not valid in Hawaii"}
            discount={25}
            category={"sandwich"}
            itemId={null}
            discountType={"item"}
          />
          <SliderItem
            title={"Free Appetizer"}
            discountStr={""}
            subtext={"Any starter on the house"}
            discount={100}
            course={"starter"}
            itemId={null}
            discountType={"item"}
          />
          <SliderItem title={"Deal 5"} />
          <SliderItem title={"Deal 6"} />
          <SliderItem title={"Deal 7"} />
          <SliderItem title={"Deal 8"} />
          <SliderItem title={"Deal 9"} />
          <SliderItem title={"Deal 10"} />
          <SliderItem title={"Deal 11"} />
          <SliderItem title={"Deal 12"} />
          <SliderItem title={"Deal 13"} />
          <SliderItem title={"Deal 14"} />
          <SliderItem title={"Deal 15"} />
          <SliderItem title={"Deal 16"} />
        </div>
        <button
          ref={sliderBtnLeft}
          onClick={(e) => handleSliderBtnClick(e)}
          data-direction={"left"}
          className="slider-btn absolute left-0 top-[50%] translate-y-[-50%]"
        >
          <p>{"<"}</p>
        </button>
        <button
          ref={sliderBtnRight}
          disabled={btsnDisabled}
          //   onClick={(e) => handleSliderBtnClick(e)}
          data-direction={"right"}
          className="slider-btn absolute right-0 top-[50%] translate-y-[-50%]"
        >
          <p>{">"}</p>
        </button>
      </div>
    </div>
  );
}
