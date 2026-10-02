# Season 2 research notes

Five research agents (union, greeks, barksdale, police, episodes), all checked against Wikipedia, the fandom wiki (MediaWiki API) and the springfieldspringfield.co.uk transcripts of s02e01–e12. These are the reconciliation decisions behind `curation.js`.

## Ids

- **Sam, the Atlantic Light crewman:** `choksey` in greeks.json, `sam` in episodes.json. Mapped to `sam` with `idMap`. The surname "Choksey" is not spoken on screen, so the record is just "Sam".
- **Leech and Mugs** (Stringer's D.C. contact and the inmate who strangles D'Angelo): both are named only in uncredited cast lists, and each has one or two scenes. They are left out as characters; the events describe them as "a contact from Washington" and "another inmate".
- **Left out as characters (one-scene, credits-only or unverified):** T.T. (`tt`/`strayboy`, unnamed on screen), Mello (uncredited), Holley (uncredited), "Robbie" the state police colonel (no actor, name from fandom only), Kevin Reynolds (agency unclear), Vanderwal, DiPasquale, Cleary, Lemmell, Salmond, Mason, Settles, Bryant (no substantive scene), McNulty's sons (uncredited), Ashley, Big Roy (actor credits swapped between sources), Tank, Rico, Perry.
- **Registry characters not on screen in S2:** frazier (only mentioned as leaving), foerster, reed, cantrell, sydnor, mahon, bobbybrown, barlow, hansen, demper, dayday, roybrown, savino, sterling, cass, ronniemo, kevin, browning, walon. Roberto is named but never seen; kept, as in S1.
- **Joan Sobotka** is Nick's mother (Louis's wife), not Frank's wife, as the brief wrongly had it. Frank's wife is never seen.

## Contradictions and how they were settled

- **D'Angelo's death.** The barksdale agent recorded only what ep 6 shows: Stringer pays a D.C. contact for work he "can't go through my people" for, and the contact's "cousin up in there" will handle it, without naming a target. The episodes agent cited an ep 7 follow-up. I checked the ep 7 transcript myself: the contact says the prison is taking it that "that boy hung his own self", that "my cousin always works clean", and asks whether Avon knew; the line "I wouldn't want a word of this mess up in Avon's ear" follows. So **season 2 itself shows Stringer arranged it**, behind Avon's back. Recorded the S1 way: `stringer>dangelo>conflict` labelled with the arrangement, and no `killed` tie, because the killer is uncredited and unnamed. Avon, Wee-Bey and Brianna believe it was suicide.
- **Frank's death.** Not shown on screen. Ep 11: Koutris tips the Greek that Frank is cooperating, and the Greek tells Vondas "your way, it won't work" as Frank walks up. Ep 12: one of them says the body was weighted down. Recorded as `greek>frank>conflict`, "killed after going to meet the Greek and Vondas; the killing is not shown". There's no `killed` tie and no "ordered" claim.
- **The container women.** Sam's confession (ep 2) and Sergei's statement (ep 12) give the story: one woman was killed when she fought a crewman, and the rest died so there would be no witnesses. Who killed the first woman is never shown. Vondas cutting Sam's throat is shown (ep 2), so that's a `killed` tie. The Greek is present but no order is given on screen, so there is no order tie.
- **The prison hot shots (ep 3):** "Avon's call?" / "Wouldn't be here otherwise", so Stringer sets it up on Avon's call, which is stated. Five inmates die. Whether the drugs in Tilghman's car were planted is not shown, so no claim is made.
- **Koutris and Glekas's file:** Wikipedia says Koutris "sealed" Glekas's file. The dialogue has Fitzhugh's check reach Koutris, who dismisses Glekas as a "mope" and warns the Greeks. The dialogue version is used, and the ep 9 event is corrected (see below).
- **Roberto:** "targeted by the DEA" in dialogue (ep 1), not arrested. The ep 1 event is corrected and its type changed from `arrest` to `other`, so it no longer draws a tick on the scrubber.
- **Frank and the tripled fee (ep 5):** Wikipedia says he stays defiant; the transcript shows him accepting it. The transcript is used.
- **Burrell's title:** "Deputy" in ep 3; "the votes are in" and he is moving to the commissioner's office in ep 9. The wikis say "acting commissioner". The data says he is promoted in ep 9 once the council votes are in, and avoids claiming a swearing-in.
- **Rawls** is a colonel over CID from the premiere (promoted between seasons). **Carver** starts S2 as a uniformed Southeastern sergeant.
- **Daniels** is offered a major's posting (ep 4) that never happens; he is still a lieutenant at the finale. Burrell's promise of a permanent major case squad in CID is stated in ep 12.
- **Herc's and Carver's moves at the finale** are intentions only (Carver to Colvin's Western District, Herc back to narcotics), so they are written as intentions.
- **Cheese and Prop Joe:** S2 dialogue says "my boy Cheese", never nephew. The tie is `command`, with no family claim.
- **Local numbers:** from dialogue, Local 1514 is the checkers (Frank, secretary-treasurer) and Local 47 the longshoremen (Nat Coxson, president). Nick is in Local 47 but works as Frank's go-between.
- **The posthumous vote:** the members re-electing the dead Frank and Ott standing aside come from Wikipedia and fandom. The decertification warning is in the transcript. Kept, softly worded.
- **Colvin** is on screen in ep 9 (credited); kept as a tier 3 Western District major.
- **Krawczyk** first appears in ep 2 (credited, Michael Willis); kept.

## Corrections applied to episodes.json

These are factual corrections to the episode agent's event text, each backed by the points above. All other episode data is as researched.

1. Ep 1, event 0: "Greggs has a desk in Narcotics" → "Greggs has a desk job in Asset Forfeiture" (police.json, from ep 1 dialogue).
2. Ep 1, event 4: Roberto "arrested by the DEA" → "targeted by the DEA", and the type changed from `arrest` to `other`.
3. Ep 6, event 5: removed "(credited as Leech)" and "for a killing". It now says what the scene shows: cash for a job inside he can't give his own people.
4. Ep 6, event 7: removed "(credited as Mugs)".
5. Ep 7, event 1: reworded around the contact instead of "Leech", keeping what the transcript supports.
6. Ep 9, event 1: replaced "sealed by Agent Koutris, who phones Vondas" with the dialogue version.

Corrections made after the browser check (each verified against the transcripts):

7. Ep 12 summary: "Mouzone and Omar both see through his lies" → Mouzone ends the agreement and leaves; Omar works out Stringer lied. "leave the country" → "leave Baltimore" (where they fly is never stated).
8. Ep 12, the promotion event: "Mouzone… catches Stringer's slip about his attackers" → what the ep 12 transcript has him say: the agreement is "absolved" and "I will take care of them myself". Nothing on screen says he has caught Stringer out.
9. Ep 11, the shooting event: "Omar knocks out Lamar… in his hotel room" → Omar's crew knocks out Lamar, and Omar shoots Mouzone at his motel door. Sources disagree on who knocks Lamar out.

Also, in event `who` lists, ids of non-characters (victim placeholders, leech, mugs, mello) were removed so the validator warnings stay meaningful.

## Uncertainties carried into the data as softened wording

- Ep 10's epigraph speaker (Ziggy) is credited in sources but ambiguous in the transcript.
- The ep 5 epigraph is credited as "Vondas" (sources vary between "Vondas" and "Spiros Vondas").
- Where the Greek and Vondas fly to is not stated; the data says only that they leave Baltimore.
- Lamar's fate is not shown.
- Ilona's superior is never shown; her link to the Greeks is the Pyramid Inc. lease, so it is a dotted line on the chart.
- Poot reporting to Bodie is likely but not confirmed, so it is a dotted line on the chart.
