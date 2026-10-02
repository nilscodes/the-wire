/* The Wire, Season one: hardcoded case data.
   Converted from the original Season 1 build (research by three parallel subagents, curated by hand). Rebuild later seasons with tools/build-season.js.
   Everything here is limited to what is shown or stated by the end of this season's finale. */
(window.WIRE_SEASONS = window.WIRE_SEASONS || []).push({
  season: 1,
  label: "Season one",
  year: 2002,
  copy: {"ladders":{"kicker":"The game & the job","blurb":"Two hierarchies, same logic. Pick anyone to see where they stand, who is in their way, and how they moved during the season."}},
  factions: {
    "barksdale": {"label":"Barksdale Organization","short":"Barksdale","color":"--sodium","anchor":[-480,10]},
    "street": {"label":"The Street","short":"Street","color":"--rose","anchor":[-170,190]},
    "police": {"label":"Police & FBI","short":"Police","color":"--fluoro","anchor":[430,-10]},
    "law": {"label":"Courts & Politics","short":"Law","color":"--violet","anchor":[30,-200]},
    "civilian": {"label":"Family & Civilians","short":"Civilian","color":"--stone","anchor":[230,210],"loose":true},
  },
  quickPicks: ["wallace","poot","bodie","dangelo","stringer","carver","herc","prez","daniels","santangelo","freamon"],
  characters: [
    {
      "id": "avon",
      "name": "Avon Barksdale",
      "short": "Avon",
      "actor": "Wood Harris",
      "faction": "barksdale",
      "unit": "Leadership",
      "tier": 1,
      "title": "Kingpin",
      "role": "Kingpin; runs the West Baltimore organization from the back office of Orlando's strip club",
      "roleEnd": "In prison: pleaded guilty for seven years",
      "reportsTo": null,
      "firstEp": 1,
      "status": [
        {
          "ep": 12,
          "s": "arrested",
          "note": "Arrested at Orlando's after the hidden camera catches him"
        },
        {
          "ep": 13,
          "s": "convicted",
          "note": "Pleaded guilty; seven years"
        }
      ],
      "bio": "Head of the Barksdale Organization, which controls the Franklin Terrace high-rise towers and the low-rise projects called the Pit. He stays away from the drugs, avoids being photographed and puts nothing in his own name, working through his second-in-command Stringer Bell. A former boxer; for weeks the detail's only photo of him is an old boxing poster.",
      "moments": [
        {
          "ep": 1,
          "text": "Scolds D'Angelo for a needless public murder; D'Angelo is moved from the towers down to the Pit."
        },
        {
          "ep": 4,
          "text": "Puts a bounty on Omar's crew after the Pit stash robbery, doubling it when he hears Omar is gay."
        },
        {
          "ep": 9,
          "text": "Survives Omar's ambush outside Orlando's when Wee-Bey pulls up and returns fire."
        },
        {
          "ep": 12,
          "text": "Caught on the detail's hidden camera sending D'Angelo to New York for a package; arrested by Daniels."
        },
        {
          "ep": 13,
          "text": "Pleads guilty in exchange for a seven-year sentence."
        }
      ],
      "ladder": {
        "track": "game",
        "rung": "kingpin",
        "moves": [
          {
            "ep": 10,
            "dir": "side",
            "text": "Gives up his pager at Stringer's urging. Every call now goes through Stringer."
          },
          {
            "ep": 12,
            "dir": "out",
            "text": "Arrested by Daniels at Orlando's."
          },
          {
            "ep": 13,
            "dir": "out",
            "text": "Pleads guilty for seven years. Stringer takes the product side and Brianna the money."
          }
        ]
      },
      "pathNote": "Nothing above him but the law."
    },
    {
      "id": "stringer",
      "name": "Stringer Bell",
      "full": "Russell Bell",
      "short": "Stringer",
      "actor": "Idris Elba",
      "faction": "barksdale",
      "unit": "Leadership",
      "tier": 1,
      "title": "Second-in-command",
      "role": "Second-in-command and Avon's closest friend; runs the drug operation day to day",
      "roleEnd": "Runs the organization while Avon serves his time; never charged",
      "reportsTo": "avon",
      "firstEp": 1,
      "status": [
        {
          "ep": 13,
          "s": "promoted",
          "note": "Runs the product side while Avon is in prison"
        }
      ],
      "bio": "Avon's second-in-command and closest friend, who manages the drug operation and the business thinking behind it. He secretly takes economics classes at a community college and pushes Avon to insulate himself from the street. Careful about phones and informants, he orders several of the season's killings but is never charged.",
      "moments": [
        {
          "ep": 1,
          "text": "Watches D'Angelo's trial with Wee-Bey, Stinkum and Savino; the next day tells D'Angelo he is demoted to the Pit."
        },
        {
          "ep": 5,
          "text": "Meets Wallace and Poot at the arcade with Wee-Bey, Bird and Stinkum; Brandon is abducted, tortured and killed."
        },
        {
          "ep": 8,
          "text": "McNulty tails him and finds him taking an economics class at Baltimore City Community College."
        },
        {
          "ep": 12,
          "text": "Orders Bodie to kill Wallace; McNulty lets him walk when Avon is arrested."
        },
        {
          "ep": 13,
          "text": "Takes the product side while Brianna handles money; outside court he tells McNulty \"Nicely done.\""
        }
      ],
      "ladder": {
        "track": "game",
        "rung": "second",
        "moves": [
          {
            "ep": 10,
            "dir": "up",
            "text": "Avon gives up his pager. All contact with Avon now goes through Stringer."
          },
          {
            "ep": 12,
            "dir": "side",
            "text": "McNulty lets him walk when Avon is arrested."
          },
          {
            "ep": 13,
            "dir": "up",
            "text": "Takes over the product side while Avon serves seven years."
          }
        ]
      },
      "pathNote": "One rung from the top, and running everything by the finale. But as D'Angelo tells his crew, the king stay the king."
    },
    {
      "id": "weebey",
      "name": "Wee-Bey Brice",
      "full": "Roland Brice",
      "short": "Wee-Bey",
      "actor": "Hassan Johnson",
      "faction": "barksdale",
      "unit": "Muscle",
      "tier": 1,
      "title": "Chief enforcer",
      "role": "Avon's most trusted soldier and chief enforcer; also drives and moves money",
      "roleEnd": "Arrested in Philadelphia; confessed to several murders",
      "reportsTo": "avon",
      "firstEp": 1,
      "status": [
        {
          "ep": 8,
          "s": "injured",
          "note": "Shot in the leg by Omar"
        },
        {
          "ep": 9,
          "s": "active"
        },
        {
          "ep": 11,
          "s": "fugitive",
          "note": "Hiding in Philadelphia"
        },
        {
          "ep": 13,
          "s": "arrested",
          "note": "Confessed to several murders, one of them falsely"
        }
      ],
      "bio": "Avon's longtime friend and top soldier, who drives, moves cash and carries out killings; he keeps tropical fish. Omar wounds him in the ambush that kills Stinkum, and he later saves Avon from Omar. After the Orlando hit he kills Little Man on Stringer's orders and hides in Philadelphia, where the detail catches him.",
      "moments": [
        {
          "ep": 1,
          "text": "Drives D'Angelo to Orlando's and warns him never to talk business in a car or on the phone."
        },
        {
          "ep": 8,
          "text": "Shot in the leg by Omar in the ambush that kills Stinkum."
        },
        {
          "ep": 9,
          "text": "Returns fire and wounds Omar, saving Avon outside Orlando's."
        },
        {
          "ep": 10,
          "text": "Shoots Orlando with Little Man in the ambush where Det. Greggs is also shot."
        },
        {
          "ep": 13,
          "text": "Arrested in Philadelphia; confesses to killing Little Man and Nakeesha Lyles, and falsely to killing Gant to cover for Bird."
        }
      ],
      "ladder": {
        "track": "game",
        "rung": "enforcer",
        "moves": [
          {
            "ep": 8,
            "dir": "side",
            "text": "Wounded in Omar's ambush on the night Stinkum dies."
          },
          {
            "ep": 11,
            "dir": "out",
            "text": "Kills Little Man on Stringer's order, then hides in Philadelphia."
          },
          {
            "ep": 13,
            "dir": "out",
            "text": "Arrested. Confesses to several murders, including Gant's, which Bird committed."
          }
        ]
      },
      "pathNote": "Loyal enough to take the blame for murders he didn't commit."
    },
    {
      "id": "stinkum",
      "name": "Stinkum",
      "full": "Anton Artis",
      "short": "Stinkum",
      "actor": "Brandon Price",
      "faction": "barksdale",
      "unit": "Muscle",
      "tier": 2,
      "title": "Enforcer; runs re-ups",
      "role": "Enforcer who runs resupply (re-ups) from the towers to the Pit",
      "roleEnd": "Killed by Omar (ep 8)",
      "reportsTo": "stringer",
      "firstEp": 1,
      "status": [
        {
          "ep": 8,
          "s": "dead",
          "note": "Killed by Omar"
        }
      ],
      "bio": "A Barksdale enforcer who handles re-ups between the towers and the Pit, and one of the crew that tortures and kills Brandon. Avon picks him to run newly opened corners. He is shot dead by Omar during the hit that was meant to seal his promotion.",
      "moments": [
        {
          "ep": 1,
          "text": "Sits in on D'Angelo's trial with Stringer, Wee-Bey and Savino."
        },
        {
          "ep": 6,
          "text": "Chews out Bodie for using his name on the phone; the detail logs the call as evidence of conspiracy."
        },
        {
          "ep": 7,
          "text": "Gets away when police arrest his courier Kevin Johnston; the detail lets him go to protect the wiretap."
        },
        {
          "ep": 8,
          "text": "The crew throws a party for his promotion; he is killed by Omar while moving on a dealer named Scar."
        }
      ],
      "ladder": {
        "track": "game",
        "rung": "soldiers",
        "moves": [
          {
            "ep": 5,
            "dir": "up",
            "text": "Avon picks him to run the newly opened Edmondson Avenue corners."
          },
          {
            "ep": 8,
            "dir": "out",
            "text": "Shot dead by Omar on the night the promotion was to be sealed."
          }
        ]
      }
    },
    {
      "id": "bird",
      "name": "Bird",
      "short": "Bird",
      "actor": "Fredro Starr",
      "faction": "barksdale",
      "unit": "Muscle",
      "tier": 2,
      "title": "Soldier",
      "role": "Foul-mouthed, volatile Barksdale soldier",
      "roleEnd": "Jailed for William Gant's murder",
      "reportsTo": "weebey",
      "firstEp": 5,
      "status": [
        {
          "ep": 7,
          "s": "arrested",
          "note": "Charged with killing William Gant"
        }
      ],
      "bio": "A reckless soldier who shot trial witness William Gant (found dead in ep 1) and is part of the crew that tortures Brandon. Omar points the police to him, and a ballistics test ties his gun to the Gant killing. He refuses to talk and is beaten in interrogation.",
      "moments": [
        {
          "ep": 5,
          "text": "With Stringer, Wee-Bey and Stinkum when Brandon is taken from the arcade (uncredited appearance)."
        },
        {
          "ep": 7,
          "text": "Arrested outside a shooting gallery on Omar's tip; his gun matches the Gant killing."
        }
      ],
      "ladder": {
        "track": "game",
        "rung": "soldiers",
        "moves": [
          {
            "ep": 7,
            "dir": "out",
            "text": "Arrested on Omar's tip. His gun matches the Gant killing."
          }
        ]
      }
    },
    {
      "id": "savino",
      "name": "Savino Bratton",
      "short": "Savino",
      "actor": "Chris Clanton",
      "faction": "barksdale",
      "unit": "Muscle",
      "tier": 2,
      "title": "Soldier",
      "role": "Barksdale soldier",
      "roleEnd": "In custody; charged only over fake drugs",
      "reportsTo": "weebey",
      "firstEp": 1,
      "status": [
        {
          "ep": 11,
          "s": "arrested",
          "note": "Surrendered with Levy; charged over a fake-drug deal"
        }
      ],
      "bio": "A Barksdale soldier who sits in on D'Angelo's trial and drives Stringer. He sets up the Orlando hit, driving Orlando and undercover Det. Greggs to a dark lot and walking away before the shooting. He turns himself in with Levy, who claims he only meant to sell Orlando baking soda.",
      "moments": [
        {
          "ep": 1,
          "text": "Among the Barksdale men watching D'Angelo's trial."
        },
        {
          "ep": 10,
          "text": "Drives Orlando and Greggs into the ambush, turning the radio up to defeat any wire."
        },
        {
          "ep": 11,
          "text": "Surrenders with Levy; charged only with an attempt to distribute fake narcotics."
        }
      ],
      "ladder": {
        "track": "game",
        "rung": "soldiers",
        "moves": [
          {
            "ep": 10,
            "dir": "side",
            "text": "Drives Orlando and Kima into the ambush."
          },
          {
            "ep": 11,
            "dir": "out",
            "text": "Surrenders with Levy; charged only with trying to sell fake drugs."
          }
        ]
      }
    },
    {
      "id": "littleman",
      "name": "Little Man",
      "full": "Wintell Royce",
      "short": "Little Man",
      "actor": "Micaiah Jones",
      "faction": "barksdale",
      "unit": "Muscle",
      "tier": 2,
      "title": "Enforcer, Tower 221",
      "role": "Enforcer stationed at Tower 221",
      "roleEnd": "Killed on Stringer's order (ep 11)",
      "reportsTo": "weebey",
      "firstEp": 2,
      "status": [
        {
          "ep": 11,
          "s": "dead",
          "note": "Killed by Wee-Bey on Stringer's order"
        }
      ],
      "bio": "A heavyset enforcer posted at the 221 tower who uses the tower phone to call for resupply and hands cash to Senator Clay Davis's driver. During the Orlando hit he panics and shoots Det. Greggs. Stringer decides he is unreliable and has Wee-Bey kill him.",
      "moments": [
        {
          "ep": 8,
          "text": "Hands a bag of cash to Damien \"Day-Day\" Price, Senator Clay Davis's driver."
        },
        {
          "ep": 10,
          "text": "His resupply calls from the tower phone lead the detail to a suburban stash house; that night he shoots Greggs during the Orlando hit."
        },
        {
          "ep": 11,
          "text": "His fingerprints on a can by a payphone identify him; Wee-Bey kills him on Stringer's orders."
        },
        {
          "ep": 13,
          "text": "Greggs picks him out of a photo array."
        }
      ],
      "ladder": {
        "track": "game",
        "rung": "soldiers",
        "moves": [
          {
            "ep": 10,
            "dir": "down",
            "text": "Panics during the Orlando hit and shoots Kima."
          },
          {
            "ep": 11,
            "dir": "out",
            "text": "Stringer decides he is a liability. Wee-Bey kills him."
          }
        ]
      }
    },
    {
      "id": "dangelo",
      "name": "D'Angelo Barksdale",
      "short": "D'Angelo",
      "actor": "Lawrence Gilliard Jr.",
      "faction": "barksdale",
      "unit": "The Pit",
      "tier": 1,
      "title": "Crew chief, the Pit",
      "role": "Lieutenant just acquitted of murder; demoted from Tower 221 to run the Pit",
      "roleEnd": "Sentenced to 20 years after backing out of a deal",
      "reportsTo": "stringer",
      "firstEp": 1,
      "status": [
        {
          "ep": 12,
          "s": "arrested",
          "note": "Stopped by New Jersey troopers with a package from New York"
        },
        {
          "ep": 13,
          "s": "convicted",
          "note": "Backed out of cooperating; 20 years"
        }
      ],
      "bio": "Avon's nephew, who ran the 221 tower until he shot Pooh Blanchard in the lobby in front of witnesses. Sent down to the Pit, he runs a profitable crew but grows sick of the violence, especially the killings of William Gant and Brandon. Wallace's murder turns him against Stringer, and he nearly cooperates with the police before his mother talks him out of it.",
      "moments": [
        {
          "ep": 1,
          "text": "Acquitted when witness Nakeesha Lyles recants; demoted to the Pit."
        },
        {
          "ep": 2,
          "text": "McNulty and Bunk trick him into starting a condolence letter to Gant's 'family' before Levy stops him."
        },
        {
          "ep": 3,
          "text": "Teaches Bodie and Wallace chess using the organization as the model: \"The king stay the king.\""
        },
        {
          "ep": 12,
          "text": "Arrested on the New Jersey highway coming back from a New York pickup; learns Wallace is dead and refuses Levy."
        },
        {
          "ep": 13,
          "text": "Offers to give up the organization, then backs out after Brianna's visit; sentenced to 20 years."
        }
      ],
      "ladder": {
        "track": "game",
        "rung": "crewchief",
        "moves": [
          {
            "ep": 1,
            "dir": "down",
            "text": "Sent down from the 221 tower to the low-rise Pit after killing Pooh Blanchard in front of witnesses."
          },
          {
            "ep": 6,
            "dir": "side",
            "text": "Quietly moves Cass and Sterling off their posts for skimming instead of reporting them."
          },
          {
            "ep": 12,
            "dir": "out",
            "text": "Arrested on the way back from a New York pickup."
          },
          {
            "ep": 13,
            "dir": "out",
            "text": "Nearly cooperates, then takes 20 years after his mother's visit."
          }
        ]
      },
      "pathNote": "Family buys a second chance: after a public killing he is moved down, not out."
    },
    {
      "id": "bodie",
      "name": "Bodie Broadus",
      "full": "Preston Broadus",
      "short": "Bodie",
      "actor": "J. D. Williams",
      "faction": "barksdale",
      "unit": "The Pit",
      "tier": 1,
      "title": "Pit dealer",
      "role": "Teenage dealer in the Pit; the most aggressive of D'Angelo's young crew",
      "roleEnd": "Moved up to run trade in the towers",
      "reportsTo": "dangelo",
      "firstEp": 1,
      "status": [
        {
          "ep": 3,
          "s": "arrested",
          "note": "Punched Det. Mahon in the raid; juvenile detention"
        },
        {
          "ep": 4,
          "s": "active",
          "note": "Walked out of juvenile detention"
        },
        {
          "ep": 5,
          "s": "arrested",
          "note": "Re-arrested for absconding"
        },
        {
          "ep": 6,
          "s": "active",
          "note": "Released on home supervision"
        },
        {
          "ep": 13,
          "s": "promoted",
          "note": "Runs trade in the towers"
        }
      ],
      "bio": "A hot-tempered teenager raised by his grandmother who often pushes back against D'Angelo's softer style. He impresses Stringer by getting Omar's name after the stash robbery, and keeps slipping out of the juvenile system. His willingness to kill Wallace on Stringer's order is followed by a move up to the towers.",
      "moments": [
        {
          "ep": 1,
          "text": "Leads the beating of Johnny Weeks over counterfeit money."
        },
        {
          "ep": 3,
          "text": "Gives Wee-Bey Omar's name; punches Det. Mahon during the raid and is beaten and arrested."
        },
        {
          "ep": 4,
          "text": "Walks out of a juvenile facility and is back in the Pit almost at once."
        },
        {
          "ep": 12,
          "text": "Shoots Wallace, with Poot, on Stringer's order."
        },
        {
          "ep": 13,
          "text": "Leads the Pit crew in running off a rival crew, then runs trade in the towers."
        }
      ],
      "ladder": {
        "track": "game",
        "rung": "dealers",
        "moves": [
          {
            "ep": 3,
            "dir": "out",
            "text": "Arrested after punching Det. Mahon during the Pit raid."
          },
          {
            "ep": 4,
            "dir": "side",
            "text": "Walks out of juvenile detention and is back in the Pit."
          },
          {
            "ep": 5,
            "dir": "out",
            "text": "Re-arrested by Herc and Carver."
          },
          {
            "ep": 6,
            "dir": "side",
            "text": "Levy gets him released."
          },
          {
            "ep": 12,
            "dir": "up",
            "text": "Stringer gives him a phone and deals with him directly, then orders him to kill Wallace."
          },
          {
            "ep": 13,
            "dir": "up",
            "to": "crewchief",
            "text": "Runs trade in the towers after holding the Pit against a rival crew."
          }
        ]
      },
      "pathNote": "Arrested twice and never demoted. The move up comes right after he does what Stringer asks."
    },
    {
      "id": "poot",
      "name": "Poot Carr",
      "full": "Malik Carr",
      "short": "Poot",
      "actor": "Tray Chaney",
      "faction": "barksdale",
      "unit": "The Pit",
      "tier": 2,
      "title": "Pit dealer",
      "role": "Dealer in the Pit crew; Wallace's close friend",
      "roleEnd": "Running the Pit",
      "reportsTo": "dangelo",
      "firstEp": 1,
      "status": [
        {
          "ep": 13,
          "s": "promoted",
          "note": "Oversees the Pit"
        }
      ],
      "bio": "A dealer in D'Angelo's Pit crew and Wallace's close friend. He is in the stash house when Omar robs it and, with Wallace, spots Brandon at the arcade. He helps kill Wallace, then ends the season running the Pit and passing on D'Angelo's rules.",
      "moments": [
        {
          "ep": 3,
          "text": "Held up in the stash house during Omar's robbery."
        },
        {
          "ep": 5,
          "text": "Spots Brandon at an arcade with Wallace; the sighting goes up to Stringer."
        },
        {
          "ep": 8,
          "text": "Tries to get Wallace back to work, then tells D'Angelo that Wallace is using."
        },
        {
          "ep": 12,
          "text": "Takes the gun from Bodie and finishes Wallace off."
        },
        {
          "ep": 13,
          "text": "Oversees the Pit, repeating D'Angelo's lesson about keeping money and drugs apart to a new dealer."
        }
      ],
      "ladder": {
        "track": "game",
        "rung": "dealers",
        "moves": [
          {
            "ep": 5,
            "dir": "side",
            "text": "Spots Brandon at the arcade with Wallace."
          },
          {
            "ep": 12,
            "dir": "side",
            "text": "Finishes Wallace off after Bodie's shot."
          },
          {
            "ep": 13,
            "dir": "up",
            "to": "crewchief",
            "text": "Takes over the Pit and passes D'Angelo's rules on to a new dealer."
          }
        ]
      },
      "pathNote": "When D'Angelo is arrested the Pit needs a chief, and Poot is the one left standing."
    },
    {
      "id": "wallace",
      "name": "Wallace",
      "short": "Wallace",
      "actor": "Michael B. Jordan",
      "faction": "barksdale",
      "unit": "The Pit",
      "tier": 1,
      "title": "Pit dealer",
      "role": "Teenage dealer in the Pit who looks after younger kids in a squat",
      "roleEnd": "Murdered on Stringer's order (ep 12)",
      "reportsTo": "dangelo",
      "firstEp": 1,
      "status": [
        {
          "ep": 10,
          "s": "cooperating",
          "note": "Gave a statement; sent to his grandmother's on the Eastern Shore"
        },
        {
          "ep": 12,
          "s": "dead",
          "note": "Shot by Bodie and Poot on Stringer's order"
        }
      ],
      "bio": "A bright, soft-hearted teenager in the Pit crew who feeds and schools a group of younger kids in a squatter apartment. After his tip leads to Brandon's torture and murder, he falls apart, quits, and tells the police what he knows. Sent to his grandmother on the Eastern Shore, he drifts back to the Pit and is killed on Stringer's order.",
      "moments": [
        {
          "ep": 1,
          "text": "Takes counterfeit bills from Bubbles; joins the beating of Johnny Weeks."
        },
        {
          "ep": 5,
          "text": "Calls in the sighting of Brandon at the arcade."
        },
        {
          "ep": 6,
          "text": "Finds Brandon's mutilated body outside his building; gets a share of the bounty."
        },
        {
          "ep": 10,
          "text": "Picked up by McNulty; names Stringer and Wee-Bey in Brandon's murder and is sent to his grandmother's."
        },
        {
          "ep": 12,
          "text": "Returns to the Pit and is shot by Bodie and Poot."
        }
      ],
      "ladder": {
        "track": "game",
        "rung": "dealers",
        "moves": [
          {
            "ep": 5,
            "dir": "side",
            "text": "Spots Brandon at the arcade and calls it in."
          },
          {
            "ep": 9,
            "dir": "out",
            "text": "Quits the Pit with D'Angelo's blessing."
          },
          {
            "ep": 10,
            "dir": "out",
            "text": "Gives the police a statement and is sent to the country."
          },
          {
            "ep": 12,
            "dir": "out",
            "text": "Comes back to the Pit and is killed on Stringer's order."
          }
        ]
      },
      "pathNote": "He tried the only other exit, which was leaving. Coming back made him a loose end."
    },
    {
      "id": "sterling",
      "name": "Sterling",
      "short": "Sterling",
      "actor": "Curtis Montez",
      "faction": "barksdale",
      "unit": "The Pit",
      "tier": 3,
      "title": "Keeps the Pit stash",
      "role": "Pit dealer who keeps the crew's stash and hands vials to the runners",
      "roleEnd": "Moved off the stash; back with the Pit crew by the finale",
      "reportsTo": "dangelo",
      "firstEp": 3,
      "status": [
        {
          "ep": 3,
          "s": "injured",
          "note": "Shot in the knee by Omar"
        },
        {
          "ep": 6,
          "s": "demoted",
          "note": "Moved off the stash for skimming"
        }
      ],
      "bio": "Keeps the Pit crew's stash. Omar shoots him in the knee when he won't say where it is hidden. Caught skimming with Cass, he is quietly moved off his post by D'Angelo rather than reported up the chain.",
      "moments": [
        {
          "ep": 3,
          "text": "Shot in the knee by Omar for refusing to reveal the stash."
        },
        {
          "ep": 6,
          "text": "Caught skimming with Cass; D'Angelo quietly reassigns them."
        },
        {
          "ep": 13,
          "text": "Swings a bat alongside Bodie and Poot against a rival crew."
        }
      ],
      "ladder": {
        "track": "game",
        "rung": "stash",
        "moves": [
          {
            "ep": 3,
            "dir": "side",
            "text": "Shot in the knee by Omar for refusing to give up the stash."
          },
          {
            "ep": 6,
            "dir": "down",
            "text": "Caught skimming with Cass. D'Angelo quietly moves them off their posts."
          }
        ]
      }
    },
    {
      "id": "cass",
      "name": "Cass",
      "short": "Cass",
      "actor": null,
      "faction": "barksdale",
      "unit": "The Pit",
      "tier": 3,
      "title": "Pit lookout",
      "role": "Lookout for the Pit crew",
      "roleEnd": "Reassigned after skimming (ep 6)",
      "reportsTo": "dangelo",
      "firstEp": 6,
      "status": [
        {
          "ep": 6,
          "s": "demoted",
          "note": "Moved off her post for skimming"
        }
      ],
      "bio": "A girl who works as a lookout for D'Angelo's Pit crew. While D'Angelo is holding back pay on Stringer's orders to flush out informants, he sees her with groceries and learns that she and Sterling have been selling small amounts on the side. He protects them by quietly moving them elsewhere.",
      "moments": [
        {
          "ep": 6,
          "text": "Caught skimming with Sterling; D'Angelo covers for them and reassigns them."
        }
      ],
      "ladder": {
        "track": "game",
        "rung": "lookouts",
        "moves": [
          {
            "ep": 6,
            "dir": "side",
            "text": "Caught skimming with Sterling. D'Angelo moves her and reports no one."
          }
        ]
      }
    },
    {
      "id": "ronniemo",
      "name": "Ronnie Mo",
      "full": "Ronald Watkins",
      "short": "Ronnie Mo",
      "actor": "Jarvis George",
      "faction": "barksdale",
      "unit": "The Towers",
      "tier": 2,
      "title": "Crew chief, Tower 851",
      "role": "Crew chief of Tower 851, just moved up from running the Pit",
      "roleEnd": "Sentenced to 15 years",
      "reportsTo": "stringer",
      "firstEp": 2,
      "status": [
        {
          "ep": 13,
          "s": "convicted",
          "note": "Swept up in the final warrants; 15 years"
        }
      ],
      "bio": "Ran the Pit, with Bodie, Poot and Wallace under him, until he was moved up to his own tower just as D'Angelo was sent down. He is seen flirting with dancers at Orlando's. Herc picks him up when the case closes, and prior felonies get him 15 years.",
      "moments": [
        {
          "ep": 1,
          "text": "D'Angelo takes over the Pit crew Ronnie Mo ran before his move up to a tower."
        },
        {
          "ep": 13,
          "text": "Arrested by Herc and sentenced to 15 years."
        }
      ],
      "ladder": {
        "track": "game",
        "rung": "crewchief",
        "moves": [
          {
            "ep": 1,
            "dir": "up",
            "text": "Moved up from running the Pit to his own tower as D'Angelo is sent down."
          },
          {
            "ep": 13,
            "dir": "out",
            "text": "Picked up by Herc in the final sweep; 15 years."
          }
        ]
      }
    },
    {
      "id": "kevin",
      "name": "Kevin Johnston",
      "short": "Kevin",
      "actor": "Jimmy Jelani Manners",
      "faction": "barksdale",
      "unit": "The Towers",
      "tier": 3,
      "title": "Tower runner",
      "role": "Teenage runner in the towers",
      "roleEnd": "Arrested with a resupply package (ep 7)",
      "reportsTo": "stinkum",
      "firstEp": 2,
      "status": [
        {
          "ep": 2,
          "s": "injured",
          "note": "Lost the sight in one eye after Prez hit him"
        },
        {
          "ep": 7,
          "s": "arrested",
          "note": "Caught carrying a resupply package"
        }
      ],
      "bio": "A teenager from the towers whom Prez pistol-whips during a drunken late-night police visit, costing him the sight in one eye. Later caught carrying a resupply package for Stinkum, he mocks Daniels' offer to help him get out.",
      "moments": [
        {
          "ep": 2,
          "text": "Pistol-whipped by Prez for leaning on a police car; loses the sight in one eye."
        },
        {
          "ep": 7,
          "text": "Arrested with the resupply while Stinkum is let go; refuses to cooperate."
        }
      ],
      "ladder": {
        "track": "game",
        "rung": "stash",
        "moves": [
          {
            "ep": 7,
            "dir": "out",
            "text": "Arrested with the package while Stinkum is let go to protect the wire."
          }
        ]
      }
    },
    {
      "id": "puddin",
      "name": "Puddin'",
      "short": "Puddin'",
      "actor": "De'Rodd Hearns",
      "faction": "barksdale",
      "unit": "The Towers",
      "tier": 3,
      "title": "Tower dealer",
      "role": "Young dealer in the towers (background appearances)",
      "roleEnd": "Works under Bodie in the towers",
      "reportsTo": null,
      "firstEp": 11,
      "status": [],
      "bio": "A young dealer in the Franklin Terrace towers. In the final episode Bodie runs his tower trade through him.",
      "moments": [
        {
          "ep": 13,
          "text": "Works under Bodie in the towers."
        }
      ],
      "ladder": {
        "track": "game",
        "rung": "dealers",
        "moves": [
          {
            "ep": 13,
            "dir": "side",
            "text": "Works the towers under Bodie."
          }
        ]
      }
    },
    {
      "id": "browning",
      "name": "Marvin Browning",
      "short": "Browning",
      "actor": "Jeorge Watson",
      "faction": "barksdale",
      "unit": "Street crews",
      "tier": 3,
      "title": "Hand-to-hand dealer",
      "role": "Barksdale hand-to-hand dealer",
      "roleEnd": "Jailed; from county jail he warns the organization about Orlando's arrest (ep 10)",
      "reportsTo": null,
      "firstEp": 4,
      "status": [
        {
          "ep": 4,
          "s": "arrested",
          "note": "Jailed; refused a deal"
        }
      ],
      "bio": "A Barksdale dealer arrested after undercover hand-to-hand buys. He turns down McNulty and Greggs' offer of a deal and takes the time instead. From jail he spots the newly arrested Orlando and phones it in to the organization.",
      "moments": [
        {
          "ep": 4,
          "text": "Refuses a deal at his hearing despite facing a stiff sentence."
        },
        {
          "ep": 10,
          "text": "Spots Orlando in county jail and tips off the organization."
        }
      ],
      "ladder": {
        "track": "game",
        "rung": "dealers",
        "moves": [
          {
            "ep": 4,
            "dir": "out",
            "text": "Refuses a deal at his hearing and takes the time."
          },
          {
            "ep": 10,
            "dir": "side",
            "text": "From jail, spots the arrested Orlando and warns the organization."
          }
        ]
      }
    },
    {
      "id": "brianna",
      "name": "Brianna Barksdale",
      "short": "Brianna",
      "actor": "Michael Hyatt",
      "faction": "barksdale",
      "unit": "Family",
      "tier": 2,
      "title": "Avon's sister; family adviser",
      "role": "Avon's sister and D'Angelo's mother; a family adviser on the business (first seen ep 12)",
      "roleEnd": "Handles the money while Avon is in prison",
      "reportsTo": null,
      "firstEp": 12,
      "status": [],
      "bio": "Avon's sister and D'Angelo's mother, who advises on the family business and helps manage its money. She is furious with Avon for sending D'Angelo on the drug run that got him arrested. She then visits D'Angelo in jail and persuades him that turning on Avon would hurt the whole family.",
      "moments": [
        {
          "ep": 12,
          "text": "Brings D'Angelo lunch in the Pit; later blasts Avon for letting him get arrested."
        },
        {
          "ep": 13,
          "text": "Agrees to handle the money while Stringer handles product; talks D'Angelo out of cooperating."
        }
      ],
      "offLadder": "Family, not rank. By the finale she handles the organization's money, and she keeps D'Angelo from talking."
    },
    {
      "id": "orlando",
      "name": "Orlando Blocker",
      "full": "Wendell Blocker",
      "short": "Orlando",
      "actor": "Clayton LeBouef",
      "faction": "barksdale",
      "unit": "Fronts & money",
      "tier": 2,
      "title": "Front man, Orlando's club",
      "role": "Front man; runs Orlando's strip club, where the liquor license is in his name",
      "roleEnd": "Killed in the buy-bust ambush (ep 10)",
      "reportsTo": "avon",
      "firstEp": 1,
      "status": [
        {
          "ep": 10,
          "s": "dead",
          "note": "Killed in the buy-bust ambush after turning informant"
        }
      ],
      "bio": "Runs the strip club that serves as Avon's main front and office, useful to Avon only because his clean record keeps the liquor license. He wants into the drug trade, is beaten by Avon for trying, then is arrested buying cocaine from an undercover trooper and gives up Avon's name. The organization cuts him loose and he is killed during a police buy-bust.",
      "moments": [
        {
          "ep": 7,
          "text": "Pitches D'Angelo on selling cocaine behind Avon's back."
        },
        {
          "ep": 8,
          "text": "Beaten by Avon in front of the dancers for thinking about dealing."
        },
        {
          "ep": 10,
          "text": "Arrested by state police, informs on Avon, and is shot dead in the ambush where Greggs is wounded."
        }
      ],
      "offLadder": "His value is a clean record: the club's liquor license is in his name. He wants into the drug side, and it gets him killed."
    },
    {
      "id": "levy",
      "name": "Maurice Levy",
      "short": "Levy",
      "actor": "Michael Kostroff",
      "faction": "law",
      "unit": "Defense bar",
      "tier": 2,
      "title": "Barksdale defense attorney",
      "role": "The Barksdale Organization's lawyer on retainer",
      "roleEnd": "Still the organization's lawyer; negotiated the end-of-season pleas",
      "reportsTo": null,
      "firstEp": 1,
      "status": [],
      "bio": "The defense attorney the Barksdales keep on retainer, who represents their people and advises Avon and Stringer on countering the police. He wins D'Angelo's acquittal, gets Bodie released and limits Savino's charges. When the case closes in, he tells Avon and Stringer to tie up loose ends and lines up plea deals.",
      "moments": [
        {
          "ep": 1,
          "text": "Wins D'Angelo's acquittal at the Pooh Blanchard trial."
        },
        {
          "ep": 2,
          "text": "Stops D'Angelo from incriminating himself over the Gant letter."
        },
        {
          "ep": 6,
          "text": "Gets Bodie released in juvenile court."
        },
        {
          "ep": 10,
          "text": "Visits the jailed Orlando only to take his name off the club's liquor license."
        },
        {
          "ep": 13,
          "text": "Negotiates fixed-sentence pleas, including Avon's seven years."
        }
      ],
      "offLadder": "The organization's lawyer on retainer. He advises Avon and Stringer and represents their people, but he isn't in the chain of command."
    },
    {
      "id": "omar",
      "name": "Omar Little",
      "short": "Omar",
      "actor": "Michael K. Williams",
      "faction": "street",
      "unit": "Omar's crew",
      "tier": 1,
      "title": "Stick-up man",
      "role": "Independent stick-up man who robs drug dealers",
      "roleEnd": "Left Baltimore; seen robbing a dealer in New York",
      "reportsTo": null,
      "firstEp": 3,
      "status": [
        {
          "ep": 9,
          "s": "injured",
          "note": "Wounded by Wee-Bey"
        },
        {
          "ep": 10,
          "s": "gone",
          "note": "Left Baltimore for New York"
        }
      ],
      "bio": "A shotgun-carrying stick-up man with a strict code who robs dealers and leaves civilians alone. His robbery of the Pit stash starts a war: the Barksdales kill his crewmate Bailey and torture his boyfriend Brandon to death. Omar strikes back by feeding the police on Bird, killing Stinkum and nearly killing Avon before leaving town.",
      "moments": [
        {
          "ep": 3,
          "text": "Robs the Pit stash with Brandon and Bailey and shoots Sterling in the knee."
        },
        {
          "ep": 6,
          "text": "Identifies Brandon's body at the morgue and offers to testify in the Gant case."
        },
        {
          "ep": 8,
          "text": "Ambushes Stinkum and Wee-Bey, killing Stinkum."
        },
        {
          "ep": 9,
          "text": "Trades stolen drugs to Prop Joe for Avon's pager number; his ambush on Avon fails and he is wounded."
        },
        {
          "ep": 10,
          "text": "Sees through Stringer's truce offer and takes a bus to New York."
        }
      ],
      "offLadder": "Omar robs the game instead of climbing it. He answers to no one but his own code."
    },
    {
      "id": "brandon",
      "name": "Brandon Wright",
      "short": "Brandon",
      "actor": "Michael Kevin Darnall",
      "faction": "street",
      "unit": "Omar's crew",
      "tier": 2,
      "title": "Omar's partner",
      "role": "Stick-up man in Omar's crew; Omar's boyfriend",
      "roleEnd": "Tortured and killed by Barksdale soldiers (ep 5)",
      "reportsTo": "omar",
      "firstEp": 3,
      "status": [
        {
          "ep": 5,
          "s": "dead",
          "note": "Tortured and killed by Barksdale soldiers"
        }
      ],
      "bio": "Omar's boyfriend and partner in the stick-up crew. He lets Omar's name slip during the Pit robbery, which puts the crew in Avon's sights. Spotted at an arcade by Wallace and Poot, he is abducted, tortured and killed, and his body is left on display in the low-rises.",
      "moments": [
        {
          "ep": 3,
          "text": "Uses Omar's name during the Pit robbery."
        },
        {
          "ep": 5,
          "text": "Spotted at an arcade by Wallace and Poot and taken by Stringer's crew."
        },
        {
          "ep": 6,
          "text": "His mutilated body is found on a car outside Wallace's building."
        }
      ]
    },
    {
      "id": "bailey",
      "name": "John Bailey",
      "short": "Bailey",
      "actor": "Lance Williams",
      "faction": "street",
      "unit": "Omar's crew",
      "tier": 2,
      "title": "Omar's crew",
      "role": "Stick-up man in Omar's crew",
      "roleEnd": "Killed off-screen while visiting relatives (reported ep 5)",
      "reportsTo": "omar",
      "firstEp": 3,
      "status": [
        {
          "ep": 5,
          "s": "dead",
          "note": "Killed off-screen under Avon's bounty"
        }
      ],
      "bio": "The third member of Omar's crew in the Pit robbery, uneasy around Omar and Brandon. After Avon's bounty goes out he is killed off-screen while visiting relatives. Wee-Bey takes responsibility for it.",
      "moments": [
        {
          "ep": 3,
          "text": "Takes part in the Pit stash robbery."
        },
        {
          "ep": 5,
          "text": "McNulty tells Omar that Bailey has been killed."
        }
      ]
    },
    {
      "id": "propjoe",
      "name": "Proposition Joe",
      "alias": "Prop Joe",
      "short": "Prop Joe",
      "actor": "Robert F. Chew",
      "faction": "street",
      "unit": "East Side",
      "tier": 2,
      "title": "East Side drug boss",
      "role": "Eastside drug boss and Avon's rival",
      "roleEnd": "Eastside drug boss and Avon's rival",
      "reportsTo": null,
      "firstEp": 9,
      "status": [],
      "bio": "An Eastside drug boss who prefers a deal to a fight. At the annual East-West basketball game he goads Avon into going double-or-nothing, then wins with a late ringer. He quietly sells Omar Avon's pager number for a share of stolen Barksdale drugs, and later sets up the truce meeting between Omar and Stringer.",
      "moments": [
        {
          "ep": 9,
          "text": "Wins the East-West basketball bet against Avon; gives Omar Avon's pager number in exchange for stolen drugs."
        },
        {
          "ep": 10,
          "text": "Arranges the truce meeting between Omar and Stringer."
        }
      ],
      "offLadder": "He runs the East Side. A rival and a dealmaker, he sells Omar Avon's pager number and then brokers a truce."
    },
    {
      "id": "bubbles",
      "name": "Bubbles",
      "short": "Bubbles",
      "initials": "BU",
      "actor": "Andre Royo",
      "faction": "street",
      "unit": "Informants",
      "tier": 1,
      "title": "Kima's informant",
      "role": "Heroin addict and confidential informant for Det. Kima Greggs",
      "roleEnd": "Still an informant; using again after a stretch clean",
      "reportsTo": null,
      "firstEp": 1,
      "status": [],
      "bio": "A homeless heroin addict who knows the street in detail and informs for Det. Kima Greggs. After the Pit crew beats his friend Johnny, he helps the detail identify Barksdale dealers and track Omar. He gets clean for a while, but by the end of the season he is using again.",
      "moments": [
        {
          "ep": 1,
          "text": "Offers Greggs information on the Barksdales after Johnny's beating."
        },
        {
          "ep": 2,
          "text": "Marks Barksdale dealers for police photographers by 'selling' them red hats."
        },
        {
          "ep": 3,
          "text": "Coaches Sydnor for undercover buys and witnesses Omar's robbery of the Pit."
        },
        {
          "ep": 9,
          "text": "Starts getting clean in his sister's basement."
        },
        {
          "ep": 11,
          "text": "Beaten in custody by Det. Holley, then works out that Wee-Bey and Little Man are the likely shooters."
        }
      ],
      "offLadder": "A paid informant for Kima Greggs. He works for the police, not in it."
    },
    {
      "id": "johnny",
      "name": "Johnny Weeks",
      "short": "Johnny",
      "actor": "Leo Fitzpatrick",
      "faction": "street",
      "unit": "Addicts",
      "tier": 2,
      "title": "Addict; Bubbles' partner",
      "role": "Heroin addict; Bubbles' protege",
      "roleEnd": "Back on the hustle with Bubbles",
      "reportsTo": null,
      "firstEp": 1,
      "status": [
        {
          "ep": 6,
          "s": "arrested",
          "note": "Arrested buying drugs"
        },
        {
          "ep": 7,
          "s": "active",
          "note": "Charge dropped on condition of treatment"
        }
      ],
      "bio": "A young heroin addict who runs street scams with his mentor Bubbles. The Pit crew beats him badly for passing counterfeit bills, which pushes Bubbles to inform on the Barksdales. His later possession charge is dropped on condition he enters treatment, but by the finale he is back on the hustle.",
      "moments": [
        {
          "ep": 1,
          "text": "Beaten by Bodie, Poot and Wallace for passing fake money in the Pit."
        },
        {
          "ep": 6,
          "text": "Out of the hospital, runs a copper-pipe scam with Bubbles and is arrested buying drugs."
        },
        {
          "ep": 7,
          "text": "Charge dropped as a favor to Bubbles on condition of treatment; goes to an NA meeting."
        },
        {
          "ep": 13,
          "text": "Back on the hustle with Bubbles."
        }
      ]
    },
    {
      "id": "walon",
      "name": "Walon",
      "short": "Walon",
      "initials": "WA",
      "actor": "Steve Earle",
      "faction": "civilian",
      "unit": "Recovery",
      "tier": 3,
      "title": "NA speaker; Bubbles' sponsor",
      "role": "Recovering addict who speaks at Narcotics Anonymous",
      "roleEnd": "Supporting Bubbles as his NA sponsor",
      "reportsTo": null,
      "firstEp": 7,
      "status": [],
      "bio": "A recovering addict whose talk at an NA meeting inspires Bubbles. Bubbles runs into him again at the towers, where Walon is trying to get his nephew to go straight. Walon then supports Bubbles' attempt to stay clean, warning that getting clean is the easy part.",
      "moments": [
        {
          "ep": 7,
          "text": "Speaks at the NA meeting Bubbles and Johnny attend."
        },
        {
          "ep": 10,
          "text": "Meets the newly clean Bubbles and tells him that living clean afterward is the hard part."
        }
      ]
    },
    {
      "id": "roberto",
      "name": "Roberto",
      "short": "Roberto",
      "initials": "RO",
      "actor": null,
      "faction": "street",
      "unit": "Supply",
      "tier": 3,
      "title": "Supplier, New York",
      "role": "The Barksdales' Dominican supplier in New York (named in ep 13; never seen)",
      "roleEnd": "Still the organization's supplier",
      "reportsTo": null,
      "firstEp": 13,
      "status": [],
      "bio": "The Barksdales' Dominican supplier in New York, never seen on screen. In the finale Avon wants Brianna to get more product from him, and better quality.",
      "moments": [
        {
          "ep": 13,
          "text": "Avon sends word through Brianna that he wants more and better product from Roberto."
        }
      ]
    },
    {
      "id": "pooh",
      "name": "Pooh Blanchard",
      "short": "Pooh",
      "actor": null,
      "faction": "street",
      "unit": "Victims",
      "tier": 3,
      "title": "Killed by D'Angelo, pre-season",
      "role": "Dealer shot by D'Angelo before the season (never seen on screen)",
      "roleEnd": "Dead; D'Angelo acquitted of his murder",
      "reportsTo": null,
      "firstEp": 1,
      "status": [
        {
          "ep": 0,
          "s": "dead",
          "note": "Shot by D'Angelo before the season"
        }
      ],
      "bio": "The dealer D'Angelo shot in the lobby of the 221 tower before the season begins; he is never seen. D'Angelo tells Avon that Pooh came at him. Because the shooting happened in front of witnesses, it leads to D'Angelo's trial and his demotion.",
      "moments": [
        {
          "ep": 1,
          "text": "D'Angelo is acquitted of his murder."
        }
      ]
    },
    {
      "id": "donette",
      "name": "Donette",
      "short": "Donette",
      "initials": "DO",
      "actor": "Shamyl Brown",
      "faction": "civilian",
      "unit": "Family",
      "tier": 2,
      "title": "D'Angelo's girlfriend",
      "role": "D'Angelo's girlfriend and the mother of his baby son",
      "roleEnd": "Still D'Angelo's girlfriend; he is in prison",
      "reportsTo": null,
      "firstEp": 2,
      "status": [],
      "bio": "D'Angelo's girlfriend and the mother of his baby son, who often worries about money and presses him for more. She meets Stringer at a family party and brushes off D'Angelo's doubts about the life over dinner. D'Angelo cheats on her with Shardene and pulls away from her as the season goes on.",
      "moments": [
        {
          "ep": 2,
          "text": "Goes with D'Angelo and their son to Avon's family party."
        },
        {
          "ep": 5,
          "text": "Dines with D'Angelo at an upscale restaurant and dismisses his worry about not fitting in."
        },
        {
          "ep": 10,
          "text": "D'Angelo ignores her plans for their future and walks out."
        }
      ]
    },
    {
      "id": "shardene",
      "name": "Shardene Innes",
      "short": "Shardene",
      "actor": "Wendy Grantham",
      "faction": "civilian",
      "unit": "Orlando's club",
      "tier": 2,
      "title": "Dancer at Orlando's",
      "role": "Dancer at Orlando's",
      "roleEnd": "Police informant working with Freamon; has left D'Angelo",
      "reportsTo": null,
      "firstEp": 1,
      "status": [
        {
          "ep": 9,
          "s": "cooperating",
          "note": "Informing for the detail"
        }
      ],
      "bio": "A dancer at Orlando's who starts dating D'Angelo and moves in with him. When Freamon and Greggs show her the body of her friend Keisha, dumped after a Barksdale party, she leaves D'Angelo and agrees to help the police. She wears a wire in the club and maps Avon's office so the detail can hide a camera there.",
      "moments": [
        {
          "ep": 1,
          "text": "Meets D'Angelo at Orlando's."
        },
        {
          "ep": 6,
          "text": "Her relationship with D'Angelo turns serious."
        },
        {
          "ep": 9,
          "text": "Shown Keisha's body; agrees to help the police and moves out."
        },
        {
          "ep": 12,
          "text": "Wears a wire and paces off Avon's office for the hidden camera."
        }
      ]
    },
    {
      "id": "keisha",
      "name": "Keisha",
      "short": "Keisha",
      "initials": "KE",
      "actor": null,
      "faction": "civilian",
      "unit": "Orlando's club",
      "tier": 3,
      "title": "Dancer at Orlando's",
      "role": "Dancer at Orlando's; Shardene's friend",
      "roleEnd": "Died of an apparent overdose at Stinkum's party; body dumped (ep 8)",
      "reportsTo": null,
      "firstEp": 8,
      "status": [
        {
          "ep": 8,
          "s": "dead",
          "note": "Died of an apparent overdose at Stinkum's party"
        }
      ],
      "bio": "A dancer at Orlando's who goes to the party for Stinkum's promotion. Wee-Bey takes her into a back room, and D'Angelo later finds her dead of an apparent overdose. Her body is rolled in a rug and dumped, and the police use her death to turn Shardene.",
      "moments": [
        {
          "ep": 8,
          "text": "Dies at Stinkum's party after Wee-Bey takes her into a back room."
        },
        {
          "ep": 9,
          "text": "Her body is found in a dumpster; Freamon and Greggs show it to Shardene."
        }
      ]
    },
    {
      "id": "nakeesha",
      "name": "Nakeesha Lyles",
      "short": "Lyles",
      "actor": "Ingrid Cornell",
      "faction": "civilian",
      "unit": "Witnesses",
      "tier": 2,
      "title": "Trial witness; security guard",
      "role": "Tower 221 security guard; witness at D'Angelo's murder trial",
      "roleEnd": "Murdered as a loose end (found ep 12)",
      "reportsTo": null,
      "firstEp": 1,
      "status": [
        {
          "ep": 12,
          "s": "dead",
          "note": "Found murdered as a loose end"
        }
      ],
      "bio": "A security guard in the 221 tower who saw D'Angelo shoot Pooh Blanchard and picked him out of a photo array. Bought off or scared by the organization, she recants on the stand and D'Angelo walks. After Levy tells Avon and Stringer to tie up loose ends, she is found murdered.",
      "moments": [
        {
          "ep": 1,
          "text": "Recants her identification of D'Angelo on the stand, claiming she saw someone else do it."
        },
        {
          "ep": 12,
          "text": "Found murdered; the detail realizes Wallace is in danger."
        }
      ]
    },
    {
      "id": "gant",
      "name": "William Gant",
      "short": "Gant",
      "actor": "Larry Hull",
      "faction": "civilian",
      "unit": "Witnesses",
      "tier": 2,
      "title": "Trial witness",
      "role": "Maintenance man and witness who testifies against D'Angelo",
      "roleEnd": "Shot dead after testifying (found ep 1)",
      "reportsTo": null,
      "firstEp": 1,
      "status": [
        {
          "ep": 1,
          "s": "dead",
          "note": "Shot dead after testifying"
        }
      ],
      "bio": "A working man who saw D'Angelo shoot Pooh Blanchard and, with Barksdale men watching in court, identifies him anyway. He is found shot dead near the Pit soon after, a warning to other witnesses. Bird is arrested for the killing; Wee-Bey later falsely claims it.",
      "moments": [
        {
          "ep": 1,
          "text": "Identifies D'Angelo in court; later found shot dead near the Pit."
        },
        {
          "ep": 7,
          "text": "Bird is arrested for his murder after a ballistics match."
        }
      ]
    },
    {
      "id": "deirdre",
      "name": "Deirdre Kresson",
      "short": "Kresson",
      "actor": "Takara Collins",
      "faction": "civilian",
      "unit": "Victims",
      "tier": 2,
      "title": "Avon's ex; killed pre-season",
      "role": "Murder victim (killed before the season); Avon's former girlfriend",
      "roleEnd": "Her murder is solved through D'Angelo's statement (ep 13)",
      "reportsTo": null,
      "firstEp": 4,
      "status": [
        {
          "ep": 0,
          "s": "dead",
          "note": "Murdered before the season"
        }
      ],
      "bio": "A young woman shot in her apartment before the season starts, in an old case Bunk and McNulty reopen. She was Avon's jealous ex-girlfriend and had threatened to go to the police. D'Angelo first brags that he killed her, but later tells detectives he only delivered drugs to her while Wee-Bey shot her through the kitchen window.",
      "moments": [
        {
          "ep": 4,
          "text": "Bunk and McNulty reconstruct her murder and find a bullet and casing the first detectives missed."
        },
        {
          "ep": 13,
          "text": "D'Angelo tells detectives that Wee-Bey tapped on her kitchen window and shot her."
        }
      ]
    },
    {
      "id": "frazier",
      "name": "Warren Frazier",
      "short": "Frazier",
      "actor": "Dick Stilwell",
      "faction": "police",
      "unit": "Command staff",
      "tier": 2,
      "title": "Police Commissioner",
      "role": "Commissioner, head of the department",
      "roleEnd": "Commissioner",
      "reportsTo": null,
      "firstEp": 11,
      "status": [],
      "bio": "Baltimore's police commissioner, seen only in the aftermath of Kima Greggs' shooting. He visits the hospital with the brass but declines to speak with Kima's partner Cheryl and leaves that to Burrell. The department answers the shooting with citywide raids staged for the press.",
      "moments": [
        {
          "ep": 11,
          "text": "Comes to the hospital after Greggs is shot. He declines to talk to Cheryl and leaves it to Burrell, which disappoints Carver."
        },
        {
          "ep": 11,
          "text": "Gets his photo opportunity with the guns, drugs and cash seized in the retaliatory citywide raids."
        }
      ],
      "ladder": {
        "track": "job",
        "rung": "commissioner",
        "moves": []
      }
    },
    {
      "id": "burrell",
      "name": "Ervin Burrell",
      "short": "Burrell",
      "actor": "Frankie Faison",
      "faction": "police",
      "unit": "Command staff",
      "tier": 1,
      "title": "Deputy Commissioner, Operations",
      "role": "Deputy Commissioner for Operations; runs day-to-day policing",
      "roleEnd": "Deputy Commissioner for Operations",
      "reportsTo": "frazier",
      "firstEp": 1,
      "status": [],
      "bio": "Deputy Commissioner for Operations who sets up the Barksdale detail only to placate Judge Phelan. He wants it quick, cheap and good for headlines: buy-busts and seizures, no wiretaps. When the wire starts leading to political money, he orders Senator Davis's cash returned, tries to shut the case down, uses Carver as an informant inside the detail, and threatens Daniels with an old FBI file.",
      "moments": [
        {
          "ep": 1,
          "text": "After Phelan calls him, he orders Homicide and Narcotics briefings on Avon Barksdale. He then tells Daniels to run a fast, cheap buy-bust case with no dialed number recorders, Kel recorders or wiretaps."
        },
        {
          "ep": 8,
          "text": "After the detail finds cash on Senator Davis's driver, he orders the money returned and says he is shutting the case down. Phelan stops him by threatening a contempt charge."
        },
        {
          "ep": 10,
          "text": "Overrules Daniels and orders the buy-bust using Orlando. It ends with Orlando dead and Greggs shot."
        },
        {
          "ep": 12,
          "text": "Cuts the detail's manpower and is leaned on by Senator Davis. He threatens Daniels with the FBI's findings on his assets, and Daniels refuses to back down."
        },
        {
          "ep": 13,
          "text": "Promotes Carver, his informant inside the detail, to sergeant."
        }
      ],
      "ladder": {
        "track": "job",
        "rung": "deputy",
        "moves": []
      },
      "pathNote": "One rung from the top. He answers to the commissioner, and to anyone with political weight."
    },
    {
      "id": "rawls",
      "name": "William Rawls",
      "short": "Rawls",
      "actor": "John Doman",
      "faction": "police",
      "unit": "Homicide",
      "tier": 1,
      "title": "Major, Homicide",
      "role": "Major commanding the Homicide Unit",
      "roleEnd": "Major commanding the Homicide Unit",
      "reportsTo": "burrell",
      "firstEp": 1,
      "status": [],
      "bio": "Commander of the Homicide Unit, obsessed with his clearance rate and furious that McNulty went over his head to a judge. He dumps McNulty and the weak Santangelo on the detail, uses Santangelo to spy on McNulty, and pushes for early murder warrants that would have wrecked the case. After Greggs is shot he takes charge of the scene and tells a shattered McNulty that it was not his fault.",
      "moments": [
        {
          "ep": 1,
          "text": "Enraged that McNulty went around the chain of command, he makes him type up the Homicide briefing on Barksdale overnight."
        },
        {
          "ep": 4,
          "text": "Through Landsman, offers McNulty a deal: wrap up the detail in two weeks and come back to Homicide with a clean slate."
        },
        {
          "ep": 7,
          "text": "Gives Santangelo an ultimatum: clear one of his open cases by the end of the day, inform on McNulty, or leave Homicide."
        },
        {
          "ep": 11,
          "text": "Clears non-Homicide personnel from the scene of Greggs' shooting, turns back the twisted street sign, and tells McNulty the shooting is not his fault."
        },
        {
          "ep": 13,
          "text": "Congratulates McNulty on the case, then asks where he does not want to go and sends him to the Marine Unit. He brings Freamon into Homicide and puts Santangelo back on patrol."
        }
      ],
      "ladder": {
        "track": "job",
        "rung": "major",
        "moves": []
      }
    },
    {
      "id": "foerster",
      "name": "Raymond Foerster",
      "short": "Foerster",
      "actor": "Richard DeAngelis",
      "faction": "police",
      "unit": "Narcotics",
      "tier": 2,
      "title": "Major, Narcotics",
      "role": "Major commanding the Narcotics Unit",
      "roleEnd": "Major commanding the Narcotics Unit",
      "reportsTo": "burrell",
      "firstEp": 1,
      "status": [],
      "bio": "Major in charge of the Narcotics Unit and Daniels' commanding officer. He puts Daniels and his squad on the Barksdale detail. As the case drags on, he backs Burrell's push for quick buy-busts over Daniels' wiretap strategy.",
      "moments": [
        {
          "ep": 1,
          "text": "After Phelan's inquiry reaches the brass, he has Daniels prepare the Narcotics briefing on Barksdale and tells him to put together a detail."
        },
        {
          "ep": 10,
          "text": "Sits in when Burrell overrules Daniels and orders the buy-bust using Orlando."
        },
        {
          "ep": 11,
          "text": "Visibly shaken at the hospital after Greggs is shot. Burrell tasks him, Rawls and Daniels with organizing citywide raids."
        }
      ],
      "ladder": {
        "track": "job",
        "rung": "major",
        "moves": []
      }
    },
    {
      "id": "valchek",
      "name": "Stanislaus Valchek",
      "short": "Valchek",
      "actor": "Al Brown",
      "faction": "police",
      "unit": "Southeastern District",
      "tier": 2,
      "title": "Major, Southeastern District",
      "role": "Major commanding the Southeastern District",
      "roleEnd": "Major commanding the Southeastern District",
      "reportsTo": "burrell",
      "firstEp": 3,
      "status": [],
      "bio": "Commander of the Southeastern District and Prez's father-in-law, whose influence has kept Prez's troubled career alive. After Prez blinds a teenager, he argues to Burrell that confining Prez to a desk would look like an admission of guilt, and he tells Daniels that helping Prez will leave Valchek owing him a favor.",
      "moments": [
        {
          "ep": 2,
          "text": "Lt. Cantrell tells Daniels that Valchek, Prez's father-in-law, has been protecting Prez's career."
        },
        {
          "ep": 3,
          "text": "In Burrell's office he argues against confining Prez to office work and says he will owe Daniels a favor for helping his son-in-law."
        },
        {
          "ep": 3,
          "text": "According to the fandom synopsis, he supplies the detail with two unmarked cars and a surveillance van in gratitude."
        }
      ],
      "ladder": {
        "track": "job",
        "rung": "major",
        "moves": []
      }
    },
    {
      "id": "reed",
      "name": "Bobby Reed",
      "short": "Reed",
      "actor": "Tony D. Head",
      "faction": "police",
      "unit": "IID",
      "tier": 2,
      "title": "Major, Internal Investigations",
      "role": "Major commanding the Internal Investigations Division",
      "roleEnd": "Major commanding the Internal Investigations Division",
      "reportsTo": "burrell",
      "firstEp": 3,
      "status": [],
      "bio": "Major commanding the Internal Investigations Division and loyal to Burrell. He keeps Prez off the street pending a grand jury after the Kevin Johnston beating. Later he confronts Daniels for holding back raid targets, which tells Daniels that someone inside the detail is informing.",
      "moments": [
        {
          "ep": 3,
          "text": "Handles the brutality complaint against Prez and keeps him on desk duty until a grand jury clears him."
        },
        {
          "ep": 11,
          "text": "Confronts Daniels for withholding targets from the citywide raids. The shouting match shows Daniels that the brass has an inside source in the detail."
        },
        {
          "ep": 12,
          "text": "Sits in when Burrell tells Daniels the case is effectively over."
        }
      ],
      "ladder": {
        "track": "job",
        "rung": "major",
        "moves": []
      }
    },
    {
      "id": "daniels",
      "name": "Cedric Daniels",
      "short": "Daniels",
      "actor": "Lance Reddick",
      "faction": "police",
      "unit": "The detail",
      "tier": 1,
      "title": "Lieutenant; runs the detail",
      "role": "Narcotics shift lieutenant, handed command of the Barksdale detail",
      "roleEnd": "Still a lieutenant, back in Narcotics; passed over for major",
      "reportsTo": "foerster",
      "firstEp": 1,
      "status": [
        {
          "ep": 13,
          "s": "passed",
          "note": "Passed over for major; back in Narcotics"
        }
      ],
      "bio": "Narcotics lieutenant handed command of the Barksdale detail. He is expected to deliver a fast, painless case and protect a career that has him in line for major. He gradually sides with his detectives and fights for the wiretap, and he defies Burrell even when threatened with an old FBI file on unexplained assets from his Eastern District days. The case puts Avon and D'Angelo in prison, but Daniels is passed over for promotion.",
      "moments": [
        {
          "ep": 1,
          "text": "Given command of the detail with orders to keep it quick and simple. He makes Greggs lead detective and shoots down McNulty's call for a wiretap."
        },
        {
          "ep": 2,
          "text": "Covers for Prez, Herc and Carver after the drunken tower raid, coaching them on a self-defense story. His wife Marla admonishes him for it."
        },
        {
          "ep": 6,
          "text": "Goes over Rawls's head to persuade Burrell to hold off on the D'Angelo murder warrants, which protects the wire."
        },
        {
          "ep": 12,
          "text": "Refuses to back down when Burrell threatens him with the FBI file, saying he will keep working until the court order runs out. He personally arrests Avon Barksdale."
        },
        {
          "ep": 13,
          "text": "Exposes Carver as Burrell's informant. Then he learns that Lt. Cantrell got the promotion to major he had been in line for."
        }
      ],
      "ladder": {
        "track": "job",
        "rung": "lieutenant",
        "moves": [
          {
            "ep": 1,
            "dir": "side",
            "text": "Handed the detail with orders to keep it quick and cheap."
          },
          {
            "ep": 6,
            "dir": "up",
            "text": "Goes over Rawls's head to Burrell to protect the wire, and wins."
          },
          {
            "ep": 12,
            "dir": "side",
            "text": "Refuses to back down when Burrell threatens him with an old FBI file."
          },
          {
            "ep": 13,
            "dir": "down",
            "text": "Passed over: Lt. Cantrell gets the promotion to major."
          }
        ]
      },
      "pathNote": "Next in line for major when the season starts. He delivers Avon Barksdale and is still passed over."
    },
    {
      "id": "cantrell",
      "name": "Walter Cantrell",
      "short": "Cantrell",
      "actor": "Dave Trovato",
      "faction": "police",
      "unit": "Unit not named",
      "tier": 2,
      "title": "Lieutenant; Prez and Sydnor's CO",
      "role": "Lieutenant commanding Prez and Sydnor's unit",
      "roleEnd": "Promoted to major with a district command",
      "reportsTo": null,
      "firstEp": 2,
      "status": [
        {
          "ep": 13,
          "s": "promoted",
          "note": "Promoted to major"
        }
      ],
      "bio": "Lieutenant who agrees to give Daniels his best detective, Sydnor, on condition that Daniels also takes Prez, and who tells Daniels about Valchek's protection of Prez. By the finale he has been made major, the slot Daniels had been in line for.",
      "moments": [
        {
          "ep": 2,
          "text": "Agrees to send Daniels his best man, Sydnor, to balance out Prez, his worst."
        },
        {
          "ep": 13,
          "text": "Now a major, he bumps into Daniels and offers him a move into his new district."
        }
      ],
      "ladder": {
        "track": "job",
        "rung": "lieutenant",
        "moves": [
          {
            "ep": 2,
            "dir": "side",
            "text": "Trades his best detective, Sydnor, to Daniels as the price of taking Prez."
          },
          {
            "ep": 13,
            "dir": "up",
            "to": "major",
            "text": "Promoted to major, the slot Daniels was in line for."
          }
        ]
      }
    },
    {
      "id": "landsman",
      "name": "Jay Landsman",
      "short": "Landsman",
      "actor": "Delaney Williams",
      "faction": "police",
      "unit": "Homicide",
      "tier": 2,
      "title": "Sergeant, Homicide squad",
      "role": "Sergeant supervising a Homicide squad",
      "roleEnd": "Sergeant supervising a Homicide squad",
      "reportsTo": "rawls",
      "firstEp": 1,
      "status": [],
      "bio": "Homicide squad sergeant supervising McNulty, Bunk, Santangelo, Cole, Norris and Holley. He is loyal to Rawls and to the clearance numbers, and gleeful about his detectives' misfortunes. Still, he argues McNulty's case to the major and steers McNulty and Bunk to the Kresson murder, which ties back to the Barksdales.",
      "moments": [
        {
          "ep": 1,
          "text": "Warns McNulty that his behavior could get him reassigned and asks where he would not want to go. McNulty says the marine unit."
        },
        {
          "ep": 4,
          "text": "Makes McNulty work the Deirdre Kresson case, then argues to Rawls that McNulty's flaws are what make him 'good police'. This wins McNulty a deal."
        },
        {
          "ep": 7,
          "text": "Jokingly sends the desperate Santangelo to a psychic. He also joins Daniels and Greggs in beating the uncooperative Bird."
        },
        {
          "ep": 11,
          "text": "Pulls Holley off Bubbles during a brutal interrogation after Greggs' shooting."
        }
      ],
      "ladder": {
        "track": "job",
        "rung": "sergeant",
        "moves": []
      }
    },
    {
      "id": "mcnulty",
      "name": "Jimmy McNulty",
      "short": "McNulty",
      "actor": "Dominic West",
      "faction": "police",
      "unit": "The detail",
      "tier": 1,
      "title": "Homicide detective, on the detail",
      "role": "Homicide detective in Sgt. Landsman's squad, detailed to Daniels",
      "roleEnd": "Exiled to the Marine Unit",
      "reportsTo": "daniels",
      "firstEp": 1,
      "status": [
        {
          "ep": 13,
          "s": "reassigned",
          "note": "Sent to the Marine Unit"
        }
      ],
      "bio": "Talented, insubordinate Homicide detective. His complaint to Judge Phelan after D'Angelo Barksdale's acquittal sets off the whole investigation. Detailed to Daniels' unit, he pushes for the wiretap, uses back channels to Phelan and the FBI, and ruins his standing with Rawls. Separated from his wife Elena and sleeping with ASA Pearlman, he ends the season exiled to the Marine Unit he told Landsman he dreaded.",
      "moments": [
        {
          "ep": 1,
          "text": "After D'Angelo's acquittal, tells Judge Phelan that the department is ignoring Avon Barksdale. This triggers the detail."
        },
        {
          "ep": 3,
          "text": "Refuses to take part in Daniels' raid on the Pit, believing it will sabotage the case."
        },
        {
          "ep": 8,
          "text": "Spots Stringer Bell at a market and has his young sons tail him and take down his license plate."
        },
        {
          "ep": 11,
          "text": "Guilt-stricken and drinking after Greggs is shot. Rawls tells him it was not his fault."
        },
        {
          "ep": 13,
          "text": "Explodes at the FBI and federal prosecutors for wanting to use the dealers to reach politicians. Word gets back to Burrell, and Rawls sends him to the Marine Unit."
        }
      ],
      "ladder": {
        "track": "job",
        "rung": "detective",
        "moves": [
          {
            "ep": 1,
            "dir": "side",
            "text": "Goes over his bosses' heads to Judge Phelan. Rawls ships him to the detail."
          },
          {
            "ep": 2,
            "dir": "down",
            "text": "Rawls has his desk cleared out of Homicide."
          },
          {
            "ep": 4,
            "dir": "side",
            "text": "Refuses Rawls's offer of a clean slate if he wraps the case up in two weeks."
          },
          {
            "ep": 13,
            "dir": "down",
            "text": "Sent to the Marine Unit, the posting he told Landsman he dreaded."
          }
        ]
      },
      "pathNote": "Same rank at the end, worse posting. Every rung above him is someone he went around."
    },
    {
      "id": "bunk",
      "name": "Bunk Moreland",
      "full": "William Moreland",
      "short": "Bunk",
      "actor": "Wendell Pierce",
      "faction": "police",
      "unit": "Homicide",
      "tier": 1,
      "title": "Homicide detective",
      "role": "Homicide detective in Sgt. Landsman's squad; McNulty's partner",
      "roleEnd": "Homicide detective",
      "reportsTo": "landsman",
      "firstEp": 1,
      "status": [],
      "bio": "McNulty's Homicide partner and closest friend, a gifted, dry-witted investigator. He is the primary on the William Gant murder, and with McNulty he re-examines the Deirdre Kresson case, which links back to the Barksdales. He helps protect Omar as a witness and later works the investigation into Greggs' shooting.",
      "moments": [
        {
          "ep": 1,
          "text": "Catches the murder of William Gant, the witness who testified against D'Angelo."
        },
        {
          "ep": 4,
          "text": "At the Kresson apartment, he and McNulty reconstruct the murder while speaking in variations of one expletive, and they find the bullet and casing that earlier detectives missed."
        },
        {
          "ep": 8,
          "text": "Tells Ray Cole there is wire talk on the Stinkum murder so that Omar is shielded. That night, drunk after cheating on his wife, he burns his clothes."
        },
        {
          "ep": 13,
          "text": "Shows Greggs photo arrays in hospital, then gets Wee-Bey to confess to several murders. He and McNulty know the Gant confession is false."
        }
      ],
      "ladder": {
        "track": "job",
        "rung": "detective",
        "moves": []
      }
    },
    {
      "id": "santangelo",
      "name": "Michael Santangelo",
      "short": "Santangelo",
      "actor": "Michael Salconi",
      "faction": "police",
      "unit": "The detail",
      "tier": 2,
      "title": "Homicide detective; Rawls's mole",
      "role": "Homicide detective sent to the detail",
      "roleEnd": "Back in uniform on Western District patrol",
      "reportsTo": "daniels",
      "firstEp": 1,
      "status": [
        {
          "ep": 12,
          "s": "reassigned",
          "note": "Sent back to Homicide"
        },
        {
          "ep": 13,
          "s": "demoted",
          "note": "Back in uniform, Western District"
        }
      ],
      "bio": "One of Homicide's weakest detectives, sent to the detail by Rawls largely to spy on McNulty. Given an ultimatum to clear a case or inform, he is saved when McNulty and Bunk use Omar's tip to solve one of his open murders, and in return he warns McNulty that Rawls is after him. He ends the season back in uniform, patrolling West Baltimore.",
      "moments": [
        {
          "ep": 3,
          "text": "Asks Rawls to let him return to Homicide. Rawls tells him to keep reporting on the detail."
        },
        {
          "ep": 7,
          "text": "Facing Rawls's ultimatum, he consults a psychic on Landsman's joke suggestion. McNulty then hands him a solved case (Denise Redding) from Omar's information."
        },
        {
          "ep": 7,
          "text": "Gratefully tells McNulty that Rawls wants to fire him."
        },
        {
          "ep": 13,
          "text": "Seen on patrol in uniform in West Baltimore in the closing montage."
        }
      ],
      "ladder": {
        "track": "job",
        "rung": "detective",
        "moves": [
          {
            "ep": 3,
            "dir": "side",
            "text": "Reports on McNulty to Rawls."
          },
          {
            "ep": 7,
            "dir": "down",
            "text": "Rawls's ultimatum: clear a case, inform on McNulty, or leave Homicide."
          },
          {
            "ep": 12,
            "dir": "side",
            "text": "Pulled off the detail by Burrell."
          },
          {
            "ep": 13,
            "dir": "down",
            "to": "officer",
            "text": "Put back in uniform on Western District patrol."
          }
        ]
      },
      "pathNote": "Couldn't clear cases and wouldn't keep informing, so he went down a rung."
    },
    {
      "id": "cole",
      "name": "Ray Cole",
      "short": "Cole",
      "actor": "Robert F. Colesberry",
      "faction": "police",
      "unit": "Homicide",
      "tier": 3,
      "title": "Homicide detective",
      "role": "Homicide detective in Sgt. Landsman's squad",
      "roleEnd": "Homicide detective",
      "reportsTo": "landsman",
      "firstEp": 1,
      "status": [],
      "bio": "Veteran Homicide detective in Landsman's squad. He catches the Stinkum murder, which McNulty and Bunk keep him from connecting to Omar. He is second investigator on the shooting of Orlando and Greggs.",
      "moments": [
        {
          "ep": 1,
          "text": "Dozes in the Homicide office while McNulty types his overnight Barksdale briefing (uncredited appearance)."
        },
        {
          "ep": 8,
          "text": "Assigned the Stinkum murder. Bunk and McNulty promise him information from the wire later rather than reveal that Omar was the shooter."
        },
        {
          "ep": 13,
          "text": "With Bunk, asks the recovering Greggs to identify her shooters."
        }
      ],
      "ladder": {
        "track": "job",
        "rung": "detective",
        "moves": []
      }
    },
    {
      "id": "norris",
      "name": "Ed Norris",
      "short": "Norris",
      "actor": "Ed Norris",
      "faction": "police",
      "unit": "Homicide",
      "tier": 3,
      "title": "Homicide detective",
      "role": "Homicide detective in Sgt. Landsman's squad",
      "roleEnd": "Homicide detective",
      "reportsTo": "landsman",
      "firstEp": 6,
      "status": [],
      "bio": "Homicide detective in Landsman's squad. With Holley he works the murder of Omar's lover Brandon and brings McNulty in on the Barksdale link. He is lead investigator on the shooting of Orlando and Greggs and sits in on Wee-Bey's confession. He is played by Ed Norris, who was Baltimore's real police commissioner from 2000 to 2002.",
      "moments": [
        {
          "ep": 6,
          "text": "Works Brandon Wright's murder with Holley and consults McNulty on the Barksdale connection."
        },
        {
          "ep": 11,
          "text": "Lead investigator on the Orlando/Greggs shooting. He interviews Daniels at the hospital."
        },
        {
          "ep": 13,
          "text": "Joins Bunk and ASA Nathan for Wee-Bey's interview and confession."
        }
      ],
      "ladder": {
        "track": "job",
        "rung": "detective",
        "moves": []
      }
    },
    {
      "id": "holley",
      "name": "Vernon Holley",
      "short": "Holley",
      "actor": "Brian Anthony Wilson",
      "faction": "police",
      "unit": "Homicide",
      "tier": 3,
      "title": "Homicide detective",
      "role": "Homicide detective in Sgt. Landsman's squad",
      "roleEnd": "Homicide detective",
      "reportsTo": "landsman",
      "firstEp": 6,
      "status": [],
      "bio": "Physically imposing, short-tempered Homicide detective who partners Norris on the Brandon murder. After Greggs is shot he has her informant Bubbles picked up and beats him in interrogation until Landsman pulls him off.",
      "moments": [
        {
          "ep": 6,
          "text": "Works Brandon Wright's murder with Norris."
        },
        {
          "ep": 11,
          "text": "Plays the tape of Greggs' last transmission at the hospital. Later he beats a handcuffed Bubbles, assuming he is a suspect, until Landsman restrains him."
        }
      ],
      "ladder": {
        "track": "job",
        "rung": "detective",
        "moves": []
      }
    },
    {
      "id": "barlow",
      "name": "Frank Barlow",
      "short": "Barlow",
      "actor": "Michael Stone Forrest",
      "faction": "police",
      "unit": "Homicide",
      "tier": 3,
      "title": "Homicide detective",
      "role": "Homicide detective; primary on the Pooh Blanchard case",
      "roleEnd": "Homicide detective",
      "reportsTo": "rawls",
      "firstEp": 1,
      "status": [],
      "bio": "Homicide detective and primary investigator on the murder D'Angelo Barksdale is acquitted of in the first episode. He dismisses McNulty's warning that the Barksdales tampered with the trial.",
      "moments": [
        {
          "ep": 1,
          "text": "Brushes off McNulty's warning about witness tampering, then threatens Stringer after the acquittal."
        }
      ],
      "ladder": {
        "track": "job",
        "rung": "detective",
        "moves": []
      }
    },
    {
      "id": "kima",
      "name": "Kima Greggs",
      "full": "Shakima Greggs",
      "short": "Kima",
      "actor": "Sonja Sohn",
      "faction": "police",
      "unit": "The detail",
      "tier": 1,
      "title": "Detective; lead on the detail",
      "role": "Narcotics detective on Daniels' shift, made lead detective on the detail",
      "roleEnd": "In hospital, recovering from gunshot wounds",
      "reportsTo": "daniels",
      "firstEp": 1,
      "status": [
        {
          "ep": 10,
          "s": "hospitalized",
          "note": "Shot twice in the buy-bust"
        }
      ],
      "bio": "Sharp narcotics detective who becomes the detail's lead investigator. She runs the informant Bubbles and works closely with McNulty to win over Omar. She lives with her partner Cheryl, who fears for her safety. Working undercover in the buy-bust Burrell ordered, she is shot twice and spends the rest of the season in hospital.",
      "moments": [
        {
          "ep": 1,
          "text": "Bubbles offers to be her confidential informant again after Johnny's beating."
        },
        {
          "ep": 4,
          "text": "Seeing Cheryl's cell phone bill, she realizes the dealers use pagers so that no call records exist."
        },
        {
          "ep": 9,
          "text": "With Freamon, turns the dancer Shardene into an informant."
        },
        {
          "ep": 10,
          "text": "Shot twice while undercover as Orlando's girlfriend in the Burrell-ordered buy-bust. Orlando is killed."
        },
        {
          "ep": 13,
          "text": "Identifies Little Man from a photo array but not Wee-Bey. She tells McNulty her only regret is not taping her gun better."
        }
      ],
      "ladder": {
        "track": "job",
        "rung": "detective",
        "moves": [
          {
            "ep": 1,
            "dir": "up",
            "text": "Made lead detective on the detail."
          },
          {
            "ep": 10,
            "dir": "out",
            "text": "Shot twice working undercover in the buy-bust Burrell ordered."
          }
        ]
      }
    },
    {
      "id": "herc",
      "name": "Herc Hauk",
      "full": "Thomas Hauk",
      "short": "Herc",
      "actor": "Domenick Lombardozzi",
      "faction": "police",
      "unit": "The detail",
      "tier": 1,
      "title": "Narcotics detective",
      "role": "Narcotics detective on Daniels' shift",
      "roleEnd": "Back in Narcotics; passed over for sergeant",
      "reportsTo": "daniels",
      "firstEp": 1,
      "status": [
        {
          "ep": 13,
          "s": "passed",
          "note": "Passed over for sergeant; back in Narcotics"
        }
      ],
      "bio": "Aggressive narcotics detective, usually paired with Carver, who comes onto the detail with Daniels. Early misconduct (the drunken tower raid, beating Bodie) gives way to useful surveillance grunt work. He passes the sergeant's exam well up the list but loses the promotion to Carver.",
      "moments": [
        {
          "ep": 2,
          "text": "Leads the drunken late-night foray into the towers with Carver and Prez and is hurt when residents rain debris on them."
        },
        {
          "ep": 5,
          "text": "With Carver, rearrests Bodie and beats him, then ends up playing pool with him while waiting for juvenile intake."
        },
        {
          "ep": 9,
          "text": "He and Carver seize Wee-Bey's cash. When some goes missing, they have until morning roll call to find it, and it turns up in their car."
        },
        {
          "ep": 12,
          "text": "Celebrates passing the sergeant's exam."
        },
        {
          "ep": 13,
          "text": "Told he is no longer in line for sergeant and that Carver has moved up the list. Back in Narcotics, he gives new detectives a speech about making real cases."
        }
      ],
      "ladder": {
        "track": "job",
        "rung": "detective",
        "moves": [
          {
            "ep": 2,
            "dir": "side",
            "text": "Hurt in the drunken tower incident."
          },
          {
            "ep": 9,
            "dir": "side",
            "text": "Cash seized from Wee-Bey goes missing, then turns up in his car."
          },
          {
            "ep": 12,
            "dir": "up",
            "text": "Passes the sergeant's exam, well up the list."
          },
          {
            "ep": 13,
            "dir": "down",
            "text": "Dropped from the promotion line. Carver gets the stripes."
          }
        ]
      },
      "pathNote": "Passed the exam ahead of Carver and was still passed over."
    },
    {
      "id": "carver",
      "name": "Ellis Carver",
      "short": "Carver",
      "actor": "Seth Gilliam",
      "faction": "police",
      "unit": "The detail",
      "tier": 1,
      "title": "Narcotics detective",
      "role": "Narcotics detective on Daniels' shift; Herc's partner",
      "roleEnd": "Promoted to sergeant",
      "reportsTo": "daniels",
      "firstEp": 1,
      "status": [
        {
          "ep": 13,
          "s": "promoted",
          "note": "Promoted to sergeant"
        }
      ],
      "bio": "Narcotics detective and Herc's partner, brought onto the detail by Daniels. He is more cautious than Herc and vetoes skimming Wee-Bey's cash while the wire is up. He quietly passes information about the detail to Deputy Commissioner Burrell and is rewarded with a promotion to sergeant ahead of Herc. Daniels confronts him about it before the season ends.",
      "moments": [
        {
          "ep": 3,
          "text": "Joins Herc and Greggs in beating Bodie after Bodie punches Mahon during the Pit raid."
        },
        {
          "ep": 9,
          "text": "Talks Herc out of keeping some of Wee-Bey's cash because the wire could expose them."
        },
        {
          "ep": 11,
          "text": "Breaks the news of Greggs' shooting to Cheryl and brings her to the hospital, and is let down when the commissioner won't speak to her."
        },
        {
          "ep": 13,
          "text": "Daniels confronts him as Burrell's inside man. Carver admits it, saying he could not refuse a deputy commissioner. Daniels warns him that as a sergeant he will now set the example for his men."
        },
        {
          "ep": 13,
          "text": "Promoted to sergeant by Burrell in the closing montage."
        }
      ],
      "ladder": {
        "track": "job",
        "rung": "detective",
        "moves": [
          {
            "ep": 8,
            "dir": "side",
            "text": "Takes the sergeant's exam with Herc."
          },
          {
            "ep": 13,
            "dir": "up",
            "to": "sergeant",
            "text": "Promoted to sergeant ahead of Herc, his reward for informing to Burrell."
          }
        ]
      },
      "pathNote": "Scored below Herc on the exam. Informing to the deputy commissioner put him first."
    },
    {
      "id": "freamon",
      "name": "Lester Freamon",
      "short": "Freamon",
      "actor": "Clarke Peters",
      "faction": "police",
      "unit": "The detail",
      "tier": 1,
      "title": "Detective, ex-Pawn Shop Unit",
      "role": "Detective exiled to the Pawn Shop Unit, sent to the detail as a presumed castoff",
      "roleEnd": "Moved to Homicide under Rawls",
      "reportsTo": "daniels",
      "firstEp": 2,
      "status": [
        {
          "ep": 13,
          "s": "reassigned",
          "note": "Brought into Homicide by Rawls"
        }
      ],
      "bio": "Quiet veteran who spent 13 years and 4 months in the Pawn Shop Unit after crossing his superiors, and is sent to the detail as a presumed 'hump'. He turns out to be its best investigator. He finds Avon's only photo and D'Angelo's pager number, masters the wiretap, follows the money into campaign donations, and recruits the dancer Shardene as an informant. Rawls rewards him with a return to Homicide.",
      "moments": [
        {
          "ep": 3,
          "text": "Tracks down an old boxing poster with the detail's only photo of Avon, and notes a number written on a stash-house wall."
        },
        {
          "ep": 4,
          "text": "Reveals that the number is D'Angelo's pager. Over drinks he warns McNulty never to answer honestly when a boss asks where he would not want to go."
        },
        {
          "ep": 9,
          "text": "Pulls City Hall records showing Barksdale campaign contributions and front companies, and turns Shardene with Greggs."
        },
        {
          "ep": 11,
          "text": "Rallies the stunned detail back to the wire after Greggs is shot, and has a payphone dusted to produce Little Man's prints."
        },
        {
          "ep": 13,
          "text": "Locates Wee-Bey in Philadelphia through a retired pawn-shop colleague at the phone company. Rawls brings him into Homicide."
        }
      ],
      "ladder": {
        "track": "job",
        "rung": "detective",
        "moves": [
          {
            "ep": 2,
            "dir": "up",
            "text": "Rescued from 13 years and 4 months in the Pawn Shop Unit."
          },
          {
            "ep": 13,
            "dir": "up",
            "text": "Brought into Homicide by Rawls: same rank, far better unit."
          }
        ]
      },
      "pathNote": "Proof that you can move up without a promotion. The unit matters as much as the rank."
    },
    {
      "id": "prez",
      "name": "Prez Pryzbylewski",
      "full": "Roland Pryzbylewski",
      "short": "Prez",
      "actor": "Jim True-Frost",
      "faction": "police",
      "unit": "The detail",
      "tier": 1,
      "title": "Detective; Valchek's son-in-law",
      "role": "Detective from Lt. Cantrell's unit, sent to the detail",
      "roleEnd": "Gun and badge returned; next posting not shown",
      "reportsTo": "daniels",
      "firstEp": 2,
      "status": [
        {
          "ep": 3,
          "s": "desk",
          "note": "Desk duty pending a grand jury"
        },
        {
          "ep": 13,
          "s": "active",
          "note": "Gun and badge returned"
        }
      ],
      "bio": "Son-in-law of Major Valchek, whose influence saved his career after he shot up his own patrol car and was nearly indicted. On the detail he accidentally fires his gun in the office and pistol-whips teenager Kevin Johnston, blinding him in one eye, which gets him confined to a desk. There he discovers a gift for puzzles and paperwork: he cracks the Barksdale pager code and becomes a key wiretap and paper-trail man.",
      "moments": [
        {
          "ep": 2,
          "text": "Accidentally fires his weapon into the office wall. That night he pistol-whips Kevin Johnston during the drunken tower raid, and the boy loses the sight of one eye."
        },
        {
          "ep": 3,
          "text": "Confined to office duty pending a grand jury as Valchek works to protect him."
        },
        {
          "ep": 5,
          "text": "Cracks the Barksdale pager code, a simple number-swap."
        },
        {
          "ep": 7,
          "text": "Recognizes an arrested drug courier as Kevin Johnston."
        },
        {
          "ep": 13,
          "text": "Daniels hands back his gun and badge. In the montage he clears the detail's board."
        }
      ],
      "ladder": {
        "track": "job",
        "rung": "detective",
        "moves": [
          {
            "ep": 2,
            "dir": "down",
            "text": "Pistol-whips Kevin Johnston, who loses the sight in one eye."
          },
          {
            "ep": 3,
            "dir": "down",
            "text": "Confined to a desk pending a grand jury. Valchek keeps him in the job."
          },
          {
            "ep": 5,
            "dir": "up",
            "text": "Cracks the pager code and finds his calling on the wire."
          },
          {
            "ep": 13,
            "dir": "up",
            "text": "Daniels hands back his gun and badge."
          }
        ]
      },
      "pathNote": "His father-in-law, Major Valchek, is the reason he still has a badge. The wire is the reason he's worth keeping."
    },
    {
      "id": "sydnor",
      "name": "Leander Sydnor",
      "short": "Sydnor",
      "actor": "Corey Parker Robinson",
      "faction": "police",
      "unit": "The detail",
      "tier": 2,
      "title": "Detective, on loan from Cantrell",
      "role": "Detective from Lt. Cantrell's unit, loaned to the detail",
      "roleEnd": "Sent back to his old unit (ep 12)",
      "reportsTo": "daniels",
      "firstEp": 2,
      "status": [
        {
          "ep": 12,
          "s": "reassigned",
          "note": "Sent back to his old unit"
        }
      ],
      "bio": "Young detective with a reputation for solid undercover work, the best man in Lt. Cantrell's unit, whom Daniels demands as the price of taking Prez. He makes undercover buys with Bubbles' coaching, spots Avon at the East-West basketball game, and learns the paper trail from Freamon. Burrell orders him back to his old unit when the detail is cut back.",
      "moments": [
        {
          "ep": 3,
          "text": "Goes undercover in the Pit after Bubbles coaches him to look like a real addict."
        },
        {
          "ep": 7,
          "text": "Photographs Stinkum at a payphone as Stringer calls back, giving legal grounds to monitor the call."
        },
        {
          "ep": 9,
          "text": "Recognizes Avon at the basketball game from the old boxing poster."
        },
        {
          "ep": 10,
          "text": "Follows the resupply chain from a Pimlico payphone to a suburban stash house, then poses as a garbage man to collect its trash."
        },
        {
          "ep": 12,
          "text": "Tells Freamon and Prez the case is the best police work he has ever done."
        }
      ],
      "ladder": {
        "track": "job",
        "rung": "detective",
        "moves": [
          {
            "ep": 2,
            "dir": "side",
            "text": "Loaned by Cantrell as the price of taking Prez."
          },
          {
            "ep": 12,
            "dir": "side",
            "text": "Sent back to his old unit when Burrell cuts the detail."
          }
        ]
      }
    },
    {
      "id": "polk",
      "name": "Augustus Polk",
      "short": "Polk",
      "actor": "Nat Benchley",
      "faction": "police",
      "unit": "The detail",
      "tier": 2,
      "title": "Detective, castoff",
      "role": "Hard-drinking detective dumped on the detail with his partner Mahon",
      "roleEnd": "On medical leave for alcohol abuse",
      "reportsTo": "daniels",
      "firstEp": 2,
      "status": [
        {
          "ep": 6,
          "s": "leave",
          "note": "Medical leave for alcohol abuse"
        }
      ],
      "bio": "Burned-out, hard-drinking detective dumped on the detail with his partner Mahon. After Mahon retires on an injury pension, Polk considers hurting himself to do the same. He then turns up drunk and chooses medical leave for alcohol abuse over working.",
      "moments": [
        {
          "ep": 3,
          "text": "Sent with Mahon to find a photo of Avon, they come back with a picture of the wrong man."
        },
        {
          "ep": 4,
          "text": "Visits the injured Mahon, who suggests Polk get himself hurt and retire too."
        },
        {
          "ep": 6,
          "text": "Arrives drunk at 9 a.m. When Daniels tells him to work or check into medical, he takes medical."
        }
      ],
      "ladder": {
        "track": "job",
        "rung": "detective",
        "moves": [
          {
            "ep": 6,
            "dir": "out",
            "text": "Turns up drunk and takes medical leave for alcohol abuse."
          }
        ]
      }
    },
    {
      "id": "mahon",
      "name": "Patrick Mahon",
      "short": "Mahon",
      "actor": "Tom Quinn",
      "faction": "police",
      "unit": "The detail",
      "tier": 2,
      "title": "Detective, castoff",
      "role": "Aging detective dumped on the detail with his partner Polk",
      "roleEnd": "Retired on an injury pension",
      "reportsTo": "daniels",
      "firstEp": 2,
      "status": [
        {
          "ep": 3,
          "s": "injured",
          "note": "Punched by Bodie in the Pit raid"
        },
        {
          "ep": 4,
          "s": "retired",
          "note": "Retired on an injury pension"
        }
      ],
      "bio": "Aging detective sent to the detail with his partner Polk. Punched by Bodie during the Pit raid, he turns the injury into an early retirement with an increased pension.",
      "moments": [
        {
          "ep": 3,
          "text": "Punched by Bodie during the raid on the Pit, which sets off a beating of Bodie by the detectives."
        },
        {
          "ep": 4,
          "text": "Takes early retirement with a pension bump and urges Polk to follow his example."
        }
      ],
      "ladder": {
        "track": "job",
        "rung": "detective",
        "moves": [
          {
            "ep": 4,
            "dir": "out",
            "text": "Turns Bodie's punch into early retirement with a pension bump."
          }
        ]
      }
    },
    {
      "id": "bobbybrown",
      "name": "Bobby Brown",
      "short": "Bobby Brown",
      "actor": "Bobby J. Brown",
      "faction": "police",
      "unit": "Western District",
      "tier": 3,
      "title": "Patrol officer, Western District",
      "role": "Western District patrol officer",
      "roleEnd": "Western District patrol officer",
      "reportsTo": null,
      "firstEp": 1,
      "status": [],
      "bio": "Western District patrol officer who is first on scene at William Gant's murder. He later helps McNulty stake out Wallace's squat in exchange for beer and takeout.",
      "moments": [
        {
          "ep": 1,
          "text": "Guides Bunk to the scene of William Gant's murder (uncredited appearance)."
        },
        {
          "ep": 10,
          "text": "With his partner, watches Wallace's squat for McNulty, bribed with beer and takeout."
        }
      ],
      "ladder": {
        "track": "job",
        "rung": "officer",
        "moves": []
      }
    },
    {
      "id": "fitzhugh",
      "name": "Terrance Fitzhugh",
      "alias": "Fitz",
      "short": "Fitz",
      "actor": "Doug Olear",
      "faction": "police",
      "unit": "FBI",
      "tier": 2,
      "title": "FBI special agent",
      "role": "Special agent in the FBI's Baltimore field office; McNulty's friend",
      "roleEnd": "FBI special agent",
      "reportsTo": "reese",
      "firstEp": 1,
      "status": [],
      "bio": "FBI special agent and McNulty's friend. His surveillance setup shows McNulty what a real wiretap case can do, even as the Bureau shifts from drugs to counterterrorism. He lends equipment, tells McNulty the FBI once investigated Daniels over hundreds of thousands in unexplained assets, and at the end arranges a meeting with his supervisor and federal prosecutors.",
      "moments": [
        {
          "ep": 1,
          "text": "Shows McNulty live surveillance of an FBI drug case in Pimlico and says it will be the office's last narcotics investigation because of the shift to counterterrorism."
        },
        {
          "ep": 3,
          "text": "Asked for lightweight body mikes, he reacts warily on hearing Daniels is in command. Later he tells McNulty the FBI found hundreds of thousands in unexplained assets on Daniels and passed the file to Burrell, who did nothing."
        },
        {
          "ep": 13,
          "text": "Doubts Daniels, but on McNulty's word arranges a meeting with his supervisor Amanda Reese and federal prosecutors."
        }
      ],
      "offLadder": "FBI, outside the BPD. His Bureau is moving its people from drugs to counterterrorism."
    },
    {
      "id": "reese",
      "name": "Amanda Reese",
      "short": "Reese",
      "initials": "AR",
      "actor": "Benay Berger",
      "faction": "police",
      "unit": "FBI",
      "tier": 3,
      "title": "FBI supervisor",
      "role": "Fitzhugh's supervisor at the FBI's Baltimore field office",
      "roleEnd": "FBI supervisor",
      "reportsTo": null,
      "firstEp": 13,
      "status": [],
      "bio": "Fitzhugh's supervisor at the FBI's Baltimore field office. Impressed by the Barksdale case, she says the Bureau's priorities are terrorism and political corruption. The federal side's interest in using the dealers to reach corrupt politicians provokes McNulty's outburst.",
      "moments": [
        {
          "ep": 13,
          "text": "Hears out Daniels, McNulty and Freamon. The federal side wants to use the dealers as cooperators against politicians, and Daniels ends the meeting."
        }
      ],
      "offLadder": "FBI supervisor, outside the BPD."
    },
    {
      "id": "pearlman",
      "name": "Rhonda Pearlman",
      "short": "Pearlman",
      "actor": "Deirdre Lovejoy",
      "faction": "law",
      "unit": "State's Attorney's Office",
      "tier": 2,
      "title": "Assistant State's Attorney",
      "role": "Assistant State's Attorney, narcotics; the detail's legal liaison",
      "roleEnd": "Assistant State's Attorney",
      "reportsTo": "demper",
      "firstEp": 1,
      "status": [],
      "bio": "Assistant State's Attorney in the narcotics division who serves as the detail's legal liaison. She walks McNulty through what a wiretap affidavit requires and helps keep Judge Phelan signing. She has an on-and-off affair with McNulty. When the money trail reaches campaign donations, her boss Demper's alarm puts her own standing at risk.",
      "moments": [
        {
          "ep": 1,
          "text": "Joins the detail's first meeting. Narcotics evidence goes to her, homicide matters to ASA Nathan."
        },
        {
          "ep": 3,
          "text": "Explains to McNulty that cloning a pager needs probable cause and proof that other methods are exhausted. They end up in bed."
        },
        {
          "ep": 11,
          "text": "Berates McNulty for making her threaten the powerful defense lawyer Levy, and tells him he will use anyone."
        },
        {
          "ep": 12,
          "text": "Distressed when State's Attorney Demper worries about the campaign-finance angle. She denies knowing what the detail is doing."
        },
        {
          "ep": 13,
          "text": "Takes D'Angelo's proffer with McNulty. After Levy takes over as D'Angelo's lawyer, she presents Avon's plea for seven years."
        }
      ],
      "offLadder": "A prosecutor, not a cop. She is the detail's legal liaison and writes the paperwork the wire depends on."
    },
    {
      "id": "nathan",
      "name": "Ilene Nathan",
      "short": "Nathan",
      "actor": "Susan Rome",
      "faction": "law",
      "unit": "State's Attorney's Office",
      "tier": 3,
      "title": "ASA, violent crimes",
      "role": "Assistant State's Attorney handling homicide matters",
      "roleEnd": "Assistant State's Attorney",
      "reportsTo": "demper",
      "firstEp": 11,
      "status": [],
      "bio": "Assistant State's Attorney who handles homicide matters. Pearlman steers the detail's murder evidence to her. She is present for Wee-Bey's interview, in which he confesses to a string of killings.",
      "moments": [
        {
          "ep": 1,
          "text": "Bunk drops off evidence at her office. Pearlman tells the detail homicide matters go to her."
        },
        {
          "ep": 13,
          "text": "Has a celebratory lunch with Pearlman, then sits in with Bunk and Norris on Wee-Bey's confession."
        }
      ]
    },
    {
      "id": "hansen",
      "name": "Taryn Hansen",
      "short": "Hansen",
      "actor": "Lucy Newman-Williams",
      "faction": "law",
      "unit": "State's Attorney's Office",
      "tier": 3,
      "title": "ASA; lost D'Angelo's trial",
      "role": "Assistant State's Attorney who prosecutes D'Angelo",
      "roleEnd": "Assistant State's Attorney",
      "reportsTo": "demper",
      "firstEp": 1,
      "status": [],
      "bio": "Prosecutor in D'Angelo Barksdale's murder trial, which collapses when the witness Nakeesha Lyles recants on the stand.",
      "moments": [
        {
          "ep": 1,
          "text": "Loses the case against D'Angelo when Lyles refuses to identify him."
        }
      ]
    },
    {
      "id": "demper",
      "name": "Steven Demper",
      "short": "Demper",
      "actor": "Doug Roberts",
      "faction": "law",
      "unit": "State's Attorney's Office",
      "tier": 3,
      "title": "State's Attorney",
      "role": "State's Attorney for Baltimore City",
      "roleEnd": "State's Attorney for Baltimore City",
      "reportsTo": null,
      "firstEp": 12,
      "status": [],
      "bio": "Baltimore City State's Attorney and Pearlman's boss, more concerned with his elected office than with prosecutions. When the detail's money trail turns up suspicious campaign contributions, he is alarmed and Pearlman fears for her job.",
      "moments": [
        {
          "ep": 12,
          "text": "Meets Pearlman, worried that the Barksdale investigation is looking into campaign donations."
        }
      ]
    },
    {
      "id": "bryant",
      "name": "Nadiva Bryant",
      "short": "Bryant",
      "actor": "Toni Lewis",
      "faction": "law",
      "unit": "U.S. Attorney's Office",
      "tier": 3,
      "title": "Assistant U.S. Attorney",
      "role": "Federal prosecutor at the meeting on taking the case federal",
      "roleEnd": "Assistant U.S. Attorney",
      "reportsTo": null,
      "firstEp": 13,
      "status": [],
      "bio": "Federal prosecutor who works with the FBI team the detail approaches in the finale. The federal side wants to use the Barksdale dealers to reach politicians rather than prosecute the drug case, which McNulty denounces.",
      "moments": [
        {
          "ep": 13,
          "text": "Attends the meeting on taking the Barksdale case federal. Afterwards the U.S. Attorney's office complains to Burrell about McNulty."
        }
      ]
    },
    {
      "id": "phelan",
      "name": "Daniel Phelan",
      "short": "Phelan",
      "actor": "Peter Gerety",
      "faction": "law",
      "unit": "Circuit Court",
      "tier": 2,
      "title": "Circuit Court judge",
      "role": "Judge, Circuit Court for Baltimore City",
      "roleEnd": "Judge; back on the mayor's ticket",
      "reportsTo": null,
      "firstEp": 1,
      "status": [],
      "bio": "Circuit Court judge who presides over D'Angelo Barksdale's acquittal. Prodded by McNulty, he calls Burrell and forces the detail into existence. He signs the detail's wiretap orders and saves the case from Burrell with a contempt threat, but his enthusiasm cools as the case costs him political capital and, for a time, his place on the mayor's re-election ticket.",
      "moments": [
        {
          "ep": 1,
          "text": "After McNulty's complaint, calls Deputy Commissioner Burrell about the Barksdales."
        },
        {
          "ep": 2,
          "text": "Pressures Burrell to keep McNulty on the case. The Gant story then hits the papers, and McNulty suspects Phelan was the source."
        },
        {
          "ep": 5,
          "text": "Signs the affidavit to clone D'Angelo's pager."
        },
        {
          "ep": 8,
          "text": "Threatens Burrell with contempt if the wiretap is ended early, then grins at McNulty and Greggs: 'Who's your daddy now?'"
        },
        {
          "ep": 13,
          "text": "Congratulates McNulty after the pleas. McNulty snubs him."
        }
      ],
      "offLadder": "A judge, outside the department. His phone call creates the detail, and his signature keeps the wire alive."
    },
    {
      "id": "davis",
      "name": "Clay Davis",
      "full": "R. Clayton Davis",
      "short": "Clay Davis",
      "actor": "Isiah Whitlock Jr.",
      "faction": "law",
      "unit": "Maryland Senate",
      "tier": 2,
      "title": "State senator",
      "role": "Maryland state senator from Baltimore",
      "roleEnd": "State senator; never charged",
      "reportsTo": null,
      "firstEp": 7,
      "status": [],
      "bio": "State senator whose driver, Damien 'Day-Day' Price, is caught by the detail carrying Barksdale cash. His political weight gets the money returned. When he learns the detail is looking into his campaign finances, he meets Daniels in Burrell's presence and demands that Burrell rein him in.",
      "moments": [
        {
          "ep": 7,
          "text": "Attends the fundraiser where Daniels meets his driver Day-Day in the kitchen."
        },
        {
          "ep": 8,
          "text": "His driver is stopped with a bag of Barksdale cash. Burrell orders the money returned."
        },
        {
          "ep": 12,
          "text": "Confronts Daniels, with Burrell present, about the investigation into his driver and campaign finances, then tells Burrell to control him."
        }
      ]
    },
    {
      "id": "dayday",
      "name": "Day-Day Price",
      "full": "Damien Price",
      "short": "Day-Day",
      "actor": "Donnell Rawlings",
      "faction": "law",
      "unit": "Maryland Senate",
      "tier": 3,
      "title": "Senator Davis's driver",
      "role": "Driver and bagman for Senator Clay Davis",
      "roleEnd": "Senator Davis's driver",
      "reportsTo": "davis",
      "firstEp": 7,
      "status": [],
      "bio": "Senator Davis's driver, a street hustler who muses about robbing a fundraiser host's house without realizing Daniels is a cop. Stopped by the detail with a bag of Barksdale cash, he is released and the money returned after Burrell intervenes.",
      "moments": [
        {
          "ep": 7,
          "text": "In the fundraiser kitchen, speculates to Daniels about what the house's valuables would fetch, until Daniels says he is a police officer."
        },
        {
          "ep": 8,
          "text": "Pulled over with a bag of cash picked up from the Barksdales (about $20,000 per fandom). He is released with a receipt, and Burrell later orders the money returned."
        }
      ]
    },
    {
      "id": "marla",
      "name": "Marla Daniels",
      "short": "Marla",
      "actor": "Maria Broom",
      "faction": "civilian",
      "unit": "Family",
      "tier": 2,
      "title": "Daniels' wife",
      "role": "Cedric Daniels' politically ambitious wife",
      "roleEnd": "Cedric Daniels' wife",
      "reportsTo": null,
      "firstEp": 2,
      "status": [],
      "bio": "Cedric Daniels' politically ambitious wife, who moves in Baltimore's political circles. She warns him the Barksdale detail is a no-win career move ('You cannot lose if you do not play') and admonishes him for covering up Prez's brutality. She brings him to the fundraiser where he meets Day-Day Price.",
      "moments": [
        {
          "ep": 2,
          "text": "Criticizes Daniels for protecting his men after the tower incident and counsels him to back away from the politically charged case."
        },
        {
          "ep": 7,
          "text": "Takes Daniels to the political fundraiser where he meets Senator Davis's driver."
        },
        {
          "ep": 8,
          "text": "Daniels tells her the brass fear wiretaps because drug money ties into politics."
        },
        {
          "ep": 13,
          "text": "Hopes D'Angelo's cooperation will square things with Burrell as Daniels plans to go to the FBI."
        }
      ]
    },
    {
      "id": "elena",
      "name": "Elena McNulty",
      "short": "Elena",
      "actor": "Callie Thorne",
      "faction": "civilian",
      "unit": "Family",
      "tier": 2,
      "title": "McNulty's estranged wife",
      "role": "McNulty's estranged wife, who has their two sons",
      "roleEnd": "McNulty's estranged wife",
      "reportsTo": null,
      "firstEp": 4,
      "status": [],
      "bio": "McNulty's estranged wife, who has their sons Sean and Michael and tightly limits his visits. After he uses the boys to tail a drug dealer she seeks an emergency order, pointing to photos she has of him with Pearlman. The judge tells them to work it out themselves.",
      "moments": [
        {
          "ep": 4,
          "text": "Argues with McNulty over custody at their son's soccer game, where he turns up with Bubbles."
        },
        {
          "ep": 5,
          "text": "Refuses to let the boys stay with him."
        },
        {
          "ep": 10,
          "text": "Brings an emergency custody hearing and confronts McNulty about his affair with Pearlman. They agree to cooperate for the boys' sake."
        }
      ]
    },
    {
      "id": "cheryl",
      "name": "Cheryl",
      "short": "Cheryl",
      "initials": "CH",
      "actor": "Melanie Nicholls-King",
      "faction": "civilian",
      "unit": "Family",
      "tier": 2,
      "title": "Kima's partner",
      "role": "Kima Greggs' live-in partner, a broadcast journalist",
      "roleEnd": "Wants Kima to quit the job",
      "reportsTo": null,
      "firstEp": 1,
      "status": [],
      "bio": "Kima Greggs' live-in partner, a broadcast journalist who has pushed Kima to study law and worries constantly about the dangers of her job. After Kima is shot the brass keep her at arm's length. By the finale she wants Kima to quit, and she walks out when Kima and McNulty talk about the case.",
      "moments": [
        {
          "ep": 4,
          "text": "Her cell phone bill sparks Kima's insight that the dealers use pagers."
        },
        {
          "ep": 11,
          "text": "Carver brings her the news and takes her to the hospital, where Burrell misreads her relationship with Kima and the commissioner declines to speak to her. At home she breaks down."
        },
        {
          "ep": 13,
          "text": "Storms out of Kima's hospital room when she and McNulty discuss the case."
        }
      ]
    },
    {
      "id": "roybrown",
      "name": "Roy Brown",
      "short": "Roy Brown",
      "actor": "Terrence Currier",
      "faction": "civilian",
      "unit": "Phone company",
      "tier": 3,
      "title": "Freamon's old partner",
      "role": "Freamon's former Pawn Shop Unit partner, now at a phone company",
      "roleEnd": "Retired detective at a phone company",
      "reportsTo": null,
      "firstEp": 13,
      "status": [],
      "bio": "Freamon's former Pawn Shop Unit partner, now retired and working for a phone company. Once he hears the request concerns a detective's shooting, he traces calls to Levy's office from Philadelphia, which leads to Wee-Bey's arrest.",
      "moments": [
        {
          "ep": 13,
          "text": "Balks at first on policy grounds, then eagerly helps once Freamon mentions Greggs' shooting."
        }
      ]
    },
  ],
  relationships: [
    {"s":"stringer","t":"avon","type":"command","label":"Second-in-command","ep":1},
    {"s":"weebey","t":"avon","type":"command","label":"Chief enforcer","ep":1},
    {"s":"stinkum","t":"stringer","type":"command","label":"Enforcer; runs re-ups","ep":1},
    {"s":"bird","t":"weebey","type":"command","label":"Muscle under Wee-Bey","ep":5},
    {"s":"savino","t":"weebey","type":"command","label":"Muscle under Wee-Bey","ep":1},
    {"s":"littleman","t":"weebey","type":"command","label":"Muscle under Wee-Bey","ep":2},
    {"s":"dangelo","t":"stringer","type":"command","label":"Runs the Pit for Stringer","ep":1},
    {"s":"ronniemo","t":"stringer","type":"command","label":"Runs Tower 851","ep":2},
    {"s":"bodie","t":"dangelo","type":"command","label":"D'Angelo's Pit crew","ep":1},
    {"s":"poot","t":"dangelo","type":"command","label":"D'Angelo's Pit crew","ep":1},
    {"s":"wallace","t":"dangelo","type":"command","label":"D'Angelo's Pit crew","ep":1},
    {"s":"sterling","t":"dangelo","type":"command","label":"D'Angelo's Pit crew","ep":3},
    {"s":"cass","t":"dangelo","type":"command","label":"D'Angelo's Pit crew","ep":6},
    {"s":"kevin","t":"stinkum","type":"command","label":"Carries resupply for Stinkum","ep":7},
    {"s":"orlando","t":"avon","type":"command","label":"Front man; the club is Avon's office","ep":1},
    {"s":"bodie","t":"stringer","type":"command","label":"Moved up to the towers by Stringer","ep":13},
    {"s":"poot","t":"stringer","type":"command","label":"Takes over the Pit","ep":13},
    {"s":"puddin","t":"bodie","type":"command","label":"Works the towers under Bodie","ep":13},
    {"s":"brandon","t":"omar","type":"command","label":"Omar's stick-up crew","ep":3},
    {"s":"bailey","t":"omar","type":"command","label":"Omar's stick-up crew","ep":3},
    {"s":"dangelo","t":"avon","type":"family","label":"Avon is D'Angelo's uncle","ep":1},
    {"s":"dangelo","t":"brianna","type":"family","label":"Brianna is D'Angelo's mother","ep":12},
    {"s":"brianna","t":"avon","type":"family","label":"Brother and sister","ep":12},
    {"s":"donette","t":"dangelo","type":"romance","label":"D'Angelo's girlfriend and mother of his son","ep":2},
    {"s":"shardene","t":"dangelo","type":"romance","label":"Moves in with D'Angelo; leaves after Keisha's death","ep":1},
    {"s":"omar","t":"brandon","type":"romance","label":"Lovers and partners","ep":3},
    {"s":"avon","t":"deirdre","type":"romance","label":"Avon's former girlfriend; she threatened to go to the police","ep":4},
    {"s":"stringer","t":"avon","type":"friendship","label":"Closest friends","ep":1},
    {"s":"weebey","t":"avon","type":"friendship","label":"Longtime friends","ep":1},
    {"s":"dangelo","t":"wallace","type":"friendship","label":"D'Angelo looks out for him","ep":3},
    {"s":"poot","t":"wallace","type":"friendship","label":"Best friends","ep":1},
    {"s":"bodie","t":"poot","type":"friendship","label":"Friends and crewmates","ep":1},
    {"s":"bodie","t":"wallace","type":"friendship","label":"Friends and crewmates, until the order comes","ep":1},
    {"s":"bubbles","t":"johnny","type":"friendship","label":"Hustling partners; Bubbles looks out for him","ep":1},
    {"s":"walon","t":"bubbles","type":"friendship","label":"NA sponsor","ep":10},
    {"s":"shardene","t":"keisha","type":"friendship","label":"Friends and fellow dancers","ep":8},
    {"s":"weebey","t":"bird","type":"alliance","label":"Falsely confesses to Gant's murder to cover for Bird","ep":13},
    {"s":"brianna","t":"avon","type":"business","label":"Takes over the money side","ep":13},
    {"s":"avon","t":"roberto","type":"business","label":"Supplier in New York","ep":13},
    {"s":"orlando","t":"dangelo","type":"business","label":"Pitches selling cocaine behind Avon's back","ep":7},
    {"s":"shardene","t":"orlando","type":"business","label":"Dances at his club","ep":1},
    {"s":"keisha","t":"orlando","type":"business","label":"Dances at his club","ep":8},
    {"s":"omar","t":"propjoe","type":"business","label":"Trades stolen Barksdale drugs for Avon's pager number","ep":9},
    {"s":"propjoe","t":"stringer","type":"business","label":"Brokers the truce meeting with Omar","ep":10},
    {"s":"levy","t":"orlando","type":"business","label":"Takes his name off the club's liquor license","ep":10},
    {"s":"levy","t":"avon","type":"legal","label":"Lawyer and adviser","ep":1},
    {"s":"levy","t":"stringer","type":"legal","label":"Lawyer and adviser","ep":12},
    {"s":"levy","t":"dangelo","type":"legal","label":"Lawyer (rejected in ep 12, back on the case in ep 13)","ep":1},
    {"s":"levy","t":"bodie","type":"legal","label":"Gets him released in juvenile court","ep":6},
    {"s":"levy","t":"savino","type":"legal","label":"Limits his charges to a fake-drug deal","ep":11},
    {"s":"bubbles","t":"kima","type":"informant","label":"Confidential informant","ep":1},
    {"s":"omar","t":"mcnulty","type":"informant","label":"Names Bird as Gant's killer; agrees to testify","ep":5},
    {"s":"omar","t":"bunk","type":"informant","label":"Gives a statement on the Gant killing","ep":7},
    {"s":"shardene","t":"freamon","type":"informant","label":"Wears a wire; maps Avon's office for a hidden camera","ep":9},
    {"s":"wallace","t":"mcnulty","type":"informant","label":"Names Stringer and Wee-Bey in Brandon's murder","ep":10},
    {"s":"orlando","t":"kima","type":"informant","label":"Gives up Avon after his arrest; buy-bust with Greggs undercover","ep":10},
    {"s":"dangelo","t":"mcnulty","type":"informant","label":"Gives up Wee-Bey's location, then backs out of a deal","ep":13},
    {"s":"dangelo","t":"pooh","type":"killed","label":"Shot him in the 221 tower lobby before the season"},
    {"s":"bird","t":"gant","type":"killed","label":"Shot the trial witness; ballistics match his gun","ep":1},
    {"s":"weebey","t":"bailey","type":"killed","label":"Took credit for Bailey's killing (off-screen)","ep":5},
    {"s":"weebey","t":"brandon","type":"killed","label":"Tortured and killed Brandon","ep":5},
    {"s":"bird","t":"brandon","type":"killed","label":"Tortured and killed Brandon","ep":5},
    {"s":"stinkum","t":"brandon","type":"killed","label":"Tortured and killed Brandon","ep":5},
    {"s":"omar","t":"stinkum","type":"killed","label":"Shotgun ambush in revenge for Brandon","ep":8},
    {"s":"weebey","t":"orlando","type":"killed","label":"Shot Orlando in the buy-bust ambush","ep":10},
    {"s":"littleman","t":"orlando","type":"killed","label":"Shot Orlando in the buy-bust ambush","ep":10},
    {"s":"weebey","t":"littleman","type":"killed","label":"Killed him on Stringer's orders (off-screen)","ep":11},
    {"s":"weebey","t":"nakeesha","type":"killed","label":"Confessed to her murder in ep 13","ep":13},
    {"s":"bodie","t":"wallace","type":"killed","label":"Shot him on Stringer's order","ep":12},
    {"s":"poot","t":"wallace","type":"killed","label":"Finished him off after Bodie's shot","ep":12},
    {"s":"weebey","t":"deirdre","type":"killed","label":"Shot her through her kitchen window, per D'Angelo's ep 13 statement","ep":13},
    {"s":"gant","t":"dangelo","type":"conflict","label":"Testified against him","ep":1},
    {"s":"avon","t":"omar","type":"conflict","label":"Bounty on Omar's crew, doubled for Omar","ep":4},
    {"s":"stringer","t":"brandon","type":"conflict","label":"Brings the crew that takes him","ep":5},
    {"s":"avon","t":"brandon","type":"conflict","label":"Killed under Avon's bounty on Omar's crew","ep":5},
    {"s":"wallace","t":"brandon","type":"conflict","label":"Spotted him at the arcade and called it in","ep":5},
    {"s":"poot","t":"brandon","type":"conflict","label":"Spotted him at the arcade with Wallace","ep":5},
    {"s":"dangelo","t":"brandon","type":"conflict","label":"Relayed the sighting to Stringer","ep":5},
    {"s":"omar","t":"sterling","type":"conflict","label":"Shot him in the knee during the Pit robbery","ep":3},
    {"s":"omar","t":"bird","type":"conflict","label":"Named him to police as Gant's killer","ep":5},
    {"s":"omar","t":"weebey","type":"conflict","label":"Shot him in the leg","ep":8},
    {"s":"weebey","t":"omar","type":"conflict","label":"Wounds him, saving Avon","ep":9},
    {"s":"omar","t":"avon","type":"conflict","label":"Failed assassination attempt outside Orlando's","ep":9},
    {"s":"stringer","t":"omar","type":"conflict","label":"Offers a sham truce meant to lure him out","ep":10},
    {"s":"propjoe","t":"avon","type":"conflict","label":"Eastside rival; wins the East-West basketball bet","ep":9},
    {"s":"avon","t":"orlando","type":"conflict","label":"Beats him for trying to deal","ep":8},
    {"s":"savino","t":"orlando","type":"conflict","label":"Drove Orlando and Greggs into the ambush","ep":10},
    {"s":"littleman","t":"kima","type":"conflict","label":"Shoots Kima during the Orlando hit","ep":10},
    {"s":"stringer","t":"littleman","type":"conflict","label":"Ordered Wee-Bey to kill him","ep":11},
    {"s":"stringer","t":"wallace","type":"conflict","label":"Ordered Bodie to kill him","ep":12},
    {"s":"stringer","t":"dangelo","type":"conflict","label":"Rift over Wallace's murder","ep":12},
    {"s":"weebey","t":"keisha","type":"conflict","label":"She died of an overdose after he took her to a back room; her body was dumped","ep":8},
    {"s":"dangelo","t":"deirdre","type":"conflict","label":"Claims her killing to his crew (ep 4); later says he only delivered drugs before Wee-Bey shot her","ep":4},
    {"s":"bodie","t":"johnny","type":"conflict","label":"Led the beating over counterfeit money","ep":1},
    {"s":"poot","t":"johnny","type":"conflict","label":"Joined the beating","ep":1},
    {"s":"wallace","t":"johnny","type":"conflict","label":"Joined the beating","ep":1},
    {"s":"burrell","t":"frazier","type":"command","label":"Deputy Commissioner for Operations under the Commissioner","ep":11},
    {"s":"rawls","t":"burrell","type":"command","label":"Homicide commander answering to the Deputy Commissioner","ep":1},
    {"s":"foerster","t":"burrell","type":"command","label":"Narcotics commander answering to the Deputy Commissioner","ep":1},
    {"s":"valchek","t":"burrell","type":"command","label":"District commander (reporting line inferred from meetings)","ep":3},
    {"s":"reed","t":"burrell","type":"command","label":"IID commander acting for Burrell (reporting line inferred)","ep":3},
    {"s":"landsman","t":"rawls","type":"command","label":"Homicide squad sergeant under Major Rawls","ep":1},
    {"s":"bunk","t":"landsman","type":"command","label":"Detective in Landsman's squad","ep":1},
    {"s":"cole","t":"landsman","type":"command","label":"Detective in Landsman's squad","ep":1},
    {"s":"norris","t":"landsman","type":"command","label":"Detective in Landsman's squad","ep":6},
    {"s":"holley","t":"landsman","type":"command","label":"Detective in Landsman's squad","ep":6},
    {"s":"mcnulty","t":"landsman","type":"command","label":"Home squad in Homicide","ep":1},
    {"s":"santangelo","t":"landsman","type":"command","label":"Home squad in Homicide","ep":1},
    {"s":"barlow","t":"rawls","type":"command","label":"Homicide detective (squad not identified)","ep":1},
    {"s":"daniels","t":"foerster","type":"command","label":"Narcotics shift lieutenant under Major Foerster","ep":1},
    {"s":"kima","t":"daniels","type":"command","label":"Narcotics detective, then lead detective on the detail","ep":1},
    {"s":"herc","t":"daniels","type":"command","label":"Narcotics detective on Daniels' shift and detail","ep":1},
    {"s":"carver","t":"daniels","type":"command","label":"Narcotics detective on Daniels' shift and detail","ep":1},
    {"s":"mcnulty","t":"daniels","type":"command","label":"Detailed from Homicide to Daniels' detail","ep":1},
    {"s":"santangelo","t":"daniels","type":"command","label":"Detailed from Homicide to Daniels' detail","ep":1},
    {"s":"freamon","t":"daniels","type":"command","label":"Detailed from the Pawn Shop Unit","ep":2},
    {"s":"prez","t":"daniels","type":"command","label":"Detailed from Lt. Cantrell's unit","ep":2},
    {"s":"sydnor","t":"daniels","type":"command","label":"Loaned by Lt. Cantrell","ep":2},
    {"s":"polk","t":"daniels","type":"command","label":"Dumped on the detail","ep":2},
    {"s":"mahon","t":"daniels","type":"command","label":"Dumped on the detail","ep":2},
    {"s":"prez","t":"cantrell","type":"command","label":"Home-unit commander before the detail","ep":2},
    {"s":"sydnor","t":"cantrell","type":"command","label":"Home-unit commander; Sydnor was his best detective","ep":2},
    {"s":"freamon","t":"rawls","type":"command","label":"Brought into Rawls's Homicide Unit at season's end","ep":13},
    {"s":"fitzhugh","t":"reese","type":"command","label":"FBI agent under supervisor Reese","ep":13},
    {"s":"pearlman","t":"demper","type":"command","label":"ASA under the State's Attorney","ep":12},
    {"s":"nathan","t":"demper","type":"command","label":"ASA under the State's Attorney","ep":12},
    {"s":"dayday","t":"davis","type":"command","label":"Senator's driver and bagman","ep":7},
    {"s":"mcnulty","t":"bunk","type":"partner","label":"Homicide partners and best friends","ep":1},
    {"s":"herc","t":"carver","type":"partner","label":"Narcotics partners, strained by the missing-money scare (ep 9) and the sergeant's list (ep 13)","ep":1},
    {"s":"kima","t":"sydnor","type":"partner","label":"Paired by Daniels for street work","ep":2},
    {"s":"mcnulty","t":"santangelo","type":"partner","label":"Paired by Daniels to review old homicides","ep":2},
    {"s":"mahon","t":"polk","type":"partner","label":"Longtime partners, assigned to work leads","ep":2},
    {"s":"freamon","t":"prez","type":"partner","label":"Paired by Daniels on office duty; Freamon mentors Prez on the wire","ep":2},
    {"s":"norris","t":"holley","type":"partner","label":"Work the Brandon Wright murder together","ep":6},
    {"s":"norris","t":"cole","type":"partner","label":"Lead and second detective on the Orlando/Greggs shooting","ep":11},
    {"s":"daniels","t":"marla","type":"family","label":"Husband and wife","ep":2},
    {"s":"mcnulty","t":"elena","type":"family","label":"Separated husband and wife; bitter custody dispute","ep":1},
    {"s":"valchek","t":"prez","type":"family","label":"Father-in-law (Prez is married to Valchek's daughter)","ep":2},
    {"s":"kima","t":"cheryl","type":"romance","label":"Live-in partners; Cheryl fears for Kima's safety","ep":1},
    {"s":"mcnulty","t":"pearlman","type":"romance","label":"On-and-off affair","ep":3},
    {"s":"freamon","t":"shardene","type":"romance","label":"Informant turned lover; he lets her stay at his place","ep":12},
    {"s":"mcnulty","t":"kima","type":"friendship","label":"Close colleagues; she introduces him to Bubbles","ep":1},
    {"s":"mcnulty","t":"fitzhugh","type":"friendship","label":"Friend and FBI contact; lends equipment and intel","ep":1},
    {"s":"mcnulty","t":"freamon","type":"friendship","label":"Kindred spirits; Freamon warns him about punitive transfers","ep":4},
    {"s":"freamon","t":"sydnor","type":"friendship","label":"Mentors him in following the money","ep":9},
    {"s":"freamon","t":"roybrown","type":"friendship","label":"Former pawn-shop partners; Brown helps find Wee-Bey","ep":13},
    {"s":"pearlman","t":"nathan","type":"friendship","label":"SAO colleagues; celebratory lunch","ep":13},
    {"s":"mcnulty","t":"phelan","type":"informant","label":"Backchannel to the judge outside the chain of command","ep":1},
    {"s":"santangelo","t":"rawls","type":"informant","label":"Rawls's mole on McNulty inside the detail","ep":3},
    {"s":"carver","t":"burrell","type":"informant","label":"Leaks the detail's moves to Burrell (exposed in ep 13)","ep":11},
    {"s":"mcnulty","t":"rawls","type":"conflict","label":"Rawls loathes McNulty for going over his head","ep":1},
    {"s":"mcnulty","t":"daniels","type":"conflict","label":"Clash over strategy and mutual distrust (the FBI file); grudging respect later","ep":1},
    {"s":"daniels","t":"rawls","type":"conflict","label":"Daniels goes over Rawls's head to stop the D'Angelo warrants","ep":6},
    {"s":"fitzhugh","t":"daniels","type":"conflict","label":"FBI once investigated Daniels' unexplained assets; Fitz distrusts him","ep":3},
    {"s":"reed","t":"daniels","type":"conflict","label":"Confronts Daniels for withholding raid targets","ep":11},
    {"s":"daniels","t":"carver","type":"conflict","label":"Confronts Carver as Burrell's informant","ep":13},
    {"s":"rawls","t":"mcnulty","type":"conflict","label":"Punitive transfer to the Marine Unit","ep":13},
    {"s":"mcnulty","t":"reese","type":"conflict","label":"Calls the FBI side 'empty suits' ignoring West Baltimore","ep":13},
    {"s":"mcnulty","t":"levy","type":"conflict","label":"Threatens to investigate Levy's finances unless he produces Savino","ep":11},
    {"s":"bunk","t":"cole","type":"conflict","label":"Bunk and McNulty keep Omar's role in the Stinkum murder from Cole","ep":8},
    {"s":"holley","t":"bubbles","type":"conflict","label":"Beats Bubbles in interrogation after Greggs' shooting","ep":11},
    {"s":"elena","t":"pearlman","type":"conflict","label":"Has photos of McNulty with Pearlman, used in the custody fight","ep":10},
    {"s":"landsman","t":"mcnulty","type":"alliance","label":"Argues McNulty's case to Rawls and wins him a clean-slate deal","ep":4},
    {"s":"santangelo","t":"mcnulty","type":"alliance","label":"After McNulty clears a case for him, warns that Rawls is after him","ep":7},
    {"s":"valchek","t":"daniels","type":"alliance","label":"Owes Daniels a favor for protecting Prez","ep":3},
    {"s":"cantrell","t":"daniels","type":"alliance","label":"Trades Sydnor to Daniels in exchange for taking Prez","ep":2},
    {"s":"phelan","t":"burrell","type":"political","label":"Calls Burrell and demands a Barksdale investigation","ep":1},
    {"s":"burrell","t":"daniels","type":"political","label":"Mandates a quick buy-bust case with no wiretaps","ep":1},
    {"s":"valchek","t":"prez","type":"political","label":"Patronage: shields his son-in-law's career","ep":2},
    {"s":"rawls","t":"santangelo","type":"political","label":"Pressures him to inform on McNulty; ultimatum to clear a case or leave Homicide","ep":7},
    {"s":"burrell","t":"daniels","type":"political","label":"Orders the cash seized from Davis's driver returned and moves to shut the case","ep":8},
    {"s":"phelan","t":"burrell","type":"political","label":"Threatens contempt if the wiretap is shut down early","ep":8},
    {"s":"burrell","t":"daniels","type":"political","label":"Overrules him and orders the Orlando buy-bust","ep":10},
    {"s":"davis","t":"burrell","type":"political","label":"Demands Burrell control Daniels after the probe of his driver and campaign money","ep":12},
    {"s":"burrell","t":"daniels","type":"political","label":"Threatens him with the FBI file on his Eastern District-era assets","ep":12},
    {"s":"demper","t":"pearlman","type":"political","label":"Alarmed by the campaign-finance angle; her job is at risk","ep":12},
    {"s":"burrell","t":"carver","type":"political","label":"Rewards his informing with a promotion to sergeant","ep":13},
    {"s":"cantrell","t":"daniels","type":"political","label":"Rivals for promotion: Cantrell is made major instead of Daniels","ep":13},
    {"s":"pearlman","t":"daniels","type":"legal","label":"Legal liaison to the detail","ep":1},
    {"s":"phelan","t":"pearlman","type":"legal","label":"Signs the detail's orders; he flirts, and she uses it to keep him on side","ep":5},
    {"s":"reed","t":"prez","type":"legal","label":"IID investigates his brutality case","ep":3},
    {"s":"levy","t":"pearlman","type":"legal","label":"Opposing counsel; negotiates the Barksdale pleas","ep":13},
    {"s":"bryant","t":"daniels","type":"legal","label":"Federal prosecutor at the meeting on taking the case federal","ep":13},
    {"s":"levy","t":"nakeesha","type":"conflict","label":"Flags her to Avon and Stringer as a loose end","ep":12},
    {"s":"prez","t":"kevin","type":"conflict","label":"Pistol-whips him; Kevin loses the sight in one eye","ep":2},
    {"s":"herc","t":"bodie","type":"conflict","label":"Herc and Carver arrest and beat him, twice","ep":3},
    {"s":"bodie","t":"mahon","type":"conflict","label":"Punches Mahon during the Pit raid","ep":3},
    {"s":"daniels","t":"avon","type":"conflict","label":"Arrests Avon at Orlando's","ep":12},
    {"s":"hansen","t":"dangelo","type":"legal","label":"Prosecutes his murder trial and loses","ep":1},
    {"s":"phelan","t":"dangelo","type":"legal","label":"Presides over his acquittal","ep":1},
    {"s":"barlow","t":"dangelo","type":"investigates","label":"Primary detective on the Pooh Blanchard case","ep":1},
    {"s":"barlow","t":"stringer","type":"conflict","label":"Threatens Stringer after the acquittal","ep":1},
    {"s":"bunk","t":"gant","type":"investigates","label":"Primary on the Gant murder","ep":1},
    {"s":"mcnulty","t":"avon","type":"investigates","label":"Takes Avon to Judge Phelan","ep":1},
    {"s":"bunk","t":"deirdre","type":"investigates","label":"Reopens the Kresson murder with McNulty","ep":4},
    {"s":"kima","t":"browning","type":"investigates","label":"Pushes for a stiff sentence to squeeze him","ep":4},
    {"s":"freamon","t":"dangelo","type":"investigates","label":"Identifies D'Angelo's pager number","ep":4},
    {"s":"norris","t":"brandon","type":"investigates","label":"Works Brandon's murder with Holley","ep":6},
    {"s":"holley","t":"brandon","type":"investigates","label":"Works Brandon's murder with Norris","ep":6},
    {"s":"bunk","t":"bird","type":"investigates","label":"Arrests him for the Gant murder","ep":7},
    {"s":"mcnulty","t":"stringer","type":"investigates","label":"Tails him to an economics class","ep":8},
    {"s":"cole","t":"stinkum","type":"investigates","label":"Catches the Stinkum murder","ep":8},
    {"s":"herc","t":"dayday","type":"investigates","label":"Stops Davis's driver and seizes the cash","ep":8},
    {"s":"carver","t":"dayday","type":"investigates","label":"Stops Davis's driver and seizes the cash","ep":8},
    {"s":"littleman","t":"dayday","type":"business","label":"Hands him a bag of cash","ep":8},
    {"s":"sydnor","t":"avon","type":"investigates","label":"Spots Avon at the basketball game","ep":9},
    {"s":"norris","t":"orlando","type":"investigates","label":"Leads the investigation into the Orlando shooting","ep":11},
    {"s":"bunk","t":"weebey","type":"investigates","label":"Takes his confession","ep":13},
    {"s":"nathan","t":"weebey","type":"legal","label":"Sits in on his confession","ep":13},
    {"s":"freamon","t":"weebey","type":"investigates","label":"Finds him in Philadelphia through phone records","ep":13},
    {"s":"herc","t":"ronniemo","type":"investigates","label":"Picks him up in the final sweep","ep":13},
    {"s":"kima","t":"littleman","type":"investigates","label":"Picks him out of a photo array","ep":13},
    {"s":"pearlman","t":"dangelo","type":"legal","label":"Takes his proffer","ep":13},
    {"s":"pearlman","t":"avon","type":"legal","label":"Presents his plea: seven years","ep":13},
    {"s":"bobbybrown","t":"gant","type":"investigates","label":"First on scene at the Gant murder","ep":1},
    {"s":"bobbybrown","t":"mcnulty","type":"alliance","label":"Watches Wallace's squat for McNulty, paid in beer and takeout","ep":10},
  ],
  charts: [
    {
      "id": "barksdale",
      "tab": "Barksdale",
      "faction": "barksdale",
      "kicker": "West Baltimore · the towers & the Pit",
      "title": "The Barksdale Organization",
      "blurb": "Avon at the top, Stringer running the business, the muscle to one side and the crews that sell the product below. Click anyone to trace their chain of command.",
      "roots": [
        "avon"
      ],
      "units": {
        "_side": {
          "label": "Fronts, family & counsel"
        }
      },
      "edges": [
        [
          "_side",
          "avon",
          "dotted"
        ],
        [
          "orlando",
          "_side"
        ],
        [
          "levy",
          "_side"
        ],
        [
          "brianna",
          "_side"
        ],
        [
          "roberto",
          "_side"
        ],
        [
          "stringer",
          "avon"
        ],
        [
          "weebey",
          "avon"
        ],
        [
          "stinkum",
          "stringer"
        ],
        [
          "dangelo",
          "stringer"
        ],
        [
          "ronniemo",
          "stringer"
        ],
        [
          "kevin",
          "stinkum"
        ],
        [
          "bodie",
          "dangelo"
        ],
        [
          "poot",
          "dangelo"
        ],
        [
          "wallace",
          "dangelo"
        ],
        [
          "sterling",
          "dangelo"
        ],
        [
          "cass",
          "dangelo"
        ],
        [
          "bird",
          "weebey"
        ],
        [
          "savino",
          "weebey"
        ],
        [
          "littleman",
          "weebey"
        ]
      ]
    },
    {
      "id": "bpd",
      "tab": "Police",
      "faction": "police",
      "kicker": "Baltimore Police Department",
      "title": "Chain of Command",
      "blurb": "Where everyone sat when the season began. Dotted lines are informal: people reporting to someone outside their own chain.",
      "roots": [
        "frazier"
      ],
      "units": {
        "_pawn": {
          "label": "Pawn Shop Unit"
        }
      },
      "edges": [
        [
          "burrell",
          "frazier"
        ],
        [
          "rawls",
          "burrell"
        ],
        [
          "foerster",
          "burrell"
        ],
        [
          "valchek",
          "burrell"
        ],
        [
          "reed",
          "burrell"
        ],
        [
          "cantrell",
          "burrell",
          "dotted"
        ],
        [
          "_pawn",
          "burrell",
          "dotted"
        ],
        [
          "landsman",
          "rawls"
        ],
        [
          "barlow",
          "rawls"
        ],
        [
          "mcnulty",
          "landsman"
        ],
        [
          "bunk",
          "landsman"
        ],
        [
          "santangelo",
          "landsman"
        ],
        [
          "cole",
          "landsman"
        ],
        [
          "norris",
          "landsman"
        ],
        [
          "holley",
          "landsman"
        ],
        [
          "daniels",
          "foerster"
        ],
        [
          "kima",
          "daniels"
        ],
        [
          "herc",
          "daniels"
        ],
        [
          "carver",
          "daniels"
        ],
        [
          "prez",
          "cantrell"
        ],
        [
          "sydnor",
          "cantrell"
        ],
        [
          "freamon",
          "_pawn"
        ]
      ],
      "roles": {
        "cantrell": "Lieutenant; unit not named on screen"
      },
      "extra": [
        [
          "carver",
          "burrell",
          "leaks to Burrell"
        ],
        [
          "santangelo",
          "rawls",
          "reports on McNulty"
        ]
      ]
    },
    {
      "id": "detail",
      "tab": "The Detail",
      "faction": "police",
      "kicker": "Formed ep 1 · dissolved ep 13",
      "title": "The Detail",
      "blurb": "Burrell set it up to placate a judge, and commanders filled it with people they wanted rid of. Several castoffs became its best investigators.",
      "roots": [
        "burrell"
      ],
      "units": {
        "_narc": {
          "label": "From Narcotics"
        },
        "_hom": {
          "label": "From Homicide"
        },
        "_pawn": {
          "label": "From the Pawn Shop"
        },
        "_cant": {
          "label": "From Cantrell's unit"
        },
        "_dump": {
          "label": "Dumped on the detail"
        }
      },
      "edges": [
        [
          "daniels",
          "burrell"
        ],
        [
          "_narc",
          "daniels"
        ],
        [
          "_hom",
          "daniels"
        ],
        [
          "_pawn",
          "daniels"
        ],
        [
          "_cant",
          "daniels"
        ],
        [
          "_dump",
          "daniels"
        ],
        [
          "pearlman",
          "daniels",
          "dotted"
        ],
        [
          "kima",
          "_narc"
        ],
        [
          "herc",
          "_narc"
        ],
        [
          "carver",
          "_narc"
        ],
        [
          "mcnulty",
          "_hom"
        ],
        [
          "santangelo",
          "_hom"
        ],
        [
          "freamon",
          "_pawn"
        ],
        [
          "prez",
          "_cant"
        ],
        [
          "sydnor",
          "_cant"
        ],
        [
          "polk",
          "_dump"
        ],
        [
          "mahon",
          "_dump"
        ]
      ],
      "roles": {
        "burrell": "Ordered the detail",
        "daniels": "Detail commander",
        "pearlman": "Legal liaison (ASA)",
        "kima": "Lead detective; runs Bubbles",
        "herc": "Street surveillance, seizures",
        "carver": "Street work; Burrell's mole",
        "mcnulty": "Pushed for the wire; works Omar",
        "santangelo": "Old files; Rawls's mole",
        "freamon": "The wire and the money trail",
        "prez": "Cracks the pager code; wire logs",
        "sydnor": "Undercover buys, surveillance",
        "polk": "Worked leads with Mahon",
        "mahon": "Worked leads with Polk"
      },
      "extra": [
        [
          "carver",
          "burrell",
          "leaks to Burrell"
        ]
      ]
    },
    {
      "id": "informants",
      "tab": "Informants",
      "faction": "street",
      "kicker": "Who talks, and to whom",
      "title": "Informants",
      "blurb": "Every source in the season and the person they feed. Some are paid, some are scared, and one is a cop informing on his own unit.",
      "roots": [
        "phelan",
        "kima",
        "freamon",
        "burrell",
        "rawls"
      ],
      "edges": [
        [
          "mcnulty",
          "phelan",
          "dotted"
        ],
        [
          "omar",
          "mcnulty",
          "dotted"
        ],
        [
          "wallace",
          "mcnulty",
          "dotted"
        ],
        [
          "dangelo",
          "mcnulty",
          "dotted"
        ],
        [
          "bubbles",
          "kima",
          "dotted"
        ],
        [
          "orlando",
          "kima",
          "dotted"
        ],
        [
          "shardene",
          "freamon",
          "dotted"
        ],
        [
          "carver",
          "burrell",
          "dotted"
        ],
        [
          "santangelo",
          "rawls",
          "dotted"
        ]
      ],
      "roles": {
        "phelan": "The judge McNulty goes to",
        "mcnulty": "Backchannel to Phelan; handles Omar",
        "omar": "Names Bird in the Gant killing",
        "wallace": "Statement on Brandon's murder",
        "dangelo": "Proffer in ep 13, then backs out",
        "kima": "Handles Bubbles and Orlando",
        "bubbles": "Paid informant; marks the dealers",
        "orlando": "Gives up Avon after his arrest",
        "freamon": "Turns Shardene",
        "shardene": "Wears a wire; maps Avon's office",
        "burrell": "Has a mole in the detail",
        "carver": "Leaks the detail's moves",
        "rawls": "Wants McNulty gone",
        "santangelo": "Told to find dirt on McNulty"
      }
    },
    {
      "id": "street",
      "tab": "Street",
      "faction": "street",
      "kicker": "Outside the Barksdale chain",
      "title": "The Street",
      "blurb": "The stick-up crew that robs the Pit, the addicts who inform, and the East Side boss who plays both sides.",
      "roots": [
        "omar",
        "propjoe",
        "bubbles"
      ],
      "edges": [
        [
          "brandon",
          "omar"
        ],
        [
          "bailey",
          "omar"
        ],
        [
          "johnny",
          "bubbles",
          "dotted"
        ],
        [
          "walon",
          "bubbles",
          "dotted"
        ]
      ],
      "roles": {
        "johnny": "Bubbles' hustling partner",
        "walon": "Bubbles' NA sponsor"
      }
    },
    {
      "id": "law",
      "tab": "Law & Politics",
      "faction": "law",
      "kicker": "Courthouse, City Hall & the State House",
      "title": "Law & Politics",
      "blurb": "They don't report to each other, but each one can speed the case up or shut it down.",
      "roots": [
        "demper",
        "phelan",
        "levy",
        "davis",
        "reese"
      ],
      "edges": [
        [
          "pearlman",
          "demper"
        ],
        [
          "nathan",
          "demper"
        ],
        [
          "hansen",
          "demper"
        ],
        [
          "dayday",
          "davis"
        ],
        [
          "fitzhugh",
          "reese"
        ],
        [
          "bryant",
          "reese",
          "dotted"
        ]
      ],
      "roles": {
        "bryant": "Federal prosecutor at the FBI meeting"
      }
    },
  ],
  ladders: [
    {
      "id": "game",
      "title": "The Game",
      "org": "Barksdale Organization",
      "blurb": "Run like a business with a body count. Promotions come from Avon and are delivered by Stringer, and the youngest workers are the most expendable.",
      "rungs": [
        {
          "id": "kingpin",
          "title": "Kingpin",
          "blurb": "Owns the territory and gives the big orders: bounties, promotions, killings. Stays off the street and keeps nothing in his name."
        },
        {
          "id": "second",
          "title": "Second-in-command",
          "blurb": "Runs the business day to day. From episode 10, every call to Avon goes through him."
        },
        {
          "id": "enforcer",
          "title": "Chief enforcer",
          "aka": "Top soldier",
          "blurb": "Avon's most trusted soldier. Drives, moves money and handles the killings that matter."
        },
        {
          "id": "soldiers",
          "title": "Soldiers",
          "aka": "Muscle",
          "blurb": "Protection, witness intimidation, resupply runs and contract killings. They sit in court to scare witnesses."
        },
        {
          "id": "crewchief",
          "title": "Crew chiefs",
          "aka": "Lieutenants",
          "blurb": "One for each tower and one for the Pit. They carry pagers, manage the crew, count the take and answer to Stringer."
        },
        {
          "id": "dealers",
          "title": "Hand-to-hand",
          "aka": "Slingers",
          "blurb": "Work the customers. Money and drugs never pass through the same hands."
        },
        {
          "id": "stash",
          "title": "Stash & runners",
          "blurb": "Keep the package in a vacant unit and carry resupply from the towers to the Pit."
        },
        {
          "id": "lookouts",
          "title": "Lookouts",
          "aka": "Hoppers",
          "blurb": "The youngest workers watch for police and stick-up crews. Being sent back down here is a punishment."
        }
      ],
      "levers": [
        {
          "b": "Family.",
          "text": "Blood buys second chances. D'Angelo kills a man in front of witnesses and is moved down to the Pit, not out."
        },
        {
          "b": "Violence.",
          "text": "Loyalty proven with a gun gets rewarded. Bodie kills Wallace on Stringer's order and ends the season running the towers."
        },
        {
          "b": "Vacancies.",
          "text": "Arrests and bodies open slots fast. By the finale most of the muscle is dead or in custody, and teenagers fill the gaps."
        },
        {
          "b": "No way out.",
          "text": "Wallace quits, talks to the police and comes back. To Stringer, that makes him a loose end."
        },
        {
          "b": "The king stay the king.",
          "text": "D'Angelo's chess lesson (ep 3): a pawn that makes it across the board can become a queen, but never the king."
        }
      ],
      "color": "--sodium"
    },
    {
      "id": "job",
      "title": "The Job",
      "org": "Baltimore Police Department",
      "blurb": "Nine ranks from patrol officer to commissioner. On paper you climb by exam and merit. In Season 1, patrons, stats and favors decide who moves.",
      "rungs": [
        {
          "id": "commissioner",
          "title": "Commissioner",
          "blurb": "Head of the department. Frazier is seen only after Kima's shooting."
        },
        {
          "id": "deputy",
          "title": "Deputy Commissioner",
          "aka": "Operations",
          "blurb": "Runs day-to-day policing. Unit majors answer to Burrell, and he decides the detail's fate."
        },
        {
          "id": "colonel",
          "title": "Colonel",
          "blurb": "Senior command rank above major.",
          "none": "None on screen in Season 1"
        },
        {
          "id": "major",
          "title": "Major",
          "blurb": "Commands a unit (Homicide, Narcotics, Internal Investigations) or a patrol district. Enough clout to shield or punish."
        },
        {
          "id": "captain",
          "title": "Captain",
          "blurb": "The rank between lieutenant and major.",
          "none": "None on screen in Season 1"
        },
        {
          "id": "lieutenant",
          "title": "Lieutenant",
          "blurb": "Commands a shift, a unit or a detail. The right patrons make you next in line for major."
        },
        {
          "id": "sergeant",
          "title": "Sergeant",
          "blurb": "First-line supervisor. Promotion comes by written exam and a ranked list that the brass can reorder."
        },
        {
          "id": "detective",
          "title": "Detective",
          "blurb": "Plainclothes investigator in a unit. Can be loaned out to a detail, or dumped on one."
        },
        {
          "id": "officer",
          "title": "Officer",
          "aka": "Patrol",
          "blurb": "Uniformed patrol in a district. Sending a detective back to a radio car is a punishment."
        }
      ],
      "levers": [
        {
          "b": "The list can be reordered.",
          "text": "Herc scores higher on the sergeant's exam. Carver, who has been informing to Burrell, gets the stripes."
        },
        {
          "b": "Patrons.",
          "text": "Major Valchek keeps his son-in-law Prez in the job. Senator Davis gets his driver's seized cash back."
        },
        {
          "b": "\"Where don't you want to go?\"",
          "text": "Punitive transfers are the stick. McNulty names the Marine Unit in ep 1 and ends up there in ep 13. Freamon spent 13 years and 4 months in the Pawn Shop Unit."
        },
        {
          "b": "Leverage.",
          "text": "Burrell holds an old FBI file on Daniels' finances and uses it when Daniels won't shut the case down."
        },
        {
          "b": "Stats over cases.",
          "text": "The brass want buy-busts, seizures and photo ops. Daniels delivers Avon Barksdale and is passed over; Cantrell makes major."
        }
      ],
      "color": "--fluoro"
    },
  ],
  episodes: [
    {
      "n": 1,
      "title": "The Target",
      "epigraph": "...when it's not your turn.",
      "speaker": "McNulty",
      "air": "2002-06-02",
      "writer": "David Simon",
      "director": "Clark Johnson",
      "summary": "D'Angelo Barksdale walks free on a murder charge after a witness recants, and Detective McNulty goes over his bosses' heads to Judge Phelan about Avon Barksdale's drug organization. The department reluctantly forms a small detail under Lt. Daniels, while D'Angelo is demoted to running the low-rise 'Pit'. The episode ends with the other trial witness, William Gant, found shot dead.",
      "events": [
        {
          "type": "death",
          "text": "McNulty works the killing of Omar 'Snot Boogie' Betts, shot by a fellow player after robbing a back-alley craps game; a witness agrees to identify the shooter.",
          "who": [
            "snotboogie",
            "mcnulty"
          ]
        },
        {
          "type": "trial",
          "text": "D'Angelo is acquitted of murdering Pooh Blanchard after security guard Nakeesha Lyles recants her identification on the stand; William Gant had testified against him.",
          "who": [
            "dangelo",
            "nakeesha",
            "gant",
            "levy",
            "phelan",
            "stringer",
            "weebey",
            "stinkum",
            "savino"
          ]
        },
        {
          "type": "other",
          "text": "McNulty complains to Judge Phelan that no one is investigating Avon Barksdale; Phelan calls Deputy Commissioner Burrell, and an angry Rawls makes McNulty write a report on the Barksdale murders. Landsman warns him about reassignment and McNulty admits he dreads the marine unit.",
          "who": [
            "mcnulty",
            "phelan",
            "burrell",
            "rawls",
            "landsman"
          ]
        },
        {
          "type": "demotion",
          "text": "Avon scolds D'Angelo for a needless public murder, and Stringer demotes him from the high-rise towers to running the low-rise 'Pit' with Bodie, Poot and Wallace.",
          "who": [
            "dangelo",
            "avon",
            "stringer",
            "bodie",
            "poot",
            "wallace"
          ]
        },
        {
          "type": "transfer",
          "text": "Burrell orders Narcotics Lt. Daniels to form a Barksdale detail; Daniels brings Greggs, Herc and Carver, and Rawls details McNulty and Santangelo from Homicide.",
          "who": [
            "daniels",
            "kima",
            "herc",
            "carver",
            "mcnulty",
            "santangelo",
            "burrell",
            "rawls",
            "foerster"
          ]
        },
        {
          "type": "wiretap",
          "text": "McNulty argues that only a wiretap can make the case, but Burrell wants quick buy-busts and rules out long-term work, body mics and dialed number recorders. FBI agent Fitzhugh shows McNulty the Bureau's surveillance gear and says its drug squads are being wound down.",
          "who": [
            "mcnulty",
            "daniels",
            "burrell",
            "fitzhugh"
          ]
        },
        {
          "type": "informant",
          "text": "After Bodie's crew beats Johnny for passing counterfeit money, Bubbles agrees to inform for Greggs on the Barksdale crew.",
          "who": [
            "bubbles",
            "kima",
            "johnny",
            "bodie",
            "poot",
            "wallace"
          ]
        },
        {
          "type": "death",
          "text": "On his second day in the Pit, D'Angelo finds William Gant, the other witness at his trial, shot dead in the street.",
          "who": [
            "gant",
            "dangelo",
            "bunk"
          ]
        }
      ]
    },
    {
      "n": 2,
      "title": "The Detail",
      "epigraph": "You cannot lose if you do not play.",
      "speaker": "Marla Daniels",
      "air": "2002-06-09",
      "writer": "David Simon",
      "director": "Clark Johnson",
      "summary": "McNulty and Bunk work the Gant murder and manipulate D'Angelo into writing a letter of condolence before Levy intervenes. Daniels' detail is filled out with castoffs, and Bubbles marks the Barksdale crew for police photographers. A drunken late-night trip to the towers by Herc, Carver and Prez leaves a teenager blind in one eye.",
      "events": [
        {
          "type": "transfer",
          "text": "The detail moves into a basement office and is filled out with castoffs: Prez (who accidentally fires his gun indoors), Freamon, Polk and Mahon. Daniels gets Lt. Cantrell to lend him Detective Sydnor as well.",
          "who": [
            "prez",
            "freamon",
            "polk",
            "mahon",
            "sydnor",
            "cantrell",
            "daniels"
          ]
        },
        {
          "type": "informant",
          "text": "Bubbles marks Barksdale dealers by selling them red hats while detectives photograph them from a rooftop.",
          "who": [
            "bubbles",
            "kima",
            "herc",
            "carver"
          ]
        },
        {
          "type": "arrest",
          "text": "McNulty and Bunk arrest D'Angelo without a charge and play on his guilt until he writes a condolence letter to Gant's family; Levy arrives and stops the interrogation.",
          "who": [
            "dangelo",
            "mcnulty",
            "bunk",
            "kima",
            "levy"
          ]
        },
        {
          "type": "other",
          "text": "Avon rebukes D'Angelo at a family gathering for writing the letter.",
          "who": [
            "avon",
            "dangelo",
            "stringer",
            "donette"
          ]
        },
        {
          "type": "other",
          "text": "A drunken Herc, Carver and Prez harass people at the towers. Prez pistol-whips teenager Kevin Johnston, who later loses the sight in one eye. Residents rain bottles and debris on the officers, Herc is injured and their car is burned. Daniels coaches them to tell IID a self-defense story.",
          "who": [
            "prez",
            "herc",
            "carver",
            "kevin",
            "daniels"
          ]
        },
        {
          "type": "transfer",
          "text": "The Gant murder makes the Baltimore Sun's front page, and a furious Rawls has Landsman clear McNulty's belongings out of Homicide.",
          "who": [
            "mcnulty",
            "rawls",
            "landsman",
            "phelan"
          ]
        }
      ]
    },
    {
      "n": 3,
      "title": "The Buys",
      "epigraph": "The King stay the King.",
      "speaker": "D'Angelo Barksdale",
      "air": "2002-06-16",
      "writer": "David Simon",
      "director": "Peter Medak",
      "summary": "Pressured to produce quick seizures, Daniels orders a raid on the Pit over McNulty's objections. It turns up little, but Freamon copies down a number written on a wall. Stick-up man Omar Little robs the Pit stash, and D'Angelo teaches his crew chess using the drug trade as the analogy.",
      "events": [
        {
          "type": "demotion",
          "text": "Prez is restricted to office duty while IID looks into the beating (his father-in-law, Major Valchek, objects), and Herc is placed on medical leave.",
          "who": [
            "prez",
            "herc",
            "daniels",
            "valchek",
            "burrell",
            "reed"
          ]
        },
        {
          "type": "informant",
          "text": "Santangelo is revealed as Rawls' mole inside the detail, tasked with finding dirt on McNulty.",
          "who": [
            "santangelo",
            "rawls",
            "mcnulty"
          ]
        },
        {
          "type": "shooting",
          "text": "Omar's crew robs the Pit stash; Omar shoots young dealer Sterling in the knee when he won't give up the location, and Brandon lets Omar's name slip.",
          "who": [
            "omar",
            "brandon",
            "bailey",
            "sterling",
            "stinkum",
            "bodie",
            "poot"
          ]
        },
        {
          "type": "raid",
          "text": "Daniels orders a raid on the Pit; McNulty refuses to take part. The stash has moved and little is found, but Freamon notices a number written on a wall and copies it down.",
          "who": [
            "daniels",
            "mcnulty",
            "freamon",
            "kima",
            "carver",
            "herc"
          ]
        },
        {
          "type": "arrest",
          "text": "During the raid Bodie punches Detective Mahon; Carver, Greggs and other officers beat him and he is arrested and sent to juvenile detention.",
          "who": [
            "bodie",
            "mahon",
            "carver",
            "kima",
            "herc"
          ]
        },
        {
          "type": "other",
          "text": "Fitzhugh tells McNulty the FBI once investigated Daniels over hundreds of thousands of dollars in unexplained assets and passed its findings to Burrell.",
          "who": [
            "fitzhugh",
            "mcnulty",
            "daniels",
            "burrell"
          ]
        }
      ]
    },
    {
      "n": 4,
      "title": "Old Cases",
      "epigraph": "Thin line 'tween heaven and here.",
      "speaker": "Bubbles",
      "air": "2002-06-23",
      "writer": "David Simon",
      "director": "Clement Virgo",
      "summary": "Bunk and McNulty reinvestigate the murder of Deirdre Kresson and find evidence earlier detectives missed. Greggs realizes the crew relies on pagers, and Freamon reveals that the number from the raid belongs to D'Angelo. Avon puts a price on Omar's crew, and D'Angelo boasts to his crew that he killed Kresson.",
      "events": [
        {
          "type": "trial",
          "text": "McNulty and Greggs push for a maximum sentence against Barksdale dealer Marvin Browning to squeeze him, but he refuses a deal.",
          "who": [
            "browning",
            "mcnulty",
            "kima"
          ]
        },
        {
          "type": "transfer",
          "text": "Mahon takes an early retirement with a pension bump because of the injury from Bodie's punch.",
          "who": [
            "mahon",
            "polk"
          ]
        },
        {
          "type": "other",
          "text": "Bodie escapes from the low-security juvenile facility; Herc and Carver raid his grandmother's home and find only her.",
          "who": [
            "bodie",
            "herc",
            "carver"
          ]
        },
        {
          "type": "other",
          "text": "Pushed by Landsman, Bunk and McNulty reinvestigate the months-old murder of Deirdre Kresson and find a bullet and shell casing that the original detectives missed. Rawls offers McNulty a clean slate in Homicide if he wraps up the detail within two weeks.",
          "who": [
            "bunk",
            "mcnulty",
            "landsman",
            "rawls",
            "deirdre"
          ]
        },
        {
          "type": "wiretap",
          "text": "Greggs realizes the dealers use pagers to avoid call records. Freamon reveals the number from the Pit wall is D'Angelo's pager, giving the detail a target for a clone.",
          "who": [
            "kima",
            "freamon",
            "dangelo",
            "daniels",
            "mcnulty"
          ]
        },
        {
          "type": "other",
          "text": "Avon puts out a contract on Omar's crew and doubles the bounty on hearing that Omar is gay; Stringer worries there is a leak in D'Angelo's crew.",
          "who": [
            "avon",
            "stringer",
            "stinkum",
            "weebey",
            "omar",
            "brandon",
            "bailey"
          ]
        },
        {
          "type": "other",
          "text": "D'Angelo tells Bodie, Poot and Wallace that he murdered Kresson, Avon's scorned girlfriend, after she threatened to go to the police.",
          "who": [
            "dangelo",
            "bodie",
            "poot",
            "wallace",
            "deirdre"
          ]
        }
      ]
    },
    {
      "n": 5,
      "title": "The Pager",
      "epigraph": "...a little slow, a little late.",
      "speaker": "Avon Barksdale",
      "air": "2002-06-30",
      "writer": "Ed Burns",
      "director": "Clark Johnson",
      "summary": "Judge Phelan approves a clone of D'Angelo's pager and Prez cracks the crew's number code. Without audio on the payphones, though, the detail can only watch the pages go by. After learning his partner Bailey is dead, Omar tells McNulty and Greggs that Bird killed Gant, and Wallace and Poot spot Omar's boyfriend Brandon in an arcade.",
      "events": [
        {
          "type": "wiretap",
          "text": "Phelan signs the affidavit for a clone of D'Angelo's pager. The messages turn out to be coded phone numbers, and Prez cracks the simple keypad number-swap code. Freamon tells Daniels they need audio on the Pit payphones.",
          "who": [
            "phelan",
            "freamon",
            "prez",
            "daniels",
            "dangelo"
          ]
        },
        {
          "type": "arrest",
          "text": "Herc and Carver find Bodie back in the low-rises and violently arrest him for absconding. He refuses a deal and is beaten, but the three end up shooting pool while they wait for juvenile intake.",
          "who": [
            "bodie",
            "herc",
            "carver"
          ]
        },
        {
          "type": "other",
          "text": "Bunk gets a ballistics match: the gun from the Kresson scene links to the Barksdales and was used in two other killings.",
          "who": [
            "bunk",
            "landsman",
            "deirdre"
          ]
        },
        {
          "type": "death",
          "text": "Omar's partner John Bailey is killed off-screen (Wee-Bey takes credit for it with Avon). McNulty breaks the news to Omar at a cemetery.",
          "who": [
            "bailey",
            "weebey",
            "omar",
            "mcnulty",
            "kima"
          ]
        },
        {
          "type": "informant",
          "text": "Omar tells McNulty and Greggs that Barksdale soldier Bird killed William Gant, and that he knows Bubbles is their informant.",
          "who": [
            "omar",
            "bird",
            "gant",
            "mcnulty",
            "kima",
            "bubbles"
          ]
        },
        {
          "type": "promotion",
          "text": "Avon and Stringer plan to take the open Edmondson Avenue corners, and Avon picks Stinkum to run them.",
          "who": [
            "stinkum",
            "avon",
            "stringer"
          ]
        },
        {
          "type": "death",
          "text": "Wallace and Poot spot Brandon in an arcade and D'Angelo passes it up the chain from the Pit phones. Stringer brings Wee-Bey, Bird and Stinkum, and Brandon is taken and killed; his body is found in episode 6. The detail logs the pages, but the calls themselves are not recorded.",
          "who": [
            "brandon",
            "wallace",
            "poot",
            "dangelo",
            "stringer",
            "weebey",
            "bird",
            "stinkum"
          ]
        }
      ]
    },
    {
      "n": 6,
      "title": "The Wire",
      "epigraph": "...and all the pieces matter.",
      "speaker": "Freamon",
      "air": "2002-07-07",
      "writer": "David Simon",
      "director": "Ed Bianchi",
      "summary": "Brandon's tortured body turns up in the low-rises, and a devastated Omar agrees to testify against Bird in the Gant killing. Wiretaps go up on the Pit payphones and Prez shows a real talent for the work. Daniels gets Burrell to overrule Rawls' push to charge the old murders early.",
      "events": [
        {
          "type": "other",
          "text": "Wallace and Poot find Brandon's mutilated body outside their squat. Avon, Stringer and Stinkum pay D'Angelo and Wallace a reward, and Avon tells D'Angelo that Wee-Bey and Bird did it.",
          "who": [
            "brandon",
            "wallace",
            "poot",
            "avon",
            "stringer",
            "stinkum",
            "dangelo",
            "weebey",
            "bird"
          ]
        },
        {
          "type": "trial",
          "text": "Levy gets Bodie released by a judge on home supervision with regular calls to a probation officer, to the surprise of Herc and Carver.",
          "who": [
            "bodie",
            "levy",
            "herc",
            "carver"
          ]
        },
        {
          "type": "arrest",
          "text": "Johnny is arrested while buying drugs.",
          "who": [
            "johnny",
            "bubbles"
          ]
        },
        {
          "type": "wiretap",
          "text": "Audio wiretaps on the Pit payphones go live and must be monitored around the clock. Freamon teaches Prez to log conspiracy talk as 'pertinent', and Prez shows real aptitude for the work.",
          "who": [
            "freamon",
            "prez",
            "herc",
            "daniels",
            "stinkum",
            "bodie"
          ]
        },
        {
          "type": "transfer",
          "text": "Polk comes in drunk; given the choice of working or checking into medical for alcohol abuse, he takes medical leave.",
          "who": [
            "polk",
            "daniels"
          ]
        },
        {
          "type": "other",
          "text": "Rawls orders the old murders charged, which would expose the investigation; Daniels gets Burrell to overrule him, and Rawls asks Santangelo to report on McNulty.",
          "who": [
            "rawls",
            "landsman",
            "bunk",
            "daniels",
            "burrell",
            "santangelo",
            "mcnulty"
          ]
        },
        {
          "type": "informant",
          "text": "Omar identifies Brandon's body at the morgue, the detail matches the pager traffic to the killing, and Omar offers to be a witness in the Gant case.",
          "who": [
            "omar",
            "mcnulty",
            "kima",
            "freamon",
            "brandon"
          ]
        }
      ]
    },
    {
      "n": 7,
      "title": "One Arrest",
      "epigraph": "A man must have a code.",
      "speaker": "Bunk",
      "air": "2002-07-21",
      "writer": "Rafael Alvarez",
      "director": "Joe Chappelle",
      "summary": "Decoded pages let the detail seize a resupply package while deliberately letting Stinkum drive away, and Bird is arrested for Gant's murder. Rawls leans on Santangelo to inform on McNulty. A wary Avon halts trade, and Stringer has the Pit payphones ripped out.",
      "events": [
        {
          "type": "arrest",
          "text": "Prez decodes the pages to pinpoint a resupply. The detail arrests the courier, Kevin Johnston (the boy Prez blinded), but lets Stinkum drive off to protect the wire.",
          "who": [
            "kevin",
            "stinkum",
            "herc",
            "carver",
            "sydnor",
            "kima",
            "prez",
            "daniels"
          ]
        },
        {
          "type": "wiretap",
          "text": "Sydnor photographs Stinkum at a payphone as Stringer returns his page, tying voices to faces so the calls can be monitored legally.",
          "who": [
            "sydnor",
            "stinkum",
            "stringer"
          ]
        },
        {
          "type": "arrest",
          "text": "Acting on Omar's tip and a corroborating witness, the detail arrests Bird outside a shooting gallery. Ballistics match his gun to the Gant killing, and he is beaten by Daniels, Landsman and Greggs after taunting them.",
          "who": [
            "bird",
            "mcnulty",
            "bunk",
            "freamon",
            "bubbles",
            "daniels",
            "landsman",
            "kima",
            "omar"
          ]
        },
        {
          "type": "informant",
          "text": "Rawls tells Santangelo to inform on McNulty or clear a case. Omar's information closes one of Santangelo's open cases, and a grateful Santangelo warns McNulty that Rawls is after him.",
          "who": [
            "santangelo",
            "rawls",
            "mcnulty",
            "bunk",
            "omar",
            "landsman"
          ]
        },
        {
          "type": "other",
          "text": "Greggs gets Johnny's possession charge dropped on condition that he enters treatment; Bubbles and Johnny attend a Narcotics Anonymous meeting led by Walon.",
          "who": [
            "johnny",
            "bubbles",
            "kima",
            "walon"
          ]
        },
        {
          "type": "other",
          "text": "Orlando pitches D'Angelo on selling cocaine behind Avon's back.",
          "who": [
            "orlando",
            "dangelo",
            "avon"
          ]
        },
        {
          "type": "wiretap",
          "text": "Stringer berates Stinkum for careless phone use. Avon suspends operations, and Stringer rips out the Pit payphones and orders the crews to rotate phones.",
          "who": [
            "stringer",
            "avon",
            "stinkum",
            "dangelo"
          ]
        }
      ]
    },
    {
      "n": 8,
      "title": "Lessons",
      "epigraph": "Come at the king, you best not miss.",
      "speaker": "Omar",
      "air": "2002-07-28",
      "writer": "David Simon",
      "director": "Gloria Muzio",
      "summary": "Omar ambushes Barksdale enforcers, killing Stinkum and wounding Wee-Bey, and a dancer dies at a Barksdale party. A car stop of Senator Clay Davis's driver turns up a bag of cash, and Burrell tries to shut the case down until Judge Phelan steps in. McNulty follows Stringer to an economics class.",
      "events": [
        {
          "type": "other",
          "text": "Wee-Bey, Stinkum and Savino ransack Omar's apartment and torch his van while he watches from across the street.",
          "who": [
            "weebey",
            "stinkum",
            "savino",
            "omar"
          ]
        },
        {
          "type": "other",
          "text": "Avon beats Orlando in front of the dancers for considering dealing on the side.",
          "who": [
            "avon",
            "orlando",
            "dangelo"
          ]
        },
        {
          "type": "death",
          "text": "At a party celebrating Stinkum's coming promotion, dancer Keisha is taken to a back room by Wee-Bey. D'Angelo later finds her dead, apparently of an overdose.",
          "who": [
            "keisha",
            "weebey",
            "dangelo",
            "stinkum"
          ]
        },
        {
          "type": "death",
          "text": "As Wee-Bey and Stinkum prepare to hit dealer Scar's corner, Omar ambushes them and kills Stinkum.",
          "who": [
            "stinkum",
            "omar",
            "weebey"
          ]
        },
        {
          "type": "shooting",
          "text": "Wee-Bey is wounded in Omar's ambush; Avon raises the bounty on Omar and Stringer proposes luring him out with a fake truce.",
          "who": [
            "weebey",
            "omar",
            "avon",
            "stringer"
          ]
        },
        {
          "type": "seizure",
          "text": "Working a lead from the wire, Herc and Carver stop Senator Clay Davis's driver, Damien 'Day-Day' Price, and seize a bag of cash. Burrell orders the money returned and moves to shut the case down, until Phelan threatens him with contempt if the wiretap is ended early.",
          "who": [
            "dayday",
            "davis",
            "herc",
            "carver",
            "burrell",
            "phelan",
            "daniels",
            "mcnulty",
            "kima"
          ]
        },
        {
          "type": "other",
          "text": "McNulty tails Stringer and discovers he is taking an economics course at Baltimore City Community College.",
          "who": [
            "mcnulty",
            "stringer"
          ]
        },
        {
          "type": "other",
          "text": "Detective Cole catches the Stinkum murder; Bunk and McNulty keep Omar's role quiet, promising Cole a closed case later.",
          "who": [
            "cole",
            "bunk",
            "mcnulty",
            "omar",
            "stinkum"
          ]
        }
      ]
    },
    {
      "n": 9,
      "title": "Game Day",
      "epigraph": "Maybe we won.",
      "speaker": "Herc",
      "air": "2002-08-04",
      "writer": "David H. Melnick & Shamit Choksey",
      "director": "Milčo Mančevski",
      "summary": "Omar gets Avon's pager number from Proposition Joe and lures him into an ambush, but Wee-Bey wounds Omar. The wire leads Herc and Carver to Wee-Bey's cash, and Freamon starts following the money into city records. A shaken Shardene agrees to help the police after seeing her friend's body.",
      "events": [
        {
          "type": "shooting",
          "text": "Omar trades stolen Barksdale goods to Proposition Joe for Avon's pager number, lures Avon outside Orlando's with Wee-Bey's code and opens fire. Avon dives clear and Wee-Bey wings Omar, who retreats.",
          "who": [
            "omar",
            "avon",
            "weebey",
            "propjoe"
          ]
        },
        {
          "type": "seizure",
          "text": "An intercepted call leads Herc and Carver to stop Wee-Bey and seize the money he is moving. Daniels finds the count short, and the missing cash turns up in their car.",
          "who": [
            "herc",
            "carver",
            "weebey",
            "daniels"
          ]
        },
        {
          "type": "other",
          "text": "Freamon starts following the money: City Hall campaign-finance and corporate records show large Barksdale political donations and fronts including Orlando's, a funeral parlor and several warehouses.",
          "who": [
            "freamon",
            "prez",
            "sydnor"
          ]
        },
        {
          "type": "other",
          "text": "At the Eastside-Westside basketball game, which Proposition Joe's team wins, Sydnor recognizes Avon from his old boxing poster.",
          "who": [
            "sydnor",
            "avon",
            "propjoe",
            "herc",
            "carver",
            "stringer"
          ]
        },
        {
          "type": "informant",
          "text": "Freamon and Greggs show Shardene the body of her friend Keisha, found wrapped in a rug in a dumpster. Shardene agrees to help the police and moves out of D'Angelo's apartment.",
          "who": [
            "shardene",
            "keisha",
            "freamon",
            "kima",
            "dangelo"
          ]
        },
        {
          "type": "other",
          "text": "Wallace quits the Pit with D'Angelo's blessing and some cash, but Poot later finds him buying drugs.",
          "who": [
            "wallace",
            "dangelo",
            "poot"
          ]
        },
        {
          "type": "other",
          "text": "Bubbles talks his sister into letting him get clean in her basement.",
          "who": [
            "bubbles",
            "walon",
            "johnny"
          ]
        }
      ]
    },
    {
      "n": 10,
      "title": "The Cost",
      "epigraph": "And then he dropped the bracelets...",
      "speaker": "Greggs",
      "air": "2002-08-11",
      "writer": "David Simon",
      "director": "Brad Anderson",
      "summary": "Orlando is arrested buying cocaine and turns informant, Wallace gives a statement and is sent to the country, and Omar leaves Baltimore after a staged truce meeting. A buy-bust using Orlando goes wrong: Orlando is killed and Greggs is shot.",
      "events": [
        {
          "type": "other",
          "text": "At Stringer's urging, Avon gives up his pager and insulates himself; all contact now goes through Stringer.",
          "who": [
            "avon",
            "stringer",
            "weebey"
          ]
        },
        {
          "type": "other",
          "text": "Judge Phelan backs away from the case after being dropped from the mayor's re-election ticket.",
          "who": [
            "phelan",
            "mcnulty",
            "pearlman"
          ]
        },
        {
          "type": "wiretap",
          "text": "Freamon traces the resupply calls to a Pimlico payphone. Surveillance identifies Little Man on the tower phone and follows the chain to a fortified suburban stash house, and Sydnor and Prez pose as garbage men to pull its trash.",
          "who": [
            "freamon",
            "carver",
            "sydnor",
            "santangelo",
            "prez",
            "littleman"
          ]
        },
        {
          "type": "arrest",
          "text": "Orlando is arrested trying to buy cocaine from an undercover state trooper and gives up Avon's name. Levy visits only to take him off the club's liquor license.",
          "who": [
            "orlando",
            "avon",
            "levy",
            "browning"
          ]
        },
        {
          "type": "informant",
          "text": "McNulty has Wallace picked up. In withdrawal, Wallace gives up Stringer, Wee-Bey and other soldiers in Brandon's murder, and with no money for protective custody Daniels drives him to his grandmother's on the Eastern Shore.",
          "who": [
            "wallace",
            "mcnulty",
            "daniels",
            "pearlman",
            "stringer",
            "weebey"
          ]
        },
        {
          "type": "other",
          "text": "Omar wears a wire to a truce meeting with Stringer brokered by Proposition Joe. Suspecting a trap, he leaves Baltimore for New York, and McNulty sees him off.",
          "who": [
            "omar",
            "stringer",
            "propjoe",
            "mcnulty"
          ]
        },
        {
          "type": "death",
          "text": "Burrell forces a buy-bust with Orlando as informant and Greggs undercover. Savino drives them to a dark lot, and gunmen (Wee-Bey and Little Man) kill Orlando.",
          "who": [
            "orlando",
            "savino",
            "weebey",
            "littleman",
            "kima",
            "burrell",
            "daniels"
          ]
        },
        {
          "type": "shooting",
          "text": "Greggs is shot twice in the same ambush and left critically wounded.",
          "who": [
            "kima",
            "littleman",
            "weebey",
            "mcnulty"
          ]
        }
      ]
    },
    {
      "n": 11,
      "title": "The Hunt",
      "epigraph": "Dope on the damn table.",
      "speaker": "Daniels",
      "air": "2002-08-18",
      "writer": "Joy Lusco",
      "director": "Steve Shill",
      "summary": "With Greggs on life support, the brass orders citywide raids to put drugs on the table for the cameras, and the raids threaten the wiretap case. Daniels discovers a mole in the detail. Stringer has Wee-Bey kill Little Man, D'Angelo drives Wee-Bey to Philadelphia, and Levy produces Savino on a minor charge.",
      "events": [
        {
          "type": "death",
          "text": "Stringer orders Wee-Bey to kill Little Man, whom he blames for shooting a cop. Little Man disappears; Wee-Bey confirms the killing in episode 13.",
          "who": [
            "littleman",
            "weebey",
            "stringer"
          ]
        },
        {
          "type": "other",
          "text": "Summoned by Stringer, D'Angelo fears he is being taken to be killed, but he is sent to drive Wee-Bey into hiding in Philadelphia.",
          "who": [
            "dangelo",
            "weebey",
            "stringer"
          ]
        },
        {
          "type": "wiretap",
          "text": "Freamon finds a page to Stringer from a payphone near the shooting scene, and Little Man's fingerprints come back from the phone and a discarded can.",
          "who": [
            "freamon",
            "prez",
            "littleman",
            "stringer",
            "bunk",
            "landsman"
          ]
        },
        {
          "type": "arrest",
          "text": "Bubbles pages Greggs, is picked up by uniformed officers and is beaten by Holley in interrogation until Landsman intervenes. McNulty sends him back out with money, unaware he is trying to stay clean, and Bubbles points to Wee-Bey and Little Man as the likely shooters.",
          "who": [
            "bubbles",
            "holley",
            "landsman",
            "mcnulty",
            "bunk"
          ]
        },
        {
          "type": "arrest",
          "text": "Under threat from McNulty, Levy produces Savino, who is charged only with trying to sell fake narcotics (baking soda) to Orlando.",
          "who": [
            "savino",
            "levy",
            "mcnulty",
            "pearlman"
          ]
        },
        {
          "type": "raid",
          "text": "Burrell orders citywide raids after the shooting. The stash house, Savino's home and the towers are hit, and large amounts of guns, drugs and cash are seized for the commissioner's photo op.",
          "who": [
            "burrell",
            "rawls",
            "foerster",
            "daniels",
            "herc",
            "carver",
            "frazier"
          ]
        },
        {
          "type": "other",
          "text": "Major Reed confronts Daniels about the targets he withheld to protect the wire, and Daniels realizes someone in the detail is informing for Burrell.",
          "who": [
            "reed",
            "daniels",
            "freamon",
            "mcnulty",
            "burrell"
          ]
        },
        {
          "type": "other",
          "text": "Phelan, now back on the mayor's ticket, reluctantly agrees to intercede with Burrell.",
          "who": [
            "phelan",
            "mcnulty"
          ]
        }
      ]
    },
    {
      "n": 12,
      "title": "Cleaning Up",
      "epigraph": "This is me, yo, right here.",
      "speaker": "Wallace",
      "air": "2002-09-01",
      "writer": "George Pelecanos",
      "director": "Clement Virgo",
      "summary": "The Barksdales go quiet on the phones and start tying up loose ends: witness Nakeesha Lyles is murdered and Stringer orders Bodie to kill Wallace. Using a hidden camera and an FBI tracker, the detail arrests D'Angelo on his way back from a New York drug run, and then Avon himself.",
      "events": [
        {
          "type": "wiretap",
          "text": "Stringer collects the crew's pagers and orders all business done face to face; the wiretaps go silent.",
          "who": [
            "stringer",
            "dangelo",
            "bodie",
            "poot"
          ]
        },
        {
          "type": "transfer",
          "text": "Burrell decides the case is over and scales back the detail, sending Santangelo and Sydnor back to their old posts but letting Daniels keep Freamon and Prez while the court order runs.",
          "who": [
            "burrell",
            "daniels",
            "santangelo",
            "sydnor",
            "reed"
          ]
        },
        {
          "type": "death",
          "text": "After Levy flags her as a loose end, Nakeesha Lyles, the witness who recanted at D'Angelo's trial, is found murdered.",
          "who": [
            "nakeesha",
            "levy",
            "avon",
            "stringer"
          ]
        },
        {
          "type": "death",
          "text": "Wallace returns to the Pit. Stringer orders Bodie to kill him, and Bodie and Poot shoot him in his bedroom.",
          "who": [
            "wallace",
            "bodie",
            "poot",
            "stringer",
            "dangelo"
          ]
        },
        {
          "type": "wiretap",
          "text": "Shardene wears a wire in Orlando's with little result, then paces out Avon's office so the detail can install a hidden camera from the building next door; Avon soon clears the office out.",
          "who": [
            "shardene",
            "freamon",
            "prez",
            "avon"
          ]
        },
        {
          "type": "other",
          "text": "Senator Davis tells Burrell to rein Daniels in, and Burrell threatens to use the old FBI report on Daniels' finances. Daniels refuses to back down.",
          "who": [
            "davis",
            "burrell",
            "daniels",
            "pearlman"
          ]
        },
        {
          "type": "arrest",
          "text": "The camera catches Avon sending D'Angelo to New York for a package. With an FBI tracker on his car, D'Angelo is stopped by New Jersey troopers on the way back and brought in. Stringer's evasions convince him that Wallace is dead, and he refuses Levy's representation.",
          "who": [
            "dangelo",
            "mcnulty",
            "daniels",
            "stringer",
            "levy",
            "brianna",
            "avon"
          ]
        },
        {
          "type": "arrest",
          "text": "Daniels arrests Avon; McNulty lets Stringer walk, saying they will get him later.",
          "who": [
            "avon",
            "daniels",
            "mcnulty",
            "stringer"
          ]
        }
      ]
    },
    {
      "n": 13,
      "title": "Sentencing",
      "epigraph": "All in the game.",
      "speaker": "Traditional West Baltimore",
      "air": "2002-09-08",
      "writer": "David Simon & Ed Burns",
      "director": "Tim Van Patten",
      "summary": "D'Angelo offers to cooperate and names Wee-Bey as Kresson's killer, but after his mother's visit he backs out and takes Levy back. Avon pleads to seven years, D'Angelo gets twenty, and Wee-Bey confesses to a string of murders. The detail's members are scattered, and McNulty is sent to the marine unit.",
      "events": [
        {
          "type": "arrest",
          "text": "Greggs wakes and picks out Little Man from a photo array. Herc serves warrants on every Barksdale target except Wee-Bey, Ronnie Mo among them.",
          "who": [
            "kima",
            "herc",
            "ronniemo",
            "bunk",
            "cole",
            "littleman"
          ]
        },
        {
          "type": "informant",
          "text": "Questioned by McNulty and Pearlman, D'Angelo admits his part in finding Brandon, gives up Wee-Bey's Philadelphia hideout and says Wee-Bey, not he, shot Kresson; he asks for relocation in exchange for everything.",
          "who": [
            "dangelo",
            "mcnulty",
            "pearlman",
            "bunk",
            "weebey",
            "deirdre"
          ]
        },
        {
          "type": "arrest",
          "text": "Using phone records of calls to Levy's office, Bunk and Freamon locate Wee-Bey, and the detail arrests him in Philadelphia.",
          "who": [
            "weebey",
            "bunk",
            "freamon",
            "daniels",
            "mcnulty"
          ]
        },
        {
          "type": "promotion",
          "text": "Daniels confronts Carver as Burrell's mole in the detail. Carver is promoted to sergeant, while Herc, who passed the exam, is told he is no longer in line.",
          "who": [
            "carver",
            "herc",
            "burrell",
            "daniels"
          ]
        },
        {
          "type": "other",
          "text": "Daniels gives Prez back his gun and badge, ending his desk-only restriction; Prez later clears the detail's board.",
          "who": [
            "prez",
            "daniels"
          ]
        },
        {
          "type": "trial",
          "text": "After Brianna's prison visit, D'Angelo backs out of cooperating and lets Levy represent him. Avon pleads guilty for seven years, and D'Angelo gets twenty, the maximum.",
          "who": [
            "avon",
            "dangelo",
            "pearlman",
            "levy",
            "brianna",
            "stringer",
            "mcnulty",
            "phelan"
          ]
        },
        {
          "type": "other",
          "text": "Wee-Bey refuses to give up Avon or Stringer but confesses to killing Little Man and Nakeesha Lyles, and claims Gant as well; Bunk and McNulty know the Gant confession is false and that it covers for Bird.",
          "who": [
            "weebey",
            "bunk",
            "norris",
            "nathan",
            "littleman",
            "nakeesha",
            "gant",
            "bird"
          ]
        },
        {
          "type": "promotion",
          "text": "Lt. Cantrell is promoted to major, getting the promotion Daniels had been in line for.",
          "who": [
            "cantrell",
            "daniels"
          ]
        },
        {
          "type": "transfer",
          "text": "After the U.S. Attorney's office complains to Burrell about McNulty, Rawls asks McNulty where he doesn't want to go, and McNulty ends up in the marine unit.",
          "who": [
            "mcnulty",
            "rawls",
            "burrell"
          ]
        },
        {
          "type": "transfer",
          "text": "Rawls brings Freamon into the Homicide unit.",
          "who": [
            "freamon",
            "rawls"
          ]
        },
        {
          "type": "demotion",
          "text": "Santangelo is shown working uniformed patrol in the Western District.",
          "who": [
            "santangelo",
            "rawls"
          ]
        },
        {
          "type": "promotion",
          "text": "Avon steps back: Stringer runs the product from the funeral parlor and Brianna handles the money. Bodie takes over the towers and Poot runs the Pit.",
          "who": [
            "stringer",
            "brianna",
            "bodie",
            "poot",
            "avon"
          ]
        }
      ]
    },
  ],
});
