import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class User {
  @PrimaryKey()
  id!: number;

  @Property({ type: 'text', unique: true })
  username!: string;

  @Property({ type: 'text' })
  password!: string;

  @Property({ type: 'text', default: 'example@gmail.com' })
  email!: string;

  @Property({ type: 'date' })
  createdAt = new Date();

  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt = new Date();
}
