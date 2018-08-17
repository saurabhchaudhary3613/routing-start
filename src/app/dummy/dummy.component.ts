import { Component } from '@angular/core';
import { DummyService } from './dummy.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.css'],
  providers: [DummyService, DataService]
})
export class DummyComponent implements OnInit{
  user: {name: string};
  isLoggedIn = false;
  data: string;

  constructor(private dummyService: DummyService, private dataService: DataService) {}

  ngOnInit() {
    this.user = this.dummyService.user;
    this.dataService.getDetails().then((data: string) => {
      this.data = data;
    })
  }
}
