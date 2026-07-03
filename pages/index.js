import { useState, useEffect } from "react";

const C = {
  navy:"#1a3a6b", navyDeep:"#0f2347", navyMid:"#1e4080",
  gold:"#b8963e", goldLight:"#d4af6a", goldPale:"#e8d5a3",
  goldDim:"#7a6228", cream:"#f0e6cc", creamDim:"#c8b890",
  white:"#ffffff", muted:"#8a7a5a", mutedDark:"#5a4e32",
  border:"#1e3a6e", borderGold:"#3a2e18", dark:"#091a35",
  scarlet:"#8b1a1a", green:"#4a7c5e",
};

const FREE_CODES = { "ILACCESS": true, "ADMINTEST": true };
const ADMIN_CODES = { "ADMINTEST": true };

const TIMED_CODES = {
  "BUDDYPASS": 24,
  "24HRPASS": 24,
  "WEEKENDPASS": 72,
};

function checkTimedCode(code) {
  const upper = code.trim().toUpperCase();
  if (!TIMED_CODES[upper]) return false;
  const key = "il_timed_" + upper;
  const hours = TIMED_CODES[upper];
  const stored = typeof window !== "undefined" ? localStorage.getItem(key) : null;
  if (stored) {
    const expiry = parseInt(stored);
    if (Date.now() < expiry) return true;
    localStorage.removeItem(key);
    return false;
  }
  const expiry = Date.now() + (hours * 60 * 60 * 1000);
  localStorage.setItem(key, expiry.toString());
  return true;
}

const TIERS = [
  { id:"course", label:"The Course", sublabel:"Course + Full Resource Library", price:"$497", cycle:"one time · lifetime access", stripe:"https://buy.stripe.com/00w00j1Rrd1s1eEcei77O0k",
    features:["Complete simulation course — all six regions","Twenty-two virtual women — broad demographic of potential mates","Branching scenarios — visual novel format","Full cultural obstacle modules","Complete resource library — 14 modules","Certificate of The International Lover™"], highlight:false },
  { id:"complete", label:"Complete Platform", sublabel:"Everything. Active membership.", price:"$49.99", cycle:"per month · or $397/year", stripe:"https://buy.stripe.com/fZu6oH3Zz8LccXm5PU77O0l", stripeYear:"https://buy.stripe.com/14A8wP9jT2mO8H64LQ77O0m",
    features:["Full book — 17 chapters with read-aloud","Complete simulation course","Full resource library — 14 modules","Certificate of The International Lover™","The Consulate — community forum","All five regional subgroups","Member consultation rates","All future content included"], highlight:true },
  { id:"lifetime", label:"Lifetime Commission", sublabel:"Everything. Permanently.", price:"$997", cycle:"one time · never pay again", stripe:"https://buy.stripe.com/28E5kD3ZzaTke1q0vA77O0n",
    features:["Everything in Complete Platform","Permanent access — no recurring billing","One complimentary 60-min consultation","Discounted consultation rates forever","Priority access to all new content","Early access to all new titles"], highlight:false },
];

const CONSULTATIONS = [
  { label:"Email Consultation",   duration:"Written response within 48hrs", pub:97,  mem:75,  stripe:"https://buy.stripe.com/7sYaEXanX5z0f5u1zE77O0o" },
  { label:"30-Min Phone Session", duration:"30 minutes",                    pub:175, mem:125, stripe:"https://buy.stripe.com/4gM3cv2Vv3qS9La6TY77O0p" },
  { label:"60-Min Phone Session", duration:"60 minutes",                    pub:297, mem:197, stripe:"https://buy.stripe.com/aFa8wPcw59Pg9Labae77O0q" },
  { label:"60-Min Video Session", duration:"60 minutes via video",          pub:397, mem:297, stripe:"https://buy.stripe.com/eVq8wPcw5gdE5uU5PU77O0r" },
];

const REGIONS = [
  { id:"us", label:"North America",      desc:"United States — All Backgrounds" },
  { id:"na", label:"North Africa",       desc:"Morocco · Tunisia · Algeria · Egypt" },
  { id:"me", label:"Middle East",        desc:"Jordan · Lebanon · Yemen · Syria" },
  { id:"as", label:"Asia",               desc:"Indonesia · Philippines · Bangladesh" },
  { id:"la", label:"Latin America",      desc:"Colombia · Dominican Republic · Peru" },
  { id:"ss", label:"Sub-Saharan Africa", desc:"Senegal · Ghana · Ethiopia · Kenya" },
];

const RESOURCES = [
  "Travel & Safety","Matrimonial Platform Reviews","Cultural Intelligence by Region",
  "The Family Meeting","Bride Price & Dowry","International Marriage Laws",
  "K-1 Visa Complete Walkthrough","Long-Distance Relationship Management",
  "Fraud Detection — Complete Guide","Her Arrival & The First Year",
  "Children & Family Structure","Legal Protection","The Step-Father Question","Community Resources",
];

const FREE_PREVIEW_CHAPTER = {
  id: 10,
  title: "The Kevin Samuels Effect",
  section: "Baggage",
  teaser: "Mr. Kevin Samuels performed an incredible service for all men. He launched a movement that will be to his credit long into the future. But he left before he could show men where to go. That is what this platform exists to do.",
};

const BOOK_CHAPTERS = [
  { id:1, title:"Introduction", section:"Departure",
    content:`In 2010, I knew I would have to take drastic measures to
circumvent the social-engineering program that has overtaken the
Western world. I was unable to find one decent woman in the entire
Western hemisphere. The decadence of the Western world has ruined
women, and consequently ruined the family structure of the entire
society. And then like an epiphany, it hit me; that I had a choice. I
could find the type of wife that I desired abroad. I had never even
considered the possibility of a virtuous wife, because none existed in
America. I determined to find a virtuous wife abroad. When I
succeeded, I knew immediately that I had done something incredible.
All the men I knew began congratulating me and saying, “You did it;
I’m so proud of you”. They said, “I want a pretty Moroccan wife
too”. I knew I had the making of a life-changing book, from the
start. It was not until recently that I decided that now was the right
time to write and release it. I am usually way ahead of the curve,
when it comes to many things. But, I knew that society was not ready
to receive my book back then. I believe that you are ready now.
This book is a strategic guide for single men, who are seeking a
better quality of marriage than they can find in America and the
Western Hemisphere. We want to improve the likelihood of a better
probable outcome for hopeful marriage seekers. Most Western men
do not even conceive of ever having a wife at all; much less a wife
that no other man has touched. As a man who was able to
successfully navigate the minefield of global matrimony, I am
offering a practical strategy to find someone who fulfills your
personal desires. This book is more than an expanded search for a
mate. This book will take you from the very beginning, to the
completion of your search. And it will give you cultural insight and
research resources, to vet your intended wife, every step of the way.
Join us on an epic adventure to find your wife abroad.

Although the Western culture has been exported globally, and the
English language is ubiquitous; there are major cultural differences
between the people of nations around the earth. This book will serve
as the catalyst to begin an intensive and immersive study that will
help you overcome the barriers to successfully achieving your goals.
Learning the language, customs, folkways and morays of the societies
you plan to visit and take a wife from is essential. This will not only
help accomplish initial goals, but it will also help in dealing with the
family members and issues that will inevitably arise in marital affairs.
In the West, men say that virtuous women seldom exist among women of
marrying age. In fact, statistically less than 5% of American women
marry as virtuous women. When contrasting this against countries where
virtue is highly regarded, a man who travels to those countries
must be aware that how he conducts himself is crucial. Although
virtue is extremely important in choosing a wife; it is only one of
many facets a man must consider in making a wise selection for the
future of his life and family.
This book will help men understand that a tangible connection
must be established, long before any trip abroad is ever planned. That
connection has to be the foundation of an enduring relationship.
This book will help you to create a criteria on which to vet every
candidate you encounter. Both must be satisfied that they are
benefitting from the marriage that is being sought after.
Finding a matrimonial web-platform that is reputable and yet free
of corruption is very difficult today. However, there are strategies to
finding the very best options available. Under the best of
circumstances, there are still best practices that will assist in finding
someone that won’t leave you discouraged. This book will help you
learn and practice the right steps in vetting every potential candidate.
Men who have determined that finding a virtuous wife abroad is
their best option to living the fulfilling life that they envision, are
committed to self-improvement. These men are pursuing a happy
outcome that transcends borders. The common denominator they
find with their spouse is the language of love and the culture of
peace and contentment. True intentions result in the happiness we
seek.

Let us begin.

2 THE PURPOSE OF FAMILY` },
  { id:2, title:"The Purpose of Family", section:"Departure",
    content:`Much of the West seems to have forgotten the fundamental
purpose for family. The core values and reasons why we have family;
and what it means to our survivability. We bond from birth. We
nurture and teach one another. We establish agriculture and
infrastructure to feed and protect our families; our communities, and
our nations. We mature to begin the cycle again to reproduce the
family, over and over again.
However, over 50 years ago, the cosmopolitan lifestyle was sold to
Western women as “The Future”. The women’s liberation movement
told women that raising a family was oppression. They were told that
serving their husbands was oppression. They were told that working
to take care of another man (their boss), was “freedom” and
“independence”. They were told to take their children to orphanages
(daycare), and to pay someone else to raise them. They were told
public school would educate their children. And today, the birthrate
of America is plummeting; the marriage and divorce rates are dire;
and the children being graduated are functionally illiterate. Men have
been emasculated and feminized. Women have become masculine
and intolerable.
To say this was an orchestrated plan, makes light of the lengths
that have been implemented to break the American hegemony. And
so today, we have whole segments of society that have never known
what it is to have a father. Whole segments of women are crying that
they have no men. There are plenty of men; but the women ignored
them until they were infertile; old and no longer attractive. Now,
those men that they ignored, completely reject them.

The family structure in America has been completely destroyed.
And our women were used as the unwitting pawns to manifest this
diabolical scheme. The irony is that those who invented this
dystopian reality, hold their own families in high regard. They do not
practice any of the debauchery that they pour out on the unlearned
masses. They are extremely weak men in physical stature, but they are
extremely wise. And they are wealthy beyond belief.
It will be the brave watchmen that must call all men to rebuild the
sanctity of the family unit. Men must think past their own racism and
hatred of others, to the benefit of the family for all. For when the
family of one falls, each will fall in succession. Civilization depends
upon the ability of men to bring order to a collapsing world order,
that is based on family. If the family dies, we all die. Therefore men
must think far beyond the act of sex. Men must see the future in the
women they choose to mate and procreate with. The woman cannot
be a disposable sex object that has no value, once she has been used.
She must be respected and protected, so that she can give children
that will be a light for our future.
No man should lay with a woman that he is not married to. The
inception of a relationship determines its success or failure. A
husband owns his wife. He takes her as his property for their entire
lives. The children she gives him, belong to him and are his legacy.
This is far more important than a quickly forgotten orgasm. When
he takes the woman as his own, he develops a natural instinct to
protect her and their children. He unlocks his innate instinct to
provide for them in the present and future. He learns to think and
plan far into the future, for the sake of his family. That is the reason
for this book. I want to help men relearn what it is to be a real man; a
real husband; and a real father.

3 INTENTIONS` },
  { id:3, title:"Intentions", section:"Departure",
    content:`Experience is said to be the best teacher. When we want to learn,
we seek the guidance of those who have experience, and a degree of
expertise in our field of endeavor. There are many on this field who
claim expertise. We should look both internally and externally at what
motivates our intentions to undertake such an incredible journey.
And we should accept that true understanding is the result of applied
knowledge.
We must know beyond our personal feelings, if what we have
decided is really in our best interests; or if it will result in a poor
decision that will ultimately leave us in a world of discontent. It
requires deep introspection into our experiences and our motivation
factors. Is it the thrill of finding love? Is it fetishization? Are we
angry and dissatisfied? Will our desire evaporate unexpectedly? Or
will it flourish into a wonderful family that we dream of ? This
understanding will help to propel us across borders, and help us
confront inevitable misunderstandings. This book will help us
distinguish our own motivations for seeking a wife abroad.
For a man coming from America, the desire for a virtuous wife is a
completely new phenomena. However in many parts of the world, it
is intrinsic to their cultural identity. This is a part of many people that
cannot be stripped away. It must be acknowledged and given the
utmost respect. It is not a pretense for decadence; it is a matter of
family honor. This means that men coming from America have some
growing to do. We must meet other cultures as equals, and without
the pretentious notions of pretended superiority.

Many nations outside of Europe and America hold the chastity of
their girls in high regard. Most of Africa and the Middle-East not
only expect their daughters to be virtuous, but defiling them is a great
calumny against the girl and their entire families. In some cultures,
both men and women are harshly punished and exiled from their
people, for violating the chastity of a girl. The men of their culture
also adhere to this code of conduct as well. The result of their
adherence to the laws of chastity is evident upon their smiling face
and beautiful dispositions. Even among the impoverished, you will
find people of the most beautiful and noble character.
The desire to take a virtuous wife can come as an epiphany to
American men. We may realize that we never had a choice. And once
we are able to see that we in deed have that choice, it behooves us to
do so. The American cultural landscape may have become rather
bleak, in the eyes of most. The American Dream of yesteryear may
seem to exist is the stuff of vintage movies. And in light of this
reality, the lure of an exotic virtuous bride can be a powerful
aphrodisiac. One that no other remedy will suffice.
The power dynamic of the relatively rich American man seeking
love abroad, may inflate the ego of men, and result in a distorted
view of reality. In fact, most American men who take foreign women,
are really seeking prostitutes. This is owing to the fact that virtue
amongst women is so disregarded in America, that it is almost
nonexistent. It is not common to see an honorable American man,
taking the correct traditional path to finding a virtuous bride in foreign
lands. He must be able to communicate his intentions clearly, leaving
no room for doubt.
In America, natural manhood is no longer a standard that is taught
or openly practiced. But a man cannot carry an effeminate demeanor
onto the global marketplace, when looking for a virtuous bride. He
must be able to confidently present himself as one that her father
would feel comfortable turning his daughter over to, for protection
and maintenance. A real man. Therefore, a man must know the
expectations of foreign virtuous brides. When a woman has only known
real men in her life; an American man must be a real man to take her
hand.

Taking her hand is only the beginning. He must be able to
establish his role in their relationship. If he is unable to do this, he
runs the risk of her becoming just like the women he left in America.
There are many stories of men being taken advantage of by
foreign wives, who either deceived them, or became Americanized
after arriving; leaving them in a dire condition. If not handled
correctly, the experience can be fraught with danger.
This reality must remain uppermost in the mind of a man, seeking
to travel abroad for a virtuous bride. It will lay the base for all actions
that transpire. This mindset will allow the man to act in confidence
and security at all times. It will neither diminish him, nor the lady he
pursues.
Marriage is not only about love; it is a cooperation between two
becoming one; acting as one single being. It is a reciprocal interaction
that we hope will span the remainder of our lives.

4 MOTIVES & VALUES` },
  { id:4, title:"Motives & Values", section:"Departure",
    content:`When did you begin to desire to find a foreign virtuous wife from
abroad? What were the factors that resulted in cultivating your
desires? When you envision yourself with a foreign bride, what do
you imagine? You should learn to answer these kinds of introspective
questions honestly, rhetorically. And your intended wife must do the
same. She must also answer why she wants to leave her people to
travel abroad, to begin a new life. If we can answer this honestly to
ourselves, it becomes easier to do so when we are asked by a potential
spouse.
Section 1: Unveiling Motives
mo·tive | ˈmōdiv |
noun
1 a reason for doing something, especially one that is hidden or not obvious: a
motive for his wanting a foreign virtuous bride.
2 (in art, literature, or music) a motif: the entire work grows organically from the
opening horn motive.
adjective [attributive]
1 producing physical or mechanical motion: his desire is the motive for wanting a
foreign wife.
2 causing or being the reason for something: the motive principle of a writer's
work.

When you understand what motivates you, you can shape and
control your path, better than when you don’t. A firm understanding
will allow you to remain focused and purposeful, when circumstances
could leave you in derision. It is the same with the virtuous woman; she
must also examine herself. And she must be able to find peace and
happiness in her decision to marry you. She is trusting that you will
protect and uphold her virtue.
Although we could site personal preferences for seeking a foreign
virtuous bride; America has no culture in any sector which promotes
this as a cultural norm. And so we must assume that a man is
dissatisfied with the quality of American women, who have
numerous sex partners and are extremely poor wife material. But a
man must also acknowledge the role of the men who made them that
way. And he must rise to the level of a good husband, to qualify for
such a wife.
For a man to bring a virtuous wife into this society, he must be
dissatisfied enough with the promiscuous culture of America, to not
only improve his standards; but also to protect his wife and children
from being victims of it. And the virtuous wife may not know the
extent of sexual promiscuity in America. She may have no idea of
your sexual experiences.
Reflect on your own relationships; good and not so good. Would a
foreign bride be a realistic option, were it not for your past
experiences? Is it personal disappointment, or is it the desire to affect
a social change? Is your motive to produce a better quality life;
marriage and family than you could with a woman that has had many
sex partners and children before you? Finding peace in your decision
will help you in the process, and in your life with the person you
select. You must be sure of your own motives; and you must be sure
of her’s.

Section 2: Decoding Cultural Values
Every people have their own unique cultures that define them and
ultimately determine their relationships. They will not lose their
identity, because you assimilate them. And you will not be assimilated
into them, though you may be welcomed by her family. The cultural
norm is that people of the same background seek a spouse from
among their own people. And so, the amalgamation of two separate
and opposite cultures will have difficulties in melding, even under the
best of circumstances.
For a father to have raised and protected his daughter’s virtue up
and until marriage, is a tremendous honor. And the families uniting
across races; cultures and continents requires an unwavering courage
and commitment. Understanding whether or not you possess these
qualities will ultimately determine your degree of success.

Section 3: Challenges on The Horizon
There is a saying, “If you speak more than one language, you are
international. But if you speak only one language, you are American”.
This is very true. The American feels he is somehow superior to the
foreign polyglot, who may speak a minimum of six (6) languages.
This arrogance often leads to a culture clash. It is wise to approach
this path with humility and steadfastness. Building a new life with
someone you can hardly even communicate with in their language, will
take understanding and a softer approach.
A potential wife is more than her sex. She is a life partner; a
comforter and consoler. She is the mother of your future children;
and she is their first teacher. She is likely not as hard as the Western
women. As we have been conditioned to speak abrasively in America,
you may find that your normal tone is too harsh for a foreign lady.
We may find that softer tones will result in a peaceful home
environment. A man should learn about his intended wife in a
holistic way. She will also reciprocate and appreciate your efforts.
Once again, it comes down to your personal motives; and if they
are founded on a sound mind and heart. Pure intentions yield results.
And the reward for a rightly motivated man is a girl that he will make
into a wife; a woman and a mother. The reward is a life that he would
never have achieved otherwise. It is a treasure beyond compare.
Be honest with yourself, and be content enough to allow yourself
to be loved. You will find that under the right circumstances, it will
come naturally. And it will flow like water. Especially with women
who are born and raised in an environment where wife and mother
skills are learned from birth. It will not be hard, if you come correct.

5 EXPLORING INTERNATIONAL CULTURES` },
  { id:5, title:"Exploring International Cultures", section:"Departure",
    content:`Cross-cultural marriages:
Cross-cultural marriages, are when two individuals from separate
cultures, and possibly different languages; religions and customs,
unite in matrimony. They represent the bond of their unique family
backgrounds and their cultural identities. It is a simultaneously
inspirational and demanding experience.
The globalization of the marriage culture is promoting a diverse
and deeply interconnected world. Some see it as a means to
overcome hostilities, through the appreciation of other cultures;
heritage, language, wisdom, foods, and religions. Building families on
this principle promotes love and kinship, and results in children that
are a both multilingual and multicultural. The altruistic notions of
this lifestyle are not without challenges.
Some of the obstacles lovers face in overcoming resistance to
their marriages will be discussed in-depth. These topics will be laid
out as a lesson plan for you to study and prepare for your ultimate
role as a global traveller and an International Lover.

1. **Cultural Misunderstandings**: Coming from the West, most
of us simply don’t have the frame of reference to know when we are
being offensive to another culture. Politeness and humility have
largely been remove from the Western culture. It has been replaced
with obstinate arrogance. Carrying this attitude abroad makes us a
prime target to be despise and rejected. Learning to go in humility,
and being a good listener, kindness and gratitude, are welcome
behaviors in every nation. Preventing cultural misunderstandings is a
better practice than trying to correct them.
2. **Communication Barriers**: When we are attracted to a
person that we can’t communicate with, it is a difficult obstacle to
overcome. But it can be done with kindness and tremendous
patience. It requires a will to succeed on both sides. Failure is not an
option, with language barriers. Both need to become fluent in each
other’s language, to accomplish the most simple tasks in an
intercultural and international relationship.
3. **Conflicting Values and Beliefs**: We should understand the
consequences of seeking a spouse with a completely different set of
beliefs. They will not sharing the same values and hold the same
views. This is grounds for disagreements. These differences should
be flushed out and addressed in the courting stage, as carrying them
into a marriage will inevitably result in irreconcilable differences.
4. **Family Acceptance**: In many cultures, taking a foreigner as
a spouse can result in estrangement from family and community.
There are many factors we should weigh when considering whether
to take a spouse from another people, who may or may not carry
prejudices against us. Whether it is racial, religious, national or
political, we should understand the ramifications of family
acceptance. It can be vital to the success of a marriage.
Notwithstanding the effects of various factors on forming a
successful relationship, many adapt and overcome them. And they are
able to go on and create lasting marriages based on love and mutual
respect. The most important factor is the love two people commit to
their marriage.

Success in marriage is based on love, duty, understanding and
respect for your spouse. Marriage is hard under the best of
circumstances. Adding intercultural and international challenges to it,
the difficulties are exponentially increased. However, so are the
rewards. To know that two succeeded in uniting, with so much to
hinder our progress; it makes our accomplishments that much more
gratifying.

Cultural awareness and understanding
Cultural awareness and understanding are significant ingredients in
cultivating a successful marriage. They become all the more relevant
in an intercultural and international relationship. Both sides
contribute immensely to the worth of the relationship. Both spouses
continually grow, by what they learn from one another. Some of what
we learn may be shortcomings, and they may also be misperceptions
based on bias and long held beliefs.
**Stereotypes:** Are widely held, but oversimplified views we
have of groups. Because we hold these beliefs, they result in conflicts
that could otherwise have been avoided. To say that all you people are
like this, or all you people think about is that; is an example of stereotypes
that we all carry. It’s crucial to see our own stereotypes and work to
let them go. Learning to broaden our perspectives will ultimately be
beneficial to the longevity of our relationships.
**Prejudices:** to pre-judge. Similar to stereotypes, prejudices are
often negative concepts or beliefs we hold about people. Carrying
prejudice into an intercultural and international marriage can prevent
the successful union two people have worked so hard to attain. It is
ultimately self-negating, and the result is to work in vain; to destroy
our own happiness with our wrongly held notions. No matter what
country we settle on for a spouse, self-examination and selfcorrection are necessary to expose our own prejudices and deal with
them effectively, so as to not poison our marriage with our own
prejudices.
**Myths:** Myths are stories that people pass on, from one
generation to the next. But often times they are not true, though they
may be based on something that at one time was fact. To say that
America and Europe are better than other countries is a myth. Any myths
that we may hold about the nation(s) we intend to explore for a wife
are critical to our intentions, as they may play a role in preventing
our success.

International marriages hold the possibility of enriching lives
across the cultural divide. We stand to gain from learning new
experiences that we just could not and would not have, were it not
for the journey of bridging the gap between us. Deepening our
appreciation for the spouse we choose will allow us to grow in ways
that we find it hard to measure, when we choose resonance, rather
than discord.
Social media forums, vlogs, websites and cultural events offer a
way to begin learning about the culture we are attracted to. Whether
we love the culture before we find the one we are attracted to, or vice
versa; they can help us grow to be prepared when the opportunity
comes.
Beginning the inward journey of self-analysis and selfimprovement will help us work through our own deeply help
misconceptions about others. We will be able to win at the game of
love, and avoid self-defeating mistakes when it matters most.

International marriages

International marriages, unite people and families from diverse
cultures, but the manner in which we go about it must be done
properly. It is imperative to maintain the proper decorum and
appreciation for the culture and the family of your intended bride.
Even as she may be learning to communicate with you, her family
may not know even one word of the English language. It is
important to be in agreement on how you proceed.

1. **Informed Consent:** When a man makes the correct
approach to obtain the hand of a lady, through her family and
culture, we can agree that proper steps were taken to gain their
permission. Legally, morally and ethically, we must always be able to
stand on a firm foundation; when traveling abroad to marry virtuous
girl of another culture. Let me stipulate that a virtuous woman is viewed as
such (a girl), because she has not yet consummated her marriage to
her husband. And it is her husband that makes her into a woman, by
virtue of taking her virtue. I want to make this abundantly clear for
the reading audience. We are virulently against pedophilia. Virtuous is
considered a girl, until she is married.
2. **Respect for Cultural Differences:**In all things there is the
dominant and the submissive. In the West, a deliberate effort has
been made to make the women dominant over the men. This has had
an effect on the men where they now seek women from abroad that
have not been subjugated to this social engineering. However, finding
a bride abroad does not negate the relevance of mutual respect for
one another’s culture. Therefore, it is incumbent upon both to agree
how to handle everything from cultural and religious holidays to
childrearing.
3. **Communication:** The language barrier is only a component
of relationship communication. There is a world of differences
between those who decide to marry abroad. This means learning a
new lifestyle of concentrated focus on communication between one
another, and the family members. Taking one another, also means
taking the responsibility to learn the proper handling of people.
4. **Legal Considerations:** Every country has a different process
for allowing its citizens to marry foreigners. Some countries have
seemingly archaic and convoluted bureaucracies for their marriage
processes.
Many countries have suffered centuries of abuse by
Western travelers. And thus, they have developed systems to dissuade
the further abuse and degradation of their women, by the insolence
of Westerners.

5. **Gender Equality:** Outside of Western nations, most of the
world is not confused regarding the genders. In the West, the issue
has many utterly confused. It is very important to know your role as a
man, and to understand the role of the woman you choose to be
your wife. It is important to understand both of your rights over one
another in marriage. And it is important to know the expectations of
her culture, so that you are able to meet them.
6. **Religious Sensitivities:** For many countries, it is forbidden
for their girls to marry someone who is not of their same religion. It
is considered absolute savagery to lie your way into taking a woman
from her people, with no intentions of practicing their religion. The
result is wrecked families strung across the globe. And the children
grow up to feel they neither belong to her family, nor his. Respecting
the religion of a woman begins with never lying to have sex with her;
and calling it marriage. It is beyond wickedness to do that. And the
man will be hated by her entire family. I cannot stress the importance
of this enough. No matter how attractive a woman is, never deceive
her into thinking you have accepted her religion, just to have sex with
her.
7. **Child-Rearing:** Raising children is a partnership that must
be agreed upon. How the children will learn; socialize; be educated;
worship; these are all potential conflict triggers that can be avoided
with well-intentioned discussion and agreement.
The principles of intercultural and international ethical practices
should be internalized by everyone seeking a wife abroad. This is the
distinguishing factor between those who have ruined the name of
American travelers across the world. The simple act of not being
contemptible can repair decades of damage to the reputation of
American travelers.

Intercultural marriages:
The most difficult period of any marriage is the first year. When
we compound language, cultural and religious barriers on top of an
already difficult period; we have a formula that can either make or
break a marriage. Success depends on the degree of preparation we
have taken before the marriage happens. This requires tremendous
amounts of study, and daily practical application of what we studied.
1. **Learn About Each Other's Cultures:** There are a plethora
of resources for learning about languages and cultures. Many are free
and only require that we try. There are apps for phones that will help
you learn languages. There are vlogs and blogs that will help you
learn about the cultures of different lands. There are books such as
this one, that will help to guide your steps, so as not to waste valuable
time where there is little or no value in learning something.
2. **Respect Cultural Differences:** choosing to marry into
another race and culture requires that we participate in the holidays
and celebrations that are unique to that people. You will find that it’s
fun and fulfilling the desire that initially fueled your desire in the first
place. Eat the food; wear the clothes; sing the songs. It will create a
happy marriage for you.
3. **Language Sensitivity:** It’s just as important for us to learn
her language, as it is for her to learn our’s. Of course she will need to
be able to function here in America with the language. But we will
also have to function in her world. You will find that learning a new
language will greatly increase your success and options on the global
marketplace.

4. **Discuss Religious Practices:** It is best to find a spouse from
your own religious background. As the differences will never be
resolved between a couple of different religions. There will always be
disagreement and discord on the fundamental principles of your
beliefs. It makes no sense to abandon this point of guidance for
sexual attraction. Why invest so much time and money in a
relationship that is doomed to fail from its inception? There are
plenty of women abroad in your personal belief system . Therefore it
makes sense to look where you will find agreement and harmony,
rather than disagreement and disfunction. Take the time to discuss
this point, with each person you interview for the role of your future
spouse.
5. **Cultural Norms Around Conflict:** The American style of
arguing is not the same globally. I have found that foreign women are
softer and easier to discuss disagreements with. It is good to learn to
speak softly to her and persuade her, rather than yelling and arguing.
Creating this tone from the beginning will allow you to have a better
marriage longterm.
6. **Child-Rearing Practices:** In America, child-rearing has
significantly declined. Men are lamenting that their children are
suffering under the epidemic of single motherhood, that has gripped
America. Men are seeking a return to a traditional family, and raising
children under traditional roles. It’s wise to understand that foreign
women, may or may not have learned to desire the Western lifestyle.
If she has adopted the notions of American women, what sense does
it make to spend so much money and time bringing her to America,
when you can find that kind of woman next-door? Make a good
choice in the mother of your children, and agree upon how you will
raise them.
7. **Family Relations:** It’s important to understand not only
how couples will interact with one another; but also how they will
interact with the family of each spouse. This is something that we
may give thought to beforehand. But circumstances will really help to
inform us on how we will handle extended family relations. There
may be things we do not desire for our children to learn from family
members. This is a subject that is best left up to the discretion of
individuals.

8. **Celebrations and Holidays:** We don’t lose our identity in the
culture of our spouse. And neither does she lose her culture in ours.
It’s good to learn appreciation for one another’s holidays and
celebrations. It will double the fun, as both sides will have holidays to
share.
Deliberately seeking a spouse from abroad increases our ability to
interact and communicate internationally. It allows us to conduct
ourselves abroad with confidence and dignity. In this we will
inevitably find humility, as we grow to respect a world of other
cultures. This understanding will allow us to cultivate a successful
marriage with a foreign bride.

Nonverbal communication
Nonverbal communication can tell us more about a person’s
intentions than their words. Different people use hand motions that
may not have the same meaning as we use. It’s important to begin to
learn what certain gestures mean and understand subtle codes of the
people we mingle with. This knowledge will greatly aid our ability to
communicate effectively in marriage and in dealing with the people
of other nations.
1. **Gestures:** There are ways that we use our body language
that communicate our thoughts and intentions. The eyes are said to
be the window to the soul. A firm handshake is said to confirm that
you are dealing with a solid individual. However, in other cultures,
they do not mean the same thing. Staring in a person’s eyes can be
offensive. Standing to closely; holding hands with a person of the
same sex all convey intentions and thoughts without using words.
Learning to speak the non-verbal language of your spouse and her
people is extremely important in a peaceful coexistence.
2. **Proxemics:** In America, standing too closely to someone
can convey a threatening perception. It can also convey love. With
men it can be a sign of close friendship; and with strangers it can
make another man very uncomfortable. However, in other countries,
it is not always the same. We should learn to let our guard down
under the right conditions. And we should know what those
conditions are. We should take the time to understand the personal
proxemics of other countries.
Every marriage has an initial learning period, after the
consummation. Finding enjoyment in making mistakes and laughing
about them, can help to ease the difficulty or embarrassment we may
feel. Couples will always have miscommunications, but learning to
read your spouses nonverbal queues will help avoid small arguments
and escalations.
It is in the nature of a wife to study and learn about her husband’s
idiosyncrasies. We should be the same with our wives. Be comfortable
and be yourself; all while elevating your degree of consciousness. The
more we learn good habits, they become second nature.

Context of intercultural marriages
In the context of intercultural marriages, we don’t abandon our
heritage when we marry someone from abroad. Quite the opposite is
true; we actually quantify our experiences and make our family
richer. We can gain so much from understanding what we receive
from our spouse:
1. **Historical Context:** Jump into the deep end of the pool
with both feet. Immerse yourself in her culture. I have found that
tracing my family roots and traveling to that original geographical
area of people than I descended from, has caused me to learn more
about my own lineage than I could have imagined.
2. **Religion and Spirituality:** Finding a virtuous wife from your
own religious tradition can greatly improve the quality of your
experiences. Even if you are not of the same ethnicity, a shared
spiritual and religious view can help to bring you together and shape
your destiny.
3. **Cultural Norms and Etiquette:** There is no such thing as a
stupid question. Asking if some practice or expectation could be
offensive, is not out of place. Reference study materials do not
contain all the answers, all the time. Oft times its acceptable to simply
ask. The act of humility will go far in avoiding misunderstandings.
4. **Festivals and Celebrations:** One of the best parts of foreign
travel and marriage is learning and practicing traditional holidays and
celebrations with your spouse. New music, dances, foods, styles of
dress will become treasured memories for you and your new family.
5. **Language:**When Americans learn to speak foreign
languages, we are often mistaken for non-American travelers. This
can actually be a good thing in some instances. Learning to speak the
native tongue of your intended wife is a huge plus in gaining
acceptance from her family. And it will also remove many barriers
that can cause conflicts between you.

6. **Food and Cuisine:** One of the very best things about
marrying abroad can be that cooking is an integral aspect of the role
of a wife. Unlike here in America, women still know how to cook
abroad. This may be a recurring happiness for you, as you sit down to
delicious homemade meals each day. You will have an opportunity to
reconstitute the tradition of eating meals with your family. And this
will become a memory that you will hold near to your hearts.
You may find that your spouse will have a stronger desire to learn
American language and culture than you have to learn her’s. I would
argue to keep the balance of cultural exchange even. Both sides
should find benefits in learning each other's world view. If you have a
desire for a particular type of personality, it is important to make
certain that you settle on that person. Thoroughly vet the person you
marry, to best ensure you receive the outcome you desire in life.

Effective communication
Open and effective communication is a skill that must be studied
and applied in all aspects of life, to be successful in dealing with
people. When it comes to language differences and new cultures, the
importance of these skills is magnified. If you have not learned these
communication skills, it is worth taking the time to begin studying
them.
1. **Learn Each Other's Language:** Whether it is cross-racial or
cross-cultural; make an effort to learn her language. It may be your
original ethnic language, or a completely different language. But
knowing how to effectively communicate will get you past the initial
phases of meeting her and her family. Mastering the language will
allow you to establish your relationship.
2. **Active Listening:** Women generally speak from their
feelings. When it is another language, there is much that can be lost in
the translation. Even if we speak their language enough to
communicate, our native language is not the same. Therefore, we
should listen actively, to see from her perspective. And we should
strive to understand exactly what she is saying . Interjecting what we
think she feels or intends, is not a good communication skill. Listen;
think; and then respond.
3. **Express Yourself Clearly:** Strive to speak in short and
simple phrases. Run-on sentences don’t translate very well, and tend
to cause confusion. Americans generally don’t speak the English
language well, and it is filled with slang terms. For clear
communication, strive to use clear English language and terms.
4. **Non-Verbal Communication:** We speak more with our
body language than we do with our words. How we speak; the spirit
and tone of our words, and our facial expressions will also influence
the messages we convey.

5. **Cultural Education:** It is important to have some
understanding of the culture you take your wife from. Kindness and
consideration are welcome in any culture. It is the unconscious and
subtle actions that we must pay particular attention to. Staring,
condescending behaviour, proximity and other aspects of culture
should be controlled, so that your behavior is honed and skilled
beforehand. Don’t wait to get there, to try to learn on the job.
6. **Conflict Resolution:** Because we come from a culture
where violence and outbursts have become the norm, we may carry
that behaviour into our relationships. Men who are traveling abroad
seeking a wife that is unlike America women, will need to take extra
caution not to cause a tender hearted foreign woman to become hard
and calloused by harsh treatment that she is not use to. Treating her
gently will allow you to develop a peaceful discourse, even during
disagreements.
7. **Patience and Open-mindedness:** Building from the
previous point; patience and a willingness to learn a new way of
interacting with a woman will help you create the marriage you are
seeking abroad. Always taking care not to turn her into the very
American woman that is stigmatized today, will give you many happy
years of marriage.
8. **Seek Professional Help if Needed:** Sometimes we will find
the need for intermediaries and professionals, to help resolve marital
issues. When a marriage still has love, but language and cultural
barriers are causing problems we cannot resolve; seek assistance to
save the marriage that you treasure.
The path to learning is never-ending. Always strive to learn more
about your spouse’s language and culture. It will help you through
many difficult circumstances. And it will build an enduring love
between you. You will see this love growing in the children that you
produce from your union.

High-context and Low-context cultures

Learning to distinguish the difference between high-context and
low-context cultures is a skill that requires active listening. It will give
you the proper way to approach her culture.
**High-Context Cultures:**
What you say with your words is equally as important and what
you don’t say. In high-context cultures, you will learn how to navigate
through your experiences. No one will be there to hold your hand, to
conduct you through the paces. This is where your studies will come
into play. You will rely on them to have taught you what to say; when
to say it and when to be quiet. These actions will help you
demonstrate your degree of maturity before the family you are
courting. In general, Eastern cultures are said to be of high-context
culture.
As I stated earlier, learning to avoid cultural and language mistakes
is better than trying to correct them. During conflicts abroad, it is
wise to understand your situation well. In general, exacerbating a
conflict while abroad is not a good idea. It is good to learn how to
de-escalate tensions and find a resolution.

**Low-Context Cultures:**
Being American, when I say that our culture is considered lowcontext culture; readers should be smart enough to understand what
is implied. In low-context culture we can be terse and rude. We are
short tempered and easily provoked. We learn terms like “The violenceline” and when it is being crossed.
It is easier to understand and communicate with people that are
from your same cultural context. We know how to get along better
when we have developed a similar understanding of communication
terms.
When it comes to a low-context culture, a man taking a highcontext culture wife, either that man is going to elevate his cultural
context and learn to improve his character; or he is going to bring
that woman down to his level. And he is going to wind up having
spent large sums of money and effort, to turn a humble foreign
woman into an ill-tempered American immigrant. Be advised.
If we cannot expand our consciousness to elevate our conduct
abroad, we would be well advised to reconsider this path. There is an
entire hemisphere full of ill-tempered women that are already here.
They will be much less expensive than a foreign bride. They don’t
require marriage or learning a foreign language. But if we are intent
upon making this journey, then we should not ruin our own
happiness with our own conduct.
Mind you, I am not saying that we should abandon ourselves to
try to become like some other people. But simply to become civilized
men. Don’t travel abroad acting like a savage. And don’t go
pretending to be civilized, only to reveal that we are truly savages,
once the woman is in our possession. All will be better, when we are
striving to practice self improvement and the proper handling of
people.

Language barriers and misunderstandings
The theme of language barriers cannot be understated in
intercultural and international marriages. Let us learn strategies to
deal with conflicts and potential obstacles to happy marriages.
**1. Learn Each Other's Language:**
Learning her language is difficult; especially if you are just now
considering taking a foreign wife as an option. If you are just
beginning, then your first step is to find where you will be traveling,
and if that is the correct place for you to go. Then learn the language
and culture. Don’t get this reversed. Don’t book a trip with friends
and travel somewhere, with no knowledge of her language or culture.
That is a backwards way to begin. And that will surely end in failure.
If you want success; plan for it and prepare for it. Begin now.
**2. Use a Common Language:**
If she knows some English language and you don’t know her’s,
then use this as your common language. Do not skip learning her
language. It is a crucial aspect of vetting her and establishing a sound
relationship.
**3. Be Patient:**
When difficulties arise in communication and circumstances,
patience will help you to reason your way through. Learn to rise
above your emotions and think on a higher plane. Practicing this
discipline will be an effective tool in conflict resolutions.
**4. Use Non-Verbal Communication:**
Learn to read her body language, and the body language of her
people. Also learn to express your intentions with your own body
language and facial expressions.

**5. Use Technology:**
Find language translation apps for your phone and learn to use
them. I have found that I often need to translate a phrase into
another language, and then reverse the translation once or twice to
ensure it conveys the exact message I intend to say. She should do the
same thing when she is translating a message for you. Be advised that
the language translation apps are not very good with long sentences,
or run-on sentences. Keep your statements very concise.
**6. Seek Professional Help:**
If you have family or friends that are multilingual, you can ask
them to mediate between you and your wife in disagreements. There
is no shame in seeking an intermediary to help you resolve conflicts
between you. If you think that the intermediary would not be
impartial, then seek someone who will be objective.
**7. Accept that Misunderstandings Will Occur:**
Marriage is difficult, even under the very best of circumstances.
Couples are going to have fights. The dilemma is in how we fight.
Never argue to be hurtful or vindictive to your spouse. And never
accept a woman as your wife that does this. Accept that
misunderstanding will happen. But they do not have to be uncivilized
and savage. Instead, arguments can actually be handled in a very civil
manner. And knowing this can actually become a great source of
pride.
**8. Practice Active Listening:**
Listen and think about what they are saying. If she is speaking
English, she is thinking in her original language. Take the time to
envision what she is saying from her perspective. Remember that
English is not her first language. Strive to understand what she is
saying.
**9. Engage in Shared Activities:**
What do you both enjoy doing together? When you find out what
those things are, do more of them. Enjoy shared hobbies and
festivals. Build on what unites you and you will enjoy a happy life
together.

These are proven strategies to establish sound marriages with a
foreign wife. Learn to practice them until they become natural for
you. This is part of what is called self-improvement. This will be the
hallmark of your marriage.

6 MATRIMONIAL WEBSITES` },
  { id:6, title:"Matrimonial Websites", section:"Departure",
    content:`Matrimonial websites are recommended over dating websites for
the express purpose of selecting those who are serious about
marriage. They allow you to select your spouse from a pool of
women across the globe that specifically fit your criteria. Below are
some of the platform references you can use to find your spouse, as
of 2023. I will determine whether to update these references, based
upon the success of this book. Be advised that using the free profile
version on these platforms is a signal to women that you are not
serious, and the high quality women will avoid you. You get what you
pay for. So you will want to pay for the best level of service to receive
the best level of service.
1. **Muslima.com**: A popular platform for Muslims around the
world. It's a well-organized and secure platform preferred by many
Muslims seeking spouses. I personally used this platform successfully,
many years ago. But this does not exclude the fact that corruption is
writhe on this website. I would strongly advise you to learn how to
filter for your exact match, and thoroughly vet each person you speak
to. Do not communicate with her offline until you have thoroughly
vetted her. A woman with a free profile on that platform does not
exclude her from being a good choice, as many in the East are of
noble character, although she many come from a poor family.
2. **ChristianConnection.com**:**CatholicMatch.com**: Are
Christian matrimonial websites that connects single Christians from
all over the world looking for a religious-oriented marital relationship.
3. **MazalTov.org**: A Jewish matrimonial site that connects
Jewish singles worldwide. They are committed to helping find the
perfect Jewish match.

4. **SimplyMarry.com**: This platform serves various religious
backgrounds and is quite popular for its expansive network.
5. **Shaadi.com**: **Jeevansathi.com**: BharatMatrimony**:
**SikhMatrimony.com**: Are of the most popular matrimonial
websites, serving especially the Eastern Indian community. They
feature a wide portfolio of choices for people from a variety of
backgrounds and regions. Be advised that race and cast is a very
serious factor in this type of platform. And unless you are Indian, I
would not advise that you waste time or money there.
I would recommend a study of vlogs and blogs about the
experiences of people on these websites. Do not take simple reviews
alone. Make sure you are satisfied that you will receive the service
you are paying for. Follow their safety and privacy guidelines. They
were established for your wellbeing. Disregarding them can lead to
you being scammed, or lured to a foreign country and harmed. That
being said, many have learned to use these platforms to find their
exact match abroad. And have created wonderful, loving families. I
am a personal testimony of the ability of these platforms to open a
path to a happy life with a beautiful family. Because I was able to find
my wife using one of them.

Safety Protocols:
Any online relationship platform can help you meet people. But
you want to meet the right kind of people. People who are
specifically looking for healthy and safe relationships. I will list some
of the principles you will need to master, in order to help you
succeed in your quest.
1. **Protect Personal Information**: Entities have mastered the
art of extracting personal information from unwitting dupes. Don’t
be one. Never share your personal information with someone on a
platform that you have not thoroughly vetted and proven their
identity. And even then, you will be traveling to meet her and her
family; so it is more important for you to have her information.
There is no need for you to share your personal information such as
address; social security number; bank account information; credit
card numbers. She doesn’t need any of that information. Don’t offer
it. The only entity that will need that information is her formal
government authorities that you submit to for marriage.
2. **Verify Identity**: Vet, vet ,vet. Learn how to vet by studying
techniques on vlogs. After you have known her for some time, vet
her social media accounts. If she wants to marry you, she will give
you her login account information for her social media accounts
immediately. And she will sit there while you log onto them. Check
her attitude and whether she reacts suspiciously. Vet her What’sApp
account. Vet her address. Reverse look-up her photos online. Do
everything you can to ensure she is who she says she is. Trust needs
to be established; it is not a given.
3. **Be Wary of Quick Attachments**: Take your time to develop
a relationship. Be advised that every woman, no matter how beautiful
and submissive; is a potential hazard until proven otherwise. If she
says she loves you and needs you immediately, she could very well be
an online scammer. Remember that trust must be earned over time. I
would give six months to develop, before even considering
progressing.

4. **Financial Requests are Red Flags**: A scammer will always
find a way to get money from you. In many cultures, a dowery is
expected for the marriage. It is not given without getting the woman.
Never offer money to someone you have not thoroughly vetted and
secured a marriage from . Any money requests are serious red flags
that you should run from.
5. **Secure Communication**: Keep your conversations on the
platform provided by your matrimonial service, until you have
thoroughly vetted the profile you are communicating with. The
platforms offer extra layers of protection for your benefit.
6. **Research the Online Dating Platform**: Research online
reviews and social media forums, before you select an online
matrimonial app or website. Many platforms are known for fake
profiles, or what is called “Catfishing”. Select a reputable platform
known for safety.
7. **Meet in Public Places**: When you have decided to travel
abroad to meet your prospective bride, keep your safety at the
forefront of your mind at all times. Never meet at her residence for
the initial meeting. Select a public place for the first few meetings
with her family. This will help you avoid any unpleasant experiences.
Once you are sure that you can let your guard down, then you can
venture to her family’s home. I want to emphasize that Americans are
sometimes kidnapped and killed abroad. Because they do not follow
proper safety protocols. Don’t be as concerned about the impression
you give to your hosts, as you are about your own safety. They will
have to understand your apprehension.
8. **Avoid Clicking on Suspicious Links**: Never click any links
that someone sends you. Good matrimonial sites will automatically
strip off any links from being sent. This is why you should keep
communications on their platforms. But once you move off of their
platforms, avoid clicking any links she may send you. Ask for
screenshots instead.

9. **Report Suspicious Behavior**: Any profiles that you
experience fraudulent behaviour from, should be reported and
blocked immediately. Reporting them will allow the website to delete
their profile(s). This makes it more difficult for them to scam others.
And it prevents you from meeting them again.
I don’t want to make you afraid of the online matrimonial
platforms, or global travel. They are incredible experiences, when
handled in the most sophisticated manner. These are the steps that
will get you there.

Creating an attractive matrimonial profile:
This skill enacts the laws of attraction. You have to put out the
things that your potential wife is seeking. To be attractive to certain
cultures, you have to learn to present yourself in an attractive manner
to those cultures. Here are some steps that you can implement.
**1. Maintaining Authenticity**: If you want a woman that will
actually want you as a person, then present your personality and
character. Be a real person, and strive to attract someone who is
genuinely attracted to you. Represent yourself with the dignity and
maturity of a real man, who has the means to travel the world in
search of his wife; not as a globe-hopping gigolo, looking for easy
sex. To attract a good woman, strive to be a good man. In America, a
good man is not attractive to the women here. This may lead a man
to present himself in a way that is not authentic, to get a girl. You
don’t need to do this abroad. Being a real man is sufficient to attract a
good woman. Remember that if you present yourself as rich, on
these profiles, you will attract women that want money; not you.
**2. Highlighting Key Aspects**: You will want to highlight
characteristics that women will find valuable in a husband; your age,
weight; height; career; languages; religiousness; social activities, etc.
Women abroad are far more accustomed to marrying older men. My
wife is half my age, and this has never been an issue with her nor her
family.
**3. Respectful Tone**: This should go without saying; but don’t
make any disparaging remarks towards other cultures. Even if you
don’t want to entertain a particular race, religion or ethnic group;
don’t mention it in your profile. Just wisely filter them all out in the
matrimonial site’s preferences. By calling out all the races, religions
and ethnic groups that you don’t want to talk to, you are actually
making yourself very unattractive to someone who might have
otherwise responded.

**4. Handling of Sensitive Information**: The subject of a
woman’s virtue is not something that is spoken of in a nonchalant
manner. Her virtue is sacred to her and her people; and it should be
regarded as such by you. It is not a small thing that you casually toss
into a conversation. It is a deliberate and well calculated point of
vetting a woman. Some matrimony platforms allow women to state
their virtue status in their profiles. This is something that you can
also filter on for results that are all virtuous women. Handle the subject with
the utmost great care.
**5. Language**: Most matrimony sites will be in your language
preference. This is determined by your phone preferences and your
geographic location. However, you may see many other languages, for
other profiles, once you log onto their platform. You can translate
them automatically. But you will want to be sure you contact women
in their given language. This is your chance to use your language
skills. You will want to double-check each message you send, to
ensure it says exactly what you meant to say.
**6. Depicting Family Values**: When you are building your
profile, you will display your own family heritage and cultural
background. You will want to do it in such a way as to ingratiate your
traditions and values with the women who view your profile.
**7. Showcase Interests and Hobbies**: This is your chance to
showcase your adroitness. What do you enjoy doing? What are you
good at? We have a saying that we have to be our best advocate. So
let your light shine, when displaying your skills.
**8. Pictures**: Use photos that show you in a good light. If you
decide to use filters and AI generated photos, try to go for a realistic
look. Don’t be a catfish. This is also a time to show your interests and
your skills. Show off your culture and the things that make you
happy. The right woman will be attracted to you. If you are a
musician, show photos of you performing. If you play sports, show
photos of you scoring.

**9. Communicate Expectations Respectfully**: Remember that
you are both looking for a future spouse. Focus on want you want.
Listen to what she wants. You don’t need to mention what you don’t
want. If she falls into that category, you can make that determination
and end the conversation gracefully. There is no need to hurt any
feelings in the initial phases of discussion. Stay positive. Try not to let
any disillusionment With western women spoil your opportunity with
new foreign women.
**10. Keep your Profile Updated**: It honestly shouldn’t take you
very long to find a good match. As long as you follow these
guidelines and act in a predetermined fashion, you shouldn’t be
looking for very long. However, in the case that you just can’t find
who you are looking for, or your selections keep failing; keep your
profile updated and current. Keep it changing so that the women
there know that you are actively looking.
Be yourself. You want a woman that wants you for you; not for a
green card or for money. The international marriage game has been
mastered by foreign women. So you will have to become adept at
spotting frauds. You are looking for an authentic and honest wife.
Then you must in turn be forthright and authentic with her. An
attractive online profile can help you achieve these things.
Lastly, make sure your matrimonial profile matches your other
online presence. As others are just as adept as you are striving to be.
They will look you up too, to make sure that your online activity
matches what you are putting on the matrimonial site.
Good luck.

7 INTERNATIONAL MARRIAGE LAWS` },
  { id:7, title:"International Marriage Laws", section:"Departure",
    content:`International marriage laws span a wide range of complex legal
geography. Below are guidelines to help you navigate the difficult
terrain of bureaucracies:
**1. Legal Age to Marry**: Countries generally require a
consenting age of 18 years old to marry legally. You will need to
research this prior to seeking a wife in a given country, and be certain
that you are in compliance. Comparatively rich foreign travelers have
given a very bad name to men seeking foreign wives. Be aware that
you are following in their wake of terrible treatment of women
abroad. And you will need to act in a high standard to be accepted
and received well.
**2. Consent**: Consent to marry a foreign girl does not mean
merely that she agrees in an online discussion. Know, understand,
trust and believe that you will require the full consent of her father
and their entire family. Then you will need to convince her
government that they should allow you to take her from her people
to be with you. This is a difficult and extremely bureaucratic process.
**3. Documentation**: Prepare to submit to a very detailed search
of your identity and your life. From your birth certificate and
criminal history, to your prior marriages and divorces. You will need
to submit financial information and prove emphatically that you
possess the ability to support a woman you desire to take from a
foreign nation.
**4. Residency Requirements**: You cannot simply fly to a
country and marry a woman, and leave with her. It doesn’t work that
way. Most countries require that you have lived in their country for a
specified period of time, prior to permitting you to marry one of
their daughters.

**5. Marital Status**: Those who have been married before must
prove that they are free and clear of that previous marriage, before
they are permitted to marry a foreign national. So, if you are
separated, but still married; you will need to dissolve that marriage
first. Don’t start looking for a wife abroad before you do this. The
bureaucracy of foreign marriage is already difficult enough. But
adding a messy divorce to the mix will only extend the processes, and
quantify your stress. It is simply not a good thing to do. Be prepared
to demonstrate that all your divorce documentation is absolutely in
order, before you submit it. If they find one word out of place, your
marriage request will be denied.
**6. Proxy/Remote marriages**: You may be allowed a proxy
marriage by religion or culture, but governments will not accept that
as a legally binding marriage. She will not be permitted entry into the
United States of America via proxy marriage. This is not a process
that you can shortcut. You will need to do everything right and exact.
**7. International Marriage Broker Regulation Act**:
“The International Marriage Broker Regulation Act of 2005 (IMBRA)
was enacted to address issues of domestic violence and abuse against noncitizens
(beneficiaries) married or engaged to U.S. citizens (petitioners) who have
petitioned for them to immigrate to the U.S., including those who met through an
international marriage broker (IMB). IMBRA mandated that GAO study the
act's impact on the visa process for noncitizen spouses and fiancées.”
I would advice you to take time to study the ramifications of this
act upon your marriage process, via official government website
resources. So as to be up to date with your understanding of current
processes.

**8. Recognizing Foreign Marriages**: It is important that your
marriages are recognized internationally. Her nation and our nation
require this. However, great difficulties attend foreign nations
recognizing foreign marriage unions. If your marriage is
unrecognized within her nation; be aware that you may be subject to
violations of their laws with any displays of affection or marital
union, while in her country. Some nations actually deputize their
citizens to be on the watch for foreigners fornicating with their
women. And you could be arrested for violating their laws. You
would then be required to prove your innocence in a foreign court of
law, and in a foreign language. I’m sure you can extrapolate the
importance of being in compliance with foreign marriage laws, while
abroad.
**9. Religious vs Civil Ceremonies**: For a virtuous bride, her
wedding is her crowning event. You want to ensure that you meet the
requirements of both the religious and the civil authorities of her
nation. To marry her in the sight of her family and countrymen, will
be a tremendous experience, once you have taken the proper steps to
ensure that you are 100% in compliance.
**10. Legal Advice**: Lawyers have a reputation in America for
their knowledge of law. They can greatly assist you to take the proper
actions to comply with legal statutes in America. The same is true
abroad. However, you will need to compound the difficult nature of
dealing with a lawyer that does not speak English. You will therefore
also be required to translate all their legal advice and documentation
accurately into the English language. Then you will need to decipher
their legal languages, and put it into the legal language of the United
States of America. Any documents that you give them will need to be
accurately translated back into their language. This process requires
hiring an official translation service in her country. Be advised that
there are tons of documents required for this process. And that you
will probably be require to send them in triplicate. It is not a fun
experience.

I have only scratched the surface of what legal hurdles you can
expect to obstruct your attempts at a legally recognized international
marriage. There is no circumventing this process to cheapskate your
way out of it, either. The ramifications of you somehow bringing a
foreigner to the United States of America to visit and becoming an
illegal alien, could mean that your illegal relationship will be punished
(both in the United States of America and abroad), by disallowing
either of you back into one another’s country. She will not be able to
return to the USA, and you may be barred from her country. If you
created children, then you can imagine the heartbreaking reality of
never seeing each other again. So, don’t do that.
Taking the proper steps at every turn to have a legally recognized
marriage, is definitely worth the painstaking effort. You will be
rewarded by acting free of any suspicion and guilt. Your union will be
accepted and your children will benefit from dual-citizenship. Your
family will grow in ways that you could not have imagined, prior to
taking these steps.

8 LONG-DISTANCE RELATIONSHIPS` },
  { id:8, title:"Long-Distance Relationships", section:"Departure",
    content:`Long-distance relationships will inevitably become a part of your
journey to take a foreign bride. During this period, you should view
this as your courtship. It is during this time that you will thoroughly
vet your intended wife. And also once she accepts to become your
fiancé(e), you will begin the planning stages for your lives together.
Below are ways that you may find helpful in dealing with your time
spent in a long-distance engagement.
1. **Prioritize Communication**: When you begin having
conversations with a foreign love interest, take it very seriously. Treat
it like a job. Talk to her every day. You can use What’sApp for most of
your international video calls. You can also use it for your texting. the
texting is good, because it allows you to keep a detailed record of
your talks. You can always reference her answers against earlier
messages; to see if they are consistent. Bear in mind that she will
likely be many hours ahead of American timezones. But if she is not
working, you can ask her to stay up to dedicate that part of her day to
seeing you. This is a good way to ascertain her degree of interest and
dedication to you.
2. **Engage in Shared Activities**: As you are learning one
another, you can both take an interest in a movie series together. If
you both watch a movie in her language, with English language
subtitles; you can both enjoy that time together. And you will be
immersing yourself in her language and culture. She can do the same
with you. You can find English language series that are subtitled in
her language as well. You can both participate in the intense study
that it takes to successfully obtain her US visa together. You can plan
your lives together. This will eat up the separation time you spend.
And it will increase the bond of affection and desire to unite.

3. **Be Clear About Expectations**: Let her know your
expectations from the start of your initial meeting; and don’t change
them. Iterate and reiterate what you expect from her as your wife and
the mother of your children. Leave no room for ambiguity in your
role, and her role. If you want her to be a traditional wife, who cooks
cleans and takes care of you and the children; then state that up front
in clear terms. And make sure that she is in full agreement with these
terms. You can also make this part of your prenuptial agreement.
This is your legal assurance that she will not change on you, when she
arrives in the US. This is also an excellent time to refer to the detailed
records of the application that you have used to communicate.
What’sApp will timestamp your conversations to prove the you have
agreed on terms prior to marriage.
4. **Plan Visits**: Depending on your financial abilities, you may
want to plan for visits during the interim period of your courtship.
Seeing one another will certainly help to relieve your longing to see
one another. However, it will also be a very difficult thing, if you
travel expecting sex from a virtuous woman. This could very well end badly
for you, in a foreign country. And I would strongly advise against it.
In some countries, it could cost you your lives. I don’t mean to
frighten you. But you’ve been warned. Don’t do that. Keep your
relationship pure until you have secured her hand and her US visa.
This is wisdom speaking. Cheap sex is available all over America. You
are on this path and reading this book, because you want better. Then
you must in return become better. Let your visits inspire your will to
make a happy and successful marriage.
5. **Trust and Honesty**: Lasting marriages are built on trust and
honesty. You will have to vet the women that you speak to. Once you
settle on who you want, you will have to establish trust. No man
should endure the difficult struggle to obtain US citizenship for a
woman that he cannot trust. Anytime that trust is betrayed, prior to
her coming to the US, should be a major red flag. A man should
seriously re-evaluate whether or not to spend the money and time on
someone who breaks their trust. Be aware there is an entire
international practice of fooling gullible men into getting US
citizenship, by pretending to love and marry them. Learn to vet your
intended spouse. There are many references that will teach you the
processes to do this. Trust is critical in this type of relationship.

6. **Cultural Understanding**: A constant theme of this book is
the importance of cross-cultural comprehension. Cultural immersion
becomes more than a phrase, once you meet the love of your life.
When two are in love, they learn to love the cultures of one another.
They eagerly learn each other’s traditions and holiday celebrations.
This will increase the bonds between you.
7. **Discuss Future Plans**: Where will you both live? How soon
do you want children? How many children do you want? Where will
you worship with your religious congregation? Planning for your
future can be an amazing adventure that you will share. And this
activity will concretize your marriage to one another.
8. **Learn Language**: I advise language immersion classes
immediately. You should have some practical use of her language,
long before you decide to look for a foreign wife. You should have
some kind of grasp for her language, so that you can initiate a
conversation with her. She may have no idea that an America man is
seeking her hand. She may only have eyes on her own people and her
own country. It is not a common idea that some foreign man will
come and take a foreign girl to a foreign land. She may be more
pragmatic in her notions about marriage. Don’t be surprised if she
does not speak even one word of the English language. But also,
don’t be surprised if she learns to speak the English language, faster
than you learn to speak her language.
Long-distance relationships require skill and determination, if you
are to become successfully married. You will have to sacrifice and
overcome great dissatisfaction, if you are to prevail. Long-distances
can make a love seem like it takes forever. But in my case, it only took
six months from meeting her in person, until she was in the US and
we were married. So be encouraged. It is far from impossible, if you
take the correct path.

ARRIVAL

9 US VISA AND IMMIGRATION PROCESS` },
  { id:9, title:"US Visa and Immigration Process", section:"Arrival",
    content:`The K-1 visa, is an alternative to marrying in a foreign nation; and
then trying to obtain a marriage visa to bring the woman you married
to America. This is the option I personally selected for my own
process. It is known as the fiancé(e) visa. This visa will allow your
foreign national fiancé(e) to travel to the United States to marry you
legally, under US law. The stipulation is that your marriage must be
performed within 90 days of her arrival.
I would advise that you familiarize yourself with the complete
description of the processes at www.uscis.gov. I will summarize the
process steps. But be prepared for a long, arduous and frustrating
battle to secure permanent citizenship for your fiancé(e).

You will want to consider reducing your stress and the probability
of making costly mistakes up front, by hiring a visa preparation
service. I had success using Rapid Visa. For a fee, they were very
helpful in the preparation of all my documentation, from start to
finish. And when I say “finish”, I mean until my foreign fiancée
became my wife and an official US citizen. Other services may be just
as good; you decide. Here are a couple more names to choose from;
Visa Journey and Boundless.
**1. File Petition**
Firstly, you as the US citizen will complete the I-129F form Petition
for Alien Fiancé(e). This form is submitted to the United States
Citizenship and Immigration Services (USCIS). You will need to include
photos, receipts for your travel to have met her abroad, for your
flight, hotel, car rental, activities while there, etc… In short, you will
need to prove beyond a shadow of a doubt; that your relationship is
bona fide. I would suggest duplicating this complete package, prior to
sending it to the USCIS. The reason being, is that you can be assured
that they will request the exact same supporting documentation
repeatedly.
**2. USCIS Processes Petition**
The USCIS will receive the documentation and send you a receipt
of your package. They will review your documents and request more
information if needed. Assuming your documents are acceptable,
they will approve your petition and forward your request to the
National Visa Center (NVC).
**3. Case Sent to Consulate**
After the National Visa Center (NVC) gives you a case number, it
is then forwarded to the U.S. embassy or consulate in the foreign
fiancé(e)’s nation. They will actually process the K1- visa for your
fiancé(e).

**4. Fiancé(e) Applies for K-1 Visa**
Once this side of the process has been instituted, your fiancé(e)
will need to complete the DS-160 form. Take into account that as a
non-english language speaker, it will actually be you completing the
form for her. However, you will need to translate every line of this
form; so that she understands every single point, question and answer
100 % correct. She will then apply for the K-1 nonimmigrant visa; and
again - as a non-english language speaker, it will actually be you
completing the form for her. However, she must provide a litany of
supporting documents to substantiate her petition.
She will need to provide her foreign passport and her birth
certificate. If she was previously married, she will need to provide her
divorce or death certificate for her former husband, as well as your
divorce paperwork, if you were also formerly married. You must
submit police certificates for all prior addresses and criminal history,
or no criminal history certification. You must both submit to full
medical examinations and disclosures (in many countries, this includes a
medical examination of her hymen, to prove that she is indeed a truly virtuous); and
you must provide full documentation for your results. You must
submit full evidence of finances, the ability and the will, to fully
support your fiancé(e) as your wife (Form I-134, Affidavit of Support).
She will need to provide a 2” x 2” visa photograph. She will need to
provide complete proof of your relationship (if you recall me saying you
will need to make a complete copy of all supporting documentation to submit
repeatedly; this is one of those times). And she will also be required to pay
the fees for her petition in the foreign U.S. embassy or consulate. You
may need to send her the money to pay for these fees.

**5. Interview**
Provided that her petition documents are accepted, the U.S.
embassy or consulate will schedule an appointment for her interview.
She only has this one chance to succeed. There are no do-overs. And
so, you must prepare for this interview as if your lives depend on it
(because they do). She may or may not be afforded a translator. She must
have committed every single question and answer to heart; verbatim.
And so, you two must drill every question and answer in both English
language, and her language. Do this every day until the very day of
her appointment arrives. She will need to have all of the required
documents in her possession at the time of her appointment; no
exceptions whatsoever and no excuses. If she forgets something, it
may cost you both your marriage. I hope that I am adequately
emphasizing the pertinence of you both being 100% prepared.
**6. Visa Granted**
If she is able to successfully interview at her U.S. embassy or
consulate, and she convinces them of her sincerity; then she will be
awarded the Golden Ticket. She will receive her United States K1
foreign fiancé(e) visa. At this point, you can exhale and celebrate. She
will be coming to marry you in the United States of America.
**7. Travel To The U.S.**
Now you must begin the preparations for her departure from her
homeland. You will make reservations for travel. If you want to fly
abroad to accompany her to the US, it is advisable. Solo international
travel for a naive virtuous woman is terrifying. You can fly to meet her and
return with her, or you can make reservations for her to fly alone. She
will be bringing her whole life with her. But since you will be her sole
provider, you have the option of telling her to pack light. And that
you will provide shopping for a new wardrobe upon her arrival.

**8. Get Married**
I would advise that you set your wedding date to coincide with her
arrival date. Don’t put it off, thinking the you can “shack up” until
you marry. A virtuous woman will want to be married to even live with you.
She may request that you provide separate housing for her until you
are legally married. You should offer this for her without hesitation.
The sooner you marry her, the less you need to spend on separate
housing for her. I will let you in on an aspect of my marriage process.
I set our wedding date for the day after her arrival. There was no
waiting period for us. Don’t give yourself a chance to ruin your hard
work by trying to take her virtue before you marry her. If you have
been a noble man thus far, then it will be a great reward to
consummate your wedding vows afterward. And believe me… it is
such a reward that you will always treasure the experience of having
done things in the right manner.

**9. Apply for Adjustment of Status**
Now that the honeymoon is over, its back to the stressful reality
of applying for her Adjustment of Status (AOS). This is the process
each foreign spouse must complete to receive their Green Card. You
begin by filling out Form I-485. You should use all your previous
forms as reference guides to help you complete answers to this
application truthfully and accurately. I personally made sure to
complete all my forms in PDF format, so that I could cut & paste to
complete future documents.
As you will have done before, you will have a complete copy of all
documentation to submit for this process as well. You will also have
to complete the interview processes with the Homeland Security
Administration, in person. These steps, in addition to the Social
Security Administration processes, will all lead up to her pledge of
allegiance and official US Citizenship.
At this point you will have completed all the processes. But I
strongly advise that in-depth studies and diligence are required every
step of this long, arduous and painful journey. It is worth every
penny and every moment. You will value the struggle as you spend
your life with your new wife and your new children that will hopefully
follow.

BAGGAGE

10 THE KEVIN SAMUELS EFFECT` },
  { id:10, title:"The Kevin Samuels Effect", section:"Baggage",
    content:`Mr. Kevin Samuels is a man that performed an incredible service
for all men. He did for men, what men were not able to collectively
do for ourselves. He launched a movement that will be to his credit,
long into the future. His work will be proved in the generation of
children that are produced by those who were moved into action by
his work. Though the stress of his work, is ultimately blamed for his
demise; he could very well have been assassinated for the effect he is
having upon men in America and abroad.
This beloved brother was born in the year 1969. His cultural
influences shaped and molded his character. He was able to adeptly
navigate a sea of corruption, while others may have embarked upon a
completely different path.

Mr. Samuels real work was short lived, yet very effectively
executed. Men in general should pay more attention to his
methodology. How he did, what he did; is what men must master the
execution of. The ability to compile facts & statistics; and then
memorize them for fast recall. The ability to form a sound platform
for his philosophy, and disseminate it again and again. The ability to
charismatically elevate the most downtrodden segment of men on
the Planet, and the ability to profit from it. These tremendous
accomplishments will be seen in the children that admirers will
produce. Those children will grow up to produce a global change.
And this is the responsibility that men who were awakened and
inspired by Mr. Samuels must shoulder. I will attempt to layout for
the readers, the oft-repeated facts and statistics he sited in writing. So
that we can commit them to memory. And look for up-to-date facts
and statistics to help us build our lives on the firm foundation of
truth.
One writer stated that, “Roughly 16% of black men are
responsible for the 75-80% of out of wedlock births in the black
community. Here's how...51% of black men are single and childless.
Another 29% are married either with or without kids. Now that's
80% of black men doing it the right way by either being married before
they have kids or not having kids while being single/unmarried. So that
leaves 20% of single men that are pretty much seeding the black
community. There's a percentage of these single men that only have one
‘baby mama’...~5-6%...and that leaves the ~15-16% of black men
with more than one ‘baby mama’ that's responsible for a huge chunk of
the out of wedlock births in the black community.”

This set of statistics transcends a racial dynamic; as it is endemic
in our society today. It is said that an immigrant from Latin America
can cross the US border illegally, with his wife and children; scrape
money together begging for work in a parking lot, yet still go home
to a submissive and supportive wife and loving children. While
simultaneously, a man who is born in the United States is expected to
endure the disrespect of a woman with 100 sex partners and multiple
children from multiple fathers; none of who provide for their
children. And this man is supposed to become a step-father and
provide for children who are not his, while that woman gives him no
children of his own. If you can see the dichotomy in these
circumstances, then you can easily understand the untenable situation
men face in America. Something has to change.
Many men have been broken and crushed under the wheels of
what is called Progress. The irony is that it has been anything but
progress for men. And so a litany of advocates have emerged to
support the interests of men and the traditional nuclear family unit.
Mr. Samuels often sited the term Sexual Market Value, which gave
a numerical estimate to the value of women in the eyes of men. He
taught us how women fantasize that their value somehow increases
with their age. While the only value a man has, is his wallet. He
corrected this skewed perspective of women with one simple
statement “You are average at best”. And thus, his legacy was established
with the men of the West. He began to demonstratively disassemble
the fallacy of the women’s liberation movement; women’s
independence and women’s superiority complex. He unmasked this
miserable, infantile vanity. And he revealed their mass mental illness.
Men rejoiced at the skill with which he time and again began by
asking them what women rated themselves on a scale of one to ten
(1 - 10); and they could not use seven (7) as their answer. Time and
again we saw 35+ aged, mentally ill women; who were over weight,
out of shape; in financial ruin, with multiple babies; claiming they
ranked as a nine or a ten (9 or 10). We saw him ask for their age; their
height and their dress sizes. His mastery at catching them lying about
how fat they were and gleaning their actual dress sizes was superb.

Time after time he asked them if they wanted to be married, and
how much of the financial burden they wanted to carry in a marriage.
He asked them if they wanted to have children, or more children for
a new husband. Most of them said they did not want to give a new
husband any children at all.
Then he would ask them how much they thought a man would
need to make, to provide for her and her children. All of them stated
in excess of $250,000-$500,000 dollars. Then he asked them the
percentage of men that made that much money each year in the US.
Then we watched their amazement as they came face to face with
their own delusions, because less than 5% of men make that much
money.
And we watched their eyes glaze over as they heard a man teach
them that they were not qualified to get a man of that value. And that
a man of that value did not have to be monogamous to them, while
they had to be monogamous to him. And that they would likely have
to come to terms with sharing a man.
Time and again we saw that, although men are more likely to be
married than women, women file for divorce 90% of the time. And
that by the year 2030, over 50% of American women will never be
married.

Kevin Samuels singlehandedly redefined manhood in the United
States of America. His aim and objective was to save the traditional
nuclear family unit from destruction, by a social engineering program
that has gripped America since the 1960’s. He wanted men to reclaim
our status as the head of the family, because single mothers have
ruined families in America.
He gave men the courage to confront the insane mobs of
wretched whores that proclaim they are worthy of the financial
support of a good man. He turned this diatribe on its head, and
taught men the very opposite. He told those women “Die alone… buy
a cat or dog for emotional support, and die alone”. He told men to go where
we are wanted and loved.

Long before Mr. Samuels was known, I had already flown abroad.
I had already married a beautiful young Moroccan lady, who was half
my age; and produced our first child. While I watched Men Going Their
Own Way (MGTOW) and the #PassportBros movements take off, I
secured dual-citizenship for my family abroad, and I am actively
producing more children.
I did not follow the message of Mr. Samuels until after he
departed. I found that his message triggered my anger, and so I
avoided watching his segments. I did not have to pay close attention
to him, because I had secured my family before his online persona
was launched. But in light of his passing, I decided to study him, so
that I could thoroughly understand the dilemma, and present this
writing as a tool to help those struggling to overcome the condition
of men in America.
Now that Mr. Samuels is gone, we have only the voices of those
who are telling men to fly abroad to find cheap whores to have fun
with. I implore you that this idea is definitely not the solution to the
loneliness of American men. It is far cheaper to pay a prostitute in
America, than to book international travel, to buy one. I want you to
read that line again… Because you need to understand that hordes of
American men flying abroad to buy cheap sex from other nations will
ultimately result in a global backlash against American men, that will
come as a total shock. We don’t want to see a sharp rise in American
men being abducted and killed abroad, by the men of those
countries, who hate that their women are doing this. And so, I will
compliment the message of Mr. Samuels, by offering a far better
alternative to international prostitution.
“If all you have ever had to drink from were dirty glasses, then you will drink
that dirty water. But if you were given an alternative of a clean glass to drink
from, then you would choose the clean glass every time.” ~ The Most Honorable
Elijah Muhammad

American men do not have any virtuous women for wives to choose from.
Sadly, most American girls lose their virtue at a very young age.
They become cold and callous to the idea of sex. It becomes a
meaningless act to them. Less than 5% of American girls marry as
If American men knew there was a class of virtuous women to
marry from; girls that no man had ever touched; they would choose a
virtuous wife every time. Mind you, I am not talking about stealing the
virtue of girls and traipsing off back to the United States, leaving a
pregnant single-mother behind. No… a man should be killed for
doing that. I am talking about finding a girl to marry and produce a
loving and nurturing family for American men. Families that can
push the wave of corruption that is washing over us back into the
abyss from which it came.
Let us reclaim the traditional family unit. And thank God for men
like Mr. Kevin Samuels. May God rest his soul.

11 THE SHAHRAZAD ALI EFFECT` },
  { id:11, title:"The Shahrazad Ali Effect", section:"Baggage",
    content:`Mrs. Shahrazad Ali pioneered the era of holding the American
Black woman accountable for her direct role in the complete
destruction of the Black community. She laid out in detail a damning
dossier of their complicity, in working hand in hand with the enemy
of the Black community’s rise from ignominy.
She told a centuries old secret that Black women have passed
down, from mother to daughter; from auntie to niece. She laid open
the secret cabal of Black women who had plotted against their men,
and ruined their sons. She destroyed the lie that Black women’s
nobility and feminine voodoo magic was solely responsible for Black
America surviving slavery. And instead it was the Black woman’s
desire to be the slavemaster’s bedwench, and her sick envy of the
slavemaster’s wife that has her so twisted today, that she will castigate
a white woman, while wearing a blond wig and blue contact lenses.

She boldly gave nationally televised interviews, teaching that it was
the Black woman’s insolence that is solely responsible for the sad
condition of Black America today. She said the American Black
woman is like a coddled and spoiled baby. And that the Black woman
used the federal government and white supremacy to replace her
Black man as a father; a husband and the head of the Black family.
And she helped the US government destroy her man, so that she
could replace him.
She singlehandedly educated an entire generation of Black men,
who were raised to believe the Black woman could do no wrong;
even when she did wrong.
Her case study was the original blueprint for men like Kevin
Samuels, who followed in her footsteps. For her service to the rise of
her people, she was castigated and vehemently rebuked by her fellow
sisters. And yet, to this very day; she has never wavered in her clarion
call to force Black women to the carpet of accountability.
Mrs. Shahrazad Ali deserves recognition and a place of high
esteem in the hearts of Black American men in particular. But also in
the hearts of all men, who are now benefitting from the generation
of Black men that she raised. She deserves that her reputation, which
was maligned, should be cleaned up and restored by all men. She
should be placed on a high mantle of noble women.
If you are not aware of her works, then please buy and read her
books. The great book that propelled her onto the national stage is
called “The Black man’s Guide to Understanding the Black woman”. Give
her flowers while she is still alive. Let her know that she has been and
will always be appreciated by us.

12 THE HIGH VALUE OF MAN` },
  { id:12, title:"The High Value of Man", section:"Baggage",
    content:`Precious jewels are formed deep within the Earth, under
tremendous pressure and heat. Men are not made by women; men
are made by men. A man will grasp every opportunity to secure a
path for himself; His woman and his family. He looks for
opportunities to secure his future. He will continue to increase his
value among his peers, until he garners the admiration of those who
surround him.
A man of value has his choice of women to submit to his will. He
does this through the increase of his value, and the estimation of his
worth. A true man is the jewel of any society. He effects changes in a
circumference of social influence, which can be global today. He is
known to have integrity and honor. His word is stronger than his
physique; and his will is stronger yet.
What does all of this poetic language mean? Let’s begin to break it
down into simple terms, that all men can easily understand…
There was a time when a man could support his entire family, on
the money that he garnered from his work. Whether he was a
business owner, or an employee, he was a man in the eyes of
everyone. He had value and self esteem. Whatever he endeavored, as
long as he was found working each day, he was considered a man. A
true man never needed to destroy the manhood of another man, in
order to bolster his ego. A true man upheld himself with his hands
and his mind.
Today, the Man of High Value is determined by the number of
zeroes that follow his yearly income. Only when the number of
zeroes has reached over $100,000, is a man truly considered to be a
man. Only when he has garnered certain material objects, (and has
the ability to garner more still); is he considered to be a Man of High
Value. Luxury; money; good homes; friendship in all walks of life…
these determine the Man of High Value today.

Is there a delineation between a Man of Value; as opposed to the
Man of High Value? Of course there is. The Man of Value is consider
to be the man with less than $100,000 of yearly income. His
confidence is not as great as the Man of High Value.
Why is this the case?
It is due to the inability to garner material objects, as effortlessly as
the Man of High Value. It is not owing to his lack of desire for more;
but there has been a concerted effort to destroy the sanctity of
manhood. Over time, he has lost his ability to resist the constant,
unending onslaught of degradation that men endure, each day.
I humbly submit that there are many degrees above what the
worldly masses call a Man of High Value. The lust to do whatever it
takes to secure enough money to live a lavish lifestyle, seldom
accompanies morality. A man possessed of the lust for material
objects and sex is not equal to a man who is possessed of the Spirit
of God, and in full control of his destiny. He gains both an upright
conduct and the money to exercise his will. And he remains free of
the self-accusing spirit that haunts the man who’s activities never rise
above his navel.
In this book, I have offered a specific strategy that any man can
follow. Firstly, to give a broad understanding of how man has
become devalued. We must be able to understand and refute it every
single time that we see it occur; whether with ourselves, or with
another man. Without consideration of his race; nationality or
religion. When the sanctity of all men is defended, all men will rise.

13 THE STEP FATHER ROLE

77` },
  { id:13, title:"The Step Father Role", section:"Baggage",
    content:`For decades, American women have forced men to accept the role
of a step-father to their children. They have expected men to
willingly accept responsibility for children that were not theirs, all
while the women refused to give the step-fathers children of their
own.
The step-fathers were forbidden to discipline the children of their
wives, yet expected to pay for those children, as if they were their
own. The children grew up having little to no respect for their stepfathers, because they knew those men were not their real fathers. This
has been the sad reality of the men who were attempting to do a
noble thing. These were men who were attempting to right societal
wrongs, by stepping into the role of a husband, provider and father
to fatherless children. And for his dedicated and selfless sacrifice, he
was disrespected, mocked and vilified by the very woman that he
tried to make a life with.
My father was a step-father. I too was a step-father to a child,
whom his mother had raised to love the street life. He invited the
possibility of being murdered by gang activity or police invasions into
my previously peaceful home. I too was disrespected by her child.
But I was self-respecting enough to put her child out of my home,
rather than tolerate any challenge to my authority in my home.
I watched as her family put her step-father into an elderly home to
die, and they hardly ever visited him. He died alone there, while they
sold off his home and all his possessions. They bilked his military
benefits and squandered his insurance money. He had raised twelve
(12) children, none of which were his. And they disrespected him
until the day he died. This is the legacy of the American step-father.
It is a thankless job.
Today, American men are refusing to become step-fathers.
Circumstances are forcing single mothers to gather into lesbian
camps to form co-parenting co-ops. American men are telling single
mothers to buy cats and dogs for emotional support, because they
refuse to allow these women to take advantage of their natural need
for companionship.

I believe that American women have so thoroughly abuse the role
of the step-father, that it will be extremely difficult for single mothers
to ever find a husband in America, from now on. That is a lesson
they will have to come to terms with, and do the best they can with
their alternatives.
Step-fathers have been demonized and maligned by the very
women that wanted them to provide for children that were not
their’s.

Rather than being cooperative and submissive to the man, they
disrespect and demean him in front of the step-children. This erodes
any respect the women and their children should have for a man that
sacrifices to provide a stabile home for all of them.

As for the men of marrying age, I would not advise becoming
step-fathers. I would advise them to find a virtuous wife abroad and
create a loving family for themselves, while they are young and
strong. Repopulate America, with strong and loving families. Protect
your wives and daughters from becoming corrupted by the women
of this generation and the previous generations.
Learn from the example of those who have gone before you. Do
not end up a divorced, broken step-father; who’s former wife took all
his money, homes and future away from him in the courts. Skip that
step and buy a plane ticket to a better life abroad.

14 GROWING OLD ALONE` },
  { id:14, title:"Growing Old Alone", section:"Baggage",
    content:`As young people, we really never think about the reality of
growing old alone. Statistically, 54% of men are single, childless and
middle-class. Once we reach the age of maturity, which is 42 years
old, we begin to contemplate the reality of life.
I come from an age where I watched my community toss old men
in facilities to be abused by the attending staff of employees. They
laid stinking in dark lonely rooms, until death claimed them. These
are men that broke themselves to provide a humble subsistence for
their wives and children. And the treatment they received was dying
alone and seldom visited by their “loved ones”.

Women are now facing that grim reality at a young age. They are
fast learning that they cannot con men into taking care of them in
narcissism. A wave of homelessness and mental illness is washing
women into the Sea of the Uncaring. Men know this Sea all too well.
We know that the streets are only one injury away for us. We know
that no one cares if we suffer and die. But women, who wanted
equality, are now bemoaning the very thing that they protested,
fought and maniacally and sadistically worked for. They now have the
freedom of equal independence to die alone. And they don’t like it ,
even one bit. Young women are now on social media, crying night
and day that, “… We didn’t sign up for this. We want a husband to cook and
clean for. We want someone to take care of us”.
The problem is, that they and their mothers have so thoroughly
ruined that possibility, that it will take generations to correct the
balance again. Yes, homeless prostitution is the future for most of
the women in the West. Men will not save them from it this time.
They will go through this hard reality check. And it will
fundamentally change the dynamic of Western civilization.
Let us never forget the cruel, narcissistic women that raised their
male children; often telling them they are just like their no good
fathers. Ruining their son’s self-esteem and ability to interact with
females in a balanced and productive manner. Now that these sons
have matured under generations of this abuse, they are completely
unfeeling and unsympathetic towards the plight of these women.
They would rather masturbate, than spend their lives tied to these
monsters.

Let us not forget that these women will cry and pretend to have
“healed” and changed for the better. But once they have duped some
poor fool into believing their lies, they will again divorce that man;
take his money and his children. Leaving him broken and unable to
recover from the death blow. All the while, laughing with their
girlfriends about how they did this man so wrong. And laughing at
how stupid he was, to actually fall for their tricks and believing their
lies again.
So many men have suffered this ill fate, that the game is
completely over for all women in the West. Now they have doomed
themselves to die alone. This is female leadership. It was always the
plan of those who sold them this ideology of women’s liberation.
And it was always aimed at the “Fall of America”. They have
succeeded. It would behoove all men to their role in the rebuilding of
this fallen society. And how each of us can contribute to a new and
better civilization than the one we inherited.

Men who have now determined to rebuild with traditional women
from abroad, must protect these women from the hatred that they
will receive from Western women. Do not allow those women who
chose to die alone, to corrupt and destroy the women and children
you produce. Be wise and guard them cautiously.

15 THE FRIEND ZONE` },
  { id:15, title:"The Friend Zone", section:"Baggage",
    content:`Modern western women developed a culture of collecting multiple men
that they have absolutely no desire to be with, in any way. They use them
for advise on finding the man they truly want. They use them for free
dinners; free movies; free shows; free trips; free shopping; groceries; utility
bills ,etc… And they have no compulsion whatsoever about it. They feel no
guilt; nor do they ever feel the need to repay that service in kind.
Those women will call these men religiously, everyday to use up that
man’s time, dumping their emotional baggage on him. They know they are
simultaneously feeding him the false hope that, if he can just hang on a
little while longer, he will finally be granted his chance to be with her. These
women know this will never happen. But they lie to the men they collected
in their friend zones, to try to cobble together the man they desire out of
multiple men.
And they are the first to complain about men cheating in relationships.
They want one or more men for sex; one or more for money; one or more
for entertainment; one or more for drama. They feel no way committed to
any men they produced babies with. They actually feel it is the responsibility
of friend zone men, or potential relationship men to pay for some
stranger’s children, for the privilege of being in her space.

Men have uncovered and thoroughly exposed this corruption. Men are
teaching one another to leave these women alone. These women, knowing
the game is over, are now attempting to trick these men into marriage. I
would advise all men to run in the other direction from them. Some men,
who have had to suffer under this indignation may feel the need to repay
these women in kind. They may begin demanding “Pussy Payments” in return
for all they have done for them. The men may way to string these women
along; giving them false hopes in return. Only to ghost them, like they
deserve to be left; alone. Men may tell them to “… report to The Wall”
because “Winter is here”. And there is no warm place for these women to
settle with any man today.
A far better strategy is to find a virtuous wife abroad. Don’t settle for a
disease ladened whore, that gave her virtue away to some low life; and now
she has nothing of value left for a good man. She has nothing left to offer a
man that wants a faithful wife, and a loving family. She is for the streets. She
made those choices with every man she friend zoned. Now the men are
leaving her to the streets, and finding decent wives abroad. And she is angry
and bitter. She blames men for her fate, and not herself. Even now,
American women refuse to take accountability for their own wicked ways.
Men are now flipping the script and taking multiple women and friendzoning them. Making them pay for things that men want, and feeling
absolutely no need to repay them. Because they understand that this is a
balancing of the scales of the last five decades of the Women’s Independence
Movement.
My personal advice is not to become what you hate. Don’t be corrupted
like that. Instead, begin dealing with your internal issues and self-correct.
Simultaneously, prepare for a new wife that you can find abroad. It is much
less expensive to take the surer path; and it is a better investment in your
life and future.

16 THE VIRTUOUS WOMAN` },
  { id:16, title:"The Virtuous Woman", section:"Baggage",
    content:`In the West, the respect and protection of the virtuous woman
has been completely destroyed. It is almost impossible to find virtuous
past grade school, in America. This is a sad reality facing Men that
wish to have a wife and a family. A Man cannot have a wife that has
been with other men, and expect her to give what is in her nature to
him. Once she has given away her virtue, she cannot be to a Man,
as she should be. She will be laying with one, and comparing him to
all the others she has been with. It is a sad reality.
Now that all the women in the West have been completely used
up, the American males want to travel around the globe buying
prostitutes. Some are promoting the exportation of this lascivious
lifestyle of promiscuity abroad, to ruin whole nations of foreign
women.
No true Man travels abroad for cheap sex. Prostitutes are available
all over America, for much less money than a trip abroad. Most will
not even charge money these days. Those traveling abroad to have
cheap sex with foreign women could be beaten to death, by the men
of those nations. They could be taken and tortured to death, like any
pervert deserves.
The honor of men must be uplifted globally, for the sake of all
men. No father would want some foreigner taking his daughter to
have sex in a back alley somewhere. We must re-establish the code of
manhood, that will not allow perverts the freedom to destroy nations
due to the inability to control their desires. Each man who brings a
wife from abroad, will know the struggle of protecting his daughters
from growing up to become like the very women he disdains.

I am for the respect and protection of virtuous women and girls.
After going through the tremendous challenges of having to travel
abroad, to find a virtuous wife that honors, respects, and upholds my
name before my daughters; I would defend them from any man who
sought to corrupt them. Foreigners love their daughters like you love
your daughters. And they want a good life for their families like you
want a good life for your family. Therefore I admonish American
men to correct our behavior, for the sake of our own country. Treat
others with the respect that you desire for yourself; your wives and
your daughters.
In the decades to come, I hope to see a culture rising in the West
where women are respected and protected. It could possibly start
with men who had to endure such an extreme odyssey of world
travel to find a decent wife, that we will not allow them to be
corrupted. And we will begin to link with others who hold the same
values. And through this brotherhood, we will forge a better future
for the American family unit. Men who protect our women and girls
are the key to the future.

17 CLOSING THOUGHTS

Lake Minnetonka` },
  { id:17, title:"Closing Thoughts", section:"Baggage",
    content:`My fervent wish is to possibly receive positive reviews and emails,
proclaiming the success that men have found in using this book to find
their wives; and establish their families. I can think of no greater legacy than
having played some small part in helping to establish new families across
the globe. I will have accomplished my job, if I can help to be responsible
for a resurgence of the global family. I am grateful that I was finally able to
write this book. The photo above is of me an my Moroccan wife, two
weeks before the birth of our first child in 2016. I brought her to America,
a little overt eight months before that, in 2015.
You can reach me at; info@theinternationallover.com
Thank you.

ABOUT THE AUTHOR
Biography

Amin Shabazz Muhammad is an enigmatic figure in the literary
world, conjuring images of a globe-trotting adventurer with a
penchant for love and insightful storytelling. Born on a flight from
Minneapolis, he spent years soaking in rich culture at the crossroads
of North Africa and the Mediterranean.
Early on, he fostered a deep love for global cultures and an
appreciation for the values and beliefs shaping them. A multilingual
world citizen, he has travelled to three continents and is fluent in the
Arabic language - a testament to his passion for understanding the
myriad cultures he's immersed himself in.
Amin composed this literary masterpiece in a single week,
expanding his horizons through the works of creative giants from
every corner of the world. He further deepened his understanding of
diverse societies through his mastery of self discipline.
The decades-long quest turned him into a linguist, virtuoso, and
eventually a refined purveyor of cultural nuances. The experiences
bestowed him with invaluable life skills, which he chose to share via
"The International Lover," His teachings have now touched the lives
of thousands and bridged cultural gaps like never before.
"The International Lover" is Amin Muhammad’s masterpiece. It is
an insightful instruction for those bent on a quest across continents,
to find love. Vividly portrayed, his creations reflect the diverse
cultural landscapes and interpret love through unique sociocultural
lenses. Amin’s book explores the tension between cultural
expectations and personal desires, and between traditional norms and
contemporary values.
Amin invites his readers on a sensory journey, seamlessly blending
elements of travel, romance, and self-discovery. His deep-rooted
respect for the cultures portrayed in his insightful writings, make
"The International Lover" a captivating read.

While Amin remains intensely private, he has revealed that this
book is profoundly influenced by his own experiences and
observations during his voyages across the globe. His stories are not
just compelling narratives but reflections on the human condition,
societal values, and sincere love.
An influential figure in modern literature, Amin Shabazz
Muhammad tells a unique tale of love, imparting a global perspective
that truly sets him apart. His journey, like his writings, is an
intertwined tapestry of diverse cultures, languages, and experiences a testament to the rich life of the International Lover.
You can reach him at; info@theinternationallover.com

93` },
];


// ── COURSE DATA ──────────────────────────────────────────────

const COURSE_OPENING = `Before you meet anyone, you need to meet yourself.

What you are about to encounter is not a game. It is a mirror. Every decision you make inside these scenarios reflects a decision you are capable of making in real life — and the consequences that follow are the consequences real men have lived.

Some of these women are genuine. Some are not. Some are genuine and still wrong for you. You will not be told which is which. You will have to determine that yourself — the same way you will have to determine it in the real world.

What you discover about the women is secondary. What you discover about yourself is the point.

— The International Lover™`;

const RESOURCE_MODULES = [
  {
    id: "travel-safety",
    title: "Travel & Safety",
    intro: "I have traveled to three continents looking for what America could not offer me. I have been in markets where no one spoke English, in cities where the infrastructure was nothing like home, and in situations where the wrong decision could have ended the journey entirely. I am still here. Not because I was lucky — because I was prepared. Preparation is the only form of courage that actually works when you are alone in a foreign country with a mission.",
    sections: [
      {
        heading: "Before You Leave",
        body: "Register your trip with the U.S. State Department at travel.state.gov using the Smart Traveler Enrollment Program (STEP). This is free and ensures the nearest U.S. embassy knows you are in the country. In the event of an emergency — natural disaster, civil unrest, or a personal crisis — they can reach you and assist you.\n\nCheck the State Department's travel advisory for your destination country before booking anything. Advisories range from Level 1 (Exercise Normal Precaution) to Level 4 (Do Not Travel). Most countries where you will be searching for a wife are Level 1 or 2. Know the current level before you go.\n\nMake two copies of every document you are carrying — passport, visa, hotel confirmation, flight information, emergency contacts. Leave one set with a trusted person at home. Carry the other set separately from the originals.",
      },
      {
        heading: "At The Destination",
        body: "Do not display wealth. Leave expensive jewelry at home. Keep your phone in your pocket in crowded areas. Use a money belt or hidden pouch for your passport and large amounts of cash.\n\nUse reputable transportation. Research the standard taxi fare before you arrive so you are not overcharged. In many countries, ride-share apps like Uber or Careem operate and are safer than hailing a random cab.\n\nStay in established hotels or reputable guesthouses for your first visit. Do not stay in someone's private home until the relationship and the family have been thoroughly vetted.\n\nKnow the location of the nearest U.S. embassy or consulate before you need it. Save the number in your phone the day you arrive.",
      },
      {
        heading: "Meeting Her Family",
        body: "The first in-person meeting should always be in a public place — a restaurant, a family gathering space, a community setting. Never meet at a private residence on the first visit.\n\nTell someone at home exactly where you are going, who you are meeting, and when you expect to return. Check in with them at regular intervals.\n\nTrust your instincts. If something feels wrong — the location has changed, new people have appeared, the story is shifting — it is acceptable to excuse yourself. Your safety is not negotiable.",
      },
      {
        heading: "Emergency Contacts",
        body: "U.S. State Department Overseas Citizens Services: +1-888-407-4747 (from the U.S.) or +1-202-501-4444 (from abroad)\n\nSmart Traveler Enrollment Program: travel.state.gov/step\n\nU.S. Embassy locator: usembassy.gov\n\nInternational SOS (medical and security assistance): internationalsos.com",
      },
    ],
  },
  {
    id: "platform-reviews",
    title: "Matrimonial Platform Reviews",
    intro: "I used Muslima.com. I found my wife there. That is my personal testimony. But I want to be clear — no platform is clean. Every platform has fraud operating on it at some level. The platform is a tool. The vetting is yours. What I can do is give you an honest assessment of the major platforms so you choose the right tool for your specific search.",
    sections: [
      {
        heading: "Muslima.com",
        body: "Best for: Muslim women across North Africa, the Middle East, Southeast Asia, and South Asia.\n\nStrengths: Large global database, serious marriage intent filtering, virtue status option on profiles, family involvement features.\n\nWeaknesses: Fraud is present — particularly from West Africa and some South Asian profiles. Profiles using stolen photos are not uncommon. Reverse image search every photo before investing time.\n\nRecommendation: Pay for the premium membership. Free profiles signal to quality women that you are not serious. Use the filtering tools aggressively — religion, location, age, and virtue status.",
      },
      {
        heading: "SimplyMarry.com",
        body: "Best for: South Asian communities — Indian, Pakistani, Bangladeshi, Sri Lankan.\n\nStrengths: Large verified database, family profile features, regional filtering.\n\nWeaknesses: Caste and ethnic preferences are deeply embedded in the platform culture. As a non-South-Asian man, you will face resistance on some profiles regardless of your qualifications.\n\nRecommendation: Use this platform specifically for Bangladesh and some Pakistani searches. For Indian women, understand that caste will be a factor in many families regardless of what the profile says.",
      },
      {
        heading: "ChristianMingle / CatholicMatch",
        body: "Best for: Christian women — particularly effective for Filipina, Latin American, and some African searches when filtered by region.\n\nStrengths: Faith-based filtering, serious marriage intent, established platform with fraud monitoring.\n\nWeaknesses: Heavily American-skewed in its default results. You will need to actively filter by country to find international profiles.\n\nRecommendation: Use the location filter aggressively. These platforms work well for the Philippines and Latin America when used correctly.",
      },
      {
        heading: "Platform Safety Rules — Universal",
        body: "1. Never send money to anyone on any platform for any reason before you have met them in person, their family has agreed to the marriage, and the legal process has begun.\n\n2. Reverse image search every profile photo using Google Images or TinEye before investing more than one conversation.\n\n3. Keep all early communication on the platform's messaging system. Moving to WhatsApp too early removes a layer of protection.\n\n4. If she initiates contact within the first 24 hours of you joining with unusually warm and specific language — slow down. This is the most common fraud opening.\n\n5. Six months of vetting before any travel. This is the minimum.",
      },
    ],
  },
  {
    id: "cultural-intelligence",
    title: "Cultural Intelligence by Region",
    intro: "I have said this in the book and I will say it again here: cultural ignorance is expensive. It costs you the relationship, the trip, the time, and sometimes the money. The man who arrives in Morocco behaving like he is in Miami has already failed before he knocked on the door. Cultural intelligence is not about performing respect — it is about actually understanding what you are walking into. Here is the foundation for each region.",
    sections: [
      {
        heading: "North Africa — Morocco, Tunisia, Algeria, Egypt",
        body: "Islam structures daily life — prayer times, dietary laws, family honor, and gender interaction are all shaped by it. Friday is the holy day. Ramadan changes the entire rhythm of the country for a month.\n\nFamily honor is not sentimental — it is structural. A woman's reputation affects her father's standing in the community, her sisters' marriage prospects, and her family's social position. Treat this with the gravity it deserves.\n\nHigh-context communication: what is not said carries as much weight as what is said. Silence from a father is not indifference — it is evaluation.\n\nDress modestly when visiting. Learn basic Arabic or Darija phrases. Greet the father formally. Do not touch the woman in public.",
      },
      {
        heading: "Middle East — Jordan, Lebanon, Yemen",
        body: "Family is the primary social unit. You are not courting a woman — you are petitioning a family. A man who bypasses the family has disqualified himself regardless of his other qualities.\n\nReligion is communal, not private. Your religious practice will be evaluated as part of your qualification as a husband. Misrepresenting your faith is one of the most serious mistakes you can make in this region.\n\nLebanon is more cosmopolitan than Jordan or Yemen and the cultural expectations reflect that. Know which country you are in and calibrate accordingly.\n\nPhysical contact before marriage is not acceptable in most family contexts. Eye contact with women who are not your immediate family should be measured.",
      },
      {
        heading: "Asia — Indonesia, Philippines, Bangladesh",
        body: "Indonesia: Javanese culture specifically operates on a concept called rukun — social harmony. Confrontation is avoided. Disagreement is expressed indirectly. A 'yes' does not always mean yes — learn to read the room.\n\nPhilippines: Catholic family values, strong family embeddedness, and a culture of hospitality that can mask discomfort. The family's financial situation may be significant and remittances are a normal part of many marriages. Know what you are agreeing to before you agree.\n\nBangladesh: Education and professional accomplishment are highly valued. An educated Bangladeshi woman has often overcome significant social pressure to achieve her position. Respect this rather than being threatened by it.",
      },
      {
        heading: "Latin America — Colombia, Dominican Republic, Peru",
        body: "The greatest danger in Latin America is false familiarity. Shared cultural references — music, food, some history — create an illusion of understanding that does not exist at the level of family structure, gender expectations, and social obligation.\n\nMachismo culture means the man's role as provider and protector is non-negotiable in most traditional families. This is not a burden — it is the expectation you are signing up for.\n\nFamily gatherings are evaluations. How you treat the grandmother, whether you help clear the table, how you speak about people who are not in the room — all of it is being assessed.\n\nLearn Spanish. There is no substitute.",
      },
      {
        heading: "Sub-Saharan Africa — Senegal, Ghana, Ethiopia, Kenya",
        body: "Community is the primary unit of reality. You are entering a lineage, not just a relationship. The bride price negotiation is a covenant between two families — treat it as such.\n\nSenegal: The Tijaniyya Sufi order has significant presence. Understanding Sufi Islam versus orthodox Islam is essential if you are pursuing a Senegalese woman from this tradition.\n\nGhana: Pentecostal Christianity is deeply embedded in family life in many communities. Attending a church service during your visit is not optional — it is a statement of who you are.\n\nEthiopia: Ethiopian Orthodox Christianity has over 250 fasting days and its own liturgical calendar. This is a daily, weekly, and annual practice. A secular man will not successfully integrate into this family structure.",
      },
    ],
  },
  {
    id: "family-meeting",
    title: "The Family Meeting",
    intro: "The family meeting is where most men lose what they have spent months building. They arrive unprepared, they perform rather than present themselves, and the family sees through it in the first twenty minutes. I have sat across from fathers and brothers and uncles on two continents. I know what they are looking for. They are not looking for wealth — they are looking for character. And character cannot be performed. It can only be demonstrated over time and in unguarded moments. Here is how to prepare.",
    sections: [
      {
        heading: "Before The Meeting",
        body: "Know the family's religion and practice it respectfully during your visit. If they pray five times a day, do not be on your phone during prayer time. If they fast during Ramadan, do not eat in front of them.\n\nLearn the correct greeting in their language. A simple, correctly pronounced greeting in Arabic, French, Wolof, or Amharic carries more weight than an hour of conversation in English.\n\nResearch the appropriate gift for the family. In most cultures, arriving empty-handed is considered disrespectful. Sweets, dates, high-quality tea, or a book appropriate to the father's interests are safe choices across most regions.\n\nDress modestly and formally. The standard should be: what would a serious man wear to meet the family of the woman he intends to marry? Dress above that standard.",
      },
      {
        heading: "During The Meeting",
        body: "Greet the eldest person in the room first. This is universally recognized as respect across cultures.\n\nListen more than you speak. In high-context cultures especially, a man who speaks less is regarded as more serious than one who speaks constantly.\n\nSpeak about your family — your parents, your siblings, your lineage. In every culture where family is the primary social unit, a man's relationship with his own family is the primary indicator of how he will treat theirs.\n\nDo not look at your phone. Not once. Not briefly. Not to check the time. This is the single most commonly cited failure point that families report about American men.\n\nWhen you disagree with something said, receive it calmly. You are not there to debate. You are there to be assessed.",
      },
      {
        heading: "What The Father Is Actually Asking",
        body: "Every question a father asks is a version of one of three questions:\n\n1. Can you provide for and protect my daughter?\n2. Will you respect the values she was raised with?\n3. Are you the same man in this room as you are when no one is watching?\n\nAnswer these three questions with everything you say and do during the visit — not just when you are directly asked.",
      },
      {
        heading: "After The Meeting",
        body: "Send a formal message of thanks within 24 hours. Address it to the father or the family head. Keep it brief, respectful, and sincere.\n\nDo not pressure for an answer. In most traditional cultures, the family will deliberate privately and communicate their decision through the woman or through a designated family representative. Patience after the meeting is as important as preparation before it.",
      },
    ],
  },
  {
    id: "bride-price-dowry",
    title: "Bride Price & Dowry",
    intro: "The bride price is the moment that reveals who you are more clearly than any conversation will. The man who treats it as a fee to be minimized has already told the family everything they need to know about how he will value their daughter. The man who asks what each item represents — before asking what it costs — has done the same, in the opposite direction. I have been through this negotiation. I know what it requires.",
    sections: [
      {
        heading: "What Bride Price Is — And Is Not",
        body: "Bride price is a gift from the groom's family to the bride's family — it is not a purchase price. It is a public declaration that you understand the value of what you are receiving and that you are capable of honoring it.\n\nIn Islamic tradition, the mahr is a mandatory gift from the groom directly to the bride — not to her family. It is her property alone. The amount is agreed upon before the nikah and becomes part of the marriage contract.\n\nIn many African traditions, the bride price involves specific items that carry cultural meaning — livestock, fabric, kola nuts, palm wine, or monetary equivalents. Each item represents something. Ask what it represents before you discuss amounts.\n\nDowry — which moves in the opposite direction, from the bride's family to the groom — is practiced in some South Asian communities. Understand which tradition applies to your situation.",
      },
      {
        heading: "How To Approach The Negotiation",
        body: "Enter the conversation as a covenant, not a transaction. The family is watching how you engage with the process as much as they are watching the outcome.\n\nAsk about the tradition before anything else. 'Can you help me understand what is customary and what each element represents?' This question signals respect and seriousness simultaneously.\n\nDo not lowball. Do not perform generosity you cannot sustain. Be honest about your capacity and negotiate from a position of genuine respect.\n\nIn Islamic contexts, the mahr amount is private between you and the bride. Do not discuss it publicly. It is her security — a guaranteed amount she receives regardless of what happens in the marriage.",
      },
      {
        heading: "Common Bride Price Items by Region",
        body: "Morocco/North Africa: The mahr (Islamic marriage gift) is central. Amount varies widely by family and agreement. Traditional items may include gold jewelry, fabric, and perfume.\n\nWest Africa (Senegal, Ghana): May include kola nuts, schnapps or palm wine, fabric, livestock (or monetary equivalent), and cash. Each item is ceremonially significant.\n\nEthiopia: Ethiopian Orthodox tradition involves gifts to the family and a formal betrothal ceremony. The process involves multiple family meetings before any formal agreement.\n\nLatin America: Formal bride price is less common. The expectation is demonstrated financial stability, ability to provide housing, and family approval of your character.",
      },
      {
        heading: "Legal Considerations",
        body: "The mahr in Islamic marriage is legally enforceable in the countries where Islamic family law governs. Understand that it is a contractual obligation — not a symbolic gesture.\n\nIn the United States, prenuptial agreements can reference the mahr and other traditional financial obligations. Consult an attorney familiar with international family law if you want these elements formalized in a U.S. legal document.",
      },
    ],
  },
  {
    id: "marriage-laws",
    title: "International Marriage Laws",
    intro: "The legal architecture of international marriage is the part that breaks men who were otherwise doing everything right. They found the right woman. They navigated the family. They were serious about the commitment. And then the bureaucracy broke them. Do not let that happen to you. The law is not your enemy — ignorance of the law is. Study this section as carefully as you studied her.",
    sections: [
      {
        heading: "Legal Age Requirements",
        body: "Most countries require both parties to be at least 18 years old to marry without parental consent. Some countries permit marriage at 16 or 17 with parental consent. Research the specific requirements for the country you are marrying in.\n\nThe United States will not issue a K-1 visa to a fiancée under the age of 18. This is a hard legal requirement with no exceptions.",
      },
      {
        heading: "Required Documentation — U.S. Side",
        body: "Valid U.S. passport\nBirth certificate (certified copy)\nProof of single status — if previously married, certified divorce decree or death certificate of former spouse\nCriminal background check\nProof of financial ability to support a spouse (typically demonstrated through recent tax returns and pay stubs)\nEvidence of bona fide relationship — photos together, communication records, travel receipts",
      },
      {
        heading: "Required Documentation — Her Side",
        body: "Valid passport from her country\nBirth certificate\nPolice clearance certificate for all countries she has lived in\nMedical examination by a USCIS-approved physician\nProof of single status\nDS-160 nonimmigrant visa application\nEvidence of relationship with you",
      },
      {
        heading: "Residency Requirements",
        body: "Many countries require that you have physically met your fiancée in person within the two years prior to filing the K-1 petition. Virtual meetings do not satisfy this requirement.\n\nSome countries require a minimum residency period — meaning you must have lived in the country for a specified time before being permitted to marry one of their citizens. Research this for your specific destination country before planning travel.",
      },
      {
        heading: "Religious vs. Civil Ceremonies",
        body: "In most countries you will need both a religious ceremony (if applicable) AND a civil registration to have a legally recognized marriage.\n\nA religious ceremony alone — nikah, church wedding, traditional ceremony — is not recognized by the U.S. government for immigration purposes. The civil registration is what creates the legal marriage.\n\nIn some countries, civil registration must happen before the religious ceremony. In others, after. Know the order required in your specific country.",
      },
      {
        heading: "Legal Resources",
        body: "U.S. Citizenship and Immigration Services: uscis.gov\nU.S. State Department — International Marriage: travel.state.gov\nInternational Marriage Broker Regulation Act (IMBRA): Read this before using any matchmaking service\nRapid Visa (K-1 visa preparation service): rapidvisa.com\nBoundless Immigration: boundless.com",
      },
    ],
  },
  {
    id: "k1-visa",
    title: "K-1 Visa Complete Walkthrough",
    intro: "I used the K-1 visa. I recommend it. It is the most straightforward legal path to bringing your fiancée to the United States for the purpose of marriage. It is also the most demanding administrative process you will undertake outside of having a child. I am going to walk you through every step the way I wish someone had walked me through it — plainly, sequentially, and without minimizing how difficult it is.",
    sections: [
      {
        heading: "What The K-1 Visa Is",
        body: "The K-1 visa — also called the fiancé(e) visa — allows your foreign national fiancée to enter the United States for the sole purpose of marrying you. The marriage must be performed within 90 days of her arrival. If the marriage does not occur within 90 days, she must leave the country.\n\nAfter the marriage, she applies for Adjustment of Status to receive her Green Card. This is a separate process that begins after the wedding.",
      },
      {
        heading: "Step 1 — File Form I-129F",
        body: "You file the Petition for Alien Fiancé(e) with USCIS. This is your formal declaration that you intend to marry a specific foreign national.\n\nRequired with the I-129F:\n— Proof you are a U.S. citizen (passport copy, birth certificate, or naturalization certificate)\n— Proof you have met in person within the past two years (photos together with dates and locations visible, flight receipts, hotel receipts)\n— Proof you are both legally free to marry (divorce decrees if applicable)\n— Photos of both of you\n— Filing fee (check current fee at uscis.gov)\n\nMake a complete copy of everything you submit. USCIS will request it again.",
      },
      {
        heading: "Step 2 — USCIS Reviews and Approves",
        body: "Processing time currently averages 6-12 months depending on caseload. You will receive a receipt notice confirming USCIS has your petition. Then you wait.\n\nUSCIS may issue a Request for Evidence (RFE) asking for additional documentation. Respond completely and promptly. Incomplete responses extend the process significantly.\n\nOnce approved, USCIS forwards the petition to the National Visa Center (NVC), which then forwards it to the U.S. embassy or consulate in her country.",
      },
      {
        heading: "Step 3 — The Embassy Interview",
        body: "She will be scheduled for an interview at the U.S. embassy or consulate in her country. This is the most critical moment in the entire process.\n\nShe must bring:\n— Valid passport\n— Birth certificate\n— Police clearance certificate\n— Medical examination results (from a USCIS-approved physician)\n— DS-160 application\n— Photos\n— All relationship evidence\n— Proof of your financial support (Form I-134)\n\nDrill the interview questions together every day until the appointment. She may or may not have a translator. Prepare for both scenarios.\n\nIf she fails the interview, there is a process to reapply but it extends the timeline significantly. Preparation is not optional.",
      },
      {
        heading: "Step 4 — She Arrives, You Marry",
        body: "Once the K-1 is approved at the embassy, she has a single-entry visa valid for 6 months. She must enter the U.S. within that window.\n\nSet the wedding date before she arrives. Do not wait. The 90-day clock begins the moment she lands.\n\nI set our wedding date for the day after her arrival. There is no reason to delay once she is here.",
      },
      {
        heading: "Step 5 — Adjustment of Status",
        body: "After the wedding, file Form I-485 (Application to Register Permanent Residence) to begin the Green Card process.\n\nThis process includes biometrics appointment, medical examination, and an in-person interview with USCIS. Processing time is typically 12-24 months.\n\nDuring this period she will receive an Employment Authorization Document (EAD) allowing her to work legally in the U.S.\n\nOnce the Green Card is issued she is a Lawful Permanent Resident. After three years of marriage she may apply for U.S. citizenship.",
      },
      {
        heading: "Timeline Summary",
        body: "I-129F filing to USCIS approval: 6-12 months\nNVC processing to embassy interview: 2-4 months\nVisa issued to her arrival: days to weeks\nMarriage: within 90 days of arrival\nAdjustment of Status to Green Card: 12-24 months\nGreen Card to citizenship eligibility: 3 years\n\nTotal from first filing to citizenship: approximately 4-6 years\n\nPlan accordingly. The process is long. It is worth it.",
      },
      {
        heading: "Recommended Services",
        body: "Rapid Visa: rapidvisa.com — I used this service personally\nBoundless: boundless.com\nVisa Journey (community forums with case timelines): visajourney.com\nUSCIS official site: uscis.gov\nState Department Visa information: travel.state.gov",
      },
    ],
  },
  {
    id: "long-distance",
    title: "Long-Distance Relationship Management",
    intro: "The long-distance period is your courtship. It is not a waiting room — it is the vetting process. Everything you need to know about whether this woman is the right woman can be discovered during the months between first contact and your first flight. The man who treats this period as a formality to get through is the man who boards the plane unprepared. The man who treats it as the most important phase of the entire process arrives knowing exactly who he is walking toward.",
    sections: [
      {
        heading: "Communication Discipline",
        body: "Establish a consistent communication schedule early. Same days, same times where possible. Consistency demonstrates seriousness and allows her to plan her life around your conversations — which is what a serious woman will do.\n\nWhatsApp is the primary tool. Use video calls, not just voice. Seeing each other — unfiltered, in different moods, during different circumstances — is essential vetting data.\n\nKeep records. WhatsApp timestamps every message. If her story shifts over time — details about her life, her family, her history — the record will show you.\n\nCall spontaneously occasionally. Not as surveillance — as a man who genuinely thinks of her. Also as a man who notices whether the person who answers the spontaneous call is the same as the person who answers the scheduled one.",
      },
      {
        heading: "What To Cover In Six Months",
        body: "Month 1-2: Family structure, faith practice, daily life, her expectations for marriage, her father's expectations.\n\nMonth 2-3: Her views on children, how many, how they will be raised, where you will live, how she envisions the first year after arrival.\n\nMonth 3-4: Financial expectations — remittances to her family, her work intentions after arrival, her understanding of your financial situation.\n\nMonth 4-5: Harder conversations — prior relationships if any, health history if relevant, what ended those relationships.\n\nMonth 5-6: Planning — the visit, the family meeting, the timeline for the process if things go well.\n\nIf any of these conversations produce evasion, inconsistency, or pressure — that is data.",
      },
      {
        heading: "Video Call Vetting",
        body: "Ask for spontaneous video calls at unscheduled times. The background of her calls should be consistent with the life she has described.\n\nAsk her to show you her home — not as an invasion of privacy, as a natural extension of intimacy. A woman who wants to marry you will show you where she lives.\n\nListen to what is happening around her. Is she alone? Is there a man's voice in the background she does not explain? Does she step outside for the call every time?\n\nThese observations are not paranoia. They are the same vetting tools a wise woman would use on you.",
      },
      {
        heading: "Managing The Emotional Distance",
        body: "Long-distance relationships produce real emotional intimacy and real longing. Both are appropriate. Neither should accelerate your decision-making timeline.\n\nDo not let longing override observation. Do not let emotional investment prevent you from seeing red flags clearly. The emotional weight of the relationship is real — and fraudsters understand this and use it deliberately.\n\nSet a firm internal timeline: six months of consistent communication before planning travel. Hold that line regardless of how the relationship feels.",
      },
    ],
  },
  {
    id: "fraud-detection",
    title: "Fraud Detection — Complete Guide",
    intro: "I will not soften this. There are women on every matrimonial platform whose purpose is to extract money, citizenship, or both from American men. Some are operating alone. Some are operating with partners — a boyfriend who planned the scheme, a family that designed it together. The fraud is not always malicious in the way Americans think of malice. Sometimes it is desperation given a direction. That does not make it less costly to you. Learn the patterns. They are consistent enough to be taught.",
    sections: [
      {
        heading: "The Twelve Warning Signs",
        body: "1. She initiated contact within hours of you joining the platform with unusually warm, specific language.\n\n2. Her English is perfect and her availability is constant regardless of claimed time zone.\n\n3. Small financial crises begin appearing within the first 2-4 weeks — phone repair, medical bill, transportation, family emergency.\n\n4. She expresses deep emotional attachment faster than the relationship's length warrants.\n\n5. She declines spontaneous video calls or is always 'just about to go somewhere' when you call unannounced.\n\n6. Her social media accounts are new — created around the same time she appeared on the platform.\n\n7. Reverse image search of her photos returns results under a different name.\n\n8. Her story contains inconsistencies across conversations — details about her family, city, or history that shift.\n\n9. She is reluctant to involve her family in the process or provides vague explanations for why they cannot be part of the conversation.\n\n10. She pushes to move communication off the platform to WhatsApp before any real vetting has occurred.\n\n11. When you slow down or become less available, a new crisis appears to re-engage you.\n\n12. She has an answer for everything — every concern you raise is immediately and smoothly resolved.",
      },
      {
        heading: "Vetting Tools",
        body: "Reverse image search: Go to images.google.com, click the camera icon, upload her photo. If the same face appears under a different name on a different platform, you have your answer.\n\nTinEye (tineye.com): A dedicated reverse image search engine. Use it in addition to Google Images.\n\nSocial media audit: Ask for her Facebook, Instagram, or TikTok. Check when the accounts were created. Look at who comments on her posts and what they say. Check whether the account history is consistent with the life she has described.\n\nWhatsApp verification: Her WhatsApp profile photo, display name, and status should be consistent with everything else you know about her. Ask to see her contacts screen when you are on a video call together.\n\nAddress verification: If she has given you her home address, use Google Street View to verify that the address exists and that the description she has given of her neighborhood is consistent.",
      },
      {
        heading: "The Money Rule",
        body: "No money. Not a small amount. Not for a phone. Not for a sick cousin. Not for a visa fee she says she cannot afford.\n\nNo money before you have physically met her, physically met her family, and the legal process of marriage has formally begun.\n\nIf you send money and it was fraud, you have financed the fraud and taught the fraudster that it works. If you send money and it was not fraud, you have set a precedent that will follow you through the entire relationship.\n\nThe only financial transaction that belongs in the pre-marriage period is the cost of your travel to meet her.",
      },
      {
        heading: "If You Suspect Fraud",
        body: "Stop sending money immediately if you have been sending any.\n\nDo not confront her before you have documented everything — screenshots of conversations, records of any financial transactions.\n\nReport the profile to the platform. Most platforms have fraud reporting systems and will investigate and remove confirmed fraud profiles.\n\nIf you have sent money, contact your bank immediately. Depending on how it was sent, some transactions can be reversed.\n\nIf you believe you have been the victim of an international romance fraud scheme, report it to the FBI's Internet Crime Complaint Center at ic3.gov.",
      },
    ],
  },
  {
    id: "her-arrival",
    title: "Her Arrival & The First Year",
    intro: "Everything you prepared for led to this. She is here. She is in your country, your city, your home. Everything that was theoretical is now real — the language barrier, the cultural adjustment, the distance from her family, the newness of your dynamic as a married couple. The first year will test everything you built. I want to prepare you for what is coming so that what is coming does not break what you built.",
    sections: [
      {
        heading: "The First Week",
        body: "She has left everything she knows. Her country, her language, her family, her community, her food, her climate, her sense of herself within a social context she understood. She is in a country where she may know no one except you.\n\nDo not leave her alone in the first week unless absolutely necessary. Your presence is her anchor.\n\nTake her to the grocery store. Let her see what is available. Let her find the ingredients that remind her of home. This is not a small thing — food is one of the primary ways humans maintain connection to their origin.\n\nDo not introduce her to too many people in the first week. Let her stabilize before you make her perform for your social circle.",
      },
      {
        heading: "Language",
        body: "If she does not speak fluent English, enroll her in English language classes within the first month. Many community colleges offer ESL programs at low or no cost.\n\nDo not use her language limitations against her in disagreements. Do not speak too fast, use too much slang, or become frustrated when she misunderstands. You chose a cross-cultural marriage. The language gap is your responsibility to bridge together.\n\nEncourage her to maintain and use her own language — with family back home, in her community here, with any children you have. Bilingual children are a gift, not a complication.",
      },
      {
        heading: "Her Family Connection",
        body: "Budget for regular communication with her family — video calls, WhatsApp, whatever they use. This is not a luxury. It is a necessity for her mental health and the stability of your marriage.\n\nBudget for one trip home in the first two years if at all possible. Returning briefly to her people — as a married woman, visibly well — reassures her family and reassures her.\n\nUnderstand that her family will call. Often. At times that are inconvenient for you. This is the life you chose. Receive it with grace.",
      },
      {
        heading: "Managing Cultural Adjustment",
        body: "She will be disoriented by American social norms. The directness of American communication, the individualism, the pace, the food, the scale of everything — all of it is different from what she knows.\n\nProtect her from becoming who she is not. The pressure to Americanize is constant and subtle. It comes from television, from social media, from other women she may meet. Your job is to protect the woman you chose — not to let the culture replace her with someone you did not choose.\n\nThis does not mean isolation. It means intentional community — finding other families with similar values, maintaining her religious practice, keeping her connected to her culture.",
      },
      {
        heading: "The First Year's Hard Conversations",
        body: "The conversations you did not finish before she arrived will surface in the first year. The financial expectations you were vague about. The family obligation questions you deferred. The disagreements about child-rearing you postponed.\n\nHave them now. Have them early. Have them with patience and without contempt. A marriage counselor with cross-cultural experience is not a sign of failure — it is a resource available to wise men.",
      },
    ],
  },
  {
    id: "children-family",
    title: "Children & Family Structure",
    intro: "The reason for all of this is the children. Everything I have done — the travel, the legal process, the work of building a cross-cultural marriage — has been in service of producing children who are connected to something older and more real than what America currently offers. Children who speak more than one language. Children who have a father and a mother in the same home. Children who know where they come from. That is the return on the investment.",
    sections: [
      {
        heading: "Discussing Children Before Marriage",
        body: "How many children do you want? How many does she want? This conversation must happen before the wedding. A man who wants four children and a woman who wants one are not compatible on a fundamental level, regardless of how real the love is.\n\nHow will the children be raised religiously? If you are of different faiths or different levels of practice, this requires specific agreement — not a general intention to 'figure it out.' Figure it out before the children arrive.\n\nWhere will the children attend school? Will they attend a religious school, a public school, a private school? Will they be homeschooled? These decisions shape the entire child.",
      },
      {
        heading: "Bilingual and Bicultural Children",
        body: "Your children should speak her language. This is non-negotiable for the long-term health of the family. A child who cannot speak to their grandmother in her language has been severed from half of their heritage.\n\nSpeak her language in the home alongside English from birth. Children acquire multiple languages simultaneously with remarkable ease when both are present from the beginning.\n\nCelebrate both cultural traditions. Her holidays and yours. Her food and yours. Her music and yours. The children who grow up in this richness are equipped for a world that is increasingly global.",
      },
      {
        heading: "Dual Citizenship",
        body: "Depending on her country of origin, your children may qualify for dual citizenship — citizenship in both the United States and her home country.\n\nThis is one of the most significant gifts you can give them. The ability to live and work in two countries, to hold two passports, to belong to two nations — this is a form of inheritance that no financial gift matches.\n\nResearch the citizenship laws of her country before the children are born. Some countries require registration of the birth within a specific timeframe to preserve the child's claim to citizenship.",
      },
      {
        heading: "The Father's Role",
        body: "You chose a traditional wife because you believe in traditional family structure. That structure requires you to be present, consistent, and engaged as a father.\n\nPresence means physical presence — in the home, at meals, at bedtimes, at school events.\n\nConsistency means your children know what you stand for and what you expect because you demonstrate it every day without exception.\n\nEngagement means knowing your children — their personalities, their struggles, their friendships, their inner lives.",
      },
    ],
  },
  {
    id: "legal-protection",
    title: "Legal Protection",
    intro: "I do not raise this subject to create fear. I raise it because too many men have arrived at this point — after everything they built — and lost it through legal exposure they did not anticipate. A prenuptial agreement is not a statement of distrust. It is a statement of clarity. Clarity protects both of you. Here is what you need to know.",
    sections: [
      {
        heading: "The Prenuptial Agreement",
        body: "A prenuptial agreement — drafted by an attorney before the wedding — establishes what each party brings into the marriage and what happens to those assets if the marriage ends.\n\nThis is especially important in your situation because:\n1. You have likely spent significant resources on the immigration process\n2. The financial power dynamic between you and your fiancée may be significant\n3. U.S. divorce law is heavily influenced by state-specific rules that may not reflect what you agreed to in conversation\n\nA prenuptial agreement does not prevent love. It prevents misunderstanding.",
      },
      {
        heading: "What To Include",
        body: "Assets you bring into the marriage — property, savings, investments, business interests.\n\nDebts you bring into the marriage — student loans, mortgages, credit card debt.\n\nWhat constitutes marital property versus individual property during the marriage.\n\nSpousal support provisions — if the marriage ends, what financial obligation do you carry?\n\nIf you are incorporating the mahr from an Islamic marriage contract, this can be referenced in the prenuptial agreement and may be enforceable in U.S. courts depending on the state.",
      },
      {
        heading: "Immigration-Specific Legal Protections",
        body: "The I-864 Affidavit of Support — which you file as part of the Adjustment of Status process — creates a legal obligation to financially support your spouse at 125% of the federal poverty level. This obligation continues even if the marriage ends, until she becomes a U.S. citizen, works for 40 qualifying quarters, or dies.\n\nUnderstand this obligation fully before you sign it. Consult an immigration attorney.\n\nDo not co-sign loans or credit cards for your spouse until the marriage is stable and trust is established. Financial entanglement with someone you do not fully know yet is a legal risk.",
      },
      {
        heading: "Finding The Right Attorney",
        body: "You need two attorneys for this process — an immigration attorney and a family law attorney. They have different specializations and you need both.\n\nAmerican Immigration Lawyers Association attorney finder: ailf.org\nState bar association referrals for family law attorneys in your state\n\nConsult with an attorney before the wedding — not after a problem arises.",
      },
    ],
  },
  {
    id: "stepfather",
    title: "The Step-Father Question",
    intro: "I wrote about this in the book. I lived it. My father was a step-father. I was a step-father. I watched a man I knew give everything he had to children that were not his, and die alone while they divided his possessions. This is a subject I take seriously because the consequences of getting it wrong are serious — not just for you, but for the child. Here is what I know.",
    sections: [
      {
        heading: "The Decision",
        body: "If the woman you are pursuing has a child from a previous relationship, the question is not whether you can love the child. The question is whether you have decided to be that child's father — not in the warm feeling of early love, but in the 3am illness, the school meeting, the discipline conversation, the year when the child tests every limit you have.\n\nDeciding in the warmth of early love is not deciding. Deciding after you have thought through the specific shape of the responsibility — that is deciding.\n\nIf you cannot honestly say you have decided, the honest conversation with her is: I care about you deeply and I am not yet ready to be a father to your child. That conversation, however painful, is more respectful than a false yes.",
      },
      {
        heading: "What The Child Needs",
        body: "Consistency above all else. A child who has already experienced loss — the absence of their biological father — needs to know that the man in their life will not disappear. Every promise you make to that child is a contract.\n\nDo not try to replace the biological father. You are not replacing anyone — you are adding something. Be clear about your role without undermining whatever healthy connection the child has to their biological parent.\n\nBe patient with the adjustment period. Children test new authority figures. This is not rejection — it is the appropriate behavior of a child who has learned that adults leave. Prove them wrong. Consistently. Over time.",
      },
      {
        heading: "Legal Considerations",
        body: "If you intend to adopt the child, begin the legal process with an adoption attorney. This formalizes your parental rights and responsibilities in a way that protects both of you.\n\nIf you do not adopt, understand your legal standing in relation to the child in your state. In most states, a step-parent has no automatic legal rights regarding a step-child, which can create complications in medical, educational, and emergency situations.\n\nIn the event the marriage ends, custody of the child will revert to the biological mother unless you have adopted. Understand this before you form a deep bond with the child.",
      },
    ],
  },
  {
    id: "community-resources",
    title: "Community Resources",
    intro: "You are not doing this alone. There are men who have done this before you, men doing it alongside you right now, and resources built specifically for this journey. Use them. The man who refuses help because he thinks he should figure it out alone is the man who makes expensive and avoidable mistakes. Here is where to find support at every stage.",
    sections: [
      {
        heading: "Immigration Resources",
        body: "USCIS — U.S. Citizenship and Immigration Services: uscis.gov\nU.S. State Department Visas: travel.state.gov\nVisa Journey (community forums, case timelines, real user experiences): visajourney.com\nRapid Visa (K-1 visa preparation service): rapidvisa.com\nBoundless Immigration: boundless.com\nAmerican Immigration Lawyers Association: aila.org",
      },
      {
        heading: "Legal Resources",
        body: "American Immigration Lawyers Association attorney finder: aila.org\nState bar association referral services — search '[your state] bar association attorney referral'\nNational Family Law Advisory Council: nflac.net\nLaw Help (free and low-cost legal aid): lawhelp.org",
      },
      {
        heading: "Cultural and Language Resources",
        body: "Duolingo: Free language learning for Arabic, French, Spanish, Indonesian, and many others\nRosetta Stone: More comprehensive paid language learning\nPimsleur: Audio-based language learning — excellent for pronunciation\nCultural Atlas (cultureatlas.sbs.com.au): Country-specific cultural guides covering family, communication, values, and etiquette",
      },
      {
        heading: "Fraud Prevention",
        body: "FBI Internet Crime Complaint Center: ic3.gov\nFederal Trade Commission Romance Scam reporting: reportfraud.ftc.gov\nReverse image search: images.google.com and tineye.com\nSocial Catfish (identity verification service): socialcatfish.com",
      },
      {
        heading: "The Consulate",
        body: "The community forum built into this platform — The Consulate — is your most immediate resource. Men at every stage of this process are in that space. Men who have completed the journey. Men in the middle of it. Men just beginning.\n\nAsk your questions there. Share what you learn. Hold each other to the standard. That is the purpose of the space.",
      },
    ],
  },
];

const REGIONS_COURSE = [
  {
    id:"us", label:"North America", color:"#a07840", desc:"United States — All Backgrounds",
    context:"She chose a different standard. Whatever she came from — mosque, church, temple, or simply the decision that the culture around her was not enough — she made a choice that most women around her did not make. This region is about recognizing that choice, meeting her on her terms, and bringing the same preparation to her door that you would bring to a door in Fez or Dakar.",
    scenarios:[
      { id:"us_1", title:"The Standard She Chose", setup:"She is on this platform because she made a decision most women around her did not make. Before you approach her, understand what that decision cost her — and what it means that she is still standing on it.", choices:[
        { text:"Acknowledge what it costs to choose a different standard", outcome:"She receives the acknowledgment. The conversation begins at a level of honesty most platform exchanges never reach.", flag:"cost_acknowledged" },
        { text:"Ask her what brought her to this platform specifically", outcome:"She tells you. What she describes is not a list of preferences — it is a value system. You are now listening to someone who has decided what she is.", flag:"platform_asked" },
        { text:"Tell her about yourself first — establish your own standard", outcome:"She listens. Then: 'Now ask me.' She needed to hear you before she would open. The sequence matters.", flag:"self_first" },
      ]},
      { id:"us_2", title:"Her Family", setup:"Her family is present in this arc the same way every other region's family is present. The meeting will happen. The standard will be applied. The question is whether you come prepared or whether you come performing.", choices:[
        { text:"Ask her what her family needs to see", outcome:"She tells you specifically. The list is honest and manageable. You now have a preparation target.", flag:"family_prepared" },
        { text:"Tell her your family background before asking about hers", outcome:"She listens. She asks one question. The question tells you what she values. Your answer to it sets the tone for the family meeting.", flag:"family_reciprocal" },
        { text:"Ask when the family meeting will happen", outcome:"She says: 'When I decide you are ready for it.' The timeline is hers. You are building toward readiness, not rushing toward a meeting.", flag:"family_timing" },
      ]},
    ],
    women:[
      { id:"aisha",   photo:"/women/aisha.jpg",   name:"Aisha",   age:27, city:"Atlanta, Georgia",    religion:"Muslim",          type:"genuine", profileText:"Born Muslim. Her father was one of the first men in his neighborhood to take shahada in the 1980s. She has been waiting for a man who understands what that means.", hidden:"Her father's standing in the community means any man she introduces is immediately visible to forty years of community relationships.", signal:"She asks precise questions and does not accept vague answers.", endings:{ success:"Atlanta — complete." } },
      { id:"deborah", photo:"/women/deborah.jpg", name:"Deborah", age:29, city:"Washington D.C.",     religion:"Hebrew Israelite", type:"genuine", profileText:"She keeps the law. Not as a cultural inheritance — as a living practice she has chosen as an adult. The Sabbath is not negotiable.", hidden:"Her elder's word is final.", signal:"She keeps the Sabbath. The silence Friday evening is not a problem to solve.", endings:{ success:"D.C. — complete." } },
      { id:"kezia",   photo:"/women/kezia.jpg",   name:"Kezia",   age:26, city:"Houston, Texas",      religion:"Christian",        type:"genuine", profileText:"Not a cultural Christian. She reads. She fasts. She tithes because she decided to. She is waiting for a man who has a relationship with God that is his own.", hidden:"Her pastor's assessment carries the same weight as her father's.", signal:"Her brother said almost nothing at the airport. A quiet man watching is not passive.", endings:{ success:"Houston — complete." } },
      { id:"marisol", photo:"/women/marisol.jpg", name:"Marisol", age:28, city:"Chicago, Illinois",   religion:"Catholic",         type:"genuine", profileText:"Mexican-American. Third generation. Her grandmother came from Jalisco and is still the head of this family.", hidden:"The grandmother is the decision. Everyone knows it.", signal:"She mentions her grandmother constantly. This is the most important information she is giving you.", endings:{ success:"Chicago — complete." } },
      { id:"samira",  photo:"/women/samira.jpg",  name:"Samira",  age:25, city:"Miami, Florida",      religion:"Islam (revert)",   type:"genuine", profileText:"Puerto Rican. Took shahada four years ago. Her faith is real — tested, chosen, maintained against the current of her own culture.", hidden:"She teaches the new sisters at her masjid. She has not mentioned it on the profile.", signal:"She will tell you the cost of her reversion without being asked.", endings:{ success:"Miami — complete." } },
      { id:"nour_us", photo:"/women/nour-us.jpg", name:"Nour",    age:27, city:"Dearborn, Michigan",  religion:"Islam",            type:"genuine", profileText:"Born in Dearborn. Her parents came from Lebanon. She is American in her fluency and Arab in her framework.", hidden:"The family gathering includes extended community with an unofficial but real vote.", signal:"She asked if you know what marrying into a Lebanese family means. Answer specifically.", endings:{ success:"Dearborn — complete." } },
      { id:"rachel",  photo:"/women/rachel.jpg",  name:"Rachel",  age:26, city:"Portland, Oregon",    religion:"Islam (revert)",   type:"not_yet", profileText:"Took shahada eighteen months ago. Her practice is sincere. Her foundation is still being built.", hidden:"The correct ending is not yet — followed by yes when the foundation is ready.", signal:"She talks about the future before her present is fully built. This is the signal.", endings:{ not_yet:"Portland — not yet. Come back when the foundation is ready.", success:"She built it. Portland — complete." } },
    ],
    women:[
      { id:"aisha", photo:"/women/aisha.jpg", name:"Aisha", age:27, city:"Atlanta, Georgia", education:"Bachelor's, Education", religion:"Muslim", platform:"theinternationallover.com",
        profileText:"Born Muslim. My father was one of the first men in his neighborhood to take shahada in the 1980s. I have been waiting for a man who understands what that means — not as a talking point, but as a way of life.",
        hidden:"Her father's standing in the community means any man she introduces is immediately visible to forty years of community relationships. The Friday Jumu'ah is not optional.",
        signal:"She asks precise questions and does not accept vague answers. The precision is the standard, not the obstacle.",
        endings:{ success:"You navigated her father's three questions, the community, and the masjid. Atlanta — complete." }
      },
      { id:"deborah", photo:"/women/deborah.jpg", name:"Deborah", age:29, city:"Washington D.C.", education:"Master's, Public Policy", religion:"Hebrew Israelite", platform:"theinternationallover.com",
        profileText:"I keep the law. Not as a cultural inheritance I tolerate — as a living practice I have chosen as an adult. The Sabbath is not negotiable. The feasts are observed. I am looking for a man who can hold his own ground while respecting the ground I stand on.",
        hidden:"Her elder's word is final. The community has been watching for decades. A man who comes correctly is received warmly — the warmth is just on the other side of the assessment.",
        signal:"She keeps the Sabbath. The silence Friday evening is not a problem to solve.",
        endings:{ success:"The elder said you can be taught. The pastor stood beside the elder. D.C. — complete." }
      },
      { id:"kezia", photo:"/women/kezia.jpg", name:"Kezia", age:26, city:"Houston, Texas", education:"Bachelor's, Nursing", religion:"Christian", platform:"theinternationallover.com",
        profileText:"Not a cultural Christian. I read. I fast. I tithe because I decided to. My church is my community in the way that most people's workplaces are their community — completely. I am waiting for a man who has a relationship with God that is his own, not borrowed from someone else.",
        hidden:"Her brother is quiet and watching. Her pastor's assessment carries the same weight as her father's. The Sunday service is part of the evaluation.",
        signal:"Her brother said almost nothing at the airport. A quiet man who is watching is not passive.",
        endings:{ success:"Her brother stepped forward to stand beside you. The pastor said consistent. Houston — complete." }
      },
      { id:"marisol", photo:"/women/marisol.jpg", name:"Marisol", age:28, city:"Chicago, Illinois", education:"Bachelor's, Social Work", religion:"Catholic", platform:"theinternationallover.com",
        profileText:"Mexican-American. Third generation. My grandmother came from Jalisco and she is still the head of this family. My faith is woven into everything we do. I am not looking for a Catholic man specifically. I am looking for a man who understands what it means to enter a family that has been building something for three generations.",
        hidden:"The grandmother is the decision. Her parents know it, the family knows it, and the man who comes correctly knows it before he arrives.",
        signal:"She mentions her grandmother constantly. This is the most important information she is giving you.",
        endings:{ success:"The grandmother saved the dress. The priest has known her since her baptism. Chicago — complete." }
      },
      { id:"samira", photo:"/women/samira.jpg", name:"Samira", age:25, city:"Miami, Florida", education:"Bachelor's, Public Health", religion:"Islam (revert)", platform:"theinternationallover.com",
        profileText:"Puerto Rican. I took shahada four years ago. My family is Catholic. My faith is real — tested, chosen, and maintained against the current of my own culture. I am not fragile about it. I am the most grounded I have ever been. I teach the new sisters at my masjid because I know what they need and no one was there to give it to me.",
        hidden:"She teaches at the masjid. She has not mentioned it on the profile. The community knows her standing. A man who discovers this on his own has paid attention.",
        signal:"She will tell you the cost of her reversion without being asked. That honesty is itself the test.",
        endings:{ success:"The imam watched her build something real. The quinceañera dress. Miami — complete." }
      },
      { id:"nour_us", photo:"/women/nour-us.jpg", name:"Nour", age:27, city:"Dearborn, Michigan", education:"Bachelor's, Business", religion:"Islam", platform:"theinternationallover.com",
        profileText:"Born in Dearborn. My parents came from Lebanon. I am American in my fluency and Arab in my framework. If you know what a Lebanese family meeting looks like, say so. If you do not, I would rather know now than later.",
        hidden:"The family gathering includes extended community who have an unofficial but real vote. The elder at the community dinner has known the family for twenty-five years.",
        signal:"She asked if you know what marrying into a Lebanese family means. Answer specifically — not generically.",
        endings:{ success:"Her father's voice when he gave consent. Thirty years of that masjid behind it. Dearborn — complete." }
      },
      { id:"rachel", photo:"/women/rachel.jpg", name:"Rachel", age:26, city:"Portland, Oregon", education:"Bachelor's, Education", religion:"Islam (revert)", platform:"theinternationallover.com",
        profileText:"I took shahada eighteen months ago. My practice is sincere. I am building my community. My family has been distant since the conversion. I am on this platform because I am serious about marriage and I am serious about my faith and I believe those two things belong together.",
        hidden:"The correct ending for this arc is not immediate success. It is deferral — not yet — followed by yes when the foundation is ready. A man who can tell the difference between the right woman at the wrong time and the wrong woman at any time has understood this platform.",
        signal:"She talks about the future with specificity before her present is fully built. This is the signal. It is not a flaw — it is information.",
        endings:{ not_yet:"She built the foundation. Eighteen months later she sent the proof. The deferral became yes. Portland — complete.", success:"She built what needed to be built. The correct answer changed over time. Arc complete." }
      },
    ],
    endings:{
      success:"US Region — complete. The same standard as every other region. You held it.",
      not_yet:"NOT YET: She was sincere. The foundation was not yet ready. Come back in two years.",
      genuine_wrong:"NOT YET — Correct Deferral: She was real and sincere. The timing was not right. The man who can see this and defer with respect has demonstrated the highest form of discernment on this platform.",
      cultural_fail:"US Region — Cultural Misnavigation: The preparation was insufficient. The signals were present. You did not read them. Study the US region resource module before returning.",
      early_detect:"US Region — Correct Walkaway: You identified the pattern early and exited cleanly. Arc complete.",
      fraud_pre:"She presented as genuine. The warmth was real enough that you believed it. What was not real was the intention. You caught it before the legal process was complete. The damage was real — time, emotional investment, money in some cases — but the worst outcome was avoided.",
      fraud_post:"She received citizenship. She left. This ending exists because it has happened to real men who did everything they believed was right. The signals were there. They were subtle and they were present. This is why the platform exists.",
    }
  },
  { id:"na", label:"North Africa", color:"#c8963e", desc:"Morocco · Tunisia · Algeria · Egypt",
    context:"North Africa operates on a high-context cultural framework. What is not said carries as much weight as what is. Family honor is structural, not sentimental. A father's silence is not indifference — it is evaluation. Islam governs the rhythm of daily life.",
    women:[
      { id:"nadia", name:"Nadia", age:24, city:"Fez, Morocco", education:"Bachelor's, French Literature", religion:"Muslim (practicing)", platform:"Muslima.com",
        profileText:"I am a teacher. I love books and the Arabic language. I come from a family that holds education and faith as its highest values. I am not looking for adventure. I am looking for a husband who is serious about building a home. My father will speak for me when the time is right.",
        hidden:"Her father is a retired Arabic calligrapher. Her mother passed away three years ago. She is the eldest of four siblings and has managed the household since. She has never been on a platform before. She has not responded to the last eleven messages she received.",
        signal:"Her profile has been active four months. Zero responses. Most men interpret this as disinterest. It is neither.",
        type:"genuine" },
      { id:"yasmine", name:"Yasmine", age:22, city:"Casablanca, Morocco", education:"Some university — marketing", religion:"Muslim (moderate)", platform:"Muslima.com",
        profileText:"I am a young woman who loves life, travel, and learning new things. American men seem to understand women better than men here. I want a partner who will be my equal and treat me with respect. I believe love has no borders.",
        hidden:"Yasmine has been on this platform for fourteen months. She has initiated contact with forty-three men. Three sent money before disappearing. She has a boyfriend named Karim who encouraged the platform. They have discussed what they will do when a foreign man offers marriage.",
        signal:"She responds within minutes, in fluent English, with warmth and specificity. She references something in your profile most women would not have noticed. It feels like being seen.",
        type:"fraud" },
      { id:"fatima", name:"Fatima-Zahra", age:27, city:"Meknes, Morocco", education:"Master's, Islamic Studies", religion:"Muslim (deeply practicing)", platform:"Muslima.com",
        profileText:"I seek a husband who fears Allah and leads his home with knowledge and wisdom. My father will conduct all initial communications on my behalf. If you are serious, write to him directly.",
        hidden:"Her father is a respected Islamic scholar. He has already turned away six suitors. She does not know this profile exists — her father created it. She has been told only that he is searching on her behalf through appropriate channels.",
        signal:"You cannot contact her directly. The profile instructs you to contact the father. Most men skip this one entirely. The ones who do not are immediately in a different category.",
        type:"genuine_wrong" },
    ],
    scenarios:[
      { scene:1, title:"First Contact", setup:"You have reviewed all three profiles. Yasmine has already sent you a message: 'I saw your profile. You seem like a genuine man. I don't meet many of those here.' It arrived twelve minutes after you created your account. Nadia's profile shows 847 views and zero responses. Fatima-Zahra requires you to contact her father.",
        choices:[
          { id:"a", text:"Respond to Yasmine — she reached out first and her English is excellent", next:"yasmine_branch_1", consequence:"She responds in four minutes. The conversation flows easily. On day five she mentions her phone needs repair but doesn't ask for anything directly." },
          { id:"b", text:"Send a careful first message to Nadia in French, referencing her teaching work", next:"nadia_branch_1", consequence:"No reply for eleven days. On the twelfth, three sentences in formal French. She thanks you. She will write again when she has more to say." },
          { id:"c", text:"Request Fatima-Zahra's father's contact information and compose a formal letter", next:"fatima_branch_1", consequence:"His contact is provided. You spend two days composing a letter. His reply arrives in seven days — in classical Arabic. You need a translator." },
        ]
      },
    ],
    endings:{
      success:"You read the culture correctly. You vetted thoroughly. The mahr is agreed. The nikah is performed in her family's city. The immigration process is long — seven months. When she arrives, you are married within 48 hours. The first year is the hardest and the best year of your life simultaneously.",
      early_detect:"You caught the fraud before boarding the flight. You lost three months of evenings and the grief of caring about someone who was not real. That grief is real even if she was not. The cost was the cheapest it will ever be.",
      cultural_fail:"She was real. Her father was real. What ended it was the accumulation of small cultural failures. You checked your phone during the visit — once, briefly. It was noticed. Three months later her father called to say they were closing the process. You will not fully understand what you did wrong for some time.",
      fraud_pre:"You married her. You missed the signals. But you caught it before citizenship. The second phone. The messages in Arabic. You now have a choice about what to do next.",
      fraud_post:"She received citizenship. She left. There may be a child. This ending exists because it has happened to real men.",
    }
  },
  { id:"me", label:"Middle East", color:"#a07830", desc:"Jordan · Lebanon · Yemen · Syria",
    context:"Family is the primary social unit around which everything is organized. A man who courts a woman without courting her family is not a serious man. Religion is not personal — it is communal. A woman's reputation affects not just her but her sisters, her mother, and her father's standing.",
    women:[
      { id:"sara", name:"Sara", age:26, city:"Amman, Jordan", education:"Bachelor's, Nursing", religion:"Muslim (practicing)", platform:"Muslima.com",
        profileText:"I am a nurse and I believe in service. I am looking for a man who understands that a good wife is built from character, not from beauty. I have my parents' blessing to use this platform. I am ready for marriage. I am not ready for games.",
        hidden:"She has had serious correspondence with two men before. The American ended contact after three months without explanation. The British man proposed then withdrew when his family objected. She has not told her parents. She is careful now in a way she was not before.",
        signal:"The profile reads like a woman who has been disappointed but has not become cynical. That distinction matters.",
        type:"genuine" },
      { id:"hessa", name:"Hessa", age:23, city:"Beirut, Lebanon", education:"University — Political Science", religion:"Muslim (cultural)", platform:"Muslima.com",
        profileText:"I am curious about everything. I believe the world is larger than where you were born. I am looking for a man who is going somewhere — and who wants to take me with him. I believe in partnership, not tradition.",
        hidden:"Her father is a former journalist forced to leave Lebanon in 2019. The family has been in financial difficulty since. Her mother has told her more than once that an American husband would solve several problems. Hessa genuinely wants to leave Lebanon. Whether the attraction is to marriage, a particular man, or a different country is a question she has not fully answered for herself.",
        signal:"The profile is written for a Western man. Every line speaks to Western values. This can mean she is genuinely bicultural. It can also mean she is performing for an audience.",
        type:"genuine_wrong" },
      { id:"maryam", name:"Maryam", age:29, city:"Irbid, Jordan", education:"Master's, Arabic Literature", religion:"Muslim (deeply practicing)", platform:"Muslima.com",
        profileText:"I have spent my life studying words. I understand their weight. I will not spend them carelessly here. I am looking for a man of substance. My brother manages this account on my behalf.",
        hidden:"Maryam has a published book of Arabic poetry used in secondary schools. Her father died two years ago. Her brother has turned away six inquiries without telling her. She found out when a man from their city mentioned it. They disagreed. He still manages the account but now must tell her before dismissing anyone.",
        signal:"The platform shows this account has been active eleven months with one recorded inquiry sent — to someone else. She reached out once. That person did not respond.",
        type:"genuine" },
    ],
    scenarios:[
      { scene:1, title:"First Contact", setup:"Sara's profile is direct. Hessa has a profile that speaks fluent Western. Maryam requires contact through her brother. Each represents a completely different entry point.",
        choices:[
          { id:"a", text:"Message Sara directly — her English is clear and her profile is honest", next:"sara_branch_1", consequence:"She replies in three days. One paragraph. She asks: 'What does a good husband look like to you?'" },
          { id:"b", text:"Message Hessa — she is the most immediately accessible culturally", next:"hessa_branch_1", consequence:"She responds within an hour. Warm. Effortless. On day eight she mentions her father is going through financial difficulty." },
          { id:"c", text:"Write formally to Maryam's brother", next:"maryam_branch_1", consequence:"He responds in Arabic after five days: 'Before I pass your message to her, I need to understand who you are.'" },
        ]
      },
    ],
    endings:{
      success:"The religion question was answered honestly. The family meeting in Amman went well. Her father asked about your family — you had thought about this. The mahr negotiation was respectful. The visa process was long. When she arrived, she brought her mother's recipe book and her grandmother's prayer rug. You understood what that meant.",
      early_detect:"Hessa's warmth was real but her motivation was an exit, not a marriage. When you asked what she loved about her life exactly as it was, she went quiet for a long time. Her answer told you everything. You ended it kindly.",
      cultural_fail:"You misrepresented your religious practice to gain access to the family. The marriage began on a lie. When the truth surfaced — and it always surfaces — the damage was to both of you. The cultural debrief is clear: deception is never a foundation.",
      fraud_pre:"The financial pressure was always present. After the Green Card, the requests escalated. You caught the pattern before citizenship. The attorney consultation came first. The damage was limited.",
      fraud_post:"She had a brother she wanted to bring over. The marriage was the instrument. Post-citizenship, the plan executed exactly as it had been designed, long before she met you.",
    }
  },
  { id:"as", label:"Asia", color:"#b88a28", desc:"Indonesia · Philippines · Bangladesh",
    context:"Asia in this context spans Southeast Asia and South Asia. The common threads: family embeddedness, high-context communication, and the reality that the economic gap between an American man and her family can be large enough to distort the power dynamic significantly. That last point is the primary source of fraud in this arc — usually not malice but desperation given a direction.",
    women:[
      { id:"amira", name:"Amira", age:25, city:"Yogyakarta, Indonesia", education:"Bachelor's, Islamic Education", religion:"Muslim (traditionalist)", platform:"Muslima.com",
        profileText:"My family is my world. My faith is my foundation. I am not looking for a man to take me somewhere. I am looking for a man to build something with me — here or wherever Allah wills. My father speaks for me.",
        hidden:"Amira's father is an imam of a small mosque. She has no strong desire to go to America — she would go if her husband was good, stay if her husband was good. She is genuinely indifferent to geography. This will confuse men who assume she wants an exit.",
        signal:"Most men on the platform approach women from this region assuming they want to leave. Her profile does not say this. Most men miss that.",
        type:"genuine" },
      { id:"jasmine", name:"Jasmine", age:24, city:"Cebu, Philippines", education:"Associate degree, Business", religion:"Catholic", platform:"ChristianMingle",
        profileText:"Family is everything to me. I take care of my parents and my two younger brothers. I want a husband who understands that when you marry me, you marry my whole family. Not in a burden way — in a love way. I am a hard worker.",
        hidden:"Her father has a heart condition requiring medication her family struggles to afford. She sends forty percent of her salary home monthly. She has two cousins who married American men. One marriage is genuinely happy. The other husband sends money but rarely visits. She has watched both closely. She wants the first kind. She has a two-year-old son from a relationship that ended. She has not included this in her profile.",
        signal:"The profile is honest about family embeddedness. What it does not say will surface when she trusts you enough to say it.",
        type:"genuine_wrong" },
      { id:"nurul", name:"Nurul", age:28, city:"Dhaka, Bangladesh", education:"Master's, Economics", religion:"Muslim (practicing privately)", platform:"Muslima.com",
        profileText:"I have spent my career helping women build economic independence. I believe marriage is a partnership. I am not looking to be managed. I am looking for a man who is secure enough to be beside me rather than above me. I am traditional in my values and contemporary in my methods.",
        hidden:"She has been on this platform two months after four years of family introductions that failed — the men found her too educated, too independent, too direct. Her father, who holds a graduate degree, is quietly supportive. She is here not because she wants a foreign man specifically but because the men in her community cannot accept what she is.",
        signal:"She is not looking for rescue. The test of the Nurul arc is not whether you can vet her. It is whether you are the man she would accept.",
        type:"genuine" },
    ],
    scenarios:[
      { scene:1, title:"First Contact", setup:"Amira's father must be contacted first. Jasmine's profile is warm and family-centered — she has not yet disclosed her son. Nurul's profile is direct and intelligent. Three very different entry points. Three very different tests.",
        choices:[
          { id:"a", text:"Contact Amira through her father as instructed", next:"amira_branch_1", consequence:"Her father replies thoughtfully. He asks about your faith and your intentions. He does not ask about money." },
          { id:"b", text:"Message Jasmine — her profile is warm and her English is strong", next:"jasmine_branch_1", consequence:"She responds with warmth and specificity. She asks about your family immediately. The conversation feels like meeting someone." },
          { id:"c", text:"Message Nurul — her profile is the most intellectually direct", next:"nurul_branch_1", consequence:"She responds in 24 hours. One paragraph. She asks one question that is harder than it appears." },
        ]
      },
    ],
    endings:{
      success:"You understood that her family's financial need was real and not shameful. You discussed what remittances would look like before the marriage, not after. She arrived having never been dishonest with you. The son she disclosed early told you who she was. The marriage was built on that foundation.",
      early_detect:"The poverty gap was real. The requests were real. But you held the line — no money before the vetting was complete, no financial entanglement before commitment. She respected it. Or she revealed herself. Either way, you were protected.",
      cultural_fail:"You thought you understood Asian culture because it felt familiar. You did the least preparation. The assumptions you carried into the relationship — about her deference, about her desires, about what she needed from you — were wrong. She was not passive. She was polite. Those are not the same thing.",
      fraud_pre:"The financial gravity was always present. The requests escalated once she arrived. You caught it before citizenship — the separate account she opened, the money transfers you did not authorize. Limited damage.",
      fraud_post:"She was sending money home throughout the marriage. After citizenship, the transfers became larger. Then she was gone. The child remained. This arc ends with a single father and a lesson about the difference between a woman who is committed to the marriage and a woman who is committed to what the marriage provides.",
    }
  },
  { id:"la", label:"Latin America", color:"#c8a040", desc:"Colombia · Dominican Republic · Peru",
    context:"Latin America is the arc with the most cultural overlap with American experience and therefore the most dangerous false sense of familiarity. The Latin American woman is often the most immediately accessible — shared cultural references, social warmth that feels like intimacy, English fluency that removes one primary vetting tool. The man who enters this arc thinking he understands it because he has watched Spanish-language television has not begun to understand it.",
    women:[
      { id:"valentina", name:"Valentina", age:27, city:"Medellin, Colombia", education:"Bachelor's, Accounting", religion:"Catholic (practicing)", platform:"SimplyMarry.com",
        profileText:"I believe a home needs a foundation. I am not looking for a vacation. I am looking for a husband. I was raised to understand what that means — by a father who showed me and a mother who lived it. If you are serious, I will know. If you are not, I will also know.",
        hidden:"She was engaged three years ago to a local man who left her two months before the wedding. The experience made her more discerning rather than more desperate. She has ended three previous platform conversations because she felt something was being performed rather than lived.",
        signal:"The profile reads like a woman testing for authenticity before warmth. That is exactly what she is doing.",
        type:"genuine" },
      { id:"diana", name:"Diana", age:22, city:"Santo Domingo, Dominican Republic", education:"High school; some university", religion:"Catholic (cultural)", platform:"SimplyMarry.com",
        profileText:"I want a better life. I am not ashamed to say this. My country is difficult. I work hard and I want a man who works hard with me. I want children and a home. I want a husband who will be faithful. I will be faithful to him.",
        hidden:"Diana is honest in her profile. She does want a better life — that is genuine. She has a two-year-old son from a relationship that ended. She has not included this. She intends to disclose it once a connection is established. The question is not her honesty. It is whether a genuine motive is sufficient foundation for a marriage.",
        signal:"The phrase 'I want a better life' is sometimes read as a red flag. In Diana's case it is not. The undisclosed child is. How she handles the disclosure will tell you more about her than anything else.",
        type:"genuine_wrong" },
      { id:"elena", name:"Elena", age:30, city:"Lima, Peru", education:"Bachelor's, Nursing; pursuing Master's, Public Health", religion:"Catholic with indigenous traditions", platform:"SimplyMarry.com",
        profileText:"I have spent years going into communities the city forgets. I have seen what a family without a father becomes. I have seen what a woman without a husband carries alone. I do not want that for myself. I am looking for a serious man — not a perfect man, but a man who is committed to being better.",
        hidden:"She has been proposed to twice and declined both. The American man was her closest to yes. She declined because he said he would want her to stop working after they had children. She told him she could not agree. He could not understand why. The proposal died.",
        signal:"She is accomplished, dedicated, and has already filtered out men who could not accept her whole life. The test of the Elena arc is not whether you can vet her. It is whether you are the man she would accept.",
        type:"genuine" },
    ],
    scenarios:[
      { scene:1, title:"First Contact", setup:"Valentina's profile tests for authenticity immediately. Diana's profile is disarmingly honest about wanting a better life. Elena's profile tells you exactly who she is — if you read it carefully.",
        choices:[
          { id:"a", text:"Message Valentina — her directness is appealing", next:"valentina_branch_1", consequence:"She replies in two days. She asks one question: 'What does a good husband look like to you?'" },
          { id:"b", text:"Message Diana — her honesty about wanting a better life is refreshing", next:"diana_branch_1", consequence:"She responds warmly. The conversation develops quickly. On week three she mentions her son." },
          { id:"c", text:"Message Elena — her profile is the most substantive", next:"elena_branch_1", consequence:"She responds in 48 hours. She has read your profile carefully. She asks whether you have any experience with public health work." },
        ]
      },
    ],
    endings:{
      success:"Valentina tested you three times before she showed warmth. You passed each time — not by performing but by being consistent. Her father assessed you in the first five minutes of meeting you. The assessment was silent. You passed that too. The marriage is built on a foundation both of you constructed.",
      early_detect:"Diana's son was disclosed on week three. You received it with respect and honesty — you were not sure you were ready to be a step-father and you said so directly. She appreciated the honesty more than a false yes would have given her. You ended it with dignity on both sides.",
      cultural_fail:"You thought the familiarity of Latin culture meant you were prepared. You arrived in Medellin with assumptions. The father's dinner table was an evaluation you did not know you were sitting at. The marriage that followed was good for a year and a half. Then the things you had not discussed — her family's expectations, your assumptions about her role — surfaced as irreconcilable differences. She did not become someone else. She became who she always was, once the performance of early love had passed.",
      fraud_pre:"The Americanization began before the first year was over. The environment did its work. What she was in Medellin and what she was becoming in America were visibly different. You caught it before it became irreversible — you built the community around her that you should have built from day one.",
      fraud_post:"The erosion was quiet and cumulative. She was never a villain. She was a woman placed in an environment that constantly offered her an alternative identity. You had not protected the marriage from that environment. By the time you understood what was happening it had already happened.",
    }
  },
  { id:"ss", label:"Sub-Saharan Africa", color:"#b07820", desc:"Senegal · Ghana · Ethiopia · Kenya",
    context:"Sub-Saharan Africa is the arc with the greatest internal diversity and the deepest connection to the African American man's ancestral history. Community is the primary unit of reality. The bride price negotiation is not a transaction — it is a covenant between two families. A man who treats it as a fee is immediately revealed as someone who does not understand what he is entering.",
    women:[
      { id:"fatou", name:"Fatou", age:26, city:"Dakar, Senegal", education:"Bachelor's, Education", religion:"Muslim (Sufi — Tijaniyya order)", platform:"Muslima.com",
        profileText:"I come from a family of teachers and scholars. My grandfather was a marabout. My father is a teacher. I am a teacher. Knowledge is how we have always served our community. I am looking for a man who understands that a wife brings more than her body to a home — she brings her lineage, her faith, and her gifts.",
        hidden:"Fatou's Sufi tradition is central to who she is. The Tijaniyya order has its own practices, rhythms, and community obligations. A man who dismisses Sufi Islam as unorthodox will be filtered out by her family long before he understands what happened.",
        signal:"The profile does not mention wanting to leave Senegal. It mentions wanting a man who understands lineage. These are different things.",
        type:"genuine" },
      { id:"abena", name:"Abena", age:24, city:"Accra, Ghana", education:"Bachelor's, Business Administration", religion:"Christian (Pentecostal)", platform:"SimplyMarry.com",
        profileText:"I believe God has a plan for every life. I believe that plan includes a good marriage and a family built on faith. I am not desperate — I am deliberate. My parents are involved in everything important that I do. This is not a warning. It is a promise.",
        hidden:"Abena's uncle is a well-known Pentecostal pastor in Accra. Her family will expect you to attend a service during any visit — not as a cultural experience, as a statement of who you are. Whether you share her specific denomination matters less than whether you share her orientation toward faith. A secular man will not survive this family's evaluation.",
        signal:"The last line — 'This is not a warning. It is a promise' — is telling you something precise. Receive it precisely.",
        type:"genuine_wrong" },
      { id:"tigist", name:"Tigist", age:28, city:"Addis Ababa, Ethiopia", education:"Master's, Public Health", religion:"Ethiopian Orthodox Christian", platform:"Muslima.com",
        profileText:"I am on this platform because my family asked me to consider men from outside Ethiopia. I am not certain this is the right path for me. But I am willing to be shown that it is. I am serious, faithful, and I will not waste your time if you do not waste mine.",
        hidden:"Ethiopian Orthodox Christianity is not a background religion. It is a daily, weekly, and annual practice with over 250 fasting days, its own liturgical calendar, and its own deeply embedded community practices. Her family created this profile hoping she will meet an Ethiopian man from the diaspora. A non-Ethiopian man will need to demonstrate extraordinary cultural seriousness.",
        signal:"She says she is not certain this is the right path. That is not rejection. It is honesty. Most men read it as rejection.",
        type:"genuine" },
    ],
    scenarios:[
      { scene:1, title:"First Contact", setup:"Fatou's profile speaks of lineage and knowledge. Abena promises family involvement — directly. Tigist admits uncertainty. Each of these opening positions is a test of how you read what is in front of you.",
        choices:[
          { id:"a", text:"Message Fatou — knowledge and lineage speak to you", next:"fatou_branch_1", consequence:"She replies in four days. Formal, warm, precise. She asks about your relationship with your own lineage." },
          { id:"b", text:"Message Abena — her directness is appealing", next:"abena_branch_1", consequence:"She responds within a day. She asks whether you have a church or faith community. It is the first question." },
          { id:"c", text:"Message Tigist — her honesty about uncertainty is unusual and interesting", next:"tigist_branch_1", consequence:"She responds in three days. She says: 'Most men do not respond to that line. You did. Why?'" },
        ]
      },
    ],
    endings:{
      success:"You entered a lineage, a community, and a tradition that predates your own country. The bride price negotiation was conducted with respect — you asked what the items represented before discussing amounts. The family church service was a participation, not a performance. The children of this marriage will be multilingual, multicultural, and connected to a history the American education system largely erased. That is a specific and irreplaceable gift.",
      early_detect:"You recognized the romance scam pattern early — the escalating financial crisis, the perfect English, the photo that returned results under a different name. You walked away before it cost you more than your time. The debrief is not about suspicion. It is about the tools that distinguish performance from reality.",
      cultural_fail:"Your intentions were good. Your preparation was not. The bride price conversation was treated as a transaction to get through efficiently. The family church service was attended but not engaged. The arc did not end dramatically — it ended in a series of cooling conversations and a father who stopped returning calls. The lesson is not about effort. It is about what effort is actually required.",
      fraud_pre:"The post-Green Card period revealed the pattern. The money was moving in directions you had not agreed to. The phone calls to her home country were longer and more frequent than before. You caught it before citizenship with the help of an attorney you consulted before saying anything.",
      fraud_post:"The citizenship was the goal. The marriage was the instrument. After naturalization, the departure was organized and deliberate. The children remained. This ending is documented — not hypothetical. The debrief focuses on the signals that were present from the beginning, available to be read, and not read.",
    }
  }
];

const COURSE_PHASES = ["intro", "roster", "scenario", "outcome", "debrief", "certificate"];


// ── COURSE COMPONENTS ────────────────────────────────────────

function ProfileCard({ woman, selected, onSelect, revealed }) {
  return (
    <div onClick={onSelect} style={{ cursor:"pointer", border:`2px solid ${selected?"#b8963e":"#1e3a6e"}`, background:selected?"rgba(184,150,62,0.08)":"#0f2347", padding:"1.25rem", borderRadius:4, transition:"all 0.3s", boxShadow:selected?"0 0 20px rgba(184,150,62,0.25)":"none", position:"relative" }}>
      {selected && <div style={{ position:"absolute", top:-10, left:"50%", transform:"translateX(-50%)", background:"#b8963e", color:"#0f2347", fontSize:8, fontWeight:700, letterSpacing:"0.15em", padding:"2px 10px", fontFamily:"sans-serif", whiteSpace:"nowrap" }}>ACTIVE</div>}
      <div style={{ display:"flex", gap:12, marginBottom:10 }}>
        <div style={{ width:48, height:60, background:"#1a3a6b", border:"1px solid #3a2e18", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <svg viewBox="0 0 30 40" width="30"><ellipse cx="15" cy="12" rx="8" ry="9" fill="#0f2347"/><path d="M3 38 Q3 24 15 24 Q27 24 27 38 Z" fill="#0f2347"/></svg>
        </div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:14, color:"#d4af6a", fontFamily:"Georgia,serif", marginBottom:2 }}>{woman.name}</div>
          <div style={{ fontSize:9, color:"#8a7a5a", fontFamily:"sans-serif", letterSpacing:"0.08em" }}>{woman.age} · {woman.city}</div>
          <div style={{ fontSize:9, color:"#8a7a5a", fontFamily:"sans-serif" }}>{woman.religion}</div>
          <div style={{ fontSize:9, color:"#5a4e32", fontFamily:"sans-serif", marginTop:2 }}>{woman.platform}</div>
        </div>
      </div>
      <div style={{ fontSize:10, color:"#c8b890", lineHeight:1.65, fontFamily:"sans-serif", fontStyle:"italic", borderTop:"0.5px solid #1e3a6e", paddingTop:8 }}>"{(woman.profileText || woman.bio || "").slice(0,120)}..."</div>
      {revealed && (
        <div style={{ marginTop:10, padding:8, background:"rgba(139,26,26,0.15)", border:"0.5px solid #8b1a1a" }}>
          <div style={{ fontSize:8, color:"#8b1a1a", letterSpacing:"0.1em", fontFamily:"sans-serif", marginBottom:4 }}>INTELLIGENCE FILE</div>
          <div style={{ fontSize:9, color:"#c8b890", lineHeight:1.65, fontFamily:"sans-serif" }}>{woman.hidden}</div>
        </div>
      )}
    </div>
  );
}

function ScenarioCard({ choice, onSelect }) {
  return (
    <button onClick={() => onSelect(choice)} style={{ width:"100%", textAlign:"left", padding:"1rem 1.25rem", background:"#0f2347", border:"1px solid #1e3a6e", cursor:"pointer", marginBottom:8, transition:"all 0.2s", fontFamily:"sans-serif" }}
      onMouseEnter={e => e.currentTarget.style.borderColor="#b8963e"}
      onMouseLeave={e => e.currentTarget.style.borderColor="#1e3a6e"}>
      <div style={{ fontSize:9, color:"#7a6228", letterSpacing:"0.1em", marginBottom:4 }}>DECISION</div>
      <div style={{ fontSize:13, color:"#f0e6cc", lineHeight:1.6 }}>{choice.text}</div>
    </button>
  );
}

class CourseErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(error) { return { error: error.message || String(error) }; }
  render() {
    if (this.state.error) {
      return (
        <div style={{ minHeight:"100vh", background:"#091a35", color:"#f0e6cc", fontFamily:"Georgia,serif", display:"flex", alignItems:"center", justifyContent:"center", padding:"2rem" }}>
          <div style={{ maxWidth:600, width:"100%", textAlign:"center" }}>
            <div style={{ fontSize:9, letterSpacing:"0.3em", color:"#8b1a1a", fontFamily:"sans-serif", marginBottom:12 }}>COURSE ERROR — PLEASE COPY AND REPORT</div>
            <div style={{ background:"#0f2347", border:"1px solid #8b1a1a", padding:"1.5rem", marginBottom:"1.5rem", textAlign:"left", fontFamily:"sans-serif", fontSize:12, color:"#c8b890", lineHeight:1.7, wordBreak:"break-all" }}>
              {this.state.error}
            </div>
            <button onClick={() => { this.setState({ error: null }); this.props.onReset(); }} style={{ padding:"12px 28px", background:"#b8963e", color:"#0f2347", border:"none", cursor:"pointer", fontSize:12, fontWeight:700, fontFamily:"sans-serif", borderRadius:"20px" }}>
              Return to Map
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function CourseView({ onBack }) {
  const [phase, setPhase] = useState("intro");
  const [activeRegion, setActiveRegion] = useState(null);
  const [selectedWoman, setSelectedWoman] = useState(null);
  const [revealedCards, setRevealedCards] = useState([]);
  const [scenarioStep, setScenarioStep] = useState(0);
  const [choiceHistory, setChoiceHistory] = useState([]);
  const [outcome, setOutcome] = useState(null);
  const [stampedRegions, setStampedRegions] = useState([]);

  useEffect(() => { window.scrollTo({ top:0, behavior:"instant" }); }, [phase, activeRegion]);

  const region = activeRegion ? REGIONS_COURSE.find(r => r.id === activeRegion) : null;

  const handleChoice = (choice) => {
    if (!choice) return;
    const newHistory = [...choiceHistory, choice];
    setChoiceHistory(newHistory);

    if (!region || !selectedWoman) { setScenarioStep(s => s + 1); return; }
    const woman = (region.women || []).find(w => w.id === selectedWoman);
    if (!woman) { setScenarioStep(s => s + 1); return; }
    const choices = (region.scenarios && region.scenarios[0] && region.scenarios[0].choices) || [];

    // Fire outcome once all choices are exhausted
    if (choices.length > 0 && newHistory.length >= choices.length) {
      const r = Math.random();
      let ending;
      const type = woman.type || "genuine";
      if (type === "fraud") {
        if (r < 0.35) ending = "early_detect";
        else if (r < 0.80) ending = "fraud_pre";
        else ending = "fraud_post";
      } else if (type === "genuine_wrong") {
        ending = r < 0.30 ? "early_detect" : "cultural_fail";
      } else if (type === "not_yet") {
        ending = "not_yet";
      } else {
        if (r < 0.20) ending = "success";
        else if (r < 0.50) ending = "early_detect";
        else ending = "cultural_fail";
      }
      setOutcome(ending);
      setPhase("outcome");
      return;
    }
    setScenarioStep(s => s + 1);
  };

  const completeRegion = () => {
    setStampedRegions(s => s.includes(activeRegion) ? s : [...s, activeRegion]);
    setPhase("roster");
    setActiveRegion(null);
    setSelectedWoman(null);
    setChoiceHistory([]);
    setScenarioStep(0);
    setOutcome(null);
  };

  // INTRO
  if (phase === "intro") {
    return (
      <div style={{ minHeight:"100vh", background:"#091a35", color:"#f0e6cc", fontFamily:"Georgia,serif" }}>
        <div style={{ background:"#0f2347", borderBottom:"1px solid #1e3a6e", padding:"1rem 1.5rem", display:"flex", alignItems:"center", gap:"1rem" }}>
          <button onClick={onBack} style={{ background:"none", border:"1px solid #b8963e", color:"#b8963e", padding:"6px 14px", borderRadius:"20px", cursor:"pointer", fontSize:"13px", fontFamily:"sans-serif" }}>← Library</button>
          <div style={{ color:"#d4af6a", fontSize:15 }}>The International Lover™ — The Course</div>
        </div>
        <div style={{ maxWidth:640, margin:"0 auto", padding:"4rem 1.5rem", textAlign:"center" }}>
          <div style={{ fontSize:9, letterSpacing:"0.3em", color:"#b8963e", fontFamily:"sans-serif", marginBottom:16 }}>COURSE OPENING</div>
          <svg viewBox="0 0 60 72" width={52} style={{ display:"block", margin:"0 auto 20px" }}>
            <path d="M30 2 L54 10 L54 38 C54 54 43 64 30 70 C17 64 6 54 6 38 L6 10 Z" fill="none" stroke="#b8963e" strokeWidth="1.5"/>
            <path d="M30 8 L50 15 L50 38 C50 52 40 61 30 66 C20 61 10 52 10 38 L10 15 Z" fill="#091a35" stroke="#7a6228" strokeWidth="0.75"/>
            <text x="30" y="42" textAnchor="middle" fill="#b8963e" fontSize="14" fontFamily="sans-serif" fontWeight="700" letterSpacing="1">IL</text>
            <text x="30" y="10" textAnchor="middle" fill="#b8963e" fontSize="10">✦</text>
          </svg>
          <div style={{ marginBottom:"2.5rem" }}>
            {COURSE_OPENING.map((p, i) => (
              <p key={i} style={{ fontSize:"clamp(13px,1.8vw,15px)", color: i === COURSE_OPENING.length-1 ? "#b8963e" : "#c8b890", lineHeight:1.9, marginBottom:"1.25rem", fontFamily:"sans-serif", fontStyle: i === COURSE_OPENING.length-1 ? "italic" : "normal" }}>{p}</p>
            ))}
          </div>
          <button onClick={() => setPhase("map")} style={{ padding:"14px 40px", background:"#b8963e", color:"#0f2347", border:"none", cursor:"pointer", fontSize:13, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", fontFamily:"sans-serif" }}>
            Enter the Map →
          </button>
        </div>
      </div>
    );
  }

  // MAP — World map region selection
  if (phase === "map") {
    return (
      <div style={{ minHeight:"100vh", background:"#091a35", color:"#f0e6cc", fontFamily:"Georgia,serif" }}>
        <div style={{ background:"#0f2347", borderBottom:"1px solid #1e3a6e", padding:"1rem 1.5rem", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:8 }}>
          <button onClick={onBack} style={{ background:"none", border:"1px solid #b8963e", color:"#b8963e", padding:"6px 14px", borderRadius:"20px", cursor:"pointer", fontSize:"13px", fontFamily:"sans-serif" }}>← Library</button>
          <div style={{ color:"#d4af6a", fontSize:15 }}>Select Your Destination</div>
          <div style={{ fontSize:10, color:"#8a7a5a", fontFamily:"sans-serif" }}>{stampedRegions.length} / 6 regions stamped</div>
        </div>
        <div style={{ maxWidth:860, margin:"0 auto", padding:"2.5rem 1.5rem" }}>
          <div style={{ textAlign:"center", marginBottom:"2rem" }}>
            <div style={{ fontSize:9, letterSpacing:"0.3em", color:"#b8963e", fontFamily:"sans-serif", marginBottom:8 }}>THE WORLD MAP</div>
            <p style={{ fontSize:13, color:"#8a7a5a", fontFamily:"sans-serif", lineHeight:1.7 }}>Six regions. Twenty-two virtual women. Every decision branches the story.<br />You may switch between women at any decision point — but switching has consequences.</p>
          </div>

          {/* Passport stamp progress */}
          <div style={{ background:"#0f2347", border:"1px solid #1e3a6e", padding:"1.25rem", marginBottom:"2rem", textAlign:"center" }}>
            <div style={{ fontSize:9, letterSpacing:"0.2em", color:"#5a4e32", fontFamily:"sans-serif", marginBottom:10 }}>YOUR PASSPORT</div>
            <div style={{ display:"flex", justifyContent:"center", gap:12, flexWrap:"wrap" }}>
              {REGIONS_COURSE.map(r => (
                <div key={r.id} style={{ display:"inline-flex", flexDirection:"column", alignItems:"center", justifyContent:"center", width:64, height:64, borderRadius:"50%", border:`1.5px ${stampedRegions.includes(r.id)?"solid":"dashed"} #b8963e`, background:stampedRegions.includes(r.id)?"rgba(184,150,62,0.12)":"transparent", opacity:stampedRegions.includes(r.id)?1:0.3 }}>
                  <div style={{ fontSize:6.5, color:"#b8963e", fontFamily:"sans-serif", letterSpacing:"0.06em", textAlign:"center", lineHeight:1.35 }}>{r.label.toUpperCase().split(" ").join(" ")}</div>
                </div>
              ))}
            </div>
            {stampedRegions.length === 6 && (
              <button onClick={() => setPhase("certificate")} style={{ marginTop:12, padding:"10px 24px", background:"#b8963e", color:"#0f2347", border:"none", cursor:"pointer", fontSize:12, fontWeight:700, fontFamily:"sans-serif", letterSpacing:"0.1em" }}>
                Claim Your Certificate →
              </button>
            )}
          </div>

          {/* Region cards */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(240px,1fr))", gap:16 }}>
            {REGIONS_COURSE.map(r => (
              <div key={r.id} onClick={() => { setActiveRegion(r.id); setPhase("roster"); }} style={{ background:"#0f2347", border:`1px solid ${stampedRegions.includes(r.id)?"#b8963e":"#1e3a6e"}`, padding:"1.5rem", cursor:"pointer", transition:"all 0.3s", position:"relative" }}
                onMouseEnter={e => e.currentTarget.style.borderColor="#b8963e"}
                onMouseLeave={e => e.currentTarget.style.borderColor=stampedRegions.includes(r.id)?"#b8963e":"#1e3a6e"}>
                {stampedRegions.includes(r.id) && <div style={{ position:"absolute", top:8, right:8, fontSize:10, color:"#b8963e" }}>✦</div>}
                <div style={{ fontSize:9, letterSpacing:"0.2em", color:"#7a6228", fontFamily:"sans-serif", marginBottom:6 }}>DESTINATION</div>
                <div style={{ fontSize:18, color:"#d4af6a", fontFamily:"Georgia,serif", marginBottom:4 }}>{r.label}</div>
                <div style={{ fontSize:10, color:"#8a7a5a", fontFamily:"sans-serif", marginBottom:10 }}>{r.desc}</div>
                <div style={{ fontSize:11, color:"#c8b890", lineHeight:1.65, fontFamily:"sans-serif" }}>{r.context.slice(0,120)}...</div>
                <div style={{ marginTop:12, fontSize:10, color:"#b8963e", fontFamily:"sans-serif", letterSpacing:"0.08em" }}>{stampedRegions.includes(r.id) ? "STAMPED — REVISIT →" : "ENTER REGION →"}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ROSTER — Three profile cards
  if (phase === "roster" && region) {
    return (
      <div style={{ minHeight:"100vh", background:"#091a35", color:"#f0e6cc", fontFamily:"Georgia,serif" }}>
        <div style={{ background:"#0f2347", borderBottom:"1px solid #1e3a6e", padding:"1rem 1.5rem", display:"flex", alignItems:"center", gap:"1rem", flexWrap:"wrap" }}>
          <button onClick={() => setPhase("map")} style={{ background:"none", border:"1px solid #b8963e", color:"#b8963e", padding:"6px 14px", borderRadius:"20px", cursor:"pointer", fontSize:"13px", fontFamily:"sans-serif" }}>← Map</button>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:9, color:"#8a7a5a", letterSpacing:"0.15em", textTransform:"uppercase", fontFamily:"sans-serif" }}>The International Lover™ · The Course</div>
            <div style={{ fontSize:15, color:"#d4af6a" }}>{region.label} — Your Roster</div>
          </div>
        </div>
        <div style={{ maxWidth:860, margin:"0 auto", padding:"2rem 1.5rem" }}>
          <div style={{ background:"#0f2347", border:"1px solid #1e3a6e", padding:"1rem 1.25rem", marginBottom:"1.5rem" }}>
            <div style={{ fontSize:9, letterSpacing:"0.2em", color:"#b8963e", fontFamily:"sans-serif", marginBottom:6 }}>REGIONAL CONTEXT</div>
            <p style={{ fontSize:12, color:"#c8b890", lineHeight:1.75, fontFamily:"sans-serif", margin:0 }}>{region.context}</p>
          </div>
          <div style={{ fontSize:11, color:"#8a7a5a", fontFamily:"sans-serif", marginBottom:"1rem", lineHeight:1.65 }}>
            Three women are presented. Select who you wish to pursue first. You may switch at any decision point — but switching has consequences in this region.
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(240px,1fr))", gap:14, marginBottom:"1.5rem" }}>
            {region.women.map(w => (
              <ProfileCard key={w.id} woman={w} selected={selectedWoman === w.id} onSelect={() => setSelectedWoman(w.id)} revealed={revealedCards.includes(w.id)} />
            ))}
          </div>
          <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
            <button onClick={() => { if (selectedWoman) { setChoiceHistory([]); setScenarioStep(0); setPhase("scenario"); } }} disabled={!selectedWoman} style={{ padding:"12px 28px", background:selectedWoman?"#b8963e":"#1e3a6e", color:selectedWoman?"#0f2347":"#5a4e32", border:"none", cursor:selectedWoman?"pointer":"default", fontSize:12, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", fontFamily:"sans-serif" }}>
              Begin Scenario →
            </button>
            <button onClick={() => { const unrevealed = region.women.map(w=>w.id).filter(id => !revealedCards.includes(id)); if (unrevealed.length > 0) setRevealedCards(r => [...r, unrevealed[0]]); }} style={{ padding:"12px 20px", background:"transparent", color:"#8a7a5a", border:"1px solid #1e3a6e", cursor:"pointer", fontSize:11, fontFamily:"sans-serif" }}>
              Reveal Intelligence ({3 - revealedCards.length} remaining)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // SCENARIO — Branching decision
  if (phase === "scenario" && region && selectedWoman) {
    const woman = region.women ? region.women.find(w => w.id === selectedWoman) : null;
    if (!woman) { setPhase("roster"); return null; }
    const scenarios = region.scenarios || [];
    const scenario = scenarios[0];
    if (!scenario) { setPhase("roster"); return null; }
    const choices = scenario.choices || [];
    const safeStep = Math.min(scenarioStep, choices.length - 1);
    const currentChoice = safeStep >= 0 && safeStep < choices.length ? choices[safeStep] : null;
    const lastChoice = choiceHistory.length > 0 ? choiceHistory[choiceHistory.length - 1] : null;
    const lastConsequence = lastChoice ? (lastChoice.consequence || lastChoice.outcome || "") : "";

    return (
      <div style={{ minHeight:"100vh", background:"#091a35", color:"#f0e6cc", fontFamily:"Georgia,serif" }}>
        <div style={{ background:"#0f2347", borderBottom:"1px solid #1e3a6e", padding:"1rem 1.5rem", display:"flex", alignItems:"center", gap:"1rem", flexWrap:"wrap" }}>
          <button onClick={() => setPhase("roster")} style={{ background:"none", border:"1px solid #b8963e", color:"#b8963e", padding:"6px 14px", borderRadius:"20px", cursor:"pointer", fontSize:"13px", fontFamily:"sans-serif" }}>← Roster</button>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:9, color:"#8a7a5a", letterSpacing:"0.15em", textTransform:"uppercase", fontFamily:"sans-serif" }}>{region.label} · {woman.name}</div>
            <div style={{ fontSize:14, color:"#d4af6a" }}>{scenario.title || "The Arc"}</div>
          </div>
          <div style={{ fontSize:9, color:"#5a4e32", fontFamily:"sans-serif" }}>Move {choiceHistory.length} of {choices.length}</div>
        </div>
        <div style={{ maxWidth:680, margin:"0 auto", padding:"2rem 1.5rem" }}>

          {/* Dashboard status */}
          <div style={{ display:"flex", gap:8, marginBottom:"1.5rem", flexWrap:"wrap" }}>
            {(region.women || []).map(w => (
              <div key={w.id} style={{ padding:"4px 10px", background:w.id===selectedWoman?"rgba(184,150,62,0.15)":"#0f2347", border:`1px solid ${w.id===selectedWoman?"#b8963e":"#1e3a6e"}`, fontSize:9, fontFamily:"sans-serif" }}>
                <span style={{ color:w.id===selectedWoman?"#d4af6a":"#5a4e32" }}>{w.name}</span>
                <span style={{ color:w.id===selectedWoman?"#b8963e":"#2a3a5e", marginLeft:6 }}>{w.id===selectedWoman?"● ACTIVE":"○ COOLING"}</span>
              </div>
            ))}
          </div>

          {/* Scene setup */}
          <div style={{ background:"#0f2347", border:"1px solid #1e3a6e", borderLeft:"3px solid #b8963e", padding:"1.25rem", marginBottom:"1.5rem" }}>
            <div style={{ fontSize:9, letterSpacing:"0.15em", color:"#b8963e", fontFamily:"sans-serif", marginBottom:8 }}>THE SITUATION</div>
            <p style={{ fontSize:"clamp(13px,1.8vw,15px)", color:"#c8b890", lineHeight:1.85, fontFamily:"sans-serif", margin:0 }}>{scenario.setup || ""}</p>
          </div>

          {/* Previous choice consequence */}
          {lastConsequence ? (
            <div style={{ background:"rgba(184,150,62,0.06)", border:"0.5px solid #b8963e", padding:"1rem 1.25rem", marginBottom:"1.5rem" }}>
              <div style={{ fontSize:9, letterSpacing:"0.15em", color:"#7a6228", fontFamily:"sans-serif", marginBottom:6 }}>CONSEQUENCE OF YOUR LAST DECISION</div>
              <p style={{ fontSize:12, color:"#c8b890", lineHeight:1.75, fontFamily:"sans-serif", margin:0, fontStyle:"italic" }}>{lastConsequence}</p>
            </div>
          ) : null}

          {/* Decision point — one choice at a time */}
          {currentChoice && !outcome ? (
            <div>
              <div style={{ fontSize:9, letterSpacing:"0.15em", color:"#b8963e", fontFamily:"sans-serif", marginBottom:6 }}>DECISION POINT — What do you do?</div>
              <div style={{ fontSize:10, color:"#5a4e32", fontFamily:"sans-serif", marginBottom:12 }}>Decision {choiceHistory.length + 1} of {choices.length}</div>
              <ScenarioCard choice={currentChoice} onSelect={handleChoice} />
              <div style={{ marginTop:12, padding:"0.875rem 1rem", background:"#0f2347", border:"0.5px solid #1e3a6e", fontSize:10, color:"#5a4e32", fontFamily:"sans-serif", lineHeight:1.65 }}>
                You may switch to a different woman at any time. Returning to the roster pauses this scenario.
              </div>
            </div>
          ) : outcome ? (
            <div style={{ textAlign:"center", padding:"2rem" }}>
              <div style={{ fontSize:13, color:"#c8b890", fontFamily:"sans-serif", marginBottom:16 }}>Your decisions have resolved.</div>
              <button onClick={() => setPhase("outcome")} style={{ padding:"12px 28px", background:"#b8963e", color:"#0f2347", border:"none", cursor:"pointer", fontSize:12, fontWeight:700, fontFamily:"sans-serif", borderRadius:"20px" }}>
                See Outcome →
              </button>
            </div>
          ) : (
            <div style={{ textAlign:"center", padding:"2rem" }}>
              <div style={{ fontSize:13, color:"#c8b890", fontFamily:"sans-serif", marginBottom:16 }}>All decisions made. Ready to resolve.</div>
              <button onClick={() => {
                const r = Math.random();
                let resolvedOutcome;
                const type = woman.type || "genuine";
                if (type === "fraud") {
                  if (r < 0.35) resolvedOutcome = "early_detect";
                  else if (r < 0.80) resolvedOutcome = "fraud_pre";
                  else resolvedOutcome = "fraud_post";
                } else if (type === "genuine_wrong") {
                  resolvedOutcome = r < 0.30 ? "early_detect" : "cultural_fail";
                } else if (type === "not_yet") {
                  resolvedOutcome = "not_yet";
                } else {
                  if (r < 0.20) resolvedOutcome = "success";
                  else if (r < 0.50) resolvedOutcome = "early_detect";
                  else resolvedOutcome = "cultural_fail";
                }
                setOutcome(resolvedOutcome);
                setPhase("outcome");
              }} style={{ padding:"12px 28px", background:"#b8963e", color:"#0f2347", border:"none", cursor:"pointer", fontSize:12, fontWeight:700, fontFamily:"sans-serif", borderRadius:"20px" }}>
                See Outcome →
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // OUTCOME
  if (phase === "outcome") {
    if (!region || !outcome) {
      // State is inconsistent — reset cleanly rather than showing black
      setPhase("map"); setActiveRegion(null); setSelectedWoman(null); setOutcome(null); setChoiceHistory([]); setScenarioStep(0);
      return null;
    }
    const woman = region.women.find(w => w.id === selectedWoman);
    const endingText = (woman && woman.endings && woman.endings[outcome])
      || (region.endings && region.endings[outcome])
      || "Arc complete.";
    const endingLabels = {
      success:        "I — Marriage",
      early_detect:   "II — Correct Walkaway",
      cultural_fail:  "III — Cultural Misnavigation",
      fraud_pre:      "IV — Fraud — Caught Before Citizenship",
      fraud_post:     "V — Fraud — After Citizenship",
      not_yet:        "II — Correct Deferral",
    };
    const endingColors = {
      success:       "#b8963e",
      early_detect:  "#7a6228",
      cultural_fail: "#8a7a5a",
      fraud_pre:     "#8b1a1a",
      fraud_post:    "#6b0f0f",
      not_yet:       "#4a7c8a",
    };
    const color = color || "#8a7a5a";

    return (
      <div style={{ minHeight:"100vh", background:"#091a35", color:"#f0e6cc", fontFamily:"Georgia,serif" }}>
        <div style={{ background:"#0f2347", borderBottom:"1px solid #1e3a6e", padding:"1rem 1.5rem", display:"flex", alignItems:"center", gap:"1rem" }}>
          <div style={{ color:"#d4af6a", fontSize:15 }}>{region.label} — Outcome</div>
        </div>
        <div style={{ maxWidth:640, margin:"0 auto", padding:"3rem 1.5rem" }}>
          <div style={{ textAlign:"center", marginBottom:"2rem" }}>
            <div style={{ fontSize:9, letterSpacing:"0.3em", color:color, fontFamily:"sans-serif", marginBottom:8 }}>ENDING</div>
            <div style={{ fontSize:"clamp(16px,2.5vw,22px)", color:color, fontFamily:"Georgia,serif", marginBottom:16 }}>{endingLabels[outcome]}</div>
            <div style={{ width:48, height:2, background:color, margin:"0 auto" }} />
          </div>
          <div style={{ background:"#0f2347", border:`1px solid ${color}`, borderLeft:`4px solid ${color}`, padding:"1.5rem", marginBottom:"1.5rem" }}>
            <p style={{ fontSize:"clamp(13px,1.8vw,15px)", color:"#c8b890", lineHeight:1.9, fontFamily:"sans-serif", margin:0 }}>{endingText}</p>
          </div>
          <div style={{ display:"flex", gap:10, flexWrap:"wrap", justifyContent:"center" }}>
            <button onClick={() => { setChoiceHistory([]); setScenarioStep(0); setPhase("scenario"); }} style={{ padding:"10px 20px", background:"transparent", color:"#b8963e", border:"1px solid #b8963e", cursor:"pointer", fontSize:11, fontFamily:"sans-serif" }}>
              Replay This Arc
            </button>
            <button onClick={completeRegion} style={{ padding:"10px 20px", background:"#b8963e", color:"#0f2347", border:"none", cursor:"pointer", fontSize:11, fontWeight:700, fontFamily:"sans-serif" }}>
              {stampedRegions.includes(region.id) ? "Return to Map →" : "Stamp Passport & Continue →"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // CERTIFICATE
  if (phase === "certificate") {
    return (
      <div style={{ minHeight:"100vh", background:"#091a35", color:"#f0e6cc", fontFamily:"Georgia,serif" }}>
        <div style={{ background:"#0f2347", borderBottom:"1px solid #1e3a6e", padding:"1rem 1.5rem", display:"flex", alignItems:"center", gap:"1rem" }}>
          <button onClick={onBack} style={{ background:"none", border:"1px solid #b8963e", color:"#b8963e", padding:"6px 14px", borderRadius:"20px", cursor:"pointer", fontSize:"13px", fontFamily:"sans-serif" }}>← Library</button>
          <div style={{ color:"#d4af6a", fontSize:15 }}>Certificate of Commission</div>
        </div>
        <div style={{ maxWidth:600, margin:"0 auto", padding:"3rem 1.5rem", textAlign:"center" }}>
          <div style={{ background:"linear-gradient(160deg,#0f2347,#1a3a6b)", border:"2px solid #b8963e", padding:"3rem 2rem", position:"relative", boxShadow:"0 20px 60px rgba(0,0,0,0.5)" }}>
            {["top-left","top-right","bottom-left","bottom-right"].map(p => (
              <div key={p} style={{ position:"absolute", [p.includes("top")?"top":"bottom"]:12, [p.includes("left")?"left":"right"]:14, fontSize:16, color:"#b8963e", opacity:0.4 }}>✦</div>
            ))}
            <div style={{ fontSize:9, letterSpacing:"0.3em", color:"#8a7a5a", fontFamily:"sans-serif", marginBottom:16 }}>THE INTERNATIONAL LOVER™</div>
            <svg viewBox="0 0 60 72" width={52} style={{ display:"block", margin:"0 auto 16px" }}>
              <path d="M30 2 L54 10 L54 38 C54 54 43 64 30 70 C17 64 6 54 6 38 L6 10 Z" fill="none" stroke="#b8963e" strokeWidth="1.5"/>
              <path d="M30 8 L50 15 L50 38 C50 52 40 61 30 66 C20 61 10 52 10 38 L10 15 Z" fill="#091a35" stroke="#7a6228" strokeWidth="0.75"/>
              <text x="30" y="42" textAnchor="middle" fill="#b8963e" fontSize="14" fontFamily="sans-serif" fontWeight="700" letterSpacing="1">IL</text>
              <text x="30" y="10" textAnchor="middle" fill="#b8963e" fontSize="10">✦</text>
            </svg>
            <div style={{ display:"flex", justifyContent:"center", gap:8, marginBottom:16, flexWrap:"wrap" }}>
              {REGIONS_COURSE.map(r => (
                <div key={r.id} style={{ display:"inline-flex", flexDirection:"column", alignItems:"center", justifyContent:"center", width:44, height:44, borderRadius:"50%", border:"1.5px solid #b8963e", background:"rgba(184,150,62,0.12)" }}>
                  <div style={{ fontSize:5.5, color:"#b8963e", fontFamily:"sans-serif", textAlign:"center", lineHeight:1.3 }}>{r.label.split(" ").map(w=>w.slice(0,3).toUpperCase()).join(" ")}</div>
                </div>
              ))}
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16, maxWidth:360, margin:"0 auto 16px" }}>
              <div style={{ flex:1, height:"0.5px", background:"linear-gradient(to right,transparent,#b8963e)" }} />
              <div style={{ color:"#b8963e", fontSize:12 }}>✦</div>
              <div style={{ flex:1, height:"0.5px", background:"linear-gradient(to left,transparent,#b8963e)" }} />
            </div>
            <div style={{ fontSize:10, letterSpacing:"0.2em", color:"#8a7a5a", fontFamily:"sans-serif", marginBottom:10 }}>CERTIFICATE OF COMMISSION</div>
            <div style={{ fontSize:13, color:"#c8b890", marginBottom:12 }}>This certifies that</div>
            <div style={{ fontSize:"clamp(20px,3.5vw,26px)", fontFamily:"Georgia,serif", color:"#d4af6a", fontStyle:"italic", borderBottom:"1px solid #b8963e", paddingBottom:10, marginBottom:14, display:"inline-block", minWidth:220 }}>The Bearer</div>
            <p style={{ fontSize:11, color:"#c8b890", lineHeight:1.85, maxWidth:420, margin:"0 auto 16px", fontStyle:"italic", fontFamily:"sans-serif" }}>having demonstrated the knowledge, cultural intelligence, and discernment required — is hereby commissioned to venture forth as an International Lover. All nations: recognize and allow the bearer to pass freely without delay or hindrance.</p>
            <div style={{ fontSize:12, color:"#8a7a5a", fontFamily:"sans-serif", letterSpacing:"0.08em" }}>The International Lover™</div>
          </div>
          <div style={{ marginTop:20 }}>
            <button onClick={() => window.print()} style={{ padding:"10px 22px", background:"#b8963e", color:"#0f2347", border:"none", cursor:"pointer", fontSize:12, fontWeight:700, fontFamily:"sans-serif", marginRight:10 }}>Print / Save Certificate</button>
            <button onClick={onBack} style={{ padding:"10px 22px", background:"transparent", color:"#8a7a5a", border:"1px solid #1e3a6e", cursor:"pointer", fontSize:12, fontFamily:"sans-serif" }}>← Library</button>
          </div>
        </div>
      </div>
    );
  }

  // RECOVERY — catch-all for any unmatched phase/state combination
  // This should never appear in normal use, but prevents black screens
  return (
    <div style={{ minHeight:"100vh", background:"#091a35", color:"#f0e6cc", fontFamily:"Georgia,serif", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ textAlign:"center", padding:"3rem 1.5rem", maxWidth:480 }}>
        <div style={{ fontSize:9, letterSpacing:"0.3em", color:"#b8963e", fontFamily:"sans-serif", marginBottom:16 }}>THE INTERNATIONAL LOVER™</div>
        <div style={{ fontSize:18, color:"#d4af6a", marginBottom:12 }}>Something interrupted your session.</div>
        <p style={{ fontSize:13, color:"#8a7a5a", fontFamily:"sans-serif", lineHeight:1.7, marginBottom:28 }}>Your progress has been preserved. Return to the map to continue from where you left off.</p>
        <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
          <button onClick={() => { setPhase("map"); setActiveRegion(null); setSelectedWoman(null); setOutcome(null); setChoiceHistory([]); setScenarioStep(0); }} style={{ padding:"12px 24px", background:"#b8963e", color:"#0f2347", border:"none", cursor:"pointer", fontSize:12, fontWeight:700, fontFamily:"sans-serif", borderRadius:"20px" }}>
            Return to Map →
          </button>
          <button onClick={onBack} style={{ padding:"12px 24px", background:"transparent", color:"#b8963e", border:"1px solid #b8963e", cursor:"pointer", fontSize:12, fontFamily:"sans-serif", borderRadius:"20px" }}>
            ← Library
          </button>
        </div>
      </div>
    </div>
  );
}


function GoldDivider() {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:12, margin:"0 auto", maxWidth:400 }}>
      <div style={{ flex:1, height:"0.5px", background:`linear-gradient(to right, transparent, ${C.gold})` }} />
      <div style={{ color:C.gold, fontSize:14 }}>✦</div>
      <div style={{ flex:1, height:"0.5px", background:`linear-gradient(to left, transparent, ${C.gold})` }} />
    </div>
  );
}

function Eyebrow({ children }) {
  return <div style={{ fontSize:9, letterSpacing:"0.3em", textTransform:"uppercase", color:C.gold, marginBottom:12, fontFamily:"sans-serif" }}>{children}</div>;
}

function ILShield({ size=48 }) {
  return (
    <svg viewBox="0 0 60 72" width={size} style={{ display:"block" }}>
      <path d="M30 2 L54 10 L54 38 C54 54 43 64 30 70 C17 64 6 54 6 38 L6 10 Z" fill="none" stroke={C.gold} strokeWidth="1.5"/>
      <path d="M30 8 L50 15 L50 38 C50 52 40 61 30 66 C20 61 10 52 10 38 L10 15 Z" fill={C.dark} stroke={C.goldDim} strokeWidth="0.75"/>
      <text x="30" y="42" textAnchor="middle" fill={C.gold} fontSize="14" fontFamily="sans-serif" fontWeight="700" letterSpacing="1">IL</text>
      <text x="30" y="10" textAnchor="middle" fill={C.gold} fontSize="10">✦</text>
      <text x="14" y="55" textAnchor="middle" fill={C.goldDim} fontSize="7">✦</text>
      <text x="46" y="55" textAnchor="middle" fill={C.goldDim} fontSize="7">✦</text>
    </svg>
  );
}

function StampRing({ label, size=72, active=false, onClick }) {
  return (
    <div onClick={onClick} style={{ display:"inline-flex", flexDirection:"column", alignItems:"center", justifyContent:"center", width:size, height:size, borderRadius:"50%", border:`1.5px ${active?"solid":"dashed"} ${C.gold}`, background:active?`rgba(184,150,62,0.12)`:"transparent", cursor:"pointer", transition:"all 0.3s", opacity:active?1:0.28 }}>
      <div style={{ fontSize:active?7:6.5, color:C.gold, fontFamily:"sans-serif", letterSpacing:"0.06em", textAlign:"center", lineHeight:1.35 }}>{label}</div>
    </div>
  );
}

export default function InternationalLover() {
  const [view, setView] = useState("landing");
  const [hasAccess, setHasAccess] = useState(false);
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [leadEmail, setLeadEmail] = useState("");
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadMsg, setLeadMsg] = useState("");
  const [leadSending, setLeadSending] = useState(false);
  const [freePreviewOpen, setFreePreviewOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");
  const [sending, setSending] = useState(false);
  const [stampedRegions, setStampedRegions] = useState([]);
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const [speaking, setSpeaking] = useState(false);
  const [progress, setProgress] = useState({});
  const [activeResource, setActiveResource] = useState(null);

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100);
    const access = sessionStorage.getItem("il_access");
    const womenAccess = sessionStorage.getItem("il_women_access");
    if (access === "true") { setHasAccess(true); setView("library"); }
    // Women only get matrimonial — redirect them there directly
    if (womenAccess === "true" && access !== "true") {
      window.location.replace("/matrimonial");
      return;
    }
    const saved = sessionStorage.getItem("il_progress");
    if (saved) setProgress(JSON.parse(saved));
  }, []);

  const grantAccess = () => {
    sessionStorage.setItem("il_access", "true");
    setHasAccess(true);
    setPaywallOpen(false);
    setView("library");
  };

  const stampRegion = (id) => { if (!stampedRegions.includes(id)) setStampedRegions(p => [...p, id]); };

  const handleLeadSubmit = async () => {
    if (!leadEmail || !leadEmail.includes("@")) { setLeadMsg("Please enter a valid email address."); return; }
    setLeadSending(true); setLeadMsg("");
    try {
      const res = await fetch("/api/lead-magnet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: leadEmail }),
      });
      const data = await res.json();
      if (data.ok) { setLeadSubmitted(true); }
      else { setLeadMsg(data.error || "Something went wrong. Please try again."); }
    } catch { setLeadMsg("Something went wrong. Please try again."); }
    setLeadSending(false);
  };

  const handleEmailSubmit = async () => {
    if (!email.trim()) { setMsg("Please enter your email address."); return; }
    setSending(true); setMsg("");
    try {
      const res = await fetch("/api/send-magic-link", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ email:email.trim().toLowerCase() }) });
      const data = await res.json();
      if (data.sent) {
        if (typeof window !== "undefined") sessionStorage.setItem("il_email", email.trim().toLowerCase());
        setMsg("Your access link has been sent to " + email + ". Check your inbox.");
      }
      else setMsg(data.error || "No purchase found. Please enroll below or use your access code.");
    } catch { setMsg("Connection error. Please try again."); }
    finally { setSending(false); }
  };

  const handleCodeSubmit = async () => {
    const upper = code.trim().toUpperCase();
    if (FREE_CODES[upper]) {
      if (ADMIN_CODES[upper] && typeof window !== "undefined") {
        sessionStorage.setItem("il_admin_session", "true");
        sessionStorage.setItem("il_email", "amin@theinternationallover.com");
      }
      grantAccess(); return;
    }
    if (typeof window !== "undefined" && checkTimedCode(upper)) {
      const hours = TIMED_CODES[upper];
      sessionStorage.setItem("il_access", "true");
      sessionStorage.setItem("il_access_note", upper + " — expires in " + hours + " hours");
      setHasAccess(true);
      setPaywallOpen(false);
      setView("library");
      return;
    }
    // Check ambassador codes
    if (upper.startsWith("AMB_")) {
      try {
        const res = await fetch("/api/ambassadors?action=check&code=" + upper);
        const data = await res.json();
        if (data.valid) {
          sessionStorage.setItem("il_access", "true");
          sessionStorage.setItem("il_ambassador", "true");
          sessionStorage.setItem("il_ambassador_name", data.name || "");
          setHasAccess(true);
          setPaywallOpen(false);
          setView("library");
          return;
        }
      } catch(e) {}
    }
    setMsg("Invalid access code. Please try again.");
  };

  const stopSpeech = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) { window.speechSynthesis.cancel(); }
    setSpeaking(false);
  };

  const speak = (text) => {
    if (typeof window === "undefined" || !window.speechSynthesis) { alert("Your browser does not support read-aloud."); return; }
    stopSpeech();
    const utt = new SpeechSynthesisUtterance(text);
    utt.rate = 0.92; utt.pitch = 1.0;
    utt.onend = () => setSpeaking(false);
    window.speechSynthesis.speak(utt);
    setSpeaking(true);
  };

  const saveProgress = (chIdx) => {
    const updated = { ...progress, book: chIdx };
    setProgress(updated);
    sessionStorage.setItem("il_progress", JSON.stringify(updated));
  };

  useEffect(() => {
    window.scrollTo({ top:0, behavior:"instant" });
  }, [view, activeChapter]);

  if (view === "course") {
    if (typeof window !== "undefined") window.location.href = "/course";
    return null;
  }

  if (view === "reader") {
    const chapter = BOOK_CHAPTERS[activeChapter];
    const isFirst = activeChapter === 0;
    const isLast = activeChapter === BOOK_CHAPTERS.length - 1;
    return (
      <div style={{ minHeight:"100vh", background:C.dark, color:C.creamDim, fontFamily:"Georgia, serif" }}>
        <div style={{ background:C.navyDeep, borderBottom:`1px solid ${C.border}`, padding:"1rem 1.5rem", display:"flex", alignItems:"center", gap:"1rem", flexWrap:"wrap" }}>
          <button onClick={() => { stopSpeech(); setView("library"); }} style={{ background:"none", border:`1px solid ${C.gold}`, color:C.gold, padding:"6px 14px", borderRadius:"20px", cursor:"pointer", fontSize:"13px", fontFamily:"sans-serif" }}>← Library</button>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:"11px", color:C.muted, letterSpacing:"0.15em", textTransform:"uppercase", fontFamily:"sans-serif" }}>The International Lover™ · {chapter.section}</div>
            <div style={{ fontSize:"15px", color:C.goldLight }}>Chapter {chapter.id} — {chapter.title}</div>
          </div>
          <button onClick={() => speaking ? stopSpeech() : speak(chapter.content)} style={{ background:speaking?C.gold:"transparent", border:`1px solid ${C.gold}`, color:speaking?C.dark:C.gold, padding:"6px 16px", borderRadius:"20px", cursor:"pointer", fontSize:"13px", fontFamily:"sans-serif" }}>
            {speaking ? "⏹ Stop" : "▶ Read Aloud"}
          </button>
        </div>
        <div style={{ maxWidth:"720px", margin:"0 auto", padding:"3rem 1.5rem" }}>
          <div style={{ fontSize:"11px", color:C.muted, letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:"0.5rem", fontFamily:"sans-serif" }}>Chapter {activeChapter + 1} of {BOOK_CHAPTERS.length}</div>
          <h1 style={{ color:C.goldLight, fontSize:"clamp(1.4rem, 3vw, 2rem)", marginBottom:"2.5rem", fontWeight:"normal" }}>{chapter.title}</h1>
          {chapter.content.split("  ").map((para, i) => (
            <p key={i} style={{ lineHeight:1.9, marginBottom:"1.5rem", color:C.creamDim, fontSize:"clamp(15px, 2vw, 17px)", fontFamily:"sans-serif" }}>{para}</p>
          ))}
          <div style={{ display:"flex", justifyContent:"space-between", marginTop:"4rem", paddingTop:"2rem", borderTop:`1px solid ${C.border}` }}>
            <button onClick={() => { stopSpeech(); if (!isFirst) { saveProgress(activeChapter - 1); setActiveChapter(activeChapter - 1); } }} disabled={isFirst} style={{ background:"none", border:`1px solid ${isFirst?C.border:C.gold}`, color:isFirst?C.border:C.gold, padding:"10px 20px", borderRadius:"20px", cursor:isFirst?"default":"pointer", fontSize:"14px", fontFamily:"sans-serif" }}>← Previous</button>
            {!isLast ? (
              <button onClick={() => { stopSpeech(); saveProgress(activeChapter + 1); setActiveChapter(activeChapter + 1); }} style={{ background:C.gold, border:"none", color:C.dark, padding:"10px 24px", borderRadius:"20px", cursor:"pointer", fontSize:"14px", fontWeight:"bold", fontFamily:"sans-serif" }}>Next Chapter →</button>
            ) : (
              <button onClick={() => { stopSpeech(); setView("library"); }} style={{ background:C.green, border:"none", color:C.white, padding:"10px 24px", borderRadius:"20px", cursor:"pointer", fontSize:"14px", fontFamily:"sans-serif" }}>✓ Complete</button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── RESOURCE READER ──
  if (view === "resource" && activeResource) {
    const mod = activeResource;
    return (
      <div style={{ minHeight:"100vh", background:C.dark, color:C.cream, fontFamily:"Georgia,serif" }}>
        <div style={{ background:C.navyDeep, borderBottom:"1px solid " + C.border, padding:"1rem 1.5rem", display:"flex", alignItems:"center", gap:"1rem", flexWrap:"wrap" }}>
          <button onClick={() => { stopSpeech(); setView("library"); }} style={{ background:"none", border:"1px solid " + C.gold, color:C.gold, padding:"6px 14px", borderRadius:"20px", cursor:"pointer", fontSize:"13px", fontFamily:"sans-serif" }}>← Library</button>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:"11px", color:C.muted, letterSpacing:"0.15em", textTransform:"uppercase", fontFamily:"sans-serif" }}>Resource Library</div>
            <div style={{ fontSize:"15px", color:C.goldLight }}>{mod.title}</div>
          </div>
          <button onClick={() => { const text = mod.intro + " " + mod.sections.map(s => s.heading + ". " + s.body).join(" "); speaking ? stopSpeech() : speak(text); }} style={{ background:speaking?C.gold:"transparent", border:"1px solid " + C.gold, color:speaking?C.dark:C.gold, padding:"6px 16px", borderRadius:"20px", cursor:"pointer", fontSize:"13px", fontFamily:"sans-serif" }}>{speaking ? "⏹ Stop" : "▶ Read Aloud"}</button>
        </div>
        <div style={{ maxWidth:"720px", margin:"0 auto", padding:"3rem 1.5rem" }}>
          <div style={{ background:C.navyDeep, border:"1px solid " + C.border, borderLeft:"3px solid " + C.gold, padding:"1.5rem", marginBottom:"2.5rem" }}>
            <div style={{ fontSize:9, letterSpacing:"0.2em", color:C.gold, fontFamily:"sans-serif", marginBottom:10 }}>FROM THE AUTHOR</div>
            <p style={{ fontSize:"clamp(14px,2vw,16px)", color:C.cream, lineHeight:1.9, fontFamily:"Georgia,serif", margin:0 }}>{mod.intro}</p>
          </div>
          {mod.sections.map((s, i) => (
            <div key={i} style={{ marginBottom:"2.5rem" }}>
              <div style={{ fontSize:13, color:C.gold, fontFamily:"sans-serif", fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:12, paddingBottom:8, borderBottom:"1px solid " + C.border }}>{s.heading}</div>
              {s.body.split("\n\n").map((para, j) => (
                <p key={j} style={{ fontSize:"clamp(13px,1.8vw,15px)", color:C.creamDim, lineHeight:1.9, marginBottom:"1rem", fontFamily:"sans-serif" }}>{para}</p>
              ))}
            </div>
          ))}
          <div style={{ display:"flex", gap:10, marginTop:"3rem", paddingTop:"2rem", borderTop:"1px solid " + C.border }}>
            {RESOURCE_MODULES.findIndex(m => m.id === mod.id) > 0 && (
              <button onClick={() => { stopSpeech(); const idx = RESOURCE_MODULES.findIndex(m => m.id === mod.id); setActiveResource(RESOURCE_MODULES[idx-1]); window.scrollTo({top:0,behavior:"instant"}); }} style={{ background:"none", border:"1px solid " + C.gold, color:C.gold, padding:"10px 20px", borderRadius:"20px", cursor:"pointer", fontSize:"14px", fontFamily:"sans-serif" }}>← Previous</button>
            )}
            {RESOURCE_MODULES.findIndex(m => m.id === mod.id) < RESOURCE_MODULES.length - 1 && (
              <button onClick={() => { stopSpeech(); const idx = RESOURCE_MODULES.findIndex(m => m.id === mod.id); setActiveResource(RESOURCE_MODULES[idx+1]); window.scrollTo({top:0,behavior:"instant"}); }} style={{ background:C.gold, border:"none", color:C.dark, padding:"10px 24px", borderRadius:"20px", cursor:"pointer", fontSize:"14px", fontWeight:"bold", fontFamily:"sans-serif" }}>Next Module →</button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── LIBRARY ──
  if (view === "library") {
    const lastChapter = progress.book || 0;
    const pct = Math.round((lastChapter / BOOK_CHAPTERS.length) * 100);
    return (
      <div style={{ minHeight:"100vh", background:C.dark, color:C.cream, fontFamily:"Georgia, serif" }}>
        <div style={{ background:C.navyDeep, borderBottom:`1px solid ${C.border}`, padding:"1rem 1.5rem", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"0.5rem" }}>
          <div>
            <div style={{ fontSize:"11px", color:C.muted, letterSpacing:"0.2em", textTransform:"uppercase", fontFamily:"sans-serif" }}>The International Lover™</div>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <div style={{ color:C.goldLight, fontSize:"16px" }}>Your Library</div>
              {typeof window !== "undefined" && sessionStorage.getItem("il_ambassador") === "true" && (
                <div style={{ background:C.gold, color:C.navyDeep, fontSize:8, fontWeight:700, padding:"2px 8px", fontFamily:"sans-serif", letterSpacing:"0.1em" }}>AMBASSADOR</div>
              )}
            </div>
          </div>
          <div style={{ display:"flex", gap:"0.75rem", flexWrap:"wrap" }}>
            <a href="/matrimonial" style={{ background:C.gold, color:C.navyDeep, padding:"6px 16px", borderRadius:"20px", cursor:"pointer", fontSize:"12px", fontWeight:700, fontFamily:"sans-serif", textDecoration:"none" }}>Matrimonial</a>
            {typeof window !== "undefined" && sessionStorage.getItem("il_admin_session") === "true" && (
              <a href="/matrimonial?admin=1" style={{ background:"none", border:`1px solid ${C.gold}`, color:C.gold, padding:"6px 14px", borderRadius:"20px", cursor:"pointer", fontSize:"12px", fontFamily:"sans-serif", textDecoration:"none" }}>Admin</a>
            )}
            <button onClick={() => { sessionStorage.clear(); setHasAccess(false); setView("landing"); }} style={{ background:"none", border:`1px solid ${C.border}`, color:C.muted, padding:"6px 14px", borderRadius:"20px", cursor:"pointer", fontSize:"12px", fontFamily:"sans-serif" }}>Sign Out</button>
          </div>
        </div>
        <div style={{ maxWidth:"900px", margin:"0 auto", padding:"2rem 1.5rem" }}>
          <div onClick={() => window.location.href = "/community"} style={{ background:C.navyDeep, border:"1px solid #1e3a6e", padding:"1.5rem", marginBottom:"1rem", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
            <div>
              <div style={{ fontSize:9, letterSpacing:"0.2em", color:C.gold, fontFamily:"sans-serif", marginBottom:4 }}>THE CONSULATE</div>
              <div style={{ fontSize:16, color:C.goldLight, fontFamily:"Georgia,serif", marginBottom:4 }}>Community Forum</div>
              <div style={{ fontSize:12, color:C.creamDim, fontFamily:"sans-serif" }}>Author posts · Member threads · Discussion behind the paywall</div>
            </div>
            <div style={{ padding:"10px 20px", background:"transparent", border:"1px solid #b8963e", color:C.gold, fontSize:12, fontWeight:700, fontFamily:"sans-serif" }}>Enter →</div>
          </div>

                    <div onClick={() => window.location.href = "/course"} style={{ background:`linear-gradient(135deg, ${C.navyDeep}, ${C.navy})`, border:`2px solid ${C.gold}`, padding:"2rem", marginBottom:"1rem", cursor:"pointer", position:"relative", boxShadow:`0 4px 24px rgba(184,150,62,0.2)` }}>
            <div style={{ position:"absolute", top:12, right:16, fontSize:20, color:C.gold, opacity:0.4 }}>✦</div>
            <div style={{ fontSize:9, letterSpacing:"0.3em", color:C.gold, fontFamily:"sans-serif", marginBottom:8 }}>THE COURSE</div>
            <div style={{ fontSize:"clamp(20px,3vw,26px)", color:C.goldLight, fontFamily:"Georgia,serif", marginBottom:8 }}>Find Her. Meet Her. Vet Her.</div>
            <div style={{ fontSize:12, color:C.creamDim, fontFamily:"sans-serif", marginBottom:16, lineHeight:1.65 }}>Six regions · Twenty-two virtual women representing a broad demographic of potential mates · Branching scenarios · All five possible endings · Certificate of Commission</div>
            <div style={{ display:"inline-block", padding:"10px 28px", background:C.gold, color:C.navyDeep, fontSize:13, fontWeight:700, letterSpacing:"0.1em", fontFamily:"sans-serif" }}>Enter the Course →</div>
          </div>

          <h2 style={{ color:C.goldLight, fontSize:"1rem", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"1.25rem", fontWeight:"normal", fontFamily:"sans-serif" }}>The Book</h2>
          <div style={{ background:C.navyDeep, border:`1px solid ${C.border}`, borderRadius:"12px", overflow:"hidden", marginBottom:"2.5rem" }}>
            <div style={{ display:"flex", gap:"1.5rem", padding:"1.5rem", flexWrap:"wrap" }}>
              <img src="/cover.jpg" alt="The International Lover" style={{ width:120, height:"auto", borderRadius:4, flexShrink:0 }} />
              <div style={{ flex:1, minWidth:200 }}>
                <div style={{ color:C.goldLight, fontWeight:"bold", fontSize:"16px", marginBottom:4 }}>The International Lover™</div>
                <div style={{ color:C.muted, fontSize:"12px", marginBottom:12, fontFamily:"sans-serif" }}>17 Chapters · Full Text with Read-Aloud</div>
                <div style={{ marginBottom:"1rem" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:"11px", color:C.muted, marginBottom:"4px", fontFamily:"sans-serif" }}><span>Progress</span><span>{pct}%</span></div>
                  <div style={{ height:"4px", background:C.border, borderRadius:"2px" }}>
                    <div style={{ width:pct + "%", height:"100%", background:C.gold, borderRadius:"2px" }} />
                  </div>
                </div>
                <button onClick={() => { setActiveChapter(lastChapter); setView("reader"); }} style={{ background:C.gold, color:C.dark, border:"none", padding:"10px 20px", borderRadius:"8px", cursor:"pointer", fontSize:"13px", fontWeight:"bold", fontFamily:"sans-serif" }}>
                  {lastChapter === 0 ? "Begin Reading →" : `Continue — Chapter ${lastChapter + 1}`}
                </button>
              </div>
            </div>
            <div style={{ borderTop:`1px solid ${C.border}`, maxHeight:"280px", overflowY:"auto" }}>
              {BOOK_CHAPTERS.map((ch, i) => (
                <button key={ch.id} onClick={() => { setActiveChapter(i); setView("reader"); }} style={{ display:"flex", alignItems:"center", gap:"8px", width:"100%", background:"none", border:"none", textAlign:"left", padding:"10px 1.5rem", cursor:"pointer", borderBottom:`1px solid ${C.border}`, color:i <= lastChapter ? C.cream : C.muted, fontSize:"13px", fontFamily:"Georgia, serif" }}>
                  <span style={{ color:i < lastChapter ? C.green : C.muted, fontSize:"12px", width:"20px", flexShrink:0, fontFamily:"sans-serif" }}>{i < lastChapter ? "✓" : (i + 1) + "."}</span>
                  <span style={{ fontSize:"9px", color:C.goldDim, fontFamily:"sans-serif", marginRight:6, whiteSpace:"nowrap" }}>{ch.section}</span>
                  {ch.title}
                </button>
              ))}
            </div>
          </div>
          <h2 style={{ color:C.goldLight, fontSize:"1rem", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"1.25rem", fontWeight:"normal", fontFamily:"sans-serif" }}>Resource Library</h2>
          {/* Matrimonial Platform Card */}
          <div style={{ background:"linear-gradient(135deg, #0f2347, #1a3a6b)", border:"2px solid " + C.gold, padding:"1.25rem 1.5rem", marginBottom:"1.5rem", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
            <div>
              <div style={{ fontSize:9, letterSpacing:"0.2em", color:C.gold, fontFamily:"sans-serif", marginBottom:4 }}>✦ NOW LIVE</div>
              <div style={{ fontSize:15, color:C.goldLight, marginBottom:4 }}>Matrimonial Platform</div>
              <div style={{ fontSize:12, color:C.muted, fontFamily:"sans-serif" }}>Browse real profiles · Create your listing · Connect with serious partners</div>
            </div>
            <a href="/matrimonial" style={{ background:C.gold, color:C.navyDeep, padding:"10px 20px", cursor:"pointer", fontSize:12, fontWeight:700, fontFamily:"sans-serif", textDecoration:"none", whiteSpace:"nowrap" }}>Enter Platform →</a>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(220px,1fr))", gap:10, marginBottom:"2.5rem" }}>
            {RESOURCE_MODULES.map((mod, i) => (
              <div key={mod.id} onClick={() => { setActiveResource(mod); setView("resource"); }} style={{ background:C.navyDeep, border:"1px solid " + C.border, padding:"1rem", cursor:"pointer" }}>
                <div style={{ fontSize:9, color:C.goldDim, fontFamily:"sans-serif", letterSpacing:"0.1em", marginBottom:4 }}>MODULE {String(i+1).padStart(2,"0")}</div>
                <div style={{ fontSize:13, color:C.goldLight, fontFamily:"Georgia,serif" }}>{mod.title}</div>
              </div>
            ))}
          </div>

          <h2 style={{ color:C.goldLight, fontSize:"1rem", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"1.25rem", fontWeight:"normal", fontFamily:"sans-serif" }}>Request a Briefing</h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(200px,1fr))", gap:"1rem" }}>
            {CONSULTATIONS.map(c => (
              <div key={c.label} style={{ background:C.navyDeep, border:`1px solid ${C.border}`, borderRadius:"10px", padding:"1.25rem" }}>
                <div style={{ color:C.cream, fontWeight:"bold", fontSize:"14px", marginBottom:4 }}>{c.label}</div>
                <div style={{ color:C.muted, fontSize:"12px", marginBottom:12, fontFamily:"sans-serif" }}>{c.duration}</div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <div>
                    <div style={{ color:C.mutedDark, fontSize:"11px", textDecoration:"line-through", fontFamily:"sans-serif" }}>${c.pub} public</div>
                    <div style={{ color:C.green, fontWeight:"bold", fontSize:"15px" }}>${c.mem} member</div>
                  </div>
                  <a href={c.stripe} style={{ background:C.dark, color:C.gold, border:`1px solid ${C.gold}`, padding:"6px 14px", borderRadius:"16px", cursor:"pointer", fontSize:"12px", textDecoration:"none", fontFamily:"sans-serif" }}>Book</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── LANDING ──
  return (
    <div style={{ minHeight:"100vh", background:C.dark, color:C.cream, fontFamily:"Georgia, serif", overflowX:"hidden" }}>

      <section style={{ background:`linear-gradient(180deg, ${C.navyDeep} 0%, ${C.navy} 55%, ${C.navyDeep} 100%)`, padding:"4rem 1.5rem 5rem", textAlign:"center", position:"relative", overflow:"hidden", borderBottom:`1px solid ${C.border}` }}>
        <div style={{ position:"absolute", top:"35%", left:"50%", transform:"translate(-50%,-50%)", width:600, height:600, borderRadius:"50%", background:`radial-gradient(circle, rgba(184,150,62,0.06) 0%, transparent 70%)`, pointerEvents:"none" }} />
        <div style={{ fontSize:11, letterSpacing:"0.5em", color:C.goldLight, fontFamily:"sans-serif", fontWeight:700, marginBottom:"2.5rem", textTransform:"uppercase", opacity:heroVisible?1:0, transition:"opacity 1s ease" }}>PASSPORT</div>
        <div style={{ display:"inline-block", position:"relative", width:"min(280px,74vw)", marginBottom:"2.5rem", opacity:heroVisible?1:0, transform:heroVisible?"translateY(0)":"translateY(20px)", transition:"opacity 1.2s ease 0.3s, transform 1.2s ease 0.3s" }}>
          <div style={{ position:"absolute", inset:-8, border:`1px solid rgba(184,150,62,0.2)`, pointerEvents:"none" }} />
          <div style={{ position:"absolute", inset:-16, border:`0.5px solid rgba(184,150,62,0.08)`, pointerEvents:"none" }} />
          <img src="/cover.jpg" alt="The International Lover" style={{ width:"100%", height:"auto", display:"block", boxShadow:`0 32px 80px rgba(0,0,0,0.8), 0 0 0 1px ${C.borderGold}` }} />
        </div>
        <div style={{ opacity:heroVisible?1:0, transition:"opacity 1s ease 0.9s" }}>
          <GoldDivider />
          <p style={{ fontSize:"clamp(15px,2.5vw,19px)", color:C.cream, lineHeight:1.8, fontStyle:"italic", maxWidth:480, margin:"1.75rem auto" }}>"Most men inherit their circumstances.<br />A few choose something better."</p>
          <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
            <button onClick={() => setPaywallOpen(true)} style={{ padding:"14px 36px", background:C.gold, color:C.navyDeep, border:"none", cursor:"pointer", fontSize:12, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", fontFamily:"sans-serif", boxShadow:`0 4px 24px rgba(184,150,62,0.35)` }}>Apply for Your Passport</button>
            <button onClick={() => document.getElementById("about").scrollIntoView({ behavior:"smooth" })} style={{ padding:"14px 36px", background:"transparent", color:C.gold, border:`1px solid ${C.gold}`, cursor:"pointer", fontSize:12, letterSpacing:"0.15em", textTransform:"uppercase", fontFamily:"sans-serif" }}>Learn More</button>
          </div>
        </div>
        <div style={{ position:"absolute", bottom:28, left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:6, opacity:0.35 }}>
          <div style={{ fontSize:9, letterSpacing:"0.2em", color:C.gold, fontFamily:"sans-serif" }}>SCROLL</div>
          <div style={{ width:1, height:36, background:`linear-gradient(to bottom, ${C.gold}, transparent)` }} />
        </div>
      </section>

      {/* Matrimonial Platform Section */}
      <section id="about" style={{ background:C.navyDeep, padding:"5rem 1.5rem", textAlign:"center", borderBottom:`1px solid ${C.border}` }}>
        <div style={{ maxWidth:700, margin:"0 auto" }}>
          <Eyebrow>The Journey</Eyebrow>
          <h2 style={{ fontSize:"clamp(20px,3.5vw,30px)", color:C.goldLight, fontWeight:"normal", lineHeight:1.4, marginBottom:"1.75rem" }}>He flew abroad alone.<br />He came back with a wife.</h2>
          <GoldDivider />
          <div style={{ margin:"2.5rem 0" }}>
            <p style={{ fontSize:"clamp(13px,1.8vw,15px)", color:C.creamDim, lineHeight:2, marginBottom:"1.25rem", fontFamily:"sans-serif" }}>In 2015, he flew to North Africa alone. Prepared — the culture, the language, the family structure, the legal process. Six months after meeting her, she was in America. Married within 48 hours of her arrival.</p>
            <p style={{ fontSize:"clamp(13px,1.8vw,15px)", color:C.creamDim, lineHeight:2, marginBottom:"1.25rem", fontFamily:"sans-serif" }}>She was half his age. She was virtuous. She was traditional. She was everything the American culture said did not exist.</p>
            <p style={{ fontSize:"clamp(13px,1.8vw,15px)", color:C.cream, lineHeight:2, fontStyle:"italic" }}>He wrote the book on how he did it. Now he has built the platform that teaches what the book could not show.</p>
          </div>
          <GoldDivider />
          <div style={{ marginTop:"1.5rem", fontSize:12, color:C.muted, fontFamily:"sans-serif", letterSpacing:"0.05em" }}>The International Lover™ · info@theinternationallover.com</div>
        </div>
      </section>

      <section style={{ background:C.navy, padding:"5rem 1.5rem", borderBottom:`1px solid ${C.border}` }}>
        <div style={{ maxWidth:860, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"3.5rem" }}>
            <Eyebrow>What You Are Entering</Eyebrow>
            <h2 style={{ fontSize:"clamp(20px,3vw,28px)", color:C.goldLight, fontWeight:"normal" }}>Three layers. One destination.</h2>
          </div>
          {[
            { num:"01", title:"The Book", sub:"17 Chapters · Read-Aloud · Full Text", icon:"📖", body:"The complete text of The International Lover — every chapter available with read-aloud. Your orientation. Your briefing. Your first pages. Every man reads it before the course unlocks." },
            { num:"02", title:"The Course", sub:"Six Regions · Twenty-Two Virtual Women · Branching Scenarios", icon:"🗺", body:"A virtual simulation set on a real world map. Six regions. Twenty-two virtual women representing a broad demographic of potential mates. Every decision branches the story — first contact, the family meeting, fraud detection, the immigration process, life after she arrives. Complete all six regions and earn your certificate." },
            { num:"03", title:"The Consulate", sub:"Community · Regional Subgroups · Intelligence", icon:"🏛", body:"A private community of men on the same path. Five regional subgroups. Matrimonial site reviews. Country-specific intelligence. Fraud warning threads. Success story archives." },
          ].map((l,i) => (
            <div key={l.num} style={{ display:"flex", gap:24, padding:"2rem", background:C.navyDeep, border:`1px solid ${C.border}`, borderLeft:`3px solid ${C.gold}`, flexWrap:"wrap", marginBottom:i<2?16:0 }}>
              <div style={{ fontSize:36, flexShrink:0 }}>{l.icon}</div>
              <div style={{ flex:1, minWidth:240 }}>
                <div style={{ fontSize:9, letterSpacing:"0.25em", color:C.goldDim, fontFamily:"sans-serif", marginBottom:4 }}>{l.num}</div>
                <div style={{ fontSize:"clamp(16px,2.5vw,20px)", color:C.goldLight, marginBottom:4 }}>{l.title}</div>
                <div style={{ fontSize:10, letterSpacing:"0.12em", color:C.muted, fontFamily:"sans-serif", marginBottom:12 }}>{l.sub}</div>
                <p style={{ fontSize:"clamp(12px,1.7vw,14px)", color:C.creamDim, lineHeight:1.85, margin:0, fontFamily:"sans-serif" }}>{l.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background:C.navyDeep, padding:"5rem 1.5rem", borderBottom:`1px solid ${C.border}` }}>
        <div style={{ maxWidth:860, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"2.5rem" }}>
            <Eyebrow>The Course</Eyebrow>
            <h2 style={{ fontSize:"clamp(20px,3vw,28px)", color:C.goldLight, fontWeight:"normal", marginBottom:12 }}>Six destinations. Twenty-two virtual women. One passport.</h2>
            <p style={{ fontSize:"clamp(12px,1.7vw,14px)", color:C.creamDim, lineHeight:1.85, maxWidth:600, margin:"0 auto", fontFamily:"sans-serif" }}>Twenty-two virtual women representing a broad demographic of potential mates across six regions of the world. Some are genuine. Some are running fraud. Some are genuine and still wrong for you. You will not be told which is which.</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(150px,1fr))", gap:12, marginBottom:"2rem" }}>
            {REGIONS.map(r => (
              <div key={r.id} onClick={() => stampRegion(r.id)} style={{ background:stampedRegions.includes(r.id)?C.navyMid:C.navy, border:`1px solid ${stampedRegions.includes(r.id)?C.gold:C.border}`, padding:"1.25rem 1rem", textAlign:"center", cursor:"pointer", transition:"all 0.3s", boxShadow:stampedRegions.includes(r.id)?`0 0 16px rgba(184,150,62,0.2)`:"none" }}>
                <StampRing label={r.label.toUpperCase().split(" ").join(" ")} size={64} active={stampedRegions.includes(r.id)} />
                <div style={{ fontSize:11, color:stampedRegions.includes(r.id)?C.goldLight:C.cream, marginTop:10, marginBottom:4, fontFamily:"sans-serif" }}>{r.label}</div>
                <div style={{ fontSize:9, color:C.muted, fontFamily:"sans-serif", lineHeight:1.5 }}>{r.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ background:C.navy, border:`1px solid ${C.border}`, padding:"1.5rem", textAlign:"center" }}>
            <div style={{ fontSize:9, letterSpacing:"0.2em", color:C.mutedDark, fontFamily:"sans-serif", marginBottom:12 }}>YOUR PASSPORT STAMP PAGE</div>
            <div style={{ display:"flex", justifyContent:"center", gap:14, flexWrap:"wrap" }}>
              {REGIONS.map(r => <StampRing key={r.id} label={r.label.split(" ").map(w=>w.slice(0,3).toUpperCase()).join(" ")} size={56} active={stampedRegions.includes(r.id)} />)}
            </div>
            <div style={{ fontSize:10, color:C.mutedDark, marginTop:10, fontFamily:"sans-serif" }}>
              {stampedRegions.length === 6 ? "All six regions certified — certificate unlocked ✦" : stampedRegions.length > 0 ? `${stampedRegions.length} of 5 regions stamped` : "Click a region above to preview your stamp page"}
            </div>
          </div>
        </div>
      </section>

      <section style={{ background:C.dark, padding:"5rem 1.5rem", borderBottom:`1px solid ${C.border}` }}>
        <div style={{ maxWidth:1000, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"2.5rem" }}>
            <Eyebrow>The Roster</Eyebrow>
            <h2 style={{ fontSize:"clamp(20px,3vw,28px)", color:C.goldLight, fontWeight:"normal", marginBottom:12 }}>Twenty-two virtual women. Six regions of the world.</h2>
            <p style={{ fontSize:"clamp(12px,1.7vw,14px)", color:C.creamDim, lineHeight:1.85, maxWidth:580, margin:"0 auto", fontFamily:"sans-serif" }}>Each represents a broad demographic of potential mates. Some are genuine. Some are not. Some are genuine and still wrong for you.</p>
          </div>

          <div style={{ marginBottom:"2rem" }}>
            <div style={{ fontSize:9, letterSpacing:"0.25em", color:C.gold, fontFamily:"sans-serif", marginBottom:14, textAlign:"center" }}>NORTH AMERICA</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:12 }}>
              {[
                { id:"aisha",   photo:"/women/aisha.jpg",   name:"Aisha",   age:27, city:"Atlanta, Georgia" },
                { id:"deborah", photo:"/women/deborah.jpg", name:"Deborah", age:29, city:"Washington D.C." },
                { id:"kezia",   photo:"/women/kezia.jpg",   name:"Kezia",   age:26, city:"Houston, Texas" },
                { id:"marisol", photo:"/women/marisol.jpg", name:"Marisol", age:28, city:"Chicago, Illinois" },
                { id:"samira",  photo:"/women/samira.jpg",  name:"Samira",  age:25, city:"Miami, Florida" },
                { id:"nour_us", photo:"/women/nour-us.jpg", name:"Nour",    age:27, city:"Dearborn, Michigan" },
                { id:"rachel",  photo:"/women/rachel.jpg",  name:"Rachel",  age:26, city:"Portland, Oregon" },
              ].map(w => (
                <div key={w.id} style={{ background:C.navyDeep, border:`1px solid ${C.border}`, overflow:"hidden" }}>
                  <div style={{ height:200, overflow:"hidden" }}>
                    <img src={w.photo} alt={w.name} style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top", display:"block" }} />
                  </div>
                  <div style={{ padding:"0.75rem" }}>
                    <div style={{ fontSize:13, color:C.goldLight, fontFamily:"Georgia,serif", marginBottom:2 }}>{w.name}</div>
                    <div style={{ fontSize:10, color:C.muted, fontFamily:"sans-serif" }}>{w.age} · {w.city}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginBottom:"2rem" }}>
            <div style={{ fontSize:9, letterSpacing:"0.25em", color:C.gold, fontFamily:"sans-serif", marginBottom:14, textAlign:"center" }}>SUB-SAHARAN AFRICA</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:12, marginBottom:28 }}>
              {[
                { id:"fatou", name:"Fatou", age:26, city:"Dakar, Senegal" },
                { id:"abena", name:"Abena", age:24, city:"Accra, Ghana" },
                { id:"tigist", name:"Tigist", age:28, city:"Addis Ababa, Ethiopia" },
              ].map(w => (
                <div key={w.id} style={{ background:C.navyDeep, border:`1px solid ${C.border}`, overflow:"hidden" }}>
                  <div style={{ height:200, overflow:"hidden" }}>
                    <img src={w.photo || ("/women/" + w.id.replace(/_/g, "-") + ".jpg")} alt={w.name} style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top", display:"block" }} />
                  </div>
                  <div style={{ padding:"0.75rem" }}>
                    <div style={{ fontSize:13, color:C.goldLight, fontFamily:"Georgia,serif", marginBottom:2 }}>{w.name}</div>
                    <div style={{ fontSize:9, color:C.muted, fontFamily:"sans-serif" }}>{w.age} · {w.city}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ fontSize:9, letterSpacing:"0.25em", color:C.gold, fontFamily:"sans-serif", marginBottom:14, textAlign:"center" }}>NORTH AFRICA</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:12, marginBottom:28 }}>
              {[
                { id:"nadia", name:"Nadia", age:24, city:"Fez, Morocco" },
                { id:"yasmine", name:"Yasmine", age:22, city:"Casablanca, Morocco" },
                { id:"fatima", name:"Fatima-Zahra", age:27, city:"Meknes, Morocco" },
              ].map(w => (
                <div key={w.id} style={{ background:C.navyDeep, border:`1px solid ${C.border}`, overflow:"hidden" }}>
                  <div style={{ height:200, overflow:"hidden" }}>
                    <img src={w.photo || ("/women/" + w.id.replace(/_/g, "-") + ".jpg")} alt={w.name} style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top", display:"block" }} />
                  </div>
                  <div style={{ padding:"0.75rem" }}>
                    <div style={{ fontSize:13, color:C.goldLight, fontFamily:"Georgia,serif", marginBottom:2 }}>{w.name}</div>
                    <div style={{ fontSize:9, color:C.muted, fontFamily:"sans-serif" }}>{w.age} · {w.city}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ fontSize:9, letterSpacing:"0.25em", color:C.gold, fontFamily:"sans-serif", marginBottom:14, textAlign:"center" }}>MIDDLE EAST</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:12, marginBottom:28 }}>
              {[
                { id:"sara", name:"Sara", age:26, city:"Amman, Jordan" },
                { id:"hessa", name:"Hessa", age:23, city:"Beirut, Lebanon" },
                { id:"maryam", name:"Maryam", age:29, city:"Irbid, Jordan" },
              ].map(w => (
                <div key={w.id} style={{ background:C.navyDeep, border:`1px solid ${C.border}`, overflow:"hidden" }}>
                  <div style={{ height:200, overflow:"hidden" }}>
                    <img src={w.photo || ("/women/" + w.id.replace(/_/g, "-") + ".jpg")} alt={w.name} style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top", display:"block" }} />
                  </div>
                  <div style={{ padding:"0.75rem" }}>
                    <div style={{ fontSize:13, color:C.goldLight, fontFamily:"Georgia,serif", marginBottom:2 }}>{w.name}</div>
                    <div style={{ fontSize:9, color:C.muted, fontFamily:"sans-serif" }}>{w.age} · {w.city}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ fontSize:9, letterSpacing:"0.25em", color:C.gold, fontFamily:"sans-serif", marginBottom:14, textAlign:"center" }}>ASIA</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:12, marginBottom:28 }}>
              {[
                { id:"amira", name:"Amira", age:25, city:"Yogyakarta, Indonesia" },
                { id:"jasmine", name:"Jasmine", age:24, city:"Cebu, Philippines" },
                { id:"nurul", name:"Nurul", age:28, city:"Dhaka, Bangladesh" },
              ].map(w => (
                <div key={w.id} style={{ background:C.navyDeep, border:`1px solid ${C.border}`, overflow:"hidden" }}>
                  <div style={{ height:200, overflow:"hidden" }}>
                    <img src={w.photo || ("/women/" + w.id.replace(/_/g, "-") + ".jpg")} alt={w.name} style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top", display:"block" }} />
                  </div>
                  <div style={{ padding:"0.75rem" }}>
                    <div style={{ fontSize:13, color:C.goldLight, fontFamily:"Georgia,serif", marginBottom:2 }}>{w.name}</div>
                    <div style={{ fontSize:9, color:C.muted, fontFamily:"sans-serif" }}>{w.age} · {w.city}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ fontSize:9, letterSpacing:"0.25em", color:C.gold, fontFamily:"sans-serif", marginBottom:14, textAlign:"center" }}>LATIN AMERICA</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:12 }}>
              {[
                { id:"valentina", name:"Valentina", age:27, city:"Medellin, Colombia" },
                { id:"diana", name:"Diana", age:22, city:"Santo Domingo, D.R." },
                { id:"elena", name:"Elena", age:30, city:"Lima, Peru" },
              ].map(w => (
                <div key={w.id} style={{ background:C.navyDeep, border:`1px solid ${C.border}`, overflow:"hidden" }}>
                  <div style={{ height:200, overflow:"hidden" }}>
                    <img src={w.photo || ("/women/" + w.id.replace(/_/g, "-") + ".jpg")} alt={w.name} style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top", display:"block" }} />
                  </div>
                  <div style={{ padding:"0.75rem" }}>
                    <div style={{ fontSize:13, color:C.goldLight, fontFamily:"Georgia,serif", marginBottom:2 }}>{w.name}</div>
                    <div style={{ fontSize:9, color:C.muted, fontFamily:"sans-serif" }}>{w.age} · {w.city}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ textAlign:"center" }}>
            <button onClick={() => setPaywallOpen(true)} style={{ padding:"12px 32px", background:C.gold, color:C.navyDeep, border:"none", cursor:"pointer", fontSize:12, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", fontFamily:"sans-serif" }}>
              Meet Them Inside →
            </button>
          </div>
        </div>
      </section>

            <section style={{ background:C.navy, padding:"5rem 1.5rem", borderBottom:`1px solid ${C.border}` }}>
        <div style={{ maxWidth:740, margin:"0 auto", textAlign:"center" }}>
          <Eyebrow>What Is At Stake</Eyebrow>
          <h2 style={{ fontSize:"clamp(18px,3vw,26px)", color:C.goldLight, fontWeight:"normal", marginBottom:"2rem" }}>Every arc has five possible endings.</h2>
          <GoldDivider />
          <div style={{ marginTop:"2rem", textAlign:"left" }}>
            {[
              { n:"I",   label:"Successful Marriage",                     color:C.gold,    body:"You read the culture correctly. You vetted thoroughly. You navigated the family and the process with patience and integrity. This ending is earned — not given." },
              { n:"II",  label:"Failed Vetting — Pre-Travel",             color:C.goldDim, body:"You caught the fraud early. Profile inconsistencies. Communication patterns. A reverse image search. You walked away before investing more than your time." },
              { n:"III", label:"Failed Relationship — Cultural Misnavigation", color:C.muted, body:"She was genuine. You were not equipped. The relationship collapsed not from fraud but from cultural incompetence. The most instructive ending." },
              { n:"IV",  label:"Fraudulent Marriage — Pre-Citizenship",   color:C.scarlet, body:"You missed the signals. You married her. But you caught it before naturalization. The damage is limited. The debrief is unflinching." },
              { n:"V",   label:"Fraudulent Marriage — Post-Citizenship",  color:"#6b0f0f", body:"The most devastating arc. She received citizenship. She left. There may be a child. This ending exists because it has happened to real men. The course does not hide it." },
            ].map(e => (
              <div key={e.n} style={{ display:"flex", gap:16, alignItems:"flex-start", padding:"1.25rem 1.5rem", background:C.navyDeep, border:`0.5px solid ${C.border}`, borderLeft:`3px solid ${e.color}`, marginBottom:10 }}>
                <div style={{ fontSize:10, color:e.color, fontFamily:"sans-serif", letterSpacing:"0.1em", flexShrink:0, paddingTop:2, minWidth:18 }}>{e.n}</div>
                <div>
                  <div style={{ fontSize:"clamp(12px,1.7vw,14px)", color:C.cream, marginBottom:5 }}>{e.label}</div>
                  <div style={{ fontSize:"clamp(11px,1.5vw,12px)", color:C.creamDim, lineHeight:1.75, fontFamily:"sans-serif" }}>{e.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background:C.navyDeep, padding:"5rem 1.5rem", borderBottom:`1px solid ${C.border}` }}>
        <div style={{ maxWidth:880, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"2.5rem" }}>
            <Eyebrow>The Attaché</Eyebrow>
            <h2 style={{ fontSize:"clamp(18px,3vw,26px)", color:C.goldLight, fontWeight:"normal", marginBottom:12 }}>The complete resource library.</h2>
            <p style={{ fontSize:"clamp(12px,1.7vw,14px)", color:C.creamDim, maxWidth:560, margin:"0 auto", lineHeight:1.85, fontFamily:"sans-serif" }}>Fourteen modules covering everything from your first flight to your children's dual citizenship.</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(260px,1fr))", gap:10 }}>
            {RESOURCES.map((r,i) => (
              <div key={r} style={{ display:"flex", alignItems:"center", gap:12, padding:"0.875rem 1rem", background:C.navy, border:`0.5px solid ${C.border}` }}>
                <div style={{ width:22, height:22, borderRadius:"50%", background:C.borderGold, border:`1px solid ${C.goldDim}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <span style={{ fontSize:8, color:C.gold, fontFamily:"sans-serif" }}>{String(i+1).padStart(2,"0")}</span>
                </div>
                <span style={{ fontSize:"clamp(11px,1.5vw,12px)", color:C.creamDim, fontFamily:"sans-serif" }}>{r}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background:C.navy, padding:"5rem 1.5rem", borderBottom:`1px solid ${C.border}` }}>
        <div style={{ maxWidth:620, margin:"0 auto", textAlign:"center" }}>
          <Eyebrow>The Commission</Eyebrow>
          <h2 style={{ fontSize:"clamp(18px,3vw,24px)", color:C.goldLight, fontWeight:"normal", marginBottom:"2rem" }}>Certificate of The International Lover™</h2>
          <div style={{ background:`linear-gradient(160deg, ${C.navyDeep}, ${C.navy})`, border:`2px solid ${C.gold}`, padding:"3rem 2rem", position:"relative", overflow:"hidden", boxShadow:`0 20px 60px rgba(0,0,0,0.5)` }}>
            <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", pointerEvents:"none" }}>
              <img src="/cover.jpg" style={{ height:"100%", width:"auto", opacity:0.04, objectFit:"cover" }} alt="" />
            </div>
            {["top-left","top-right","bottom-left","bottom-right"].map(p => (
              <div key={p} style={{ position:"absolute", [p.includes("top")?"top":"bottom"]:12, [p.includes("left")?"left":"right"]:14, fontSize:16, color:C.gold, opacity:0.4 }}>✦</div>
            ))}
            <div style={{ position:"relative", zIndex:1 }}>
              <div style={{ fontSize:9, letterSpacing:"0.3em", color:C.muted, fontFamily:"sans-serif", marginBottom:16 }}>THE INTERNATIONAL LOVER™</div>
              <div style={{ display:"flex", justifyContent:"center", margin:"0 auto 16px" }}><ILShield size={56} /></div>
              <div style={{ display:"flex", justifyContent:"center", gap:8, marginBottom:16, flexWrap:"wrap" }}>
                {REGIONS.map(r => <StampRing key={r.id} label={r.label.split(" ").map(w=>w.slice(0,3).toUpperCase()).join(" ")} size={44} active={true} />)}
              </div>
              <GoldDivider />
              <div style={{ marginTop:"1.25rem", fontSize:10, letterSpacing:"0.2em", color:C.muted, fontFamily:"sans-serif", marginBottom:10 }}>CERTIFICATE OF COMMISSION</div>
              <div style={{ fontSize:13, color:C.creamDim, marginBottom:12 }}>This certifies that</div>
              <div style={{ fontSize:"clamp(20px,3.5vw,26px)", fontFamily:"Georgia, serif", color:C.goldLight, fontStyle:"italic", borderBottom:`1px solid ${C.gold}`, paddingBottom:10, marginBottom:14, display:"inline-block", minWidth:220 }}>Your Name</div>
              <p style={{ fontSize:11, color:C.creamDim, lineHeight:1.85, maxWidth:420, margin:"0 auto 16px", fontStyle:"italic", fontFamily:"sans-serif" }}>having demonstrated the knowledge, cultural intelligence, and discernment required — is hereby commissioned to venture forth as an International Lover. All nations: recognize and allow the bearer to pass freely without delay or hindrance.</p>
              <div style={{ fontSize:12, color:C.muted, fontFamily:"sans-serif", letterSpacing:"0.08em" }}>The International Lover™</div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background:C.dark, padding:"5rem 1.5rem", borderBottom:`1px solid ${C.border}` }}>
        <div style={{ maxWidth:940, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"3rem" }}>
            <Eyebrow>Now Live</Eyebrow>
            <h2 style={{ fontSize:"clamp(20px,3vw,30px)", color:C.goldLight, fontWeight:"normal", marginBottom:12 }}>Matrimonial Platform</h2>
            <p style={{ fontSize:"clamp(13px,1.8vw,15px)", color:C.muted, maxWidth:560, margin:"0 auto", lineHeight:1.8, fontFamily:"sans-serif" }}>
              A private platform built for serious men who have done the work. Browse profiles from women across six regions. Create your own listing. Connect through verified channels.
            </p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(220px,1fr))", gap:16, marginBottom:"3rem" }}>
            {[
              { icon:"🌍", title:"Five Regions", desc:"North Africa, Middle East, Asia, Latin America, Sub-Saharan Africa. Real women. Real profiles." },
              { icon:"🔒", title:"Verified Access", desc:"Men must complete the course to contact women. No casual browsers." },
              { icon:"👁", title:"Mutual Browsing", desc:"Men see women. Women see men. Filtering by region, religion, age, and family involvement." },
            ].map(f => (
              <div key={f.title} style={{ background:C.navyDeep, border:`1px solid ${C.border}`, padding:"1.5rem" }}>
                <div style={{ fontSize:28, marginBottom:10 }}>{f.icon}</div>
                <div style={{ color:C.goldLight, fontWeight:"bold", marginBottom:6, fontFamily:"sans-serif", fontSize:14 }}>{f.title}</div>
                <div style={{ color:C.muted, fontSize:12, lineHeight:1.65, fontFamily:"sans-serif" }}>{f.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign:"center" }}>
            <a href="/matrimonial" style={{ display:"inline-block", background:C.gold, color:C.navyDeep, padding:"14px 36px", fontSize:14, fontWeight:700, fontFamily:"sans-serif", textDecoration:"none", cursor:"pointer" }}>
              Enter the Matrimonial Platform →
            </a>
            <div style={{ color:C.muted, fontSize:11, fontFamily:"sans-serif", marginTop:12 }}>Available to all platform members · <a href="/for-women" style={{ display:"inline-block", background:"transparent", border:"1px solid " + C.gold, color:C.gold, padding:"14px 32px", fontSize:14, fontWeight:700, fontFamily:"sans-serif", textDecoration:"none" }}>Women — Join Free →</a></div>
          </div>
        </div>
      </section>

      <section style={{ background:C.navyDeep, padding:"5rem 1.5rem", borderBottom:`1px solid ${C.border}` }}>
        <div style={{ maxWidth:940, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"3rem" }}>
            <Eyebrow>Membership</Eyebrow>
            <h2 style={{ fontSize:"clamp(20px,3vw,28px)", color:C.goldLight, fontWeight:"normal", marginBottom:8 }}>Choose your level of access.</h2>
            <p style={{ fontSize:12, color:C.muted, fontFamily:"sans-serif" }}>Every entry point. Every resource. One discipline.</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(280px,1fr))", gap:18 }}>
            {TIERS.map(t => (
              <div key={t.id} style={{ background:t.highlight?C.navy:C.navyDeep, border:`${t.highlight?"2px":"1px"} solid ${t.highlight?C.gold:C.border}`, padding:"2rem", position:"relative", boxShadow:t.highlight?`0 8px 40px rgba(184,150,62,0.2)`:"none" }}>
                {t.highlight && <div style={{ position:"absolute", top:-11, left:"50%", transform:"translateX(-50%)", background:C.gold, color:C.navyDeep, padding:"3px 16px", fontSize:8, fontWeight:700, letterSpacing:"0.2em", fontFamily:"sans-serif", whiteSpace:"nowrap" }}>✦ RECOMMENDED</div>}
                <div style={{ fontSize:9, letterSpacing:"0.2em", color:C.goldDim, fontFamily:"sans-serif", marginBottom:5 }}>TIER {t.id==="course"?"I":t.id==="complete"?"II":"III"}</div>
                <div style={{ fontSize:"clamp(16px,2.2vw,18px)", color:C.goldLight, marginBottom:4 }}>{t.label}</div>
                <div style={{ fontSize:10, color:C.muted, fontFamily:"sans-serif", marginBottom:18 }}>{t.sublabel}</div>
                <div style={{ fontSize:"clamp(28px,4vw,36px)", color:C.gold, fontWeight:700, marginBottom:3 }}>{t.price}</div>
                <div style={{ fontSize:10, color:C.mutedDark, fontFamily:"sans-serif", marginBottom:20 }}>{t.cycle}</div>
                <div style={{ marginBottom:22 }}>
                  {t.features.map(f => (
                    <div key={f} style={{ display:"flex", gap:8, alignItems:"flex-start", marginBottom:8 }}>
                      <span style={{ color:C.gold, fontSize:9, flexShrink:0, marginTop:3 }}>✦</span>
                      <span style={{ fontSize:"clamp(11px,1.5vw,12px)", color:C.creamDim, lineHeight:1.6, fontFamily:"sans-serif" }}>{f}</span>
                    </div>
                  ))}
                </div>
                <a href={t.stripe} style={{ display:"block", textAlign:"center", padding:"12px", background:t.highlight?C.gold:"transparent", color:t.highlight?C.navyDeep:C.gold, border:`1px solid ${C.gold}`, fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", fontFamily:"sans-serif", textDecoration:"none" }}>
                  {t.id==="course"?"Apply for the Course":t.id==="complete"?"Apply for Complete Access":"Apply for Lifetime Commission"}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background:C.navy, padding:"5rem 1.5rem", borderBottom:`1px solid ${C.border}` }}>
        <div style={{ maxWidth:780, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"2.5rem" }}>
            <Eyebrow>Personal Guidance</Eyebrow>
            <h2 style={{ fontSize:"clamp(18px,3vw,26px)", color:C.goldLight, fontWeight:"normal", marginBottom:12 }}>Request a Briefing.</h2>
            <p style={{ fontSize:"clamp(12px,1.7vw,14px)", color:C.creamDim, lineHeight:1.85, maxWidth:480, margin:"0 auto", fontFamily:"sans-serif" }}>One-on-one with the author. For the decisions the course cannot make for you.</p>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {CONSULTATIONS.map(c => (
              <div key={c.label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"1.25rem 1.5rem", background:C.navyDeep, border:`1px solid ${C.border}`, flexWrap:"wrap", gap:14 }}>
                <div>
                  <div style={{ fontSize:"clamp(13px,1.8vw,15px)", color:C.cream, marginBottom:4 }}>{c.label}</div>
                  <div style={{ fontSize:11, color:C.muted, fontFamily:"sans-serif" }}>{c.duration}</div>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:18 }}>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ fontSize:10, color:C.mutedDark, textDecoration:"line-through", fontFamily:"sans-serif" }}>${c.pub} public</div>
                    <div style={{ fontSize:15, color:C.gold, fontWeight:700 }}>${c.mem} member</div>
                  </div>
                  <a href={c.stripe} style={{ padding:"10px 18px", background:"transparent", color:C.gold, border:`1px solid ${C.gold}`, cursor:"pointer", fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", fontFamily:"sans-serif", textDecoration:"none", whiteSpace:"nowrap" }}>Book Now</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background:C.dark, padding:"5rem 1.5rem", borderBottom:`1px solid ${C.border}` }}>
        <div style={{ maxWidth:680, margin:"0 auto", textAlign:"center" }}>
          <Eyebrow>Free Preview</Eyebrow>
          <h2 style={{ fontSize:"clamp(18px,3vw,26px)", color:C.goldLight, fontWeight:"normal", marginBottom:12 }}>Read Chapter 10 — Free.</h2>
          <p style={{ fontSize:"clamp(12px,1.7vw,14px)", color:C.creamDim, lineHeight:1.85, maxWidth:480, margin:"0 auto 2rem", fontFamily:"sans-serif" }}>Mr. Kevin Samuels launched a movement. He left before he could show men where to go. This chapter picks up exactly where he left off.</p>
          <button onClick={() => setFreePreviewOpen(true)} style={{ padding:"14px 36px", background:C.gold, color:C.navyDeep, border:"none", cursor:"pointer", fontSize:13, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", fontFamily:"sans-serif" }}>Read The Kevin Samuels Effect →</button>
        </div>
      </section>

      <section style={{ background:C.navyDeep, padding:"4rem 1.5rem", borderBottom:`1px solid ${C.border}` }}>
        <div style={{ maxWidth:560, margin:"0 auto", textAlign:"center" }}>
          <Eyebrow>Free Download</Eyebrow>
          <h2 style={{ fontSize:"clamp(17px,2.8vw,24px)", color:C.goldLight, fontWeight:"normal", marginBottom:12 }}>The Vetting Standard</h2>
          <p style={{ fontSize:"clamp(12px,1.7vw,14px)", color:C.creamDim, lineHeight:1.85, marginBottom:"1.75rem", fontFamily:"sans-serif", fontStyle:"italic" }}>How to know she is real before you board the plane.</p>
          <p style={{ fontSize:"clamp(11px,1.5vw,13px)", color:C.muted, lineHeight:1.8, marginBottom:"1.75rem", fontFamily:"sans-serif" }}>Twelve warning signs. Seven vetting tools. Regional intelligence for North Africa, the Middle East, Southeast Asia, Sub-Saharan Africa, and Latin America. Enter your email and receive it now.</p>
          {!leadSubmitted ? (
            <div style={{ display:"flex", flexDirection:"column", gap:8, maxWidth:420, margin:"0 auto" }}>
              <div style={{ display:"flex", gap:8 }}>
                <input type="email" value={leadEmail} onChange={e => setLeadEmail(e.target.value)} onKeyDown={e => e.key==="Enter" && handleLeadSubmit()} placeholder="Your email address" style={{ flex:1, padding:"12px 16px", background:C.dark, border:`1px solid ${C.border}`, color:C.cream, fontSize:13, fontFamily:"sans-serif", outline:"none" }} />
                <button onClick={handleLeadSubmit} disabled={leadSending} style={{ padding:"12px 20px", background:C.gold, color:C.navyDeep, border:"none", cursor:leadSending?"wait":"pointer", fontSize:12, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", fontFamily:"sans-serif", whiteSpace:"nowrap" }}>{leadSending ? "Sending..." : "Get the Guide →"}</button>
              </div>
              {leadMsg && <div style={{ fontSize:12, color:"#c08080", fontFamily:"sans-serif" }}>{leadMsg}</div>}
            </div>
          ) : (
            <div style={{ color:C.gold, fontSize:14, fontFamily:"sans-serif" }}>✓ The guide is on its way to your inbox.</div>
          )}
        </div>
      </section>

      <section style={{ background:C.navyDeep, padding:"4rem 1.5rem", borderTop:`1px solid ${C.border}` }}>
        <div style={{ maxWidth:660, margin:"0 auto", textAlign:"center" }}>
          <Eyebrow>Matrimonial Platform Partners</Eyebrow>
          <h2 style={{ fontSize:"clamp(17px,2.8vw,24px)", color:C.goldLight, fontWeight:"normal", marginBottom:14 }}>Are you a matrimonial platform?</h2>
          <p style={{ fontSize:"clamp(12px,1.7vw,14px)", color:C.creamDim, lineHeight:1.85, marginBottom:24, fontFamily:"sans-serif" }}>We offer white-label integration, a certified badge system for your members' profiles, and a full partner API — entry, exit, and real-time badge updates. Your members arrive prepared. Your platform becomes more trustworthy.</p>
          <a href="mailto:info@theinternationallover.com?subject=Partner Inquiry" style={{ display:"inline-block", padding:"12px 28px", background:"transparent", color:C.gold, border:`1px solid ${C.gold}`, fontSize:11, letterSpacing:"0.15em", textTransform:"uppercase", fontFamily:"sans-serif", textDecoration:"none" }}>Request a Partnership Briefing</a>
        </div>
      </section>

      <section style={{ background:`linear-gradient(180deg, ${C.navyDeep}, ${C.dark})`, padding:"5rem 1.5rem", textAlign:"center" }}>
        <div style={{ maxWidth:520, margin:"0 auto" }}>
          <div style={{ display:"flex", justifyContent:"center", marginBottom:"1.5rem" }}><ILShield size={44} /></div>
          <Eyebrow>The Only Question That Remains</Eyebrow>
          <h2 style={{ fontSize:"clamp(22px,4vw,34px)", color:C.cream, fontWeight:"normal", lineHeight:1.4, marginBottom:"1.5rem" }}>Are you ready to apply?</h2>
          <GoldDivider />
          <p style={{ fontSize:"clamp(13px,1.8vw,15px)", color:C.creamDim, lineHeight:1.85, fontStyle:"italic", margin:"1.75rem 0" }}>"Applying for citizenship in an elite nation."</p>
          <button onClick={() => setPaywallOpen(true)} style={{ padding:"16px 48px", background:C.gold, color:C.navyDeep, border:"none", cursor:"pointer", fontSize:13, fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", fontFamily:"sans-serif", boxShadow:`0 4px 32px rgba(184,150,62,0.4)` }}>Apply for Your Passport</button>
          <div style={{ marginTop:14, fontSize:11, color:C.mutedDark, fontFamily:"sans-serif" }}>Already a member? <span onClick={() => setPaywallOpen(true)} style={{ color:C.gold, cursor:"pointer", textDecoration:"underline" }}>Sign in here</span></div>
        </div>
      </section>

      <footer style={{ background:C.dark, borderTop:`1px solid ${C.border}`, padding:"2rem 1.5rem", textAlign:"center" }}>
        <div style={{ fontSize:9, letterSpacing:"0.25em", color:C.mutedDark, fontFamily:"sans-serif", marginBottom:6 }}>THE INTERNATIONAL LOVER™</div>
        <div style={{ fontSize:10, color:C.mutedDark, fontFamily:"sans-serif", marginBottom:6 }}>info@theinternationallover.com</div>
        <div style={{ fontSize:9, color:"#2a3a5a", fontFamily:"sans-serif" }}>© 2025 The International Lover™ · ASM Productions LLC · All rights reserved</div>
      </footer>

      {freePreviewOpen && (
        <div style={{ position:"fixed", inset:0, background:"rgba(9,26,53,0.97)", zIndex:1000, overflowY:"auto", padding:"2rem 1rem" }}>
          <div style={{ maxWidth:720, margin:"0 auto", background:C.navyDeep, border:`1px solid ${C.gold}`, position:"relative" }}>
            <button onClick={() => setFreePreviewOpen(false)} style={{ position:"absolute", top:12, right:14, background:"none", border:"none", color:C.muted, fontSize:22, cursor:"pointer", zIndex:2 }}>×</button>
            <div style={{ padding:"2.5rem 2rem 1.5rem", borderBottom:`1px solid ${C.border}` }}>
              <div style={{ fontSize:9, letterSpacing:"0.2em", color:C.gold, fontFamily:"sans-serif", marginBottom:6 }}>FREE PREVIEW · CHAPTER 10</div>
              <div style={{ fontSize:"clamp(18px,3vw,24px)", color:C.goldLight, fontFamily:"Georgia,serif", marginBottom:4 }}>The Kevin Samuels Effect</div>
              <div style={{ fontSize:11, color:C.muted, fontFamily:"sans-serif" }}>From The International Lover™</div>
            </div>
            <div style={{ padding:"2rem", maxHeight:"60vh", overflowY:"auto", position:"relative" }}>
              {BOOK_CHAPTERS.find(c => c.id === 10)?.content.split("\n\n").slice(0, 10).map((para, i) => (
                <p key={i} style={{ fontSize:"clamp(13px,1.8vw,15px)", color:C.creamDim, lineHeight:1.9, marginBottom:"1.25rem", fontFamily:"Georgia,serif" }}>{para}</p>
              ))}
              <div style={{ position:"sticky", bottom:0, left:0, right:0, height:100, background:`linear-gradient(to bottom, transparent, ${C.navyDeep})`, pointerEvents:"none" }} />
            </div>
            <div style={{ padding:"1.75rem 2rem", borderTop:`1px solid ${C.border}`, textAlign:"center" }}>
              <div style={{ fontSize:13, color:C.creamDim, fontFamily:"sans-serif", marginBottom:"1.25rem" }}>This is one chapter of seventeen. The full book — and the complete virtual simulation — are inside the platform.</div>
              <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
                <button onClick={() => { setFreePreviewOpen(false); setPaywallOpen(true); }} style={{ padding:"12px 28px", background:C.gold, color:C.navyDeep, border:"none", cursor:"pointer", fontSize:12, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", fontFamily:"sans-serif" }}>Access the Full Platform →</button>
                <button onClick={() => setFreePreviewOpen(false)} style={{ padding:"12px 20px", background:"transparent", color:C.muted, border:`1px solid ${C.border}`, cursor:"pointer", fontSize:12, fontFamily:"sans-serif" }}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {paywallOpen && (
        <div style={{ position:"fixed", inset:0, background:"rgba(9,26,53,0.96)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:999, padding:"1rem", backdropFilter:"blur(4px)" }}>
          <div style={{ background:`linear-gradient(160deg, ${C.navyDeep}, ${C.navy})`, border:`1px solid ${C.gold}`, padding:"2.5rem 2rem", maxWidth:400, width:"100%", position:"relative", boxShadow:`0 40px 80px rgba(0,0,0,0.8)` }}>
            <button onClick={() => { setPaywallOpen(false); setMsg(""); }} style={{ position:"absolute", top:12, right:14, background:"none", border:"none", color:C.muted, fontSize:22, cursor:"pointer" }}>×</button>
            <div style={{ textAlign:"center", marginBottom:"1.75rem" }}>
              <div style={{ display:"flex", justifyContent:"center", marginBottom:10 }}><ILShield size={36} /></div>
              <div style={{ fontSize:9, letterSpacing:"0.3em", color:C.gold, fontFamily:"sans-serif", marginBottom:6 }}>THE INTERNATIONAL LOVER™</div>
              <div style={{ fontSize:"clamp(16px,3vw,20px)", color:C.cream }}>Access the Platform</div>
            </div>
            <input type="email" placeholder="Enter your email address" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key==="Enter"&&handleEmailSubmit()} style={{ width:"100%", padding:"12px 14px", background:C.dark, border:`1px solid ${C.border}`, color:C.cream, fontSize:13, fontFamily:"Georgia, serif", marginBottom:"0.75rem", boxSizing:"border-box", outline:"none" }} />
            <button onClick={handleEmailSubmit} disabled={sending} style={{ width:"100%", padding:"12px", background:C.gold, color:C.navyDeep, border:"none", cursor:sending?"wait":"pointer", fontSize:12, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", fontFamily:"sans-serif", marginBottom:"1rem" }}>
              {sending ? "Sending..." : "Send Magic Link →"}
            </button>
            <div style={{ display:"flex", alignItems:"center", gap:10, margin:"1rem 0" }}>
              <div style={{ flex:1, height:"0.5px", background:C.border }} />
              <span style={{ color:C.muted, fontSize:10, fontFamily:"sans-serif" }}>or access code</span>
              <div style={{ flex:1, height:"0.5px", background:C.border }} />
            </div>
            <div style={{ display:"flex", gap:8, marginBottom:"1rem" }}>
              <input type="text" placeholder="Access code" value={code} onChange={e => setCode(e.target.value)} onKeyDown={e => e.key==="Enter"&&handleCodeSubmit()} style={{ flex:1, padding:"12px 14px", background:C.dark, border:`1px solid ${C.border}`, color:C.cream, fontSize:13, fontFamily:"sans-serif", outline:"none" }} />
              <button onClick={handleCodeSubmit} style={{ background:C.dark, border:`1px solid ${C.border}`, color:C.gold, padding:"12px 16px", cursor:"pointer", fontSize:12, fontFamily:"sans-serif" }}>Enter</button>
            </div>
            {msg && <div style={{ fontSize:11, color:msg.includes("sent")?C.gold:"#c08080", marginBottom:"0.75rem", lineHeight:1.6, fontFamily:"sans-serif" }}>{msg}</div>}
            <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:"1.25rem" }}>
              <div style={{ fontSize:10, color:C.muted, textAlign:"center", marginBottom:"0.875rem", fontFamily:"sans-serif" }}>Not enrolled yet?</div>
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {TIERS.map(t => (
                  <a key={t.id} href={t.stripe} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 12px", background:C.dark, border:`1px solid ${C.border}`, textDecoration:"none" }}>
                    <div style={{ fontSize:11, color:C.goldLight, fontFamily:"sans-serif" }}>{t.label}</div>
                    <div style={{ fontSize:14, color:C.gold, fontWeight:700 }}>{t.price}</div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
