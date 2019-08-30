import {
  Component,
  Injector,
  ViewChild,
  Params,
  OnInit,
  OnsSplitterSide,
  OnsNavigator,
  OnsenModule,
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA
} from 'ngx-onsenui';

import { AppComponent } from '../app.component';
import { Globals } from '../globals';
import {  DateformatService } from '../dateformatter';
import * as ons from 'onsenui';
import {  Sortservice } from '../sort';
import { LogonService } from '../logon.service';
import { ProgcardComponent } from '../progcard/progcard.component';

@Component({
  selector: 'ons-page[rosta]',
  templateUrl: './rosta.component.html',
  styleUrls: ['./rosta.component.css']
})

export class RostaComponent implements OnInit {

  _onPaste_StripFormatting_IEPaste = false;
 
constructor(
    private inj: Injector,
    private globals: Globals,
    private sorting: Sortservice,
    private _navigator: OnsNavigator,
    private logonService: LogonService, 
    private dateFormat: DateformatService) { }

 openMenu() {
    this.inj.get(AppComponent).menu.nativeElement.open();
  }


timeformat(t) {

  var h = t.substring(0, 2);
  var m = t.substring(3, 5);
  var s = t.substring(6, 8);
  var ampm = h >= 12 ? 'pm' : 'am';
  h = h % 12
  h = h ? h : 12;
  return h + ':' + m + ' ' + ampm;}


eventdates(s,e) {
  var subtitle = "";
  if (e=="1970-01-01"){ e=null}
 // if (e!=null) { subtitle = "From "; }
  subtitle = subtitle + this.dateFormat.date_format_date(s,false);
  if (e!=null) {
    subtitle = subtitle + " - ";
    subtitle = subtitle + this.dateFormat.date_format_date(e,false);
    subtitle = subtitle + " (" + this.dateFormat.date_format_days_between(s,e)+" day";
    if (this.dateFormat.date_format_days_between(s,e)>1) {subtitle=subtitle+"s"}
    subtitle = subtitle + ")"; 
  }
  return subtitle
}

OnPaste_StripFormatting(e: ClipboardEvent) {

        if (e.originalEvent && e.originalEvent.clipboardData && e.originalEvent.clipboardData.getData) {
            e.preventDefault();
            var text = e.originalEvent.clipboardData.getData('text/plain');
            window.document.execCommand('insertText', false, text);
        }
        else if (e.clipboardData && e.clipboardData.getData) {
            e.preventDefault();
            var text = e.clipboardData.getData('text/plain');
            window.document.execCommand('insertText', false, text);
        }
        else if (window.clipboardData && window.clipboardData.getData) {
            // Stop stack overflow
            if (!_onPaste_StripFormatting_IEPaste) {
                _onPaste_StripFormatting_IEPaste = true;
                e.preventDefault();
                window.document.execCommand('ms-pasteTextOnly', false);
            }
            _onPaste_StripFormatting_IEPaste = false;
        }

    }
adjust(a,v) {
  var idx = this.globals.progs.findIndex(i => i.items[0].eveningid == a)
  
  var c = Number(this.globals.progs[idx].items[0].parentsrequired);
  if ((c+v)>=0) {
  this.globals.progs[idx].items[0].parentsrequired = c  + v;
  //{"parentsrequired":1}
  var obj = {};
    obj["parentsrequired"] = this.globals.progs[idx].items[0].parentsrequired;
this.logonService.update_parents(obj,a).subscribe(Security=> this.alert(Security,"Counter"));

  }
 // alert(idx);
}

removehelper(i,j) {

  this.globals.progs[i].items[0].help.splice(j,1);
}

addhelper(i) {
  var obj = {};
obj["scout"] = "David";
  this.globals.progs[i].items[0].help.push(obj);
}

alert(a,t) {   
//  alert(window.document.getElementById(a).innerText)  
 ons.notification.toast(t+' Updated', {timeout: 2000});
}

update_text(a) {
//this.logonService.update_parents_text
 var obj = {};
    obj["notesforhelpingparents"] = window.document.getElementById(a).innerText;
this.logonService.update_parents(obj,a).subscribe(Security=> this.alert(Security,"Text"));

//doLogon(username2,password2).subscribe(Security=> this.post_logon(Security));

}
//update_parents_text(ptext:string,section,evening)

go(e,prog){
   this._navigator.element.pushPage(ProgcardComponent, { data: { index: prog.eveningid } });
}

ngOnInit() {
 // this.globals.eventA.sort(this.sorting.compareValuesArray(["startdate"],"desc"))

}
}