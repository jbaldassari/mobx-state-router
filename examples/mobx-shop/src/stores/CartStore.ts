import {
    action,
    computed,
    makeObservable,
    IObservableArray,
    observable,
} from 'mobx';
import { RootStore } from './RootStore';
import { Item, OrderItem } from '../models';

export class CartStore {
    rootStore: RootStore;
    orderItems: IObservableArray<OrderItem> = observable.array([]);

    constructor(rootStore: RootStore) {
        makeObservable(this, {
            total: computed,
            addOrder: action,
            clearCart: action,
        });
        this.rootStore = rootStore;
        makeObservable(this, {
            total: computed,
            addOrder: action,
            clearCart: action,
        });
    }

    get total() {
        return this.orderItems.reduce(
            (total: number, orderItem: OrderItem) =>
                total + orderItem.item.price * orderItem.qty,
            0
        );
    }

    addOrder(item: Item, qty: number) {
        this.orderItems.push({ item, qty });
    }

    clearCart() {
        this.orderItems.clear();
    }
}
