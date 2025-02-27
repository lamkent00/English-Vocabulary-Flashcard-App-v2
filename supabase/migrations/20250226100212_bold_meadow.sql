/*
  # Flashcard Learning System Schema

  1. New Tables
    - `categories`
      - `id` (text, primary key) - Category identifier (e.g., 'food', 'animals')
      - `name` (text) - Display name of the category
    
    - `flashcards`
      - `id` (bigint, primary key)
      - `category_id` (text, foreign key) - References categories.id
      - `word` (text) - The word to learn
      - `pronunciation` (text) - Phonetic pronunciation
      - `image_url` (text) - URL to the illustration image
      - `audio_url` (text) - URL to the pronunciation audio
      - `meaning` (text) - Definition or meaning of the word
      - `created_at` (timestamptz) - Creation timestamp

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access (educational content)
*/

-- Create categories table
CREATE TABLE categories (
  id text PRIMARY KEY,
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create flashcards table
CREATE TABLE flashcards (
  id bigint PRIMARY KEY,
  category_id text REFERENCES categories(id) NOT NULL,
  word text NOT NULL,
  pronunciation text NOT NULL,
  image_url text NOT NULL,
  audio_url text NOT NULL,
  meaning text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE flashcards ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on categories" ON categories
  FOR SELECT TO public USING (true);

CREATE POLICY "Allow public read access on flashcards" ON flashcards
  FOR SELECT TO public USING (true);

-- Insert categories
INSERT INTO categories (id, name) VALUES
  ('food', 'Food & Drinks'),
  ('animals', 'Animals'),
  ('colors', 'Colors'),
  ('objects', 'Objects'),
  ('feelings', 'Feelings');

-- Insert flashcards
INSERT INTO flashcards (id, category_id, word, pronunciation, image_url, audio_url, meaning) VALUES
  -- Food & Drinks
  (1, 'food', 'Apple', '/ˈæpəl/', 'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?auto=format&fit=crop&q=80&w=1000', 'https://api.dictionaryapi.dev/media/pronunciations/en/apple-us.mp3', 'A round fruit with red, yellow, or green skin and white flesh'),
  (2, 'food', 'Banana', '/bəˈnænə/', 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&q=80&w=1000', 'https://api.dictionaryapi.dev/media/pronunciations/en/banana-us.mp3', 'A long curved fruit with yellow skin'),
  (3, 'food', 'Orange', '/ˈɔrɪndʒ/', 'https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&q=80&w=1000', 'https://api.dictionaryapi.dev/media/pronunciations/en/orange-us.mp3', 'A round citrus fruit with orange skin and pulpy flesh'),
  (4, 'food', 'Milk', '/mɪlk/', 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=1000', 'https://api.dictionaryapi.dev/media/pronunciations/en/milk-us.mp3', 'A white liquid produced by mammals for feeding their young'),
  (5, 'food', 'Water', '/ˈwɔtər/', 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&q=80&w=1000', 'https://api.dictionaryapi.dev/media/pronunciations/en/water-us.mp3', 'A clear, colorless liquid essential for life'),
  (6, 'food', 'Bread', '/brɛd/', 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=1000', 'https://api.dictionaryapi.dev/media/pronunciations/en/bread-us.mp3', 'A basic food made from flour, water, and yeast'),
  (7, 'food', 'Cheese', '/tʃiz/', 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&q=80&w=1000', 'https://api.dictionaryapi.dev/media/pronunciations/en/cheese-us.mp3', 'A food made from milk, often aged and fermented'),
  (8, 'food', 'Chicken', '/ˈtʃɪkɪn/', 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&q=80&w=1000', 'https://api.dictionaryapi.dev/media/pronunciations/en/chicken-us.mp3', 'A common type of poultry used for meat and eggs'),
  (9, 'food', 'Fish', '/fɪʃ/', 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&q=80&w=1000', 'https://api.dictionaryapi.dev/media/pronunciations/en/fish-us.mp3', 'An aquatic animal often eaten as food'),
  (10, 'food', 'Rice', '/raɪs/', 'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&q=80&w=1000', 'https://api.dictionaryapi.dev/media/pronunciations/en/rice-us.mp3', 'A grain that is a staple food in many cultures'),

  -- Animals
  (11, 'animals', 'Cat', '/kæt/', 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=1000', 'https://api.dictionaryapi.dev/media/pronunciations/en/cat-us.mp3', 'A small domesticated carnivorous mammal'),
  (12, 'animals', 'Dog', '/dɔɡ/', 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=1000', 'https://api.dictionaryapi.dev/media/pronunciations/en/dog-us.mp3', 'A domesticated carnivorous mammal'),
  (13, 'animals', 'Bird', '/bɜrd/', 'https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&q=80&w=1000', 'https://api.dictionaryapi.dev/media/pronunciations/en/bird-us.mp3', 'A warm-blooded vertebrate with feathers'),
  (14, 'animals', 'Fish', '/fɪʃ/', 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&q=80&w=1000', 'https://api.dictionaryapi.dev/media/pronunciations/en/fish-us.mp3', 'An aquatic vertebrate with gills'),
  (15, 'animals', 'Horse', '/hɔrs/', 'https://images.unsplash.com/photo-1534773728080-33d31da27ae5?auto=format&fit=crop&q=80&w=1000', 'https://api.dictionaryapi.dev/media/pronunciations/en/horse-us.mp3', 'A large domesticated mammal used for riding'),
  (16, 'animals', 'Cow', '/kaʊ/', 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&q=80&w=1000', 'https://api.dictionaryapi.dev/media/pronunciations/en/cow-us.mp3', 'A domesticated bovine animal'),
  (17, 'animals', 'Sheep', '/ʃip/', 'https://images.unsplash.com/photo-1484557985045-edf25e08da73?auto=format&fit=crop&q=80&w=1000', 'https://api.dictionaryapi.dev/media/pronunciations/en/sheep-us.mp3', 'A domesticated ruminant animal'),
  (18, 'animals', 'Pig', '/pɪɡ/', 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80&w=1000', 'https://api.dictionaryapi.dev/media/pronunciations/en/pig-us.mp3', 'A domesticated omnivorous mammal'),
  (19, 'animals', 'Lion', '/ˈlaɪən/', 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&q=80&w=1000', 'https://api.dictionaryapi.dev/media/pronunciations/en/lion-us.mp3', 'A large wild cat native to Africa'),
  (20, 'animals', 'Elephant', '/ˈɛləfənt/', 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&q=80&w=1000', 'https://api.dictionaryapi.dev/media/pronunciations/en/elephant-us.mp3', 'A very large mammal with a trunk'),

  -- Colors
  (21, 'colors', 'Red', '/rɛd/', 'https://images.unsplash.com/photo-1533427469406-ea99e51dc79f?auto=format&fit=crop&q=80&w=1000', 'https://api.dictionaryapi.dev/media/pronunciations/en/red-us.mp3', 'The color of blood or rubies'),
  (22, 'colors', 'Blue', '/blu/', 'https://images.unsplash.com/photo-1579546929662-711aa81148cf?auto=format&fit=crop&q=80&w=1000', 'https://api.dictionaryapi.dev/media/pronunciations/en/blue-us.mp3', 'The color of the sky or ocean'),
  (23, 'colors', 'Yellow', '/ˈjɛloʊ/', 'https://images.unsplash.com/photo-1497864149936-d3163f0c0f4b?auto=format&fit=crop&q=80&w=1000', 'https://api.dictionaryapi.dev/media/pronunciations/en/yellow-us.mp3', 'The color of the sun or bananas'),
  (24, 'colors', 'Green', '/ɡrin/', 'https://images.unsplash.com/photo-1564419320461-6870880221ad?auto=format&fit=crop&q=80&w=1000', 'https://api.dictionaryapi.dev/media/pronunciations/en/green-us.mp3', 'The color of grass or leaves'),
  (25, 'colors', 'Black', '/blæk/', 'https://images.unsplash.com/photo-1550684848-86a5d8727436?auto=format&fit=crop&q=80&w=1000', 'https://api.dictionaryapi.dev/media/pronunciations/en/black-us.mp3', 'The darkest color, absence of light'),
  (26, 'colors', 'White', '/waɪt/', 'https://images.unsplash.com/photo-1533628635777-112b2239b1c7?auto=format&fit=crop&q=80&w=1000', 'https://api.dictionaryapi.dev/media/pronunciations/en/white-us.mp3', 'The color of snow or milk'),
  (27, 'colors', 'Pink', '/pɪŋk/', 'https://images.unsplash.com/photo-1528459801416-a9241982fc8d?auto=format&fit=crop&q=80&w=1000', 'https://api.dictionaryapi.dev/media/pronunciations/en/pink-us.mp3', 'A light reddish color'),
  (28, 'colors', 'Purple', '/ˈpɜrpəl/', 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=1000', 'https://api.dictionaryapi.dev/media/pronunciations/en/purple-us.mp3', 'A color between red and blue'),
  (29, 'colors', 'Brown', '/braʊn/', 'https://images.unsplash.com/photo-1598359029359-0a9e13c99efe?auto=format&fit=crop&q=80&w=1000', 'https://api.dictionaryapi.dev/media/pronunciations/en/brown-us.mp3', 'The color of earth or wood'),
  (30, 'colors', 'Orange', '/ˈɔrɪndʒ/', 'https://images.unsplash.com/photo-1507908708918-778587c9e563?auto=format&fit=crop&q=80&w=1000', 'https://api.dictionaryapi.dev/media/pronunciations/en/orange-us.mp3', 'A color between red and yellow'),

  -- Objects
  (31, 'objects', 'Ball', '/bɔl/', 'https://images.unsplash.com/photo-1515548950066-0541e40e6f18?auto=format&fit=crop&q=80&w=1000', 'https://api.dictionaryapi.dev/media/pronunciations/en/ball-us.mp3', 'A round object used in sports and games'),
  (32, 'objects', 'Car', '/kɑr/', 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1000', 'https://api.dictionaryapi.dev/media/pronunciations/en/car-us.mp3', 'A wheeled motor vehicle for transportation'),
  (33, 'objects', 'Doll', '/dɑl/', 'https://images.unsplash.com/photo-1613123645170-ecc2acd28f5b?auto=format&fit=crop&q=80&w=1000', 'https://api.dictionaryapi.dev/media/pronunciations/en/doll-us.mp3', 'A toy in the form of a human figure'),
  (34, 'objects', 'Book', '/bʊk/', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=1000', 'https://api.dictionaryapi.dev/media/pronunciations/en/book-us.mp3', 'A written or printed work of pages'),
  (35, 'objects', 'Table', '/ˈteɪbəl/', 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=1000', 'https://api.dictionaryapi.dev/media/pronunciations/en/table-us.mp3', 'A piece of furniture with a flat top'),
  (36, 'objects', 'Chair', '/tʃɛr/', 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&q=80&w=1000', 'https://api.dictionaryapi.dev/media/pronunciations/en/chair-us.mp3', 'A piece of furniture for sitting'),
  (37, 'objects', 'Bed', '/bɛd/', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=1000', 'https://api.dictionaryapi.dev/media/pronunciations/en/bed-us.mp3', 'A piece of furniture for sleeping'),
  (38, 'objects', 'House', '/haʊs/', 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=1000', 'https://api.dictionaryapi.dev/media/pronunciations/en/house-us.mp3', 'A building for human habitation'),
  (39, 'objects', 'Tree', '/tri/', 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&q=80&w=1000', 'https://api.dictionaryapi.dev/media/pronunciations/en/tree-us.mp3', 'A tall plant with a trunk and branches'),
  (40, 'objects', 'Flower', '/ˈflaʊər/', 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=1000', 'https://api.dictionaryapi.dev/media/pronunciations/en/flower-us.mp3', 'The seed-bearing part of a plant'),

  -- Feelings
  (41, 'feelings', 'Happy', '/ˈhæpi/', 'https://images.unsplash.com/photo-1531747056595-07f6cbbe10ad?auto=format&fit=crop&q=80&w=1000', 'https://api.dictionaryapi.dev/media/pronunciations/en/happy-us.mp3', 'Feeling or showing pleasure and joy'),
  (42, 'feelings', 'Sad', '/sæd/', 'https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?auto=format&fit=crop&q=80&w=1000', 'https://api.dictionaryapi.dev/media/pronunciations/en/sad-us.mp3', 'Feeling or showing sorrow; unhappy'),
  (43, 'feelings', 'Angry', '/ˈæŋɡri/', 'https://images.unsplash.com/photo-1594314813959-41bb5306d3e9?auto=format&fit=crop&q=80&w=1000', 'https://api.dictionaryapi.dev/media/pronunciations/en/angry-us.mp3', 'Feeling or showing strong annoyance'),
  (44, 'feelings', 'Scared', '/skɛrd/', 'https://images.unsplash.com/photo-1626557981101-aae6f84aa6ff?auto=format&fit=crop&q=80&w=1000', 'https://api.dictionaryapi.dev/media/pronunciations/en/scared-us.mp3', 'Feeling frightened; afraid'),
  (45, 'feelings', 'Tired', '/taɪərd/', 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?auto=format&fit=crop&q=80&w=1000', 'https://api.dictionaryapi.dev/media/pronunciations/en/tired-us.mp3', 'In need of sleep or rest; weary'),
  (46, 'feelings', 'Excited', '/ɪkˈsaɪtɪd/', 'https://images.unsplash.com/photo-1523301343968-6a6ebf63c672?auto=format&fit=crop&q=80&w=1000', 'https://api.dictionaryapi.dev/media/pronunciations/en/excited-us.mp3', 'Very enthusiastic and eager'),
  (47, 'feelings', 'Hungry', '/ˈhʌŋɡri/', 'https://images.unsplash.com/photo-1584316712724-f5d4b188fee2?auto=format&fit=crop&q=80&w=1000', 'https://api.dictionaryapi.dev/media/pronunciations/en/hungry-us.mp3', 'Feeling or showing the need for food'),
  (48, 'feelings', 'Thirsty', '/ˈθɜrsti/', 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&q=80&w=1000', 'https://api.dictionaryapi.dev/media/pronunciations/en/thirsty-us.mp3', 'Feeling the need to drink'),
  (49, 'feelings', 'Sleepy', '/ˈslipi/', 'https://images.unsplash.com/photo-1520450202524-87e5dd06a74c?auto=format&fit=crop&q=80&w=1000', 'https://api.dictionaryapi.dev/media/pronunciations/en/sleepy-us.mp3', 'Ready or needing to sleep'),
  (50, 'feelings', 'Sick', '/sɪk/', 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=80&w=1000', 'https://api.dictionaryapi.dev/media/pronunciations/en/sick-us.mp3', 'Affected by physical illness');