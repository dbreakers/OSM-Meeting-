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
} from "ngx-onsenui";

import { AppComponent } from "../app.component";
import {Dropbox} from 'dropbox';
import { Globals } from "../globals";
import * as ons from "onsenui";
import * as pdfMake from "pdfmake/build/pdfmake.js";
import * as pdfFonts from "pdfmake/build/vfs_fonts.js";
import { Sortservice } from "../sort";

@Component({
  selector: "ons-page[qmcard]",
  templateUrl: "./qmcard.component.html",
  styleUrls: ["./qmcard.component.css"]
})
export class QMcardComponent implements OnInit {
  //sortable_list = [];
  QMitem = new Object();
  QMlist = new Object();
  accessToken = "7hU8qdXO9HAAAAAAAAC8VPwLqOsa_xemA1P5pd6KVRUiDf4svT7fj8UetMDYNw-1" ;
  //dbx = new Object;
  constructor(
    private _navigator: OnsNavigator,
    private inj: Injector,
    private sorting: Sortservice,
    private _params: Params,
    private globals: Globals
  ) {}

  openMenu() {
    this.inj.get(AppComponent).menu.nativeElement.open();
  }
  ngOnInit() {
    if (this._params.data && this._params.data.list && this._params.data.id) {
      this.QMlist = this.globals.qmlist.find(
        i => i.data.list.id == this._params.data.list
      );
      if (this.QMlist != undefined) {
        this.QMitem = this.QMlist.data.rows[this._params.data.id];
      }
    }
 var dbx = new Dropbox({ accessToken:this.accessToken});
 dbx.filesListFolder({    path: ''  }).then(response => console.log(response))   
 dbx.filesGetThumbnailBatch({    entries: [{  path: '"/new haw banner.pdf',size: 'w32h32', format: 'png'}]  
});
}

}
  
 