import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Post} from "./posts.model";
import {PostService} from "./post.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  baseUrl = 'https://udemy-ng-complete-guide-1313-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json';
  isFetching = false;
  errorMessage = null;

  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;
  sub4: Subscription;

  constructor(private http: HttpClient, private postService: PostService) {
  }


  ngOnInit() {
    this.isFetching = true;
    this.errorMessage = null;
    this.sub1 = this.postService.fetchPosts().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    }, error => {
      this.errorMessage = error;
    });

    this.postService.errorOcc.subscribe((error) => {
      this.errorMessage = error;
    })
  }

  onCreatePost(postData: Post) {
    this.errorMessage = null;
    this.postService.createAndStorePost(postData);
  }

  onFetchPosts() {
    this.isFetching = true;
    this.errorMessage = null;
    this.sub3 = this.postService.fetchPosts().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    }, error => {
      this.errorMessage = error;
    });
  }

  onClearPosts() {
    // Send Http request
    this.errorMessage = null;
    this.sub4 = this.postService.onClear().subscribe(() => {
        this.loadedPosts = []
      }, error => {
        this.errorMessage = error
      }
    );
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub3.unsubscribe();
    this.sub4.unsubscribe();
  }
}
