import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-head-menu',
  templateUrl: './head-menu.component.html',
  styleUrls: ['./head-menu.component.css']
})
export class HeadMenuComponent implements OnInit {

  itemsLeft = [
    {title: "Title1", href: "#"},
    {title: "Title2", href: "#"},
    {title: "Title3", href: "#"}
  ];

  itemsRight = [
    {title: "Title1", href: "#"},
    {title: "Title2", href: "#"},
    {title: "Title3", href: "#"}
  ];

  itemHeight: number;
  fullHeight: number;

  constructor(private elem: ElementRef) {

  }

  ngOnInit() {
    this.itemHeight = this.elem.nativeElement.firstElementChild.clientHeight;
    this.fullHeight = (this.itemsLeft ? this.itemsLeft.length*this.itemHeight : 0) +
      (this.itemsRight ? this.itemsRight.length*this.itemHeight : 0) + this.itemHeight;
  }

  show (event) {
    var target = this.elem.nativeElement.getElementsByClassName("collapsable")[0];

    if (target.style.height === "") target.style.height = this.fullHeight + "px";
    else target.style.height = "";
  }

}
