import { Entity, PrimaryKey, Property } from "@mikro-orm/core"
import { ObjectId } from "@mikro-orm/mongodb"



@Entity()
export class Packaging {
  @PrimaryKey()
  _id!: ObjectId

  @Property()
  width: number = 20

  @Property()
  height: number = 10

  @Property()
  format: 'letter' | 'box' = 'letter'

  constructor (format: Packaging['format']) {
    this.format = format
  }
}