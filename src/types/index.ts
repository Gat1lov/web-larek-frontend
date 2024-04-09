//Интерфейс описывающий карточку продукта
export interface IProductItem {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number;
}

//Тип добавляющий свойства кнопке
export type ICard = IProductItem & {
    button: string
}

//Интерфейс описывающий успешный результат получаемый от сервера
export interface IOrderResult {
    id: string;
    total: number;
}

//Интерфейс описывающий корзину
export interface IBasketView {
    items: HTMLElement[];
    total: number;
    selected: string[];
}

// Интерфейс описывающий успех и его номер
export interface ISuccess {
    total: number;
}

//Интерфейс описывающий форму контактов пользователя
export interface IContactForm {
    email: string;
    phone: string;
}

//Интерфейс валидации форм
export interface IFormState {
    valid: boolean;
    errors: string[];
}

//Интерфейс описывающий контент модального окна
export interface IModalData {
    content: HTMLElement;
}

//Тип добавляющий способ оплаты пользователя
export type PaymentMethod = 'card' | 'uponReceipt';

//Интерфейс описывающий адрес доставки и способ оплаты пользователя
export interface IDeliveryForm {
    address: string;
    payment: PaymentMethod;
}

//Интерфейс описывающий форму заказа пользователя
export interface IOrder extends IContactForm, IDeliveryForm {
    total: number;
    items: string[];
}

//Интерфейс описывающий состояние пользуемого приложения
export interface IAppState {
    catalog: IProductItem[];
    basket: string[];
    preview: string | null;
    contact: IContactForm | null;
    delivery: IDeliveryForm | null;
    order: IOrder | null;
}

//Интерфейс описывающий структуру объекта
export interface IAction {
    onClick: (event: MouseEvent) => void;
}
