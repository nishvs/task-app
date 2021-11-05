import { Router, Response, Request, NextFunction } from "express";
import { TaskEntity } from "../database/entities/task.entity";
import { TaskService } from "../services/task.service";
import { ApiResponse } from "./response";

const validStatus = ["in-progress","completed"];

export class TaskController {
  public router: Router;
  private taskService: TaskService; 

  constructor(_taskService:TaskService){
    this.taskService = _taskService; // Create a new instance of TaskController
    this.router = Router();
    this.routes();
  }

  private fetch = async (req: Request, res: Response,next:NextFunction) => {
    const status = req.params?.status;
    res.locals.data = await this.taskService.fetch(status);
    res.locals.processed = true;
    next();
  }

  private create = async (req: Request, res: Response,next:NextFunction) => {
    const post = req.body as TaskEntity;
    res.locals.data = await this.taskService.create(post);
    res.locals.processed = true;
    next();
  }

  private update = async (req: Request, res: Response,next:NextFunction) => {
    const post = req.body as TaskEntity;
    res.locals.processed = await this.taskService.update(post,req.params.taskid);;
    next();
  }

  private delete = async (req: Request, res: Response,next:NextFunction) => {
    res.locals.processed = await this.taskService.delete(req.params.taskid);
    next();
  }

  private validateFetchRequest = (req: Request, res: Response, next:NextFunction) => {
    if(req.params?.status && !validStatus.includes(req.params.status)){
       res.statusCode = 400;
       res.locals.processed = false;
       this.prepareAndSentResponse(req,res);
    }
    next();
  }

  private validateNameAndStatus = (body:any) => body.name && body.status && validStatus.includes(body.status)

  private validateCreateRequestData = (body:any) => this.validateNameAndStatus(body)

  private validateUpdateRequestData = (body:any) => this.validateNameAndStatus(body)

  private validateCreateRequest = (req: Request, res: Response, next:NextFunction) => {    
    if(!this.validateCreateRequestData(req.body)){
      res.statusCode = 400;
      res.locals = { data : [],processed : false }
      this.prepareAndSentResponse(req,res);
    }else{
      next();
    }
  }

  private validateUpdateRequest = (req: Request, res: Response, next:NextFunction) => {    
    if(!this.validateUpdateRequestData(req.body) || !req.params.taskid){
      res.statusCode = 400;
      res.locals = { data : [],processed : false }
      this.prepareAndSentResponse(req,res);
    }else{
      next();
    }
  }

  private prepareAndSentResponse = (req: Request, res: Response) => {
    const response = new ApiResponse(res.locals.data, res.locals.processed).getResponseData();
    res.json(response);
  }

  public routes(){
    this.router.get('/:status?',this.validateFetchRequest, this.fetch , this.prepareAndSentResponse);
    this.router.post('/',this.validateCreateRequest, this.create,this.prepareAndSentResponse);
    this.router.put('/:taskid',this.validateUpdateRequest, this.update,this.prepareAndSentResponse);
    this.router.delete('/:taskid', this.delete,this.prepareAndSentResponse);
  }
}