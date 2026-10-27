// booking.js - core logic, NO M-Pesa
export function calculateNights(checkin, checkout) {
  const start = new Date(checkin);
  const end = new Date(checkout);
  const diff = end - start;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function calculateTotal(nights, pricePerNight = 5000) {
  if (nights <= 0) return 0;
  return nights * pricePerNight;
}

export function validateDates(checkin, checkout) {
  if (!checkin || !checkout) return { valid: false, msg: "Dates required" };
  const nights = calculateNights(checkin, checkout);
  if (nights <= 0) return { valid: false, msg: "Check-out must be after check-in" };
  return { valid: true, nights };
}

export function createBookingLink(type, details) {
  const { checkin, checkout, nights, total, guests } = details;
  if (type === 'email') {
    return `mailto:godiwio0@gmail.com?subject=Booking ${nights} nights&body=Checkin: ${checkin}, Checkout: ${checkout}, Guests: ${guests}, Total: KES ${total}`;
  }
  if (type === 'whatsapp') {
    return `https://wa.me/254101051030?text=Booking ${nights} nights ${checkin} to ${checkout} for ${guests} - KES ${total}`;
  }
  return null;
}