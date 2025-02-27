import type { Category } from './types';

const baseAudioUrl = "https://api.dictionaryapi.dev/media/pronunciations/en";

export const categories: Category[] = [
  {
    id: "food",
    name: "Food & Drinks",
    flashcards: [
      {
        id: 1,
        word: "Apple",
        pronunciation: "/ˈæpəl/",
        imageUrl: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?auto=format&fit=crop&q=80&w=1000",
        audioUrl: `${baseAudioUrl}/apple-us.mp3`,
        meaning: "A round fruit with red, yellow, or green skin and white flesh"
      },
      {
        id: 2,
        word: "Banana",
        pronunciation: "/bəˈnænə/",
        imageUrl: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&q=80&w=1000",
        audioUrl: `${baseAudioUrl}/banana-us.mp3`,
        meaning: "A long curved fruit with yellow skin"
      },
      {
        id: 3,
        word: "Orange",
        pronunciation: "/ˈɔrɪndʒ/",
        imageUrl: "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&q=80&w=1000",
        audioUrl: `${baseAudioUrl}/orange-us.mp3`,
        meaning: "A round citrus fruit with orange skin and pulpy flesh"
      },
      {
        id: 4,
        word: "Milk",
        pronunciation: "/mɪlk/",
        imageUrl: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=1000",
        audioUrl: `${baseAudioUrl}/milk-us.mp3`,
        meaning: "A white liquid produced by mammals for feeding their young"
      },
      {
        id: 5,
        word: "Water",
        pronunciation: "/ˈwɔtər/",
        imageUrl: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&q=80&w=1000",
        audioUrl: `${baseAudioUrl}/water-us.mp3`,
        meaning: "A clear, colorless liquid essential for life"
      },
      {
        id: 6,
        word: "Bread",
        pronunciation: "/brɛd/",
        imageUrl: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=1000",
        audioUrl: `${baseAudioUrl}/bread-us.mp3`,
        meaning: "A basic food made from flour, water, and yeast"
      },
      {
        id: 7,
        word: "Cheese",
        pronunciation: "/tʃiz/",
        imageUrl: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&q=80&w=1000",
        audioUrl: `${baseAudioUrl}/cheese-us.mp3`,
        meaning: "A food made from milk, often aged and fermented"
      },
      {
        id: 8,
        word: "Chicken",
        pronunciation: "/ˈtʃɪkɪn/",
        imageUrl: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&q=80&w=1000",
        audioUrl: `${baseAudioUrl}/chicken-us.mp3`,
        meaning: "A common type of poultry used for meat and eggs"
      },
      {
        id: 9,
        word: "Fish",
        pronunciation: "/fɪʃ/",
        imageUrl: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&q=80&w=1000",
        audioUrl: `${baseAudioUrl}/fish-us.mp3`,
        meaning: "An aquatic animal often eaten as food"
      },
      {
        id: 10,
        word: "Rice",
        pronunciation: "/raɪs/",
        imageUrl: "https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&q=80&w=1000",
        audioUrl: `${baseAudioUrl}/rice-us.mp3`,
        meaning: "A grain that is a staple food in many cultures"
      }
    ]
  },
  {
    id: "animals",
    name: "Animals",
    flashcards: [
      {
        id: 11,
        word: "Cat",
        pronunciation: "/kæt/",
        imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=1000",
        audioUrl: `${baseAudioUrl}/cat-us.mp3`,
        meaning: "A small domesticated carnivorous mammal"
      },
      {
        id: 12,
        word: "Dog",
        pronunciation: "/dɔɡ/",
        imageUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=1000",
        audioUrl: `${baseAudioUrl}/dog-us.mp3`,
        meaning: "A domesticated carnivorous mammal"
      },
      {
        id: 13,
        word: "Bird",
        pronunciation: "/bɜrd/",
        imageUrl: "https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&q=80&w=1000",
        audioUrl: `${baseAudioUrl}/bird-us.mp3`,
        meaning: "A warm-blooded vertebrate with feathers"
      },
      {
        id: 14,
        word: "Fish",
        pronunciation: "/fɪʃ/",
        imageUrl: "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&q=80&w=1000",
        audioUrl: `${baseAudioUrl}/fish-us.mp3`,
        meaning: "An aquatic vertebrate with gills"
      },
      {
        id: 15,
        word: "Horse",
        pronunciation: "/hɔrs/",
        imageUrl: "https://images.unsplash.com/photo-1534773728080-33d31da27ae5?auto=format&fit=crop&q=80&w=1000",
        audioUrl: `${baseAudioUrl}/horse-us.mp3`,
        meaning: "A large domesticated mammal used for riding"
      },
      {
        id: 16,
        word: "Cow",
        pronunciation: "/kaʊ/",
        imageUrl: "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&q=80&w=1000",
        audioUrl: `${baseAudioUrl}/cow-us.mp3`,
        meaning: "A domesticated bovine animal"
      },
      {
        id: 17,
        word: "Sheep",
        pronunciation: "/ʃip/",
        imageUrl: "https://images.unsplash.com/photo-1484557985045-edf25e08da73?auto=format&fit=crop&q=80&w=1000",
        audioUrl: `${baseAudioUrl}/sheep-us.mp3`,
        meaning: "A domesticated ruminant animal"
      },
      {
        id: 18,
        word: "Pig",
        pronunciation: "/pɪɡ/",
        imageUrl: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80&w=1000",
        audioUrl: `${baseAudioUrl}/pig-us.mp3`,
        meaning: "A domesticated omnivorous mammal"
      },
      {
        id: 19,
        word: "Lion",
        pronunciation: "/ˈlaɪən/",
        imageUrl: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&q=80&w=1000",
        audioUrl: `${baseAudioUrl}/lion-us.mp3`,
        meaning: "A large wild cat native to Africa"
      },
      {
        id: 20,
        word: "Elephant",
        pronunciation: "/ˈɛləfənt/",
        imageUrl: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&q=80&w=1000",
        audioUrl: `${baseAudioUrl}/elephant-us.mp3`,
        meaning: "A very large mammal with a trunk"
      }
    ]
  },
  {
    id: "colors",
    name: "Colors",
    flashcards: [
      {
        id: 21,
        word: "Red",
        pronunciation: "/rɛd/",
        imageUrl: "https://images.unsplash.com/photo-1533427469406-ea99e51dc79f?auto=format&fit=crop&q=80&w=1000",
        audioUrl: `${baseAudioUrl}/red-us.mp3`,
        meaning: "The color of blood or rubies"
      },
      {
        id: 22,
        word: "Blue",
        pronunciation: "/blu/",
        imageUrl: "https://images.unsplash.com/photo-1579546929662-711aa81148cf?auto=format&fit=crop&q=80&w=1000",
        audioUrl: `${baseAudioUrl}/blue-us.mp3`,
        meaning: "The color of the sky or ocean"
      },
      {
        id: 23,
        word: "Yellow",
        pronunciation: "/ˈjɛloʊ/",
        imageUrl: "https://images.unsplash.com/photo-1497864149936-d3163f0c0f4b?auto=format&fit=crop&q=80&w=1000",
        audioUrl: `${baseAudioUrl}/yellow-us.mp3`,
        meaning: "The color of the sun or bananas"
      },
      {
        id: 24,
        word: "Green",
        pronunciation: "/ɡrin/",
        imageUrl: "https://images.unsplash.com/photo-1564419320461-6870880221ad?auto=format&fit=crop&q=80&w=1000",
        audioUrl: `${baseAudioUrl}/green-us.mp3`,
        meaning: "The color of grass or leaves"
      },
      {
        id: 25,
        word: "Black",
        pronunciation: "/blæk/",
        imageUrl: "https://images.unsplash.com/photo-1550684848-86a5d8727436?auto=format&fit=crop&q=80&w=1000",
        audioUrl: `${baseAudioUrl}/black-us.mp3`,
        meaning: "The darkest color, absence of light"
      },
      {
        id: 26,
        word: "White",
        pronunciation: "/waɪt/",
        imageUrl: "https://images.unsplash.com/photo-1533628635777-112b2239b1c7?auto=format&fit=crop&q=80&w=1000",
        audioUrl: `${baseAudioUrl}/white-us.mp3`,
        meaning: "The color of snow or milk"
      },
      {
        id: 27,
        word: "Pink",
        pronunciation: "/pɪŋk/",
        imageUrl: "https://images.unsplash.com/photo-1528459801416-a9241982fc8d?auto=format&fit=crop&q=80&w=1000",
        audioUrl: `${baseAudioUrl}/pink-us.mp3`,
        meaning: "A light reddish color"
      },
      {
        id: 28,
        word: "Purple",
        pronunciation: "/ˈpɜrpəl/",
        imageUrl: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=1000",
        audioUrl: `${baseAudioUrl}/purple-us.mp3`,
        meaning: "A color between red and blue"
      },
      {
        id: 29,
        word: "Brown",
        pronunciation: "/braʊn/",
        imageUrl: "https://images.unsplash.com/photo-1598359029359-0a9e13c99efe?auto=format&fit=crop&q=80&w=1000",
        audioUrl: `${baseAudioUrl}/brown-us.mp3`,
        meaning: "The color of earth or wood"
      },
      {
        id: 30,
        word: "Orange",
        pronunciation: "/ˈɔrɪndʒ/",
        imageUrl: "https://images.unsplash.com/photo-1507908708918-778587c9e563?auto=format&fit=crop&q=80&w=1000",
        audioUrl: `${baseAudioUrl}/orange-us.mp3`,
        meaning: "A color between red and yellow"
      }
    ]
  },
  {
    id: "objects",
    name: "Objects",
    flashcards: [
      {
        id: 31,
        word: "Ball",
        pronunciation: "/bɔl/",
        imageUrl: "https://images.unsplash.com/photo-1515548950066-0541e40e6f18?auto=format&fit=crop&q=80&w=1000",
        audioUrl: `${baseAudioUrl}/ball-us.mp3`,
        meaning: "A round object used in sports and games"
      },
      {
        id: 32,
        word: "Car",
        pronunciation: "/kɑr/",
        imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1000",
        audioUrl: `${baseAudioUrl}/car-us.mp3`,
        meaning: "A wheeled motor vehicle for transportation"
      },
      {
        id: 33,
        word: "Doll",
        pronunciation: "/dɑl/",
        imageUrl: "https://images.unsplash.com/photo-1613123645170-ecc2acd28f5b?auto=format&fit=crop&q=80&w=1000",
        audioUrl: `${baseAudioUrl}/doll-us.mp3`,
        meaning: "A toy in the form of a human figure"
      },
      {
        id: 34,
        word: "Book",
        pronunciation: "/bʊk/",
        imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=1000",
        audioUrl: `${baseAudioUrl}/book-us.mp3`,
        meaning: "A written or printed work of pages"
      },
      {
        id: 35,
        word: "Table",
        pronunciation: "/ˈteɪbəl/",
        imageUrl: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=1000",
        audioUrl: `${baseAudioUrl}/table-us.mp3`,
        meaning: "A piece of furniture with a flat top"
      },
      {
        id: 36,
        word: "Chair",
        pronunciation: "/tʃɛr/",
        imageUrl: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&q=80&w=1000",
        audioUrl: `${baseAudioUrl}/chair-us.mp3`,
        meaning: "A piece of furniture for sitting"
      },
      {
        id: 37,
        word: "Bed",
        pronunciation: "/bɛd/",
        imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=1000",
        audioUrl: `${baseAudioUrl}/bed-us.mp3`,
        meaning: "A piece of furniture for sleeping"
      },
      {
        id: 38,
        word: "House",
        pronunciation: "/haʊs/",
        imageUrl: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=1000",
        audioUrl: `${baseAudioUrl}/house-us.mp3`,
        meaning: "A building for human habitation"
      },
      {
        id: 39,
        word: "Tree",
        pronunciation: "/tri/",
        imageUrl: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&q=80&w=1000",
        audioUrl: `${baseAudioUrl}/tree-us.mp3`,
        meaning: "A tall plant with a trunk and branches"
      },
      {
        id: 40,
        word: "Flower",
        pronunciation: "/ˈflaʊər/",
        imageUrl: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=1000",
        audioUrl: `${baseAudioUrl}/flower-us.mp3`,
        meaning: "The seed-bearing part of a plant"
      }
    ]
  },
  {
    id: "feelings",
    name: "Feelings",
    flashcards: [
      {
        id: 41,
        word: "Happy",
        pronunciation: "/ˈhæpi/",
        imageUrl: "https://images.unsplash.com/photo-1531747056595-07f6cbbe10ad?auto=format&fit=crop&q=80&w=1000",
        audioUrl: `${baseAudioUrl}/happy-us.mp3`,
        meaning: "Feeling or showing pleasure and joy"
      },
      {
        id: 42,
        word: "Sad",
        pronunciation: "/sæd/",
        imageUrl: "https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?auto=format&fit=crop&q=80&w=1000",
        audioUrl: `${baseAudioUrl}/sad-us.mp3`,
        meaning: "Feeling or showing sorrow; unhappy"
      },
      {
        id: 43,
        word: "Angry",
        pronunciation: "/ˈæŋɡri/",
        imageUrl: "https://images.unsplash.com/photo-1594314813959-41bb5306d3e9?auto=format&fit=crop&q=80&w=1000",
        audioUrl: `${baseAudioUrl}/angry-us.mp3`,
        meaning: "Feeling or showing strong annoyance"
      },
      {
        id: 44,
        word: "Scared",
        pronunciation: "/skɛrd/",
        imageUrl: "https://images.unsplash.com/photo-1626557981101-aae6f84aa6ff?auto=format&fit=crop&q=80&w=1000",
        audioUrl: `${baseAudioUrl}/scared-us.mp3`,
        meaning: "Feeling frightened; afraid"
      },
      {
        id: 45,
        word: "Tired",
        pronunciation: "/taɪərd/",
        imageUrl: "https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?auto=format&fit=crop&q=80&w=1000",
        audioUrl: `${baseAudioUrl}/tired-us.mp3`,
        meaning: "In need of sleep or rest; weary"
      },
      {
        id: 46,
        word: "Excited",
        pronunciation: "/ɪkˈsaɪtɪd/",
        imageUrl: "https://images.unsplash.com/photo-1523301343968-6a6ebf63c672?auto=format&fit=crop&q=80&w=1000",
        audioUrl: `${baseAudioUrl}/excited-us.mp3`,
        meaning: "Very enthusiastic and eager"
      },
      {
        id: 47,
        word: "Hungry",
        pronunciation: "/ˈhʌŋɡri/",
        imageUrl: "https://images.unsplash.com/photo-1584316712724-f5d4b188fee2?auto=format&fit=crop&q=80&w=1000",
        audioUrl: `${baseAudioUrl}/hungry-us.mp3`,
        meaning: "Feeling or showing the need for food"
      },
      {
        id: 48,
        word: "Thirsty",
        pronunciation: "/ˈθɜrsti/",
        imageUrl: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&q=80&w=1000",
        audioUrl: `${baseAudioUrl}/thirsty-us.mp3`,
        meaning: "Feeling the need to drink"
      },
      {
        id: 49,
        word: "Sleepy",
        pronunciation: "/ˈslipi/",
        imageUrl: "https://images.unsplash.com/photo-1520450202524-87e5dd06a74c?auto=format&fit=crop&q=80&w=1000",
        audioUrl: `${baseAudioUrl}/sleepy-us.mp3`,
        meaning: "Ready or needing to sleep"
      },
      {
        id: 50,
        word: "Sick",
        pronunciation: "/sɪk/",
        imageUrl: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=80&w=1000",
        audioUrl: `${baseAudioUrl}/sick-us.mp3`,
        meaning: "Affected by physical illness"
      }
    ]
  }
];

// Export all flashcards in a flat array for backward compatibility
export const flashcards = categories.reduce<typeof categories[0]['flashcards']>(
  (all, category) => [...all, ...category.flashcards],
  []
);