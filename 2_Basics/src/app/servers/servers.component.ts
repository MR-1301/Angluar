import {Component, OnInit} from '@angular/core';

@Component({
  //select by element
  selector: 'app-servers',
  //select by attribute
  // selector: '[app-servers]',
  //select by class
  // selector: '.app-servers',
  // select by ID
  // selector: '#app-servers',

  templateUrl: './servers.component.html',
  // template:`<app-server></app-server>
  // <app-server></app-server>`,
  styleUrls: []
})
export class ServersComponent implements OnInit {
  allowNewServer = false;
  serverCreationStatus = 'No server was created!!';
  serverName = '';
  displayServerName = ''
  servers = ['Test Server', 'Test Server 2']
  serverCreated = false;

  totalServers = 0;

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000)
  }

  ngOnInit(): void {
  }

  onServerCreation() {
    this.serverCreated = true;
    this.displayServerName = this.serverName;
    this.serverCreationStatus = 'Server was created! ' + 'Name is ' + this.serverName;
    this.servers.push(this.serverName);
    this.serverName = "";
  }

  onUpdateServerName(eve: Event) {
    this.serverName = (<HTMLInputElement>eve.target).value;
  }
}
