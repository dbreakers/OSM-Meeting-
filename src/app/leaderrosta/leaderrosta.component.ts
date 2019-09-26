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
  selector: 'ons-page[leaderrosta]',
  templateUrl: './leaderrosta.component.html',
  styleUrls: ['./leaderrosta.component.css']
})

export class LeaderrostaComponent implements OnInit {

  _onPaste_StripFormatting_IEPaste = false;
 members = new Array;
 selected_meeting = -1;
progs_copy = [];
singleprog=""

constructor(
    private inj: Injector,
    private globals: Globals,
    private sorting: Sortservice,
    private _navigator: OnsNavigator,
    private _params: Params, 
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
 this.logonService.mod_parents(2,this.globals.progs[i].items[0].help[j].scoutid,this.globals.progs[i].items[0].eveningid,this.globals.progs[i].items[0].meetingdate).subscribe(Security=> this.alert(Security,"Helper"));
this.globals.progs[i].items[0].help.splice(j,1);
}

clickmember(a) {
  var input = document.getElementById("myInput");
  input.value = a.first_name+" "+a.last_name;
  this.filterFunction();
}

add_active() {
  var input = document.getElementById("myInput");
  var filter = input.value.toUpperCase();
  var div = document.getElementById("myDropdown");
  var a = div.getElementsByTagName("a");
  var count = 0;
  var member = {}
  for (var i = 0; i < a.length; i++) {
     var txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      count = count + 1;
     }  
  }
  if (count==1){
   for (var i = 0; i < this.members.length; i++) {
   var name = this.members[i].first_name+" "+this.members[i].last_name;
   if (name.toUpperCase().indexOf(filter) > -1) {
     member = this.members[i];
    // count = count + 1;
   }
 }

 if(this.globals.progs[this.selected_meeting].items[0].help.find(i => i.scoutid==member.member_id)!=undefined) { count=0}
  }
  if (count == 1) {return true} else {return false}
}

filterFunction() {
  var input, filter, ul, li, a, i, div;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    var txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
}
}

click_close() {
  document
  .getElementById('dialog')
  .hide();
}

click_add(cl) {
var count = 0;
var member = {};  
var input = document.getElementById("myInput");
var  filter = input.value.toUpperCase();
 for (var i = 0; i < this.members.length; i++) {
   var name = this.members[i].first_name+" "+this.members[i].last_name;
   if (name.toUpperCase().indexOf(filter) > -1) {
     member = this.members[i];
     count = count + 1;
   }
 }
 if (count==1) {
   var obj = {};
   obj["scoutid"] = member.member_id.toString();
   obj["scout"] = member.first_name+" "+member.last_name;
   this.globals.progs[this.selected_meeting].items[0].help.push(obj);
//this.logonService.update_parents(obj,a).subscribe(Security=> this.alert(Security,"Text"));
   this.logonService.mod_parents(1,member.member_id.toString(),this.globals.progs[this.selected_meeting].items[0].eveningid,this.globals.progs[this.selected_meeting].items[0].meetingdate).subscribe(Security=> this.alert(Security,"Helper"));
   if (cl==1){
   document.getElementById('dialog').hide();
   } else {
     input.value= "";
     this.filterFunction();
   }
 }   
}


sellist(o) {
// var dd = document.getElementById('myDropdown');
// if (o==1) {dd.style.display = "none";} else {dd.style.display = "";}
 }

addhelper(i) {
var input = document.getElementById("myInput");
input.value = "";
  this.filterFunction();
this.selected_meeting = i;
this.sellist(1); 
  document.getElementById('dialog').show();
}

alert(a,t) {   
 var original = this.progs_copy.find(i=>i.items[0].eveningid==a.eveningid)  
if ((t=="Text") && (original!=undefined)) {
  original.items[0].notesforhelpingparents = a.notesforhelpingparents;
}
 ons.notification.toast(t+' updated for meeting '+a.title, {timeout: 2000});
}

update_text(a) {

 var obj = {};
 obj["notesforhelpingparents"] = window.document.getElementById(a).innerText;
 var original = this.progs_copy.find(i=>i.items[0].eveningid==a)
 if (original != undefined) {
 if (obj.notesforhelpingparents!=original.items[0].notesforhelpingparents){   
   
this.logonService.update_parents(obj,a).subscribe(Security=> this.alert(Security,"Text"));
 }}}

absent(event,scout,prog,f,l){
  var pres = prog.items[0].unavailableleaders.find(i=>i.member_id==scout);
  if (pres==undefined) {
      var obj = {};
   obj["member_id"] = scout;
   obj["last_name"] = l;
   obj["first_name"] = f;
   prog.items[0].unavailableleaders.push(obj);
  } else {
    var pres = prog.items[0].unavailableleaders.findIndex(i=>i.member_id==scout);
    prog.items[0].unavailableleaders.splice(pres,1);
  }
}

leader_present(scout,prog) {
  if (prog != undefined) {
  var pres = prog.items[0].unavailableleaders.find(i=>i.member_id==scout);
  if (pres==undefined) {return true} else {return false}
  } else
  return false
}

go(e,prog){
   this._navigator.element.pushPage(ProgcardComponent, { data: { index: prog.eveningid } });
}

ngOnInit() {
//    debugger;
  this.singleprog = "";
   if (this._params) {
  //   debugger;
    if (this._params.data && this._params.data.index){
      this.singleprog = this._params.data.index;
    }
  }
this.members =  Object.keys(this.globals.sectiondata[1].data).map(i => this.globals.sectiondata[1].data[i]);
//this.progs_copy = this.globals.progs;
}
}