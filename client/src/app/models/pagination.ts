import { IProduct } from "./product";

export interface IPagination {
    pageIndex: number;
    pageSize: number;
    totalItems: number;
    totalPAges: number;
    data: IProduct[];
}