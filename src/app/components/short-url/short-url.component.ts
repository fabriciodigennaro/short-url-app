import { Component, OnInit } from '@angular/core';
import { ShortUrlService } from 'src/app/services/short-url.service';

@Component({
  selector: 'app-short-url',
  templateUrl: './short-url.component.html',
  styleUrls: ['./short-url.component.css']
})
export class ShortUrlComponent implements OnInit {
  urlName: string;
  urlShort: string;
  urlProcessed: boolean;
  loading: boolean;
  showError: boolean;
  textError: string;

  constructor(private _shortUrlService: ShortUrlService) { 
    this.urlName = '';
    this.urlShort = '';
    this.urlProcessed = false;
    this.loading = false;
    this.showError = false;
    this.textError= '';
  }

  ngOnInit(): void {
  }

  processUrl() {
    // validate if the url is empty
    if(this.urlName === '') {
     this.error('Por favor ingrese una URL');
     return;      
    } 
    
    this.urlProcessed = false;
    this.loading = true;

    setTimeout(() => {
      this.obtainUrlShort();
    }, 2000);
    
  }

  obtainUrlShort() {
    this._shortUrlService.getUrlShort(this.urlName).subscribe(data => {
      this.loading = false;
      this.urlProcessed = true;
      this.urlShort = data.short_url;
    }, error => {
      console.log(error);
      
      this.loading = false;
      this.urlName = '';
      if(error.error.description === 'The value provided is invalid.') {
        this.error('La URL ingresada es invalida')
      }
    })
  }

  error(value: string) {
    this.showError = true;
    this.textError = value;
    setTimeout(() => {
      this.showError = false;
    }, 3000);
  }
}
