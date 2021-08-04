import { useEffect, useState } from 'react';
import './App.css';

export default function App() {
  const boxSpeed = 5, // in milliseconds
    boxAmount = 15, // per row, and per column
    colorSmooth = 0.5, // adjust this for color density between frames
    startingBox = { r: 78, g: 0, b: 112 }; // base color to start with

  const [boxes, setBoxes] = useState([startingBox]),
    [ifIncrement, setIfIncrement] = useState(true);

  const aniMath = (box) => {
    const r = box.r,
      g = box.g,
      b = box.b,
      lighter = { r: r + colorSmooth, g: g + colorSmooth, b: b + colorSmooth },
      darker = { r: r - colorSmooth, g: g - colorSmooth, b: b - colorSmooth };

    if (ifIncrement) {
      // check that none have reached the maximum value for RGB
      if (r < 255 && g < 255 && b < 255) {
        return lighter;
      } else {
        setIfIncrement(false);
        return darker;
      }
    } else {
      // check that none have reached the minimum value for RGB
      if (r > 0 && g > 0 && b > 0) {
        return darker;
      } else {
        setIfIncrement(true);
        return lighter;
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // copy the current state
      let copiedBoxes = [...boxes];
      // remove boxes if necessary
      while (copiedBoxes.length >= Math.pow(boxAmount, 2)) copiedBoxes.shift();
      // add a box to the current state
      const nextBox = aniMath(copiedBoxes[copiedBoxes.length - 1]);
      copiedBoxes.push(nextBox);
      // save changes
      setBoxes(copiedBoxes);
    }, boxSpeed);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line
  }, [boxes]);

  return (
    <div className='App'>
      {boxes.map((box, i) => (
        <div
          key={i}
          className='Box'
          style={{
            width: `${100 / boxAmount}vw`,
            height: `${100 / boxAmount}vh`,
            backgroundColor: `rgb(${box.r}, ${box.g}, ${box.b})`,
          }}
        />
      ))}
    </div>
  );
}
