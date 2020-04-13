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
                expect(questions.length).toBe(10);
            });
        })));

    it('first question should be What does the letter in the badge mean?', async(inject([AirtableService],
        (faqService: AirtableService) => {

            let questions: any = [];

            faqService.getFAQ().subscribe((posts) => {

                questions = posts;
                expect(questions[0].fields.Question).toEqual('What does the letter in the badge mean?');
            });
        })));

    it('second question should be What’s the difference between a fixed record and a variable record?', async(inject([AirtableService],
        (faqService: AirtableService) => {

            let questions: any = [];

            faqService.getFAQ().subscribe((posts) => {

                questions = posts;
                expect(questions[1].fields.Question).toEqual('What’s the difference between a fixed record and a variable record?');
            });

        })));
});
