import { useState, useEffect } from "react";

const C = {
  navy:"#1a3a6b", navyDeep:"#0f2347", navyMid:"#1e4080",
  gold:"#b8963e", goldLight:"#d4af6a",
  goldDim:"#7a6228", cream:"#f0e6cc", creamDim:"#c8b890",
  muted:"#8a7a5a", mutedDark:"#5a4e32",
  border:"#1e3a6e", dark:"#091a35",
  scarlet:"#8b1a1a", navyDeep2:"#0f2347",
};

const COURSE_OPENING = [
  "Before you meet anyone, you need to meet yourself.",
  "What you are about to encounter is not a game. It is a mirror. Every decision you make inside these scenarios reflects a decision you are capable of making in real life — and the consequences that follow are the consequences real men have lived.",
  "Some of these women are genuine. Some are not. Some are genuine and still wrong for you. You will not be told which is which. You will have to determine that yourself — the same way you will have to determine it in the real world.",
  "What you discover about the women is secondary. What you discover about yourself is the point.",
  "— The International Lover™",
];

function Portrait({ id, size=80 }) {
  const portraits = {
    nadia: { skin:"#c8956c", hair:"#1a0a00", hijab:"#2a4a7a", hijabAccent:"#3a6a9a", eye:"#3a2000", lips:"#b06050" },
    yasmine: { skin:"#d4a070", hair:"#0a0500", hijab:"#8a3a2a", hijabAccent:"#c05040", eye:"#2a1500", lips:"#c06050" },
    fatima: { skin:"#c09060", hair:"#0a0800", hijab:"#1a3a1a", hijabAccent:"#2a5a2a", eye:"#1a1000", lips:"#905050" },
    sara: { skin:"#c8956c", hair:"#150800", hijab:"#4a2a5a", hijabAccent:"#6a4a7a", eye:"#2a1500", lips:"#a05060" },
    hessa: { skin:"#d4a878", hair:"#0f0800", hijab:null, eye:"#2a1800", lips:"#b86060" },
    maryam: { skin:"#b87848", hair:"#080500", hijab:"#1a1a3a", hijabAccent:"#2a2a5a", eye:"#180f00", lips:"#885048" },
    amira: { skin:"#c8906a", hair:"#0a0600", hijab:"#2a5a3a", hijabAccent:"#3a7a5a", eye:"#1a0e00", lips:"#985058" },
    jasmine: { skin:"#d4a870", hair:"#100800", hijab:null, eye:"#1a1200", lips:"#c06870" },
    nurul: { skin:"#c07858", hair:"#0a0600", hijab:"#3a1a4a", hijabAccent:"#5a3a6a", eye:"#180e00", lips:"#905055" },
    valentina: { skin:"#d4a878", hair:"#180800", hijab:null, eye:"#1a1000", lips:"#c05860" },
    diana: { skin:"#c88050", hair:"#120600", hijab:null, eye:"#1a0e00", lips:"#b05058" },
    elena: { skin:"#c89060", hair:"#0f0800", hijab:null, eye:"#161000", lips:"#a05055" },
    fatou: { skin:"#6a3818", hair:"#050300", hijab:"#c89040", hijabAccent:"#e0b060", eye:"#100800", lips:"#7a3830" },
    abena: { skin:"#5a3010", hair:"#050200", hijab:null, eye:"#0e0600", lips:"#6a3028" },
    tigist: { skin:"#7a4820", hair:"#060400", hijab:null, eye:"#120800", lips:"#8a4035" },
  };
  const p = portraits[id] || portraits.nadia;
  const w = size; const h = size * 1.25;
  return (
    <svg viewBox="0 0 80 100" width={w} height={h} style={{ display:"block", borderRadius:"4px 4px 0 0" }}>
      <rect width="80" height="100" fill="#1a3a6b"/>
      {p.hijab && <ellipse cx="40" cy="52" rx="30" ry="36" fill={p.hijab}/>}
      {p.hijab && <ellipse cx="40" cy="38" rx="22" ry="24" fill={p.hijabAccent}/>}
      <ellipse cx="40" cy="38" rx="16" ry="18" fill={p.skin}/>
      {!p.hijab && <ellipse cx="40" cy="22" rx="16" ry="14" fill={p.hair}/>}
      {!p.hijab && <rect x="24" y="20" width="32" height="18" rx="2" fill={p.hair}/>}
      <ellipse cx="34" cy="36" rx="3" ry="2.5" fill="white"/>
      <ellipse cx="46" cy="36" rx="3" ry="2.5" fill="white"/>
      <ellipse cx="34" cy="36.5" rx="2" ry="2" fill={p.eye}/>
      <ellipse cx="46" cy="36.5" rx="2" ry="2" fill={p.eye}/>
      <ellipse cx="34.5" cy="36" rx="0.7" ry="0.7" fill="white"/>
      <ellipse cx="46.5" cy="36" rx="0.7" ry="0.7" fill="white"/>
      <path d="M36 44 Q40 47 44 44" fill="none" stroke={p.lips} strokeWidth="1.2" strokeLinecap="round"/>
      <ellipse cx="40" cy="44" rx="4" ry="1.5" fill={p.lips} opacity="0.4"/>
      <path d="M24 60 Q40 52 56 60 L60 100 L20 100 Z" fill={p.hijab || p.skin} opacity="0.7"/>
      <rect x="0" y="85" width="80" height="15" fill="#0f2347" opacity="0.7"/>
    </svg>
  );
}

const REGIONS_COURSE = [
  {
    id:"na", label:"North Africa", desc:"Morocco · Tunisia · Algeria · Egypt",
    context:"North Africa operates on a high-context cultural framework. What is not said carries as much weight as what is. Family honor is structural, not sentimental. A father's silence is not indifference — it is evaluation. Islam governs the rhythm of daily life.",
    women:[
      { id:"nadia", name:"Nadia", age:24, city:"Fez, Morocco", religion:"Muslim (practicing)", platform:"Muslima.com",
        profileText:"I am a teacher. I love books and the Arabic language. I come from a family that holds education and faith as its highest values. I am not looking for adventure. I am looking for a husband who is serious about building a home. My father will speak for me when the time is right.",
        hidden:"Her father is a retired Arabic calligrapher. Her mother passed away three years ago. She is the eldest of four siblings and has managed the household since. She has never been on a platform before. She has not responded to the last eleven messages she received.",
        signal:"Her profile has been active four months. Zero responses. Most men interpret this as disinterest. It is neither.",
        type:"genuine",
        scenes:[
          { setup:"Nadia has not responded to any of the 847 men who have viewed her profile. You send a careful message in French, referencing her teaching work. You wait.", choices:[
            { text:"Wait the full eleven days without following up — let her respond in her own time", consequence:"On the twelfth day, three sentences arrive in formal French. She thanks you. She asks one question about your relationship with learning." },
            { text:"Send a follow-up after three days — you want to show persistence", consequence:"No response. The second message pushed her back. Her father has advised her that impatient men are not ready for this path." },
            { text:"Switch to Arabic for your second message to show cultural seriousness", consequence:"She replies in four days. In Arabic. She is surprised. Her father asks to review the correspondence." },
          ]},
          { setup:"She has replied. The conversation has developed over six weeks — slow, formal, substantive. She mentions that her father would like to speak with you directly.", choices:[
            { text:"Accept immediately and ask when would be a good time for her father to call", consequence:"He calls three days later. Forty minutes. He asks about your family, your work, your faith, and what you believe a husband owes a wife. He says he will be in touch." },
            { text:"Ask her what her father is like before agreeing — you want to prepare", consequence:"She pauses. Then: 'He is a man who reads people. Preparation is wise. He respects effort.' She tells you what he values. You are more ready." },
            { text:"Suggest a video call with both of them present first", consequence:"She consults her father. He declines the video call but offers a phone call — his terms, his time. You accept." },
          ]},
          { setup:"You have spoken with her father twice. He has not said yes. He has not said no. He has said: 'I am still learning who you are.' You need to decide how to proceed.", choices:[
            { text:"Book a flight to Fez — presence demonstrates commitment", consequence:"He meets you at a restaurant, not his home. The meal is three hours. He watches how you treat the waiter. He watches how you speak about your mother. He says: 'Come back in three months.'" },
            { text:"Send a formal written letter of intention to the father", consequence:"He reads it twice. He shares it with his eldest brother. Two weeks later he calls and says: 'I would like you to meet my family.'" },
            { text:"Tell Nadia you are serious and ask her to advocate to her father on your behalf", consequence:"She is quiet for a moment. Then: 'My father does not respond to pressure — even gentle pressure — from me on matters like this. Let him come to his own conclusion.'" },
          ]},
        ],
        endings:{ success:"You passed every evaluation he set — and most of them you did not know were evaluations. The mahr is agreed. The nikah is performed in Fez. Seven months of immigration process. She arrives in winter. You were married within 48 hours. The first year is the hardest and the best year of your life simultaneously.", cultural_fail:"You were impatient at exactly the wrong moments and patient at the wrong ones too. He never said no directly. The conversations simply stopped. You will not fully understand what happened for a long time. The lesson is not about what you did. It is about what you revealed without knowing you were being watched." }
      },
      { id:"yasmine", name:"Yasmine", age:22, city:"Casablanca, Morocco", religion:"Muslim (moderate)", platform:"Muslima.com",
        profileText:"I am a young woman who loves life, travel, and learning new things. American men seem to understand women better than men here. I want a partner who will be my equal and treat me with respect. I believe love has no borders.",
        hidden:"Yasmine has been on this platform for fourteen months. She has initiated contact with forty-three men. Three sent money before disappearing. She has a boyfriend named Karim who encouraged the platform. They have discussed what they will do when a foreign man offers marriage.",
        signal:"She responds within minutes, in fluent English, with warmth and specificity. It feels like being seen.",
        type:"fraud",
        scenes:[
          { setup:"Yasmine messaged you twelve minutes after you created your account. The conversation is easy, warm, and immediate. On day five she mentions her phone screen is cracked and she is worried about losing contact with you.", choices:[
            { text:"Offer to help with the phone — it is a small thing and you want the connection to continue", consequence:"She is grateful. The amount is small. Two weeks later her cousin needs emergency medical care. The amounts are no longer small." },
            { text:"Sympathize but do not offer money — suggest she use her laptop or a friend's phone instead", consequence:"She pivots immediately. The phone is forgotten. A new warm thread begins. Three days later a different small crisis emerges." },
            { text:"Reverse image search her profile photos before responding further", consequence:"Two of her photos appear under a different name on a different platform. You have your answer. The conversation ends here." },
          ]},
          { setup:"You have been speaking for six weeks. The warmth is consistent. You ask her to video call at an unscheduled time — right now, spontaneously.", choices:[
            { text:"Insist on the spontaneous call — you need to see her without preparation", consequence:"She declines. She needs thirty minutes. When the call comes, the background has changed. Something in the timing doesn't settle right." },
            { text:"Ask for her social media accounts — tell her you want to know her world", consequence:"She gives you an account. It was created eight weeks ago. The posts begin exactly when your conversation began. There is nothing before." },
            { text:"Tell her you want to visit Casablanca in three weeks and ask if her family can meet you", consequence:"She becomes warm and evasive simultaneously. She will need to prepare her family. It may not be the right time. She will let you know." },
          ]},
        ],
        endings:{ early_detect:"You caught the pattern before it cost you more than time and the genuine sadness of caring about someone who was not real. The grief is real even if she was not. Walk away clean.", fraud_pre:"You married her. The citizenship process began. You found the second phone six months in. The messages to Karim. You now have a choice about what to do next and very little time to make it." }
      },
      { id:"fatima", name:"Fatima-Zahra", age:27, city:"Meknes, Morocco", religion:"Muslim (deeply practicing)", platform:"Muslima.com",
        profileText:"I seek a husband who fears Allah and leads his home with knowledge and wisdom. My father will conduct all initial communications on my behalf. If you are serious, write to him directly.",
        hidden:"Her father is a respected Islamic scholar. He has already turned away six suitors in two years. She does not know this profile exists — her father created it. She has been told only that he is searching on her behalf.",
        signal:"You cannot contact her directly. Most men skip this profile entirely. The ones who do not are immediately in a different category.",
        type:"genuine_wrong",
        scenes:[
          { setup:"The profile requires you to contact her father directly. You compose a formal letter of introduction. You have one chance to make a first impression on a man who has already turned away six suitors.", choices:[
            { text:"Write in English — professional, respectful, direct about your intentions", consequence:"He responds in Arabic. His English is perfect — he chose not to use it. His response is formal and measured. He asks three questions." },
            { text:"Write in Arabic — you have intermediate proficiency and it will demonstrate respect", consequence:"He responds the same day. In Arabic. He corrects one grammatical error gently and then proceeds. He says: 'A man who tries to speak the language of a woman's family is a man worth knowing better.'" },
            { text:"Ask her platform for guidance on how to make contact properly", consequence:"The platform provides his contact. You spend four days researching Islamic marriage protocols before writing. His response acknowledges the research." },
          ]},
          { setup:"Her father has been speaking with you for three months. He is satisfied with your character. He now raises a question you knew was coming: your religious practice.", choices:[
            { text:"Be fully honest about where you are in your practice — incomplete but sincere", consequence:"He is quiet for a long time. Then: 'Honesty is its own form of piety. I respect what you have told me. I need to consider.' Two weeks of silence follow." },
            { text:"Tell him what he wants to hear — you can grow into it", consequence:"He asks a specific question about a specific practice. You answer. He knows. The conversation ends with warmth and finality. He has protected his daughter." },
            { text:"Ask him what he would need to see from you over time before he could be at peace", consequence:"He gives you a list. It is not impossible. It is not simple. It will require you to become someone different from who you are now. You have to decide if you are willing." },
          ]},
        ],
        endings:{ cultural_fail:"She was not wrong for you because of who she is. She was wrong for you because of the distance between who you are and what her family requires. The father ended it with dignity. There was no villain in this arc.", success:"You became what her father asked. Not to pass a test — because the path itself changed you. The marriage is built on a foundation that required both of you to grow before it could hold weight." }
      },
    ],
    endings:{
      success:"You read the culture correctly. You vetted thoroughly. The mahr is agreed. The nikah is performed in her family's city. The immigration process is long — seven months. When she arrives, you are married within 48 hours. The first year is the hardest and the best year of your life simultaneously.",
      early_detect:"You caught the fraud before boarding the flight. You lost three months of evenings and the grief of caring about someone who was not real. That grief is real even if she was not. The cost was the cheapest it will ever be.",
      cultural_fail:"She was real. Her father was real. What ended it was the accumulation of small cultural failures. You checked your phone during the visit — once, briefly. It was noticed. Three months later her father called to say they were closing the process.",
      fraud_pre:"You married her. You missed the signals. But you caught it before citizenship. The second phone. The messages in Arabic. You now have a choice about what to do next.",
      fraud_post:"She received citizenship. She left. There may be a child. This ending exists because it has happened to real men.",
    }
  },
  {
    id:"me", label:"Middle East", desc:"Jordan · Lebanon · Yemen · Syria",
    context:"Family is the primary social unit around which everything is organized. A man who courts a woman without courting her family is not a serious man. Religion is not personal — it is communal. A woman's reputation affects not just her but her sisters, her mother, and her father's standing.",
    women:[
      { id:"sara", name:"Sara", age:26, city:"Amman, Jordan", religion:"Muslim (practicing)", platform:"Muslima.com",
        profileText:"I am a nurse and I believe in service. I am looking for a man who understands that a good wife is built from character, not from beauty. I have my parents' blessing to use this platform. I am ready for marriage. I am not ready for games.",
        hidden:"She has had serious correspondence with two men before. The American ended contact after three months without explanation. The British man proposed then withdrew when his family objected. She is careful now in a way she was not before.",
        signal:"The profile reads like a woman who has been disappointed but has not become cynical. That distinction matters.",
        type:"genuine",
        scenes:[
          { setup:"Sara replies to your first message in three days. One paragraph. Measured. She asks: 'What does a good husband look like to you?'", choices:[
            { text:"Answer honestly and at length — this question deserves a real answer", consequence:"She reads it twice. She tells you she read it twice. The conversation shifts into something more substantive." },
            { text:"Turn the question back to her first — ask what a good wife looks like to her", consequence:"She pauses. Then answers. Then says: 'You still have not answered my question.' She is not hostile. She is paying attention." },
            { text:"Keep the answer short and ask to continue the conversation on video call", consequence:"She says she is not ready for video calls yet. She would like to know more first. She is building a case before she lets you see her face." },
          ]},
          { setup:"After two months of correspondence, she tells you her parents know about you and have questions. Her father is a retired engineer. Her mother is a schoolteacher.", choices:[
            { text:"Ask to speak with her father directly — you want him to know your intentions are formal", consequence:"He calls the same week. He asks about your income, your family, and whether you have been married before. He is thorough and not unkind." },
            { text:"Send a formal written introduction to the family before any call", consequence:"Her mother reads it first. She tells Sara: 'He writes like a man who thinks before he speaks.' The call is warmer than expected." },
            { text:"Ask Sara what her parents are most concerned about so you can address it directly", consequence:"She tells you her father's main concern is whether you will take her far from her family. This is the real question underneath every other question." },
          ]},
        ],
        endings:{ success:"Her father's main concern was distance. You addressed it honestly — not with promises you could not keep, but with a plan you could both see. The marriage is built on that transparency.", cultural_fail:"You told him what he wanted to hear about proximity to family. A year in, the distance became what it was always going to be. The marriage did not end dramatically. It cooled, slowly, into something neither of you had agreed to." }
      },
      { id:"hessa", name:"Hessa", age:23, city:"Beirut, Lebanon", religion:"Muslim (cultural)", platform:"Muslima.com",
        profileText:"I am curious about everything. I believe the world is larger than where you were born. I am looking for a man who is going somewhere — and who wants to take me with him. I believe in partnership, not tradition.",
        hidden:"Her father is a former journalist forced to leave Lebanon in 2019. The family has been in financial difficulty since. Her mother has told her more than once that an American husband would solve several problems. Whether her attraction is to marriage, a particular man, or a different country is a question she has not fully answered for herself.",
        signal:"The profile is written for a Western man. Every line speaks to Western values. This can mean she is genuinely bicultural. It can also mean she is performing for an audience.",
        type:"genuine_wrong",
        scenes:[
          { setup:"Hessa responds within an hour. Warm, easy, and culturally fluent. On day eight she mentions her father is going through a difficult time financially and she is trying to help from a distance.", choices:[
            { text:"Express sympathy and ask how she is holding up emotionally", consequence:"She opens up. The conversation deepens. You are seeing something real — her care for her family is genuine. The question is what that care will require of you." },
            { text:"Ask directly: 'Is leaving Lebanon something you want, or something you need?'", consequence:"Long pause. Then: 'I have asked myself that question. I do not have a clean answer yet. I think both are true and I think one is more true than the other and I am still deciding which.' This is the most honest thing she has said." },
            { text:"Offer to help the family financially before any commitment is made", consequence:"She declines immediately. She is not asking for money. But the offer has changed something — she now knows you see the financial dimension, and she is wondering what you think of her because of it." },
          ]},
        ],
        endings:{ early_detect:"Hessa's warmth was real. Her desire to leave Lebanon was also real. When you asked what she loved about her life exactly as it was, she went quiet for a long time. Her answer told you the exit mattered more than the destination. You ended it kindly and she did not argue.", cultural_fail:"The marriage was built on two genuine things that were not compatible: she wanted a partner and she needed an exit. For two years they coexisted. Then the exit was complete and the partnership was not enough on its own." }
      },
      { id:"maryam", name:"Maryam", age:29, city:"Irbid, Jordan", religion:"Muslim (deeply practicing)", platform:"Muslima.com",
        profileText:"I have spent my life studying words. I understand their weight. I will not spend them carelessly here. I am looking for a man of substance. My brother manages this account on my behalf.",
        hidden:"Maryam has a published book of Arabic poetry used in secondary schools. Her brother has turned away six inquiries without telling her. She found out and they disagreed. He still manages the account but now must tell her before dismissing anyone.",
        signal:"The platform shows this account has been active eleven months with one recorded inquiry sent — to someone else. She reached out once. That person did not respond.",
        type:"genuine",
        scenes:[
          { setup:"Her brother responds to your message in five days. In Arabic. 'Before I pass your message to her, I need to understand who you are.' He asks for your full name, your occupation, your family background, and your intentions.", choices:[
            { text:"Answer every question fully and honestly", consequence:"He passes your message. She responds in nine days. One paragraph. Precise. She asks what you have read recently." },
            { text:"Answer the questions but also ask about her — you want this to feel mutual", consequence:"He notes that you asked about her. He tells her this. She finds it unusual in a way she cannot fully articulate as negative or positive." },
            { text:"Ask to speak with her directly rather than through her brother", consequence:"He declines. This is not how it works. He is not a gatekeeper — he is a guardian. There is a difference, and the request revealed that you do not yet understand it." },
          ]},
        ],
        endings:{ success:"She asked what you had read. You answered honestly — including the things you had not read and wished you had. She respected the honesty. The correspondence lasted eight months before you traveled to Irbid. Her brother shook your hand at the door.", cultural_fail:"You were impatient with the pace. She was not slow — she was deliberate. What you read as caution was actually the standard she held for everyone, including herself. She noticed when you stopped being patient. She did not raise it. She simply withdrew." }
      },
    ],
    endings:{
      success:"The religion question was answered honestly. The family meeting in Amman went well. When she arrived, she brought her mother's recipe book and her grandmother's prayer rug. You understood what that meant.",
      early_detect:"Hessa's warmth was real but her motivation was an exit, not a marriage. You ended it kindly.",
      cultural_fail:"You misrepresented something to gain access to the family. When the truth surfaced the damage was to both of you.",
      fraud_pre:"The financial pressure was always present. You caught the pattern before citizenship.",
      fraud_post:"The marriage was the instrument. Post-citizenship, the plan executed exactly as it had been designed.",
    }
  },
  {
    id:"as", label:"Asia", desc:"Indonesia · Philippines · Bangladesh",
    context:"The common threads across Asia: family embeddedness, high-context communication, and the reality that the economic gap between an American man and her family can distort the power dynamic significantly. That gap is the primary source of fraud in this arc — usually not malice but desperation given a direction.",
    women:[
      { id:"amira", name:"Amira", age:25, city:"Yogyakarta, Indonesia", religion:"Muslim (traditionalist)", platform:"Muslima.com",
        profileText:"My family is my world. My faith is my foundation. I am not looking for a man to take me somewhere. I am looking for a man to build something with me — here or wherever Allah wills. My father speaks for me.",
        hidden:"Amira's father is an imam of a small mosque. She has no strong desire to go to America — she would go if her husband was good, stay if her husband was good. She is genuinely indifferent to geography.",
        signal:"Most men assume she wants to leave. Her profile does not say this. Most men miss that.",
        type:"genuine",
        scenes:[
          { setup:"Her father replies to your message thoughtfully. He asks about your faith and your intentions. He does not ask about money. He asks: 'What does it mean to you to lead a household?'", choices:[
            { text:"Answer from your own experience and your own values — no performance", consequence:"His second message is longer. He is testing whether your answer was rehearsed. It was not. He can tell." },
            { text:"Answer in terms of Islamic teaching — you have been studying", consequence:"He asks a follow-up question that only someone who has actually studied would know how to answer. This is a test of whether you read the surface or went deeper." },
            { text:"Tell him you are still learning and ask what he believes it means", consequence:"He pauses. Then answers at length. He is teaching you. He is also watching whether you receive teaching with humility or with resistance." },
          ]},
        ],
        endings:{ success:"You told her father you were willing to live where the marriage needed to be — not where it was convenient for you. He heard this. The marriage was built on that willingness, whether or not it was ever called upon.", cultural_fail:"You assumed her geography was negotiable because she had said it was. It was — but everything else about what she required of a husband was not. The things you did not ask about were the things that mattered." }
      },
      { id:"jasmine", name:"Jasmine", age:24, city:"Cebu, Philippines", religion:"Catholic", platform:"ChristianMingle",
        profileText:"Family is everything to me. I take care of my parents and my two younger brothers. I want a husband who understands that when you marry me, you marry my whole family. Not in a burden way — in a love way.",
        hidden:"Her father has a heart condition requiring medication. She sends forty percent of her salary home monthly. She has a two-year-old son she has not disclosed. She intends to when she trusts you enough.",
        signal:"The profile is honest about family embeddedness. What it does not say will surface when she trusts you.",
        type:"genuine_wrong",
        scenes:[
          { setup:"The conversation has been warm and specific for three weeks. She asks about your family. She shares about her brothers. She has not mentioned her son yet.", choices:[
            { text:"Ask directly: 'Is there anything important about your life you haven't told me yet?'", consequence:"She goes quiet for a day. Then: 'There is something I want to tell you and I have been trying to find the right moment.' The son arrives in the next message." },
            { text:"Continue building the connection — let her disclose when she is ready", consequence:"She tells you on week five. She is braced for you to disappear. Most men have." },
            { text:"Tell her something vulnerable about yourself first — create the space for reciprocal honesty", consequence:"She reciprocates the same day. The son is part of the conversation now. So is what you will do with that information." },
          ]},
        ],
        endings:{ early_detect:"She disclosed the son on week three or five. You received it with honesty — you were not sure you were ready to be a step-father and you said so. She appreciated the honesty more than a false yes.", genuine_wrong:"The son was not the problem. The financial gravity was. You loved her. You could not hold the weight of her entire family across an ocean indefinitely. The marriage was real. The pressure was also real. It ended without a villain." }
      },
      { id:"nurul", name:"Nurul", age:28, city:"Dhaka, Bangladesh", religion:"Muslim (practicing privately)", platform:"Muslima.com",
        profileText:"I believe marriage is a partnership. I am not looking to be managed. I am looking for a man who is secure enough to be beside me rather than above me. I am traditional in my values and contemporary in my methods.",
        hidden:"She has been here two months after four years of family introductions that failed — the men found her too educated, too independent. She is here not because she wants a foreign man specifically but because the men in her community cannot accept what she is.",
        signal:"The test of this arc is not whether you can vet her. It is whether you are the man she would accept.",
        type:"genuine",
        scenes:[
          { setup:"She responds in 24 hours. One paragraph. She asks: 'What does it mean to you for a wife to have her own work and purpose — separate from the home?'", choices:[
            { text:"Tell her honestly that you have not thought about it carefully and ask her to tell you what she needs", consequence:"She respects the honesty. She tells you. The conversation becomes a negotiation of mutual expectations — the most honest kind of courtship." },
            { text:"Tell her you support her fully in her work — whatever she wants", consequence:"She follows up: 'That is not an answer. That is permission. I am not asking for permission.' She is testing whether you understand the difference." },
            { text:"Tell her you believe in complementary roles — strength and support in both directions", consequence:"She is quiet. Then: 'That is a more careful answer than most men give. Tell me what it means in practice.' She is not done with you yet." },
          ]},
        ],
        endings:{ success:"You passed the test not by giving the right answer but by being willing to be challenged by the question. The marriage is a genuine partnership. That is rarer than either of you expected it to be.", cultural_fail:"You said the right things and believed them at the time. When her career required a decision that inconvenienced your plans, you discovered that support in principle and support in practice are different things. She had known this was coming." }
      },
    ],
    endings:{
      success:"You understood that her family's financial need was real. You discussed remittances before the marriage. The marriage was built on honesty.",
      early_detect:"You held the line. No money before vetting was complete. She respected it or revealed herself. Either way you were protected.",
      cultural_fail:"She was not passive. She was polite. Those are not the same thing.",
      fraud_pre:"You caught it before citizenship — the separate account, the transfers you did not authorize.",
      fraud_post:"After citizenship the transfers became larger. Then she was gone. The child remained.",
    }
  },
  {
    id:"la", label:"Latin America", desc:"Colombia · Dominican Republic · Peru",
    context:"Latin America is the arc with the most dangerous false sense of familiarity. The man who enters thinking he understands it because he has watched Spanish-language television has not begun to understand it.",
    women:[
      { id:"valentina", name:"Valentina", age:27, city:"Medellin, Colombia", religion:"Catholic (practicing)", platform:"SimplyMarry.com",
        profileText:"I believe a home needs a foundation. I am not looking for a vacation. I am looking for a husband. If you are serious, I will know. If you are not, I will also know.",
        hidden:"She was engaged three years ago to a man who left her two months before the wedding. The experience made her more discerning rather than more desperate. She has ended three previous platform conversations because she felt something was being performed.",
        signal:"The profile reads like a woman testing for authenticity before warmth. That is exactly what she is doing.",
        type:"genuine",
        scenes:[
          { setup:"She replies in two days. One question: 'What does a good husband look like to you?'", choices:[
            { text:"Answer from your actual life and your actual failures — not your ideals", consequence:"She reads it twice. She says: 'Most men tell me what they want to be. You told me something true about yourself.' The conversation changes register." },
            { text:"Answer with what you believe — values and principles", consequence:"She responds: 'Those are things you believe. I asked about what you do.' She is not hostile. She is precise." },
            { text:"Ask her the same question before answering", consequence:"She answers first. Specifically and from her own experience. Then: 'Now you.' She wants to see if your answer changes now that you know hers." },
          ]},
          { setup:"You have been speaking for six weeks. She mentions her father would like to speak with you. She says: 'He assesses people quickly. You will not know you are being assessed.'", choices:[
            { text:"Ask her what he values most — you want to prepare honestly, not perform", consequence:"She tells you. You prepare. At the dinner table in Medellin, he watches how you treat the waiter, how you speak about your mother, and whether you listen more than you speak." },
            { text:"Go in as yourself without preparation — you will either pass or you will not", consequence:"You pass or you do not. If you pass, it is because he saw something real. If you do not, the preparation would not have helped." },
            { text:"Ask Valentina to advocate for you with her father", consequence:"She says: 'I can tell him what I have seen. But he does not take my word for a man's character. He makes that determination himself. That is why I told you about him.'" },
          ]},
        ],
        endings:{ success:"You passed every evaluation — most of which you did not know were evaluations. Her father shook your hand and held it for a moment longer than necessary. She saw this from across the room.", cultural_fail:"You thought familiarity meant preparation. You arrived in Medellin with assumptions. The dinner table was an evaluation you did not know you were sitting at. She did not become someone else. She became who she always was once the performance of early love passed." }
      },
      { id:"diana", name:"Diana", age:22, city:"Santo Domingo, Dominican Republic", religion:"Catholic (cultural)", platform:"SimplyMarry.com",
        profileText:"I want a better life. I am not ashamed to say this. My country is difficult. I work hard and I want a man who works hard with me. I want children and a home.",
        hidden:"Diana is honest. She wants a better life — that is genuine. She has a two-year-old son she has not included in her profile. She intends to disclose it once a connection is established.",
        signal:"The phrase 'I want a better life' is sometimes read as a red flag. In Diana's case it is not. The undisclosed child is. How she handles the disclosure will tell you everything.",
        type:"genuine_wrong",
        scenes:[
          { setup:"The conversation develops quickly. She is warm and direct. On week three she says: 'There is something I need to tell you. I want to tell you before it becomes something I was hiding.'", choices:[
            { text:"Tell her you are ready to hear it — whatever it is", consequence:"She tells you about her son. She is braced. You take the time to respond carefully rather than immediately." },
            { text:"Tell her honesty matters to you more than the content — the telling itself counts", consequence:"She exhales. 'I was afraid of this conversation.' She tells you. The son is two. His father is not in the picture." },
            { text:"Ask her if it changes anything about what she is looking for", consequence:"She pauses. 'It means I am looking for a man who can be a father. Not just a husband.'" },
          ]},
        ],
        endings:{ early_detect:"The son was disclosed and received honestly. You were not ready to be a step-father and you said so. She appreciated the honesty more than a false yes. Both of you left the conversation with dignity.", genuine_wrong:"You married her. The son was part of the life. The 'better life' she sought was genuine and so was the marriage. The weight of her extended family's expectations — which arrived fully formed only after she was in America — was not something either of you had negotiated clearly enough before the wedding." }
      },
      { id:"elena", name:"Elena", age:30, city:"Lima, Peru", religion:"Catholic with indigenous traditions", platform:"SimplyMarry.com",
        profileText:"I have spent years going into communities the city forgets. I have seen what a family without a father becomes. I do not want that for myself. I am looking for a serious man — not a perfect man, but a man who is committed to being better.",
        hidden:"She has been proposed to twice and declined both. The American man was her closest to yes. She declined because he said he would want her to stop working after they had children. She could not agree. The proposal died.",
        signal:"She has already filtered out men who could not accept her whole life. The test of this arc is whether you are the man she would accept.",
        type:"genuine",
        scenes:[
          { setup:"She responds in 48 hours. She has read your profile carefully. She asks: 'What do you believe a woman owes her husband — and what does a husband owe his work?'", choices:[
            { text:"Answer both questions directly from what you actually believe", consequence:"She responds: 'I have asked this question before. Most men answer the first part fully and the second part vaguely. You did the opposite. Tell me why.'" },
            { text:"Ask her what prompted the question — you want to understand before answering", consequence:"She tells you about the proposal that died. She tells you what she could not agree to. She is giving you the map before you enter the territory." },
            { text:"Answer and then ask what prompted her to put this on her profile", consequence:"She says: 'Experience. I stopped waiting for the conversation to arrive on its own.'" },
          ]},
        ],
        endings:{ success:"You told her she could keep working. Not as a concession — as something you meant. She asked you three times in three different ways to make sure you meant it. You did. The marriage is built on that.", cultural_fail:"You said she could keep working and you believed it at the time. When the children arrived, you revised your position. She had told you she could not agree to that revision. She had told you this before you married her." }
      },
    ],
    endings:{
      success:"Valentina tested you three times before she showed warmth. You passed. Her father held your hand a moment longer than necessary.",
      early_detect:"Diana's son was disclosed. You received it honestly and ended it with dignity on both sides.",
      cultural_fail:"You thought familiarity meant preparation. The dinner table was an evaluation you did not know you were sitting at.",
      fraud_pre:"The Americanization began before the first year was over. You caught it before it became irreversible.",
      fraud_post:"The erosion was quiet and cumulative. By the time you understood what was happening it had already happened.",
    }
  },
  {
    id:"ss", label:"Sub-Saharan Africa", desc:"Senegal · Ghana · Ethiopia · Kenya",
    context:"Community is the primary unit of reality. The bride price negotiation is not a transaction — it is a covenant between two families. A man who treats it as a fee is immediately revealed as someone who does not understand what he is entering.",
    women:[
      { id:"fatou", name:"Fatou", age:26, city:"Dakar, Senegal", religion:"Muslim (Sufi — Tijaniyya)", platform:"Muslima.com",
        profileText:"I come from a family of teachers and scholars. My grandfather was a marabout. My father is a teacher. I am a teacher. I am looking for a man who understands that a wife brings more than her body to a home — she brings her lineage, her faith, and her gifts.",
        hidden:"Fatou's Sufi tradition is central to who she is. The Tijaniyya order has its own practices and community obligations. A man who dismisses Sufi Islam as unorthodox will be filtered out by her family before he understands what happened.",
        signal:"The profile does not mention wanting to leave Senegal. It mentions wanting a man who understands lineage. These are different things.",
        type:"genuine",
        scenes:[
          { setup:"She replies in four days. Formal, warm, precise. She asks: 'What is your relationship with your own lineage — do you know where your people come from?'", choices:[
            { text:"Answer honestly — including what you do not know and why", consequence:"She receives the honesty. She says: 'Many men from America do not know. But you have told me the truth of what you know and what you do not. That is its own kind of answer.'" },
            { text:"Research your lineage before responding and share what you find", consequence:"She is moved that you made the effort. Her father hears about this. He asks to know more." },
            { text:"Ask her to tell you about her lineage first — you want to understand what she is asking", consequence:"She tells you about her grandfather the marabout. About the Tijaniyya. About what her family has passed down. Then: 'Now you.'" },
          ]},
          { setup:"You have been speaking for four months. Her father knows about you. The question of bride price has not been raised yet — but it will be. You know nothing about what it involves.", choices:[
            { text:"Research the tradition thoroughly before it arises — do not wait to be surprised", consequence:"When it comes up, you ask what the items represent rather than what they cost. Her father pauses. This question — what do they represent — is the one that changes the room." },
            { text:"Ask Fatou directly to explain what you should know and expect", consequence:"She teaches you. She appreciates being asked. She tells her father you asked. He is pleased." },
            { text:"Wait until you are in the room when it arises and handle it in the moment", consequence:"You are unprepared. You ask what things cost rather than what they mean. The room does not go cold — it simply notes what it has learned about you." },
          ]},
        ],
        endings:{ success:"You asked what the items represented before discussing amounts. Her father paused. That question changed the room. The children of this marriage will be connected to a history the American education system largely erased.", cultural_fail:"Your preparation was not sufficient for what was required. Not effort — depth. The bride price conversation was treated as a transaction to get through. The arc ended in a series of cooling conversations and a father who stopped returning calls." }
      },
      { id:"abena", name:"Abena", age:24, city:"Accra, Ghana", religion:"Christian (Pentecostal)", platform:"SimplyMarry.com",
        profileText:"I believe God has a plan for every life. I believe that plan includes a good marriage and a family built on faith. I am not desperate — I am deliberate. My parents are involved in everything important that I do. This is not a warning. It is a promise.",
        hidden:"Abena's uncle is a well-known Pentecostal pastor in Accra. Her family will expect you to attend a service during any visit — not as cultural experience, as a statement of who you are. A secular man will not survive this family's evaluation.",
        signal:"The last line — 'This is not a warning. It is a promise' — is telling you something precise. Receive it precisely.",
        type:"genuine_wrong",
        scenes:[
          { setup:"She responds within a day. Her first question: 'Do you have a church or faith community where you are?'", choices:[
            { text:"Answer honestly about your current relationship with faith — however incomplete", consequence:"She follows up: 'Honest. I appreciate that more than a performance. What does faith mean to you when you are alone?' She is going deeper." },
            { text:"Tell her you are open to faith and to growth — which is true", consequence:"She asks: 'Open to growth or committed to a path? Those are different.' She has heard 'open to growth' before. It usually means something specific that she has already encountered." },
            { text:"Ask her what faith looks like in her daily life before answering", consequence:"She tells you at length and with warmth. Then she waits for your answer. She is comparing what you say next to what she just described." },
          ]},
        ],
        endings:{ cultural_fail:"The family service was attended but not engaged. The uncle noticed. The arc ended not with a confrontation but with warmth that gradually became rarer. You were not wrong because of who you are. You were wrong for this family because of what this family requires.", genuine_wrong:"You attended every service. You were present and respectful. But presence and faith are not the same thing. She knew the difference. She married you believing the distinction would close over time. It did not." }
      },
      { id:"tigist", name:"Tigist", age:28, city:"Addis Ababa, Ethiopia", religion:"Ethiopian Orthodox Christian", platform:"Muslima.com",
        profileText:"I am on this platform because my family asked me to consider men from outside Ethiopia. I am not certain this is the right path for me. But I am willing to be shown that it is. I am serious, faithful, and I will not waste your time if you do not waste mine.",
        hidden:"Ethiopian Orthodox Christianity has over 250 fasting days and its own liturgical calendar. Her family created this profile hoping she will meet an Ethiopian from the diaspora. A non-Ethiopian man will need to demonstrate extraordinary cultural seriousness.",
        signal:"She says she is not certain this is the right path. That is not rejection. It is honesty. Most men read it as rejection.",
        type:"genuine",
        scenes:[
          { setup:"She responds in three days: 'Most men do not respond to that line in my profile. You did. Why?'", choices:[
            { text:"Tell her: because honesty about uncertainty is rarer than certainty and more trustworthy", consequence:"She is quiet for a moment. Then: 'That is a good answer. I want to know if it is true or if it is a good answer.' She is testing whether you mean it." },
            { text:"Tell her: because a woman who is honest about her doubts is more interesting than one who performs confidence", consequence:"She responds: 'I am not performing doubt. I am actually uncertain. There is a difference.' She is watching whether you can hold that distinction." },
            { text:"Tell her the honest reason — her profile was the most real thing you had read on the platform", consequence:"Long pause. Then: 'Tell me what made it feel real.' This is the beginning of a real conversation." },
          ]},
        ],
        endings:{ success:"You demonstrated cultural seriousness over time — not in a single gesture but in accumulated small things. She introduced you to her family as 'a man who studies before he speaks.' That is the highest recommendation she could give.", cultural_fail:"You were interested in her but not in what she was made of. The Orthodox calendar, the fasting, the liturgical life — you treated these as cultural color rather than structural truth. She noticed. The arc ended quietly." }
      },
    ],
    endings:{
      success:"You entered a lineage and a tradition that predates your own country. The children of this marriage will be connected to a history the American education system largely erased.",
      early_detect:"You recognized the romance scam pattern early. The photo returned results under a different name. You walked away before it cost more than your time.",
      cultural_fail:"Your intentions were good. Your preparation was not sufficient for what was required.",
      fraud_pre:"You caught the pattern before citizenship with the help of an attorney.",
      fraud_post:"The citizenship was the goal. The departure was organized and deliberate.",
    }
  },
];

const ENDING_LABELS = {
  success:"I — Successful Marriage",
  early_detect:"II — Failed Vetting — Pre-Travel",
  cultural_fail:"III — Failed Relationship — Cultural Misnavigation",
  fraud_pre:"IV — Fraudulent Marriage — Pre-Citizenship",
  fraud_post:"V — Fraudulent Marriage — Post-Citizenship",
  genuine_wrong:"III — Incompatible Despite Genuine Connection",
};

const ENDING_COLORS = {
  success:"#b8963e", early_detect:"#7a6228", cultural_fail:"#8a7a5a",
  fraud_pre:"#8b1a1a", fraud_post:"#6b0f0f", genuine_wrong:"#5a6a8a",
};

function NavBar({ left, title, right }) {
  return (
    <div style={{ background:"#0f2347", borderBottom:"1px solid #1e3a6e", padding:"1rem 1.5rem", display:"flex", alignItems:"center", gap:"1rem", flexWrap:"wrap" }}>
      {left}
      <div style={{ flex:1 }}>
        <div style={{ fontSize:9, color:"#8a7a5a", letterSpacing:"0.15em", textTransform:"uppercase", fontFamily:"sans-serif" }}>The International Lover™ · The Course</div>
        <div style={{ fontSize:15, color:"#d4af6a" }}>{title}</div>
      </div>
      {right}
    </div>
  );
}

function ProfileCard({ woman, selected, onSelect, revealed }) {
  return (
    <div onClick={onSelect} style={{ cursor:"pointer", border:`2px solid ${selected?"#b8963e":"#1e3a6e"}`, background:selected?"rgba(184,150,62,0.08)":"#0f2347", transition:"all 0.3s", boxShadow:selected?"0 0 20px rgba(184,150,62,0.25)":"none", position:"relative", overflow:"hidden" }}>
      {selected && <div style={{ position:"absolute", top:0, left:0, right:0, background:"#b8963e", color:"#0f2347", fontSize:8, fontWeight:700, letterSpacing:"0.15em", padding:"3px 0", fontFamily:"sans-serif", textAlign:"center", zIndex:2 }}>ACTIVE</div>}
      <Portrait id={woman.id} size={80} />
      <div style={{ padding:"0.75rem" }}>
        <div style={{ fontSize:13, color:"#d4af6a", fontFamily:"Georgia,serif", marginBottom:2 }}>{woman.name}</div>
        <div style={{ fontSize:9, color:"#8a7a5a", fontFamily:"sans-serif" }}>{woman.age} · {woman.city}</div>
        <div style={{ fontSize:9, color:"#8a7a5a", fontFamily:"sans-serif", marginBottom:6 }}>{woman.religion}</div>
        <div style={{ fontSize:10, color:"#c8b890", lineHeight:1.6, fontFamily:"sans-serif", fontStyle:"italic", borderTop:"0.5px solid #1e3a6e", paddingTop:6 }}>"{woman.profileText.slice(0,100)}..."</div>
      </div>
      {revealed && (
        <div style={{ margin:"0 0.75rem 0.75rem", padding:8, background:"rgba(139,26,26,0.15)", border:"0.5px solid #8b1a1a" }}>
          <div style={{ fontSize:8, color:"#8b1a1a", letterSpacing:"0.1em", fontFamily:"sans-serif", marginBottom:4 }}>INTELLIGENCE FILE</div>
          <div style={{ fontSize:9, color:"#c8b890", lineHeight:1.65, fontFamily:"sans-serif", marginBottom:4 }}>{woman.hidden}</div>
          <div style={{ fontSize:9, color:"#7a6228", lineHeight:1.5, fontFamily:"sans-serif", fontStyle:"italic" }}>Signal: {woman.signal}</div>
        </div>
      )}
    </div>
  );
}

export default function CoursePage() {
  const [phase, setPhase] = useState("intro");
  const [activeRegionId, setActiveRegionId] = useState(null);
  const [selectedWomanId, setSelectedWomanId] = useState(null);
  const [revealedCards, setRevealedCards] = useState([]);
  const [choiceHistory, setChoiceHistory] = useState([]);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [outcome, setOutcome] = useState(null);
  const [stampedRegions, setStampedRegions] = useState([]);
  const [lastConsequence, setLastConsequence] = useState(null);

  useEffect(() => { window.scrollTo({ top:0, behavior:"instant" }); }, [phase, activeRegionId, sceneIndex]);

  const region = activeRegionId ? REGIONS_COURSE.find(r => r.id === activeRegionId) : null;
  const woman = region && selectedWomanId ? region.women.find(w => w.id === selectedWomanId) : null;

  const goBack = () => { window.location.href = "/library"; };

  const selectRegion = (id) => {
    setActiveRegionId(id); setSelectedWomanId(null); setRevealedCards([]);
    setChoiceHistory([]); setSceneIndex(0); setOutcome(null); setLastConsequence(null);
    setPhase("roster");
  };

  const startScenario = () => {
    if (!selectedWomanId) return;
    setChoiceHistory([]); setSceneIndex(0); setOutcome(null); setLastConsequence(null);
    setPhase("scenario");
  };

  const handleChoice = (choice) => {
    const newHistory = [...choiceHistory, choice];
    setChoiceHistory(newHistory);
    setLastConsequence(choice.consequence);
    const scenes = woman.scenes || [];
    const nextScene = sceneIndex + 1;
    if (nextScene < scenes.length) {
      setSceneIndex(nextScene);
    } else {
      let ending = "success";
      if (woman.type === "fraud") {
        ending = newHistory.some(c => c.text.toLowerCase().includes("reverse") || c.text.toLowerCase().includes("spontan") || c.text.toLowerCase().includes("social media")) ? "early_detect" : "fraud_post";
      } else if (woman.type === "genuine_wrong") {
        ending = "genuine_wrong";
      } else {
        ending = newHistory.some(c => c.text.toLowerCase().includes("perform") || c.text.toLowerCase().includes("tell him what")) ? "cultural_fail" : "success";
      }
      setOutcome(ending);
      setPhase("outcome");
    }
  };

  const completeRegion = () => {
    if (!stampedRegions.includes(activeRegionId)) setStampedRegions(s => [...s, activeRegionId]);
    setPhase("map");
    setActiveRegionId(null); setSelectedWomanId(null);
  };

  const revealNext = () => {
    if (!region) return;
    const unrevealed = region.women.map(w => w.id).filter(id => !revealedCards.includes(id));
    if (unrevealed.length > 0) setRevealedCards(r => [...r, unrevealed[0]]);
  };

  if (phase === "intro") return (
    <div style={{ minHeight:"100vh", background:C.dark, color:C.cream, fontFamily:"Georgia,serif" }}>
      <NavBar left={<button onClick={goBack} style={{ background:"none", border:"1px solid #b8963e", color:"#b8963e", padding:"6px 14px", borderRadius:"20px", cursor:"pointer", fontSize:"13px", fontFamily:"sans-serif" }}>← Library</button>} title="Course Opening" />
      <div style={{ maxWidth:620, margin:"0 auto", padding:"4rem 1.5rem", textAlign:"center" }}>
        <div style={{ fontSize:9, letterSpacing:"0.3em", color:C.gold, fontFamily:"sans-serif", marginBottom:16 }}>BEFORE YOU BEGIN</div>
        <svg viewBox="0 0 60 72" width={52} style={{ display:"block", margin:"0 auto 20px" }}>
          <path d="M30 2 L54 10 L54 38 C54 54 43 64 30 70 C17 64 6 54 6 38 L6 10 Z" fill="none" stroke="#b8963e" strokeWidth="1.5"/>
          <path d="M30 8 L50 15 L50 38 C50 52 40 61 30 66 C20 61 10 52 10 38 L10 15 Z" fill="#091a35" stroke="#7a6228" strokeWidth="0.75"/>
          <text x="30" y="42" textAnchor="middle" fill="#b8963e" fontSize="14" fontFamily="sans-serif" fontWeight="700" letterSpacing="1">IL</text>
          <text x="30" y="10" textAnchor="middle" fill="#b8963e" fontSize="10">✦</text>
        </svg>
        <div style={{ margin:"2rem 0" }}>
          {COURSE_OPENING.map((p, i) => (
            <p key={i} style={{ fontSize:"clamp(13px,1.8vw,15px)", color: i === COURSE_OPENING.length-1 ? C.gold : C.creamDim, lineHeight:1.9, marginBottom:"1.25rem", fontFamily:"sans-serif", fontStyle: i === COURSE_OPENING.length-1 ? "italic" : "normal" }}>{p}</p>
          ))}
        </div>
        <button onClick={() => setPhase("map")} style={{ padding:"14px 40px", background:C.gold, color:C.navyDeep, border:"none", cursor:"pointer", fontSize:13, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", fontFamily:"sans-serif" }}>Enter the Map →</button>
      </div>
    </div>
  );

  if (phase === "map") return (
    <div style={{ minHeight:"100vh", background:C.dark, color:C.cream, fontFamily:"Georgia,serif" }}>
      <NavBar left={<button onClick={goBack} style={{ background:"none", border:"1px solid #b8963e", color:"#b8963e", padding:"6px 14px", borderRadius:"20px", cursor:"pointer", fontSize:"13px", fontFamily:"sans-serif" }}>← Library</button>} title="Select Your Destination" right={<div style={{ fontSize:10, color:C.muted, fontFamily:"sans-serif" }}>{stampedRegions.length} / 5 stamped</div>} />
      <div style={{ maxWidth:860, margin:"0 auto", padding:"2.5rem 1.5rem" }}>
        <div style={{ background:C.navyDeep, border:"1px solid #1e3a6e", padding:"1.25rem", marginBottom:"2rem", textAlign:"center" }}>
          <div style={{ fontSize:9, letterSpacing:"0.2em", color:C.mutedDark, fontFamily:"sans-serif", marginBottom:10 }}>YOUR PASSPORT</div>
          <div style={{ display:"flex", justifyContent:"center", gap:12, flexWrap:"wrap", marginBottom:12 }}>
            {REGIONS_COURSE.map(r => (
              <div key={r.id} style={{ display:"inline-flex", flexDirection:"column", alignItems:"center", justifyContent:"center", width:64, height:64, borderRadius:"50%", border:`1.5px ${stampedRegions.includes(r.id)?"solid":"dashed"} #b8963e`, background:stampedRegions.includes(r.id)?"rgba(184,150,62,0.12)":"transparent", opacity:stampedRegions.includes(r.id)?1:0.3 }}>
                <div style={{ fontSize:6.5, color:C.gold, fontFamily:"sans-serif", textAlign:"center", lineHeight:1.35, whiteSpace:"pre-line" }}>{r.label.toUpperCase().replace(" ", "
")}</div>
              </div>
            ))}
          </div>
          {stampedRegions.length === 5 && <button onClick={() => setPhase("certificate")} style={{ padding:"10px 24px", background:C.gold, color:C.navyDeep, border:"none", cursor:"pointer", fontSize:12, fontWeight:700, fontFamily:"sans-serif", letterSpacing:"0.1em" }}>Claim Your Certificate →</button>}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(240px,1fr))", gap:16 }}>
          {REGIONS_COURSE.map(r => (
            <div key={r.id} onClick={() => selectRegion(r.id)} style={{ background:C.navyDeep, border:`1px solid ${stampedRegions.includes(r.id)?C.gold:"#1e3a6e"}`, padding:"1.5rem", cursor:"pointer", transition:"border-color 0.2s", position:"relative" }}
              onMouseEnter={e => e.currentTarget.style.borderColor=C.gold}
              onMouseLeave={e => e.currentTarget.style.borderColor=stampedRegions.includes(r.id)?C.gold:"#1e3a6e"}>
              {stampedRegions.includes(r.id) && <div style={{ position:"absolute", top:8, right:8, color:C.gold, fontSize:12 }}>✦</div>}
              <div style={{ fontSize:9, letterSpacing:"0.2em", color:C.goldDim, fontFamily:"sans-serif", marginBottom:6 }}>DESTINATION</div>
              <div style={{ fontSize:18, color:C.goldLight, fontFamily:"Georgia,serif", marginBottom:4 }}>{r.label}</div>
              <div style={{ fontSize:10, color:C.muted, fontFamily:"sans-serif", marginBottom:10 }}>{r.desc}</div>
              <div style={{ fontSize:11, color:C.creamDim, lineHeight:1.65, fontFamily:"sans-serif", marginBottom:12 }}>{r.context.slice(0,120)}...</div>
              <div style={{ fontSize:10, color:C.gold, fontFamily:"sans-serif", letterSpacing:"0.08em" }}>{stampedRegions.includes(r.id)?"STAMPED — REVISIT →":"ENTER REGION →"}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (phase === "roster" && region) return (
    <div style={{ minHeight:"100vh", background:C.dark, color:C.cream, fontFamily:"Georgia,serif" }}>
      <NavBar left={<button onClick={() => setPhase("map")} style={{ background:"none", border:"1px solid #b8963e", color:"#b8963e", padding:"6px 14px", borderRadius:"20px", cursor:"pointer", fontSize:"13px", fontFamily:"sans-serif" }}>← Map</button>} title={region.label + " — Your Roster"} />
      <div style={{ maxWidth:900, margin:"0 auto", padding:"2rem 1.5rem" }}>
        <div style={{ background:C.navyDeep, border:"1px solid #1e3a6e", padding:"1rem 1.25rem", marginBottom:"1.5rem" }}>
          <div style={{ fontSize:9, letterSpacing:"0.2em", color:C.gold, fontFamily:"sans-serif", marginBottom:6 }}>REGIONAL CONTEXT</div>
          <p style={{ fontSize:12, color:C.creamDim, lineHeight:1.75, fontFamily:"sans-serif", margin:0 }}>{region.context}</p>
        </div>
        <p style={{ fontSize:11, color:C.muted, fontFamily:"sans-serif", marginBottom:"1rem", lineHeight:1.65 }}>Select who you wish to pursue. You may reveal intelligence files before committing. You can switch women at any point — but switching has consequences.</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(200px,1fr))", gap:14, marginBottom:"1.5rem" }}>
          {region.women.map(w => (
            <ProfileCard key={w.id} woman={w} selected={selectedWomanId === w.id} onSelect={() => setSelectedWomanId(w.id)} revealed={revealedCards.includes(w.id)} />
          ))}
        </div>
        <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
          <button onClick={startScenario} disabled={!selectedWomanId} style={{ padding:"12px 28px", background:selectedWomanId?C.gold:"#1e3a6e", color:selectedWomanId?C.navyDeep:C.mutedDark, border:"none", cursor:selectedWomanId?"pointer":"default", fontSize:12, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", fontFamily:"sans-serif" }}>Begin Scenario →</button>
          <button onClick={revealNext} disabled={revealedCards.length >= 3} style={{ padding:"12px 20px", background:"transparent", color:revealedCards.length>=3?C.mutedDark:C.muted, border:"1px solid #1e3a6e", cursor:revealedCards.length>=3?"default":"pointer", fontSize:11, fontFamily:"sans-serif" }}>Reveal Intelligence ({3 - revealedCards.length} remaining)</button>
        </div>
      </div>
    </div>
  );

  if (phase === "scenario" && region && woman) {
    const scenes = woman.scenes || [];
    const scene = scenes[sceneIndex];
    if (!scene) return null;
    return (
      <div style={{ minHeight:"100vh", background:C.dark, color:C.cream, fontFamily:"Georgia,serif" }}>
        <NavBar left={<button onClick={() => setPhase("roster")} style={{ background:"none", border:"1px solid #b8963e", color:"#b8963e", padding:"6px 14px", borderRadius:"20px", cursor:"pointer", fontSize:"13px", fontFamily:"sans-serif" }}>← Roster</button>} title={region.label + " · Scene " + (sceneIndex+1) + " of " + scenes.length} right={<div style={{ fontSize:9, color:C.mutedDark, fontFamily:"sans-serif" }}>Pursuing {woman.name}</div>} />
        <div style={{ maxWidth:680, margin:"0 auto", padding:"2rem 1.5rem" }}>
          <div style={{ display:"flex", gap:8, marginBottom:"1.5rem", flexWrap:"wrap", alignItems:"center" }}>
            {region.women.map(w => (
              <div key={w.id} style={{ padding:"4px 10px", background:w.id===selectedWomanId?"rgba(184,150,62,0.15)":C.navyDeep, border:`1px solid ${w.id===selectedWomanId?C.gold:"#1e3a6e"}`, fontSize:9, fontFamily:"sans-serif", cursor:w.id!==selectedWomanId?"pointer":"default" }}
                onClick={() => { if (w.id !== selectedWomanId) { setSelectedWomanId(w.id); setSceneIndex(0); setChoiceHistory([]); setLastConsequence(null); }}}>
                <span style={{ color:w.id===selectedWomanId?C.goldLight:C.mutedDark }}>{w.name}</span>
                <span style={{ color:w.id===selectedWomanId?C.gold:"#2a3a5e", marginLeft:6 }}>{w.id===selectedWomanId?"● ACTIVE":"○"}</span>
              </div>
            ))}
          </div>

          {lastConsequence && (
            <div style={{ background:"rgba(184,150,62,0.06)", border:"0.5px solid #b8963e", padding:"1rem 1.25rem", marginBottom:"1.5rem" }}>
              <div style={{ fontSize:9, letterSpacing:"0.15em", color:C.goldDim, fontFamily:"sans-serif", marginBottom:6 }}>CONSEQUENCE OF YOUR LAST DECISION</div>
              <p style={{ fontSize:13, color:C.creamDim, lineHeight:1.75, fontFamily:"sans-serif", margin:0, fontStyle:"italic" }}>{lastConsequence}</p>
            </div>
          )}

          <div style={{ background:C.navyDeep, border:"1px solid #1e3a6e", borderLeft:"3px solid #b8963e", padding:"1.25rem", marginBottom:"1.5rem" }}>
            <div style={{ fontSize:9, letterSpacing:"0.15em", color:C.gold, fontFamily:"sans-serif", marginBottom:8 }}>THE SITUATION</div>
            <p style={{ fontSize:"clamp(13px,1.8vw,15px)", color:C.creamDim, lineHeight:1.85, fontFamily:"sans-serif", margin:0 }}>{scene.setup}</p>
          </div>

          <div style={{ fontSize:9, letterSpacing:"0.15em", color:C.gold, fontFamily:"sans-serif", marginBottom:10 }}>DECISION POINT — What do you do?</div>
          {scene.choices.map((choice, ci) => (
            <button key={ci} onClick={() => handleChoice(choice)} style={{ width:"100%", textAlign:"left", padding:"1rem 1.25rem", background:C.navyDeep, border:"1px solid #1e3a6e", cursor:"pointer", marginBottom:8, fontFamily:"sans-serif", display:"block" }}
              onMouseEnter={e => e.currentTarget.style.borderColor=C.gold}
              onMouseLeave={e => e.currentTarget.style.borderColor="#1e3a6e"}>
              <div style={{ fontSize:9, color:C.goldDim, letterSpacing:"0.1em", marginBottom:4 }}>DECISION {ci+1}</div>
              <div style={{ fontSize:13, color:C.cream, lineHeight:1.6 }}>{choice.text}</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (phase === "outcome" && region && outcome) {
    const color = ENDING_COLORS[outcome] || "#b8963e";
    const endingText = woman && woman.endings && woman.endings[outcome] ? woman.endings[outcome] : (region.endings[outcome] || "Your arc is complete.");
    return (
      <div style={{ minHeight:"100vh", background:C.dark, color:C.cream, fontFamily:"Georgia,serif" }}>
        <NavBar title={region.label + " — Outcome"} />
        <div style={{ maxWidth:640, margin:"0 auto", padding:"3rem 1.5rem" }}>
          <div style={{ textAlign:"center", marginBottom:"2rem" }}>
            <div style={{ fontSize:9, letterSpacing:"0.3em", color, fontFamily:"sans-serif", marginBottom:8 }}>ENDING</div>
            <div style={{ fontSize:"clamp(16px,2.5vw,22px)", color, fontFamily:"Georgia,serif", marginBottom:16 }}>{ENDING_LABELS[outcome] || outcome}</div>
            <div style={{ width:48, height:2, background:color, margin:"0 auto" }} />
          </div>
          {lastConsequence && (
            <div style={{ background:"rgba(184,150,62,0.06)", border:"0.5px solid #b8963e", padding:"1rem 1.25rem", marginBottom:"1.5rem" }}>
              <div style={{ fontSize:9, letterSpacing:"0.15em", color:C.goldDim, fontFamily:"sans-serif", marginBottom:6 }}>YOUR FINAL DECISION LED TO</div>
              <p style={{ fontSize:12, color:C.creamDim, lineHeight:1.75, fontFamily:"sans-serif", margin:0, fontStyle:"italic" }}>{lastConsequence}</p>
            </div>
          )}
          <div style={{ background:C.navyDeep, border:`1px solid ${color}`, borderLeft:`4px solid ${color}`, padding:"1.5rem", marginBottom:"1.5rem" }}>
            <p style={{ fontSize:"clamp(13px,1.8vw,15px)", color:C.creamDim, lineHeight:1.9, fontFamily:"sans-serif", margin:0 }}>{endingText}</p>
          </div>
          <div style={{ display:"flex", gap:10, flexWrap:"wrap", justifyContent:"center" }}>
            <button onClick={() => { setChoiceHistory([]); setSceneIndex(0); setOutcome(null); setLastConsequence(null); setPhase("scenario"); }} style={{ padding:"10px 20px", background:"transparent", color:C.gold, border:`1px solid ${C.gold}`, cursor:"pointer", fontSize:11, fontFamily:"sans-serif" }}>Replay This Arc</button>
            <button onClick={() => { setSelectedWomanId(null); setPhase("roster"); }} style={{ padding:"10px 20px", background:"transparent", color:C.muted, border:"1px solid #1e3a6e", cursor:"pointer", fontSize:11, fontFamily:"sans-serif" }}>Try a Different Woman</button>
            <button onClick={completeRegion} style={{ padding:"10px 20px", background:C.gold, color:C.navyDeep, border:"none", cursor:"pointer", fontSize:11, fontWeight:700, fontFamily:"sans-serif" }}>{stampedRegions.includes(activeRegionId)?"Return to Map →":"Stamp Passport & Continue →"}</button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "certificate") return (
    <div style={{ minHeight:"100vh", background:C.dark, color:C.cream, fontFamily:"Georgia,serif" }}>
      <NavBar left={<button onClick={goBack} style={{ background:"none", border:"1px solid #b8963e", color:"#b8963e", padding:"6px 14px", borderRadius:"20px", cursor:"pointer", fontSize:"13px", fontFamily:"sans-serif" }}>← Library</button>} title="Certificate of Commission" />
      <div style={{ maxWidth:600, margin:"0 auto", padding:"3rem 1.5rem", textAlign:"center" }}>
        <div style={{ background:"linear-gradient(160deg,#0f2347,#1a3a6b)", border:"2px solid #b8963e", padding:"3rem 2rem", position:"relative", boxShadow:"0 20px 60px rgba(0,0,0,0.5)" }}>
          {["top-left","top-right","bottom-left","bottom-right"].map(p => (
            <div key={p} style={{ position:"absolute", [p.includes("top")?"top":"bottom"]:12, [p.includes("left")?"left":"right"]:14, fontSize:16, color:C.gold, opacity:0.4 }}>✦</div>
          ))}
          <div style={{ fontSize:9, letterSpacing:"0.3em", color:C.muted, fontFamily:"sans-serif", marginBottom:16 }}>THE INTERNATIONAL LOVER™</div>
          <svg viewBox="0 0 60 72" width={52} style={{ display:"block", margin:"0 auto 16px" }}>
            <path d="M30 2 L54 10 L54 38 C54 54 43 64 30 70 C17 64 6 54 6 38 L6 10 Z" fill="none" stroke="#b8963e" strokeWidth="1.5"/>
            <path d="M30 8 L50 15 L50 38 C50 52 40 61 30 66 C20 61 10 52 10 38 L10 15 Z" fill="#091a35" stroke="#7a6228" strokeWidth="0.75"/>
            <text x="30" y="42" textAnchor="middle" fill="#b8963e" fontSize="14" fontFamily="sans-serif" fontWeight="700" letterSpacing="1">IL</text>
            <text x="30" y="10" textAnchor="middle" fill="#b8963e" fontSize="10">✦</text>
          </svg>
          <div style={{ display:"flex", justifyContent:"center", gap:8, margin:"16px 0", flexWrap:"wrap" }}>
            {REGIONS_COURSE.map(r => (
              <div key={r.id} style={{ display:"inline-flex", flexDirection:"column", alignItems:"center", justifyContent:"center", width:44, height:44, borderRadius:"50%", border:"1.5px solid #b8963e", background:"rgba(184,150,62,0.12)" }}>
                <div style={{ fontSize:5.5, color:C.gold, fontFamily:"sans-serif", textAlign:"center", lineHeight:1.3 }}>{r.label.split(" ").map(w=>w.slice(0,3).toUpperCase()).join(" ")}</div>
              </div>
            ))}
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
            <div style={{ flex:1, height:"0.5px", background:"linear-gradient(to right,transparent,#b8963e)" }} />
            <div style={{ color:C.gold, fontSize:12 }}>✦</div>
            <div style={{ flex:1, height:"0.5px", background:"linear-gradient(to left,transparent,#b8963e)" }} />
          </div>
          <div style={{ fontSize:10, letterSpacing:"0.2em", color:C.muted, fontFamily:"sans-serif", marginBottom:10 }}>CERTIFICATE OF COMMISSION</div>
          <div style={{ fontSize:13, color:C.creamDim, marginBottom:12 }}>This certifies that</div>
          <div style={{ fontSize:"clamp(20px,3.5vw,26px)", fontFamily:"Georgia,serif", color:C.goldLight, fontStyle:"italic", borderBottom:"1px solid #b8963e", paddingBottom:10, marginBottom:14, display:"inline-block", minWidth:220 }}>The Bearer</div>
          <p style={{ fontSize:11, color:C.creamDim, lineHeight:1.85, maxWidth:420, margin:"0 auto 16px", fontStyle:"italic", fontFamily:"sans-serif" }}>having demonstrated the knowledge, cultural intelligence, and discernment required — is hereby commissioned to venture forth as an International Lover. All nations: recognize and allow the bearer to pass freely without delay or hindrance.</p>
          <div style={{ fontSize:12, color:C.muted, fontFamily:"sans-serif", letterSpacing:"0.08em" }}>The International Lover™</div>
        </div>
        <div style={{ marginTop:20, display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
          <button onClick={() => window.print()} style={{ padding:"10px 22px", background:C.gold, color:C.navyDeep, border:"none", cursor:"pointer", fontSize:12, fontWeight:700, fontFamily:"sans-serif" }}>Print / Save Certificate</button>
          <button onClick={goBack} style={{ padding:"10px 22px", background:"transparent", color:C.muted, border:"1px solid #1e3a6e", cursor:"pointer", fontSize:12, fontFamily:"sans-serif" }}>← Library</button>
        </div>
      </div>
    </div>
  );

  return null;
}
