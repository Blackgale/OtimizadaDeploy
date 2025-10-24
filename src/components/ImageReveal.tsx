import { useEffect, useRef, useState } from 'react';
import { metrics } from '../metrics/metrics';

export default function ImageReveal({
  src, alt, className, auto
}: { src: string; alt: string; className?: string; auto?: boolean }) {

  const [show, setShow] = useState(!!auto);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const t0 = useRef<number | null>(null);

  useEffect(() => {
    if (auto && src) {
      t0.current = metrics.now();
      metrics.start('first_image_load');
    }
  }, [auto, src]);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const onLoad = () => {
      if (t0.current != null) {
        metrics.end('first_image_load', { src });
      }
    };

    if (show) {
      if (t0.current == null) {
        t0.current = metrics.now();
        metrics.start('first_image_load');
      }
      img.addEventListener('load', onLoad);
    }

    return () => img?.removeEventListener('load', onLoad);
  }, [show, src]);

  return (
    <div className={className}>
      {!show ? (
        <button
          className="w-full aspect-square bg-black/5 dark:bg-white/10 rounded-xl flex items-center justify-center"
          onClick={() => {
            setShow(true);
            metrics.click('reveal_image', { src });
          }}
          aria-label="Revelar imagem"
        >
          <span className="text-sm">Mostrar imagem</span>
        </button>
      ) : (
        <img
          ref={imgRef}
          loading="eager"
          src={src}
          alt={alt}
          className="w-full h-full object-cover rounded-xl"
        />
      )}
    </div>
  );
}
