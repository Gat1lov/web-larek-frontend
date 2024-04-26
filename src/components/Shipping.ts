import { Form } from "./common/Form";
import { IEvents } from "./base/events";
import { ensureElement } from "../utils/utils";
import { IShippingForm, IAction } from "../types/index";

export class Shipping extends Form<IShippingForm> {

    protected _buttonOnline: HTMLButtonElement;
    protected _buttonUponReceipt: HTMLButtonElement;

    constructor(container: HTMLFormElement, events: IEvents, action?: IAction) {
        super(container, events);

        this._buttonOnline = ensureElement<HTMLButtonElement>('button[name=card]', container);
        this._buttonUponReceipt = ensureElement<HTMLButtonElement>('button[name=uponReceipt]', container);
        this._buttonOnline.classList.add('button_alt-active');

        if (action?.onClick) {
            this._buttonOnline.addEventListener('click', (event: MouseEvent) => {
                action.onClick(event);
                this.paymentButtons(this._buttonOnline);
            });
            this._buttonUponReceipt.addEventListener('click', (event: MouseEvent) => {
                action.onClick(event);
                this.paymentButtons(this._buttonUponReceipt);
            });
        }
    }

    paymentButtons(activeButton: HTMLButtonElement) {
        this._buttonOnline.classList.remove('button_alt-active');
        this._buttonUponReceipt.classList.remove('button_alt-active');
        activeButton.classList.add('button_alt-active');
    }

    set address(value: string) {
        (this.container.elements.namedItem('address') as HTMLInputElement).value = value;
    }

}