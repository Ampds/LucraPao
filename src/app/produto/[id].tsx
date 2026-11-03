import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';
import { ProdutoDetalheScreen } from '../../screens/ProdutoDetalheScreen';
import { produtos } from '../../data/mockData';

export default function VisualizarProdutoRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const produto = produtos.find((p) => p.id === id);

  if (!produto) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Produto não encontrado.</Text>
      </View>
    );
  }

  return <ProdutoDetalheScreen produto={produto} />;
}
