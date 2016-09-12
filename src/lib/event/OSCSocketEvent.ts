import {Event as BaseEventNS} from './BaseEvent';

export namespace Event {

  export class OSCSocketEvent extends BaseEventNS.BaseEvent {

    constructor(public adress: string, public value: Object) {
      super({adress: adress, value: value})
    }

    static newOutputMessage = 'oscsocketeventnewoutputmessage';
    static newStageMessage = 'oscsocketeventnewstagemessage';
    static newMixerMessage = 'oscsocketeventnewmixermessage';
  }
}