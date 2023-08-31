import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const apiKey = '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';
  // const eduRevise = new EduRevise(apiKey);
  // const userInput = 'Explain the water cycle generate questions for student';

  // (async () => {
  //   const question = await eduRevise.generateQuestion(userInput);
  //   console.log('Generated Question:', question);
  // })();

  // const userInput1 =
  //   'In the field of biology, DNA replication is a fundamental process that ensures the accurate duplication of genetic information';
  // const context = 'Generate questions related to DNA replication for student';

  // (async () => {
  //   const questionWithContext = await eduRevise.generateQuestionWithContext(
  //     userInput1,
  //     context,
  //   );
  //   console.log('Generated Question with Context:', questionWithContext);
  // })();
  await app.listen(4000);
}
bootstrap();
