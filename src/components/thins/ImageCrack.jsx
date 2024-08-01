import React, { useState, useEffect } from 'react'
import { colorArray, getFirstLetter, getRandomText } from '../../minst';

const ImageCrack = ({ name }) => {
    const [imgSrc, setImgSrc] = useState(`/${name.replace(/\s/g, "").toLowerCase()}.png`);
    const [hasError, setHasError] = useState(false);
  
    useEffect(() => {
      // Set a default placeholder image URL if needed
      setImgSrc(`/${name.replace(/\s/g, "").toLowerCase()}.png`);
      setHasError(false);
    }, [name]);
  
    return (
      <div className="img-contain" id='img-contain'>
        {hasError ? (
          <p style={{ backgroundColor: `#${getRandomText(colorArray)}` }}>{getFirstLetter(name)}</p> // Replace with your desired placeholder
        ) : (
          <img
            src={imgSrc}
            alt={`banffpay ${name}`} 
            onError={() => setHasError(true)}
            onLoad={() => setHasError(false)}
          />
        )}
      </div>
    );
};


export default ImageCrack
