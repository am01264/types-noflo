/// <reference path="IP.d.ts" />

declare module "noflo/lib/InternalSocket" {

    import { EventEmitter } from "events";
    import { IP } from "noflo/lib/IP"
    
    export class InternalSocket extends EventEmitter {

        metadata : InternalSocket.Metadata;
        brackets : unknown[]
        connected : boolean;
        dataDelegate : CallableFunction | null;
        debug : boolean;

        constructor( metadata : InternalSocket.Metadata );

        emitEvent(event : string, data : any) : this;
        regularEmitEvent(event : string, data : any) : this;
        debugEmitEvent(event : string, data : any) : this;

        connect() : void;
        disconnect() : void;
        isConnected() : boolean;

        send<T>( data : IP<T> | T ) : this;
        post<T>( ip : IP<T>, autoDisconnect : boolean) : void;

        beginGroup(group : unknown) : void;
        endGroup(group : unknown) : void;

        setDataDelegate(delegate : CallableFunction) : void;
        setDebug( active : boolean ) : void;

        getId() : string;
        
        legacyToIp<T>(event : string, payload : T) : IP<T> | null;
        ipToLegacy<T>(ip : IP<T>) : {event : 'begingroup' | 'data' | 'endgroup', payload : T};
        
        handleSocketEvent<T>( event : string, payload : IP<T> | T, autoconnect : boolean) : void;

        on( event :'error', listener : (error : InternalSocket.EventErrorData) => void) : this;
        on( event: 'connect', listener : (data : null) => void) : this;
        on( event: 'disconnect', listener : (data : null) => void) : this;
        on( event: 'ip', listener : (ip : IP) => void) : this;


    }

    namespace InternalSocket {
        interface Metadata {
            [key : string] : any;
        }

        interface EventErrorData {
            id : unknown,
            error : Error;
            metadata : Metadata;
        }
    }

    export function createSocket() : InternalSocket;

}