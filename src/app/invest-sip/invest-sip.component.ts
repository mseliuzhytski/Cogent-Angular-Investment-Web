import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { count } from 'rxjs';

@Component({
  selector: 'app-invest-sip',
  templateUrl: './invest-sip.component.html',
  styleUrl: './invest-sip.component.css'
})
export class InvestSipComponent implements OnInit{

  starting:number

  total:number
  totalInit:number
  totalAdd:number
  totalSub:number
  totalstr:string

  result:number=0
  resultstr:string

  rate:number

  days:string
  dayscount: number
  // dayscounti:number=1
  daysrange:number

  icat:string

  // icatset=false
  startingset=false
  dayscountset=false

  initclassset="cr-show"
  // initclasspolar="cr-hide"

  // dyid=0
  // changetl=false

  dyForm: FormGroup

  // @ViewChild('fi')eform:NgModel
  // @ViewChild('fe')eeform:NgModel

  constructor(private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.dyForm = this.fb.group({
      items: this.fb.array([])
    });
  }

  sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async dySetDuration(){
    await this.sleep(50)
    this.updateVals(0)
  }

  get items(): FormArray{
    return this.dyForm.get("items") as FormArray
  }

  setStart(event: any){
    if(event.target.value != ""){
      this.starting=parseFloat(event.target.value)
      if(this.starting >= 1){
        this.startingset=true
        if(this.dayscountset){this.updateVals(0)}
      } else {
        this.startingset=false
      }
    } else {
      this.startingset=false
    }
  }

  setDuration(event: any){ 
    if(event.target.value != ""){
      this.daysrange=parseFloat(event.target.value)
      // console.log("st:"+this.starting)
      if(this.daysrange >= 1){
        if(!this.dayscountset){
          // console.log("dc:init")
          this.dayscountset=true
          this.dayscount=this.daysrange
          for (let i = 0; i < this.dayscount; i++) {
            this.items.push(this.fb.control(''));
          }
        }
        else if(this.daysrange > this.dayscount){
          // console.log("dc:"+this.dayscount)
          // console.log(this.starting+">"+this.dayscount)
          for (let i = this.dayscount; i < this.daysrange; i++) {
            this.items.push(this.fb.control(''));
          }
          this.dayscount=this.daysrange
        }
        else if(this.daysrange < this.dayscount){
          // console.log("dc:"+this.dayscount)
          // console.log(this.starting+"<"+this.dayscount)
          for (let i = this.dayscount; i >= this.daysrange; i--) {
            this.items.removeAt(i)
          }
          this.dayscount=this.daysrange
        }
        else {console.log("dc:err");console.log("dc:"+this.dayscount)}
        if(this.startingset){this.dySetDuration()}
      } else {
        this.dayscountset=false
        this.items.clear()
      }
    } else {
      this.dayscountset=false
      this.items.clear()
    }
  }

  // setSub(event: any){
  //   if(event.target.value != ""){
  //     this.totalSub=parseFloat(event.target.value)
  //     // console.log("st:"+this.starting)
  //     if(this.totalSub >= 1){
  // }

  updateVals(id: number){
    for(let line=id; line < this.dayscount; line++){

      // total
      if(line == 0){
        //console.log(typeof this.total)
        this.total=this.starting
        this.totalstr=this.total.toFixed(2)
        document.getElementById("ftotal"+line).innerHTML=this.totalstr
      } else {
        let nl = line-1
        let sub = parseFloat(document.getElementById("fresult"+nl).innerHTML) + this.starting
        this.totalstr= sub.toFixed(2)
        document.getElementById("ftotal"+line).innerHTML=this.totalstr
      }

      // add
      let addstr = document.getElementById("fadd"+line) as HTMLInputElement
      //console.log(addstr.value)
      if(addstr.value == ""){this.totalAdd=0}
      else { 
        this.total -= this.totalAdd
        this.totalAdd=parseFloat(addstr.value) 
      }

      // rate
      let ratestr = document.getElementById("frate"+line) as HTMLInputElement
      //console.log(addstr.value)
      if(ratestr.value == ""){this.rate=0}
      else { this.rate=parseFloat(ratestr.value) }

      // result  
      //r += this.total*(this.rate/100)
        this.total = parseFloat(document.getElementById("ftotal"+line).innerHTML)
        this.total += this.totalAdd
        this.result = this.total
        this.result += this.total*(this.rate/100)
        this.resultstr=this.result.toFixed(2)
        document.getElementById("fresult"+line).innerHTML=this.resultstr 
    }

  }

  setIcat(event: any){
    this.icat=event.target.value
  }
  setDays(event: any){
    this.days=event.target.value
  }

  // onApply(){
  //   this.icat=this.eform.value.icat
  //   this.days=this.eform.value.days
  //   this.daysrange=this.eform.value.daysrange
  //   this.starting=this.eform.value.starting

  //   if(this.daysrange > 1){ this.dayscount=Array(this.daysrange-1).fill(0)}
  //   this.total = this.starting
  //   this.toggleInitclass()
  // }

  resetButton(){
    this.router.navigate(["/"])
  }

  /**
   * ALPHA VANTAGE
   * alphavantage.co
   * API's
   * https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo
   * https://canvasjs.com/angular-charts/
   * 
   */

  // toggleInitclass(){
  //   this.initclassset="cr-hide"
  //   this.initclasspolar="cr-show"
  // }

  // onSubmit(){
  //   this.rate=this.eeform.value.rate
  //   if(this.eeform.value.totalAdd == ""){
  //     this.totalAdd=0
  //   } else {
  //     this.totalAdd=this.eeform.value.totalAdd
  //   }
    // console.log(typeof this.totalAdd)
    // console.log(this.totalAdd)
    // if(this.days == "day"){
      // this.compute()
    // this.dayscount++
    // }
    // if(this.days == "month"){
    //   this.computeMonth()
    //   this.dayscount++
    // }
    // if(this.days == "year"){
    //   this.computeYear()
    //   this.dayscount++
    // }
    
  // }

  // compute(){
  //   this.totalInit = this.total
  //   this.tottalAfterAdd = this.total + this.totalAdd
  //   this.total += this.totalAdd
  //   this.result=this.total
  //   this.result += this.total*(this.rate/100)

  //   let resultstr = this.result.toFixed(2)
  //   let totalInitstr = this.totalInit.toFixed(2)
  //   let tottalAfterAddstr = this.tottalAfterAdd.toFixed(2)
  //   let writediv = "<div id=\"tlid"+this.dyid+"\"> "+this.days+": "+this.dayscounti+" | rate(%): "+this.rate+" | Invetments:(before): "+totalInitstr+" (with): "+this.totalAdd+" (total): "+tottalAfterAddstr+" | (after) "+resultstr+"</div>"
  //   document.getElementById("siptable").innerHTML+=writediv
    
  //   let elem = document.getElementById("tlid"+this.dyid)
  //   if(this.changetl){
  //     this.changetl=false
  //     //elem.style.backgroundColor="rgb(207, 233, 255)"
  //   } else {
  //     this.changetl=true
  //     elem.style.backgroundColor="rgb(207, 233, 255)"
  //   }
  //   elem.style.padding="10px"
  //   elem.style.margin="0"

  //   this.dyid++
  //   this.dayscounti++
  //   this.total = this.result
  // }

  // computeMonth(){
  //   this.totalInit = this.total
  //   this.tottalAfterAdd = this.total + this.totalAdd
  //   this.total += this.totalAdd
  //   this.result=this.total
  //   for(let day=0; day < 31; day++){
  //     this.total = this.result
  //     this.result += this.total*(this.rate/100)
  //   }
    
  //   let resultstr = this.result.toFixed(2)
  //   let totalInitstr = this.totalInit.toFixed(2)
  //   let tottalAfterAddstr = this.tottalAfterAdd.toFixed(2)
  //   let writediv = "<div id=\"tlid"+this.dyid+"\"> month: "+this.dayscount+" | rate(%): "+this.rate+" | Invetments:(before): "+totalInitstr+" (with): "+this.totalAdd+" (total): "+tottalAfterAddstr+" | (after) "+resultstr+"</div>"
  //   document.getElementById("siptable").innerHTML+=writediv
    
  //   let elem = document.getElementById("tlid"+this.dyid)
  //   if(this.changetl){
  //     this.changetl=false
  //     //elem.style.backgroundColor="rgb(207, 233, 255)"
  //   } else {
  //     this.changetl=true
  //     elem.style.backgroundColor="rgb(207, 233, 255)"
  //   }
  //   elem.style.padding="10px"
  //   elem.style.margin="0"

  //   this.dyid++
  //   this.total = this.result
  // }

  // computeYear(){
  //   this.totalInit = this.total
  //   this.tottalAfterAdd = this.total + this.totalAdd
  //   this.total += this.totalAdd
  //   this.result=this.total
  //   for(let day=0; day < 365; day++){
  //     this.total = this.result
  //     this.result += this.total*(this.rate/100)
  //   }
    
  //   let resultstr = this.result.toFixed(2)
  //   let totalInitstr = this.totalInit.toFixed(2)
  //   let tottalAfterAddstr = this.tottalAfterAdd.toFixed(2)
  //   let writediv = "<div id=\"tlid"+this.dyid+"\"> year: "+this.dayscount+" | rate(%): "+this.rate+" | Invetments:(before): "+totalInitstr+" (with): "+this.totalAdd+" (total): "+tottalAfterAddstr+" | (after) "+resultstr+"</div>"
  //   document.getElementById("siptable").innerHTML+=writediv
    
  //   let elem = document.getElementById("tlid"+this.dyid)
  //   if(this.changetl){
  //     this.changetl=false
  //     //elem.style.backgroundColor="rgb(207, 233, 255)"
  //   } else {
  //     this.changetl=true
  //     elem.style.backgroundColor="rgb(207, 233, 255)"
  //   }
  //   elem.style.padding="10px"
  //   elem.style.margin="0"

  //   this.dyid++
  //   this.total = this.result
  // }











  // compute(){
  //   if(!this.icatset){this.toggleChooseRating()}
  //   this.totalInit = this.total
  //   this.result=this.total
  //   for(let day=0; day < this.daysrange; day++){
  //     if(this.total != 0){
  //       this.total = this.result
  //       if(true){
  //         this.result += this.total*(this.rate/100)
  //       } else {
  //         this.result -= this.total*(this.rate/100)
  //       }
  //     }
  //   }
  //   this.totalstr = this.totalInit.toFixed(2)
  //   let resultstr = this.result.toFixed(2)
  //   let writediv = "<div>total: "+this.totalstr+" total days passed:"+this.days+" current rate(%): "+this.rate+" resulting: "+resultstr+"</div><hr>"
  //   document.getElementById("histtable").innerHTML+=writediv
  //   this.total = this.result
  //   this.totalstr = this.total.toFixed(2)
  // }

}
