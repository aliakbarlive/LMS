import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface SliderSettings {
  dots?: boolean;
  infinite?: boolean;
  speed?: number;
  slidesToShow?: number;
  slidesToScroll?: number;
  responsive?: Array<{
    breakpoint: number;
    settings: SliderSettings;
  }>;
}

interface Props<T> {
  items: T[];
  renderCard: (item: T) => JSX.Element;
  settings?: SliderSettings;
 
}

function CustomSlider<T>({ items, renderCard, settings}: Props<T>) {
  const defaultSettings: SliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
  };
  const mergedSettings: SliderSettings = { ...defaultSettings, ...settings };
  return (
    <Slider {...mergedSettings}>
      {items.map((item, index) => (
        <div key={index}  className='ps-4'>
          {renderCard(item)}
          
        </div>
      ))}
    </Slider>
  );
}

export default CustomSlider;
