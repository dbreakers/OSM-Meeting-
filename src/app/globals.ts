import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
  version: string = '1.0.1';
  login: boolean = false;
  secret: string = "";
  userid: string = "";
  mysection: string = "3320";
  scoutcard: string = "";
  eventcard: string = "";
  application: string = "OSM Meeting+";
  proxyURL: string = "https://www.2ndnewhawscouts.org.uk/osmr/osmrelay2.php";
  configread: boolean = false;
  config: any;
  sectiondata: any;
  event: Array<any>= [];
  eventA:  Array<any> = [];
  progs:  Array<any> = [];
  eventsection: string = "";
  sectiondatasection: string = "";
  current_term: string  = "-1";
  memberaccess: string = "";
  badgeaccess: string = "";
  eventsaccess: string = "";
  programmeaccess: string = "";
  registeraccess: string = "";
  noaccess: boolean = true;
  loadprogs: boolean = false;
  sectionname: string = "No Section";
  patrolroles: Object = {scouts:  ["","APL","PL","SPL"],explorers:  ["","APL","PL","SPL"],
 cubs: ["","2er","6er","S6er"],
 beavers: ["","ALL","LL","SLL"]};
 loaded: Object = { progs: false, events: false,  eventsL: false, eventsA: false, members: false, register: false, config: false, section: false}     
 access: Object = { noaccess: true, badges: "",progs: "", events: "", members: "", register: ""}   
 errors: Object = { progs: false, events: false, members: false, register: false, config: false, section: false}  
}
