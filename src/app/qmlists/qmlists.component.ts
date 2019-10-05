import {
  Component,
  Injector,
  ViewChild,
  Params,
  OnInit,
  OnChanges,
  OnsSplitterSide,
  OnsNavigator,
  OnsenModule,
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA
} from 'ngx-onsenui';

import { AppComponent } from '../app.component';
import { Globals } from '../globals';
import * as ons from 'onsenui'
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import {  Sortservice } from '../sort';

@Component({
  selector: 'ons-page[qmlist]',
  templateUrl: './qmlists.component.html',
   styleUrls: ['./qmlists.component.css']
})

export class QMListsComponent implements OnInit {

sortable_list = [];

  constructor(private _navigator: OnsNavigator,
    private inj: Injector,
    private sorting: Sortservice,
    private _params: Params, 
    private globals: Globals,
  
    ) { }
  
        openMenu() {
    this.inj.get(AppComponent).menu.nativeElement.open();
  }
      ngOnInit() {
      
       for(var i = 0; i < this.globals.qmlist.length; i++) {
         this.sortable_list.push(Object.keys(this.globals.qmlist[i].data.rows).map(key => {
    this.globals.qmlist[i].data.rows[key].id = key; return this.globals.qmlist[i].data.rows[key];}));
  
  this.sortable_list.sort(this.sorting.compareValuesArray(["1"],"desc"));
       }
      }
}