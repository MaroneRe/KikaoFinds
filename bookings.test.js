import { calculateNights, calculateTotal, validateDates, createBookingLink } from './booking.js';

describe('KikaoFinds Booking Logic - No M-Pesa', () => {
  test('calculates nights correctly', () => {
    expect(calculateNights('2026-05-01', '2026-05-03')).toBe(2);
  });

  test('total price = nights * 5000', () => {
    expect(calculateTotal(3)).toBe(15000);
    expect(calculateTotal(0)).toBe(0);
  });

  test('validates dates', () => {
    expect(validateDates('2026-05-01', '2026-05-03').valid).toBe(true);
    expect(validateDates('2026-05-03', '2026-05-01').valid).toBe(false);
    expect(validateDates('', '').valid).toBe(false);
  });

  test('creates email link with godiwio0@gmail.com', () => {
    const link = createBookingLink('email', { checkin: '2026-05-01', checkout: '2026-05-03', nights: 2, total: 10000, guests: '2 guests' });
    expect(link).toContain('godiwio0@gmail.com');
    expect(link).toContain('mailto:');
  });

  test('creates whatsapp link with 254101051030', () => {
    const link = createBookingLink('whatsapp', { checkin: '2026-05-01', checkout: '2026-05-03', nights: 2, total: 10000, guests: '2 guests' });
    expect(link).toContain('254101051030');
    expect(link).toContain('wa.me');
  });

  test('no mpesa link exists', () => {
    const link = createBookingLink('mpesa', {});
    expect(link).toBeNull();
  });
});