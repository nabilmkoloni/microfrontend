// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import Swal from "sweetalert2";

export const environment = {
  production: false,
  //apiUrl:'https://gateway.zanrevenue.org/',
  apiUrl:'http://102.223.7.131:6060/',
  //apiUrl:'http://102.223.7.131:3030/',
  decode:(id:any)=>{

    const decodeFromBase = atob(id);

    const binary = decodeFromBase;
    
    return parseInt(binary,2)
      
  
  },
  encode:(dec: any)=>{

    const desimaal  =(dec >>> 0).toString(2);

    return window.btoa(desimaal)

  },
  success:(title:string)=>{
    Swal.fire({
      icon: 'success',
      title: `${title}`,
      showConfirmButton: false,
      timer: 3000
    })
  },
  error:(title: any)=>{
    Swal.fire({
      icon: 'error',
      title: `${title}`,
      showConfirmButton: true,
      confirmButtonColor: 'red',
      confirmButtonText: 'Please Try Again!'
     
    })
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
