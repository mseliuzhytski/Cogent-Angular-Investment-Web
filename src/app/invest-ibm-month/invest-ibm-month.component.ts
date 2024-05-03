import { Component, OnInit } from '@angular/core';
import { IbmapicallService } from '../ibmapicall.service';

@Component({
  selector: 'app-invest-ibm-month',
  templateUrl: './invest-ibm-month.component.html',
  styleUrl: './invest-ibm-month.component.css'
})
export class InvestIbmMonthComponent implements OnInit{
  
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

  arr=[]

  constructor(private ibmapi:IbmapicallService){}
  
  irow=0

  ngOnInit(): void {
    this.ibmapi.getM().subscribe({
      next: (x) => {
      // console.log(typeof x);
      // console.log(x)})
      this.ibmres=x
      //console.log(this.ibmres)
      //console.log(typeof this.ibmres["Time Series (5min)"]["2024-04-26 19:55:00"]["1. open"])
      this.ibmrows=this.ibmres["Monthly Time Series"]
      //console.log(this.ibmrows)
      }, complete: () => {
        this.assignData()
      }
      //this.afterinit()
    })
  }

  assignData(){
    for(let row of Object.keys(this.ibmrows).reverse()){
      let i = parseFloat(this.ibmrows[row]["4. close"])
      //console.log("i: "+i)
      this.arr.push({ label: row.substring(2,7), y: i })
    }
  }

  getKeysStart(){
    return Object.keys(this.ibmrows).reverse()
  }

  getKeys(){
    return Object.keys(this.ibmrows)
  }

  getDateTime(date){
    return date.substring(0,7)
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

  chartOptions = {
	  zoomEnabled: true,
	  exportEnabled: true,
	  theme: "light2",
	  title: {
	  },
	  data: [{
		type: "line",
		dataPoints: this.arr
	  }]
	}

}
