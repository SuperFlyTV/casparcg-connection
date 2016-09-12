import {Event as BaseEventNS} from './BaseEvent';

export namespace Event {

  export class OSCSocketEvent extends BaseEventNS.BaseEvent {

    static newOutputMessage = 'oscsocketeventnewoutputmessage';
    static newStageMessage = 'oscsocketeventnewstagemessage';
    static newMixerMessage = 'oscsocketeventnewmixermessage';
  }
}