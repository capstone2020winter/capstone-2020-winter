import {async, inject, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';
import {ExpandableComponent} from '../components/expandable/expandable.component';
import {BudgetFaqsPage} from './budget-faqs.page';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {AirtableService} from '../services/data/airtable.service';


describe('BudgetFaqsPage', () => {
    let component: BudgetFaqsPage;
    let fixture: ComponentFixture<BudgetFaqsPage>;

    let questions: any = [];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BudgetFaqsPage, ExpandableComponent],
            imports: [IonicModule.forRoot(), RouterTestingModule, HttpClientModule], providers: [AirtableService]
        }).compileComponents();

        fixture = TestBed.createComponent(BudgetFaqsPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should create service', async(inject([AirtableService],
        (faqService: AirtableService) => {
            expect(faqService).toBeTruthy();
        })));

    it('should get data', async(inject([AirtableService],
        (faqService: AirtableService) => {

            let questions: any = [];

            faqService.getFAQ().subscribe((posts) => {

                questions = posts;
                expect(questions.length).toBe(6);
            });
        })));

    it('first question should be What is a budget?', async(inject([AirtableService],
        (faqService: AirtableService) => {

            let questions: any = [];

            faqService.getFAQ().subscribe((posts) => {

                questions = posts;
                expect(questions[0].fields.Question).toEqual('What is a budget?');
            });
        })));

    it('second question should be Importance of Managing your Income and Expenses.', async(inject([AirtableService],
        (faqService: AirtableService) => {

            let questions: any = [];

            faqService.getFAQ().subscribe((posts) => {

                questions = posts;
                expect(questions[1].fields.Question).toEqual('Importance of Managing your Income and Expenses.');
            });

        })));
});
