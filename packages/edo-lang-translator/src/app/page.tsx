'use client';

import { useState } from 'react';

// English to Edo dictionary
const englishToEdo: Record<string, string> = {
  // Greetings
  "hello": "ọbọ",
  "good morning": "ọbọ khare",
  "good afternoon": "ọbọ ẹvbo",
  "good evening": "ọbọ ọta",
  "thank you": "vbọọ",
  "thank you very much": "vbọọ khin",
  "please": "ẹse",
  "child": "ọmọ",
  "king": "ọba",
  "children": "ọvbi",
  
  // Common words
  "edo": "ẹdọ",
  "language": "ọkhian",
  "man": "ọvbokhan",
  "woman": "ọkpia",
  "money": "ọghẹ",
  "food": "ẹhan",
  "water": "amen",
  "house": "ọwa",
  "bag": "ọkpa",
  "cup": "ukpo",
  "book": "ebe",
  "husband": "ọkọ",
  "wife": "ọlọi",
  "father": "ẹrhan",
  "mother": "iye",
  "chair": "ọghe",
  "stone": "ọkuta",
  "sun": "ọvẹn",
  "moon": "ọsọn",
  "edo people": "ẹdo",
  "benin": "benin",
  "nigeria": "nigeria",
  
  // Verbs
  "will": "gha",
  "shall": "gha",
  "do": "rre",
  "make": "rre",
  "speak": "khian",
  "say": "khian",
  "go": "ye",
  "take": "gbe",
  "know": "mọ",
  "hear": "gbọ",
  "feel": "gbọ",
  "understand": "gbọ",
  "see": "hia",
  "buy": "dia",
  "sell": "ta",
  "eat": "je",
  "drink": "mu",
  "very": "khin",
  "much": "khin",
  
  // Numbers
  "one": "ọkpa",
  "two": "evba",
  "three": "eha",
  "four": "ene",
  "five": "ise",
  "six": "ẹha",
  "seven": "ihiọn",
  "eight": "ẹẹ",
  "nine": "ihiọn",
  "ten": "igbe",
  
  // Phrases
  "hello, how are you?": "ọbọ, ọ dọ?",
  "how are you?": "i dọ?",
  "how are you": "i dọ?",
  "i am fine": "ọ dọ gbọn",
  "it is good": "ọ dọ",
  "i know": "ọ mọ",
  "i hear": "ọ gbọ",
  "i understand": "ọ gbọ",
  "i will go": "gha ye",
  "i will do": "gha rre",
};

// Edo to English dictionary (reverse mapping)
const edoToEnglish: Record<string, string> = {};
Object.entries(englishToEdo).forEach(([english, edo]) => {
  edoToEnglish[edo.toLowerCase()] = english;
});

// Sample data for proverbs, eulogies, and traditional sayings
const traditionalContent = {
  proverbs: [
    { edo: "Ọghẹ i gbe ọ gbe ọ khin", english: "Money that is not well managed will finish", category: "proverb" },
    { edo: "Ọmọ i gbọ ọ gha mọ", english: "A child who does not listen will learn the hard way", category: "proverb" },
    { edo: "Ẹdọ i mọ ọ gha mọ", english: "An Edo person who does not know will learn", category: "proverb" },
    { edo: "Ọvbi ẹdo i rre ọ gha hia", english: "What an Edo child does not do, they will see", category: "proverb" },
    { edo: "Amen i mu ọ gha khu", english: "Water that is not drunk will dry up", category: "proverb" },
  ],
  eulogies: [
    { edo: "Ọba ghator kpere, isẹ!", english: "Long live the King!", category: "eulogy" },
    { edo: "Ọmọ Ọvbiọkhua", english: "Child of nobility", category: "eulogy" },
    { edo: "Ọba n'ẹdo", english: "The King of Benin", category: "eulogy" },
    { edo: "Ọmọ ọvbi ẹdo", english: "True child of Edo", category: "eulogy" },
  ],
  sayings: [
    { edo: "Ọvbiọkhua", english: "Royal family/nobility", category: "saying" },
    { edo: "Ẹdọ ọ khian", english: "Edo language", category: "saying" },
    { edo: "Ọba ẹdo", english: "King of Edo", category: "saying" },
    { edo: "Ẹdo bọ khare", english: "Edo greets you", category: "saying" },
    { edo: "Ọvbi ẹdo", english: "Child of Edo", category: "saying" },
  ]
};

interface TranslationHistory {
  id: number;
  input: string;
  output: string;
  direction: string;
  timestamp: Date;
}

export default function EdoTranslator() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isEnglishToEdo, setIsEnglishToEdo] = useState(true);
  const [activeTab, setActiveTab] = useState<'translator' | 'traditional'>('translator');
  const [selectedCategory, setSelectedCategory] = useState<'proverbs' | 'eulogies' | 'sayings'>('proverbs');
  const [history, setHistory] = useState<TranslationHistory[]>([]);

  const translateText = (text: string, toEdo: boolean): string => {
    if (!text.trim()) return '';
    
    const dictionary = toEdo ? englishToEdo : edoToEnglish;
    const lowerText = text.toLowerCase().trim();
    
    // Check for exact phrase match first
    if (dictionary[lowerText]) {
      return dictionary[lowerText];
    }
    
    // Try word-by-word translation
    const words = lowerText.split(/\s+/);
    const translatedWords = words.map(word => {
      // Remove punctuation for lookup
      const cleanWord = word.replace(/[.,!?;:]/g, '');
      return dictionary[cleanWord] || word;
    });
    
    return translatedWords.join(' ');
  };

  const handleTranslate = () => {
    if (inputText.trim()) {
      const translated = translateText(inputText, isEnglishToEdo);
      setOutputText(translated);
      
      // Add to history
      const newEntry: TranslationHistory = {
        id: Date.now(),
        input: inputText,
        output: translated,
        direction: isEnglishToEdo ? 'English → Ẹ̀dọ́' : 'Ẹ̀dọ́ → English',
        timestamp: new Date(),
      };
      setHistory([newEntry, ...history].slice(0, 10)); // Keep last 10 translations
    }
  };

  const toggleDirection = () => {
    setIsEnglishToEdo(!isEnglishToEdo);
    setInputText(outputText);
    setOutputText(inputText);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-red-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">English ⇄ Ẹ̀dọ́ Translator</h1>
          <p className="mt-2 text-sm text-gray-600">Translate between English and Ẹ̀dọ́ language with cultural context</p>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex gap-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('translator')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'translator'
                ? 'text-green-700 border-b-2 border-green-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Translator
          </button>
          <button
            onClick={() => setActiveTab('traditional')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'traditional'
                ? 'text-green-700 border-b-2 border-green-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Traditional Content
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'translator' ? (
          <div className="space-y-6">
            {/* Direction Toggle */}
            <div className="flex justify-center">
              <button
                onClick={toggleDirection}
                className="flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow border border-gray-200"
              >
                <span className="font-medium text-gray-700">
                  {isEnglishToEdo ? 'English → Ẹ̀dọ́' : 'Ẹ̀dọ́ → English'}
                </span>
                <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </button>
            </div>

            {/* Translation Boxes */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Input Box */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  {isEnglishToEdo ? 'English' : 'Ẹ̀dọ́'}
                </label>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleTranslate();
                    }
                  }}
                  placeholder={isEnglishToEdo ? 'Type in English...' : 'Type in Ẹ̀dọ́...'}
                  className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none text-gray-900"
                />
                <button
                  onClick={handleTranslate}
                  className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  Translate
                </button>
              </div>

              {/* Output Box */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  {isEnglishToEdo ? 'Ẹ̀dọ́' : 'English'}
                </label>
                <div className="w-full h-48 p-4 border border-gray-300 rounded-lg bg-gray-50 overflow-y-auto text-gray-900">
                  {outputText || <span className="text-gray-400">Translation will appear here...</span>}
                </div>
              </div>
            </div>

            {/* Translation History */}
            {history.length > 0 && (
              <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Translation History</h2>
                  <button
                    onClick={clearHistory}
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    Clear History
                  </button>
                </div>
                <div className="space-y-3">
                  {history.map((item) => (
                    <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-medium text-green-600">{item.direction}</span>
                        <span className="text-xs text-gray-500">
                          {item.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Input:</p>
                          <p className="text-gray-900">{item.input}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Output:</p>
                          <p className="text-gray-900 font-medium">{item.output}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Category Selector */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setSelectedCategory('proverbs')}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === 'proverbs'
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Proverbs
              </button>
              <button
                onClick={() => setSelectedCategory('eulogies')}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === 'eulogies'
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Eulogies
              </button>
              <button
                onClick={() => setSelectedCategory('sayings')}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === 'sayings'
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Traditional Sayings
              </button>
            </div>

            {/* Content Display */}
            <div className="grid gap-4">
              {traditionalContent[selectedCategory].map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-500 mb-2">Ẹ̀dọ́</p>
                      <p className="text-lg text-gray-900">{item.edo}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-500 mb-2">English</p>
                      <p className="text-lg text-gray-900">{item.english}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}






