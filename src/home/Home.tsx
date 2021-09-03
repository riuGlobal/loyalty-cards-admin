import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Header } from '../app/Header';
import './Home.css';

const Home: React.FC = () => {
  const pageTitle = 'HOME';
  return (
    <IonPage>
      <Header pageTitle={pageTitle} />
      <IonContent fullscreen>
      </IonContent>
    </IonPage>
  );
};

export default Home;
