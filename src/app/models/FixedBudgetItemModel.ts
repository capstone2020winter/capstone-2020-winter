export class FixedBudgetItemModel {
    autoId: string;
    //category 
    name: string;
    //amount
    value: number;
    description: string;
    startDate: string;
    badge: string
    // progress bar
    percentage: string;
    parentId: string;
    isDeleted: string;

    constructor(id: string, name: string, value: number, description: string, startDate: string, badge: string, percentage: string, parentId: string, isDeleted: string) {
        this.autoId = id
        this.name = name
        this.value = value
        this.description = description
        this.startDate = startDate
        this.badge = badge
        this.percentage = percentage
        this.parentId = parentId
        this.isDeleted = isDeleted
    }
}
