import {
  Column, CreateDateColumn, Entity, PrimaryColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('users')
class User {
  @PrimaryColumn()
  id: string

  @Column()
  _id: string

  @Column()
  username: string

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  pro: boolean = false

  @Column()
  confirmed: boolean = false

  @Column('text', { array: true })
  friends: string[] = []

  @CreateDateColumn()
  created_at: Date = new Date()

  @CreateDateColumn()
  updated_at: Date = new Date()

  constructor() {
    if (!this._id) {
      this._id = `${uuid()}.${uuid()}`;
    }
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default User;
