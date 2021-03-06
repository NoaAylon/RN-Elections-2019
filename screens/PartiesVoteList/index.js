import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { Card } from './components/Card';
import { getParties } from '../../api/getParties';
import { partiesUrlImages } from '../../partiesUrlImages';

export function PartiesVoteList() {
  const [parties, setParties] = useState([]);

  const getPartiesAsync = async () => {
    const { data } = await getParties();
    data.parties.push({ id: 'ofir-cohen' });
    setParties(data.parties);
  };

  useEffect(() => {
    getPartiesAsync();
  }, []);

  const _renderItem = ({ item }) => (
    <Card imageUri={partiesUrlImages[item.id]} title={item.id} />
  );

  const _keyExtractor = item => item.id;

  return (
    <FlatList
      data={parties}
      renderItem={_renderItem}
      keyExtractor={_keyExtractor}
      numColumns={2}
    />
  );
}
