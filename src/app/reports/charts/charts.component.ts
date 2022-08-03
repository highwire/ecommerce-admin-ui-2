import {
	Component,
	NgModule,
	OnInit
} from '@angular/core';
import {
	Chart,
	registerables
} from 'chart.js';
import {
	FormControl,
	FormGroup
} from '@angular/forms';
import {
	HTTPService
} from '../../services/http.service';
import {
	BaseService
} from 'src/app/services/base.service';
import {
	hwValidator
} from 'src/app/services/hwvalidator.service';
import {
	CurrencyPipe
} from '@angular/common';
import * as moment from 'moment';
import {
	__values
} from 'tslib';


@Component({
	selector: 'app-charts',
	templateUrl: './charts.component.html',
	styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
	masterChartData: any;
	datesrages: any;
	datasets: any;
	bookdatasets: any;
	keys: any;
	booksite: any;
	chartbookSites: any;
	showbooks: any = false;
	showbook: any = false;
	chartinstan: any;
	chartinstan2: any;
	dropdownList: any = [];
	selectedItems: any = [];
	selectedBooks: any = [];
	dropdownSettings: any = {};
	bookdropdownSettings: any = {};

	myControl = new FormControl();
	showdrop: any = false;
	masterData: any;
	currency: any[] = []
	pricearray: any;
	displayedColumns: string[] = ['name', 'description', 'options', 'productType', 'price_interval', 'price_amount', 'date'];
	freeLabel = 'Free';
	notForSaleLabel = 'Not for Sale';
	clickedRows = new Set < any > ();
	products: any;
	isLoading = false;
	sitedata: any;
	selectedCurrency: any = '  All Currencies';
	masterdata: any
	myChart: any;
	myChart2: any;


	dateRange = new FormGroup({
		start: new FormControl(),
		end: new FormControl()
	});
	constructor(
		public http: HTTPService,
		public base: BaseService,
		public hw: hwValidator,

	) {}

	ngOnInit(): void {
		var d = new Date();
		d.setDate(d.getDate() - 17);
		this.dateRange.patchValue({
			start: d,
			end: new Date()
		});

		this.selectAllPublishers();
		this.selectAllListPublishers();
		var curr = localStorage.getItem('currency') + '';
		if (curr)
			this.currency = JSON.parse(curr);


		// let myChart=null
		this.myChart = document.getElementById("myChart");
		this.myChart2 = document.getElementById("myChart2");


		// myChart = new Chart(ctx,config)

		Chart.register(...registerables);
		//this.loadChart();


		this.selectedItems = [

		];
		this.selectedBooks = []

		this.bookdropdownSettings = {
			singleSelection: false,
			idField: 'corpus',
			textField: 'title',
			selectAllText: 'Select All',
			unSelectAllText: 'UnSelect All',
			itemsShowLimit: 2,
			allowSearchFilter: true,

			closeDropDownOnSelection: true
		}


		this.dropdownSettings = {
			singleSelection: false,
			idField: 'corpus',
			textField: 'title',
			selectAllText: 'Select All',
			unSelectAllText: 'UnSelect All',
			itemsShowLimit: 2,
			allowSearchFilter: true,

			closeDropDownOnSelection: true
		};

		this.showbook = localStorage.getItem('ebook') == 'yes' ? true : false;
		console.log('showbook', this.showbook);
		this.siteType()

	}
	getSite() {
		this.keys = []
		let URL = this.base.SITE_BOOK + 'sgrworks/ecom-admin?src=%2Fsgrworks%2Fatom&start=0&count=75';
		this.http.getDatawithGet(URL, '').subscribe((data: any) => {
			console.log('getSite', data);
			// this.filterDOI(data);
			var bookarr: any = [];
			data.feed.forEach((element: any) => {

				if (this.hw.isbn(element.entry.uri)) {
					console.log('element.entry.uri', element.entry.uri)
					let isbn = this.hw.getisbn(element.entry.uri)
					if (isbn) {
						isbn = isbn[0];
					}
					bookarr.push({
						'corpus': element.entry.corpus,
						title: element.entry.title,
						isbn: isbn
					})
					this.keys.push(isbn)
					// isbn = elem.uri.match(isbnRe);
				}



			});
			this.booksite = bookarr;

			this.getChartData();

		})

	}
	//////////////////
	onItemSelect(item: any) {

		// this.extractPrice(this.masterData, item.corpus);
		console.log(item);
	}
	onSelectAll(items: any) {
		console.log(items);
	}
	onJournal() {
		this.showbooks = false;

		this.showChart(this.datasets, this.datesrages);
	}
	onBooks() {
		this.showbooks = true;
		this.showChart(this.bookdatasets, this.datesrages);

	}

	currencySelect(currency: any) {

		this.selectedCurrency = currency
		console.log(currency);
		this.genratechartdata(this.masterChartData, currency);

		// this.extractPrice(this.masterdata, currency=='Currencies' ? '':currency, '');	

	}

	selectAllListPublishers() {
		let publisher = localStorage.getItem('publisher');
		let URL = this.base.PRODUCT_LIST + publisher + '/products';
		this.http.getDatawithGet(URL, publisher).subscribe((data: any) => {
			console.log(data);
			this.filterDOI(data);

		})
	}


	selectAllPublishers() {
		// let publisher = localStorage.getItem('publisher')  ;
		// let URL= this.base.SITE_LIST;
		// var data={
		//   pubTerm: publisher,
		//   role: "Intelligent Commerce Pricing and Reporting UI",
		//   userId: "2"
		// }
		// this.http.getDatawithPost(URL,data).subscribe((data:any)=>{
		//     console.log(data);             
		//     this.sitedata =  data.sites;
		// })


		var site: any = localStorage.getItem('siteData');
		if (site) {
			this.sitedata = JSON.parse(site);
			console.log('this.sitedata ${this.sitedata}')
		}

	}
	formatAmountDisplay(amount: any) {
		if (amount === -1) {
			return this.notForSaleLabel;
		} else if (amount === 0) {
			return this.freeLabel;
		}
		return amount;
	}
	filterDOI(data: any) {
		this.masterData = data


	}
	dropDownChange(value: any) {
		console.log(value.values);
		// this.extractPrice(this.masterData, value.value);

	}

	extractPrice(data: any, pub: any, currencies ? : any) {

		var self = this;
		var pricearray: any = [];
		data.forEach((element: any) => {
			// console.log(element);
			if (element.prices && Array.isArray(element.prices) && element.name == pub) {
				element.prices.forEach((elements: any) => {
					// if(elements.name=='chapter-price'  || elements.name=='edition-price' )
					// (entry.productType=='ebook' && entry.name=='edition-price' )
					pricearray.push({
						// name: element.name,
						// productType:element.productType,
						// description:element.description,      
						// identifier: element.identifier,
						price_amount: self.formatAmountDisplay(elements.amount),
						// price_currency:elements.currency,
						// price_interval:elements.interval,
						// price_name:elements.name
					})
				});
			} else if (currencies) {
				if (element.currency.toUpperCase() == currencies)
					pricearray.push(element)
			} else {
				pricearray.push(element)
			}



			this.pricearray = pricearray;
			console.log('this.pricearray', this.pricearray);


		})
	}
	siteType() {
		// SITE_TYPE_SERVICE_POINT = '/atom/site-type';x
		let publisher = localStorage.getItem('publisher');
		var item = {
			publisher: publisher,
			siteType: "ItemSet"
		}


		let URL = this.base.SITE_TYPE_SERVICE_POINT;
		this.http.getDatawithPost(URL, item).subscribe((data: any) => {
			console.log('siteType', data);
			this.chartbookSites = []
			// this.filterDOI(data);
			data = JSON.parse(data);
			// data.feed.forEach((element:any) => {
        // debugger;
			if (data && data.feed && Array.isArray(data.feed) ){
				this.chartbookSites.push(data.feed[0].entry.corpus)
			}else{
				this.chartbookSites.push(data.feed.entry.corpus)
			}
				

			// });

			if (this.showbook) {
				this.getSite();


			} else {
				this.getChartData();
			}

			// this.chartbookSites: ["sgrworks", "freebird2"]

		})
	}

	getChartData() {

		let publisher = localStorage.getItem('publisher');
		let URL = this.base.CHART_REPORT + publisher;
		var data = {
			"options": {
				"end": this.dateRange.value.end,

				"start": this.dateRange.value.start,
				"dateFormat": this.dateFormat(this.dateRange),
				"bookSites": this.chartbookSites,
				"publications": []
			}
		}
		// this.dateFormat(this.dateRange)
		// let DATA= {
		//   // "endDate": this.dateRange.value.s
		//   "endDate": this.dateRange.value.end,
		//   "pub": publisher,
		//   "startDate": this.dateRange.value.start


		// }
		this.http.getDatawithPost(URL, data).subscribe((data: any) => {
			console.log('chart data', data.result);
			var defaultcurrency: any = localStorage.getItem('defaultcurrency');
			if (defaultcurrency) {
				defaultcurrency = JSON.parse(defaultcurrency);
				defaultcurrency = defaultcurrency.currency
			}
			this.masterChartData = data
			this.genratechartdata(this.masterChartData, defaultcurrency);
		})
	}

	genratechartdata(data: any, defaultcurrency: any) {
		let data1 = data.result;
		let daterange = data.range
		// var Currency = 'USD';

		// var curr= localStorage.getItem('currency')+'';
		// if(curr)
		// this.currency=  JSON.parse(curr);
		let books: any = [];
		var journal: any = [];
		for (let item in data1) {
			// console.log('item ',item)
			let id: any = item + '';
			id = id.replaceAll('-', '')
			if (this.hw.isbn(id)) {
				books.push(data1[item])
			} else if (item !== '$all') {
				journal.push(data1[item])
				// this.booksite.forEach((element:any) => {
				// if(item==element)
				// console.log('element',element);
				// });

			}

		}
		console.log('book         ', books);
		console.log('journal         ', journal);


		var Currency: any = localStorage.getItem('currency');
		if (Currency) {
			Currency = JSON.parse(Currency);
			console.log('Currency', Currency);
		}
		var amountsArray: any = [];
		let siteData: any = localStorage.getItem('siteData')
		let journalarray: any = []
		let booksArray: any = [];
		if (siteData) {
			siteData = JSON.parse(siteData);
			books.forEach((elementn: any) => {
				var obj2: any = {};
				obj2['amount'] = [];
				obj2['date'] = [];
				if (elementn[defaultcurrency]) {
        

				
				if (this.keys.indexOf(elementn[defaultcurrency].isbn) === -1) {
					return;
				}

				var dates: any = [];
				var mxes: any = []
				elementn[defaultcurrency].values.forEach((elements: any) => {
					dates.push(elements.date);
					mxes.push(Math.round(elements.amount))
				})
				let title = this.getisbnTitle(elementn[defaultcurrency].isbn);
				const maxDate = dates.reduce(function(a: any, b: any) {
					return a > b ? a : b;
				});
				obj2['amount'] = mxes;
				obj2['date'] = dates
				obj2['articel'] = this.getisbnTitle(elementn[defaultcurrency].isbn);
				let pus = true
				booksArray.forEach((item: any) => {
					if (item.articel == title) {
						pus = false
					}
				});
				if (pus) booksArray.push(obj2);
      }else{
      

        obj2['amount'] = [];
				obj2['date'] = []
				obj2['articel'] = '';
        booksArray.push(obj2);
      }
			});
   


			siteData.forEach((element: any) => {
				// debugger;
				if (data1[element.corpus] && data1[element.corpus] !== undefined) {
					var obj: any = {};
					obj['amount'] = [];
					obj['date'] = [];
          obj['articel'] = '';
          if(data1[element.corpus][defaultcurrency]){
            data1[element.corpus][defaultcurrency].values.forEach((element: any) => {
              obj['amount'].push(element.amount),
                obj['date'].push(moment(element.date).format('D MMM YYYY'))
            });
            obj['articel'] = element.title;
            amountsArray.push(obj);
          }else{
            amountsArray.push(obj);
          }
					
				}
			})
   
   

			console.log('booksArray', booksArray);
			// console.log('journalarray',journalarray);
			console.log('amountsArray', amountsArray);
		}
  
    
		this.datesrages = [];
		daterange.forEach((element: any) => {
			console.log(element.date);
			this.datesrages.push(moment(element.date).format('D MMM YYYY'))
		});
		this.loadChart(amountsArray, booksArray);
		// console.log(amounts);
	}
	random(number: any) {
		return Math.floor(Math.random() * number);;
	}
	getisbnTitle(obj: any) {
		let title = ''
		this.booksite.forEach((element: any) => {
			if (element.isbn == obj) {
				title = element.title

			}

		});
		return title;
	}

	random_rgba() {

		return 'rgb(' + this.random(255) + ',' + this.random(255) + ',' + this.random(255) + ')';

	}

	loadChart(amountsArray: any, booksArray: any): void {
		if (this.chartinstan != undefined) {
			this.chartinstan.destroy();
		}
		if (this.chartinstan2 != undefined) {
			this.chartinstan2.destroy();
		}
		this.datasets = []
		this.bookdatasets = []



		booksArray.forEach((element: any) => {
			if (!element) {
				return
			}
			let colors: any = []
			colors.push(this.random_rgba())
			this.bookdatasets.push({
				label: element.articel,
				data: element.amount,
				backgroundColor: colors,
				borderColor: ["rgb(255, 99, 132)", "rgb(255, 159, 64)", "rgb(255, 205, 86)", "rgb(75, 192, 192)", "rgb(54, 162, 235)", "rgb(153, 102, 255)", "rgb(201, 203, 207)"]
			})
		});


		amountsArray.forEach((element: any) => {
			let colors: any = []
			colors.push(this.random_rgba())
			this.datasets.push({
				label: element.articel,
				data: element.amount,
				backgroundColor: colors,
				borderColor: ["rgb(255, 99, 132)", "rgb(255, 159, 64)", "rgb(255, 205, 86)", "rgb(75, 192, 192)", "rgb(54, 162, 235)", "rgb(153, 102, 255)", "rgb(201, 203, 207)"]
			})
		});
		if(this.showbooks){
			this.showChart(this.bookdatasets, this.datesrages);	
		}else{
			this.showChart(this.datasets, this.datesrages);
			
		}

		
		// this.showChart(this.bookdatasets,this.datesrages);









	}

	showChart(bookdatasets: any, datesrages: any) {
		if (this.chartinstan != undefined) {
			this.chartinstan.destroy();
		}
		this.chartinstan = new Chart(this.myChart, {

			type: 'bar',
			data: {
				datasets: bookdatasets,
				labels: datesrages,

			},
			options: {
				responsive: true,
				maintainAspectRatio: false,

				scales: {
					y: {
						beginAtZero: true,

					},

				},

			}
		})

	}

	dateFormat(dateRange: any) {
		var time, days;
		if (!dateRange || !dateRange.value.start || !dateRange.value.end) {

			return false;
		}
		if (typeof dateRange.value.start === 'string' ||
			typeof dateRange.value.start === 'number') {
			dateRange.value.start = new Date(dateRange.value.start);
		}
		if (typeof dateRange.value.end === 'string' ||
			typeof dateRange.value.start === 'number') {
			dateRange.value.end = new Date(dateRange.value.end);
		}

		time = Math.abs(dateRange.value.start.getTime() - dateRange.value.end.getTime());
		// calc days
		days = Math.ceil(time / (1000 * 3600 * 24));

		if (days < 15) {
			return 'day';
		} else if (days < 56) {
			return 'week';
		} else if (days < 548) {
			return 'month';
		} else {
			return 'year';
		}
	};
	resetDate() {
		this.dateRange.reset();
	}

	getRange(options: any) {
		var result: any = {},
			range: any;
		result.ranges = options.range;
		result.buckets = [];
		result.max = 1;

		result.ranges.forEach(function indexBucket(rge: any) {
			result.buckets.push({
				date: moment(rge.date).format('D MMM YYYY'),
				amount: rge.amount,


			});
		});
		result.assign = function assignItemToBucket(item: any) {
			result.ranges.forEach(function checkRange(rge: any, idx: any) {
				if (rge.contains(item.transactionDateTime)) {
					result.buckets[idx].amount += item.amount;
					if (result.buckets[idx].amount > result.max) {
						result.max = result.buckets[idx].amount;
					}
				}
			});
		};
		return result;
	};
}

function destroy() {
	throw new Error('Function not implemented.');
}