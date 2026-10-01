// Contact Form Email Integration

const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");
const emailInput = document.getElementById("email");
const nameInput = document.getElementById("name");
const messageInput = document.getElementById("message");

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    // Reset validation states
    emailInput.classList.remove("invalid");
    formMessage.className = "";
    formMessage.textContent = "";

    // 1. Check for empty fields
    if (name === "" || email === "" || message === "") {
        formMessage.className = "error-msg";
        formMessage.textContent = "Please fill in all the required fields.";
        return;
    }

    // 2. Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        emailInput.classList.add("invalid");
        formMessage.className = "error-msg";
        formMessage.textContent = "Invalid email address! Please enter a correct email format (e.g. name@example.com).";
        return;
    }

    // 3. UI Loading State
    const submitBtn = contactForm.querySelector("button[type='submit']");
    const originalBtnText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    formMessage.className = "info-msg";
    formMessage.textContent = "Sending your message...";

    // 4. Send email via FormSubmit AJAX service
    fetch("https://formsubmit.co/ajax/rounakbharti22@gmail.com", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name: name,
            email: email,
            message: message,
            _subject: "New Portfolio Message from " + name,
            _replyto: email
        })
    })
    .then(function(response) {
        if (response.ok) {
            return response.json();
        }
        throw new Error("Network response was not ok");
    })
    .then(function(data) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;

        formMessage.className = "success-msg";
        formMessage.textContent = "Thank you, " + name + "! Your message has been sent successfully to Rounak's Gmail.";
        contactForm.reset();
    })
    .catch(function(error) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;

        formMessage.className = "error-msg";
        formMessage.textContent = "Failed to send message. Please try again or email directly to rounakbharti22@gmail.com.";
    });
});

// Mobile Navigation
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", function () {
        navMenu.classList.toggle("active");
    });
}