const wrap = document.querySelector(".wrap");
const generateBtn = wrap.querySelector(".form button");
const qrInput = wrap.querySelector(".form input");
const qrImg = wrap.querySelector(".qr-code img");
const downloadBtn = document.querySelector("#download-btn");

generateBtn.addEventListener("click", async () => {
  let qrValue = qrInput.value.trim();
  generateBtn.innerHTML = "Generating QR code.....";
  
  if (!qrValue) {
    generateBtn.innerHTML = "Generate QR Code";
    return;
  }
  
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrValue}`;
  qrImg.src = qrCodeUrl;

  qrImg.addEventListener("load", () => {
    wrap.classList.add("active");
    generateBtn.innerText = "Generate QR Code";

    downloadBtn.style.display = "inline-block";
  });

  // Fetch the QR code image and create a downloadable Blob
  downloadBtn.addEventListener("click", async () => {
    try {
      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      
      // Create a temporary anchor for downloading the Blob
      const tempLink = document.createElement("a");
      tempLink.href = blobUrl;
      tempLink.download = "qr-code.png";
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);

      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading QR code:", error);
    }
  });
});

qrInput.addEventListener("keyup", () => {
  if (!qrInput.value.trim()) {
    wrap.classList.remove("active");
    downloadBtn.style.display = "none"; 
  }
});
