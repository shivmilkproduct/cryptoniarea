document.getElementById("registrationForm").addEventListener("submit", async function(e) {

    e.preventDefault();

    const previousSession =
        document.querySelector('input[name="previousSession"]:checked')?.value || "";

    const data = {

        email: document.getElementById("email").value,

        fullName: document.getElementById("fullName").value,

        mobile: document.getElementById("mobile").value,

        college: document.getElementById("college").value,

        level: document.getElementById("level").value,

        previousSession: previousSession,

        commitment: document.getElementById("commitment").checked

    };

    try {

        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbx4sw46Pd0D3G2bP5vyWOUY_jWvVDxRbE2pIXEeQSc4ECr_cuRyc_u_k_O8Np1rbXyT/exec",
            {
                method: "POST",
                body: JSON.stringify(data)
            }
        );

        if (response.ok) {

            document.getElementById("successModal").classList.add("active");

            startRedirectTimer();

            document.getElementById("registrationForm").reset();

        } else {

            alert("Something went wrong.");

        }

    } catch (error) {

        console.error(error);

        alert("Error submitting form.");

    }

});

// FAQ Accordion Fix

document.querySelectorAll(".faq-trigger").forEach((button) => {

    button.addEventListener("click", () => {

        const faqItem = button.parentElement;

        faqItem.classList.toggle("active");

    });

});
