/// <reference path="IP.d.ts" />
/// <reference path="BasePort.d.ts" />
/// <reference path="InternalSocket.d.ts" />

declare module "noflo/lib/InPort" {
    import {IP} from "noflo/lib/IP";
    import {BasePort} from "noflo/lib/BasePort";
    import {InternalSocket as Socket} from "noflo/lib/InternalSocket";

    export class InPort<DataType = any> extends BasePort {
        scopedBuffer : {[key : string] : IP<DataType>[]} | undefined;
        iipBuffer : IP<DataType>[]
        buffer : IP<DataType>[]

        constructor( options : Partial<BasePort.Options> )

        attachSocket( socket : Socket ) : void;
        handleIP(ip : IP, id? : number) : void;
        handeSocketEvent(event, payload, id) : void;
        hasDefault() : boolean;
        
        prepareBuffer() : void;
        prepareBufferForIP( ip : IP<DataType> ) : IP<DataType>[]
        
        validateData( data : DataType ) : void;
        
        getBuffer(scope : InPort.Scope, idx : number, initial : boolean) : IP<DataType>[];
        getFromBuffer( scope : InPort.Scope, idx : number, initial : boolean) : IP<DataType> | null | undefined;
        get(scope : InPort.Scope, idx : number) : IP<DataType> | undefined | null;
        
        hasIPinBuffer(scope : InPort.Scope, idx : number, validate : InPort.Validator, initial : boolean) : boolean;
        hasIIP(idx : number, validate : InPort.Validator) : boolean;
        has(scope : InPort.Scope, idx : number, validate : InPort.Validator) : boolean;
        
        length(scope : InPort.Scope, idx : number) : number;

        ready(scope : InPort.Scope, idx : number) : boolean;
        clear() : void;

        on(event : string, listener : (...args : any[]) => void) : this;
        on(event: 'ip', listener : (ip : IP, index? : number) => void) : this;

    }

    namespace InPort {
        type Scope = string;

        type InPortOptions = BasePort.Options & {
            control : boolean;
            scoped : boolean;
            triggering : boolean;
            default : any;
        }

        type Validator = (ip : IP) => boolean;
    }
}