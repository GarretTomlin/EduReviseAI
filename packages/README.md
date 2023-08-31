# EduRevise

EduRevise is an exceptional npm package tailor-made for educators. Utilizing the remarkable capabilities of OpenAI's GPT-3.5 model, it acts as your virtual teaching assistant, dedicated to crafting an array of thought-provoking questions and elevating the art of learning.


## Why EduRevise

📚 Enhance Learning with Ease

Designed exclusively for educators, EduRevise offers a seamless experience for generating a diverse range of questions to stimulate learning. Whether you're creating study materials, quizzes, or assignments, EduRevise has your back.

## Installation

To install EduRevise

npm i edurevise or yarn add edurevise


## Usage

Import the `EduRevise` class from the package and create an instance by providing your OpenAI API key:

```javascript
import EduRevise from 'edurevise';

const apiKey = 'your_openai_api_key_here';
const eduRevise = new EduRevise(apiKey);

```

### Generating a Question

```javascript
const userInput = 'Explain the water cycle';

(async () => {
  const question = await eduRevise.generateQuestion(userInput);
  console.log('Generated Question:', question);

  //example generated questions Can you outline the stages of the water cycle and elaborate on the importance of each stage?
})();

```

### Generating a Question with Context


```javascript
const userInput = 'In the field of biology, DNA replication is a fundamental process that ensures the accurate duplication of genetic information';
const context = 'Generate questions related to DNA replication';

(async () => {
  const questionWithContext = await eduRevise.generateQuestionWithContext(userInput, context);
  console.log('Generated Question with Context:', questionWithContext);
})();

```

### Rephrasing a Question



```javascript
const userInput = 'What are the major causes of climate change?';

(async () => {
  const rephrasedQuestion = await eduRevise.rephraseQuestion(userInput);
  console.log('Rephrased Question:', rephrasedQuestion);
})();


```

## Generating Batch Questions

```javascript
const userInputs = [
  'Explain the process of photosynthesis.',
  'Discuss the causes and effects of climate change.',
  'Describe the principles of supply and demand in economics.'
];
(async () => {
  const batchQuestions = await eduRevise.generateBatchQuestions(userInputs);
  console.log('Generated Batch Questions:', batchQuestions);
})();


```

## Conclusion 
Teaching is an art, and EduRevise empowers you to create a learning experience that captivates and inspires. Let EduRevise become your trusted companion in crafting educational content that resonates with students and maximizes their potential.



## License
This project is licensed under the MIT License - see the [License](https://opensource.org/license/mit/) file for details.