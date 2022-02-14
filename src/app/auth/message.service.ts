import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {
  messages: string[] = [];
  constructor() { }
  add(message: string) {
    if (this.messages.length > 1000) {
      this.messages.shift();
    }
    let timestamp = new Date(Date.now()).toString();
    this.messages.push(`${timestamp}\t${message}\n`);
  }

  clear() {
    this.messages = [];
  }

  export(filename:any) {
    filename = filename ? filename : 'hwp-taxonomy-message-log.txt';
    let m = this;
    let txtContent = 'data:text/plain;charset=utf-8,';
    m.messages.forEach(msg => {
      txtContent += msg;
    })
    let encodedUri = encodeURI(txtContent);
    let link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
  }

}
