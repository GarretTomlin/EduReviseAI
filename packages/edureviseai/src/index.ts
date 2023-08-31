import OpenAI from 'openai';

class EduRevise {
  private openai: OpenAI;

  constructor(apiKey: string | null) {
    if (apiKey === null) {
      throw new Error('API key is missing.');
    }
    this.openai = new OpenAI({ apiKey });
  }

  async generateQuestion(
    userInput: string,
    instructions = 'Utilizing the expertise of a seasoned instructor with 50 years of experience, generate a diverse range of questions tailored to the difficulty levels and categories specified by the user. Create an assortment of questions designed to assess and enhance studying abilities:',
    model = 'gpt-3.5-turbo',
  ): Promise<string | null | undefined> {
    const response = await this.openai.chat.completions.create({
      messages: [
        { role: 'system', content: instructions },
        { role: 'user', content: userInput },
      ],
      model,
    });
    if (response.choices[0] != null) {
      return response.choices[0].message.content;
    }
  }

  async generateQuestionWithContext(
    userInput: string,
    context: string,
    model = 'gpt-3.5-turbo',
  ): Promise<string | null | undefined> {
    const instructions = `"Formulate an insightful question based on the provided context, drawing from the knowledge of a highly experienced educator with 50 years of expertise. Deliver an optimal response that elevates the potential for enhancing learning capabilities:\n${context}`;
    return this.generateQuestion(userInput, instructions, model);
  }

  async generateBatchQuestions(
    userInputs: string[],
    model = 'gpt-3.5-turbo',
  ): Promise<string[]> {
    const instructions =
      'Craft a question using the following batch of information, leveraging the wisdom of a 50-year experienced teacher. Provide the utmost quality in your response.:';

    const batchResponses = await Promise.all(
      userInputs.map(async (userInput) => {
        const response = await this.openai.chat.completions.create({
          messages: [
            { role: 'system', content: instructions },
            { role: 'user', content: userInput },
          ],
          model,
        });
        return response.choices[0]?.message.content ?? '';
      }),
    );

    return batchResponses;
  }

  async rephraseQuestion(
    userInput: string,
    model = 'gpt-3.5-turbo',
  ): Promise<string | null | undefined> {
    const instructions =
      'Enhance the following question by drawing upon 50 years of teaching experience. Elevate its quality by tenfold compared to the original.:';
    const response = await this.openai.chat.completions.create({
      messages: [
        { role: 'system', content: instructions },
        { role: 'user', content: userInput },
      ],
      model,
    });

    if (response.choices[0] != null) {
      return response.choices[0].message.content;
    }
  }
}

export default EduRevise;
