/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

  export const AiChatSession = model.startChat({
    generationConfig,
 // safetySettings: Adjust safety settings
 // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [
      {
        role: "user",
        parts: [
          {text: "Description: Student registration for coding workshop on React & react native , On the basis of description please give form in json format with form title, form subheading, Form field, form name, placeholder name, and form label, fieldType, field required In Json format"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "{\n  \"formTitle\": \"React & React Native Coding Workshop Registration\",\n  \"formSubheading\": \"Join us for an immersive workshop to learn the fundamentals of React and React Native!\",\n  \"formFields\": [\n    {\n      \"label\": \"Full Name\",\n      \"fieldName\": \"fullName\",\n      \"placeholder\": \"Enter your full name\",\n      \"fieldType\": \"text\",\n      \"required\": true\n    },\n    {\n      \"label\": \"Email Address\",\n      \"fieldName\": \"email\",\n      \"placeholder\": \"Enter your email address\",\n      \"fieldType\": \"email\",\n      \"required\": true\n    },\n    {\n      \"label\": \"Phone Number\",\n      \"fieldName\": \"phoneNumber\",\n      \"placeholder\": \"Enter your phone number\",\n      \"fieldType\": \"tel\",\n      \"required\": true\n    },\n    {\n      \"label\": \"Previous Coding Experience\",\n      \"fieldName\": \"codingExperience\",\n      \"placeholder\": \"Describe your previous coding experience (if any)\",\n      \"fieldType\": \"textarea\",\n      \"required\": false\n    },\n    {\n      \"label\": \"What are your goals for this workshop?\",\n      \"fieldName\": \"workshopGoals\",\n      \"placeholder\": \"What do you hope to achieve?\",\n      \"fieldType\": \"textarea\",\n      \"required\": false\n    },\n    {\n      \"label\": \"Preferred Workshop Date\",\n      \"fieldName\": \"workshopDate\",\n      \"placeholder\": \"Select your preferred date\",\n      \"fieldType\": \"date\",\n      \"required\": true\n    },\n    {\n      \"label\": \"Are you interested in React or React Native?\",\n      \"fieldName\": \"interest\",\n      \"fieldType\": \"radio\",\n      \"options\": [\n        { \"value\": \"react\", \"label\": \"React\" },\n        { \"value\": \"reactNative\", \"label\": \"React Native\" }\n      ],\n      \"required\": true\n    }\n  ]\n}\n"},
        ],
      },
    ],
  });
