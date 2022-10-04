//import { UserFormComponent } from './../../components/user-form/user-form.component';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Usrs } from '../models/usrs.model';
import { Component,OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Observable } from 'rxjs';
//import { TranslateService } from '@ngx-translate/core';
import { MatDialog} from '@angular/material/dialog';
//import { UserFormPermissionsComponent } from '../../components/user-form-permissions/user-form-permissions.component';
import { CustomUsersService } from '../../../../../libs/services/custom-users.service';
import { DefaultUsersService } from '../../../../../libs/services/default-users.service';
import { switchMap } from 'rxjs/operators';
//import { EditBusinessUnitComponent } from '../../components/edit-business-unit/edit-business-unit.component';
import {
	ResizeEvent
} from 'angular-resizable-element';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '@taxpayer-p/shared/auth';

@Component({
  selector: 'taxpayer-p-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
  
})
export class UserManagementComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;
  dataSource!: MatTableDataSource<any>;
  loading!:boolean
  id:any
  loading$!: Observable<boolean>;
  users$!: Observable<Usrs[]>
  refreshUsers$ = new BehaviorSubject<boolean>(true)
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'fname', 'lname', 'username', 'address', 'email', 'mobile', 'role', 'activityNo', 'date', 'actions'];
  constructor(private dialog: MatDialog,
     private users: CustomUsersService,
     private usrs:DefaultUsersService,
      private authService:AuthService,
      //private translate: TranslateService
      ) { 
        //translate.setDefaultLang('en');
      }

  ngOnInit(): void {

    const userId = localStorage.getItem('znumber')
    this.id = userId
    this.dataSource = new MatTableDataSource();
    //console.table(this.usrs.getAll());
    this.fetchAllUsers(userId!)
    this.loading = true

  
  }
  onResizeEnd(event: ResizeEvent, columnName: string): void {
		if (event.edges.right) {
			const cssValue = event.rectangle.width + 'px';
			const columnElts = document.getElementsByClassName('mat-column-' + columnName);
			for (let i = 0; i < columnElts.length; i++) {
				const currentEl = columnElts[i] as HTMLDivElement;
				currentEl.style.width = cssValue;
			}
		}
	}

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.authService.tokenRefreshed$.subscribe((res:any) => {
      if(res) {
        this.fetchAllUsers(this.id)
      }
    })

  }

  preventDefault(){
    event?.preventDefault();
  }

  onClick(event:Event){
    event.preventDefault();
  }


  onCreate() {

    // const options = {
    //   data: {
    //     crudMode: 'Create',
    //     id: null
    //   },
    //   width: '90%',
    //   height: '90%',
    //   maxHeight:'90vh'
    // };
    // const dialogR = this.dialog.open(UserFormComponent, options);

    // dialogR.afterClosed().subscribe(result => {
    //   if(result !== undefined){
    //     this.fetchAllUsers(this.id)
    //   }
    //   this.refreshUsers$.next(true)
    // })
  }




  deactivate(id: number) {
    const nothing = {
      name: 'nothing',
      age: "nothing"
    }
    this.confirmDeactivate(id, nothing)
  }


  activate(id:number){
    const nothing = {
      name: 'nothing',
      age: "nothing"
    }
    this.confirmActive(id, nothing)
  }


  fetchAllUsers(id: string) {

    this.users$ = this.refreshUsers$.pipe(switchMap(_ => this.users.getUserByZnumber(id)));
    this.users$.subscribe((response) => {

      if (response != null) {
        this.dataSource.data = response.filter((user) => {return user.userType == 'User'})
        this.loading = false
      
      }
    },(error:HttpErrorResponse)=>{
        this.loading =false
    })

  }

  onEdit(id: any) {

    // const options = {
    //   data: {
    //     crudMode: 'Edit',
    //     id: id
    //   },
    //   width: '90%',
    //   height: '90%',
    // };
    // const dialogRefrense = this.dialog.open(EditBusinessUnitComponent, options);
    // dialogRefrense.afterClosed().subscribe(result => {
    //   this.refreshUsers$.next(true)
    // })
  }


  onPermissions(id: any, permissions: any) {
    // const options = {
    //   data: {
    //     crudMode: 'Edit',
    //     id: id,
    //     permits: permissions
    //   },
    //   width: '90%',
    //   height: '90%',
    // };
    // const dialogRef = this.dialog.open(UserFormPermissionsComponent, options);
    // dialogRef.afterClosed().subscribe((res) => {
    //   this.refreshUsers$.next(true)
    // })
  }


  


  confirmActive(id: number, body: any) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success ml-2',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, activate!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result:any) => {
      if (result.isConfirmed) {
        this.users.activateUser(id, body).subscribe((response:any) => {
          if (response !== null && response !== undefined) {
            this.refreshUsers$.next(true)
            swalWithBootstrapButtons.fire(
              'Activated',
              'User has been activated successful.',
              'success'
            )


          }
        })

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        'Cancelled'
      }
    })
  }

  confirmDeactivate(id: number, body: any) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success ml-2',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, deactivate!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result:any) => {
      if (result.isConfirmed) {
        this.users.deactivateUser(id, body).subscribe((response:any) => {
          if (response !== null && response !== undefined) {
            this.refreshUsers$.next(true)
            swalWithBootstrapButtons.fire(
              'Deactivated!',
              'User has been deactivated successful.',
              'success'
            )


          }
        })

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        'Cancelled'
      }
    })
  }



}
