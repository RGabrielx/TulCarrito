export class Product {
    $key: string;
    nombre: string;
    sku: string;
    descripcion: string;
    id: string;
}

export class carts {
    id: string;
    status : string;
}

export interface product_carts{
    $key: string;
    product_id: Product;
    cart_id: carts;
    quantity: number;
    fusuario: string;

}

export type status = 'pending' | 'completed' ;