import React, { useState, useEffect } from 'react';
import '../../styles/Btn.css';

const NavBar = () => {
  const defaultThemeColors = {
    main: '#5f22d9',
    sec: '#ac73ff',
    text: '#e7e7e7',
    bg: '#080808',
    bg2: '#19161f',
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [themeColors, setThemeColors] = useState(defaultThemeColors);

  useEffect(() => {
    const storedColors = JSON.parse(localStorage.getItem('themeColors'));
    if (storedColors) {
      setThemeColors(storedColors);
    }
  }, []);

  useEffect(() => {
    for (const [key, value] of Object.entries(themeColors)) {
      document.documentElement.style.setProperty(`--${key}`, value);
    }
  }, [themeColors]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleColorChange = (colorKey, value) => {
    setThemeColors((prevColors) => ({
      ...prevColors,
      [colorKey]: value,
    }));
  };

  const applyTheme = () => {
    localStorage.setItem('themeColors', JSON.stringify(themeColors));
    closeModal();
  };

  const resetToDefault = () => {
    setThemeColors(defaultThemeColors);
  };

  return (
    <div>
      <div className="sidebtn">
        <ul>
          <li onClick={openModal}><i className='fas fa-gear'></i></li>
          <a href="#home"><li><i className='fas fa-location-arrow-up'></i></li></a>
        </ul>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}><i className='fas fa-xmark'></i></span>
            <h2>Theme Settings</h2>

			<label htmlFor="bgColor">Main Background Color:</label>
            <input
              type="color"
              id="bgColor"
              name="bgColor"
              value={themeColors.bg}
              onChange={(e) => handleColorChange('bg', e.target.value)}
            />

<label htmlFor="bg2Color">Secondary Background Color:</label>
            <input
              type="color"
              id="bg2Color"
              name="bg2Color"
              value={themeColors.bg2}
              onChange={(e) => handleColorChange('bg2', e.target.value)}
            />

            <label htmlFor="mainColor">Main Color:</label>
            <input
              type="color"
              id="mainColor"
              name="mainColor"
              value={themeColors.main}
              onChange={(e) => handleColorChange('main', e.target.value)}
            />

            <label htmlFor="secColor">Secondary Color:</label>
            <input
              type="color"
              id="secColor"
              name="secColor"
              value={themeColors.sec}
              onChange={(e) => handleColorChange('sec', e.target.value)}
            />

            <label htmlFor="textColor">Text Color:</label>
            <input
              type="color"
              id="textColor"
              name="textColor"
              value={themeColors.text}
              onChange={(e) => handleColorChange('text', e.target.value)}
            />

            
            <button onClick={applyTheme}>Apply Theme</button>
            <button onClick={resetToDefault}>Reset to Default</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
