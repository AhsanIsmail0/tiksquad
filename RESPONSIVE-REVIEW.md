# Mobile and tablet redesign — October 28, 2026

Existing homepage sections and order are retained. Desktop service/process pins, horizontal results and growth zoom remain in their desktop layout.

## Implemented

- Mobile dashboard hero uses native horizontal snapping, three labeled controls and unobstructed gallery targets; tablets show two cards with a third available by swiping.
- About metrics reveal progressively. The dashboard banner becomes an orderly four-image composition with a central message.
- Native sticky service stacks use the available viewport height. Mobile experience cards stack; tablets use a two-column experience grid. Short landscape screens use normal document flow.
- The growth graphic highlights the nearest visible row and its connections. Tablet cards have enough vertical separation. Mobile retains the hub and four readable cards.
- Compact responsive result panels retain exact reporting context and gallery links.
- The process becomes a progressing mobile timeline and tablet grid. Recommendations have responsive sizing, arrows and a live slide count.
- Mobile navigation locks background scrolling and restores focus; galleries use delegated links, including the responsive result panels.
- Desktop effects are owned by one reversible context. Desktop/mobile transitions remove and restore pins and the smooth-scrolling wrapper. Direct section links restore their header offset after initialization.
- Reduced-motion rules remove sticky stacks and entrance animation. The motion preference listener stops marquee autoplay and removes carousel transition duration.

## Browser evidence

Tested CSS viewport widths: 360, 390, 768, 820 and 1024 pixels, plus 844×390 landscape and 1440×900 desktop.

- No document horizontal overflow at these sizes.
- Desktop: 11 pin spacers. Mobile/tablet: zero desktop pin spacers, static wrapper.
- Desktop → mobile → desktop lifecycle checked; no abandoned desktop pins on return to mobile.
- Short landscape: zero service or experience sticky cards.
- Actual phone scroll: first two service cards held at 88 and 98 px. The first experience card held at 88 px while the next approached.
- Mobile hero opened US Shop Management at 1/5, and the next image advanced to 2/5.
- Menu open/Escape and background lock checked. Recommendation next control changed pagination from 1/2 to 2/2.
- Direct services, experience, growth-system and recommendations URLs settled about 88 px below the viewport top.
- Tablet growth cards have a gap between top and bottom rows; no hub/card collision was detected.
- No broken loaded images or captured JavaScript errors during the inspected sessions. JavaScript syntax checks passed.

Reduced-motion branches were reviewed in source; an operating-system preference change and physical-device Safari testing were not performed. Existing performance, metadata and evidence-context findings from AUDIT.md remain separate work. The earlier audit's responsive overlap, deep-link and resize findings are addressed by this revision.
