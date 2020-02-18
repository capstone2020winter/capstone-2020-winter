export class BudgetItemModel {
    autoId: string;
    name: string;
    value: number;
    badge: string;

    constructor(id: string, name: string, value: number, badge: string) {
        this.autoId = id;
        this.name = name;
        this.value = value;
        this.badge = badge;
    }
}
