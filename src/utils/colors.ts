export type ColorKey = 'red'|'green'|'blue'|'yellow'|'purple'|'cyan'|'gray'|'black'|'darkgreen'|'darkblue';

export type Category = {
  key: ColorKey;
  name: string;
  description?: string;
  className: string;       // cor do círculo/gráfico
  chipClassName?: string;  // cor do chip no filtro
};

export const screenshotPreset: Category[] = [
  { key:'red',    name:'Vermelho', description:'Comprar agora',         className:'bg-red-600 dark:bg-red-700',       chipClassName:'bg-red-500 dark:bg-red-700 text-black dark:text-white' },
  { key:'green',  name:'Verde',    description:'Economizar pra comprar',className:'bg-green-600 dark:bg-green-700',   chipClassName:'bg-green-500 dark:bg-green-700 text-black dark:text-white' },
  { key:'blue',   name:'Azul',     description:'Comprar em breve',      className:'bg-blue-600 dark:bg-blue-700',     chipClassName:'bg-blue-500 dark:bg-blue-700 text-black dark:text-white' },
  { key:'yellow', name:'Amarelo',  description:'Procurar parecidos',    className:'bg-yellow-500 dark:bg-yellow-600', chipClassName:'bg-yellow-400 dark:bg-yellow-600 text-black' },
  { key:'purple', name:'Roxo',     description:'Ver avaliações',        className:'bg-purple-600 dark:bg-purple-800', chipClassName:'bg-purple-500 dark:bg-purple-800 text-white' },
  { key:'cyan',   name:'Ciano',    description:'Ver em outro lugar',    className:'bg-cyan-600 dark:bg-cyan-700',     chipClassName:'bg-cyan-500 dark:bg-cyan-700 text-black dark:text-white' },
];

export const pdfPreset: Category[] = [
  { key:'darkgreen', name:'Preciso Disso',        description:'Âncora verde escuro', className:'bg-green-700 dark:bg-green-800', chipClassName:'bg-green-600 dark:bg-green-800 text-white' },
  { key:'gray',      name:'Adorei!',              description:'Âncora cinza',        className:'bg-gray-600 dark:bg-gray-500',   chipClassName:'bg-gray-300 dark:bg-gray-500 text-black dark:text-white' },
  { key:'yellow',    name:'Quero Muito',          description:'Âncora amarela',      className:'bg-yellow-500 dark:bg-yellow-600', chipClassName:'bg-yellow-400 dark:bg-yellow-600 text-black' },
  { key:'green',     name:'Ideia de Presente',    description:'Âncora verde',        className:'bg-green-600 dark:bg-green-700', chipClassName:'bg-green-500 dark:bg-green-700 text-black dark:text-white' },
  { key:'darkblue',  name:'Sonho Distante',       description:'Âncora azul escuro',  className:'bg-blue-700 dark:bg-blue-800',   chipClassName:'bg-blue-600 dark:bg-blue-800 text-white' },
  { key:'black',     name:'Para Pesquisar',       description:'Âncora preta',        className:'bg-black dark:bg-black',         chipClassName:'bg-black text-white' },
];
