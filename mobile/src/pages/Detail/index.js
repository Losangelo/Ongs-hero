import React from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, Image, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailCompose from 'expo-mail-composer';

import logoImg from '../../assets/logo.png';
import styles from './styles';

export default function Detail(){
  const navigation = useNavigation();
  const route = useRoute();
  const incident = route.params.incident;
  const Nformat = `${Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}`;

  const message = `Olá ${incident.name}, gostaria de ajudar no caso  "${incident.title}", com o valor de ${Nformat}`

  function navigateBack(){
    navigation.goBack();
  }

  function SendMail(){
    MailCompose.composeAsync({
      subject: 'Heroi do caso: Cadelinha atropelada',
      recipients: ['losangelo@gmail.com'],
      body: message,
    })
  }

  function SendWhatsApp(){
    Linking.openURL(`whatsapp://send?phone=86981488472&text=${message}`);
  }

  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />

        <TouchableOpacity onPress={navigateBack}>
          <Feather name='arrow-left' size={28} color="#E82041" />
        </TouchableOpacity>

      </View>

      <View>
        <View style={styles.incident}>
          <Text style={[styles.IncidentProperty, {marginTop: 0}]}>ONG:</Text>
          <Text style={styles.IncidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

          <Text style={styles.IncidentProperty}>Caso:</Text>
          <Text style={styles.IncidentValue}>{incident.title}</Text>

          <Text style={styles.IncidentProperty}>Valor:</Text>
          <Text style={styles.IncidentValue}>
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                  }).format(incident.value)}
              </Text>

        </View>

        <View style={styles.contactBox}>
          <Text style={styles.heroTitle}>Salve o Dia!</Text>
          <Text style={styles.heroTitle}>Seja o Heroi desse caso.</Text>

          <Text style={styles.heroDescription}>Entre em contato</Text>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.action} onPress={SendWhatsApp}>
              <Text style={styles.actionText}>
                WhatsApp
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.action} onPress={SendMail}>
              <Text style={styles.actionText}>
                E-mail
              </Text>
            </TouchableOpacity>
          </View>

        </View>

      </View>
    </View>
  )
}