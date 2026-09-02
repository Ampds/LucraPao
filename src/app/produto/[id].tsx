import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';
import { ProdutoFormScreen } from '../../screens/ProdutoFormScreen';
import { produtos } from '../../data/mockData';

export default function EditarProdutoRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const produto = produtos.find((p) => p.id === id);

  if (!produto) {
    // Em uma versão real, isso viria de uma busca por id no banco/API.
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Produto não encontrado.</Text>
      </View>
    );
  }

  return <ProdutoFormScreen produtoExistente={produto} />;
}
