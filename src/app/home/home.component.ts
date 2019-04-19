
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
import { PageNav1Component } from '../PageNav1/PageNav1.component';
import { SectionselectComponent} from '../sectionselect/sectionselect.component';
import { MainComponent } from '../main/main.component';
import { Globals } from '../globals';
import * as ons from 'onsenui';
import { LogonService } from '../logon.service';
import { Security } from '../security';

@Component({
  selector: 'ons-page[home]',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {
 //var error_text: string;
 error_text = "";
 //error_text : string;
 
 //security: Security;

  constructor(private _navigator: OnsNavigator, 
              private inj: Injector,
              private logonService: LogonService, 
              private globals: Globals) { }

  push():void {
//ons.notification.alert('Logon');
    this._navigator.element.pushPage(PageNav1Component);
  }

section_config_return(s) {
  this.globals.configread = true;
    this.globals.config = s;
    var found = false;
    for (var i = 0; i < this.globals.config[1].length; i++) {
      if (this.globals.config[1][i].sectionid==this.globals.mysection)
      {
        found = true;
        this.globals.sectionname = this.globals.config[1][i].groupname + ":" + this.globals.config[1][i].sectionname;
      }
    }
    if ((this.globals.mysection=="")||(found==false))
    {
      this.globals.mysection = this.globals.config[1][0].sectionid;
    }
  
  if (found!=true)
  {
    this._navigator.element.replacePage(SectionselectComponent);
    
  } else
  {this._navigator.element.replacePage(MainComponent);}
}

  post_logon(api_return : any)
  {
    if (api_return.hasOwnProperty('error'))
    { this.error_text = api_return.error } else
    { this.globals.secret = api_return.secret;
    this.globals.userid = api_return.userid;
    //this.globals.pageload = false;
    //this._navigator.element.replacePage(SectionselectComponent).then(alert("me"));
     this.logonService.getSectionConfig().subscribe(SectionConfig => this.section_config_return(SectionConfig));

    
    }
  }

  logon(username2 : string,password2:string): void {
    this.validate(username2, password2);
    if (( this.error_text == "" ) && (password2=="")) {this.error_text = "You must enter a password";}
    if (this.error_text=="")
    {
    
       this.logonService.doLogon(username2,password2).subscribe(Security=> this.post_logon(Security));

    }
  }


   validate2(email,password) {
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)))
  {
     return false
    //ons.notification.alert('Mail '+ email);
  } else {
    
    
  if (password=="") {return false} 
  }
  //this.error_text = "";
  return true;
   }

  validate(email,password) {
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)))
  {
    this.error_text = "You have entered an invalid email address!";
    
    //ons.notification.alert('Mail '+ email);
  } else {
    this.error_text = "";

       }
   
  }


  openMenu() {
    this.inj.get(AppComponent).menu.nativeElement.open();
  }

  
}