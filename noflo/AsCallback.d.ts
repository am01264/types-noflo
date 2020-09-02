/// <reference path="Component.d.ts" />
/// <reference path="ComponentLoader.d.ts" />
/// <reference path="Network.d.ts" />

declare module "noflo/src/lib/AsCallback" {

    import {ComponentLoader} from "noflo/src/lib/ComponentLoader";
    import {Network} from "noflo/src/lib/Network"
    import {Graph} from "fbp-graph";

    interface PortInputs<_PortNames extends string = string> {
        [port: string]: any;

        /**
         * For a future version of TypeScript that allows generic keys
         * Track progress on https://github.com/Microsoft/TypeScript/pull/26797
         *
         * [ key : _PortNames ] : any
         * 
         */
    }

    interface PortOutputs<_PortNames extends string = string> {
        [port: string]: any;

        /**
         * For a future version of TypeScript that allows generic keys
         * Track progress on https://github.com/Microsoft/TypeScript/pull/26797
         *
         * [ key : _PortNames ] : any
         * 
         */
    }

    type NofloCallback<T> = (err : Error | null, result? : T) => void;
    type NetworkCallbackOption = (network : Network) => void;
    
    interface CallbackResponse<_InPortNames extends string = string, _OutPortNames extends string = string> {
        // Unable to use Generics for port-name autocompletion here as the only
        // context we have is either a component name (string) or graph to work
        // with.

        ( inputs : PortInputs, callback : NofloCallback<PortOutputs> ) : void;
    }

    interface CallbackOptions {
        name : string;
        baseDir : string;
        loader : ComponentLoader;
        raw : boolean;
        networkCallback: NetworkCallbackOption;
    }
    
    export function asCallback(component : string, options? : Partial<CallbackOptions>) : CallbackResponse;
    
    export function asCallback(graph : Graph, options? : Partial<CallbackOptions>) : CallbackResponse;

}
