import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {

  colors: { [key: string]: string } = {
    "React JS": 'linear-gradient(91.73deg, #58C6E3 -0.63%, #61DBFB 13.74%, #48A5BD 97.95%)',
    'Angular': 'linear-gradient(91.73deg, #CD3125 -0.63%, #E62A4D 13.74%, #AC1C50 97.95%)',
    'Spring': 'linear-gradient(91.73deg, #6DB33F -0.63%, #7CCB49 13.74%, #5A9533 97.95%)',
    'Java Script': 'linear-gradient(91.73deg, #E3CF4B -0.63%, #F0DB4F 13.74%, #CFBD44 97.95%)',
    'Git': 'linear-gradient(91.73deg, #E34B2C -0.63%, #F1502F 13.74%, #C23F24 97.95%)',
    'Azure': 'linear-gradient(91.73deg, #008AD7 -0.63%, #0096EA 13.74%, #0072B1 97.95%)',
    'Hibernate': 'linear-gradient(91.73deg, #BCAE79 -0.63%, #D7C78C 13.74%, #9D9165 97.95%)',
    "AWS": 'linear-gradient(91.73deg, #F19100 -0.63%, #FF9900 13.74%, #D37F00 97.95%)',
    'C#': 'linear-gradient(91.73deg, #9873D0 -0.63%, #A179DC 13.74%, #8061AE 97.95%)'
  }

  constructor() { }

  getHex(courseTitle: string) : string
 {
    return this.colors[courseTitle]
 }  
}
