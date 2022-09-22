import { Entity, PrimaryKey, Property } from "@mikro-orm/core"
import { ObjectId } from "@mikro-orm/mongodb"



@Entity()
export class Product {
  @PrimaryKey()
  _id!: ObjectId

  @Property()
  price: number = 20

  @Property()
  title: string = 'Paperclip (1pcs)'

  constructor (title?: string) {
    this.title ??= title
  }
}