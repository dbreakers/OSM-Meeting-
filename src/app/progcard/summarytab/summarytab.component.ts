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
//import { Component, OnInit } from '@angular/core';
import { Globals } from '../../globals';
//import {  PhotoURLService } from '../../photoUrl';
import * as ons from 'onsenui';
//import {DomSanitizer} from '@angular/platform-browser'
import {  DateformatService } from '../../dateformatter';
//import { MedicalComponent } from '../../medical/medical.component';

@Component({
  selector: 'ons-page[summarytab]',
  templateUrl: './summarytab.component.html',
  styleUrls: ['./summarytab.component.css']
})
export class ProgSummarytabComponent implements OnInit {

prog : object;

  constructor(
    private globals: Globals,
     private _navigator: OnsNavigator,
    private dateFormat: DateformatService
 ) {  }
 
  
  ngOnInit() {
   this.prog = this.globals.progs.find(i => i.items[0].eveningid == this.globals.progcard)
   }

}