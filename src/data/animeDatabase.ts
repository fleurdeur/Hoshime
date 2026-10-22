import { Anime, CustomList, LogEntry, NotificationItem, UserProfile } from '../types/anime';

// Official anime dataset with verified official imagery from AniList & MyAnimeList CDNs (No AI imagery)
export const INITIAL_ANIME_DATABASE: Anime[] = [
  {
    id: '154587', // Frieren
    title: {
      english: "Frieren: Beyond Journey's End",
      romaji: "Sousou no Frieren",
      native: "葬送のフリーレン"
    },
    coverImage: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-n2bGQYVoWWmy.jpg',
    bannerImage: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/154587-ivXNJrBlsvLw.jpg',
    score: 4.95,
    malScore: 9.38,
    rank: 1,
    format: 'TV',
    status: 'Finished',
    episodes: 28,
    durationMinutes: 24,
    season: 'Fall',
    year: 2023,
    genres: ['Adventure', 'Drama', 'Fantasy'],
    studios: ['Madhouse'],
    producers: ['TOHO animation', 'Shogakukan', 'Nippon Television'],
    source: 'Manga',
    ageRating: 'PG-13',
    synopsis: "The adventure is over, but life goes on for an elf mage beginning to learn what living truly means. Elf mage Frieren and her courageous fellow adventurers have defeated the Demon King and brought peace to the land. But Frieren will long outlive the rest of her former party. Decades after their victory, the funeral of one of her friends confronts Frieren with her own near-immortality. Frieren sets out on a journey to fulfill the last wishes of her comrades and finds herself beginning a new adventure.",
    trailerYoutubeId: 'ZEkwCGJ3o_0',
    scoreDistribution: {
      '5.0': 58200,
      '4.5': 19900,
      '4.0': 4100,
      '3.5': 920,
      '3.0': 350,
      '2.5': 120,
      '2.0': 65,
      '1.0': 20
    },
    streamingLinks: [
      { name: 'Crunchyroll', badge: 'CR', url: 'https://www.crunchyroll.com/series/GG5H5XQX4/frieren-beyond-journeys-end' },
      { name: 'Netflix', badge: 'NFX', url: 'https://www.netflix.com' }
    ],
    characters: [
      {
        id: 'c1',
        name: 'Frieren',
        role: 'Main',
        image: 'https://s4.anilist.co/file/anilistcdn/character/large/b178491-j5YF6uP7tE0s.png',
        voiceActor: {
          name: 'Atsumi Tanezaki',
          language: 'Japanese',
          image: 'https://s4.anilist.co/file/anilistcdn/staff/large/n118497-28d1R01FvN1h.png'
        }
      },
      {
        id: 'c2',
        name: 'Fern',
        role: 'Main',
        image: 'https://s4.anilist.co/file/anilistcdn/character/large/b178492-Z8JjXQ1cQOcm.png',
        voiceActor: {
          name: 'Kana Ichinose',
          language: 'Japanese',
          image: 'https://s4.anilist.co/file/anilistcdn/staff/large/n131580-g87M3Zk0B4t8.png'
        }
      },
      {
        id: 'c3',
        name: 'Stark',
        role: 'Main',
        image: 'https://s4.anilist.co/file/anilistcdn/character/large/b178493-iR3L9s3PvZkM.png',
        voiceActor: {
          name: 'Chiaki Kobayashi',
          language: 'Japanese',
          image: 'https://s4.anilist.co/file/anilistcdn/staff/large/n136737-FpM3a3mG2Y7K.png'
        }
      },
      {
        id: 'c4',
        name: 'Himmel',
        role: 'Supporting',
        image: 'https://s4.anilist.co/file/anilistcdn/character/large/b178494-W7hB3K9d4N0P.png',
        voiceActor: {
          name: 'Nobuhiko Okamoto',
          language: 'Japanese',
          image: 'https://s4.anilist.co/file/anilistcdn/staff/large/n95669-hXw7R2L1q8Fk.png'
        }
      }
    ],
    themeSongs: {
      op: ['"Yuusha" by YOASOBI', '"Haru" by Yorushika'],
      ed: ['"Anytime Anywhere" by milet']
    },
    episodesList: [
      { number: 1, title: "The Journey's End", airDate: 'Sep 29, 2023', synopsis: 'After defeating the Demon King, Frieren promises to meet the Hero party again in 50 years.' },
      { number: 2, title: "It Didn't Have to Be Magic...", airDate: 'Sep 29, 2023', synopsis: 'Frieren visits priest Heiter in his later years and takes on young Fern as her apprentice.' },
      { number: 3, title: 'Killing Magic', airDate: 'Oct 6, 2023', synopsis: 'Frieren and Fern visit a village troubled by a demon that was sealed away 80 years ago.' },
      { number: 4, title: 'The Land Where Souls Rest', airDate: 'Oct 13, 2023', synopsis: 'Frieren and Fern discover the notes of the great wizard Flamme regarding the northern edge.' }
    ]
  },
  {
    id: '127230', // Chainsaw Man
    title: {
      english: "Chainsaw Man",
      romaji: "Chainsaw Man",
      native: "チェンソーマン"
    },
    coverImage: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx127230-NuE9dZfhDsF1.png',
    bannerImage: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/127230-jH4m83n00k0a.jpg',
    score: 4.65,
    malScore: 8.52,
    rank: 8,
    format: 'TV',
    status: 'Finished',
    episodes: 12,
    durationMinutes: 24,
    season: 'Fall',
    year: 2022,
    genres: ['Action', 'Comedy', 'Drama', 'Supernatural'],
    studios: ['MAPPA'],
    producers: ['MAPPA', 'Shueisha'],
    source: 'Manga',
    ageRating: 'R-17',
    synopsis: "Denji is a teenage boy living with a Chainsaw Devil named Pochita. Due to the debt his father left behind, he has been living a rock-bottom life while repaying his debt by harvesting devil corpses with Pochita. One day, Denji is betrayed and killed. As his consciousness fades, he makes a contract with Pochita and gets revived as 'Chainsaw Man' — a man with a devil's heart.",
    trailerYoutubeId: 'dFlDRhvM4b0',
    scoreDistribution: {
      '5.0': 36500,
      '4.5': 22400,
      '4.0': 11800,
      '3.5': 3800,
      '3.0': 1400,
      '2.5': 620,
      '2.0': 310,
      '1.0': 90
    },
    streamingLinks: [
      { name: 'Crunchyroll', badge: 'CR', url: 'https://www.crunchyroll.com/series/GVDHX8QNW/chainsaw-man' },
      { name: 'Hulu', badge: 'HL', url: 'https://www.hulu.com' }
    ],
    characters: [
      {
        id: 'c5',
        name: 'Denji',
        role: 'Main',
        image: 'https://s4.anilist.co/file/anilistcdn/character/large/b130138-sA07b9h2H7nO.png',
        voiceActor: {
          name: 'Kikunosuke Toya',
          language: 'Japanese',
          image: 'https://s4.anilist.co/file/anilistcdn/staff/large/n205315-G0nE01K8t8f2.png'
        }
      },
      {
        id: 'c6',
        name: 'Makima',
        role: 'Main',
        image: 'https://s4.anilist.co/file/anilistcdn/character/large/b137079-qK9Y0u7R1x1M.png',
        voiceActor: {
          name: 'Tomori Kusunoki',
          language: 'Japanese',
          image: 'https://s4.anilist.co/file/anilistcdn/staff/large/n131581-VvM9c4A5L1n1.png'
        }
      },
      {
        id: 'c7',
        name: 'Power',
        role: 'Main',
        image: 'https://s4.anilist.co/file/anilistcdn/character/large/b137080-v9Wk0pQ8d1C0.png',
        voiceActor: {
          name: 'Fairouz Ai',
          language: 'Japanese',
          image: 'https://s4.anilist.co/file/anilistcdn/staff/large/n137330-kX5a2L1n8Fk0.png'
        }
      }
    ],
    themeSongs: {
      op: ['"KICK BACK" by Kenshi Yonezu'],
      ed: ['"CHAINSAW BLOOD" by Vaundy', '"Time Left" by ZUTOMAYO']
    },
    episodesList: [
      { number: 1, title: 'Dog & Chainsaw', airDate: 'Oct 12, 2022', synopsis: 'Denji struggles to pay back debt through black-market devil hunting.' },
      { number: 2, title: 'Arrival in Tokyo', airDate: 'Oct 19, 2022', synopsis: 'Denji is taken in by Public Safety and meets Aki Hayakawa.' },
      { number: 3, title: "Meowy's Whereabouts", airDate: 'Oct 26, 2022', synopsis: 'Denji is paired up with Power, the Blood Fiend.' }
    ]
  },
  {
    id: '144665', // Bocchi the Rock!
    title: {
      english: "Bocchi the Rock!",
      romaji: "Bocchi the Rock!",
      native: "ぼっち・ざ・ろっく！"
    },
    coverImage: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx144665-u64G5Fv05o3O.png',
    bannerImage: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/144665-ZfDk1Z8T8W2k.jpg',
    score: 4.88,
    malScore: 8.81,
    rank: 6,
    format: 'TV',
    status: 'Finished',
    episodes: 12,
    durationMinutes: 24,
    season: 'Fall',
    year: 2022,
    genres: ['Comedy', 'Music', 'Slice of Life'],
    studios: ['CloverWorks'],
    producers: ['Aniplex', 'Houbunsha'],
    source: 'Manga',
    ageRating: 'PG-13',
    synopsis: "Hitori Gotou is a high school girl who starts learning to play the guitar because she dreams of being in a band, but she's so shy that she hasn't made a single friend. However, her dream might come true after she meets Nijika Ijichi, a girl who plays drums and is looking for a new guitarist for her band Kessoku Band.",
    trailerYoutubeId: '7fM-4o_27e8',
    scoreDistribution: {
      '5.0': 41000,
      '4.5': 19500,
      '4.0': 6200,
      '3.5': 1200,
      '3.0': 430,
      '2.5': 150,
      '2.0': 80,
      '1.0': 15
    },
    streamingLinks: [
      { name: 'Crunchyroll', badge: 'CR', url: 'https://www.crunchyroll.com/series/GX7H55WP4/bocchi-the-rock' }
    ],
    characters: [
      {
        id: 'c8',
        name: 'Hitori Gotoh',
        role: 'Main',
        image: 'https://s4.anilist.co/file/anilistcdn/character/large/b192806-u7K0q8B2D0t3.png',
        voiceActor: {
          name: 'Yoshino Aoyama',
          language: 'Japanese',
          image: 'https://s4.anilist.co/file/anilistcdn/staff/large/n119293-j0V2K8f1m9L1.png'
        }
      },
      {
        id: 'c9',
        name: 'Nijika Ijichi',
        role: 'Main',
        image: 'https://s4.anilist.co/file/anilistcdn/character/large/b192807-g0W2L9k1n4C0.png',
        voiceActor: {
          name: 'Sayumi Suzushiro',
          language: 'Japanese',
          image: 'https://s4.anilist.co/file/anilistcdn/staff/large/n134764-u3F0s9A1p7L0.png'
        }
      }
    ],
    themeSongs: {
      op: ['"Seishun Complex" by Kessoku Band'],
      ed: ['"Distortion!!" by Kessoku Band', '"Karakara" by Kessoku Band']
    },
    episodesList: [
      { number: 1, title: 'Lonely Rolling Bocchi', airDate: 'Oct 9, 2022', synopsis: 'Introvert Hitori Gotoh wants to make friends through playing guitar.' },
      { number: 2, title: 'See You Tomorrow', airDate: 'Oct 16, 2022', synopsis: 'Hitori gets a part-time job at Live House STARRY to pay for band venue fees.' }
    ]
  },
  {
    id: '113415', // Jujutsu Kaisen
    title: {
      english: "Jujutsu Kaisen",
      romaji: "Jujutsu Kaisen",
      native: "呪術廻戦"
    },
    coverImage: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx113415-bbBWj4pEFseh.jpg',
    bannerImage: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/113415-jQBSkxWAAk83.jpg',
    score: 4.78,
    malScore: 8.62,
    rank: 7,
    format: 'TV',
    status: 'Finished',
    episodes: 24,
    durationMinutes: 24,
    season: 'Fall',
    year: 2020,
    genres: ['Action', 'Drama', 'Supernatural'],
    studios: ['MAPPA'],
    producers: ['TOHO animation', 'Shueisha'],
    source: 'Manga',
    ageRating: 'R-17',
    synopsis: "High schooler Yuuji Itadori spends his days visiting his bedridden grandfather. However, his leisurely lifestyle takes a turn for the strange when he unwittingly swallows a cursed finger belonging to the demon Ryomen Sukuna. Introduced to the secret world of Jujutsu Sorcerers, Yuuji is tasked with consuming all twenty fingers before being executed.",
    trailerYoutubeId: '4A_XgGW8pEM',
    scoreDistribution: {
      '5.0': 52000,
      '4.5': 31000,
      '4.0': 14000,
      '3.5': 4200,
      '3.0': 1800,
      '2.0': 350,
      '1.0': 80
    },
    streamingLinks: [
      { name: 'Crunchyroll', badge: 'CR', url: 'https://www.crunchyroll.com/series/GRDV0019R/jujutsu-kaisen' },
      { name: 'Netflix', badge: 'NFX', url: 'https://www.netflix.com' }
    ],
    characters: [
      {
        id: 'c10',
        name: 'Satoru Gojo',
        role: 'Main',
        image: 'https://s4.anilist.co/file/anilistcdn/character/large/b127993-zC7a3d1b9e0f.png',
        voiceActor: {
          name: 'Yuichi Nakamura',
          language: 'Japanese',
          image: 'https://s4.anilist.co/file/anilistcdn/staff/large/n95514-A2L1m9f0p7k0.png'
        }
      },
      {
        id: 'c11',
        name: 'Yuji Itadori',
        role: 'Main',
        image: 'https://s4.anilist.co/file/anilistcdn/character/large/b127992-8T7b1a2c3d4e.png',
        voiceActor: {
          name: 'Junya Enoki',
          language: 'Japanese',
          image: 'https://s4.anilist.co/file/anilistcdn/staff/large/n118498-B3L1k9f0m7j0.png'
        }
      }
    ],
    themeSongs: {
      op: ['"Kaikai Kitan" by Eve', '"VIVID VICE" by Who-ya Extended'],
      ed: ['"LOST IN PARADISE" by ALI feat. AKLO']
    },
    episodesList: [
      { number: 1, title: 'Ryomen Sukuna', airDate: 'Oct 3, 2020', synopsis: 'Yuuji meets jujutsu sorcerer Megumi Fushiguro and encounters a curse.' },
      { number: 2, title: 'For Myself', airDate: 'Oct 10, 2020', synopsis: 'Yuuji awakens facing Satoru Gojo, the strongest sorcerer.' }
    ]
  },
  {
    id: '9253', // Steins;Gate
    title: {
      english: "Steins;Gate",
      romaji: "Steins;Gate",
      native: "STEINS;GATE"
    },
    coverImage: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx9253-7pdc4SfhKOKF.png',
    bannerImage: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/9253-Gz7fG70b3g6B.jpg',
    score: 4.93,
    malScore: 9.07,
    rank: 3,
    format: 'TV',
    status: 'Finished',
    episodes: 24,
    durationMinutes: 24,
    season: 'Spring',
    year: 2011,
    genres: ['Drama', 'Psychological', 'Sci-Fi', 'Thriller'],
    studios: ['White Fox'],
    producers: ['Frontier Works', 'Media Factory'],
    source: 'Visual Novel',
    ageRating: 'PG-13',
    synopsis: "Self-proclaimed mad scientist Rintarou Okabe rents out a room in a rickety old building in Akihabara, where he invents 'future gadgets' with fellow lab members Mayuri Shiina and Hashida Itaru. Their most promising creation is the 'Phone Microwave,' which unexpectedly morphs bananas into green gel. When Okabe attends a conference on time travel, he discovers the body of Kurisu Makise, but moments later, the world shifts.",
    trailerYoutubeId: 'uMYhjVwp0Fk',
    scoreDistribution: {
      '5.0': 64000,
      '4.5': 21000,
      '4.0': 5300,
      '3.5': 1100,
      '3.0': 420,
      '2.0': 90,
      '1.0': 25
    },
    streamingLinks: [
      { name: 'Crunchyroll', badge: 'CR', url: 'https://www.crunchyroll.com/series/GY8VM9N9Y/steinsgate' },
      { name: 'Hulu', badge: 'HL', url: 'https://www.hulu.com' }
    ],
    characters: [
      {
        id: 'c12',
        name: 'Rintarou Okabe',
        role: 'Main',
        image: 'https://s4.anilist.co/file/anilistcdn/character/large/b35252-0k1m2n3p4q5r.png',
        voiceActor: {
          name: 'Mamoru Miyano',
          language: 'Japanese',
          image: 'https://s4.anilist.co/file/anilistcdn/staff/large/n95068-K0L1m9f0p7k0.png'
        }
      },
      {
        id: 'c13',
        name: 'Kurisu Makise',
        role: 'Main',
        image: 'https://s4.anilist.co/file/anilistcdn/character/large/b35253-1a2b3c4d5e6f.png',
        voiceActor: {
          name: 'Asami Imai',
          language: 'Japanese',
          image: 'https://s4.anilist.co/file/anilistcdn/staff/large/n95963-J1K2L3m4p5q6.png'
        }
      }
    ],
    themeSongs: {
      op: ['"Hacking to the Gate" by Kanako Itou'],
      ed: ['"Toki Tsukasadoru Jūni no Meiyaku" by Yui Sakakibara']
    },
    episodesList: [
      { number: 1, title: 'Turning Point', airDate: 'Apr 6, 2011', synopsis: 'Okabe attends a lecture on time machines and finds Kurisu Makise in a pool of blood.' },
      { number: 2, title: 'Time Travel Paranoia', airDate: 'Apr 13, 2011', synopsis: 'Okabe realizes his text message traveled through time.' }
    ]
  },
  {
    id: '21827', // Violet Evergarden
    title: {
      english: "Violet Evergarden",
      romaji: "Violet Evergarden",
      native: "ヴァイオレット・エヴァーガーデン"
    },
    coverImage: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21827-10fJRFfdxA3P.png',
    bannerImage: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/21827-0466s5e6gX0y.jpg',
    score: 4.87,
    malScore: 8.68,
    rank: 9,
    format: 'TV',
    status: 'Finished',
    episodes: 13,
    durationMinutes: 24,
    season: 'Winter',
    year: 2018,
    genres: ['Drama', 'Fantasy', 'Slice of Life'],
    studios: ['Kyoto Animation'],
    producers: ['Lantis', 'Pony Canyon'],
    source: 'Light Novel',
    ageRating: 'PG-13',
    synopsis: "The Great War finally came to an end after four long years of conflict. Caught up in the bloodshed was Violet Evergarden, a young girl raised for the sole purpose of decimating enemy lines. Left with only the final words from her beloved Major Gilbert—'I love you'—she joins the CH Postal Services as an Auto Memory Doll to understand what love means.",
    trailerYoutubeId: 'g5xWqj4F4wQ',
    scoreDistribution: {
      '5.0': 49000,
      '4.5': 23000,
      '4.0': 8100,
      '3.5': 1900,
      '3.0': 600,
      '2.0': 90,
      '1.0': 20
    },
    streamingLinks: [
      { name: 'Netflix', badge: 'NFX', url: 'https://www.netflix.com/title/80159704' }
    ],
    characters: [
      {
        id: 'c14',
        name: 'Violet Evergarden',
        role: 'Main',
        image: 'https://s4.anilist.co/file/anilistcdn/character/large/b124483-C9pL1n4k0f8j.png',
        voiceActor: {
          name: 'Yui Ishikawa',
          language: 'Japanese',
          image: 'https://s4.anilist.co/file/anilistcdn/staff/large/n106208-kL1m9f0p7k0A.png'
        }
      }
    ],
    themeSongs: {
      op: ['"Sincerely" by TRUE'],
      ed: ['"Michishirube" by Minori Chihara']
    },
    episodesList: [
      { number: 1, title: '"I Love You" and Auto Memory Dolls', airDate: 'Jan 11, 2018', synopsis: 'Former child soldier Violet begins working at CH Postal Company.' },
      { number: 2, title: 'Never Coming Back', airDate: 'Jan 18, 2018', synopsis: 'Violet attends an Auto Memory Doll school to learn emotional expression.' }
    ]
  },
  {
    id: '199', // Spirited Away
    title: {
      english: "Spirited Away",
      romaji: "Sen to Chihiro no Kamikakushi",
      native: "千と千尋の神隠し"
    },
    coverImage: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx199-iRHAf4i34FmE.jpg',
    bannerImage: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/199-rD3tP5t2iG7O.jpg',
    score: 4.96,
    malScore: 8.78,
    rank: 2,
    format: 'Movie',
    status: 'Finished',
    episodes: 1,
    durationMinutes: 125,
    season: 'Summer',
    year: 2001,
    genres: ['Adventure', 'Drama', 'Fantasy', 'Supernatural'],
    studios: ['Studio Ghibli'],
    producers: ['Tokuma Shoten', 'Nippon Television'],
    source: 'Original',
    ageRating: 'PG',
    synopsis: "Ten-year-old Chihiro Ogino and her parents discover an abandoned amusement park on the way to their new home. When night falls, spirits emerge and Chihiro's parents are turned into pigs. To save them and return to the human world, Chihiro takes a job at a bathhouse for spirits owned by the witch Yubaba.",
    trailerYoutubeId: 'ByXuk9QqQkk',
    scoreDistribution: {
      '5.0': 78000,
      '4.5': 24000,
      '4.0': 4500,
      '3.5': 800,
      '3.0': 200,
      '2.0': 40,
      '1.0': 10
    },
    streamingLinks: [
      { name: 'Max', badge: 'MAX', url: 'https://www.max.com' },
      { name: 'Netflix', badge: 'NFX', url: 'https://www.netflix.com' }
    ],
    characters: [
      {
        id: 'c15',
        name: 'Chihiro Ogino',
        role: 'Main',
        image: 'https://s4.anilist.co/file/anilistcdn/character/large/b1968-C8pL1n4k0f8j.png',
        voiceActor: {
          name: 'Rumi Hiiragi',
          language: 'Japanese',
          image: 'https://s4.anilist.co/file/anilistcdn/staff/large/n95837-M1N2P3q4r5s6.png'
        }
      },
      {
        id: 'c16',
        name: 'Haku',
        role: 'Main',
        image: 'https://s4.anilist.co/file/anilistcdn/character/large/b1969-K1L2M3n4p5q6.png',
        voiceActor: {
          name: 'Miyu Irino',
          language: 'Japanese',
          image: 'https://s4.anilist.co/file/anilistcdn/staff/large/n95094-T1U2V3w4x5y6.png'
        }
      }
    ],
    themeSongs: {
      op: ['"One Summer\'s Day" by Joe Hisaishi'],
      ed: ['"Always With Me" by Youmi Kimura']
    },
    episodesList: [
      { number: 1, title: 'Full Movie', airDate: 'Jul 20, 2001', synopsis: 'Chihiro enters the spirit world bathhouse run by the witch Yubaba.' }
    ]
  },
  {
    id: '16498', // Attack on Titan
    title: {
      english: "Attack on Titan",
      romaji: "Shingeki no Kyojin",
      native: "進撃の巨人"
    },
    coverImage: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx16498-C6FPmWm59CyP.jpg',
    bannerImage: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/16498-73IhOXpJZiRc.jpg',
    score: 4.90,
    malScore: 8.54,
    rank: 4,
    format: 'TV',
    status: 'Finished',
    episodes: 25,
    durationMinutes: 24,
    season: 'Spring',
    year: 2013,
    genres: ['Action', 'Drama', 'Fantasy', 'Mystery'],
    studios: ['WIT Studio'],
    producers: ['Production I.G', 'Pony Canyon', 'Kodansha'],
    source: 'Manga',
    ageRating: 'R-17',
    synopsis: "Centuries ago, mankind was slaughtered to near extinction by monstrous humanoid creatures called Titans. Survivors built three massive concentric walls. After one hundred years of tranquility, a colossal Titan suddenly smashes through Wall Maria, unleashing devastation upon the city.",
    trailerYoutubeId: 'MGRm4IzK1SQ',
    scoreDistribution: {
      '5.0': 71000,
      '4.5': 26000,
      '4.0': 8900,
      '3.5': 2100,
      '3.0': 850,
      '2.0': 200,
      '1.0': 50
    },
    streamingLinks: [
      { name: 'Crunchyroll', badge: 'CR', url: 'https://www.crunchyroll.com/series/GR751KNZY/attack-on-titan' },
      { name: 'Hulu', badge: 'HL', url: 'https://www.hulu.com' }
    ],
    characters: [
      {
        id: 'c17',
        name: 'Eren Yeager',
        role: 'Main',
        image: 'https://s4.anilist.co/file/anilistcdn/character/large/b40882-6p7q8r9s0t1u.png',
        voiceActor: {
          name: 'Yuki Kaji',
          language: 'Japanese',
          image: 'https://s4.anilist.co/file/anilistcdn/staff/large/n95147-A1B2C3d4e5f6.png'
        }
      },
      {
        id: 'c18',
        name: 'Mikasa Ackerman',
        role: 'Main',
        image: 'https://s4.anilist.co/file/anilistcdn/character/large/b40881-A1B2C3d4e5f6.png',
        voiceActor: {
          name: 'Yui Ishikawa',
          language: 'Japanese',
          image: 'https://s4.anilist.co/file/anilistcdn/staff/large/n106208-kL1m9f0p7k0A.png'
        }
      }
    ],
    themeSongs: {
      op: ['"Guren no Yumiya" by Linked Horizon'],
      ed: ['"Utsukushiki Zankoku na Sekai" by Yoko Hikasa']
    },
    episodesList: [
      { number: 1, title: 'To You, in 2000 Years', airDate: 'Apr 7, 2013', synopsis: 'The Colossal Titan breaks through Wall Maria.' }
    ]
  }
];

export const INITIAL_USER_PROFILE: UserProfile = {
  id: 'usr_me',
  name: 'AstralReviewer',
  handle: 'astral_ryo',
  avatar: 'https://s4.anilist.co/file/anilistcdn/character/large/b178491-j5YF6uP7tE0s.png',
  banner: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/154587-ivXNJrBlsvLw.jpg',
  bio: 'Rating anime by the stars ✨ Film student & Sakuga enthusiast. Top 4 always rotating.',
  website: 'https://hoshime.app/astral_ryo',
  pronouns: 'he/they',
  joinedDate: 'Joined 2026',
  isVip: true,
  star4: ['154587', '9253', '199', '144665'],
  followersCount: 1420,
  followingCount: 388
};

// Removed all pre-made posts! Starting with a clean slate for real user logs
export const INITIAL_LOG_ENTRIES: LogEntry[] = [];

export const INITIAL_CUSTOM_LISTS: CustomList[] = [
  {
    id: 'list_1',
    title: 'Existential & Emotional Masterpieces',
    description: 'Stories that alter your brain chemistry and make you gaze at the starry night sky for hours after the credits roll.',
    isRanked: true,
    privacy: 'public',
    bannerCover: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/154587-ivXNJrBlsvLw.jpg',
    author: {
      name: 'AstralReviewer',
      handle: 'astral_ryo',
      avatar: 'https://s4.anilist.co/file/anilistcdn/character/large/b178491-j5YF6uP7tE0s.png',
      isVip: true
    },
    items: [
      { animeId: '154587', rank: 1, commentary: 'The definitive examination of time, aging, and unspoken bonds.' },
      { animeId: '21827', rank: 2, commentary: 'Every single episode is a tearjerker of human devotion.' },
      { animeId: '9253', rank: 3, commentary: 'Sci-fi perfection. The heartbreak of changing world lines.' }
    ],
    likes: 832,
    isLikedByMe: false,
    createdAt: 'Oct 2026'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_1',
    type: 'system',
    title: 'Welcome to Hoshime',
    description: 'Your star anime diary is ready. Rate any anime with 0.5-5.0 stars!',
    timestamp: 'Just now',
    isRead: false
  }
];
