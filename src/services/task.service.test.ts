import { TaskService } from './task.service';
import { TaskRepository } from '../repository/task.repository'
import { getCustomRepository,getConnection } from 'typeorm';
import { Postgres } from '../database/postgres';

describe("Task Service",()=>{

    beforeAll(async () => {
        await new Postgres().createConnection();    
    });
    describe("Given a status as input",()=>{
        it("should respond with empty list",async ()=>{
            const taskService = new TaskService(getConnection(process.env.NODE_ENV).getCustomRepository(TaskRepository));
            const result = await taskService.fetch("completed");
            expect(result).toBeDefined();
            expect(result).toEqual([]);
        })
    })
})