import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Box from './Box';
import Snackbar from 'react-native-snackbar';

export default function App() {
  const [gameState, setGameState] = useState(Array(9).fill(''));
  const [xTurn, setXTurn] = useState(true);
  const [winner, setWinner] = useState('');
  let winningPositions = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
  ];

  function handlePress(position) {
    if (winner) {
      return;
    }

    if (gameState[position] != '') {
      Snackbar.show({
        text: 'Position is already checked!',
        duration: Snackbar.LENGTH_SHORT,
        textColor: 'white',
        backgroundColor: 'red',
      });
    }
    gameState[position] = xTurn ? 'X' : 'O';
    let newState = [...gameState];
    setGameState(newState);
    setXTurn(!xTurn);

    checkWinner();
  }

  function reloadGame() {
    setGameState(Array(9).fill(''));
    setXTurn(true);
    setWinner('');
  }

  function checkWinner() {
    winningPositions.forEach(winPosition => {
      if (
        'O' == gameState[winPosition[0]] &&
        'O' == gameState[winPosition[1]] &&
        'O' == gameState[winPosition[2]]
      ) {
        setWinner('O');
      } else if (
        'X' == gameState[winPosition[0]] &&
        'X' == gameState[winPosition[1]] &&
        'X' == gameState[winPosition[2]]
      ) {
        setWinner('X');
      }
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Tic Tac Toe</Text>

      <TouchableOpacity style={[styles.btn, styles.turnBtn]}>
        <Text style={styles.text}>{xTurn ? "X's turn" : "O's Turn"}</Text>
      </TouchableOpacity>

      <View style={styles.layoutContainer}>
        <FlatList
          numColumns={3}
          data={gameState}
          renderItem={({item, index}) => (
            <Pressable
              key={index}
              onPress={() => handlePress(index)}
              style={styles.box}>
              <Text style={styles.boxText}>
                <Box icon={item} />
              </Text>
            </Pressable>
          )}
        />
      </View>
      <TouchableOpacity style={[styles.btn, styles.rBtn]} onPress={reloadGame}>
        <Text style={styles.text}>
          {winner ? `${winner} Won. Reload Game` : 'Reset the game'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: '#161d17',
  },
  heading: {
    fontSize: 28,
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },
  layoutContainer: {
    alignItems: 'center',
    marginTop: '10%',
  },
  box: {
    width: 120,
    height: 120,
    borderWidth: 2,
    borderColor: '#34333a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxText: {
    fontSize: 28,
    fontWeight: '500',
    color: 'white',
  },
  btn: {
    paddingVertical: 6,
    paddingHorizontal: 9,
    width: 270,
    borderRadius: 7,
    alignSelf: 'center',
    marginTop: '5%',
  },
  text: {
    fontSize: 27,
    color: 'white',
    fontWeight: '400',
    textAlign: 'center',
  },
  turnBtn: {
    backgroundColor: '#03d307',
  },
  rBtn: {
    backgroundColor: '#0703d3',
    marginTop: '11%',
  },
});
