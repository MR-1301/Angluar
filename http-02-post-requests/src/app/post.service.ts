import {Injectable} from "@angular/core";
import {HttpClient, HttpEventType, HttpHeaders, HttpParams} from "@angular/common/http";
import {Post} from "./posts.model";
import {catchError, map, tap} from "rxjs/operators";
import {Subject, throwError} from "rxjs";

@Injectable({providedIn: 'root'})

export class PostService {
  baseUrl = 'https://udemy-ng-complete-guide-1313-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json';

  errorOcc = new Subject<any>();

  constructor(private http: HttpClient) {

  }

  createAndStorePost(post: Post) {
    return this.http.post<{ name: string }>(
      this.baseUrl,
      post,
      {
        observe: 'response',
        responseType: 'json'
      }
    ).subscribe((data) => console.log(data), error => {
      this.errorOcc.next(error)
    });
  }

  fetchPosts() {
    let newParams = new HttpParams();
    newParams = newParams.set('print', 'pretty');
    newParams = newParams.set('custom', 'key');

    return this.http.get<Post[]>(this.baseUrl, {
      headers: new HttpHeaders({"Custom-Header": "Hello"}),
      params: newParams,
    })
      .pipe(map(response => {
          const postArray: Post[] = [];
          for (let key in response) {
            if (response.hasOwnProperty(key))
              postArray.push({...response[key], id: key});
          }
          return postArray;
        }),
        catchError(errorRes => {
            return throwError(errorRes);
          }
        )
      )
      ;
  }

  onClear() {
    return this.http.delete(this.baseUrl, {
      observe: 'events',
      responseType: 'text'
    }).pipe(tap((data) => {
      console.log(data);
      if (data.type === HttpEventType.Sent) {
        console.log("Tapping the Sent!!")
      }

      if (data.type === HttpEventType.Response) {
        console.log("Completed!!", data.body)
      }
    }));
  }
}
