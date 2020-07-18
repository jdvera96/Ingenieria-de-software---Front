import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  {

  constructor(private nav:NavController) { }

  ngOnInit() {
    
  }

  cerrarSesion(){
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    this.nav.navigateForward("");
  }

}
