import { image } from 'framer-motion/client';
import React, { useState, useRef } from 'react';
import { useGesture } from '@use-gesture/react';
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

const Gallery = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  // Position state for each artwork (by id)
  const [positions, setPositions] = useState({});

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
      description: "portrait drawing of a model from a live figure drawing session",
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
      description: "figure drawing of a model from a live figure drawing session",
      image: "/images/figure_drawing_2.jpeg",
      category: "Live session drawings"
    },
    {
      id: 8,
      title: "Figure Drawing 3",
      description: "fabric focused figure drawing session",
      image: "/images/figure_drawing_3.jpeg",
      category: "Live session drawings"
    },
    {
      id: 9,
      title: "Figure Drawing 4",
      description: "cloth on legs focused figure drawing session",
      image: "/images/figure_drawing_4.jpeg",
      category: "Live session drawings"
    },
    {
      id: 10,
      title: "Iffrit",
      description: "Fire Jinn. inspired by FF8",
      image: "/images/Iffrit.PNG",
      category: "Character Illustrations"

    }
    
    // Add more artwork entries here
  ];

  const gameAssets = artworks.filter(art => art.category === "Game Assets");
  const characterIllustrations = artworks.filter(art => art.category === "Character Illustrations");
  const traditionalArt = artworks.filter(art => art.category === "Live session drawings");

  const allSlides = artworks.map(artwork => ({
    src: artwork.image,
    title: artwork.title,
    description: artwork.description,
  }));

  // Plain grid, no dragging
function renderArtworkGrid(artworks) {
  return (
    <div className="gallery-grid">
      {artworks.map((artwork) => (
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
          <img src={artwork.image} alt={artwork.title} draggable={false} />
          <div className="gallery-item-overlay">
            <h3>{artwork.title}</h3>
            <p>{artwork.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// Draggable image for Lightbox slide
function DraggableLightboxImage({ src, alt }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const lastTap = useRef(0);

  const bind = useGesture(
    {
      onDrag: ({ offset: [x, y] }) => setPos({ x, y })
    },
    {
      drag: { from: () => [pos.x, pos.y] }
    }
  );

  // Double-click (desktop)
  const handleDoubleClick = () => {
    setScale(prev => prev === 1 ? 2 : 1);
    setPos({ x: 0, y: 0 });
  };

  // Double-tap (touch)
  const handleTouchEnd = () => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      setScale(prev => prev === 1 ? 6 : 1);
      setPos({ x: 0, y: 0 });
    }
    lastTap.current = now;
  };

  return (
    <img
      src={src}
      alt={alt}
      {...bind()}
      style={{
        position: 'relative',
        left: 0,
        top: 0,
        maxWidth: '100vw',
        maxHeight: '100vh',
        touchAction: 'none',
        cursor: scale > 1 ? 'grab' : 'zoom-in',
        userSelect: 'none',
        zIndex: 10,
        transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
        transition: 'transform 0.1s cubic-bezier(.23,1.02,.59,.99)'
      }}
      draggable={false}
      onDoubleClick={handleDoubleClick}
      onTouchEnd={handleTouchEnd}
    />
  );
}




  return (
    <div className="container">
      <div className="gallery-section">
        <h2 className="section-title">My work</h2>
        
        <div className="art-section">
          <h3>Character Illustrations</h3>
          {renderArtworkGrid(characterIllustrations)}
        </div>
        
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
        render={{
          slide: ({ slide }) => (
            <DraggableLightboxImage src={slide.src} alt={slide.title} />
          )
        }}
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
