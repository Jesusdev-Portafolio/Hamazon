import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';


@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent implements OnInit {

  @Input() totalItems: number;
  @Input() pageSize: number;
  @Input() currentPage : number;
  @Output() pageChanged =  new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }
  onPagerChange(event: PageChangedEvent): void {
    this.pageChanged.emit(event.page);
  }
}
