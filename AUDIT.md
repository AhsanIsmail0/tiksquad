# TikSquad pre-deployment audit

Reviewed October 27, 2026. Verdict: hold public launch for a technical cleanup and evidence-label review. The local build is suitable for continued review. No site source was changed or deployed during this audit.

## Fix before public launch

| Priority | Finding | Evidence and required action |
|---|---|---|
| High | Direct section URLs do not reliably land on the section | A fresh desktop load with `#experience` settled at scroll Y 0, with Experience about 7,894 px below the viewport. Clicking the Experience navigation link subsequently positioned it at about 105 px. Restore the initial hash after fonts, smooth scrolling and pin layout initialize. |
| High | Desktop scroll state survives a mobile resize | At desktop width there were 11 pin spacers. Resizing to a measured 465 px viewport left the montage and horizontal-facts spacers, a fixed smooth wrapper and its desktop transform. Reloading at the same width produced zero spacers and a static wrapper. Rebuild and tear down the smoother and all pin timelines together across breakpoints; check both resize directions. |
| High | Mobile hero cards obscure one another's click targets | At 465 px, the centre of card 0 hit card 2, and the centre of card 2 hit card 3. Clicking the first card through the browser opened the affiliate gallery. Give each mobile card an unobstructed target, while retaining the approved dashboard composition. |
| High | Logo and favicon assets are unnecessarily large | `ts-monogram.svg` is 1,045,452 bytes; `favicon.svg` is 1,045,538 bytes. They embed the original bitmap rather than containing compact vector paths. Produce tightly cropped, optimized assets and a small favicon. The visible artwork can remain the same. |
| Medium | Too much template payload remains | The initial referenced local files total approximately 5.21 MB before HTTP compression, caching and network behavior. `main.css` alone is 1.22 MB and imports nine font families. Trim unused CSS/font requests and unnecessary dependencies carefully, with animation regression checks. These are static byte counts, not a Lighthouse score or measured transferred bytes. |
| Medium | Sharing and search setup is incomplete | Title and description exist. Open Graph/Twitter preview tags, canonical URL, sitemap and robots file are absent. Add an approved sharing image and metadata after the final public URL is settled. Missing structured data is an improvement opportunity, not itself a launch blocker. |
| Medium | Accessibility needs a focused pass | No skip link; heading levels jump from H2 to H4; split hero text appears letter-spaced in the accessibility tree. The mobile drawer has focus handling but no dialog/modal semantics. Back-to-top always requests smooth motion. Correct semantics and reduced-motion behavior without changing section order. A real screen-reader check remains necessary. |
| Medium | Image loading could be more stable and efficient | None of the 55 static image elements has explicit width/height attributes; six use lazy loading. Existing CSS reserves space in some places, so this is a layout-shift risk rather than a measured CLS failure. Add appropriate dimensions/aspect ratios and lazy loading below the fold. |
| Medium | Deployment handoff is still a review build | The folder contains unused original template assets; the review ZIP uses a smaller selected set. README still describes the former static video-slot visual before documenting the growth graphic later. Package only required files, refresh the README, and verify the deployed result over HTTPS. |

## Content and conversion review

- The headline audience and four service areas are clear. The page repeatedly uses the same dashboards across the hero, About, banner, services, experience and statistics. This makes the page longer without adding equivalent new information. Improve copy and image selection within the approved sections; do not add or remove sections automatically.
- The evidence demonstrates operating experience, but it is not yet a set of complete case studies. A dashboard does not establish the starting point, exact work performed or causal impact. Do not turn the screenshots into guaranteed outcomes or invent client stories.
- Some gallery captions explicitly acknowledge missing periods or years. The 1.5M GMV screenshot also lacks a visible currency. Keep those limits visible; do not promote that figure into a headline until clarified.
- The gallery titled “GMV Max Campaigns” contains a 2025 annual campaign-performance view. That screenshot alone does not establish GMV Max attribution. Relabel the broader gallery accurately or confirm what campaign type it represents.
- Experience galleries are thematic groups, not six proven separate clients. Current wording acknowledges this. Keep that distinction.
- The two recommendations are recommendations for Adnan from professional contacts. Keep their attribution; do not present them as customer reviews.
- LinkedIn remains the approved contact route. No extra contact form or email is needed to finish this build. Confirm that the company page accepts inquiries and someone monitors them. This audit did not send a test message.

## What is already working

- No missing local HTML assets or missing packaged assets were detected by the static scan.
- No duplicate IDs or broken internal section targets were detected. The direct-link bug concerns initialization, not missing IDs.
- Fresh mobile loading showed no horizontal overflow or broken images with assigned sources.
- Mobile navigation opens, Escape closes it, and focus returns to the opener.
- Gallery next-image controls and Escape dismissal work, and focus returns to the opening card. The hero overlap issue is separate from the gallery itself.
- Desktop navigation reaches the Experience section with a header offset.
- No console errors or warnings were captured in the inspected desktop session.
- All 19 supplied dashboard images are represented. Founder/team attribution follows the user's approval; no additional permission to use those supplied images is being requested.

## Information still useful from Ahsan

1. **Result context, if available:** currency/year for the 1.5M screenshot, reporting periods for the undated examples, and whether the annual campaign screenshot belongs under GMV Max. If unavailable, retain honest limitations and broader labels.
2. **Launch destination:** use the existing hosted URL or a custom domain. The existing TikSquad hosted site currently has custom access restricted to the owner account; launching to clients requires a deliberate public-access decision at deployment. Its existing content has not been replaced.
3. **Contact readiness:** confirm company-page inquiries are enabled and monitored. No new email or booking system is required.
4. **Template provenance:** confirm the supplied AVRON template has the appropriate commercial-use license. No purchase evidence was found in the reviewed files. Old membership comments in the GSAP bundle should not be treated as proof that a paid GSAP subscription is required: current official GSAP distribution is free for commercial use. See the [official GSAP README](https://github.com/greensock/GSAP/blob/master/README.md).

## Scope and remaining verification

This audit combined local source/package inspection, desktop navigation, mobile loading/resizing, menu keyboard checks, gallery checks and read-only hosted-site configuration inspection. It did not run Lighthouse, measure real-user Core Web Vitals, validate every visual state on physical phones, test Safari/Firefox, send LinkedIn messages or verify the origin of dashboard results independently. Production HTTPS, compression, caching, public reachability and final metadata must be checked after a staged deployment.

No additional general brand material is needed. The next pass should fix the issues above, preserve the approved section structure, repeat the affected checks, and only then prepare deployment for review.
