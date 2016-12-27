import { PlatformRef } from '@angular/core';
import { NodePlatform } from '../lib';
export declare type NodePlatformRef = PlatformRef & NodePlatform;
export declare function platformUniversalDynamic(extraProviders?: any[]): NodePlatformRef;
export declare class UniversalModule {
    static withConfig(config?: {}): {
        ngModule: UniversalModule;
        providers: any[];
    };
}
