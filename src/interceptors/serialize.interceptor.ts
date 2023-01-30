import {
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass, plainToInstance } from 'class-transformer';

interface ClassConstructor{
    new (...args: any[]): {}
}

export function Serialize(dto:any){
    return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor{
    constructor(private dto:ClassConstructor) {}

    intercept(context: ExecutionContext, handler: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        // Run something before a request is handled
        // by the request handler
        
        return handler.handle().pipe(
            map((data:any) => {
                // Run something before the reponse is sent out 
                return plainToInstance(this.dto, data,{
                    excludeExtraneousValues: true
                })
                
            }))
        
    }
}