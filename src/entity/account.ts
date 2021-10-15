import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Task } from './task';

@Entity()
export class Account {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    password: string;

    @OneToMany((type) => Task, (task) => task.account)
    tasks: Task[];
}
