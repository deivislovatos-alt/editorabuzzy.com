const revealItems = document.querySelectorAll("[data-reveal]");

document.documentElement.classList.add("reveal-ready");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const checkoutButtons = document.querySelectorAll("[data-checkout]");

checkoutButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const href = button.getAttribute("href");

    if (!href || href === "#") {
      event.preventDefault();
      return;
    }

    event.preventDefault();

    if (typeof window.fbq === "function") {
      window.fbq("track", "InitiateCheckout", {
        content_name: "Love Challenge",
        content_category: "Practical guide",
        value: 9.90,
        currency: "BRL"
      });
    }

    window.setTimeout(() => {
      window.location.href = href;
    }, 300);
  });
});
