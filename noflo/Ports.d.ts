/// <reference path="IP.d.ts" />
/// <reference path="InPort.d.ts" />
/// <reference path="OutPort.d.ts" />
/// <reference path="Component.d.ts" />

declare module "noflo/src/lib/Ports" {
    
    import { IP } from "noflo/src/lib/IP"
    import { InPort } from "noflo/src/lib/InPort";
    import { OutPort } from "noflo/src/lib/OutPort";
    import { Component } from "noflo/src/lib/Component";
    import { EventEmitter } from "events";
    
    class Ports<_PortNames extends string> extends EventEmitter {

        model : InPort | OutPort;
        ports : { [key : string] : InPort | OutPort };
    
        constructor( ports : Ports.PortConstructorOptions<_PortNames> );
    
        add( name : _PortNames, options : Partial<Ports.PortOptions>, process : Component) : this
        remove( name : _PortNames ) : this

        on(event: 'add', listener : (name : string) => void) : this;
        on(event: 'remove', listener : (name : string) => void) : this;
    }

    namespace Ports {

        type PortID = string;

        export interface PortOptions {
            datatype : IP.DataType;
            description: string;
            canAttach : boolean
            addressable: boolean;
            cached : boolean;
            required: boolean;
            values: any[]
            control: boolean;
            triggering: boolean;
        }
        
        export interface PortConstructorOptions<_PortNames extends string> {
            
            [ key : string ] : PortOptions | InPort | OutPort
        
            /**
             * For a future version of TypeScript that allows generic keys
             * Track progress on https://github.com/Microsoft/TypeScript/pull/26797
             *
             * [ key : _PortNames ] : PortOptions
             * 
             */
        }
    
    }

    export class InPorts<_PortNames extends string = string> extends Ports<_PortNames> {
        ports : { [key : string] : InPort }
        
        on(event : string, listener : (...args : any[]) => void) : this;
        on(name : string, event : string, callback : (...args : any[]) => void) : this;
        
        once(event : string, listener : (...args : any[]) => void) : this;
        once(name : string, event : string, callback : (...args : any[]) => void) : this;
    }
    
    export class OutPorts<_PortNames extends string = string> extends Ports<_PortNames> {
        ports : { [key : string] : OutPort }
    
        connect(name : string, socketId : number) : void;
        beginGroup(name : string, group : any, socketId : number) : void;
        send<T>(name : string, data : T | IP<T>, socketId : number) : void;
        endGroup(name : string, socketId : number) : void;
        disconnect(name : string, socketId : number) : void;
    }    

    export function normalizePortName( name : string ) : string;

}



