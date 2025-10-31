import { useGameStore } from "./store/gameStore";
import { IntroScreen } from "./screens/IntroScreen";
import { Level1Screen } from "./screens/Level1Screen";
import { Level2Screen } from "./screens/Level2Screen";
import { Level3Screen } from "./screens/Level3Screen";
import { FinalScreen } from "./screens/FinalScreen";
// import { LightRays } from "./components/ui/LightRays";
// import { DarkVeil } from "./components/ui/DarkVeil";

function App() {
  const currentScreen = useGameStore((state) => state.currentScreen);

  return (
    <div className="relative min-h-screen">
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
      <div className=" absolute inset-0">
        {currentScreen === "intro" && <IntroScreen />}
        {currentScreen === "level1" && <Level1Screen />}
        {currentScreen === "level2" && <Level2Screen />}
        {currentScreen === "level3" && <Level3Screen />}
        {currentScreen === "final" && <FinalScreen />}
      </div>
    </div>
  );
}

export default App;
