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
import { Dropbox } from "dropbox";
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
  accessToken = "";
  win: any;
  ac="";
  $scope = "";
  REDIRECT = "https://scouttoolset.firebaseapp.com/auth";

  images = new Object();
  dbx = new Dropbox({ clientId: "qxf5tksolzymekf" });
  //dbx = new Dropbox({ accessToken: this.accessToken });
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

  do_images(i) {
    this.images = i;
    for (var q = 0; q < this.images.entries.length; q++) {
      var image = new Image();
      image.src = "data:image/jpeg;base64," + this.images.entries[q].thumbnail;
      document.getElementById("test").appendChild(image);
    }
  }

  get_thumbs(r) {
    var e = new Object();
    e.entries = [];
    for (var q = 0; q < r.entries.length && q < 10; q++) {
      var g = new Object();
      g.path = r.entries[q].path_lower;
      g.format = "jpeg";
      g.size = "w256h256";
      e.entries.push(g);
    }
    this.dbx.filesGetThumbnailBatch(e).then(Events => this.do_images(Events));
  }

  validateToken(token) {}

  //credits: http://www.netlobo.com/url_query_string_javascript.html
  gup(url, name) {
    name = name.replace(/[[]/, "[").replace(/[]]/, "]");
    var regexS = "[?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(url);
    if (results == null) return "";
    else return results[1];
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

    var authUrl = this.dbx.getAuthenticationUrl("https://scouttoolset.firebaseapp.com/auth");
    this.win = window.open(authUrl, "windowname1", "width=800, height=600");
    var pollTimer = window.setInterval(function(w,r,a) {
   

      try {
        console.log(w.document.URL);
        if (w.document.URL.indexOf(r) != -1) {
          window.clearInterval(pollTimer);
          var url = w.document.URL;
         // var acToken = gup(url, "access_token");
         // var tokenType = gup(url, "token_type");
         // var expiresIn = gup(url, "expires_in");
           $scope = url;
          w.close();

       //   this.validateToken(acToken);
        }
      } catch (e) {}
    }, 100, this.win, this.REDIRECT, this.ac);
    
  
  }

  // this.dbx
  //   .filesListFolder({ path: "/Apps/OSM Meeting+/" })
  //   .then(response => this.get_thumbs(response));
}
