import React, { useEffect, useState } from 'react';
import SideMenu from "../layout/SideMenu";
import { useGetClothingImgQuery} from '../../redux/api/clothingApi';
import Loader from '../layout/Loader';
import toast from "react-hot-toast";

const Clothes = () => {
  const { data: clothes, isLoading, error, isError } = useGetClothingImgQuery();
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError, error]);

  if (isLoading) return <Loader />;

  const clothesArray = Array.isArray(clothes) ? clothes : clothes?.clothes;

  const toggleClothing = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  }

  const [currentIndex, setCurrentIndex] = useState({
    hats: 0,
    tops: 0,
    bottoms: 0,
    shoes: 0,
  });

  const hats = clothesArray.filter((item) => item.category === 'hats');
  const tops = clothesArray.filter((item) => item.category === 'tops');
  const bottoms = clothesArray.filter((item) => item.category === 'bottoms');
  const shoes = clothesArray.filter((item) => item.category === 'shoes');
  const prevItem = (category) => {
    setCurrentIndex((prevState) => ({
      ...prevState,
      [category]: prevState[category] > 0 ? prevState[category] - 1 : eval(category).length - 1,
    }));
  };

  const nextItem = (category) => {
    setCurrentIndex((prevState) => ({
      ...prevState,
      [category]: prevState[category] < eval(category).length - 1 ? prevState[category] + 1 : 0,
    }));
  };

  const visibleHats = [hats[currentIndex.hats]];
  const visibleTops = [tops[currentIndex.tops]];
  const visibleBottoms = [bottoms[currentIndex.bottoms]];
  const visibleShoes = [shoes[currentIndex.shoes]];

  return (
    <div className="garde-robe-page pages">
      <div>
        <SideMenu />
      </div>
      <h1>Garde Robe Virtuelle</h1>

      <div className="carousels">
        <div className="carousel">
          <h2>Chapeaux</h2>
          <div className="carousel-container">
            <button className="button-clothes" onClick={() => prevItem('hats')}>⬅️</button>
            <div className="carousel-item">
              {visibleHats.map((item, index) => (
                <div key={index} className="image-box">
                  <img src={item.imageUrl} alt={item.name} />
                </div>
              ))}
              <p>{visibleHats[0].name}</p>
            </div>
            <button className="button-clothes" onClick={() => nextItem('hats')}>➡️</button>
            </div>
        </div>

        <div className="carousel">
          <h2>Hauts</h2>
          <div className="carousel-container">
            <button className="button-clothes" onClick={() => prevItem('tops')}>⬅️</button>
            <div className="carousel-item">
              {visibleTops.map((item, index) => (
                <div key={index} className="image-box">
                  <img src={item.imageUrl} alt={item.name} />
                </div>
              ))}
              <p>{visibleTops[0].name}</p>
            </div>
            <button className="button-clothes" onClick={() => nextItem('tops')}>➡️</button>
          </div>
        </div>

        <div className="carousel">
          <h2>Bas</h2>
          <div className="carousel-container">
            <button className="button-clothes" onClick={() => prevItem('bottoms')}>⬅️</button>
            <div className="carousel-item">
              {visibleBottoms.map((item, index) => (
                <div key={index} className="image-box">
                  <img src={item.imageUrl} alt={item.name} />
                </div>
              ))}
              <p>{visibleBottoms[0].name}</p>
            </div>
            <button className="button-clothes" onClick={() => nextItem('bottoms')}>➡️</button>
          </div>
        </div>

        <div className="carousel">
          <h2>Chaussures</h2>
          <div className="carousel-container">
            <button className="button-clothes" onClick={() => prevItem('shoes')}>⬅️</button>
            <div className="carousel-item">
              {visibleShoes.map((item, index) => (
                <div key={index} className="image-box">
                  <img src={item.imageUrl} alt={item.name} />
                </div>
              ))}
              <p>{visibleShoes[0].name}</p>
            </div>
            <button className="button-clothes" onClick={() => nextItem('shoes')}>➡️</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clothes;