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
import { MedicalcardComponent } from '../medicalcard/medicalcard.component';
import { MedicalsummaryComponent } from '../medicalsummary/medicalsummary.component';
//import { MainComponent } from '../main/main.component';
//import { LogonService } from '../logon.service';
import { Globals } from '../globals';
import * as ons from 'onsenui';
import {  PhotoURLService } from '../photoUrl';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';


@Component({
  selector: 'ons-page[medical]',
  templateUrl: './medical.component.html',
   styleUrls: ['./medical.component.css']
})

export class MedicalComponent implements OnInit {
  members = new Array;
  namefilter = "";
  typefilter = 1;
  filterdisplay = new Array;  
  matches = new Object; 
  filtername = "";
  filterlist = new Array;
  constructor(private _navigator: OnsNavigator,
    private inj: Injector,
    private _params: Params, 
    private globals: Globals,
    private photoURL: PhotoURLService
    ) { }

compareValues(key, order='asc') {
  return function(a, b) {
    if(!a.hasOwnProperty(key) || 
       !b.hasOwnProperty(key)) {
  	  return 0; 
    }
    
    const varA = (typeof a[key] === 'string') ? 
      a[key].toUpperCase() : a[key];
    const varB = (typeof b[key] === 'string') ? 
      b[key].toUpperCase() : b[key];
      
    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return (
      (order == 'desc') ? 
      (comparison * -1) : comparison
    );
  };
}

no_matches(n) { return this.matches[n] }

make_PDF(){
  var headings = ["","Essential","Medical","Allergy","Dietary","Other"]
      var pdf_doc = new Object;
 var pdf_header = new Object;
var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; //January is 0!
      var yyyy = today.getFullYear();


      pdf_header.text = '\nPrinted from OSM Meeting+ on '+dd+"."+mm+"."+yyyy;
      pdf_header.margin = [20,0,0,0];
      pdf_doc.header = pdf_header;

 var pdf_footer = function(currentPage, pageCount) {  return {text: currentPage.toString() + ' of ' + pageCount, alignment: 'center'}; };
      pdf_doc.footer = pdf_footer;
      pdf_doc.content = new Array;
 var pdf_table = new Object ;
 var pdf_cell = new Object;
 var table_row = new Array;
      pdf_table.table = new Object;
      pdf_table.table.headerRows = 1;
      pdf_table.table.body = new Array;
      var table_row = new Array;  
      var sel_option = document.getElementById('segment').getActiveButtonIndex() + 1;
      table_row.push("Member");
      if (sel_option == 1) {
      table_row.push("Type");
      }
      table_row.push("Description");
      pdf_table.table.body.push(table_row);
  
      //pdf_doc.content.push(document.getElementById('segment').getActiveButtonIndex());
for (var i = 0; i < this.members.length; i++) {
  table_row = []; 
  if (this.filterdisplay[i]){
var pdf_cell = new Object;
    pdf_cell.text = this.members[i].first_name+" "+this.members[i].last_name;
    if (sel_option == 1) {pdf_cell.rowSpan = 4} else {pdf_cell.rowSpan = 1}
  table_row.push(pdf_cell);

  if ((sel_option == 1)||(sel_option == 2))
  {
    if (sel_option == 1) {table_row.push("Medical");}
    table_row.push(this.members[i].custom_data[9][24253]);
    pdf_table.table.body.push(table_row);
    table_row = [];
    table_row.push(pdf_cell);
  }
  if ((sel_option == 1)||(sel_option == 3))
  {
    if (sel_option == 1) {table_row.push("Allergy");}
    table_row.push(this.members[i].custom_data[9][24254]);
    pdf_table.table.body.push(table_row);
    table_row = [];
    table_row.push(pdf_cell);
  }
  if ((sel_option == 1)||(sel_option == 4))
  {
    if (sel_option == 1) {table_row.push("Dietary");}
    table_row.push(this.members[i].custom_data[9][24255]);
    pdf_table.table.body.push(table_row);
    table_row = [];
    table_row.push(pdf_cell);
  }
  if ((sel_option == 1)||(sel_option == 5))
  {
    if (sel_option == 1) {table_row.push("Other");}
    table_row.push(this.members[i].custom_data[9][24257]);
    pdf_table.table.body.push(table_row);
    table_row = [];
  }
  
}
}
pdf_doc.content = new Array 
//if (sel_option != 1) {
//}
var pdf_cell = new Object;

pdf_cell.text = headings[sel_option]+" Information\n";
pdf_cell.style = "header";
pdf_doc.content.push(pdf_cell);
if (this.filtername!="") {
var pdf_cell = new Object;
pdf_cell.text = "For Event: "+this.filtername;
pdf_cell.style = "subheader";  
} else {
var pdf_cell = new Object;
pdf_cell.text = "For complete section"; 
pdf_cell.style = "subheader";  
}
pdf_doc.content.push("\n");
pdf_doc.content.push(pdf_cell);

pdf_doc.content.push(pdf_table); 
//pdfMake.createPdf(docDefinition, tableLayouts, fonts, vfs)

pdf_doc.styles = {
		header: {
			fontSize: 18,
			bold: true
		},
		subheader: {
			fontSize: 15,
			bold: true
		}}
pdfMake.createPdf(pdf_doc,"","",pdfFonts.pdfMake.vfs).open();
}

sort_list(name,order){
  
  this.members.sort(this.compareValues(name, order))
  this.update_search(0,-1);
}

summary(option)
{
    this._navigator.element.pushPage(MedicalsummaryComponent, { data: { index: option } });
}

update_search(s,x) {
  if (x!=-1) {this.typefilter = x;}
  for (var i = 0; i < this.members.length; i++) {
    if (((this.members[i].last_name.toUpperCase()).indexOf(this.namefilter.toUpperCase()) == -1)&&((this.members[i].first_name.toUpperCase()).indexOf(this.namefilter.toUpperCase()) == -1))
    {this.filterdisplay[i]=false} else {this.filterdisplay[i]=true}
    if ((this.typefilter==2)&&(this.filterdisplay[i]==true)) {
      if (this.members[i].custom_data[9][24253]=="")
      {
             this.filterdisplay[i]=false         
      }
    }
    if ((this.typefilter==3)&&(this.filterdisplay[i]==true)) {
      if (this.members[i].custom_data[9][24254]=="")
      {
             this.filterdisplay[i]=false         
      }
    }
   if ((this.typefilter==4)&&(this.filterdisplay[i]==true)) {
      if (this.members[i].custom_data[9][24255]=="")
      {
             this.filterdisplay[i]=false         
      }
    }
    if ((this.typefilter==5)&&(this.filterdisplay[i]==true)) {
      if (this.members[i].custom_data[9][24257]=="")
      {
             this.filterdisplay[i]=false         
      }
    }
    if (this.filterlist.length>0){
      if (this.filterlist.find( o => o == this.members[i].member_id)!=this.members[i].member_id)
      { this.filterdisplay[i]=false   ; }
    }

  }
}
get_photo_url(member) {
    return this.photoURL.get_osmphoto_url(member);
  }

  push(event, index, i) {
  
    this._navigator.element.pushPage(MedicalcardComponent, { data: { index: this.members[i].member_id } });

  }

 

  openMenu() {
    this.inj.get(AppComponent).menu.nativeElement.open();
  }

  
  ngOnInit() {

  this.members =  Object.keys(this.globals.sectiondata[1].data).map(i => this.globals.sectiondata[1].data[i]);
  this.matches = this.members.reduce((acc, o) => (acc[o.first_name] = (acc[o.first_name] || 0) + 1, acc), {});  
  if (this._params.data && this._params.data.filtername){
      this.filtername = this._params.data.filtername;
    }
  if (this._params.data && this._params.data.filterlist){
      this.filterlist = this._params.data.filterlist;
    }
  for (var i = 0; i < this.members.length; i++) {
    if (this.filterlist.length>0){
      if (this.filterlist.find( o => o == this.members[i].member_id)==this.members[i].member_id)
      { this.filterdisplay.push(true); } else { this.filterdisplay.push(false); }}
     else 
    { this.filterdisplay.push(true); }//
  }
}


}