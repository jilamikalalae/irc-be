import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://irc:wZQy0hOFFW8vP4qo@cluster0.entmv3v.mongodb.net',{dbName: 'irc'}), UserModule,],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
