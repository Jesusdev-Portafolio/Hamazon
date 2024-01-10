import { Order } from "./order";
import { IProduct } from "./product";

export interface IPagination {
    pageIndex: number;
    pageSize: number;
    totalItems: number;
    totalPAges: number;
    data: []; // no me gusta esto pero como lo uso en diferentes sitios pues tiene que ser any
}