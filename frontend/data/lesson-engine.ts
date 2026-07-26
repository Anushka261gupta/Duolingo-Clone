import { LessonData } from "@/domain/types/lesson-engine"

export const MOCK_LESSONS: Record<string, LessonData> = {
  // UNIT 4: Order food, describe people
  "lesson-Unit 4-node-0": {
    id: "lesson-Unit 4-node-0",
    questions: [
      {
        id: "q1", type: "MULTIPLE_CHOICE", prompt: "Select the correct meaning", question: "agua",
        payload: {
          options: [{ id: "a", text: "water" }, { id: "b", text: "milk" }, { id: "c", text: "bread" }, { id: "d", text: "cheese" }],
          correctAnswerId: "a", correctFeedback: "Great!", incorrectFeedback: "Agua means water."
        }
      },
      {
        id: "q2", type: "MULTIPLE_CHOICE", prompt: "Select the correct meaning", question: "leche",
        payload: {
          options: [{ id: "a", text: "water" }, { id: "b", text: "milk" }, { id: "c", text: "bread" }, { id: "d", text: "cheese" }],
          correctAnswerId: "b", correctFeedback: "Perfect!", incorrectFeedback: "Leche means milk."
        }
      },
      {
        id: "q3", type: "MULTIPLE_CHOICE", prompt: "Select the correct meaning", question: "pan",
        payload: {
          options: [{ id: "a", text: "water" }, { id: "b", text: "milk" }, { id: "c", text: "bread" }, { id: "d", text: "cheese" }],
          correctAnswerId: "c", correctFeedback: "Good job!", incorrectFeedback: "Pan means bread."
        }
      },
      {
        id: "q4", type: "MULTIPLE_CHOICE", prompt: "Select the correct meaning", question: "queso",
        payload: {
          options: [{ id: "a", text: "water" }, { id: "b", text: "milk" }, { id: "c", text: "bread" }, { id: "d", text: "cheese" }],
          correctAnswerId: "d", correctFeedback: "Excellent!", incorrectFeedback: "Queso means cheese."
        }
      }
    ]
  },
  "lesson-Unit 4-node-1": {
    id: "lesson-Unit 4-node-1",
    questions: [
      {
        id: "q1", type: "MULTIPLE_CHOICE", prompt: "Select the correct meaning", question: "hombre",
        payload: {
          options: [{ id: "a", text: "man" }, { id: "b", text: "woman" }, { id: "c", text: "boy" }, { id: "d", text: "girl" }],
          correctAnswerId: "a", correctFeedback: "Great!", incorrectFeedback: "Hombre means man."
        }
      },
      {
        id: "q2", type: "WORD_BANK", prompt: "Translate this word", question: "mujer",
        payload: {
          words: ["man", "woman", "boy", "girl", "water"],
          correctAnswer: "woman", correctFeedback: "Perfect!", incorrectFeedback: "Mujer means woman."
        }
      },
      {
        id: "q3", type: "WORD_BANK", prompt: "Translate this word", question: "niño",
        payload: {
          words: ["man", "woman", "boy", "girl", "bread"],
          correctAnswer: "boy", correctFeedback: "Good job!", incorrectFeedback: "Niño means boy."
        }
      }
    ]
  },
  "lesson-Unit 4-node-2": {
    id: "lesson-Unit 4-node-2",
    questions: [
      {
        id: "q1", type: "WORD_BANK", prompt: "Translate to English", question: "El hombre come queso",
        payload: {
          words: ["The", "man", "eats", "drinks", "cheese", "bread"],
          correctAnswer: "The man eats cheese", correctFeedback: "Great!", incorrectFeedback: "It means The man eats cheese."
        }
      },
      {
        id: "q2", type: "WORD_BANK", prompt: "Translate to English", question: "La mujer bebe agua",
        payload: {
          words: ["The", "woman", "eats", "drinks", "water", "milk"],
          correctAnswer: "The woman drinks water", correctFeedback: "Perfect!", incorrectFeedback: "It means The woman drinks water."
        }
      },
      {
        id: "q3", type: "TYPE_ANSWER", prompt: "Type the translation", question: "El niño come pan",
        payload: {
          correctAnswer: "The boy eats bread", correctFeedback: "Good job!", incorrectFeedback: "It means The boy eats bread."
        }
      }
    ]
  },
  "lesson-Unit 4-node-3": {
    id: "lesson-Unit 4-node-3",
    questions: [
      {
        id: "q1", type: "TRANSLATE", prompt: "Translate to English", question: "La leche es fria",
        payload: {
          sentence: "La leche es fria", correctAnswer: "The milk is cold", correctFeedback: "Great!", incorrectFeedback: "It means The milk is cold."
        }
      },
      {
        id: "q2", type: "WORD_BANK", prompt: "Translate to English", question: "El pan es bueno",
        payload: {
          words: ["The", "bread", "milk", "is", "good", "cold"],
          correctAnswer: "The bread is good", correctFeedback: "Perfect!", incorrectFeedback: "It means The bread is good."
        }
      },
      {
        id: "q3", type: "TRANSLATE", prompt: "Translate to English", question: "El agua es caliente",
        payload: {
          sentence: "El agua es caliente", correctAnswer: "The water is hot", correctFeedback: "Excellent!", incorrectFeedback: "It means The water is hot."
        }
      }
    ]
  },
  "lesson-Unit 4-node-4": {
    id: "lesson-Unit 4-node-4",
    questions: [
      {
        id: "q1", type: "LISTENING", prompt: "Listen and type", question: "",
        payload: {
          audioText: "La mujer bebe agua", correctAnswer: "La mujer bebe agua", correctFeedback: "Great!", incorrectFeedback: "You heard: La mujer bebe agua."
        }
      },
      {
        id: "q2", type: "LISTENING", prompt: "Listen and type", question: "",
        payload: {
          audioText: "El niño come queso", correctAnswer: "El niño come queso", correctFeedback: "Perfect!", incorrectFeedback: "You heard: El niño come queso."
        }
      },
      {
        id: "q3", type: "LISTENING", prompt: "Listen and type", question: "",
        payload: {
          audioText: "El pan es bueno", correctAnswer: "El pan es bueno", correctFeedback: "Excellent!", incorrectFeedback: "You heard: El pan es bueno."
        }
      }
    ]
  },
  "lesson-Unit 4-node-5": {
    id: "lesson-Unit 4-node-5",
    questions: [
      {
        id: "q1", type: "TRANSLATE", prompt: "Translate to English", question: "El niño come pan y bebe leche",
        payload: {
          sentence: "El niño come pan y bebe leche", correctAnswer: "The boy eats bread and drinks milk", correctFeedback: "Great!", incorrectFeedback: "It means The boy eats bread and drinks milk."
        }
      },
      {
        id: "q2", type: "TYPE_ANSWER", prompt: "Type the translation", question: "La mujer come queso o pan",
        payload: {
          correctAnswer: "The woman eats cheese or bread", correctFeedback: "Perfect!", incorrectFeedback: "It means The woman eats cheese or bread."
        }
      },
      {
        id: "q3", type: "TRANSLATE", prompt: "Translate to English", question: "El hombre bebe agua caliente",
        payload: {
          sentence: "El hombre bebe agua caliente", correctAnswer: "The man drinks hot water", correctFeedback: "Excellent!", incorrectFeedback: "It means The man drinks hot water."
        }
      }
    ]
  },
  "lesson-Unit 4-node-6": {
    id: "lesson-Unit 4-node-6",
    questions: [
      {
        id: "q1", type: "LISTENING", prompt: "Listen and type", question: "",
        payload: {
          audioText: "El hombre y la mujer", correctAnswer: "El hombre y la mujer", correctFeedback: "Great!", incorrectFeedback: "You heard: El hombre y la mujer."
        }
      },
      {
        id: "q2", type: "TYPE_ANSWER", prompt: "Translate to English", question: "El niño come pan bueno",
        payload: {
          correctAnswer: "The boy eats good bread", correctFeedback: "Perfect!", incorrectFeedback: "It means The boy eats good bread."
        }
      },
      {
        id: "q3", type: "WORD_BANK", prompt: "Translate to English", question: "La leche es fria y el agua es caliente",
        payload: {
          words: ["The", "milk", "is", "cold", "and", "the", "water", "is", "hot"],
          correctAnswer: "The milk is cold and the water is hot", correctFeedback: "Excellent!", incorrectFeedback: "It means The milk is cold and the water is hot."
        }
      },
      {
        id: "q4", type: "TRANSLATE", prompt: "Translate to English", question: "La niña bebe agua",
        payload: {
          sentence: "La niña bebe agua", correctAnswer: "The girl drinks water", correctFeedback: "Amazing!", incorrectFeedback: "It means The girl drinks water."
        }
      }
    ]
  },
  // UNIT 5: Talk about the past
  "lesson-Unit 5-node-0": {
    id: "lesson-Unit 5-node-0",
    questions: [
      {
        id: "q1", type: "MULTIPLE_CHOICE", prompt: "Select the correct meaning", question: "fui",
        payload: {
          options: [{ id: "a", text: "I went" }, { id: "b", text: "I ate" }, { id: "c", text: "I drank" }, { id: "d", text: "I slept" }],
          correctAnswerId: "a", correctFeedback: "Great!", incorrectFeedback: "Fui means I went."
        }
      },
      {
        id: "q2", type: "MULTIPLE_CHOICE", prompt: "Select the correct meaning", question: "comí",
        payload: {
          options: [{ id: "a", text: "I went" }, { id: "b", text: "I ate" }, { id: "c", text: "I drank" }, { id: "d", text: "I slept" }],
          correctAnswerId: "b", correctFeedback: "Perfect!", incorrectFeedback: "Comí means I ate."
        }
      },
      {
        id: "q3", type: "MULTIPLE_CHOICE", prompt: "Select the correct meaning", question: "bebí",
        payload: {
          options: [{ id: "a", text: "I went" }, { id: "b", text: "I ate" }, { id: "c", text: "I drank" }, { id: "d", text: "I slept" }],
          correctAnswerId: "c", correctFeedback: "Good job!", incorrectFeedback: "Bebí means I drank."
        }
      }
    ]
  },
  "lesson-Unit 5-node-1": {
    id: "lesson-Unit 5-node-1",
    questions: [
      {
        id: "q1", type: "WORD_BANK", prompt: "Translate to English", question: "Ayer comí pan",
        payload: {
          words: ["Yesterday", "I", "ate", "went", "bread", "cheese"],
          correctAnswer: "Yesterday I ate bread", correctFeedback: "Great!", incorrectFeedback: "It means Yesterday I ate bread."
        }
      },
      {
        id: "q2", type: "WORD_BANK", prompt: "Translate to English", question: "Anoche bebí leche",
        payload: {
          words: ["Last", "night", "I", "drank", "went", "milk"],
          correctAnswer: "Last night I drank milk", correctFeedback: "Perfect!", incorrectFeedback: "It means Last night I drank milk."
        }
      },
      {
        id: "q3", type: "TRANSLATE", prompt: "Translate to English", question: "Ayer fui al mercado",
        payload: {
          sentence: "Ayer fui al mercado", correctAnswer: "Yesterday I went to the market", correctFeedback: "Good job!", incorrectFeedback: "It means Yesterday I went to the market."
        }
      }
    ]
  },
  "lesson-Unit 5-node-2": {
    id: "lesson-Unit 5-node-2",
    questions: [
      {
        id: "q1", type: "LISTENING", prompt: "Listen and type", question: "",
        payload: {
          audioText: "El hombre comió queso", correctAnswer: "El hombre comió queso", correctFeedback: "Great!", incorrectFeedback: "You heard: El hombre comió queso."
        }
      },
      {
        id: "q2", type: "LISTENING", prompt: "Listen and type", question: "",
        payload: {
          audioText: "La mujer bebió agua", correctAnswer: "La mujer bebió agua", correctFeedback: "Perfect!", incorrectFeedback: "You heard: La mujer bebió agua."
        }
      },
      {
        id: "q3", type: "TYPE_ANSWER", prompt: "Type the translation", question: "El niño fue al parque",
        payload: {
          correctAnswer: "The boy went to the park", correctFeedback: "Good job!", incorrectFeedback: "It means The boy went to the park."
        }
      }
    ]
  },
  "lesson-Unit 5-node-3": {
    id: "lesson-Unit 5-node-3",
    questions: [
      {
        id: "q1", type: "TRANSLATE", prompt: "Translate to English", question: "Anoche comí pan y queso",
        payload: {
          sentence: "Anoche comí pan y queso", correctAnswer: "Last night I ate bread and cheese", correctFeedback: "Great!", incorrectFeedback: "It means Last night I ate bread and cheese."
        }
      },
      {
        id: "q2", type: "TYPE_ANSWER", prompt: "Type the translation", question: "Ayer bebió leche fria",
        payload: {
          correctAnswer: "Yesterday he drank cold milk", correctFeedback: "Perfect!", incorrectFeedback: "It means Yesterday he drank cold milk."
        }
      },
      {
        id: "q3", type: "LISTENING", prompt: "Listen and type", question: "",
        payload: {
          audioText: "La niña fue al mercado ayer", correctAnswer: "La niña fue al mercado ayer", correctFeedback: "Excellent!", incorrectFeedback: "You heard: La niña fue al mercado ayer."
        }
      },
      {
        id: "q4", type: "WORD_BANK", prompt: "Translate to English", question: "Ayer fui, comí, y bebí",
        payload: {
          words: ["Yesterday", "I", "went", "I", "ate", "and", "I", "drank"],
          correctAnswer: "Yesterday I went I ate and I drank", correctFeedback: "Amazing!", incorrectFeedback: "It means Yesterday I went, ate, and drank."
        }
      }
    ]
  },
  "fallback-lesson": {
    id: "fallback-lesson",
    questions: [
      {
        id: "q1", type: "MULTIPLE_CHOICE", prompt: "Error", question: "Fallback Lesson",
        payload: {
          options: [{ id: "a", text: "Proceed" }],
          correctAnswerId: "a", correctFeedback: "Proceeding", incorrectFeedback: "Error"
        }
      }
    ]
  }
}
