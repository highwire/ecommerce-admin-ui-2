import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'guidelinefilter'
})
export class GuidelinefilterPipe implements PipeTransform {

  symbols= [
    {key:'AED',value: 'د.إ'},
    {key:'AFN',value: '؋'},
    {key:'ALL',value: 'L'},
    {key:'AMD',value: 'դր.'},
    {key:'ANG',value: 'ƒ'},
    {key:'AOA',value: 'Kz'},
    {key:'ARS',value: '$'},
    {key:'AUD',value: '$'},
    {key:'AWG',value: 'ƒ'},
    {key:'AZN',value: 'm'},
    {key:'BAM',value: 'KM'},
    {key:'BBD',value: '$'},
    {key:'BDT',value: '৳'},
    {key:'BGN',value: 'лв'},
    {key:'BHD',value: 'ب.د'},
    {key:'BIF',value: 'Fr'},
    {key:'BMD',value: '$'},
    {key:'BND',value: '$'},
    {key:'BOB',value: 'Bs.'},
    {key:'BRL',value: 'R$'},
    {key:'BSD',value: '$'},
    {key:'BTN',value: 'Nu'},
    {key:'BWP',value: 'P'},
    {key:'BYR',value: 'Br'},
    {key:'BZD',value: '$'},
    {key:'CAD',value: '$'},
    {key:'CDF',value: 'Fr'},
    {key:'CHF',value: 'Fr'},
    {key:'CLP',value: '$'},
    {key:'CNY',value: '¥'},
    {key:'COP',value: '$'},
    {key:'CRC',value: '₡'},
    {key:'CUP',value: '$'},
    {key:'CVE',value: '$, Esc'},
    {key:'CZK',value: 'Kč'},
    {key:'DJF',value: 'Fr'},
    {key:'DKK',value: 'kr'},
    {key:'DOP',value: '$'},
    {key:'DZD',value: 'د.ج'},
    {key:'EEK',value: 'KR'},
    {key:'EGP',value: '£,ج.م'},
    {key:'ERN',value: 'Nfk'},
    {key:'ETB',value: 'Br'},
    {key:'EUR',value: '€'},
    {key:'FJD',value: '$'},
    {key:'FKP',value: '£'},
    {key:'GBP',value: '£'},
    {key:'GEL',value: 'ლ'},
    {key:'GHS',value: '₵'},
    {key:'GIP',value: '£'},
    {key:'GMD',value: 'D'},
    {key:'GNF',value: 'Fr'},
    {key:'GTQ',value: 'Q'},
    {key:'GYD',value: '$'},
    {key:'HKD',value: '$'},
    {key:'HNL',value: 'L'},
    {key:'HRK',value: 'kn'},
    {key:'HTG',value: 'G'},
    {key:'HUF',value: 'Ft'},
    {key:'IDR',value: 'Rp'},
    {key:'ILS',value: '₪'},
    {key:'INR',value: '₨'},
    {key:'IQD',value: 'ع.د'},
    {key:'IRR',value: '﷼'},
    {key:'ISK',value: 'kr'},
    {key:'JMD',value: '$'},
    {key:'JOD',value: 'د.ا'},
    {key:'JPY',value: '¥'},
    {key:'KES',value: 'Sh'},
    {key:'KGS',value: 'лв'},
    {key:'KHR',value: '៛'},
    {key:'KMF',value: 'Fr'},
    {key:'KPW',value: '₩'},
    {key:'KRW',value: '₩'},
    {key:'KWD',value: 'د.ك'},
    {key:'KYD',value: '$'},
    {key:'KZT',value: 'Т'},
    {key:'LAK',value: '₭'},
    {key:'LBP',value: 'ل.ل'},
    {key:'LKR',value: 'ரூ'},
    {key:'LRD',value: '$'},
    {key:'LSL',value: 'L'},
    {key:'LTL',value: 'Lt'},
    {key:'LVL',value: 'Ls'},
    {key:'LYD',value: 'ل.د'},
    {key:'MAD',value: 'د.م.'},
    {key:'MDL',value: 'L'},
    {key:'MGA',value: 'Ar'},
    {key:'MKD',value: 'ден'},
    {key:'MMK',value: 'K'},
    {key:'MNT',value: '₮'},
    {key:'MOP',value: 'P'},
    {key:'MRO',value: 'UM'},
    {key:'MUR',value: '₨'},
    {key:'MVR',value: 'ރ.'},
    {key:'MWK',value: 'MK'},
    {key:'MXN',value: '$'},
    {key:'MYR',value: 'RM'},
    {key:'MZN',value: 'MT'},
    {key:'NAD',value: '$'},
    {key:'NGN',value: '₦'},
    {key:'NIO',value: 'C$'},
    {key:'NOK',value: 'kr'},
    {key:'NPR',value: '₨'},
    {key:'NZD',value: '$'},
    {key:'OMR',value: 'ر.ع.'},
    {key:'PAB',value: 'B/.'},
    {key:'PEN',value: 'S/.'},
    {key:'PGK',value: 'K'},
    {key:'PHP',value: '₱'},
    {key:'PKR',value: '₨'},
    {key:'PLN',value: 'zł'},
    {key:'PYG',value: '₲'},
    {key:'QAR',value: 'ر.ق'},
    {key:'RON',value: 'RON'},
    {key:'RSD',value: 'RSD'},
    {key:'RUB',value: 'р.'},
    {key:'RWF',value: 'Fr'},
    {key:'SAR',value: 'ر.س'},
    {key:'SBD',value: '$'},
    {key:'SCR',value: '₨'},
    {key:'SDG',value: 'S$'},
    {key:'SEK',value: 'kr'},
    {key:'SGD',value: '$'},
    {key:'SHP',value: '£'},
    {key:'SLL',value: 'Le'},
    {key:'SOS',value: 'Sh'},
    {key:'SRD',value: '$'},
    {key:'STD',value: 'Db'},
    {key:'SYP',value: '£, ل.س'},
    {key:'SZL',value: 'L'},
    {key:'THB',value: '฿'},
    {key:'TJS',value: 'ЅМ'},
    {key:'TMT',value: 'm'},
    {key:'TND',value: 'د.ت'},
    {key:'TOP',value: 'T$'},
    {key:'TRY',value: '₤'},
    {key:'TTD',value: '$'},
    {key:'TWD',value: '$'},
    {key:'TZS',value: 'Sh'},
    {key:'UAH',value: '₴'},
    {key:'UGX',value: 'Sh'},
    {key:'USD',value: '$'},
    {key:'UYU',value: '$'},
    {key:'UZS',value: 'лв'},
    {key:'VEF',value: 'Bs'},
    {key:'VND',value: '₫'},
    {key:'VUV',value: 'Vt'},
    {key:'WST',value: 'T'},
    {key:'XAF',value: 'Fr'},
    {key:'XCD',value: '$'},
    {key:'XOF',value: 'Fr'},
    {key:'XPF',value: 'Fr'},
    {key:'YER',value: '﷼'},
    {key:'ZAR',value: 'R'},
    {key:'ZMK',value: 'ZK'},
    {key:'ZWL',value: '$'}
]

transform(textFields: any) {
  var val= ''
// Object.entries(this.symbols).forEach(item => {
//     if(item[textFields]= )
//     val=  item[textFields];
// });

this.symbols.forEach((item)=>{
    
    if(item.key==textFields){
        
        val= item.value;
    }

})
  return val;
// return this.symbols[textFields];
}

}
