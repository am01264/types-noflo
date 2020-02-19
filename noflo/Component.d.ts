/// <reference path="IP.d.ts" />
/// <reference path="Ports.d.ts" />
/// <reference path="InPort.d.ts" />

declare module "noflo/lib/Component" {
    
    import { EventEmitter } from "events";
    import { IP } from "noflo/lib/IP"
    import { InPorts, OutPorts, Ports} from "noflo/lib/Ports";
    import { InPort } from "noflo/lib/InPort";

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
            inPorts : Ports.PortConstructorOptions<_InPorts>,
            outPorts : Ports.PortConstructorOptions<_OutPorts>,
            icon : string,
            description: string
        }>

        type SingleOrArray<T> = T | T[];
        type PortRef<PortName extends string> = PortName;
        type ArrayPortRef<PortName extends string> = [ PortName, number ];

        export interface ProcessInput<_InPorts extends string = string> {

            has(ports? : SingleOrArray<_InPorts>, validator? : InPort.Validator) : boolean;
            hasData(...ports : Array<_InPorts>) : boolean;
            hasStream(ports? : SingleOrArray<_InPorts>, validator? : InPort.Validator) : boolean;
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

    

}