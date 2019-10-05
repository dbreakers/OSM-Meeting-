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


@Component({
  selector: 'ons-page[qmlist]',
  templateUrl: './qmlists.component.html',
   styleUrls: ['./qmlists.component.css']
})

export class QMListsComponent implements OnInit {
  
  constructor(private _navigator: OnsNavigator,
    private inj: Injector,
    private _params: Params, 
    private globals: Globals,
  
    ) { }
      
        openMenu() {
    this.inj.get(AppComponent).menu.nativeElement.open();
  }
      ngOnInit() {
      }
}