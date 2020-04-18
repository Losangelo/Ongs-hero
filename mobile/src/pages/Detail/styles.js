import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: Constants.statusBarHeight + 20, 
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  incident: {
    padding: 18,
    borderRadius: 8,
    backgroundColor: '#FFF',
    marginBottom: 10,
  },

  incidentBox: {
    padding:18,
    borderRadius: 8,
    backgroundColor: '#FFF',
    marginBottom: 12,
  },

  IncidentProperty:{
    fontSize: 15,
    marginTop: 8,
    fontWeight: 'bold',
  },

  IncidentValue: {
    marginTop: 8,
    fontSize: 15,
    marginBottom: 20,
    color: '#737380',
  },

  contactBox: {
    padding: 20,
    borderRadius: 8,
    backgroundColor: '#FFF',
    marginBottom: 16,
  },

  heroTitle:{
    fontWeight:'bold',
    fontSize:20,
    color: '#13131a',
    lineHeight: 30,
  },

  heroDescription:{
    marginTop: 10,
    fontSize: 15,
    color: '#737380',   
  },

  actions:{
    marginTop: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  action:{
    backgroundColor: '#e02041',
    borderRadius: 8,
    height: 50,
    width:'48%',
    justifyContent: 'center',
    alignItems: 'center',
  },
}) 