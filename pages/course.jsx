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

function Portrait({ id, name, photo }) {
  const src = photo || ("/women/" + id.replace(/_/g, "-") + ".jpg");
  return (
    <div style={{ width:"100%", height:220, overflow:"hidden", background:"#0f2347", position:"relative" }}>
      <img
        src={src}
        alt={name}
        style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top", display:"block" }}
        onError={e => { e.target.style.display="none"; }}
      />
    </div>
  );
}

const REGIONS_COURSE = [
  {
    id:"us", label:"North America", desc:"United States — All Backgrounds",
    context:"She chose a different standard. Whatever she came from — mosque, church, temple, or simply the decision that the culture around her was not enough — she made a choice that most women around her did not make. This region is about recognizing that choice, meeting her on her terms, and bringing the same preparation to her door that you would bring to a door in Fez or Dakar.",
    unlocked:false,
    stamp:"USA",
    women:[
      { id:"aisha", photo:"/women/aisha.jpg", name:"Aisha", age:27, city:"Atlanta, Georgia", religion:"Muslim", platform:"atlanta-mosque-community.org", profileText:"Born Muslim. Her father was one of the first men in his neighborhood to take shahada in the 1980s. She has been waiting for a man who understands what that means.", hidden:"Her father's standing in the community means any man she introduces is immediately visible to forty years of community relationships.", signal:"She asks precise questions and does not accept vague answers.", type:"genuine" },
      { id:"deborah", photo:"/women/deborah.jpg", name:"Deborah", age:29, city:"Washington D.C.", religion:"Hebrew Israelite", platform:"washingtondc-hebrew-community.org", profileText:"She has been in the Hebrew Israelite community her whole life. The law is not a burden — it is the framework she was raised inside and has chosen to remain inside as an adult.", hidden:"Her elder's word is final. The family will not proceed without it.", signal:"She keeps the Sabbath. The silence on Friday evening is not a problem to solve.", type:"genuine" },
      { id:"kezia", photo:"/women/kezia.jpg", name:"Kezia", age:26, city:"Houston, Texas", religion:"Christian", platform:"houston-faith-community.org", profileText:"Not a cultural Christian. She reads. She fasts. She tithes because she decided to. She is waiting for a man who has a relationship with God that is his own, not borrowed.", hidden:"Her pastor's assessment carries the same weight as her father's.", signal:"Her brother is quiet and watching. A quiet man watching is not passive.", type:"genuine" },
      { id:"marisol", photo:"/women/marisol.jpg", name:"Marisol", age:28, city:"Chicago, Illinois", religion:"Catholic", platform:"chicago-latina-community.org", profileText:"Mexican-American. Third generation. Her grandmother came from Jalisco. Her faith is woven into everything her family does.", hidden:"The grandmother is the head of this family. Everyone knows it and no one says it officially.", signal:"She mentions her grandmother constantly. This is the most important information she is giving you.", type:"genuine" },
      { id:"samira", photo:"/women/samira.jpg", name:"Samira", age:25, city:"Miami, Florida", religion:"Islam (revert)", platform:"miami-muslim-community.org", profileText:"Puerto Rican. Took shahada four years ago. Her family is Catholic. Her faith is real — tested, chosen, and maintained against the current of her own culture.", hidden:"Her reversion cost her something real. She is not fragile about it. She is the most grounded woman in this region because her faith cost her something.", signal:"She will tell you the cost without being asked. That honesty is the test of whether you can receive it.", type:"genuine" },
      { id:"nour_us", photo:"/women/nour-us.jpg", name:"Nour", age:27, city:"Dearborn, Michigan", religion:"Islam", platform:"dearborn-muslim-community.org", profileText:"Born in Dearborn. Her parents came from Lebanon. She is American in her fluency and Arab in her framework. The family meeting in Dearborn is not different from the family meeting in Beirut.", hidden:"The family gathering in Dearborn includes extended family who have an unofficial but real vote.", signal:"She asks if you know what marrying into a Lebanese family means. Answer specifically.", type:"genuine" },
      { id:"rachel", photo:"/women/rachel.jpg", name:"Rachel", age:26, city:"Portland, Oregon", religion:"Islam (revert)", platform:"portland-muslim-community.org", profileText:"Took shahada eighteen months ago. Her practice is sincere. Her knowledge is growing. Her foundation is thin. She is using the idea of a husband to fill the space where a community should be.", hidden:"The correct ending for this arc is not success. It is not yet. A man who can tell the difference between the right woman at the wrong time and the wrong woman at any time is ready for this region.", signal:"She talks about the future with specificity before her present is fully built. This is the signal.", type:"not_yet" },
    ],
  },
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
  }
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
    ,
      {
        title: `The Pentecostal Depth`,
        setup: `Abena from Accra, Ghana. You have been corresponding for eight weeks. The uncle — her pastor uncle — has made contact. He says he would like to speak with you before the family meeting. His first question will be about your faith.`,
        choices: [
          { text: `Prepare thoroughly — read about the Pentecostal tradition before the call`, consequence: `He asks a question you could not have answered without the preparation. You answer it. He pauses. 'You did your homework. Most men do not do their homework.'`, flag: "prepared" },
          { text: `Go into the call honest about your faith and open about your gaps in knowledge`, consequence: `He receives the honesty better than he would have received a performance. He asks: 'You told me what you do not know. That is more than I usually get.'`, flag: "honest_gaps" },
          { text: `Ask Abena to tell you what her uncle will ask before the call`, consequence: `She gives you three things. You prepare for all three. He asks two of them and one you did not expect. The two you prepared for you answer well. The unexpected one you answer honestly. He approves of all three responses.`, flag: "abena_prepared" },
        ],
      },
      {
        title: `The Church Visit`,
        setup: `You are in Accra. Abena's uncle has arranged for you to attend a Sunday service at the family's church. The entire community will be there. You will be introduced. This is not a quiet visit.`,
        choices: [
          { text: `Arrive prepared to be present and participate genuinely`, consequence: `The service is full and long and physically expressive in ways you have not experienced. You participate where you can and observe where you cannot. The congregation notices the quality of your presence.`, flag: "church_present" },
          { text: `Ask Abena before the service what to expect and how to participate`, consequence: `She prepares you. You arrive knowing the rhythms. The uncle watches you absorb the service. He tells the family afterward: 'He was not performing. He was there.'`, flag: "church_prepared" },
          { text: `Follow Abena's lead during the service — she is your guide in this context`, consequence: `She notices you following her lead. After the service she says: 'You trusted me.' This is more than the church. This is a preview of what marriage to her will require.`, flag: "abena_trusted" },
        ],
      },
      {
        title: `The Uncle's Question`,
        setup: `After the service the uncle pulls you aside. He has one question. He says: 'I ask every man who comes for someone in this family the same question. The question is this: what do you fear?'`,
        choices: [
          { text: `Answer honestly — name a real fear`, consequence: `He listens completely. Then: 'Most men say they are not afraid of anything. That is not an answer. You gave me an answer.' He tells the family you are real.`, flag: "fear_honest" },
          { text: `Ask him why he asks this question specifically`, consequence: `He explains. A man's fear tells you what he is protecting. A man who knows his fear can manage it. A man who does not know it will be managed by it without knowing. You answer the question with this framework in mind.`, flag: "question_understood" },
          { text: `Ask him what the men who did not pass said`, consequence: `He tells you one example. You understand what it cost that man. You answer differently. He nods once. 'That is the right kind of fear to name.'`, flag: "failed_example" },
        ],
      },
      {
        title: `Her Father`,
        setup: `Abena's father is a retired teacher. He is quiet where the uncle is expressive. He meets you at the family home after the church visit. He serves you himself — water, then food, then sits across from you. He says: 'My brother has spoken well of you. Now I want to hear you myself.'`,
        choices: [
          { text: `Speak to him the way you spoke to the uncle — honestly, without performance`, consequence: `He listens for forty minutes. He asks three questions. He stands at the end. He extends his hand. This is the agreement in this family — the handshake from the father.`, flag: "father_handshake" },
          { text: `Ask him what he wants to hear — not to give him what he wants, but to understand what he values`, consequence: `He says: 'I want to hear who you are when you are not trying to be what you think I want.' You take a breath. Then you speak.`, flag: "father_real" },
          { text: `Tell him what brought you to this platform, what you have learned, and why Abena specifically`, consequence: `He listens to all three. The third part — why Abena specifically — he asks you to say again. He asks Abena to come in. He asks you to say it again in front of her. You do.`, flag: "father_why_abena" },
        ],
      },
      {
        title: `The Bride Price`,
        setup: `The family's tradition involves a formal bride price negotiation with community witnesses. The uncle leads it. The items are named. The monetary components are discussed. It takes three hours.`,
        choices: [
          { text: `Participate in each stage with patience and respect for the length of the process`, consequence: `The uncle tells the family afterward: 'He sat through the whole process. He did not rush a single stage.' The length of the process is a feature, not a flaw.`, flag: "process_honored" },
          { text: `Ask about each item as it is named — you want to understand what you are agreeing to`, consequence: `The uncle is pleased. The questions slow the process further but deepen the meaning. Her father watches you learning the tradition in real time.`, flag: "items_understood" },
          { text: `Let the uncle lead completely and agree to what is agreed upon`, consequence: `He leads well. Your trust in his stewardship of the process is itself a form of respect for the tradition. The community notes the deference.`, flag: "uncle_trusted" },
        ],
      },
      {
        title: `The Agreement`,
        setup: `The bride price ceremony completes. Her father has agreed. The uncle has blessed the union. The community has witnessed it. Abena is in the next room — the women have their own gathering. When it is done, she comes in.`,
        choices: [
          { text: `SUCCESS: Abena — Accra, Ghana.`, consequence: `SUCCESS: The uncle's question, the church service, the three-hour ceremony, the father's handshake — all of it was the path. Sub-Saharan Africa arc — complete.`, flag: "success" },
          { text: `SUCCESS: The fear you named in that room was the right fear.`, consequence: `SUCCESS: It told the uncle everything he needed to know. Arc complete.`, flag: "success" },
          { text: `SUCCESS: Arc complete.`, consequence: `SUCCESS: Abena — Accra, Ghana. Complete.`, flag: "success" },
        ],
      },
      {
        title: `Arrival`,
        setup: `She arrives. Her uncle sent a recording of the family singing at the wedding celebration in Accra the week after you left. He sent it so you would hear what your marriage sounded like in Ghana.`,
        choices: [
          { text: `SUCCESS: Your marriage has a sound in Ghana.`, consequence: `SUCCESS: Honor what that means. Sub-Saharan Africa arc — complete.`, flag: "success" },
          { text: `SUCCESS: Arc complete.`, consequence: `SUCCESS: Ghana — complete.`, flag: "success" },
          { text: `SUCCESS: Abena — complete.`, consequence: `SUCCESS: Everything you learned here applies throughout the Sub-Saharan Africa arc.`, flag: "success" },
        ],
      }
    ,
      {
        title: `After the Ceremony`,
        setup: `The day after the bride price ceremony. The family has dispersed. You sit with her father alone for the first time without the formality of the occasion. He makes tea himself. He does not speak immediately. When he does, he speaks about Abena as a child.`,
        choices: [
          { text: `Listen completely — do not redirect toward the future`, consequence: `He speaks for forty minutes. The woman you thought you knew deepens. The father is giving you the context for who you married. This is a gift.`, flag: "father_listen" },
          { text: `Ask him one question about something he mentioned`, consequence: `He is pleased by the question. He continues. He tells you something about her that she has never told you herself. He says: 'She will tell you eventually. I am telling you now so you are not surprised when she does.'`, flag: "father_question" },
          { text: `Thank him for the ceremony, for the reception of the bride price, for the trust`, consequence: `He receives it briefly. Then: 'The ceremony is the public thing. This conversation is the real thing.' He continues talking. The tea goes cold. Neither of you notices.`, flag: "father_thanks" },
        ],
      }
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
    ,
      {
        title: `The Javanese Silence`,
        setup: `Amira from Yogyakarta. She responds to everything pleasantly. Every question you ask receives a warm, complete, agreeable answer. By week six you realize: she has never disagreed with you about anything. Not once.`,
        choices: [
          { text: `Test this deliberately: state something you do not fully believe and see if she agrees`, consequence: `She agrees. Warmly. You revise the statement to its opposite. She agrees with that too. Warmly. You are dealing with a cultural pattern, not a personality.`, flag: "agreement_tested" },
          { text: `Ask her directly: 'Have you ever disagreed with anything I have said?'`, consequence: `She pauses. Then laughs gently. Then says: 'In my family we do not argue directly.' She explains rukun — the harmony principle. What you are experiencing is cultural, not evasive.`, flag: "directly_asked" },
          { text: `Accept the harmony and look for disagreement in subtler signals`, consequence: `You start reading what she chooses not to say, what she answers briefly, what she redirects. Her real opinions are present — they are just coded differently than you are used to.`, flag: "reading_subtext" },
        ],
      },
      {
        title: `Her Family's Religion`,
        setup: `Amira is Javanese Muslim — but Javanese Islam is different from the Islam you have been reading about. It incorporates older animist traditions, it has different practices, different emphases. Her father is a respected figure in a local tarekat. She asks if you can understand this before you meet them.`,
        choices: [
          { text: `Ask her to teach you what you need to know`, consequence: `She teaches you over three weeks. She is more comfortable and more herself in this teaching than in any previous conversation. This is her. The teaching is the person.`, flag: "taught" },
          { text: `Research Javanese Islam independently and then discuss what you found with her`, consequence: `She is surprised and moved that you researched independently. She corrects two misunderstandings warmly. The correction is itself a form of trust.`, flag: "researched" },
          { text: `Tell her your own faith framework and ask if she sees a path of compatibility`, consequence: `She thinks carefully. She says: 'Compatibility is not about being the same. It is about whether both paths go to the same place.' This is one of the most precise things anyone has said to you in this process.`, flag: "compatibility_framed" },
        ],
      },
      {
        title: `The Wali`,
        setup: `In her tradition, a wali — a male guardian — formally represents her in the marriage process. Her father is her wali. But he has appointed her uncle to conduct the initial conversations because he is more comfortable with outside contact. The uncle contacts you formally.`,
        choices: [
          { text: `Correspond with the uncle with the same seriousness you would give her father`, consequence: `The uncle reports back favorably. Her father receives the reports. The proxy has worked as it was designed to work.`, flag: "uncle_respected" },
          { text: `Ask the uncle if there is an opportunity to speak with her father directly at some point`, consequence: `The uncle relays the request. Her father appreciates that you asked. He schedules a video call for the following month.`, flag: "father_requested" },
          { text: `Ask Amira privately to help you understand what the uncle is really assessing`, consequence: `She explains. The uncle is assessing three things: your seriousness, your financial stability, and your respect for the traditional process. You adjust accordingly.`, flag: "assessment_known" },
        ],
      },
      {
        title: `Yogyakarta`,
        setup: `You arrive in Yogyakarta. The city is different from any you have visited. The pace is slower. The Kraton — the sultan's palace — is at the center of the city's life in ways that are not immediately visible. Amira's cousin meets you. He is twenty-five and studious and has been designated as your guide.`,
        choices: [
          { text: `Follow the cousin's lead entirely — he is your host in this context`, consequence: `He takes you to places most visitors do not go. He is testing your curiosity. You are curious. By the third hour he is explaining things you did not ask — this is a good sign.`, flag: "cousin_led" },
          { text: `Ask the cousin what the family needs to see from you during this visit`, consequence: `He thinks. Then: 'They need to see that you are not in a hurry. In Yogyakarta, patience is character.' You file this.`, flag: "cousin_asked" },
          { text: `Ask the cousin about the sultan and the city's history`, consequence: `He lights up. He talks for an hour. You have found the right subject. By the time you reach the family home he has called ahead to say something. Amira tells you later: he said you were interested in the real things.`, flag: "history_asked" },
        ],
      },
      {
        title: `The Father`,
        setup: `Her father receives you in a room with low furniture and batik textiles on the walls. He speaks through his brother, the uncle. But he is watching. His brother asks questions. Her father listens. At one point he says something in Javanese. The uncle translates: 'He wants to know if you have ever learned to be still.'`,
        choices: [
          { text: `Answer honestly: stillness is something you have been working toward`, consequence: `The uncle translates. Her father speaks again. The uncle translates: 'He says that is the correct answer because it is honest. A man who claims to already be still is not still.' Her father pours you tea himself.`, flag: "stillness_honest" },
          { text: `Answer: 'I am learning from being here'`, consequence: `Her father listens to the translation. He is quiet a moment. He says one word to his brother. The uncle translates: 'Good.' The meeting continues.`, flag: "present_answer" },
          { text: `Ask what stillness means in his understanding`, consequence: `Her father speaks for several minutes. The uncle translates in sections. The teaching is specific and rooted in his tarekat practice. You listen completely. Her father notices.`, flag: "stillness_asked" },
        ],
      },
      {
        title: `The Cultural Mismatch Risk`,
        setup: `You are here and the family is warm and Amira is real and everything seems aligned. But her father raises something through the uncle: he is concerned that you will bring his daughter to a place where she has no community — no mosque that speaks her language, no Javanese neighbors, no one who knows the customs she grew up with.`,
        choices: [
          { text: `Take the concern seriously and research what Javanese and Indonesian communities exist in your city`, consequence: `You find a mosque with an Indonesian community within forty minutes of where you live. You bring the information to the uncle the next day. Her father listens to the translation. He speaks to his brother for a full minute.`, flag: "community_researched" },
          { text: `Tell him you will help Amira build her community — you cannot promise what already exists`, consequence: `He hears this. The uncle translates: 'He says honesty about what does not exist is more trustworthy than a promise about it.' Her father nods.`, flag: "honest_about_community" },
          { text: `Ask Amira privately what she needs from her community and how you can provide it`, consequence: `She tells you specifically. You build a plan together. You bring the plan to the uncle. Her father hears it. This is the first thing you and Amira have built together.`, flag: "plan_built" },
        ],
      },
      {
        title: `The Ceremony`,
        setup: `The akad nikah. The ceremony is full and traditional and nothing you have attended before. The ijab-kabul — the declaration — is spoken. You have practiced for three weeks. When the moment comes your pronunciation is imperfect but your intention is complete.`,
        choices: [
          { text: `SUCCESS: Amira — Yogyakarta, Indonesia.`, consequence: `SUCCESS: The stillness the father asked about — you found it here, in this room, in this moment. Asia arc — complete.`, flag: "success" },
          { text: `SUCCESS: The cultural distance was real. You crossed it with patience and research.`, consequence: `SUCCESS: Every arc in Asia will require this kind of preparation. You now know what that looks like.`, flag: "success" },
          { text: `SUCCESS: Arc complete.`, consequence: `SUCCESS: Amira — Yogyakarta, Indonesia. Complete.`, flag: "success" },
        ],
      },
      {
        title: `Arrival`,
        setup: `She arrives in late spring. Her father sent a box with her — batik fabric, spices, a small carved figure that has been in the family for three generations. A note in Javanese. Amira translates it for you the night she arrives.`,
        choices: [
          { text: `SUCCESS: Her father sent the family into your home.`, consequence: `SUCCESS: Honor what arrived in that box. Asia arc — complete.`, flag: "success" },
          { text: `SUCCESS: The patience was worth everything it cost.`, consequence: `SUCCESS: Arc complete.`, flag: "success" },
          { text: `SUCCESS: Amira — complete.`, consequence: `SUCCESS: Everything you learned in this arc applies in Bangladesh and the Philippines. The cultural intelligence transfers.`, flag: "success" },
        ],
      }
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
    ,
      {
        title: `Santo Domingo Energy`,
        setup: `Diana from Santo Domingo. She is direct in a different way from Jasmine or Nurul. She is warm, fast, funny, and she asks you something in the third week that stops you: 'Do you know the difference between a Dominican woman and what American culture has told you about a Dominican woman?'`,
        choices: [
          { text: `Tell her honestly: you know there is a difference and you want to learn it from her`, consequence: `She teaches you for a month. The difference is significant. She becomes more real as the teaching progresses — this is the version of her that exists before the performance American culture expects from her.`, flag: "learning_from_her" },
          { text: `Ask her to describe the difference`, consequence: `She does. Specifically and without softening. She has had this conversation before and most men have not been able to receive it. You receive it.`, flag: "difference_described" },
          { text: `Tell her you have been doing your own research`, consequence: `She asks what you found. You tell her. She corrects three things. Then: 'At least you tried. Most men don't even try.' The conversation accelerates.`, flag: "research_corrected" },
        ],
      },
      {
        title: `Her Community`,
        setup: `Diana's family is embedded in a tight-knit community in her neighborhood. She is known. Her family is known. When she tells them she is corresponding with a man from the United States, the community is watching. She tells you this directly.`,
        choices: [
          { text: `Ask what the community's concerns are`, consequence: `She tells you three: that you will come, take her, and cut her from her roots. That you will not know how to be in community. That you will not be serious. She asks which of these three you can address.`, flag: "concerns_named" },
          { text: `Tell her you welcome being known by her community`, consequence: `She pauses. Then: 'That is either very smart or very real.' You tell her which. She decides which herself.`, flag: "community_welcomed" },
          { text: `Ask her what it would take for the community to see you as serious`, consequence: `She thinks. Then: 'Come here. Be here. Let them see you exist.' The question has produced an invitation.`, flag: "community_invitation" },
        ],
      },
      {
        title: `Santo Domingo`,
        setup: `You arrive. The heat is immediate. Her cousin is at the airport — not a car, a motorcycle. He tells you to get on. You ride through the city to the family neighborhood. The neighborhood sees you arrive. This is intentional.`,
        choices: [
          { text: `Arrive with dignity and warmth — greet everyone who looks at you`, consequence: `By the time you reach the house, the cousin has already called Diana. She says: 'He greeted everyone.' This has been noted.`, flag: "arrival_dignified" },
          { text: `Observe and absorb — you are a visitor here`, consequence: `The cousin notices the quality of your attention. He tells Diana: 'He is watching everything. He wants to understand.' This is the correct behavior for a first arrival.`, flag: "arrival_observant" },
          { text: `Ask the cousin who you should greet specifically`, consequence: `He names three people. You greet them by name. Diana calls you five minutes after you reach the house: 'How do you already know their names?' The cousin told you. She knows. She is still impressed.`, flag: "arrival_prepared" },
        ],
      },
      {
        title: `The Family Table`,
        setup: `The family table is full. Extended family, neighbors, community members. The food is extraordinary. Her mother watches you eat. Her father watches how you speak to people you have just met. Her grandmother is at the head of the table and has not spoken to you yet.`,
        choices: [
          { text: `Go to the grandmother before the meal begins and introduce yourself to her specifically`, consequence: `The room notices. Diana's mother touches her husband's arm. The grandmother speaks to you in Spanish. Diana translates: 'She says you knew who was most important in this room.' You did.`, flag: "grandmother_first" },
          { text: `Let the grandmother come to you when she is ready`, consequence: `Halfway through the meal she taps the table near you. She speaks. Diana translates: 'She is asking you something she does not ask most people.' The question is the real family test.`, flag: "grandmother_patient" },
          { text: `Ask Diana before the meal who the most important person in the room is`, consequence: `She says: 'My grandmother. Do not wait for someone to introduce you.' You stand immediately. The room sees.`, flag: "grandmother_directed" },
        ],
      },
      {
        title: `The Father`,
        setup: `Diana's father speaks to you after the meal. In Spanish — Diana translates. He asks two things: what do you know about being a man in a family, and what happens if my daughter is unhappy.`,
        choices: [
          { text: `Answer both questions from personal experience and genuine reflection`, consequence: `He listens completely. Then he says something in Spanish that Diana translates slowly: 'He says a man who has thought about those questions has already begun to answer them correctly.'`, flag: "father_answered" },
          { text: `Answer the second question first — it is the one that matters most to him`, consequence: `He stops. He was expecting you to answer in order. You answered in priority. He tells Diana: 'He knows which question is real.' He answers nothing further. He has seen what he needed to see.`, flag: "priority_answered" },
          { text: `Ask him the same two questions about his own experience as a husband and father`, consequence: `He is very still. Then he speaks for twenty minutes. Diana translates continuously. At the end: 'No man has ever asked me that.' He calls his wife over.`, flag: "father_asked" },
        ],
      },
      {
        title: `The Grandmother's Word`,
        setup: `The grandmother asks to speak with you alone. Diana is not permitted in the room. A cousin translates. The grandmother says: 'My granddaughter has had men come before. They did not stay. Tell me why you will stay.'`,
        choices: [
          { text: `Tell her the truth: you came here because you made a decision, and decisions like this one are not made to be unmade`, consequence: `She is quiet. Then she says something to the cousin. He translates: 'She says she has never heard a man say exactly that.' She calls Diana in. She says one sentence. Diana cries.`, flag: "grandmother_convinced" },
          { text: `Tell her you cannot promise what the future holds but you can tell her what kind of man you are`, consequence: `She listens. She asks the cousin one clarifying question. She makes a sound that the cousin translates as: 'Acceptable.' It is the grandmother's version of strong approval.`, flag: "grandmother_honest" },
          { text: `Ask her what the men before said when she asked them this question`, consequence: `She tells you. She tells you what they said and what happened. She is telling you what not to say by telling you what they said. You understand this. You answer differently from all of them.`, flag: "grandmother_learned" },
        ],
      },
      {
        title: `The Agreement`,
        setup: `The grandmother's word is the agreement. When she tells the family, the family agrees. Her father shakes your hand. Her mother hugs Diana. The community knows by the next morning.`,
        choices: [
          { text: `SUCCESS: Diana — Santo Domingo, Dominican Republic.`, consequence: `SUCCESS: The grandmother's room was the real family meeting. Everything before it was preparation. Latin America arc — complete.`, flag: "success" },
          { text: `SUCCESS: The community knew before the paperwork began.`, consequence: `SUCCESS: You arrived and let yourself be seen. This is the Latin America arc's central requirement. Arc complete.`, flag: "success" },
          { text: `SUCCESS: Arc complete.`, consequence: `SUCCESS: Diana — complete.`, flag: "success" },
        ],
      },
      {
        title: `Arrival`,
        setup: `She arrives. Her grandmother sent a recording — ten minutes of the grandmother speaking in Spanish. Diana translates it for you over several evenings. It is the grandmother's history. She sent it so you would know where Diana came from.`,
        choices: [
          { text: `SUCCESS: You received a family's history as a wedding gift.`, consequence: `SUCCESS: Honor it. Latin America arc — complete.`, flag: "success" },
          { text: `SUCCESS: Arc complete.`, consequence: `SUCCESS: Dominican Republic — complete.`, flag: "success" },
          { text: `SUCCESS: Diana — complete.`, consequence: `SUCCESS: The grandmother's word made it real.`, flag: "success" },
        ],
      }
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
    ,
      {
        title: `Lima and the Distance`,
        setup: `Elena from Lima. She is 30. She has been engaged before — it did not result in marriage. She is direct about this in her second message. She says: 'I do not have time for things that do not go somewhere. I am telling you this now so we do not waste each other's time.'`,
        choices: [
          { text: `Appreciate the directness and match it`, consequence: `She receives the matched directness well. The first month of correspondence covers more real ground than most arcs cover in three months.`, flag: "direct_match" },
          { text: `Ask about the previous engagement before anything else`, consequence: `She tells you. What ended it, what she learned, what she is specifically looking for differently. This is the most useful information you could have received.`, flag: "previous_asked" },
          { text: `Tell her you appreciate the approach and want to know what 'somewhere' looks like to her`, consequence: `She describes it specifically. A timeline. A plan. A man who can be held to what he says. You take notes.`, flag: "destination_described" },
        ],
      },
      {
        title: `The Previous Engagement Shadow`,
        setup: `Six weeks in. She mentions the previous engagement again — not as a wound but as a reference point. 'He was serious in person and absent in practice.' She is watching whether you are the same.`,
        choices: [
          { text: `Ask her what 'serious in person and absent in practice' looked like specifically`, consequence: `She tells you. The list is precise and instructive. You make commitments in this conversation that are specific and small and that you honor immediately.`, flag: "specific_commitments" },
          { text: `Tell her you understand the concern and ask how you can demonstrate the difference`, consequence: `She gives you three small tests over the next month. You pass all three without knowing they were tests. She tells you afterward.`, flag: "tests_passed" },
          { text: `Acknowledge the concern and let your consistency over time be the answer`, consequence: `She respects this. Over three months the consistency builds the case better than any promise could.`, flag: "consistent" },
        ],
      },
      {
        title: `Her Father's Skepticism`,
        setup: `Her father is aware of the previous engagement. He is warm to Elena but skeptical of anyone new. She tells you: 'He is not against you specifically. He is against being wrong again.' When she arranges the video call with him, she warns you.`,
        choices: [
          { text: `Approach the call with the same directness Elena has shown you`, consequence: `He responds to directness. He has been receiving performances. He asked Elena that night: 'He speaks like he is telling me something, not selling me something.' This is the distinction he has been looking for.`, flag: "direct_with_father" },
          { text: `Address the previous engagement directly with him — acknowledge it before he does`, consequence: `He is surprised. He had prepared to bring it up himself. You brought it first. He says: 'You knew this was in the room.' You tell him yes. He respects the acknowledgment.`, flag: "engagement_acknowledged" },
          { text: `Ask him what would make him confident this time`, consequence: `He thinks. Then he answers specifically. The specificity is what you needed. Everything you do after this call is calibrated to what he named.`, flag: "father_asked" },
        ],
      },
      {
        title: `Lima`,
        setup: `You arrive in Lima. Elena meets you herself at the airport — not a family member, her. This is the first time in any arc that the woman herself came first. She explains: 'I wanted to see you before anyone else did. I needed to know if you were real before I brought you to my family.'`,
        choices: [
          { text: `Tell her you understand — and let her assessment happen`, consequence: `She studies you for twenty minutes over coffee near the airport. Then: 'You are real.' She calls her mother. The family meeting is confirmed for tomorrow.`, flag: "real_confirmed" },
          { text: `Ask her what real looks like to her`, consequence: `She says: 'The same person in the airport as in the messages.' You ask her what she sees. She tells you. You have passed before the family meeting has begun.`, flag: "real_asked" },
          { text: `Tell her you appreciate being given this moment with her before the family`, consequence: `She nods. 'I needed it. My family will like who they see. I needed to see who you are when no one is watching.' The observation happens over coffee. You are the same.`, flag: "private_moment" },
        ],
      },
      {
        title: `Her Mother`,
        setup: `Her mother is the key. Elena is her only daughter. Her mother is warm and precise and says things that sound gentle and contain specific assessment. She tells you over lunch: 'Elena has always made good choices. She made one that was almost the right choice. I believe she is trying again.'`,
        choices: [
          { text: `Tell her you understand what 'trying again' costs Elena and what it costs her as a mother`, consequence: `She is very quiet. Then she takes your hand briefly. She says something to Elena. Elena translates: 'She says you see both of us.' This is what the mother has been waiting for.`, flag: "mother_seen" },
          { text: `Tell her you intend to be the answer to the trying again, not another question`, consequence: `She studies this. She asks Elena something in Spanish. Elena nods. The mother smiles. Something has been decided.`, flag: "mother_answer" },
          { text: `Ask her what she needs to see to believe in this`, consequence: `She thinks for a long time. Then she names one thing. It is specific. You arrange it before you leave Lima.`, flag: "mother_condition" },
        ],
      },
      {
        title: `The Father's Test`,
        setup: `Her father meets you on the second day. He is quieter than her mother. He takes you to his workshop — he makes furniture. He shows you something he is making. He works while he talks. He asks you questions without looking at you.`,
        choices: [
          { text: `Watch him work and answer his questions without trying to control the conversation`, consequence: `He continues working while you talk. At the end he shows you the piece he is making. He says: 'It is for Elena. For when she has her own home.' He is already making her a future.`, flag: "workshop_patience" },
          { text: `Ask him about the piece he is making`, consequence: `He tells you about it. He tells you more than he planned to. By the end of the workshop visit he has told you about Elena's childhood, her previous engagement, what he saw in the previous man that he did not say until it was too late.`, flag: "piece_asked" },
          { text: `Offer to help in the workshop — whatever he needs`, consequence: `He hands you something to hold. Then something to sand. The conversation happens over work. This is how he trusts.`, flag: "workshop_help" },
        ],
      },
      {
        title: `The Agreement`,
        setup: `Her parents call a family dinner on your last evening. Her father speaks first. Her mother speaks second. Elena translates. The agreement is given without conditions. Her father adds one sentence at the end: 'Do not make me regret this.'`,
        choices: [
          { text: `Tell him you understand the weight of what he has said and you accept it`, consequence: `He nods. Her mother serves dessert. The rest of the evening is a celebration.`, flag: "weight_accepted" },
          { text: `Tell him you will earn his trust through what you do, not what you say tonight`, consequence: `He looks at you a long moment. Then: 'Good. Because what you say tonight I have heard before.' He pours you a drink.`, flag: "trust_through_action" },
          { text: `Ask him what would make him regret it — not to promise to avoid it, but to understand it`, consequence: `He is very still. Then he answers. Elena translates carefully. What he says is the most important thing she has heard her father say about what he needs from a man who loves her.`, flag: "regret_asked" },
        ],
      },
      {
        title: `Arrival`,
        setup: `She arrives in the winter. Her father called you the week before. He was building something while he called. You could hear it. He said three things: take care of her, bring her home when she needs to be there, and call him when anything is difficult — not just when things are good.`,
        choices: [
          { text: `SUCCESS: Elena — Lima, Peru.`, consequence: `SUCCESS: The workshop, the mother's hand, the father's warning, the previous engagement that made everything more honest — all of it was the path. Latin America arc — complete.`, flag: "success" },
          { text: `SUCCESS: Her father is still making the furniture.`, consequence: `SUCCESS: He will bring it when he visits. Arc complete.`, flag: "success" },
          { text: `SUCCESS: Arc complete.`, consequence: `SUCCESS: Elena — Lima, Peru. Complete.`, flag: "success" },
        ],
      }
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
    ,
      {
        title: `Her Silence`,
        setup: `Fatima goes quiet for eleven days. No explanation. No warning. On day twelve she writes as though nothing happened. You decide how to respond.`,
        choices: [
          { text: `Acknowledge the gap directly — 'I noticed you were away'`, consequence: `She explains. A family obligation in another city, no phone access, her father's insistence on a full departure from correspondence during a family period. The explanation holds.`, flag: "gap_acknowledged" },
          { text: `Respond as though nothing happened — match her energy`, consequence: `She continues. But the test passed unexamined. She is watching whether you will require accountability or accept silence without question. You accepted.`, flag: "silence_accepted" },
          { text: `Tell her the silence was noticed and ask if everything is alright`, consequence: `She appreciates the framing. Not accusation, not indifference — genuine concern. She tells you more about the family period than she originally intended.`, flag: "concerned" },
        ],
      },
      {
        title: `Her Sister's Opinion`,
        setup: `Fatima mentions her younger sister has been reading your messages. She says this naturally. 'She is my closest advisor.' The sister has questions for you. This is not a request — it is a statement of how things work.`,
        choices: [
          { text: `Welcome it — tell Fatima you are happy to answer her sister's questions`, consequence: `The sister writes. Her questions are sharper than Fatima's. She is protecting her sister with precision. You answer each one honestly. Fatima writes the next day: 'She likes you. That is unusual.'`, flag: "sister_welcomed" },
          { text: `Express mild surprise — you did not expect a third party`, consequence: `Fatima explains: in her family, her sister has always been her first counsel. This is not negotiable. Your mild surprise is noted and filed.`, flag: "surprised" },
          { text: `Ask to speak with the sister directly rather than through Fatima`, consequence: `Fatima pauses. Then: 'Yes. That is the correct way to do this.' The sister writes you directly the next day. The directness impresses her.`, flag: "direct_with_sister" },
        ],
      },
      {
        title: `The Cultural Test`,
        setup: `You are planning the visit. Fatima tells you that in Meknes, in her family, a man visiting a woman he is considering for marriage stays with a male host — not a hotel. She has a cousin who is prepared to host you. This is not optional.`,
        choices: [
          { text: `Accept without hesitation`, consequence: `The cousin calls. He is warm, frank, and evaluating you on behalf of the family. Your three days with him teach you more about Fatima than three months of messages did.`, flag: "host_accepted" },
          { text: `Ask if a hotel is possible — you value your independence during the visit`, consequence: `She explains again. The hotel option signals to the family that you are not committed to the tradition. You can stay at a hotel but the family will interpret it. She is giving you the information — what you do with it is your decision.`, flag: "hotel_requested" },
          { text: `Ask what is expected of you as a guest in the cousin's home`, consequence: `She walks you through it. You take notes. She is impressed that you asked. 'Most men either accept without understanding or refuse without asking. You did neither.'`, flag: "protocol_asked" },
        ],
      },
      {
        title: `The Arrival`,
        setup: `You arrive in Meknes. The cousin meets you. The medina is older and quieter than Casablanca. The family meeting is two days away. The cousin takes you to the family home first, without warning, to introduce you to his parents.`,
        choices: [
          { text: `Receive the unannounced introduction with warmth and dignity`, consequence: `His parents are watching you absorb the surprise. You absorb it well. His mother offers you mint tea before you are sitting. This is a good sign.`, flag: "surprise_absorbed" },
          { text: `Note privately that this was unannounced but say nothing — observe everything`, consequence: `You store what you see. The home. The photographs on the walls. The way the cousin's father addresses his wife. This is the family Fatima grew up surrounded by.`, flag: "observer" },
          { text: `Ask the cousin to let Fatima know you have arrived safely`, consequence: `He has already texted her. She responds in two minutes. Her message to you arrives twenty minutes later: 'My uncle said you were good with the surprise.' The cousin's parents are the uncle and aunt.`, flag: "family_connected" },
        ],
      },
      {
        title: `Meeting Fatima's Father`,
        setup: `The formal meeting. Her father is a retired schoolteacher. He asks you to sit with him alone for thirty minutes before the family joins. He asks three questions and then listens to everything that comes after your answers for the next twenty-eight minutes.`,
        choices: [
          { text: `Answer his three questions fully and let the silence after each one sit`, consequence: `He nods at the end of the third answer. He calls his wife in. He speaks to her briefly in Darija. She smiles. The family dinner is announced.`, flag: "father_satisfied" },
          { text: `After his questions, ask him one question of your own`, consequence: `He is surprised. He thinks for a moment. Then answers at length. Then: 'You are the first man who has asked me something.' He calls his wife in immediately.`, flag: "father_questioned" },
          { text: `Listen more than you speak throughout`, consequence: `He notes the restraint. At the end: 'My daughter told me you listen. I wanted to see it.' He has received what he came to see.`, flag: "listener" },
        ],
      },
      {
        title: `The Imam`,
        setup: `Fatima's father wants an imam from the local mosque to be present at the next meeting. Not to perform a ceremony — to provide a witness and a perspective. This is the family's tradition. The imam will ask you about your faith practice specifically.`,
        choices: [
          { text: `Welcome the imam's presence — this is their tradition and you respect it`, consequence: `The imam is direct and learned. He asks about your prayer practice, your understanding of the nikah contract, and your position on a wife's right to education and work. You answer honestly. He nods at each answer.`, flag: "imam_welcomed" },
          { text: `Ask what the imam's role will be exactly`, consequence: `Her father explains. The imam witnesses and offers counsel. He does not have veto power but his assessment carries weight. You prepare accordingly.`, flag: "imam_role_understood" },
          { text: `Express that you would like to have your own Islamic community represented as well`, consequence: `Her father considers this. He agrees. The next meeting includes both perspectives. This is seen as a sign of seriousness rather than resistance.`, flag: "own_community_requested" },
        ],
      },
      {
        title: `The Nikah Discussion`,
        setup: `The families are aligned. The mahr has been agreed upon. The nikah date is being discussed. Her father proposes a date three months away. He wants the process done in Meknes, in the mosque, with both families present.`,
        choices: [
          { text: `Agree to the date and the location`, consequence: `Planning begins. Her mother sends you a list of what you will need to prepare. The list is detailed and warm.`, flag: "nikah_agreed" },
          { text: `Ask about the civil registration requirement and how it connects to the religious ceremony`, consequence: `Her father explains the Moroccan civil process. You understand that both are required. He has a lawyer who handles this regularly. The question impressed him.`, flag: "civil_asked" },
          { text: `Ask when you should begin the K-1 visa filing`, consequence: `Her father has already consulted with someone about this. He has the information ready. He was waiting to see if you would ask the right question at the right moment.`, flag: "visa_asked" },
        ],
      },
      {
        title: `The Nikah`,
        setup: `You return to Meknes. Both families are present. The nikah is performed in the mosque. The mahr is publicly acknowledged. Fatima is in another room with the women. The imam asks you a question in Arabic. You have prepared for this.`,
        choices: [
          { text: `Answer in Arabic — imperfectly but genuinely`, consequence: `The room responds. Her father translates for the family members who did not hear the preparation that went into this moment. The imam places his hand briefly on your shoulder.`, flag: "arabic_answered" },
          { text: `Answer in English and let the imam translate`, consequence: `This is acceptable. The imam translates carefully. The family receives your words. Fatima hears them from the next room through her sister.`, flag: "english_answered" },
          { text: `Answer and then address her father directly in French`, consequence: `Her father's expression shifts. He had not expected French. He responds in French. Something passes between you that the rest of the room does not fully see.`, flag: "french_moment" },
        ],
      },
      {
        title: `The Outcome`,
        setup: `Nine months later. The K-1 is approved. She lands on a Tuesday. Her father texted you the night before: three words in Arabic. You know what they mean.`,
        choices: [
          { text: `SUCCESS: Fatima — Meknes, Morocco.`, consequence: `SUCCESS: The patience, the protocol, the imam, the cousin, the sister, the father's thirty-minute test — all of it built something real. The certificate of commission is earned.`, flag: "success" },
          { text: `SUCCESS: Every scene in this arc required something of you.`, consequence: `SUCCESS: You gave it. North Africa arc — complete.`, flag: "success" },
          { text: `SUCCESS: The work begins here.`, consequence: `SUCCESS: Everything before today was preparation. Everything from today is practice.`, flag: "success" },
        ],
      }
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
    ,
      {
        title: `The Marabout's Community`,
        setup: `Fatou from Dakar, Senegal. Her family is Tijaniyya — a Sufi order with significant presence in Senegal. Her father is a disciple of the local marabout. She tells you early: 'My father will need to consult with the marabout before any decision is made about marriage. This is not negotiable.'`,
        choices: [
          { text: `Tell her you respect the tradition and want to understand it`, consequence: `She begins teaching you about the Tijaniyya. The teaching deepens the correspondence. She is more open about her family and her spiritual life than any subject has opened her before.`, flag: "tradition_respected" },
          { text: `Ask her what role the marabout plays specifically`, consequence: `She explains. The marabout is a spiritual guide whose counsel is taken seriously in all family matters including marriage. His assessment of you will carry significant weight.`, flag: "marabout_understood" },
          { text: `Ask if there is any way to communicate with the marabout's community directly`, consequence: `She is surprised. She asks her father. Her father is more interested in you than he was before. A man who asks about the marabout rather than around him has understood something.`, flag: "marabout_direct" },
        ],
      },
      {
        title: `The Bride Price`,
        setup: `Three months in. Fatou's uncle — designated as the family's formal representative — contacts you. He explains the tradition of the bride price in the family's Wolof culture. He names specific items and their meaning. He does not name a monetary figure yet.`,
        choices: [
          { text: `Ask what each item represents before asking about the monetary equivalent`, consequence: `The uncle is pleased. He has had to explain this to men before and watched them skip to the number. You went to the meaning first. He explains at length.`, flag: "meaning_first" },
          { text: `Tell him you want to honor the tradition correctly — ask what you need to know`, consequence: `He teaches you. The list includes fabrics, kola nuts, and a formal gathering of witnesses. The monetary discussion comes after the ceremonial requirements are understood.`, flag: "tradition_first" },
          { text: `Ask for the full list of what is expected`, consequence: `He provides it with explanations. You receive it all at once. The total is more than you expected. You respond with respectful engagement rather than hesitation.`, flag: "full_list" },
        ],
      },
      {
        title: `Dakar`,
        setup: `You arrive in Dakar. The city is more than you expected — more complex, more alive, more rooted. Her family lives in a neighborhood where everyone knows everyone. You are being watched from the moment you leave the taxi.`,
        choices: [
          { text: `Walk through the neighborhood with awareness and dignity — greet people you make eye contact with`, consequence: `The neighborhood receives this. By the time you reach her family's compound the word has already traveled: 'He greets people.' This is the first test and you passed it on the street.`, flag: "neighborhood_greeted" },
          { text: `Follow her uncle's lead exactly — he has come to meet you`, consequence: `Her uncle takes you through the neighborhood deliberately. He is introducing you as much as guiding you. The route is not the fastest way to the compound.`, flag: "uncle_led" },
          { text: `Ask the uncle about the neighborhood as you walk — its history, its community`, consequence: `He talks for twenty minutes. The neighborhood reveals itself through his telling. You arrive at the compound knowing more than you would have known in a month of observation.`, flag: "neighborhood_asked" },
        ],
      },
      {
        title: `The Compound`,
        setup: `The family compound is full. Extended family, community members, women preparing food. The men gather in a specific part of the compound. You are placed with the men. Her father is there. The marabout's representative — a younger disciple — is also there.`,
        choices: [
          { text: `Sit quietly and receive the gathering — you are the guest in this context`, consequence: `The men talk around you and to you in turns. The disciple watches your comfort with silence. Comfort with silence in this context is a mark of depth.`, flag: "silence_received" },
          { text: `Greet each man individually as your presence is acknowledged`, consequence: `The formality of individual greeting is noted. Her father watches who you greet in which order. The order matters.`, flag: "greetings_ordered" },
          { text: `Ask the disciple about the marabout's community when the opportunity arises`, consequence: `The disciple is pleased to be asked. He speaks at length. Her father listens to you listening. The quality of your listening is being assessed.`, flag: "disciple_asked" },
        ],
      },
      {
        title: `The Marabout's Assessment`,
        setup: `The disciple reports back to the marabout. Three days into your visit, the marabout sends word through the disciple: he will meet you. This is not standard. Fatou tells you: 'He does not meet everyone. He met you because of something my father told him about you.'`,
        choices: [
          { text: `Ask Fatou what her father said`, consequence: `She does not know exactly. She knows it was about how you sat with the men in the compound. 'He said you were comfortable with not performing.' This is what the marabout wanted to see himself.`, flag: "father_word" },
          { text: `Go to the meeting without preparation — you cannot prepare for a spiritual elder`, consequence: `The marabout is old and precise. He asks you one question. You answer it honestly. He is quiet. Then he says something to the disciple. The disciple translates: 'He says you told the truth without decoration.' He rises. The meeting is over. This was a passing grade.`, flag: "undecorated_truth" },
          { text: `Ask the disciple how to show respect when you enter`, consequence: `He teaches you. The greeting, the posture, the pace of the conversation. You arrive prepared to receive, not to impress. The marabout notices the difference.`, flag: "marabout_prepared" },
        ],
      },
      {
        title: `The Bride Price Ceremony`,
        setup: `The formal bride price ceremony. The items have been prepared according to tradition. The men are gathered again. Her father receives the bride price publicly. He names each item and its meaning. The community witnesses the exchange.`,
        choices: [
          { text: `Participate in the ceremony with full presence and dignity`, consequence: `The community receives this. A man who participates in the tradition fully has committed to something beyond the individual relationship. The community understands this.`, flag: "ceremony_full" },
          { text: `Follow the uncle's cues exactly — he is guiding you through the sequence`, consequence: `He guides well. You follow precisely. Her father watches the following — not the items. A man who can follow with dignity is a man who can be trusted.`, flag: "uncle_followed" },
          { text: `After the ceremony, say something brief to the gathered community`, consequence: `No one expected this. The uncle translates. You say: you have come from far away to do things the right way because the right way is the only way that honors what you are receiving. The marabout's disciple nods.`, flag: "community_addressed" },
        ],
      },
      {
        title: `Agreement and Process`,
        setup: `The agreement is made. The marabout's approval has been given through the disciple. Her father formally agrees. The community is witness. The K-1 process begins.`,
        choices: [
          { text: `SUCCESS: Fatou — Dakar, Senegal.`, consequence: `SUCCESS: The marabout's meeting, the compound, the neighborhood, the bride price ceremony — all of it was the path. Sub-Saharan Africa arc — complete.`, flag: "success" },
          { text: `SUCCESS: You did things the right way.`, consequence: `SUCCESS: The community witnessed it. That matters in a culture where community is the primary unit of reality.`, flag: "success" },
          { text: `SUCCESS: Arc complete.`, consequence: `SUCCESS: Fatou — Dakar, Senegal. Complete.`, flag: "success" },
        ],
      },
      {
        title: `Arrival`,
        setup: `She arrives. The marabout's disciple sent a message with her — a small folded paper with Arabic writing. She tells you it is a du'a — a blessing. She says the marabout rarely sends these.`,
        choices: [
          { text: `SUCCESS: The marabout sent a blessing to your home.`, consequence: `SUCCESS: Honor what arrived. Sub-Saharan Africa arc — complete.`, flag: "success" },
          { text: `SUCCESS: Arc complete.`, consequence: `SUCCESS: Senegal — complete.`, flag: "success" },
          { text: `SUCCESS: Fatou — complete.`, consequence: `SUCCESS: Everything you learned here applies throughout the Sub-Saharan Africa arc.`, flag: "success" },
        ],
      }
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
    ,
      {
        title: `Lebanon Is Different`,
        setup: `Hessa is Beirut. Beirut is not Jordan. She is more direct than Sara, more cosmopolitan, more willing to express her own opinion. She disagrees with something you say in your fourth message and tells you so clearly. This is new.`,
        choices: [
          { text: `Engage the disagreement — you appreciate the directness`, consequence: `The conversation becomes real faster than any other arc. She says: 'Most men are uncomfortable when I disagree. You are not.' The foundation deepens.`, flag: "disagreement_engaged" },
          { text: `Receive the disagreement gracefully without yielding your position`, consequence: `She notes both things — that you heard her and that you held your ground. 'You are not trying to win. You are trying to understand.' This is correct.`, flag: "ground_held" },
          { text: `Soften your position to avoid conflict`, consequence: `She notices. 'You changed your answer. Why?' She has put her finger on exactly what happened. This will come up again.`, flag: "position_softened" },
        ],
      },
      {
        title: `Her Family Context`,
        setup: `Hessa tells you about her family. Maronite Christian. Her father was in the Lebanese army. Her two brothers are engineers. The family survived the 2006 war and the 2020 port explosion. She says: 'We have lost a lot. We do not give easily and we do not give without knowing.'`,
        choices: [
          { text: `Acknowledge the weight of what her family has survived before asking anything about yourself`, consequence: `She is quiet a moment. Then: 'You did not rush past it.' The other men she has spoken with have acknowledged the trauma briefly and moved on. You did not move on.`, flag: "weight_acknowledged" },
          { text: `Ask her how the explosions affected her family specifically`, consequence: `She tells you. For the first time she tells someone outside her family what those days were. At the end: 'I do not know why I told you that.' You do not explain why. You simply receive it.`, flag: "depth_received" },
          { text: `Share something of your own that required survival`, consequence: `She listens. Then: 'You understand what it costs.' The conversation enters a register that most platform correspondence never reaches.`, flag: "own_survival_shared" },
        ],
      },
      {
        title: `The Cultural Mismatch`,
        setup: `Eight weeks in. You have said something — not malicious, not ignorant, but revealing. She asks about your views on a wife working after marriage. You answer from your own framework without first understanding what her framework requires. Her response is measured but something has shifted.`,
        choices: [
          { text: `Ask her what you said that landed wrong`, consequence: `She explains. Your framework assumed a model of marriage that does not fit her family's structure or her own self-understanding. You receive it and revise your thinking genuinely.`, flag: "misread_corrected" },
          { text: `Explain what you meant — you were not saying what she heard`, consequence: `She hears the clarification. Then: 'I understand what you meant. I want you to also understand what I heard.' Both things are true. The conversation requires both.`, flag: "clarified" },
          { text: `Hold your position — you have a right to your view on this`, consequence: `She does not argue. She simply says: 'Then we should understand this clearly.' She is not angry. She is accurate. This is a real incompatibility if neither of you moves.`, flag: "position_held" },
        ],
      },
      {
        title: `Her Father's Political Question`,
        setup: `Her father writes to you directly after the third month. One paragraph. He asks about your position on the situation in Lebanon and on the role of outside powers in Lebanese affairs. He is not asking for a political science essay. He is asking: are you paying attention?`,
        choices: [
          { text: `Answer with knowledge and genuine engagement`, consequence: `He writes back the next week. The response is warm and surprised. He had asked this question of other men. This is the first substantive answer he has received.`, flag: "political_engaged" },
          { text: `Answer carefully without taking a position`, consequence: `He reads the carefulness. His response is brief and polite. He noted the avoidance. He does not raise the subject again but the door he opened is now slightly less open.`, flag: "political_avoided" },
          { text: `Ask her to help you understand the question more deeply before answering`, consequence: `She teaches you. Your answer is informed by her context. Her father reads it and asks Hessa: 'Did he write this himself?' She says yes. He asks her one more question and then calls you.`, flag: "informed_by_hessa" },
        ],
      },
      {
        title: `Beirut`,
        setup: `You arrive in Beirut. The city is complicated and beautiful and wounded and alive simultaneously. Her brother meets you. He is an engineer and he speaks to you like an engineer — precise, evaluative, not unkind. He takes you to see something of the city before the family meeting.`,
        choices: [
          { text: `Let him show you the city without agenda — absorb what he chooses to show you`, consequence: `He shows you the port area. He is quiet there. You are quiet with him. He says: 'Most people look away. You looked at it.' This is not about sightseeing.`, flag: "city_witnessed" },
          { text: `Ask him what he wants you to understand about Lebanon before you meet his family`, consequence: `He thinks. Then he talks for twenty minutes. The family meeting will be easier because of those twenty minutes.`, flag: "brother_asked" },
          { text: `Talk about yourself — your background, your intentions, why you came`, consequence: `He listens carefully. He asks one clarifying question. At the end: 'My sister said you listen. I wanted to see if you also speak clearly.' You have done both.`, flag: "spoke_clearly" },
        ],
      },
      {
        title: `The Father`,
        setup: `Her father is a man who has seen a great deal. He is not warm in the way Moroccan fathers are warm or formal in the way Jordanian fathers are formal. He is direct. He asks you one question at the beginning: 'Why Lebanon?'`,
        choices: [
          { text: `Answer honestly: because Hessa is in Lebanon — and what you know about Lebanon now that you did not know before`, consequence: `He listens to all of it. The honest answer about Hessa. The earned answer about Lebanon. He calls his wife in before you have finished. She sits and also listens.`, flag: "father_honest" },
          { text: `Answer with what you know about Lebanon's culture and history`, consequence: `He is pleased you know. He is more pleased when you say you came here to learn what you could not know from the outside. He calls his wife after twenty minutes.`, flag: "father_cultural" },
          { text: `Ask him what the question is really asking`, consequence: `He pauses. Then: 'It is asking whether you chose Lebanon or whether you happened to find a Lebanese woman and called it a choice.' You understand the difference. Your answer reflects this.`, flag: "father_meta" },
        ],
      },
      {
        title: `The Agreement`,
        setup: `The family has gathered. The father has spoken to the brothers. The mother has made her assessment. Hessa has been clear about what she needs. The agreement is conditional on one thing: her father wants a formal meeting between the two families before any legal process begins.`,
        choices: [
          { text: `Agree and begin planning the family meeting`, consequence: `He is pleased the agreement was immediate. 'No negotiation on this point.' You were not going to negotiate. The planning begins.`, flag: "agreement_immediate" },
          { text: `Ask what the family meeting would involve logistically`, consequence: `He explains. It is a video meeting first, then an in-person meeting if things go well. The structure is clear and reasonable. You agree.`, flag: "logistics_asked" },
          { text: `Offer to bring your family to Beirut`, consequence: `He is surprised. He discusses it with his wife. The offer changes the weight of the conversation. He accepts. This is the highest possible response you could have given.`, flag: "family_offered" },
        ],
      },
      {
        title: `The Outcome`,
        setup: `The families met. The process began. Eleven months later Hessa lands. Her father called you the morning she left. He spoke in Arabic. She had taught you the words he would use. You understood most of them.`,
        choices: [
          { text: `SUCCESS: Hessa — Beirut, Lebanon.`, consequence: `SUCCESS: Lebanon required political awareness, cultural precision, and the willingness to witness rather than look away. You did all three. Middle East arc — complete.`, flag: "success" },
          { text: `SUCCESS: The family survived a great deal. Now they have trusted you.`, consequence: `SUCCESS: Honor that trust in everything that follows.`, flag: "success" },
          { text: `SUCCESS: Arc complete.`, consequence: `SUCCESS: Hessa — Beirut, Lebanon. Complete.`, flag: "success" },
        ],
      }
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
    ,
      {
        title: `The Catholic Framework`,
        setup: `Jasmine from Cebu. Deeply Catholic. She attends mass daily. Her family is embedded in the parish. When she asks about your faith, she is not asking academically.`,
        choices: [
          { text: `Be honest about your faith and your genuine respect for hers`, consequence: `She receives the honesty. She asks one clarifying question. Then: 'I can work with honesty. I cannot work with performance.'`, flag: "honest_faith" },
          { text: `Emphasize the areas of overlap between your faith and Catholicism`, consequence: `She notes the effort. She also notes that you have not told her anything she could not have predicted. She asks a deeper question.`, flag: "overlap_emphasized" },
          { text: `Ask her what faith means to her practically — how it shapes her daily life`, consequence: `She talks for twenty minutes. This is the most personal conversation of the first two months. She says: 'No one has ever asked that.'`, flag: "faith_asked" },
        ],
      },
      {
        title: `The Remittance Question`,
        setup: `Ten weeks in. She mentions her parents' house needs a new roof. She is not asking you — she mentions it as part of describing her week. But you understand what this means culturally. In many Filipino families, a man who is serious contributes.`,
        choices: [
          { text: `Do nothing — it is too early and you have not met her family yet`, consequence: `The roof gets fixed by her brother. The subject closes. You have held the line correctly.`, flag: "no_action" },
          { text: `Ask her directly about the family's financial situation and expectations`, consequence: `She is surprised but not offended. She explains what is normal and what is not. The conversation produces clarity that most men in this arc never get.`, flag: "direct_financial" },
          { text: `Offer to help with the roof`, consequence: `She declines. Then: 'You offered. That matters.' She does not ask again. The offer registered without becoming a transaction.`, flag: "offer_declined" },
        ],
      },
      {
        title: `Her Mother`,
        setup: `The mother is the center of this family. More than the father, who is quiet and deferential. The mother calls Jasmine every day. She calls during your video calls sometimes. Jasmine picks up. Always. She puts you on hold. She never explains who she is talking to. She does not need to.`,
        choices: [
          { text: `Receive this as normal and observe`, consequence: `You watch how Jasmine is with her mother. You learn more about who Jasmine is in those interruptions than in the planned conversations.`, flag: "observe_relationship" },
          { text: `Ask to say hello to her mother one day during an interruption`, consequence: `Jasmine pauses. Then puts her mother on. Her mother speaks. Jasmine translates. The mother's first question is about your mother. She wants to know about your mother.`, flag: "met_mother" },
          { text: `Gently ask Jasmine if there is a time of day that is protected for your calls`, consequence: `She laughs. She admits her mother calls at specific times intentionally. 'She is testing whether you can handle the interruption.' You both agree on a time window.`, flag: "time_protected" },
        ],
      },
      {
        title: `Cebu`,
        setup: `You arrive in Cebu. The island is warm and coastal and the city is busy. Jasmine's family is in a neighborhood outside the main city. Her father meets you. He is quiet. He shows you the house. He shows you specifically the roof — now repaired. He does not explain why he is showing you.`,
        choices: [
          { text: `Comment on the house genuinely — it is well kept and clearly loved`, consequence: `He nods. He has been waiting to see if you see the house or just the destination. You saw the house.`, flag: "house_seen" },
          { text: `Ask him about the neighborhood, how long the family has lived here`, consequence: `He talks. Slowly. The family has been here three generations. His father built part of the original structure. The house is the family in physical form.`, flag: "history_asked" },
          { text: `Thank him for the welcome and wait for him to lead`, consequence: `He leads. He takes you inside. Her mother is already in the kitchen. The father's job was to show you the outside. The mother's job is the inside.`, flag: "father_led" },
        ],
      },
      {
        title: `The Parish Priest`,
        setup: `Jasmine's family has arranged for a meeting with their parish priest before any formal agreement is made. This is how it is done in this family. The priest will speak with you privately for forty-five minutes.`,
        choices: [
          { text: `Welcome the meeting — approach it as a conversation, not an examination`, consequence: `The priest is warm and intelligent. He asks about your faith journey specifically. He asks what you understand marriage to require of a man. He asks if you have read anything about marriage from a spiritual perspective. You have.`, flag: "priest_welcomed" },
          { text: `Ask Jasmine what the priest needs to hear`, consequence: `She tells you what she knows. She also tells you: 'Do not try to give him what he needs. He will know.' You understand.`, flag: "priest_prepared" },
          { text: `Approach it as a formality that must be completed`, consequence: `The priest is perceptive. He closes the formal examination early and asks you one off-script question: 'Do you believe this meeting matters?' Your answer reveals everything about your approach.`, flag: "priest_off_script" },
        ],
      },
      {
        title: `The Family Decision`,
        setup: `The mother calls a family meeting after the priest visit. She has spoken with the priest. She has spoken with her husband. She speaks for fifteen minutes. Jasmine translates in pieces. The mother's decision: she approves, with one non-negotiable condition.`,
        choices: [
          { text: `Ask what the condition is directly`, consequence: `The condition: Jasmine comes home once a year, minimum. And her mother will visit once in the first two years. You agree to both immediately.`, flag: "condition_accepted" },
          { text: `Tell the mother you were expecting a condition and that you respect her right to set one`, consequence: `She stops. She looks at Jasmine. She says something. Jasmine translates: 'She says you think like a parent.' She agrees before you formally agree.`, flag: "condition_anticipated" },
          { text: `Ask Jasmine privately if she agrees with the condition before you accept it`, consequence: `Jasmine says yes — she already knew the condition before it was stated. She helped shape it. You accept on behalf of both of you.`, flag: "condition_joint" },
        ],
      },
      {
        title: `The Fiesta`,
        setup: `The family holds a small celebration in the neighborhood. Extended family, neighbors, the parish community. You are being introduced not just to the family but to the community that makes the family real. You are asked to speak at some point.`,
        choices: [
          { text: `Speak simply and sincerely — tell them what brought you here and what you found`, consequence: `The room is warm. Jasmine's mother wipes her eyes at one point. Her father, who has said almost nothing to you all week, finds you afterward and shakes your hand with both hands.`, flag: "speech_sincere" },
          { text: `Speak briefly — express gratitude and let the moment belong to the family`, consequence: `The brevity is respected. You have not made the celebration about yourself. Several people approach you afterward. They remember you because you were brief.`, flag: "speech_brief" },
          { text: `Say something directly to her mother in the speech`, consequence: `Her mother was not expecting to be addressed directly. She responds in Cebuano. Someone translates: she is blessing the union.`, flag: "mother_addressed" },
        ],
      },
      {
        title: `The Process`,
        setup: `The K-1 filing begins. The priest writes a letter of support. Her mother calls you monthly. Her father sends you a photo of the house from different angles at different times of year — he is documenting something, though you are not sure what.`,
        choices: [
          { text: `SUCCESS: Jasmine — Cebu, Philippines.`, consequence: `SUCCESS: The mother, the priest, the community, the father's quiet witnessing — all of it was the path. Asia arc — complete.`, flag: "success" },
          { text: `SUCCESS: The father's photographs arrived every month for nine months.`, consequence: `SUCCESS: On the day she landed, the final photograph arrived. It was of the front door. Open.`, flag: "success" },
          { text: `SUCCESS: Arc complete.`, consequence: `SUCCESS: Jasmine — Cebu, Philippines. Complete.`, flag: "success" },
        ],
      },
      {
        title: `Arrival`,
        setup: `She arrives in the fall. Her mother sent a package with her — a rosary, a bottle of hot sauce, a small statue that has been in the family for forty years. A photograph of the family outside the house. The door is open in the photograph.`,
        choices: [
          { text: `SUCCESS: She brought her home with her.`, consequence: `SUCCESS: Honor what arrived with her. The community she came from is part of what you married. Asia arc — complete.`, flag: "success" },
          { text: `SUCCESS: Arc complete.`, consequence: `SUCCESS: Philippines — complete.`, flag: "success" },
          { text: `SUCCESS: Jasmine — complete.`, consequence: `SUCCESS: Everything you learned here applies throughout the Asia arc.`, flag: "success" },
        ],
      }
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
    ,
      {
        title: `The Older Woman`,
        setup: `Maryam is 29. She has been on the platform fourteen months. She has been contacted by many men. She has continued conversations with three. She is not desperate. She is precise. She responds to your first message ten days after you send it with two sentences and a question.`,
        choices: [
          { text: `Answer the question she asked before asking one of your own`, consequence: `She notes the sequence. Most men answer their question and then ask five of their own. You answered hers. She writes back in four days with a longer message.`, flag: "question_first" },
          { text: `Answer her question and ask two thoughtful questions in return`, consequence: `She answers one. The other she holds for later. She is managing the pace of disclosure. This is a woman who knows what she is doing.`, flag: "paced_response" },
          { text: `Answer her question and share something about yourself she did not ask`, consequence: `She receives it without comment. A week later she references it. She had been thinking about it. She does not collect information quickly.`, flag: "voluntary_disclosure" },
        ],
      },
      {
        title: `She Has Been Hurt`,
        setup: `Three months in. She tells you something without intending to — a reference to a previous engagement that ended badly. She catches herself mid-sentence and redirects. But you heard it.`,
        choices: [
          { text: `Do not press it — let her bring it when she is ready`, consequence: `Three weeks later she tells you the full story. The engagement was broken by the man's family, not the man. The wound is about the family, not the person. This distinction matters.`, flag: "patient_disclosure" },
          { text: `Gently acknowledge what you heard: 'You mentioned something earlier — I am not pressing, just want you to know I heard it'`, consequence: `She is quiet two days. Then she tells you. The telling is careful and complete. She has been waiting for a context that felt safe enough.`, flag: "gentle_acknowledgment" },
          { text: `Ask her directly about the previous engagement`, consequence: `She closes. Not permanently — but the directness was too fast for the depth of the subject. She redirects and does not return to it for another month.`, flag: "too_direct" },
        ],
      },
      {
        title: `Her Mother's Role`,
        setup: `Maryam's father passed away four years ago. Her mother is the head of the family. Her brother is the formal authority in family matters but her mother is the real decision. She tells you this clearly: 'My mother's word is final. She does not need permission from anyone.'`,
        choices: [
          { text: `Ask to speak with her mother as soon as Maryam thinks it is appropriate`, consequence: `Maryam is surprised by the directness of the request. Then: 'Most men want to avoid the mother as long as possible.' She arranges a call with her mother the following month.`, flag: "mother_requested" },
          { text: `Ask Maryam to tell you what her mother values most`, consequence: `She tells you three things: patience, steadiness, and a man who does not need to be managed. You file this and let it shape everything that follows.`, flag: "mother_understood" },
          { text: `Ask if her mother has concerns about an American man specifically`, consequence: `Maryam is thoughtful. She says yes — her mother worries about distance, about cultural drift, about her daughter becoming someone she no longer recognizes. These are real concerns that deserve real answers.`, flag: "mother_concerns_known" },
        ],
      },
      {
        title: `The Mother Call`,
        setup: `Video call with her mother. She speaks Arabic and her brother translates. She asks three questions: what does your family look like, what do you believe marriage requires of a husband, and why my daughter specifically and not someone from your own country.`,
        choices: [
          { text: `Answer the third question with the truth — what you saw in Maryam that you have not seen elsewhere`, consequence: `The brother translates. The mother is quiet. She speaks to her son. He translates: 'She wants to know what you saw.' You tell her specifically. She is quiet again. Then she says something. He translates: 'She believes you.'`, flag: "mother_convinced" },
          { text: `Answer all three questions thoroughly and honestly`, consequence: `The call runs forty minutes. The mother asks follow-up questions through her son. At the end she speaks directly to Maryam — not to you. The call ends. Maryam writes you ten minutes later: 'She said you are serious.'`, flag: "mother_thorough" },
          { text: `Ask the mother one question of your own through the brother`, consequence: `The room shifts. The mother had not expected a question. She thinks. She answers at length. The brother translates. The question and the mother's answer become the foundation of everything that follows.`, flag: "mother_questioned" },
        ],
      },
      {
        title: `The Brother's Assessment`,
        setup: `Her brother contacts you directly outside of the family call. He says: 'I want to speak with you man to man. My sister deserves to know what I think, and I need to know who you are without my mother and sister in the room.'`,
        choices: [
          { text: `Welcome it — this is exactly the right conversation to have`, consequence: `He is direct and fair. He asks about your financial situation specifically. You answer honestly. He asks about your previous relationships. You answer honestly. At the end: 'I respect the honesty. Most men perform in this conversation.'`, flag: "brother_welcomed" },
          { text: `Tell him you prefer all family conversations to include Maryam`, consequence: `He respects the position but notes it. He tells Maryam. She tells you: 'He says you are protective of me. He also says you may be hiding something.' You need to address this.`, flag: "brother_declined" },
          { text: `Ask him what he needs to know to be able to support his sister's decision`, consequence: `He pauses. Then: 'That is the right question.' He asks what he needs to ask. You answer what he needs answered. The conversation ends with him saying: 'I will tell my mother you are real.'`, flag: "brother_right_question" },
        ],
      },
      {
        title: `Irbid`,
        setup: `You visit Jordan. Maryam's family is in Irbid, not Amman. The city is smaller and quieter. Her mother's home is warm and full of photographs. She meets you at the door herself. She looks at you for a long moment before speaking.`,
        choices: [
          { text: `Wait for her to speak first`, consequence: `She says something in Arabic. The brother translates: 'She says you have good eyes.' She is not speaking about the color. She goes inside. You follow.`, flag: "mother_reading" },
          { text: `Greet her formally with the Arabic greeting Maryam taught you`, consequence: `She responds in Arabic, longer than the greeting you gave. The brother translates: 'She is saying the greeting back but also welcoming you into her home specifically.' The detail of the welcome is specific and intentional.`, flag: "arabic_greeting" },
          { text: `Thank her for having you in her home — sincerely, not formally`, consequence: `She listens to the translation. Then she takes your arm and brings you inside. The formality is over before it started.`, flag: "sincere_thanks" },
        ],
      },
      {
        title: `The Agreement`,
        setup: `After three days the mother calls a family meeting. She speaks for ten minutes. The brother translates: she has watched you, she has spoken with Maryam, she has prayed, and she has one condition. Her condition: you will bring Maryam home once a year. Every year. Without exception.`,
        choices: [
          { text: `Agree without qualification`, consequence: `She studies your face. The agreement was immediate and complete. She says something. The brother translates: 'She says you did not hesitate. She wanted to see if you would hesitate.' You did not.`, flag: "agreement_immediate" },
          { text: `Ask what happens if circumstances make travel impossible in a given year`, consequence: `She considers the question. She names an alternative — a video gathering with the family that is formal and full, not a casual call. The condition has a contingency. Both of you can live with it.`, flag: "agreement_contingency" },
          { text: `Tell her that promise is something you would want Maryam to also agree to`, consequence: `The mother looks at Maryam. Maryam says: 'I already told him I want to come home.' The mother is satisfied. The agreement is made between all three of you simultaneously.`, flag: "agreement_trilateral" },
        ],
      },
      {
        title: `Arrival`,
        setup: `Maryam lands. Her mother called you the week before. She spoke no English but she talked for four minutes. The brother translated afterward by text: she was telling you what Maryam was like as a child. She wanted you to know who you were receiving.`,
        choices: [
          { text: `SUCCESS: Maryam — Irbid, Jordan.`, consequence: `SUCCESS: The mother's word was final. You earned it. Middle East arc — complete.`, flag: "success" },
          { text: `SUCCESS: You received what the mother told you about her daughter.`, consequence: `SUCCESS: Carry it forward.`, flag: "success" },
          { text: `SUCCESS: Arc complete.`, consequence: `SUCCESS: Maryam — Irbid, Jordan. Complete.`, flag: "success" },
        ],
      }
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
    ,
      {
        title: `The Visit Decision`,
        setup: `Her father has given a cautious approval to continue. She tells you directly: 'If you are serious, you will come. If you are not ready to come, there is nothing more to say.' Three months of correspondence. The trip is the next step.`,
        choices: [
          { text: `Book the flight within the week — no hesitation`, consequence: `She tells her father that same day. He calls to discuss your accommodations. The family is preparing.`, flag: "decisive" },
          { text: `Ask for two more months of correspondence before committing to travel`, consequence: `She goes quiet for ten days. When she writes again, her language is cooler. 'Two more months' is what a man who is not sure says. She is sure. She needed you to be.`, flag: "hesitant" },
          { text: `Ask what the visit protocol is — you want to arrive correctly`, consequence: `She appreciates the question. She walks you through the family's expectations: staying at a hotel, meeting the family formally first, no physical contact, modest dress. You take notes.`, flag: "protocol_aware" },
        ],
      },
      {
        title: `The Arrival in Fez`,
        setup: `You are in Fez. The medina is nothing like any city you have been in. She has sent her brother to meet you at the airport. He is twenty-two and watching everything about you. The family meeting is tomorrow evening.`,
        choices: [
          { text: `Engage the brother directly — ask him about himself, his studies, his life`, consequence: `He loosens. By the time you reach the riad he has told you about his engineering program and his plans. He texts his sister: 'He asked about me first.' This lands well.`, flag: "brother_rapport" },
          { text: `Be respectful and quiet — let him lead, follow his pace`, consequence: `He respects the restraint. He calls his sister when you are settled: 'He is serious. He does not perform.' She passes this to her father.`, flag: "restrained" },
          { text: `Try to give him money as a gesture of thanks for picking you up`, consequence: `He refuses. It is an insult wrapped in generosity. He is polite about it but the dynamic shifts. He does not mention it to his sister. He mentions it to his father.`, flag: "misread_culture" },
        ],
      },
      {
        title: `The Family Dinner`,
        setup: `The family dinner. Her father, mother, two brothers, an aunt. The table is full. The food is extraordinary. Her father watches you more than he speaks to you. Her mother offers you more of everything before you finish what you have.`,
        choices: [
          { text: `Eat what you are given, compliment the food specifically and genuinely`, consequence: `Her mother glows. Her father notices. A man who eats well at a Moroccan table and thanks the cook by name is a man who was raised right.`, flag: "table_grace" },
          { text: `Ask her father a question about his work or his history in Fez`, consequence: `He speaks for twenty minutes. His wife watches him. His sons watch you. You have given him the floor and he has taken it. This is the correct move.`, flag: "father_engaged" },
          { text: `Speak mostly to Nadia during the meal — she is the one you came for`, consequence: `Her father notices. Her brothers notice. In this context a man who orients toward the daughter at the family table rather than toward the family has signaled something about what he values. It is not the right signal.`, flag: "family_ignored" },
        ],
      },
      {
        title: `The Mahr Conversation`,
        setup: `Her father requests a private meeting. Just the two of you. He speaks directly about the mahr. He names a figure. It is higher than you expected. He watches your face when he says it.`,
        choices: [
          { text: `Receive the figure respectfully — ask what it represents to the family before responding`, consequence: `He explains. The number carries meaning. You negotiate respectfully and reach an agreement that honors the tradition. He calls his wife in afterward. Something has been decided.`, flag: "mahr_honored" },
          { text: `Counter with a lower figure immediately`, consequence: `His expression does not change but something behind it does. He says he will think about it. The meeting ends in eleven minutes. The damage is real.`, flag: "mahr_lowballed" },
          { text: `Agree to the full amount without negotiation`, consequence: `He pauses. Then: 'You did not ask what it represents.' He explains anyway. He adjusts the figure downward slightly. 'The agreement is about understanding, not the number.' This surprises you.`, flag: "mahr_accepted" },
        ],
      },
      {
        title: `She Says Something`,
        setup: `Your last evening in Fez. She arranges a brief meeting — her aunt present as chaperone. For the first time you see her clearly, not through a screen. She speaks: 'I need to ask you one thing before you leave. My answer to everything depends on your answer to this.'`,
        choices: [
          { text: `Tell her to ask it — you are not afraid of the question`, consequence: `She asks: 'Are you looking for a wife or are you looking for what a wife looks like?' You understand the difference. Your answer takes four minutes. She is quiet afterward. She says: 'I will pray on this tonight.'`, flag: "direct_question_met" },
          { text: `Tell her you already know what your answer is to any question she could ask`, consequence: `She shakes her head. 'That is confidence. I am not asking for confidence. I am asking for honesty.' She is sharper than you expected. This is not a performance.`, flag: "overconfident" },
          { text: `Ask her what prompted the question`, consequence: `She says her father told her something you said in the private meeting. She wanted to hear it from you directly. When you repeat it, it matches. Her aunt nods.`, flag: "consistent" },
        ],
      },
      {
        title: `The Return and The Wait`,
        setup: `You are home. The trip ended well but no formal agreement was made. Her father said he needs thirty days to consult with his family. She writes every few days — warm, present, but the formal question is unresolved. On day nineteen she sends a message: 'My father wants to know if you have spoken to your family about this.'`,
        choices: [
          { text: `Tell her yes — you spoke to your family before you came to Fez`, consequence: `She relays this. Her father respects the sequence: a man who consulted his family before traveling is a man who is operating within the correct protocol.`, flag: "family_consulted" },
          { text: `Tell her honestly that you have not yet spoken to your family`, consequence: `She is quiet a day. Then: 'He will want to speak with someone from your family. Not immediately, but before a final answer.' You understand what this means for the timeline.`, flag: "family_not_consulted" },
          { text: `Ask her what her father is actually concerned about — you want to address it directly`, consequence: `She says something that surprises you. It is not about your family. It is about your faith practice specifically. You address it in a letter to her father. He responds in a week.`, flag: "direct_concern" },
        ],
      },
      {
        title: `Her Father's Answer`,
        setup: `Day thirty-one. He calls. His voice is the same as the first call — unhurried, precise. He speaks for three minutes. His answer is conditional yes. The condition is a formal betrothal ceremony in Fez before any visa process begins. He names a date four months from now.`,
        choices: [
          { text: `Accept the date and the condition without modification`, consequence: `He says: 'I expected you to negotiate the date.' You tell him the date works. He is quiet a moment. Then: 'Good.' The call ends in seven minutes. Nadia calls two minutes later.`, flag: "accepted_terms" },
          { text: `Ask if the ceremony can happen sooner — you are ready now`, consequence: `He considers. He moves the date forward six weeks. 'If you are ready now, we are ready.' The timeline compresses in your favor.`, flag: "pressed_forward" },
          { text: `Ask for clarification on what the betrothal ceremony involves`, consequence: `He explains fully. You ask good questions. He answers them. At the end: 'Most men do not ask. I am glad you did.' The call runs twenty-two minutes.`, flag: "ceremony_understood" },
        ],
      },
      {
        title: `The Betrothal Ceremony`,
        setup: `You are back in Fez. The ceremony is small — family only. You have brought gifts for the family according to the tradition. You recite what is asked of you. Her father signs something. Her brothers witness it. She is in the next room. When it is done, she enters.`,
        choices: [
          { text: `Greet her formally — this is a formal occasion and she deserves the ceremony of it`, consequence: `She holds the formality with you. Later, outside, she tells you: 'You understood what this day was.' Her father, watching from across the room, allows himself a small expression.`, flag: "ceremony_honored" },
          { text: `Allow yourself one genuine moment of emotion — this is real`, consequence: `Her mother sees it. Her mother says something in Darija that makes her daughter laugh. You do not understand the words but the room changes.`, flag: "genuine_moment" },
          { text: `Ask her father what comes next — you want to begin the process correctly`, consequence: `He walks you through the visa timeline, the second visit requirements, the documentation. He has already begun preparing some of it. He was ready before you asked.`, flag: "process_ready" },
        ],
      },
      {
        title: `The Outcome`,
        setup: `The K-1 process takes nine months. On a Thursday morning in November she lands. Her brother calls you from Morocco thirty minutes after her plane takes off. You are in the parking structure at the airport when you see her walking through arrivals.`,
        choices: [
          { text: `You went and found what you came to find. The real work begins here.`, consequence: `SUCCESS: You married within 48 hours of her arrival. Her father called on the wedding day. Her mother sent three recipes the following week. The family meeting next year will be in Fez.`, flag: "success" },
          { text: `You proceeded correctly at every decision point. This is what preparation produces.`, consequence: `SUCCESS: The certificate belongs to the man who was patient, culturally aware, and honest when it cost something. You were that man.`, flag: "success" },
          { text: `Everything you learned brought you here.`, consequence: `SUCCESS: North Africa — complete. The knowledge you built here applies in every region. The next arc will require different knowledge. It will be worth learning.`, flag: "success" },
        ],
      }
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
    ,
      {
        title: `The Education Question`,
        setup: `Nurul has a graduate degree in public health from Dhaka University. She has a career. She is serious about both. She asks you in the fourth week: 'I want to understand your position on a wife who works and has professional ambitions.'`,
        choices: [
          { text: `Answer honestly from your actual position — not from what you think she wants to hear`, consequence: `She receives it carefully. She has one follow-up question. The answer to that question determines whether the conversation continues at depth or stays on the surface.`, flag: "honest_position" },
          { text: `Ask her what the question is really asking before you answer`, consequence: `She says: 'I need to know if you are looking for a partner or a possession.' You understand the distinction. Your answer is the most important thing you have said to anyone on this platform.`, flag: "real_question" },
          { text: `Tell her you support whatever she needs — you are flexible`, consequence: `She is quiet. Then: 'Flexible is not an answer. I have worked hard for something real. I need to know if you will respect it specifically, not generically.'`, flag: "flexible_answer" },
        ],
      },
      {
        title: `Her Family Structure`,
        setup: `Nurul's family is in Dhaka. Her father is a professor. Her mother is a retired government official. Her older brother is in London. The family is educated, formal, and has specific expectations. She tells you this directly: 'My parents will have questions that other parents do not ask.'`,
        choices: [
          { text: `Ask her to prepare you for those questions`, consequence: `She walks you through what her parents value: intellectual seriousness, financial stability, and evidence that you have thought about marriage as a practice rather than a destination.`, flag: "prepared" },
          { text: `Tell her you are ready for whatever questions they have`, consequence: `She tests this. She asks you three questions as a proxy for her parents. Your answers calibrate the next phase of the correspondence.`, flag: "tested" },
          { text: `Ask what differentiates a marriage as a practice from a marriage as a destination`, consequence: `She stops. Then: 'You understood the distinction without me explaining it. That is rare.' The conversation enters a new register.`, flag: "distinction_understood" },
        ],
      },
      {
        title: `The Father Professor`,
        setup: `Her father writes to you. A formal letter. He identifies himself as Professor Nurul Haque. He asks three questions in the letter and requests written responses within two weeks. The questions are: what is your educational background, what have you read about Bangladesh, and what do you understand about the responsibilities of marriage in Islamic tradition.`,
        choices: [
          { text: `Take the two weeks and write careful, thorough responses`, consequence: `He responds within four days. His response is warm and substantive. He has questions about your second answer specifically. You have passed the first test.`, flag: "thorough_response" },
          { text: `Respond in three days — you have already been thinking about these things`, consequence: `He notes the speed. He asks if you prepared for these questions in advance. You tell him yes — that Nurul helped you understand what her parents value. He tells Nurul: 'He was honest about the preparation. That is as important as the answers.'`, flag: "quick_honest_response" },
          { text: `Ask Nurul for guidance on the Bangladesh question specifically`, consequence: `She teaches you for a week. Your response on Bangladesh is the most specific and informed answer her father has received from any man who has written to his family. He calls her after reading it.`, flag: "bangladesh_researched" },
        ],
      },
      {
        title: `Dhaka`,
        setup: `You arrive in Dhaka. The city is enormous and dense and full of traffic and life. Her brother flies in from London. The family dinner includes her parents, the brother, an aunt who is also a professor, and the family's longtime friend — a retired judge. You are being assessed by a full room of educated people.`,
        choices: [
          { text: `Listen more than you speak — you are the learner in this room`, consequence: `The aunt notices this. She says something to Nurul in Bengali. Nurul translates later: 'She said you know your place in the conversation. That is not common in young men.'`, flag: "listener_role" },
          { text: `Engage the room — ask questions, contribute perspectives, match the energy`, consequence: `Her father draws you into a discussion about something he has written. You have read it — Nurul gave it to you months ago. The table shifts when you demonstrate this.`, flag: "engaged" },
          { text: `Direct your attention primarily to her father and mother and let the others observe`, consequence: `The brother approaches you after dinner. 'You understood the hierarchy of the room.' He has been waiting to say this.`, flag: "hierarchy_understood" },
        ],
      },
      {
        title: `The Aunt's Question`,
        setup: `The aunt pulls you aside after the dinner. She is direct. She says: 'My niece has options. She has been presented with men from good families in Dhaka, in London, in Toronto. She is speaking with you. I want to understand why.' She is not hostile. She is precise.`,
        choices: [
          { text: `Answer honestly: you do not know why she chose to continue the conversation — only that you are grateful she did`, consequence: `The aunt is surprised by the humility. She asks a second question. Then a third. By the end she has told you something about Nurul that Nurul has not told you herself.`, flag: "honest_humility" },
          { text: `Tell her what you bring — your character, your seriousness, your preparation`, consequence: `She listens. Then: 'Those are the things a man who has thought about himself would say. I am asking why Nurul specifically chose you.' The question is different from what you answered.`, flag: "missed_question" },
          { text: `Ask the aunt what she sees in Nurul that the other men missed`, consequence: `She is very still. Then she smiles. Then she answers at length. It is the most useful information you have received in this entire process.`, flag: "aunt_asked" },
        ],
      },
      {
        title: `The Agreement`,
        setup: `The family convenes on your last evening. Her father speaks. Nurul translates. He approves with the following condition: she will complete her current research project before any visa process begins. This is eight months from now. He will not be rushed.`,
        choices: [
          { text: `Agree immediately and ask how you can support the project`, consequence: `Her father pauses. The question surprises him. His approval deepens. He had expected negotiation about the timeline.`, flag: "support_offered" },
          { text: `Agree and tell him you respect that her work is part of who she is`, consequence: `He tells Nurul something. She translates: 'He says you said the right thing. He has been watching to see if you see her or only the destination.' You saw her.`, flag: "work_respected" },
          { text: `Ask Nurul privately if eight months is what she wants`, consequence: `She says yes — she was the one who set the condition. Her father was honoring her timeline. You understand that the real decision has always been hers.`, flag: "nurul_decision" },
        ],
      },
      {
        title: `The Wait`,
        setup: `Eight months. The project concludes. Her father calls you himself to tell you. In English — his first English with you. He says: 'She is ready. Begin the paperwork.'`,
        choices: [
          { text: `SUCCESS: Nurul — Dhaka, Bangladesh.`, consequence: `SUCCESS: The professor's letters, the aunt's question, the brother from London, the eight months — all of it was the path. Asia arc — complete.`, flag: "success" },
          { text: `SUCCESS: She finished her work. Now she begins her life.`, consequence: `SUCCESS: The man who waits for a woman to complete what she has built has understood something that most men miss. Arc complete.`, flag: "success" },
          { text: `SUCCESS: Arc complete.`, consequence: `SUCCESS: Bangladesh — complete. Everything you learned here applies throughout the Asia arc.`, flag: "success" },
        ],
      },
      {
        title: `Arrival`,
        setup: `She arrives. Her father sent his published papers with her — the ones she has worked on, the ones she co-authored. He included a handwritten note. She translates it for you on the first evening. It is addressed to you, not to her.`,
        choices: [
          { text: `SUCCESS: A professor sent you his life's work to keep.`, consequence: `SUCCESS: Honor what that means. Nurul — Bangladesh — complete.`, flag: "success" },
          { text: `SUCCESS: Arc complete.`, consequence: `SUCCESS: Asia arc — complete.`, flag: "success" },
          { text: `SUCCESS: Nurul — complete.`, consequence: `SUCCESS: The patience, the research, the aunt, the eight months — all of it earned this.`, flag: "success" },
        ],
      }
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
    ,
      {
        title: `Her Father Enters`,
        setup: `Six weeks in. Sara mentions her father has been aware of your correspondence from the beginning. He reads every message she writes and every message she receives. She says this directly: 'I have no secrets from my father. This is not something I am willing to change.'`,
        choices: [
          { text: `Tell her this is exactly the kind of family structure you are looking for`, consequence: `She shows him your response. He calls her that evening. She tells you the next morning: 'He wants to know more about you.'`, flag: "transparency_welcomed" },
          { text: `Ask her how this works practically — does he read in real time?`, consequence: `She explains the family's rhythm. He reviews correspondence weekly, not in real time. She tells him what she decides to tell him outside of that. The structure is clear.`, flag: "structure_understood" },
          { text: `Express mild concern about privacy`, consequence: `She receives this without judgment but without softening: 'This is my family. If you cannot accept this, this is important information for both of us.' She is not issuing an ultimatum. She is stating a fact.`, flag: "privacy_concern" },
        ],
      },
      {
        title: `The Political Question`,
        setup: `Jordan. Her father asks you directly in a letter what your position is on the situation in Palestine. He is not asking for a political debate. He is asking something simpler: do you understand what his family lives with? Are you paying attention to the world they inhabit?`,
        choices: [
          { text: `Answer honestly and with knowledge — you have been paying attention`, consequence: `He writes back within two days. The response is warm and substantive. He has found a man who is paying attention. This matters to him.`, flag: "political_aware" },
          { text: `Answer carefully — express concern without taking a strong political position`, consequence: `He reads the carefulness. He responds briefly and moves on. He noted the avoidance. He does not raise the subject again but he does not forget it.`, flag: "political_careful" },
          { text: `Tell him you would rather focus on the personal relationship than political matters`, consequence: `He does not respond for ten days. When he does, it is Sara who writes, not him: 'My father says the personal and the political are not separate in our family.' You now understand what you missed.`, flag: "political_avoided" },
        ],
      },
      {
        title: `The Distance Test`,
        setup: `Three months in. Sara goes two weeks without writing. No explanation. When she returns, she is warm but does not explain the absence. Her father is also silent during this period.`,
        choices: [
          { text: `Ask directly what happened`, consequence: `She tells you. A family matter — serious, private, resolved. She was not ready to include you in it. She says: 'I did not want you to see the difficulty before you had seen the stability.'`, flag: "absence_explained" },
          { text: `Receive her return without pressing`, consequence: `She notices the restraint. A week later she tells you what happened anyway. 'You did not push. My father said a man who does not push when a woman goes quiet is a man who trusts.'`, flag: "absence_received" },
          { text: `Tell her the silence concerned you and you need more consistency`, consequence: `She hears it. She explains. She also notes that in her family, periods of withdrawal are normal during difficulty. She asks if you can live with that rhythm. This is an important question.`, flag: "consistency_requested" },
        ],
      },
      {
        title: `Meeting in Amman`,
        setup: `The visit. You arrive in Amman. The city is denser and more modern than you expected. Sara's brother meets you. He is precise and formal and speaks perfect English. He says: 'My father will meet you tomorrow. Tonight I will show you the city.'`,
        choices: [
          { text: `Ask the brother about his father — what does he need to see from you?`, consequence: `The brother considers. Then: 'He needs to see that you are not performing. He has seen many performances.' This is the most useful thing anyone could have told you.`, flag: "brother_consulted" },
          { text: `Use the evening to observe — ask few questions, absorb everything`, consequence: `The brother notices the observation mode. At the end of the evening: 'You are paying attention.' This is a compliment in this context.`, flag: "observer_mode" },
          { text: `Talk about yourself — your background, your goals, why you came`, consequence: `The brother listens. He asks one or two questions. The evening ends pleasantly. He has gathered information without giving you guidance. Tomorrow you will be on your own.`, flag: "talked_about_self" },
        ],
      },
      {
        title: `Her Father's Test`,
        setup: `Her father meets you at his home. He offers coffee. He begins with small talk. For thirty minutes nothing of consequence is said. Then without preamble: 'What do you believe a daughter owes her father after she marries?'`,
        choices: [
          { text: `Answer honestly: love, respect, continued relationship — the marriage does not sever the family`, consequence: `He nods. He asks a second question immediately: 'And what does a husband owe his wife's father?' You understand that these two questions are the whole conversation.`, flag: "family_answer" },
          { text: `Ask him what he believes before answering`, consequence: `He pauses. Then: 'You want to know my standard before you answer. That is either wisdom or avoidance.' You tell him which one. He listens.`, flag: "standard_asked" },
          { text: `Answer from Islamic principles — a wife's first obligation is to her husband, but the father is owed respect always`, consequence: `He leans forward. He has heard this answer before. He asks what happens when the husband and the father disagree. This is the real question.`, flag: "islamic_answer" },
        ],
      },
      {
        title: `The Complication`,
        setup: `Sara tells you in private that her father respects you but has one concern: you live too far. He does not want his daughter in a country he cannot drive to. He is not refusing. He is expressing a cost he has calculated.`,
        choices: [
          { text: `Address it directly with him — ask what would make the distance more bearable`, consequence: `He names two things: regular visits to Jordan and a phone call with him monthly. Not demands — a request from a father. You agree to both. He tells Sara that evening.`, flag: "distance_addressed" },
          { text: `Tell Sara you understand his concern and will work to honor it`, consequence: `She carries this to her father. He responds: 'Let him tell me.' He needs to hear it from you, not through her.`, flag: "through_sara" },
          { text: `Propose that Sara visit Jordan every year`, consequence: `Her father had already assumed this. The proposal itself is expected. He is waiting to see if you will add something he did not assume.`, flag: "annual_visit_proposed" },
        ],
      },
      {
        title: `The Agreement`,
        setup: `Her father has given his agreement. The mahr is settled. A small ceremony is planned for six weeks from now. He calls you himself to tell you. The call lasts four minutes. At the end he says one sentence in Arabic that Sara translates for you later: 'Take care of what I am trusting you with.'`,
        choices: [
          { text: `Ask Sara how to respond to her father's trust in a way that is appropriate`, consequence: `She teaches you the phrase. You call him back the next day and say it. He is quiet a moment. Then he thanks you for calling.`, flag: "trust_honored" },
          { text: `Write him a letter formally accepting the responsibility`, consequence: `He reads it with his wife. Sara tells you her mother cried. This was the right move for this family.`, flag: "letter_written" },
          { text: `Begin preparing the visa documentation immediately`, consequence: `Her father learns you have already begun. He calls Sara: 'He is not waiting.' This is the highest form of respect to him.`, flag: "visa_begun" },
        ],
      },
      {
        title: `The Process`,
        setup: `The K-1 timeline. The ceremony was small and beautiful. The visa process takes eleven months. Her father calls monthly as agreed. The calls are short and warm and increasingly easy.`,
        choices: [
          { text: `SUCCESS: Sara — Amman, Jordan.`, consequence: `SUCCESS: The father's test, the brother's observation, the political question, the distance conversation — all of it was the path. You walked it correctly.`, flag: "success" },
          { text: `SUCCESS: Middle East arc — complete.`, consequence: `SUCCESS: Jordan required a different kind of preparation than Morocco. The family structure is similar but the registers are different. You learned the difference.`, flag: "success" },
          { text: `SUCCESS: The certificate is earned.`, consequence: `SUCCESS: Take what you learned here into every subsequent arc.`, flag: "success" },
        ],
      },
      {
        title: `She Arrives`,
        setup: `She arrives in the fall. Her father texted you a photograph the morning she left — the two of them in the airport. He is holding her hand. She is smiling at him. You saved the photograph.`,
        choices: [
          { text: `SUCCESS: You understand what was given to you.`, consequence: `SUCCESS: Jordan — complete. The father trusted you with what he loved most. Honor that trust in everything that follows.`, flag: "success" },
          { text: `SUCCESS: This is where the real work begins.`, consequence: `SUCCESS: The preparation is over. The life is starting.`, flag: "success" },
          { text: `SUCCESS: Arc complete.`, consequence: `SUCCESS: Sara — Amman, Jordan. Complete.`, flag: "success" },
        ],
      }
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
    ,
      {
        title: `Ethiopian Orthodox`,
        setup: `Tigist from Addis Ababa. Ethiopian Orthodox Christianity is not what you know as Christianity. It has its own calendar, its own fasting days — more than 250 per year — its own liturgical language, its own practices. She asks in the third week: 'Do you know anything about the Ethiopian Orthodox Church?'`,
        choices: [
          { text: `Tell her honestly: very little — and ask her to teach you`, consequence: `She begins teaching. It takes months and she is still teaching when the arc ends. The teaching is the relationship.`, flag: "honest_ignorance" },
          { text: `Research before answering — come back with what you found`, consequence: `She receives it, corrects three significant misunderstandings, and says: 'You tried before you answered. Most men just answer.' The correction deepens the respect.`, flag: "research_first" },
          { text: `Ask her what you would need to understand to be welcomed by her family`, consequence: `She lists four things. They take six months to understand genuinely. She knows you understand them when you stop asking the questions you were asking at the beginning.`, flag: "learning_list" },
        ],
      },
      {
        title: `The Fasting Question`,
        setup: `She mentions that her family fasts extensively — following the Ethiopian Orthodox calendar. She says: 'During fasting periods the household follows the fast. This is not a personal practice. It is a household practice.' She pauses. 'Would this be your household?'`,
        choices: [
          { text: `Answer honestly about your capacity and your willingness to learn the practice`, consequence: `She receives the honesty. She says: 'I do not need you to have the practice. I need you to honor the household that has it.' The distinction is important.`, flag: "honest_capacity" },
          { text: `Tell her you would want the household to be shaped by what she brings to it`, consequence: `She is quiet a moment. Then: 'That is the right answer. But I need to know if you mean it when it is inconvenient.' The follow-up is the real test.`, flag: "household_answer" },
          { text: `Ask what honoring the fast looks like practically in the household`, consequence: `She explains specifically. You understand what you are agreeing to before you agree to it. She says: 'You asked. Most men agree first and understand later when it is a problem.'`, flag: "fast_understood" },
        ],
      },
      {
        title: `Her Father the Deacon`,
        setup: `Tigist's father is a deacon in the Ethiopian Orthodox Church. He writes to you formally. In Amharic — with an English translation provided by Tigist. He says he would like to speak with you. He would like to begin by understanding your relationship with God, not your intentions toward his daughter. Those come after.`,
        choices: [
          { text: `Honor the sequence — speak about your faith first, your intentions second`, consequence: `He receives the sequence with satisfaction. 'You answered in the correct order. Most men reverse it.' He moves to your intentions with openness.`, flag: "sequence_honored" },
          { text: `Tell him honestly about your faith journey — including the gaps and the questions`, consequence: `He is a deacon. He has heard confessions. He knows what honesty about faith sounds like. He says: 'A man who is still searching is better than a man who has stopped.' He moves forward.`, flag: "faith_honest" },
          { text: `Ask him to share his faith with you before sharing yours with him`, consequence: `He is very still. Then he speaks for a long time. When he is done: 'You listened to all of it. Now I will listen to yours.' The most open conversation of the arc begins.`, flag: "father_faith_first" },
        ],
      },
      {
        title: `Addis Ababa`,
        setup: `You arrive in Addis Ababa. The city is high altitude and cool and nothing like you expected. Tigist's brother meets you. He is formal and direct. He says: 'My father is expecting us. We will go directly.' There is no orientation period. You are brought directly into the family.`,
        choices: [
          { text: `Match the directness — you are ready to be received by the family`, consequence: `He notes the readiness. He says one thing during the drive: 'My father has been asking about you since the first month.' You understand that the deacon has been evaluating you for longer than you knew.`, flag: "direct_ready" },
          { text: `Ask the brother one question during the drive: what does his father need to see?`, consequence: `He considers. Then: 'He needs to see that you have not come to take his daughter out of her world. He needs to see that you understand her world will come with her.' This is the central insight of the entire arc.`, flag: "brother_key_insight" },
          { text: `Be quiet during the drive — observe the city, prepare yourself`, consequence: `The brother notices the preparation in the stillness. He says: 'You are not afraid.' It is not a question. He is confirming something he saw.`, flag: "quiet_preparation" },
        ],
      },
      {
        title: `The Deacon`,
        setup: `Her father meets you at the door of the family home. He is in his clerical vestments — he has come from church. He greets you with a formal blessing in Amharic. Tigist translates: he is welcoming you into his home under God's peace.`,
        choices: [
          { text: `Receive the blessing with genuine respect — bow your head`, consequence: `He places his hand briefly on your head. He says something. Tigist translates later: 'He said you received the blessing correctly. You did not perform it and you did not deflect it.'`, flag: "blessing_received" },
          { text: `Thank him and tell him what the blessing meant to you`, consequence: `He listens to the translation. Then he asks Tigist if you understood what he said. She says yes. He nods once. The welcome is complete.`, flag: "blessing_thanked" },
          { text: `Ask Tigist to teach you the response in Amharic before the visit — deliver it yourself`, consequence: `He stops. He looks at you for a long moment. He speaks to Tigist. She translates: 'He says the pronunciation was wrong but the intention was correct. This is the same as prayer.' He is smiling.`, flag: "amharic_attempted" },
        ],
      },
      {
        title: `The Time Waster PATH — Sara (Middle East Time Waster)`,
        setup: `This is an alternate path. You have been corresponding with a woman in the Middle East who uses the platform the way some use mirrors. She is not a fraudster. She is not cruel. She has a profile on a matrimonial platform because her family is beginning to ask questions, but she has a man — a local man her family does not know about — and she is using the platform to fill the space while she waits for that situation to resolve.`,
        choices: [
          { text: `You notice she never asks about your timeline — only yours about hers`, consequence: `TIME WASTER: A woman who is serious about marriage is thinking about when. A woman who is filling a space asks what you are thinking but has already decided what she is doing. Watch for who controls the timeline conversation.`, flag: "time_waster" },
          { text: `You notice she mentions a male name casually and then redirects immediately`, consequence: `TIME WASTER: The name was not explained. The redirect was immediate. These are not accusations — they are observations. A man who observes correctly will not invest two more months in something with a ceiling.`, flag: "time_waster" },
          { text: `You ask her directly about the timeline and she agrees warmly to everything and plans nothing`, consequence: `TIME WASTER: Middle East time waster arc complete. She was real in her warmth. The warmth was real for what it was — which was not what you came to the platform to find. Walk away intact.`, flag: "time_waster" },
        ],
      },
      {
        title: `The Agreement with Tigist's Father`,
        setup: `The deacon calls a family gathering. He speaks for twenty minutes. Tigist translates in pieces. He says he has prayed about this. He says the prayer produced an answer. The answer is yes, with one condition: the first child will be baptized in the Ethiopian Orthodox tradition, in this church, by him.`,
        choices: [
          { text: `Agree to the condition sincerely — this is his grandchild and his tradition`, consequence: `He stands. He places his hand on your shoulder. He speaks. Tigist translates: 'He says you agreed without asking what it costs you. That is the kind of man who can raise a child in this tradition.' The agreement is made.`, flag: "condition_accepted" },
          { text: `Tell him you need to speak with Tigist about this before agreeing`, consequence: `He nods. He was expecting this. He sends you and Tigist outside for twenty minutes. You discuss. You come back. You agree together. He says: 'Good. You decided together. That is how it should be done.'`, flag: "condition_joint" },
          { text: `Ask him to tell you about the baptism tradition so you can receive it fully`, consequence: `He teaches you for an hour. By the end you have agreed to something you understand. He says: 'That is better than agreeing to something you will discover later.'`, flag: "baptism_understood" },
        ],
      },
      {
        title: `Arrival`,
        setup: `She arrives in the spring. Her father sent his blessing in writing — in Amharic with Tigist's translation below each line. The last line: 'She carries the church with her. Honor what she carries.'`,
        choices: [
          { text: `SUCCESS: Tigist — Addis Ababa, Ethiopia.`, consequence: `SUCCESS: The deacon's blessing, the fasting household, the 250 days, the baptism condition, the Amharic you attempted — all of it was the path. Sub-Saharan Africa arc — complete.`, flag: "success" },
          { text: `SUCCESS: She carries the church with her.`, consequence: `SUCCESS: Honor what she carries. Arc complete.`, flag: "success" },
          { text: `SUCCESS: Arc complete.`, consequence: `SUCCESS: Tigist — Addis Ababa, Ethiopia. Complete. Sub-Saharan Africa arc — complete.`, flag: "success" },
        ],
      }
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
    ,
      {
        title: `The Warmth That Does Not Move`,
        setup: `Four months in. Valentina writes every day. The conversations are warm, funny, deep. She has told you about her childhood in Medellin, her grandmother's recipes, her fear of airports. She has told you almost everything except: when you mention the visit, when you mention the family meeting, when you mention next steps — she agrees warmly and then the conversation moves somewhere else.`,
        choices: [
          { text: `Name the pattern directly: 'I notice we agree on next steps but never plan them'`, consequence: `She laughs. She says you are right. She says she gets nervous about the future and retreats into the present. She proposes a date for the family meeting. You put it in your calendar.`, flag: "pattern_named" },
          { text: `Let it continue another month and see if she initiates movement`, consequence: `She does not. Another month of warmth, another month of warmth that does not move. The pattern is now established.`, flag: "pattern_continued" },
          { text: `Ask her directly: 'Do you see this relationship becoming a marriage?'`, consequence: `She says yes — of course, absolutely, without hesitation. Then the conversation moves somewhere else. Yes is not a plan.`, flag: "yes_without_plan" },
        ],
      },
      {
        title: `The Excuse Architecture`,
        setup: `You have proposed three specific dates for a video call with her family. The first date her mother was unwell. The second date her brother was visiting from Bogota unexpectedly. The third date there was a power outage in her neighborhood that lasted the entire day.`,
        choices: [
          { text: `Propose a fourth date and watch what happens`, consequence: `The fourth date: her father is traveling for work. He will be back in three weeks. She is deeply apologetic. The apologizing is real. The pattern is also real.`, flag: "fourth_proposed" },
          { text: `Name what you are seeing without accusation: 'Four attempts. Four obstacles. Help me understand this.'`, consequence: `She goes quiet two days. Then a long message. She admits she is afraid. Her last relationship ended badly when she introduced the man to her family. She is protecting herself by protecting the introduction.`, flag: "pattern_named_gently" },
          { text: `Tell her you are not willing to continue without meeting her family`, consequence: `She hears this as an ultimatum. She is upset. The conversation is difficult. But through the difficulty something honest surfaces that four months of warmth had not produced.`, flag: "boundary_set" },
        ],
      },
      {
        title: `What She Is Actually Afraid Of`,
        setup: `The real conversation finally happens. She tells you that she has introduced two men to her family before. Both times her family disapproved, the relationship ended, and she was left managing both the loss and her family's relief. She is afraid of a third time.`,
        choices: [
          { text: `Tell her you understand the fear — and ask what would make the introduction feel safe`, consequence: `She thinks. She says: a video call first, just her mother, not the whole family. Lower stakes, earlier in the process. You agree immediately.`, flag: "safe_introduction" },
          { text: `Tell her the fear is valid but cannot be the reason to never move forward`, consequence: `She hears it. She says: 'You are right but knowing that does not make it easier.' She needs something more than truth. She needs a plan that makes the truth manageable.`, flag: "truth_delivered" },
          { text: `Ask if her family's disapproval of those two men was reasonable in retrospect`, consequence: `She pauses. Then: 'Yes. Both times they saw something I did not want to see.' This is an important thing for her to have said out loud. It changes the dynamic between her and her family's judgment.`, flag: "family_judgment_respected" },
        ],
      },
      {
        title: `The Mother Call`,
        setup: `Video call with her mother. Her mother speaks no English. Valentina translates. The mother asks three questions: where are your parents from, what is your work, and what do you like most about my daughter. The third question is the real one.`,
        choices: [
          { text: `Answer the third question specifically and honestly — not with a compliment but with something real`, consequence: `Valentina translates. Her mother is quiet a moment. Then she says something in Spanish. Valentina translates: 'She says you said something true.' The mother stays on the call longer than expected.`, flag: "mother_impressed" },
          { text: `Answer all three questions through Valentina with warmth and care`, consequence: `The mother is warm in return. The call ends pleasantly. Valentina writes afterward: 'She said you have good energy.' This is not the highest approval but it is real.`, flag: "mother_warm" },
          { text: `Ask Valentina to translate one question to her mother from you`, consequence: `You ask: 'What would you need to see to know your daughter is safe with me?' Valentina translates. The mother is quiet. Then she speaks for two minutes. Valentina translates. It is the most useful thing anyone has said to you about this family.`, flag: "mother_asked" },
        ],
      },
      {
        title: `The Father`,
        setup: `Her father is harder to reach. He works long hours. He is polite when Valentina mentions you but noncommittal. She says: 'He will warm up when he sees you are real. He has seen too many men who were not real.' A video call is scheduled for a Sunday evening.`,
        choices: [
          { text: `Come to the call prepared — know something about his work, his city, his world`, consequence: `He mentions his work early in the call. You ask a specific question. He stops. He looks at you. 'You researched.' You tell him you wanted to know who he was before you asked for his daughter's hand. The call runs forty minutes.`, flag: "father_researched" },
          { text: `Let the call unfold naturally — no preparation script`, consequence: `The call is pleasant and surface-level. He is polite. He does not warm or cool. He tells Valentina later: 'He seems fine.' Fine is not the goal.`, flag: "father_natural" },
          { text: `Ask him directly at some point: 'What do you need to see from me?'`, consequence: `He is surprised by the directness. He thinks. He says: 'Come here. Meet me in person. Everything you want to ask, ask me face to face.' The video call has produced an invitation.`, flag: "father_direct" },
        ],
      },
      {
        title: `Medellin`,
        setup: `You arrive in Medellin. The city is nothing like the news coverage suggested. Her father meets you at the family home, not the airport. Valentina is there. Her mother has cooked. Her father shakes your hand, looks at you directly, and says in Spanish — Valentina translates — 'Let us eat first. We will talk after.'`,
        choices: [
          { text: `Eat with the family, follow the rhythm of the meal, say little until spoken to`, consequence: `Her father watches you at the table the way her father described in the video call — he is watching for what is real. You eat well. You compliment the food to the mother directly. Her father sees this.`, flag: "meal_correct" },
          { text: `Engage the family warmly during the meal — stories, questions, laughter`, consequence: `Her mother loves it. Her father observes. He is less warm than the mother but no less attentive. The warmth during the meal is natural, not performed. He notices the difference.`, flag: "meal_warm" },
          { text: `Ask her father when he would like to speak — you do not want to intrude on the family's pace`, consequence: `He raises an eyebrow. 'After the coffee.' You have shown him you know how to wait. This matters to him more than he shows.`, flag: "meal_patient" },
        ],
      },
      {
        title: `The TIME WASTER Reveal`,
        setup: `You have been here three days. The family is warm. Her father has approved in general terms. But when you ask Valentina: when do we discuss the specific plan — the timeline, the legal process, the formal commitment — she becomes the warmest, most deflecting version of herself. Everything is agreed. Nothing is planned.`,
        choices: [
          { text: `Name it: 'Valentina, we agree on everything and have planned nothing. What is happening?'`, consequence: `She is quiet a long time. Then: 'I do not know if I am ready to leave Colombia.' This is the first honest thing she has said about the future. It is also the most important.`, flag: "time_waster_revealed" },
          { text: `Give her one more day and see if she initiates the planning conversation`, consequence: `She does not. The day is warm and full and beautiful and moves nowhere. The pattern is now visible even in person.`, flag: "time_waster_pattern" },
          { text: `Ask her directly: 'Are you looking for a husband or are you looking for someone to want you?'`, consequence: `She cries. Then she is honest: she has been on matrimonial platforms for four years. She has never been to the planning stage with anyone. She does not know if she can do it. This is the TIME WASTER ending.`, flag: "time_waster" },
        ],
      },
      {
        title: `The TIME WASTER Ending`,
        setup: `Valentina is not a fraud. She is not manipulative. She is a woman who has used the attention of serious men to fill something in herself that marriage cannot fill until she is ready to receive it. This is the time waster arc. It cost you months of genuine investment.`,
        choices: [
          { text: `TIME WASTER: Walk away with clarity and without bitterness.`, consequence: `TIME WASTER: Valentina was real. Her warmth was real. Her family was real. Her inability to move forward was also real. The man who recognizes this pattern without making the woman a villain has understood something important.`, flag: "time_waster" },
          { text: `TIME WASTER: The cost was real. The lesson is permanent.`, consequence: `TIME WASTER: Watch for warmth that never moves. Agreement without planning. Deflection wrapped in affection. These are the markers. They will appear in other arcs. You will recognize them now.`, flag: "time_waster" },
          { text: `TIME WASTER: Latin America arc — incomplete. Try Elena or Diana.`, consequence: `TIME WASTER: Valentina was your first arc in this region. She taught you something the success arcs cannot teach: that genuine warmth is not the same as genuine readiness. Apply this everywhere.`, flag: "time_waster" },
        ],
      }
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
    ,
      {
        title: `Moving Too Fast`,
        setup: `Six weeks in. Yasmine is warmer than most women you have encountered on the platform. She writes daily. Her messages are long and personal. She asks about your family, your childhood, your dreams. She says: 'I feel like I have known you for years.' It has been six weeks.`,
        choices: [
          { text: `Receive the warmth but internally note the pace — six weeks is six weeks`, consequence: `You keep your responses genuine but measured. She matches your pace. The relationship deepens at a speed that can be trusted.`, flag: "pace_controlled" },
          { text: `Match her energy — you feel it too`, consequence: `The intimacy accelerates. By week eight she is discussing your future children's names. Something in you needs to slow this down and examine it.`, flag: "pace_accelerated" },
          { text: `Name the pace directly — 'I am enjoying this but I want us to build something real, not fast'`, consequence: `She pauses two days. Then: 'You are right. I sometimes mistake speed for depth.' The conversation resets at a healthier pace.`, flag: "pace_named" },
        ],
      },
      {
        title: `The Inconsistency`,
        setup: `Three months in. You review your conversation history. Three weeks ago she described her mother as being in Casablanca. Last week she mentioned her mother visiting her in Casablanca from Rabat. Two different things. Small. Possibly a mistake. Possibly not.`,
        choices: [
          { text: `Ask her to clarify naturally — 'I thought your mother was in Casablanca?'`, consequence: `She explains immediately and without defensiveness. Her mother has two residences — she stays with her sister in Rabat for months at a time. The inconsistency was real but the explanation is plausible.`, flag: "inconsistency_clarified" },
          { text: `Watch for more inconsistencies before raising anything`, consequence: `You find two more over the next two weeks. Her father's profession shifts. Her neighborhood changes. This is no longer a pattern of casual error.`, flag: "pattern_watched" },
          { text: `Do a reverse image search of her photos`, consequence: `The photos return results under a different name on a different platform. The account is two years older than the one you are corresponding with. You now have the information you need.`, flag: "image_searched" },
        ],
      },
      {
        title: `The Financial Request`,
        setup: `Four months in. She calls on a video call crying. Her younger sister needs a medical procedure. The family cannot afford it. She is ashamed to ask but she does not know who else to call. She asks for the equivalent of $400.`,
        choices: [
          { text: `Do not send money — express care but hold the line`, consequence: `She is upset. She goes quiet three days. When she returns the sister's condition has apparently resolved. No further mention of the procedure. No gratitude for the concern you expressed. The subject simply closes.`, flag: "money_refused" },
          { text: `Send the money — she is in need and you care about her`, consequence: `She thanks you warmly. Three weeks later her cousin needs help with school fees. The pattern has started. You have taught the system that it works.`, flag: "money_sent" },
          { text: `Offer to pay a medical provider directly — no cash transfers`, consequence: `She says she will ask about it. She goes quiet four days. When she returns she says the situation has been handled another way. She does not raise money again for two months.`, flag: "direct_payment_offered" },
        ],
      },
      {
        title: `The Video Call Test`,
        setup: `You call her spontaneously on a Tuesday at 2pm her time. She answers. She is outside. Behind her the street sounds are different from the city she has described. You can see a sign in the background. It does not say Casablanca.`,
        choices: [
          { text: `Ask her casually where she is`, consequence: `She says she is visiting a friend in another city. She names the city. You check later — the sign matches. The inconsistency has a plausible explanation but you are more alert than before.`, flag: "location_questioned" },
          { text: `Screenshot the background and research the sign later`, consequence: `The sign belongs to a neighborhood in a city six hours from Casablanca. She has never mentioned being there. This is data.`, flag: "background_investigated" },
          { text: `End the call normally and say nothing — you are watching`, consequence: `You review the call recording. The street, the accent of a passerby in the background, the time of the call — all of it is slightly wrong. Not dramatically. Slightly. You are watching now.`, flag: "silent_alert" },
        ],
      },
      {
        title: `The Confrontation`,
        setup: `You have accumulated enough. The inconsistencies in her story. The financial request. The background that did not match. The photos that returned a different name. You decide to have the conversation.`,
        choices: [
          { text: `Ask directly: 'I need you to help me understand some things I have noticed'`, consequence: `She listens. Then she says something you did not expect. She explains some of it. Not all. The explanation covers the surface but not the structure. You now have to decide what you believe.`, flag: "confronted_directly" },
          { text: `Present the reverse image search result — let her see what you found`, consequence: `She is quiet for a long time. Then she admits the photos are not her. She claims to have done it because she was afraid no one would respond to her real photos. The explanation is possible but the breach is real.`, flag: "evidence_presented" },
          { text: `Walk away without confronting — you have seen enough and do not need the conversation`, consequence: `WALKAWAY: You made the correct decision. The man who walks away when the pattern is clear has protected himself without drama. Block the profile. Report it to the platform. Move forward.`, flag: "walkaway" },
        ],
      },
      {
        title: `The Decision`,
        setup: `You have confronted her or you have observed enough to know. Either way you are at the decision point. The warmth was real in feeling even if not in fact. This is the most expensive part of the fraud pattern — the emotional cost is genuine.`,
        choices: [
          { text: `End the correspondence — you have clarity and clarity is enough`, consequence: `WALKAWAY: You did not lose this. You learned something that will protect you for the rest of this journey. The man who identifies the pattern early is the man who arrives at the right woman intact.`, flag: "walkaway" },
          { text: `Give her one more chance to be honest with you completely`, consequence: `She tells you more. Some of it is true. None of it changes the foundation. You needed to hear it to know that you already knew enough.`, flag: "one_more_chance" },
          { text: `Report the profile and move to the next woman in your region`, consequence: `WALKAWAY: The correct ending. You have completed the fraud detection arc. Every flag you learned to read here will serve you in every subsequent arc.`, flag: "walkaway" },
        ],
      },
      {
        title: `After Yasmine`,
        setup: `A week after ending things with Yasmine. You review what you missed and what you caught. The warmth that moved too fast. The inconsistencies you noticed but questioned yourself about. The financial request that came at exactly the right emotional moment.`,
        choices: [
          { text: `Document what you learned — write it down so it becomes a standard, not a memory`, consequence: `You have now built a personal fraud detection protocol from direct experience. This is more valuable than any list you could have read.`, flag: "lesson_documented" },
          { text: `Move to the next profile immediately — you do not want the experience to make you cold`, consequence: `The next woman receives a version of you that is more discerning and less cold than you feared. The experience calibrated rather than damaged you.`, flag: "returned_calibrated" },
          { text: `Take a week before engaging again — let the emotional cost settle`, consequence: `The week is necessary. You return clearer. The next profile receives the full version of you rather than the raw version.`, flag: "reset_taken" },
        ],
      },
      {
        title: `Reflection`,
        setup: `The Yasmine arc is complete. This is the fraud ending. Not all women on the platform are Yasmine. Most are not. But every man who uses this platform will encounter a version of this arc somewhere in his journey. You encountered it here.`,
        choices: [
          { text: `You recognized the pattern. That is the only passing grade in this arc.`, consequence: `FRAUD DETECTED: The emotional investment was real. The warmth felt real. The platform created real feelings in you that were exploited. This is what makes the fraud effective. You survived it with your discernment intact.`, flag: "fraud_detected" },
          { text: `Review the fraud detection resource module before your next approach.`, consequence: `FRAUD DETECTED: The twelve warning signs you studied were all present. Speed of intimacy. Financial request at the emotional peak. Photo inconsistency. Story drift. You saw them. Trust what you see.`, flag: "fraud_detected" },
          { text: `The lesson is permanent. Apply it.`, consequence: `FRAUD DETECTED: Yasmine arc complete. You are more qualified now than when you began.`, flag: "fraud_detected" },
        ],
      },
      {
        title: `Final Note`,
        setup: `Before you move to your next approach. One last thing to carry forward.`,
        choices: [
          { text: `The women who are real do not ask for money.`, consequence: `FRAUD DETECTED: No real woman with real family involvement and real marriage intent will ask you for money before you have met her, before the family has agreed, before the process has begun. Hold that line in every arc that follows.`, flag: "fraud_detected" },
          { text: `The warmth that moves fastest is the warmth that costs the most.`, consequence: `FRAUD DETECTED: Speed of intimacy is the primary tool of this arc. Not because all warm women are fraudulent, but because manufactured warmth is engineered to feel genuine. You know the difference now.`, flag: "fraud_detected" },
          { text: `Move forward intact.`, consequence: `FRAUD DETECTED: Arc complete.`, flag: "fraud_detected" },
        ],
      }
    ],
    endings: {
      early_detect: `You caught it. The cost was three months of evenings and the real grief of caring about someone who was not real. That grief is not nothing — receive it as proof you are capable of caring, which is also what makes you worth defrauding. The lesson is not to care less. It is to vet faster and hold your money longer.`,
      compromised: `You sent money before the vetting was complete. The amounts grew. When you finally caught the pattern the financial damage was real and the emotional damage was worse. The debrief is clear: no money before she is standing in front of you and her family has accepted you.`,
      fraud_post: `You married her. The pattern that was present from the beginning was present throughout the marriage. After citizenship she was gone. The child is yours. This ending is documented. It has happened to real men. The signals were always there.`,
    },
  },
  aisha: {
    scenes: [
      {
        title: `The First Message`,
        setup: `Aisha responded to your first message in three sentences. No emoji. No exclamation points. She asked one question: 'What brought you to this platform specifically — not online dating generally, but this one.' She is already testing whether you know the difference.`,
        choices: [
        { text: `Answer specifically — what this platform represents that others do not`, consequence: `She writes back the same evening. Longer this time. She says: 'That is the first answer I have received that was not about my photos.' The conversation begins in earnest.`, flag: "specific_answer" },
        { text: `Answer generally — you are looking for a serious woman with good values`, consequence: `She responds: 'That describes every platform. What makes this one different to you?' She is giving you a second chance. Take it.`, flag: "general_answer" },
        { text: `Turn it back — ask her the same question`, consequence: `She appreciates the redirect. She answers specifically. Then: 'Now you answer it.' She was testing whether you would deflect. You did not deflect — you went first by going second. She notes this.`, flag: "redirected" },
        ],
      },
      {
        title: `Her Father`,
        setup: `Two weeks in. She mentions her father casually — he gave a khutbah last Friday that she is still thinking about. She quotes one line from it. Then: 'My father is very involved in who I speak to. I want you to know that before we go further.'`,
        choices: [
        { text: `Tell her you welcome her father's involvement — that is exactly what you are looking for`, consequence: `She goes quiet for a day. Then: 'Most men say that and then struggle when it actually happens. I am going to hold you to it.' She is not a test you pass once.`, flag: "father_welcomed" },
        { text: `Ask about her father — who he is, what he built, what he stands for`, consequence: `She opens. Her father has been in the community for forty years. What she tells you about him tells you everything you need to know about what she expects from a man.`, flag: "father_asked" },
        { text: `Tell her you respect it but want to build the relationship with her first before involving family`, consequence: `She is direct: 'In my family there is no relationship that builds before family involvement. That is not how we do this.' She has told you the terms. They are not negotiable.`, flag: "family_avoided" },
        ],
      },
      {
        title: `The Deen Question`,
        setup: `She asks directly: 'What does your practice look like? Not what you believe — what you actually do.' She has heard beliefs before. She wants to know what your day looks like.`,
        choices: [
        { text: `Answer honestly — what you actually practice, including what you are still working on`, consequence: `She receives the honesty with more respect than she would have received a perfect answer. 'I can work with a man who is honest about where he is. I cannot work with a man who performs what he is not.'`, flag: "honest_practice" },
        { text: `Answer with what your practice is at its best`, consequence: `She listens. She asks one follow-up question that reveals she can tell the difference between a man's best days and his average days. Your answer was about your best days. She knows.`, flag: "best_practice" },
        { text: `Ask her what her practice looks like before answering`, consequence: `She tells you. It is detailed and consistent and clearly the product of a lifetime, not a recent decision. Then she asks again. Your answer now has to meet what she just described.`, flag: "her_practice_first" },
        ],
      },
      {
        title: `The Community`,
        setup: `She tells you she is deeply embedded in her local masjid community. Her social life, her friendships, her family's social life — all of it runs through the same community. She says: 'When I marry, my husband becomes part of that community. Not adjacent to it. Part of it.'`,
        choices: [
        { text: `Tell her you understand — and ask what being part of the community actually requires`, consequence: `She explains specifically. The Friday prayers, the community events, the relationships with the brothers her father knows. You are not joining a building — you are joining a network of relationships that goes back decades.`, flag: "community_understood" },
        { text: `Tell her you have your own community and you hope the two can coexist`, consequence: `She is quiet. Then: 'Coexist is not the word I used. I said he becomes part of it. If your community is healthy that should not be a problem.' She is precise with language. Pay attention.`, flag: "community_coexist" },
        { text: `Ask if her father's approval of a man depends on community membership`, consequence: `She says yes — not formally, but practically. A man her father does not know and cannot vouch for within the community starts at a deficit. You are now thinking about this correctly.`, flag: "community_father_link" },
        ],
      },
      {
        title: `The First Test`,
        setup: `You have been corresponding for six weeks. She goes silent for four days. No explanation. On day five she writes as if no time has passed. She has done this once before — week three. You said nothing then. You need to decide what to say now.`,
        choices: [
        { text: `Name it directly but without accusation: 'I noticed the silence — is everything alright?'`, consequence: `She tells you. A family matter she was not ready to share. She appreciates that you asked without demanding. 'You noticed and you asked right. That is not nothing.'`, flag: "silence_named" },
        { text: `Say nothing — receive her return and continue`, consequence: `She continues. But she has noted the pattern of your non-response. Two weeks later she tells you: 'I went quiet twice to see if you would say anything. You did not. I need a man who notices.'`, flag: "silence_ignored" },
        { text: `Tell her directly that consistency matters to you and silences without explanation are difficult`, consequence: `She respects the boundary. She explains the family matter. She also says: 'My father will want to know you can hold a standard. You just showed me you can.' The boundary landed correctly.`, flag: "consistency_named" },
        ],
      },
      {
        title: `Meeting Her Father`,
        setup: `She arranges a call. Her father, herself, and you. He opens with bismillah and then says: 'I am going to ask you three questions. Take your time with each one.' The first question: 'What is your relationship with Allah?'`,
        choices: [
        { text: `Answer from your actual experience — not theology, your experience`, consequence: `He listens without interruption. When you finish he says: 'That is the answer of a man who has actually been somewhere with this deen.' He asks the second question.`, flag: "authentic_answer" },
        { text: `Answer with correct Islamic language and theology`, consequence: `He listens. Then: 'I asked about your relationship, not your knowledge. Try again.' He is not harsh. He is precise. You understand what he is asking now.`, flag: "theology_answer" },
        { text: `Ask him to clarify what he means by relationship`, consequence: `He pauses. Then he smiles — you hear it. 'Good. A man who asks for clarification before answering is a man who thinks before he speaks.' He explains. Your answer is better for having asked.`, flag: "clarified_first" },
        ],
      },
      {
        title: `The Second Question`,
        setup: `Her father's second question: 'What do you understand about what it means to be a Black Muslim man in America — not Muslim generally, Black Muslim specifically.'`,
        choices: [
        { text: `Answer from knowledge of the specific history — the NOI, the community's origins, the political context`, consequence: `He is forward in his seat. You can hear it. He asks a follow-up. The conversation runs forty minutes past the three questions. Aisha is quiet the whole time. Afterward she tells you: 'He called me after the call. He never calls me after.'`, flag: "history_known" },
        { text: `Answer honestly that you are still learning this history but name what you do know`, consequence: `He respects the honesty. 'A man who knows what he does not know is further along than a man who thinks he knows everything.' He continues with the third question.`, flag: "honest_gap" },
        { text: `Ask him what he thinks it means — you want to hear it from him`, consequence: `He speaks for twenty minutes. What he says becomes the foundation for everything you understand about Aisha and what she was raised inside. You received the teaching. He does not forget that you asked.`, flag: "father_taught" },
        ],
      },
      {
        title: `The Third Question`,
        setup: `Her father's third question. He pauses before asking it. Then: 'My daughter has been waiting a long time. Not because she could not find a man — because she would not settle for less than what she deserves. What makes you believe you are what she deserves?'`,
        choices: [
        { text: `Answer honestly: you do not know yet — but you intend to find out and to prove it through what you do`, consequence: `Silence on the line. Then: 'That is the only honest answer to that question.' He calls Aisha by name. He says something to her in Arabic. She is crying when she answers.`, flag: "honest_humility" },
        { text: `Answer with your qualities, your preparation, your seriousness`, consequence: `He listens. Then: 'Those are things you have done. I asked what makes you believe you deserve my daughter.' The question is different from what you answered. He gives you another chance.`, flag: "qualities_listed" },
        { text: `Tell him you do not believe any man deserves a woman — a man earns the right to try`, consequence: `He is very still. Then: 'Say that again.' You say it again. He says: 'Aisha, did you hear that?' She had heard it the first time. The call ends thirty minutes later. Her father has made his decision.`, flag: "earning_framed" },
        ],
      },
      {
        title: `Atlanta`,
        setup: `You visit Atlanta. Her father meets you at the masjid after Jumu'ah. The community is watching. Not aggressively — the way a community watches when one of their own is being approached. You shake hands with men who are evaluating you without asking a single question.`,
        choices: [
        { text: `Move through the community with dignity — greet everyone, introduce yourself clearly`, consequence: `Her father watches how you move. After the prayers he says to the man standing next to him something you cannot hear. The man nods. You have passed something you did not know you were being tested on.`, flag: "community_dignity" },
        { text: `Stay close to her father — let him lead the introductions`, consequence: `He introduces you to three specific men. The order of introduction matters. You understand later that he was showing you to the people whose opinion he values most. You were being presented.`, flag: "father_led" },
        { text: `Ask her father afterward who the men were that he introduced you to`, consequence: `He tells you. He also tells you why he introduced you in that order. The information tells you more about the community's structure than three months of correspondence could have.`, flag: "introductions_asked" },
        ],
      },
      {
        title: `Her Mother`,
        setup: `Her mother has been present in the background the entire time — mentioned, referenced, consulted — but you have not spoken directly until now. Aisha arranges a separate conversation. Just the two of you. Her mother opens with: 'My husband has told me about you. I want to hear you myself.'`,
        choices: [
        { text: `Speak to her the way you spoke to her husband — honestly, without performance`, consequence: `She listens for twenty minutes. Then: 'You speak to me the same way you spoke to my husband. A man who performs changes register when the audience changes.' She has been watching for this.`, flag: "consistent_register" },
        { text: `Ask her what she needs to know that her husband did not ask`, consequence: `She pauses. Then she asks three things her husband did not ask. They are more personal and more precise. She is asking about your capacity for the daily work of a marriage, not its public face.`, flag: "mother_questions" },
        { text: `Tell her what you told her husband and ask if she has questions`, consequence: `She has questions. Five of them. Each one goes somewhere her husband's questions did not go. By the end she says: 'You passed my husband's test. Mine is different.' She tells you if you passed.`, flag: "mother_test" },
        ],
      },
      {
        title: `The Mahr`,
        setup: `Her father raises the mahr. Not as a transaction — as a conversation about what a commitment looks like in material terms. He names a figure. He explains what it represents. He is not haggling. He is teaching.`,
        choices: [
        { text: `Receive the teaching, ask what the figure represents to the family, then respond`, consequence: `He explains the meaning in full. Your response reflects that you heard the meaning, not just the number. He says: 'You are the first man who asked what it means before asking if it is negotiable.'`, flag: "mahr_meaning" },
        { text: `Agree to the figure without negotiation`, consequence: `He pauses. 'Do you understand what you agreed to?' You tell him yes and explain what you understood. He adjusts one component and explains why. He wanted to see if you would engage or simply comply.`, flag: "mahr_agreed" },
        { text: `Ask what is customary in the community for a mahr`, consequence: `He tells you the range. He also tells you what the number he named represents above the customary amount — and why. This conversation teaches you more about what Aisha's family values than anything else.`, flag: "mahr_customary" },
        ],
      },
      {
        title: `The Nikah Preparation`,
        setup: `The nikah is being planned. Her father wants an imam he trusts to officiate. The imam wants to meet you separately before the ceremony. He is known in the community and his assessment will be final. The meeting is scheduled for after Asr.`,
        choices: [
        { text: `Arrive early, in correct dress, and receive whatever the imam needs to ask`, consequence: `The imam is direct and learned. He asks about your understanding of the nikah contract specifically — not marriage generally, the contract. You have studied it. The meeting runs ninety minutes. He calls her father that evening.`, flag: "imam_prepared" },
        { text: `Ask Aisha what the imam will want to know so you can prepare`, consequence: `She tells you what she knows. She also says: 'He will ask you something I cannot prepare you for. He always does.' The meeting happens. He asks the unprepared question. Your honest answer is better than any prepared one would have been.`, flag: "imam_partially_prepared" },
        { text: `Approach the meeting as a conversation rather than an examination`, consequence: `The imam receives this approach. He says at the end: 'Most men come to be approved. You came to be known. That is different.' He calls her father.`, flag: "imam_conversation" },
        ],
      },
      {
        title: `The Nikah`,
        setup: `The nikah. The masjid is full. Her father's community — forty years of relationships — has gathered. The imam speaks. The contract is read. You are asked to repeat the declaration. The room is completely silent.`,
        choices: [
        { text: `Speak clearly and without hesitation — this moment deserves your full presence`, consequence: `Her father exhales. You hear it. Her mother makes a sound. The room responds. Aisha, behind the partition, hears everything.`, flag: "nikah_present" },
        { text: `Let the weight of the moment be felt — you speak slowly and with full awareness`, consequence: `The imam looks at you when you finish. He says one word in Arabic that her father later translates: it means witnessed. The community has witnessed something real.`, flag: "nikah_weight" },
        { text: `Speak directly to the commitment — not to the room, to Allah`, consequence: `The imam stops after you finish. He says: 'That is how it should be done.' Her father stands. The room follows.`, flag: "nikah_directed" },
        ],
      },
      {
        title: `The Outcome`,
        setup: `The reception. Her father's community surrounds you. Men shake your hand. Women greet Aisha. Her father finds you in the room and stands next to you for a moment without speaking. Then he says one thing.`,
        choices: [
        { text: `SUCCESS: Aisha — Atlanta, Georgia.`, consequence: `SUCCESS: Her father said: 'Welcome to the family.' Four words. Forty years of standards behind them. US Region — complete.`, flag: "success" },
        { text: `SUCCESS: The community received you.`, consequence: `SUCCESS: You did not enter a building. You entered a forty-year network of relationships built on a specific standard. You met that standard. Arc complete.`, flag: "success" },
        { text: `SUCCESS: Arc complete.`, consequence: `SUCCESS: Aisha — Black American Muslim — complete. The US region is the same standard as every other region. You held it.`, flag: "success" },
        ],
      },
    ],
    endings: {
      success: `SUCCESS: Aisha — Atlanta, Georgia. US Region complete.`,
      not_yet: `NOT YET: Aisha — the right woman at the wrong time. The correct answer was to wait. Arc complete.`,
      time_waster: `TIME WASTER: Aisha arc complete. The warmth was real. The readiness was not.`,
      fraud_detected: `FRAUD DETECTED: Aisha arc complete. The pattern was visible. You saw it.`,
      cultural_mismatch: `CULTURAL MISMATCH: Aisha arc complete. The preparation was insufficient. Study the US region resource module before trying again.`,
    },
  },
  deborah: {
    scenes: [
      {
        title: `Her Standard`,
        setup: `Deborah's first message to you is direct: 'I need to tell you upfront what I am and what I am not. I am Hebrew Israelite. I keep the law. I do not eat pork, I keep the Sabbath, I observe the feasts. If you are not prepared to at minimum respect that household, this is not the right conversation.' She has said this to other men. Most did not respond.`,
        choices: [
        { text: `Tell her you respect the standard and want to understand what it looks like in practice`, consequence: `She is surprised by the response. She expected either a dismissal or a performance of enthusiasm. You gave her neither. She begins to explain.`, flag: "standard_respected" },
        { text: `Tell her you share a similar commitment to the law and ask which community she is affiliated with`, consequence: `She answers. She also asks about your community. The conversation enters a register most of her platform interactions never reach.`, flag: "community_asked" },
        { text: `Tell her you are not Hebrew Israelite but are serious and open`, consequence: `She receives the honesty. 'Open is a starting point. I need to know what open means to you practically.' She is not closing the door. She is measuring the opening.`, flag: "honest_difference" },
        ],
      },
      {
        title: `The Sabbath`,
        setup: `Three weeks in. She mentions that she will be unavailable from Friday sundown to Saturday sundown. She does not explain — she simply says 'Shabbat.' Then: 'This is every week. Not occasionally. Every week. I want you to have a picture of what our communication will look like.'`,
        choices: [
        { text: `Tell her you appreciate her being clear about the rhythm upfront`, consequence: `She says: 'The men who struggled with it always found a reason to reach out during that window. Then we would have a problem. I am telling you now so we do not have that problem later.'`, flag: "rhythm_accepted" },
        { text: `Ask her what the Sabbath looks like for her — what she does, what it means`, consequence: `She teaches you for thirty minutes. By the end you understand that the Sabbath is not an absence — it is the center of her week, not the interruption of it. This reframes everything.`, flag: "sabbath_learned" },
        { text: `Tell her you will respect it and that you may have questions as you learn the practice`, consequence: `'Questions are welcome. Violations are not.' She says this warmly but precisely. The distinction is important and she has made it clear.`, flag: "questions_welcomed" },
        ],
      },
      {
        title: `Her Elder`,
        setup: `She tells you her community has an elder — an older man who has been teaching for thirty years. He is not her father but he functions as a spiritual authority in the community. She says: 'Before I bring any man to my family, he speaks with the elder. This is not optional.'`,
        choices: [
        { text: `Agree without hesitation`, consequence: `She notes the speed of agreement. 'You did not ask what the elder will do or say.' You tell her: whatever he needs to know, you will tell him. She goes quiet a moment. This was the right answer.`, flag: "elder_agreed" },
        { text: `Ask what the elder's role is and what he will assess`, consequence: `She explains. He assesses character, not knowledge. He has seen men perform knowledge for decades. He is looking for something knowledge cannot manufacture. She says you will know what it is when he asks his question.`, flag: "elder_role_understood" },
        { text: `Ask if the elder's assessment is final or advisory`, consequence: `She thinks. 'It is final in the sense that I will not proceed against his counsel. But he is wise enough not to counsel based on surface. He will take his time.' You understand the weight.`, flag: "elder_weight_understood" },
        ],
      },
      {
        title: `The Law in the Home`,
        setup: `She is direct about what the household will look like. No pork. Sabbath observed. The feasts kept. She asks: 'I need to know what you actually think about this — not whether you can tolerate it. What do you actually think.'`,
        choices: [
        { text: `Tell her honestly what you know, what you respect, and what you are still learning`, consequence: `She receives this as the most honest answer she has gotten. 'I can build with honest. I cannot build with performance.' She continues.`, flag: "honest_household" },
        { text: `Tell her you believe in the law and want to keep it`, consequence: `She asks a specific question about the law that a man who keeps it would know immediately. The question is not a trap — it is a calibration. Your answer tells her where you actually are.`, flag: "law_claimed" },
        { text: `Tell her the household standard is hers to set and you will honor it`, consequence: `She is quiet. Then: 'That is almost right. The household standard is set by the Most High. I keep it. I need a man who keeps it with me — not a man who tolerates what I keep.' The distinction matters.`, flag: "household_standard" },
        ],
      },
      {
        title: `Her Father`,
        setup: `Her father is a deacon in the community — not Hebrew Israelite, Baptist. She and her father have navigated a religious difference her whole life. She says: 'My father loves me completely and does not fully understand my path. A man who cannot navigate that complexity cannot be in my life.'`,
        choices: [
        { text: `Ask her how she navigates it herself — what has kept the relationship strong across the difference`, consequence: `She talks for twenty minutes about her father. The love between them is real and the difference is real and neither has eliminated the other. You understand what she needs from a man: the capacity to hold complexity without resolving it artificially.`, flag: "complexity_understood" },
        { text: `Tell her you have experience navigating family members with different beliefs`, consequence: `She asks for a specific example. You give one. She listens carefully. 'You did not try to convert them or dismiss them. Good.' She has been watching for this.`, flag: "experience_shared" },
        { text: `Ask if her father will be involved in the marriage process despite the religious difference`, consequence: `She says yes — fully. 'He is my father. The religious difference does not change what he means to this family or what he means to me.' You have learned something important about her.`, flag: "father_role_understood" },
        ],
      },
      {
        title: `Washington D.C.`,
        setup: `You visit D.C. She meets you herself first — same as Elena, she needs to see you before the family does. She takes you to a specific place in the city. She watches how you receive it.`,
        choices: [
        { text: `Be fully present in the place she chose — ask her why she chose it`, consequence: `She tells you. The place has meaning in the community's history. You listen to the full meaning. She says: 'You listened to all of it. Most men wait for me to finish.'`, flag: "place_received" },
        { text: `Observe everything and let her lead`, consequence: `She notices the quality of your observation. She has brought men here before. She says: 'You see things. That is not as common as it should be.'`, flag: "observation_quality" },
        { text: `Ask her what the city means to her community specifically`, consequence: `She teaches you for an hour while you walk. By the time you meet the family you understand the geography of her life in a way that will be visible in how you speak.`, flag: "city_learned" },
        ],
      },
      {
        title: `The Elder's Meeting`,
        setup: `The elder. He is older than you expected. The room is quiet. He offers you water first. He says nothing for two full minutes after you sit. Then: 'Tell me who you are. Not what you do. Who you are.'`,
        choices: [
        { text: `Speak from your actual identity — not your resume, who you are when no one is watching`, consequence: `He listens without moving. When you finish he says: 'You told me something true.' He asks one follow-up question. The meeting runs two hours.`, flag: "identity_spoken" },
        { text: `Ask him what the distinction means to him — between who you are and what you do`, consequence: `He smiles. 'Good. You asked before you answered.' He explains the distinction at length. Your answer is shaped by what he taught you. He receives it as the product of a man who listens.`, flag: "distinction_asked" },
        { text: `Start with your spiritual foundation and build outward from there`, consequence: `He nods as you begin. 'Start there. Always start there.' He receives the rest of your answer in the context of where you started.`, flag: "spirit_first" },
        ],
      },
      {
        title: `The Family Dinner`,
        setup: `Her father's home. Baptist art on the walls. Her mother's cooking everywhere. Her father, who has heard about you from Deborah but not from the elder because the elder keeps his counsel, meets you with a firm handshake and a long look.`,
        choices: [
        { text: `Greet him with respect and let the look land without deflecting it`, consequence: `He nods once. He releases the handshake. He shows you to the table. Her mother comes out of the kitchen. The evening begins.`, flag: "look_received" },
        { text: `Speak to him directly about who you are before he has to ask`, consequence: `He is surprised. He was preparing his questions. You answered them before they were asked. He recalibrates. The conversation that follows is between two men who are both being direct.`, flag: "direct_with_father" },
        { text: `Greet her mother first — she is in the kitchen and has been cooking for this dinner`, consequence: `Her father watches you go to the kitchen first. He says something to Deborah quietly. She tells you later: 'He said you knew who did the work for this dinner.' Her mother was the right first greeting.`, flag: "mother_first" },
        ],
      },
      {
        title: `Her Father's Question`,
        setup: `After dinner. Her father and you, alone. He asks: 'My daughter follows a path I do not fully walk. I have accepted that. What I need to know is whether the man she walks it with will take her further down that path or pull her off it.'`,
        choices: [
        { text: `Tell him you will walk beside her on her path — not ahead of it, not pulling her from it`, consequence: `He is quiet. Then: 'That is the right answer. Now I need to know if you mean it.' He asks you a specific question about the Sabbath. The test is not theological — it is practical. Do you understand what you are agreeing to?`, flag: "path_answer" },
        { text: `Tell him you are committed to the household she has built — and that it is a household worth being committed to`, consequence: `He looks at you a long time. 'You said something about her household that most men do not see.' He shifts the conversation. He is not finished but something has been established.`, flag: "household_valued" },
        { text: `Ask him what pulling her off the path would look like — you want to know what to avoid specifically`, consequence: `He tells you. Specifically. The list is precise and personal and built from watching his daughter for twenty-nine years. It is the most useful information anyone has given you in this entire arc.`, flag: "father_specific" },
        ],
      },
      {
        title: `The Elder's Word`,
        setup: `The elder calls Deborah. She tells you what he said. He said: 'He is the kind of man who can be taught. That is rarer than the kind who already knows everything.' His word to the community is favorable. Her father has heard.`,
        choices: [
        { text: `Ask Deborah what 'can be taught' means to the elder specifically`, consequence: `She explains. A man who already knows everything stops learning. A man who can be taught keeps growing. The elder values trajectory over position. You are now thinking about your growth as your most important quality.`, flag: "elder_word_understood" },
        { text: `Tell Deborah the elder's assessment humbles you and motivates you`, consequence: `She is quiet. Then: 'He will want to know you said that.' She tells him. He sends word back: 'Good.' One word from the elder carries the weight of a paragraph from anyone else.`, flag: "humble_response" },
        { text: `Ask to send the elder a formal acknowledgment of his time and counsel`, consequence: `Deborah pauses. 'No one has asked to do that before.' She arranges it. The elder receives the acknowledgment. He tells the community he met a man who knows how to receive counsel. This reaches her father.`, flag: "elder_acknowledged" },
        ],
      },
      {
        title: `The Agreement`,
        setup: `Her father, her mother, and Deborah. A family meeting at the table. Her father speaks first. He says he has prayed about this. He says the elder has spoken. He says he has watched his daughter for twenty-nine years and knows what she needs. He gives his blessing with one condition.`,
        choices: [
        { text: `Receive the blessing and ask the condition before agreeing to it`, consequence: `His condition: you will never use the religious difference between you and him as a wedge. You and he may walk different paths but you will always walk toward each other as family. You agree. He extends his hand.`, flag: "condition_received" },
        { text: `Tell him you accept the blessing and any condition he names`, consequence: `He names the condition. He watches your face when he names it. He is watching for hesitation. There is none. He nods.`, flag: "condition_accepted" },
        { text: `Thank him for the blessing and tell him the condition is already how you intend to live`, consequence: `He looks at Deborah. She is already crying. He says: 'He said it before I finished.' Her mother stands and goes to the kitchen. The sounds from the kitchen are celebratory.`, flag: "condition_anticipated" },
        ],
      },
      {
        title: `The Ceremony`,
        setup: `The ceremony is officiated by the elder from the community and attended by her father's pastor as a witness — a gesture Deborah arranged herself to honor both sides of her family's faith. Her father did not expect this. When he sees the pastor, he puts his hand on Deborah's face briefly.`,
        choices: [
        { text: `SUCCESS: Deborah — Washington D.C.`, consequence: `SUCCESS: She arranged the ceremony to honor both worlds her family lives in. You married a woman who already knew how to hold complexity with love. US Region — complete.`, flag: "success" },
        { text: `SUCCESS: The elder and the pastor stood in the same room.`, consequence: `SUCCESS: Because Deborah made them. That is who you married. Arc complete.`, flag: "success" },
        { text: `SUCCESS: Arc complete.`, consequence: `SUCCESS: Deborah — Black American Hebrew Israelite — complete.`, flag: "success" },
        ],
      },
      {
        title: `After`,
        setup: `Her father finds you after the ceremony. He shakes your hand again. He says four words: 'Take care of her.'`,
        choices: [
        { text: `SUCCESS: You tell him: I will.`, consequence: `SUCCESS: Two words back. He holds the handshake one moment longer. Then he releases it and goes to find his wife. The arc is complete.`, flag: "success" },
        { text: `SUCCESS: Arc complete.`, consequence: `SUCCESS: Deborah — complete.`, flag: "success" },
        { text: `SUCCESS: The US region holds the same standard as every other region on this platform.`, consequence: `SUCCESS: You held it. Certificate of Commission — US region stamp earned.`, flag: "success" },
        ],
      },
    ,
      {
        title: `What She Carries`,
        setup: `The week before the ceremony. Deborah calls you. She says: 'I want to tell you something I have not told anyone outside my family. Not because it is a problem — because it is part of who I am and you should know it before tomorrow.' She tells you about a period three years ago when she nearly left the community. She stayed. She needs to know you understand why staying was the harder and more important choice.`,
        choices: [
          { text: `Tell her you understand why staying was the choice that made her who she is`, consequence: `She is quiet. Then: 'You understood it without me explaining the theology.' She had been preparing to explain. You already knew. The call ends shortly after. Tomorrow she will carry this forward.`, flag: "staying_understood" },
          { text: `Ask her what made her stay`, consequence: `She tells you. The answer is the most complete picture of her character you have received in the entire arc. The call runs ninety minutes. By the end you know exactly who you are marrying and why.`, flag: "staying_asked" },
          { text: `Tell her you are glad she stayed — and that you can see why it cost something`, consequence: `She says: 'That is the right thing to say.' Then: 'I mean it is actually right, not just kind.' You know the difference. She knows you know.`, flag: "cost_named" },
        ],
      }
    ],
    endings: {
      success: `SUCCESS: Deborah — Washington D.C.. US Region complete.`,
      not_yet: `NOT YET: Deborah — the right woman at the wrong time. The correct answer was to wait. Arc complete.`,
      time_waster: `TIME WASTER: Deborah arc complete. The warmth was real. The readiness was not.`,
      fraud_detected: `FRAUD DETECTED: Deborah arc complete. The pattern was visible. You saw it.`,
      cultural_mismatch: `CULTURAL MISMATCH: Deborah arc complete. The preparation was insufficient. Study the US region resource module before trying again.`,
    },
  },
  kezia: {
    scenes: [
      {
        title: `What She Believes`,
        setup: `Kezia opens the conversation with: 'I am going to tell you what I believe and I need to know what you believe before we spend more time on this. Not denomination — what you actually believe.' She has been on two other platforms where this question came up too late.`,
        choices: [
        { text: `Tell her what you actually believe — starting with what you are certain of and honest about what you are not`, consequence: `She is quiet for a day. Then: 'That is the first honest answer I have received on any platform. Most men perform certainty they do not have.' The conversation begins.`, flag: "honest_belief" },
        { text: `Ask her what she believes first — you want to hear her before she hears you`, consequence: `She goes first. By the time she finishes you understand exactly what she is looking for and what she is not looking for. Your answer is shaped by that understanding.`, flag: "her_belief_first" },
        { text: `Tell her your faith background and practice`, consequence: `She listens. She asks one follow-up. 'You told me what you do. I asked what you believe.' She is precise. The distinction matters to her.`, flag: "practice_not_belief" },
        ],
      },
      {
        title: `Her Pastor`,
        setup: `She mentions her pastor early. He has been her pastor since she was a child. He married her parents. He buried her grandmother. She says: 'He will want to speak with any man I am seriously considering. He is not going to ask you to convert to anything. He is going to ask you who you are.'`,
        choices: [
        { text: `Tell her you welcome it`, consequence: `'You said that fast.' She notes the speed. 'The men who struggled with it always hesitated first.' You did not hesitate. She moves forward.`, flag: "pastor_welcomed" },
        { text: `Ask what her pastor is like`, consequence: `She describes him. What she describes tells you everything about what she values in leadership, in wisdom, and in a man. You are taking notes.`, flag: "pastor_described" },
        { text: `Ask if her pastor has ever disapproved of a man she was considering`, consequence: `She pauses. 'Once.' She tells you why. The reason is precise and correct and the disapproval was right. She trusted his judgment then. She is telling you she will trust it again.`, flag: "pastor_history" },
        ],
      },
      {
        title: `Her Family's Expectations`,
        setup: `Her father is a deacon. Her mother leads the women's ministry. Her older brother is protective in a way that is present without being aggressive. She says: 'My family has a standard. It is not a secret standard. Every man I have introduced to them has known the standard before he arrived.'`,
        choices: [
        { text: `Ask her to tell you the standard explicitly`, consequence: `She names five things. They are not complicated. They are consistent. She has been clear about them her whole adult life and the men who struggled with them struggled because they were not honest about who they were from the beginning.`, flag: "standard_named" },
        { text: `Tell her you appreciate the transparency`, consequence: `'Transparency is the floor, not the ceiling.' She is warm but precise. She continues.`, flag: "transparency_floor" },
        { text: `Tell her you will hold the standard`, consequence: `She says: 'I need to know you have a standard of your own before I need you to hold mine.' She is looking for a man with his own foundation, not a man who borrows hers.`, flag: "own_standard" },
        ],
      },
      {
        title: `Houston`,
        setup: `You arrive in Houston. The heat is immediate. Her brother meets you at the airport. He is large, quiet, and watching everything. He says almost nothing on the drive. He takes you to the family home without offering a tour of the city.`,
        choices: [
        { text: `Let the silence be what it is — match his pace`, consequence: `Halfway there he says one thing: 'She has not brought anyone home in three years.' You understand what that means. You say: 'I understand why.' He nods once.`, flag: "silence_matched" },
        { text: `Initiate conversation — ask him about himself`, consequence: `He answers briefly. He asks you one question. Your answer to his one question tells him more than twenty questions would have. He calls his mother from the car. He says: 'He is real.'`, flag: "brother_engaged" },
        { text: `Thank him for coming to get you`, consequence: `He nods. The rest of the drive is quiet. When you arrive he introduces you to his mother before his father. You understand later this was intentional — his mother's read of you goes first.`, flag: "brother_thanked" },
        ],
      },
      {
        title: `Her Mother`,
        setup: `Her mother embraces Kezia when she sees her. Then she turns to you. She looks at you the way a woman who has raised a child for twenty-six years looks at the man who wants to be in that child's life. Then she smiles. She says: 'Come eat.'`,
        choices: [
        { text: `Follow her to the table and eat what she made with genuine appreciation`, consequence: `She watches you eat. Her husband watches her watch you. Her brother watches all of it. The meal becomes a conversation that runs two hours past the food.`, flag: "meal_genuine" },
        { text: `Help her in the kitchen before sitting down`, consequence: `She stops. She looks at Kezia. Kezia is looking at the wall. Her mother says: 'He can stay.' She is only half joking.`, flag: "kitchen_help" },
        { text: `Ask her about the food — specifically, not generically`, consequence: `She lights up. She explains the dish. Its history in her family. Who taught her. The conversation begins in the kitchen and does not end until after the dishes are done.`, flag: "food_asked" },
        ],
      },
      {
        title: `Her Father the Deacon`,
        setup: `Her father meets you after the meal. He is deliberate and warm and asks questions in the way a man who has led a congregation asks questions — he already knows the answers, he is watching how you arrive at them. He asks: 'What does a husband owe his wife?'`,
        choices: [
        { text: `Answer from scripture and from your own conviction`, consequence: `He listens completely. He asks a follow-up. Your follow-up answer is better than your first. He says: 'A man who improves on his first answer is a man who is actually thinking.' He stands and extends his hand.`, flag: "scripture_conviction" },
        { text: `Answer from your own understanding before going to scripture`, consequence: `He notes the order. 'You answered from yourself first. Then from the word. That is the right order for a man who actually lives it.' He continues.`, flag: "own_understanding_first" },
        { text: `Ask him what he believes a husband owes a wife before answering`, consequence: `He smiles. 'I am asking you.' You answer. Then you ask him. He answers for twenty minutes. What he says is the foundation of what Kezia was raised inside. You needed to hear it.`, flag: "father_asked_back" },
        ],
      },
      {
        title: `The Pastor`,
        setup: `Sunday morning. You attend the service with the family. The pastor is exactly what Kezia described. After the service he finds you. He shakes your hand and says: 'Walk with me.'`,
        choices: [
        { text: `Walk with him wherever he leads`, consequence: `He takes you around the building. He shows you things. He tells you the history of the church. He is not talking about the building — he is talking about what Kezia grew up inside. By the time you are outside he has told you who she is in this community.`, flag: "pastor_walk" },
        { text: `Tell him it is an honor to be in the service`, consequence: `He receives it. Then: 'Tell me about yourself. Not your background. Yourself.' He has the same precision Kezia has. You understand where she learned it.`, flag: "honor_expressed" },
        { text: `Ask him how long he has known Kezia's family`, consequence: `He says thirty years. He tells you one story about Kezia as a child. The story tells you what she was before the world got to her. You carry this through the rest of the arc.`, flag: "pastor_history" },
        ],
      },
      {
        title: `The Pastor's Assessment`,
        setup: `The pastor calls Kezia's father that afternoon. Kezia tells you that evening what he said. He said: 'He is genuine. Watch whether he is consistent.' The pastor never gives more than that after a first meeting. This is more than he usually gives.`,
        choices: [
        { text: `Tell Kezia the pastor's standard is the right standard — consistency over time is all that matters`, consequence: `She says: 'That is exactly what he would say if I told him what you just said.' The alignment is not performed — it is real. She notices.`, flag: "consistency_understood" },
        { text: `Ask Kezia what genuine means to the pastor specifically`, consequence: `She thinks. 'He uses that word for men who are the same in the room as they are outside of it.' You understand. You ask her if she has seen that in you. She says yes. So far.`, flag: "genuine_defined" },
        { text: `Ask what it would take to demonstrate consistency to him over time`, consequence: `She says: 'He will see it without you demonstrating it. That is the point.' You understand. Consistency is not performed for the pastor. It is lived and he will know.`, flag: "consistency_lived" },
        ],
      },
      {
        title: `The Agreement`,
        setup: `Her father calls a family meeting. The brother is there. Her mother. Her father speaks briefly. He says the pastor's word carries weight and his own observation confirms it. He gives his blessing. Her brother shakes your hand — the first time he has initiated contact.`,
        choices: [
        { text: `Receive the blessing with genuine gratitude — name specifically what it means to you`, consequence: `Her father nods at each thing you name. Her mother reaches over and touches your arm briefly. Her brother, still holding the handshake, tightens his grip once.`, flag: "blessing_named" },
        { text: `Thank each person in the room individually`, consequence: `Her father says: 'He thanked each of us.' He says it to her mother. As if he needed to confirm it happened. Her mother says: 'I know.' She had been watching.`, flag: "individual_thanks" },
        { text: `Ask her father if there is anything else he needs from you before you proceed`, consequence: `He thinks. 'Just keep being what you have been this weekend.' He stands. The meeting is over. It was the shortest and most complete answer he could have given.`, flag: "father_asked" },
        ],
      },
      {
        title: `The Ceremony`,
        setup: `The ceremony is at the church. The pastor officiates. Her family fills the front rows. Her brother stands beside you. When the pastor asks who stands for this man, her brother steps forward.`,
        choices: [
        { text: `SUCCESS: Kezia — Houston, Texas.`, consequence: `SUCCESS: Her brother stepped forward. The quiet man who watched everything chose to stand beside you. US Region — complete.`, flag: "success" },
        { text: `SUCCESS: The pastor said 'consistent.' You were.`, consequence: `SUCCESS: Arc complete. Kezia — Black American Christian — complete.`, flag: "success" },
        { text: `SUCCESS: Arc complete.`, consequence: `SUCCESS: Houston — complete.`, flag: "success" },
        ],
      },
      {
        title: `After`,
        setup: `Her father finds you at the reception. He pulls you aside. He says: 'My daughter chose correctly. Do not make her regret it.'`,
        choices: [
        { text: `SUCCESS: You tell him: I will not.`, consequence: `SUCCESS: He holds your gaze one moment. He believes you. Arc complete.`, flag: "success" },
        { text: `SUCCESS: Arc complete.`, consequence: `SUCCESS: Kezia — complete.`, flag: "success" },
        { text: `SUCCESS: The US region — complete.`, consequence: `SUCCESS: Certificate of Commission — US region stamp earned.`, flag: "success" },
        ],
      },
    ,
      {
        title: `Her Brother Speaks`,
        setup: `The evening of your second day in Houston. Her brother asks to speak with you alone. He takes you outside. He says: 'I do not ask men questions. I watch them. I have been watching you since the airport. I have one thing to say.'`,
        choices: [
          { text: `Listen completely`, consequence: `He says: 'She has not been happy in a long time. Whatever you are doing, keep doing it.' He goes back inside. He has said everything he needed to say.`, flag: "brother_spoke" },
          { text: `Tell him you appreciate him watching and ask what he saw`, consequence: `He looks at you. 'I saw you eat without performing. I saw you ask my mother about the food before you complimented it. I saw you look at my sister when she was not looking at you.' He goes inside. You understand what he was watching for.`, flag: "brother_saw" },
          { text: `Tell him you intend to make his sister happy`, consequence: `He nods once. 'I know. That is why I am talking to you instead of not talking to you.' He goes inside. The bar was set correctly and you passed it.`, flag: "brother_nod" },
        ],
      },
      {
        title: `The Sunday Service`,
        setup: `Sunday morning. The whole family at church. You are with them. The pastor sees you from the pulpit before the service begins. He holds your gaze for a moment and then looks away. The service is full and long and the congregation is alive in a way you did not expect.`,
        choices: [
          { text: `Be fully present in the service — not performing worship, but not standing apart from it either`, consequence: `Kezia notices. Afterward: 'You were there. You were not just sitting there.' The difference matters to her more than she can explain.`, flag: "service_present" },
          { text: `Follow the family's lead throughout the service`, consequence: `Her father notices you following rather than leading in a context where you do not know the form. He tells her mother: 'He knows how to follow when it is not his territory.' Her mother says: 'That will matter later.'`, flag: "service_following" },
          { text: `Find something genuine to connect with in the service`, consequence: `The music. You let the music be what it is. Kezia sees your face during one particular song. She tells you later: 'That song was my grandmother's song. I watched your face when it played.' You had not known that.`, flag: "service_genuine" },
        ],
      },
      {
        title: `Before You Leave`,
        setup: `Your last morning in Houston. Her father makes breakfast himself — something her mother usually does. He plates it and puts it in front of you without comment. Her mother watches from the doorway.`,
        choices: [
          { text: `Receive it — eat what he made and tell him specifically what is good about it`, consequence: `He sits across from you while you eat. He watches you the way he watched Kezia grow up — with the specific attention of a man who is paying close attention to something that matters to him. The breakfast is the goodbye.`, flag: "breakfast_received" },
          { text: `Ask him why he cooked this morning`, consequence: `He thinks. Then: 'I wanted to do something for the person my daughter chose.' He says it simply. It is the most direct thing he has said to you all weekend. Her mother wipes her eyes in the doorway.`, flag: "breakfast_asked" },
          { text: `Thank him and her mother together before you leave`, consequence: `He nods. Her mother hugs you — the first time. She says one thing: 'Come back soon.' Not for a visit. Come back. You are already family.`, flag: "parents_thanked" },
        ],
      }
    ],
    endings: {
      success: `SUCCESS: Kezia — Houston, Texas. US Region complete.`,
      not_yet: `NOT YET: Kezia — the right woman at the wrong time. The correct answer was to wait. Arc complete.`,
      time_waster: `TIME WASTER: Kezia arc complete. The warmth was real. The readiness was not.`,
      fraud_detected: `FRAUD DETECTED: Kezia arc complete. The pattern was visible. You saw it.`,
      cultural_mismatch: `CULTURAL MISMATCH: Kezia arc complete. The preparation was insufficient. Study the US region resource module before trying again.`,
    },
  },
  marisol: {
    scenes: [
      {
        title: `The Opening`,
        setup: `Marisol writes first. Her message is warm and specific — she references something in your profile that most people skim past. She asks: 'What does home mean to you? Not where you are from. What home means.'`,
        choices: [
        { text: `Answer specifically and from your actual experience of home`, consequence: `She responds the same day. Her answer is longer than her question. The conversation enters a register that most opening exchanges never reach.`, flag: "home_specific" },
        { text: `Ask her what prompted the question`, consequence: `She explains. Home is the thing she is most careful about — a man who does not know what home means to him cannot build one. Your answer after her explanation is shaped by knowing what she is actually asking.`, flag: "question_prompted" },
        { text: `Answer and then ask the same question back`, consequence: `She answers. What she describes is built on three generations of women who kept a home that held everything together. You are now understanding what you are being considered for.`, flag: "home_reciprocal" },
        ],
      },
      {
        title: `Her Grandmother`,
        setup: `Two weeks in. Marisol mentions her grandmother constantly — not as an aside, as a reference point. Her grandmother's opinion is present in every decision Marisol describes making. She says: 'My grandmother is still alive. She is 84. She is the head of this family. No one will tell you that officially but everyone knows it.'`,
        choices: [
        { text: `Ask to hear about her grandmother — who she is, what she built`, consequence: `Marisol speaks for forty minutes without stopping. The grandmother is the clearest picture of who Marisol is becoming. You have just received the most important briefing of this arc.`, flag: "grandmother_asked" },
        { text: `Tell Marisol you look forward to meeting her grandmother`, consequence: `She goes quiet. Then: 'You said that like it is a given.' You tell her it is. She says: 'Most men avoid the grandmother.' You are not most men.`, flag: "grandmother_anticipated" },
        { text: `Ask if her grandmother approves of who Marisol speaks to on the platform`, consequence: `She laughs. 'My grandmother does not know what a platform is. But she knows everything that matters. She will know about you within twenty-four hours of you meeting her.'`, flag: "grandmother_dynamic" },
        ],
      },
      {
        title: `The Faith Conversation`,
        setup: `She asks about your faith directly. She says: 'I am not asking if you are Catholic. I am asking if you have a spiritual life. My grandmother married a man who did not and it cost the family something that took two generations to recover from.'`,
        choices: [
        { text: `Answer honestly about your spiritual life and its foundation`, consequence: `She listens completely. Then: 'You did not apologize for what you are or perform what you are not. That is what I needed to hear.' The conversation deepens.`, flag: "spiritual_honest" },
        { text: `Ask what the two generations cost the family — you want to understand what she is protecting against`, consequence: `She tells you. The story is specific and painful and important. What she is protecting against is not absence of Catholicism — it is absence of spiritual foundation. You understand the distinction.`, flag: "cost_understood" },
        { text: `Tell her your spiritual foundation and ask if it is compatible with her family's life`, consequence: `She thinks carefully. 'Compatible is not the same as identical. My grandmother married a man who shared nothing and it broke something. I am not asking for identical. I am asking for real.' You hear the difference.`, flag: "compatible_not_identical" },
        ],
      },
      {
        title: `Chicago`,
        setup: `You arrive in Chicago in November. The cold is immediate. Marisol meets you herself. She takes you to her grandmother's house before anyone else — not her parents, her grandmother. She says: 'This is the right order.'`,
        choices: [
        { text: `Trust the order she has chosen — she knows her family`, consequence: `The grandmother's house smells like everything good. The grandmother is small and precise and her eyes miss nothing. She speaks to Marisol in Spanish. Marisol translates: 'She says you have good posture. She believes posture tells you everything.'`, flag: "order_trusted" },
        { text: `Ask Marisol on the way why the grandmother comes first`, consequence: `She explains. The grandmother's read of a man is final. Her parents have learned to wait for it. If the grandmother does not approve the parents do not proceed. The order is not custom — it is protocol.`, flag: "order_explained" },
        { text: `Prepare yourself on the walk to the door — whatever this is, be present for it`, consequence: `The grandmother opens the door before you knock. She looks at you for a long moment. She says one word to Marisol. Marisol squeezes your arm.`, flag: "prepared_presence" },
        ],
      },
      {
        title: `The Grandmother`,
        setup: `The grandmother makes you sit across from her. She speaks only Spanish. Marisol translates everything. The grandmother asks four questions. The first three are practical. The fourth: 'Do you know how to pray?'`,
        choices: [
        { text: `Answer honestly — what your prayer practice is and what it means to you`, consequence: `The grandmother listens to the translation. She is quiet a long time. Then she speaks. Marisol translates with tears forming: 'She says a man who prays honestly is a man who can be trusted with what she loves.'`, flag: "prayer_honest" },
        { text: `Ask the grandmother what prayer means to her — before you answer`, consequence: `The grandmother looks at Marisol. She speaks. Marisol translates: 'She says you asked the right question.' She answers at length. Your answer comes after. It is shaped by hers.`, flag: "grandmother_prayer_first" },
        { text: `Answer in a way that honors her tradition and your own simultaneously`, consequence: `The grandmother listens to the translation. She speaks one sentence. Marisol translates: 'She says you held both things at once. That is a man who can hold a family.'`, flag: "both_honored" },
        ],
      },
      {
        title: `Her Parents`,
        setup: `Her parents know the grandmother has met you. They know the grandmother's word before you arrive. Her father opens the door. He says: 'My mother called.' The call was apparently brief. He extends his hand warmly.`,
        choices: [
        { text: `Thank him for receiving you`, consequence: `He says: 'My mother does not call for men she does not approve of. You are the third man Marisol has brought here and the first my mother called about.' He takes you inside.`, flag: "father_warm" },
        { text: `Ask him what his mother said`, consequence: `He laughs. 'She said his posture is good and he knows how to pray.' He looks at you. 'From my mother, that is a full endorsement.' Her mother comes from the kitchen.`, flag: "mother_word_asked" },
        { text: `Greet him and let him lead`, consequence: `He leads you through the house. He shows you photographs. He is narrating the family history through the photographs. You are receiving an orientation. You give it the attention it deserves.`, flag: "father_led" },
        ],
      },
      {
        title: `The Agreement`,
        setup: `After dinner. Her father and mother together. Her father speaks for both of them. He says the grandmother's approval means everything. He says he has watched Marisol her whole life wait for a man who was real. He gives his blessing. He has one request.`,
        choices: [
        { text: `Hear the request before agreeing to it`, consequence: `His request: bring her to Chicago for the grandmother's birthday every year. As long as the grandmother lives. You agree immediately. He says: 'You did not hesitate.' You tell him there was nothing to hesitate about.`, flag: "request_heard" },
        { text: `Tell him you accept the blessing and his request before he names it`, consequence: `He stops. 'I have not told you what it is.' You tell him whatever connects Marisol to her grandmother will never be negotiated away by you. He looks at his wife. His wife looks at Marisol.`, flag: "request_anticipated" },
        { text: `Ask if the grandmother will be part of the ceremony`, consequence: `He is surprised by the question. He had not thought to ask. He looks at his wife. She immediately begins making calls. The grandmother will be present. Her father thanks you for asking.`, flag: "grandmother_ceremony_asked" },
        ],
      },
      {
        title: `The Ceremony`,
        setup: `The ceremony is at the family's parish. The grandmother sits in the front row. She dressed herself in something she has kept in her closet for years. Marisol told you later the grandmother had been saving it for this.`,
        choices: [
        { text: `SUCCESS: Marisol — Chicago, Illinois.`, consequence: `SUCCESS: The grandmother saved something for this day. US Region — complete.`, flag: "success" },
        { text: `SUCCESS: The posture and the prayer were enough.`, consequence: `SUCCESS: The grandmother's standard was precise and complete. You met it. Arc complete.`, flag: "success" },
        { text: `SUCCESS: Arc complete.`, consequence: `SUCCESS: Marisol — Latina Catholic — complete.`, flag: "success" },
        ],
      },
      {
        title: `After`,
        setup: `The grandmother finds you at the reception. She takes your face in both hands. She says one sentence in Spanish. Marisol translates: 'She says take her to Mass when you can. It does not have to be every week. Just sometimes.'`,
        choices: [
        { text: `SUCCESS: You tell her: I will.`, consequence: `SUCCESS: She pats your face once and lets go. She turns to find someone to sit with. Arc complete.`, flag: "success" },
        { text: `SUCCESS: Arc complete.`, consequence: `SUCCESS: Marisol — complete.`, flag: "success" },
        { text: `SUCCESS: US Region — complete.`, consequence: `SUCCESS: Certificate of Commission — US region stamp earned.`, flag: "success" },
        ],
      },
    ,
      {
        title: `Her Father`,
        setup: `Her father is quieter than her mother and her grandmother. He works with his hands — a contractor who has built things in Chicago for thirty years. He shakes your hand and looks at your hands when he does it. He says nothing about what he sees.`,
        choices: [
          { text: `Meet the handshake fully and let the look happen`, consequence: `He nods. He takes you to show you something he built in the basement of the house — a piece of furniture he made for Marisol when she was ten. He is showing you something without explaining it.`, flag: "father_handshake" },
          { text: `Ask him about his work`, consequence: `He talks for twenty minutes. His work is his life in the way that most people's lives are not their work. By the time he stops talking you understand what hands-built-things mean in this family and what a man who uses his hands is worth in their estimation.`, flag: "father_work" },
          { text: `Tell him the house is well built — you noticed specific things`, consequence: `He stops. He looks at you. 'You said specific things.' He calls his wife from the kitchen. He says something in Spanish. She responds from the kitchen. He smiles.`, flag: "father_specific" },
        ],
      },
      {
        title: `The Grandmother's Second Meeting`,
        setup: `Day two. The grandmother asks to see you again alone. No Marisol this time. She has her granddaughter take you to the door and then sends her away. She speaks for twenty minutes in Spanish. She pauses every few minutes and watches your face.`,
        choices: [
          { text: `Listen completely even though you do not understand the words — your attention is the answer`, consequence: `When she finishes she says one thing in English, clearly: 'Good. You listened to what you could not understand. That is what marriage is.' She calls Marisol back in.`, flag: "grandmother_listened" },
          { text: `Ask her at the end what she told you`, consequence: `She has Marisol translate. What she said was the history of the family — the full version, the one she has never told a man before. She tells Marisol: 'He earned it by staying present.'`, flag: "grandmother_history" },
          { text: `Tell her through Marisol afterward that the conversation meant something even without the words`, consequence: `The grandmother hears the translation. She says something. Marisol's eyes fill. She translates: 'My grandmother says that is the right understanding of what a family teaches a man before it receives him.'`, flag: "grandmother_teaching" },
        ],
      },
      {
        title: `The Family's Chicago`,
        setup: `Marisol takes you through the neighborhood her family has lived in for thirty years. She shows you the church, the market her mother has gone to every Saturday since before Marisol was born, the school her parents sent her to. She is showing you the geography of who she is.`,
        choices: [
          { text: `Ask about each place she shows you — what it means, what happened there`, consequence: `She tells stories for two hours. By the end you know the neighborhood the way someone who grew up there knows it. She says: 'You asked about everything. Most people just walk through.'`, flag: "neighborhood_asked" },
          { text: `Let the showing happen without narrating — receive what she shows you`, consequence: `She notices the quality of your reception. At the end: 'You did not try to say something smart about everything I showed you. You just received it.' This is a form of respect she needed to see.`, flag: "neighborhood_received" },
          { text: `Tell her something you noticed that she did not point out`, consequence: `She stops. She looks at what you noticed. 'I have walked this street a thousand times and never seen that.' You saw something she did not. She calls her mother from the street.`, flag: "neighborhood_noticed" },
        ],
      },
      {
        title: `Her Parents' Agreement`,
        setup: `The night before you leave. Her parents, her grandmother, and Marisol. The grandmother speaks first — in Spanish. Marisol translates phrase by phrase. The grandmother says she has given her blessing and she names her reasons publicly for the family to witness.`,
        choices: [
          { text: `Receive the public blessing with full presence — this is a ceremony even if it does not feel like one`, consequence: `Her father stands when the grandmother finishes. He speaks briefly. Marisol translates: 'He says the grandmother's word is the family's word.' He extends his hand again. This handshake is different from the first one.`, flag: "public_blessing" },
          { text: `Thank the grandmother publicly — in front of the family, directly`, consequence: `The grandmother was not expecting to be thanked in front of the family. She looks at Marisol. She says something. Marisol laughs through tears. Translation: 'She says most men thank the father. You thanked her. She approves.'`, flag: "grandmother_thanked" },
          { text: `Ask the grandmother what she wants you to carry forward from this family`, consequence: `She thinks for a long time. Then she names one thing. It is not a rule — it is a value. The value is specific to this family and to what they have built over three generations. You receive it. You will carry it.`, flag: "grandmother_value" },
        ],
      },
      {
        title: `The Ceremony`,
        setup: `The wedding is at the family's parish. Three generations of this family have had their sacraments here. The priest has known Marisol since her baptism. The grandmother is in the front row in the dress she saved.`,
        choices: [
          { text: `SUCCESS: Marisol — Chicago, Illinois.`, consequence: `SUCCESS: The grandmother saved the dress. The priest has known her since her baptism. The neighborhood, the market, the thirty years, the hands that built the furniture — all of it was the context you were received into. US Region — complete.`, flag: "success" },
          { text: `SUCCESS: The grandmother's second meeting was the real ceremony.`, consequence: `SUCCESS: Everything after that was confirmation. Arc complete.`, flag: "success" },
          { text: `SUCCESS: Arc complete.`, consequence: `SUCCESS: Marisol — Latina Catholic — complete.`, flag: "success" },
        ],
      }
    ],
    endings: {
      success: `SUCCESS: Marisol — Chicago, Illinois. US Region complete.`,
      not_yet: `NOT YET: Marisol — the right woman at the wrong time. The correct answer was to wait. Arc complete.`,
      time_waster: `TIME WASTER: Marisol arc complete. The warmth was real. The readiness was not.`,
      fraud_detected: `FRAUD DETECTED: Marisol arc complete. The pattern was visible. You saw it.`,
      cultural_mismatch: `CULTURAL MISMATCH: Marisol arc complete. The preparation was insufficient. Study the US region resource module before trying again.`,
    },
  },
  samira: {
    scenes: [
      {
        title: `Why She Reverted`,
        setup: `She tells you in the second week without being asked: 'I know you are going to wonder about my background so I will tell you directly. I am Puerto Rican. I took shahada four years ago. My family is Catholic. It has been complicated. My faith is real. I am not a temporary Muslim.'`,
        choices: [
        { text: `Receive it without drama — ask what the four years have been like`, consequence: `She exhales. 'You did not ask why I converted. Everyone asks why. You asked what the four years have been like.' She tells you. The four years are the most important part.`, flag: "four_years_asked" },
        { text: `Tell her you respect what it costs to choose a faith against your family's current`, consequence: `She is quiet. Then: 'You understood the cost without me explaining it.' She continues.`, flag: "cost_understood" },
        { text: `Ask about her family's specific concerns about her conversion`, consequence: `She tells you. They are not theological — they are cultural. They are afraid of losing her to something foreign. She has spent four years proving that she is still herself. The faith deepened her, it did not replace her.`, flag: "family_concerns" },
        ],
      },
      {
        title: `Her Family's Position`,
        setup: `Her mother calls every Sunday. Her father stopped calling for eight months after the shahada and then came back. Her brother has never raised the subject. She says: 'My family loves me. They do not understand my path. A man who cannot navigate family members who do not understand his wife's faith cannot be in my life.'`,
        choices: [
        { text: `Tell her you have thought about this and ask her how she navigates it herself`, consequence: `She teaches you for an hour. The skill she has developed — holding her faith fully while remaining fully present in her family — is a skill she needs a husband to also have. You are taking notes.`, flag: "navigation_learned" },
        { text: `Tell her you can navigate it and ask what specifically it requires`, consequence: `She names three things. They are not complicated. They require consistency and respect and the willingness to not make her family the enemy. You can do all three.`, flag: "navigation_specific" },
        { text: `Ask her whether her family's position has softened in four years`, consequence: `She says yes — slowly. Her mother now asks about Ramadan. Her father has stopped saying things that hurt. Her brother started saying salaam when he leaves. These are small things. To her they are everything.`, flag: "family_softening" },
        ],
      },
      {
        title: `The Practice`,
        setup: `She is specific about her practice. She prays five times. She wears hijab. She does not drink. She does not eat pork. She fasts Ramadan fully. She says: 'I am telling you this because I need you to know what the household looks like. And I need to know what your practice looks like.'`,
        choices: [
        { text: `Tell her your practice honestly — what you do and where you are still growing`, consequence: `She receives it. 'I would rather a man tell me where he is than where he thinks he should be.' The conversation establishes a real baseline.`, flag: "practice_honest" },
        { text: `Ask her how she maintained the practice without a community around her initially`, consequence: `She tells you. The first year she prayed alone in her apartment. She found a masjid in her second year. The discipline she built before community is different from what most people build. You are listening to someone who did the hard thing first.`, flag: "practice_solo" },
        { text: `Tell her you respect the consistency and ask what she needs from a husband to maintain it`, consequence: `She is specific. She needs a household that does not make her practice feel like an interruption. She needs a husband who at minimum understands the prayer times. She needs Ramadan to be honored in the home. These are clear and manageable.`, flag: "practice_needs" },
        ],
      },
      {
        title: `Miami`,
        setup: `You arrive in Miami. The heat, the color, the energy — it is nothing like any city in this arc. Samira meets you at the water. She is in hijab. She is completely at home in this city that does not look like what she became. She says: 'I wanted you to see me here first. In the city I am from. Before you meet who I am becoming.'`,
        choices: [
        { text: `Tell her you see both — the city she is from and who she is becoming`, consequence: `She looks at you for a moment. 'You heard the sentence correctly.' She takes you through the neighborhood she grew up in. The tour is an orientation to her full self.`, flag: "both_seen" },
        { text: `Ask her what the difference is — between who she is from and who she is becoming`, consequence: `She thinks. 'The city made me who I am. The deen is making me who I will be. They are not fighting. They are adding.' This is one of the most precise things anyone has said to you in this platform.`, flag: "difference_asked" },
        { text: `Let her lead the time before the family — follow her pace through the city`, consequence: `She takes two hours. By the time you reach her family's neighborhood you know the city she grew up in, the block she ran on, the school she went to. You are not meeting a woman. You are meeting a history.`, flag: "city_received" },
        ],
      },
      {
        title: `Her Mother`,
        setup: `Her mother greets you at the door in Spanish. She switches to English for you without being asked. She is warm and cautious in the same breath. She says: 'Samira has told me about you. I want to hear you myself.'`,
        choices: [
        { text: `Speak to her the way you would speak to anyone whose daughter you respect — directly and without performance`, consequence: `She listens. When you are done she says in Spanish something to Samira. Samira translates: 'She says you talk like you mean it.' Her mother brings you into the kitchen.`, flag: "direct_with_mother" },
        { text: `Address her concern about Samira's faith directly — you have been thinking about how her family feels`, consequence: `The mother stops. She was not expecting this. She sits down. She tells you what four years of watching her daughter choose something foreign to her has been like. You needed to hear it. You receive it without defending anything.`, flag: "mother_concern_addressed" },
        { text: `Ask her mother what she needs to know to feel at ease about this`, consequence: `She names three things. They are not about religion. They are about her daughter specifically — her happiness, her connection to the family, her safety. You address each one. She calls her husband from the other room.`, flag: "mother_needs_asked" },
        ],
      },
      {
        title: `Her Father`,
        setup: `Her father is quieter than her mother. He went eight months without calling. He came back. He sits with you after dinner. He says: 'My daughter chose something I do not understand. But she chose it the way we raised her — with everything she has. I respect that even when I do not understand it. Can you say the same?'`,
        choices: [
        { text: `Tell him yes — and that his coming back after eight months tells you something about who he is`, consequence: `He is very still. No one has said that to him before. He looks at his hands. Then: 'I came back because she is my daughter. The faith does not change that.' You tell him: 'That is exactly what I needed to know about you.' He shakes your hand differently after that.`, flag: "father_return_named" },
        { text: `Tell him you can say the same — and ask what it looks like to him for a man to respect his daughter's faith`, consequence: `He thinks. He names four things. They are practical and loving and specific to Samira. You have received the manual from the man who knows her best.`, flag: "father_specific" },
        { text: `Tell him you respect his daughter completely — including what she has chosen`, consequence: `He nods. 'Including.' He repeats the word. 'Most men say they respect her. You said including what she chose. That word matters.' He continues.`, flag: "including_noticed" },
        ],
      },
      {
        title: `The Agreement`,
        setup: `Her parents together. Her mother speaks first this time. She says she has watched Samira choose something hard and maintain it. She says a man who can stand beside that deserves to stand beside her daughter. Her father nods. They give their blessing together — the first decision they have made together about Samira's faith since the shahada.`,
        choices: [
        { text: `Thank them for the blessing and specifically for choosing to give it together`, consequence: `Her mother puts her hand on her husband's arm. Her father covers her hand with his. They did not plan this. You named something that made it real.`, flag: "together_named" },
        { text: `Tell them what their blessing means to Samira even if she has not said it`, consequence: `Samira makes a sound in the other room. She heard. Her mother goes to her. Her father looks at you: 'How did you know she needed to hear that?' You tell him: because she told you what the four years were like.`, flag: "samira_needs_named" },
        { text: `Accept the blessing with gratitude and ask if there is anything more they need from you`, consequence: `Her father says: 'Keep Sunday calls going. Whatever day you observe. Keep calling.' The request is about connection. You agree.`, flag: "sunday_calls" },
        ],
      },
      {
        title: `The Nikah`,
        setup: `The nikah is at the masjid she found in her second year — the one she walked into alone. The imam who received her then officiates now. Her parents sit in the front row. Her mother is in something she wore to Samira's quinceañera years ago. She altered it slightly for today.`,
        choices: [
        { text: `SUCCESS: Samira — Miami, Florida.`, consequence: `SUCCESS: Her mother wore the quinceañera dress. The faith did not replace who she was. It added. US Region — complete.`, flag: "success" },
        { text: `SUCCESS: She prayed alone before she found community. She found community. Now she has a family.`, consequence: `SUCCESS: Arc complete. Samira — Latina Muslim revert — complete.`, flag: "success" },
        { text: `SUCCESS: Arc complete.`, consequence: `SUCCESS: Miami — complete.`, flag: "success" },
        ],
      },
      {
        title: `After`,
        setup: `Her mother finds you at the small reception afterward. She takes your hand. She says in English, carefully, as if she has been practicing: 'Thank you for loving her the way she deserves.'`,
        choices: [
        { text: `SUCCESS: Tell her: it is not difficult to love someone who is this real.`, consequence: `SUCCESS: She squeezes your hand and lets go. She goes to find Samira. Arc complete.`, flag: "success" },
        { text: `SUCCESS: Arc complete.`, consequence: `SUCCESS: Samira — complete.`, flag: "success" },
        { text: `SUCCESS: US Region — complete.`, consequence: `SUCCESS: Certificate of Commission — US region stamp earned.`, flag: "success" },
        ],
      },
    ,
      {
        title: `The Masjid`,
        setup: `Samira takes you to her masjid the morning after you arrive. The Friday Jumu'ah is tomorrow but she wants you to see the space first without the congregation. She has a key. She unlocks the door herself.`,
        choices: [
          { text: `Enter with the appropriate respect — this space means something specific to her`, consequence: `She watches you enter. You remove your shoes without being asked. You do not speak immediately. She says nothing for two minutes. Then: 'This is where I found it. After I lost everything else.'`, flag: "masjid_respect" },
          { text: `Ask her about the masjid — how she found it, what it gave her`, consequence: `She tells you the story of her second year. The first Jumu'ah she attended alone. The woman who sat next to her and asked her name. The slow building of something real. The space holds the whole story.`, flag: "masjid_story" },
          { text: `Tell her what you feel in the space`, consequence: `She is surprised. She had not expected you to say anything about the feeling of the place. What you say is honest and specific. She says: 'You felt it. Not everyone does.'`, flag: "masjid_felt" },
        ],
      },
      {
        title: `Jumu'ah`,
        setup: `Friday. The congregation gathers. Samira is with the women. You are with the men. You do not know anyone. Several men greet you. After the khutbah an older man finds you and asks who brought you. You tell him Samira. He says: 'Ah. The Puerto Rican sister.' He says it with warmth. 'She is good people.'`,
        choices: [
          { text: `Tell him you know — and ask him how he knows her`, consequence: `He tells you. He has been at this masjid for fifteen years. He watched Samira arrive four years ago and stay when most people who arrive alone do not stay. He says: 'A woman who stays alone is a woman who is serious.' You agree.`, flag: "man_asked" },
          { text: `Tell him you are here because of her and ask what the community thinks of her`, consequence: `He smiles. 'The community? She is the community now. She teaches the new sisters.' You did not know this. She has not mentioned it. You understand something new about her.`, flag: "community_standing" },
          { text: `Thank him for the information and introduce yourself properly`, consequence: `He gives you his name. He tells you his family name. He says: 'Come back next week.' You understand that you have been invited into something.`, flag: "proper_introduction" },
        ],
      },
      {
        title: `What She Teaches`,
        setup: `That evening Samira tells you what the man at the masjid told you — that she teaches. She had not mentioned it. She says: 'I did not want it to sound like I was presenting my credentials. I just do it because the new sisters needed someone who had been through the same thing.'`,
        choices: [
          { text: `Tell her it is not credentials — it is who she became`, consequence: `She is quiet. Then: 'That is exactly what it is.' She has been trying to articulate this for a year. You said it in one sentence. The conversation that follows is the most real of the arc.`, flag: "who_she_became" },
          { text: `Ask her what she teaches specifically`, consequence: `She tells you. The practical aspects of reversion that no book covers. The cultural navigation. The family dynamics. The loneliness of the first year. She teaches everything she needed and did not have. You are listening to someone who turned her wound into a tool.`, flag: "teaching_content" },
          { text: `Tell her you are proud of her — specifically, for this`, consequence: `She laughs. Then she gets quiet. 'No one who was not in my community has said that to me.' Her family does not see this as something to be proud of. You do. She carries this forward.`, flag: "pride_named" },
        ],
      },
      {
        title: `Her Brother`,
        setup: `Her brother visits on Saturday. He is the family member who has stayed closest to her through the conversion. He shakes your hand. He says to Samira in Spanish: something brief. She answers. He looks at you and nods. That is the entire first exchange.`,
        choices: [
          { text: `Receive the nod as the opening it is`, consequence: `He sits down. He asks you three questions in English. They are the questions of a protective brother: income, intentions, and what you know about Puerto Rican culture. You answer all three directly.`, flag: "brother_nod_received" },
          { text: `Ask him what he said to his sister`, consequence: `She translates: 'He asked if I was happy. I told him yes.' Her brother looks at you: 'That is the only question that matters.' The rest of the visit is warm.`, flag: "brother_question" },
          { text: `Speak to him in Spanish — whatever you know`, consequence: `He stops. He looks at Samira. She looks at you. He switches to Spanish. You manage. He switches back to English when the vocabulary runs out. He is smiling. 'You tried.' In this family, trying in Spanish means something.`, flag: "brother_spanish" },
        ],
      },
      {
        title: `The Nikah`,
        setup: `The nikah is at the masjid. Her parents come. Her mother in the quinceañera dress she altered. Her father in his good suit. Her brother beside Samira. The imam who received her four years ago officiates. Before he begins he says: 'I have watched this sister build something real. Today it grows.'`,
        choices: [
          { text: `SUCCESS: Samira — Miami, Florida.`, consequence: `SUCCESS: The imam watched her build something real. You are what it grew into. US Region — complete.`, flag: "success" },
          { text: `SUCCESS: Her mother wore the quinceañera dress. The faith added — it did not replace.`, consequence: `SUCCESS: Arc complete. Samira — Latina Muslim revert — complete.`, flag: "success" },
          { text: `SUCCESS: Arc complete.`, consequence: `SUCCESS: Miami — complete.`, flag: "success" },
        ],
      }
    ],
    endings: {
      success: `SUCCESS: Samira — Miami, Florida. US Region complete.`,
      not_yet: `NOT YET: Samira — the right woman at the wrong time. The correct answer was to wait. Arc complete.`,
      time_waster: `TIME WASTER: Samira arc complete. The warmth was real. The readiness was not.`,
      fraud_detected: `FRAUD DETECTED: Samira arc complete. The pattern was visible. You saw it.`,
      cultural_mismatch: `CULTURAL MISMATCH: Samira arc complete. The preparation was insufficient. Study the US region resource module before trying again.`,
    },
  },
  nour_us: {
    scenes: [
      {
        title: `The First Contact`,
        setup: `Nour's message is brief: 'I am in Dearborn. My family is Lebanese. If you know what that means for a marriage process, say so. If you do not, I would rather know now.' She has sent this message before. Most men did not know what it meant.`,
        choices: [
        { text: `Tell her you know what it means — and name what you know`, consequence: `She responds in an hour. 'You knew. Most men say they know and then demonstrate they do not. Tell me more about what you know.' The conversation begins at a level of specificity most platform exchanges never reach.`, flag: "knows_what_it_means" },
        { text: `Tell her honestly you are still learning — and ask her to tell you what she means specifically`, consequence: `She respects the honesty. She tells you. What she describes is a family structure where marriage is a family decision, not a personal one. She is telling you the terms before you sign anything.`, flag: "honest_learning" },
        { text: `Ask her what most men get wrong when they say they know`, consequence: `She lists three things. They are precise. The men who got them wrong did so because they thought they were marrying an individual. She is not separable from her family. Neither is the decision.`, flag: "common_mistakes" },
        ],
      },
      {
        title: `Her Parents' Involvement`,
        setup: `Three weeks in. She says: 'My father has asked about you. He does this with every man I speak with. He asked what your family background is and what your level of practice is. I told him what I know. He wants to speak with you.'`,
        choices: [
        { text: `Tell her you welcome the call — ask when her father is available`, consequence: `She says: 'He is available when I tell him you are ready.' She is giving you the agency to set the pace while making clear that the call will happen. You set a date.`, flag: "father_call_welcomed" },
        { text: `Ask her what her father already knows about you and what he is likely to ask`, consequence: `She tells you what she shared. She tells you the three questions he asks every man. You prepare. Not to perform — to be ready to answer honestly.`, flag: "father_prepared" },
        { text: `Ask Nour what she told him — you want to make sure your answers match what she has shared`, consequence: `She tells you. Then: 'You want to make sure there is no contradiction. Good. Inconsistency is the first thing he looks for.' You are already thinking correctly.`, flag: "consistency_checked" },
        ],
      },
      {
        title: `Her Father's Call`,
        setup: `The call. Her father speaks clear English with a Lebanese accent. He is warm in the way Lebanese fathers are warm — the warmth is genuine and the assessment underneath it is serious. He asks three questions. The first: 'What is your family situation?'`,
        choices: [
        { text: `Answer fully — your family structure, your relationships, what family means to you`, consequence: `He listens without interruption. He asks one follow-up. Your follow-up answer tells him more than your first. He says: 'A man who adds to his first answer is honest.' He asks the second question.`, flag: "family_full" },
        { text: `Answer and ask about his family — you want to know the structure you would be entering`, consequence: `He is pleased by the question. He describes his family. By the time he finishes you understand exactly what entering this family would require. He asks the second question in a different register than he had planned.`, flag: "family_reciprocal" },
        { text: `Answer directly and with appropriate detail — not too much, not too little`, consequence: `He notes the calibration. 'You answered what I asked. Not more, not less. Good.' He asks the second question.`, flag: "calibrated_answer" },
        ],
      },
      {
        title: `Second and Third Questions`,
        setup: `Her father's second question: 'What is your income situation?' His third: 'Why my daughter and not a woman from your own background?' He asks the third one without apology.`,
        choices: [
        { text: `Answer both honestly — income specifically, and the third question from genuine reflection`, consequence: `He receives both answers. The income answer he checks internally against what he knows is required. The third answer he measures against what he has heard before. Yours is different from what he has heard before. He calls Nour after the call.`, flag: "both_honest" },
        { text: `Answer the third question first — it is the one that matters most`, consequence: `He stops. 'You answered the third first.' You tell him the third is the one that deserves the most care. He agrees. He lets you answer the second after. The order told him something.`, flag: "third_first" },
        { text: `Ask him if his daughter has explained what brought her to the platform — your answer to the third question connects to hers`, consequence: `He pauses. He asks Nour something off the call. He comes back. 'She said you are the first man who wanted to make sure the stories matched.' He answers the question for you and asks if he got it right. He did.`, flag: "stories_matched" },
        ],
      },
      {
        title: `Dearborn`,
        setup: `You arrive in Dearborn. The city is more Arab than you expected. The signs are in Arabic and English. The food is extraordinary. Her brother meets you. He is direct and assessing and speaks to you like a man who has made his mind up already and is waiting to see if he is right.`,
        choices: [
        { text: `Meet his directness with your own`, consequence: `He relaxes slightly. 'You did not soften yourself for me.' He takes you through the neighborhood. He is showing you what Nour grew up inside. By the time you reach the family home you understand the environment.`, flag: "directness_matched" },
        { text: `Ask him directly what he needs to know about you`, consequence: `He says three things. They are practical and honest and you answer all three before you reach the family home. He calls ahead. Her father is at the door when you arrive.`, flag: "brother_direct" },
        { text: `Ask him about the neighborhood — you want to understand what he is showing you`, consequence: `He tells you. The neighborhood is thirty years of community built by people who came from the same region of Lebanon. Nour was raised inside that community. He is showing you what you are being considered for.`, flag: "neighborhood_asked" },
        ],
      },
      {
        title: `The Family Home`,
        setup: `The home is full. Extended family, neighbors, community members. You have arrived at something that is not a meeting — it is a gathering. Her father receives you at the door. He shakes your hand the way he shook it in your mind from the phone call. It matches.`,
        choices: [
        { text: `Let the gathering receive you — be present for all of it`, consequence: `You are introduced to twenty people in forty minutes. You remember names. You ask questions. Her father watches you move through the room. An uncle says something to him. Her father nods.`, flag: "gathering_received" },
        { text: `Stay close to her father and let him make the introductions`, consequence: `He introduces you to specific people in a specific order. The order is not random. He is showing you to the people whose opinion shapes his own. You are being presented to a council.`, flag: "father_introductions" },
        { text: `Find the oldest person in the room and greet them first`, consequence: `Her father sees you move toward his mother — a woman in her eighties in the corner of the room. He says something to his wife. His wife touches his arm. You have done something without being told to.`, flag: "eldest_first" },
        ],
      },
      {
        title: `Her Mother`,
        setup: `Her mother takes you aside after the gathering has settled. She speaks to you in the kitchen while she makes tea. She asks: 'Do you know what you are asking for? Not Nour specifically. Do you know what it means to marry into a Lebanese family?'`,
        choices: [
        { text: `Tell her honestly what you know and what you are still learning`, consequence: `She nods at the honesty. Then she teaches you for thirty minutes over tea. What she teaches you is more useful than anything you read or studied. She ends with: 'You listened to all of it. That is all I needed to see.'`, flag: "mother_teaching" },
        { text: `Tell her you know it means you are marrying a family, not just a woman`, consequence: `She stops. She looks at you. 'Who told you that?' You tell her it was obvious from the moment you spoke with Nour. She calls her husband into the kitchen. She repeats what you said. He says: 'Good.'`, flag: "family_not_individual" },
        { text: `Ask her to tell you what you need to know that no one else will tell you`, consequence: `She is quiet a moment. Then she tells you three things. They are specific to her daughter and specific to this family. They are not warnings — they are gifts. She is giving you what you need to succeed.`, flag: "mother_gifts" },
        ],
      },
      {
        title: `The Agreement`,
        setup: `Her father calls a formal family meeting the next morning. Extended family who were at the gathering are present by phone. He announces that he has assessed the situation and he is prepared to give his blessing. He asks if anyone has an objection. The room is quiet.`,
        choices: [
        { text: `Receive the silence as the answer it is`, consequence: `Her father says: 'Then it is done.' He uses the Arabic phrase. Her brother translates it for you. It is a phrase that means it is witnessed. Not agreed — witnessed. The distinction is important.`, flag: "silence_received" },
        { text: `Thank the family for the gathering and for the witness`, consequence: `Her father is surprised you used the word witness. 'Nour did not tell you that word.' You tell him you have been paying attention. He looks at his wife. His wife is smiling.`, flag: "witness_named" },
        { text: `Ask what comes next in the process`, consequence: `Her father explains the next steps in the Lebanese tradition — the formal engagement, the mahr, the nikah timeline. He has been waiting to say this. The question gave him the opening.`, flag: "process_asked" },
        ],
      },
      {
        title: `The Nikah`,
        setup: `The nikah is at the masjid her family has attended for thirty years. The imam knew Nour when she was a child. He looks at you when you arrive and says: 'Her father told me about you. He does not tell me about most men.'`,
        choices: [
        { text: `SUCCESS: Nour — Dearborn, Michigan.`, consequence: `SUCCESS: The imam said her father told him about you. Her father does not tell him about most men. US Region — complete.`, flag: "success" },
        { text: `SUCCESS: Dearborn is Beirut relocated. You navigated it correctly.`, consequence: `SUCCESS: Arc complete. Nour — Arab-American Muslim — complete.`, flag: "success" },
        { text: `SUCCESS: Arc complete.`, consequence: `SUCCESS: Dearborn — complete.`, flag: "success" },
        ],
      },
      {
        title: `After`,
        setup: `Her mother finds you at the reception. She gives you something — a small item that belonged to her mother. She says: 'In our family we give this to the man who enters the family correctly. You entered correctly.'`,
        choices: [
        { text: `SUCCESS: Receive it with both hands and with genuine gratitude.`, consequence: `SUCCESS: She nods. She goes back to her family. You are now her family. Arc complete.`, flag: "success" },
        { text: `SUCCESS: Arc complete.`, consequence: `SUCCESS: Nour — complete.`, flag: "success" },
        { text: `SUCCESS: US Region — complete.`, consequence: `SUCCESS: Certificate of Commission — US region stamp earned.`, flag: "success" },
        ],
      },
    ,
      {
        title: `The Arabic Question`,
        setup: `Her father asks if you speak Arabic. You tell him honestly. He says: 'Good. Men who claim Arabic and do not have it are worse than men who never learned it. Honesty about what you do not know is the beginning of being trustworthy about what you do know.'`,
        choices: [
          { text: `Ask him if he would be willing to teach you over time`, consequence: `He is very still. Then he calls his wife. He says something in Arabic. She comes into the room. He repeats what you said. She looks at you. She says in English: 'No one has asked him that.' He has already agreed.`, flag: "arabic_asked" },
          { text: `Tell him you intend to learn — not for the family, for Nour`, consequence: `He receives the distinction. 'For her. Not for us.' He says it as confirmation. 'The right reason.' He asks when you intend to start. You tell him you already have a resource. He names a better one.`, flag: "arabic_intention" },
          { text: `Tell him you understand why that matters to him and that you respect it`, consequence: `He says: 'Most men tell me they understand and then do nothing. We will see.' He is not hostile — he is accurate. His accuracy is more trustworthy than easy warmth would have been.`, flag: "arabic_respected" },
        ],
      },
      {
        title: `The Community Dinner`,
        setup: `The family arranges a community dinner the second evening. Fifteen people. Lebanese food prepared by multiple families together. You are seated next to an older man who has known Nour's family for twenty-five years. He speaks to you without introduction for forty minutes.`,
        choices: [
          { text: `Give him your full attention for the forty minutes`, consequence: `He stops. He looks at you. 'You listened to all of it.' He calls to Nour's father across the table. He says something in Arabic. Her father raises his glass. You do not need a translation.`, flag: "elder_listened" },
          { text: `Ask him questions throughout — you want to understand what he is telling you`, consequence: `He is pleased by the questions. He speaks for longer than he intended. At the end: 'You asked about the things that matter. Not the things that are easy to ask about.' He finds Nour's father after dinner.`, flag: "elder_questioned" },
          { text: `Introduce yourself properly when there is a pause — he has not asked your name`, consequence: `He stops. He looks at you. 'You waited for the right moment.' He receives the introduction formally. He gives you his full name and his village of origin in Lebanon. This is a significant disclosure.`, flag: "elder_introduced" },
        ],
      },
      {
        title: `Nour's Condition`,
        setup: `The night before you leave. Nour tells you something she has been waiting to say. She says: 'I need you to learn Arabic. Not perfectly. But genuinely. I need our children to have a grandfather who can speak to them in their language. That is the only thing I need from you that is not negotiable.'`,
        choices: [
          { text: `Tell her you have already started and show her`, consequence: `She looks at your phone. The app, the notes, the words you have written down from the dinner conversations. She puts the phone down. She says: 'You started before I asked.' You tell her her father gave you a resource the first day. Her eyes fill.`, flag: "arabic_started" },
          { text: `Tell her you understand why it is non-negotiable and commit to it specifically`, consequence: `She says: 'Specifically.' You tell her the plan — how, what timeline, what measure of progress. She listens to the plan. 'You gave me a plan, not a promise.' She knows the difference.`, flag: "arabic_committed" },
          { text: `Ask her what genuine looks like to her specifically`, consequence: `She describes it. A conversation with her father. A bedtime story for a child. A prayer said correctly. She is not asking for fluency. She is asking for effort that is real and continuous. You can give her that.`, flag: "arabic_genuine" },
        ],
      },
      {
        title: `The Ceremony`,
        setup: `The nikah is at the masjid her family has attended for thirty years. The imam calls you both by your full names. The mahr is stated publicly. Her father's voice, when he gives his consent, is the most complete sound in the room.`,
        choices: [
          { text: `SUCCESS: Nour — Dearborn, Michigan.`, consequence: `SUCCESS: Her father's voice when he gave consent. Thirty years of this masjid behind it. US Region — complete.`, flag: "success" },
          { text: `SUCCESS: You committed to the Arabic. Start tomorrow.`, consequence: `SUCCESS: Arc complete. Nour — Arab-American Muslim — complete.`, flag: "success" },
          { text: `SUCCESS: Arc complete.`, consequence: `SUCCESS: Dearborn — complete.`, flag: "success" },
        ],
      }
    ],
    endings: {
      success: `SUCCESS: Nour — Dearborn, Michigan. US Region complete.`,
      not_yet: `NOT YET: Nour — the right woman at the wrong time. The correct answer was to wait. Arc complete.`,
      time_waster: `TIME WASTER: Nour arc complete. The warmth was real. The readiness was not.`,
      fraud_detected: `FRAUD DETECTED: Nour arc complete. The pattern was visible. You saw it.`,
      cultural_mismatch: `CULTURAL MISMATCH: Nour arc complete. The preparation was insufficient. Study the US region resource module before trying again.`,
    },
  },
  rachel: {
    scenes: [
      {
        title: `She Reached Out First`,
        setup: `Rachel contacted you. Her message is warm and articulate. She describes her reversion with genuine feeling. She says: 'I took shahada eighteen months ago. I have been looking for a community and I think this platform might be the right place to find people who understand.' She said community, not a husband.`,
        choices: [
        { text: `Respond warmly and ask her about her journey`, consequence: `She talks about the journey for two weeks. It is genuine and moving and full of detail. What she has not mentioned: her family, her community connections, her support structure. You are starting to notice what is absent.`, flag: "journey_received" },
        { text: `Note the word 'community' — ask her what she is looking for specifically on this platform`, consequence: `She pauses. Then: 'A husband, ultimately. But also people who understand what I have chosen.' The honest answer reveals something. She needs community first. She knows it and is telling you.`, flag: "community_noted" },
        { text: `Ask her about her support system — who is around her in her practice`, consequence: `She goes quiet a moment. 'I am still building that.' The answer is simple and significant. She has the faith and not yet the infrastructure.`, flag: "support_asked" },
        ],
      },
      {
        title: `The Isolation`,
        setup: `Four weeks in. You ask about her family directly. She tells you. Her parents have not spoken to her in eight months. Her sister sends occasional texts. Her church friends are gone. She found a masjid but attends irregularly because she does not yet feel she belongs. She says: 'I am building my life from scratch. It is hard but it is right.'`,
        choices: [
        { text: `Acknowledge both things — that it is hard and that it is right — and ask what the building looks like practically`, consequence: `She describes it. One class at the masjid per week. One woman she has connected with there. A lot of time alone with books. The infrastructure is real but thin. A marriage would need to carry more weight than it should.`, flag: "building_assessed" },
        { text: `Tell her you respect what she is doing and ask how you can support the building`, consequence: `She is moved by the offer. She names several things. They are all things a community would normally provide. She is looking for them in a potential husband. This is the pattern that concerns you.`, flag: "support_offered" },
        { text: `Ask her what her life looks like on a regular Tuesday`, consequence: `She tells you. The picture is of a woman who is sincere and isolated and working hard to build something alone. The faith is real. The foundation is thin. A marriage into thin foundation is a weight the foundation cannot bear.`, flag: "tuesday_asked" },
        ],
      },
      {
        title: `Moving Too Fast`,
        setup: `Six weeks in. She has begun talking about the future with specificity — where she wants to live, how many children, what the household will look like. The specificity is not alarming on its own. What is alarming is that it is happening before she has answered the foundational questions about her own life.`,
        choices: [
        { text: `Name what you are noticing: 'You are thinking about our future before your present is fully built'`, consequence: `She is quiet a long time. Then: 'I know.' She says it simply. 'I know. I am doing it because the future feels more manageable than the present.' This is the most honest thing she has said.`, flag: "present_named" },
        { text: `Engage the future conversations — she needs someone to hold the vision with her`, consequence: `The conversations are warm and detailed and feel real. But they are building a house on a foundation that is not yet poured. You are contributing to a structure that cannot yet support itself.`, flag: "future_engaged" },
        { text: `Ask her what her life needs to look like in the next twelve months before marriage makes sense`, consequence: `She thinks. She names several things. Then: 'I have not thought about it that way. I have been thinking about marriage as the thing that stabilizes the twelve months.' You have arrived at the center of the arc.`, flag: "twelve_months_asked" },
        ],
      },
      {
        title: `The Weight on the Marriage`,
        setup: `You name what you see directly: 'Rachel, I am concerned that you are looking for a husband to provide what a community and a foundation need to provide first. I am not saying your faith is not real. I am saying your foundation is thin and a marriage needs to be built on something that is already standing.'`,
        choices: [
        { text: `Say it and give her the full space to respond`, consequence: `She is quiet for three days. When she comes back she says: 'You are right. I know you are right. I have known it and I did not want to look at it.' The honesty from her is the beginning of the right thing.`, flag: "space_given" },
        { text: `Say it and offer to help her think through what building the foundation looks like`, consequence: `She receives both. The naming and the offer. She says: 'You are the first person who told me the truth and offered to help at the same time.' You tell her the help you are offering is not as a husband. Not yet.`, flag: "truth_and_help" },
        { text: `Say it gently — she is sincere and does not need harshness`, consequence: `She receives the gentleness and the truth together. She says: 'I needed someone to say that who was not trying to dismiss me.' You were not dismissing her. You were being honest about the timing.`, flag: "gentle_truth" },
        ],
      },
      {
        title: `What She Needs`,
        setup: `The conversation that follows is the most important one in this arc. She asks: 'What do you think I actually need right now?' She is asking genuinely. She is ready to hear it.`,
        choices: [
        { text: `Tell her specifically: two years in the community, family reconciliation work, a support network that exists outside of a marriage`, consequence: `She writes it down. You can tell she writes it down. She says: 'Two years.' You say: 'At least.' She says: 'Will you still be here in two years?' You tell her that is the wrong question. The right question is whether she will do the two years regardless.`, flag: "two_years_named" },
        { text: `Tell her what you have observed — what is strong and what is thin — and let her draw her own conclusion`, consequence: `She draws it. She names it herself. 'I need community before I need a husband.' She said it. You did not say it for her. That matters.`, flag: "conclusion_hers" },
        { text: `Ask her what she thinks she needs — she already knows`, consequence: `She does know. She tells you. The list is correct and complete. She has been carrying it and not looking at it. 'I needed someone to make it safe to say it out loud.' You gave her that.`, flag: "she_knows" },
        ],
      },
      {
        title: `The Deferral`,
        setup: `You tell her: 'I am not walking away from you. I am asking you to build what needs to be built before we build this. Come back in two years. With community. With reconciliation work done. With a foundation. If you do that work and I am where I am, I will still be interested.'`,
        choices: [
        { text: `Say it and mean it`, consequence: `She says: 'You are the first man who has told me no in a way that felt like respect.' You tell her it is not no — it is not yet. She understands the difference.`, flag: "not_yet" },
        { text: `Say it and give her specific markers — what the two years should produce`, consequence: `She asks for them. You give four. They are concrete. She writes them down. She says: 'I am going to do this.' You believe her. The arc does not end in failure. It ends in the only right answer for where she is.`, flag: "markers_given" },
        { text: `Say it and tell her what you will be doing with the two years yourself`, consequence: `She asks. You tell her. She says: 'You are not asking me to wait for you. You are telling me what you are both doing with the time.' She understands. This is not abandonment. This is the right architecture.`, flag: "parallel_growth" },
        ],
      },
      {
        title: `NOT YET — The Correct Ending`,
        setup: `The arc closes. Not with rejection. Not with failure. With the most honest outcome available: a man who saw clearly, told the truth gently, and offered the right answer for the right reasons.`,
        choices: [
        { text: `NOT YET: You did not walk away. You asked her to build first.`, consequence: `NOT YET: Rachel is real. Her faith is real. Her foundation is thin. The marriage would carry a weight it cannot bear right now. Two years from now she may be exactly who you were looking for. The correct answer was not yet. Arc complete.`, flag: "not_yet" },
        { text: `NOT YET: Sincerity is not the same as readiness.`, consequence: `NOT YET: The platform teaches discernment. Discernment is not only the ability to identify fraud. It is the ability to recognize genuine sincerity that has not yet been tested long enough to support what marriage requires. You demonstrated that discernment here.`, flag: "not_yet" },
        { text: `NOT YET: Arc complete.`, consequence: `NOT YET: Rachel — White American Muslim revert — arc complete. The most instructive ending in the US region.`, flag: "not_yet" },
        ],
      },
      {
        title: `What This Arc Teaches`,
        setup: `Before you move to the next region. One thing to carry forward from Rachel's arc.`,
        choices: [
        { text: `NOT YET: The men who marry women who are not yet ready pay the price of that decision for years.`, consequence: `NOT YET: Not because the woman is bad. Because the weight was too much for what she had built. The man who can see this early enough to name it and defer has demonstrated something rare. Carry it forward.`, flag: "not_yet" },
        { text: `NOT YET: The right answer at the wrong time is still the wrong answer.`, consequence: `NOT YET: Rachel was the right kind of woman. The timing was wrong. A man who can tell the difference between the right woman at the wrong time and the wrong woman at any time is equipped for this process. Arc complete.`, flag: "not_yet" },
        { text: `NOT YET: Arc complete. US Region — complete.`, consequence: `NOT YET: Certificate of Commission — US region stamp earned. The stamp belongs to the man who held the standard consistently across all seven women in this region, including the one where the correct answer was to wait.`, flag: "not_yet" },
        ],
      },
    ,
      {
        title: `Her Isolation Deepens`,
        setup: `Week eight. You ask her what she did this past weekend. She describes forty-eight hours alone — some Quran, some cooking, some scrolling. The masjid class she mentioned attending weekly has become every other week. She says: 'It is hard to go when I feel like I do not belong yet.'`,
        choices: [
          { text: `Name what you are hearing: the foundation is thinner than last month`, consequence: `She is quiet. Then: 'I know.' She says it without defense. This is the honesty that makes her reachable. It also confirms what you are seeing.`, flag: "thinning_named" },
          { text: `Encourage her to go anyway — belonging comes through showing up`, consequence: `She hears it. She goes the following week. She texts you afterward: 'I went.' Two words. The effort it took to send them is visible in the simplicity.`, flag: "encouraged" },
          { text: `Ask her what belonging would look like if she had it`, consequence: `She thinks for a long time. Then she describes it. What she describes is attainable. But it requires time and presence and repetition — none of which a marriage provides as a substitute.`, flag: "belonging_described" },
        ],
      },
      {
        title: `The Family Question`,
        setup: `Week ten. You ask about her parents. She says: 'My mother texted last week. First time in four months.' She says it carefully — not triumphant, not devastated. Just careful. You ask what the text said. She reads it to you. It was two sentences about a cousin's wedding. It was not about the estrangement. But it was contact.`,
        choices: [
          { text: `Tell her the text is a door and she should walk through it`, consequence: `She says: 'I am afraid of what is on the other side.' You tell her the door is better than the wall. She calls her mother the following day. She does not tell you what was said. She tells you she called.`, flag: "door_named" },
          { text: `Ask her what she wants to do with the contact`, consequence: `She says she does not know. You sit with that answer without trying to resolve it. She says: 'You did not tell me what to do.' You tell her it is not yours to tell. She calls her mother three days later.`, flag: "contact_hers" },
          { text: `Tell her reconciliation work is one of the things the foundation needs`, consequence: `She hears it as part of the larger conversation you have been having. 'You keep coming back to the foundation.' You tell her yes. The foundation is what holds everything else. She texts her mother that evening.`, flag: "reconciliation_named" },
        ],
      },
      {
        title: `She Pushes Back`,
        setup: `Week twelve. She pushes back on the framework you have been offering. She says: 'You keep talking about foundation as though I am not already standing on something. I have been standing on this for eighteen months. It is harder than you know and I have not left.' She is right and you need to hear it.`,
        choices: [
          { text: `Receive the correction — she has earned the right to push back`, consequence: `You tell her she is right. You name specifically what she has done that you may have undervalued. She goes quiet. Then: 'Thank you for saying that.' The conversation becomes more equal.`, flag: "correction_received" },
          { text: `Tell her you hear her and ask what you missed`, consequence: `She tells you. What she names is real effort that deserved acknowledgment. You give the acknowledgment. The conversation resets at a more honest baseline.`, flag: "missed_acknowledged" },
          { text: `Agree and revise: the foundation is real, the question is whether it is ready for this specific weight`, consequence: `She thinks. Then: 'That is a different question than the one you have been asking.' You agree. The revised question is more accurate and she can engage with it more honestly.`, flag: "revised_question" },
        ],
      },
      {
        title: `The Real Conversation`,
        setup: `Week fourteen. She asks: 'What would it take for you to say the foundation is ready?' She is asking genuinely. She is tired of the ambiguity. She wants a clear answer.`,
        choices: [
          { text: `Give her the specific markers: consistent masjid attendance for six months, one reconciled family relationship, two women in the community she calls sisters`, consequence: `She writes it down. 'That is specific.' You tell her specific is the only kind of honest answer to her question. She asks if the markers are final. You tell her they are a floor, not a ceiling. She says: 'I can do that.' You believe her.`, flag: "markers_specific" },
          { text: `Tell her she already knows what it takes — she named it herself weeks ago`, consequence: `She goes back to what she said. She reads it back to you. Then: 'I said it and did not hold myself to it.' The accountability is hers. You gave it back to her correctly.`, flag: "her_own_words" },
          { text: `Tell her you will know it when you see it and ask her to keep showing you`, consequence: `She receives this. 'You are not walking away.' You tell her no. You are waiting for the building to be ready. She says: 'Okay.' It is the most committed she has sounded.`, flag: "not_walking_away" },
        ],
      },
      {
        title: `Eighteen Months Later`,
        setup: `You told her two years. It has been eighteen months. She sends you a message: 'I want you to know where I am.' She sends four things: her masjid attendance log for the past six months — every week. A photo of her with two women from the community at their iftar last Ramadan. A voice message from her mother that she has kept. And one sentence: 'I think I am ready.'`,
        choices: [
          { text: `Receive what she sent and tell her you are ready to meet`, consequence: `NOT YET becomes YES: The foundation is built. The markers are met. The two years she was asked to build — she built them in eighteen months. The arc does not end in deferral. It ends in arrival.`, flag: "arrival" },
          { text: `Ask her one question before you answer: 'What did the building cost you?'`, consequence: `She answers. The cost was real and specific and worth naming before moving forward. When she finishes she says: 'Now I know I am ready because I can tell you what it cost without needing you to make it better.' That is the answer.`, flag: "cost_asked" },
          { text: `Tell her you see what she built and you are coming`, consequence: `NOT YET becomes YES: She built it. You saw it. The deferral was not rejection — it was the most honest form of respect. The arc completes correctly. Rachel — complete.`, flag: "arrival" },
        ],
      },
      {
        title: `The Outcome`,
        setup: `The arc that began as NOT YET ends as YES. She built the foundation. She did the work that needed to be done before the marriage could bear its weight. This is the most complete arc in the US region.`,
        choices: [
          { text: `YES — Rachel. Portland, Oregon.`, consequence: `SUCCESS: She built what needed to be built. The deferral was not the ending — it was the beginning of the right preparation. A man who can defer with respect and wait with patience has demonstrated what this platform exists to teach. US Region — complete.`, flag: "success" },
          { text: `SUCCESS: The most instructive arc in the US region.`, consequence: `SUCCESS: Not because she is the most complex woman. Because the correct answer changed over time — from not yet to yes — and the man who stayed present through the change earned both answers. Arc complete.`, flag: "success" },
          { text: `SUCCESS: Arc complete.`, consequence: `SUCCESS: Rachel — complete. US Region — complete. Certificate of Commission — US region stamp earned.`, flag: "success" },
        ],
      }
    ],
    endings: {
      success: `SUCCESS: Rachel — Portland, Oregon. US Region complete.`,
      not_yet: `NOT YET: Rachel — the right woman at the wrong time. The correct answer was to wait. Arc complete.`,
      time_waster: `TIME WASTER: Rachel arc complete. The warmth was real. The readiness was not.`,
      fraud_detected: `FRAUD DETECTED: Rachel arc complete. The pattern was visible. You saw it.`,
      cultural_mismatch: `CULTURAL MISMATCH: Rachel arc complete. The preparation was insufficient. Study the US region resource module before trying again.`,
    },
  }
};

const ENDING_LABELS = {
  success:"I — Successful Marriage",
  not_yet:"II — Not Yet — Correct Deferral",
  fraud_detected:"III — Fraud Detected & Avoided",
  time_waster:"IV — Time Waster Identified",
  walkaway:"V — Correct Walkaway",
  father_no:"VI — Father Says No",
  she_no:"VII — She Says No",
  cultural_mismatch:"VIII — Cultural Mismatch",
  early_detect:"III — Failed Vetting — Pre-Travel",
  cultural_fail:"VIII — Cultural Misnavigation",
  fraud_pre:"III — Fraudulent Approach — Pre-Travel",
  fraud_post:"III — Fraud — Post-Citizenship",
  genuine_wrong:"VII — Incompatible Despite Genuine Connection",
};

const ENDING_COLORS = {
  success:"#b8963e",
  not_yet:"#4a7c8a",
  fraud_detected:"#8b1a1a",
  time_waster:"#4a5a7a",
  walkaway:"#4a7c5e",
  father_no:"#7a4a2a",
  she_no:"#6a4a7a",
  cultural_mismatch:"#5a6a4a",
  early_detect:"#7a6228",
  cultural_fail:"#8a7a5a",
  fraud_pre:"#8b1a1a",
  fraud_post:"#6b0f0f",
  genuine_wrong:"#5a6a8a",
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
      <Portrait id={woman.id} name={woman.name} photo={woman.photo} />
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

  const goBack = () => { window.location.href = "/"; };

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

      // DETERMINISTIC OUTCOME LOGIC
      // Priority: explicit outcome flags > pattern detection > success

      // 1. Explicit outcome flags (set directly in scene choices)
      if (flags.some(f => f === "not_yet")) { setOutcome("not_yet"); setOutcomeText("NOT YET: She was real. Her faith was real. Her foundation was not yet ready to support what marriage requires. The man who can see this clearly enough to name it — and defer with respect rather than walk away with contempt — has demonstrated the highest form of discernment available in this process. Come back in two years. With community. With a foundation. The correct answer was not yet."); setPhase("outcome"); return; }
      if (flags.some(f => f === "fraud_detected")) { setOutcome("fraud_detected"); setOutcomeText("FRAUD DETECTED: You identified the pattern. The emotional investment was real even when the relationship was not. You leave this arc with your discernment intact and your resources protected. Apply what you learned here to every arc that follows."); setPhase("outcome"); return; }
      if (flags.some(f => f === "time_waster")) { setOutcome("time_waster"); setOutcomeText("TIME WASTER: This woman was real. Her warmth was real. Her inability or unwillingness to move toward marriage was also real. The time waster does not announce herself. She is revealed through the pattern of warmth without movement, agreement without planning, affection without progress. You have completed this arc. The lesson is permanent."); setPhase("outcome"); return; }
      if (flags.some(f => f === "walkaway")) { setOutcome("walkaway"); setOutcomeText("CORRECT WALKAWAY: You made the right decision at the right moment. The man who walks away when the evidence is clear — without drama, without a final confrontation to prove a point — has demonstrated the highest form of discernment available in this process. You leave intact."); setPhase("outcome"); return; }

      // 2. Pattern-based outcome detection
      const fraudFlags = ["money_sent", "pace_accelerated", "silence_accepted", "position_softened"];
      const twFlags = ["pattern_continued", "yes_without_plan", "through_sara", "too_direct"];
      const fatherNoFlags = ["family_ignored", "privacy_concern", "political_avoided", "misread_culture", "mahr_lowballed"];
      const sheNoFlags = ["overconfident", "hotel_requested", "flexible_answer", "missed_question"];
      const culturalFlags = ["tested", "surprised", "hesitant", "impatient", "performed"];

      const fraudCount = flags.filter(f => fraudFlags.includes(f)).length;
      const twCount = flags.filter(f => twFlags.includes(f)).length;
      const fatherNoCount = flags.filter(f => fatherNoFlags.includes(f)).length;
      const sheNoCount = flags.filter(f => sheNoFlags.includes(f)).length;
      const culturalCount = flags.filter(f => culturalFlags.includes(f)).length;

      if (fraudCount >= 2) { setOutcome("fraud_detected"); setOutcomeText("FRAUD DETECTED: The pattern was present and the choices you made did not interrupt it. Money was sent. Pace was accepted without questioning. The fraud completed its arc. The lesson: the flags were present early. Speed of intimacy, financial requests at emotional peaks, inconsistencies that were not pressed. Next time, press earlier."); setPhase("outcome"); return; }
      if (twCount >= 2) { setOutcome("time_waster"); setOutcomeText("TIME WASTER: You allowed the warmth to substitute for movement. The agreement that never becomes a plan. The yes that never becomes a date. The affection that never becomes a conversation about the future. You have lived through the time waster arc. The warmth was real. The readiness was not."); setPhase("outcome"); return; }
      if (fatherNoCount >= 2) { setOutcome("father_no"); setOutcomeText("FATHER SAYS NO: The family did not approve. The signals were present — the cultural missteps, the moments where the family's priorities were not seen or honored. The father's no is not the end of the journey. It is data. Learn what the family needed to see and carry it into the next arc."); setPhase("outcome"); return; }
      if (sheNoCount >= 2) { setOutcome("she_no"); setOutcomeText("SHE SAID NO: She was genuine. You were serious. The combination still did not produce a match. Her no was not about your value — it was about fit. Some arcs end here. The man who receives a woman's honest no with dignity has demonstrated something that few men demonstrate. Move forward without bitterness."); setPhase("outcome"); return; }
      if (culturalCount >= 3) { setOutcome("cultural_mismatch"); setOutcomeText("CULTURAL MISMATCH: The connection was real but the cultural preparation was insufficient. The missteps accumulated. The family saw a man who cared but did not know. In some families knowing matters as much as caring. Study the Cultural Intelligence module before your next attempt in this region."); setPhase("outcome"); return; }

      // 3. Default: success
      setOutcome("success");
      setOutcomeText("SUCCESS: You navigated this arc correctly. The patience, the cultural preparation, the family engagement, the honest answers at the moments when honest answers cost something — all of it was the path. The certificate of commission is not given for completing the course. It is given for completing the course with the kind of discernment that makes the real journey possible.");
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
      <NavBar left={<button onClick={goBack} style={{ background:"none", border:"1px solid #b8963e", color:"#b8963e", padding:"6px 14px", borderRadius:"20px", cursor:"pointer", fontSize:"13px", fontFamily:"sans-serif" }}>← Library</button>} title="Select Your Destination" right={<div style={{ fontSize:10, color:C.muted, fontFamily:"sans-serif" }}>{stampedRegions.length} / 6 stamped</div>} />
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
          {stampedRegions.length === 6 && <button onClick={() => setPhase("certificate")} style={{ padding:"10px 24px", background:C.gold, color:C.navyDeep, border:"none", cursor:"pointer", fontSize:12, fontWeight:700, fontFamily:"sans-serif", letterSpacing:"0.1em" }}>Claim Your Certificate →</button>}
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
          <div style={{ display:"flex", gap:16, alignItems:"flex-start", marginBottom:"1.5rem" }}>
            <div style={{ width:80, height:100, flexShrink:0, overflow:"hidden", border:"2px solid #b8963e" }}>
              <img src={"/women/" + woman.id.replace(/_/g, "-") + ".jpg"} alt={woman.name} style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top" }} />
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:9, letterSpacing:"0.2em", color:C.gold, fontFamily:"sans-serif", marginBottom:4 }}>PURSUING</div>
              <div style={{ fontSize:17, color:C.goldLight, fontFamily:"Georgia,serif", marginBottom:2 }}>{woman.name}</div>
              <div style={{ fontSize:10, color:C.muted, fontFamily:"sans-serif", marginBottom:10 }}>{woman.age} · {woman.city}</div>
              <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                {region.women.map(w => (
                  <div key={w.id} onClick={() => { if (w.id !== selectedWomanId) { setSelectedWomanId(w.id); setSceneIndex(0); setChoiceHistory([]); setLastConsequence(null); }}}
                    style={{ display:"flex", alignItems:"center", gap:5, padding:"3px 8px", background:w.id===selectedWomanId?"rgba(184,150,62,0.15)":C.navyDeep, border:"1px solid " + (w.id===selectedWomanId?C.gold:"#1e3a6e"), fontSize:9, fontFamily:"sans-serif", cursor:w.id!==selectedWomanId?"pointer":"default" }}>
                    <div style={{ width:18, height:18, overflow:"hidden", flexShrink:0 }}>
                      <img src={"/women/" + w.id.replace(/_/g, "-") + ".jpg"} alt={w.name} style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top" }} />
                    </div>
                    <span style={{ color:w.id===selectedWomanId?C.goldLight:C.mutedDark }}>{w.name}</span>
                    <span style={{ color:w.id===selectedWomanId?C.gold:"#2a3a5e" }}>{w.id===selectedWomanId?"●":"○"}</span>
                  </div>
                ))}
              </div>
            </div>
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

  if (phase === "outcome" && region && outcome && woman) {
    const color = ENDING_COLORS[outcome] || "#b8963e";
    const endingText = outcomeText || (region.endings && region.endings[outcome]) || "Your arc is complete.";
    return (
      <div style={{ minHeight:"100vh", background:C.dark, color:C.cream, fontFamily:"Georgia,serif" }}>
        <NavBar title={region.label + " — Outcome"} />
        <div style={{ maxWidth:640, margin:"0 auto", padding:"3rem 1.5rem" }}>
          <div style={{ display:"flex", gap:16, alignItems:"flex-start", marginBottom:"2rem" }}>
            <div style={{ width:80, height:100, flexShrink:0, overflow:"hidden", border:`2px solid ${color}` }}>
              <img src={"/women/" + woman.id.replace(/_/g, "-") + ".jpg"} alt={woman.name} style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top" }} />
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:9, letterSpacing:"0.3em", color, fontFamily:"sans-serif", marginBottom:6 }}>ENDING</div>
              <div style={{ fontSize:"clamp(16px,2.5vw,20px)", color, fontFamily:"Georgia,serif", marginBottom:6 }}>{ENDING_LABELS[outcome] || outcome}</div>
              <div style={{ fontSize:10, color:C.muted, fontFamily:"sans-serif" }}>{woman.name} · {woman.city}</div>
            </div>
          </div>
          <div style={{ width:48, height:2, background:color, margin:"0 0 1.5rem" }} />
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
