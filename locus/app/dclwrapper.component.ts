import {Component, Input, ComponentRef, ViewChild, ViewContainerRef, DynamicComponentLoader} from 'angular2/core';

@Component({
  selector: 'dcl-wrapper',
  template: `<div #target></div>`
})
export class DclWrapper {
  @ViewChild('target') target;
  @Input() type;
  @Input() selectedCity;
  @Input() searchByCity;

  cmpRef:ComponentRef;
  private isViewInitialized:boolean = false;

  constructor(private dcl:DynamicComponentLoader) {
    console.log("In dcl constructor");
  }

  updateComponent() {
    // should be executed every time `type` changes but not before `ngAfterViewInit()` was called 
    // to have `target` initialized
    if(!this.isViewInitialized) {
      return;
    }
    if(this.cmpRef) {
        this.cmpRef.dispose();
    }
    this.dcl.loadNextToLocation(this.type, this.target).then((cmpRef) => {
      this.cmpRef = cmpRef;
      this.cmpRef.instance.selectedCity = this.selectedCity;
      this.cmpRef.instance.searchByCity = this.searchByCity;

    });
  }

  ngOnChanges() {
    this.updateComponent();
  }

  ngAfterViewInit() {
    this.isViewInitialized = true;
    this.updateComponent();  
  }

  ngOnDestroy() {
    if(this.cmpRef) {
      this.cmpRef.dispose();
    }    
  }
}