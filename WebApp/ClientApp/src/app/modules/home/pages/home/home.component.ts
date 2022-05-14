import { Component, OnInit } from '@angular/core';
import {FilesService} from "../../../../services/files.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  colors: string[] = [];
  constructor(private fileService: FilesService) { }

  ngOnInit(): void {
    this.fileService.getFiles().subscribe((res: string[]) => {
      if(res){
        this.colors = res;
      }
    });
  }

}
