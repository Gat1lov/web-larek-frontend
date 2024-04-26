//Интерфейс описывающий карточку продукта 
export interface IProductItem {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number;
}

//Интерфейс расширяющий карточку продукта
export interface IProductCard extends IProductItem{
    text: string;
    count?: number;
    buttonText?: string;
}

//Тип добавляющий свойства кнопке 
export type ICard = IProductItem & {
    text: string;
    button: string
    count?: number;
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
export interface IContactsForm {
    email: string;
    phone: string;
}

//Интерфейс валидации форм 
export interface IFormState {
    valid: boolean;
    errors: string[];
}

//Тип добавляющий типизацию во время заполнения формы
export type FormError = Partial<Record<keyof IOrder, string>>

//Интерфейс описывающий контент модального окна 
export interface IModalData {
    content: HTMLElement;
}

//Интерфейс описывающий адрес доставки и способ оплаты пользователя 
export interface IShippingForm {
    address: string;
    payment: string;
}

//Интерфейс описывающий форму заказа пользователя 
export interface IOrder extends IContactsForm, IShippingForm {
    total: number;
    items: string[];
}

//Интерфейс описывающий состояние пользуемого приложения 
export interface IAppState {
    catalog: IProductItem[];
    basket: string[];
    preview: string | null;
    contact: IContactsForm | null;
    delivery: IShippingForm | null;
    order: IOrder | null;
}

//Интерфейс описывающий страницу
export interface IPage {
    counter: number;
    catalog: HTMLElement[];
    locked: boolean;
}

//Интерфейс описывающий структуру объекта 
export interface IAction {
    onClick: (event: MouseEvent) => void;
}

//Тип определяет структуру изменения каталога
export type CatalogChangeEvent = {
    catalog: Element[];
}