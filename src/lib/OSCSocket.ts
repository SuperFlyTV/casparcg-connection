import * as osc from 'osc-min';
import * as udp from 'dgram';

import {EventEmitter} from "hap";
import {IConnectionOptions, ConnectionOptions} from "./AMCPConnectionOptions";
import {OSCSocketEvent} from "./event/Events";

export interface IOscSocket {
  listening: boolean;
  port: number;
}

export class OSCSocket extends EventEmitter implements IOscSocket {
  private _socket = udp.createSocket('udp4', (msg, rinfo) => this._onReceivedCallback(msg, rinfo));

  private _listening = false;
  private _port = 6250;

  public constructor(port: number, autolisten: boolean) {
    super();
    this._port = port;
    if (autolisten) {
      this._socket.bind(this._port);
      this._listening = true;
    }

    this._socket.on('error', (error) => this._errorHandler(error));
  }

  private _onReceivedCallback(msg, rinfo): void {
    let bundle: any = osc.fromBuffer(msg);


    for (let element of bundle.elements) {
      let adress = element.address.split('/');

      if (adress[3] === 'stage') {
        this.fire(OSCSocketEvent.newStageMessage, new OSCSocketEvent(element.address, element.args));
      } else if (adress[3] === 'mixer') {
        this.fire(OSCSocketEvent.newMixerMessage, new OSCSocketEvent(element.address, element.args));
      } else if (adress[1] === 'diag') {
        this.fire(OSCSocketEvent.newDiagMessage, new OSCSocketEvent(element.address, element.args));
      } else {
        this.fire(OSCSocketEvent.newOutputMessage, new OSCSocketEvent(element.address, element.args));
      }
    }
  }

  private _errorHandler(error): void {
    console.log(error);
  }

  public set port(newPort: number) {
    this._port = newPort;
  }

  public get port() {
    return this._port;
  }

  public get listening() {
    return this._listening;
  }

  public connect()
  public connect(port?: number) {
    if (port) this._port = port;
    this._socket.bind(this._port);
  }

  public close() {
    this._socket.close();
  }
}