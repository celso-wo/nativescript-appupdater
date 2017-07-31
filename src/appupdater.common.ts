import * as app from 'tns-core-modules/application';
import * as dialogs from 'tns-core-modules/ui/dialogs';
import * as fs from 'tns-core-modules/file-system';
import * as http from 'tns-core-modules/http';

import { Observable } from 'tns-core-modules/data/observable';
import { Zip } from "nativescript-zip";

export class Common extends Observable {
  public message: string;

  constructor() {
    super();
  }

  public checkUpdate(url) {
    return http.getJSON(url).then(res => {
      let packageJSON = JSON.parse(fs.knownFolders.currentApp().getFile('package.json').readTextSync());
      let currentVersion = packageJSON['version'];

      return {
        update: currentVersion !== res['version'],
        currentVersion: currentVersion,
        newVersion: res['version'],
        path: res['path']
      };
    });
  }

  public downloadAndInstall(url) {
    let updateFilePath = fs.knownFolders.temp().getFile('update.zip').path;
    let updateFolderPath = fs.knownFolders.temp().getFolder('update').path;

    return http.getFile(url, updateFilePath).then(data => {

      // Test if files is unzipable
      return Zip.unzip(updateFilePath, updateFolderPath).then(unziped => {
        fs.knownFolders.temp().getFolder('update').clear();

        // Clean app folder
        return fs.knownFolders.currentApp().clear().then((clear) => {
          return Zip.unzip(updateFilePath, fs.knownFolders.currentApp().path).then(unziped => {
            return unziped;
          });
        });
      });
    });
  }
}
