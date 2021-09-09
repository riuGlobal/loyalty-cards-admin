import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import './Home.css';

import { Header } from '../app/Header';


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
