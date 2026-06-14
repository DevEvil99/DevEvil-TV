import React from 'react';
import SectionHeader from './SectionHeader';
import '../styles/main.css';
import '../styles/Companies.css';

const companies = [
  { name: 'The Walt Disney Company', img: './assets/disney.jpg', url: 'https://en.wikipedia.org/wiki/The_Walt_Disney_Company' },
  { name: 'Warner Bros. Discovery', img: './assets/wb.jpg', url: 'https://en.wikipedia.org/wiki/Warner_Bros._Discovery' },
  { name: 'Netflix Studios', img: './assets/Netflix.webp', url: 'https://en.wikipedia.org/wiki/Netflix_Studios' },
  { name: 'Universal Pictures', img: './assets/Universal.png', url: 'https://en.wikipedia.org/wiki/Universal_Pictures' },
  { name: 'Paramount Pictures', img: './assets/paramount.png', url: 'https://en.wikipedia.org/wiki/Paramount_Pictures' },
  { name: 'Sony Pictures Entertainment', img: './assets/sony.jpg', url: 'https://en.wikipedia.org/wiki/Sony_Pictures_Entertainment' },
  { name: 'Amazon MGM Studios', img: './assets/mgm.png', url: 'https://en.wikipedia.org/wiki/Amazon_MGM_Studios' },
  { name: '20th Television', img: './assets/20.png', url: 'https://en.wikipedia.org/wiki/20th_Television' },
  { name: 'DreamWorks Animation', img: './assets/dream.png', url: 'https://en.wikipedia.org/wiki/DreamWorks_Animation' },
  { name: 'A24 Films', img: './assets/a24.jpg', url: 'https://en.wikipedia.org/wiki/A24' },
];

const TopCompanies = () => (
  <section className="content-section" id="companies">
    <SectionHeader title="Top Companies" icon="fa-solid fa-building" />
    <div className="companies-grid">
      {companies.map((company) => (
        <a
          key={company.name}
          href={company.url}
          target="_blank"
          rel="noreferrer noopener"
          className="company-card"
          style={{ backgroundImage: `url(${company.img})` }}
        >
          <div className="company-card__overlay">
            <p className="company-card__name">{company.name}</p>
            <span className="company-card__link">
              Learn more <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </span>
          </div>
        </a>
      ))}
    </div>
  </section>
);

export default TopCompanies;
