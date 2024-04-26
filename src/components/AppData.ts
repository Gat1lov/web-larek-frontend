import { Model } from "./base/Model";
import { IProductCard, IAppState, IOrder, FormError, IContactsForm, IShippingForm} from "../types/index";

export class AppData extends Model<IAppState> {

    catalog: IProductCard[] = [];
    basket: IProductCard[] = [];
    order: IOrder = {

        items: [],
        total: 0,
        payment: 'card',
        address: '',
        email: '',
        phone: '',

    };
    preview: string | null;
    formErrors: FormError = {}

    //Сброс содержимого корзины
    resetThisBasket() {

        this.basket = [];
        this.emitChanges('counter:changed', this.basket);
        this.emitChanges('basket:changed', this.basket);

    };

    //
    setProductsCatalog(product: IProductCard[]) {

        this.catalog = product;
        this.emitChanges('product:changed', {catalog: this.catalog});

    };

    //Добавить товар корзину
    addProductToBasket(product: IProductCard) {

        this.basket.push(product);
        this.emitChanges('counter:changed', this.basket);
        this.emitChanges('basket:changed', this.basket);

    };

    //Удалить товар из корзины
    removeProductFromBasket(product: IProductCard) {

        const index = this.basket.findIndex(item => item.id === product.id);
        if (index !== -1) {
            this.basket.splice(index, 1);
            this.emitChanges('counter:changed', this.basket);
            this.emitChanges('basket:changed', this.basket);
        }

    }

    //Проверка товара в корзине
    checkIsProductInBasket(product: IProductCard) {

        return this.basket.includes(product);

    };

    //Получение массива товаров в корзине
    getProductsInBasket() {

        return this.basket;

    };

    //Сумма товара в корзине 
    getTotalCost() {

        return this.basket.reduce((result, product) => result + product.price, 0);

    };

    //Валидация формы доставки
    validateShippingForm() {
        const errors: typeof this.formErrors = {};
        if (!this.order.address) {
            errors.address = 'Укажите адрес доставки';
        }
        this.formErrors = errors;
        this.events.emit('formErrors:changed', this.formErrors);
        return Object.keys(errors).length === 0;
    }

    //Активация валидации в форме доставки
    setShippingForm(field: keyof IShippingForm, value: string) {
        this.order[field] = value;

        if (this.validateShippingForm()) {
            this.events.emit('shipping:done', this.order);
        }
    }

    //Валидация в форме номера телефона и электронной почты
    validateContactsForm() {
        const errors: FormError = {};
        if (!this.order.email) {
            errors.email = 'Укажите электронную почту';
        }
        if (!this.order.phone) {
            errors.phone = 'Укажите номер телефона';
        }
        this.formErrors = errors;
        this.events.emit('formErrors:changed', this.formErrors);

        const isValid = Object.keys(errors).length === 0 && this.order.email && this.order.phone;
        return isValid;
    }

    //Активация валидации в форме номера телефона и электронной почты
    setContactsForm(field: keyof IContactsForm, value: string) {
        this.order[field] = value;

        if (this.validateContactsForm()) {
            this.events.emit('contacts:done', this.order)
        }
    }

}