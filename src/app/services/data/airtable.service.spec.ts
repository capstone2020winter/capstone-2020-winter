import { TestBed } from '@angular/core/testing';

import { AirtableService } from './airtable.service';
import { HttpClientModule } from '@angular/common/http';


describe('AirtableService', () => {
  beforeEach(() => TestBed.configureTestingModule({
      imports: [ HttpClientModule]
  }));

  it('should be created', () => {
    const service: AirtableService = TestBed.get(AirtableService);
    expect(service).toBeTruthy();
  });
});
