import React, { useState, useEffect } from 'react';
import '../../styles/Btn.css';

const defaultThemeColors = {
  main: '#5f22d9',
  sec: '#ac73ff',
  text: '#e7e7e7',
  bg: '#080808',
  bg2: '#19161f',
};

const colorFields = [
  { key: 'bg', label: 'Background', icon: 'fa-solid fa-fill-drip' },
  { key: 'bg2', label: 'Surface', icon: 'fa-solid fa-layer-group' },
  { key: 'main', label: 'Primary', icon: 'fa-solid fa-palette' },
  { key: 'sec', label: 'Accent', icon: 'fa-solid fa-wand-magic-sparkles' },
  { key: 'text', label: 'Text', icon: 'fa-solid fa-font' },
];

const SideButtons = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [themeColors, setThemeColors] = useState(defaultThemeColors);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    try {
      const storedColors = JSON.parse(localStorage.getItem('themeColors'));
      if (storedColors) setThemeColors(storedColors);
    } catch {
      // ignore invalid storage
    }
  }, []);

  useEffect(() => {
    for (const [key, value] of Object.entries(themeColors)) {
      document.documentElement.style.setProperty(`--${key}`, value);
    }
  }, [themeColors]);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleColorChange = (colorKey, value) => {
    setThemeColors((prev) => ({ ...prev, [colorKey]: value }));
  };

  const applyTheme = () => {
    localStorage.setItem('themeColors', JSON.stringify(themeColors));
    setIsModalOpen(false);
  };

  const resetToDefault = () => {
    setThemeColors(defaultThemeColors);
    localStorage.removeItem('themeColors');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="sidebtn">
        <ul>
          <li>
            <button
              type="button"
              className="sidebtn__action"
              onClick={() => setIsModalOpen(true)}
              aria-label="Theme settings"
            >
              <i className="fas fa-gear"></i>
            </button>
          </li>
          <li>
            <button
              type="button"
              className="sidebtn__action"
              onClick={() => window.open('', '_blank')}
              aria-label="Open Discord"
            >
              <i className="fab fa-discord"></i>
            </button>
          </li>
          {showScrollTop && (
            <li>
              <button
                type="button"
                className="sidebtn__action sidebtn__action--scroll"
                onClick={scrollToTop}
                aria-label="Scroll to top"
              >
                <i className="fas fa-chevron-up"></i>
              </button>
            </li>
          )}
        </ul>
      </div>

      {isModalOpen && (
        <div className="theme-modal" onClick={() => setIsModalOpen(false)} role="presentation">
          <div
            className="theme-modal__panel"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-labelledby="theme-modal-title"
          >
            <div className="theme-modal__header">
              <div>
                <h2 id="theme-modal-title">Theme Settings</h2>
                <p>Customize DevEvil TV to match your vibe</p>
              </div>
              <button
                type="button"
                className="theme-modal__close"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close"
              >
                <i className="fas fa-xmark"></i>
              </button>
            </div>

            <div
              className="theme-modal__preview"
              style={{
                background: `linear-gradient(135deg, ${themeColors.main}, ${themeColors.sec})`,
                color: themeColors.text,
              }}
            >
              <span>Live preview</span>
              <div className="theme-modal__preview-dots">
                <i className="fa-solid fa-circle" style={{ color: themeColors.bg }}></i>
                <i className="fa-solid fa-circle" style={{ color: themeColors.bg2 }}></i>
                <i className="fa-solid fa-circle" style={{ color: themeColors.text }}></i>
              </div>
            </div>

            <div className="theme-modal__grid">
              {colorFields.map(({ key, label, icon }) => (
                <label key={key} className="theme-color-field">
                  <span className="theme-color-field__label">
                    <i className={icon}></i> {label}
                  </span>
                  <span className="theme-color-field__input">
                    <span
                      className="theme-color-field__swatch"
                      style={{ backgroundColor: themeColors[key] }}
                    />
                    <input
                      type="color"
                      value={themeColors[key]}
                      onChange={(e) => handleColorChange(key, e.target.value)}
                    />
                    <code className="theme-color-field__hex">{themeColors[key]}</code>
                  </span>
                </label>
              ))}
            </div>

            <div className="theme-modal__actions">
              <button type="button" className="theme-modal__btn theme-modal__btn--ghost" onClick={resetToDefault}>
                <i className="fa-solid fa-rotate-left"></i> Reset
              </button>
              <button type="button" className="theme-modal__btn theme-modal__btn--primary" onClick={applyTheme}>
                <i className="fa-solid fa-check"></i> Apply Theme
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SideButtons;
