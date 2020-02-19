/// <reference path="Component.d.ts" />

declare module "noflo/src/lib/AsComponent" {

    import {Component} from "noflo/src/lib/Component";

    type NofloCallback<T> = (err? : Error | null, result? : T ) => void;

    interface FunctionRegular<ResultType> {
        (...args : any[]) : ResultType
    }

    interface FunctionPromise<ResultType> {
        (...args : any[]) : PromiseLike<ResultType>
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