export type ColorKey = 'red'|'green'|'blue'|'yellow'|'purple'|'cyan'|'gray'|'black'|'darkgreen'|'darkblue';
export type Category = {
  key: ColorKey;
  name: string;
  description?: string;
  className: string; // tailwind bg class
  chipClassName?: string;
}

export const screenshotPreset: Category[] = [
  { key:'red',    name:'Vermelho', description:'Comprar agora', className:'bg-red-600', chipClassName:'bg-red-700' },
  { key:'green',  name:'Verde',    description:'Economizar pra comprar', className:'bg-green-600', chipClassName:'bg-green-700' },
  { key:'blue',   name:'Azul',     description:'Comprar em breve', className:'bg-blue-600', chipClassName:'bg-blue-700' },
  { key:'yellow', name:'Amarelo',  description:'Procurar parecidos', className:'bg-yellow-500', chipClassName:'bg-yellow-600 text-black' },
  { key:'purple', name:'Roxo',     description:'Ver avaliações', className:'bg-purple-600', chipClassName:'bg-purple-700' },
  { key:'cyan',   name:'Ciano',    description:'Ver em outro lugar', className:'bg-cyan-600', chipClassName:'bg-cyan-700' },
];

export const pdfPreset: Category[] = [
  { key:'darkgreen', name:'Preciso Disso', description:'Âncora verde escuro', className:'bg-green-700' },
  { key:'gray',      name:'Adorei!', description:'Âncora cinza', className:'bg-gray-600' },
  { key:'yellow',    name:'Quero Muito', description:'Âncora amarela', className:'bg-yellow-500' },
  { key:'green',     name:'Ideia de Presente', description:'Âncora verde', className:'bg-green-600' },
  { key:'darkblue',  name:'Sonho Distante', description:'Âncora azul escuro', className:'bg-blue-700' },
  { key:'black',     name:'Para Pesquisar', description:'Âncora preta', className:'bg-black' },
];

export const preferredUIColors = {
  avoid: ['red','white'],
  prefer: ['black','gray','blue']
};
