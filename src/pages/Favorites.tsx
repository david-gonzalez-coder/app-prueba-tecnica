import { useEffect, useState } from "react";
import { productType } from "../types";
import { IonContent, IonPage } from "@ionic/react";
import Pruduct from "../components/Product";

const Favorites = () => {

    const [favorites, setFavorites] = useState<productType[]>([]);

    const getFavorites = () => {
        const favorites = localStorage.getItem('favorites');
        if (favorites) {
            setFavorites(JSON.parse(favorites));
        }
    }

    useEffect(() => {
        getFavorites()
    }, []);
    
    return (
        <IonPage>
      
            <IonContent fullscreen>
                <div className='p-6 max-w-screen-md m-auto'>
                
                    <div className='mb-8'>
                        <h1 className='text-2xl font-bold'>Favoritos</h1>
                    </div>
                    <div className='grid gap-4 grid-cols-2 sm:grid-cols-3'>
                        {
                            favorites.length > 0 ? favorites?.map((product: any) => (
                                <Pruduct key={product?.id} {...product} />
                            ))
                            :
                            <div>No hay productos favoritos</div>
                        }
                    </div>
                    <button onClick={() => getFavorites()} className='bg-blue-500 text-white p-2 rounded-md mt-4'>Recargar lista</button>
                </div>
             
            
            
            </IonContent>
        </IonPage>
    );
}

export default Favorites;