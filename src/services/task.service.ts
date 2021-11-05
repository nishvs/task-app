import { FindManyOptions } from 'typeorm';
import { TaskEntity } from '../database/entities/task.entity';
import { TaskRepository } from '../repository/task.repository';

export class TaskService {
  private taskRepository: TaskRepository;

  constructor(_taskRepository:TaskRepository){
    this.taskRepository = _taskRepository
  }

  private prepareQuery = (status:string):FindManyOptions<TaskEntity> => {
    const query:FindManyOptions<TaskEntity> = {}
    if(status && status != ""){
        query.where = {status: status}
    }
    return query;
  }

  public fetch = async (status:string) => {
    const query = this.prepareQuery(status);
    const tasks = await this.taskRepository.find(query)
    return tasks;
  } 

  public create = async (task: TaskEntity) => {
    const newPost = await this.taskRepository.save(task);
    return newPost;
  } 

  public update =  async(task: TaskEntity, taskId: string) => {
    const result = await this.taskRepository.update(taskId, task);
    if(result.affected === 0){
      return false;
    }
    return true;
  }

  public delete = async (id:string) => {
    const result = await this.taskRepository.delete(id);
    if(result.affected === 0){
      return false;
    }
    return true;
  } 
}