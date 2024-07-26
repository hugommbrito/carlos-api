import { Course } from "../../domain.courses/entity/course.entity";
import { Lecture } from "../../domain.courses/entity/lecture.entity";
import { RewardOption } from "../../domain.rewards/entity/reward-option.entity";
import { RewardRegister } from "../../domain.rewards/entity/reward-register.entity";
import { User } from "../../domain.users/entities/user.entity";
import { Module as ModuleEntity } from "../../domain.courses/entity/module.entity";
import { DataSource } from "typeorm";
import {config as dotenvConfig} from 'dotenv'
dotenvConfig()

export const AppDataSource = new DataSource({
  type: 'postgres',
  database: process.env.NODE_ENV === 'development' ?
    process.env.DATABASE_DEV_NAME :
    process.env.DATABASE_PROD_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  ssl: true,
  entities: [User, Course, ModuleEntity, Lecture],
  synchronize: process.env.NODE_ENV === 'development',
  migrations: ["src/databases/typeorm/migrations/*.ts"],
})

AppDataSource.initialize()
.then(() => {
  console.log('Data Source has been initialized!');
})
.catch((err) => {
  console.error('Error during Data Source initialization:', err);
});