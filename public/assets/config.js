/* ===== EDIT THESE BEFORE GOING LIVE =====
   Every page reads this one file. Empty values fall back gracefully:
   - no bookingUrl: "Book a call" buttons scroll to the inquiry form
   - no Stripe link: package buttons use bookingUrl, then the inquiry form
   - no formEndpoint: the inquiry form opens the visitor's email app, pre-filled */
window.CONFIG = {
  brand: "Delight Choice Services",
  email: "contact@delightchoiceservices.com",
  bookingUrl: "",        // e.g. https://calendly.com/yourname/15min
  formEndpoint: "",      // e.g. https://formspree.io/f/xxxxxxx (free plan works)
  stripe: {
    starter: "",         // Stripe Payment Link: Launch Page deposit ($375)
    expert: ""           // Stripe Payment Link: Expert Site deposit ($900)
  }
};
