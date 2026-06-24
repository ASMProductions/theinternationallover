import { useState, useEffect } from "react";

const C = {
  navy:"#1a3a6b", navyDeep:"#0f2347", navyMid:"#1e4080",
  gold:"#b8963e", goldLight:"#d4af6a",
  goldDim:"#7a6228", cream:"#f0e6cc", creamDim:"#c8b890",
  muted:"#8a7a5a", mutedDark:"#5a4e32",
  border:"#1e3a6e", dark:"#091a35",
  scarlet:"#8b1a1a",
};

const COURSE_OPENING = [
  "Before you meet anyone, you need to meet yourself.",
  "What you are about to encounter is not a game. It is a mirror. Every decision you make inside these scenarios reflects a decision you are capable of making in real life — and the consequences that follow are the consequences real men have lived.",
  "Some of these women are genuine. Some are not. Some are genuine and still wrong for you. You will not be told which is which. You will have to determine that yourself — the same way you will have to determine it in the real world.",
  "What you discover about the women is secondary. What you discover about yourself is the point.",
  "— The International Lover™",
];

const REGIONS_COURSE = [
  {
    id:"na", label:"North Africa", desc:"Morocco · Tunisia · Algeria · Egypt",
    context:"North Africa operates on a high-context cultural framework. What is not said carries as much weight as what is. Family honor is structural, not sentimental. A father's silence is not indifference — it is evaluation. Islam governs the rhythm of daily life.",
    women:[
      { id:"nadia", name:"Nadia", age:24, city:"Fez, Morocco", religion:"Muslim (practicing)", platform:"Muslima.com",
        profileText:"I am a teacher. I love books and the Arabic language. I come from a family that holds education and faith as its highest values. I am not looking for adventure. I am looking for a husband who is serious about building a home. My father will speak for me when the time is right.",
        hidden:"Her father is a retired Arabic calligrapher. Her mother passed away three years ago. She is the eldest of four siblings and has managed the household since. She has never been on a platform before. She has not responded to the last eleven messages she received.",
        signal:"Her profile has been active four months. Zero responses. Most men interpret this as disinterest. It is neither.",
        type:"genuine" },
      { id:"yasmine", name:"Yasmine", age:22, city:"Casablanca, Morocco", religion:"Muslim (moderate)", platform:"Muslima.com",
        profileText:"I am a young woman who loves life, travel, and learning new things. American men seem to understand women better than men here. I want a partner who will be my equal and treat me with respect. I believe love has no borders.",
        hidden:"Yasmine has been on this platform for fourteen months. She has initiated contact with forty-three men. Three sent money before disappearing. She has a boyfriend named Karim who encouraged the platform. They have discussed what they will do when a foreign man offers marriage.",
        signal:"She responds within minutes, in fluent English, with warmth and specificity. It feels like being seen.",
        type:"fraud" },
      { id:"fatima", name:"Fatima-Zahra", age:27, city:"Meknes, Morocco", religion:"Muslim (deeply practicing)", platform:"Muslima.com",
        profileText:"I seek a husband who fears Allah and leads his home with knowledge and wisdom. My father will conduct all initial communications on my behalf. If you are serious, write to him directly.",
        hidden:"Her father is a respected Islamic scholar. He has already turned away six suitors. She does not know this profile exists — her father created it.",
        signal:"You cannot contact her directly. Most men skip this one entirely. The ones who do not are immediately in a different category.",
        type:"genuine_wrong" },
    ],
    scenario:{ title:"First Contact",
      setup:"You have reviewed all three profiles. Yasmine has already sent you a message: 'I saw your profile. You seem like a genuine man. I don't meet many of those here.' It arrived twelve minutes after you created your account. Nadia's profile shows 847 views and zero responses. Fatima-Zahra requires you to contact her father.",
      choices:[
        { id:"a", text:"Respond to Yasmine — she reached out first and her English is excellent", consequence:"She responds in four minutes. The conversation flows easily. On day five she mentions her phone needs repair but doesn't ask for anything directly." },
        { id:"b", text:"Send a careful first message to Nadia in French, referencing her teaching work", consequence:"No reply for eleven days. On the twelfth, three sentences in formal French. She thanks you. She will write again when she has more to say." },
        { id:"c", text:"Request Fatima-Zahra's father's contact information and compose a formal letter", consequence:"His contact is provided. You spend two days composing a letter. His reply arrives in seven days — in classical Arabic. You need a translator." },
      ]
    },
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
        type:"genuine" },
      { id:"hessa", name:"Hessa", age:23, city:"Beirut, Lebanon", religion:"Muslim (cultural)", platform:"Muslima.com",
        profileText:"I am curious about everything. I believe the world is larger than where you were born. I am looking for a man who is going somewhere — and who wants to take me with him. I believe in partnership, not tradition.",
        hidden:"Her father is a former journalist forced to leave Lebanon in 2019. The family has been in financial difficulty since. Her mother has told her more than once that an American husband would solve several problems. Whether her attraction is to marriage, a particular man, or a different country is a question she has not fully answered for herself.",
        signal:"The profile is written for a Western man. Every line speaks to Western values. This can mean she is genuinely bicultural. It can also mean she is performing for an audience.",
        type:"genuine_wrong" },
      { id:"maryam", name:"Maryam", age:29, city:"Irbid, Jordan", religion:"Muslim (deeply practicing)", platform:"Muslima.com",
        profileText:"I have spent my life studying words. I understand their weight. I will not spend them carelessly here. I am looking for a man of substance. My brother manages this account on my behalf.",
        hidden:"Maryam has a published book of Arabic poetry used in secondary schools. Her brother has turned away six inquiries without telling her. They disagreed. He still manages the account but now must tell her before dismissing anyone.",
        signal:"The platform shows this account has been active eleven months with one recorded inquiry sent — to someone else. She reached out once. That person did not respond.",
        type:"genuine" },
    ],
    scenario:{ title:"First Contact",
      setup:"Sara's profile is direct. Hessa has a profile that speaks fluent Western. Maryam requires contact through her brother. Each represents a completely different entry point.",
      choices:[
        { id:"a", text:"Message Sara directly — her English is clear and her profile is honest", consequence:"She replies in three days. One paragraph. She asks: 'What does a good husband look like to you?'" },
        { id:"b", text:"Message Hessa — she is the most immediately accessible culturally", consequence:"She responds within an hour. Warm. Effortless. On day eight she mentions her father is going through financial difficulty." },
        { id:"c", text:"Write formally to Maryam's brother", consequence:"He responds in Arabic after five days: 'Before I pass your message to her, I need to understand who you are.'" },
      ]
    },
    endings:{
      success:"The religion question was answered honestly. The family meeting in Amman went well. Her father asked about your family — you had thought about this. When she arrived, she brought her mother's recipe book and her grandmother's prayer rug. You understood what that meant.",
      early_detect:"Hessa's warmth was real but her motivation was an exit, not a marriage. When you asked what she loved about her life exactly as it was, she went quiet for a long time. Her answer told you everything. You ended it kindly.",
      cultural_fail:"You misrepresented your religious practice to gain access to the family. The marriage began on a lie. When the truth surfaced — and it always surfaces — the damage was to both of you.",
      fraud_pre:"The financial pressure was always present. After the Green Card, the requests escalated. You caught the pattern before citizenship. The attorney consultation came first. The damage was limited.",
      fraud_post:"She had a brother she wanted to bring over. The marriage was the instrument. Post-citizenship, the plan executed exactly as it had been designed, long before she met you.",
    }
  },
  {
    id:"as", label:"Asia", desc:"Indonesia · Philippines · Bangladesh",
    context:"The common threads across Asia: family embeddedness, high-context communication, and the reality that the economic gap between an American man and her family can be large enough to distort the power dynamic significantly. That last point is the primary source of fraud in this arc — usually not malice but desperation given a direction.",
    women:[
      { id:"amira", name:"Amira", age:25, city:"Yogyakarta, Indonesia", religion:"Muslim (traditionalist)", platform:"Muslima.com",
        profileText:"My family is my world. My faith is my foundation. I am not looking for a man to take me somewhere. I am looking for a man to build something with me — here or wherever Allah wills. My father speaks for me.",
        hidden:"Amira's father is an imam of a small mosque. She has no strong desire to go to America — she would go if her husband was good, stay if her husband was good. She is genuinely indifferent to geography. This will confuse men who assume she wants an exit.",
        signal:"Most men on the platform approach women from this region assuming they want to leave. Her profile does not say this. Most men miss that.",
        type:"genuine" },
      { id:"jasmine", name:"Jasmine", age:24, city:"Cebu, Philippines", religion:"Catholic", platform:"ChristianMingle",
        profileText:"Family is everything to me. I take care of my parents and my two younger brothers. I want a husband who understands that when you marry me, you marry my whole family. Not in a burden way — in a love way.",
        hidden:"Her father has a heart condition requiring medication her family struggles to afford. She sends forty percent of her salary home monthly. She has a two-year-old son from a relationship that ended. She has not included this in her profile. She intends to disclose it once a connection is established.",
        signal:"The profile is honest about family embeddedness. What it does not say will surface when she trusts you enough to say it.",
        type:"genuine_wrong" },
      { id:"nurul", name:"Nurul", age:28, city:"Dhaka, Bangladesh", religion:"Muslim (practicing privately)", platform:"Muslima.com",
        profileText:"I believe marriage is a partnership. I am not looking to be managed. I am looking for a man who is secure enough to be beside me rather than above me. I am traditional in my values and contemporary in my methods.",
        hidden:"She has been on this platform two months after four years of family introductions that failed — the men found her too educated, too independent, too direct. She is here not because she wants a foreign man specifically but because the men in her community cannot accept what she is.",
        signal:"She is not looking for rescue. The test of this arc is not whether you can vet her. It is whether you are the man she would accept.",
        type:"genuine" },
    ],
    scenario:{ title:"First Contact",
      setup:"Amira's father must be contacted first. Jasmine's profile is warm and family-centered — she has not yet disclosed her son. Nurul's profile is direct and intelligent. Three very different entry points. Three very different tests.",
      choices:[
        { id:"a", text:"Contact Amira through her father as instructed", consequence:"Her father replies thoughtfully. He asks about your faith and your intentions. He does not ask about money." },
        { id:"b", text:"Message Jasmine — her profile is warm and her English is strong", consequence:"She responds with warmth and specificity. She asks about your family immediately. The conversation feels like meeting someone." },
        { id:"c", text:"Message Nurul — her profile is the most intellectually direct", consequence:"She responds in 24 hours. One paragraph. She asks one question that is harder than it appears." },
      ]
    },
    endings:{
      success:"You understood that her family's financial need was real and not shameful. You discussed what remittances would look like before the marriage, not after. The son she disclosed early told you who she was. The marriage was built on that foundation.",
      early_detect:"The poverty gap was real. The requests were real. But you held the line — no money before the vetting was complete. She respected it. Or she revealed herself. Either way, you were protected.",
      cultural_fail:"You thought you understood Asian culture because it felt familiar. You did the least preparation. She was not passive. She was polite. Those are not the same thing.",
      fraud_pre:"The financial gravity was always present. The requests escalated once she arrived. You caught it before citizenship — the separate account, the money transfers you did not authorize. Limited damage.",
      fraud_post:"She was sending money home throughout the marriage. After citizenship, the transfers became larger. Then she was gone. The child remained.",
    }
  },
  {
    id:"la", label:"Latin America", desc:"Colombia · Dominican Republic · Peru",
    context:"Latin America is the arc with the most cultural overlap with American experience and therefore the most dangerous false sense of familiarity. The man who enters this arc thinking he understands it because he has watched Spanish-language television has not begun to understand it.",
    women:[
      { id:"valentina", name:"Valentina", age:27, city:"Medellin, Colombia", religion:"Catholic (practicing)", platform:"SimplyMarry.com",
        profileText:"I believe a home needs a foundation. I am not looking for a vacation. I am looking for a husband. If you are serious, I will know. If you are not, I will also know.",
        hidden:"She was engaged three years ago to a local man who left her two months before the wedding. The experience made her more discerning rather than more desperate. She has ended three previous platform conversations because she felt something was being performed rather than lived.",
        signal:"The profile reads like a woman testing for authenticity before warmth. That is exactly what she is doing.",
        type:"genuine" },
      { id:"diana", name:"Diana", age:22, city:"Santo Domingo, Dominican Republic", religion:"Catholic (cultural)", platform:"SimplyMarry.com",
        profileText:"I want a better life. I am not ashamed to say this. My country is difficult. I work hard and I want a man who works hard with me. I want children and a home. I want a husband who will be faithful. I will be faithful to him.",
        hidden:"Diana is honest in her profile. She does want a better life — that is genuine. She has a two-year-old son from a relationship that ended. She has not included this. She intends to disclose it once a connection is established.",
        signal:"The phrase 'I want a better life' is sometimes read as a red flag. In Diana's case it is not. The undisclosed child is. How she handles that disclosure will tell you more about her than anything else.",
        type:"genuine_wrong" },
      { id:"elena", name:"Elena", age:30, city:"Lima, Peru", religion:"Catholic with indigenous traditions", platform:"SimplyMarry.com",
        profileText:"I have spent years going into communities the city forgets. I have seen what a family without a father becomes. I do not want that for myself. I am looking for a serious man — not a perfect man, but a man who is committed to being better.",
        hidden:"She has been proposed to twice and declined both. The American man was her closest to yes. She declined because he said he would want her to stop working after they had children. She told him she could not agree. The proposal died.",
        signal:"She is accomplished and has already filtered out men who could not accept her whole life. The test of this arc is not whether you can vet her. It is whether you are the man she would accept.",
        type:"genuine" },
    ],
    scenario:{ title:"First Contact",
      setup:"Valentina's profile tests for authenticity immediately. Diana's profile is disarmingly honest about wanting a better life. Elena's profile tells you exactly who she is — if you read it carefully.",
      choices:[
        { id:"a", text:"Message Valentina — her directness is appealing", consequence:"She replies in two days. She asks one question: 'What does a good husband look like to you?'" },
        { id:"b", text:"Message Diana — her honesty about wanting a better life is refreshing", consequence:"She responds warmly. The conversation develops quickly. On week three she mentions her son." },
        { id:"c", text:"Message Elena — her profile is the most substantive", consequence:"She responds in 48 hours. She has read your profile carefully. She asks whether you have any experience with community work." },
      ]
    },
    endings:{
      success:"Valentina tested you three times before she showed warmth. You passed each time — not by performing but by being consistent. Her father assessed you in the first five minutes of meeting you. The assessment was silent. You passed that too.",
      early_detect:"Diana's son was disclosed on week three. You received it with respect and honesty — you were not sure you were ready to be a step-father and you said so directly. She appreciated the honesty. You ended it with dignity on both sides.",
      cultural_fail:"You thought the familiarity of Latin culture meant you were prepared. The father's dinner table was an evaluation you did not know you were sitting at. She did not become someone else. She became who she always was, once the performance of early love had passed.",
      fraud_pre:"The Americanization began before the first year was over. What she was in Medellin and what she was becoming in America were visibly different. You caught it before it became irreversible.",
      fraud_post:"The erosion was quiet and cumulative. She was never a villain. She was a woman placed in an environment that constantly offered her an alternative identity. You had not protected the marriage from that environment.",
    }
  },
  {
    id:"ss", label:"Sub-Saharan Africa", desc:"Senegal · Ghana · Ethiopia · Kenya",
    context:"Community is the primary unit of reality. The bride price negotiation is not a transaction — it is a covenant between two families. A man who treats it as a fee is immediately revealed as someone who does not understand what he is entering.",
    women:[
      { id:"fatou", name:"Fatou", age:26, city:"Dakar, Senegal", religion:"Muslim (Sufi — Tijaniyya)", platform:"Muslima.com",
        profileText:"I come from a family of teachers and scholars. My grandfather was a marabout. My father is a teacher. I am a teacher. I am looking for a man who understands that a wife brings more than her body to a home — she brings her lineage, her faith, and her gifts.",
        hidden:"Fatou's Sufi tradition is central to who she is. The Tijaniyya order has its own practices, rhythms, and community obligations. A man who dismisses Sufi Islam as unorthodox will be filtered out by her family long before he understands what happened.",
        signal:"The profile does not mention wanting to leave Senegal. It mentions wanting a man who understands lineage. These are different things.",
        type:"genuine" },
      { id:"abena", name:"Abena", age:24, city:"Accra, Ghana", religion:"Christian (Pentecostal)", platform:"SimplyMarry.com",
        profileText:"I believe God has a plan for every life. I believe that plan includes a good marriage and a family built on faith. I am not desperate — I am deliberate. My parents are involved in everything important that I do. This is not a warning. It is a promise.",
        hidden:"Abena's uncle is a well-known Pentecostal pastor in Accra. Her family will expect you to attend a service during any visit — not as a cultural experience, as a statement of who you are. A secular man will not survive this family's evaluation.",
        signal:"The last line — 'This is not a warning. It is a promise' — is telling you something precise. Receive it precisely.",
        type:"genuine_wrong" },
      { id:"tigist", name:"Tigist", age:28, city:"Addis Ababa, Ethiopia", religion:"Ethiopian Orthodox Christian", platform:"Muslima.com",
        profileText:"I am on this platform because my family asked me to consider men from outside Ethiopia. I am not certain this is the right path for me. But I am willing to be shown that it is. I am serious, faithful, and I will not waste your time if you do not waste mine.",
        hidden:"Ethiopian Orthodox Christianity has over 250 fasting days, its own liturgical calendar, and its own deeply embedded community practices. Her family created this profile hoping she will meet an Ethiopian man from the diaspora. A non-Ethiopian man will need to demonstrate extraordinary cultural seriousness.",
        signal:"She says she is not certain this is the right path. That is not rejection. It is honesty. Most men read it as rejection.",
        type:"genuine" },
    ],
    scenario:{ title:"First Contact",
      setup:"Fatou's profile speaks of lineage and knowledge. Abena promises family involvement — directly. Tigist admits uncertainty. Each of these opening positions is a test of how you read what is in front of you.",
      choices:[
        { id:"a", text:"Message Fatou — knowledge and lineage speak to you", consequence:"She replies in four days. Formal, warm, precise. She asks about your relationship with your own lineage." },
        { id:"b", text:"Message Abena — her directness is appealing", consequence:"She responds within a day. She asks whether you have a church or faith community. It is the first question." },
        { id:"c", text:"Message Tigist — her honesty about uncertainty is unusual and interesting", consequence:"She responds in three days. She says: 'Most men do not respond to that line. You did. Why?'" },
      ]
    },
    endings:{
      success:"You entered a lineage, a community, and a tradition that predates your own country. The bride price negotiation was conducted with respect — you asked what the items represented before discussing amounts. The children of this marriage will be multilingual, multicultural, and connected to a history the American education system largely erased.",
      early_detect:"You recognized the romance scam pattern early — the escalating financial crisis, the perfect English, the photo that returned results under a different name. You walked away before it cost you more than your time.",
      cultural_fail:"Your intentions were good. Your preparation was not. The bride price conversation was treated as a transaction to get through efficiently. The arc did not end dramatically — it ended in a series of cooling conversations and a father who stopped returning calls.",
      fraud_pre:"The post-Green Card period revealed the pattern. The money was moving in directions you had not agreed to. You caught it before citizenship with the help of an attorney you consulted before saying anything.",
      fraud_post:"The citizenship was the goal. The marriage was the instrument. After naturalization, the departure was organized and deliberate. The children remained. This ending is documented — not hypothetical.",
    }
  },
];

const ENDING_LABELS = {
  success:"I — Successful Marriage",
  early_detect:"II — Failed Vetting — Pre-Travel",
  cultural_fail:"III — Failed Relationship — Cultural Misnavigation",
  fraud_pre:"IV — Fraudulent Marriage — Pre-Citizenship",
  fraud_post:"V — Fraudulent Marriage — Post-Citizenship",
};

const ENDING_COLORS = {
  success:"#b8963e",
  early_detect:"#7a6228",
  cultural_fail:"#8a7a5a",
  fraud_pre:"#8b1a1a",
  fraud_post:"#6b0f0f",
};

function ILShield({ size=48 }) {
  return (
    <svg viewBox="0 0 60 72" width={size} style={{ display:"block" }}>
      <path d="M30 2 L54 10 L54 38 C54 54 43 64 30 70 C17 64 6 54 6 38 L6 10 Z" fill="none" stroke={C.gold} strokeWidth="1.5"/>
      <path d="M30 8 L50 15 L50 38 C50 52 40 61 30 66 C20 61 10 52 10 38 L10 15 Z" fill={C.dark} stroke={C.goldDim} strokeWidth="0.75"/>
      <text x="30" y="42" textAnchor="middle" fill={C.gold} fontSize="14" fontFamily="sans-serif" fontWeight="700" letterSpacing="1">IL</text>
      <text x="30" y="10" textAnchor="middle" fill={C.gold} fontSize="10">✦</text>
    </svg>
  );
}

function ProfileCard({ woman, selected, onSelect, revealed }) {
  return (
    <div onClick={onSelect} style={{ cursor:"pointer", border:`2px solid ${selected?"#b8963e":"#1e3a6e"}`, background:selected?"rgba(184,150,62,0.08)":"#0f2347", padding:"1.25rem", transition:"all 0.3s", boxShadow:selected?"0 0 20px rgba(184,150,62,0.25)":"none", position:"relative" }}>
      {selected && <div style={{ position:"absolute", top:-10, left:"50%", transform:"translateX(-50%)", background:"#b8963e", color:"#0f2347", fontSize:8, fontWeight:700, letterSpacing:"0.15em", padding:"2px 10px", fontFamily:"sans-serif", whiteSpace:"nowrap" }}>ACTIVE</div>}
      <div style={{ display:"flex", gap:12, marginBottom:10 }}>
        <div style={{ width:48, height:60, background:"#1a3a6b", border:"1px solid #3a2e18", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <svg viewBox="0 0 30 40" width="28"><ellipse cx="15" cy="12" rx="8" ry="9" fill="#0f2347"/><path d="M3 38 Q3 24 15 24 Q27 24 27 38 Z" fill="#0f2347"/></svg>
        </div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:14, color:"#d4af6a", fontFamily:"Georgia,serif", marginBottom:2 }}>{woman.name}</div>
          <div style={{ fontSize:9, color:"#8a7a5a", fontFamily:"sans-serif" }}>{woman.age} · {woman.city}</div>
          <div style={{ fontSize:9, color:"#8a7a5a", fontFamily:"sans-serif" }}>{woman.religion}</div>
          <div style={{ fontSize:9, color:"#5a4e32", fontFamily:"sans-serif", marginTop:2 }}>{woman.platform}</div>
        </div>
      </div>
      <div style={{ fontSize:10, color:"#c8b890", lineHeight:1.65, fontFamily:"sans-serif", fontStyle:"italic", borderTop:"0.5px solid #1e3a6e", paddingTop:8 }}>"{woman.profileText.slice(0,120)}..."</div>
      {revealed && (
        <div style={{ marginTop:10, padding:8, background:"rgba(139,26,26,0.15)", border:"0.5px solid #8b1a1a" }}>
          <div style={{ fontSize:8, color:"#8b1a1a", letterSpacing:"0.1em", fontFamily:"sans-serif", marginBottom:4 }}>INTELLIGENCE FILE</div>
          <div style={{ fontSize:9, color:"#c8b890", lineHeight:1.65, fontFamily:"sans-serif" }}>{woman.hidden}</div>
          <div style={{ fontSize:9, color:"#7a6228", lineHeight:1.5, fontFamily:"sans-serif", marginTop:6, fontStyle:"italic" }}>Signal: {woman.signal}</div>
        </div>
      )}
    </div>
  );
}

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

export default function CoursePage() {
  const [phase, setPhase] = useState("intro");
  const [activeRegionId, setActiveRegionId] = useState(null);
  const [selectedWomanId, setSelectedWomanId] = useState(null);
  const [revealedCards, setRevealedCards] = useState([]);
  const [choiceHistory, setChoiceHistory] = useState([]);
  const [scenarioStep, setScenarioStep] = useState(0);
  const [outcome, setOutcome] = useState(null);
  const [stampedRegions, setStampedRegions] = useState([]);

  useEffect(() => { window.scrollTo({ top:0, behavior:"instant" }); }, [phase, activeRegionId]);

  const region = activeRegionId ? REGIONS_COURSE.find(r => r.id === activeRegionId) : null;
  const woman = region && selectedWomanId ? region.women.find(w => w.id === selectedWomanId) : null;

  const goBack = () => { window.location.href = "/library"; };

  const selectRegion = (id) => { setActiveRegionId(id); setSelectedWomanId(null); setRevealedCards([]); setChoiceHistory([]); setScenarioStep(0); setOutcome(null); setPhase("roster"); };

  const handleChoice = (choice) => {
    const newHistory = [...choiceHistory, choice];
    setChoiceHistory(newHistory);
    if (newHistory.length >= 2) {
      let ending = "success";
      if (woman.type === "fraud") ending = Math.random() > 0.4 ? "fraud_post" : "fraud_pre";
      else if (woman.type === "genuine_wrong") ending = Math.random() > 0.5 ? "cultural_fail" : "early_detect";
      else ending = Math.random() > 0.7 ? "cultural_fail" : "success";
      setOutcome(ending);
      setPhase("outcome");
    } else {
      setScenarioStep(s => s + 1);
    }
  };

  const completeRegion = () => {
    if (!stampedRegions.includes(activeRegionId)) {
      setStampedRegions(s => [...s, activeRegionId]);
    }
    setPhase("map");
    setActiveRegionId(null);
    setSelectedWomanId(null);
  };

  const revealNext = () => {
    if (!region) return;
    const unrevealed = region.women.map(w => w.id).filter(id => !revealedCards.includes(id));
    if (unrevealed.length > 0) setRevealedCards(r => [...r, unrevealed[0]]);
  };

  // ── INTRO ──
  if (phase === "intro") return (
    <div style={{ minHeight:"100vh", background:C.dark, color:C.cream, fontFamily:"Georgia,serif" }}>
      <NavBar left={<button onClick={goBack} style={{ background:"none", border:"1px solid #b8963e", color:"#b8963e", padding:"6px 14px", borderRadius:"20px", cursor:"pointer", fontSize:"13px", fontFamily:"sans-serif" }}>← Library</button>} title="Course Opening" />
      <div style={{ maxWidth:620, margin:"0 auto", padding:"4rem 1.5rem", textAlign:"center" }}>
        <div style={{ fontSize:9, letterSpacing:"0.3em", color:C.gold, fontFamily:"sans-serif", marginBottom:16 }}>BEFORE YOU BEGIN</div>
        <ILShield size={52} />
        <div style={{ margin:"2rem 0" }}>
          {COURSE_OPENING.split("

").map((p, i, arr) => (
            <p key={i} style={{ fontSize:"clamp(13px,1.8vw,15px)", color: i === COURSE_OPENING.length-1 ? C.gold : C.creamDim, lineHeight:1.9, marginBottom:"1.25rem", fontFamily:"sans-serif", fontStyle: i === COURSE_OPENING.length-1 ? "italic" : "normal" }}>{p}</p>
          ))}
        </div>
        <button onClick={() => setPhase("map")} style={{ padding:"14px 40px", background:C.gold, color:C.navyDeep, border:"none", cursor:"pointer", fontSize:13, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", fontFamily:"sans-serif" }}>
          Enter the Map →
        </button>
      </div>
    </div>
  );

  // ── MAP ──
  if (phase === "map") return (
    <div style={{ minHeight:"100vh", background:C.dark, color:C.cream, fontFamily:"Georgia,serif" }}>
      <NavBar
        left={<button onClick={goBack} style={{ background:"none", border:"1px solid #b8963e", color:"#b8963e", padding:"6px 14px", borderRadius:"20px", cursor:"pointer", fontSize:"13px", fontFamily:"sans-serif" }}>← Library</button>}
        title="Select Your Destination"
        right={<div style={{ fontSize:10, color:C.muted, fontFamily:"sans-serif" }}>{stampedRegions.length} / 5 stamped</div>}
      />
      <div style={{ maxWidth:860, margin:"0 auto", padding:"2.5rem 1.5rem" }}>

        {/* Passport */}
        <div style={{ background:C.navyDeep, border:"1px solid #1e3a6e", padding:"1.25rem", marginBottom:"2rem", textAlign:"center" }}>
          <div style={{ fontSize:9, letterSpacing:"0.2em", color:C.mutedDark, fontFamily:"sans-serif", marginBottom:10 }}>YOUR PASSPORT</div>
          <div style={{ display:"flex", justifyContent:"center", gap:12, flexWrap:"wrap", marginBottom:12 }}>
            {REGIONS_COURSE.map(r => (
              <div key={r.id} style={{ display:"inline-flex", flexDirection:"column", alignItems:"center", justifyContent:"center", width:64, height:64, borderRadius:"50%", border:`1.5px ${stampedRegions.includes(r.id)?"solid":"dashed"} #b8963e`, background:stampedRegions.includes(r.id)?"rgba(184,150,62,0.12)":"transparent", opacity:stampedRegions.includes(r.id)?1:0.3 }}>
                <div style={{ fontSize:6.5, color:C.gold, fontFamily:"sans-serif", textAlign:"center", lineHeight:1.35 }}>{r.label.toUpperCase().split(" ").join("
")}</div>
              </div>
            ))}
          </div>
          {stampedRegions.length === 5 && (
            <button onClick={() => setPhase("certificate")} style={{ padding:"10px 24px", background:C.gold, color:C.navyDeep, border:"none", cursor:"pointer", fontSize:12, fontWeight:700, fontFamily:"sans-serif", letterSpacing:"0.1em" }}>
              Claim Your Certificate →
            </button>
          )}
        </div>

        {/* Region cards */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(240px,1fr))", gap:16 }}>
          {REGIONS_COURSE.map(r => (
            <div key={r.id} onClick={() => selectRegion(r.id)}
              style={{ background:C.navyDeep, border:`1px solid ${stampedRegions.includes(r.id)?C.gold:"#1e3a6e"}`, padding:"1.5rem", cursor:"pointer", transition:"border-color 0.2s", position:"relative" }}
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

  // ── ROSTER ──
  if (phase === "roster" && region) return (
    <div style={{ minHeight:"100vh", background:C.dark, color:C.cream, fontFamily:"Georgia,serif" }}>
      <NavBar
        left={<button onClick={() => setPhase("map")} style={{ background:"none", border:"1px solid #b8963e", color:"#b8963e", padding:"6px 14px", borderRadius:"20px", cursor:"pointer", fontSize:"13px", fontFamily:"sans-serif" }}>← Map</button>}
        title={`${region.label} — Your Roster`}
      />
      <div style={{ maxWidth:860, margin:"0 auto", padding:"2rem 1.5rem" }}>
        <div style={{ background:C.navyDeep, border:"1px solid #1e3a6e", padding:"1rem 1.25rem", marginBottom:"1.5rem" }}>
          <div style={{ fontSize:9, letterSpacing:"0.2em", color:C.gold, fontFamily:"sans-serif", marginBottom:6 }}>REGIONAL CONTEXT</div>
          <p style={{ fontSize:12, color:C.creamDim, lineHeight:1.75, fontFamily:"sans-serif", margin:0 }}>{region.context}</p>
        </div>
        <p style={{ fontSize:11, color:C.muted, fontFamily:"sans-serif", marginBottom:"1rem", lineHeight:1.65 }}>Three women are presented. Select who you wish to pursue first. You may switch at any decision point — but switching has consequences.</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(240px,1fr))", gap:14, marginBottom:"1.5rem" }}>
          {region.women.map(w => (
            <ProfileCard key={w.id} woman={w} selected={selectedWomanId === w.id} onSelect={() => setSelectedWomanId(w.id)} revealed={revealedCards.includes(w.id)} />
          ))}
        </div>
        <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
          <button
            onClick={() => { if (selectedWomanId) { setChoiceHistory([]); setScenarioStep(0); setOutcome(null); setPhase("scenario"); } }}
            disabled={!selectedWomanId}
            style={{ padding:"12px 28px", background:selectedWomanId?C.gold:"#1e3a6e", color:selectedWomanId?C.navyDeep:C.mutedDark, border:"none", cursor:selectedWomanId?"pointer":"default", fontSize:12, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", fontFamily:"sans-serif" }}>
            Begin Scenario →
          </button>
          <button onClick={revealNext} disabled={revealedCards.length >= 3}
            style={{ padding:"12px 20px", background:"transparent", color:revealedCards.length>=3?C.mutedDark:C.muted, border:"1px solid #1e3a6e", cursor:revealedCards.length>=3?"default":"pointer", fontSize:11, fontFamily:"sans-serif" }}>
            Reveal Intelligence ({3 - revealedCards.length} remaining)
          </button>
        </div>
      </div>
    </div>
  );

  // ── SCENARIO ──
  if (phase === "scenario" && region && woman) {
    const scenario = region.scenario;
    const lastChoice = choiceHistory[choiceHistory.length - 1];
    const showDecisions = !lastChoice || scenarioStep < scenario.choices.length;

    return (
      <div style={{ minHeight:"100vh", background:C.dark, color:C.cream, fontFamily:"Georgia,serif" }}>
        <NavBar
          left={<button onClick={() => setPhase("roster")} style={{ background:"none", border:"1px solid #b8963e", color:"#b8963e", padding:"6px 14px", borderRadius:"20px", cursor:"pointer", fontSize:"13px", fontFamily:"sans-serif" }}>← Roster</button>}
          title={`${region.label} · ${scenario.title}`}
          right={<div style={{ fontSize:9, color:C.mutedDark, fontFamily:"sans-serif" }}>Step {scenarioStep + 1}</div>}
        />
        <div style={{ maxWidth:680, margin:"0 auto", padding:"2rem 1.5rem" }}>

          {/* Dashboard */}
          <div style={{ display:"flex", gap:8, marginBottom:"1.5rem", flexWrap:"wrap" }}>
            {region.women.map(w => (
              <div key={w.id} style={{ padding:"4px 10px", background:w.id===selectedWomanId?"rgba(184,150,62,0.15)":C.navyDeep, border:`1px solid ${w.id===selectedWomanId?C.gold:"#1e3a6e"}`, fontSize:9, fontFamily:"sans-serif" }}>
                <span style={{ color:w.id===selectedWomanId?C.goldLight:C.mutedDark }}>{w.name}</span>
                <span style={{ color:w.id===selectedWomanId?C.gold:"#2a3a5e", marginLeft:6 }}>{w.id===selectedWomanId?"● ACTIVE":"○ COOLING"}</span>
              </div>
            ))}
            <button onClick={() => { setChoiceHistory([]); setScenarioStep(0); setPhase("roster"); }} style={{ padding:"4px 10px", background:"transparent", border:"1px solid #1e3a6e", color:C.muted, fontSize:9, fontFamily:"sans-serif", cursor:"pointer" }}>Switch Woman</button>
          </div>

          {/* Setup */}
          <div style={{ background:C.navyDeep, border:"1px solid #1e3a6e", borderLeft:"3px solid #b8963e", padding:"1.25rem", marginBottom:"1.5rem" }}>
            <div style={{ fontSize:9, letterSpacing:"0.15em", color:C.gold, fontFamily:"sans-serif", marginBottom:8 }}>THE SITUATION</div>
            <p style={{ fontSize:"clamp(13px,1.8vw,15px)", color:C.creamDim, lineHeight:1.85, fontFamily:"sans-serif", margin:0 }}>{scenario.setup}</p>
          </div>

          {/* Consequence */}
          {lastChoice && (
            <div style={{ background:"rgba(184,150,62,0.06)", border:"0.5px solid #b8963e", padding:"1rem 1.25rem", marginBottom:"1.5rem" }}>
              <div style={{ fontSize:9, letterSpacing:"0.15em", color:C.goldDim, fontFamily:"sans-serif", marginBottom:6 }}>CONSEQUENCE OF YOUR LAST DECISION</div>
              <p style={{ fontSize:12, color:C.creamDim, lineHeight:1.75, fontFamily:"sans-serif", margin:0, fontStyle:"italic" }}>{lastChoice.consequence}</p>
            </div>
          )}

          {/* Decisions */}
          {showDecisions ? (
            <div>
              <div style={{ fontSize:9, letterSpacing:"0.15em", color:C.gold, fontFamily:"sans-serif", marginBottom:10 }}>DECISION POINT — What do you do?</div>
              {scenario.choices.map(choice => (
                <button key={choice.id} onClick={() => handleChoice(choice)}
                  style={{ width:"100%", textAlign:"left", padding:"1rem 1.25rem", background:C.navyDeep, border:"1px solid #1e3a6e", cursor:"pointer", marginBottom:8, fontFamily:"sans-serif", display:"block" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor=C.gold}
                  onMouseLeave={e => e.currentTarget.style.borderColor="#1e3a6e"}>
                  <div style={{ fontSize:9, color:C.goldDim, letterSpacing:"0.1em", marginBottom:4 }}>DECISION</div>
                  <div style={{ fontSize:13, color:C.cream, lineHeight:1.6 }}>{choice.text}</div>
                </button>
              ))}
            </div>
          ) : (
            <div style={{ textAlign:"center", padding:"2rem" }}>
              <p style={{ fontSize:13, color:C.creamDim, fontFamily:"sans-serif", marginBottom:16 }}>Your decisions are unfolding...</p>
              <button onClick={() => { const endings = Object.keys(region.endings); const e = endings[Math.floor(Math.random()*endings.length)]; setOutcome(e); setPhase("outcome"); }}
                style={{ padding:"12px 28px", background:C.gold, color:C.navyDeep, border:"none", cursor:"pointer", fontSize:12, fontWeight:700, fontFamily:"sans-serif" }}>
                See Outcome →
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── OUTCOME ──
  if (phase === "outcome" && region && outcome) {
    const color = ENDING_COLORS[outcome];
    return (
      <div style={{ minHeight:"100vh", background:C.dark, color:C.cream, fontFamily:"Georgia,serif" }}>
        <NavBar title={`${region.label} — Outcome`} />
        <div style={{ maxWidth:640, margin:"0 auto", padding:"3rem 1.5rem" }}>
          <div style={{ textAlign:"center", marginBottom:"2rem" }}>
            <div style={{ fontSize:9, letterSpacing:"0.3em", color, fontFamily:"sans-serif", marginBottom:8 }}>ENDING</div>
            <div style={{ fontSize:"clamp(16px,2.5vw,22px)", color, fontFamily:"Georgia,serif", marginBottom:16 }}>{ENDING_LABELS[outcome]}</div>
            <div style={{ width:48, height:2, background:color, margin:"0 auto" }} />
          </div>
          <div style={{ background:C.navyDeep, border:`1px solid ${color}`, borderLeft:`4px solid ${color}`, padding:"1.5rem", marginBottom:"1.5rem" }}>
            <p style={{ fontSize:"clamp(13px,1.8vw,15px)", color:C.creamDim, lineHeight:1.9, fontFamily:"sans-serif", margin:0 }}>{region.endings[outcome]}</p>
          </div>
          <div style={{ display:"flex", gap:10, flexWrap:"wrap", justifyContent:"center" }}>
            <button onClick={() => { setChoiceHistory([]); setScenarioStep(0); setOutcome(null); setPhase("scenario"); }}
              style={{ padding:"10px 20px", background:"transparent", color:C.gold, border:`1px solid ${C.gold}`, cursor:"pointer", fontSize:11, fontFamily:"sans-serif" }}>
              Replay This Arc
            </button>
            <button onClick={completeRegion}
              style={{ padding:"10px 20px", background:C.gold, color:C.navyDeep, border:"none", cursor:"pointer", fontSize:11, fontWeight:700, fontFamily:"sans-serif" }}>
              {stampedRegions.includes(activeRegionId) ? "Return to Map →" : "Stamp Passport & Continue →"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── CERTIFICATE ──
  if (phase === "certificate") return (
    <div style={{ minHeight:"100vh", background:C.dark, color:C.cream, fontFamily:"Georgia,serif" }}>
      <NavBar
        left={<button onClick={goBack} style={{ background:"none", border:"1px solid #b8963e", color:"#b8963e", padding:"6px 14px", borderRadius:"20px", cursor:"pointer", fontSize:"13px", fontFamily:"sans-serif" }}>← Library</button>}
        title="Certificate of Commission"
      />
      <div style={{ maxWidth:600, margin:"0 auto", padding:"3rem 1.5rem", textAlign:"center" }}>
        <div style={{ background:"linear-gradient(160deg,#0f2347,#1a3a6b)", border:"2px solid #b8963e", padding:"3rem 2rem", position:"relative", boxShadow:"0 20px 60px rgba(0,0,0,0.5)" }}>
          {["top-left","top-right","bottom-left","bottom-right"].map(p => (
            <div key={p} style={{ position:"absolute", [p.includes("top")?"top":"bottom"]:12, [p.includes("left")?"left":"right"]:14, fontSize:16, color:C.gold, opacity:0.4 }}>✦</div>
          ))}
          <div style={{ fontSize:9, letterSpacing:"0.3em", color:C.muted, fontFamily:"sans-serif", marginBottom:16 }}>THE INTERNATIONAL LOVER™</div>
          <ILShield size={52} />
          <div style={{ display:"flex", justifyContent:"center", gap:8, margin:"16px 0", flexWrap:"wrap" }}>
            {REGIONS_COURSE.map(r => (
              <div key={r.id} style={{ display:"inline-flex", flexDirection:"column", alignItems:"center", justifyContent:"center", width:44, height:44, borderRadius:"50%", border:"1.5px solid #b8963e", background:"rgba(184,150,62,0.12)" }}>
                <div style={{ fontSize:5.5, color:C.gold, fontFamily:"sans-serif", textAlign:"center", lineHeight:1.3 }}>{r.label.split(" ").map(w=>w.slice(0,3).toUpperCase()).join("
")}</div>
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
