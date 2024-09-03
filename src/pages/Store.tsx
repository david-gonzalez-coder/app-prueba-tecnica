import { IonContent,  IonPage } from '@ionic/react';
import useFetch from '../hooks/useFetch';
import { productType } from '../types';
import { useEffect, useState } from 'react';
import Pruduct from '../components/Product';

const Store: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [products, setProducts] = useState<productType[]>([]);

  const { data, isLoading, error } = useFetch<productType[]>('https://fakestoreapi.com/products');

  useEffect(() => {

    if (data) {
      let filteredData = data.filter((product: any) => {
        return product.title.toLowerCase().includes(searchValue.toLowerCase())
      })
      setProducts(filteredData)
    }
  }, [data, searchValue])

  return (
    <IonPage>
      
      <IonContent fullscreen >
        <div className='p-6 max-w-screen-md m-auto'>
        
          <div className='mb-8'>
            <h1 className='text-2xl font-bold'>Tienda</h1>
            <div>
              <input 
                type="text" 
                value={searchValue} 
                onChange={e => setSearchValue(e.target.value)} 
                placeholder="Buscar" 
                className='w-full p-2 border border-gray-300 rounded-md outline-none' />
            </div>
          </div>

          {error && <div>Error: {error}</div>}
          {isLoading ? <div>Cargando...</div> : <></>}

          <div className='grid gap-4 grid-cols-2 sm:grid-cols-3 '>
            {products && products?.map((product: any) => (
              <Pruduct key={product.id} {...product} />
            ))}
          </div>
        </div>
        
        
      </IonContent>
    </IonPage>
  );
};

export default Store;
