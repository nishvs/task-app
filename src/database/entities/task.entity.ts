import { Column, Entity, PrimaryGeneratedColumn, Generated } from "typeorm";

@Entity('task')
export class TaskEntity {

  @PrimaryGeneratedColumn()
  @Generated("uuid")
  taskId: string;

  @Column()
  name: string;
  
  @Column()
  status: string;
}