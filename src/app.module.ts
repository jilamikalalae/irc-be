import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { NewsFormatModule } from './news-format/news-format.module';
import { WorkflowConfigModule } from './workflow-config/workflow-config.module';
import { NewsModule } from './news/news.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { WorkflowLogModule } from './workflow-log/workflow-log.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL'),
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    CategoryModule,
    NewsFormatModule,
    WorkflowConfigModule,
    NewsModule,
    DashboardModule,
    WorkflowLogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
