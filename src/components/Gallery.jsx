import React, { useState, useRef, useEffect } from 'react';
import { motion, animate, useSpring } from 'framer-motion';
import { useGesture } from '@use-gesture/react';
import Lightbox from "yet-another-react-lightbox";
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
  const [bounds, setBounds] = useState({ x: 0, y: 0 });
  const lastTap = useRef(0);
  const imgRef = useRef(null);
  const containerRef = useRef(null);

  // Calculate bounds after image loads or scale changes
  React.useEffect(() => {
    const updateBounds = () => {
      const img = imgRef.current;
      const container = containerRef.current;
      if (!img || !container) return;
      
      // Calculate the scaled dimensions
      const imgWidth = img.naturalWidth * scale;
      const imgHeight = img.naturalHeight * scale;
      const contWidth = container.offsetWidth;
      const contHeight = container.offsetHeight;
      
      // Calculate the maximum allowed movement in each direction
      const maxX = Math.max(0, (imgWidth - contWidth) / 2);
      const maxY = Math.max(0, (imgHeight - contHeight) / 2);
      
      setBounds({ x: maxX, y: maxY });
      
      // Ensure current position stays within new bounds
      setPos(p => ({
        x: clamp(p.x, -maxX, maxX),
        y: clamp(p.y, -maxY, maxY)
      }));
    };
    
    updateBounds();
    
    const resizeObserver = new ResizeObserver(updateBounds);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    return () => {
      resizeObserver.disconnect();
    };
  }, [scale, src]);

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  const bind = useGesture(
    {
      onDrag: ({ offset: [x, y], last }) => {
        if (scale > 1) {
          // When zoomed in, allow free movement within bounds
          setPos({
            x: x,
            y: y
          });
        } else {
          // When not zoomed, allow movement but return to center
          setPos({
            x: x,
            y: y
          });
          
          if (last) {
            // Simple animation back to center when not zoomed
            motion.animate(pos.x, 0, {
              type: "spring",
              duration: 0.5,
              bounce: 0.2,
              onUpdate: (latest) => setPos(prev => ({ ...prev, x: latest }))
            });
            
            motion.animate(pos.y, 0, {
              type: "spring",
              duration: 0.5,
              bounce: 0.2,
              onUpdate: (latest) => setPos(prev => ({ ...prev, y: latest }))
            });
          }
        }
      }
    },
    {
      drag: {
        from: () => [pos.x, pos.y],
        bounds: scale > 1 ? {
          left: -bounds.x,
          right: bounds.x,
          top: -bounds.y,
          bottom: bounds.y
        } : undefined,
        rubberband: true
      }
    }
  );

  // Double-click (desktop)
  const handleDoubleClick = () => {
    setScale(prev => prev === 1 ? 3.5 : 1);
    setPos({ x: 0, y: 0 });
  };

  // Double-tap (touch)
  const handleTouchEnd = () => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      setScale(prev => prev === 1 ? 3.5 : 1);
      setPos({ x: 0, y: 0 });
    }
    lastTap.current = now;
  };

  const resetZoom = () => {
    setScale(1);
    setPos({ x: 0, y: 0 });
  };

  const resetPosition = () => setPos({ x: 0, y: 0 });

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <motion.img
        ref={imgRef}
        src={src}
        alt={alt}
        {...bind()}
        animate={{
          x: pos.x,
          y: pos.y,
          scale: scale
        }}
        // adjust these values for better movement
        transition={{
          type: "spring",
          bounce: 0.96,     // Less bounce for snappier movement
          duration: 0.3,   // Shorter duration
          mass: 0.28,       // Less mass for faster response
          damping: 15      // More damping for less oscillation
        }}
        style={{
          width: 'auto',
          height: 'auto',
          maxWidth: '90vw',
          maxHeight: '90vh',
          touchAction: 'none',
          cursor: scale > 1 ? 'grab' : 'zoom-in',
          userSelect: 'none',
          pointerEvents: 'auto',
          zIndex: 10,
          objectFit: 'contain'
        }}
        draggable={false}
        onDoubleClick={handleDoubleClick}
        onTouchEnd={handleTouchEnd}
        onLoad={() => {
          // Recalculate bounds on image load
          const img = imgRef.current;
          const container = containerRef.current;
          if (!img || !container) return;
          const imgWidth = img.naturalWidth * scale;
          const imgHeight = img.naturalHeight * scale;
          const contWidth = container.offsetWidth;
          const contHeight = container.offsetHeight;
          const maxX = Math.max(0, (imgWidth - contWidth) / 2);
          const maxY = Math.max(0, (imgHeight - contHeight) / 2);
          setBounds({ x: maxX, y: maxY });
        }}
      />
      {scale > 1 && (
        <button
          onClick={resetZoom}
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            zIndex: 20,
            padding: '6px 12px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: 'none',
            background: 'rgba(0,0,0,0.7)',
            color: 'white',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
          }}
        >
          Reset zoom
        </button>
      )}
      <button
        onClick={resetPosition}
        style={{
          position: 'absolute',
          top: 60,
          left: 20,
          zIndex: 20,
          padding: '6px 12px',
          fontSize: '1rem',
          borderRadius: '8px',
          border: 'none',
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
        }}
      >
        Re-center
      </button>
    </div>
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
