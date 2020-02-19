/// <reference path="Component.d.ts" />
/// <reference path="InternalSocket.d.ts" />
/// <reference path="IP.d.ts" />

/// <reference path="BasePort.d.ts" />
/// <reference path="InPort.d.ts" />
/// <reference path="OutPort.d.ts" />
/// <reference path="Ports.d.ts" />

/// <reference path="ComponentLoader.d.ts" />

/// <reference path="LegacyNetwork.d.ts" />
/// <reference path="Network.d.ts" />

/// <reference path="AsCallback.d.ts" />
/// <reference path="AsComponent.d.ts" />

declare module "noflo" {
    
    import { EventEmitter } from "events"
    import { Graph } from "fbp-graph";
    export { Graph, Journal } from "fbp-graph";
    
    export {Network} from "noflo/src/lib/LegacyNetwork"

    export function isBrowser() : boolean;
    
    export {ComponentLoader} from "noflo/src/lib/ComponentLoader"
 
    export {Component} from "noflo/src/lib/Component";

    export {InPorts, OutPorts} from "noflo/src/lib/Ports";
    export {InPort} from "noflo/src/lib/InPort";
    export {OutPort} from "noflo/src/lib/OutPort";

    export {InternalSocket as internalSocket} from "noflo/src/lib/InternalSocket";

    export {IP} from "noflo/src/lib/IP";

    import {Network} from "noflo/src/lib/Network"
    type CreateNetworkOptions = Partial<{ delay : boolean, subscribeGraph : boolean }>;
    type NetworkCallback = (err : Error | null, network? : Network ) => void;
    export function createNetwork(graph : Graph, callback : NetworkCallback) : Network;
    export function createNetwork(graph : Graph, options : CreateNetworkOptions, callback : NetworkCallback) : Network;
    
    type LoadFileOptions = Partial<{ baseDir : string }> & CreateNetworkOptions;
    export function loadFile( file : string, callback : NetworkCallback ); 
    export function loadFile( file : string, options : LoadFileOptions, callback : NetworkCallback ); 

    export function saveFile( graph : Graph, file : string, callback : (err : Error | null, filename? : string) => void) : void;

    export {asCallback} from "noflo/src/lib/AsCallback";    
    export {asComponent} from "noflo/src/lib/AsComponent";

}

