import { Event as BaseEventNS } from './BaseEvent';
export declare namespace Event {
    class OSCSocketEvent extends BaseEventNS.BaseEvent {
        constructor(address: string, values: Object);
        static newOutputMessage: string;
        static newStageMessage: string;
        static newMixerMessage: string;
        static newDiagMessage: string;
    }
}
