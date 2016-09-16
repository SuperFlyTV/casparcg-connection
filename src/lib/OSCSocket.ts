import * as osc from 'osc-min';
import * as udp from 'dgram';

import {EventEmitter} from "hap";
import {IConnectionOptions, ConnectionOptions} from "./AMCPConnectionOptions";
import {OSCSocketEvent} from "./event/Events";

export interface IOscSocket {
  listening: boolean;
  port: number;
  address: string;
}

export class OSCSocket extends EventEmitter implements IOscSocket {
  private _socket = udp.createSocket('udp4', (msg, rinfo) => this._onReceivedCallback(msg, rinfo));

  private _listening = false;
  private _port = 6250;
  private _address = '0.0.0.0';

  public constructor(port: number, address?: string) {
    super();
    this._port = port;
    if(address) this._address = address;

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

  public set address(address: string) {
    if (this._address !== address) {
      this._address = address;
      if (this._listening === true) {
        this._socket.close();
        this._socket = udp.createSocket('udp4', (msg, rinfo) => this._onReceivedCallback(msg, rinfo));
        this._socket.bind(this._port, this._address);
      }
    }
  }

  public get address() {
    return this._address;
  }

  public set port(port: number) {
    if (this._port !== port) {
      this._port = port;
      if (this._listening === true) {
        this._socket.close();
        this._socket = udp.createSocket('udp4', (msg, rinfo) => this._onReceivedCallback(msg, rinfo));
        this._socket.bind(this._port, this._address);
      }
    }
  }

  public get port() {
    return this._port;
  }

  public get listening() {
    return this._listening;
  }

  public listen()
  public listen(port?: number, address?: string) {
    if (port) this._port = port;
    if (address) this._address = address;
    this._socket.bind(this._port, this._address);
    this._listening = true;
  }

  public close() {
    this._socket.close();
    this._socket = udp.createSocket('udp4', (msg, rinfo) => this._onReceivedCallback(msg, rinfo));
  }
}