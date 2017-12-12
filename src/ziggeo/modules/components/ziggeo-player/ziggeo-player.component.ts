import {
    Component,
    DoCheck,
    AfterViewInit,
    ViewChild,
    Input,
    OnDestroy
} from '@angular/core';
import { ZiggeoPlayerService } from './ziggeo-player.service';

declare const ZiggeoApi: any;
declare namespace ZiggeoApi.V2 {
    interface V2 {
        Application: any;
        Player: any;
    }
}

@Component({
    selector: 'ziggeo-player',
    providers: [ ZiggeoPlayerService ],
    template: `<div #ziggeoplayer [apiKey]="apiKey" [options]="options"></div>`
})
export class ZiggeoPlayerComponent implements DoCheck, AfterViewInit, OnDestroy {

    @ViewChild('ziggeoplayer') ziggeoplayer: any;
    @Input() options: any = {};
    @Input() apiKey: string;
    playerInstance: any;
    private _events: any = {};
    private _application: object = null;

    constructor (private _ziggeoPlayerService: ZiggeoPlayerService) {
        this._events = _ziggeoPlayerService.getEvents();
    }

    ngDoCheck () {
        if (this.apiKey && !this._application) {
            this._application = ZiggeoApi.V2.Application.instanceByToken(this.apiKey);
        }
    }

    ngAfterViewInit () {
        if (this._application) {
            this.playerInstance = new ZiggeoApi.V2.Player({
                element: this.ziggeoplayer.nativeElement,
                attrs: this.options
            }, this);
            if (typeof this.playerInstance.activate === 'function') {
                this.playerInstance.activate();
            } else {
                console.warn('Issue with launching player');
            }
        }
    }

    ngOnDestroy () {
        if (this.playerInstance && typeof this.playerInstance.destroy === 'function') {
            this.playerInstance.destroy();
        }
    }
}