import React,{useEffect,useState, ChangeEvent} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './style.css';
import logo from '../../assets/logo.svg';
import {FiArrowDownLeft} from 'react-icons/fi'
import {Map, TileLayer,Marker} from 'react-leaflet';
import {LeafletMouseEvent} from 'leaflet'
import api from '../../services/api';


interface Item {
  id:number,
  title: string,
  image_url: string
}
interface IBGEUFResponse {
  sigla: string;
}
interface IBGECityResponse {
  nome: string;
}

const CreatePoint = () => {
  //Estados
  const[items,setItems] = useState<Item[]>([]);
  const [ufs,setUfs] = useState<string[]>([]);
  const [selectedUF, setSelectedUF] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');
  const [city, setCity] = useState<string[]>([]);
  const[selectedPosition, setSelectedPosition] = useState<[number,number]>([0,0]);
  const[initialPosition, setinitialPosition] = useState<[number,number]>([0,0]);

  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const {latitude, longitude} = position.coords;
      setinitialPosition([latitude,longitude]);
    })
  },[])

  useEffect(() => {
    api.get('items').then(response => {
      setItems(response.data);
    });
  }, []);

  useEffect(() => {
      axios.get<IBGEUFResponse[]>("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then(response => {
         const ufInitials = response.data.map(uf => uf.sigla);
         setUfs(ufInitials);
      });
  },[])

  useEffect(() =>{
      if(selectedUF === "0"){
        return;
      }
      axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios`)
      .then(response => {
         const cityNames = response.data.map(city => city.nome);
         setCity(cityNames);
      });
    }
,[selectedUF])

  function handleSelectUf(event: ChangeEvent<HTMLSelectElement>){
    const selectedUF = event.target.value;

    setSelectedUF(selectedUF);

  };
  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>){
    const selectedCity = event.target.value;

    setSelectedCity(selectedCity);

  };

  function handleMapClick (event:LeafletMouseEvent ){
    setSelectedPosition([
      event.latlng.lat,
      event.latlng.lng
    ])
  }


  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="Ecoleta"/>

        <Link to="/">
          <FiArrowDownLeft />
            Voltar para home
        </Link>
      </header>

      
      <form action="">
        <h1>Cadastro do <br /> ponto de coleta</h1>

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>
        
          <div className="field">
            <label htmlFor="name">Nome da Entidade</label>
            <input
               type="text"
               name="name"
               id="name"
              />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                name="email"
                id="email"
                />
            </div>
            <div className="field">
            <label htmlFor="whatsapp">Whatsapp</label>
            <input
               type="text"
               name="whatsapp"
               id="whatsapp"
              />
          </div>
          </div>
        </fieldset>


        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>
          <Map center={initialPosition }zoom={15} onclick={handleMapClick}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position ={selectedPosition } />
          </Map>
          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estado (UF)</label>
              <select name="uf" id="uf" value={selectedUF} onChange={handleSelectUf}>
                <option value="0">Selecione uma UF</option>
                {ufs.map(uf => (
                  <option key={uf} value={uf}>{uf}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="uf">Cidade</label>
              <select name="city" id="city" value={selectedCity} onChange={handleSelectCity}>
                <option value="0">Selecione uma cidade</option>
                {city.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Itens de coleta</h2>
            <span>Selecione um ou mais itens abaixo</span>
          </legend>
          <ul className="items-grid">
            {items.map(item =>(
            <li key={item.id}>
              <img src={item.image_url} alt={item.title}/>
              <span>{item.title}</span>
            </li>))}
              
            
          </ul>
        </fieldset>
        <button type="submit">Cadastrar ponto</button>
      </form>
  </div>
  )
}

export default CreatePoint;