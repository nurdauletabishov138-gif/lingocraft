import { ClassGrade, VideoLesson, Testimonial, FaqItem, QuizQuestion, Lesson } from "./types";

export const classGradesData: ClassGrade[] = [
  {
    id: "class-10",
    title: "Grade 10",
    description: "English language and linguacreative interactive worksheets.",
    iconName: "school",
    lessons: [
      {
        id: "class-10-extra-1",
        title: "Eating Out! (Classic)",
        icon: "Soup",
        description: "An Interactive Worksheet for Developing Linguacreative Competence on Dining.",
        keyTakeaway: "Combine words into blends, think about dining idioms, and practice restaurant dialogs with connectors.",
        quickQuiz: {
          question: "Which of the following is a correct blend for Pizza + Cake?",
          options: [
            "Pizcake",
            "Cakepiz",
            "Pizzac",
            "Cakizza"
          ],
          answerIndex: 0,
          explanation: "Pizcake is a perfect blend representing a hybrid dessert-pizza!"
        }
      },
      {
        id: "class-10-extra-2",
        title: "Eating Out! (Modern)",
        icon: "Utensils",
        description: "Redesigned modern worksheet about dining, food critic dialogs, and recipes.",
        keyTakeaway: "Practice using although, because, so that, not only... but also to build compound restaurant descriptions.",
        quickQuiz: {
          question: "Fill in the blank: I ordered the spicy soup _____ I love fiery adventure.",
          options: [
            "although",
            "because",
            "so that",
            "but also"
          ],
          answerIndex: 1,
          explanation: "'because' is used to introduce the reason for ordering the spicy soup."
        }
      },
      {
        id: "class-10-extra-3",
        title: "Healthy Bodies",
        icon: "Activity",
        description: "Interactive worksheet about health idioms, body metaphors, and poster slogans.",
        keyTakeaway: "Use personification and body metaphors to make your descriptions alive and vivid.",
        quickQuiz: {
          question: "Which expression is a body metaphor for feeling very fit?",
          options: [
            "To catch a cold",
            "To sweat like a pig",
            "To be on the mend",
            "Fit as a fiddle"
          ],
          answerIndex: 3,
          explanation: "'Fit as a fiddle' means to be in extremely good health or physical condition."
        }
      },
      {
        id: "class-10-extra-4",
        title: "Getting Around Town!",
        icon: "Car",
        description: "Explore city routes, blend vocabulary to invent modern eco-vehicles.",
        keyTakeaway: "Linguacreative blends like 'SkateBus' or 'GlideCycle' describe future-proof green town transportation.",
        quickQuiz: {
          question: "Which blend represents a hybrid transport of bus and taxi?",
          options: [
            "Buxi",
            "Taxbus",
            "Both A and B are correct blends",
            "None of the above"
          ],
          answerIndex: 2,
          explanation: "Both 'Buxi' and 'Taxbus' are creative ways to blend taxi and bus!"
        }
      },
      {
        id: "class-10-extra-5",
        title: "Mysteries in Nature",
        icon: "Trees",
        description: "Nature, Legends, and Creative Role-Play Sheet about environmental phenomena.",
        keyTakeaway: "Describe nature with active verbs (e.g. 'the forest groaned', 'the fog crept') to use personification.",
        quickQuiz: {
          question: "Which of the following sentences uses personification?",
          options: [
            "The mountain is very high.",
            "The dark forest seemed to whisper its secrets.",
            "The lights in the sky are green.",
            "The ocean is deep and dark."
          ],
          answerIndex: 1,
          explanation: "Giving the forest the human action of 'whispering secrets' is a classic example of personification."
        }
      },
      {
        id: "class-10-extra-6",
        title: "Amazing Animals",
        icon: "PawPrint",
        description: "Learn animal idioms, compile animal science compound words, and invent new creatures.",
        keyTakeaway: "Create compound science words like cold-blooded or waterproof by joining nouns and adjectives.",
        quickQuiz: {
          question: "What does the idiom 'To let the cat out of the bag' mean?",
          options: [
            "To free a pet from its cage",
            "To accidentally reveal a secret",
            "To buy a new bag",
            "To make a loud noise"
          ],
          answerIndex: 1,
          explanation: "To let the cat out of the bag is an English idiom that means to leak or reveal a secret."
        }
      },
      {
        id: "class-10-extra-7",
        title: "What Are You Watching?",
        icon: "Tv",
        description: "Explore screen idioms, build media compound words, and pitch your own TV show.",
        keyTakeaway: "Pitch shows using catchy titles, clear genre mixes, and strong TV guide slogans.",
        quickQuiz: {
          question: "What does 'binge-watch' mean in modern media?",
          options: [
            "To watch only one episode a week",
            "To watch multiple episodes of a series in rapid succession",
            "To turn off the television",
            "To repair a broken TV screen"
          ],
          answerIndex: 1,
          explanation: "Binge-watching is the practice of watching multiple episodes of a television program in rapid succession."
        }
      },
      {
        id: "class-10-extra-8",
        title: "British TV Around the World",
        icon: "MonitorPlay",
        description: "Deconstruct TV shows, write comic cliffhangers, and design posters.",
        keyTakeaway: "Subtitles, screenplays, and soundtracks are the building blocks of global hit shows.",
        quickQuiz: {
          question: "What is a 'cliffhanger' in a TV show context?",
          options: [
            "A person who climbs mountains on TV",
            "A dramatic ending that leaves the audience in suspense",
            "A commercial break",
            "A technical error on the screen"
          ],
          answerIndex: 1,
          explanation: "A cliffhanger is a plot device in fiction which features a main character in a precarious or difficult dilemma at the end of an episode."
        }
      },
      {
        id: "class-10-extra-9",
        title: "School Can Be Fun!",
        icon: "GraduationCap",
        description: "Invent school-themed idioms, compose acrostic poems, and sketch your school.",
        keyTakeaway: "Design dream schools using rules with connectors like so that, as soon as to show positive netiquette.",
        quickQuiz: {
          question: "How do conversation partners typically interpret writing messages in ALL CAPS?",
          options: [
            "As a happy design",
            "As shouting or being angry",
            "As a silent whisper",
            "As correct grammar"
          ],
          answerIndex: 1,
          explanation: "In digital Netiquette, writing in ALL CAPS is widely considered shouting."
        }
      },
      {
        id: "class-10-extra-10",
        title: "Families!",
        icon: "Users",
        description: "Discuss family relationships, build compound vocabulary, and draw crests.",
        keyTakeaway: "Mottos and coat-of-arms crests are visual representations of what makes families unique.",
        quickQuiz: {
          question: "Which of the following is a classic family idiom?",
          options: [
            "The black sheep of the family",
            "As busy as a bee",
            "A fish out of water",
            "Fit as a fiddle"
          ],
          answerIndex: 0,
          explanation: "The black sheep of the family is a classic idiom used to describe an odd or disreputable member of a family group."
        }
      }
    ]
  },
  {
    id: "class-11",
    title: "Grade 11",
    description: "English language and linguacreative interactive worksheets.",
    iconName: "school",
    lessons: [
      {
        id: "class-11-extra-1",
        title: "It's a Challenge!",
        icon: "Award",
        description: "Unit 1: Explore challenging situations, compile extreme adjectives, and complete personality tests.",
        keyTakeaway: "Reflect on personal limits and use high-energy vocabulary to describe human achievements.",
        quickQuiz: {
          question: "Which adjective describes something that is extremely difficult and demanding?",
          options: [
            "easy",
            "challenging",
            "boring",
            "relaxing"
          ],
          answerIndex: 1,
          explanation: "'Challenging' is a perfect description for demanding, hard tasks that test your limits."
        }
      },
      {
        id: "class-11-extra-2",
        title: "Our Changing Planet",
        icon: "Globe",
        description: "Unit 2: Explore geographical features, analyze active climate actions, and sketch green landscapes.",
        keyTakeaway: "Use active connectors and environmental verbs to describe the beauty and vulnerability of nature.",
        quickQuiz: {
          question: "Which word describes the process of carbon dioxide trapping heat in the atmosphere?",
          options: [
            "earthquake",
            "tsunami",
            "greenhouse effect",
            "deforestation"
          ],
          answerIndex: 2,
          explanation: "The greenhouse effect is the process where gases trap the sun's warmth in the atmosphere."
        }
      },
      {
        id: "class-11-extra-3",
        title: "On Holiday",
        icon: "Compass",
        description: "Unit 3: Discuss various holiday types, practice booking accommodation, and draft post cards.",
        keyTakeaway: "Structure friendly, descriptive letters using transition words to sequence your journey.",
        quickQuiz: {
          question: "Which phrase is a classic holiday greeting?",
          options: [
            "Break a leg",
            "On the ball",
            "Wish you were here",
            "Over the moon"
          ],
          answerIndex: 2,
          explanation: "'Wish you were here' is the quintessential sentiment written on holiday postcards."
        }
      },
      {
        id: "class-11-extra-4",
        title: "My Place",
        icon: "Home",
        description: "Unit 4: Deconstruct home layout descriptions, learn household idioms, and design a dream room.",
        keyTakeaway: "Create spatial layout descriptions with prepositions of place and architectural vocabulary.",
        quickQuiz: {
          question: "What does the idiom 'Home sweet home' express?",
          options: [
            "Buying a new house",
            "The comfort and happiness of being in one's own home",
            "Cleaning the living room",
            "Moving to another country"
          ],
          answerIndex: 1,
          explanation: "'Home sweet home' is used to express pleasure and relief upon returning to one's own home."
        }
      },
      {
        id: "class-11-extra-5",
        title: "School (Grade 9)",
        icon: "BookOpen",
        description: "Unit 5: Analyze digital classroom netiquette, create school slogans, and write school acrostics.",
        keyTakeaway: "Design clean rules for virtual learning and respectful digital communications.",
        quickQuiz: {
          question: "What is considered poor netiquette in digital text channels?",
          options: [
            "Writing in lowercase",
            "Using bullet points",
            "Writing everything in ALL CAPS",
            "Greeting your teacher"
          ],
          answerIndex: 2,
          explanation: "In netiquette, writing messages in ALL CAPS is widely seen as shouting and is considered rude."
        }
      },
      {
        id: "class-11-extra-6",
        title: "Favourite Things",
        icon: "Heart",
        description: "Unit 6: Explore the language of choice, rate key possessions, and construct vivid similes.",
        keyTakeaway: "Practice using precise emotional-value verbs and appreciation adjectives to talk about memories.",
        quickQuiz: {
          question: "Which adjective means 'the only one of its kind'?",
          options: [
            "Valuable",
            "Sentimental",
            "Unique",
            "Essential"
          ],
          answerIndex: 2,
          explanation: "'Unique' describes something that is the only one of its kind; special and rare."
        }
      },
      {
        id: "class-11-extra-7",
        title: "Adventure Holidays",
        icon: "Flame",
        description: "Unit 7: Learn extreme sports terminology, map adrenaline-seeking routes, and write acrostics.",
        keyTakeaway: "Contrast safety instructions with adrenaline adjectives to pitch exciting tour itineraries.",
        quickQuiz: {
          question: "Which safety equipment is compulsory for rock climbing?",
          options: [
            "Goggles",
            "Harness",
            "Life jacket",
            "Wetsuit"
          ],
          answerIndex: 1,
          explanation: "A harness connects a climber safely to the climbing ropes to prevent falls."
        }
      },
      {
        id: "class-11-extra-8",
        title: "Entertainment & Media",
        icon: "Film",
        description: "Unit 8: Explore modern broadcasting channels, match media professions, and pitch new shows.",
        keyTakeaway: "Compose catchy show summaries and cliffhangers using showbiz-inspired idioms.",
        quickQuiz: {
          question: "What does 'break a leg' mean in theatre and performance?",
          options: [
            "To get hurt",
            "Good luck",
            "To end the play",
            "To fail a test"
          ],
          answerIndex: 1,
          explanation: "'Break a leg' is a traditional theatrical idiom used to wish performers good luck before a show."
        }
      },
      {
        id: "class-11-extra-9",
        title: "Sports, Games & Activities",
        icon: "Trophy",
        description: "Unit 9: Sort athletic equipment, study competitive sports idioms, and map prepositions of motion.",
        keyTakeaway: "Build active action descriptions using precise verbs and movement prepositions.",
        quickQuiz: {
          question: "What does the idiom 'throw in the towel' mean?",
          options: [
            "To clean up the gym",
            "To start the race",
            "To give up or admit defeat",
            "To score a goal"
          ],
          answerIndex: 2,
          explanation: "In sports and general life, throwing in the towel means to concede defeat or give up."
        }
      },
      {
        id: "class-11-extra-10",
        title: "Useful Websites",
        icon: "Laptop",
        description: "Unit 10: Sort user interface features, learn internet idioms, and design creative web platforms.",
        keyTakeaway: "Map interactive web items and build promotional slogans with high-impact words.",
        quickQuiz: {
          question: "What does it mean for a video or post to 'go viral'?",
          options: [
            "To be infected by a virus",
            "To spread rapidly across the internet with millions of views",
            "To be deleted by the user",
            "To load very slowly"
          ],
          answerIndex: 1,
          explanation: "When digital content 'goes viral', it spreads rapidly through internet shares and views."
        }
      }
    ]
  }
];

export const videoLessonsData: VideoLesson[] = [
  {
    id: "video-1",
    title: "Interactive Worksheets: English Grammar Made Easy",
    duration: "10:15",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB3qXO7zq8QX4YPfQhz5kXh62McZ-HKO5CrvvkrCxvmmzibGFBXOOHwvX40vNt8sqaYCtB439c7yGE5GGAXcMuM9vziJuyMeXzSHC9KY3XhWS93yTpt5hvORdacMsgcByJW7Ru-GYmobplOKOV4gfQljZHn85PpE8hAxuu2dgfGrPVyOu4OcZZflvxvhRLb5E2fxgkk4wTwn4DJfQwZa-v15tWJAqWf-42YFfr_NyERKMIflPc1bVQODkrVTIkLRAc9_GIHO6v5dQ5Q",
    description: "Video tutorial on deep learning of English grammar and creative word combinations through interactive worksheets.",
    keyPoints: [
      "Methods of performing textbook exercises interactively.",
      "What is linguacreative competence (creative language learning)?",
      "Taking simple and fun tests using smart devices.",
      "Secrets of expanding English vocabulary independently."
    ],
    quizQuestion: {
      question: "What is the primary goal of the linguacreative approach?",
      options: [
        "Just memorizing words",
        "Using English creatively and freely, combining words in new ways",
        "Never using grammar",
        "Just translating"
      ],
      answerIndex: 1,
      explanation: "Linguacreative competence allows students to freely express new, creative ideas using language rules."
    }
  },
  {
    id: "video-2",
    title: "Secrets to Improving Your English Speaking Skills",
    duration: "12:40",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPSEf-7U7xkgpA9r--_vbeILeA-jppWpaZxjWOjGxtmDfdT5AKaap1n3lcOxbV1FjJTeS8FlXcc2fIzEuxvYipX4pBiq7ag0AH3esd8qIrteKIllrcbLflm1kffju5crssW9ykfSykqKD_TtRucrI95NSOmKzR0UkGeB8ciyNoBOEcFFFJrfYKFDe4VsatUKcXI-f8o2t-v5sd2vur4VEIDZ7kqSb72o5OvsKWZqY7XSiPQ_Bk8mmBo5I6IaqPRkY6JAQn7Cs7JYaZ",
    description: "Speaking confidently in daily conversations, using English idioms and idiomatic phrases appropriately.",
    keyPoints: [
      "The true meaning of frequently used English idioms.",
      "Common pronunciation errors and how to avoid them.",
      "Connecting sentences smoothly during conversations.",
      "Developing listening skills using audio lessons."
    ],
    quizQuestion: {
      question: "Which practice speeds up your speaking skills in English?",
      options: [
        "Using connectors freely during conversation and practicing dialogues",
        "Just reading a book silently",
        "Rote memorizing words only with translations",
        "Not working on written errors at all"
      ],
      answerIndex: 0,
      explanation: "Dialogues and connectors help conduct smooth and natural conversations."
    }
  },
  {
    id: "video-3",
    title: "Creativity & Active Vocabulary Builder",
    duration: "15:05",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBY83p9nkaHmZ6Qbh2R8dWcAt21uZ92FSej6BiLslGXJ6XMdRK5Samj0t8kbzicECATPJ9bBnorWhgCR0ftHZ7IHMp5-6cTBn-_2-4t-tmtuGUolbKR-NU4H8rORjTBXrFivicUPwPm5Cofw20nqnSvStWAMB2C54f4WA7qNLcHx6LFEw-BRQv-LW0KSZGYbtM7rPMTeuZVUlhMDOZG5t13i3d0U7rCfyCUahgH1mZvDGF8ZyabNAJEdTpuikGSpqV4g3_wJ5Hiz-mq",
    description: "Exercises on inventing new concepts by blending words and developing creative thinking in language.",
    keyPoints: [
      "Word blending and forming compound words.",
      "Increasing vocabulary through acrostic poems.",
      "Working on creative tasks in image and text formats.",
      "Unleashing free-thinking skills in English classes."
    ],
    quizQuestion: {
      question: "Which of the following is correct for making a new word via blending?",
      options: [
        "Just swapping letters",
        "Combining parts of two words (e.g., Breakfast + Lunch = Brunch) to create a new meaningful word",
        "Translating the word",
        "Increasing the number of words"
      ],
      answerIndex: 1,
      explanation: "Through word blending, parts of multiple words combine to create a new creative concept."
    }
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: "test-1",
    name: "Alex",
    grade: "Grade 10 Student",
    rating: 5,
    text: "LingoCraft lessons and interactive sheets make English learning extremely easy and engaging. The topics are perfectly clear!",
    initial: "A",
    avatarColor: "bg-emerald-100 text-emerald-700"
  },
  {
    id: "test-2",
    name: "Madelyn",
    grade: "Grade 11 Student",
    rating: 5,
    text: "Outstanding platform! Each interactive activity and video lesson has immensely helped in growing my active vocabulary and speaking fluency.",
    initial: "M",
    avatarColor: "bg-teal-100 text-teal-700"
  },
  {
    id: "test-3",
    name: "Sandro",
    grade: "Grade 10 Student",
    rating: 5,
    text: "Being able to complete interactive assignments right on the platform and see instant scoring is super convenient. Absolutely love LingoCraft!",
    initial: "S",
    avatarColor: "bg-cyan-100 text-cyan-700"
  }
];

export const faqData: FaqItem[] = [
  {
    id: "faq-1",
    question: "What is the goal of the LingoCraft platform?",
    answer: "Our platform helps Grade 10 and 11 students master English through interactive, modern, and linguacreative (creative-language) learning methodologies."
  },
  {
    id: "faq-2",
    question: "What are interactive worksheets?",
    answer: "These are fun, fully digital worksheets featuring word-webs, dialogue builders, word-blends, and creative assignments that you can complete right inside the browser."
  },
  {
    id: "faq-3",
    question: "How do I use the video lessons?",
    answer: "Browse the Video section, choose a topic to watch, and take a quick quiz at the end of the video to reinforce your understanding."
  }
];

export const quizQuestionsData: QuizQuestion[] = [
  {
    id: 1,
    category: "Phishing & Links",
    scenario: "You receive a message on Telegram from a classmate saying, 'I found your photos on this website, check them out quickly!' with a strange link. This classmate is usually inactive in groups.",
    question: "What should your safe action be?",
    options: [
      "Click the link immediately to search for the photos",
      "Before opening the link, ask them through another channel (call or face-to-face) if they sent the message",
      "Forward the link to other friends and ask them about it",
      "Insult the classmate in the group chat out of anger"
    ],
    answerIndex: 1,
    explanation: "Often, scammers hack accounts and send phishing links to contact lists. Verifying via another communication channel is the smartest approach."
  },
  {
    id: 2,
    category: "Personal Data",
    scenario: "You find a website offering free coins for a mobile game. To load the coins into your account, it asks you to input your Telegram phone number and enter the 5-digit verification code sent to your phone.",
    question: "What will you do in this situation?",
    options: [
      "Enter the Telegram code quickly, because I really need those free coins",
      "Enter the code since it's just a game site and cannot affect Telegram",
      "Never enter the code. This is an access code to hijack my Telegram, and free coins are just a scam trap",
      "Enter the code and change my Telegram password later"
    ],
    answerIndex: 2,
    explanation: "The 5-digit code is a security token to authorize a new device on your Telegram account. Entering it allows scammers to hijack your account."
  },
  {
    id: 3,
    category: "AI & Deepfake",
    scenario: "On social media, you see a video of a famous singer or public official advertising a suspicious product or making strange claims. Their voice and facial movements look slightly artificial.",
    question: "Can you trust this video?",
    options: [
      "Yes, the video looks genuine and the person is speaking",
      "No, this is highly likely a deepfake created with AI. I will verify the information from official sources",
      "Like the video and share it immediately with all my contacts",
      "I will only trust it if the video quality is 4K"
    ],
    answerIndex: 1,
    explanation: "Deepfakes are common manipulation tools. Any suspicious or unexpected statements must be cross-checked with trusted media outlets."
  },
  {
    id: 4,
    category: "Passwords & Cyber-Hygiene",
    scenario: "You use one single strong password for all your social networks, email, and school gradebooks. Is this safe and convenient?",
    question: "Give the correct assessment:",
    options: [
      "Yes, because the password is complex and easy to remember",
      "No, if one site is breached or leaked, hackers can easily access all your other accounts. Unique passwords for each platform are a must",
      "Only if my email is safe, the rest do not matter",
      "If I change the password every week, using one password is fine"
    ],
    answerIndex: 1,
    explanation: "Account cross-dependency is a huge risk. Reusing passwords leads to chain breaches (credential stuffing). Use unique passwords for vital services."
  },
  {
    id: 5,
    category: "Online Ethics & Academic Honesty",
    scenario: "You are preparing a biology report and found a great scientific text online. What are the rules for adding it to your report?",
    question: "What does academic honesty require?",
    options: [
      "Copy-paste the text and present it as my own writing",
      "Cite the text, write my own name as the author of the report, and list the original source/author in brackets or at the end",
      "Replace all periods with commas to bypass plagiarism checkers",
      "Write the entire report with ChatGPT and submit it without proofreading"
    ],
    answerIndex: 1,
    explanation: "Citing and referencing sources shows respect for intellectual effort and represents a student's academic integrity."
  }
];

export const extraLessonsData: { [key: string]: Lesson[] } = {
  "class-10": [
    {
      id: "class-10-extra-1",
      title: "Digital Footprint and Its Consequences",
      icon: "Fingerprint",
      description: "How the data we leave online affects our future reputation.",
      keyTakeaway: "Anything uploaded to the internet can be saved somewhere even after deletion, potentially harming future jobs or university admissions.",
      quickQuiz: {
        question: "How can you reduce your Digital Footprint online?",
        options: [
          "By sharing less personal info and configuring privacy settings properly",
          "By opening a new account every day",
          "By restarting your computer daily",
          "By only surfing the web at night"
        ],
        answerIndex: 0,
        explanation: "Restricting privacy settings and not distributing personal info prevents your digital footprint from being harmful."
      }
    },
    {
      id: "class-10-extra-2",
      title: "Mobile App Permissions",
      icon: "Smartphone",
      description: "Analyzing what permissions we grant to apps when installing them.",
      keyTakeaway: "If a simple game or calculator asks to read contacts or SMS, deny it. It could be disguised to steal personal data.",
      quickQuiz: {
        question: "What should you do if a photo editor app asks for microphone permission?",
        options: [
          "Grant it, it won't interfere",
          "Deny permission, as microphone is not needed for photo editing",
          "Assume my phone is broken",
          "Uninstall all apps"
        ],
        answerIndex: 1,
        explanation: "Granting unnecessary permissions to apps can allow them to spy on you."
      }
    },
    {
      id: "class-10-extra-3",
      title: "Public Wi-Fi Security",
      icon: "Wifi",
      description: "Safely using free Wi-Fi networks in cafes and parks.",
      keyTakeaway: "Public Wi-Fi networks are unencrypted. Never enter bank cards or private passwords when connected, as cybercriminals can monitor all your traffic.",
      quickQuiz: {
        question: "Which action is considered safe when connected to a cafe's free Wi-Fi?",
        options: [
          "Making online purchases with a card",
          "Changing social media passwords",
          "Only browsing news sites or using a VPN connection",
          "Uploading all personal files to cloud services"
        ],
        answerIndex: 2,
        explanation: "A VPN encrypts your connection, while viewing general sites does not endanger confidential data."
      }
    },
    {
      id: "class-10-extra-4",
      title: "Online Harassment and Cyberbullying",
      icon: "Tv",
      description: "Responding correctly and politely to harassment on the internet.",
      keyTakeaway: "Online bullies aim to make you angry. Do not respond, take screenshots, block them immediately, and inform adults.",
      quickQuiz: {
        question: "If someone insults you in a group chat, what is the first thing you should do?",
        options: [
          "Insult them back even harder",
          "Do not reply, block them, and report to the group administrators",
          "Shut down the internet entirely",
          "Gather friends and start a fight"
        ],
        answerIndex: 1,
        explanation: "Blocking and reporting to administrators solves the problem without conflict."
      }
    },
    {
      id: "class-10-extra-5",
      title: "Email Spam",
      icon: "Mail",
      description: "Distinguishing promotional and dangerous emails in your inbox.",
      keyTakeaway: "Never download attachments (.zip, .exe) from unknown senders claiming 'You inherited money' or 'You won a prize'. They contain malware.",
      quickQuiz: {
        question: "Is it safe to open a suspicious email attachment with a .exe extension?",
        options: [
          "Yes, if you are curious to see it",
          "Only if you have an antivirus on your computer",
          "Absolutely not, it is likely malware (a virus)",
          "Forward the file to others to check"
        ],
        answerIndex: 2,
        explanation: ".exe files are executable programs, and running them can install malicious code to fully compromise your system."
      }
    },
    {
      id: "class-10-extra-6",
      title: "In-game Scams",
      icon: "Gamepad2",
      description: "Protecting yourself from fake sites promising game currencies (UC, Robux, Diamonds).",
      keyTakeaway: "No game administration gives free currency on external sites. These sites are phishing pages created to steal your game account.",
      quickQuiz: {
        question: "If a site says 'Share with your classmates to get 1000 free coins', what is this?",
        options: [
          "A real promotion",
          "A viral cyber-scam designed to deceive you and your friends",
          "A gift from the game developers",
          "A new feature of Telegram"
        ],
        answerIndex: 1,
        explanation: "This is network fraud, deceiving users into sharing links and losing accounts."
      }
    },
    {
      id: "class-10-extra-7",
      title: "Netiquette - Digital Ethics",
      icon: "HeartHandshake",
      description: "Rules of texting and communicating on social media.",
      keyTakeaway: "Remember that behind every written word online is a real human. Sending insulting, derogatory, or false messages is bad netiquette.",
      quickQuiz: {
        question: "What does writing messages in ALL CAPS mean in text communication?",
        options: [
          "It indicates important news",
          "It means speaking in a strong voice",
          "It is perceived as shouting or being angry with the recipient",
          "It is considered beautiful design"
        ],
        answerIndex: 2,
        explanation: "According to netiquette (network ethics) rules, writing in all caps is considered shouting or a sign of aggression."
      }
    },
    {
      id: "class-10-extra-8",
      title: "Keeping Software Updated",
      icon: "ShieldCheck",
      description: "The importance of regularly updating systems and antivirus software.",
      keyTakeaway: "Software developers constantly patch security vulnerabilities. Updating your operating system on time blocks hackers.",
      quickQuiz: {
        question: "What do you do if a system update is requested on your phone?",
        options: [
          "Update immediately for new security patches and bug fixes",
          "Decline because my phone memory is full",
          "Update it next year",
          "Sell the phone and buy a new one"
        ],
        answerIndex: 0,
        explanation: "Updates strengthen system protection based on new cybersecurity threat analyses."
      }
    },
    {
      id: "class-10-extra-9",
      title: "Cloud Service Security",
      icon: "Database",
      description: "Storing data correctly on platforms like Google Drive and iCloud.",
      keyTakeaway: "When storing personal documents (passports, cards) in cloud storage, make sure to use strong passwords and two-factor authentication (2FA).",
      quickQuiz: {
        question: "Is it safe to give your iCloud or Google account password to a friend?",
        options: [
          "Yes, if they are a trusted friend",
          "Only to let them see a single file",
          "Absolutely not, this information is personal and will be compromised if friendship ends",
          "Yes, there is nothing important in my mail"
        ],
        answerIndex: 2,
        explanation: "Personal account credentials should never be shared with anyone, even the closest friends."
      }
    },
    {
      id: "class-10-extra-10",
      title: "Masked Lies",
      icon: "AlertTriangle",
      description: "Avoiding traps like '13 viruses found on your phone, click to clean' banners.",
      keyTakeaway: "Such messages are fake, aiming to install malicious fake antivirus software or steal card data. Close these banners immediately.",
      quickQuiz: {
        question: "While browsing, a popup says 'Your phone is infected! Download cleaner app immediately'. What do you do?",
        options: [
          "Download the app as told",
          "Close the site immediately, understanding it is a simple advertising trap",
          "Take the phone to a service center",
          "Erase the phone memory completely"
        ],
        answerIndex: 1,
        explanation: "Websites in a browser cannot scan your phone's internal system for viruses; this is just deceptive advertising."
      }
    }
  ],
  "class-11": [
    {
      id: "class-11-extra-1",
      title: "2FA Perfect Security System",
      icon: "KeyRound",
      description: "Secrets of keeping accounts secure even if your password is leaked.",
      keyTakeaway: "When 2FA is enabled, even if a hacker knows your password, they cannot access the account without the SMS code or Google Authenticator key.",
      quickQuiz: {
        question: "Which 2FA method is considered much safer than SMS codes?",
        options: [
          "There is no difference",
          "Dedicated authenticator apps like Google Authenticator",
          "Codes received via email",
          "Making the password simpler"
        ],
        answerIndex: 1,
        explanation: "SMS codes can be stolen via SIM card cloning (SIM Swapping), while authenticator apps run locally on your phone without internet dependency."
      }
    },
    {
      id: "class-11-extra-2",
      title: "What are DDoS Attacks?",
      icon: "Layers",
      description: "Disrupting site and network services by overloading them with millions of simultaneous requests.",
      keyTakeaway: "With DDoS attacks, hackers take down sites to demand ransoms or mask other, more serious attacks.",
      quickQuiz: {
        question: "What happens during a DDoS attack?",
        options: [
          "All money on the site is stolen",
          "The site's server crashes due to the heavy load of fake requests",
          "The user's computer catches fire",
          "Internet speed increases"
        ],
        answerIndex: 1,
        explanation: "DDoS occupies all server resources, making the site inaccessible to regular users."
      }
    },
    {
      id: "class-11-extra-3",
      title: "Protecting Your Conversations",
      icon: "EyeOff",
      description: "Defending against spy programs that unauthorizedly monitor camera and microphone.",
      keyTakeaway: "Spyware can log every key pressed on your keyboard (Keylogger) and steal passwords. Always uninstall unauthorized apps.",
      quickQuiz: {
        question: "What is the primary function of a Keylogger program?",
        options: [
          "Downloading music",
          "Recording every keystroke (passwords, card numbers) and sending it to hackers",
          "Increasing screen brightness",
          "Measuring internet speed"
        ],
        answerIndex: 1,
        explanation: "A keylogger is malicious software that records your private entries (including passwords) to steal them."
      }
    },
    {
      id: "class-11-extra-4",
      title: "Cryptocurrency and Scam Projects",
      icon: "Coins",
      description: "Fake investment bots and crypto-traps promising quick wealth.",
      keyTakeaway: "Online offers promising to 'Multiply your money 10x in 2 days' are 100% false. Ponzi schemes exist only to scam people.",
      quickQuiz: {
        question: "An online project guarantees high daily returns on your investment. What is this?",
        options: [
          "A good investment opportunity",
          "A financial pyramid (Ponzi scheme) or a form of cyber-fraud",
          "A state-supported program",
          "A charity campaign"
        ],
        answerIndex: 1,
        explanation: "Guaranteed high returns are the main indicator of cyber-fraud and financial pyramids."
      }
    },
    {
      id: "class-11-extra-5",
      title: "Playing with Human Psychology",
      icon: "User",
      description: "Hackers' methods of gathering info purely through deceit and trust (social engineering), without technical tools.",
      keyTakeaway: "Cyber-scammers often pose as security services, providers, or friends to ask for your codes. Never trust them or share information.",
      quickQuiz: {
        question: "A person identifying themselves as a police officer demanded your verification code over the phone. What is the correct decision?",
        options: [
          "Share it immediately, as it was requested by law enforcement",
          "Hang up and contact official departments, because official staff never ask for codes",
          "Call back from another phone to check",
          "Delete my password"
        ],
        answerIndex: 1,
        explanation: "No state authority or bank representative has the right to demand confirmation codes or passwords over the phone."
      }
    },
    {
      id: "class-11-extra-6",
      title: "Session Cookie Risks",
      icon: "Globe",
      description: "How cyber-thieves steal automatic login keys stored in browsers.",
      keyTakeaway: "With stolen cookies, hackers can access your profile directly without knowing your password. Regularly clear browser cache and cookies.",
      quickQuiz: {
        question: "What happens if cookies fall into hackers' hands?",
        options: [
          "Site colors will break",
          "Hackers can log into your profile via the active session without knowing your password",
          "The internet system shuts down",
          "The computer breaks down"
        ],
        answerIndex: 1,
        explanation: "Session cookies act as a token confirming you are logged in, and stealing them allows full session hijacking."
      }
    },
    {
      id: "class-11-extra-7",
      title: "Identity Theft",
      icon: "Award",
      description: "Opening fake accounts and committing fraud using your photos and details.",
      keyTakeaway: "Never upload photos of your passport, student ID, or birth certificate to social media. Criminals can use them for online loans or scams.",
      quickQuiz: {
        question: "Is it safe to share a personal passport photo in Telegram groups?",
        options: [
          "Yes, nobody can do anything with it",
          "No, cybercriminals can use this document to get fake microloans or commit fraud",
          "Only safe if the image quality is low",
          "Only safe at night"
        ],
        answerIndex: 1,
        explanation: "Document photos are highly valuable tools for cyber-fraud and identity theft."
      }
    },
    {
      id: "class-11-extra-8",
      title: "Law and Punishment in Cyber-Space",
      icon: "FileText",
      description: "Punishments defined for cybercrimes in the Republic of Uzbekistan.",
      keyTakeaway: "Hacking someone's account, spreading viruses, or cyberbullying is not a game. The law specifies criminal liability and prison sentences.",
      quickQuiz: {
        question: "How does the law punish hacking someone's social media profile 'as a joke'?",
        options: [
          "There is no warning, just fine",
          "It leads to administrative and criminal liability, and can result in fines or imprisonment",
          "Only the school principal scolds you",
          "The profile owner pays a fine"
        ],
        answerIndex: 1,
        explanation: "Unauthorized access to and destruction of information systems is a serious crime under the Criminal Code of the Republic of Uzbekistan."
      }
    },
    {
      id: "class-11-extra-9",
      title: "Securing Your Home Network",
      icon: "HardDrive",
      description: "Rules for correctly configuring your home Wi-Fi router.",
      keyTakeaway: "Change your router's default administration password (admin/admin) immediately to a complex one, and enable WPA2 or WPA3 encryption.",
      quickQuiz: {
        question: "What is the consequence of not changing the default password on your home router?",
        options: [
          "The internet becomes slower",
          "Neighbors and hackers can connect, controlling your network and all connected phones",
          "The router catches fire",
          "There is no risk"
        ],
        answerIndex: 1,
        explanation: "Default passwords are widely known, allowing hackers to gain full control over network traffic."
      }
    },
    {
      id: "class-11-extra-10",
      title: "Secrets of Using VPN",
      icon: "Globe",
      description: "The truth about how free VPN apps sell your private data.",
      keyTakeaway: "Free VPN services can collect all your visited sites, passwords, and personal info, selling them to advertisers or the black market.",
      quickQuiz: {
        question: "What is the most correct action when using a free VPN?",
        options: [
          "Leave it on all the time",
          "Turn off VPN completely when entering bank apps or card details",
          "Use the card on all sites with VPN active",
          "Buy the cheapest VPN"
        ],
        answerIndex: 1,
        explanation: "VPN routes your traffic through its servers. If a free VPN is active while entering card details or bank apps, your info could leak to third parties."
      }
    }
  ]
};
