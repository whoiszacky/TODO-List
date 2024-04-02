import { useState, useEffect } from 'react';
const Fetch = () => {
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    fetch('https://zenquotes.io/api/today', {mode: "no-cors"})
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setPhotos(data);
      });
  }, []);
  return (
    <div>
        <div>{photos.q}</div>
    </div>
  );
};
export default Fetch;