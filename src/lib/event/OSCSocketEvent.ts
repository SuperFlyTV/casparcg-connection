import {Event as BaseEventNS} from './BaseEvent';

export namespace Event {

  export class OSCSocketEvent extends BaseEventNS.BaseEvent {

    constructor(address: string, values: Object) {
      super({address: address, value: values})
    }

    static newOutputMessage = 'oscsocketeventnewoutputmessage';
    static newStageMessage = 'oscsocketeventnewstagemessage';
    static newMixerMessage = 'oscsocketeventnewmixermessage';
    static newDiagMessage = 'oscsocketeventnewdiagmessage';
  }
}