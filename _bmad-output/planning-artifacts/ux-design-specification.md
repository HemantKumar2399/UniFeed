---
title: "Platform UX Design Specification"
status: "completed"
workflow: "bmad-create-ux-design"
inputDocuments: ["docs/product/prd.md", "_bmad-output/implementation-artifacts/FD-1-premium-front-door-journey.md"]
---

# UX/UI Design Specification: Campus Platform Holistic Redesign

## 1. Executive Summary
The Campus Platform must pivot from a standard web-app layout to a "Premium Native-App" paradigm, continuing the "Tactile Utility" design language established in the Front Door journey. The interface will prioritize spatial immersion, glassmorphic layering, and cinematic interactions over traditional nested routing and standard boxed containers. 

## 2. Core UX Paradigms & Themes

### 2.1. Tactile Utility (The Design Language)
- **Materials:** Deep blacks, volumetric dark modes, heavy use of `backdrop-blur-md` (Glassmorphism) over dynamic mesh gradients.
- **Typography:** NotionInter/Inter varying between ultra-bold cinematic headers and highly legible utility text.
- **Haptics:** Every interactive element must have `active:scale-95` to feel physical.
- **Animation:** Spring-based physics (Framer Motion) for all state transitions, no linear easing.

### 2.2. Spatial Architecture (Global Layout)
- **Destruction of the "Page":** Users shouldn't feel like they are loading pages. They should feel like they are sliding panels, expanding cards, and pulling up sheets.
- **Mobile First:** Floating glass nav bars at the bottom. Full-screen edge-to-edge content. Actions exist in Vaul bottom-sheets.
- **Desktop Adaptation:** Ultra-thin sidebars. Content lives in floating asymmetrical bento grids rather than standard container wrappers.

## 3. The Student Experience (Consumer View)

### 3.1. Discovery Feed (The "For You" experience)
- **Concept:** Apple Music meets curated Campus events.
- **Layout:** Edge-to-edge event posters. No white margins. Text and gradients overlay directly on the imagery.
- **Interaction:** Swiping horizontally through curated carousels (e.g., "Trending Today", "Your Clubs").
- **Action:** Tapping an event doesn't load a page; the card uses Framer Motion `layoutId` to seamlessly expand into a full-screen parallax detail view.

### 3.2. immersive Event Detail 
- **Header:** Parallax scrolling image that dissolves into a blurred top-nav as you scroll.
- **Body:** Clean, distraction-free markdown-style typography for event descriptions (Notion-like).
- **Footer:** Floating, sticky glass bottom bar containing the "One-Tap RSVP" button that pulses when spaces are critical.

### 3.3. Digital Wallet / Tickets
- **Concept:** Apple Wallet style stack.
- **Visuals:** Tickets are vertically stacked physical-looking cards. Tapping one slides it up.
- **Dynamic QR:** The QR code glows or pulses, indicating it is active. Brightness is artificially maximized (via CSS/brightness filters when possible) when the ticket is fully opened.

## 4. The Organizer Experience (Creator View)

### 4.1. Command Center / Dashboard
- **Concept:** Bloomberg Terminal but beautiful and simple.
- **Layout:** Dark, data-dense Bento boxes. Minimalist line charts (Recharts) with neon gradient strokes.
- **Metrics:** Real-time counters for ticket sales and capacity, emphasizing momentum.

### 4.2. Event Creation (The Studio)
- **Concept:** Distraction-free writing.
- **Interaction:** No forms. A blank canvas where hitting '/' brings up event building blocks (Time, Image, Capacity). 
- **Preview:** Live side-by-side rendering (on Desktop) or a floating "Preview" toggle (on Mobile) showing exactly what the student will see.

### 4.3. Box Office / Scanning Mode
- **Concept:** Tactical execution.
- **Visuals:** High-contrast, edge-to-edge camera viewport. Large overlay bounding box.
- **Feedback:** Giant full-screen green flash with a satisfying animation for success; red jitter/shake for denied/invalid tickets.

## 5. Next Steps for Implementation
1. Tear down existing `/(protected)` layouts that rely on static sidebars.
2. Setup the global `AnimatePresence` context to handle layout ID routing.
3. Build the core atomic components: `FloatingGlassNav`, `CardExpander`, `BottomSheetAction`.
