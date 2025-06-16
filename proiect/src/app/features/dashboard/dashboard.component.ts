import { Component } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { MenuComponent } from "../menu/menu.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NzIconModule, NzMenuModule, MenuComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
