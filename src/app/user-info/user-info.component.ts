import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent {

  username:String
  age:number
  ctc:number

  private topmsghide="top-msg-hide"
  private topmsgshow="top-msg-show"
  topmsgset=this.topmsgshow
  topmsgpolar=this.topmsghide

  @ViewChild('f')eform:NgModel

  // @Output()passName = new EventEmitter()
  // callpassName(){
  //   this.passName.emit(this.username)
  // }

  onSubmit(){
    this.username=this.eform.value.username
    this.age=this.eform.value.age
    this.ctc=this.eform.value.ctc

    this.toggleTopMsg()
    //this.callpassName()
  }

  toggleTopMsg(){
    if(this.topmsgset == this.topmsgshow){
      this.topmsgset=this.topmsghide
      this.topmsgpolar=this.topmsgshow
    } else {
      this.topmsgset=this.topmsgshow
      this.topmsgpolar=this.topmsghide
    }
  }









  // username:String
  // yrold:Number
  // ctc:Number

  // editableclass:String="editmode"
  // editablepolar:String="savemode"

  // userinfonotvalid=false

  // toggleEditableclass(){
  //   if(this.username == undefined || this.yrold == undefined) {
  //     this.userinfonotvalid=true
  //   } else {
  //     if(this.editableclass == "editmode"){
  //       this.editableclass="savemode"
  //       this.editablepolar="editmode"
  //     } else { 
  //       this.editableclass="editmode"
  //       this.editablepolar="savemode"
  //     }
  //     if(this.userinfonotvalid){this.userinfonotvalid=false}
  //   }
  // }

}
