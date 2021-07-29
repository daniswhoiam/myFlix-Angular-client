import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
/**
 * Static footer that is displayed on all pages
 */
export class FooterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
