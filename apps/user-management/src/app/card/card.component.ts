import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'taxpayer-p-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() title!:String
  @Input()subtitle!:String
    constructor() { }
  
    ngOnInit(): void {
    }
}
