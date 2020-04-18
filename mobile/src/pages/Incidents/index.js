import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import logoImg from '../../assets/logo.png';
import api from '../../services/api';

import styles from './styles';

export default function Incidents() {
  const navigator = useNavigation()
  const [incidents, setIncidents ] = useState([]);
  const [total, setTotal ] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  function navigationToDetail(incident) {
    navigator.navigate('Detail', {incident});
  }
    
  async function loadIncidents(){
    if (loading){
      return;
    }

    if(total > 0 && incident.length === total){
      return;
    }

    setLoading(true);
    const res = await api.get('incidents', {
      params: {page}
    });

    setIncidents([...incidents, ...res.data]);
    setTotal(res.headers["x-total-count"]);

    setPage(page + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadIncidents();
  }, []);


  return(
    <View style={styles.container}>

      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
        </Text>
      </View>

      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.description}>Escolha um dos casos abaixo e salve!</Text>

      <FlatList 
        data={incidents} 
        style={styles.IncidentList} 
        keyExtractor={incident => String(incident.id)} 
        showsVerticalScrollIndicator={true}  
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({ item: incident })=>(
            <View style={styles.Incident}>
              <Text style={styles.IncidentProperty}>ONG:</Text>
              <Text style={styles.IncidentValue}>{incident.name}</Text>

              <Text style={styles.IncidentProperty}>Caso:</Text>
              <Text style={styles.IncidentValue}>{incident.title}</Text>

              <Text style={styles.IncidentProperty}>Valor:</Text>

              <Text style={styles.IncidentValue}>
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                  }).format(incident.value)}
              </Text>

              <TouchableOpacity  
                style={styles.detailsButton} 
                onPress={() => navigationToDetail(incident)}>

                <Text style={styles.detailsButtonText}>Ver mais Detalhes</Text>
                <Feather name="arrow-right" size={16} color='#e02041' />
              </TouchableOpacity>
          </View>
        )}
        /> 
    </View>
  );
}