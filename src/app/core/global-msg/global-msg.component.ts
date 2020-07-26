import { Component, OnInit, ElementRef, ViewChild, Inject, AfterViewInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-global-msg',
  templateUrl: './global-msg.component.html',
  styleUrls: ['./global-msg.component.scss']
})
export class GlobalMsgComponent implements OnInit {
  @ViewChild('top', {static:false}) topPos: ElementRef;
  @ViewChild('Success', {static:false}) SuccessMSG: ElementRef;
  @ViewChild('Error', {static:false}) ErrorMSG: ElementRef;
  globalSuccessMsg = '';
  globalErrorMsg = '';
  ErrorCode: string[] = [];
  window: any;
  message: any;
  clearMessages: any;
  
  constructor(@Inject(DOCUMENT) private document: any, private router: Router) { }

  ngOnInit() {
    this.window = this.document.parentWindow || this.document.defaultView;
  }

  showSuccessMsg(msg: string) {
    this.clearMsgs();
    this.globalSuccessMsg = msg;
    this.scrollTo('Success', 30000);
  }

  showErrorMsg(msg: string) {
      this.clearMsgs();
      this.globalErrorMsg = msg;
      this.scrollTo('Error', 1800000);
  }

  scrollTo(disp_MSG: String, timeout: number) {
    const ref = this;
    setTimeout(function() {
      // removed for ATG-2156
      // ref.topPos.nativeElement.scrollIntoView();
      if (disp_MSG === 'Success') {
        if (ref.SuccessMSG) {
          ref.SuccessMSG.nativeElement.focus();
        }
      } else {
        if (ref.ErrorMSG) {
          if (ref.ErrorMSG) {
            ref.ErrorMSG.nativeElement.focus();
          }
        }
      }
      setTimeout(() => {
        if (this.window) {
          this.window.scrollTo(0,0);
        }
      }, 200);
      ref.clearMessages = setTimeout(() => {
        ref.clearMsgs();
      }, timeout);
    }, 200);


  }

  clearMsgs() {
    if(this.clearMessages){
      this.window.clearTimeout(this.clearMessages)
    }
    this.globalSuccessMsg = this.globalErrorMsg = '';
  }

}
