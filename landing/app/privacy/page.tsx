import type { Metadata } from "next";
import { LegalLayout, Section } from "@/components/legal";

export const metadata: Metadata = {
  title: "Privacy Policy — Becipe",
  description: "How Becipe collects, uses, and protects your data.",
};

export default function Privacy() {
  return (
    <LegalLayout title="Privacy Policy" updated="June 1, 2026">
      <Section heading="The short version">
        <p>
          Becipe is a social recipe app. We collect the information needed to run your
          account, personalize recipe recommendations, and let you share with other cooks.
          We don't sell your personal data. You can delete your account and data at any time.
        </p>
      </Section>

      <Section heading="Information we collect">
        <ul>
          <li><strong>Account info</strong> — your email, display name, and username when you sign up.</li>
          <li><strong>Profile &amp; taste data</strong> — your palate preferences (the "palate vector") and any bio or avatar you add.</li>
          <li><strong>Content you create</strong> — recipes, photos, ratings, tries, comments, albums, and saves.</li>
          <li><strong>Usage data</strong> — basic analytics about how the app is used (screens viewed, features used) and crash diagnostics, used to improve the product.</li>
          <li><strong>Device data</strong> — standard technical info such as device type and app version.</li>
        </ul>
      </Section>

      <Section heading="How we use it">
        <ul>
          <li>To create and operate your account and the social feed.</li>
          <li>To personalize recipe matching to your palate.</li>
          <li>To show your public activity (recipes, tries, ratings) to people who follow you.</li>
          <li>To improve reliability and features through aggregate analytics.</li>
          <li>To send you essential service messages and, if you opt in, product updates.</li>
        </ul>
      </Section>

      <Section heading="Service providers">
        <p>We rely on trusted processors who handle data on our behalf:</p>
        <ul>
          <li><strong>Supabase</strong> — database, authentication, and photo storage.</li>
          <li><strong>Analytics &amp; crash reporting</strong> — privacy-respecting product analytics and crash diagnostics.</li>
        </ul>
        <p>These providers may process data in the United States and other regions.</p>
      </Section>

      <Section heading="What's public vs. private">
        <p>
          Recipes you publish, your tries, ratings, username, and profile are visible to
          other users. Drafts and saved-but-unpublished items remain private to you. You
          control what you publish.
        </p>
      </Section>

      <Section heading="User-generated content &amp; safety">
        <p>
          Becipe lets users post content. We provide tools to report objectionable content
          and to block other users, and we remove content that violates our Terms. Repeated
          violations can result in account removal.
        </p>
      </Section>

      <Section heading="Your choices &amp; rights">
        <ul>
          <li><strong>Delete your account</strong> — from Settings, or by emailing us. This permanently removes your account and associated personal data.</li>
          <li><strong>Access &amp; correction</strong> — edit your profile and content at any time, or contact us for a copy of your data.</li>
          <li><strong>Communications</strong> — opt out of non-essential email anytime.</li>
        </ul>
      </Section>

      <Section heading="Data retention">
        <p>
          We keep your data while your account is active. When you delete your account, we
          delete or anonymize your personal data, except where we're required to retain
          limited records by law.
        </p>
      </Section>

      <Section heading="Children">
        <p>
          Becipe is not directed to children under 13 (or the minimum age in your region),
          and we don't knowingly collect their data.
        </p>
      </Section>

      <Section heading="Changes & contact">
        <p>
          We'll update this policy as the app evolves and note the date above. Questions or
          requests? Email <a href="mailto:hello@becipe.app">hello@becipe.app</a>.
        </p>
      </Section>
    </LegalLayout>
  );
}
