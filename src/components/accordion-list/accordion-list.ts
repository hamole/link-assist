import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';


/*
  Generated class for the AccordionList component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'accordion-list',
  templateUrl: 'accordion-list.html'
})
export class AccordionListComponent implements OnInit{
  @Input() name: string;

  @Input() items: string[];

  icon: string;
  expanded: boolean;

  @Output() itemClicked: EventEmitter<string> = new EventEmitter<string>();


  constructor() {
    console.log('Hello AccordionList Component');
  }

  ngOnInit(){
    this.icon = "arrow-dropdown";
    this.expanded = false;
  }

  toggle(){
    this.expanded = !this.expanded;
    if(this.expanded){
      this.icon = "arrow-dropup";
    } else {
      this.icon = "arrow-dropdown";
    }
  }

  menuItemClicked(item: string){
    this.itemClicked.emit(item);
  }
}
