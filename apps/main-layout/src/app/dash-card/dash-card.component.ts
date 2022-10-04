import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'taxpayer-p-dash-card',
  templateUrl: './dash-card.component.html',
  styleUrls: ['./dash-card.component.css'],
})
export class DashCardComponent implements OnInit {
  @Input()
  title!: String;
  @Input()
  subtitle!: String;
  constructor() { }

  ngOnInit(): void {
  }
}
