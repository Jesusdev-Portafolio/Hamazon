import { OrderAscDesc, OrderOrderBy } from "./order"

export class OrderParams{
    orderBy: OrderOrderBy =  OrderOrderBy.Default;
    ascDesc: OrderAscDesc = OrderAscDesc.Default
    pageNumber = 1;
    pageSize = 6;
}