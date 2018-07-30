import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  headerTitle: string = "Movies Test to Cafeto";
  headerLogoPath: string = "../assets/img/movieLogo.gif";
  headerLogoAlt: string = "Header Logo";

  constructor() { }

  ngOnInit() {
  }

}
