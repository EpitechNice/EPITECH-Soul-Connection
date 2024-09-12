import React, { useState, useEffect } from 'react';
import SideMenu from "../layout/SideMenu";
import { useGetCustomersQuery } from "../../redux/api/customerApi"; // Import from customerApi for users
import { useGetClothesQuery } from "../../redux/api/clothingApi"; // Import from clothingApi for clothes

const Clothes = () => {
  const { data: users, isLoading: usersLoading } = useGetCustomersQuery();
  const [selectedUser, setSelectedUser] = useState('');

  // State to hold clothes for the selected user
  const [userClothes, setUserClothes] = useState({ hats: [], tops: [], bottoms: [], shoes: [] });
  
  const [currentIndex, setCurrentIndex] = useState({
    hats: 0,
    tops: 0,
    bottoms: 0,
    shoes: 0,
  });

  // Fetch clothes when user is selected
  const { data: clothesData, isLoading: clothesLoading } = useGetClothesQuery(selectedUser, {
    skip: !selectedUser // Skip query if no user is selected
  });

  useEffect(() => {
    if (clothesData) {
      // Separate clothes into categories: hats, tops, bottoms, shoes
      const hats = clothesData.filter(item => item.category === 'chapeaux');
      const tops = clothesData.filter(item => item.category === 'tops');
      const bottoms = clothesData.filter(item => item.category === 'bottoms');
      const shoes = clothesData.filter(item => item.category === 'shoes');
      
      setUserClothes({ hats, tops, bottoms, shoes });
    }
  }, [clothesData]);

  const prevItem = (category) => {
    setCurrentIndex((prevState) => ({
      ...prevState,
      [category]: prevState[category] > 0 ? prevState[category] - 1 : userClothes[category].length - 1,
    }));
  };

  const nextItem = (category) => {
    setCurrentIndex((prevState) => ({
      ...prevState,
      [category]: prevState[category] < userClothes[category].length - 1 ? prevState[category] + 1 : 0,
    }));
  };

  if (usersLoading || clothesLoading) {
    return <div>Chargement...</div>;
  }

  const visibleHats = userClothes.hats[currentIndex.hats] ? [userClothes.hats[currentIndex.hats]] : [];
  const visibleTops = userClothes.tops[currentIndex.tops] ? [userClothes.tops[currentIndex.tops]] : [];
  const visibleBottoms = userClothes.bottoms[currentIndex.bottoms] ? [userClothes.bottoms[currentIndex.bottoms]] : [];
  const visibleShoes = userClothes.shoes[currentIndex.shoes] ? [userClothes.shoes[currentIndex.shoes]] : [];

  return (
    <div className="garde-robe-page pages">
      <div>
        <SideMenu />
      </div>
      <h1>Garde Robe Virtuelle</h1>

      {/* Menu de sélection des utilisateurs */}
      <div className="client-menu">
        <label htmlFor="user">Choisissez un client :</label>
        <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
          <option value="">Sélectionner un client</option>
          {users && users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      {/* Carrousels des vêtements */}
      <div className="carousels">
        <div className="carousel">
          <h2>Chapeaux</h2>
          <div className="carousel-container">
            <button className="button-clothes" onClick={() => prevItem('hats')}>⬅️</button>
            <div className="carousel-item">
              {visibleHats.length > 0 ? visibleHats.map((item, index) => (
                <div key={index}>
                  <img src={item.imageUrl} alt={item.name} style={{ width: '100px' }} />
                  <p>{item.name}</p>
                </div>
              )) : <p>Aucun chapeau disponible</p>}
            </div>
            <button className="button-clothes" onClick={() => nextItem('hats')}>➡️</button>
          </div>
        </div>

        <div className="carousel">
          <h2>Hauts</h2>
          <div className="carousel-container">
            <button className="button-clothes" onClick={() => prevItem('tops')}>⬅️</button>
            <div className="carousel-item">
              {visibleTops.length > 0 ? visibleTops.map((item, index) => (
                <div key={index}>
                  <img src={item.imageUrl} alt={item.name} style={{ width: '100px' }} />
                  <p>{item.name}</p>
                </div>
              )) : <p>Aucun haut disponible</p>}
            </div>
            <button className="button-clothes" onClick={() => nextItem('tops')}>➡️</button>
          </div>
        </div>

        <div className="carousel">
          <h2>Bas</h2>
          <div className="carousel-container">
            <button className="button-clothes" onClick={() => prevItem('bottoms')}>⬅️</button>
            <div className="carousel-item">
              {visibleBottoms.length > 0 ? visibleBottoms.map((item, index) => (
                <div key={index}>
                  <img src={item.imageUrl} alt={item.name} style={{ width: '100px' }} />
                  <p>{item.name}</p>
                </div>
              )) : <p>Aucun bas disponible</p>}
            </div>
            <button className="button-clothes" onClick={() => nextItem('bottoms')}>➡️</button>
          </div>
        </div>

        <div className="carousel">
          <h2>Chaussures</h2>
          <div className="carousel-container">
            <button className="button-clothes" onClick={() => prevItem('shoes')}>⬅️</button>
            <div className="carousel-item">
              {visibleShoes.length > 0 ? visibleShoes.map((item, index) => (
                <div key={index}>
                  <img src={item.imageUrl} alt={item.name} style={{ width: '100px' }} />
                  <p>{item.name}</p>
                </div>
              )) : <p>Aucune chaussure disponible</p>}
            </div>
            <button className="button-clothes" onClick={() => nextItem('shoes')}>➡️</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clothes;
