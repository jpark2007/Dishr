import type { Metadata } from "next";
import { LegalLayout, Section } from "@/components/legal";

export const metadata: Metadata = {
  title: "Terms of Service — Becipe",
  description: "The terms for using Becipe.",
};

export default function Terms() {
  return (
    <LegalLayout title="Terms of Service" updated="June 1, 2026">
      <Section heading="Acceptance">
        <p>
          By creating an account or using Becipe, you agree to these Terms. If you don't
          agree, please don't use the app. You must be at least 13 (or the minimum age in
          your region) to use Becipe.
        </p>
      </Section>

      <Section heading="Your account">
        <p>
          You're responsible for your account and for keeping your login secure. Provide
          accurate information, and don't impersonate others or share your account in ways
          that violate these Terms.
        </p>
      </Section>

      <Section heading="Your content">
        <p>
          You own the recipes, photos, and other content you create. By posting, you grant
          Becipe a non-exclusive, worldwide license to host, display, and distribute that
          content within the app for the purpose of operating the service. You can delete
          your content at any time.
        </p>
        <p>
          You're responsible for what you post and confirm you have the right to share it.
        </p>
      </Section>

      <Section heading="Acceptable use">
        <p>You agree not to:</p>
        <ul>
          <li>Post content that is illegal, harmful, hateful, harassing, or infringing.</li>
          <li>Spam, scrape, or abuse the service or other users.</li>
          <li>Attempt to break, overload, or reverse-engineer the app or its security.</li>
          <li>Misrepresent recipes in ways that could endanger someone's health or safety.</li>
        </ul>
        <p>
          We may remove content and suspend or terminate accounts that violate these Terms.
          We provide in-app tools to report and block content and users.
        </p>
      </Section>

      <Section heading="Recipes are not professional advice">
        <p>
          Becipe is a community platform. Recipes and nutrition or dietary information are
          provided by users and for general purposes only. Cook safely, check for allergens,
          and use your judgment.
        </p>
      </Section>

      <Section heading="Termination">
        <p>
          You can stop using Becipe and delete your account at any time. We may suspend or
          end access if you violate these Terms or to protect the service and its users.
        </p>
      </Section>

      <Section heading="Disclaimers & liability">
        <p>
          Becipe is provided "as is," without warranties of any kind. To the fullest extent
          permitted by law, Becipe is not liable for indirect or consequential damages
          arising from your use of the app.
        </p>
      </Section>

      <Section heading="Changes & contact">
        <p>
          We may update these Terms as the app evolves and will note the date above.
          Continued use after changes means you accept them. Questions? Email{" "}
          <a href="mailto:hello@becipe.app">hello@becipe.app</a>.
        </p>
      </Section>
    </LegalLayout>
  );
}
