import { Component, OnInit } from '@angular/core';
import { Globals } from '../../globals';
import {  PhotoURLService } from '../../photoUrl';
import * as ons from 'onsenui';
import {DomSanitizer} from '@angular/platform-browser'

@Component({
  selector: 'ons-page[summarytab]',
  templateUrl: './summarytab.component.html',
  styleUrls: ['./summarytab.component.css']
})
export class SummarytabComponent implements OnInit {

  constructor(
    private sanitizer: DomSanitizer, 
    private globals: Globals,
    private photoURL: PhotoURLService) {  }
 
  
  

  ngOnInit() {
   this.event = this.globals.event.find(f=>f.eventid==this.globals.eventcard)
   this.eventA = this.globals.eventA.find(f=>f.eventid==this.globals.eventcard)
  }

}