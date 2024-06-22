import { Food } from "./food"
import { Table } from "./table"

//свако јело има назив, слику, цену и излистане састојке

export class Restaurant{
    id: number=-1
    name: string=""
    address: string=""
    type: string=""
    phone:string=""
    comments: Array<string>=[]
    mapUrl: string=""
    waiters: Array<string>=[]
    workingTime: Array<string>=[]
    tables: Array<Table>=[]
    menu: Array<Food>=[]
}

