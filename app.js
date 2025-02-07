document.addEventListener("DOMContentLoaded", () => {
    const urlInput = document.getElementById("urlInput");
    const generateBtn = document.getElementById("generateBtn");
    const downloadBtn = document.getElementById("downloadBtn");
    const errorMessage = document.getElementById("errorMessage");
    const qrContainer = document.getElementById("qrContainer");

    let qrCode;

    function isValidURL(url) {
        const pattern = /^(https?:\/\/)[\w.-]+(\.[a-z]{2,})+(\/\S*)?$/i;
        return pattern.test(url);
    }

    function generateQRCode() {
        const url = urlInput.value.trim();

        if (!isValidURL(url)) {
            errorMessage.style.display = "block";
            qrContainer.style.display = "none";
            return;
        }

        errorMessage.style.display = "none";
        qrContainer.style.display = "block";

        qrContainer.innerHTML = "";

        qrCode = new QRCode(qrContainer, {
            text: url,
            width: 200,
            height: 200
        });
    }

    function downloadQRCode() {
        const qrCanvas = qrContainer.querySelector("canvas");

        if (!qrCanvas) {
            alert("QR Code not generated yet!");
            return;
        }

        const image = qrCanvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = "qr-code.png";
        link.click();
    }

    generateBtn.addEventListener("click", generateQRCode);
    downloadBtn.addEventListener("click", downloadQRCode);
});
