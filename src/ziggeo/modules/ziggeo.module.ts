import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZiggeoRecorderComponent } from './components/ziggeo-recorder/ziggeo-recorder.component';
import { ZiggeoPlayerComponent } from './components/ziggeo-player/ziggeo-player.component';

@NgModule({
    imports: [
        /* angular stuff */
        CommonModule

        /* 3rd Party Component */

    ],
    declarations: [
        ZiggeoPlayerComponent,
        ZiggeoRecorderComponent
    ],
    exports: [
        /* angular stuff */

        /* 3rd Party Component */

        /* our own custom component */
        ZiggeoPlayerComponent,
        ZiggeoRecorderComponent
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
})
export class ZiggeoModule {}
