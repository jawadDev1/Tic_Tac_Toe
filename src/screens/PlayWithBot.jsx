import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Box from '../Box';
import Snackbar from 'react-native-snackbar';

export default function PlayWithBot() {
  const [gameState, setGameState] = useState(Array(9).fill(''));
  const [playerTurn, setPlayerTurn] = useState(true);
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

    gameState[position] = playerTurn ? 'X' : 'O';
    let newState = [...gameState];

    setGameState(newState);
    setPlayerTurn(!playerTurn);

    checkWinner();
  }

  function reloadGame() {
    setGameState(Array(9).fill(''));
    setPlayerTurn(true);
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

  function botTurn() {
    let count = 0;
    for (let i of gameState) {
      if (i == 'X' || i == 'O') {
        count++;
      }
    }
    if (count >= 9) return;
    let position = Math.floor(Math.random() * 8);
    if (gameState[position] != '') {
      botTurn();
      return;
    }

    handlePress(position);
  }

  useEffect(() => {
    if (!playerTurn) {
      setTimeout(() => {
        botTurn();
      }, 200);
    }
  }, [setPlayerTurn, playerTurn]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.btn, styles.turnBtn]}>
        <Text style={styles.text}>
          {playerTurn ? "X's turn" : "Bot's Turn"}
        </Text>
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
