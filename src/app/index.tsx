import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🥖</Text>

      <Text style={styles.title}>LucraPão</Text>

      <Text style={styles.subtitle}>
        Controle seus custos e acompanhe seus lucros.
      </Text>

      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Meus produtos</Text>
      </Pressable>

      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Meus ingredientes</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },

  logo: {
    fontSize: 64,
    marginBottom: 10,
  },

  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },

  button: {
    width: '100%',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
    backgroundColor: '#eee',
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});