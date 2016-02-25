import {Component} from 'angular2/core';
import {Http} from 'angular2/http';
@Component({
    selector: 'app',
    directives: [],
    template: `
    <div>  
        <button (click)="onTestClick()">make test request</button>
        <label>{{message}}</label>
    </div>
  `,
})

export class App {
    message: string = "Click button to test the app";
    constructor(private _http: Http) { }
    onTestClick() {
        this._http.post("/api/test", null)
            .map(res => res.json())
            .subscribe((result) => {
               this.message = `Server respond: ${result} is the result of coordinated work of 5 microservices and means, that the application works as designed`;
            })
    }
}