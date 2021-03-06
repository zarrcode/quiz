module.exports = {
  content: [
    './pages/index.tsx',
    './pages/home.tsx',
    './pages/navbar.tsx',
    './pages/rules.tsx',
    './pages/quiz.tsx',
    './pages/components/navbarItem.tsx',
    './pages/components/button.tsx',
    './pages/components/option.tsx',
    './pages/components/question.tsx',
    './pages/components/playerAnswer.tsx',
    './pages/components/playerScore.tsx',
    './pages/components/playerCard.tsx',
    './pages/components/createQuiz.tsx',
    './pages/components/categories.tsx',
    './pages/components/finalScore.tsx',
    './pages/components/multipleAnswers.tsx',
    './pages/components/mcqButton.tsx',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'custom-3': 'repeat(auto-fit, minmax(6rem, 1fr))',
      },
    },
  },
  plugins: [],
};
