import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AboutUsPage } from './about-us.page';

describe('AboutUsPage', () => {
  let component: AboutUsPage;
  let fixture: ComponentFixture<AboutUsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutUsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AboutUsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should display all team members' name and project description", () => {
    const aboutUsHtml: HTMLElement = fixture.nativeElement
    expect(aboutUsHtml.innerHTML).toContain('Supreet Kaur');
    expect(aboutUsHtml.innerHTML).toContain('Dipal Patel');
    expect(aboutUsHtml.innerHTML).toContain('Jiansheng(Jason) Sun');
    expect(aboutUsHtml.innerHTML).toContain('Zhaoning(Kyle) Cai');
    expect(aboutUsHtml.innerHTML).toContain('Veronika Kotckovich');
    expect(aboutUsHtml.innerHTML).toContain('Description');
    });
});
