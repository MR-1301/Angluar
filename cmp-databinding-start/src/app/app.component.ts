import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    serverElements = [{type: 'server', name: 'Test!', content: 'test'}];

    onServerAdded(serverData: { newServerName: string, newServerContent: string }) {
        this.serverElements.push({
            type: 'server',
            name: serverData.newServerName,
            content: serverData.newServerContent
        });
    }

    onBlueprintAdded(bluePrintData: { newServerName: string, newServerContent: string }) {
        this.serverElements.push({
            type: 'blueprint',
            name: bluePrintData.newServerName,
            content: bluePrintData.newServerContent
        });
    }

    onChangeFirst() {
        this.serverElements[0].name = "Changed!!"
    }

    onDestroyFirst() {
        this.serverElements.splice(0, 1)
    }
}
