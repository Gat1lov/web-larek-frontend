import { Component } from "./base/Component";
import { ensureElement } from "../utils/utils";
import { IAction, ISuccess } from "../types/index";

export class Success extends Component<ISuccess> {

    protected _close: HTMLElement;
    protected _description: HTMLElement;

    constructor(container: HTMLElement, actions: IAction) {
        super(container);

        this._close = ensureElement<HTMLElement>('.order-success__close', this.container);
        this._description = ensureElement<HTMLElement>('.order-success__description', this.container);

        if (actions?.onClick) {
            this._close.addEventListener('click', actions.onClick);
        }
    }

    set total(value: number) {
        this.setText(this._description, `Списано ${value} деняг`)
    }

}