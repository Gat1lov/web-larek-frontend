import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { IAction, ISuccess } from "../../types/index";

export class Success extends Component<ISuccess> {
    protected _close: HTMLElement;
    protected _description: HTMLElement;

    constructor(container: HTMLElement, value: number, actions: IAction) {
        super(container);

        this._close = ensureElement<HTMLElement>('.state__action', this.container);
        this._description = ensureElement<HTMLElement>('.order-success__description', this.container);

        if (actions?.onClick) {
            this._close.addEventListener('click', actions.onClick);
            this.setText(this._description, `Списано ${value} деняг`)
        }
    }

}