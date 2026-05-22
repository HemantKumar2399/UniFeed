# Story 7.4: Organizer Dashboard & Distraction-Free Refactor

Status: done
Depends on: [The 3-Tier Dashboard Expansion Layout](https://github.com/HemantKumar822/UniFeed/issues/111)


## Epic 7: MVP UI Migration & Polish
**Epic Goal:** Refactor all Epic 1-5 pages (Home, Dashboard) to match Tactile Utility standards, replacing any legacy feeds with the curated "Campus Pulse".

## Story
As an event organizer,
I want my creation interfaces and analytics tables styled with the new warm minimalism,
So that managing an event doesn't feel like using a chaotic admin panel but a clean utility.

## Acceptance Criteria

**Given** the current Organizer dashboard and form components
**When** I load the dashboard views
**Then** inputs and block editor fields use 1px light gray borders without heavy shadows
**And** the metric views present large bold digits (e.g., "50 RSVPs") in NotionInter with understated warm gray subtitles.

## Development Context
- **Design:** Keep input form factors light without aggressive focus rings. Overwrite default `shadcn/ui` shadows to use thin 1px outline boundaries. 
- **Dependencies:** React Hook Form / Zod integration must remain unchanged, only visually refresh inputs. Tailwind CSS for border/typography updates.

## Tasks / Subtasks

- [x] Analyze acceptance criteria
- [x] Implement core functionality
- [x] Write unit/integration tests
- [x] Review against Tactile Utility guidelines and existing components
