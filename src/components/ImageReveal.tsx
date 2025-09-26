import { useState } from 'react'

export default function ImageReveal({ src, alt, className }: { src:string; alt:string; className?:string }) {
  const [show, setShow] = useState(false)
  return (
    <div className={className}>
      {!show ? (
        <button
          className="w-full aspect-square bg-black/5 dark:bg-white/10 rounded-xl flex items-center justify-center"
          onClick={() => setShow(true)}
          aria-label="Revelar imagem">
          <span className="text-sm">Mostrar imagem</span>
        </button>
      ) : (
        <img loading="eager" src={src} alt={alt} className="w-full h-full object-cover rounded-xl"/>
      )}
    </div>
  )
}
