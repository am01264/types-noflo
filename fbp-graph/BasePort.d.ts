/// <reference path="InternalSocket.d.ts" />

declare module "noflo/lib/BasePort" {
    import { EventEmitter } from "events";
    import {InternalSocket as Socket} from "noflo/lib/InternalSocket";

    export class BasePort extends EventEmitter {
        options : BasePort.Options;
        sockets : Socket[];
        node : string | null;
        name : string | null;

        constructor( options? : Partial<BasePort.Options> );
        handleOptions(options? : BasePort.Options ) : void;

        getId() : 'Port' | string;
        getDataType() : BasePort.DataType;
        getSchema() : string | null;
        getDescription() : string;

        attach( socket : Socket, index? : number ) : void;
        attachSocket(socket : Socket, index? : number ) : void;
        detach( socket : Socket ) : void;

        isAddressable() : boolean;
        isBuffered() : boolean;
        isRequired() : boolean;
        isAttached(socketId : BasePort.SocketID) : boolean;
        listAttached() : BasePort.SocketID[];
        isConnected(socketId? : BasePort.SocketID) : boolean;
        canAttach() : boolean;

        on(event : string, listener : (...args : any[]) => void) : this;
        on( event : 'attach', listener : (socket : Socket, index? : number) => void) : this;
        on( event : 'detach', listener : (socket : Socket, index? : number) => void) : this;
        
    }

    namespace BasePort {

        type SocketID = number;

        type DataType 
            = 'all' 
            | 'array' 
            | 'bang' 
            | 'buffer' 
            | 'boolean' 
            | 'color' 
            | 'date' 
            | 'function' 
            | 'int' 
            | 'number' 
            | 'object'
            | 'stream'
            | 'string';

        interface Options {
            datatype : DataType;
            required : boolean;
            type : string;
            schema : string;
            desciption : string;
            addressable : boolean;
            buffered: boolean;
        }

    }
}