import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  StyleSheet, TextInput
} from 'react-native';
// import axios from 'axios';

const dummyRequests = [
  {
    id: 'REQ001',
    name: 'John Doe',
    status: 'pending',
    scrapType: 'Plastic',
    weight: '10kg',
    location: 'Eldoret',
  },
  {
    id: 'REQ002',
    name: 'Jane Kim',
    status: 'completed',
    scrapType: 'Metal',
    weight: '15kg',
    location: 'Nairobi',
  },
];

const dummyPayments = [
  { id: 'REQ002', name: 'Jane Kim', amount: 'Ksh 1,000' },
  { id: 'REQ005', name: 'Joseph K', amount: 'Ksh 800' },
];

export default function Chistory() {
  const [activeTab, setActiveTab] = useState('Pending');
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Simulated fetch
    setPendingTasks(dummyRequests.filter(r => r.status === 'pending'));
    setCompletedTasks(dummyRequests.filter(r => r.status === 'completed'));
    setPaymentHistory(dummyPayments);
  }, []);

  const filterBySearch = (list) =>
    list.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

  const renderTask = (task) => (
    <View key={task.id} style={styles.row}>
      <Text style={styles.cell}>ID: {task.id}</Text>
      <Text style={styles.cell}>Name: {task.name}</Text>
      <Text style={styles.cell}>Scrap: {task.scrapType}</Text>
      <Text style={styles.cell}>Weight: {task.weight}</Text>
      <Text style={styles.cell}>Location: {task.location}</Text>
    </View>
  );

  const renderPayment = (entry) => (
    <View key={entry.id} style={styles.row}>
      <Text style={styles.cell}>Name: {entry.name}</Text>
      <Text style={styles.cell}>Req ID: {entry.id}</Text>
      <Text style={styles.cell}>Amount: {entry.amount}</Text>
    </View>
  );

  const renderContent = () => {
    if (activeTab === 'Pending') {
      const filtered = filterBySearch(pendingTasks);
      return (
        <>
          <Text style={styles.title}>🟡 Pending Tasks</Text>
          {filtered.length > 0
            ? filtered.map(renderTask)
            : <Text style={styles.empty}>No matching pending tasks</Text>}
        </>
      );
    }

    if (activeTab === 'Completed') {
      const filtered = filterBySearch(completedTasks);
      return (
        <>
          <Text style={styles.title}>✅ Completed Tasks</Text>
          {filtered.length > 0
            ? filtered.map(renderTask)
            : <Text style={styles.empty}>No matching completed tasks</Text>}
        </>
      );
    }

    if (activeTab === 'Payments') {
      const filtered = filterBySearch(paymentHistory);
      return (
        <>
          <Text style={styles.title}>💰 Payment History</Text>
          {filtered.length > 0
            ? filtered.map(renderPayment)
            : <Text style={styles.empty}>No matching payment records</Text>}
        </>
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Tab Switcher */}
      <View style={styles.tabBar}>
        {['Pending', 'Completed', 'Payments'].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => {
              setActiveTab(tab);
              setSearchQuery(''); // reset search when tab changes
            }}
            style={[
              styles.tab,
              activeTab === tab && styles.activeTab,
            ]}
          >
            <Text style={styles.tabText}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={`Search in ${activeTab.toLowerCase()}...`}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Tab Content */}
      <ScrollView style={styles.content}>
        {renderContent()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#e0e0e0',
    paddingVertical: 6,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#2e7d32',
  },
  tabText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  searchContainer: {
    padding: 10,
  },
  searchInput: {
    backgroundColor: '#f2f2f2',
    padding: 8,
    borderRadius: 8,
  },
  content: {
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#2e7d32',
    textAlign: 'center',
  },
  row: {
    backgroundColor: '#f1f8e9',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    elevation: 1,
  },
  cell: {
    fontSize: 14,
    marginBottom: 2,
  },
  empty: {
    color: '#888',
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 10,
  },
});
