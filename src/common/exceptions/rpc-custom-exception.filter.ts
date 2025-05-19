import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
    catch(exception: RpcException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const rpcError = exception.getError();
        const errorString = rpcError.toString();

        if (errorString.includes('Empty response')) {
            response.status(500).json({
                statusCode: 500,
                message: errorString.substring(0, errorString.indexOf('(') - 1),
            });
            return;
        }

        if (
            typeof rpcError === 'object' &&
            'status' in rpcError &&
            'message' in rpcError
        ) {
            const status = typeof rpcError.status === 'number' ? rpcError.status : 400;
            response.status(status).json(rpcError);
        } else {
            response.status(400).json({
                statusCode: 400,
                message: rpcError,
            });
        }
    }
}
