/// <reference path="InternalSocket.d.ts" />
/// <reference path="ComponentLoader.d.ts" />
/// <reference path="Component.d.ts" />
/// <reference path="IP.d.ts" />

declare module "noflo/src/lib/BaseNetwork" {
    
    import {EventEmitter} from "events";
    
    import {InternalSocket} from "noflo/src/lib/InternalSocket";
    import {ComponentLoader} from "noflo/src/lib/ComponentLoader";
    import {Component} from "noflo/src/lib/Component"
    import {Ports} from "noflo/src/lib/Ports";
    import {Graph, Callback} from "fbp-graph/lib/graph";

    type NofloCallback = (err : Error | null) => void;
    type NofloCallbackWithResult<T> = (err : Error | null, result : T) => void;

    export class BaseNetwork extends EventEmitter {
        options : BaseNetwork.Options
        processes : { [ key : string ] : BaseNetwork.Process };
        connections : InternalSocket[];
        initials : (Graph.Initializer | unknown)[];
        defaults : InternalSocket[];
        graph : Graph | null;
        startupDate : number | null;
        eventBuffer : BaseNetwork.EventData[];

        baseDir : string;
        loader : ComponentLoader;
        
        private debug : boolean;
        private started : boolean;
        private stopped : boolean;

        constructor(graph : Graph, options : BaseNetwork.ConstructorOptions);
        
        uptime() : number;
        
        getActiveProcesses() : Component[]
        
        bufferedEmit(event : string, payload : any) : void;

        load( metadata : BaseNetwork.PropertyMap, callback : Callback<unknown> ) : unknown;
        
        addNode( node : Graph.Node, callback : Callback<unknown> ) : void;
        addNode( node : Graph.Node, options : BaseNetwork.PropertyMap, callback : Callback<unknown> ) : void;
        removeNode( node : Graph.NodeID, callback : NofloCallback ) : void
        renameNode( oldId : Graph.NodeID, newId : Graph.NodeID, callback : NofloCallback ) : void;
        getNode( id : Graph.NodeID ) : BaseNetwork.Process;

        connect( callback : NofloCallback ) : void;
        connectPort( socket : InternalSocket, process : BaseNetwork.Process, port : Ports.PortID, index : number, inbound : boolean, callback : NofloCallback )  : void;
        
        subscribeSubgraph( node : Graph.Node ) : void;
        subscribeSocket( socket : InternalSocket, source : Node) : void;
        subscribeNode( node : Node ) : void;

        addEdge( edge : Graph.Edge, callback : NofloCallback ) : void;
        addEdge( edge : Graph.Edge, options : BaseNetwork.PropertyMap , callback : NofloCallback ) : void;
        removeEdge( edge : Graph.Edge , callback : NofloCallback ) : void;
        
        addDefaults( node : Graph.Node, callback : NofloCallback ) : void;
        addDefaults( node : Graph.Node, options : BaseNetwork.PropertyMap, callback : NofloCallback ) : void;

        addInitial( initializer : Graph.Initializer, callback : NofloCallback ) : void;
        addInitial( initializer : Graph.Initializer, options : BaseNetwork.PropertyMap, callback : NofloCallback ) : void;
        removeInitial( initializer : Graph.Initializer , callback : NofloCallback ) : void;
        sendInitial( initial : Graph.Initializer ) : void;
        
        sendInitials( callback? : NofloCallback ) : void;
        
        isStarted() : boolean;
        isStopped() : boolean;
        isRunning() : boolean;

        startComponents( callback : NofloCallback ) : void;
        
        sendDefaults( callback : NofloCallback ) : void;

        start( callback : NofloCallback ) : void;
        stop( callback : NofloCallback ) : void;
        setStarted( started : boolean ) : void;
        checkIfFinished() : boolean;
        
        getDebug() : boolean
        setDebug( active : boolean ) : void
    }

    namespace BaseNetwork {

        interface EventData<T = any> {
            type : string;
            payload : T;
        }

        interface Process {
            id : unknown;
            component : Component;
            componentName : string;
        }

        type ConstructorOptions = Partial<Options>;
        type Options = {} & ComponentLoader.ConstructorOptions;

        interface PropertyMap {
            [key : string] : any;
        }

    }

}