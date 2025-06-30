// screens/Chistory.js

import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  StyleSheet, TextInput, FlatList, Alert
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Chistory() {
  const [activeTab, setActiveTab] = useState('Pending');
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const collectorId = await AsyncStorage.getItem('collectorId');
        // 1️⃣ fetch all requests assigned to this collector
        const reqRes = await axios.get(
          `http://192.168.0.114:5000/api/v1/collector/requests/${collectorId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const all = reqRes.data.requests || [];
        setPendingTasks(all.filter(r => r.status === 'pending'));
        setCompletedTasks(all.filter(r => r.status !== 'pending'));

        // 2️⃣ fetch payment history
        const payRes = await axios.get(
          `http://192.168.0.114:5000/api/v1/payment/history/${collectorId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setPaymentHistory(payRes.data.payments || []);
      } catch (e) {
        console.error(e);
        Alert.alert('Error', 'Failed to load history.');
      }
    };

    loadData();
  }, []);

  const filterBySearch = list =>
    list.filter(item =>
      Object.values(item).some(val =>
        String(val).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

  const renderTask = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>ID: {item._id}</Text>
      <Text style={styles.cell}>Name: {item.homeownerName}</Text>
      <Text style={styles.cell}>Scrap: {item.scrapType}</Text>
      <Text style={styles.cell}>Weight: {item.weight} kg</Text>
      <Text style={styles.cell}>Status: {item.status}</Text>
    </View>
  );

  const renderPayment = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>Homeowner: {item.homeownerId}</Text>
      <Text style={styles.cell}>Req ID: {item.requestId}</Text>
      <Text style={styles.cell}>Amount: KES {item.amount}</Text>
      <Text style={styles.cell}>Date: {new Date(item.paidAt).toLocaleDateString()}</Text>
    </View>
  );

  const renderContent = () => {
    let list = [];
    let renderer = null;

    if (activeTab === 'Pending') {
      list = filterBySearch(pendingTasks);
      renderer = renderTask;
    } else if (activeTab === 'Completed') {
      list = filterBySearch(completedTasks);
      renderer = renderTask;
    } else {
      list = filterBySearch(paymentHistory);
      renderer = renderPayment;
    }

    return list.length
      ? <FlatList data={list} keyExtractor={i => i._id || i.requestId} renderItem={renderer} />
      : <Text style={styles.empty}>No matching records</Text>;
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {['Pending','Completed','Payments'].map(tab => (
          <TouchableOpacity
            key={tab}
            onPress={() => { setActiveTab(tab); setSearchQuery(''); }}
            style={[styles.tab, activeTab===tab && styles.activeTab]}
          >
            <Text style={styles.tabText}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={`Search ${activeTab.toLowerCase()}...`}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView style={styles.content}>
        {renderContent()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:  { flex:1, backgroundColor:'#fff', paddingTop:10 },
  tabBar:     { flexDirection:'row', justifyContent:'space-around', backgroundColor:'#e0e0e0', padding:6 },
  tab:        { padding:8, borderRadius:20 },
  activeTab:  { backgroundColor:'#2e7d32' },
  tabText:    { color:'#fff', fontWeight:'bold' },
  searchContainer: { padding:10 },
  searchInput:     { backgroundColor:'#f2f2f2', padding:8, borderRadius:8 },
  content:         { paddingHorizontal:12 },
  row:             { backgroundColor:'#f1f8e9', borderRadius:8, padding:10, marginBottom:10 },
  cell:            { fontSize:14, marginBottom:4 },
  empty:           { color:'#888', fontStyle:'italic', textAlign:'center', marginVertical:20 },
});
