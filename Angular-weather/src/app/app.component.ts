import { Component, NgZone } from '@angular/core';

import { OnInit } from '@angular/core';
import {observable} from "rxjs";
import {Http} from "@angular/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public title = 'Places';
  public addrKeys: string[];
  public addr: object;
  public city: string = "Stockholm";

  public weatherApiData: object;
  public posts: any;
  public postsArray = [];
  public postsColor = ["#314a7d","#6ab7e9","#8c8a8f"];
  public postColor:string;



  //Method to be invoked everytime we receive a new instance 
  //of the address object from the onSelect event emitter.
  setAddress(addrObj) {
    //We are wrapping this in a zone method to reflect the changes
    //to the object in the DOM.
    this.zone.run(() => {
      this.addr = addrObj;

      this.city = this.addr["locality"];
      /*this.callWeatherAPI();*/

      this.addrKeys = Object.keys(addrObj);

    });
  }

 /* constructor(private zone: NgZone,private service: PostService) {}*/

  constructor(private zone: NgZone,private http: Http) {}
  ngOnInit() {

  }

  callWeatherAPI() {
    /*this.service.getAll()
      .subscribe(posts => this.posts = posts);*/
    /*return this.http.get('http://jsonplaceholder.typicode.com/posts')*/
    this.http.get('http://api.apixu.com/v1/current.json?key=ae3f3dccb02042bea15221357180211&q=' + this.city)
      .subscribe(response => {
        this.posts = response.json();


        var imageSrc = this.posts["current"].condition["icon"];
        //imageSrc = imageSrc.slice(2);
        imageSrc = "http://" + imageSrc;
        console.log("test" + imageSrc);
        var cityCountry = this.posts["location"].name + ", " + this.posts["location"].country;
        this.postColor = this.postsColor[Math.floor(Math.random() * Math.floor(3))];
        this.funcInJsFile(cityCountry,this.posts["current"].temp_c,imageSrc,this.postColor);


      });



  }
  funcInJsFile(cityCountry,tempVal,imageName,postColor) {

    this.postsArray.push({city: cityCountry, temp:tempVal, image:imageName, pColor:postColor})

  }



}
