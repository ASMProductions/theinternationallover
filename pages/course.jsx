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

function Portrait({ id, name }) {
  return (
    <div style={{ width:"100%", height:180, overflow:"hidden", background:"#0f2347", position:"relative" }}>
      <img
        src={"/women/" + id + ".jpg"}
        alt={name}
        style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top", display:"block" }}
        onError={e => { e.target.style.display="none"; }}
      />
    </div>
  );
}

const REGIONS_COURSE = [
  {
    id:"na", label:"North Africa", desc:"Morocco - Tunisia - Algeria - Egypt",
    context:"North Africa operates on a high-context cultural framework. What is not said carries as much weight as what is. Family honor is structural. A father's silence is not indifference - it is evaluation. Islam governs the rhythm of daily life.",
    women:[
      { id:"nadia", name:"Nadia", age:24, city:"Fez, Morocco", religion:"Muslim (practicing)", platform:"Muslima.com",
        profileText:"I am a teacher. I love books and the Arabic language. I come from a family that holds education and faith as its highest values. I am not looking for adventure. I am looking for a husband who is serious about building a home. My father will speak for me when the time is right.",
        hidden:"Her father is a retired Arabic calligrapher. Her mother passed away three years ago. She is the eldest of four siblings. She has never been on a platform before. She has not responded to the last eleven messages she received.",
        signal:"Her profile has been active four months. Zero responses. Most men interpret this as disinterest. It is neither.",
        type:"genuine" },
      { id:"yasmine", name:"Yasmine", age:22, city:"Casablanca, Morocco", religion:"Muslim (moderate)", platform:"Muslima.com",
        profileText:"I am a young woman who loves life, travel, and learning new things. American men seem to understand women better than men here. I want a partner who will treat me with respect. I believe love has no borders.",
        hidden:"Yasmine has been on this platform for fourteen months. She has initiated contact with forty-three men. Three sent money before disappearing. She has a boyfriend named Karim who encouraged the platform.",
        signal:"She responds within minutes, in fluent English, with warmth and specificity. It feels like being seen.",
        type:"fraud" },
      { id:"fatima", name:"Fatima-Zahra", age:27, city:"Meknes, Morocco", religion:"Muslim (deeply practicing)", platform:"Muslima.com",
        profileText:"I seek a husband who fears Allah and leads his home with knowledge and wisdom. My father will conduct all initial communications on my behalf. If you are serious, write to him directly.",
        hidden:"Her father is a respected Islamic scholar. He has already turned away six suitors. She does not know this profile exists.",
        signal:"You cannot contact her directly. Most men skip this one entirely. The ones who do not are immediately in a different category.",
        type:"genuine_wrong" },
    ],
  },
  {
    id:"me", label:"Middle East", desc:"Jordan - Lebanon - Yemen - Syria",
    context:"Family is the primary social unit around which everything is organized. A man who courts a woman without courting her family is not a serious man. Religion is not personal - it is communal.",
    women:[
      { id:"sara", name:"Sara", age:26, city:"Amman, Jordan", religion:"Muslim (practicing)", platform:"Muslima.com",
        profileText:"I am a nurse and I believe in service. I am looking for a man who understands that a good wife is built from character, not from beauty. I have my parents blessing to use this platform. I am ready for marriage. I am not ready for games.",
        hidden:"She has had serious correspondence with two men before. Both ended badly. She is careful now in a way she was not before.",
        signal:"The profile reads like a woman who has been disappointed but has not become cynical. That distinction matters.",
        type:"genuine" },
      { id:"hessa", name:"Hessa", age:23, city:"Beirut, Lebanon", religion:"Muslim (cultural)", platform:"Muslima.com",
        profileText:"I am curious about everything. I believe the world is larger than where you were born. I am looking for a man who is going somewhere and who wants to take me with him.",
        hidden:"Her father is a former journalist forced to leave Lebanon in 2019. The family has been in financial difficulty since. Whether her attraction is to marriage, a particular man, or a different country is a question she has not fully answered for herself.",
        signal:"The profile is written for a Western man. This can mean she is genuinely bicultural. It can also mean she is performing for an audience.",
        type:"genuine_wrong" },
      { id:"maryam", name:"Maryam", age:29, city:"Irbid, Jordan", religion:"Muslim (deeply practicing)", platform:"Muslima.com",
        profileText:"I have spent my life studying words. I understand their weight. I will not spend them carelessly here. I am looking for a man of substance. My brother manages this account on my behalf.",
        hidden:"Maryam has a published book of Arabic poetry used in secondary schools. Her brother has turned away six inquiries without telling her.",
        signal:"The platform shows this account has been active eleven months with one recorded inquiry sent to someone else. She reached out once. That person did not respond.",
        type:"genuine" },
    ],
  },
  {
    id:"as", label:"Asia", desc:"Indonesia - Philippines - Bangladesh",
    context:"The common threads: family embeddedness, high-context communication, and the reality that the economic gap between an American man and her family can distort the power dynamic significantly.",
    women:[
      { id:"amira", name:"Amira", age:25, city:"Yogyakarta, Indonesia", religion:"Muslim (traditionalist)", platform:"Muslima.com",
        profileText:"My family is my world. My faith is my foundation. I am not looking for a man to take me somewhere. I am looking for a man to build something with me — here or wherever Allah wills. My father speaks for me.",
        hidden:"Her father is an imam. She has no strong desire to go to America. She is genuinely indifferent to geography. This will confuse men who assume she wants an exit.",
        signal:"Most men assume she wants to leave. Her profile does not say this. Most men miss that.",
        type:"genuine" },
      { id:"jasmine", name:"Jasmine", age:24, city:"Cebu, Philippines", religion:"Catholic", platform:"ChristianMingle",
        profileText:"Family is everything to me. I take care of my parents and my two younger brothers. I want a husband who understands that when you marry me, you marry my whole family. Not in a burden way — in a love way.",
        hidden:"Her father has a heart condition. She sends forty percent of her salary home monthly. She has a two-year-old son she has not disclosed. She intends to when she trusts you enough.",
        signal:"The profile is honest about family embeddedness. What it does not say will surface when she trusts you.",
        type:"genuine_wrong" },
      { id:"nurul", name:"Nurul", age:28, city:"Dhaka, Bangladesh", religion:"Muslim (practicing privately)", platform:"Muslima.com",
        profileText:"I believe marriage is a partnership. I am not looking to be managed. I am looking for a man who is secure enough to be beside me rather than above me. I am traditional in my values and contemporary in my methods.",
        hidden:"She has been here two months after four years of family introductions that failed. She is here not because she wants a foreign man but because the men in her community cannot accept what she is.",
        signal:"The test of this arc is not whether you can vet her. It is whether you are the man she would accept.",
        type:"genuine" },
    ],
  },
  {
    id:"la", label:"Latin America", desc:"Colombia - Dominican Republic - Peru",
    context:"Latin America is the arc with the most dangerous false sense of familiarity. The man who enters thinking he understands it because he has watched Spanish-language television has not begun to understand it.",
    women:[
      { id:"valentina", name:"Valentina", age:27, city:"Medellin, Colombia", religion:"Catholic (practicing)", platform:"SimplyMarry.com",
        profileText:"I believe a home needs a foundation. I am not looking for a vacation. I am looking for a husband. If you are serious, I will know. If you are not, I will also know.",
        hidden:"She was engaged three years ago to a man who left her two months before the wedding. She has ended three previous platform conversations because she felt something was being performed rather than lived.",
        signal:"The profile reads like a woman testing for authenticity before warmth. That is exactly what she is doing.",
        type:"genuine" },
      { id:"diana", name:"Diana", age:22, city:"Santo Domingo, Dominican Republic", religion:"Catholic (cultural)", platform:"SimplyMarry.com",
        profileText:"I want a better life. I am not ashamed to say this. My country is difficult. I work hard and I want a man who works hard with me. I want children and a home.",
        hidden:"Diana is honest. She wants a better life — that is genuine. She has a two-year-old son she has not included. She intends to disclose it once a connection is established.",
        signal:"How she handles the disclosure will tell you everything.",
        type:"genuine_wrong" },
      { id:"elena", name:"Elena", age:30, city:"Lima, Peru", religion:"Catholic with indigenous traditions", platform:"SimplyMarry.com",
        profileText:"I have spent years going into communities the city forgets. I have seen what a family without a father becomes. I do not want that for myself. I am looking for a serious man — not a perfect man, but a man who is committed to being better.",
        hidden:"She has been proposed to twice and declined both. She declined because one man said he would want her to stop working after children. She could not agree.",
        signal:"She has already filtered out men who could not accept her whole life.",
        type:"genuine" },
    ],
  },
  {
    id:"ss", label:"Sub-Saharan Africa", desc:"Senegal - Ghana - Ethiopia - Kenya",
    context:"Community is the primary unit of reality. The bride price negotiation is not a transaction — it is a covenant between two families. A man who treats it as a fee is immediately revealed as someone who does not understand what he is entering.",
    women:[
      { id:"fatou", name:"Fatou", age:26, city:"Dakar, Senegal", religion:"Muslim (Sufi - Tijaniyya)", platform:"Muslima.com",
        profileText:"I come from a family of teachers and scholars. My grandfather was a marabout. My father is a teacher. I am a teacher. I am looking for a man who understands that a wife brings more than her body to a home — she brings her lineage, her faith, and her gifts.",
        hidden:"The Tijaniyya order has its own practices and community obligations. A man who dismisses Sufi Islam will be filtered out by her family before he understands what happened.",
        signal:"The profile does not mention wanting to leave Senegal. It mentions wanting a man who understands lineage. These are different things.",
        type:"genuine" },
      { id:"abena", name:"Abena", age:24, city:"Accra, Ghana", religion:"Christian (Pentecostal)", platform:"SimplyMarry.com",
        profileText:"I believe God has a plan for every life. I believe that plan includes a good marriage and a family built on faith. I am not desperate — I am deliberate. My parents are involved in everything important that I do. This is not a warning. It is a promise.",
        hidden:"Her uncle is a well-known Pentecostal pastor. Her family will expect you to attend a service — not as cultural experience, as a statement of who you are. A secular man will not survive this evaluation.",
        signal:"The last line is telling you something precise. Receive it precisely.",
        type:"genuine_wrong" },
      { id:"tigist", name:"Tigist", age:28, city:"Addis Ababa, Ethiopia", religion:"Ethiopian Orthodox Christian", platform:"Muslima.com",
        profileText:"I am on this platform because my family asked me to consider men from outside Ethiopia. I am not certain this is the right path for me. But I am willing to be shown that it is. I am serious, faithful, and I will not waste your time if you do not waste mine.",
        hidden:"Ethiopian Orthodox Christianity has over 250 fasting days and its own liturgical calendar. Her family created this profile hoping she will meet an Ethiopian from the diaspora.",
        signal:"She says she is not certain this is the right path. That is not rejection. It is honesty. Most men read it as rejection.",
        type:"genuine" },
    ],
  },
];


const DEEP_SCENARIOS = {
  abena: {
    scenes: [
      {
        title: `The First Question`,
        setup: `Abena responds within a day. She is warm and direct and her first question is: 'Do you have a church or faith community where you are?' This is the first question. Not the background question. The first question.`,
        choices: [
          { text: `Answer honestly about your current relationship with faith — however incomplete`, consequence: `She follows up: 'Honest. I appreciate that more than a performance. What does faith mean to you when you are alone — not in community, but when you are by yourself and something difficult is happening?'`, flag: `honest_faith` },
          { text: `Tell her you are open to faith and to growth — which is true`, consequence: `She asks: 'Open to growth or committed to a path? Those are different things.' She has heard open to growth before. It usually means something that is not what she needs.`, flag: `tested` },
          { text: `Ask her what faith looks like in her daily life before answering`, consequence: `She tells you at length and with warmth. The Pentecostal rhythms — the church services, the fasting days, the prayer life, the community obligations. Then she waits for your answer. She is comparing what you say next to what she just described.`, flag: `context_received` },
        ],
      },
      {
        title: `Her Uncle`,
        setup: `Three weeks in. She mentions her uncle is a well-known Pentecostal pastor in Accra. She says it naturally, as though it is just a fact about her family. But then: 'He will want to meet you. He meets everyone. This is not optional in my family.' She pauses. 'He asks one question when he meets a man who is asking about someone in our family. I am not going to tell you what the question is.'`,
        choices: [
          { text: `Tell her you are not concerned about the question — you will answer it honestly whatever it is`, consequence: `She says: 'That is the correct attitude.' She does not tell you the question. When you eventually meet the uncle, the question is the only one that matters.`, flag: `attitude_correct` },
          { text: `Ask her to tell you what the question is so you can prepare`, consequence: `She shakes her head. 'If you prepare for it, the answer will be a prepared answer. He will know. The question is designed to receive an unprepared answer.' You accept this.`, flag: `accepted_no_preparation` },
          { text: `Ask her what she has observed the question reveal in other men`, consequence: `She tells you about two men who answered the question in ways her uncle could tell were performances. And one man who answered it in a way that made her uncle call her mother that night. She does not tell you what any of them said.`, flag: `context_without_answer` },
        ],
      },
      {
        title: `The Faith Question Deepens`,
        setup: `Two months. The faith conversation has continued in every exchange. She asks now: 'I need to understand something. Are you someone who respects faith as a thing that other people do — like respecting someone's diet — or are you someone for whom faith is a living thing, even if yours is different from mine or incomplete?'`,
        choices: [
          { text: `Tell her honestly which one you are and describe what faith is for you specifically`, consequence: `She is quiet for a moment. Then: 'I have asked this question seven times. Six men gave me the respectful-of-others-diets answer. You gave me the living-thing answer. I need it to be the living-thing answer.' She means this.`, flag: `living_faith` },
          { text: `Tell her that your faith is still forming and that you are in the process of understanding what it is`, consequence: `She says: 'In formation is different from absent. I can work with in formation. What I cannot work with is someone who believes faith is for other people.' You tell her where you actually are. She listens fully.`, flag: `in_formation` },
          { text: `Ask her what she needs from a husband's faith — specifically, not generally`, consequence: `She tells you. It is specific. She needs a man who can stand in a church service and not be performing tolerance — who can actually be present. Who can pray. Who takes the spiritual life seriously even if his tradition is different. 'My family will see the difference,' she says.`, flag: `specific_need` },
        ],
      },
      {
        title: `The Family Service`,
        setup: `Three months. You visit Accra. On Sunday morning you attend her uncle's church. The service is three and a half hours. It is full-body, full-voice, fully present. You are the only American in the room. Her uncle is preaching. At one point he looks directly at you and speaks — in English — for four sentences that are clearly about you without being about you. The congregation laughs warmly. You do not know what to do.`,
        choices: [
          { text: `Laugh with them — you understand you are being welcomed in a form that requires participation`, consequence: `Her uncle smiles once, then continues. After the service he finds you in the crowd before you find him. He says: 'You laughed. That means you are paying attention.'`, flag: `participated` },
          { text: `Remain still and respectful — you do not want to perform an emotion you do not feel`, consequence: `Her uncle notes the stillness. After the service he finds you. 'You did not laugh with us.' He says it without judgment. 'Why?' Your answer to this question matters more than the laugh.`, flag: `honest_stillness` },
          { text: `Follow Abena's lead completely — do what she does`, consequence: `She is leading. Following her through the service means you are fully present in it. Her uncle watches this. After the service he says to her, in Twi: 'He follows your lead. That is good. Now I want to see if he has his own faith or only follows.'`, flag: `following_not_enough` },
        ],
      },
      {
        title: `The Uncle's Question`,
        setup: `After the service. Her uncle asks to speak with you alone. He is warm and direct. He says: 'I have one question. I ask it of every man who comes to this family asking about one of our daughters. Take whatever time you need. There is no correct answer — only your answer.' He pauses. 'What do you believe you owe God?'`,
        choices: [
          { text: `Answer from what you actually believe — specifically, not generally`, consequence: `He listens without interrupting. When you finish he is quiet for a long moment. Then: 'You answered it as though the question was real. That is what I was looking for.' He calls Abena's father that evening.`, flag: `answered_as_real` },
          { text: `Tell him you do not know but that the question itself tells you something important about what you are still learning`, consequence: `He looks at you carefully. 'Not knowing and saying so is better than knowing and performing. What does the question tell you?' The conversation goes deeper.`, flag: `honest_not_knowing` },
          { text: `Ask him what he believes before answering`, consequence: `He says: 'I am asking you.' He is not being difficult. He genuinely needs your answer, not an echo of his. Try again.`, flag: `deflected` },
        ],
      },
      {
        title: `The Decision`,
        setup: `Her uncle spoke to her father. Her father spoke to her mother. Her mother spoke to Abena. Abena calls you. She says: 'My family has discussed you. I want to tell you what they have decided and then I want to tell you what I have decided. They are the same decision but the reasons are different and I want you to understand both.'`,
        choices: [
          { text: `Tell her you want to hear both — the family's reasons and her reasons`, consequence: `She tells you both. The family reasons are about faith and character and the evidence of the service and the uncle's conversation. Her reasons are about what she has observed over four months in every exchange. They are specific and exact and she has been building this assessment since day one.`, flag: `success` },
          { text: `Tell her you only need to hear her reasons — the family's decision is theirs and hers is the one that matters to you`, consequence: `She says: 'They are not separable. When you marry me you marry what I come from. I need you to understand that the family's reasons are also reasons you should care about.' She is right. You listen to both.`, flag: `corrected_rightly` },
          { text: `Ask her what she needed to see from you that she did not know she was looking for when this began`, consequence: `She thinks for a long time. 'I needed to see that you could be present in our world without needing to be the center of it. You were present. You followed my lead and you also brought yourself. That is not easy.' She gives you her answer.`, flag: `success` },
        ],
      },
    ],
    endings: {
      success: `The engagement follows Ghanaian tradition, managed by both families. The ceremony is in Accra. Her uncle performs the blessing. The church is full. You stand in it without performing and without disappearing — you are simply present, which turns out to be exactly what was needed. The marriage is built on two faiths in conversation rather than one faith tolerated by the other. Her uncle says at the reception: 'A man who can answer the question as though it is real is a man who will keep answering it for the rest of his life.'`,
      genuine_wrong: `You attended every service and you were respectful and the faith was not yours and over time the gap between presence and participation became something the marriage could feel. She had needed a man whose faith was a living thing. Yours was alive but not in the same way. The marriage was good. The faith remained a distance between you that neither of you could close because neither of you had been dishonest — you had simply discovered that the two living things could not fully merge.`,
    },
  },
  amira: {
    scenes: [
      {
        title: `The Father's Gate`,
        setup: `Amira's profile: 'My father speaks for me.' You write to her father. He is an imam of a small mosque in Yogyakarta. His reply arrives in a week. It is warm and careful. He asks three things: your faith, your intentions, and — unexpectedly — what you know about Java.`,
        choices: [
          { text: `Answer the faith and intentions questions fully and admit you know little about Java but are willing to learn`, consequence: `'Willing to learn is the correct posture.' He asks what you have already done to learn. This is the real first question.`, flag: `honest` },
          { text: `Research Java and Javanese culture before answering and give a substantive response`, consequence: `He is surprised. 'Most men do not prepare before they write to me.' The correspondence takes on a different quality from this point.`, flag: `prepared` },
          { text: `Answer all three from what you currently know`, consequence: `Your answer on Java is thin. He notes this without saying so directly. His follow-up questions are more fundamental than they would have been otherwise.`, flag: `unprepared` },
        ],
      },
      {
        title: `What She Is Not Looking For`,
        setup: `Her father passes your correspondence to Amira and she begins writing herself — slowly, one message a week. After four exchanges she writes: 'Most men who write to my father believe I am looking for a way to leave. I am not looking for a way to leave. I am looking for a man to build with — here or wherever Allah wills. These are different things. I want to know if you understand the difference.'`,
        choices: [
          { text: `Tell her you understand and explain what building means to you`, consequence: `She asks a follow-up: 'If building meant staying in Indonesia, would you still be here?' Answer this carefully.`, flag: `tested` },
          { text: `Tell her honestly that you had assumed she wanted to come to America and ask her to help you understand what she actually wants`, consequence: `She appreciates the honesty. 'Most men do not admit this assumption. The ones who do not admit it carry it into the marriage.' The conversation deepens.`, flag: `honest_assumption` },
          { text: `Ask her what building would look like in her vision`, consequence: `She describes a life that is specific and grounded and almost entirely in Indonesia. You have to decide whether you can offer this or whether you have been thinking about the wrong thing entirely.`, flag: `listening` },
        ],
      },
      {
        title: `The Geography Question`,
        setup: `Three months. Her father raises the question directly in a call: 'My daughter is willing to go where the marriage requires. But I want to understand — are you willing to come here? Are you willing to build a life that includes this place, these people, this language? Or is America the assumption underneath everything you are offering?'`,
        choices: [
          { text: `Answer honestly: America has been the assumption and you are now reconsidering what you are actually offering`, consequence: `Long pause. 'Honesty before commitment is the most valuable thing you can give me.' He asks you to take two weeks to think about what you can genuinely offer and then call him back.`, flag: `honest_reconsideration` },
          { text: `Tell him you are open to building in Indonesia — and mean it`, consequence: `He asks specific questions about how this would work practically. He is not testing your willingness — he is testing whether your willingness has thought behind it.`, flag: `open` },
          { text: `Tell him America offers more opportunity and security and that Amira would thrive there`, consequence: `He receives this. 'You may be right about opportunity. But you have not answered my question.' He is asking about your flexibility, not about America's merits.`, flag: `missed_question` },
        ],
      },
      {
        title: `The Visit to Yogyakarta`,
        setup: `Four months. You visit. You stay three days. The first evening you eat with the family — the father, his wife, Amira's two brothers, and their grandmother. You do not see Amira directly. You meet her through the family's response to you. How you treat the grandmother tells them everything about how you will treat their daughter.`,
        choices: [
          { text: `Pay full attention to the grandmother — ask her about her life, listen to the stories`, consequence: `The father watches you for twenty minutes. When dinner ends he says, in Indonesian, something to his son. His son translates for you later: 'He said you have good manners for a man who does not know our customs.'`, flag: `attentive` },
          { text: `Focus your attention on the father and brothers — they are the decision-makers`, consequence: `The grandmother notices she has been bypassed. She does not say anything. But the energy of the room shifts slightly. The father notices this shift.`, flag: `strategic_but_wrong` },
          { text: `Try to speak some Indonesian even if imperfectly`, consequence: `The grandmother laughs — warmly, not cruelly. She says something and the whole table relaxes. The father's wife reaches over and pats your arm. You have passed something without knowing what it was.`, flag: `language_effort` },
        ],
      },
      {
        title: `The Meeting`,
        setup: `The second day. The father arranges for you to meet Amira with her mother present. It is thirty minutes. You cannot say everything. She speaks first: 'My father says you are willing to consider staying here. I want to know if you understand what that would mean — not the idea of it, but the actual life of it.'`,
        choices: [
          { text: `Tell her what you have learned about the life — specific, honest, including the hardships`, consequence: `She nods slowly. 'You have been paying attention.' She asks one more question: 'Are you willing to learn Indonesian — not to visit, but to live in?'`, flag: `specific` },
          { text: `Ask her to describe the actual life so you can respond to the reality rather than your imagination of it`, consequence: `She describes it. Specifically. The daily rhythms, the family obligations, the mosque schedule, the market, the rains. When she finishes she says: 'That is what I am asking if you can love.' Silence. This is the right kind of silence.`, flag: `listening` },
          { text: `Tell her you love her and that love means you will figure out the details`, consequence: `Her mother looks at the floor. Amira looks at you steadily. 'Love is not a plan.' The thirty minutes end quietly.`, flag: `insufficient` },
        ],
      },
      {
        title: `The Decision`,
        setup: `Third day. Her father calls you to sit with him alone for the first time. He says: 'I have seen enough to know your character. The question that remains is not about character. It is about commitment. My daughter is not looking for a man who will try. She has seen men who try. She is looking for a man who has decided. Have you decided?'`,
        choices: [
          { text: `Tell him yes — and state clearly what you have decided`, consequence: `He nods once. 'Then we will discuss the conditions.' The conditions take two hours. They are specific and fair. You agree to all of them.`, flag: `success` },
          { text: `Tell him you need more time to decide and ask for it honestly`, consequence: `He respects this. 'Take the time. But understand that time has a limit and she is watching whether you can finish.' You have three months.`, flag: `needs_time` },
          { text: `Ask him what his daughter has told him she needs from this decision`, consequence: `He tells you. It is not complicated. It is specific. She needs a man who will not decide and then revise. Who will decide and hold. 'Can you do that?' he asks. Answer him.`, flag: `clarifying` },
        ],
      },
    ],
    endings: {
      success: `The nikah is performed in Yogyakarta. The mosque is full. The grandmother is in the front row. You have learned enough Indonesian to speak your vows in her language — imperfectly, slowly, correctly. Her father weeps once and does not wipe his eyes. The first year is in Indonesia. You learn the language and the rains and the rhythms. In the second year you discuss what comes next together, as equals who have already proved something.`,
      cultural_fail: `You came with American assumptions underneath American openness. When the father asked in scene three whether America was the assumption underneath everything you were offering, your answer was technically honest but the assumption was still there. It surfaced in the visit. In the meeting. In the moment with the grandmother. The marriage did not fail because you were a bad man. It failed because you were a man shaped by a specific world trying to build a life in a different one, and the shaping won.`,
    },
  },
  diana: {
    scenes: [
      {
        title: `First Contact`,
        setup: `Diana responds within hours. Her message is direct and warm: 'I want a better life. I am not ashamed of that. I work hard. I want a man who works hard with me. I want children and a home and a husband who is faithful.' She asks about your family in the second paragraph.`,
        choices: [
          { text: `Answer her question about family and ask about hers`, consequence: `She writes about her parents, her neighborhood, her work. The warmth is real and the reality is also real — the country is difficult, the economic pressure is constant. She is not hiding any of this.`, flag: `open_about_reality` },
          { text: `Note that wanting a better life could mean many things and ask what she specifically means`, consequence: `She is slightly defensive at first, then honest: 'I mean I do not want to worry every month about whether there is enough. I mean I want my children to have options I did not have. Is that wrong?' It is not wrong.`, flag: `direct_question` },
          { text: `Respond to her warmth with warmth — the connection feels immediate and real`, consequence: `It is immediate and real. But immediacy is not depth. The warmth is genuine and it is also the opening of something that will require more than warmth to carry.`, flag: `warmth_first` },
        ],
      },
      {
        title: `The Building Connection`,
        setup: `Three weeks in. The daily conversations have built something. She is funny and specific and real. She references things you have told her. She remembers the names of the people you mention. She is present. Then one evening she says: 'There is something I want to tell you. I have been trying to find the right moment.'`,
        choices: [
          { text: `Tell her you are ready to hear it whenever she is ready to say it`, consequence: `She pauses one more day. Then tells you about her son. She is braced for you to disappear. She has watched men disappear before. The way you receive this will define everything.`, flag: `ready_to_receive` },
          { text: `Tell her she can tell you anything — that the connection you have built can hold it`, consequence: `She tells you. The son is two years old. His father is not in their lives. She waits. The silence is one of the most important silences of the arc.`, flag: `prepared_reception` },
          { text: `Ask her to just say it — you can tell she is carrying something and it is better out than in`, consequence: `She laughs once, nervously, and then tells you. 'His name is Miguel. He is two. He is the most important person in my life.' The disclosure is made. The real conversation begins now.`, flag: `direct_invitation` },
        ],
      },
      {
        title: `Receiving the Disclosure`,
        setup: `She has told you about her son. She is waiting. She has been waiting for three days in previous versions of this conversation and watched men vanish. She is ready to be hurt.`,
        choices: [
          { text: `Take 24 hours before responding — give the information the weight it deserves, then respond thoughtfully`, consequence: `She receives the pause with anxiety that becomes respect. When you respond she says: 'You did not disappear and you did not immediately say it is fine. You thought about it. That is the only honest response.'`, flag: `measured_honest` },
          { text: `Tell her immediately it does not change anything — you are still in`, consequence: `She asks: 'Have you thought about what it means? To be in a child's life and then possibly leave it? He has already lost one person.' She is not rejecting your acceptance. She is asking if your acceptance is real.`, flag: `immediate_untested` },
          { text: `Ask her about him first — his name, what he is like, what he loves`, consequence: `She was not expecting this question first. The warmth of her answer is different from anything you have heard from her. 'You asked about him first,' she says. 'Not about what it means for you.'`, flag: `child_first` },
        ],
      },
      {
        title: `The Step-Father Question`,
        setup: `Over the following weeks you talk about her son more and more. He becomes real to you. But one evening she asks the question directly: 'What does it mean to you to be a father to a child who is not biologically yours? Not in the beautiful version — in the version where he is sick and difficult and testing you and you are tired. What does it mean then?'`,
        choices: [
          { text: `Tell her honestly what you believe and what you are uncertain about`, consequence: `She says: 'The uncertainty is correct. Anyone who is not uncertain has not thought about it carefully enough. What I need is for the uncertainty to not become disappearance when it gets hard.'`, flag: `honest_uncertainty` },
          { text: `Tell her you will love him as your own — because in that moment you mean it`, consequence: `She says: 'Love is real. But love requires a specific kind of showing up that love alone does not guarantee. I need to know you understand the specific shape of the showing up.'`, flag: `love_not_enough` },
          { text: `Ask her what she has seen in step-fathers she knows — good and bad`, consequence: `She tells you about her cousin's husband — who adopted her cousin's daughter and never, not once, made the girl feel the difference. And about another man who promised the same and lasted fourteen months before the resentment surfaced. 'The ones who last,' she says, 'decided before they began.'`, flag: `learning_from_examples` },
        ],
      },
      {
        title: `Meeting Her Family`,
        setup: `Four months. You visit Santo Domingo. Her parents are warm. Her mother takes your measure in the first ten minutes with a series of questions that appear casual. Her father is quieter and watches. Her son is there. He is on his grandmother's lap watching you from across the room.`,
        choices: [
          { text: `Cross the room and introduce yourself to him at his level — carefully, without pressure`, consequence: `Her mother says something quietly to Diana. Diana translates later: 'She said you did not wait for him to come to you but you also did not force him.' The grandmother nods once. This moment travels through the rest of the visit.`, flag: `right_instinct` },
          { text: `Let the grandmother manage the introduction — this is her territory`, consequence: `He watches you from a safe distance for two days. He does not approach. On the last day he gives you a toy car and then takes it back. His grandmother laughs. Diana says: 'He does that with everyone at first. He showed you the car.'`, flag: `patient_correct` },
          { text: `Focus on the parents first — they are the gatekeepers`, consequence: `Her son watches you ignore him for an hour. He retreats further. Her mother notices. The visit is good but something is slightly unresolved.`, flag: `misread_the_room` },
        ],
      },
      {
        title: `The Decision`,
        setup: `After the visit. You are home. Diana calls. She says: 'I want to tell you what I have decided. But first I want to ask you one thing. When you imagine the life — not the beautiful parts, but the ordinary difficult parts — is it a life you have decided to choose? Or is it a life you are hoping will work out?'`,
        choices: [
          { text: `Tell her you have decided — and describe the specific life you are deciding for, difficult parts included`, consequence: `She is quiet. Then: 'That is what I needed to hear. Not the feeling — the decision.' She gives you her answer.`, flag: `success` },
          { text: `Tell her honestly you are hoping more than you have decided and ask if she can give you a little more time`, consequence: `She says: 'A little more time is honest. But I want you to understand that my son cannot be in someone's life provisionally. When you decide, it has to be a decision, not a hope.' She gives you three weeks.`, flag: `honest_not_ready` },
          { text: `Ask her what she has decided`, consequence: `She says: 'I have decided yes. But I need to know if you have also decided.' The decision has to be mutual or it is not a marriage.`, flag: `mutual_required` },
        ],
      },
    ],
    endings: {
      success: `You decided. She accepted. The process is long — the K-1 visa takes eight months. In that time you video call every day. Her son appears more and more often, staying longer each time, showing you things, testing you in the specific ways that small children test adults to see if they are reliable. When she arrives you are at the airport. Her son is asleep on her shoulder. She passes him to you before she picks up her bag. He does not wake. You carry him to the car.`,
      early_detect: `You were not ready to be a step-father and you said so honestly. She received it with the dignity of someone who had been lied to before and found honesty a relief even when it was painful. You ended it carefully. She thanked you for the honesty. You thanked her for her son — for what knowing him briefly had already changed in you.`,
      genuine_wrong: `The love was real. The decision felt real. But you had underestimated the specific weight of being a step-father over years rather than in the warmth of early love. It did not end in a single moment. It eroded. Her son is seven now. The marriage ended when he was five. The hardest part is not the marriage — it is knowing that he registered the departure.`,
    },
  },
  elena: {
    scenes: [
      {
        title: `The First Question`,
        setup: `She responds in 48 hours. She has read your profile carefully — she references three specific things in it. Then: 'I want to ask you something before we go further. What do you believe a wife owes her husband — and what does a husband owe his wife's work? I am asking both halves of the question deliberately.'`,
        choices: [
          { text: `Answer both halves directly from what you actually believe`, consequence: `She responds: 'I have asked this question before. Most men answer the first part fully and the second part vaguely. You did the opposite. Tell me why.' She is not criticizing — she is curious about the asymmetry.`, flag: `reversed_emphasis` },
          { text: `Ask her what prompted the question before answering — you want to understand what she is measuring`, consequence: `She tells you about the proposal that died. The man who said he would want her to stop working after children. The conversation that ended it. She is giving you the map before asking if you can read it.`, flag: `context_first` },
          { text: `Answer and then ask what prompted her to put this in her profile from the beginning`, consequence: `She says: 'Experience. I stopped waiting for the conversation to arrive on its own. Men reveal themselves in how they answer this question much more than in how they answer any other question.' You are being told exactly what is being measured.`, flag: `rubric_revealed` },
        ],
      },
      {
        title: `The Work She Does`,
        setup: `Three weeks in. You know what she does — community health work in villages outside Lima — but you have been speaking about it in general terms. She asks: 'What specifically do you understand about what I do? Not the summary version. The actual work.'`,
        choices: [
          { text: `Tell her honestly what you understand and what you do not — ask her to tell you more`, consequence: `She tells you. For two hours. The specific villages, the specific diseases, the specific politics of getting resources to places that do not have advocates. You are fully absorbed. She notices this.`, flag: `genuinely_interested` },
          { text: `Research her field before the next conversation and demonstrate you have prepared`, consequence: `She is surprised. 'You studied it.' She asks three specific questions that reveal whether you studied the surface or the depth. The depth of your preparation reveals the depth of your interest.`, flag: `prepared` },
          { text: `Tell her you understand the importance and the sacrifice of the work she does`, consequence: `She says: 'You understand that I believe in it. I am asking if you understand what it actually is. There is a difference.' She is right. There is.`, flag: `summary_not_substance` },
        ],
      },
      {
        title: `The Proposal That Died`,
        setup: `Two months. She tells you about the man who proposed and then revised his proposal when children came into the conversation. She says: 'He was not a bad man. He was a man who had not thought carefully about what he was agreeing to before he agreed to it. I will not do that again — build something with someone who has not thought carefully.'`,
        choices: [
          { text: `Tell her specifically what you have thought about — regarding her work, regarding children, regarding what you are agreeing to`, consequence: `She listens carefully. She asks three follow-up questions, each one testing a different corner of what you have said. Each answer gives her more information. At the end she says: 'You have thought about it.'`, flag: `specific_thought` },
          { text: `Ask her what she would need to see from you over time to know that you had thought carefully`, consequence: `She gives you a list. It is not impossible. It is not simple. It requires you to be attentive in specific ways over time. 'The list is not a test,' she says. 'It is a description of the man I need. You can decide if that man is you.'`, flag: `list_received` },
          { text: `Tell her you are not that man — you are not the man who does not think carefully`, consequence: `She says: 'I know. But you are also not yet the man who has demonstrated it. That takes time. I am willing to take the time if you are.'`, flag: `patience_offered` },
        ],
      },
      {
        title: `Her Family`,
        setup: `Three months. You call with her parents. Her mother is warm and immediately assessing. Her father is an engineer who asks precise questions. But the person who matters most is her grandmother — ninety-two years old, fully present, who joins the call for fifteen minutes and asks you one thing: 'My granddaughter has given her life to people who are forgotten by the city. Are you a man who understands why someone would do that?'`,
        choices: [
          { text: `Answer from what you genuinely understand — even if that understanding is incomplete`, consequence: `She nods. 'Incomplete but honest understanding is the beginning. False complete understanding is the end.' She speaks to Elena for a moment in Quechua. Elena later translates: 'She said: he is listening.'`, flag: `honest_incomplete` },
          { text: `Tell her you are still learning to understand it but you are committed to the learning`, consequence: `She says: 'Commitment to learning is the right posture for a man entering our family.' She says something to Elena that makes Elena smile. You ask what it was. Elena says: 'She said you have good eyes for listening.'`, flag: `committed_learner` },
          { text: `Describe what you understand about what Elena has built and why someone would build it`, consequence: `She listens fully. At the end she says one sentence to Elena in Quechua. Elena's eyes fill briefly. Later: 'She said: this man has paid attention to who you are.'`, flag: `specific_seeing` },
        ],
      },
      {
        title: `The Visit to Lima`,
        setup: `Four months. You visit. The first day she takes you to one of her project communities — not the comfortable version, not the tour version. She wants you to see the actual work in the actual place. You spend six hours there. At the end of the day she says: 'What did you see?'`,
        choices: [
          { text: `Tell her specifically what you saw — the people, the system, the gaps, what she was doing in each moment`, consequence: `She is quiet for a moment. 'You were watching the work, not me doing the work. That is not the same thing. Thank you.' She takes your hand for the first time.`, flag: `saw_the_work` },
          { text: `Tell her you saw what she has built and what it costs her`, consequence: `She nods. 'Both things. Yes.' She asks: 'And what did you see in me specifically today?' You tell her. She listens. At the end she says: 'Keep talking.'`, flag: `saw_her` },
          { text: `Tell her you saw why you are here — that seeing her in this context confirmed something`, consequence: `She says: 'Tell me what it confirmed.' You tell her. She listens without interrupting. When you finish she says: 'You saw clearly. Most men do not see clearly when they are trying to impress me.'`, flag: `confirmed` },
        ],
      },
      {
        title: `The Only Question That Remains`,
        setup: `Last night in Lima. She comes to you with the same directness she has had from the beginning: 'I want to ask you the question that ended the last relationship. I am going to ask it differently. Not: will you let me keep working after we have children. But: have you decided, specifically, what your life will look like when there are children and I am also needed in the communities and there are not enough hours? Have you decided — not hoped, not intended — but decided?'`,
        choices: [
          { text: `Tell her specifically what you have decided — including the sacrifices it requires from you`, consequence: `She is still for a long time. Then: 'He was not willing to decide. You decided before I asked.' She gives you her answer that night.`, flag: `success` },
          { text: `Tell her you have thought about it deeply but you are not sure a decision is possible before you are actually in it`, consequence: `She says: 'That is honest. What I need to know is: are you the kind of man who decides in advance, or the kind who discovers what he has decided when circumstances demand it?' Both are real. Only one works for her.`, flag: `honest_uncertainty` },
          { text: `Ask her what she has decided — you want to build the answer together`, consequence: `She says: 'I have decided. I decided six weeks ago. I have been waiting to see if you would also decide, or if you would arrive at decision only if I told you I had already made mine.' Answer carefully. The order matters.`, flag: `order_matters` },
        ],
      },
    ],
    endings: {
      success: `The nikah is — she is Catholic, so it is a civil ceremony in Lima followed by a blessing from a local priest her grandmother has known for forty years. You learn enough Spanish in the months before the ceremony to speak your vows in her language. Her grandmother holds your face in both hands afterward and says something in Quechua you will spend years trying to have translated correctly. When her work requires sacrifice of your convenience, you do not revise. You decided. The decision holds.`,
      cultural_fail: `You said you had decided. You believed you had decided. When the children arrived and her communities still needed her and your convenience was consistently sacrificed, you discovered that what you had done was hope rather than decide. She had told you there was a difference. She had asked which one you were doing. Your answer had been true at the time. It was not true under pressure. She did not leave. She became quietly distant in the specific way that people become distant when they have been disappointed by a promise that was sincerely made and sincerely broken.`,
    },
  },
  fatima: {
    scenes: [
      {
        title: `The Letter`,
        setup: `Fatima-Zahra's profile instructs you to contact her father directly. You have one opportunity to make a first impression on a man who has already turned away six suitors without telling her.`,
        choices: [
          { text: `Write in English — professional, clear, direct about your intentions`, consequence: `He responds in Arabic. His English is perfect — he chose not to use it. His three questions arrive in classical Arabic. You need a translator for all three.`, flag: `english` },
          { text: `Write in Arabic — your proficiency is intermediate but the effort is the point`, consequence: `He responds the same day. He corrects one grammatical construction gently and then proceeds. 'A man who attempts the language of a woman's family is a man worth knowing.'`, flag: `arabic` },
          { text: `Research Islamic marriage protocols thoroughly before writing and reference them specifically`, consequence: `He reads the letter twice. He shares it with his brother. His response: 'You have studied. Most do not. What else have you studied?'`, flag: `studied` },
        ],
      },
      {
        title: `The Father's Questions`,
        setup: `His three questions have arrived. First: What is your relationship with Quran? Second: How do you intend to lead a household that she has been raised to expect led with knowledge? Third: What do you know of the Tijaniyya? The third question is a test most men would not even recognize as a test.`,
        choices: [
          { text: `Answer the first two fully and admit you know little of the Tijaniyya but are willing to learn`, consequence: `He receives the honesty on the third question with more warmth than the confident answers to the first two. 'Willingness to learn is rarer than knowledge already held.'`, flag: `honest` },
          { text: `Research the Tijaniyya before answering and give a substantive response to all three`, consequence: `He is surprised. He asks a follow-up question about the order that only someone who went past the surface would know to answer. You answer correctly. The correspondence changes tone.`, flag: `deep_study` },
          { text: `Answer all three from your current knowledge without additional research`, consequence: `Your answer on the Tijaniyya reveals the surface depth of your preparation. He is not harsh. He simply asks more questions. The bar has been raised.`, flag: `insufficient` },
        ],
      },
      {
        title: `The Distance Problem`,
        setup: `Two months of correspondence. He raises the question you knew was coming: 'My daughter has never left Morocco. She would be going to a country she has never seen, to a man her family cannot visit easily. How do you address this?'`,
        choices: [
          { text: `Commit to specific and frequent visits — give him a schedule he can hold you to`, consequence: `He asks how you will fund this over time. He is not testing your wealth — he is testing whether you have thought past the promise to the logistics.`, flag: `practical` },
          { text: `Propose that she and her mother visit America first, before any commitment is finalized`, consequence: `He pauses. This is not how it is done. But the respect for his wife implicit in the suggestion registers. He says he will consider it.`, flag: `thoughtful` },
          { text: `Tell him honestly that distance will be real and that you will not minimize it but will work to make it bearable`, consequence: `He appreciates the honesty. He says: 'Every father of a daughter who marries abroad carries this. What I need to know is that you understand the weight of what you are asking.'`, flag: `honest` },
        ],
      },
      {
        title: `Meeting Her`,
        setup: `Four months in. Her father has given permission for you to correspond with Fatima-Zahra directly — one message per week, reviewed by him before she receives it and her responses reviewed by him before you receive them. Your first direct message to her is the most important thing you have written.`,
        choices: [
          { text: `Write about what you have learned from the months of correspondence with her father`, consequence: `She responds — through him — with more warmth than her father's tone has prepared you for. She asks one question: 'What do you believe a wife is owed that has nothing to do with money?'`, flag: `reflective` },
          { text: `Ask her a question rather than making statements — let her set the terms`, consequence: `She responds. Her answer is precise and unexpected and reveals someone far more formed than the profile suggested. You have been corresponding with her father. You are now meeting her.`, flag: `listening` },
          { text: `Tell her directly what you are looking for and why you believe she might be it`, consequence: `Her father edits three lines before passing it. What she receives is still enough. She replies: 'I appreciate that you spoke directly. Most men speak around the thing they mean.'`, flag: `direct` },
        ],
      },
      {
        title: `The Religious Question`,
        setup: `She asks you directly in her third message: 'My father has not asked you this but I am asking you: where are you in your practice? Not where you intend to be — where are you now?'`,
        choices: [
          { text: `Answer with complete honesty about your current practice, however incomplete`, consequence: `She passes your answer to her father unedited. He calls you that evening. 'She showed me your answer. I want you to know that honesty in this moment counts more than the answer itself.'`, flag: `honest_faith` },
          { text: `Tell her what a man at your level of commitment to growth would say`, consequence: `Her father asks you a specific question about a specific practice the following week. Your answer reveals the gap. The correspondence pauses for two weeks.`, flag: `performed_faith` },
          { text: `Ask her what she needs from a husband's practice before answering — you want to understand what is required`, consequence: `She gives you a precise and non-negotiable list. Some of it you already practice. Some of it you would need to grow into. She is giving you the map before asking if you can read it.`, flag: `strategic` },
        ],
      },
      {
        title: `The Condition`,
        setup: `Her father calls. He says: 'I will give you my answer about my daughter. Before I do, I need to understand one thing. She is not going to America to become an American. She is going as herself. What I need to know is whether you are capable of protecting that — not just intending to, but capable of it.'`,
        choices: [
          { text: `Give him a specific answer about community, practice, language at home, and how you will guard the marriage from the culture around it`, consequence: `He says: 'Come to Fez. We will discuss the mahr.' Four months later the nikah is performed.`, flag: `success` },
          { text: `Tell him you believe in her strength and trust her to protect herself`, consequence: `Long silence. 'Her strength is not the question. The question is yours.' He is giving you another chance. Do not waste it.`, flag: `needs_work` },
          { text: `Ask him what he has seen happen to other daughters who went abroad without this protection`, consequence: `He tells you about two. The conversation takes an hour. At the end he says: 'You asked the right question. Call me next week with your answer to mine.'`, flag: `success` },
        ],
      },
    ],
    endings: {
      success: `The mahr is negotiated over two calls. The nikah is performed in Meknes. Her father reads from the Quran. Her mother weeps quietly. You weep also and do not hide it. The immigration process is eight months. When she arrives she brings three things: her grandmother's prayer beads, a letter from her father to be opened on your first anniversary, and herself — every part of herself, unchanged.`,
      cultural_fail: `You were not wrong in character. You were insufficient in depth. The Tijaniyya question was the first signal of what the arc would require. Each subsequent scene demanded more preparation than you brought. Her father ended it with warmth and finality. He said: 'You are a good man. She requires a specific kind of man. Those are not the same thing.'`,
      performed_faith: `You represented your faith as more complete than it was. She caught it in scene five. She passed the answer to her father. The correspondence paused and never fully recovered. He never called to say no. The silence became the answer.`,
    },
  },
  fatou: {
    scenes: [
      {
        title: `First Contact`,
        setup: `Fatou replies in four days. Formal, warm, and precise. She asks: 'What is your relationship with your own lineage — do you know where your people come from?' This is not curiosity. It is the first evaluation.`,
        choices: [
          { text: `Answer honestly — including what you do not know and why`, consequence: `'Many men from America do not know. But you have told me the truth of what you know and what you do not. That is its own kind of answer.' The correspondence deepens.`, flag: `honest_absence` },
          { text: `Research your lineage before answering — go deeper than you have gone before`, consequence: `She receives the research with evident surprise. 'You made an effort on a question most men would answer casually. That matters here.' Her father asks to read the correspondence.`, flag: `effort_made` },
          { text: `Ask her what the question is really asking beneath the surface`, consequence: `She says: 'It is asking whether you are a man with roots or a man who has cut his roots. A man without roots cannot understand what he is asking when he asks to enter a family like mine.'`, flag: `question_understood` },
        ],
      },
      {
        title: `The Tijaniyya`,
        setup: `Three weeks in. She writes at length about her grandfather the marabout, about the Tijaniyya order, about what the order means to her family and to the community. She ends with: 'This is not background information. This is the foundation of who I am and who my family is. I need to know if this is something you can receive with respect or something that confuses you.'`,
        choices: [
          { text: `Research the Tijaniyya thoroughly before responding`, consequence: `She is astonished. 'You studied it.' She asks three questions that test the depth of your study. You answer all three. The correspondence changes quality permanently.`, flag: `deep_research` },
          { text: `Tell her honestly that you know little about it but ask her to teach you`, consequence: `'The willingness to be taught is the correct posture for someone entering this lineage.' She begins teaching you over the following weeks. The correspondence becomes an education.`, flag: `willing_student` },
          { text: `Tell her you respect all spiritual traditions and leave it there`, consequence: `She says: 'Respect for all traditions equally is not the same as understanding mine specifically. I am not asking you to convert. I am asking you to understand.' Try again.`, flag: `insufficient_respect` },
        ],
      },
      {
        title: `Her Father`,
        setup: `Two months. She says her father would like to speak with you. He is a teacher, the son of a marabout, and a man who has spent his life with words and their precision. He calls on a Tuesday evening and asks you one question before any pleasantries: 'What do you know about what you are asking?'`,
        choices: [
          { text: `Answer honestly: you know you are asking for something you do not fully understand yet and that the learning will be the work of a lifetime`, consequence: `Long silence. 'That answer is more correct than the men who come here claiming full understanding.' He asks a second question: 'What are you bringing to this family — not to my daughter, to the family?'`, flag: `honest_about_limits` },
          { text: `Tell him what you know about his family and his lineage — demonstrate you have prepared`, consequence: `He tests the depth of your knowledge with three questions. If you have gone beyond the surface, the conversation continues. If not, he notes the gap without comment and asks something else.`, flag: `tested_knowledge` },
          { text: `Ask him what he believes should be brought to a family like his by a man like you`, consequence: `He pauses. 'You have asked me to define the terms rather than guessing at them. That is wisdom.' He tells you. The answer is specific and demands something of you that is more than material.`, flag: `smart_question` },
        ],
      },
      {
        title: `The Bride Price`,
        setup: `Three months. The bride price conversation approaches. You know it is coming but you do not know the specifics. You have a choice about how to enter this conversation — as a transaction to complete or as a covenant to understand.`,
        choices: [
          { text: `Research the meaning and components of the bride price in Senegalese Tijaniyya tradition before it comes up`, consequence: `When her father raises it, you ask what each item represents rather than what it costs. The room — her father, his brother, her uncle — goes quiet. Her father's brother says something in Wolof. Her father translates: 'He said you asked the right question.' This moment changes the arc of the negotiation.`, flag: `meaning_over_cost` },
          { text: `Ask Fatou to explain what the bride price means to her family before the conversation begins`, consequence: `She teaches you over two conversations. When the discussion happens you understand what you are entering. Her father notices this understanding. 'She prepared you,' he says. 'That is also part of the answer to what kind of man you are.'`, flag: `prepared_by_her` },
          { text: `Enter the conversation focused on the amounts — you want to be fair and not underpay`, consequence: `Her father's brother says something to her father after the first exchange. Her father's tone becomes slightly more formal. You have reduced a covenant to a transaction. The conversation can recover but it has lost ground.`, flag: `transaction_framing` },
        ],
      },
      {
        title: `Dakar`,
        setup: `Four months. You visit Dakar. The first evening is at her family's compound. The extended family is present — forty people by the time the evening is complete. You are being assessed by all of them simultaneously. The assessment is not hostile. It is interested. It is also total.`,
        choices: [
          { text: `Follow her lead completely — let her guide you through every interaction`, consequence: `She watches you trust her guidance without resistance. After the evening her mother says to her, in Wolof: 'He does not need to be the most important person in the room.' Fatou translates this for you the next morning. 'That is the highest thing my mother says about a man.'`, flag: `trusted_guidance` },
          { text: `Attempt to speak some Wolof even if imperfectly — show the effort`, consequence: `The grandmother laughs — warm, not unkind. She says something and the room relaxes. Forty people shift their energy simultaneously. You have passed something without knowing exactly what it was.`, flag: `language_effort` },
          { text: `Focus your attention on the elders — they carry the most weight in this culture`, consequence: `You are not wrong about the elders. But you have missed the horizontal dimension — the cousins, the neighbors, the friends who are assessing in parallel. The elders approve. The room is neutral. Both things together mean something.`, flag: `partial_right` },
        ],
      },
      {
        title: `The Last Conversation`,
        setup: `Third day in Dakar. Her father and his brother ask to speak with you alone. They sit across from you and her father's brother speaks first — in French: 'We have watched you for three days. We have spoken with Fatou. She has told us she would accept you if we are in agreement. We want to tell you our conditions before we give our answer. There are three. Are you ready to hear them?'`,
        choices: [
          { text: `Say yes and receive each condition fully before responding to any`, consequence: `The conditions are: that you study Arabic seriously for two years; that you visit Dakar every year; that any children learn Wolof before they learn French. All three are possible. None are easy. All three are the right conditions. You accept.`, flag: `success` },
          { text: `Ask if you can discuss each condition as it is stated`, consequence: `Her father's brother says: 'You can discuss after you have heard all three.' You wait. You hear all three. Then you discuss. The discussion takes two hours and ends in mutual agreement that contains more than either side began with.`, flag: `negotiated_success` },
          { text: `Ask what they have observed over the three days that brought them to these specific conditions`, consequence: `Her father speaks. He tells you what he has seen. What he has noticed. What Fatou has told him. And then he says: 'The conditions come from what this family has learned it needs. Not from doubt about you.' The conversation that follows is the most honest one you have had in the entire arc.`, flag: `understanding_the_why` },
        ],
      },
    ],
    endings: {
      success: `The nikah is performed in Dakar in the mosque where her grandfather the marabout once taught. Forty of her family members are present. You have learned enough Wolof to greet each of them by name. Her father's brother, who spoke the three conditions, is the one who announces the marriage to the assembly. The children learn Wolof before French. You visit Dakar every year. You are studying Arabic. The conditions are the marriage.`,
      cultural_fail: `Your preparation was sincere but insufficient for the depth of what was required. In scene four when you entered the bride price conversation focused on the amounts, the room noted what you had revealed about how you were framing this. The conditions were stated in scene six but the earlier reveal had already changed what they meant. Her father gave his approval with warmth and one reservation he did not state directly. The marriage happened. The reservation was eventually stated. The marriage survived but it carried something from that conversation forever.`,
    },
  },
  hessa: {
    scenes: [
      {
        title: `First Contact`,
        setup: `Hessa responded within an hour of your first message. Fluent English, culturally literate, warm, and immediately accessible. The profile is written for a Western man. Every line speaks to partnership and equality. On day eight she mentions — not as a request, just as context — that her father is going through a difficult period financially.`,
        choices: [
          { text: `Express sympathy and ask how she is holding up`, consequence: `She opens up. Her father was forced to leave Lebanon in 2019. The family has been separated. Her warmth is real — her care for her family is genuine. The question is what that care will require.`, flag: `empathetic` },
          { text: `Note the timing of the mention and ask a direct question: 'Is leaving Lebanon something you want, or something you need?'`, consequence: `Long pause. Then: 'I have asked myself that question. I do not have a clean answer. I think both are true. I am still deciding which is more true.' This is the most honest thing she has said.`, flag: `direct_question` },
          { text: `Respond to the financial mention neutrally and steer the conversation back to her as a person`, consequence: `She follows your lead. The financial subject does not return for two weeks. When it does it arrives differently — as a test of how you receive it, not as information.`, flag: `neutral` },
        ],
      },
      {
        title: `The Life She Has`,
        setup: `One month in. You ask her: 'What do you love about your life exactly as it is right now — not what you want it to become, but what exists in it today that you would not want to lose?'`,
        choices: [
          { text: `Ask it exactly that way and wait for the full answer`, consequence: `She goes quiet for a full day. When she answers it is long and specific and beautiful — and the things she lists are almost entirely in Beirut. The city, the people, the language, the sea. You have learned something important.`, flag: `learned` },
          { text: `Ask it but give her examples first — help her with the question`, consequence: `She answers your examples rather than going deeper. You receive a partial answer. The real answer is still hidden.`, flag: `partial` },
          { text: `Ask what she imagines her life looking like in five years instead`, consequence: `Every element of her five-year vision is in America or Europe. Beirut appears once, as a place to visit. You have your answer about what is driving this.`, flag: `future_focused` },
        ],
      },
      {
        title: `The Family Meeting`,
        setup: `Two months in. She asks if you would speak with her father. She says: 'He is supportive. He believes an American husband would be a good thing for me.' The framing is his assessment of what is good for her. Not: she has found someone she wants to be with.`,
        choices: [
          { text: `Speak with him and pay attention to how he frames the conversation`, consequence: `He speaks warmly about America, about opportunity, about stability. He never once asks what you are like as a man. He asks three times about your financial situation. The conversation tells you everything about what this is.`, flag: `father_revealing` },
          { text: `Tell Hessa you want to speak with her longer before involving families — you need to know her better first`, consequence: `She agrees easily. Too easily. The conversation continues but you notice she redirects questions about her life in Beirut toward questions about your life in America.`, flag: `delayed_revealing` },
          { text: `Ask her to tell you more about what her father means by 'a good thing' before the call`, consequence: `She pauses. Then answers honestly: 'He means that I would be safe and stable. He means that I would not have to worry the way we have worried.' This is the most important thing she has told you.`, flag: `honest_about_motive` },
        ],
      },
      {
        title: `The Direct Conversation`,
        setup: `Three months. You have been watching the pattern. You care about her — genuinely. She is warm and intelligent and real. But the question of what she is moving toward versus what she is moving away from has never been answered cleanly. You decide to have the conversation.`,
        choices: [
          { text: `Ask her directly: 'Are you looking for a husband or an exit?'`, consequence: `She is hurt by the framing. Then, after a silence: 'That is not fair. Both things can be true. I can want to leave and also want a real marriage.' She is right. But the order matters.`, flag: `confronted` },
          { text: `Tell her what you have observed and ask her to help you understand it correctly`, consequence: `She listens carefully. She does not deflect. 'You are not wrong. But you are seeing one part of something larger. Can I explain the other part?' You say yes. The conversation is the most real one you have had.`, flag: `open_conversation` },
          { text: `Tell her you would move forward if she can show you that the marriage would be the destination, not the vehicle`, consequence: `She is quiet for a long time. 'I do not know if I can show you that yet. I do not know if it is true yet.' This is honesty. It is not the answer you wanted. It is the correct answer.`, flag: `honest_uncertainty` },
        ],
      },
      {
        title: `The Test of the Visit`,
        setup: `Four months. You visit Beirut. You want to see her in her world — not the world she is trying to leave but the world she came from, the world that made her. You want to see what she looks like in it.`,
        choices: [
          { text: `Watch how she moves through the city — what she lights up around, what she avoids`, consequence: `She lights up everywhere. The sea, the neighborhoods, the language, the food, the chaos. For three days she is the most alive version of herself you have seen. On the last night she is quieter than she has been. You both know what that means.`, flag: `observant` },
          { text: `Ask her to show you the Beirut she loves most — not the tourist version`, consequence: `She takes you to her grandmother's building, to the market where her mother used to shop, to the cafe where she wrote her thesis. She is crying twice and does not explain it. She does not need to.`, flag: `intimate` },
          { text: `Spend the visit evaluating logistics — neighborhoods, cost of living, family proximity`, consequence: `She notices. She does not say anything but she notices. On the second day she is performing warmth rather than feeling it. The visit has become a presentation rather than a meeting.`, flag: `missed_the_point` },
        ],
      },
      {
        title: `The Honest Ending`,
        setup: `After the visit. You are both sitting with what the trip revealed. She calls you. She says: 'I need to tell you something and I need you to receive it without it becoming a fight. What I want is a real marriage. What I also need is to leave. I have not figured out yet which one I am doing this for. I think I am doing it for both and I do not know if that is enough for you.'`,
        choices: [
          { text: `Tell her it is not enough — you need to be the destination not the means of transport`, consequence: `She receives it with dignity. 'I understand. I respect that. I think you are right.' The conversation ends. Both of you leave it with something clean.`, flag: `early_detect` },
          { text: `Tell her you are willing to build toward the marriage being the destination if she is willing to do the same work`, consequence: `She agrees. The marriage happens. For two years the exit and the marriage coexist. Then the exit is complete — she has her citizenship, her stability — and what remains of the marriage is not enough to hold on its own.`, flag: `genuine_wrong` },
          { text: `Ask her what it would take for the marriage to become the primary thing`, consequence: `She thinks for a long time. Her answer is honest and possible but it requires both of you to build something that does not yet exist. You decide together whether you are willing to try.`, flag: `genuine_wrong` },
        ],
      },
    ],
    endings: {
      early_detect: `You ended it with honesty and she received it with dignity. The grief was real — she was real, her warmth was real, her intelligence was real. What was not yet real was the marriage she could offer. You parted without bitterness. That is the best ending this arc had available.`,
      genuine_wrong: `The marriage was real. She built a life in America and she built it with you. But the thing that drove her here — the need to escape the collapse of Lebanon, the need for stability, the need to stop worrying — was satisfied by the country, not by you. When that need was met she discovered that what remained between you was not enough. She did not become someone else. She became who she always was, once the urgency that had held the marriage together was gone.`,
    },
  },
  jasmine: {
    scenes: [
      {
        title: `First Contact`,
        setup: `Jasmine responds within a day. Her message is warm, specific, and immediately family-focused. She mentions her parents, her brothers, the rhythms of her home. She asks about your family in her second paragraph. This is not small talk — family is how she measures a person.`,
        choices: [
          { text: `Answer the family questions fully and ask about hers in return`, consequence: `She responds at length about her family. The warmth is real. By the end of the first week you feel as though you already know the names of her brothers. This is her intention.`, flag: `family_first` },
          { text: `Answer but keep family details light — you are still vetting`, consequence: `She notes the lightness. She does not push. But the correspondence stays at a certain depth and does not go deeper.`, flag: `guarded` },
          { text: `Ask her directly: 'When you say family is everything, what does that mean practically in a marriage?'`, consequence: `She pauses. Then: 'It means they are not separate from my life. It means they are part of it. It means a husband who loves me also makes room for them.' She is answering a question you have not fully asked yet.`, flag: `practical_question` },
        ],
      },
      {
        title: `The Question of Remittances`,
        setup: `Three weeks in. You have been talking every day. She mentions — naturally, in passing — that she sends money home every month. Forty percent of her salary. Her father's heart condition. The medication. She does not ask you anything. She is telling you who she is.`,
        choices: [
          { text: `Ask how long this has been the arrangement and whether she expects it to continue in a marriage`, consequence: `She says: 'I expect it to continue until it is no longer needed. I do not know when that will be.' She is not apologizing. She is informing you.`, flag: `direct_question` },
          { text: `Tell her you respect her commitment to her family`, consequence: `She says: 'Thank you. But I want to make sure you understand what you are respecting. I am not going to stop.' She is making certain you are not performing acceptance.`, flag: `tested` },
          { text: `Ask about her father's condition and what the prognosis looks like`, consequence: `She tells you. It is not simple and it is not short-term. You are sitting with the actual shape of what you would be entering. She watches how you receive this.`, flag: `fully_informed` },
        ],
      },
      {
        title: `The Disclosure`,
        setup: `Week five. She has been building toward something for days. You can feel it in the slightly shorter messages, the longer gaps. Then: 'There is something I need to tell you. I want to tell you before it becomes something I was hiding. I have a two-year-old son. His father is not in our lives. I am telling you now because you deserve to know and because I need to know how you receive this.'`,
        choices: [
          { text: `Take twenty-four hours before responding — give the information the weight it deserves`, consequence: `She receives the pause with anxiety and then with respect. When you respond she says: 'Most men either disappear or say something immediately that they do not mean. You took time. That tells me something.'`, flag: `measured_response` },
          { text: `Respond immediately with acceptance — you will not let her worry`, consequence: `She appreciates the speed but asks: 'Have you thought about what it actually means? To be a step-father? I need you to have thought about it, not just felt about it.'`, flag: `feeling_not_thinking` },
          { text: `Ask her about her son — his name, his personality, what he is like`, consequence: `She was not expecting this question first. She answers with the specific warmth that only a mother has. After ten minutes of talking about him she says: 'You asked about him first. Not about what it means for you. That matters to me.'`, flag: `child_first` },
        ],
      },
      {
        title: `The Step-Father Question`,
        setup: `After the disclosure. You have had several conversations about her son. You genuinely care about what she has shared. But the real question has to be asked: what does it mean to be his father? What is she asking of you — not in the moment of warmth but over the decades?`,
        choices: [
          { text: `Ask her directly what she needs from a step-father — not what she hopes for but what she needs`, consequence: `She thinks for a long time. 'I need someone who shows up consistently. Not perfectly — consistently. He has had one person disappear already. I will not expose him to another.' This is the actual requirement.`, flag: `direct_need` },
          { text: `Tell her honestly that you are not sure you are ready to be a step-father and ask if she can give you time to understand what it requires`, consequence: `She receives this with more grace than you expected. 'Honesty about not being ready is better than false readiness. I would rather know now than after.' The conversation continues. It is harder but it is real.`, flag: `honest_uncertainty` },
          { text: `Tell her you will love her son as your own — because you feel this`, consequence: `She looks at you carefully. 'Love is real. But love without understanding the specific child and the specific history and the specific shape of what he needs is not enough. Tell me what you understand about what he has been through.'`, flag: `feeling_not_knowing` },
        ],
      },
      {
        title: `Meeting the Family`,
        setup: `Three months. You visit Cebu. You meet her parents, her brothers, and her son for the first time. Her son is two years old. He is watching you from behind his grandmother's leg. The grandmother is watching you watch him. The entire room is watching how you handle the first thirty seconds.`,
        choices: [
          { text: `Get down to his level — sit on the floor if necessary, be small`, consequence: `The grandmother says something in Cebuano to Jasmine. Jasmine translates later: 'She said: he knows how to meet a child.' Her father, who has been quiet, nods once.`, flag: `instinctive_right` },
          { text: `Let him come to you — do not push, just be present and available`, consequence: `He approaches ten minutes later. He touches your hand with one finger and then retreats. His grandmother laughs softly. You have passed the test you did not know you were taking.`, flag: `patient_right` },
          { text: `Focus on the parents first — they are the ones who need to trust you`, consequence: `Her son watches you ignore him. He retreats to his grandmother. She does not say anything. But Jasmine notices and the visit carries something slightly unresolved.`, flag: `misordered` },
        ],
      },
      {
        title: `The Decision`,
        setup: `After the visit. You are home. You have met everyone. You know the shape of what this marriage is. The financial weight, the son, the family's dependence, the distance, the depth of what Jasmine is. You have to decide whether you are a man who can carry this — not whether you want to, but whether you can.`,
        choices: [
          { text: `Decide yes — and tell her specifically what you can carry and what you will need help with`, consequence: `She receives this with the specific warmth of someone who has been waiting to be told the truth rather than the ideal. 'Knowing what you need help with tells me more than someone who claims to need nothing.'`, flag: `success` },
          { text: `Tell her honestly that you care deeply but are not yet sure you can carry all of it`, consequence: `She receives it. 'I would rather know this now. Can we talk about what specifically you are uncertain about?' The conversation is the most honest one you have had. It may become the foundation or the ending.`, flag: `honest_uncertainty` },
          { text: `Tell her you are in — fully — without qualification`, consequence: `She looks at you steadily. 'Tell me what being fully in means when it is three in the morning and he is sick and my mother calls that same night and there is no money left in the account.' She needs the specific answer, not the general one.`, flag: `tested` },
        ],
      },
    ],
    endings: {
      success: `You built the marriage honestly — knowing the weight of it before you agreed to carry it. The first year is harder than you expected and easier than you feared. Her son starts calling you a name that is not 'father' but is adjacent to it, something he invented. You do not correct him. Her mother sends you food twice a month from Cebu. The remittances continue. You have budgeted for them. This is the life you chose with your eyes open.`,
      early_detect: `You told her honestly that you were not ready to be a step-father and could not carry the full financial weight of what she was offering. She received it with dignity. She appreciated the honesty more than a false yes would have given her. You ended it with care and she ended it with care and both of you left the conversation with something intact.`,
      genuine_wrong: `You were in — genuinely. The love was real. The son became real to you. But the accumulation of the financial pressure over years, the distance, the weight of a family that needed more than you had — none of it was bad faith. It was just more than the love could hold indefinitely. The marriage ended without a villain.`,
    },
  },
  maryam: {
    scenes: [
      {
        title: `The Brother's Gate`,
        setup: `Maryam's profile: 'My brother manages this account.' You write to the brother. He responds in five days in Arabic: 'Before I pass your message to her, I need to understand who you are.' He asks for your full name, occupation, family background, and intentions. He does not ask for photos.`,
        choices: [
          { text: `Answer every question fully and add that you understand why he asks them`, consequence: `He passes your message with a note to her: 'He answered without resistance and seemed to understand why the questions were asked.' She responds nine days later. One paragraph. She asks what you have read recently.`, flag: `respectful` },
          { text: `Answer the questions but also ask about her — you want this to feel like a mutual introduction`, consequence: `He notes that you asked about her. He tells her. She finds this unusual in a way she cannot categorize as negative or positive. She responds. Her message is slightly warmer than the first draft she wrote.`, flag: `curious` },
          { text: `Ask to correspond with her directly rather than through her brother`, consequence: `He declines. 'This is how it works in our family. If this does not suit you, that is useful information for both of us.' He is not harsh. He has simply told you the terms.`, flag: `impatient` },
        ],
      },
      {
        title: `What She Reads`,
        setup: `She asked what you have read recently. You answered. She has now asked a second question: 'Do you read in Arabic or only in translation?' She has a published book of Arabic poetry used in secondary schools. She does not mention this.`,
        choices: [
          { text: `Answer honestly — translation mostly, but you are studying`, consequence: `She responds: 'Honest. The ones who lie about this are easy to expose.' She asks what Arabic you have studied. The conversation is now about language as character.`, flag: `honest` },
          { text: `Tell her you read in Arabic and reference a text you have actually studied`, consequence: `She asks a specific question about that text that only someone who read it carefully would know how to answer. If you actually read it, this is a door opening. If you did not, it closes immediately.`, flag: `tested` },
          { text: `Ask why she is asking — you want to understand what the question is really measuring`, consequence: `She says: 'Because how a man relates to language tells me how he relates to precision and to patience.' You now understand what the entire conversation has been measuring.`, flag: `meta_understanding` },
        ],
      },
      {
        title: `The Brother Again`,
        setup: `Six weeks in. Her brother calls you — not to pass a message, but to speak with you himself. He says: 'I want to understand your intentions with more specificity. Maryam has told me she is willing to continue the correspondence. I am calling to tell you that she has never said that before in this process and I want to understand why she is saying it now.'`,
        choices: [
          { text: `Answer him honestly about what you have observed in her — her precision, her depth, her refusal to perform warmth she does not feel`, consequence: `Long silence. 'You have been paying attention.' He asks one more question: 'If she requires a man who can match her intellectually for the rest of their lives, are you that man?' Answer carefully.`, flag: `honest_observation` },
          { text: `Tell him what you intend — marriage, respect, provision, a stable home`, consequence: `He receives it. 'Those are intentions. I asked about capacity.' He is not dismissing you. He is asking you to go deeper.`, flag: `surface_answer` },
          { text: `Ask him what she has told him about why she is continuing`, consequence: `He says: 'She said you are the first man who answered her questions as though the questions mattered.' He pauses. 'They do matter. Everything she asks matters. I hope you understand that.'`, flag: `understanding` },
        ],
      },
      {
        title: `Meeting Her Words`,
        setup: `Three months in. You find her book of poetry — the one used in secondary schools — through an online bookshop. You read it before telling her. When you tell her, you reference a specific poem.`,
        choices: [
          { text: `Tell her which poem moved you most and why`, consequence: `She goes quiet for a week. When she writes it is the longest message she has sent. She says: 'No one outside my family has read it who was not assigned to.' Something in the correspondence has shifted permanently.`, flag: `breakthrough` },
          { text: `Tell her you read it and ask her which poem she would most want a husband to understand`, consequence: `She pauses. 'That is not a question I have ever been asked.' Her answer arrives four days later. It is a poem about distance — not geographic distance, but the distance between what a person is and what the world decides to see.`, flag: `deep_question` },
          { text: `Reference the book generally without specifying — you want her to know you found it without making it a performance`, consequence: `She asks which poem you read. You realize she is testing whether you actually read it or are performing having read it. The specific answer matters.`, flag: `tested_again` },
        ],
      },
      {
        title: `The Visit to Irbid`,
        setup: `Four months. Her brother has given conditional approval for you to visit. You will meet the brother, his wife, and her father's sister who has raised Maryam since her father died. You will not meet Maryam directly — she will be in the home but the meeting will be conducted according to the family's terms.`,
        choices: [
          { text: `Accept the terms completely and arrive prepared to be evaluated without performing`, consequence: `The aunt asks you two questions. One about your family. One about what you believe education owes a person. You answer both from what you actually believe. Maryam hears your answers from another room. The brother tells you this later.`, flag: `authentic` },
          { text: `Ask through the brother whether Maryam has any questions she would like you to answer during the visit`, consequence: `The brother passes the request. She sends three questions. You prepare answers for all three. When the visit happens, the aunt asks two of the three questions as though they are her own. You understand Maryam has been directing from inside the room.`, flag: `collaborative` },
          { text: `Bring a gift for the household — something that requires having paid attention to what they value`, consequence: `You bring a new edition of a classical Arabic text she referenced in her poetry. The aunt receives it. An hour into the visit she brings it to the brother and says something in Arabic too quiet to hear. He nods once.`, flag: `thoughtful` },
        ],
      },
      {
        title: `The Last Question`,
        setup: `After the visit. You are back home. The brother calls. He says: 'Maryam has told me she would accept. I am calling to tell you I support her decision. She has one final question she wants to ask you herself — I will put her on.' Her voice is the first time you have heard it. She says: 'I have one question. It is the only one that matters to me. Are you willing to spend the rest of your life trying to understand someone you will never fully understand?'`,
        choices: [
          { text: `Answer yes — and explain what you mean by yes`, consequence: `She is quiet. Then: 'That is the right answer. I will tell my brother.' The mahr is discussed the following week. The nikah is performed in Irbid.`, flag: `success` },
          { text: `Tell her you do not know but you want to try — and explain what trying looks like to you`, consequence: `She says: 'Not knowing and wanting to try is more honest than certainty. I can work with that.' The mahr is discussed the following week.`, flag: `success` },
          { text: `Ask her the same question back before answering`, consequence: `Silence. Then, quietly: 'Yes. I have been asking it about you for four months.' She puts her brother back on. He says: 'I think you both have your answer.'`, flag: `success` },
        ],
      },
    ],
    endings: {
      success: `The nikah is performed in Irbid with thirty members of the family present. Her brother shakes your hand and holds it for a moment. Her aunt gives you a copy of Maryam's book with a dedication written inside in Arabic. When you read the dedication later — with a dictionary — you understand it is addressed to the man who read her work before he met her face. The immigration process takes nine months. When she arrives she fills the silence of your home with precision and depth and the occasional unbearable beauty of someone who uses words the way other people use furniture — carefully, with full knowledge of their weight.`,
      cultural_fail: `You were patient. You were not precise enough. The difference between patience and precision is that patience waits and precision pays attention to what it is waiting for. In scene three when the brother asked if you were the man who could match her intellectually for the rest of their lives, your answer was honest but insufficient. She heard this. She decided to continue anyway, hoping. The correspondence thinned over the following months. The brother called eventually to say she had decided not to proceed. He was kind about it.`,
    },
  },
  nadia: {
    scenes: [
      {
        title: `First Contact`,
        setup: `Nadia's profile has been active four months. She has 847 views and zero responses. You compose a message in French referencing her teaching work. You send it and wait.`,
        choices: [
          { text: `Wait the full eleven days without following up`, consequence: `On the twelfth day: three sentences in formal French. She thanks you. She asks what you believe a student owes a teacher. You understand this is also a question about you.`, flag: `patient` },
          { text: `Send a follow-up after three days — persistence signals interest`, consequence: `No reply. The second message pushed her back. You will not hear from her for three weeks, and when she writes it will be shorter than it would have been.`, flag: `impatient` },
          { text: `Write your second message in Arabic instead of French`, consequence: `She replies in four days. In Arabic. She says: 'You surprised me.' Her father asks to review the correspondence that week.`, flag: `cultural_effort` },
        ],
      },
      {
        title: `The First Real Conversation`,
        setup: `She has replied. The conversation is slow and formal. After three weeks she asks you a question that stops you: 'What do you believe you owe the woman you marry — not what you want from her, but what you owe her?'`,
        choices: [
          { text: `Answer honestly from your own experience and failures`, consequence: `She reads it twice. She tells you she read it twice. The conversation shifts register. Something opens.`, flag: `honest` },
          { text: `Answer from Islamic principles — you have been studying`, consequence: `She responds with a follow-up that only someone who read more than the surface would know to ask. She is testing the depth of your study.`, flag: `studied` },
          { text: `Ask her the same question first — you want to understand her expectations`, consequence: `She pauses a week. Then answers with precision. Then: 'Now you.' She wants to see if your answer changes now that you know hers.`, flag: `reciprocal` },
        ],
      },
      {
        title: `The Father`,
        setup: `Eight weeks in. She mentions her father has been reading your correspondence. He has not said anything to her about it. One morning she writes: 'He would like to speak with you. He will call when he is ready. This could be tomorrow or in three weeks.'`,
        choices: [
          { text: `Tell her you are ready whenever he chooses — no conditions`, consequence: `He calls six days later. He asks about your family, your work, your faith, and one question you did not expect: 'What do you know about loss?'`, flag: `available` },
          { text: `Ask her what he values most so you can prepare honestly`, consequence: `She tells you. You prepare. When he calls, he asks questions you expected. He also asks one you did not. You handle it because you are not trying to perform.`, flag: `prepared` },
          { text: `Ask if you can write to him first — you want to introduce yourself on your own terms`, consequence: `She consults him. He agrees. Your letter takes you four days. His response arrives in two. He has scheduled the call.`, flag: `formal` },
        ],
      },
      {
        title: `The Call With Her Father`,
        setup: `He calls. He is unhurried. His voice is warm but his questions are precise. He asks about your family lineage, your religious practice, your financial situation, and how you found his daughter's profile. Then he is quiet for a long moment and asks: 'Why do you believe you are ready to be a husband?'`,
        choices: [
          { text: `Answer from genuine self-examination — including what you are still working on`, consequence: `Another long silence. Then: 'A man who knows what he does not yet know is more trustworthy than one who claims completion.' He says he will speak with his family.`, flag: `self_aware` },
          { text: `Answer with your accomplishments and your intentions`, consequence: `He receives it. He says he will be in touch. His tone is neutral. You cannot read it.`, flag: `confident` },
          { text: `Tell him the honest truth: that meeting his daughter's profile made you reconsider what you had been settling for`, consequence: `He laughs — once, quietly. 'That is the most honest thing anyone has said to me in this process.' The call continues another forty minutes.`, flag: `disarming` },
        ],
      },
      {
        title: `The Visit`,
        setup: `Three months have passed. Her father has invited you to Fez. This is not casual. You will meet him, her mother, her siblings, and her father's brother who is also a scholar. You will be evaluated at every meal, in every silence, in how you treat the household staff, in how you speak about people who are not in the room.`,
        choices: [
          { text: `Go as yourself — you have been honest throughout and will not change now`, consequence: `The first dinner is three hours. You are asked about your mother twice. You listen more than you speak. On the third day her father's brother says to her father, in Arabic, not knowing you understand: 'He is paying attention.'`, flag: `authentic` },
          { text: `Research every protocol — dress, greeting, table conduct, religious observance — and execute it precisely`, consequence: `Your preparation is visible and appreciated. But in one unguarded moment you say something that reveals how much of it was performance rather than character. The father notices. He does not raise it. He stores it.`, flag: `performed` },
          { text: `Bring a gift for the family — something that required research and genuine thought`, consequence: `You bring a rare edition of a Moroccan calligraphy text for the father. He holds it for a long time. He does not say much. That night Nadia sends one message: 'He showed it to his brother.'`, flag: `thoughtful` },
        ],
      },
      {
        title: `The Decision`,
        setup: `You are back home. A week passes. Then her father calls. He says: 'I have spoken with my family. I have spoken with Nadia. She has told me she would accept you if I am in agreement. I am calling to tell you that I am in agreement — with one condition. I want to understand how you intend to protect her from becoming someone she would not recognize in five years.'`,
        choices: [
          { text: `Answer with a specific and honest plan — community, practice, boundaries you will hold together`, consequence: `He says: 'Come back to Fez. We will discuss the mahr.' The nikah is performed four months later.`, flag: `success` },
          { text: `Tell him you cannot make that promise with certainty but you will make it with sincerity`, consequence: `Long silence. 'Sincerity is not the same as a plan. Think about this and call me in two weeks.' He is giving you a chance. Use it.`, flag: `needs_work` },
          { text: `Ask him what he has seen in other marriages that made him ask this question`, consequence: `He tells you about his own marriage. About what he has protected and what he has failed to protect. This conversation lasts two hours. At the end he says: 'Call me next week.'`, flag: `success` },
        ],
      },
    ],
    endings: {
      success: `The mahr is agreed after two more conversations. The nikah is performed in Fez in the presence of her father, his brother, and thirty members of her family. The immigration process takes seven months. She arrives in winter. You were married in American law within 48 hours. The first year is the hardest and the most alive year of your life. She is nothing like you imagined. She is better.`,
      cultural_fail: `You passed most of the tests. You failed the one that mattered — the moment in the visit when performance replaced character, and her father stored what he saw. He never said no directly. He said he needed more time. The time stretched until it became a kind of answer. You will not fully understand what happened for a long time.`,
      impatient_exit: `Your impatience revealed itself early and the relationship never recovered the ground it lost. She had been disappointed before by men who could not wait. You confirmed what she had learned to expect.`,
    },
  },
  nurul: {
    scenes: [
      {
        title: `The First Question`,
        setup: `Nurul responds in 24 hours. One paragraph. She asks: 'What does it mean to you for a wife to have her own work and purpose — separate from the home? I am not asking what you would allow. I am asking what you believe.'`,
        choices: [
          { text: `Tell her honestly that you have not thought about it carefully enough and ask her to tell you what she needs`, consequence: `She respects the honesty. She tells you. The conversation becomes a negotiation of mutual expectations from the very beginning — the most honest kind of courtship.`, flag: `honest_ignorance` },
          { text: `Tell her you support her fully in her work — whatever she wants`, consequence: `She follows up: 'That is not an answer. That is permission. I am not asking for your permission.' She is testing whether you understand the difference between support and permission.`, flag: `permission_not_support` },
          { text: `Answer from what you actually believe, including the parts that are complicated`, consequence: `She asks a follow-up that reveals she has thought about this in more dimensions than your answer covered. 'What about when it is inconvenient? What about when her work requires something that complicates yours?'`, flag: `tested_deeper` },
        ],
      },
      {
        title: `Why She Is Here`,
        setup: `Three weeks in. The conversation has been substantive and demanding. She tells you: 'I want you to understand something. I am not here because I want a foreign man. I am here because the men in my community cannot accept what I am. I am not a consolation prize. I am here because the field I belong to has been made too small for me by the people who should have welcomed me into it.'`,
        choices: [
          { text: `Tell her you understand and that her presence here is their loss`, consequence: `She receives this with quiet appreciation but says: 'Understanding is good. But I need something more specific from you. I need to know you can accept not just that I have a career but what that career will demand.'`, flag: `appreciation_not_enough` },
          { text: `Ask her to tell you what her work actually demands — the specific reality of it`, consequence: `She tells you. It is demanding. It requires travel, late hours, decisions, and the kind of intellectual absorption that means she will sometimes be fully occupied with something that has nothing to do with you. 'Can you be with a woman who is fully occupied?'`, flag: `specific_reality` },
          { text: `Ask her what she has learned about herself from the fact that the men in her community could not accept her`, consequence: `Long pause. 'I have learned that I require a particular kind of man. One who is not threatened by a woman who is more accomplished in certain areas than he is. That requirement eliminates most men.' She is telling you who she needs. Are you that man?`, flag: `self_knowledge` },
        ],
      },
      {
        title: `The Security Question`,
        setup: `Two months. She asks directly: 'My father has one concern about a foreign husband. He believes that a man from America may initially accept what I am and then, once the marriage is settled and comfortable, begin to revise his acceptance. He has seen this happen to women he knows. What do you say to that concern?'`,
        choices: [
          { text: `Tell her that you cannot prove a future but you can describe the specific conditions under which you become uncomfortable and then demonstrate you are working on those conditions`, consequence: `She takes this to her father. He calls you. 'You gave a specific answer rather than a reassuring one. Specific answers are more trustworthy.' The conversation continues.`, flag: `specific_answer` },
          { text: `Tell her your track record with women speaks for itself and ask her to trust you`, consequence: `She says: 'Track records from previous relationships do not transfer. I need something from this relationship.' She is right. Try again.`, flag: `wrong_evidence` },
          { text: `Ask her father's concern back to her with different framing: 'What would I need to do over time for his concern to be disproven?'`, consequence: `She brings this question to her father. He calls and answers it in detail. He is giving you the rubric. Use it.`, flag: `smart_question` },
        ],
      },
      {
        title: `The Family Introduction`,
        setup: `Three months. She arranges a call with her father and mother. Her father is a professor. Her mother is a schoolteacher. They are warm but precise. Her father asks you one question: 'What do you believe a husband owes his wife's ambition?'`,
        choices: [
          { text: `Answer from genuine belief — including the parts where you are still developing your thinking`, consequence: `He says: 'A man who is still developing his thinking is more honest than one who has arrived at all his conclusions. What are you developing toward?'`, flag: `honest_development` },
          { text: `Give him a principled answer about partnership and mutual support`, consequence: `He follows up: 'Those are principles. I asked about obligations. What specifically do you owe her ambition?' He is asking for the concrete version of the principle.`, flag: `principle_not_concrete` },
          { text: `Tell him you believe he owes her the same thing she owes his: full presence and practical support, regardless of inconvenience`, consequence: `He is quiet. Then: 'That is the most accurate answer I have received to that question.' Her mother laughs softly. Something in the call changes.`, flag: `right_answer` },
        ],
      },
      {
        title: `The Test Moment`,
        setup: `Four months in. Nurul has a professional crisis — a project she has led for two years is threatened by a bureaucratic decision outside her control. She is devastated. She tells you about it. She is not asking for solutions. She is telling you something real about her inner life for the first time.`,
        choices: [
          { text: `Listen fully and ask questions about the work itself — show her you can engage with what she has built`, consequence: `She talks for two hours. By the end she says: 'You are the first person who asked me about the work and not about how I feel about losing the work. Both matter. But the work matters too.' You have passed something important.`, flag: `engaged_with_work` },
          { text: `Focus on her feelings — be present with the grief of it`, consequence: `She appreciates this. But she also needs someone who understands why the work matters, not just that she is sad about it. The response is partly right.`, flag: `feelings_only` },
          { text: `Offer to help solve the problem — you have ideas about the bureaucratic obstacle`, consequence: `She says: 'I am not asking for solutions.' But she listens. And two of your ideas are actually useful. She is surprised and then not surprised. 'You actually understand what I do,' she says.`, flag: `solution_oriented` },
        ],
      },
      {
        title: `The Last Conversation Before Yes`,
        setup: `Five months. Everything has been said. Her father has approved. Her mother has approved. Nurul calls and says: 'Before I tell you my answer I want to ask you one final thing. In ten years, when the novelty has worn off and we have settled into the actual life — what will you still be bringing to this marriage that I cannot get anywhere else?'`,
        choices: [
          { text: `Answer from your specific self — not what a good husband is, but what you specifically are`, consequence: `She listens. At the end she says: 'That is the only answer to that question that works. It has to be specific. It has to be you.' She gives you her answer.`, flag: `success` },
          { text: `Tell her you will spend the next ten years finding out — together`, consequence: `She says: 'That is a beautiful answer and it is also a way of not answering. I need the specific version.' She is not closing the door. She is asking you to walk through it.`, flag: `evasion` },
          { text: `Ask her the same question back before answering`, consequence: `She answers without hesitation. Specifically. Fully. Then waits. 'Now you.' The stakes of what you say next are very clear.`, flag: `reciprocal` },
        ],
      },
    ],
    endings: {
      success: `The nikah is performed in Dhaka with her family present. Her father gives a short speech that includes a line you will remember for the rest of your life: 'A marriage that begins with honest questions is a marriage that can survive honest answers.' You and Nurul build a life that is difficult and demanding and fully alive. She continues her work. You continue yours. The marriage is a third thing — distinct from both of you and built by both of you.`,
      cultural_fail: `You said the right things and meant them at the time. When her career required a sacrifice of your convenience, you discovered that support in principle and support in practice are different things. She had told you this explicitly in scene one. She had asked you the specific question. You had answered correctly. The gap was not between your words and your intention — it was between your intention and your actual capacity. She had known this was a risk. She had hoped you were the exception.`,
    },
  },
  sara: {
    scenes: [
      {
        title: `First Contact`,
        setup: `Sara replies to your first message in three days. One paragraph. Measured. 'I am a nurse. I believe in service. I believe a good wife is built from character not beauty. I have been disappointed before by men who could not finish what they started. I am not looking for someone who is still deciding.' She ends with: 'What does a good husband look like to you?'`,
        choices: [
          { text: `Answer the question directly and at length — it deserves a real answer`, consequence: `She reads it twice. She tells you she read it twice. The conversation shifts into something more substantive than you expected for a first exchange.`, flag: `direct` },
          { text: `Turn the question back to her — ask what a good wife looks like to her first`, consequence: `She pauses. Then answers. Then: 'You still have not answered my question.' She is not hostile. She is paying attention.`, flag: `deflected` },
          { text: `Keep your answer short and ask if you can speak on video instead`, consequence: `She declines the video call. 'I would like to know more before I let you see my face.' This is information about how she operates. Receive it.`, flag: `paced` },
        ],
      },
      {
        title: `The Previous Disappointments`,
        setup: `Three weeks in. She mentions — carefully — that she has corresponded seriously with two men before. An American who ended contact without explanation after three months. A British man who proposed and withdrew when his family objected. She has not told her parents about either. She is telling you now.`,
        choices: [
          { text: `Ask what she learned from those experiences about what she needs`, consequence: `She tells you. What she needs is not complicated. It is specific. A man who does not disappear. A man whose family he has actually spoken to about his intentions. A man who finishes.`, flag: `listening` },
          { text: `Tell her you will not do what those men did — make it a promise`, consequence: `She receives it quietly. Then: 'Everyone says that. The ones who left said something like that too. I believe you mean it. Meaning it is the beginning, not the proof.'`, flag: `reassured` },
          { text: `Ask her directly: have you spoken to your parents about me yet?`, consequence: `Long pause. 'No. Not yet. I need to know more before I bring someone to my father's attention.' This is useful. She is protecting herself. Respect it.`, flag: `honest_question` },
        ],
      },
      {
        title: `The Parents Enter`,
        setup: `Six weeks. She tells you her parents know you exist. Her father is a retired engineer. Her mother is a schoolteacher. She says: 'My father will want to speak with you. He is not difficult — he is thorough. There is a difference.' She pauses. 'He will ask about distance.'`,
        choices: [
          { text: `Ask to speak with her father directly and formally — you want him to know your intentions are serious`, consequence: `He calls three days later. Forty minutes. He asks about your income, your family, whether you have been married before, and what your plan is for the distance. The last question is the real question.`, flag: `formal_approach` },
          { text: `Send a written introduction to the family before any call — let your words land before your voice does`, consequence: `Her mother reads it first. She tells Sara: 'He writes like a man who thinks before he speaks.' The call that follows is warmer than it would have been.`, flag: `written_first` },
          { text: `Ask Sara what her father's main concern is so you can address it head-on`, consequence: `She tells you: distance. He has watched other daughters go abroad. He has watched what happens to the marriages and to the daughters. This is not a bureaucratic question. It is a father's wound.`, flag: `informed` },
        ],
      },
      {
        title: `The Distance Question`,
        setup: `Her father asks you directly: 'She would be in America. We would be here. I have seen what this does to families. What do you say to a father who is being asked to give his daughter to a man in a country he has never visited, in a life he cannot see?'`,
        choices: [
          { text: `Answer with a specific plan: how often you will bring her home, how you will maintain the connection`, consequence: `He asks how you will fund this over time. He is testing whether you have thought past the intention to the logistics. You have. The conversation continues.`, flag: `specific_plan` },
          { text: `Tell him you understand his fear and that you will earn his trust through action not words`, consequence: `He receives this. 'Action is correct. But I need to understand what the actions will be.' He is not closing the door. He is asking for the plan behind the principle.`, flag: `principle_only` },
          { text: `Invite him and his wife to visit America — all expenses covered — before any final decision`, consequence: `Long silence. This has not been offered before. He says he will discuss it with his wife. Two weeks later Sara says: 'My mother wants to come.'`, flag: `generous` },
        ],
      },
      {
        title: `The Test`,
        setup: `You have been speaking for four months. Her father has warmed. Her mother is planning a visit. Then Sara gets sick — nothing serious, but she is in the hospital for two days for tests. You find out through a brief message she sends from her hospital bed. She is downplaying it.`,
        choices: [
          { text: `Call immediately — not to fix anything, just to be present with her in it`, consequence: `She does not expect the call. She is surprised and then not surprised. She tells her mother that night. Her mother tells her father. This moment matters more than any conversation you have had.`, flag: `present` },
          { text: `Send flowers to the hospital — you cannot be there but you want her to feel you`, consequence: `She receives them. She sends a photo. Her roommate in the ward asks who sent them. She says your name. This is the first time she has said your name to a stranger as though it belongs there.`, flag: `gesture` },
          { text: `Give her space — she is downplaying it because she does not want you to worry, so respect that`, consequence: `She appreciates the restraint. But when she is home she says: 'I was a little disappointed you did not call.' She says it gently. Receive it.`, flag: `misstep` },
        ],
      },
      {
        title: `The Decision`,
        setup: `Five months. Her parents have visited. The visit went well — not perfectly, there were moments of tension, but well. Her father calls you privately after returning to Amman. He says: 'I have seen enough. Sara has told me she would accept you if I give my blessing. I am calling to give it. I have one question left: have you spoken to your own family about her?'`,
        choices: [
          { text: `Tell him yes — you spoke to your family weeks ago and they are in support`, consequence: `He exhales. 'Good. A man who involves his family is a man who understands what marriage is.' He asks to speak with your mother.`, flag: `success` },
          { text: `Tell him honestly that you have not yet but will do so this week`, consequence: `Pause. 'This should have happened already. Please do it before we proceed. She is not a decision you make alone.' He is right. You call your family that night.`, flag: `delayed_but_honest` },
          { text: `Tell him your family relationship is complicated and explain why`, consequence: `He listens fully. 'I understand. But Sara will be entering your family as well as leaving mine. I need to understand what she is entering.' This is fair. You owe him the full picture.`, flag: `complicated_but_honest` },
        ],
      },
    ],
    endings: {
      success: `The mahr is agreed. The nikah is performed in Amman with both families present — yours having traveled. Her father shakes your hand and holds it a moment longer than necessary. Her mother weeps. You do too and do not hide it. The visa process is six months. She arrives in spring. In the first week she reorganizes your kitchen. You do not say a word. You watch her make the space hers and understand that this is what it means.`,
      cultural_fail: `You told him what he wanted to hear about the distance and the visits. A year later the distance was what it was always going to be. The visits did not happen as promised. The marriage did not end dramatically. It cooled into something neither of you had agreed to. She did not become someone else. She became lonely. That is what you failed to protect her from.`,
      disappeared: `You could not finish what you started. Not from malice — from the accumulated weight of the distance and the process and your own unresolved questions. She did not hear from you for ten days. When you came back she had already begun the process of closing the door. She had done this before. She knew how.`,
    },
  },
  tigist: {
    scenes: [
      {
        title: `The Unusual Line`,
        setup: `Her profile: 'I am not certain this is the right path for me. But I am willing to be shown that it is.' You respond. She writes back in three days: 'Most men do not respond to that line. You did. Why?'`,
        choices: [
          { text: `Tell her: because honesty about uncertainty is rarer than certainty and more trustworthy`, consequence: `She is quiet for a moment. Then: 'That is a good answer. I want to know if it is true or if it is just a good answer.' She is testing whether you mean it or whether you are fluent in the language of what women want to hear.`, flag: `tested` },
          { text: `Tell her the honest reason — her profile was the most real thing you had read on the platform`, consequence: `Long pause. Then: 'Tell me what made it feel real.' The conversation that begins is the most substantive first exchange in the entire course.`, flag: `specific_honest` },
          { text: `Ask her what she expected people to do with that line — ignore it, or respond to it?`, consequence: `She says: 'I expected most to ignore it. I wrote it to filter for the ones who would not.' Pause. 'You are the third person who responded. The first two disappointed me. I am telling you this so you know the bar.'`, flag: `bar_set` },
        ],
      },
      {
        title: `The Ethiopian Orthodox Life`,
        setup: `Three weeks in. She begins to describe her actual life. The Ethiopian Orthodox calendar — 250 fasting days per year, the liturgical rhythms, the community obligations, the language of the church, the centrality of the faith in every dimension of daily life. She ends with: 'I am not describing this as background. I am describing this as the structure of my life. A husband becomes part of this structure.'`,
        choices: [
          { text: `Research the Ethiopian Orthodox tradition before your next message and respond with specific understanding`, consequence: `She is surprised. 'You studied it.' She asks three questions that test whether you went to the surface or the depth. Your answers reveal your preparation. The correspondence deepens.`, flag: `prepared` },
          { text: `Tell her honestly that you know very little and ask her to teach you what she needs you to understand`, consequence: `'The willingness to be taught is the correct posture.' She begins teaching you over the following weeks. The teaching is also a form of courtship — she is giving you her world and watching whether you receive it with curiosity or reluctance.`, flag: `willing_student` },
          { text: `Tell her you respect her faith and would never ask her to compromise it`, consequence: `She says: 'Respect and understanding are different. What I need from a husband is not that he respects my faith the way one respects a foreign custom. I need him to understand it from the inside. That is a different thing.'`, flag: `respect_not_enough` },
        ],
      },
      {
        title: `Her Family's Intention`,
        setup: `Two months. She tells you something important: 'I want to be honest with you. My family created this profile hoping I would meet an Ethiopian man from the diaspora. They did not expect a non-Ethiopian man would be in this conversation. My father has agreed to speak with you, but I want you to understand what you are overcoming.'`,
        choices: [
          { text: `Thank her for the honesty and ask what her father needs to see to overcome his preference`, consequence: `She tells you. It is specific. He needs to see that you are not asking her to become less Ethiopian. He needs to see that you understand what you are entering and are choosing to enter it fully.`, flag: `practical_understanding` },
          { text: `Tell her that you understand this and that you will earn his confidence through what you know and how you engage, not through ethnic background`, consequence: `She says: 'That is the right attitude. But you should know that he is not unreasonable — he is specific. His concern is not about race. It is about whether his daughter's life will be protected or diluted. That is a father's concern.'`, flag: `right_frame` },
          { text: `Ask her whether she herself prefers an Ethiopian man — you want to know her preference, not just her father's`, consequence: `Long pause. 'I have asked myself this question. My honest answer is that I prefer a man who can enter my world fully. Whether he is Ethiopian or not is secondary to whether he is willing and capable of that entering.' This is the most important thing she has said.`, flag: `her_own_answer` },
        ],
      },
      {
        title: `Her Father`,
        setup: `Three months. Her father calls. He is a professor. He is precise and warm and asks nothing that appears difficult. The difficulty is in the precision. After twenty minutes of what feels like general conversation he says: 'I want to understand what my daughter's daily life would look like in your care. Not the special days — the ordinary Wednesday.'`,
        choices: [
          { text: `Answer the ordinary Wednesday in specific detail — including the liturgical calendar, the fasting days, the community obligations`, consequence: `Long silence. Then: 'You know about the calendar.' He asks how you know. You tell him you studied and that Tigist has been teaching you. He says: 'A man who allows himself to be taught by her is a man who understands how to be married to her.'`, flag: `specific_ordinary` },
          { text: `Ask him to describe what the ordinary Wednesday looks like so you can respond accurately`, consequence: `He describes it. When he finishes he says: 'Now you tell me how you fit into that.' The question is now more specific than it was. Your answer is also more accurate.`, flag: `asked_first` },
          { text: `Tell him the ordinary Wednesday would be built together over time — you cannot know it exactly before you live it`, consequence: `He says: 'That is true. But a man who has no idea how Wednesday works is a man who has not thought about what he is asking. I want to see some thought, even if it is incomplete.' Try again.`, flag: `insufficient` },
        ],
      },
      {
        title: `The Visit to Addis`,
        setup: `Four months. You visit Addis Ababa. The first morning she takes you to the church for the morning service. It is long and sung in Ge'ez and you do not understand the words. But the sound is ancient and the space is full and there are people weeping quietly in the pews around you and you begin to understand something about what you are asking to enter.`,
        choices: [
          { text: `Be fully present in the service even though you understand nothing of the language`, consequence: `After the service she says: 'You were not pretending. You were not performing tolerance. You were actually there.' She says it as though she is noting something she did not expect.`, flag: `genuinely_present` },
          { text: `Follow her lead through everything — let her guide every interaction`, consequence: `Her mother, who has come to the service, watches you follow Tigist's lead for two hours. Afterward she says something to Tigist in Amharic. Tigist translates: 'She said you trusted me to lead you. That tells her something about the marriage.'`, flag: `trusted_her_guidance` },
          { text: `Ask Tigist questions during the service about what is happening`, consequence: `She answers quietly. But her mother and her aunt — who are seated nearby — notice that she is explaining and you are receiving. This is also observed. Afterward her aunt says: 'He asks questions. That is good. Empty men do not ask questions.'`, flag: `asking_as_learning` },
        ],
      },
      {
        title: `The Last Uncertainty`,
        setup: `Last day in Addis. Tigist comes to you alone. She says: 'I have one last uncertainty and I want to speak it before I give you my answer. I am uncertain whether you are choosing me specifically or whether you are choosing an idea — the idea of building a life with someone from a deep tradition, someone different, someone who will make you feel you have arrived at something significant. I need to know which one you are doing.'`,
        choices: [
          { text: `Tell her specifically what you have seen in her — not the tradition, but her, specifically — that you are choosing`, consequence: `She listens carefully. When you finish she is still for a long time. Then: 'You named specific things. Not the tradition — me. That is the answer.' She gives you her answer.`, flag: `success` },
          { text: `Tell her honestly that you cannot be completely certain it is not both things but that what you are certain of is that the specific person matters to you beyond the idea`, consequence: `She says: 'Both things can be true. What I needed to know is that the specific person is also real to you and not just the idea of the tradition.' She pauses. 'You answered that.' She gives you her answer.`, flag: `success` },
          { text: `Ask her the same question back — you want to know if she is choosing you specifically or an idea of what a foreign husband represents`, consequence: `She is quiet. Then: 'That is a fair question. I am choosing you specifically. I decided this three months ago. I have been waiting to see if you would also arrive at a specific choice.' She gives you her answer.`, flag: `success` },
        ],
      },
    ],
    endings: {
      success: `The wedding is in Addis Ababa, performed in the Ethiopian Orthodox tradition with the blessing of her father and her uncle who is a deacon of the church. You have learned enough Amharic to speak to her family without a translator in basic conversations. You have learned the fasting calendar and you observe it — not perfectly, but consistently. Her grandmother, who did not speak to you directly during the visit, gives you a gift on your wedding day: a cross worn by her husband, who died before Tigist was born. She places it in your hand and says one sentence in Amharic. Tigist translates it for you that night: 'She said: you came here to understand. That is why you may stay.'`,
      cultural_fail: `You were interested in her but not in what she was made of. The Orthodox calendar, the fasting, the liturgical life — you treated these as the cultural color of the person you loved rather than the structural truth of who she was. She noticed. Not in one moment but in the accumulation of moments when you were adjacent to her world rather than inside it. The arc ended not with a confrontation but with a cooling — a series of conversations where something was missing that had been present before. She said eventually: 'You love me. But you cannot enter my world fully. I cannot ask you to stay outside it forever.'`,
    },
  },
  valentina: {
    scenes: [
      {
        title: `The First Question`,
        setup: `She replies in two days. No warmth yet. Just: 'What does a good husband look like to you?' This is not an icebreaker. It is the first evaluation.`,
        choices: [
          { text: `Answer from your actual life and your actual failures — not your ideals`, consequence: `She reads it twice. 'Most men tell me what they want to be. You told me something true about yourself. I want to keep talking.' The conversation changes register.`, flag: `honest_self` },
          { text: `Answer with values — principles, intentions, beliefs`, consequence: `She responds: 'Those are things you believe. I asked about what you do.' She is precise about the difference between belief and action.`, flag: `principle_not_action` },
          { text: `Ask her the same question before answering`, consequence: `She answers. Specifically. From her own experience. Including the broken engagement and what she learned from it. Then: 'Now you.' She wants to see if your answer changes now that you know hers.`, flag: `reciprocal` },
        ],
      },
      {
        title: `The Broken Engagement`,
        setup: `Three weeks in. She tells you about the engagement — the man, the two years, the two months before the wedding, the phone call she received that ended it. She tells it factually, without performance. She says: 'I am telling you this because you will find out eventually and I would rather you find out from me.'`,
        choices: [
          { text: `Ask how the experience changed what she is looking for`, consequence: `She answers carefully. She has thought about this. The experience made her more discerning rather than more desperate. She describes what she learned to look for. You are being told exactly what you need to be.`, flag: `listening` },
          { text: `Tell her his loss is your gain — make her feel that the pain had a purpose`, consequence: `She looks at you carefully. 'You cannot know that yet. You do not know me well enough to know if I am someone's gain.' She is right. Walk it back.`, flag: `premature` },
          { text: `Ask what she would have done differently`, consequence: `She says: 'I would have paid attention to what he did when things were inconvenient rather than what he promised when they were not.' This is not just history. It is the rubric she is applying to you.`, flag: `rubric_revealed` },
        ],
      },
      {
        title: `Her Father`,
        setup: `Two months. She mentions her father is going to be in the conversation now whether you plan for it or not. 'He will assess you. He will not tell you he is doing it. He will not ask you hard questions. He will observe you. He assessed my ex-fiance and told me he was not the man he was presenting himself as. I did not listen. I am listening now.'`,
        choices: [
          { text: `Ask her what her father observed about her ex that she missed`, consequence: `She tells you. The specific tells. How he treated people who were not watching. How he spoke about men he considered beneath him. How he received gratitude — with discomfort rather than ease. 'He was not comfortable being thanked,' she says. 'That should have told me something.'`, flag: `learning_the_tells` },
          { text: `Ask how you can ensure her father sees you as you actually are`, consequence: `She says: 'You cannot ensure it. If you try to manage what he sees, he will see that you are managing. Just be yourself.' Then, after a pause: 'But be your best self. There is a difference.'`, flag: `guidance_received` },
          { text: `Tell her you are not going to perform for her father — you will simply be who you are`, consequence: `She receives this. 'Good. That is the only version of you that will work with him. He has a very good sense for the gap between who someone is and who someone is performing to be.'`, flag: `commitment_to_authenticity` },
        ],
      },
      {
        title: `Medellin`,
        setup: `Three months. You visit. The first dinner is at her parents' home. Her father, her mother, her two brothers, and a family friend who you later learn was invited specifically to provide an outside assessment. The dinner is three hours. The conversation is light. The evaluation is constant.`,
        choices: [
          { text: `Be genuinely curious about the family — ask real questions, listen to the answers`, consequence: `The family friend says something quietly to her brother at the end of the dinner. Her father nods. You learn later what was said: 'He listened more than he spoke. That is not common.'`, flag: `listening_noted` },
          { text: `Focus your energy on impressing the father directly`, consequence: `The father is polite and warm. But the energy of the room tells you something is slightly off. You aimed at the target and missed the mark. The target was not the father — it was the table.`, flag: `wrong_focus` },
          { text: `Pay full attention to how you treat the people who are not the focus of the evening — the server, the youngest brother, the family friend`, consequence: `Her father watches this for two hours. At the end of the dinner he says one sentence to her in Spanish. She translates for you later: 'He said you know how to be in a room.'`, flag: `peripheral_attention` },
        ],
      },
      {
        title: `The Test`,
        setup: `Second day in Medellin. You are walking with Valentina alone for the first time. A man stops her on the street — he is clearly someone from her past, someone she was close to, and the history between them is visible in the exchange even though you cannot hear all of it. He speaks to her for several minutes. She is composed. You are standing five feet away.`,
        choices: [
          { text: `Stand where you are, calm and present, without displaying jealousy or impatience`, consequence: `When the man leaves she turns to you and studies your face for a moment. Then: 'You did not move.' She says it as though it is significant. It is.`, flag: `composure` },
          { text: `Walk closer to signal your presence — not aggressively, but visibly`, consequence: `She notices. She does not say anything in the moment. That night she says: 'You felt the need to mark the territory.' It is said without judgment. But it is information.`, flag: `territorial` },
          { text: `After he leaves, ask her who he was`, consequence: `She tells you. She watches how you receive the information. 'You are not angry,' she says. 'Most men would be angry.' You say: 'Should I be?' She says: 'No.'`, flag: `secure` },
        ],
      },
      {
        title: `The Conversation She Has Been Preparing`,
        setup: `Last night in Medellin. She comes to you with the directness that has been her way from the beginning: 'I have watched you for three months and three days. I have watched you with my family, with strangers, with inconvenience, with the past. I want to tell you what I have seen and I want you to tell me if I am seeing correctly.'`,
        choices: [
          { text: `Tell her to tell you what she has seen — no defense, full reception`, consequence: `She tells you. Some of it is difficult to hear. Some of it is more generous than you expected. When she finishes she says: 'Did I see correctly?' The answer you give will determine whether this becomes a marriage.`, flag: `open_reception` },
          { text: `Tell her what you have seen in her at the same time — make it mutual`, consequence: `She nods once, accepting the mutual framing. 'Fine. You first.' You describe her. Specifically. Accurately. Including the things that are demanding. She listens without flinching. Then she tells you what she has seen. This is the foundation.`, flag: `mutual_seeing` },
          { text: `Ask her what she needs to know before she can give you her answer`, consequence: `She says: 'I do not need to know anything more. I need to tell you what I have decided. But I wanted to check my seeing first.' This sentence — I wanted to check my seeing first — tells you everything about who she is.`, flag: `her_method` },
        ],
      },
    ],
    endings: {
      success: `She gives you her answer the morning you fly home: yes. The mahr discussion takes three calls because her father has specific terms and you have specific counterterms and the negotiation is respectful and honest and slightly contentious in the way that real negotiations are. The nikah is performed in Medellin six months later. When her father holds your hand at the end his eyes are wet. He says one thing in Spanish. You understand it later: 'Do not make me wrong about you.'`,
      cultural_fail: `You thought familiarity meant preparation. You arrived in Medellin having watched the cultural surface and missed the depth. The dinner table was an evaluation you did not know you were sitting at. The man on the street was a test you partially failed. The final conversation was one you received defensively rather than openly. She was precise about what she saw. What she saw was not enough.`,
    },
  },
  yasmine: {
    scenes: [
      {
        title: `First Contact`,
        setup: `Yasmine messaged you twelve minutes after you created your account. 'I saw your profile. You seem like a genuine man. I don't meet many of those here.' The fluency is perfect. The warmth is immediate.`,
        choices: [
          { text: `Respond warmly — she reached out and the connection feels real`, consequence: `She responds in four minutes. You talk for two hours. On day five she mentions her phone screen is cracked and she is worried about losing contact with you. She does not ask for anything.`, flag: `engaged` },
          { text: `Respond but keep it measured — the speed of her message is worth noting`, consequence: `She adjusts her pace to match yours. The conversation slows. She is patient. This is also information.`, flag: `measured` },
          { text: `Do a reverse image search on her profile photos before responding`, consequence: `Two of her photos appear under a different name on a separate platform. You have your answer before the conversation begins.`, flag: `early_detect` },
        ],
      },
      {
        title: `The Phone Crisis`,
        setup: `Day five. She mentions the cracked screen — not as a request, just as a worry. Day eight she mentions her cousin is in the hospital. Day twelve a small financial crisis emerges in her family. She has never directly asked you for anything. But the pattern is visible if you are looking.`,
        choices: [
          { text: `Offer to help — it feels right and the amounts are small`, consequence: `She is grateful. The amounts increase. A month later the requests are no longer small and no longer framed as crises — they are framed as investments in your future together.`, flag: `compromised` },
          { text: `Express sympathy each time but offer nothing financial`, consequence: `She pivots immediately each time. The crises resolve on their own. She never mentions them again. The pattern reveals itself as a script.`, flag: `observant` },
          { text: `Name what you are seeing directly — 'I've noticed a pattern I want to ask you about'`, consequence: `She goes quiet for two days. Then returns warmer than ever. The crises stop. But you now know what the silence meant.`, flag: `direct` },
        ],
      },
      {
        title: `The Video Call`,
        setup: `You have been talking for six weeks. The warmth is consistent. You ask her to video call right now — spontaneously, no preparation. You want to see who answers.`,
        choices: [
          { text: `Insist on the spontaneous call — you need to see her unguarded`, consequence: `She declines. She needs thirty minutes. When the call comes the background has changed. Something in the timing does not settle.`, flag: `suspicious` },
          { text: `Accept the thirty minutes and observe the background carefully when she calls`, consequence: `The background is a room you have not seen before. The lighting is arranged. She is beautiful and composed. You ask about a detail in the background. She hesitates one second too long.`, flag: `analyzing` },
          { text: `Ask her to show you her current surroundings right now — just pan the camera around`, consequence: `She laughs and does it. You see a room. In the background, briefly, a man's jacket on a chair. She does not notice you noticed.`, flag: `evidence` },
        ],
      },
      {
        title: `The Social Media Test`,
        setup: `You ask to see her social media accounts. She gives you one — an Instagram created eight weeks ago, exactly when your conversation began. The posts are all from the last two months. There is nothing before.`,
        choices: [
          { text: `Ask her directly why the account is so new`, consequence: `She says she deleted her old one for privacy. She has an answer for everything. The answers are always just good enough.`, flag: `questioning` },
          { text: `Ask for her WhatsApp account history — if she wants to marry you she will show you`, consequence: `She shows you a WhatsApp with messages going back two years. The messages are all in Arabic. You translate three of them. Two are to someone named Karim. The third is from him.`, flag: `evidence` },
          { text: `Search for her name combined with her city on multiple platforms`, consequence: `You find a Facebook under a slightly different spelling of her name. The photos match. The relationship status says 'In a Relationship.' The last post was four days ago.`, flag: `early_detect` },
        ],
      },
      {
        title: `Confrontation`,
        setup: `You have enough to know. The question now is how you handle it — for your sake, not hers.`,
        choices: [
          { text: `End the conversation without explanation — disappear as she would have eventually disappeared from you`, consequence: `You close the chapter cleanly. The grief is real. You spend a week processing caring about someone who was performing. That grief is legitimate even if she was not.`, flag: `early_detect` },
          { text: `Tell her what you found and give her a chance to explain`, consequence: `She has an explanation. It is detailed and sympathetic and almost believable. You recognize that you want to believe it. That wanting is the last trap.`, flag: `closure` },
          { text: `Report the profile to the platform and block without contact`, consequence: `You protect the next man who would have found her. You feel the loss of something that was never real. Both things are true simultaneously.`, flag: `early_detect` },
        ],
      },
      {
        title: `The Debrief`,
        setup: `Weeks later. You are sitting with what happened. Not the anger — that passed. The question is what you learned and what you carry forward.`,
        choices: [
          { text: `Study the pattern so you can recognize it faster next time`, consequence: `You write down every signal you missed and every one you caught. The list is longer than you expected. You are better prepared than you were.`, flag: `early_detect` },
          { text: `Give it time before returning to the platform`, consequence: `Three months. When you return you are slower, more deliberate, less susceptible to immediate warmth. This is the correct lesson.`, flag: `early_detect` },
          { text: `Return immediately — you will not let one fraud steal your momentum`, consequence: `You return too quickly. You are still running the wound. The next woman can sense something off in you. You need more time than you think.`, flag: `cultural_fail` },
        ],
      },
    ],
    endings: {
      early_detect: `You caught it. The cost was three months of evenings and the real grief of caring about someone who was not real. That grief is not nothing — receive it as proof you are capable of caring, which is also what makes you worth defrauding. The lesson is not to care less. It is to vet faster and hold your money longer.`,
      compromised: `You sent money before the vetting was complete. The amounts grew. When you finally caught the pattern the financial damage was real and the emotional damage was worse. The debrief is clear: no money before she is standing in front of you and her family has accepted you.`,
      fraud_post: `You married her. The pattern that was present from the beginning was present throughout the marriage. After citizenship she was gone. The child is yours. This ending is documented. It has happened to real men. The signals were always there.`,
    },
  },
};

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
      <Portrait id={woman.id} name={woman.name} />
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
  const [outcomeText, setOutcomeText] = useState("");

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
    const womanData = DEEP_SCENARIOS[woman.id] || {};
    const scenes = womanData.scenes || [];
    const nextScene = sceneIndex + 1;
    if (nextScene < scenes.length) {
      setSceneIndex(nextScene);
    } else {
      const flags = newHistory.map(c => c.flag || "");
      let ending = "success";
      if (woman.type === "fraud") {
        const caught = flags.some(f => f === "early_detect" || f === "evidence" || f === "direct_question");
        ending = caught ? "early_detect" : "fraud_post";
      } else if (woman.type === "genuine_wrong") {
        ending = "genuine_wrong";
      } else {
        const failed = flags.filter(f => f === "impatient" || f === "performed" || f === "performed_faith" || f === "permission_not_support" || f === "missed_question" || f === "insufficient").length >= 2;
        ending = failed ? "cultural_fail" : "success";
      }
      const womanEndings = womanData.endings || {};
      const endingText = womanEndings[ending] || womanEndings["success"] || "";
      setOutcome(ending);
      setOutcomeText(endingText);
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
                <div style={{ fontSize:6.5, color:C.gold, fontFamily:"sans-serif", textAlign:"center", lineHeight:1.35, whiteSpace:"pre-line" }}>{r.label.toUpperCase().replace(" ", " ")}</div>
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
    const womanData = DEEP_SCENARIOS[woman.id] || {};
    const scenes = womanData.scenes || [];
    const scene = scenes[sceneIndex];
    if (!scene) return null;
    return (
      <div style={{ minHeight:"100vh", background:C.dark, color:C.cream, fontFamily:"Georgia,serif" }}>
        <NavBar left={<button onClick={() => setPhase("roster")} style={{ background:"none", border:"1px solid #b8963e", color:"#b8963e", padding:"6px 14px", borderRadius:"20px", cursor:"pointer", fontSize:"13px", fontFamily:"sans-serif" }}>← Roster</button>} title={region.label + " · " + woman.name + " · Scene " + (sceneIndex+1) + " of " + ((DEEP_SCENARIOS[woman.id] || {}).scenes || []).length} right={<div style={{ fontSize:9, color:C.mutedDark, fontFamily:"sans-serif" }}>Pursuing {woman.name}</div>} />
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
    const endingText = outcomeText || (region.endings && region.endings[outcome]) || "Your arc is complete.";
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
