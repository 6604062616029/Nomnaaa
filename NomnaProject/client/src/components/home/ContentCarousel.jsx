import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Thumbs } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// รูปสำหรับ Main Carousel
const mainImages = [
  "/images/main1.jpg",
  "/images/main2.jpg",
  "/images/main3.jpg",
  "/images/main4.jpg",
  "/images/main5.jpg"
];

// รูปสำหรับ Thumbnail Carousel
const thumbImages = [
  "/images/thumb1.jpg",
  "/images/thumb2.jpg",
  "/images/thumb3.jpg",
  "/images/thumb4.jpg",
  "/images/thumb5.jpg"
];

const ContentCarousel = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="container mx-auto py-6">
      {/* Main Carousel */}
      <Swiper
        modules={[Pagination, Autoplay, Thumbs]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        thumbs={{ swiper: thumbsSwiper }}
        pagination={{ clickable: true }}
        className="mySwiper h-80 object-cover rounded-md shadow-lg mb-6"
      >
        {mainImages.map((src, i) => (
          <SwiperSlide key={i}>
            <img className="w-full h-full object-cover rounded-md" src={src} alt={`Main Slide ${i}`} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Carousel - เลื่อนอัตโนมัติ */}
      <Swiper
        slidesPerView={5}
        spaceBetween={10}
        loop={true} // วนลูปได้
        autoplay={{ 
          delay: 2000, 
          disableOnInteraction: false 
        }}
        modules={[Autoplay]}
        className="mySwiper object-cover rounded-md"
      >
        {thumbImages.map((src, i) => (
          <SwiperSlide key={i}>
            <img className="rounded-md w-full h-20 object-cover cursor-pointer" src={src} alt={`Thumbnail ${i}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ContentCarousel;
