'use client';

import { useState } from 'react';

// Sample data for proverbs, eulogies, and traditional sayings
const traditionalContent = {
  proverbs: [
    { edo: "Ọghọ́ rre ọ́ rre ọ́ gbọ́ ọ́ gbọ́", english: "What goes around comes around", category: "proverb" },
    { edo: "Ọmọ́ rre ọ́ mọ́ ọ́ gbọ́ ọ́ gbọ́", english: "A child who does not listen will feel", category: "proverb" },
    { edo: "Ẹ̀dọ́ rre ọ́ rre ọ́ gbọ́ ọ́ gbọ́", english: "The Edo person who does not know will learn", category: "proverb" },
  ],
  eulogies: [
    { edo: "Ọba ghator kpere, isẹ!", english: "Long live the King!", category: "eulogy" },
    { edo: "Ọmọ́ Ọ̀vbíọ́khua", english: "Child of nobility", category: "eulogy" },
  ],
  sayings: [
    { edo: "Ọ̀vbíọ́khua", english: "Royal family/nobility", category: "saying" },
    { edo: "Ẹ̀dọ́ ọ́ khian", english: "Edo language", category: "saying" },
  ]
};

export default function EdoTranslator() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isEnglishToEdo, setIsEnglishToEdo] = useState(true);
  const [activeTab, setActiveTab] = useState<'translator' | 'traditional'>('translator');
  const [selectedCategory, setSelectedCategory] = useState<'proverbs' | 'eulogies' | 'sayings'>('proverbs');

  const handleTranslate = () => {
    // Placeholder translation logic - in production, this would call an API
    if (inputText.trim()) {
      setOutputText(`[Translation of: ${inputText}]`);
    }
  };

  const toggleDirection = () => {
    setIsEnglishToEdo(!isEnglishToEdo);
    setInputText(outputText);
    setOutputText(inputText);
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

