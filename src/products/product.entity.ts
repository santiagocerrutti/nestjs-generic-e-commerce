//* Las entities son clases de negocio (domain layer), no deben tener nunca relación con el mecanismo de persistencia (infrastructure layer)
//* Una entity puede tener atributos referenciales a otras entities.

export class Product {
  id: number;
  title: string;
  description: string;
  code: string;
  price: number;
  status: boolean;
  stock: number;
  category: string;
  thumbnails: string[];
}
