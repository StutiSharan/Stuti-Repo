import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import ReactPlayer from 'react-player';

export default function Carousel({ images = [], videoUrl }) {
  return (
    <Swiper navigation={true} modules={[Navigation]} className="mySwiper rounded-xl">
      {images.map((src, i) => (
        <SwiperSlide key={i}>
          <img src={src} alt={`slide-${i}`} className="w-full h-80 object-cover hover:scale-105 transition-transform" />
        </SwiperSlide>
      ))}
      {videoUrl && (
        <SwiperSlide>
          <ReactPlayer url={videoUrl} width="100%" height="320px" controls />
        </SwiperSlide>
      )}
    </Swiper>
  );
}
