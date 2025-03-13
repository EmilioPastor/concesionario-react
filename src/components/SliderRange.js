// src/components/SliderRange.js
import ReactSlider from 'react-slider';

const SliderRange = (props) => {
  return (
    <ReactSlider
      className="horizontal-slider"
      thumbClassName="slider-thumb"
      trackClassName="slider-track"
      {...props}
    />
  );
};

export default SliderRange;  // Exportar como default