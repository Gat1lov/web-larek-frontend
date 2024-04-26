import { cloneTemplate, ensureElement } from '../utils/utils';
import { EventEmitter } from '../components/base/events';
import { Basket } from '../components/Basket';
import { Modal } from '../components/common/Modal';
import { AppData } from '../components/AppData';
import { Contacts } from '../components/Contacts';
import { Page } from '../components/Page';
import { Shipping } from '../components/Shipping';
import { WebLarekAPI } from '../components/WebLarekAPI';


export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
export const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
export const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
export const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
export const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
export const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
export const successTemplate = ensureElement<HTMLTemplateElement>('#success');

export const api = new WebLarekAPI(CDN_URL, API_URL);
export const paymentType: Record<string, string> = { online: 'online', offline: 'uponReceipt' };
export const event = new EventEmitter();
export const basket = new Basket(cloneTemplate(basketTemplate), event);
export const modal = new Modal(document.querySelector('#modal-container'), event);
export const appData = new AppData({}, event);
export const contacts = new Contacts(cloneTemplate(contactsTemplate), event);
export const page = new Page(document.body, event)
export const shipping = new Shipping(cloneTemplate(orderTemplate), event, {
    onClick(events: Event) {
        event.emit('payment:changed', events.target)

    },
});

export const settings = {

};
