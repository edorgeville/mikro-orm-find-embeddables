import { Embeddable, Embedded, Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core"
import { ObjectId } from "@mikro-orm/mongodb"
import { Packaging } from "./Packaging"
import { Product } from "./Product"

@Embeddable()
export class Package {
  @ManyToOne(() => Packaging)
  packaging: Packaging

  @ManyToOne(() => Product)
  content: Product

  constructor (packaging: Packaging, content: Product) {
    this.packaging = packaging
    this.content = content
  }
}

@Entity()
export class Order {
  @PrimaryKey()
  _id!: ObjectId

  @Property()
  address: string = '1 Avenue St.'

  @Embedded(() => Package, { array: true })
  packages: Package[] = []
}