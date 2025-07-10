import { useState } from 'react';

export default function DynamicPlayer({ videos, promociones }) {
  const [index, setIndex] = useState(0);

  const horizontalVideos = videos?.filter(v => v.orientacion === 'horizontal') || [];
  const verticalVideos = videos?.filter(v => v.orientacion === 'vertical') || [];

  const horizontalPromos = promociones?.filter(p => p.orientacion === 'horizontal') || [];
  const verticalPromos = promociones?.filter(p => p.orientacion === 'vertical') || [];

  const currentVideo = videos.length > 0 ? videos[index % videos.length] : null;
  

  const currentPromo = promociones[index % promociones.length];
  const promoImage =
  currentVideo.orientacion === 'horizontal'
   ? currentPromo.vertical
    : currentPromo.horizontal;

  if (!currentVideo || !currentPromo) {
    return (
      <div style={{ background: 'black', color: 'white', padding: '2rem' }}>
        Cargando contenido multimedia...
      </div>
    );
  }

  return (
    <div className="container">
      {currentVideo.orientacion === 'horizontal' ? (
        <>
          <div className="media-horizontal">
            <video
                key={index}
                width="100%"
                height="100%"
                src={`https://backend-strapi-dra-alejandra-production.up.railway.app${currentVideo.archivo}`}
                autoPlay
                muted
                playsInline
                preload="auto"
                controls={false}
                onEnded={() => {
                  console.log("Video ended");
                  setIndex(i => i + 1);
                }}
                style={{ objectFit: 'cover' }}
            ></video>
          </div>
          <div className="media-vertical">
            <img
              src={`https://backend-strapi-dra-alejandra-production.up.railway.app${promoImage}`}
              alt="Promoción"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </>
      ) : (
        <>
          <div className="media-horizontal">
            <img
              src={`https://backend-strapi-dra-alejandra-production.up.railway.app${promoImage}`}
              alt="Promoción"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div className="media-vertical">
            <video
              key={index}
              width="100%"
              height="100%"
              src={`https://backend-strapi-dra-alejandra-production.up.railway.app${currentVideo.archivo}`}
              autoPlay
              muted
              playsInline
              preload="auto"
              controls={false}
              onEnded={() => {
                console.log("Video ended");
                setIndex(i => i + 1);
              }}
              style={{ objectFit: 'cover' }}
            ></video>
          </div>
        </>
      )}
    </div>
  );
}