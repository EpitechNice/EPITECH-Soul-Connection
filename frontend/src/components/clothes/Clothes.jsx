import React, { useState } from 'react';
import SideMenu from "../layout/SideMenu";

const Clothes = () => {
  const users = [
    { id: 1, name: 'Client 1' },
    { id: 2, name: 'Client 2' },
  ];

  const hats = [
    { id: 1, name: 'Chapeau Rouge', category: 'chapeaux', color: 'red' },
    { id: 2, name: 'Chapeau Bleu', category: 'chapeaux', color: 'blue' },
  ];

  const tops = [
    { id: 1, name: 'Haut Vert', category: 'tops', color: 'green' },
    { id: 2, name: 'Haut Jaune', category: 'tops', color: 'yellow' },
  ];

  const bottoms = [
    { id: 1, name: 'Bas Noir', category: 'bottoms', color: 'black' },
    { id: 2, name: 'Bas Blanc', category: 'bottoms', color: 'white' },
  ];

  const shoes = [
    { id: 1, name: 'Chaussures Grises', category: 'shoes', color: 'gray' },
    { id: 2, name: 'Chaussures Marron', category: 'shoes', color: 'brown' },
  ];

  const [selectedUser, setSelectedUser] = useState('');
  const [currentIndex, setCurrentIndex] = useState({
    hats: 0,
    tops: 0,
    bottoms: 0,
    shoes: 0,
  });

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

      <div className="client-menu">
        <label htmlFor="user">Choisissez un client :</label>
        <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
          <option value="">Sélectionner un client</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <div className="carousels">
        <div className="carousel">
          <h2>Chapeaux</h2>
          <div className="carousel-container">
            <button className="button-clothes" onClick={() => prevItem('hats')}>⬅️</button>
            <div className="carousel-item">
              {visibleHats.map((item, index) => (
                <div key={index} className="color-box" style={{ backgroundColor: item.color }}></div>
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
                <div key={index} className="color-box" style={{ backgroundColor: item.color }}></div>
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
                <div key={index} className="color-box" style={{ backgroundColor: item.color }}></div>
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
                <div key={index} className="color-box" style={{ backgroundColor: item.color }}></div>
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
