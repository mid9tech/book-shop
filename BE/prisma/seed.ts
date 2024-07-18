import {
  PrismaClient,
  Gender,
  StatusProduct,
  StatusOrder,
  PaymentMethod,
  UserStatus,
  PromotionLevel,
  PromotionType,
  CategoryType,
  Prisma,
} from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // Upsert Admin
  const admin = await prisma.hShopAdmin.upsert({
    where: { email: 'admin@hshopp.com' },
    update: {},
    create: {
      email: 'admin@hshopp.com',
      firstName: 'Hai',
      lastName: 'Nguyen',
      gender: Gender.MALE,
      phoneNumber: '0813042255',
      password: '$2b$10$a9Eaf/fML42Kqro/QNd/FewOm.hDdiu3omJHqsh6xQ2Kzz7FiX8Uu',
      salt: '$2b$10$a9Eaf/fML42Kqro/QNd/Fe',
    },
  });

  // Create Users
  const users: Prisma.UserCreateInput[] = [];
  for (let i = 0; i < 20; i++) {
    users.push({
      id: faker.datatype.uuid(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      birthDate: faker.date.past(30),
      gender: faker.helpers.arrayElement([
        Gender.MALE,
        Gender.FEMALE,
        Gender.UNDEFINED,
      ]),
      phoneNumber: faker.phone.number(),
      password: faker.internet.password(),
      salt: faker.random.alphaNumeric(10),
      status: faker.helpers.arrayElement([
        UserStatus.ACTIVE,
        UserStatus.BANNED,
        UserStatus.UNVERIFIED,
        UserStatus.DELETED,
      ]),
      avatar: faker.image.avatar(),
      secretOtp: faker.random.alphaNumeric(6),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  await prisma.user.createMany({ data: users });

  // Create Publishers
  const publishers: Prisma.PublisherCreateManyInput[] = [];
  for (let i = 0; i < 10; i++) {
    publishers.push({
      id: faker.datatype.uuid(),
      name: faker.company.name(),
      description: faker.company.catchPhrase(),
      address: faker.address.streetAddress(),
      phoneNumber: faker.phone.number(),
      avatar: faker.image.avatar(),
      status: true,
      createdBy: admin.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  await prisma.publisher.createMany({ data: publishers });

  // Create Categories
  const categories: Prisma.CategoryCreateManyInput[] = [];
  for (let i = 0; i < 5; i++) {
    const parentId = faker.datatype.uuid();
    categories.push({
      id: parentId,
      name: faker.commerce.department(),
      type: CategoryType.PARENT,
      description: faker.commerce.productDescription(),
      createdBy: admin.id,
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    for (let j = 0; j < 3; j++) {
      categories.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.department(),
        type: CategoryType.CHILDREN,
        description: faker.commerce.productDescription(),
        parentId: parentId,
        createdBy: admin.id,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  }
  await prisma.category.createMany({ data: categories });

  // Create Promotions
  const promotions: Prisma.PromotionCreateManyInput[] = [];
  for (let i = 0; i < 5; i++) {
    promotions.push({
      id: faker.datatype.uuid(),
      name: faker.commerce.productName(),
      description: faker.lorem.sentences(),
      level: faker.helpers.arrayElement([
        PromotionLevel.ORDER,
        PromotionLevel.ITEM,
      ]),
      type: faker.helpers.arrayElement([
        PromotionType.PERCENT,
        PromotionType.VALUE,
      ]),
      banner: faker.image.imageUrl(),
      discountPercentage: faker.datatype.number({ min: 1, max: 100 }),
      discountValue: faker.datatype.float({ min: 1, max: 100 }),
      minValue: faker.datatype.float({ min: 10, max: 500 }),
      startDate: faker.date.past(),
      endDate: faker.date.future(),
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  await prisma.promotion.createMany({ data: promotions });

  // Get all categories and publishers for product creation
  const allCategories = await prisma.category.findMany();
  const allPublishers = await prisma.publisher.findMany();

  // Create Products
  const products: Prisma.ProductCreateManyInput[] = [];
  for (let i = 0; i < 100; i++) {
    products.push({
      id: faker.datatype.uuid(),
      publisherId: faker.helpers.arrayElement(allPublishers).id,
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price()),
      priceSale: parseFloat(faker.commerce.price()),
      categoryId: faker.helpers.arrayElement(allCategories).id,
      isOnSale: faker.datatype.boolean(),
      avatar: faker.image.imageUrl(),
      status: StatusProduct.ACTIVE,
      author: [faker.name.fullName()],
      rate: parseFloat((Math.random() * 5).toFixed(2)),
      ratingCount: faker.datatype.number({ min: 1, max: 100 }),
      images: [faker.image.imageUrl(), faker.image.imageUrl()],
      createdBy: admin.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  await prisma.product.createMany({ data: products });

  // Get all products and users for review creation
  const allProducts = await prisma.product.findMany();
  const allUsers = await prisma.user.findMany();

  // Create Reviews
  /* const reviews: Prisma.ReviewCreateManyInput[] = [];
  for (let i = 0; i < 500; i++) {
    const product = faker.helpers.arrayElement(allProducts);
    const user = faker.helpers.arrayElement(allUsers);

    reviews.push({
      ownerId: user.id,
      productId: product.id,
      content: faker.lorem.sentences(),
      title: faker.lorem.sentence(),
      images: [faker.image.imageUrl(), faker.image.imageUrl()],
      status: true,
      rate: parseFloat((Math.random() * 5).toFixed(2)),
    });
  }
  await prisma.review.createMany({ data: reviews }); */

  // Create Orders
  /* const orders: Prisma.OrderCreateManyInput[] = [];
  for (let i = 0; i < 50; i++) {
    const user = faker.helpers.arrayElement(allUsers);
    const contact = await prisma.contact.create({
      data: {
        ownerId: user.id,
        fullName: faker.name.fullName(),
        district: faker.address.cityName(),
        province: faker.address.state(),
        wards: faker.address.street(),
        detailAddress: faker.address.streetAddress(),
        phoneNumber: faker.phone.number(),
      },
    });

    orders.push({
      id: faker.datatype.uuid(),
      ownerId: user.id,
      contactId: contact.id,
      promotionId: faker.helpers.arrayElement(promotions).id,
      isPaid: faker.datatype.boolean(),
      paymentMethod: faker.helpers.arrayElement([
        PaymentMethod.COD,
        PaymentMethod.CREDIT_CARD,
      ]),
      totalPrice: parseFloat(faker.commerce.price()),
      reducePrice: faker.datatype.float({ min: 0, max: 100 }),
      priceToPay: faker.datatype.float({ min: 0, max: 100 }),
      status: faker.helpers.arrayElement([
        StatusOrder.PENDING,
        StatusOrder.ON_SHIPPING,
        StatusOrder.CANCEL,
        StatusOrder.DONE,
        StatusOrder.RETURN,
      ]),
      reason: faker.lorem.sentence(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  await prisma.order.createMany({ data: orders });

  // Link products to orders (productOrder)
  const allOrders = await prisma.order.findMany();
  const productOrders: Prisma.productOrderCreateManyInput[] = [];
  for (const order of allOrders) {
    const numProducts = faker.datatype.number({ min: 1, max: 5 });
    for (let i = 0; i < numProducts; i++) {
      productOrders.push({
        orderId: order.id,
        productId: faker.helpers.arrayElement(allProducts).id,
        price: parseFloat(faker.commerce.price()),
        quantity: faker.datatype.number({ min: 1, max: 10 }),
      });
    }
  }
  await prisma.productOrder.createMany({ data: productOrders }); */
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
