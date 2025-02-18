import React, { useState } from 'react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const Gallery = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const artworks = [
    {
      id: 1,
      title: "Green bat",
      description: "Image asset of creature made for a game",
      image: "/images/IMG_0950.png",
      category: "Game Assets"
    },
    {
      id: 2,
      title: "Lion Hunter",
      description: "Image asset made for a game",
      image: "/images/Lion_hunter.png",
      category: "Game Assets"
    },
    {
      id: 3,
      title: "figure drawing 1",
      description: "portrait drawing of a model from alive figure drawing session",
      image: "/images/IMG_0958.jpg",
      category: "Live session drawings"
    },
    {
      id: 4,
      title: "Red Cultist",
      description: "Image asset made for a game",
      image: "/images/red_cultist.png",
      category: "Game Assets"
    },
    {
      id: 5,
      title: "Bluu Goo",
      description: "Image asset made for a game",
      image: "/images/IMG_0946.png",
      category: "Game Assets"
    },
    {
      id: 6,
      title: "Hecterra",
      description: "Image asset made for a game",
      image: "/images/Hecterra.png",
      category: "Game Assets"
    },
    {
      id: 7,
      title: "Figure Drawing 2",
      description: "Image asset made for a game",
      image: "/images/figure_drawing_2.jpeg",
      category: "Live session drawings"
    },
    {
      id: 8,
      title: "Figure Drawing 3",
      description: "Image asset made for a game",
      image: "/images/figure_drawing_3.jpeg",
      category: "Live session drawings"
    },
    {
      id: 9,
      title: "Figure Drawing 4",
      description: "Image asset made for a game",
      image: "/images/figure_drawing_4.jpeg",
      category: "Live session drawings"
    },
    
    // Add more artwork entries here
  ];

  const gameAssets = artworks.filter(art => art.category === "Game Assets");
  const traditionalArt = artworks.filter(art => art.category === "Live session drawings");

  const allSlides = artworks.map(artwork => ({
    src: artwork.image,
    title: artwork.title,
    description: artwork.description,
  }));

  const renderArtworkGrid = (artworks) => (
    <div className="gallery-grid">
      {artworks.map((artwork, index) => (
        <div 
          key={artwork.id} 
          className="gallery-item"
          onClick={() => {
            // Find the index in the full artworks array
            const fullIndex = allSlides.findIndex(slide => slide.src === artwork.image);
            setPhotoIndex(fullIndex);
            setIsOpen(true);
          }}
        >
          <img src={artwork.image} alt={artwork.title} />
          <div className="gallery-item-overlay">
            <h3>{artwork.title}</h3>
            <p>{artwork.description}</p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="container">
      <div className="gallery-section">
        <h2 className="section-title">My work</h2>
        
        <div className="art-section">
          <h3>Game Assets</h3>
          {renderArtworkGrid(gameAssets)}
        </div>

        <div className="art-section">
          <h3>Live session drawings</h3>
          {renderArtworkGrid(traditionalArt)}
        </div>
      </div>

      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        index={photoIndex}
        slides={allSlides}
      />

      <div className="gallery-section" >
        <h2 className="section-title">Game Downloads</h2>
        <div className="download-section">
          <div className="download-info">
            <h3>Vionarch</h3>
            <p>A turn based card game.</p>
            <ul className="download-details">
              <li>Version: 1.0.0</li>
              <li>Size: 65.6 MB</li>
              <li>Windows Compatible <p style={{ color: 'red' }}>ONLY</p></li>
              <li>Format: ZIP Archive (Extract after downloading)</li>
            </ul>
          </div>
          {/* v keep this up to date with the latest versions of the game v */}
          <a 
            href={`${window.location.origin}/downloads/vionarch.zip`}
            download
            className="download-button"
            onClick={(e) => {
              e.preventDefault();
              window.open(`${window.location.origin}/downloads/vionarch.zip`, '_blank');
              console.log('Download started');
            }}
          >
            Download Vionarch (ZIP)
          </a>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
