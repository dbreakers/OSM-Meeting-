import { Injectable } from '@angular/core';
import { Security } from './security';
//import { SECURITY } from './mock-security';
import { Observable, forkJoin, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Globals } from './globals';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' })
};


@Injectable({
  providedIn: 'root',
})

export class LogonService {
  private configUrl = this.globals.proxyURL;
  constructor(private http: HttpClient,
    private globals: Globals) { }

  doLogon(user: string, password: string): Observable<Security> {
    let authURL = this.configUrl + "?osmpath=users.php&action=authorise";
    let body = new HttpParams();
    body = body.set('email', user);
    body = body.set('password', password);
    return this.http.post<Security>(authURL, body, httpOptions)
  }

  getSectionConfig(): Observable<any> {
    let fullURL = this.configUrl + "?osmpath=api.php&action=getSectionConfig";
    let fullURL2 = this.configUrl + "?osmpath=api.php&action=getUserRoles";
    let fullURL3 = this.configUrl + "?osmpath=api.php&action=getTerms";
    let body = new HttpParams();
    body = body.set('secret', this.globals.secret);
    body = body.set('userid', this.globals.userid);

    return forkJoin(this.http.post(fullURL, body, httpOptions), this.http.post(fullURL2, body, httpOptions), this.http.post(fullURL3, body, httpOptions))
  }

getSectionData(sectionid, term): Observable<any> {
    let fullURL = this.configUrl + "?osmpath=ext/members/flexirecords/&action=getFlexiRecords&sectionid="+sectionid+"&archived=n"; //Flexi
    let fullURL2 = this.configUrl + "?osmpath=ext/members/contact/grid/&action=getMembers"; // Members
    let fullURL3 = this.configUrl + "?osmpath=ext/settings/patrols/&action=get&sectionid="+sectionid; //Patrols
    let fullURL4 = this.configUrl + "?osmpath=ext/events/summary/&action=get&sectionid="+sectionid+"&termid="+term; //Events
    let fullURL5 = this.configUrl + "?osmpath=ext/programme/&action=getProgrammeSummary&sectionid="+sectionid+"&termid="+term; //Programme
    let body = new HttpParams();
    body = body.set('secret', this.globals.secret);
    body = body.set('userid', this.globals.userid);
    let body2 = new HttpParams();
    body2 = body2.set('secret', this.globals.secret);
    body2 = body2.set('userid', this.globals.userid);
    body2 = body2.set('section_id', sectionid);
    body2 = body2.set('term_id', term);
    return forkJoin(this.http.post(fullURL, body, httpOptions), this.http.post(fullURL2, body2, httpOptions), this.http.post(fullURL3, body, httpOptions),this.http.post(fullURL4, body, httpOptions),this.http.post(fullURL5, body, httpOptions));
  }

}
