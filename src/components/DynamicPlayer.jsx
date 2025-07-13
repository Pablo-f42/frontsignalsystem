import { useEffect, useState } from 'react';

export default function DynamicPlayer() {
  const [index, setIndex] = useState(0);
  const [videos, setVideos] = useState([]);
  const [promociones, setPromociones] = useState([]);

  const fetchData = async () => {
    try {
      const resVideos = await fetch('https://backend-strapi-dra-alejandra-production.up.railway.app/api/vies?sort=id&populate=*');
      const videoData = await resVideos.json();
      const videoList = videoData.data.map(v => ({
        id: v.id,
        archivo: v.attributes?.Video?.url,
        orientacion: v.attributes?.orientacion
      }));

      const resPromos = await fetch('https://backend-strapi-dra-alejandra-production.up.railway.app/api/promocions?sort=id&populate=*');
      const promoData = await resPromos.json();
      const promoList = promoData.data.map(p => ({
        id: p.id,
        orientacion: p.attributes?.orientacion,
        horizontal: p.attributes?.Horizontal?.url,
        vertical: p.attributes?.Vertical?.url
      }));

      setVideos(videoList);
      setPromociones(promoList);
    } catch (error) {
      console.error("Error al cargar multimedia:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 60000); // recarga cada 60 segundos

    return () => clearInterval(interval);
  }, []);

  const currentVideo = videos.length > 0 ? videos[index % videos.length] : null;
  const currentPromo = promociones.length > 0 ? promociones[index % promociones.length] : null;
  const promoImage = currentVideo?.orientacion === 'horizontal'
    ? currentPromo?.vertical
    : currentPromo?.horizontal;

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
              src={currentVideo.archivo}
              autoPlay
              muted={false}
              playsInline
              preload="auto"
              controls={false}
              onEnded={() => setIndex(i => i + 1)}
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="media-vertical">
            <img
              src={promoImage}
              alt="Promoción"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </>
      ) : (
        <>
          <div className="media-horizontal">
            <img
              src={promoImage}
              alt="Promoción"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div className="media-vertical">
            <video
              key={index}
              width="100%"
              height="100%"
              src={currentVideo.archivo}
              autoPlay
              muted={false}
              playsInline
              preload="auto"
              controls={false}
              onEnded={() => setIndex(i => i + 1)}
              style={{ objectFit: 'cover' }}
            />
          </div>
        </>
      )}
    </div>
  );
}