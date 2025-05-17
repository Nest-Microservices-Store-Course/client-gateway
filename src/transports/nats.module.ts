import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { env, NATS_SERVICE } from '../config';

const NATS_CLIENTS = [
    ClientsModule.register([
        {
            name: NATS_SERVICE,
            transport: Transport.NATS,
            options: {
                servers: env.natsServers,
            },
        },
    ]),
]

@Module({
    imports: NATS_CLIENTS,
    exports: NATS_CLIENTS,
})

export class NatsModule { }
