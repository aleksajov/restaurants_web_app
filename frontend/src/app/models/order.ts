export class Order{
    username: string=""
    idR: number=0
    items: {idF: number, quantity: number, name:string}[] = []
    idO: number=-1
    deliveryTime: string=""
    restaurant: string=""
}