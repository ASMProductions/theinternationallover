// pages/api/sequence/send-emails.js
// IL The International Lover - Email sequence sender
// Triggered by GitHub Action 3x weekly (Mon/Wed/Fri) at 2am UTC

import nodemailer from "nodemailer";

const SITE = "https://theinternationallover.com";
const FUNNEL_KEY = "vetting-standard";

// Email sequence (7 emails)
const emailSequence = [
  {
    step: 1,
    subject: "Before you meet anyone — you need to meet yourself",
    day: 0,
    body: `Your Vetting Standard PDF is ready.

Before you read it, understand this: "What you discover about the women is secondary. What you discover about yourself is the point."

The vetting standard is not a checklist for her. It is a mirror for you.

When you ask the right questions — the precise questions — you will learn more about yourself than about her. You will discover what you actually believe. What you actually want. What you are actually capable of building.

Most men never ask themselves these questions because they have never been tested. They have never had to.

International dating tests you. It requires that you know yourself before you meet her.

The PDF teaches you how to see that test. How to receive it. How to use it.

Read it. The reflection matters more than the checklist.

— The International Lover`,
  },
  {
    step: 2,
    subject: "What most men don't understand about where she is",
    dayRange: [2, 4],
    body: `Her father's silence is not indifference. It is evaluation.

Her family's honor is not her individual choice. It is structural. It shapes every decision she makes.

What is not said in her culture carries as much weight as what is. A quiet man watching is not passive — he is assessing.

Islam governs the rhythm of her daily life, not as theory but as the framework of her morning, her prayers, her relationships, her future.

If you are meeting a woman internationally, you are meeting her inside her context. Not as an individual choosing freely from the world. As a woman whose choices are shaped by family, faith, culture, and history.

Most men miss this. They see a woman on a platform and think she is unmoored from her culture. She is not. She is more rooted in it, not less.

The Vetting Standard teaches you to recognize that context. To ask questions that actually receive her as she is — not as you imagine her.

That is the beginning of clarity.`,
  },
  {
    step: 3,
    subject: "What happens when you ask the real questions",
    dayRange: [5, 6],
    body: `There are three kinds of women:

Genuine: She is who she says she is. Her faith is real. Her family is involved. Her answers are specific and grounded. Her commitment is rooted in something deeper than the idea of a man.

Not yet: She is genuine and sincere, but her foundation is incomplete. She is using the idea of a husband to fill a space where a community should be. The wrong woman at any time or the right woman at the wrong time. Both are the same failure.

Scam: She is not who she says she is. The story changes. The details contradict. Money appears early. The answers are vague and beautiful but never specific.

The vetting standard teaches you to distinguish between them.

Not through suspicion. Through specificity.

A genuine woman will tell you her story with precision. She will mention her grandmother's name. She will describe what her family gathering actually looks like. She will tell you her mother's expectations, not in theory but in concrete terms.

A scam will give you beauty. Never detail.

The questions you ask — and how you receive the answers — determine what you discover.`,
  },
  {
    step: 4,
    subject: "\"If I ask these questions, won't she think I don't trust her?\"",
    dayRange: [7, 9],
    body: `This is the question that stops most men.

The answer is: a woman who runs from specificity was never yours.

A genuine woman — a woman building something real, not something performative — will respect your clarity. She will understand that you are not suspicious. You are serious.

Think about it: if a woman was meeting a man and his entire family structure was unfamiliar to her, and she wanted to understand what she was actually entering, she would ask questions. Specific ones. About his family, his intentions, his community, his faith.

She would not see questions as betrayal. She would see them as care.

The man who asks specificity is the man who is prepared to receive her world — not just imagine it. He is saying: "I want to understand what I am actually entering. I want to see you as you are."

That is respect. That is the beginning of real partnership.

The women who disappear when you ask? You already got your answer.

That is not a loss. That is clarity.`,
  },
  {
    step: 5,
    subject: "What a man discovered when he started asking",
    dayRange: [10, 11],
    body: `A brother from Atlanta started with the vetting standard. Genuine skepticism. Not sure it would work.

First woman: beautiful answers, vague details. After three weeks, the story began to shift. Small contradictions. When he asked a specific follow-up question, she disconnected.

He got his answer. Saved three months.

Second woman: specific from the first message. She told him her father was a teacher. Her mother had passed. She was the eldest of four. She had not responded to others before because no one had earned a conversation with her. Each detail grounded. Verifiable. Real.

He asked carefully. She answered precisely. Three months of conversations. Family introduction. Her father's questions. His own reflection.

He proposed.

"She told me afterward," the brother said, "that she knew I was the one when I asked her specific questions early. Because it meant I cared enough to see her — not just imagine her."

The vetting is the connection. Not the obstacle.`,
  },
  {
    step: 6,
    subject: "The course teaches what no book can — conversation",
    dayRange: [12, 13],
    body: `The PDF gives you the framework. The eight modules of the course do something different.

They teach you how vetting actually sounds — not as theory, but as real conversations between a man asking and a woman answering. The pauses. The follow-ups. The moments when you know you are getting a real answer vs. a performed one.

You meet women from every region — North America, North Africa, West Africa, the Middle East. Each operating inside her own context. Her own family structure. Her own cultural honor system.

You learn to recognize what "a quiet man watching" actually means in Accra. What "a father's silence" means in Fez. What "a family meeting" means in Dearborn.

You walk through scenarios. You make choices. You see the consequences — not as punishment, but as reflection. What you learn about the woman is secondary. What you learn about yourself is the point.

Plus: the community of brothers doing this work. The consultations. The real conversations about what you are discovering — about them and about yourself.

This is not theory. This is lived practice.

One enrollment. Full access. Forever.`,
  },
  {
    step: 7,
    subject: "You already know the framework. Now comes the test.",
    dayRange: [14, 16],
    body: `You have the Vetting Standard. You know what precision looks like. You know what genuine sounds like.

Now comes the question: are you ready to apply it?

There are two paths:

One: You try alone. You apply the framework to conversations you are already having. You discover through trial. You learn which questions actually land and which ones push her away. You develop through your own experience.

Two: You walk the path with someone who has already walked it. Who knows every region. Every context. Every cultural framework. Every moment when the vetting deepens the connection instead of damaging it.

The course is that second path. Not because the first path doesn't work. But because the second path is cleaner. Faster. Less costly in time and heartbreak.

"Before you meet anyone, you need to meet yourself." That self-knowledge is what the course accelerates.

The framework is clear. The next step is you.

When you are ready, enrollment is one decision away.

Your mirror is waiting.`,
  },
];

export default async function handler(req, res) {
  // Verify the request is from GitHub Action (check authorization token)
  const authToken = req.headers.authorization?.split(" ")[1];
  if (authToken !== process.env.SEQUENCE_AUTH_TOKEN) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // 1. Get all subscribers from Redis set
    const redisRes = await fetch(process.env.UPSTASH_REDIS_REST_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(["SMEMBERS", `sequence:${FUNNEL_KEY}:pending`]),
    });

    if (!redisRes.ok) {
      return res.status(500).json({ error: "Redis fetch failed" });
    }

    const redisData = await redisRes.json();
    const subscribers = redisData.result || [];

    let sent = 0;
    let errors = [];

    // 2. For each subscriber, check eligibility and send
    for (const email of subscribers) {
      try {
        // Get subscriber data
        const dataRes = await fetch(process.env.UPSTASH_REDIS_REST_URL, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify([
            "GET",
            `sequence:${FUNNEL_KEY}:data:${email}`,
          ]),
        });

        const dataResult = await dataRes.json();
        let subscriberData = dataResult.result
          ? JSON.parse(dataResult.result)
          : {
              email,
              signup_timestamp: Math.floor(Date.now() / 1000),
              current_step: 0,
              sent_emails: [],
            };

        // Calculate days elapsed
        const now = Math.floor(Date.now() / 1000);
        const daysElapsed = Math.floor(
          (now - subscriberData.signup_timestamp) / 86400
        );

        // Find which email to send
        let emailToSend = null;
        for (const emailDef of emailSequence) {
          if (subscriberData.sent_emails.includes(emailDef.step)) {
            continue; // Already sent
          }

          // Check day eligibility
          if (emailDef.dayRange) {
            if (
              daysElapsed >= emailDef.dayRange[0] &&
              daysElapsed <= emailDef.dayRange[1]
            ) {
              emailToSend = emailDef;
              break;
            }
          } else if (emailDef.day === 0 && daysElapsed === 0) {
            emailToSend = emailDef;
            break;
          }
        }

        // Send email if eligible
        if (emailToSend) {
          await sendEmail(email, emailToSend);
          subscriberData.current_step = emailToSend.step;
          subscriberData.sent_emails.push(emailToSend.step);

          // Update Redis
          await fetch(process.env.UPSTASH_REDIS_REST_URL, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify([
              "SET",
              `sequence:${FUNNEL_KEY}:data:${email}`,
              JSON.stringify(subscriberData),
            ]),
          });

          sent++;
        }
      } catch (err) {
        errors.push({ email, error: err.message });
      }
    }

    return res.status(200).json({
      success: true,
      sent,
      total: subscribers.length,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (err) {
    console.error("Sequence send error:", err);
    return res.status(500).json({ error: err.message });
  }
}

async function sendEmail(to, emailDef) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 465),
    secure: Number(process.env.SMTP_PORT || 465) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"The International Lover" <${process.env.SMTP_USER}>`,
    to,
    subject: emailDef.subject,
    text: emailDef.body,
    html: `
      <div style="background:#f5f5f5;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;color:#333;">
        <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:8px;padding:32px;border:1px solid #ddd;">
          <h2 style="font-family:Georgia,serif;color:#2c2c2c;font-size:20px;margin:0 0 16px;">${emailDef.subject}</h2>
          <p style="font-size:15px;line-height:1.6;color:#333;margin:0 0 14px;white-space:pre-line;">${emailDef.body}</p>
          <hr style="border:none;border-top:1px solid #eee;margin:24px 0;" />
          <p style="font-size:12px;color:#666;text-align:center;margin:0;">
            The International Lover &middot; <a href="${SITE}" style="color:#333;">theinternationallover.com</a>
          </p>
        </div>
      </div>`,
  });
}
