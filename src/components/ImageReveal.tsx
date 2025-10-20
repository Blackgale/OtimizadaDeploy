import { useEffect, useState } from 'react';

type Props = {
  src: string;
  alt: string;
  className?: string;
  /** quando true, mostra a imagem imediatamente */
  auto?: boolean;
};

export default function ImageReveal({ src, alt, className, auto }: Props) {
  const [show, setShow] = useState(!!auto);

  useEffect(() => {
    if (auto) setShow(true);
  }, [auto]);

  return (
    <div className={className}>
      {!show ? (
        <button
          className="w-full aspect-square bg-black/5 dark:bg-white/10 rounded-xl flex items-center justify-center"
          onClick={() => setShow(true)}
          aria-label="Revelar imagem"
        >
          <span className="text-sm">Mostrar imagem</span>
        </button>
      ) : (
        <img loading="eager" src={src} alt={alt} className="w-full h-full object-cover rounded-xl" />
      )}
    </div>
  );
}
