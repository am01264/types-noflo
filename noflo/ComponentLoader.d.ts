/// <reference path="Component.d.ts" />

declare module "noflo/src/lib/ComponentLoader" {
    
    import { EventEmitter } from "events";
    import { Component } from "noflo/src/lib/Component";
    import { Graph } from "fbp-graph"

    type NofloCallback = (err?: Error | null) => void;
    type NofloCallbackWithResult<T> = (err : Error | null, result : T) => void;

    export class ComponentLoader extends EventEmitter {

        baseDir : string;
        options : ComponentLoader.Options
        components : { [key : string] : ComponentLoader.GraphLoadable | ComponentLoader.ComponentLoadable } | null
        libraryIcons : { [key : string] : string }
        processing : boolean
        ready : boolean;

        constructor( baseDir : string, options : ComponentLoader.ConstructorOptions);
        
        getModulePrefix( name : string ) : string;

        listComponents( callback : NofloCallbackWithResult<ComponentLoader.Module> ) : void;

        load( name : string, callback : NofloCallbackWithResult<Component>, metadata : ComponentLoader.ObjectMap ) : void;
        
        createComponent( name : string, component : ComponentLoader.ComponentLoadable, metadata : ComponentLoader.ObjectMap, callback : NofloCallbackWithResult<Component>) : void;
        
        isGraph( cPath : ComponentLoader.GraphLoadable ) : boolean;
        loadGraph( name : string, component : ComponentLoader.GraphLoadable, callback : NofloCallbackWithResult<Component>, metadata : ComponentLoader.ObjectMap) : void;

        setIcon( name : string, instance : Component) : void;

        getLibraryIcon( prefix : string ) : string | null;
        setLibraryIcon( prefix : string, icon : string) : void;

        normalizeName( packageId : string, name : string) : string;

        registerComponent( packageId : string, name : string, cPath : ComponentLoader.ComponentObjectLoader, callback? : NofloCallback) : void;
        registerGraph( packageId : string, name : string, gPath : ComponentLoader.ComponentObjectLoader, callback? : NofloCallback) : void;
        registerLoader( loader : ComponentLoader.CustomLoader, callback : NofloCallback) : void;

        setSource( packageId : string, name : string, source : string, language : string, callback : NofloCallback ) : void;
        getSource( name : string, callback : NofloCallbackWithResult<ComponentLoader.ComponentSource>) : void;
        
        clear() : void;

    }

    namespace ComponentLoader {

        type ConstructorOptions = Options;
        
        type Options = Partial<ManifestOptions>;
        interface ManifestOptions {
            cache : boolean;
            discover : boolean;
            runtimes : string[];
            recursive : boolean;
            manifest : 'fbp.json' | string;
        }

        type ComponentObjectLoader = (metadata? : ObjectMap) => Component;

        type ComponentLoadable = string 
            | { getComponent : ComponentObjectLoader }
            | ComponentObjectLoader;


        type CustomLoader = ( loader : ComponentLoader, callback : NofloCallback) => void;

        // TODO Extract to `noflo/lib/loader`
        interface ComponentSource {
            name: string;
            library: string;
            code: string;
            language: 'json' | 'coffeescript' | 'javascript' | string;
        }

        interface ObjectMap {
            [ key : string ] : any
        }

        // TODO Extract to `fbp-manifest`
        interface NofloModule {
    
            name: string;
            description: string;
            runtime: 'noflo' | 'noflo-nodejs' | 'noflo-browser';
            noflo: {
                loader : string;
            } | null;
            base: string;
            icon: string;
            components: ComponentInfo[];
        
        }
        
        // TODO Extract to `fbp-manifest`
        interface ComponentInfo {
            name : string | null;
            path : string;
            source : string;
            elementary : false;
        }
        
        // TODO Extract to `fbp-manifest`
        interface MsgfloModule {
            name: string;
            description: string;
            runtime : 'msgflo';
            base: string;
            components: unknown[];
        }
        
        // TODO Extract to `fbp-manifest`
        type Module = NofloModule | MsgfloModule;

        // TODO Extract to `fbp-manifest`
        type GraphLoadable = Graph | GraphJsonLike | '*.json' | '*.fbp' | string;

        /**
         * Any object that matches the output of toJSON() from `fbp-graph/Graph`
         * 
         * Check out the [full schema on `flowbased/fbp`](https://github.com/flowbased/fbp/blob/master/schema/graph.json)
         */
        interface GraphJsonLike {

            processes : {
                component?: string;
                metadata?: {
                    /**
                     * X coordinate of a graph node
                     */
                    x?: number;
                    /**
                     * Y coordinate of a graph node
                     */
                    y?: number;
                    
                    [k: string]: any;
                };
                [k: string]: any;
              };

            connections?: {

                src?: {
                    process?: string;
                    port?: string;
                    index?: number;
                };
                
                tgt?: {
                    process?: string;
                    port?: string;
                    index?: number;
                };
                
                data?: any;
                
                metadata?: {
                    
                    /**
                     * Route identifier of a graph edge
                     */
                    route?: number;
                    
                    /**
                     * JSON schema associated with a graph edge
                     */
                    schema?: string;

                    /**
                     * Whether edge data should be treated as secure
                     */
                    secure?: boolean;
                    [k: string]: any;
                };
            }[];
        }

    }

}