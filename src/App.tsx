import { useState } from 'react';
import IntroScreen from './components/IntroScreen';
import WishScreen from './components/WishScreen';

function App() {
  const [userName, setUserName] = useState<string>('');
  const [showWish, setShowWish] = useState(false);

  const handleNameSubmit = (name: string) => {
    setUserName(name);
    setShowWish(true);
  };

  return (
    <>
      {!showWish ? (
        <IntroScreen onSubmit={handleNameSubmit} />
      ) : (
        <WishScreen name={userName} />
      )}
    </>
  );
}

export default App;
