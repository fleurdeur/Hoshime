import { Anime, CustomList, LogEntry, NotificationItem, UserProfile } from '../types/anime';

// Official anime dataset with verified live official imagery from AniList
export const INITIAL_ANIME_DATABASE: Anime[] = [
  {
    "id": "154587",
    "title": {
      "english": "Frieren: Beyond Journey’s End",
      "romaji": "Sousou no Frieren",
      "native": "葬送のフリーレン"
    },
    "coverImage": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-qQTzQnEJJ3oB.jpg",
    "bannerImage": "https://s4.anilist.co/file/anilistcdn/media/anime/banner/154587-ivXNJ23SM1xB.jpg",
    "score": 4.55,
    "malScore": 9.1,
    "rank": 1,
    "format": "TV",
    "status": "Finished",
    "episodes": 28,
    "durationMinutes": 24,
    "season": "Fall",
    "year": 2023,
    "genres": [
      "Adventure",
      "Drama",
      "Fantasy"
    ],
    "studios": [
      "MADHOUSE"
    ],
    "producers": [
      "MADHOUSE"
    ],
    "source": "Manga",
    "ageRating": "PG-13",
    "synopsis": "The adventure is over but life goes on for an elf mage just beginning to learn what living is all about. Elf mage Frieren and her courageous fellow adventurers have defeated the Demon King and brought peace to the land. But Frieren will long outlive the rest of her former party. How will she come to understand what life means to the people around her? Decades after their victory, the funeral of one her friends confronts Frieren with her own near immortality. Frieren sets out to fulfill the last wishes of her comrades and finds herself beginning a new adventure…\n\n\n\n(Source: Crunchyroll)",
    "trailerYoutubeId": "tR8YH0G67Rk",
    "scoreDistribution": {
      "5.0": 18617,
      "4.5": 8462,
      "4.0": 4062,
      "3.5": 1692,
      "3.0": 677,
      "2.5": 236,
      "2.0": 67,
      "1.0": 33
    },
    "streamingLinks": [
      {
        "name": "Crunchyroll",
        "badge": "CR",
        "url": "https://www.crunchyroll.com"
      },
      {
        "name": "Netflix",
        "badge": "NFX",
        "url": "https://www.netflix.com"
      }
    ],
    "characters": [
      {
        "id": "176754",
        "name": "Frieren",
        "role": "Main",
        "image": "https://s4.anilist.co/file/anilistcdn/character/large/b176754-PCnpqIOkjhFk.png",
        "voiceActor": {
          "name": "Atsumi Tanezaki",
          "language": "Japanese",
          "image": "https://s4.anilist.co/file/anilistcdn/staff/large/n112215-kfABGD8W2YSJ.jpg"
        }
      },
      {
        "id": "183965",
        "name": "Fern",
        "role": "Main",
        "image": "https://s4.anilist.co/file/anilistcdn/character/large/b183965-uGFohBjlFoTp.png",
        "voiceActor": {
          "name": "Kana Ichinose",
          "language": "Japanese",
          "image": "https://s4.anilist.co/file/anilistcdn/staff/large/n124390-03LHel2XSFel.png"
        }
      },
      {
        "id": "184313",
        "name": "Stark",
        "role": "Main",
        "image": "https://s4.anilist.co/file/anilistcdn/character/large/b184313-CQl6GSt4RSny.jpg",
        "voiceActor": {
          "name": "Chiaki Kobayashi",
          "language": "Japanese",
          "image": "https://s4.anilist.co/file/anilistcdn/staff/large/n133507-oT1bd4Gax1Qg.jpg"
        }
      },
      {
        "id": "184310",
        "name": "Heiter",
        "role": "Supporting",
        "image": "https://s4.anilist.co/file/anilistcdn/character/large/b184310-tiXvrq4FINXP.jpg",
        "voiceActor": {
          "name": "Hiroki Touchi",
          "language": "Japanese",
          "image": "https://s4.anilist.co/file/anilistcdn/staff/large/n95236-nlMo4dnjdT8p.png"
        }
      }
    ],
    "themeSongs": {
      "op": [
        "Official Opening Theme"
      ],
      "ed": [
        "Official Ending Theme"
      ]
    },
    "episodesList": [
      {
        "number": 1,
        "title": "Episode 1",
        "airDate": "2023"
      },
      {
        "number": 2,
        "title": "Episode 2",
        "airDate": "2023"
      },
      {
        "number": 3,
        "title": "Episode 3",
        "airDate": "2023"
      },
      {
        "number": 4,
        "title": "Episode 4",
        "airDate": "2023"
      }
    ]
  },
  {
    "id": "127230",
    "title": {
      "english": "Chainsaw Man",
      "romaji": "Chainsaw Man",
      "native": "チェンソーマン"
    },
    "coverImage": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx127230-DdP4vAdssLoz.png",
    "bannerImage": "https://s4.anilist.co/file/anilistcdn/media/anime/banner/127230-o8IRwCGVr9KW.jpg",
    "score": 4.15,
    "malScore": 8.3,
    "rank": 2,
    "format": "TV",
    "status": "Finished",
    "episodes": 12,
    "durationMinutes": 25,
    "season": "Fall",
    "year": 2022,
    "genres": [
      "Action",
      "Drama",
      "Horror",
      "Supernatural"
    ],
    "studios": [
      "MAPPA"
    ],
    "producers": [
      "MAPPA"
    ],
    "source": "Manga",
    "ageRating": "PG-13",
    "synopsis": "Denji is a teenage boy living with a Chainsaw Devil named Pochita. Due to the debt his father left behind, he has been living a rock-bottom life while repaying his debt by harvesting devil corpses with Pochita.\n\n\nOne day, Denji is betrayed and killed. As his consciousness fades, he makes a contract with Pochita and gets revived as \"Chainsaw Man\" — a man with a devil's heart.\n\n\n\n(Source: Crunchyroll)",
    "trailerYoutubeId": "v4yLeNt-kCU",
    "scoreDistribution": {
      "5.0": 10867,
      "4.5": 7762,
      "4.0": 3726,
      "3.5": 1552,
      "3.0": 621,
      "2.5": 217,
      "2.0": 62,
      "1.0": 31
    },
    "streamingLinks": [
      {
        "name": "Crunchyroll",
        "badge": "CR",
        "url": "https://www.crunchyroll.com"
      },
      {
        "name": "Netflix",
        "badge": "NFX",
        "url": "https://www.netflix.com"
      }
    ],
    "characters": [
      {
        "id": "130102",
        "name": "Denji",
        "role": "Main",
        "image": "https://s4.anilist.co/file/anilistcdn/character/large/b130102-FO1VHNnEnLlB.png",
        "voiceActor": {
          "name": "Kikunosuke Toya",
          "language": "Japanese",
          "image": "https://s4.anilist.co/file/anilistcdn/staff/large/n284463-w0qcBQXvlz3Z.png"
        }
      },
      {
        "id": "137079",
        "name": "Power",
        "role": "Main",
        "image": "https://s4.anilist.co/file/anilistcdn/character/large/b137079-6yLEUYR3bmpr.png",
        "voiceActor": {
          "name": "Fairouz Ai",
          "language": "Japanese",
          "image": "https://s4.anilist.co/file/anilistcdn/staff/large/n133625-YpEgKD7flV2S.jpg"
        }
      },
      {
        "id": "137080",
        "name": "Makima",
        "role": "Main",
        "image": "https://s4.anilist.co/file/anilistcdn/character/large/b137080-UHcynYNjb5ZU.png",
        "voiceActor": {
          "name": "Tomori Kusunoki",
          "language": "Japanese",
          "image": "https://s4.anilist.co/file/anilistcdn/staff/large/n124923-SQtqIQeicb7f.png"
        }
      },
      {
        "id": "137081",
        "name": "Aki Hayakawa",
        "role": "Main",
        "image": "https://s4.anilist.co/file/anilistcdn/character/large/b137081-TSrUR3mUJL6r.png",
        "voiceActor": {
          "name": "Shougo Sakata",
          "language": "Japanese",
          "image": "https://s4.anilist.co/file/anilistcdn/staff/large/n158510-QDmd7dD9Rg89.jpg"
        }
      }
    ],
    "themeSongs": {
      "op": [
        "Official Opening Theme"
      ],
      "ed": [
        "Official Ending Theme"
      ]
    },
    "episodesList": [
      {
        "number": 1,
        "title": "Episode 1",
        "airDate": "2022"
      },
      {
        "number": 2,
        "title": "Episode 2",
        "airDate": "2022"
      },
      {
        "number": 3,
        "title": "Episode 3",
        "airDate": "2022"
      },
      {
        "number": 4,
        "title": "Episode 4",
        "airDate": "2022"
      }
    ]
  },
  {
    "id": "130003",
    "title": {
      "english": "BOCCHI THE ROCK!",
      "romaji": "Bocchi the Rock!",
      "native": "ぼっち・ざ・ろっく！"
    },
    "coverImage": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx130003-HTDmeL4RGeJ4.png",
    "bannerImage": "https://s4.anilist.co/file/anilistcdn/media/anime/banner/130003-5F90a7BtsPQN.jpg",
    "score": 4.35,
    "malScore": 8.7,
    "rank": 3,
    "format": "TV",
    "status": "Finished",
    "episodes": 12,
    "durationMinutes": 24,
    "season": "Fall",
    "year": 2022,
    "genres": [
      "Comedy",
      "Music",
      "Slice of Life"
    ],
    "studios": [
      "CloverWorks"
    ],
    "producers": [
      "CloverWorks"
    ],
    "source": "Manga",
    "ageRating": "PG-13",
    "synopsis": "Hitori Gotou, “Bocchi-chan,” is a girl who’s so introverted and shy around people that she’d always start her conversations with “Ah...”\n\n\n\nDuring her middle school years, she started playing the guitar, wanting to join a band because she thought it could be an opportunity for even someone shy like her to also shine. But because she had no friends, she ended up practicing guitar for six hours every day all by herself. After becoming a skilled guitar player, she uploaded videos of herself playing the guitar to the internet under the name “Guitar Hero” and fantasized about performing at her school’s cultural festival concert. But not only could she not find any bandmates, before she knew it, she was in high school and still wasn’t able to make a single friend!\n\n\n\nShe was really close to becoming a shut-in, but one day, Nijika Ijichi, the drummer in Kessoku Band, reached out to her. And because of that, her everyday life started to change little by little...\n\n\n\n(Source: Crunchyroll)",
    "trailerYoutubeId": "SyMMZF5zNW4",
    "scoreDistribution": {
      "5.0": 17847,
      "4.5": 8112,
      "4.0": 3894,
      "3.5": 1622,
      "3.0": 649,
      "2.5": 227,
      "2.0": 64,
      "1.0": 32
    },
    "streamingLinks": [
      {
        "name": "Crunchyroll",
        "badge": "CR",
        "url": "https://www.crunchyroll.com"
      },
      {
        "name": "Netflix",
        "badge": "NFX",
        "url": "https://www.netflix.com"
      }
    ],
    "characters": [
      {
        "id": "257562",
        "name": "Hitori Gotou",
        "role": "Main",
        "image": "https://s4.anilist.co/file/anilistcdn/character/large/b257562-Ru35NYPfsqhY.png",
        "voiceActor": {
          "name": "Yoshino Aoyama",
          "language": "Japanese",
          "image": "https://s4.anilist.co/file/anilistcdn/staff/large/n118475-19IqPJRpa08T.png"
        }
      },
      {
        "id": "261674",
        "name": "Nijika Ijichi",
        "role": "Main",
        "image": "https://s4.anilist.co/file/anilistcdn/character/large/b261674-a8tJYvtzqWgC.png",
        "voiceActor": {
          "name": "Sayumi Suzushiro",
          "language": "Japanese",
          "image": "https://s4.anilist.co/file/anilistcdn/staff/large/n126963-GnhNcLWFeKmy.png"
        }
      },
      {
        "id": "264529",
        "name": "Ryou Yamada",
        "role": "Main",
        "image": "https://s4.anilist.co/file/anilistcdn/character/large/b264529-BvEusZnJLD2Y.png",
        "voiceActor": {
          "name": "Saku Mizuno",
          "language": "Japanese",
          "image": "https://s4.anilist.co/file/anilistcdn/staff/large/n213951-EQGfRStCAJ2Q.jpg"
        }
      },
      {
        "id": "266041",
        "name": "Ikuyo Kita",
        "role": "Main",
        "image": "https://s4.anilist.co/file/anilistcdn/character/large/b266041-1HKgjJGP2MmM.png",
        "voiceActor": {
          "name": "Ikumi Hasegawa",
          "language": "Japanese",
          "image": "https://s4.anilist.co/file/anilistcdn/staff/large/n132768-r4FwpBpHnRtZ.png"
        }
      }
    ],
    "themeSongs": {
      "op": [
        "Official Opening Theme"
      ],
      "ed": [
        "Official Ending Theme"
      ]
    },
    "episodesList": [
      {
        "number": 1,
        "title": "Episode 1",
        "airDate": "2022"
      },
      {
        "number": 2,
        "title": "Episode 2",
        "airDate": "2022"
      },
      {
        "number": 3,
        "title": "Episode 3",
        "airDate": "2022"
      },
      {
        "number": 4,
        "title": "Episode 4",
        "airDate": "2022"
      }
    ]
  },
  {
    "id": "113415",
    "title": {
      "english": "JUJUTSU KAISEN",
      "romaji": "Jujutsu Kaisen",
      "native": "呪術廻戦"
    },
    "coverImage": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx113415-LHBAeoZDIsnF.jpg",
    "bannerImage": "https://s4.anilist.co/file/anilistcdn/media/anime/banner/113415-jQBSkxWAAk83.jpg",
    "score": 4.2,
    "malScore": 8.4,
    "rank": 4,
    "format": "TV",
    "status": "Finished",
    "episodes": 24,
    "durationMinutes": 24,
    "season": "Fall",
    "year": 2020,
    "genres": [
      "Action",
      "Drama",
      "Supernatural"
    ],
    "studios": [
      "MAPPA"
    ],
    "producers": [
      "MAPPA"
    ],
    "source": "Manga",
    "ageRating": "PG-13",
    "synopsis": "A boy fights... for \"the right death.\"\n\n\n\nHardship, regret, shame: the negative feelings that humans feel become Curses that lurk in our everyday lives. The Curses run rampant throughout the world, capable of leading people to terrible misfortune and even death. What's more, the Curses can only be exorcised by another Curse.\n\n\n\nItadori Yuji is a boy with tremendous physical strength, though he lives a completely ordinary high school life. One day, to save a friend who has been attacked by Curses, he eats the finger of the Double-Faced Specter, taking the Curse into his own soul. From then on, he shares one body with the Double-Faced Specter. Guided by the most powerful of sorcerers, Gojou Satoru, Itadori is admitted to the Tokyo Metropolitan Technical High School of Sorcery, an organization that fights the Curses... and thus begins the heroic tale of a boy who became a Curse to exorcise a Curse, a life from which he could never turn back.\n\n\n\n(Source: Crunchyroll)\n\n\n\nNote: The first episode received an early web premiere on September 19th, 2020. The regular TV broadcast started on October 3rd, 2020.",
    "trailerYoutubeId": "RIyb52EMx8c",
    "scoreDistribution": {
      "5.0": 10990,
      "4.5": 7850,
      "4.0": 3768,
      "3.5": 1570,
      "3.0": 628,
      "2.5": 219,
      "2.0": 62,
      "1.0": 31
    },
    "streamingLinks": [
      {
        "name": "Crunchyroll",
        "badge": "CR",
        "url": "https://www.crunchyroll.com"
      },
      {
        "name": "Netflix",
        "badge": "NFX",
        "url": "https://www.netflix.com"
      }
    ],
    "characters": [
      {
        "id": "126635",
        "name": "Megumi Fushiguro",
        "role": "Main",
        "image": "https://s4.anilist.co/file/anilistcdn/character/large/b126635-L0y3I92JSUkN.png",
        "voiceActor": {
          "name": "Yuuma Uchida",
          "language": "Japanese",
          "image": "https://s4.anilist.co/file/anilistcdn/staff/large/n119617-icFDk96OdV5k.png"
        }
      },
      {
        "id": "127212",
        "name": "Yuuji Itadori",
        "role": "Main",
        "image": "https://s4.anilist.co/file/anilistcdn/character/large/b127212-FVm2tD0erQ5B.png",
        "voiceActor": {
          "name": "Junya Enoki",
          "language": "Japanese",
          "image": "https://s4.anilist.co/file/anilistcdn/staff/large/n119319-yIrrUOUaJuSm.png"
        }
      },
      {
        "id": "127691",
        "name": "Satoru Gojou",
        "role": "Main",
        "image": "https://s4.anilist.co/file/anilistcdn/character/large/b127691-9zqh1xpIubn7.png",
        "voiceActor": {
          "name": "Yuuichi Nakamura",
          "language": "Japanese",
          "image": "https://s4.anilist.co/file/anilistcdn/staff/large/n95513-up9ZDuocHgRs.png"
        }
      },
      {
        "id": "133700",
        "name": "Nobara Kugisaki",
        "role": "Main",
        "image": "https://s4.anilist.co/file/anilistcdn/character/large/b133700-f6sOO3TcgLV6.png",
        "voiceActor": {
          "name": "Asami Seto",
          "language": "Japanese",
          "image": "https://s4.anilist.co/file/anilistcdn/staff/large/n106787-ojpoY7XEGYgc.jpg"
        }
      }
    ],
    "themeSongs": {
      "op": [
        "Official Opening Theme"
      ],
      "ed": [
        "Official Ending Theme"
      ]
    },
    "episodesList": [
      {
        "number": 1,
        "title": "Episode 1",
        "airDate": "2020"
      },
      {
        "number": 2,
        "title": "Episode 2",
        "airDate": "2020"
      },
      {
        "number": 3,
        "title": "Episode 3",
        "airDate": "2020"
      },
      {
        "number": 4,
        "title": "Episode 4",
        "airDate": "2020"
      }
    ]
  },
  {
    "id": "9253",
    "title": {
      "english": "Steins;Gate",
      "romaji": "Steins;Gate",
      "native": "シュタインズ・ゲート"
    },
    "coverImage": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx9253-tIUXF2gfU8Sg.jpg",
    "bannerImage": "https://s4.anilist.co/file/anilistcdn/media/anime/banner/n9253-JIhmKgBKsWUN.jpg",
    "score": 4.45,
    "malScore": 8.9,
    "rank": 5,
    "format": "TV",
    "status": "Finished",
    "episodes": 24,
    "durationMinutes": 24,
    "season": "Spring",
    "year": 2011,
    "genres": [
      "Drama",
      "Psychological",
      "Sci-Fi",
      "Thriller"
    ],
    "studios": [
      "WHITE FOX"
    ],
    "producers": [
      "WHITE FOX"
    ],
    "source": "Visual Novel",
    "ageRating": "PG-13",
    "synopsis": "Self-proclaimed mad scientist Okabe Rintarou lives in a small room in Akihabara, where he invents \"future gadgets\" with fellow lab members Shiina Mayuri, his air-headed childhood friend, and Hashida Itaru, an otaku hacker. The three pass the time by tinkering with their latest creation, a \"Phone Microwave\" that can be controlled through text messages. \n\n\n\nThe lab members soon face a string of mysterious incidents that lead to a game-changing discovery: the Phone Microwave can send emails to the past and thus alter history. Adapted from the critically acclaimed visual novel by 5pb. and Nitroplus, Steins;Gate takes Okabe to the depths of scientific theory and human despair as he faces the dire consequences of changing the past.",
    "trailerYoutubeId": "27OZc-ku6is",
    "scoreDistribution": {
      "5.0": 18232,
      "4.5": 8287,
      "4.0": 3978,
      "3.5": 1657,
      "3.0": 663,
      "2.5": 232,
      "2.0": 66,
      "1.0": 33
    },
    "streamingLinks": [
      {
        "name": "Crunchyroll",
        "badge": "CR",
        "url": "https://www.crunchyroll.com"
      },
      {
        "name": "Netflix",
        "badge": "NFX",
        "url": "https://www.netflix.com"
      }
    ],
    "characters": [
      {
        "id": "34470",
        "name": "Kurisu Makise",
        "role": "Main",
        "image": "https://s4.anilist.co/file/anilistcdn/character/large/b34470-Jw2LXZBL5R8i.png",
        "voiceActor": {
          "name": "Asami Imai",
          "language": "Japanese",
          "image": "https://s4.anilist.co/file/anilistcdn/staff/large/n103662-1gAPfy3TvPK8.png"
        }
      },
      {
        "id": "35252",
        "name": "Rintarou Okabe",
        "role": "Main",
        "image": "https://s4.anilist.co/file/anilistcdn/character/large/b35252-DY9TW6pusqeh.png",
        "voiceActor": {
          "name": "Mamoru Miyano",
          "language": "Japanese",
          "image": "https://s4.anilist.co/file/anilistcdn/staff/large/n95065-eyynywrhombR.png"
        }
      },
      {
        "id": "35253",
        "name": "Mayuri Shiina",
        "role": "Main",
        "image": "https://s4.anilist.co/file/anilistcdn/character/large/b35253-u6QVgLLyHq2W.png",
        "voiceActor": {
          "name": "Kana Hanazawa",
          "language": "Japanese",
          "image": "https://s4.anilist.co/file/anilistcdn/staff/large/n95185-x8ZYvtN7SegC.png"
        }
      },
      {
        "id": "35255",
        "name": "Suzuha Amane",
        "role": "Main",
        "image": "https://s4.anilist.co/file/anilistcdn/character/large/b35255-Ra9Aq5Kn9lYq.png",
        "voiceActor": {
          "name": "Yukari Tamura",
          "language": "Japanese",
          "image": "https://s4.anilist.co/file/anilistcdn/staff/large/n95027-Zm9onZDUN7ih.jpg"
        }
      }
    ],
    "themeSongs": {
      "op": [
        "Official Opening Theme"
      ],
      "ed": [
        "Official Ending Theme"
      ]
    },
    "episodesList": [
      {
        "number": 1,
        "title": "Episode 1",
        "airDate": "2011"
      },
      {
        "number": 2,
        "title": "Episode 2",
        "airDate": "2011"
      },
      {
        "number": 3,
        "title": "Episode 3",
        "airDate": "2011"
      },
      {
        "number": 4,
        "title": "Episode 4",
        "airDate": "2011"
      }
    ]
  },
  {
    "id": "21827",
    "title": {
      "english": "Violet Evergarden",
      "romaji": "Violet Evergarden",
      "native": "ヴァイオレット・エヴァーガーデン"
    },
    "coverImage": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21827-ubzq619ZA2E9.png",
    "bannerImage": "https://s4.anilist.co/file/anilistcdn/media/anime/banner/21827-ROucgYiiiSpR.jpg",
    "score": 4.25,
    "malScore": 8.5,
    "rank": 6,
    "format": "TV",
    "status": "Finished",
    "episodes": 13,
    "durationMinutes": 24,
    "season": "Winter",
    "year": 2018,
    "genres": [
      "Drama",
      "Fantasy",
      "Slice of Life"
    ],
    "studios": [
      "Kyoto Animation"
    ],
    "producers": [
      "Kyoto Animation"
    ],
    "source": "Light Novel",
    "ageRating": "PG-13",
    "synopsis": "A certain point in time, in the continent of Telesis. The great war which divided the continent into North and South has ended after four years, and the people are welcoming a new generation. Violet Evergarden, a young girl formerly known as “the weapon”, has left the battlefield to start a new life at CH Postal Service. There, she is deeply moved by the work of “Auto Memories Dolls”, who carry people's thoughts and convert them into words. Violet begins her journey as an Auto Memories Doll, and comes face to face with various people's emotions and differing shapes of love. There are words Violet heard on the battlefield, which she cannot forget. These words were given to her by someone she holds dear, more than anyone else. She does not yet know their meaning but she searches to find it.\n\n\n\n(Source: Anime News Network)",
    "trailerYoutubeId": "_grmduuECm4",
    "scoreDistribution": {
      "5.0": 17462,
      "4.5": 7937,
      "4.0": 3810,
      "3.5": 1587,
      "3.0": 635,
      "2.5": 222,
      "2.0": 63,
      "1.0": 31
    },
    "streamingLinks": [
      {
        "name": "Crunchyroll",
        "badge": "CR",
        "url": "https://www.crunchyroll.com"
      },
      {
        "name": "Netflix",
        "badge": "NFX",
        "url": "https://www.netflix.com"
      }
    ],
    "characters": [
      {
        "id": "90169",
        "name": "Violet Evergarden",
        "role": "Main",
        "image": "https://s4.anilist.co/file/anilistcdn/character/large/b90169-4wr1Zehnsac8.png",
        "voiceActor": {
          "name": "Yui Ishikawa",
          "language": "Japanese",
          "image": "https://s4.anilist.co/file/anilistcdn/staff/large/n100142-k6RP0HzXffUG.png"
        }
      },
      {
        "id": "124787",
        "name": "Cattleya Baudelaire",
        "role": "Supporting",
        "image": "https://s4.anilist.co/file/anilistcdn/character/large/b124787-1HuZGawvoejp.jpg",
        "voiceActor": {
          "name": "Aya Endou",
          "language": "Japanese",
          "image": "https://s4.anilist.co/file/anilistcdn/staff/large/n95054-USmUajnl3bnT.jpg"
        }
      },
      {
        "id": "124788",
        "name": "Benedict Blue",
        "role": "Supporting",
        "image": "https://s4.anilist.co/file/anilistcdn/character/large/b124788-upZ5vtGwndzt.jpg",
        "voiceActor": {
          "name": "Kouki Uchiyama",
          "language": "Japanese",
          "image": "https://s4.anilist.co/file/anilistcdn/staff/large/n96764-yJWGrhjanDJQ.png"
        }
      },
      {
        "id": "124789",
        "name": "Dietfried Bougainvillea",
        "role": "Supporting",
        "image": "https://s4.anilist.co/file/anilistcdn/character/large/b124789-DLp0QEJZeiQ8.png",
        "voiceActor": {
          "name": "Hidenobu Kiuchi",
          "language": "Japanese",
          "image": "https://s4.anilist.co/file/anilistcdn/staff/large/n95174-yTsadXRKchp7.png"
        }
      }
    ],
    "themeSongs": {
      "op": [
        "Official Opening Theme"
      ],
      "ed": [
        "Official Ending Theme"
      ]
    },
    "episodesList": [
      {
        "number": 1,
        "title": "Episode 1",
        "airDate": "2018"
      },
      {
        "number": 2,
        "title": "Episode 2",
        "airDate": "2018"
      },
      {
        "number": 3,
        "title": "Episode 3",
        "airDate": "2018"
      },
      {
        "number": 4,
        "title": "Episode 4",
        "airDate": "2018"
      }
    ]
  },
  {
    "id": "199",
    "title": {
      "english": "Spirited Away",
      "romaji": "Sen to Chihiro no Kamikakushi",
      "native": "千と千尋の神隠し"
    },
    "coverImage": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx199-sWefXJvXkDOb.jpg",
    "bannerImage": "https://s4.anilist.co/file/anilistcdn/media/anime/banner/199-Sm2RU5PSqw7T.jpg",
    "score": 4.3,
    "malScore": 8.6,
    "rank": 7,
    "format": "Movie",
    "status": "Finished",
    "episodes": 1,
    "durationMinutes": 125,
    "season": "Summer",
    "year": 2001,
    "genres": [
      "Adventure",
      "Drama",
      "Fantasy",
      "Supernatural"
    ],
    "studios": [
      "Studio Ghibli"
    ],
    "producers": [
      "Studio Ghibli"
    ],
    "source": "Original",
    "ageRating": "PG-13",
    "synopsis": "On the way to their new home, 10-year-old Chihiro Ogino's family stumbles upon a deserted theme park. Intrigued, the family investigates the park, though unbeknownst to them, it is secretly inhabited by spirits who sleep by day and appear at night. When Chihiro's mother and father eat food from a restaurant in the street, angry spirits turn them into pigs. Furthermore, a wide sea has appeared between the spirit world and the human one, trapping Chihiro, the sole human, in a land of spirits. Luckily for her though, a mysterious boy named Haku appears, claiming to know her from the past. Under his instructions, Chihiro secures a job in the bathhouse where Haku works. With only her courage and some new found friends to aid her, Chihiro embarks on a journey to turn her parents back to their original forms and return home.",
    "trailerYoutubeId": "ByXuk9QqQkk",
    "scoreDistribution": {
      "5.0": 17655,
      "4.5": 8025,
      "4.0": 3852,
      "3.5": 1605,
      "3.0": 642,
      "2.5": 224,
      "2.0": 64,
      "1.0": 32
    },
    "streamingLinks": [
      {
        "name": "Crunchyroll",
        "badge": "CR",
        "url": "https://www.crunchyroll.com"
      },
      {
        "name": "Netflix",
        "badge": "NFX",
        "url": "https://www.netflix.com"
      }
    ],
    "characters": [
      {
        "id": "384",
        "name": "Chihiro Ogino",
        "role": "Main",
        "image": "https://s4.anilist.co/file/anilistcdn/character/large/b384-AoWCsQyG0WI7.png",
        "voiceActor": {
          "name": "Rumi Hiiragi",
          "language": "Japanese",
          "image": "https://s4.anilist.co/file/anilistcdn/staff/large/n95772-ZfrpB9g3cspO.png"
        }
      },
      {
        "id": "385",
        "name": "Haku",
        "role": "Main",
        "image": "https://s4.anilist.co/file/anilistcdn/character/large/b385-pKGCy3oYWxRa.png",
        "voiceActor": {
          "name": "Miyu Irino",
          "language": "Japanese",
          "image": "https://s4.anilist.co/file/anilistcdn/staff/large/n95088-BHyqnkadBEqi.png"
        }
      },
      {
        "id": "4716",
        "name": "Yubaba",
        "role": "Supporting",
        "image": "https://s4.anilist.co/file/anilistcdn/character/large/b4716-8uiG2k2xQKvN.png",
        "voiceActor": {
          "name": "Mari Natsuki",
          "language": "Japanese",
          "image": "https://s4.anilist.co/file/anilistcdn/staff/large/n95946-bi8U3gyWQH3J.png"
        }
      },
      {
        "id": "5465",
        "name": "Rin",
        "role": "Supporting",
        "image": "https://s4.anilist.co/file/anilistcdn/character/large/b5465-ZWJpBoYKPbAY.png",
        "voiceActor": {
          "name": "Yumi Tamai",
          "language": "Japanese",
          "image": "https://s4.anilist.co/file/anilistcdn/staff/large/6205.jpg"
        }
      }
    ],
    "themeSongs": {
      "op": [
        "Official Opening Theme"
      ],
      "ed": [
        "Official Ending Theme"
      ]
    },
    "episodesList": [
      {
        "number": 1,
        "title": "Episode 1",
        "airDate": "2001"
      }
    ]
  },
  {
    "id": "16498",
    "title": {
      "english": "Attack on Titan",
      "romaji": "Shingeki no Kyojin",
      "native": "進撃の巨人"
    },
    "coverImage": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx16498-buvcRTBx4NSm.jpg",
    "bannerImage": "https://s4.anilist.co/file/anilistcdn/media/anime/banner/16498-8jpFCOcDmneX.jpg",
    "score": 4.25,
    "malScore": 8.5,
    "rank": 8,
    "format": "TV",
    "status": "Finished",
    "episodes": 25,
    "durationMinutes": 24,
    "season": "Spring",
    "year": 2013,
    "genres": [
      "Action",
      "Drama",
      "Fantasy",
      "Mystery"
    ],
    "studios": [
      "WIT STUDIO"
    ],
    "producers": [
      "WIT STUDIO"
    ],
    "source": "Manga",
    "ageRating": "PG-13",
    "synopsis": "Several hundred years ago, humans were nearly exterminated by titans. Titans are typically several stories tall, seem to have no intelligence, devour human beings and, worst of all, seem to do it for the pleasure rather than as a food source. A small percentage of humanity survived by walling themselves in a city protected by extremely high walls, even taller than the biggest of titans.\n\n\r\nFlash forward to the present and the city has not seen a titan in over 100 years. Teenage boy Eren and his foster sister Mikasa witness something horrific as the city walls are destroyed by a colossal titan that appears out of thin air. As the smaller titans flood the city, the two kids watch in horror as their mother is eaten alive. Eren vows that he will murder every single titan and take revenge for all of mankind.\n\n\r\n(Source: MangaHelpers)",
    "trailerYoutubeId": "LHtdKWJdif4\t",
    "scoreDistribution": {
      "5.0": 17462,
      "4.5": 7937,
      "4.0": 3810,
      "3.5": 1587,
      "3.0": 635,
      "2.5": 222,
      "2.0": 63,
      "1.0": 31
    },
    "streamingLinks": [
      {
        "name": "Crunchyroll",
        "badge": "CR",
        "url": "https://www.crunchyroll.com"
      },
      {
        "name": "Netflix",
        "badge": "NFX",
        "url": "https://www.netflix.com"
      }
    ],
    "characters": [
      {
        "id": "40881",
        "name": "Mikasa Ackerman",
        "role": "Main",
        "image": "https://s4.anilist.co/file/anilistcdn/character/large/b40881-F3gr1PkreDvj.png",
        "voiceActor": {
          "name": "Yui Ishikawa",
          "language": "Japanese",
          "image": "https://s4.anilist.co/file/anilistcdn/staff/large/n100142-k6RP0HzXffUG.png"
        }
      },
      {
        "id": "40882",
        "name": "Eren Yeager",
        "role": "Main",
        "image": "https://s4.anilist.co/file/anilistcdn/character/large/b40882-dsj7IP943WFF.jpg",
        "voiceActor": {
          "name": "Yuuki Kaji",
          "language": "Japanese",
          "image": "https://s4.anilist.co/file/anilistcdn/staff/large/n95672-T33YV7yCDKnL.png"
        }
      },
      {
        "id": "46494",
        "name": "Armin Arlert",
        "role": "Main",
        "image": "https://s4.anilist.co/file/anilistcdn/character/large/b46494-g7xYYuBtYPnO.png",
        "voiceActor": {
          "name": "Marina Inoue",
          "language": "Japanese",
          "image": "https://s4.anilist.co/file/anilistcdn/staff/large/n95158-OLhgs8zv5xsp.jpg"
        }
      },
      {
        "id": "45627",
        "name": "Levi",
        "role": "Supporting",
        "image": "https://s4.anilist.co/file/anilistcdn/character/large/b45627-CR68RyZmddGG.png",
        "voiceActor": {
          "name": "Hiroshi Kamiya",
          "language": "Japanese",
          "image": "https://s4.anilist.co/file/anilistcdn/staff/large/n95118-oOElrn1aSaiC.png"
        }
      }
    ],
    "themeSongs": {
      "op": [
        "Official Opening Theme"
      ],
      "ed": [
        "Official Ending Theme"
      ]
    },
    "episodesList": [
      {
        "number": 1,
        "title": "Episode 1",
        "airDate": "2013"
      },
      {
        "number": 2,
        "title": "Episode 2",
        "airDate": "2013"
      },
      {
        "number": 3,
        "title": "Episode 3",
        "airDate": "2013"
      },
      {
        "number": 4,
        "title": "Episode 4",
        "airDate": "2013"
      }
    ]
  }
];

export const INITIAL_USER_PROFILE: UserProfile = {
  id: 'usr_me',
  name: 'Anime Critic',
  handle: 'anime_critic',
  avatar: 'https://s4.anilist.co/file/anilistcdn/character/large/b178491-j5YF6uP7tE0s.png',
  banner: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/154587-ivXNJ23SM1xB.jpg',
  bio: '',
  website: '',
  pronouns: '',
  joinedDate: 'Joined 2026',
  isVip: false,
  star4: [],
  followersCount: 0,
  followingCount: 0
};

// Clean fresh start: no premade logs, lists, or accounts
export const INITIAL_LOG_ENTRIES: LogEntry[] = [];

export const INITIAL_CUSTOM_LISTS: CustomList[] = [];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_welcome',
    type: 'system',
    title: 'Welcome to Hoshime',
    description: 'Your anime star diary is ready. Search titles via live API, rate anime with 0.5-5.0 stars, and pin your Top 3 favorites!',
    timestamp: 'Just now',
    isRead: false
  }
];
