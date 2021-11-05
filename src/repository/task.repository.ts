import { EntityRepository, Repository } from "typeorm";
import { TaskEntity } from "../database/entities/task.entity";

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity> {

}