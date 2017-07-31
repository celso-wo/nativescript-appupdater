import { Observable } from 'tns-core-modules/data/observable';
import { Appupdater } from 'nativescript-appupdater';

export class HelloWorldModel extends Observable {
  public message: string;
  private appupdater: Appupdater;

  constructor() {
    super();

    this.appupdater = new Appupdater();
    this.message = this.appupdater.message;
  }
}