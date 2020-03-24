import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

interface AirtableResponse {
    records: Object[];
}

@Injectable({
    providedIn: 'root'
})
export class AirtableService {

    private apiKey = '';

    constructor(private http: HttpClient) {
        console.log('AirtableService');
    }

    public getFAQ(): Observable<Object[]> {

        return this.http.get('https://api.airtable.com/v0/appuaBUaQCe8mwSJD/faq?api_key=' + this.apiKey).pipe(
            map((res: AirtableResponse) => res.records)
        );

    }
}
