import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-somma',
  templateUrl: './somma.component.html',
  styleUrls: ['./somma.component.css']
})
export class SommaComponent implements OnInit {

   @Input() title: string = "";
   tit: string = "";

   risultato: number = 0;

   a: string = "";
   b: string = "";

   ngOnInit(){
     this.tit = this.title;
   }

   somma():number {
    let res = parseFloat(this.a) + parseFloat(this.b);
    return res || 0;
   }

   somma2 = (n1 :string, n2: string): void => {
     this.risultato = (parseFloat(n1) || 0) + (parseFloat(n2) || 0);
   }

}
