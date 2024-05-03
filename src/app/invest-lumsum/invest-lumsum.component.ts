import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invest-lumsum',
  templateUrl: './invest-lumsum.component.html',
  styleUrl: './invest-lumsum.component.css'
})
export class InvestLumsumComponent implements OnInit{

  total:number
  totalset=false
  // totalstr:string
  totalInit:number

  result:number
  resultstr:string

  rate:number

  days:string
  dayscount:number
  dayscountset=false

  icat:string

  initclassset="cr-show"

  constructor(private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  setStart(event: any){
    if(event.target.value == ""){this.totalInit=0}
    else if(parseFloat(event.target.value) < 0){this.totalInit=0}
    else { this.totalInit=parseFloat(event.target.value) }
    this.totalset=true
    if(this.dayscountset){
      this.updateVals()
    }
  }

  setRate(event: any){
    if(event.target.value != ""){
      this.rate=parseFloat(event.target.value)
    } else {this.rate=0}
    if(this.dayscountset && this.totalset){
      this.updateVals()
    }
  }

  setDuration(event: any){ 
    if(event.target.value == ""){ this.dayscount=0}
    else if(parseInt(event.target.value) < 0){ this.dayscount=0}
    else { this.dayscount=parseInt(event.target.value) }
    this.dayscountset=true
    if(this.totalset){
      this.updateVals()
    }
  }

  updateVals(){
    this.total=this.totalInit
    this.result=this.total
    if(this.dayscount == 0){this.resultstr="none"}
    for(let i=0; i<this.dayscount; i++){
      this.total=this.result
      if(this.rate == undefined){this.rate=0}
      this.result += this.total*(this.rate/100)
      this.resultstr=this.result.toFixed(2)
    }
  }

  setIcat(event: any){
    this.icat=event.target.value
  }
  setDays(event: any){
    this.days=event.target.value
  }

  resetButton(){
    this.router.navigate(["/"])
  }

}
