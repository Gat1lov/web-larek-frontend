import { Api, ApiListResponse } from './base/api';
import { IOrder, IOrderResult, IProductCard } from "../types/index";

interface IWebLarekAPI {
    setProductsCatalog: () => Promise<IProductCard[]>;
    orderProduct: (order: IOrder) => Promise<IOrderResult>
}

export class WebLarekAPI extends Api implements IWebLarekAPI {

    readonly cdn: string;

    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
        this.cdn = cdn;
    }

    setProductsCatalog(): Promise<IProductCard[]> {
        return this.get(`/product`).then((data: ApiListResponse<IProductCard>) =>
            data.items.map((product) => ({
                ...product,
                image: this.cdn + product.image,
            }))
        );

    };

    orderProduct(order: IOrder): Promise<IOrderResult> {
        return this.post('/order', order).then((data: IOrderResult) => data);
    };

}