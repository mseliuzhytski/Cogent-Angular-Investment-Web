import { Component, OnInit } from '@angular/core';
import { IbmapicallService } from '../ibmapicall.service';

@Component({
  selector: 'app-ibm-table',
  templateUrl: './ibm-table.component.html',
  styleUrl: './ibm-table.component.css'
})
export class IbmTableComponent implements OnInit{
  
  ibmres:any

  ibmrows:any

  closeresult:number
  closeresultstr:string
  closearr:number[]=[]

  constructor(private ibmapi:IbmapicallService){}
  
  irow=0
  errmsg:string

  ngOnInit(): void {
    this.ibmapi.get().subscribe({
      next: (x) => {
      // console.log(typeof x);
      // console.log(x)})
      this.ibmres=x
      //console.log(this.ibmres)
      //console.log(typeof this.ibmres["Time Series (5min)"]["2024-04-26 19:55:00"]["1. open"])
      
      //console.log(this.ibmrows)
      //this.afterinit()
      }, error: () => {
        this.errmsg="Load Table Error"
      }, complete: () => {
        this.afterinit()
        this.assignData()
      }
    })
  }

  afterinit(){
    this.ibmrows=this.ibmres["Time Series (5min)"]
    // Object.keys(this.ibmrows).forEach(key =>{
    //   this.irow++
    // })
    // for(let i in this.ibmrows){
    //   this.irow++
    // }
    //console.log("irow: "+this.irow) 
  }

  assignData(){
    for(let row of Object.keys(this.ibmrows)){
      this.closearr.push(this.ibmrows[row]["4. close"])
    }
    //console.log(this.closearr)
  }

  getKeys(){
    return Object.keys(this.ibmrows)
  }

  getVals(row){
    console.log(this.ibmrows[row])
    return Object.keys(this.ibmrows[row])
  }

  computePer(index, row){
    let i = parseInt(index)
    if(i == 99){
      return "-"
    } else {
      this.closeresult = ((this.closearr[i] - this.closearr[i+1]) / this.closearr[i+1])*100
      this.closeresultstr = this.closeresult.toFixed(4)
      if(this.closeresultstr[0] == "-"){document.getElementById("label"+i).style.color="red"}
      else{document.getElementById("label"+i).style.color="green"}
      return this.closeresultstr
    }
  }

}
