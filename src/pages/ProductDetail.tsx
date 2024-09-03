import { useParams } from "react-router";
import useFetch from "../hooks/useFetch";
import { IonContent, IonPage } from "@ionic/react";
import { useEffect, useState } from "react";
import { productType } from "../types";


const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [isFavorite, setIsFavorite] = useState(false);

    const { data, isLoading } = useFetch<productType>(`https://fakestoreapi.com/products/${id}`);
    
    const { title, description, image, price, category } = data || {};


    function saveFavorite() {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
        const newFavorites = [...favorites, data]
        localStorage.setItem('favorites', JSON.stringify(newFavorites))
        setIsFavorite(true)
    }
    function removeFavorite() {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
        const newFavorites = favorites.filter((product: any) => product.id !== data?.id)
        localStorage.setItem('favorites', JSON.stringify(newFavorites))
        setIsFavorite(false)
        
    }

  
    const handleFavorite = () => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        const isFavorite = favorites.some((product: any) => product.id === data?.id);
        if (isFavorite) {
            removeFavorite();
        } else {
            saveFavorite();
        }
    }

    function handleLabel() {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        const isFavorite = favorites.some((product: any) => product.id === data?.id);
        setIsFavorite(isFavorite);
    }


    useEffect(() => {
        handleLabel();
    }, [data])
    
    
    if (isLoading)  return <div>Loading...</div>
    if (!data) return <div>Product not found</div>

    return (
        <IonPage>
      
            <IonContent fullscreen>
                <div className='p-6 max-w-screen-md m-auto'>
                    <div className='bg-white rounded-xl flex flex-col gap-4 p-4 relative' >
                        <button onClick={handleFavorite} className='absolute top-2 right-2 bg-blue-500 text-white p-2 rounded-md'>
                            {isFavorite ? "Eliminar de favoritos" : "Agregar a favoritos"}
                        </button>
                        <div className='aspect-[9/12] '>
                            <img src={image} alt={title} className='w-full object-cover' />
                        </div>
                        
                        <h2 className='font-bold text-xl text-center'>{title}</h2>
                        <p>{description}</p>
                        <p>$ {price}</p>
                        <p>{category}</p>
                        
                
                    </div>
                </div>
            </IonContent>
        </IonPage>
        
    );
}

export default ProductDetail;