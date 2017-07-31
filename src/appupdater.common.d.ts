import { Observable } from 'tns-core-modules/data/observable';
export declare class Common extends Observable {
    message: string;
    constructor();
    checkUpdate(url: any): Promise<{
        update: boolean;
        currentVersion: any;
        newVersion: any;
        path: any;
    }>;
    downloadAndInstall(url: any): Promise<any>;
}
