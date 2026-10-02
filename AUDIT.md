\# FE-10 Accessibility \& Performance Audit



\## Project



\*\*Project:\*\* KTU Mate

\*\*Feature audited:\*\* Avigu AI Chat

\*\*Route:\*\* `/avigu`

\*\*Live URL:\*\* https://ktu-mate.vercel.app/avigu

\*\*Assignment:\*\* FE-10 — Accessibility and Performance Audit

\*\*Date:\*\* 2 October 2026



\---



\## 1. Lighthouse Mobile — Before



A Lighthouse Mobile audit was performed on the deployed `/avigu` page using:



\* Device: Moto G Power

\* Network: Slow 4G

\* Lighthouse: 13.4.1



\### Baseline Results



| Metric                         |  Before |

| ------------------------------ | ------: |

| Performance                    |  \*\*91\*\* |

| Accessibility                  | \*\*100\*\* |

| First Contentful Paint (FCP)   |   2.8 s |

| Largest Contentful Paint (LCP) |   2.8 s |

| Total Blocking Time (TBT)      |   70 ms |

| Cumulative Layout Shift (CLS)  |       0 |

| Speed Index                    |   2.8 s |



\### Main Performance Findings



\* Render-blocking requests — estimated savings: 1,750 ms

\* Legacy JavaScript — 47 KiB

\* Document request latency

\* Minify JavaScript — estimated savings: 61 KiB

\* Reduce unused JavaScript — estimated savings: 111 KiB

\* JavaScript execution time: 1.4 s

\* Main-thread work: 2.6 s

\* 6 long tasks



The audit also reported that the page loaded too slowly to finish within the time limit, so some results may be incomplete.



\### Screenshot



`FE-10-Before-Lighthouse-Mobile-Avigu.png`



\---



\## 2. WAVE Accessibility Audit — Before



WAVE was used to inspect the deployed `/avigu` page.



\### Initial WAVE Summary



| Result              |    Count |

| ------------------- | -------: |

| Errors              |        2 |

| Contrast Errors     |        1 |

| Alerts              |        1 |

| Features            |        1 |

| Structural Elements |        1 |

| ARIA                |        0 |

| AIM Score           | 7.9 / 10 |



\### Reported Issues



1\. Missing alternative text — 1

2\. Language missing or invalid — 1

3\. No page regions — 1



The primary page heading was also identified as a Heading Level 1.



A keyboard-only check of the primary flow showed:



\* Focus visible: Yes

\* Chat input keyboard accessible: Yes

\* Send button keyboard accessible: Yes

\* Stop button keyboard accessible: Yes

\* Primary chat flow completable using keyboard: Yes



\### Screenshot



`FE-10-Before-WAVE-Avigu.png`



\---



\## 3. Accessibility Improvements



The following accessibility improvements were implemented.



\### Page Language



The root HTML element was explicitly configured with:



```html

<html lang="en">

```



This provides a valid language declaration for screen readers and accessibility tools.



\### Semantic Structure



The Avigu page uses a semantic `<main>` element and a proper `<h1>` heading:



```html

<h1>Meet Avigu 🤖</h1>

```



The navigation also has an accessible label:



```html

<nav aria-label="Main navigation">

```



\### Chat Input Label



The chat input was given an accessible label:



```html

<label htmlFor="avigu-chat-input" className="sr-only">

&#x20; Ask Avigu a question

</label>

```



The input uses the matching ID:



```html

<input id="avigu-chat-input" ... />

```



\### Keyboard Focus



Interactive elements were updated with visible keyboard focus states using `focus-visible` styles.



This includes:



\* Navigation links

\* Mobile navigation controls

\* Example prompt buttons

\* Chat input

\* Send button

\* Stop button

\* Retry button

\* Links inside AI responses



\### AI Streaming Accessibility



Assistant responses use a polite live region:



```tsx

aria-live="polite"

```



This allows assistive technologies to announce streamed AI responses without aggressively interrupting the user.



\### Keyboard-Reachable Stop Button



The streaming state includes a normal keyboard-focusable button:



```tsx

<button type="button" onClick={() => stop()}>

&#x20; Stop

</button>

```



The user can therefore stop an active AI response without requiring a mouse.



\### Decorative Elements



Decorative icons in the empty state were marked as hidden from assistive technologies using:



```html

aria-hidden="true"

```



\---



\## 4. Lighthouse Mobile — After



After implementing the accessibility improvements, the deployed `/avigu` page was audited again using the same Lighthouse Mobile configuration.



\### Final Results



| Metric        | Before |     After |     Change |

| ------------- | -----: | --------: | ---------: |

| Performance   |     91 |    \*\*90\*\* |         -1 |

| Accessibility |    100 |   \*\*100\*\* |          0 |

| FCP           |  2.8 s |     2.9 s |     +0.1 s |

| LCP           |  2.8 s |     2.9 s |     +0.1 s |

| TBT           |  70 ms | \*\*10 ms\*\* | \*\*-60 ms\*\* |

| CLS           |      0 |         0 |          0 |

| Speed Index   |  2.8 s |     3.0 s |     +0.2 s |



\### Final Lighthouse Scores



\* \*\*Performance: 90\*\*

\* \*\*Accessibility: 100\*\*



Both required Lighthouse scores are above the assignment target of 90.



\### Remaining Performance Opportunities



The final audit still identified:



\* Render-blocking requests — estimated savings: 1,600 ms

\* Legacy JavaScript — 47 KiB

\* Document request latency

\* Minify JavaScript — estimated savings: 61 KiB

\* Reduce unused JavaScript — estimated savings: 111 KiB

\* 4 long tasks



The page also continued to report a slow-loading warning during the mobile throttled audit.



These are identified as future performance optimization opportunities and did not prevent the final Lighthouse scores from meeting the assignment threshold.



\### Screenshot



`FE-10-After-Lighthouse-Mobile-Avigu.png`



\---



\## 5. WAVE Verification — After



The WAVE report was rechecked after the accessibility changes.



The WAVE summary continued to display:



\* Errors: 2

\* Contrast Errors: 1

\* Alerts: 1

\* Features: 1

\* Structural Elements: 1

\* ARIA: 0

\* AIM Score: 7.9 / 10



However, additional verification of the deployed page showed that some WAVE summary results were inconsistent with the actual page.



\### Deployment Verification



The deployed HTML was inspected directly.



Results:



\* `<html lang="en">` — present

\* `<img>` elements — 0

\* `<svg>` elements — 0

\* `role="img"` elements — 0

\* Valid `<h1>` — present

\* Chat input has an associated accessible label

\* Stop button is keyboard reachable

\* Assistant messages use `aria-live="polite"`



The WAVE contrast detail view also reported:



> No contrast errors were detected in the page.



The reported contrast ratio was \*\*8.59:1\*\*, passing WCAG AA and AAA for the checked text.



Because the WAVE summary remained inconsistent with the deployed HTML and detailed checks, the remaining WAVE findings are documented rather than claiming that the tool reported zero errors.



\---



\## 6. Keyboard-Only Verification



The main Avigu chat flow was tested using only the keyboard.



\### Tested Flow



1\. Navigate to the Avigu page.

2\. Navigate through interactive elements using `Tab`.

3\. Focus the chat input.

4\. Enter a question.

5\. Submit the question using the keyboard.

6\. Observe the streamed AI response.

7\. Reach the Stop button using the keyboard.

8\. Stop the response.

9\. Navigate to the Retry button when an error occurs.

10\. Retry the request.



\### Result



\*\*Primary chat flow is keyboard accessible.\*\*



Focus indicators were visible on interactive controls, and the Stop button was reachable without a mouse.



\---



\## 7. AI-Specific Accessibility



The Avigu chat includes accessibility support specifically for AI-generated streaming content.



\### Streamed Response



Assistant messages use:



```tsx

aria-live="polite"

```



This allows screen readers to receive updates from the AI response while avoiding an overly disruptive announcement mode.



\### Stop Control



During streaming, the Stop button remains a standard keyboard-focusable button.



This allows users to interrupt a long or unwanted AI response using keyboard interaction.



\---



\## 8. Summary of Changes



\### Accessibility



\* Added/verified valid document language.

\* Improved semantic page structure.

\* Added accessible navigation label.

\* Added accessible chat input label.

\* Added visible keyboard focus states.

\* Added `aria-live="polite"` to assistant responses.

\* Ensured Stop button is keyboard accessible.

\* Added appropriate `aria-hidden` handling for decorative content.

\* Added accessible retry/error interactions.



\### Performance



The audit also verified that the application maintains:



\* CLS of 0

\* Low TBT of 10 ms in the final audit

\* Lighthouse Performance score of 90

\* Lighthouse Accessibility score of 100



\---



\## 9. Final Audit Status



| Requirement                          | Result                        |

| ------------------------------------ | ----------------------------- |

| Lighthouse Mobile Performance ≥ 90   | \*\*PASS — 90\*\*                 |

| Lighthouse Mobile Accessibility ≥ 90 | \*\*PASS — 100\*\*                |

| Keyboard-only primary flow           | \*\*PASS\*\*                      |

| Visible keyboard focus               | \*\*PASS\*\*                      |

| AI streamed output accessibility     | \*\*PASS — aria-live="polite"\*\* |

| Keyboard-reachable Stop button       | \*\*PASS\*\*                      |

| Before/After measurements recorded   | \*\*PASS\*\*                      |

| Lighthouse screenshots captured      | \*\*PASS\*\*                      |

| WAVE findings documented             | \*\*PASS\*\*                      |



\---



\## 10. Conclusion



The FE-10 accessibility and performance audit was completed for the deployed Avigu AI chat experience.



The final Lighthouse Mobile audit achieved \*\*90 Performance\*\* and \*\*100 Accessibility\*\*. The primary chat flow was verified using keyboard-only interaction, and AI-specific accessibility was improved through polite live announcements and a keyboard-reachable Stop control.



Remaining WAVE summary discrepancies and performance opportunities have been documented for transparency and future improvement.



