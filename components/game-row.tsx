'use client'

import { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { MovieCard } from '@/components/movie-card'
import { GameCard } from './game-card'



export function GameRow() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const [games, setGames] = useState([
    {
      "subCategoryId": "630560b2a0677a23c682ad77",
      "status": 1,
      "isMobile": true,
      "isNewGame": true,
      "order": 0,
      "threeD": true,
      "multiplayer": true,
      "orientation": "L",
      "scriptType": "url",
      "instruction": "",
      "adultLevel": 0,
      "_id": "6305622cf00e1a463fdb9b2d",
      "id": 6577,
      "name": "Desert Champion",
      "categoryId": "630560b2a0677a23c682ad5b",
      "slug": "desert-champion",
      "image": "https://slides.atmegame.com/slide/6577_slide.jpg",
      "url": "desert-champion",
      "description": "\u003Cp class=\"text_desc\"\u003E\nDesert Champion is a brand new online endless racing game where you have to compete to achieve the highest score while navigating the deadly desert terrain. It will be amazing to race against the time and dodge the other vehicles and various obstacles that you see along the track to claim the racing trophy and become the ultimate champion in the end. \u003C/p\u003E\n\u003Cp class=\"text_desc\"\u003E\nThe scorching desert landscape, colourful graphics and simple controls will help you to check out this free car racing game again and again. \n\u003C/p\u003E\n\u003Ch4\u003EKey Features: \u003C/h4\u003E\n\u003Cp class=\"text_desc\"\u003E\n\u003Cul class=\"gameDescUL\"\u003E\u003Cli\u003E\nYou as a player have to drive your car through the multiple challenging desert landscapes that are filled with various obstacles and pitfalls.\u003C/li\u003E\n\u003Cli\u003E\nMake sure to grab as much coins as you can that you see scattering along the track to improve your score and unlock power-ups.\u003C/li\u003E\n\u003Cli\u003EPut your racing and car handling skills to top the leaderboard as you have to strive to survive for as long as possible and set new high scores.\nIn this cool online car game, you have to control the assigned vehicle as it will speed through sandy dunes, rocky canyons, and perilous cliffs. Be alert as when you move along the way, you will encounter various obstacles such as cacti, boulders, and quicksand pits that will surely threaten to derail your progress. \u003C/li\u003E\u003C/ul\u003E\u003C/p\u003E\n\u003Cp class=\"text_desc\"\u003E\nDo not forget to improve the chances of survival and outlast your competitors after grabbing coins and power ups in this free highly engaging game. \n\u003C/p\u003E",
      "size": 640,
      "height": 420,
      "script": "https://games.atmegame.com/games/desert-champion/",
      "metaTitle": "Desert Champion, Car games - Play Online Free : Atmegame.com",
      "metaDesc": "Desert Champion that is the free online racing game offered for gaming enthusiast under racing is your best opportunity to improve your racing skills.",
      "metaKeyword": "Desert Champion, Racing, Car, Play Games, Play Online, 3D Games, Play Free Games, Play Online Free Games",
      "source": "",
      "likes": 20352,
      "dislikes": 9508,
      "ratings": null,
      "manualRating": 5,
      "highScore": 0,
      "totalPlayed": 857353,
      "ownGame": true,
      "addDate": "2022-08-23T12:00:00.000Z",
      "tags": [],
      "createdAt": "2022-08-23T23:26:36.472Z",
      "updatedAt": "2024-09-30T17:59:32.822Z",
      "__v": 0
    },
    {
      "subCategoryId": "630560b2a0677a23c682ad6f",
      "status": 1,
      "isMobile": true,
      "isNewGame": true,
      "order": 0,
      "threeD": false,
      "multiplayer": true,
      "orientation": "P",
      "scriptType": "url",
      "instruction": "",
      "adultLevel": 0,
      "_id": "6305622cf00e1a463fdb9b2e",
      "id": 6578,
      "name": "Hexa Match",
      "categoryId": "630560b2a0677a23c682ad5a",
      "slug": "hexa-match",
      "image": "https://slides.atmegame.com/slide/6578_slide.jpg",
      "url": "hexa-match",
      "description": "\u003Cp class=\"text_desc\"\u003E\n\nHexa Match is an addictive arcade style puzzle game where you have to match the combinations of three or more hexagons with the same number to make them disappear. Get yourself ready to challenge your puzzle-solving and mathematical skills and see how high you can score in this engaging brain-teasing challenge!\n\u003C/p\u003E\n\u003Ch4\u003E\nKey Features:\n\u003C/h4\u003E\n\u003Cp class=\"text_desc\"\u003E\n\u003Cul class=\"gameDescUL\"\u003E\u003Cli\u003E\nIt will be awesome to be a part of this engaging hexagonal puzzle gameplay that only requires strategic thinking and quick decision-making to get the job done.\u003C/li\u003E\u003Cli\u003E\nTake your time and create combos by matching multiple sets of hexagons in order to maximize your score.\u003C/li\u003E\n\u003Cli\u003EGet a chance to compete with players from all across the globe and showcase your puzzle-solving skills on the leaderboard.\nIn this cool online arcade game, you are highly advisable to apply your wit and logical skills to arrange the hexagons in a way that creates matches and clears them from the board. Hey! With each successful combination, you earn some points and get a chance to unlock new levels of difficulty. As you move forward throughout the game, the challenges become more complex, requiring careful planning and precision to succeed.\n\u003C/li\u003E\u003C/ul\u003E\u003C/p\u003E\n\u003Cp class=\"text_desc\"\u003E\n\nWith its simple yet addictive gameplay and vibrant graphics, Hexa Match offers hours of quality fun and entertainment for puzzle fans of all ages. Are you ready to put your puzzle-solving skills to the test and become a hexa match master?\n\u003C/p\u003E",
      "size": 640,
      "height": 420,
      "script": "https://games.atmegame.com/games/hexa-match/",
      "metaTitle": "Hexa Match, Puzzle games - Play Online Free : Atmegame.com",
      "metaDesc": "Hexa Match that is the free online arcade game offered for gaming enthusiast under arcade is your best opportunity to improve your arcade skills.",
      "metaKeyword": "Hexa Match, Puzzle games, Play Games, Play Online, Play Free Games, Play Online Free Games",
      "source": "",
      "likes": 18815,
      "dislikes": 10847,
      "ratings": null,
      "manualRating": 5,
      "highScore": 0,
      "totalPlayed": 564146,
      "ownGame": true,
      "addDate": "2022-08-23T12:00:00.000Z",
      "tags": [],
      "createdAt": "2022-08-23T23:26:36.472Z",
      "updatedAt": "2024-09-30T13:28:04.570Z",
      "__v": 0
    },
    {
      "subCategoryId": "630560b2a0677a23c682adc7",
      "status": 1,
      "isMobile": true,
      "isNewGame": true,
      "order": 0,
      "threeD": true,
      "multiplayer": true,
      "orientation": "P",
      "scriptType": "url",
      "instruction": "",
      "adultLevel": 0,
      "_id": "6305622cf00e1a463fdb9b31",
      "id": 6581,
      "name": "Magic Bubble Fox",
      "categoryId": "630560b2a0677a23c682ad5a",
      "slug": "magic-bubble-fox",
      "image": "https://slides.atmegame.com/slide/6581_slide.jpg",
      "url": "magic-bubble-fox",
      "description": "\u003Cp class=\"text_desc\"\u003E\nMagic Bubble Fox is an engaging bubble shooter in which you have to help a cute fox aim and match the identical bubbles to clear the screen for a high score. You will lose the game if the colored bubbles touch the bottom. \u003Cp\u003E\n\u003Cp class=\"text_desc\"\u003E\nTry to go as far as possible and do not forget to grab multiple special power-ups and boosters to add some more excitement and fun to the gameplay. \n\u003C/p\u003E\n\n\u003Ch4\u003E\n\nKey Features:\u003C/h4\u003E\n\u003Cp class=\"text_desc\"\u003E\n\u003Cul class=\"gameDescUL\"\u003E\u003Cli\u003E\n\u003Cb\u003EExciting Power-Ups:\u003C/b\u003E There is a huge variety of power-ups like explosive bombs and aiming tools to explore. Show some good moves to grab them and allow yourself to clear bubbles with ease.\u003C/li\u003E\n\u003Cli\u003E\u003Cb\u003E \nScore-Based Challenge:\u003C/b\u003E Test your skills across different difficulties that progressively increase when you move forward. Each time you feel to encounter with unique challenges, keeping the game fresh and engaging for hours on end.\u003C/li\u003E\n\u003Cli\u003E\n\u003Cb\u003EColorful Graphics:\u003C/b\u003E It will be amazing to get yourself into a visually stunning world that is filled with vibrant colors and eye-appealing animations. The colorful graphics play a crucial role in adding to the overall charm of the game, making it a real joy to explore.\n\u003C/li\u003E\u003C/ul\u003E\u003C/p\u003E\n\u003Cp class=\"text_desc\"\u003E\nIn this one of the best arcade games for boys and girls, you have to hold your finger tightly, aim as carefully as you can, and allow yourself to match the bubbles to clear the screen. Be alert as you move forward, get a chance to collect various special power-ups and boosters to make your play more interesting and challenging.\u003C/p\u003E\n\u003Cp class=\"text_desc\"\u003E \nWhether you consider yourself a casual gamer seeking a relaxing pastime or a seasoned player who looks for a new challenge, this cool online HTML5 game is sure to keep you entertained.\n\u003C/p\u003E",
      "size": 640,
      "height": 420,
      "script": "https://games.atmegame.com/games/magic-bubble-fox/",
      "metaTitle": "Magic Bubble Fox, Bubble Shooter games - Play Online Free : Atmegame.com",
      "metaDesc": "Magic Bubble Fox! that is the free online arcade game offered for gaming enthusiast under arcade is your best opportunity to improve your arcade skills.",
      "metaKeyword": "Magic Bubble Fox, Arcade games, Play Games, Games, Play Online, Play Free Games, Play Online Free Games",
      "source": "",
      "likes": 17418,
      "dislikes": 11837,
      "ratings": null,
      "manualRating": 5,
      "highScore": 0,
      "totalPlayed": 1048400,
      "ownGame": true,
      "addDate": "2022-08-23T12:00:00.000Z",
      "tags": [],
      "createdAt": "2022-08-23T23:26:36.472Z",
      "updatedAt": "2024-09-30T18:18:02.666Z",
      "__v": 0
    },
    {
      "subCategoryId": "630560b2a0677a23c682ad6f",
      "status": 1,
      "isMobile": true,
      "isNewGame": true,
      "order": 0,
      "threeD": true,
      "multiplayer": true,
      "orientation": "P",
      "scriptType": "url",
      "instruction": "",
      "adultLevel": 0,
      "_id": "6305622cf00e1a463fdb9b32",
      "id": 6582,
      "name": "Paint The House",
      "categoryId": "630560b2a0677a23c682ad5a",
      "slug": "paint-the-house",
      "image": "https://slides.atmegame.com/slide/6582_slide.jpg",
      "url": "paint-the-house",
      "description": "\n\u003Cp class=\"text_desc\"\u003E\nPaint The House is a free online arcade style city-building game where you have to unleash your creativity by painting houses using different colors. With a simple premise and addictive gameplay, this brand new puzzle game is perfect for those looking for a relaxing yet engaging gaming experience.\n\u003C/p\u003E\n\u003Ch4\u003E\nKey Features:\u003C/h4\u003E\n\n\u003Cp class=\"text_desc\"\u003E\n\u003Cul class=\"gameDescUL\"\u003E\u003Cli\u003E\u003Cb\u003E\nCustomizable City:\u003C/b\u003E Your primary job in this color game is to design and build your own cityscape by painting houses with the colors you like the most. Feel free to challenge your creativity and make your city truly unique with multiple vibrant hues and patterns.\n\u003C/li\u003E\u003Cli\u003E\u003Cb\u003E\n\nProgression System:\u003C/b\u003E Complete the tasks of painting houses to earn money, which will be further used in expanding and improving your city. You can also use it to purchase new brushes, which will help to finish your painting more efficiently in the advanced levels.\n\u003C/li\u003E\u003Cli\u003E\u003C/b\u003EEndless Creativity:\u003C/b\u003E The availability of a wide range of colors will allow you to explore endless design possibilities. Feel free to make as many color combinations and patterns as you can to prepare the stunning visuals and bring your city to life. \n\n\u003C/li\u003E\u003C/ul\u003E\u003C/p\u003E\n\n\u003Cp class=\"text_desc\"\u003E\nIn this cool online colorful game, you will get a chance to go on a wonderful journey of creativity and city-building. There are multiple things to do like paint houses, earning money, and watching your city grow from a blank canvas to a vibrant metropolis. \n\u003C/p\u003E\n\u003Cp class=\"text_desc\"\u003E\nHey! Endless creative possibilities and simple but addictive gameplay have something to keep you busy for long. So, what are you waiting for? Get your brush and gear up to paint your way to a beautiful yet bustling cityscape!\n\u003C/p\u003E",
      "size": 640,
      "height": 420,
      "script": "https://games.atmegame.com/games/paint-the-house/",
      "metaTitle": "Paint The House, Puzzle games - Play Online Free : Atmegame.com",
      "metaDesc": "Paint The House that is the free online arcade game offered for gaming enthusiast under arcade is your best opportunity to improve your arcade skills.",
      "metaKeyword": "Paint The House, Puzzle games, 3D Games, Play Games, Play Online, Play Free Games, Play Online Free Games",
      "source": "",
      "likes": 17386,
      "dislikes": 9540,
      "ratings": null,
      "manualRating": 5,
      "highScore": 0,
      "totalPlayed": 676733,
      "ownGame": true,
      "addDate": "2022-08-23T12:00:00.000Z",
      "tags": [],
      "createdAt": "2022-08-23T23:26:36.472Z",
      "updatedAt": "2024-09-30T12:10:00.524Z",
      "__v": 0
    },
    {
      "subCategoryId": null,
      "status": 1,
      "isMobile": true,
      "isNewGame": true,
      "order": 0,
      "threeD": true,
      "multiplayer": true,
      "orientation": "P",
      "scriptType": "url",
      "instruction": "",
      "adultLevel": 0,
      "_id": "6305622cf00e1a463fdb9b30",
      "id": 6580,
      "name": "Plug it!",
      "categoryId": "630560b2a0677a23c682ad5a",
      "slug": "plug-it",
      "image": "https://slides.atmegame.com/slide/6580_slide.jpg",
      "url": "plug-it",
      "description": "\n\u003Cp class=\"text_desc\"\u003E\nPlug It is an addictive puzzle game where you have to play the role of an electrician to complete the task. You as a player have to connect plugs to their corresponding sockets to finish each level. \u003C/p\u003E\n\u003Cp class=\"text_desc\"\u003E\nThe difficulties will keep increasing as you move forward throughout the game so get yourself ready to put your precision and strategic thinking power to the test. \u003C/p\u003E\n\u003Ch4\u003E\nKey Features:\u003C/h4\u003E\n\n\u003Cp class=\"text_desc\"\u003E\n\u003Cul class=\"gameDescUL\"\u003E\u003Cli\u003E\u003Cb\u003E\nEngaging puzzle gameplay:\u003C/b\u003E You have to focus on how to exercise your brainpower and logical skills as you have to navigate through a series of tricky levels. Each level offers unique obstacles to overcome.\u003C/li\u003E\u003Cli\u003E\n\u003Cb\u003EIncreasing difficulty: \u003C/b\u003EGear up to move forward through different types of challenging stages, right from straightforward setups to the extremely tricky configurations that can be solved only with the help of careful planning and foresight.\n\u003C/li\u003E\u003Cli\u003E\n\u003Cb\u003EIntuitive controls:\u003C/b\u003E It will be awesome to seamlessly navigate the game with easy-to-use controls, which will allow all of your skill levels dive right into the action.\n\u003C/li\u003E\u003C/ul\u003E\u003C/p\u003E\n\n\u003Cp class=\"text_desc\"\u003E\nIn this cute puzzle game, you are aimed at establishing the connections between plugs and sockets, while ensuring a seamless flow of energy throughout each level. The best part is that you will also be able to unlock new challenges, while pushing your problem-solving abilities to the limit with each successful match. \u003C/p\u003E\n\n\u003Cp class=\"text_desc\"\u003E\nWork your way to strategize your moves, handle obstacles confidently, and clever each level with as much precision as you can to earn the title of master electrician. Whether you are a puzzle fan or a casual gamer seeking an electrifying challenge, this free online puzzle game offers hours of engaging gameplay that will keep you plugged in for hours on end.\n\u003C/p\u003E",
      "size": 640,
      "height": 420,
      "script": "https://games.atmegame.com/games/plug-it/",
      "metaTitle": "Plug it!, Arcade games - Play Online Free : Atmegame.com",
      "metaDesc": "Plug it! that is the free online arcade game offered for gaming enthusiast under arcade is your best opportunity to improve your arcade skills.",
      "metaKeyword": "Plug it!, Arcade games, Play Games, 3D Games, Play Online, Play Free Games, Play Online Free Games",
      "source": "",
      "likes": 11036,
      "dislikes": 4633,
      "ratings": null,
      "manualRating": 5,
      "highScore": 0,
      "totalPlayed": 473554,
      "ownGame": true,
      "addDate": "2022-08-23T12:00:00.000Z",
      "tags": [],
      "createdAt": "2022-08-23T23:26:36.472Z",
      "updatedAt": "2024-09-30T09:12:04.972Z",
      "__v": 0
    },
    {
      "subCategoryId": null,
      "status": 1,
      "isMobile": true,
      "isNewGame": true,
      "order": 0,
      "threeD": true,
      "multiplayer": true,
      "orientation": "P",
      "scriptType": "url",
      "instruction": "",
      "adultLevel": 0,
      "_id": "6305622cf00e1a463fdb9b33",
      "id": 6583,
      "name": "Crossy Traffic",
      "categoryId": "630560b2a0677a23c682ad5c",
      "slug": "crossy-traffic",
      "image": "https://slides.atmegame.com/slide/6583_slide.jpg",
      "url": "crossy-traffic",
      "description": "\u003Cp class=\"text_desc\"\u003E\nCrossy Traffic is a cool online adventure game in which you have to guide a cute and tiny character to navigate through perilous roads. It requires quick reflexes to help your character survive for as long as possible for a high score. \u003C/p\u003E\n\u003Cp class=\"text_desc\"\u003E\nMake your tiny character jump timely to avoid the collision with any deadly obstacles. Its path is filled with rivers, railway tracks, tricky roads and hostile characters. \u003C/p\u003E\n\u003Ch4\u003E\nKey Features:\u003C/h4\u003E\n\u003Cp class=\"text_desc\"\u003E\n\u003Cul class=\"gameDescUL\"\u003E\u003Cli\u003E\u003Cb\u003EDynamic Challenges:\u003C/b\u003E Your character has to face off plenty of environments that are filled with new kinds of obstacles at every turn. Plan your move fast to navigate it through diverse settings like calm countryside roads and bustling cities. \u003C/li\u003E\n\u003Cli\u003E\n\u003Cb\u003EUnlockable Characters:\u003C/b\u003E Do not forget to grab coins that you see scattering everywhere to unlock a wide range of other cute characters. Each character features unique skills, adding variety and a kind of huge excitement to your gameplay experience.\u003C/li\u003E\n\u003Cli\u003E\u003Cb\u003EPower-Ups and Rewards: \u003C/b\u003EYour good performance will help to discover power-ups along the way. Make sure to earn rewards and all the best to achieve high score. \u003C/li\u003E\u003C/ul\u003E\u003C/p\u003E\n\u003Cp class=\"text_desc\"\u003E\nIn this one of the best adventure games for boys and girls, you have to put your strategic thinking and quick reflexes to the test. Difficulties will keep increasing as you move forward throughout the game. \u003C/p\u003E\n\u003Cp class=\"text_desc\"\u003E\nDo you think that you have dare to overcome the dangers and lead your friend to top the leaderboard? Good luck to guide it for as long as possible and create your best high score!\n\u003C/p\u003E",
      "size": 640,
      "height": 420,
      "script": "https://games.atmegame.com/games/crossy-traffic/",
      "metaTitle": "Crossy Traffic, Adventure games - Play Online Free : Atmegame.com",
      "metaDesc": "Crossy Traffic that is the free online adventure game offered for gaming enthusiast under adventure is your best opportunity to improve your adventure skills.",
      "metaKeyword": "Crossy Traffic, Adventure games, 3D Games, Play Games, Play Online, Play Free Games, Play Online Free Games",
      "source": "",
      "likes": 10588,
      "dislikes": 7085,
      "ratings": null,
      "manualRating": 5,
      "highScore": 0,
      "totalPlayed": 696589,
      "ownGame": true,
      "addDate": "2022-08-23T12:00:00.000Z",
      "tags": [],
      "createdAt": "2022-08-23T23:26:36.472Z",
      "updatedAt": "2024-09-30T07:41:52.266Z",
      "__v": 0
    },
    {
      "subCategoryId": null,
      "status": 1,
      "isMobile": true,
      "isNewGame": true,
      "order": 0,
      "threeD": false,
      "multiplayer": true,
      "orientation": "P",
      "scriptType": "url",
      "instruction": "",
      "adultLevel": 0,
      "_id": "6305622cf00e1a463fdb9b34",
      "id": 6584,
      "name": "Happy Popcorn",
      "categoryId": "630560b2a0677a23c682ad5c",
      "slug": "happy-popcorn",
      "image": "https://slides.atmegame.com/slide/6584_slide.jpg",
      "url": "happy-popcorn",
      "description": "\u003Cp class=\"text_desc\"\u003E\nHappy Popcorn is a cool and fun-filled adventure game in which you have to fill an empty bucket with popcorn as fast as you can. Make sure to complete your task without dropping the popcorn out of the bucket. The number of popcorn launcher will keep increasing as you move forward. \n\u003C/p\u003E\n\u003Ch4\u003E\nKey Features:\u003C/h4\u003E\n\u003Cul class=\"gameDescUL\"\u003E\u003Cli\u003E\n\u003Cb\u003EFast-Paced Gameplay:\u003C/b\u003E The fast-paced action await you here in this cool online puzzle game as you aim to fill the different sized bucket with popular before time goes away. Your accuracy and speed will be challenged while looking forward to complete all levels efficiently.\n\u003C/li\u003E\u003Cli\u003E\u003Cb\u003E \nChallenging Levels:\u003C/b\u003E As told you earlier that the levels of difficulties will keep increasing as you progress through the game. Each level comes up with a new set of obstacles, which will help keep you entertained regularly.\u003C/li\u003E\n\u003Cli\u003E\u003Cb\u003E \nPower-Ups and Bonuses:\u003C/b\u003E Completing a level will help you unlock a new launcher. Also get a chance to discover keys and other special power-ups and bonuses to complete your task fast.\u003C/li\u003E\n\u003C/ul\u003E\u003C/p\u003E\n\u003Cp class=\"text_desc\"\u003E \nIn this free adventure game, you also get an opportunity to earn extra points and rewards through which it becomes easier to complete levels fast with the maximum score possible. The addictive gameplay offers lots of fun and excitement while also relaxing your mind with the best possible way. \nSo, what are you waiting for? Join this delightful popcorn-popping adventure and allow yourself to take a break from the hustle and bustle of daily busy life! We are pretty confident that you have the guts to top the leaderboard and wear the crown of being an ultimate popcorn-popping champion. Good luck!\n\u003C/p\u003E",
      "size": 640,
      "height": 420,
      "script": "https://games.atmegame.com/games/happy-popcorn/",
      "metaTitle": "Happy Popcorn, Adventure games - Play Online Free : Atmegame.com",
      "metaDesc": "Happy Popcorn that is the free online adventure game offered for gaming enthusiast under adventure is your best opportunity to improve your adventure skills.",
      "metaKeyword": "Happy Popcorn, Adventure games, 3D Games, Play Games, Play Online, Play Free Games, Play Online Free Games",
      "source": "",
      "likes": 7246,
      "dislikes": 4178,
      "ratings": null,
      "manualRating": 5,
      "highScore": 0,
      "totalPlayed": 324261,
      "ownGame": true,
      "addDate": "2022-08-23T12:00:00.000Z",
      "tags": [],
      "createdAt": "2022-08-23T23:26:36.472Z",
      "updatedAt": "2024-09-30T15:04:12.013Z",
      "__v": 0
    },
    {
      "subCategoryId": null,
      "status": 1,
      "isMobile": true,
      "isNewGame": true,
      "order": 0,
      "threeD": false,
      "multiplayer": true,
      "orientation": "P",
      "scriptType": "url",
      "instruction": "",
      "adultLevel": 0,
      "_id": "6305622cf00e1a463fdb9b2f",
      "id": 6579,
      "name": "Jungle Boy",
      "categoryId": "630560b2a0677a23c682ad5c",
      "slug": "jungle-boy",
      "image": "https://slides.atmegame.com/slide/6579_slide.jpg",
      "url": "jungle-boy",
      "description": "\u003Cp class=\"text_desc\"\u003E\nJungle Boy is a brand new highly exciting adventure game where you have to help a young jungle explorer to navigate through challenging obstacles for the high score. Make sure to collect as many coins as you can along the way. \u003C/p\u003E\n\u003Cp class=\"text_desc\"\u003E\nGuide the cute jungle boy to run, jump, and overcome the tricky terrain to reach the end of each level.\u003C/p\u003E\n\u003Ch4\u003E\nKey Features:\u003C/h4\u003E\n\u003Cp class=\"text_desc\"\u003E\n\u003Cul class=\"gameDescUL\"\u003E\u003Cli\u003E\nA cute boy needs your help to navigate through a wide range of jungle landscapes, including raging rivers, lush forests, and mysterious caves.\n\u003C/li\u003E\n\u003Cli\u003E\nTry to challenge your jumping skills and sharp reflexes to dodge all the obstacles such as pits, spikes, and wild animals that you encounter on the way.\u003C/li\u003E\n\u003Cli\u003E\nGrab as much coins as you can that you see scattering throughout the jungle to increase your score and unlock power-ups to feel positive during your adventure.\u003C/li\u003E\n\u003Cli\u003E\nIn this engaging and platformer jumper game, you have to control the jungle boy as he wants to go on a thrilling journey through the wilderness. With each level you clear, the challenges become more complex, requiring precise timing and quick thinking to succeed. Along the way, you need to extra alert as many dangers await you in the path so it will be advisable to overcome them confidently. \n\u003Cli\u003E\u003C/ul\u003E\u003C/p\u003E\n\u003Cp class=\"text_desc\"\u003E\nWith its intuitive controls, vibrant graphics, and addictive gameplay, Jungle Boy can give you all those fun-filled and thrilling hours you seek for the long. So, are you ready to help this cute jungle boy to conquer the wild and complete his epic adventure?\n\u003C/p\u003E",
      "size": 640,
      "height": 420,
      "script": "https://games.atmegame.com/games/jungle-boy/",
      "metaTitle": "Jungle Boy, Adventure games - Play Online Free : Atmegame.com",
      "metaDesc": "Jungle Boy that is the free online adventure game offered for gaming enthusiast under adventure is your best opportunity to improve your adventure skills.",
      "metaKeyword": "Jungle Boy, Adventure games, Play Games, Play Online, Play Free Games, Play Online Free Games",
      "source": "",
      "likes": 5157,
      "dislikes": 2564,
      "ratings": null,
      "manualRating": 5,
      "highScore": 0,
      "totalPlayed": 562401,
      "ownGame": true,
      "addDate": "2022-08-23T12:00:00.000Z",
      "tags": [],
      "createdAt": "2022-08-23T23:26:36.472Z",
      "updatedAt": "2024-09-30T05:25:24.242Z",
      "__v": 0
    },
    {
      "subCategoryId": null,
      "status": 1,
      "isMobile": true,
      "isNewGame": false,
      "order": 0,
      "threeD": false,
      "multiplayer": false,
      "orientation": "P",
      "scriptType": "url",
      "instruction": "",
      "adultLevel": 0,
      "_id": "630560bba0677a23c682c440",
      "id": 6576,
      "name": "Brick Breaker Bash",
      "categoryId": "630560b2a0677a23c682ad5a",
      "slug": "brick-breaker-bash",
      "image": "https://slides.atmegame.com/slide/6576_slide.jpg",
      "url": "brick-breaker-bash",
      "description": "\u003Cp class=\"text_desc\"\u003E\nIt is time to show off your ultimate arkanoid skills and tell the world that you are an awesome brick\nbreaker! You have to use the white small and cute ball to draw a line and remove all of the bricks on\nthe board to clear each level in Break Breaker Bash! The ball starts flying to wherever you touched.\nYour objective in this fun HTML5 puzzle game is to break the bricks and never let them hit the\nbottom otherwise you will lose. Apply your logical brain to spot the best positions and angles to hit\nevery brick.\u003C/p\u003E\n\u003Cp class=\"text_desc\"\u003E\nYour ball takes the position at a place where it touches the bottom first time after shooting.\nComplexities will keep increasing as you progress in this level-based breaker arcade game. Target\nyour aim wisely so that it can hit as many bricks as possible with a single shot! Try to clear the screen\nwith as few hits as possible to complete your game with 3 stars and highest score possible!\nRemember each row takes one step downward whenever a hit completes.\u003C/p\u003E\n\u003Cp class=\"text_desc\"\u003E\nThis addictive arcade game includes 54 unique and challenging levels to play through. Your good\nperformance helps to earn enough coins to unlock some advanced puzzles. You will also have\nmultiple power-ups to use to make your challenge more interesting. Use the power 1 to destroy the\nlast row, the middle row &amp; column can be destroyed using the power 2. You can decrease the\nnumber of bricks up to 50% with power 3 and double the number of balls using the power 4. Good\nluck to remove all of the bricks in all of the levels to become a brick breaker pro!\u003C/p\u003E\n\n\u003Cp class=\"text_desc\"\u003E\n\n\u003Cb\u003E\nFeatures:\u003C/b\u003E\n\u003Cul class=\"gameDescUL\"\u003E\n\u003Cli\u003E\nFree to play online\u003C/li\u003E\n\u003Cli\u003EVarious types of balls\u003C/li\u003E\n\u003Cli\u003E54 levels to play through\u003C/li\u003E\n\u003Cli\u003EEasy to play, one touch-screen gameplay, designed for one handheld gameplay.\u003C/li\u003E\n\u003Cli\u003EPower-up system\u003C/li\u003E\n\u003Cli\u003EBuyable power-ups\u003C/li\u003E\n\u003C/ul\u003E\n\u003C/p\u003E\n\u003Cp class=\"text_desc\"\u003E\n\u003Cb\u003EHow to Play:\u003C/b\u003E\n\u003C/p\u003E\n\u003Cp class=\"text_desc\"\u003E\nUse your mouse to click the screen.\u003C/p\u003E",
      "size": 400,
      "height": 710,
      "script": "https://games.atmegame.com/games/brick-breaker-bash/",
      "metaTitle": "Brick Breaker Bash, puzzle - Play Online Free : Atmegame.com",
      "metaDesc": "Play the online free game Brick Breaker Bash at atmegame.com ! We have selected this games for best excitement and thrill in you!",
      "metaKeyword": "Brick Breaker Bash, Play Free Games, Play Online Free Games",
      "source": "",
      "xmlFile": "",
      "idealFor": "Man",
      "likes": 17769,
      "dislikes": 1655,
      "ratings": null,
      "manualRating": 5,
      "highScore": 0,
      "totalPlayed": 5165124,
      "ownGame": true,
      "addDate": "2021-04-11T23:25:00.000Z",
      "tags": [],
      "createdAt": "2022-08-23T23:20:31.766Z",
      "updatedAt": "2024-09-30T15:00:38.177Z",
      "__v": 0,
      "mobileControlKeys": "TAP ON SCREEN TO HIT THE BRICKS",
      "webControlKeys": "LEFT CLICK OF MOUSE TO HIT THE BRICKS"
    },
    {
      "subCategoryId": "630560b2a0677a23c682ad6c",
      "status": 1,
      "isMobile": true,
      "isNewGame": false,
      "order": 0,
      "threeD": false,
      "multiplayer": false,
      "orientation": "P",
      "scriptType": "url",
      "instruction": "",
      "adultLevel": 0,
      "_id": "630560bba0677a23c682c43f",
      "id": 6575,
      "name": "Holi Shooter",
      "categoryId": "630560b2a0677a23c682ad59",
      "slug": "holi-shooter",
      "image": "https://slides.atmegame.com/slide/6575_slide.jpg",
      "url": "holi-shooter",
      "description": "\u003Cp class=\"text_desc\"\u003E\nHoli Shooter is a free online shooting game designed on the theme of the popular color festival. Get your gaming device, play with a small colorful gun and enjoy the world’s biggest online color celebration. \u003C/p\u003E\n\u003Cp class=\"text_desc\"\u003E \nShoot your target one by one and clear all the balloons from the screen. Be alert as you have limited bullets so try not to miss your target as you will lose your game in case if you run out of your bullets. The difficulty level will be getting tough as you progress through the game.\u003C/p\u003E\n\u003Ch4\u003E\nKey Features:\u003C/h4\u003E\n\u003Cp class=\"text_desc\"\u003E\n\u003Cul class=\"gameDescUL\"\u003E\n\u003Cli\u003E\u003Cb\u003E\nColorful Action: \u003C/b\u003EIt is time to experience the joy of the Holi festival as you shoot colorful balloons with a variety of vibrant bullets.\u003C/li\u003E\n\u003Cli\u003E\u003Cb\u003E\nIncreasing Challenge:\u003C/b\u003E Get yourself ready to challenge your aim and strategy as the difficulty increases with each level you move on, keeping you engaged and challenged.\u003C/li\u003E\n\u003Cli\u003E\u003Cb\u003E\nEngaging Gameplay:\u003C/b\u003E With limited bullets available in your store, precision shooting is a key. Take your time as there are no time limits to clear each balloon while avoiding obstacles that could disrupt your progress.\u003C/li\u003E\u003C/ul\u003E\u003C/p\u003E\n\u003Cp class=\"text_desc\"\u003E\n\nDo not get bothered in case if you get bored of this shooting puzzle as we are full of multiple titles that can keep you busy all the day and night and give you the best of the gaming no matter which age or gender you come from. Check out our huge list of shooting games to know which type of titles suit your need the most! All the best, friends!\u003C/p\u003E\n",
      "size": 450,
      "height": 800,
      "script": "https://games.atmegame.com/games/holi-shooter/",
      "metaTitle": "Holi Shooter, Shooting - Play Online Free : Atmegame.com",
      "metaDesc": "Play the online free game Holi Shooter at atmegame.com ! We have selected this games for best excitement and thrill in you!",
      "metaKeyword": "Holi Shooter, Play Free Games, Play Online Free Games",
      "source": "",
      "xmlFile": "",
      "idealFor": "Man",
      "likes": 3222,
      "dislikes": 386,
      "ratings": null,
      "manualRating": 0,
      "highScore": 0,
      "totalPlayed": 719335,
      "ownGame": true,
      "addDate": "2021-03-27T20:37:00.000Z",
      "tags": [],
      "createdAt": "2022-08-23T23:20:31.766Z",
      "updatedAt": "2024-09-30T15:11:15.276Z",
      "__v": 0,
      "mobileControlKeys": "TAP ON SCREEN TO HIT THE BALLONS, AVOID RED BALOONS",
      "webControlKeys": "LEFT CLICK OF MOUSE TO HIT THE BALLONS, AVOID RED BALLOON"
    }
  ])

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return

    const scrollAmount = 400
    const newScrollLeft =
      direction === 'left'
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount

    scrollContainerRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' })
  }

  const handleScroll = () => {
    if (!scrollContainerRef.current) return

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
    setShowLeftArrow(scrollLeft > 0)
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
  }

  return (
    <div className="py-4 sm:py-6 px-4 sm:px-6">
      <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
        Play Online Games
      </h2>

      <div className="relative group">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-gradient-to-r from-background via-background to-transparent hover:from-primary/80 rounded-full transition-smooth opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft size={24} className="text-white" />
          </button>
        )}

        {/* Movie Container */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex gap-2 sm:gap-4 overflow-x-auto scrollbar-hide scroll-smooth py-2"
        >

          {games.map((game, index) => (
            <GameCard key={`${game.id}-${index}`} game={game} />
          ))}


        </div>

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-gradient-to-l from-background via-background to-transparent hover:from-primary/80 rounded-full transition-smooth opacity-0 group-hover:opacity-100"
          >
            <ChevronRight size={24} className="text-white" />
          </button>
        )}
      </div>
    </div>
  )
}
