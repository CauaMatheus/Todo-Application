import {
  Column, CreateDateColumn, Entity, PrimaryColumn, ManyToOne, JoinColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import User from './User';

@Entity('todos')
class Todos {
  @PrimaryColumn()
  id: string

  @Column()
  userId: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  state: boolean

  @CreateDateColumn()
  deadline: Date

  @CreateDateColumn()
  created_at: Date = new Date()

  constructor() {
    if (this.id) {
      this.id = uuid();
    }
  }
}

export default Todos;
