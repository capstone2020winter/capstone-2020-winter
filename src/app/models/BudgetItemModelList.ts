import { BudgetItemModel } from './BudgetItemModel';

export class BudgetItemModelList {

    items: any[];

    constructor(public title: string, items: BudgetItemModel[]) {
        this.items = items;
    }
}
