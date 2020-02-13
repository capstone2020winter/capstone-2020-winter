export class GenerateSuggestions {
    incomeArray: any[];
    expenseArray: any[];
    suggestionsArray: any[];

    constructor(public IArray: [], EArray: []) {
       
        this.incomeArray = IArray;
        this.expenseArray = EArray;
    }

    //logic to generate suggestions according to Income and Expense list will be replaced later on
    public makeSuggestionsList(): Array<string> {

        this.suggestionsArray = [
            'Cutting your expense on food',
            'Spend Less on entertainment',
            'Get a better paid part time job'];
        return this.suggestionsArray;
    }
}
