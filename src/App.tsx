import { useGameStore } from "./store/gameStore";
import { IntroScreen } from "./screens/IntroScreen";
import { Level1Screen } from "./screens/Level1Screen";
import { Level2Screen } from "./screens/Level2Screen";
import { Level3Screen } from "./screens/Level3Screen";
import { FinalScreen } from "./screens/FinalScreen";
import { Footer } from "./components/layout/Footer";
import { MaintenancePage } from "./components/MaintenancePage";
import { Analytics } from "@vercel/analytics/react";
// import { LightRays as Aurora } from "./components/ui/LightRays";
// import { DarkVeil } from "./components/ui/DarkVeil";

function App() {
  const currentScreen = useGameStore((state) => state.currentScreen);

  // Verificar si la aplicación está bloqueada
  const isAppLocked = import.meta.env.VITE_APP_LOCKED === "true";

  // Si la app está bloqueada, mostrar página de mantenimiento
  if (isAppLocked) {
    return <MaintenancePage />;
  }

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* <LightRays
        raysOrigin="top-left"
        raysColor="#ffffff"
        raysSpeed={1.5}
        lightSpread={0.8}
        rayLength={1.2}
        followMouse={true}
        mouseInfluence={0.1}
        noiseAmount={0.1}
        distortion={0.05}
        className="bg-transparent"
      /> */}
      {/* <DarkVeil /> */}
      {/* <Aurora
        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      /> */}
      <div className="flex-1 absolute inset-0">
        {currentScreen === "intro" && <IntroScreen />}
        {currentScreen === "level1" && <Level1Screen />}
        {currentScreen === "level2" && <Level2Screen />}
        {currentScreen === "level3" && <Level3Screen />}
        {currentScreen === "final" && <FinalScreen />}
      </div>
      <Footer />
      <Analytics />
    </div>
  );
}

export default App;
