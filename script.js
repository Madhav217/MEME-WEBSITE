document.addEventListener("DOMContentLoaded", () => {
    const templateSelect = document.getElementById("template-select");
    const textInputs = document.getElementById("text-inputs");
    const generateBtn = document.getElementById("generate-btn");
    const memeResult = document.getElementById("meme-result");
    const memeImage = document.getElementById("meme-image");
    const downloadLink = document.getElementById("download-link");

    const apiUsername = "bunq217";
    const apiPassword = "madhav217";

    // Fetch meme templates from Imgflip API
    fetch(`https://api.imgflip.com/get_memes`)
        .then(response => response.json())
        .then(data => {
            const memes = data.data.memes;
            memes.forEach(meme => {
                const option = document.createElement("option");
                option.value = meme.id;
                option.textContent = meme.name;
                templateSelect.appendChild(option);
            });
            templateSelect.addEventListener("change", () => {
                if (templateSelect.value) {
                    textInputs.style.display = "block";
                } else {
                    textInputs.style.display = "none";
                    memeResult.style.display = "none";
                }
            });
        });

    // Generate meme
    generateBtn.addEventListener("click", () => {
        const selectedTemplateId = templateSelect.value;
        const topText = document.getElementById("top-text").value;
        const bottomText = document.getElementById("bottom-text").value;

        if (selectedTemplateId && topText && bottomText) {
            const url = `https://api.imgflip.com/caption_image?template_id=${selectedTemplateId}&username=${apiUsername}&password=${apiPassword}&text0=${topText}&text1=${bottomText}`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        memeImage.src = data.data.url;
                        downloadLink.href = data.data.url;
                        memeResult.style.display = "block";
                    } else {
                        alert("Error generating meme. Please try again.");
                    }
                });
        } else {
            alert("Please select a template and enter both top and bottom text.");
        }
    });
});
