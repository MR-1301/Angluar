import {HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {tap} from "rxjs/operators";

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.method.toLocaleLowerCase() === "post")
      console.log("Post Request Sent!!");
    else if (req.method.toLocaleLowerCase() === "get")
      console.log("Get Request Sent!!")
    else if (req.method.toLocaleLowerCase() === "delete")
      console.log("Delete Request Sent!!")

    const modifiedReq = req.clone({headers: req.headers.append('testHeader', 'testHeader')})
    return next.handle(modifiedReq).pipe(tap((events) => {
      console.log(events);
      if (events.type === HttpEventType.Response) {
        console.log("great Success!!")
      }

    }));
  }
}
