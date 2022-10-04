import { loadRemoteModule } from "@angular-architects/module-federation";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainLayoutComponent } from "./main-layout.component";

const routes:Routes = [
    {
        path:'',component:MainLayoutComponent,children:[
            {
              path: '',
              loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule)
            },
            {
              path: 'userManagement',
              loadChildren: () => loadRemoteModule({
                remoteEntry: 'http://localhost:4202/remoteEntry.js',
                type: 'module',
                exposedModule: './Module'
              })
              .then(m => m.UserManagementModule)
            },
            // {
            //   path: 'witholdReport',
            //   loadChildren: () => loadRemoteModule({
            //     remoteEntry: 'http://localhost:4208/remoteEntry.js',
            //     type: 'module',
            //     exposedModule: './Module'
            //   })
            //   .then(m => m.WreportModule)
            // },
            // {
            //   path: 'accommodationReport',
            //   loadChildren: () => loadRemoteModule({
            //     remoteEntry: 'http://localhost:4209/remoteEntry.js',
            //     type: 'module',
            //     exposedModule: './Module'
            //   })
            //   .then(m => m.AreportModule)
            // },
            // {
            //   path: 'checkoutReport',
            //   loadChildren: () => loadRemoteModule({
            //     remoteEntry: 'http://localhost:4210/remoteEntry.js',
            //     type: 'module',
            //     exposedModule: './Module'
            //   })
            //   .then(m => m.CreportModule)
            // },
            // {
            //   path: 'expectedCheckoutReport',
            //   loadChildren: () => loadRemoteModule({
            //     remoteEntry: 'http://localhost:4211/remoteEntry.js',
            //     type: 'module',
            //     exposedModule: './Module'
            //   })
            //   .then(m => m.EreportModule)
            // },
            // {
            //   path: 'summaryReport',
            //   loadChildren: () => loadRemoteModule({
            //     remoteEntry: 'http://localhost:4212/remoteEntry.js',
            //     type: 'module',
            //     exposedModule: './Module'
            //   })
            //   .then(m => m.SreportModule)
            // },
            // {
            //   path: 'purchaseReport',
            //   loadChildren: () => loadRemoteModule({
            //     remoteEntry: 'http://localhost:4213/remoteEntry.js',
            //     type: 'module',
            //     exposedModule: './Module'
            //   })
            //   .then(m => m.PreportModule)
            // }
          ]
    }
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class MainLayoutRoutingModule {

}