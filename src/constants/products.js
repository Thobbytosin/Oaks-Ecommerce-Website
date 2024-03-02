import { gamepad, keyboard, monitor, user1, user2, user3, user4 } from "./images";

export const gamePadConsole = {
    id: "flsh-00-1",
    category: "gaming",
    tags: "Gaming, Xbox, Computers",
    name: "HAVIT HV-G92 Gamepad",
    seller: "Havit",
    isNew: false,
    price: 5640,
    oldPrice: 9400,
    discount: 40,
    stock: 20,
    ratings: 4.6,
    ratingsCount: 88,
    img: gamepad,
    shipping: 2,
    quantity: 24,
    description: "Introducing the HAVIT HV-G92 Gamepad, a cutting-edge entertainment device that combines elegance with exceptional durability. This remarkable product boasts a sleek and stylish design, perfectly crafted to enhance your gaming experience",
    desc: "The HAVIT HV-G92 Gamepad is meticulously engineered to provide seamless functionality and deliver unparalleled gaming adventures. With its state-of-the-art technology, this console offers a vast library of captivating games, guaranteeing endless entertainment for both casual and avid gamers alike. Not only does the HAVIT HV-G92 Gamepad excel in performance, but it also exudes sophistication. Its sleek exterior showcases a modern aesthetic that effortlessly complements any home entertainment setup. Whether placed in a living room or bedroom, this console adds a touch of elegance to your space. Furthermore, the HAVIT HV-G92 Gamepad is designed with durability in mind.",
    desc2: "Built to withstand the rigors of intense gaming sessions, it is constructed using premium materials that ensure its longevity. Rest assured that this console will accompany you on your gaming journey for years to come.",
    reviews: [
        {
            profile: user1,
            name: 'Harry Wilson Thomas',
            date: '20 June, 2023',
            ratings: 4.0,
            comment: "I bought it 3 weeks ago and now come back just to say “Awesome Product”. I really enjoy it. It was compatible with my Xbox."
        },
        {
            profile: user2,
            name: 'Ann Sarah',
            date: '11 July, 2023',
            ratings: 4.4,
            comment: "I bought it 3 weeks ago and now come back just to say “Awesome Product”. I really enjoy it. It was compatible with my Xbox."
        },
    ]
}

export const keyboardItem = {
    id: "flsh-00-2",
    category: "computers",
    tags: "Computers, AK",
    name: "AK-900 Wired Keyboard",
    seller: "AK",
    isNew: false,
    price: 6000,
    oldPrice: 12000,
    discount: 50,
    stock: 15,
    ratings: 4.1,
    ratingsCount: 75,
    img: keyboard,
    shipping: 1,
    quantity: 3,
    reviews: [
        {
            profile: user3,
            name: 'Albert K. Henry',
            date: '20 June, 2023',
            ratings: 4.0,
            comment: "I bought it 3 weeks ago and now come back just to say “Awesome Product”. I really enjoy it. It was compatible with my Xbox."
        },
        {
            profile: user4,
            name: 'Leo Kenneth',
            date: '11 July, 2023',
            ratings: 4.4,
            comment: "I bought it 3 weeks ago and now come back just to say “Awesome Product”. I really enjoy it. It was compatible with my Xbox."
        },
    ]
}

export const monitorItem = {
    id: "flsh-00-3",
    category: "computers",
    name: "LCD Gaming Monitor",
    tags: "HP, Computers",
    seller: "HP",
    isNew: true,
    price: 41496,
    oldPrice: 54600,
    discount: 24,
    stock: 8,
    ratings: 4.5,
    ratingsCount: 75,
    img: monitor,
    shipping: 2,
    quantity: 10
}