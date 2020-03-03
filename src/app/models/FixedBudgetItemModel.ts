export class FixedBudgetItemModel {
    autoId: string;
    //category 
    name: string;
    //amount
    value: number;
    description: string;
    startDate: string;
    badge: string

    constructor(id: string, name: string, value: number, description: string, startDate: string, badge: string) {
        this.autoId = id;
        this.name = name;
        this.value = value;
        this.description = description;
        this.startDate = startDate;
        this.badge = badge;
    }
}
