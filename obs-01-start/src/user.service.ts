import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable()
export class userService {
  activatedEmitter = new Subject<boolean>();
}
