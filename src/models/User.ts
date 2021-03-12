import {
  Column, CreateDateColumn, Entity, PrimaryColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('users')
class User {
  @PrimaryColumn()
  _id: string

  @Column()
  id: string

  @Column()
  username: string

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  pro: boolean

  @Column()
  confirmed: boolean

  @Column()
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
