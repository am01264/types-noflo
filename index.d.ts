declare module "noflo" {

    import { EventEmitter } from "events"

    class Component<_InPorts extends string = "in" | string, _OutPorts extends string = "out" | "error" | string> extends EventEmitter {
        description : string;
        icon : string;

        constructor( options? : Component.ConstructorOptions<_InPorts,_OutPorts> );

        outPorts : OutPorts<_OutPorts>
        inPorts : InPorts<_InPorts>

        process( handler : Component.ProcessHandler<_InPorts, _OutPorts> ) : void;
    }

    namespace Component {

        export type ProcessHandler<_InPorts extends string, _OutPorts extends string> = ( input : ProcessInput<_InPorts>, output : ProcessOutput<_OutPorts> ) => void

        export type ConstructorOptions<_InPorts extends string, _OutPorts extends string> = {
            inPorts : InPorts<_InPorts> | Ports.PortConstructorOptions<_InPorts>,
            outPorts : OutPorts<_OutPorts> | Ports.PortConstructorOptions<_OutPorts>,
            icon : string,
            description: string
        }

        type SingleOrArray<T> = T | T[];
        type PortRef<PortName extends string> = PortName;
        type ArrayPortRef<PortName extends string> = [ PortName, number ];

        export interface ProcessInput<_InPorts extends string = string> {

            has(ports? : SingleOrArray<_InPorts>, validator? : (packet : IP) => boolean) : boolean;
            hasData(ports? : SingleOrArray<_InPorts>, validator? : (packet : any) => boolean) : boolean;
            hasStream(ports? : SingleOrArray<_InPorts>, validator? : (stream) => boolean) : boolean;
            get( ...ports : Array<PortRef<_InPorts> | ArrayPortRef<_InPorts>> ) : IP
            getData( ...ports : Array<PortRef<_InPorts> | ArrayPortRef<_InPorts>> ) : any
            getStream( ...ports : Array<PortRef<_InPorts> | ArrayPortRef<_InPorts>> ) : IP[]
        
        }
        
        interface OutputMap<_PortName extends string = string> {
            [ key : string ] : any
        
            /**
             * For a future version of typescript that allows generic keys
             * Track progress on https://github.com/Microsoft/TypeScript/pull/26797
             * 
             * [ key : _PortName ] : any
             */
        }
        
        export interface ProcessOutput<_OutPorts extends string = string> {
            error( err : Error | Error[]) : void;
            sendIP( port : _OutPorts, packet : IP) : void;
            send( map : OutputMap<_OutPorts> ) : void;
            sendDone( map : OutputMap<_OutPorts> ) : void;
            done( error? : Error | Error[] ) : void;
        }

    }

    class Ports<_PortNames extends string> extends EventEmitter {
        constructor( ports : Ports.PortConstructorOptions<_PortNames> )
        add( name : _PortNames, options? : Partial<Ports.PortOptions>) : this
        remove( name : _PortNames ) : this
    }

    export class InPorts<_PortNames extends string = string> extends Ports<_PortNames> {
        // on(name : string, event : string, callback : (...args : any[]) => void) : this;
        // once(name : string, event : string, callback : (...args : any[]) => void) : this;
    }

    export class OutPorts<_PortNames extends string = string> extends Ports<_PortNames> {
        connect(name : string, socketId : any) : void;
        beginGroup(name : string, group, socketId) : void;
        send(name : string, data : any, socketId) : void;
        endGroup(name : string, socketId) : void;
        disconnect(name : string, socketId) : void;
    }

    namespace Ports {

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
            
            [ key : string ] : PortOptions
        
            /**
             * For a future version of TypeScript that allows generic keys
             * Track progress on https://github.com/Microsoft/TypeScript/pull/26797
             *
             * [ key : _PortNames ] : PortOptions
             * 
             */
        }

    }


    export class IP<_Data = any> {
        type : 'data' | 'openBracket' | 'closeBracket';
        data : _Data;
        datatype: IP.DataType

        clone() : IP<_Data>;
        drop() : void;
    }

    namespace IP {

        export type DataType 
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
            | 'string' 

    }

}

