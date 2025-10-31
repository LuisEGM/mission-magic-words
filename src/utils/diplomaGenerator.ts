import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function calculareIcon(guardianLevel: string): string {
  if (guardianLevel === "Guardián Aprendiz") return "🥉";
  if (guardianLevel === "Guardián Junior") return "🥈";
  if (guardianLevel === "Guardián Experto") return "🥇";
  return "";
}

export async function generateDiploma(
  playerName: string,
  totalStars: number,
  guardianLevel: string
): Promise<void> {
  // Create diploma HTML element
  const diplomaEl = document.createElement("div");
  diplomaEl.style.position = "fixed";
  diplomaEl.style.left = "-9999px";
  diplomaEl.innerHTML = `
    <div style="width: 800px; height: 600px; padding: 40px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white; font-family: Arial, sans-serif; text-align: center;
                display: flex; flex-direction: column; justify-content: center; border-radius: 16px;">
      <h1 style="font-size: 48px; margin-bottom: 20px; font-weight: bold;">
        🏆 Guardián de las Historias 🧙‍♂️
      </h1>
      <p style="font-size: 24px; margin-bottom: 40px;">
        Este diploma certifica que
      </p>
      <h2 style="font-size: 36px; margin-bottom: 40px;
                 text-decoration: underline; font-weight: bold;">
        ${playerName}
      </h2>
      <p style="font-size: 20px; margin-bottom: 30px; line-height: 1.6;">
        Ha completado exitosamente la Misión de las Palabras Mágicas,<br/>
        recuperando las tres palabras: <strong>IMAGINACIÓN</strong>, <strong>CREATIVIDAD</strong> y <strong>VALENTÍA</strong>
      </p>
      <p style="font-size: 28px; font-weight: bold; margin: 20px 0;">
        Puntaje Total: ${totalStars} / 300 ⭐
      </p>
      <p style="font-size: 22px; font-weight: bold;">
        Nivel Alcanzado: ${calculareIcon(guardianLevel)} ${guardianLevel}
      </p>
      <p style="font-size: 14px; margin-top: 50px; opacity: 0.8;">
        ${new Date().toLocaleDateString("es-ES", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
    </div>
  `;

  document.body.appendChild(diplomaEl);

  try {
    // Wait a bit for styles to apply
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Convert to canvas
    const canvas = await html2canvas(diplomaEl.querySelector("div")!);

    // Convert to PDF
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [800, 600],
    });

    pdf.addImage(imgData, "PNG", 0, 0, 800, 600);
    pdf.save(`diploma-${playerName.replace(/\s+/g, "-")}.pdf`);
  } finally {
    // Cleanup
    document.body.removeChild(diplomaEl);
  }
}
