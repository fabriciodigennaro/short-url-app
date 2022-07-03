import { Component, OnInit } from '@angular/core';
import { ShortUrlService } from 'src/app/services/short-url.service';

@Component({
  selector: 'app-short-url',
  templateUrl: './short-url.component.html',
  styleUrls: ['./short-url.component.css'],
})
export class ShortUrlComponent implements OnInit {
  urlName: string;
  urlShort: string;
  urlProcessed: boolean;
  loading: boolean;
  showError: boolean;
  textError: string;
  isCopyToClipboard: boolean;

  constructor(private _shortUrlService: ShortUrlService) {
    this.urlName = '';
    this.urlShort = '';
    this.urlProcessed = false;
    this.loading = false;
    this.showError = false;
    this.textError = '';
    this.isCopyToClipboard = false;
  }

  ngOnInit(): void {}

  processUrl() {
    this.isCopyToClipboard = false;
    // validate if the url is empty
    if (this.urlName === '') {
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
    this._shortUrlService.getUrlShort(this.urlName).subscribe(
      (data) => {
        this.loading = false;
        this.urlProcessed = true;
        this.urlShort = data.short_url;
      },
      (error) => {
        this.loading = false;
        this.urlName = '';
        if (error.error.message === 'Please insert a valid URL') {
          this.error('La URL ingresada es invalida');
        }
      }
    );
  }

  copyContent() {
    this.copyTextToClipboard(this.urlShort);
  }

  copyTextToClipboard(text: string) {
    let txtArea = document.createElement('textarea');
    txtArea.value = text;
    document.body.appendChild(txtArea);
    txtArea.select();

    try {
      let successful = document.execCommand('copy');
      this.isCopyToClipboard = successful;
      return successful;
    } catch (err) {
      console.error('Oops, unable to copy');
    } finally {
      document.body.removeChild(txtArea);
    }
    return false;
  }

  error(value: string) {
    this.showError = true;
    this.textError = value;
    setTimeout(() => {
      this.showError = false;
    }, 3000);
  }
}
