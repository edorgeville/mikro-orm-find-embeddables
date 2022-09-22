
import { MikroORM } from '@mikro-orm/core'
import { MongoDriver } from '@mikro-orm/mongodb'
import * as entities from './entities'

const entrypoint = async () => {
  const orm = await MikroORM.init<MongoDriver>({
    entities: Object.values(entities),
    dbName: 'mikro-orm-find-embeddables',
    type: 'mongo',
    implicitTransactions: false,
    forceEntityConstructor: true,
    allowGlobalContext: true
  })

  console.log('create all elements')
  const extraLargeBox = new entities.Packaging('box')
  const pen = new entities.Product('Pen (1pcs)')
  const inefficientPackage = new entities.Package(extraLargeBox, pen)

  console.log('create an order and persist it')
  const order = new entities.Order()
  order.address = '10 Hello St.'
  order.packages = [inefficientPackage]
  await orm.em.persistAndFlush(order)

  console.log('find the order from the package')
  // ValidationError: Using operators inside embeddables is not allowed, move the operator above. (property: Order.packages, payload: { packages: { '$in': [ [Package] ] } })
  console.log(await orm.em.findOne(entities.Order, { packages: [inefficientPackage] }))
}

entrypoint()