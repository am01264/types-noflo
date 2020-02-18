declare module "noflo" {

    import { EventEmitter } from "events"
    import { Graph } from "fbp-graph";
    export { Graph, Journal } from "fbp-graph";

    // TODO: namespace Network

    export function isBrowser() : boolean;

    export class Component<_InPorts extends string = "in" | string, _OutPorts extends string = "out" | "error" | string> extends EventEmitter {
        name : string;
        description : string;
        icon : string;

        constructor( options? : Component.ConstructorOptions<_InPorts,_OutPorts> );

        outPorts : OutPorts<_OutPorts>
        inPorts : InPorts<_InPorts>

        process( handler : Component.ProcessHandler<_InPorts, _OutPorts> ) : void;
    }

    namespace Component {

        export type ProcessHandler<_InPorts extends string, _OutPorts extends string> = ( input : ProcessInput<_InPorts>, output : ProcessOutput<_OutPorts> ) => void

        export type ConstructorOptions<_InPorts extends string, _OutPorts extends string> = Partial<{
            inPorts : InPorts<_InPorts> | Ports.PortConstructorOptions<_InPorts>,
            outPorts : OutPorts<_OutPorts> | Ports.PortConstructorOptions<_OutPorts>,
            icon : string,
            description: string
        }>

        type SingleOrArray<T> = T | T[];
        type PortRef<PortName extends string> = PortName;
        type ArrayPortRef<PortName extends string> = [ PortName, number ];

        export interface ProcessInput<_InPorts extends string = string> {

            has(ports? : SingleOrArray<_InPorts>, validator? : (packet : IP) => boolean) : boolean;
            hasData(...ports : Array<_InPorts>) : boolean;
            hasStream(ports? : SingleOrArray<_InPorts>, validator? : (stream : any) => boolean) : boolean;
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
        ports : { [key : string] : Ports.InPort }
        // on(name : string, event : string, callback : (...args : any[]) => void) : this;
        // once(name : string, event : string, callback : (...args : any[]) => void) : this;
    }

    export class OutPorts<_PortNames extends string = string> extends Ports<_PortNames> {
        ports : { [key : string] : Ports.OutPort }

        connect(name : string, socketId : any) : void;
        beginGroup(name : string, group : any, socketId : any) : void;
        send(name : string, data : any, socketId : any) : void;
        endGroup(name : string, socketId : any) : void;
        disconnect(name : string, socketId : any) : void;
    }

    namespace Ports {

        class BasePort{
            options : Ports.PortOptions
            constructor( options : Ports.PortOptions );
        }
    
        export interface InPort extends BasePort {}
        export interface OutPort extends BasePort {}

        export interface PortOptions {
            datatype : IP.DataType | string;
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

    // TODO: Add sockets

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

    interface CallbackOptions {
        name : string;
        baseDir : string;
        loader : ComponentLoader;
        raw : boolean;
    }

    type CreateNetworkOptions = Partial<{ delay : boolean, subscribeGraph : boolean }>;
    type NetworkCallback = (err : Error | null, network? : Network ) => void;
    export function createNetwork(graph : Graph, callback : NetworkCallback) : Network;
    export function createNetwork(graph : Graph, options : CreateNetworkOptions, callback : NetworkCallback) : Network;
    
    type LoadFileOptions = Partial<{ baseDir : string }> & CreateNetworkOptions;
    export function loadFile( file : string, callback : NetworkCallback ); 
    export function loadFile( file : string, options : LoadFileOptions, callback : NetworkCallback ); 

    export function saveFile( graph : Graph, file : string, callback : (err : Error | null, filename? : string) => void) : void;


    type PortInputs = {
        [port: string]: any;
    };

    type NofloCallback<T> = (err : Error | null, result? : T) => void;

    interface CallbackResponse {
        ( inputs : PortInputs, callback : NofloCallback<any> ) : void;
    }

    export function asCallback(component : string, options? : Partial<CallbackOptions>) : CallbackResponse;
    
    interface FunctionRegular<ResultType> {
        <T0>(arg0 : T0) : ResultType
        <T0, T1>(arg0 : T0, arg1 : T1) : ResultType
        <T0, T1, T2>(arg0 : T0, arg1 : T1, arg2 : T2) : ResultType
        <T0, T1, T2, T3>(arg0 : T0, arg1 : T1, arg2 : T2, arg3 : T3) : ResultType
        <T0, T1, T2, T3, T4>(arg0 : T0, arg1 : T1, arg2 : T2, arg3 : T3, arg4 : T4) : ResultType
    }

    interface FunctionPromise<ResultType> {
        <T0>(arg0 : T0) : Promise<ResultType>
        <T0, T1>(arg0 : T0, arg1 : T1) : Promise<ResultType>
        <T0, T1, T2>(arg0 : T0, arg1 : T1, arg2 : T2) : Promise<ResultType>
        <T0, T1, T2, T3>(arg0 : T0, arg1 : T1, arg2 : T2, arg3 : T3) : Promise<ResultType>
        <T0, T1, T2, T3, T4>(arg0 : T0, arg1 : T1, arg2 : T2, arg3 : T3, arg4 : T4) : Promise<ResultType>
    }
    
    interface FunctionCallback<ResultType> {
        <T0>(arg0 : T0, callback : NofloCallback<ResultType>) : void
        <T0, T1>(arg0 : T0, arg1 : T1, callback : NofloCallback<ResultType>) : void
        <T0, T1, T2>(arg0 : T0, arg1 : T1, arg2 : T2, callback : NofloCallback<ResultType>) : void
        <T0, T1, T2, T3>(arg0 : T0, arg1 : T1, arg2 : T2, arg3 : T3, callback : NofloCallback<ResultType>) : void
        <T0, T1, T2, T3, T4>(arg0 : T0, arg1 : T1, arg2 : T2, arg3 : T3, arg4 : T4, callback : NofloCallback<ResultType>) : void
    } 
    
    type AsComponentFunction<B> = FunctionRegular<B> | FunctionPromise<B> | FunctionCallback<B>
    type AsComponentOptions = Partial<{ required : boolean }>;

    export function asComponent<ResultType>(func : AsComponentFunction<ResultType>, options : Component.ConstructorOptions<string, string>) : Component

}

