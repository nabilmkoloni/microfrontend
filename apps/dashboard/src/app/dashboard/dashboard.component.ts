
import { CustomTaxpayerService } from '../../../../../libs/services/custom-taxpayer.service';
import { Component, OnInit, Inject, NgZone, PLATFORM_ID, HostListener, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
// import { BusinessUnitComponent } from '../../components/business-unit/business-unit.component';
import { Observable } from 'rxjs';
import { Sales } from '../models/sales.model';
import { CustomSalesService } from '../../../../../libs/services/custom-sales.service';
import * as $ from "jquery";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_moonrisekingdom from "@amcharts/amcharts4/themes/moonrisekingdom";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { environment } from '../../environments/environment';
import { NgxPermissionsService } from 'ngx-permissions';
import { SwiperComponent } from "swiper/angular";
// import { TranslateService } from '@ngx-translate/core';
import SwiperCore, { Navigation, Pagination, Virtual } from 'swiper';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '@taxpayer-p/shared/auth';
import { HotelCurrencyFormat, HotelCurrencyFormatMapping } from '../models/enum.model';
import { CustomUnitsService } from '../../../../../libs/services/custom-units.service';
import { CustomInstitutionsService } from '../../../../../libs/services/custom-institutions.service';
SwiperCore.use([Pagination,Navigation,Virtual]);

am4core.useTheme(am4themes_moonrisekingdom);
am4core.useTheme(am4themes_animated);
am4core.addLicense("ch-custom-attribution");


@HostListener('window:resize', ['$event'])

@Component({
  selector: 'taxpayer-p-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:[CustomTaxpayerService]
})
export class DashboardComponent implements OnInit {
  private chart!: am4charts.XYChart;

  public HotelCurrencyFormatMapping = HotelCurrencyFormatMapping;
  public HotelCurrencyFormat = Object.values(HotelCurrencyFormat);

  today = new Date();
  time = this.today.getHours() + ":" + this.today.getMinutes() + ":" + this.today.getSeconds();
  dd = String(this.today.getDate()).padStart(2, '0');
  mm = String(this.today.getMonth() + 1).padStart(2, '0'); //January is 0!
  yyyy = this.today.getFullYear();
  stockList: any[] = [];
  salesList: any[] = [];
  businessList: any[] = [];
  colorScheme = {
    domain: ['blue', 'green']
  }
  view: any[] = [400, 400]
  pink: string = '#d7ccc8'

  zUnitList: any[] = [];
  allUnit: any[] = [];
  allData: any[] = [];
  dashData: any[] = [];
  TOTAL_SALES!: number
  TOTAL_TAX!: number
  TOTAL_MONTHLY_SALES!: number;
  TOTAL_YEARLY_SALES!: number;
  swiperView: any
  monthDashData: any[] = [];
  loadingDaily: boolean = false
  loadingMonthly: boolean = false
  loadingYearly: boolean = false
  selectedValue!: string;
  yearlyy: any
  loadingSalesToDate: boolean = false
  pieColors: any[] = ["#bcaaa4", "#ffe0b2", "#c6aa9f", "beige", "#e8f5e9", "#ffccbc", "#805a4d", "#8e7171", "#5f4c4ce3", "#90a4ae"]
  yearlyDashData: any[] = [];
  salesToDashDate: any[] = []
  yearlySalesData: any[] = []
  SALES_TO_DATE!: number
  overallsales$!: Observable<Sales[]>;
  username!: string
  zNumber!: string;
  showTZS!: boolean
  showUSD!: boolean

  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  slideNext() {
    this.swiper?.swiperRef.slideNext(100);
  }
  slidePrev() {
    this.swiper?.swiperRef.slidePrev(100);
  }

  constructor(private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private matDialog: MatDialog,
    private businessUnitS: CustomTaxpayerService,
    private overallSales: CustomSalesService,
    // @Inject(PLATFORM_ID) private platformId,
     private zone: NgZone,
    private permissionsService: NgxPermissionsService,
    private inst:CustomInstitutionsService,
    private customUnitsService: CustomUnitsService
  ) {

  }





  ngOnInit(): void {
    this.TOTAL_YEARLY_SALES = 0;
    this.SALES_TO_DATE = 0
    const permissions = JSON.parse(localStorage.getItem('permissions')!)
    const tokenData = JSON.parse(localStorage.getItem('token')!)

    this.username = tokenData['User']['firstName'] + ' ' + tokenData['User']['lastName']
    let x = $(window).width()
    this.dimensions(x)
    this.selectedValue = 'TZS';
    this.permissionsService.loadPermissions(permissions)
    const data = localStorage.getItem('znumber');
    this.zNumber = data!
    this.fetchUnitByZnumber(data)

    this.loadingDaily = true
    this.loadingMonthly = true
    this.loadingSalesToDate = true

    const doc = document;
    const menuOpen = doc.querySelector(".menu");
    const menuClose = doc.querySelector(".close");
    const overlay = doc.querySelector(".overlay");

    // When the DOM is loaded and ready, let's do some shit!
    $(document).ready(function () {
      function skillSet() {
        $('.bar-info').each(function () {
          const total = $(this).data("total");
          $(this).css("width", total + "%");
        });
        $('.percent').each(function () {
          var $this = $(this);
          $({
            Counter: 10
          }).animate({
            Counter: $this.text()
          }, {
            duration: 3000,
            easing: 'swing',
            step: function () {
              $this.text(Math.ceil(this.Counter) + "%");
            }
          });
        });
      };
      setTimeout(skillSet, 1000);
    });

    $('.count').each(function () {
      $(this).prop('Counter', 0).animate({
        Counter: $(this).text()
      }, {
        duration: 4000,
        easing: 'swing',
        step: function (now) {
          $(this).text(Math.ceil(now));
        }
      });
    });
    this.getAgentId(localStorage.getItem('znumber'))
  }

  getAgentId(znumber:any){
    this.inst.getAgentId(znumber).subscribe((res:any) => {
      localStorage['agentId'] = res.id
      console.log(localStorage['agentId']);
      
    },(error:HttpErrorResponse)=> {
      console.log(error)
    })
  }

  changeValue(value: string) {
    this.TOTAL_SALES = 0
    this.TOTAL_MONTHLY_SALES = 0
    this.TOTAL_YEARLY_SALES = 0
    this.SALES_TO_DATE = 0
    this.salesToDashDate = []
    this.dashData = [];
    this.monthDashData = [];
    this.selectedValue = value;
    this.fetchOverallSales();
  }



  onResize(event:any) {
    let x = event.target.innerWidth;

    if (x >= 1200) {
      this.swiperView = 2
    } else if (x >= 992) {
      this.swiperView = 2
    } else {
      this.swiperView = 1
    }

  }


  convert(type: string) {
    if (type == 'A') {
      return 'VAT_LOCAL'
    }
    else if (type == 'B') {
      return 'VAT_HOTEL'
    } else if (type == 'C') {
      return 'HOTEL_LEVY'
    } else if (type == 'D') {
      return 'STAMP DUTY'
    } else if (type == 'E') {
      return 'RESTAURANT_LEVY'
    } else if (type == 'F') {
      return 'TOUR_OPERATION_LEVY'
    } else if (type == 'G') {
      return 'SEA PORT'
    }
  }

  dimensions(x: any) {
    if (x >= 1200) {
      this.swiperView = 2
    } else if (x >= 992) {
      this.swiperView = 2
    } else {
      this.swiperView = 1
    }
  }

  loadBusinessUnitInfo(unit_id: any) {
    this.customUnitsService.getBusinessInfo(unit_id).subscribe(
      (res: any) => {
        const businessUnitInfo = res;
        const businessUnitInformation = btoa(JSON.stringify(businessUnitInfo));
        localStorage.setItem('businessUnitInformation', businessUnitInformation);
      }, (error: HttpErrorResponse) => {
        const errorMsg = 'business unit information not found';
        environment.error(errorMsg);
      }
    );
  }

  onEnter(id: string, type: string, name: string, category: string, parent: string, street: string) {
    localStorage.setItem('street', street)
    localStorage['unitName'] = name;
    let unitId = id;

    this.loadBusinessUnitInfo(unitId);

    if (type == 'A') {
      localStorage['check_type'] = type;
      this.router.navigateByUrl(`general/${environment.encode(id)}`)
      localStorage.setItem('pathcheker', JSON.stringify([{ 'id': id, 'type': 'A', 'path': `general/${environment.encode(id)}`, 'Tax': 0.15 }]))
    } else if (type == 'D') {
      localStorage['check_type'] = type;
      this.router.navigateByUrl(`general/${environment.encode(id)}`)
      localStorage.setItem('pathcheker', JSON.stringify([{ 'id': id, 'type': 'D', 'path': `general/${environment.encode(id)}`, 'Tax': 0.02 }]))
    } else if (type == 'B') {
      localStorage['check_type'] = type;
      if (category == 'X') {
        this.router.navigateByUrl(`hotel/${environment.encode(id)}`)
        localStorage.setItem('pathcheker', JSON.stringify([{ 'id': id, 'type': 'B', 'path': `hotel/${environment.encode(id)}`, 'Tax': 0.15 }]))
      } else if (category == 'Y') {
        this.router.navigateByUrl(`restaDash/${environment.encode(id)}`)
        localStorage.setItem('pathcheker', JSON.stringify([{ 'id': id, 'type': 'B', 'path': `restaDash/${environment.encode(id)}`, 'Tax': 0.15 }]))
        localStorage.setItem('parent', parent)
      } else if (category == 'Z') {
        localStorage.setItem('pathcheker', JSON.stringify([{ 'id': id, 'type': 'B', 'path': `othersDash/${environment.encode(id)}`, 'Tax': 0.15 }]))
        this.router.navigateByUrl(`othersDash/${environment.encode(id)}`)
        localStorage.setItem('parent', parent)
      }
    } else if (type == 'C') {
      localStorage['check_type'] = type;
      if (category == 'X') {
        this.router.navigateByUrl(`hotel/${environment.encode(id)}`)
        localStorage.setItem('pathcheker', JSON.stringify([{ 'id': id, 'type': 'C', 'path': `hotel/${environment.encode(id)}`, 'Tax': 0.12 }]))
      } else if (category == 'Y') {
        this.router.navigateByUrl(`restaDash/${environment.encode(id)}`)
        localStorage.setItem('pathcheker', JSON.stringify([{ 'id': id, 'type': 'C', 'path': `restaDash/${environment.encode(id)}`, 'Tax': 0.12 }]))
        localStorage.setItem('parent', parent)
      } else if (category == 'Z') {
        localStorage.setItem('pathcheker', JSON.stringify([{ 'id': id, 'type': 'C', 'path': `othersDash/${environment.encode(id)}`, 'Tax': 0.12 }]))
        this.router.navigateByUrl(`othersDash/${environment.encode(id)}`)
        localStorage.setItem('parent', parent)
      }
    } else if (type == 'E') {
      localStorage['check_type'] = type;
      if (category == 'X') {
        this.router.navigateByUrl(`hotel/${environment.encode(id)}`)
        localStorage.setItem('pathcheker', JSON.stringify([{ 'id': id, 'type': 'E', 'path': `hotel/${environment.encode(id)}`, 'Tax': 0.12 }]))
      } else if (category == 'Y') {
        this.router.navigateByUrl(`restaDash/${environment.encode(id)}`)
        localStorage.setItem('pathcheker', JSON.stringify([{ 'id': id, 'type': 'E', 'path': `restaDash/${environment.encode(id)}`, 'Tax': 0.12 }]))
        localStorage.setItem('parent', parent)
      } else if (category == 'Z') {
        localStorage.setItem('pathcheker', JSON.stringify([{ 'id': id, 'type': 'E', 'path': `othersDash/${environment.encode(id)}`, 'Tax': 0.12 }]))
        this.router.navigateByUrl(`othersDash/${environment.encode(id)}`)
        localStorage.setItem('parent', parent)
      }
    } else if (type == 'F') {
      localStorage['check_type'] = type;
      localStorage.setItem('pathcheker', JSON.stringify([{ 'id': id, 'type': 'F', 'path': `othersDash/${environment.encode(id)}`, 'Tax': 0.12 }]))
      this.router.navigateByUrl(`othersDash/${environment.encode(id)}`)
      localStorage.setItem('parent', parent)
    } else if (type == 'G') {
      localStorage['check_type'] = type;
      this.router.navigateByUrl(`general/${environment.encode(id)}`)
      localStorage.setItem('pathcheker',JSON.stringify([{'id':id,'type':'G','path':`general/${environment.encode(id)}`,'Tax':0.08}]))
    }
  }

  add(a: any, b: any) {
    return a + b;
  }

  salesTodate(object: any[]) {


    let chart = am4core.create("salesToDate", am4charts.XYChart);

    let data = [];

    chart.data = object;

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.ticks.template.disabled = true;
    categoryAxis.renderer.line.opacity = 0;
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.renderer.minGridDistance = 40;
    categoryAxis.dataFields.category = "unit";
    categoryAxis.startLocation = 0.4;
    categoryAxis.endLocation = 0.6;


    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip!.disabled = true;
    valueAxis.renderer.line.opacity = 0;
    valueAxis.renderer.ticks.template.disabled = true;
    valueAxis.min = 0;

    let lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.dataFields.categoryX = "unit";
    lineSeries.dataFields.valueY = "sales";
    lineSeries.tooltipText = "sales: {valueY.value}";
    lineSeries.fillOpacity = 0.5;
    lineSeries.strokeWidth = 3;
    lineSeries.propertyFields.stroke = "lineColor";
    lineSeries.propertyFields.fill = "lineColor";

    let bullet = lineSeries.bullets.push(new am4charts.CircleBullet());
    bullet.circle.radius = 6;
    bullet.circle.fill = am4core.color("#fff");
    bullet.circle.strokeWidth = 3;

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "panX";
    chart.cursor.lineX.opacity = 0;
    chart.cursor.lineY.opacity = 0;

    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarX.parent = chart.bottomAxesContainer;
  }

  convertMonth(number: number) {
    if (number == 1) {
      return 'JANUARY'
    }
    else if (number == 2) {
      return 'FEBRUARY'
    }
    else if (number == 3) {
      return 'MARCH'
    }
    else if (number == 4) {
      return 'APRIL'
    }
    else if (number == 5) {
      return 'MEI'
    }
    else if (number == 6) {
      return 'JUNE'
    }
    else if (number == 7) {
      return 'JULY'
    }
    else if (number == 8) {
      return 'AUGUST'
    }
    else if (number == 9) {
      return 'SEPTEMBER'
    }
    else if (number == 10) {
      return 'OCTOBER'
    }
    else if (number == 11) {
      return 'NOVEMBER'
    }
    else if (number == 12) {
      return 'DECEMBER'
    }

  }

  totalOfMany(dataArray: any, target: string) {
    return dataArray.reduce(function (acc: any, obj: { [x: string]: any; }) { return acc + obj[`${target}`] }, 0)
  }

  yearlSales(object: any[]) {

    let chart = am4core.create("chartdivYearly", am4charts.XYChart3D);
    chart.paddingBottom = 30;
    chart.angle = 35;

    // Add data
    chart.data = object;

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "country";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 20;
    categoryAxis.renderer.inside = true;
    categoryAxis.renderer.grid.template.disabled = true;

    let labelTemplate = categoryAxis.renderer.labels.template;
    labelTemplate.rotation = -90;
    labelTemplate.horizontalCenter = "left";
    labelTemplate.verticalCenter = "middle";
    labelTemplate.dy = 10; // moves it a bit down;
    labelTemplate.inside = false; // this is done to avoid settings which are not suitable when label is rotated

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.grid.template.disabled = true;


    // Create series
    let series = chart.series.push(new am4charts.ConeSeries());
    series.dataFields.valueY = "visits";
    series.dataFields.categoryX = "country";
    series.columns.template.tooltipText = "{valueY.value}";
    series.columns.template.tooltipY = 0;
    let columnTemplate = series.columns.template;
    columnTemplate.adapter.add("fill", function (fill, target) {
      return chart.colors.getIndex(target.dataItem!.index);
    })

    columnTemplate.adapter.add("stroke", function (stroke, target) {
      return chart.colors.getIndex(target.dataItem!.index);
    })
  }

  d3donuts(object: any[]) {
    let chart = am4core.create("chartdiv", am4charts.PieChart3D);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.legend = new am4charts.Legend();

    chart.data = object;

    let series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "amount";
    series.dataFields.category = "units";
    series.slices.template.propertyFields.fill = "color";



  }

  strimName(data: string) {
    let final = data.split(" ")
    if (final.length > 1) {
      let first = final[0].charAt(0);
      let second = final[1].charAt(0);

      return first + "&" + second
    } else {
      return data
    }

  }

  getOccurrence(array: any[], value: number) {

    let values = array.filter((v: { month: any; }) => (v.month === value))
    const summ = values.reduce(function (tot: any, arr: { receitpAmount: any; }) {
      // return the sum with previous value
      return tot + arr.receitpAmount;

      // set initial value as 0
    }, 0);

    let monthh = this.convertMonth(values[0].month);

    this.TOTAL_YEARLY_SALES += summ
    this.yearlySalesData.push({ 'country': monthh, 'visits': summ })
  }

  fetchOverallSales() {

    this.loadingDaily = true
    this.loadingMonthly = true
    this.loadingYearly = true
    this.loadingSalesToDate = true
    const data = {

      "bussnessUnitDto": this.allUnit
    }
    if (this.selectedValue == undefined) {
      this.showTZS = true;
      this.overallSales.OverallSales(data, { currency: `${this.selectedValue}` }).subscribe((dailySales) => {
        this.TOTAL_SALES = 0;
        this.TOTAL_TAX = 0
        //console.log('check ',dailySales)
        for (let index = 0; index < this.allData.length; index++) {


          if (dailySales.findIndex((x: { businessUnit: any; }) => x.businessUnit === this.allData[index]['id']) >= 0) {

            let currentIndex = dailySales.findIndex((x: { businessUnit: any; }) => x.businessUnit === this.allData[index]['id'])
            this.dashData.push({ 'name': this.allData[index]['name'], 'id': this.allData[index]['id'], 'category': this.allData[index]['category'], 'parentId': this.allData[index]['parentId'], 'amount': dailySales[currentIndex]['totalAmount'], 'taxAmount': dailySales[currentIndex]['taxAmount'], 'street': this.allData[index]['street'], 'taxpayer': this.allData[index]['taxpayer'], 'type': this.allData[index]['type'], 'urn': this.allData[index]['urn'], 'currency': this.selectedValue })
            this.TOTAL_SALES += this.dashData[index].amount;
            this.TOTAL_TAX += this.dashData[index].taxAmount;

          } else {
            this.dashData.push({ 'name': this.allData[index]['name'], 'id': this.allData[index]['id'], 'category': this.allData[index]['category'], 'parentId': this.allData[index]['parentId'], 'amount': 0, 'taxAmount': 0, 'street': this.allData[index]['street'], 'taxpayer': this.allData[index]['taxpayer'], 'type': this.allData[index]['type'], 'urn': this.allData[index]['urn'], 'currency': this.selectedValue })
            this.TOTAL_SALES += this.dashData[index].amount;
            this.TOTAL_TAX += this.dashData[index].taxAmount;
          }

        }
        this.loadingDaily = false


        //console.log(this.dashData)

      }, (error) => {

        this.loadingDaily = false
      })
    } else {


      this.overallSales.OverallSales(data, { currency: this.selectedValue }).subscribe((dailySales) => {
        this.TOTAL_SALES = 0;
        this.TOTAL_TAX = 0
        for (let index = 0; index < this.allData.length; index++) {


          if (dailySales.findIndex((x: { businessUnit: any; }) => x.businessUnit === this.allData[index]['id']) >= 0) {

            let currentIndex = dailySales.findIndex((x: { businessUnit: any; }) => x.businessUnit === this.allData[index]['id'])
            this.dashData.push({ 'name': this.allData[index]['name'], 'id': this.allData[index]['id'], 'category': this.allData[index]['category'], 'parentId': this.allData[index]['parentId'], 'amount': dailySales[currentIndex]['totalAmount'], 'taxAmount': dailySales[currentIndex]['taxAmount'], 'street': this.allData[index]['street'], 'taxpayer': this.allData[index]['taxpayer'], 'type': this.allData[index]['type'], 'urn': this.allData[index]['urn'], 'currency': this.selectedValue })
            this.TOTAL_SALES += this.dashData[index].amount;
            this.TOTAL_TAX += this.dashData[index].taxAmount;

          } else {
            this.dashData.push({ 'name': this.allData[index]['name'], 'id': this.allData[index]['id'], 'category': this.allData[index]['category'], 'parentId': this.allData[index]['parentId'], 'amount': 0, 'taxAmount': 0, 'street': this.allData[index]['street'], 'taxpayer': this.allData[index]['taxpayer'], 'type': this.allData[index]['type'], 'urn': this.allData[index]['urn'], 'currency': this.selectedValue })
            this.TOTAL_SALES += this.dashData[index].amount;
            this.TOTAL_TAX += this.dashData[index].taxAmount;
          }

        }
        this.loadingDaily = false

        //console.log(this.dashData)


      }, (error) => {

        this.loadingDaily = false
      })
    }

    if (this.selectedValue == undefined) {
      this.overallSales.monthlySales(data, { currency: 'TZS' }).subscribe((monthlySales) => {

        this.TOTAL_MONTHLY_SALES = 0;

        for (let index = 0; index < monthlySales.length; index++) {

          if (this.allData.findIndex(x => x.id === monthlySales[index]['businessUnit']) >= 0) {


            let currentIndex = this.allData.findIndex(x => x.id === monthlySales[index]['businessUnit'])

            this.monthDashData.push({ 'units': this.allData[currentIndex]['name'], 'amount': monthlySales[index]['totalAmount'], "color": am4core.color(`${this.pieColors[index]}`), 'currency': this.selectedValue })
            this.TOTAL_MONTHLY_SALES += this.monthDashData[index].amount;
          } else {
            this.monthDashData.push({ 'units': this.allData[index]['name'], 'amount': 0, "color": am4core.color(`${this.pieColors[index]}`), 'currency': this.selectedValue })
            this.TOTAL_MONTHLY_SALES += this.monthDashData[index].amount;
          }

        }

        this.d3donuts(this.monthDashData)
        this.loadingMonthly = false
      }, (error) => {

        this.loadingMonthly = false
      })
    } else {
      this.overallSales.monthlySales(data, { currency: this.selectedValue }).subscribe((monthlySales) => {

        this.TOTAL_MONTHLY_SALES = 0;

        for (let index = 0; index < monthlySales.length; index++) {

          if (this.allData.findIndex(x => x.id === monthlySales[index]['businessUnit']) >= 0) {


            let currentIndex = this.allData.findIndex(x => x.id === monthlySales[index]['businessUnit'])

            this.monthDashData.push({ 'units': this.allData[currentIndex]['name'], 'amount': monthlySales[index]['totalAmount'], "color": am4core.color(`${this.pieColors[index]}`), 'currency': this.selectedValue })
            this.TOTAL_MONTHLY_SALES += this.monthDashData[index].amount;
          } else {
            this.monthDashData.push({ 'units': this.allData[index]['name'], 'amount': 0, "color": am4core.color(`${this.pieColors[index]}`), 'currency': this.selectedValue })
            this.TOTAL_MONTHLY_SALES += this.monthDashData[index].amount;
          }

        }

        this.d3donuts(this.monthDashData)
        this.loadingMonthly = false
      }, (error) => {

        this.loadingMonthly = false
      })
    }

    //=======================================================YEARLY SALES ======================================================>     

    this.overallSales.yearlySales(data, { currency: this.selectedValue }).subscribe((yearlySales) => {

      const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

      month.map(value => {

        if (yearlySales.findIndex((x: { month: number; }) => x.month === value) >= 0) {


          let index = yearlySales.findIndex((x: { month: number; }) => x.month === value);
          let valueAchieved = yearlySales[index]['month']


          this.getOccurrence(yearlySales, value)

        } else {
          let monthh = this.convertMonth(value);
          this.yearlySalesData.push({ 'country': monthh, 'visits': 0 })
        }
      })

      this.loadingYearly = false
      this.yearlSales(this.yearlySalesData)



      this.loadingYearly = false

    })
    // ================================================================SALES TO DATE=====================================================================================>
    this.overallSales.salesTodate(data, { currency: this.selectedValue }).subscribe((salesToDate) => {
      this.SALES_TO_DATE = 0
      let repoYearly = salesToDate
      for (let index = 0; index < salesToDate.length; index++) {

        if (this.allData.findIndex(x => x.id === salesToDate[index]['businessUnit']) >= 0) {


          let currentIndex = this.allData.findIndex(x => x.id === salesToDate[index]['businessUnit'])

          this.salesToDashDate.push({ 'unit': this.allData[currentIndex]['name'], 'sales': repoYearly[index]['totalAmount'], 'expenses': repoYearly[index]['totalAmount'] })
        } else {

          this.salesToDashDate.push({ 'unit': this.allData[index]['name'], 'sales': 0, 'expenses': 0 })
        }

      }


      this.salesTodate(this.salesToDashDate)

      this.SALES_TO_DATE = this.totalOfMany(this.salesToDashDate, 'sales')
      this.loadingSalesToDate = false

    }, (error) => {

      this.loadingSalesToDate = false

    })


  }

  fetchUnitByZnumber(zNumber: string | null) {
    this.businessUnitS.getById(zNumber!).subscribe((response: any) => {
      this.zUnitList = response;
      this.allData = response;

      if (response != undefined) {

        this.businessUnitS.getBusinesUnits(response[0]['taxpayer']).subscribe((res) => {
          this.allUnit = res
          this.fetchOverallSales()
          this.authService.tokenRefreshed$.subscribe(res => {
            if (res) {
              this.fetchOverallSales()
            }
          })
        }, (error: HttpErrorResponse) => {

          if (error instanceof HttpErrorResponse && error.status === 401) {
          }
        })
      }
    }, (error: HttpErrorResponse) => {

      if (error instanceof HttpErrorResponse && error.status === 401) {
      }
    })
  }

  OnViewBusiness() {

    const options = {
      data: {
        //pass data to dialog component
      },
      width: '70%',
      height: '70%',
      disableClose: false,
      backdropClass: 'backdropBackground'

    }

    // const dialogRef = this.matDialog.open(BusinessUnitComponent, options);
    // dialogRef.afterClosed().subscribe(result => {

    // })
  }

  ngAfterViewInit() {

  }
}
