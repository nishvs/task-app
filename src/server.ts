import express, {NextFunction, Request, Response} from 'express';
import { getConnection } from "typeorm";
import { TaskController } from './controller/task.controller'; 
import { TaskRepository } from './repository/task.repository';
import { TaskService } from "./services/task.service";
import { Postgres } from './database/postgres';
import dotenv from 'dotenv'

class Server {
  private taskController: TaskController;
  private app: express.Application;

  constructor(taskController:TaskController){
    this.taskController = taskController;
    this.app = express(); // init the application
    this.configuration();
    this.routes();
  }

  /**
   * Method to configure the server,
   * If we didn't configure the port into the environment 
   * variables it takes the default port 3000
   */
  public configuration() {
    this.app.set('port', process.env.PORT || 8085);
    this.app.use(express.json());
  }

  /**
   * Method to configure the routes
   */
  public async routes(){

    //this.taskController = new TaskController();

    this.app.get( "/", (req: Request, res: Response ) => {
      res.send( "Test request" );
    });

    this.app.use(`/api/v1/tasks/`,this.taskController.router); // Configure the new routes of the controller post

    this.app.use((error:Error, req: Request, res: Response, next: NextFunction) => {
      return res.status(500).json({});
    });
  }

  public start(){
    this.app.listen(this.app.get('port'), () => {
      console.log(`Server is listening ${this.app.get('port')} port.`);
    });
  }
}

const init = async () => {
  dotenv.config();
  await new Postgres().createConnection();
  const server = new Server(new TaskController(new TaskService(getConnection(process.env.NODE_ENV).getCustomRepository(TaskRepository)))); // Create server instance
  server.start(); // Execute the server
}

init();
