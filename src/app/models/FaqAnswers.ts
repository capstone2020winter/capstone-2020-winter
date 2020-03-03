
export class FaqAnswers {
    public answer1: any = [];
    public answer2: any = [];
    public answer3: any = [];
    public answer4: any = [];
    public answer5: any = [];
    public answer6: any = [];


    constructor() {

    }

    //logic to generate suggestions according to Income and Expense list will be replaced later on
    public faqAnswers1(): Array<string> {

        this.answer1 = [
                        ' -- A budget is a plan that helps you manage your money.',
                        ' -- It helps you determine how much money you get, spend and save ',

                       ];
                       return this.answer1;
                    }
     public faqAnswers2(): Array<string> {
        this.answer2 = [
                        ' -- Making a budget can help you manage your income and expenses and guide your spending to help you reach your financial goals.'
                       ];
                       return this.answer2;
                    }

        public faqAnswers3(): Array<string> {
        this.answer3 = [
            ' -- A way to make the most of the money you have',
            ' -- To plan financially for a major purchase: house, car or travel',
            ' -- Set spending limit',
            ' -- Live within your means',
            ' -- Find ways to get rid of your debts ',
            ' -- Reduce costs',
            ' -- Have more money for things that are important ',
            ' -- To prepare financially for your retirement. ',
            ' -- Save regularly'
                       ];
            return this.answer3;
        }
        public faqAnswers4(): Array<string> {
        this.answer4 = [
            ' -> Know where your money is going.',
            ' -- Tracking your money will help you determine your income and expenses.',
            ' -- Get a better paid part time jobSmall changes to spending habits can have a big impact on your budget and your ability to save',
            ' -> Think about your financial goals.',
            ' -- Make short-term and long-term goals. ',
            ' -- Make saving for those goal part of your budget.',
            ' -> Evaluate your needs and wants. ',
            ' -- Need - is something that is necessary, required or essential',
            ' - Roof over your head, clothing, food, or medication',
            ' -- Want - is something that you would like, but don’t necessarily need',
            ' - Meals at a restaurant, trip, designer clothes',
            ' -- Needs and wants are not the same for everyone'];
        return this.answer4;}
        public faqAnswers5(): Array<string> {
        this.answer5 = [
            ' -> First steps to making a budget are:',
            ' -- List your income and expenses for one month .',
            ' -- Review your list to ensure you have capture all income and expenses.',
            ' -- This will help you understand your spending habits. If you need to reduce your spending, your "wants" may be an area to target.',
            ' -- Pay down debts or increase your savings with the money you save from cutting back on “wants”.',
            ' -> Second step: Creating a balanced budget is to consider the following questions:',
            ' -- Do the figures reflect your expenses in any given month.',                        
            ' -- Could there be a more realistic figure to reflect your expenses?',
            ' -- Are there small recurring expenses that you can cut?',
            ' -- Do you want to add money to your saving account that reflect  your goal? If so you will need to add a saving “Expense” to your budget.'
                        ];
            return this.answer5;
            }
        public faqAnswers6(): Array<string> {
        this.answer6 = [

            ' -- Limit your spending to what is in your budget.',
            ' -- Keep track of receipts and bills.',
            ' -- Compare your budget to what you actually spend at the end of each month.',
            ' -- Make adjustments to your budget if income and expenses change.',
            ' -- When comparing your budget to your actual spending, ask yourself the following questions: ',
            ' -- Are there big or small differences between your actual spending and budget',                        
            ' -- Where are the largest differences, can I make changes to suit my goals',
            ' -- Are differences because of an unusual situation or is this likely to happen each month. ',
            ' -- Adjust your budget as necessary: Adjust your Income or Expenses.',
            ' -- Are you able to save enough money to reach your financial goals or pay off your debts ',
            ' -- Your budget is a continuous work in-progress.',
            ' -- Tracking your income and expenses to meet your financial goals'

        ];
        return this.answer6;
    }                           


}