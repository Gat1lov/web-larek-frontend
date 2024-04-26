import { Model } from "./base/Model";
import { IProductItem } from "../types/index";

export class Element extends Model<IProductItem> {

    id: string;
    text: string;
    image: string;
    title: string;
    category: string;
    price: number;

}