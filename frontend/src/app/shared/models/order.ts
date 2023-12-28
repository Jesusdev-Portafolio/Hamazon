import { IAddress } from "./address";

export interface OrderToCreate{
    basketId: string;
    deliveryMethodId : number;
    shipToAddress: IAddress; 
}

export interface Order {
    id: number
    buyerEmail: string
    orderDate: string
    shipToAddress: IAddress
    deliveryMethod: string
    shippingPrice: number
    orderItems: OrderItem[]
    subTotal: number
    total: number
    status: string
  }
  

  export interface OrderItem {
    productId: number
    productName: string
    pictureUrl: string
    price: number
    quantity: number
  }
  