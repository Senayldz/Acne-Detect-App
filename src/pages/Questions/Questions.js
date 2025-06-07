import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { questions } from '../../data/questions';
import styles from './Questions.style';

const { width } = Dimensions.get('window');

const Questions = () => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (scoreValue) => {
    setScore(prev => prev + scoreValue);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  const getSeverity = () => {
    if (score <= 4) return 'Hafif Akne';
    if (score <= 6) return 'Orta Derece Akne';
    return 'Şiddetli Akne';
  };

  if (finished) {
    return (
      <View style={[styles.container, styles.finishedContainer]}>
        <Text style={styles.question}>Test Sonucunuz:</Text>
        <Text style={styles.result}>{getSeverity()}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setCurrent(0);
            setScore(0);
            setFinished(false);
          }}
        >
          <Text style={styles.buttonText}>Tekrar Dene</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const question = questions[current];

  return (
    <View style={[styles.container, styles.softBackground]}>
      <Text style={styles.question}>{question.question}</Text>
      {question.options.map((opt, i) => (
        <TouchableOpacity
          key={i}
          style={styles.optionButton}
          onPress={() => handleAnswer(opt.score)}
          activeOpacity={0.7}
        >
          <Text style={styles.optionText}>{opt.text}</Text>
        </TouchableOpacity>
      ))}

      {/* Sayfa göstergesi - noktalara basınca o soruya geç */}
      <View style={styles.pagination}>
        {questions.map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setCurrent(index)}
            style={[
              styles.dot,
              current === index ? styles.activeDot : null,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default Questions;
