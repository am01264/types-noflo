/// <reference path="Component.d.ts" />
/// <reference path="ComponentLoader.d.ts" />

declare module "noflo/lib/AsCallback" {

    import {Component} from "noflo/lib/Component";
    import {ComponentLoader} from "noflo/lib/ComponentLoader";

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

    interface CallbackResponse<_InPortNames extends string = string, _OutPortNames extends string = string> {
        // TODO: Use Generics for port-name autocompletion 
        // (requires a future version of Typescript)

        ( inputs : PortInputs<_InPortNames>, callback : NofloCallback<PortOutputs<_OutPortNames>> ) : void;
    }

    interface CallbackOptions {
        name : string;
        baseDir : string;
        loader : ComponentLoader;
        raw : boolean;
    }
    
    export function asCallback(component : string, options? : Partial<CallbackOptions>) : CallbackResponse;
    
    export function asCallback<_InPortNames extends string, _OutPortNames extends string>(
        component : Component<_InPortNames,_OutPortNames>, 
        options? : Partial<CallbackOptions>
        ) : CallbackResponse<_InPortNames, _OutPortNames>

}