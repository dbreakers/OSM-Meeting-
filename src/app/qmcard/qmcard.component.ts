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
  REDIRECT = "https://scouttoolset.firebaseapp.com/auth.html";

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

 uploadFile() {

const UPLOAD_FILE_SIZE_LIMIT = 150 * 1024 * 1024;
     // var ACCESS_TOKEN = this.globals.dbx_token;
     // var dbx = new Dropbox.Dropbox({ accessToken: ACCESS_TOKEN });
      var fileInput = document.getElementById('file-upload');
      var file = fileInput.files[0];
      
      
      if (file.size < UPLOAD_FILE_SIZE_LIMIT) { // File is smaller than 150 Mb - use filesUpload API
        this.dbx.filesUpload({path: '/' + file.name, contents: file})
          .then(function(response) {
            var results = document.getElementById('test');
            results.appendChild(document.createTextNode('File uploaded!'));
            console.log(response);
          })
          .catch(function(error) {
            console.error(error);
          });
      } else { // File is bigger than 150 Mb - use filesUploadSession* API
        const maxBlob = 8 * 1000 * 1000; // 8Mb - Dropbox JavaScript API suggested max file / chunk size

        var workItems = [];     
      
        var offset = 0;

        while (offset < file.size) {
          var chunkSize = Math.min(maxBlob, file.size - offset);
          workItems.push(file.slice(offset, offset + chunkSize));
          offset += chunkSize;
        } 
          
        const task = workItems.reduce((acc, blob, idx, items) => {
          if (idx == 0) {
            // Starting multipart upload of file
            return acc.then(function() {
              return this.dbx.filesUploadSessionStart({ close: false, contents: blob})
                        .then(response => response.session_id)
            });          
          } else if (idx < items.length-1) {  
            // Append part to the upload session
            return acc.then(function(sessionId) {
             var cursor = { session_id: sessionId, offset: idx * maxBlob };
             return this.dbx.filesUploadSessionAppendV2({ cursor: cursor, close: false, contents: blob }).then(() => sessionId); 
            });
          } else {
            // Last chunk of data, close session
            return acc.then(function(sessionId) {
              var cursor = { session_id: sessionId, offset: file.size - blob.size };
              var commit = { path: '/' + file.name, mode: 'add', autorename: true, mute: false };              
              return this.dbx.filesUploadSessionFinish({ cursor: cursor, commit: commit, contents: blob });           
            });
          }          
        }, Promise.resolve());
        
        task.then(function(result) {
          var results = document.getElementById('results');
          results.appendChild(document.createTextNode('File uploaded!'));
        }).catch(function(error) {
          console.error(error);
        });
        
      }
      return false;
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

do_drop() {
  //debugger;
  this.accessToken = this.gup(this.$scope,"access_token")
  //debugger;
  this.globals.dbx_token = this.accessToken;
  this.dbx = new Dropbox({ accessToken: this.accessToken });
  this.dbx
     .filesListFolder({ path: "" })
     .then(response => this.get_thumbs(response));
    
  
}
  validateToken(token) {}

  gup(url, name) {
    name = name.replace(/[[]/, "[").replace(/[]]/, "]");
    var regexS = "[#?&]" + name + "=([^&#]*)";
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
    if (this.globals.dbx_token=="") {
    this.REDIRECT = window.document.URL+"auth.html"
    var authUrl = this.dbx.getAuthenticationUrl(this.REDIRECT);
    this.win = window.open(authUrl, "_blank");//"windowname1", "width=800, height=600");
    var pollTimer =   window.setInterval(function(t,w,r,a) {

      try {
        console.log(w.document.URL);
        if (w.document.URL.indexOf(r) != -1) {
          window.clearInterval(pollTimer);
          var url = w.document.URL;
         // var acToken = gup(url, "access_token");
         // var tokenType = gup(url, "token_type");
         // var expiresIn = gup(url, "expires_in");
           t.$scope = url;
          w.close();
          t.do_drop();
       //   this.validateToken(acToken);
        }
      } catch (e) {}
    }, 100, this, this.win, this.REDIRECT, this.ac);
    } else {
      this.accessToken = this.globals.dbx_token;
this.dbx = new Dropbox({ accessToken: this.accessToken });
  this.dbx
     .filesListFolder({ path: "" })
     .then(response => this.get_thumbs(response));
    }
  
  }

  // this.dbx
  //   .filesListFolder({ path: "/Apps/OSM Meeting+/" })
  //   .then(response => this.get_thumbs(response));
}
