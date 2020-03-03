export class BudgetItemModel {
    autoId: string;
    name: string;
    value: number;
    description: string;
    date: string;

    constructor(id: string, name: string, value: number, description: string, date: string) {
        this.autoId = id;
        this.name = name;
        this.value = value;
        this.description = description;
        this.date = date;
    }
}
