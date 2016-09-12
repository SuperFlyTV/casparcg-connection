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
  private _socket = udp.createSocket('udp4', this._onReceivedCallback);

  public listening = false;
  public port = 6250;

  public constructor(port: number, autolisten: boolean) {
    super();
    this.port = port;
    if (autolisten) {
      this._socket.bind(this.port);
      this.listening = true;
    }
  }

  private _onReceivedCallback(msg, rinfo): void {
    let bundle: any = osc.fromBuffer(msg);

    for (let element of bundle.elements) {
      let adress = element.address.split('/');

      if (adress[2] === 'stage') {
        this.fire(OSCSocketEvent.newStageMessage, new OSCSocketEvent(element.address, element.args));
      } else if (adress[2] === 'mixer') {
        this.fire(OSCSocketEvent.newMixerMessage, new OSCSocketEvent(element.address, element.args));
      } else {
        this.fire(OSCSocketEvent.newOutputMessage, new OSCSocketEvent(element.address, element.args));
      }
    }
  }
}