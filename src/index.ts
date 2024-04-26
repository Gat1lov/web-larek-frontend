import './scss/styles.scss';

import { cloneTemplate } from './utils/utils';
import { Card } from './components/Card';
import { IShippingForm, IProductCard, IContactsForm, CatalogChangeEvent } from './types/index'
import { Success } from './components/Success';
import { paymentType, event, basket, modal, appData, contacts, page, shipping, cardCatalogTemplate, cardPreviewTemplate, cardBasketTemplate, basketTemplate, orderTemplate, contactsTemplate, successTemplate, api } from './utils/constants'

//Получение данных с сервера
api
    .setProductsCatalog()
    .then((data) => {
        appData.setProductsCatalog(data);
    })
    .catch((error) => {
        console.log('Беды с башкой:(', error);
    });

// Блокировка прокрутки страницы во время открытого модального окна
event.on('modal:open', () => {
    page.locked = true
});

// Сняти блокировки прокрутки страницы когда модальное окно закрыто
event.on('modal:close', () => {
    page.locked = false
});

//Добавление карточек в католог
event.on<CatalogChangeEvent>('product:changed', () => {
    page.catalog = appData.catalog.map((product) => {
        const card = new Card(cloneTemplate(cardCatalogTemplate), {
            onClick: () => event.emit('preview:changed', product),
        });
        return card.render({
            title: product.title,
            image: product.image,
            price: product.price,
            category: product.category,
        });
    });
    page.counter = appData.getProductsInBasket().length;
});

//Открытие формы с описанием товара
event.on('preview:changed', (product: IProductCard) => {
    const card = new Card(cloneTemplate(cardPreviewTemplate), {
        onClick: () => {
            if (appData.checkIsProductInBasket(product)) {
                event.emit('product:delete', product);
            } else {
                event.emit('product:add', product);
            }
        },
    });
    modal.render({
        content: card.render({
            category: product.category,
            title: product.title,
            description: product.description,
            image: product.image,
            price: product.price,
            button: appData.checkIsProductInBasket(product) ? 'Удалить' : 'Добавить',
        }),
    });
}
);

//Добавление товара в корзину
event.on('product:add', (item: IProductCard) => {
    appData.addProductToBasket(item);
    modal.close()
});

//Удаление товара из корзины
event.on('product:delete', (product: IProductCard) => {
    appData.removeProductFromBasket(product);
    modal.close()
});

//Открытие формы с корзиной
event.on('bids:open', () => {
    modal.render({
        content: basket.render({})
    });
});

//Обновление числа добавленных товаров
event.on('counter:changed', () => {
    page.counter = appData.basket.length;
});

//Отображение в форме корзины добаленных товаров
event.on('basket:changed', () => {
    basket.items = appData.basket.map((product) => {
        const card = new Card(cloneTemplate(cardBasketTemplate), {
            onClick: () => event.emit('product:delete', product)
        });
        return card.render({
            title: product.title,
            price: product.price,
        });
    });
    basket.total = appData.getTotalCost();
    appData.order.total = appData.getTotalCost();
});

//Открытие формы с выбором типа оплаты и адреса доставки
event.on('order:open', () => {
    modal.render({
        content: shipping.render({
            payment: '',
            address: '',
            valid: false,
            errors: [],
        })
    });

    event.on('payment:changed', (target: HTMLButtonElement) => {
        if (!target.classList.contains('button_alt-active')) {
            shipping.paymentButtons(target);
            appData.order.payment = paymentType[target.getAttribute('name')];
        }
    });

    event.on(/^order\..*:change/, (data: { field: keyof IShippingForm, value: string }) => {
        appData.setShippingForm(data.field, data.value);
    });

    event.on('formErrors:changed', (error: Partial<IShippingForm>) => {
        const { payment, address } = error;
        shipping.valid = !payment && !address;
        shipping.errors = Object.values({ payment, address }).filter((i) => !!i).join(';');
    })

});

//Открытие формы с контактами для связи
event.on('order:submit', () => {
    appData.order.items = appData.basket.map((item) => item.id);
    modal.render({
        content: contacts.render({
            phone: '',
            email: '',
            valid: false,
            errors: []
        })
    });

    event.on(/^contacts\..*:change/, (data: { field: keyof IContactsForm, value: string }) => {
        appData.setContactsForm(data.field, data.value);
    });

    event.on('formErrors:changed', (error: Partial<IContactsForm>) => {
        const { email, phone } = error;
        contacts.valid = !email && !phone;
        contacts.errors = Object.values({ email, phone }).filter((i) => !!i).join(';');
    })

});

//Открытие формы успешного списания
event.on('contacts:submit', () => {
    api.orderProduct(appData.order)
        .then((result) => {
            const succes = new Success(cloneTemplate(successTemplate), {
                onClick: () => {
                    modal.close();
                    appData.resetThisBasket();
                }
            });
            modal.render({
                content: succes.render({})
            });
            succes.total = result.total;
            appData.resetThisBasket()
        })
        .catch(err => {
            console.log(err)
        })
});