import { Injectable } from "@angular/core";
import { Security } from "./security";
//import { SECURITY } from './mock-security';
import { Observable, forkJoin, of, from } from "rxjs";
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpEvent,
  HttpRequest,
  HttpInterceptor,
  HttpHandler
} from "@angular/common/http";
import { CustomURLEncoder } from "./urlencoder.component";
import { map, concatMap, catchError } from "rxjs/operators";
import { Globals } from "./globals";
import { timer } from "rxjs/observable/timer";
import { switchMap, mergeMap, toArray } from "rxjs/operators";
const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
  })
};

@Injectable({
  providedIn: "root"
})
export class LogonService {
  private configUrl = this.globals.proxyURL;
  constructor(private http: HttpClient, private globals: Globals) {}

  slowhttp = true; // Use concatMap rather than forkJoin

  update_att(date, member, abs): Observable<any> {
    let authURL =
      this.configUrl +
      "?osmpath=ext/members/attendance/&action=update&sectionid=" +
      this.globals.mysection +
      "&termid=" +
      this.globals.config[2][this.globals.mysection][this.globals.current_term]
        .termid;
    let st = this.globals.config[1].find(
      i => i.sectionid == this.globals.mysection
    );
    let body = new HttpParams({ encoder: new CustomURLEncoder() });
    body = body.set("secret", this.globals.secret);
    body = body.set("userid", this.globals.userid);
    body = body.set("sectionid", this.globals.mysection);
    body = body.set("section", st.section);
    body = body.set("completedBadges", "[]");
    body = body.set("customData", "[]");
    body = body.set("selectedDate", date);
    body = body.set("scouts", '["' + member + '"]');
    body = body.set("present", abs);
    return this.http
      .post(authURL, body, httpOptions)
      .pipe(catchError(error => of(error)));
  }

  update_parents(pobject, evening): Observable<any> {
    let authURL =
      this.configUrl + "?osmpath=ext/programme/&action=editEveningParts";

    let body = new HttpParams({ encoder: new CustomURLEncoder() });
    body = body.set("secret", this.globals.secret);
    body = body.set("userid", this.globals.userid);
    body = body.set("sectionid", this.globals.mysection);
    body = body.set("eveningid", evening);
    body = body.set("parts", JSON.stringify(pobject));
    return this.http
      .post(authURL, body, httpOptions)
      .pipe(catchError(error => of(error)));
  }

  mod_parents(opt, scout, evening, date): Observable<any> {
    let authURL =
      this.configUrl + "?osmpath=ext/programme/&action=deleteParentFromEvening";
    let body = new HttpParams({ encoder: new CustomURLEncoder() });
    if (opt == 1) {
      authURL =
        this.configUrl + "?osmpath=ext/programme/&action=addParentToEvening";
      body = body.set("date", date);
    }

    body = body.set("secret", this.globals.secret);
    body = body.set("userid", this.globals.userid);
    body = body.set("sectionid", this.globals.mysection);
    body = body.set("eveningid", evening);
    body = body.set("scoutid", scout);

    return this.http
      .post(authURL, body, httpOptions)
      .pipe(catchError(error => of(error)));
  }

  doLogon(user: string, password: string): Observable<Security> {
    let authURL = this.configUrl + "?osmpath=users.php&action=authorise";
    let body = new HttpParams();
    body = body.set("email", user);
    body = body.set("password", password);
    return this.http
      .post<Security>(authURL, body, httpOptions)
      .pipe(catchError(error => of(error)));
  }

  setAPIvalues() {
    let apiv = this.globals.sectiondata[5].apis.find(i => i.apiid == 41);
    this.globals.access.members = "";
    this.globals.access.events = "";
    this.globals.access.progs = "";
    this.globals.access.register = "";
    this.globals.access.badges = "";
    this.globals.access.noaccess = true;
    this.globals.access.progs = "";
    /* this.globals.memberaccess = "";
    this.globals.badgeaccess = "";
    this.globals.eventsaccess = "";
    this.globals.programmeaccess = "";
    this.globals.registeraccess = "";
    this.globals.noaccess = true; */
    if (apiv! != undefined) {
      if (!apiv.permissions.hasOwnProperty("empty")) {
        this.globals.access.members = apiv.permissions.member;

        this.globals.access.events = apiv.permissions.hasOwnProperty("events")
          ? apiv.permissions.events
          : 0;
        this.globals.access.progs = apiv.permissions.hasOwnProperty("programme")
          ? apiv.permissions.programme
          : 0;
        this.globals.access.register = apiv.permissions.hasOwnProperty(
          "register"
        )
          ? apiv.permissions.register
          : 0;
        this.globals.access.badges = apiv.permissions.hasOwnProperty("badges")
          ? apiv.permissions.badges
          : 0;
        this.globals.access.qm = apiv.permissions.hasOwnProperty(
          "quartermaster"
        )
          ? apiv.permissions.quartermaster
          : 0;
        this.globals.access.noaccess = false;
      }
    }
  }

  has_http_errors(a) {
    var e = false;
    for (var i = 0; i < a.length; i++) {
      if (a[i].hasOwnProperty("isError")) {
        e = true;
        i = a.length;
      }
    }
    return e;
  }

  getSectionConfig(): Observable<any> {
    let fullURL = this.configUrl + "?osmpath=api.php&action=getSectionConfig";
    let fullURL2 = this.configUrl + "?osmpath=api.php&action=getUserRoles";
    let fullURL3 = this.configUrl + "?osmpath=api.php&action=getTerms";
    let body = new HttpParams();
    body = body.set("secret", this.globals.secret);
    body = body.set("userid", this.globals.userid);

    return forkJoin(
      this.http
        .post(fullURL, body, httpOptions)
        .pipe(catchError(error => of({ isError: true, error }))),
      this.http
        .post(fullURL2, body, httpOptions)
        .pipe(catchError(error => of({ isError: true, error }))),
      this.http
        .post(fullURL3, body, httpOptions)
        .pipe(catchError(error => of({ isError: true, error })))
    );
  }

  getSectionData(sectionid, term): Observable<any> {
    let st = this.globals.config[1].find(i => i.sectionid == sectionid);
    let fullURL =
      this.configUrl +
      "?osmpath=ext/members/flexirecords/&action=getFlexiRecords&sectionid=" +
      sectionid +
      "&archived=n"; //Flexi
    let fullURL2 =
      this.configUrl + "?osmpath=ext/members/contact/grid/&action=getMembers"; // Members
    let fullURL3 =
      this.configUrl +
      "?osmpath=ext/settings/patrols/&action=get&sectionid=" +
      sectionid; //Patrols
    let fullURL4 =
      this.configUrl +
      "?osmpath=ext/events/summary/&action=get&sectionid=" +
      sectionid +
      "&termid=" +
      term; //Events
    let fullURL5 =
      this.configUrl +
      "?osmpath=ext/programme/&action=getProgrammeSummary&sectionid=" +
      sectionid +
      "&termid=" +
      term; //Programme
    let fullURL6 =
      this.configUrl +
      "?osmpath=ext/settings/access/&action=getAPIAccess&sectionid=" +
      sectionid; // access
    let fullURL7 =
      this.configUrl +
      "?osmpath=ext/members/attendance/&action=structure&sectionid=" +
      sectionid +
      "&termid=" +
      term +
      "&section=" +
      st.section;
    let fullURL8 =
      this.configUrl +
      "?osmpath=ext/members/attendance/&action=get&sectionid=" +
      sectionid +
      "&termid=" +
      term +
      "&section=" +
      st.section +
      "&nototal=true";
    let fullURL9 =
      this.configUrl +
      "?osmpath=ext/quartermaster/&action=getListOfLists&section=scouts&sectionid=" +
      sectionid;
    let body = new HttpParams();
    body = body.set("secret", this.globals.secret);
    body = body.set("userid", this.globals.userid);
    let body2 = new HttpParams();
    body2 = body2.set("secret", this.globals.secret);
    body2 = body2.set("userid", this.globals.userid);
    body2 = body2.set("section_id", sectionid);
    body2 = body2.set("term_id", term);
    return forkJoin(
      this.http
        .post(fullURL, body, httpOptions)
        .pipe(catchError(error => of({ isError: true, error }))),
      this.http
        .post(fullURL2, body2, httpOptions)
        .pipe(catchError(error => of({ isError: true, error }))),
      this.http
        .post(fullURL3, body, httpOptions)
        .pipe(catchError(error => of({ isError: true, error }))),
      this.http
        .post(fullURL4, body, httpOptions)
        .pipe(catchError(error => of({ isError: true, error }))),
      this.http
        .post(fullURL5, body, httpOptions)
        .pipe(catchError(error => of({ isError: true, error }))),
      this.http
        .post(fullURL6, body, httpOptions)
        .pipe(catchError(error => of({ isError: true, error }))),
      this.http
        .post(fullURL7, body, httpOptions)
        .pipe(catchError(error => of({ isError: true, error }))),
      this.http
        .post(fullURL8, body, httpOptions)
        .pipe(catchError(error => of({ isError: true, error }))),
      this.http
        .post(fullURL9, body, httpOptions)
        .pipe(catchError(error => of({ isError: true, error })))
    );
  }

  getEventAData(event): Observable<any> {
    let fullURL =
      this.configUrl +
      "?osmpath=ext/events/event/&action=getAttendance&eventid=" +
      event;
    fullURL =
      fullURL +
      "&sectionid=" +
      this.globals.mysection +
      "&termid=" +
      this.globals.config[2][this.globals.mysection][this.globals.current_term]
        .termid;
    //this.globals.current_term;
    let body = new HttpParams();
    body = body.set("secret", this.globals.secret);
    body = body.set("userid", this.globals.userid);
    return this.http
      .post(fullURL, body, httpOptions)
      .pipe(catchError(error => of("error")));
  }

//https://www.onlinescoutmanager.co.uk/ext/events/event/sharing/?action=getAttendance&eventid=579164&sectionid=26965&_v=2

  getEventAData2(event) {
    let fullURL =
      this.configUrl +
      "?osmpath=ext/events/event/&action=getAttendance&eventid=" +
      event;
    fullURL =
      fullURL +
      "&sectionid=" +
      this.globals.mysection +
      "&termid=" +
      this.globals.config[2][this.globals.mysection][this.globals.current_term]
        .termid;
    //this.globals.current_term;
    let body = new HttpParams();
    body = body.set("secret", this.globals.secret);
    body = body.set("userid", this.globals.userid);
    return this.http
      .post(fullURL, body, httpOptions)
      .pipe(catchError(error => of("error")));
  }

  getEventsAData(): Observable<any> {
    if (!this.slowhttp) {
      let singleObservables = this.globals.sectiondata[3].items.map(event =>
        this.getEventAData(event.eventid)
      );
      return forkJoin(singleObservables);
    } else {
      let singleObservables = this.globals.sectiondata[3].items.map(event =>
        this.getEventAData2(event.eventid)
      );
      return from(singleObservables)
        .pipe(concatMap(param => this.f(param)))
        .pipe(toArray());
    }
  }

  //https://www.onlinescoutmanager.co.uk/ext/events/event/?action=getStructureForEvent&sectionid=3320&eventid=23958

  getEventData(event): Observable<any> {
    let fullURL =
      this.configUrl +
      "?osmpath=ext/events/event/&action=getStructureForEvent&eventid=" +
      event;
    fullURL =
      fullURL +
      "&sectionid=" +
      this.globals.mysection +
      "&termid=" +
      this.globals.config[2][this.globals.mysection][this.globals.current_term]
        .termid;
    let body = new HttpParams();
    body = body.set("secret", this.globals.secret);
    body = body.set("userid", this.globals.userid);

    return this.http
      .post(fullURL, body, httpOptions)
      .pipe(catchError(error => of(error)));
  }
  getEventData2(event) {
    let fullURL =
      this.configUrl +
      "?osmpath=ext/events/event/&action=getStructureForEvent&eventid=" +
      event;
    fullURL =
      fullURL +
      "&sectionid=" +
      this.globals.mysection +
      "&termid=" +
      this.globals.config[2][this.globals.mysection][this.globals.current_term]
        .termid;
    let body = new HttpParams();
    body = body.set("secret", this.globals.secret);
    body = body.set("userid", this.globals.userid);

    return this.http
      .post(fullURL, body, httpOptions)
      .pipe(catchError(error => of(error)));
  }

  getEventsData(): Observable<any> {
    //  let singleObservables = this.globals.sectiondata[3].items.map( event => this.getEventData(event.eventid) )

    if (!this.slowhttp) {
      let singleObservables = this.globals.sectiondata[3].items.map(event =>
        this.getEventData(event.eventid)
      );
      return forkJoin(singleObservables);
    } else {
      let singleObservables = this.globals.sectiondata[3].items.map(event =>
        this.getEventData2(event.eventid)
      );
      return from(singleObservables)
        .pipe(concatMap(param => this.f(param)))
        .pipe(toArray());
    }
    //return forkJoin(singleObservables);
  }
  //ext/programme/?action=getProgramme&eveningid=4327864&sectionid=3320&termid=349161

  getProgData(prog): Observable<any> {
    let fullURL =
      this.configUrl +
      "?osmpath=ext/programme/&action=getProgramme&eveningid=" +
      prog;
    fullURL =
      fullURL +
      "&sectionid=" +
      this.globals.mysection +
      "&termid=" +
      this.globals.config[2][this.globals.mysection][this.globals.current_term]
        .termid;
    let body = new HttpParams();
    body = body.set("secret", this.globals.secret);
    body = body.set("userid", this.globals.userid);
    // return this.http.post(fullURL,body,httpOptions).pipe(catchError(error => of(error)))
    return this.http
      .post(fullURL, body, httpOptions)
      .pipe(catchError(error => of({ isError: true, error })));
  }

  getProgData2(prog) {
    let fullURL =
      this.configUrl +
      "?osmpath=ext/programme/&action=getProgramme&eveningid=" +
      prog;
    fullURL =
      fullURL +
      "&sectionid=" +
      this.globals.mysection +
      "&termid=" +
      this.globals.config[2][this.globals.mysection][this.globals.current_term]
        .termid;
    let body = new HttpParams();
    body = body.set("secret", this.globals.secret);
    body = body.set("userid", this.globals.userid);
    // return this.http.post(fullURL,body,httpOptions).pipe(catchError(error => of(error)))
    return this.http
      .post(fullURL, body, httpOptions)
      .pipe(catchError(error => of({ isError: true, error })));
  }

  f(x) {
    return x;
  }

  getProgsData(): Observable<any> {
    if (!this.slowhttp) {
      let singleObservables = this.globals.sectiondata[4].items.map(prog =>
        this.getProgData(prog.eveningid)
      );
      return forkJoin(singleObservables);
    } else {
      let singleObservables = this.globals.sectiondata[4].items.map(prog =>
        this.getProgData2(prog.eveningid)
      );
      return from(singleObservables)
        .pipe(concatMap(param => this.f(param)))
        .pipe(toArray());
    }
  }

  getQMData2(list, sec): Observable<any> {
    let fullURL =
      this.configUrl +
      "?osmpath=ext/quartermaster/&action=getList&listid=" +
      list;
    fullURL = fullURL + "&sectionid=" + this.globals.mysection;
    let body = new HttpParams();
    body = body.set("secret", this.globals.secret);
    body = body.set("userid", this.globals.userid);
    // return this.http.post(fullURL,body,httpOptions).pipe(catchError(error => of(error)))
    return this.http
      .post(fullURL, body, httpOptions)
      .pipe(catchError(error => of({ isError: true, error })));
  }

  getQMData(list, sec) {
    let fullURL =
      this.configUrl +
      "?osmpath=ext/quartermaster/&action=getList&listid=" +
      list;
    fullURL = fullURL + "&sectionid=" + this.globals.mysection;
    let body = new HttpParams();
    body = body.set("secret", this.globals.secret);
    body = body.set("userid", this.globals.userid);
    // return this.http.post(fullURL,body,httpOptions).pipe(catchError(error => of(error)))
    return this.http
      .post(fullURL, body, httpOptions)
      .pipe(catchError(error => of({ isError: true, error })));
  }

  getQMListData(): Observable<any> {
    if (!this.slowhttp) {
      let singleObservables = this.globals.sectiondata[8].data.map(list =>
        this.getQMData2(list.id, list.sectionid)
      );
      return forkJoin(singleObservables);
    } else {
      let singleObservables = this.globals.sectiondata[8].data.map(list =>
        this.getQMData(list.id, list.sectionid)
      );
      return from(singleObservables)
        .pipe(concatMap(param => this.f(param)))
        .pipe(toArray());
    }
  }
  
  
}
