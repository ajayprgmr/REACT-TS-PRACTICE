import React, { useState, useTransition } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './viewTransition.css';

interface ImageInfo {
  id: number;
  url: string;
  title: string;
  description: string;
}

const images: ImageInfo[] = [
  {
    id: 1,
    url: 'https://placehold.co/400x300/FF6B6B/FFFFFF?text=Image+1',
    title: 'Image 1',
    description: 'Beautiful landscape with mountains',
  },
  {
    id: 2,
    url: 'https://placehold.co/400x300/4ECDC4/FFFFFF?text=Image+2',
    title: 'Image 2',
    description: 'Ocean view at sunset',
  },
  {
    id: 3,
    url: 'https://placehold.co/400x300/95E1D3/FFFFFF?text=Image+3',
    title: 'Image 3',
    description: 'Forest pathway in autumn',
  },
  {
    id: 4,
    url: 'https://placehold.co/400x300/F38181/FFFFFF?text=Image+4',
    title: 'Image 4',
    description: 'City skyline at night',
  },
  {
    id: 5,
    url: 'https://placehold.co/400x300/AA96DA/FFFFFF?text=Image+5',
    title: 'Image 5',
    description: 'Desert dunes at dawn',
  },
  {
    id: 6,
    url: 'https://placehold.co/400x300/FCBAD3/FFFFFF?text=Image+6',
    title: 'Image 6',
    description: 'Tropical beach paradise',
  },
  {
    id: 7,
    url: 'https://placehold.co/400x300/FFFFD2/000000?text=Image+7',
    title: 'Image 7',
    description: 'Snow-capped mountains',
  },
  {
    id: 8,
    url: 'https://placehold.co/400x300/A8E6CF/000000?text=Image+8',
    title: 'Image 8',
    description: 'Meadow with wildflowers',
  },
];

// Helper function to use View Transition API with React
const useViewTransition = () => {
  const [isPending, startTransition] = useTransition();

  const startViewTransition = React.useCallback((callback: () => void) => {
    // Use View Transition API if supported
    if ('startViewTransition' in document && typeof document.startViewTransition === 'function') {
      document.startViewTransition(() => {
        startTransition(callback);
      });
    } else {
      // Fallback: use React's useTransition
      startTransition(callback);
    }
  }, [startTransition]);

  return { startViewTransition, isPending };
};

export const ViewTransition: React.FC = () => {
  const [hoveredImage, setHoveredImage] = useState<ImageInfo | null>(null);
  const [hoverPosition, setHoverPosition] = useState<{ top: number; left: number } | null>(null);
  const { startViewTransition } = useViewTransition();

  const handleMouseEnter = (image: ImageInfo, event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const position = {
      top: rect.top,
      left: rect.left,
    };
    
    // Use View Transition API for smooth transitions
    startViewTransition(() => {
      setHoverPosition(position);
      setHoveredImage(image);
    });
  };

  const handleMouseLeave = () => {
    // Use View Transition API for smooth transitions
    startViewTransition(() => {
      setHoveredImage(null);
      setHoverPosition(null);
    });
  };

  return (
    <div className="view-transition-container">
      <h1 className="carousel-title">Image Carousel with View Transition API</h1>
      
      <div className="swiper-wrapper-container">
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: '.swiper-button-prev-custom',
            nextEl: '.swiper-button-next-custom',
          }}
          spaceBetween={30}
          slidesPerView="auto"
          className="carousel-swiper"
        >
          {images.map((image) => (
            <SwiperSlide key={image.id} className="carousel-slide">
              <div
                className="image-container"
                onMouseEnter={(e) => handleMouseEnter(image, e)}
                onMouseLeave={handleMouseLeave}
                style={{ viewTransitionName: `image-${image.id}` }}
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="carousel-image"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button className="swiper-button-prev-custom" aria-label="Previous slide">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button className="swiper-button-next-custom" aria-label="Next slide">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Hover Info Overlay */}
      {hoveredImage && hoverPosition && (
        <div
          className="image-info-overlay"
          style={{
            top: `${hoverPosition.top}px`,
            left: `${hoverPosition.left}px`,
            viewTransitionName: `info-${hoveredImage.id}`,
          }}
        >
          <div className="info-content">
            <h3 className="info-title">{hoveredImage.title}</h3>
            <p className="info-description">{hoveredImage.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};
