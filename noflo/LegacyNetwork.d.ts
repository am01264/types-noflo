/// <reference path="BaseNetwork.d.ts" />

declare module "noflo/src/lib/LegacyNetwork" {
    
    import {Graph} from "fbp-graph"
    import {BaseNetwork} from "noflo/src/lib/BaseNetwork"

    export class Network extends BaseNetwork {
 
        constructor(graph : Graph, options : BaseNetwork.ConstructorOptions);
        
        connect(done : (err : Error | null) => void) : void;
        
        subscribeGraph() : void;


    }

}