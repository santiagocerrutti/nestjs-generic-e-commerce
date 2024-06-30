// TODO: sería un buen desafío mantener la base de datos y crear un sistema que se comunique con él.
// TODO: Se podría buscar la manera de mantener los modelos definidos con mongoose y buscar la forma de manejar los atributos referenciales.

//* Una entity puede tener atributos referenciales a otras entities.

export class Product {
  _id: string;
  title: string;
  description: string;
  code: string;
  price: number;
  status: boolean;
  stock: number;
  category: string;
  thumbnails: string[];
}
