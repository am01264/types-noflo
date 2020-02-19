declare module "noflo/lib/OutPort" {
    import {IP} from "noflo/lib/IP";
    import {BasePort} from "noflo/lib/BasePort";
    import {InternalSocket as Socket} from "noflo/lib/InternalSocket";

    export class OutPort<DataType = any> extends BasePort {
        constructor(options? : Partial<OutPort.Options>);

        attach(socket : Socket, index? : number) : unknown;
        
        connect(socketId? : number) : unknown;
        disconnect(socketId : number) : unknown;

        send(data : DataType, socketId? : number) : unknown;

        beginGroup(group : unknown, socketId? : number) : unknown;
        endGroup(socketId? : number) : unknown;

        sendIP(type : IP.Type, data : DataType, options : IP.ConstructorOptions, autoConnect : boolean) : this;
        sendIP(ip : IP<DataType>, _arg?: null, _arg2?: null, _arg3?: null, autoConnect? : boolean) : this;      

        openBracket(data : any | null, options : IP.ConstructorOptions, socketId?: number) : this;
        closeBracket(data : any | null, options : IP.ConstructorOptions, socketId?: number) : this;

        checkRequired(sockets : Socket[]) : void;

        getSockets(socketId : number) : Socket[];
        isCaching() : boolean;


    }

    namespace OutPort {

        type Options = BasePort.Options & {
            scoped : boolean;
            isCaching : boolean;
        }

    }

}