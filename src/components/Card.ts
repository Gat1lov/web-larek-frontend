import { Component } from "./base/Component";
import { ICard } from "../types/index";
import { ensureElement } from "../utils/utils";

interface ICardAction {
    onClick: (event: MouseEvent) => void;
}

export class Card extends Component<ICard> {

    protected _image?: HTMLImageElement;
    protected _category: HTMLElement;
    protected _title: HTMLElement;
    protected _text?: HTMLElement;
    protected _button?: HTMLButtonElement;
    protected _price: HTMLElement;
    protected _index?: HTMLButtonElement;

    constructor(container: HTMLElement, action?: ICardAction) {
        super(container);

        this._image = container.querySelector(`.card__image`);
        this._category = container.querySelector(`.card__category`);
        this._title = ensureElement<HTMLElement>(`.card__title`, container);
        this._text = container.querySelector(`.card__text`);
        this._button = container.querySelector(`.card__button`);
        this._price = container.querySelector(`.card__price`);
        this._index = container.querySelector(`.card__item-index`);

        if (action?.onClick) {
            if (this._button) {
                this._button.addEventListener('click', action.onClick);
            } else {
                container.addEventListener('click', action.onClick);
            }
        }
    };

    set id(value: string) {
        this.container.dataset.id = value;
    }

    get id(): string {
        return this.container.dataset.id || '';
    }

    set image(value: string) {
        this.setImage(this._image, value, this.title)
    };

    set category(value: string) {
        this.setText(this._category, value);
    };

    set title(value: string) {
        this.setText(this._title, value)
    };

    get title(): string {
        return this._title.textContent || '';
    }

    set text(value: string) {
        this.setText(this._text, value)
    };

    set button(value: string) {
        this.setText(this._button, value)
    };

    set price(value: string) {
        if (value) {
            this.setText(this._price, `${value} деняг`)
        } else {
            this.setText(this._price, `Бесценно`);
            this.setDisabled(this._button, true);
        }
    }

    get price(): string {
        return this._price.textContent || '';
    }

    set buttonText(value: string) {
        this.setText(this._button, value);
    }

}