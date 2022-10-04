import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { CustomManifest, CustomRemoteConfig } from '../utils/config';
//import { buildRoutes } from '../utils/routes';
import { getManifest } from '@angular-architects/module-federation';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'taxpayer-p-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent  {

  remotes: CustomRemoteConfig[] = [];
  isExpanded = true;
  panelOpenState = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,private router:Router) {}

  // async ngOnInit(): Promise<void> {
  //   const manifest = getManifest<CustomManifest>();
  //   const routes = buildRoutes(manifest);
  //   this.router.resetConfig(routes);
  //   this.remotes = Object.values(manifest);
  // }

  sideBarToogler() {
    this.isExpanded = !this.isExpanded;
  }

}
