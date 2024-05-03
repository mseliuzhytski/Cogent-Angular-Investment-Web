import { Component, OnInit } from '@angular/core';
import { IbmapicallService } from '../ibmapicall.service';

@Component({
  selector: 'app-invest-ibm',
  templateUrl: './invest-ibm.component.html',
  styleUrl: './invest-ibm.component.css'
})
export class InvestIbmComponent implements OnInit{
  
  ibmres:any
  ibmrows:any

  totalamount:number
  totalbal:number
  totalbalstr:string
  totaldiff:number
  totaldiffper:number
  totaldiffperstr:string

  totalcolorclass:string

  totaltimefirstset=false
  totaltimelastset=false
  totaltimefirst:string
  totaltimelast:string

  totalrate:number
  totalratefirst:number
  totalamountunits:number
  totalamountunitsstr:string

  //closearr:number[]=[]
  arr=[]
  exarr=[
    { label: "Apple",  y: 10  },
    { label: "Orange", y: 15  },
    { label: "Banana", y: 25  },
    { label: "Mango",  y: 30  },
    { label: "Grape",  y: 28  }
  ] 

  constructor(private ibmapi:IbmapicallService){}
  
  irow=0

  ngOnInit(): void {
    this.ibmapi.get().subscribe({
      next: (x) => {
      // console.log(typeof x);
      // console.log(x)})
      this.ibmres=x
      //console.log(this.ibmres)
      //console.log(typeof this.ibmres["Time Series (5min)"]["2024-04-26 19:55:00"]["1. open"])
      this.ibmrows=this.ibmres["Time Series (5min)"]
      //console.log(this.ibmrows)
      },
      complete: () => {
        this.assignData()
      }
      //this.afterinit()
    })
  }

  assignData(){
    //for(let row of Object.keys(this.ibmrows)){
      //this.closearr.push(this.ibmrows[row]["4. close"])
    //}
    //console.log(this.closearr)
    for(let row of Object.keys(this.ibmrows).reverse()){
      let i = parseFloat(this.ibmrows[row]["4. close"])
      console.log("i: "+i)
      this.arr.push({ label: row.substring(11,16), y: i })
    }
  }

  getKeysStart(){
    return Object.keys(this.ibmrows).reverse()
  }

  getKeys(){
    return Object.keys(this.ibmrows)
  }

  getDateDay(){
    return Object.keys(this.ibmrows)[0].substring(0,10)
  }

  getDateTime(date){
    return date.substring(11,20)
  }

  getAmount(event: any){
    if(event.target.value != ""){
      if(parseFloat(event.target.value) > 0){
        this.totalamount = parseFloat(event.target.value)
        if(this.totaltimefirstset){
          this.totalamountunits = this.totalamount / this.ibmrows[this.totaltimefirst]["4. close"]
          this.totalamountunitsstr = this.totalamountunits.toFixed(4)
        }
        this.computePer()
      } else {this.totalamount = undefined; this.totalamountunitsstr = undefined; this.totalbalstr = undefined}
    } else {this.totalamount = undefined; this.totalamountunitsstr = undefined; this.totalbalstr = undefined}
  }

  setTimeStart(event: any){
    if(event.target.value != ""){
      this.totaltimefirstset = true
      this.totaltimefirst = event.target.value
      this.totalratefirst = this.ibmrows[event.target.value]["4. close"]
      if(this.totalamount){
        this.totalamountunits = this.totalamount / this.ibmrows[this.totaltimefirst]["4. close"]
        this.totalamountunitsstr = this.totalamountunits.toFixed(4)
      }
      this.computePer()
    } else {
      this.totaltimefirstset = false
      this.totalamountunitsstr = undefined
      this.totalratefirst = undefined
      this.totaldiffperstr = undefined;
    }

  }

  setTimeLast(event: any){
    if(event.target.value != ""){
      this.totaltimelastset = true
      this.totaltimelast = event.target.value
      this.totalrate = this.ibmrows[this.totaltimelast]["4. close"]
      console.log(typeof this.totalrate)
      this.computePer()
    } else {
      this.totaltimelastset = false
      this.totalrate = undefined
      this.totaldiffperstr = undefined;
    }
  }

  computePer(){
    if(this.totaltimefirstset && this.totaltimelastset && this.totalamount){
      
      this.totalbal = (this.totalamountunits * this.ibmrows[this.totaltimelast]["4. close"])
      this.totalbalstr = this.totalbal.toFixed(2)
      this.totaldiff = this.ibmrows[this.totaltimelast]["4. close"] - this.ibmrows[this.totaltimefirst]["4. close"]
      this.totaldiffper = (this.totaldiff / this.ibmrows[this.totaltimefirst]["4. close"]) * 100
      this.totaldiffperstr = this.totaldiffper.toFixed(2)
      if(this.ibmrows[this.totaltimefirst]["4. close"] > this.ibmrows[this.totaltimelast]["4. close"]){
        this.totalcolorclass="txt-red"
      } else {
        this.totalcolorclass="txt-green"
      }
    } 
    else if(this.totaltimefirstset && this.totalamount){
      this.totalbal = this.totalamount
      this.totalbalstr = this.totalbal.toFixed(2)
    }
    else if(this.totaltimefirstset && this.totaltimelastset){
      this.totaldiff = this.ibmrows[this.totaltimelast]["4. close"] - this.ibmrows[this.totaltimefirst]["4. close"]
      this.totaldiffper = (this.totaldiff / this.ibmrows[this.totaltimefirst]["4. close"]) * 100
      this.totaldiffperstr = this.totaldiffper.toFixed(2)
      if(this.ibmrows[this.totaltimefirst]["4. close"] > this.ibmrows[this.totaltimelast]["4. close"]){
        this.totalcolorclass="txt-red"
      } else {
        this.totalcolorclass="txt-green"
      }
    }
    else {
      this.totalbalstr = undefined
      this.totaldiffperstr = undefined
    }
  }

  chartsData(){
    for(let row of Object.keys(this.ibmrows)){
      this.arr.push({ label: row.substring(11,20), y: this.ibmrows[row]["4. close"] })
   }
    //return this.arr
  }

  chartOptions = {
	  zoomEnabled: true,
	  exportEnabled: true,
	  theme: "light2",
	  title: {
		text: "Graph for the day"
	  },
	  data: [{
		type: "line",
		dataPoints: this.arr
	  }]
	}


}
