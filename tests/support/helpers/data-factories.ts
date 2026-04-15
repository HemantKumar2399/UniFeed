export const createEventData = (overrides = {}) => ({
  title: 'Annual Hackathon',
  description: 'Biggest tech event on campus',
  date: new Date().toISOString(),
  ...overrides,
});
