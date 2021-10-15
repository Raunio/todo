import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, RelationId } from 'typeorm';
import { Account } from './account';

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne((type) => Account)
    @JoinColumn({ name: 'account_id', referencedColumnName: 'id' })
    account: Account;

    @Column()
    account_id: number;

    @Column()
    is_done: boolean;

    @Column()
    task_description: string;
}
