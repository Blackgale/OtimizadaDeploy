import { useState, useMemo } from 'react';
import ImageReveal from './ImageReveal';

export default function ProductCarousel({ images, title }: { images: string[]; title: string }) {
  const [current, setCurrent] = useState(0);

  const normalized = useMemo(() => images.filter(Boolean), [images]);
  const currentSrc = normalized[current] ?? normalized[0];

  return (
    <div className="space-y-3">
      {/* principal (auto) */}
      <div className="w-full">
        <img
          src={currentSrc}
          alt={title}
          className="w-full aspect-square object-cover rounded-2xl shadow"
          loading="eager"
        />
      </div>

      {/* thumbs — a primeira aparece direto; as outras exigem interação para carregar */}
      <div className="grid grid-cols-4 gap-2">
        {normalized.map((src, i) => (
          <button
            key={src + i}
            onClick={() => setCurrent(i)}
            className={'rounded-xl overflow-hidden ring-offset-2 ' + (i === current ? 'ring-2 ring-blue-600' : '')}
            title={`Imagem ${i + 1}`}
          >
            {i === 0 ? (
              <img src={src} alt="" className="w-full aspect-square object-cover" />
            ) : (
              <ImageReveal src={src} alt="" auto={false} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
