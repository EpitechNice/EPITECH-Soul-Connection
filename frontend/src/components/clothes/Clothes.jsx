import React, { useEffect, useState } from 'react';
import { useGetClothesQuery } from '../../redux/api/clothingApi';
import Loader from '../layout/Loader';
import toast from "react-hot-toast";

const Clothes = () => {
  const { data: clothes, isLoading, error, isError } = useGetClothesQuery();

  const [currentIndex, setCurrentIndex] = useState({
    hats: 0,
    tops: 0,
    bottoms: 0,
    shoes: 0,
  });

  useEffect(() => {
    if (isError) {
      const errorMsg = error?.data?.detail?.[0]?.msg || "An error occurred.";
      toast.error(errorMsg);
    }
  }, [isError, error]);

  if (isLoading) return <Loader />;

  const clothesArray = Array.isArray(clothes) ? clothes : clothes?.clothes || [];

  const categories = ['hats', 'tops', 'bottoms', 'shoes'];
  const categoryItems = categories.reduce((acc, category) => {
    acc[category] = clothesArray.filter(item => item.category === category);
    return acc;
  }, {});

  const changeItem = (category, direction) => {
    setCurrentIndex(prevState => {
      const items = categoryItems[category];
      if (!items.length) return prevState;
      const maxIndex = items.length - 1;
      const currentIndex = prevState[category];
      const newIndex = direction === 'next'
        ? (currentIndex < maxIndex ? currentIndex + 1 : 0)
        : (currentIndex > 0 ? currentIndex - 1 : maxIndex);

      return { ...prevState, [category]: newIndex };
    });
  };

  return (
    <div className="garde-robe-page pages">
      <h1>Garde Robe Virtuelle</h1>

      <div className="carousels">
        {categories.map(category => {
          const items = categoryItems[category];
          const currentItem = items[currentIndex[category]] || {};
          return (
            <div key={category} className="carousel">
              <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
              <div className="carousel-container">
                <button
                  className="button-clothes"
                  onClick={() => changeItem(category, 'prev')}
                >
                  ⬅️
                </button>
                <div className="carousel-item">
                  {currentItem.imageUrl ? (
                    <div className="image-box">
                      <img src={currentItem.imageUrl} alt={currentItem.name} />
                    </div>
                  ) : (
                    <p>No image available</p>
                  )}
                  <p>{currentItem.name || "No name available"}</p>
                </div>
                <button
                  className="button-clothes"
                  onClick={() => changeItem(category, 'next')}
                >
                  ➡️
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Clothes;
