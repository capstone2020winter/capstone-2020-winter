export class BudgetItemModel {
    id: string;
    name: string;
    value: number;
    badge: string;

    constructor(id: string, name: string, value: number, badge: string) {
        this.id = id;
        this.name = name;
        this.value = value;
        this.badge = badge;
    }
}
