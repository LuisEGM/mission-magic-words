import { useGameStore } from './store/gameStore';
import { IntroScreen } from './screens/IntroScreen';
import { Level1Screen } from './screens/Level1Screen';
import { Level2Screen } from './screens/Level2Screen';
import { Level3Screen } from './screens/Level3Screen';
import { FinalScreen } from './screens/FinalScreen';

function App() {
  const currentScreen = useGameStore(state => state.currentScreen);

  return (
    <div className="min-h-screen">
      {currentScreen === 'intro' && <IntroScreen />}
      {currentScreen === 'level1' && <Level1Screen />}
      {currentScreen === 'level2' && <Level2Screen />}
      {currentScreen === 'level3' && <Level3Screen />}
      {currentScreen === 'final' && <FinalScreen />}
    </div>
  );
}

export default App;
